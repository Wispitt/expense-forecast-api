import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionQuery } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.types";

dayjs.extend(utc);

export const getTransaction = async (
  request: FastifyRequest<{ Querystring: GetTransactionQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Error authorizing the user" });
  }

  const { month, categoryId, type, year } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transaction = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    reply.send(transaction);
  } catch {
    request.log.error("Error collecting transactions");
    reply.status(500).send({ error: "Error to of server" });
  }
};
