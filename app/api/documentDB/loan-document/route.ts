import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mongoose, { MongooseError } from "mongoose";
import Reservations from "@/app/models/reservationModel";
import Loans from "@/app/models/loansModel";
import DocCopies from "@/app/models/documentCopiesModel";

connectDB();

/**
 * @swagger
 *  /api/documentDB/loan-document:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Confirms a reservation into a loan
 *          description: If logged in as a librarian, confirms a reservation and changes it into a loan
 *          requestBody:
 *              description: Document Id
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              reservationId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Confirmed loan
 *              400:
 *                  description: Reservation not found, document already loaned, or failed operation
 */

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const reserv = await Reservations.findById(reqBody?.reservationId).exec();
        if (!reserv) {
            throw new MongooseError("Failed to fetch reservation");
        }

        const loanExists = await Loans.findOne({documentCopyId: reserv.documentCopyId});
        if (loanExists) {
            throw new MongooseError("Loan already present");
        }

        const loan = new Loans({
                documentCopyId: reserv.documentCopyId,
                userId: reserv.userId,
                startDate: Date.now(),
        });

        await loan.save();

        const docCopy = await DocCopies.findById(reserv?.documentCopyId).exec();
        docCopy.reservationStatus = false;
        docCopy.loanStatus = true;

        await docCopy.save();

        await Reservations.deleteOne({_id: reserv?._id});

        return NextResponse.json({
            message: "Succesfully loaned",
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