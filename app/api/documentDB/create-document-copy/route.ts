import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import { NextRequest, NextResponse } from 'next/server';
import DocCopy from "@/app/models/documentCopiesModel";
import mongoose, { Schema } from "mongoose";

interface documentCopy {
    documentId: string,
    reservationStatus: boolean,
    loanStatus: boolean,
    isLoanable: boolean,
}

connectDB();

/**
 * @swagger
 *  /api/documentDB/create-document-copy:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - documentDB
 *          summary: Creates copy of document
 *          description:  If logged in as admin, creates copy of provided document
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
 *                  description: Successfully added new document copy
 *              400:
 *                  description: Token not provided, document not available, or failed operation
 */

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        //check if the document already exists
        const docExists = await DocInformation.findById(reqBody.documentId);
        if (!docExists) {
            throw new Error("Document doesn't exist");
        }

        // create new user
        const newDoc = new DocCopy({
            documentId: docExists._id,
            reservationStatus: false,
            loanStatus: false,
            isLoanable: true,
        });

        await newDoc.save();

        return NextResponse.json({
            message: "Document copy successfully",
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