import express from "express";
import connectDb from "./config/db.js";

const app = express();

await connectDb();

export default app;