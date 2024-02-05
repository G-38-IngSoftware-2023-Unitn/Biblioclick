import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import Librarian from "@/app/models/librarianModel";


connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        //check if the user already exists
        const userExists = await Librarian.findOne({ username: reqBody.username });
        if (userExists) {
            throw new Error("User already exists");
        }

        // create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;
        const newUser = new Librarian(reqBody);

        await newUser.save();

        return NextResponse.json({
            message: "Librarian created successfully",
            data: newUser,
        })

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );

    }
}