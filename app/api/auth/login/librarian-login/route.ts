import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Librarian from "@/app/models/librarianModel";

connectDB();

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
            expiresIn: "24h",
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

