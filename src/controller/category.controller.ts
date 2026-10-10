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
  } catch (error) {
    request.log.error(`Error locating the category. ${error}`);
    reply.status(500).send({ error: "Error locating the category" });
  }
};
