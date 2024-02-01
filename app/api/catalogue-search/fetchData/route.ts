import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
    try {
        console.log("arrivo a qua");
        console.log(request);

        const reqBody = await request.json();


        const searchResult = DocInformation.find({ $text: { $search: reqBody?.search}},
          {score: {$meta: 'textScore'}})
          .sort({ score: { $meta: 'textScore'}})
          .skip(reqBody?.ippg * (reqBody?.pages - 1))
          .limit(reqBody?.ippg)
        .then(posts => {
          console.log(posts);
        })
        .catch(err => {
          console.error(err);
        });

      return NextResponse.json({
        message: "Search done",
        data: searchResult,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
  }, {
          status: 400,
        }
  ); }
}