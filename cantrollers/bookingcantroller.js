import { isValidObjectId,Types } from "mongoose";
import bookingModel from "../models/booking.model.js";
import eventModel from "../models/event.model.js";
import { ApiResponse } from "../utils/resPattern.js";
import { genreateToken } from "../config/jwt.js";
import { bookingCancellationTemplate } from "../template/bookingCancel.js";
import { bookingConfirmationTemplate } from "../template/bookingConfirm.js";
import fs from "fs";
import { transporter } from "../config/mailTransporter.js";
import genreateTicketPDF from "../utils/ticketPdf.js";

export async function bookTicket(req, res, next) {
    try {
        const { eventId, category } = req.body;

        let vip_tickets = parseInt(req.body.vip_tickets) || 0;
        let general_tickets = parseInt(req.body.general_tickets) || 0;

        if (!eventId || !(vip_tickets || general_tickets) || !category) {
            return res.status(400).json(new ApiResponse(false, null, "All fields are required"));
        }

        let event = await eventModel.findOne({ _id: eventId, isCancelled: false, isUpcoming: true, isCompleted: false });

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found or not available for booking"));
        }

        if (!(event.total_vip_tickets - event.vip_tickets_sold >= vip_tickets)) {
            return res.status(400).json(new ApiResponse(false, null, "Not enough VIP tickets available"));
        }

        if (!(event.total_general_tickets - event.general_tickets_sold >= general_tickets)) {
            return res.status(400).json(new ApiResponse(false, null, "Not enough general tickets available"));
        }

        let alreadyBooked = await bookingModel.find({ eventId, userId: req.user._id, isCancelled: false });

        let totalTicketsBooked = alreadyBooked.reduce((acc, booking) => {
            return acc + booking.booked_tickets.vip_tickets + booking.booked_tickets.general_tickets;
        }, 0);

        if ((totalTicketsBooked + vip_tickets + general_tickets) > 5) {
            return res.status(400).json(new ApiResponse(false, null, "You have exceeded the maximum number of tickets allowed for this event"));
        }

        let ticket = await bookingModel.create({
            amount: (vip_tickets * event.vip_ticket_price) + (general_tickets * event.general_ticket_price),
            eventId,
            booked_tickets: { vip_tickets, general_tickets },
            category,
            userId: req.user._id
        });

        event.vip_tickets_sold += vip_tickets;
        event.general_tickets_sold += general_tickets;

        await event.save();

         await transporter.sendMail({
            from: `Event Management <${process.env.EMAIL}>`,
            to: req.user.email,
            subject: "Booking Confirmation",
            html: bookingConfirmationTemplate({
                name: req.user.name,
                eventName: event.title,
                bookingId: ticket._id,
                date: event.date,
                time: event.time,
                venue: event.location,
                amount: ticket.amount,
                download_url : `${req.protocol}://${req.host}/bookings/${ticket._id}/download-ticket`
            })
        });

        const io = req.app.get("io");

        io.to(`event_${eventId}`).emit("newBooking", { ticket, room: `event_${eventId}`, message: "A new booking has been made for this event!" });

        res.status(201).json(new ApiResponse(true, ticket, "booking created success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}


export async function cancelBooking(req,res,next) {
    try{
        let bookingId=req.body.bookingId;
        if(!bookingId)
        {
            return res.status(400).json(new ApiResponse(false,null,"booking is not required"));

        }
        let booking=await bookingModel.findOne({_id:boookingId,userId:req.user._id})
        .populate("eventId","_id title date time location");

        if(!booking)
        {
            return res.status(400).json(new ApiResponse("booking not found"));
        }
        if(booking.isCancelled){
            return res.status(400).json(new ApiResponse(false , null, "booking is already cancelled"));
        }
        let eventDate=new Date(booking.eventId.date).getTime();
        let currentDate=new Date().getTime();

        if(eventDate -(24*60*60*100)<currentDate){
          return res.status(400).json(new ApiResponse(false, null, "Cannot cancel booking for past events"));
        }
        booking.isCancelled=true;

        await booking.save();

        await eventModel.findByIdAndUpdate(booking.eventId._id, {
            $inc: {
                vip_tickets_sold: -booking.booked_tickets.vip_tickets,
                general_tickets_sold: -booking.booked_tickets.general_tickets
            }
        });
      res.status(200).json(new ApiResponse(true,booking,"booking cancelled successfully"));
    }catch(error)
    {
        res.staus(500).json(new ApiResponse(false , null,error.message || "internal server error"));
    }
}

export async function getAllBooking(req,res,next) {
    try{
        let page=req.query.page > 0 ? req.query.page:1;
        let limit=req.query.limit<=100 ? req.query.limit:25;
        let skip=page===1 ? 0 :(page-1)*limit;

        let event=await eventModel.findOne({_id:req.params.eventId,createdBy:req.user._id});

        if(!event)
        {
            return res.status(404).json(new ApiResponse(false,null,"event not found"));
        }
        let booking = await bookingModel.find({eventId:req.params.eventId})
        .populate("userId","name email role _id")
        .populate("eventId","_id title date time location")
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1});
       
        let totalBooking=await bookingModel.countDocuments({eventId:req.params.eventId});

        res.status(200).json(new ApiResponse(true,{page,limit,booking,totalBooking},"success"));

    }catch(error)
    {
        res.status(500).json(new ApiResponse(false,null,"inernal server error" || error.message))
    }
}

export async function myBookings(req,res,next) {
    try{
        let page=req.query.page>0 ? req.query.page:1;
        let limit = req.query.limit <= 100 ? req.query.limit:25
        let skip=page === 1 ? 0 :(page-1)*limit;

        let booking=await bookingModel.find({userId:req.user._id})
        .populate("eventId","_id title date time location")
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1})

        let totalBooking=await bookingModel.countDocuments({userId:req.user._id});

        res.status(200).json(new ApiResponse(true,{page,limit,booking,totalBooking},"success"));
    }catch(error)
    {
        res.status(500).json(new ApiResponse(false,null, error.message || "internal server error"))
    }
}

export async function searchBooking(req,res,next) {
    try{
        let bookingId=req.body.bookingId;

        if(!bookingId)
        {
            return res.status(400).json(new ApiResponse(false,null,"booking is required"));
        }
        if(!isValidObjectId(bookingId))
        {
            return res.status(400).json(new ApiResponse(false,null,"booking is valid"));

        }
        let booking=await bookingModel.findOne({_id:bookingId})

        .populate("eventId","_id title date time location")
        .populate("userId","name email role _id");

    if(!booking){
        return res.status(404).json(new ApiResponse(false , null , "booking not found"));
    }

    return res.status(200).json(new ApiResponse(true,booking,"success"));
    }
    catch(error)
    {
        res.status(500).json(new ApiResponse(false,null,error.message || "internal server error"));
    }
}

export async function filterBooking(req,res,next) {
    try{
        let category=req.query.category || "";
        let payment_status=['panding','success','failed'].includes(req.query.payment_status)?req.query.payment_status:"";
        let isRefunded=req.query.refunded==="true";
        let isCancelled=req.query.cancelled==="true";

        let page=req.query.page > 0 ? req.query.page : 1;
        let limit=req.query.limit <= 100 ? req.query.limit:25
        let skip=page === 1 ? 0 :(page-1)*limit;

        let booking=await bookingModel.find({$and :[
            {category},
            {payement_status},
            {isRefunded},
            {isCancelled}
        ]
    }).populate("eventId","_id title date time location")
       .populate("userId","name email role _id")
       .skip(skip)
       .limit(limit)
       .sort({createdAt:-1});

       res.status(200).json(new ApiResponse(true,bookings,"success"));

    }
    catch(error)
    {
        res.status(500).json(new ApiResponse(false,null, error.message || "inernal server error"))
    }

}

export async function downloadTicket(req,res,next) {
    try{
        let {bookingId}=req.params;

        let ticket=await bookingModel.findOne({_id: bookingId})
        .populate("eventId","_id title date time location")
        .populate("userId","name email role _id");

        if(!ticket)
        {
            return res.status(404).json(new ApiResponse(false,null,"ticket not found"));

        }
        let ticketObj={
            eventName:ticket.eventId.title,
            name:ticket.userId.name,
            email:ticket.userId.email,
            ticketId:ticket._id,
            bookingId:ticket._id,
            category:ticket.category,
            date:ticket.eventId.date,
            time:ticket.eventId.time,
            venu:ticket.eventId.location,
            amount:ticket.amount,
            payment_status:ticket.payment_status

        }

        let pdf=await genreateTicketPDF(ticketObj);

        res.set({"content-Type":"application/pdf",
            "content-Disposition":`attachment; filename=ticket-${ticket._id}.pdf`,
            "content-Length":pdf.length,
        });
        res.send(pdf);

    }catch(error)
    {
        res.status(500).json(new ApiResponse(false , null, error.message || "internal server error"));
    }
}