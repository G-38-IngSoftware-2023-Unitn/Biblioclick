import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mongoose from "mongoose";
import Reservations from "@/app/models/reservationModel";
import Loans from "@/app/models/loansModel";
import DocCopies from "@/app/models/documentCopiesModel";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);

        const reservations = await Reservations.find({userId: userId})
        .select("-createdAt -updatedAt -__v").exec();

        const loans = await Loans.find({userId: userId})
        .select("-createdAt -updatedAt -__v").exec();

        const mergedValues = Object.values({...reservations, ...loans});

        const returnResult = await Promise.all(mergedValues.map(async (element) => {
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
        if (!(error instanceof mongoose.Error)){
            response.cookies.delete("token");
            response.cookies.set("isLoggedIn", "false");
        }

    return response;
  }
}