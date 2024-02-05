import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import Reservations from "@/app/models/reservationModel";
import Loans from "@/app/models/loansModel";
import DocCopies from "@/app/models/documentCopiesModel";
import documentModel from "@/app/models/documentModel";
import mongoose from "mongoose";

connectDB();

export async function GET(request: NextRequest) {
    try {
        if (!request.cookies.get("librarianToken")) {
            throw new Error("Not logged in as librarian");
        }

        const loans = await Loans.find({})
        .select("-createdAt -updatedAt -__v").exec();

        const loan = Object.values(loans);

        const returnResult = await Promise.all(loan.map(async (element) => {
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