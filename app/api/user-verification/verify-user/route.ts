import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";
import { ObjectId } from "mongoose";

connectDB();

/**
 * @swagger
 *  /api/user-verification/verify-user:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - user-verification
 *          summary: Modify user information
 *          description: Modifies user information based on provided input, if librarian login token is present
 *          requestBody:
 *              description: User information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - _id
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password: 
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              surname:
 *                                  type: string
 *                              codiceFiscale:
 *                                  type: string
 *                              dateOfBirth:
 *                                  type: string
 *                                  format: date-time
 *          responses:
 *              200:
 *                  description: Successfully verified user
 *              400:
 *                  description: User doesn't exist
 */

interface userType {
    _id: ObjectId;
    name: string;
    surname: string;
    codiceFiscale: string;
    dateOfBirth: Date;
    email: string;
    createdAt: Date;
    isVerified: boolean;
    isActive: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        //console.log(reqBody);

        const findUser = await User.findById(reqBody._id).select("-password");
        if(!findUser) {
            throw new Error("User doesn't exist");
        };

        if(reqBody.name) findUser.name = reqBody.name;
        if(reqBody.surname) findUser.surname = reqBody.surname;
        if(reqBody.codiceFiscale) findUser.codiceFiscale = reqBody.codiceFiscale;
        if(reqBody.dateOfBirth) findUser.dateOfBirth = reqBody.dateOfBirth;
        if(reqBody.email) findUser.email = reqBody.email;
        findUser.isActive = true;
        findUser.isVerified = true;

        //console.log("findUser");
        //console.log(findUser);

        await findUser.save();
        
        return NextResponse.json({
            message: "User succesfully verified"
        });
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