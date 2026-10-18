import app from "./app.js";
import { env } from "./config/env.js";
import initializeFirebaseAdmin from "./config/firebase.js";
import { prismaConnect } from "./config/prisma.js";
import { initializeGlobalCategories } from "./services/globalCategories.services.js";

initializeFirebaseAdmin();

const startServer = async () => {
  try {
    await prismaConnect();
    await initializeGlobalCategories();
    await app.listen({ port: env.PORT });
    console.log(`Server listening at ${env.PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
