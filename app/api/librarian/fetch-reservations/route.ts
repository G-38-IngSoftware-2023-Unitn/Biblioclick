import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import Reservations from "@/app/models/reservationModel";
import DocCopies from "@/app/models/documentCopiesModel";
import documentModel from "@/app/models/documentModel";
import mongoose from "mongoose";

connectDB();

/**
 *  @swagger
 *  /api/librarian/fetch-reservations:
 *    get:
 *      security:
 *          - LibrarianTokenAuth: []
 *      tags:
 *        - librarian
 *      summary: Fetch all reservations
 *      description: Returns all reservations saved on the database and their information, if librarian login token is present
 *      responses:
 *        200:
 *          description: Succesfully returns an array of reservations
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          documentCopyId:
 *                              type: string
 *                          userId:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                              format: date-time
 *                          reservationStatus:
 *                              type: boolean
 *                          loanStatus:
 *                              type: boolean
 *                          isLoanable:
 *                              type: boolean
 *                          documentId:
 *                              type: string
 *                          title:
 *                              type: string
 *                          author:
 *                              type: string
 *                          publisher:
 *                              type: string
 *                          publication_date:
 *                              type: string
 *                              format: date-time
 *        400:
 *          description: Database errors
 *        
 * 
 */

export async function GET(request: NextRequest) {
    try {
        if (!request.cookies.get("librarianToken")?.value) {
            throw new Error("Not logged in as librarian");
        }

        const bugFix = await documentModel.findOne({}).exec();

        const reservations = await Reservations.find({})
        .select("-createdAt -updatedAt -__v").exec();

        const reserv = Object.values(reservations);

        const returnResult = await Promise.all(reserv.map(async (element) => {
            const documentInfo = await DocCopies.findById(element?.documentCopyId)
            .populate("documentId", "-createdAt -updatedAt -__v -description -genre -ISBN")
            .select("-createdAt -updatedAt -__v").exec();

            const documentId = documentInfo?.documentId?._id;

            const docInf = documentInfo?.documentId.toObject();
            delete docInf._id;

            const docInfo = {
                documentId: documentId,
                ...docInf
            }

            const docCopy = documentInfo.toObject();
            delete docCopy?.documentId;
            delete docCopy?._id;

            return {...element.toObject(),...docCopy, ...docInfo};
        }));

        return NextResponse.json({
            data: returnResult,
        });

    } catch (error: any) {
        const response = NextResponse.json({
            message: error.message,
        }, {
            status: 400,
        });

        //if not a database error assume it's a token error

    return response;
  }
}