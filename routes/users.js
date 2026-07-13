import { Router } from 'express';
const router = Router();
import { deleteUser, getAllUsers, registerUser, updateUser } from '../controllers/userCantroller.js';

// get all users
 router.post("/", registerUser);

 router.get("/",getAllUsers);

 router.patch("/",updateUser);

 router.delete("/",deleteUser);


// router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

// router.patch("/", authMiddleware,allowRoles("admin","user"), updateUser);

// router.delete("/", authMiddleware,allowRoles("user"), deleteUser);

// router.patch("/change-password", authMiddleware,allowRoles("user","admin"), changePassword);

// // router.patch("/upload-image", authMiddleware,allowRoles("user","admin"),userUpload.single("image"), uploadImage);

 export default router;
