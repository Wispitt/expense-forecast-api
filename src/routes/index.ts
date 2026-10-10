import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";
import transactionsRoutes from "./transaction.routes";

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/started", async () => {
    return {
      status: "succed",
      message: "API is running",
    };
  });

  fastify.register(categoryRoutes, { prefix: "/categories" });
  fastify.register(transactionsRoutes, { prefix: "/transactions" });
}

export default routes;
