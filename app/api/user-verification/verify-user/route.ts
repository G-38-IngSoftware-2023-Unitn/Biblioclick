import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";

connectDB();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const findUser = User.findById(reqBody._id);
        if(!findUser) {
            throw new Error("User doesn't exist");
        };

        
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