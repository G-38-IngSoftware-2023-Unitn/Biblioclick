import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import { NextRequest, NextResponse } from 'next/server';


connectDB();

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

        return NextResponse.json({
            message: "Document added successfully",
            data: newDoc,
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