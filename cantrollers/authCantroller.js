
import { verifyHash } from "../config/bcrypt.js";
import { genreateToken, verifyToken } from "../config/jwt.js";
import { transporter } from "../config/mailTransporter.js";
import userModel from "../models/user.js";
import { ApiResponse } from "../utils/resPattern.js";
import fs from "fs";
import path from "path"

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

export async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json(
                new ApiResponse(
                    false,
                    null,
                    "Email is required"
                )
            );
        }

        // Find user
        const user = await userModel.findOne({
            email,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    false,
                    null,
                    "User not found"
                )
            );
        }

        // Generate reset token
        // Token ke andar userId save hoga
        const token = genreateToken(
            {
                userId: user._id
            },
            "10m"
        );

        // Reset password page ka URL
        const resetUrl = `http://localhost:5000/reset-password/${token}`;

        // Send email
        await transporter.sendMail({
            from: `Event Management <${process.env.GMAIL_USER}>`,
            to: user.email,
            subject: "Reset Password",

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Reset Password</title>
                </head>

                <body style="
                    margin:0;
                    padding:40px;
                    background:#f4f6f9;
                    font-family:Arial, sans-serif;
                ">

                    <div style="
                        max-width:500px;
                        margin:auto;
                        background:white;
                        padding:40px;
                        border-radius:12px;
                        text-align:center;
                    ">

                        <h2 style="color:#4F46E5;">
                            Hello ${user.name}
                        </h2>

                        <p>
                            You requested to reset your password.
                        </p>

                        <p>
                            Click the button below to create a new password.
                        </p>

                        <a
                            href="${resetUrl}"
                            style="
                                display:inline-block;
                                background:#4F46E5;
                                color:white;
                                padding:14px 30px;
                                text-decoration:none;
                                border-radius:6px;
                                font-weight:bold;
                            "
                        >
                            Reset Password
                        </a>

                        <p style="color:#777;">
                            This link will expire in 10 minutes.
                        </p>

                    </div>

                </body>
                </html>
            `
        });

        return res.status(200).json(
            new ApiResponse(
                true,
                null,
                "Password reset link sent to email"
            )
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(
                false,
                null,
                error.message || "Internal server error"
            )
        );
    }
}

export async function resetPassword(req, res, next) {
    try {
        const { token } = req.params;

        // User email se reset link open karega
        if (req.method === "GET") {
            const html = resetPasswordTemplate({
                token
            });

            return res.send(html);
        }

        // User form submit karega
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json(
                new ApiResponse(
                    false,
                    null,
                    "Password is required"
                )
            );
        }

        if (password !== confirmPassword) {
            return res.status(400).json(
                new ApiResponse(
                    false,
                    null,
                    "Password does not match"
                )
            );
        }

        // Token verify
        const decodeToken = verifyToken(token);

        if (!decodeToken) {
            return res.status(403).json(
                new ApiResponse(
                    false,
                    null,
                    "Token expired or invalid"
                )
            );
        }

        // Tumne token mein userId save kiya hai
        const userId = decodeToken.userId;

        // User find
        const userExists = await userModel.findById(userId);

        if (!userExists) {
            return res.status(404).json(
                new ApiResponse(
                    false,
                    null,
                    "Invalid user"
                )
            );
        }

        // Password hash
        const hash = await generatHash(password);

        // Password update
        userExists.password = hash;

        await userExists.save();

        return res.status(200).json(
            new ApiResponse(
                true,
                null,
                "Password reset successfully"
            )
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(
                false,
                null,
                error.message || "Internal Server Error"
            )
        );
    }
}