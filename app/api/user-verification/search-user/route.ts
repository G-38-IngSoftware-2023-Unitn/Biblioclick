import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
    
        //find user
        const findUser = await User.findOne({ email: reqBody.email }).select("-password -__v -updatedAt");
        if (!findUser) {
            throw new Error("User doesn't exist");
        }

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