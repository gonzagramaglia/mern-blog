import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});