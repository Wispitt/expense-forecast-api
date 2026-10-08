import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
	try {
		await app.listen({ port: PORT });
		console.log(`Server running in ${PORT}`);
	} catch (err) {
		console.log(err);
	}
};

startServer();
