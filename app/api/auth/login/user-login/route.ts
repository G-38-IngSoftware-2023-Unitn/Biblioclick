import { connectDB } from "@/configs/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

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

        let isLibrarian = false;

        if (request.cookies.get("librarianToken")) {
            isLibrarian = true;
        }

        const response = NextResponse.json({
            message: (isLibrarian) ? "Login successful" : "Removed librarian access, login successful",
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

