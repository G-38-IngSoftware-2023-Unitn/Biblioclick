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

        const findUser = await User.findById(reqBody._id);
        if(!findUser) {
            throw new Error("User doesn't exist");
        };

        if(reqBody.name) findUser.name = reqBody.name;
        if(reqBody.surname) findUser.surname = reqBody.surname;
        if(reqBody.codiceFiscale) findUser.codiceFiscale = reqBody.codiceFiscale;
        if(reqBody.dateOfBirth) findUser.dateOfBirth = reqBody.dateOfBirth;
        if(reqBody.email) findUser.email = reqBody.email;
        findUser.isActive = true;
        findUser.isVerified = true;

        console.log("findUser");
        console.log(findUser);

        await findUser.save();
        
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