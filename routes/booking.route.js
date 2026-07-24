import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/allowRoles.js";
import { eventUpload } from "../config/multer.js";
import { bookTicket, cancelBooking, downloadTicket, 
    filterBooking, 
    getAllBooking,
    myBookings, searchBooking }
      from "../cantrollers/bookingcantroller.js";

const router=Router();

router.get("/:bookingId/download-ticket",downloadTicket);
router.use(authMiddleware);

//admin rouyte
router.use("/admin",allowRoles("admin"));

router.get("/admin/bookings/:eventId",getAllBooking);

router.get("/admin/search",searchBooking);

router.get("/admin/filter",filterBooking);

router.use("/user",allowRoles("user"));

router.get("/user",myBookings);

router.post("/user",bookTicket);

router.patch("/user/booking-cancel",cancelBooking)

export default router;