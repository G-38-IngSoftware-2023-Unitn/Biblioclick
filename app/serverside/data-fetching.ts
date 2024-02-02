import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from "mongoose";

connectDB();

export async function fetchDocumentsSimple(query: string, currentPage: number, ippg: number) {
    try {
        const queryMongoose = DocInformation.find({ $text: { $search: query}},
          {score: {$meta: 'textScore'}})
          .sort({ score: { $meta: 'textScore'}})
          .skip(ippg * (currentPage - 1))
          .limit(ippg);

        const result = await queryMongoose.exec();

        return result;

    } catch (error: any) {
      console.log("Database error", error);
      throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchDocumentById(id: string) {
  try {
    const query = DocInformation.findById(id).select("-_id -createdAt -updatedAt -__v");
    const result = await query.exec();
    console.log(result);
    return result;

  } catch (error: any) {
    console.log("Database error", error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchDocumentsAmount(query: string) {
    try {
        const queryMongoose = DocInformation.find({ $text: { $search: query}},
          {score: {$meta: 'textScore'}})
          .sort({ score: { $meta: 'textScore'}}).countDocuments();

        const result = await queryMongoose.exec();

        return result;

    } catch (error: any) {
      console.log("Database error", error);
      throw new Error('Failed to fetch invoices.');
    }
}

// FOLLOWED USELESS TUTORIAL THIS WASN'T EVEN NEEDED
// export async function getAllIds() {
//   try {
//     const queryMongoose = DocInformation.find().select("_id");

//     const result = await queryMongoose.exec();

//     const thing = result.map((element) => (
//         {
//           params: {
//             id: element._id.toString()
//           }
//         }
//     ));

//     return thing;

// } catch (error: any) {
//   console.log("Database error", error);
//   throw new Error('Failed to fetch invoices.');
// }
// }