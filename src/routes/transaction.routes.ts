import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactions } from "../controller/transactions/createTransaction.controller";
import { createTransactionSchema } from "../schemas/transaction.schema";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransactions,
  });
};

export default transactionsRoutes;
