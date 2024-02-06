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
 *  /api/documentDB/cancel-reservation:
 *      post:
 *          security:
 *              - UserTokenAuth: []
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Cancel reservation
 *          description: If logged in as a user or as a librarian, cancel reservation based on reservationId
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
 *                  description: Successfully cancelled reservation
 *              400:
 *                  description: Token not provided, reservation not available, or failed operation
 */

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const reserv = await Reservations.findById(reqBody?.reservationId)
        .select("documentCopyId").exec();
        if (!reserv) {
            throw new MongooseError("Failed to fetch reservation");
        }

        const docCopy = await DocCopies.findById(reserv?.documentCopyId).exec();
        if (!docCopy) {
            throw new MongooseError("Failed to fetch document copy");
        }
        docCopy.reservationStatus = false;
        docCopy.save();

        await Reservations.deleteOne({_id: reserv?._id});

        return NextResponse.json({
            message: "Succesfully deleted",
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