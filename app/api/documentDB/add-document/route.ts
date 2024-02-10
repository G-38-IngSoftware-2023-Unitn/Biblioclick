import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import documentCopiesModel from "@/app/models/documentCopiesModel";
import { NextRequest, NextResponse } from 'next/server';

connectDB();

/**
 * @swagger
 *  /api/documentDB/add-document:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Add new document and creates one copy
 *          description: If logged in as admin, creates new document and adds it to the database, subsequently creates a copy and adds it as well
 *          requestBody:
 *              description: Document information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ISBN:
 *                                  type: integer
 *                                  example: 8854180785
 *                              documentId:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              author:
 *                                  type: string
 *                              publisher:
 *                                  type: string
 *                              genre:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              publication_date:
 *                                  type: string
 *                                  format: date-time
 *          responses:
 *              200:
 *                  description: Successfully added new document
 *              400:
 *                  description: Document with same ISBN already exists, or failed operation
 */

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        //check if the document already exists
        const docExists = await DocInformation.findOne({ ISBN: reqBody.ISBN });
        if (docExists) {
            throw new Error("Document with same ISBN already exists");
        }

        // create new user
        const newDoc = new DocInformation(reqBody);

        await newDoc.save();

        const newDocCopy = new documentCopiesModel({
            documentId: newDoc._id,
            reservationStatus: false,
            loanStatus: false,
            isLoanable: true,
        });

        await newDocCopy.save();

        return NextResponse.json({
            message: "Document added successfully",
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