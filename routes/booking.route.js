import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import allowRoles from "../middlewares/allowRoles";
import { eventUpload } from "../config/multer";
import { bookTicket, cancelBooking, downloadTicket, filterBooking, getAllBooking, myBooking, myBookings, searchBooking } from "../cantrollers/bookingcantroller";

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