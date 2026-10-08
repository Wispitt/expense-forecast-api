import dotenv from "dotenv";
import app from "./app.js";
import { prismaConnect } from './config/prisma.js'
import { initializeGlobalCategories } from "./services/globalCategories.services.js";

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
	try {
		await prismaConnect();
		await initializeGlobalCategories();
		await app.listen({ port: PORT }).then(() => {
			console.log(`Server running in ${PORT}`);
		});
		
	} catch (err) {
		console.log(err);
	}
};

startServer();
