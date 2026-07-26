import express from "express";
import { authCantroller } from "../cantrollers/authCantroller.js";
import { registerUser } from "../cantrollers/userCantroller.js";
import { forgotPassword, resetPassword } from "../cantrollers/authCantroller.js";

const router = express.Router();

//login request
// router.post("/register",registerUser)
router.post("/login", authCantroller);
router.get(
    "/reset-password/:token",
    resetPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);
export default router;