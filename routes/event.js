import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { cancelEvent, deleteEvent, eventImagesUpload, eventThumbnailUpload, filterEvents, getAllEvent, myEvents, registerEvent, searchEvents, updateEvent } from "../cantrollers/eventCantroller.js";
import allowRoles from "../middlewares/allowRoles.js";
import {eventUpload} from "../config/multer.js"

const router=Router();


router.get("/",getAllEvent);

router.get("/search",searchEvents);

router.get("/filter",filterEvents);


//admin route
router.post("/admin",authMiddleware,allowRoles("admin"));

router.get("/admin",myEvents);


router.post("/admin",registerEvent);
router.patch("/admin/:EventId",updateEvent);
router.delete("/admin/:EventId",deleteEvent);

router.patch("/admin/cancel/:EventId",cancelEvent);

router.patch("/admin/upload_thumbnail/:EventId",eventUpload.single("thumbnail"), eventThumbnailUpload);

router.patch("/admin/upload_images/:EventId",eventUpload.array("images",5),eventImagesUpload)



export default router;