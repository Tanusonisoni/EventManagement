
import { verifyHash,generatHash } from "../config/bcrypt.js";
import { genreateToken, verifyToken } from "../config/jwt.js";
import { transporter } from "../config/mailTransporter.js";
import userModel from "../models/user.js";
import { ApiResponse } from "../utils/resPattern.js";
import fs from "fs";
import path from "path"
import generateOtp from "../config/otp.js"
export async function authCantroller(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, null, "Email and pass require"))
        }

        let user = await userModel.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json(new ApiResponse(false, null, "user not found"));

        user = user.toObject();

        let match = await verifyHash(password, user.password);

        if (!match) return res.status(401).json(new ApiResponse(false, null, "incprrect password"));

        let accessToken = genreateToken({
            name: user.name,
            id: user._id,
            role: user.role,
            email: user.email
        })

        delete user._v
        delete user.password

        user.accessToken = accessToken;

        res.status(200).json(new ApiResponse(true, user, "success"));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "inernal server error"));
    }

}

export async function adminCantrolller(req,res,next) {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, null, "Email and pass require"))
        }

        let user = await userModel.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json(new ApiResponse(false, null, "user not found"));

         if (user.role !== "admin") {
            return res.status(403).json(
                new ApiResponse(false, null, "Only admin can login")
            );
        }


        user = user.toObject();

        let match = await verifyHash(password, user.password);

        if (!match) return res.status(401).json(new ApiResponse(false, null, "incprrect password"));

        let accessToken = genreateToken({
            name: user.name,
            id: user._id,
            role: user.role,
            email: user.email
        })

        delete user._v
        delete user.password

        user.accessToken = accessToken;

        res.status(200).json(new ApiResponse(true, user, "success"));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "inernal server error"));
    }
 
}
// export async function forgotPassword(req, res, next) {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json(
//                 new ApiResponse(false, null, "Email is required")
//             );
//         }

//         const user = await userModel.findOne({
//             email,
//             isDeleted: false
//         });

//         if (!user) {
//             return res.status(400).json(
//                 new ApiResponse(false, null, "User not found")
//             );
//         }

//         // Send OTP to user's email
//         await transporter.sendMail({
//             from: `Event Management <${process.env.GMAIL}>`,
//             to: user.email,
//             subject: "Reset Password OTP",
//             html: getOTPTemplate(user.name)
//         });

//         // Hash OTP
//         const hashOtp = await generatHash(otp);

//         // Generate token with hashed OTP and user data
//         const token = genreateToken(
//             {
//                 otp: hashOtp,
//                 user: user.toObject()
//             },
//             "10m"
//         );

//         // Store token in cookie
//         res.cookie("xotp", token, {
//             httpOnly: true,
//             secure: false, // localhost ke liye false
//             sameSite: "lax",
//             maxAge: 10 * 60 * 1000
//         });

//         return res.status(200).json(
//             new ApiResponse(
//                 true,
//                 null,
//                 "OTP sent successfully"
//             )
//         );

//     } catch (error) {
//         return res.status(500).json(
//             new ApiResponse(
//                 false,
//                 null,
//                 error.message || "Internal server error"
//             )
//         );
//     }
// }


