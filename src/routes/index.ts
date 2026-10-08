import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance): Promise<void> {
	fastify.get("/started", async () => {
		return {
			status: "succed",
			message: "API is running",
		};
	});
}

export default routes;
