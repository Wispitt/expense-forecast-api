import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default(3001),
  DATABASE_URL: z.string().min(5, "DATABASE_URL is mandatory"),
  NODE_ENV: z.enum(["dev", "test", "prod"], {
    message: "The NODE must be dev, test or prod",
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment configuration:", _env.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = _env.data;
