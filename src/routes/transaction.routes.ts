import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactions } from "../controller/transactions/createTransaction.controller";
import { deleteTransaction } from "../controller/transactions/deleteTransaction.controller";
import { getTransaction } from "../controller/transactions/getTransaction.controller";
import { getTransactionsSummary } from "../controller/transactions/getTransactionsSummary.controller";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  getTransactionSummarySchema,
} from "../schemas/transaction.schema";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransactions,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionSchema),
    },
    handler: getTransaction,
  });

  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionsRoutes;
