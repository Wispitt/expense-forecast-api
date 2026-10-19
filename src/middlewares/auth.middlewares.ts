import type { FastifyReply, FastifyRequest } from "fastify";
import admin from 'firebase-admin';
import { getAuth } from "firebase-admin/auth";

declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}

export const authMiddleware = async (
request: FastifyRequest,
reply: FastifyReply
): Promise<void> => {
    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Authorization token not provided' });
    };

    const token = authHeader.replace('Bearer ', '');

    try {
        const decodedToken = await getAuth().verifyIdToken(token);

        request.userId = decodedToken.uid;
    } catch (err) {
        request.log.error(`Error verifying the token, ${err}`);
        reply.status(401).send({ error: 'Invalid or expired token' })
    }
}