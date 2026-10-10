import type { FastifyInstance } from "fastify";
import { createTransactions } from "../controller/transactions/createTransaction.controller";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {},
    handler: createTransactions,
  });
};

export default transactionsRoutes;
