import * as dotenv from "dotenv";
import { Config } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./src/db/schema/*",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.MIGRATION_DATABASE_URL!,
  },
  out: "./drizzle",
} satisfies Config;
