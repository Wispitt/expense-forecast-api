import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { type CreateCategoryBody, createTransactionSchema } from "../../schemas/transaction.schema";

export const createTransactions = async (
  request: FastifyRequest<{ Body: CreateCategoryBody }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Error authorizing the user" });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const messageError = result.error.message || "The validation is invalid";

    return reply.status(400).send({ error: messageError });
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      return reply.status(400).send({ error: "This category is invalid" });
    }

    const parseDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parseDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error(`Error creating the transaction: ${err}`);
    reply.status(500).send({ error: "Internal system error" });
  }
};
