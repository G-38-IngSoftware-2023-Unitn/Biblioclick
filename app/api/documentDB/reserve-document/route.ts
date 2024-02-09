import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import DocCopy from "@/app/models/documentCopiesModel";
import { NextRequest, NextResponse } from 'next/server';
import { validateJWT } from "@/app/helpers/validateJWT";
import Reservation from "@/app/models/reservationModel";
import mongoose from "mongoose";


connectDB();

/**
 * @swagger
 *  /api/documentDB/reserve-document:
 *      post:
 *          security:
 *              - UserTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Reserves document
 *          description: If logged in as a user, creates new reservation and adds it to the database. Furthermore modifies documentCopy information
 *          requestBody:
 *              description: Document Id
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              documentId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Successfully added new reservation
 *              400:
 *                  description: Token not provided, document not available, or failed operation
 */

export async function POST(request: NextRequest) {
    try {
        
        const userId = await validateJWT(request);
        const reqBody = await request.json();

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