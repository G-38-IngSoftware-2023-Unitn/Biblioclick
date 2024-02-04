import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";
import { TokenExpiredError } from "jsonwebtoken";
import mongoose from "mongoose";
import Reservations from "@/app/models/reservationModel";
import Loans from "@/app/models/loansModel";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);

        const query1 = Reservations.find({userId: userId})
        .populate("documentCopyId", "-createdAt -updatedAt -__v")
        .select("-createdAt -updatedAt -__v");

        const query2 = Loans.find({userId: userId})
        .populate("documentCopyId", "-createdAt -updatedAt -__v")
        .select("-createdAt -updatedAt -__v");

        const res1 = await query1.exec();
        const res2 = await query2.exec();

        const resMerged = {...res1, ...res2};
        console.log("merged", Object.values(resMerged));

        return NextResponse.json({
            data: resMerged,
        });
    } catch (error: any) {
        const response = NextResponse.json({
            message: error.message,
        }, {
            status: 400,
        });

        //if not a database error assume it's a token error
        if (!(error instanceof mongoose.Error)){
            response.cookies.delete("token");
            response.cookies.set("isLoggedIn", "false");
        }

    return response;
  }
}