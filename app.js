import createHttpError from "http-errors";
import express from 'express';
import {join} from "path";
import logger from 'morgan';
import cors from "cors";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.js"
import userRoute from "./routes/users.js"
import indexRoute from "./routes/index.js"
import eventsRouter from "./routes/event.js"
import cookieParser from "cookie-parser";
import bookingRouter from "../EventManagemant/routes/booking.route.js"
const app = express();

app.use(express.json());
// await connectDb();

//view engine setup
app.set('view engine','ejs');

//test api
// app.get("/test",(req,res)=>{
//     res.status(200).json({ success: true,
//     message: "API is working"})
// });

app.use(cors({
    origin:"*"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/',indexRoute);
app.use('/users',userRoute);
app.use('/auth',authRouter);
app.use('/event',eventsRouter)
app.use("/bookings",bookingRouter);
app.use("/uploads",express.static('uploads'))

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pageapp
  res.status(err.status || 500);
  res.render('error');
});



export default app;