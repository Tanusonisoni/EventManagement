import { Router } from 'express';
import authMiddleware from "../middlewares/authMiddleware.js"
import { deleteUser, getAllUsers, registerUser, updateUser ,changePassword,uploadImage} from '../cantrollers/userCantroller.js';
import allowRoles from '../middlewares/allowRoles.js';
import { userUpload } from '../config/multer.js';

// get all users

// const router=Router();

const router = Router();

 router.post("/register",registerUser);

 router.get("/",authMiddleware,allowRoles("admin"),getAllUsers);

 router.patch("/",authMiddleware,allowRoles("admin","user"),updateUser);

 router.delete("/",authMiddleware,allowRoles("user"),deleteUser);

router.patch("/change-password",authMiddleware,allowRoles("admin","user"),changePassword);

// router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

// router.patch("/", authMiddleware,allowRoles("admin","user"), updateUser);

// router.delete("/", authMiddleware,allowRoles("user"), deleteUser);

// router.patch("/change-password", authMiddleware,allowRoles("user","admin"), changePassword);

 router.patch("/upload-image", authMiddleware,allowRoles("user","admin"),userUpload.single("image"), uploadImage);

 export default router;
