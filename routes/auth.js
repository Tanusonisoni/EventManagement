import express from "express";
import { authCantroller } from "../cantrollers/authCantroller.js";
import { registerUser } from "../cantrollers/userCantroller.js";

const router = express.Router();

//login request
// router.post("/register",registerUser)
router.post("/login",authCantroller);

export default router;