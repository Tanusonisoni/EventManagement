import express from "express";
import connectDb from "./config/db.js";
import userRoute from "./routes/users.js";

const app = express();

app.use(express.json());
// await connectDb();

app.use("/users",userRoute);

export default app;