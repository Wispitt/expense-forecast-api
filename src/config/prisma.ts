import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export const prismaConnect = async () => {
    try {
        await prisma.$connect();
        console.log('The db is connected');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
};

export default prisma;