import dotenv from "dotenv";

dotenv.config();

export const { PORT = 8020, MONGODB_URI, JWT_SECRET } = process.env;
