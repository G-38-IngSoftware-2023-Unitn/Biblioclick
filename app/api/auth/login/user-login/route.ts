import { connectDB } from "@/configs/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

/**
 * @swagger
 *  /api/auth/login/user-login:
 *      post:
 *          tags:
 *              - auth
 *          summary: User Log In
 *          description: Verifies user credentials and creates verification token to save to cookies
 *          requestBody:
 *              description: Credentials
 *              content:
 *                  application/json:
 *                      schema:
 *                          required:
 *                              - email
 *                              - password
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password: 
 *                                  type: string
 *                              remember:
 *                                  type: boolean
 *          responses:
 *              200:
 *                  description: Succesful login
 *              400:
 *                  description: Failed login
 */


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        // check if user exists in database or not
        const user = await User.findOne({ email: reqBody.email });
        if (!user) {
            throw new Error("User does not exist");
        }

        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        // create token
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, {
            //if remember isn't checked, the token will works for only 30m
            expiresIn: (reqBody.remember === true) ? "7d" : "30m",
        });

        const response = NextResponse.json({
            message: "Login successful"
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });
        response.cookies.set("isLoggedIn", "true", {
            httpOnly: false,
            path: "/",
        });
        response.cookies.delete("librarianToken");

        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 400 }
        );
    }
}

