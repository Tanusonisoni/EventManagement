import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.js"
import userRoute from "./routes/users.js"
import indexRoute from "./routes/index.js"
import eventsRouter from "./routes/event.js"
const app = express();

app.use(express.json());
// await connectDb();


//test api
// app.get("/test",(req,res)=>{
//     res.status(200).json({ success: true,
//     message: "API is working"})
// });


app.use('/',indexRoute);
app.use('/users',userRoute);
app.use('/auth',authRouter);
app.use('/event',eventsRouter)

export default app;