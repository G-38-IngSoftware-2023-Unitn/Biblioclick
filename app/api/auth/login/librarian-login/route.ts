import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Librarian from "@/app/models/librarianModel";

connectDB();

/**
 * @swagger
 *  /api/auth/login/librarian-login:
 *      post:
 *          tags:
 *              - auth
 *          summary: Librarian Log In
 *          description: Verifies librarian credentials and creates verification token to save to cookies
 *          requestBody:
 *              description: Credentials
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - username
 *                              - password
 *                          properties:
 *                              username:
 *                                  type: string
 *                              password: 
 *                                  type: string
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
        const librarian = await Librarian.findOne({ username: reqBody.username });
        if (!librarian) {
            throw new Error("User does not exist");
        }

        const passwordMatch = await bcrypt.compare(reqBody.password, librarian.password);
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        // create token
        const token = jwt.sign({ id: librarian._id }, process.env.jwt_secret!, {
            expiresIn: "14h",
        });

        const response = NextResponse.json({
            message: "Login successful",
        });
        response.cookies.set("librarianToken", token, {
            httpOnly: true,
            path: "/",
        });

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

