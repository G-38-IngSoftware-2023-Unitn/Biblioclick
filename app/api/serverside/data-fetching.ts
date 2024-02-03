import { connectDB } from "@/configs/dbConfig";
import DocInformation from "@/app/models/documentModel";
import DocCopy from "@/app/models/documentCopiesModel";
import mongoose from "mongoose";
import { aggregateFieldEqual } from "firebase/firestore";

connectDB();

interface documentCopy {
  documentId: string,
  reservationStatus: boolean,
  loanStatus: boolean,
  isLoanable: boolean,
}

export async function fetchDocumentsSimple(query: string, currentPage: number, ippg: number) {
    try {
      const queryMongoose = DocInformation.find({ $text: { $search: query}},
        {score: {$meta: 'textScore'}})
        .sort({ score: { $meta: 'textScore'}})
        .skip(ippg * (currentPage - 1))
        .limit(ippg);
        
      const result = await queryMongoose.exec();
      if(result.length == 0) return;

      const resultIds = result.map((document) => {return document.id});

      const aggr = await DocCopy.aggregate([
        {
          $match: {documentId: { $in: resultIds}}
        },
        {
          $group: {
            _id: "$documentId",
            reservedDocuments: {
              $sum: {
                $cond: [
                  "$reservationStatus",
                  1,
                  0
                ]
              }
            },
            loanedDocuments: {
              $sum: {
                $cond: [
                  "$loanStatus",
                  1,
                  0
                ]
              }
            },
            loanable: {
              $sum: {
                $cond: [
                  "$isLoanable",
                  1,
                  0
                ]
              }
            },
          }
        }
        
      ]);

      const returnValue = result.map((document) => {
        const second = aggr.find((docCopy) => docCopy._id === document.id);
        delete second._id;
        return {...document.toObject(), ...second};
      });

      return returnValue;

    } catch (error: any) {
      console.log("Database error", error);
      throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchDocumentById(id: string) {
  try {
    const query = DocInformation.findById(id).select("-_id -createdAt -updatedAt -__v");
    const document = await query.exec();

    const aggr = await DocCopy.aggregate([
      {
        $match: {documentId: id}
      },
      {
        $group: {
          _id: "$documentId",
          reservedDocuments: {
            $sum: {
              $cond: [
                "$reservationStatus",
                1,
                0
              ]
            }
          },
          loanedDocuments: {
            $sum: {
              $cond: [
                "$loanStatus",
                1,
                0
              ]
            }
          },
          loanable: {
            $sum: {
              $cond: [
                "$isLoanable",
                1,
                0
              ]
            }
          },
        }
      }
      
    ]);

    return {...document.toObject(), ...aggr[0]};

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