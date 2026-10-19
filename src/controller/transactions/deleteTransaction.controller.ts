import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { DeleteTransactionParams } from "../../schemas/transaction.schema";

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  const { id } = request.params;

  if (!userId) {
    return reply.status(401).send({ error: "Error authorizing the user" });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      reply.status(400).send({ error: "Invalid transaction ID" });
      return;
    }

    await prisma.transaction.delete({ where: { id } });
    reply.status(200).send({ message: "Transaction successfully deleted" });
  } catch {
    request.log.error({ message: "Error deleting the transaction" });
    reply.status(500).send({ error: "Internal server error, transaction deletion failed" });
  }
};
