import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import { TransactionType } from "../../../generated/prisma/enums";
import prisma from "../../config/prisma";
import type { GetTransactionSummaryQuery } from "../../schemas/transaction.schema";
import type { CategorySummary } from "../../types/category.types";
import type { TransactionSummary } from "../../types/transaction.types";

dayjs.extend(utc);

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: GetTransactionSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "IYGT$T¨GG*_@T";

  if (!userId) {
    return reply.status(401).send({ error: "Error authorizing the user" });
  }

  const { month, year } = request.query;

  if (!month || !year) {
    return reply.status(400).send({ error: "Month and Year is mandatory" });
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySummary>();

    for (const transaction of transactions) {
      if (transaction.type === TransactionType.expense) {
        totalExpenses += transaction.amount;

        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          porcentage: 0,
        };

        existing.amount += transaction.amount;
        groupedExpenses.set(transaction.categoryId, existing);
      } else {
        totalIncomes += transaction.amount;
      }
    }

    const summary: TransactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: Number((totalIncomes - totalExpenses).toFixed(2)),
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          porcentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    reply.send(summary);
  } catch {
    request.log.error("Error collecting transactions");
    reply.status(500).send({ error: "Error to of server" });
  }
};
