import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import { NextRequest, NextResponse } from 'next/server';

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