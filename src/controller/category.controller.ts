import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const category = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    reply.send(category);
  } catch (err) {
    request.log.error(`Error locating the category: ${err}`);
    reply.status(500).send({ error: "Error locating the category" });
  }
};
