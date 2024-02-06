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
 *  /api/documentDB/end-loan:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Ends loan
 *          description: If logged in as a librarian, ends reservation based on loanId
 *          requestBody:
 *              description: Document Id
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              loanId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Successfully cancelled reservation
 *              400:
 *                  description: Token not provided, loan not available, or failed operation
 */

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const loan = await Loans.findById(reqBody?.loanId)
        .select("documentCopyId").exec();
        if (!loan) {
            throw new MongooseError("Failed to fetch loan");
        }

        const docCopy = await DocCopies.findById(loan?.documentCopyId).exec();
        if (!docCopy) {
            throw new MongooseError("Failed to fetch document copy");
        }
        docCopy.loanStatus = false;
        docCopy.save();

        await Loans.deleteOne({_id: reqBody?.loanId});

        return NextResponse.json({
            message: "Loan successfully ended",
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