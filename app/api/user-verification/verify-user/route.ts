import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";
import { ObjectId } from "mongoose";

connectDB();

interface userType {
    _id: ObjectId;
    name: string;
    surname: string;
    codiceFiscale: string;
    dateOfBirth: Date;
    email: string;
    createdAt: Date;
    isVerified: boolean;
    isActive: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        console.log(request);

        const findUser = await User.findById(reqBody._id);
        if(!findUser) {
            throw new Error("User doesn't exist");
        };

        if(reqBody.name) findUser.data.name = reqBody.name;

        return NextResponse.json({
            data: findUser,
        });
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