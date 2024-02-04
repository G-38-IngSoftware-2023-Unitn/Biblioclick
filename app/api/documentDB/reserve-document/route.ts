import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import DocCopy from "@/app/models/documentCopiesModel";
import { NextRequest, NextResponse } from 'next/server';
import { validateJWT } from "@/app/helpers/validateJWT";
import Reservation from "@/app/models/reservationModel";
import mongoose from "mongoose";


connectDB();

export async function POST(request: NextRequest) {
    try {
        
        const userId = await validateJWT(request);
        const reqBody = await request.json();

        console.log("reqbody", reqBody);

        const availableCopy = await DocCopy.findOne(
            {documentId: new mongoose.Types.ObjectId(reqBody?.documentId),
            loanStatus: false,
            reservationStatus: false,
            isLoanable: true}).exec();
        
        if (!availableCopy) {
            throw new Error("No available documents exist");
        }

        const newReservation = new Reservation(
            {
                documentCopyId: availableCopy.id,
                userId: userId,
                startDate: Date.now()
            }
        );

        availableCopy.reservationStatus = true;
        
        await availableCopy.save()

        await newReservation.save();

        return NextResponse.json({
            message: "reservation made succesfully",
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