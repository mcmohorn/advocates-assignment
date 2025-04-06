import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  // I removed this block because it was messing up my typing of the db object

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL || "DATABASE_URL ENV VAR NOT SET");
  const db = drizzle(queryClient);
  return db;
};

export default setup();
