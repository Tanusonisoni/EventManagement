import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { cancelEvent, deleteEvent, eventImagesUpload, eventThumbnailUpload, filterEvents, getAllEvent, getEventById, myEvents, registerEvent, searchEvents, updateEvent } from "../cantrollers/eventCantroller.js";
import allowRoles from "../middlewares/allowRoles.js";
import {eventUpload} from "../config/multer.js"

const router=Router();


router.get("/",getAllEvent);

router.get("/search",searchEvents);

router.get("/filter",filterEvents);

// Admin routes
router.get("/admin",authMiddleware,allowRoles("admin"),myEvents);
router.post("/admin",authMiddleware,allowRoles("admin"),registerEvent);
router.patch("/admin/:EventId",authMiddleware,allowRoles("admin"),updateEvent);
router.delete("/admin/:EventId",authMiddleware,allowRoles("admin"),deleteEvent);

router.get("/:EventId", getEventById);

router.patch("/admin/cancel/:EventId",cancelEvent);

router.patch("/admin/upload_thumbnail/:EventId",eventUpload.single("thumbnail"), eventThumbnailUpload);

router.patch("/admin/upload_images/:EventId",eventUpload.array("images",5),eventImagesUpload)



export default router;