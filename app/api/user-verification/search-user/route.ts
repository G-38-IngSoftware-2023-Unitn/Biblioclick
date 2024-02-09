import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";

connectDB();

/**
 *  @swagger
 *  /api/user-verification/search-user:
 *    post:
 *      security:
 *          - LibrarianTokenAuth: []
 *      tags:
 *        - user-verification
 *      summary: Search user based on inputted email
 *      description: Returns the user searched for by email, if librarian login token is present
 *      requestBody:
 *              description: Credentials
 *              content:
 *                  application/json:
 *                      schema:
 *                          required:
 *                              - email
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *      responses:
 *        200:
 *          description: Succesfully returns the requested user information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: 65b459485cb533882222ef98
 *                  name:
 *                    type: string
 *                    example: Giada
 *                  surname:
 *                    type: string
 *                    example: Danti
 *                  codiceFiscale:
 *                    type: string
 *                    example: DNTCRL65S67M126L
 *                  dateOfBirth:
 *                    type: string
 *                    format: date-time
 *                  email:
 *                    type: string
 *                    example: danti.giada@gmail.com
 *                  isVerified:
 *                    type: boolean
 *                  isActive:
 *                    type: boolean
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *        400:
 *          description: Librarian token missing or user doesn't exist
 *        
 * 
 */

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
    
        //find user
        const findUser = await User.findOne({ email: reqBody.email }).select("-password -__v -updatedAt -createdAt");
        if (!findUser) {
            throw new Error("User doesn't exist");
        }

        if (findUser.isVerified) {
            throw new Error("User is already verified");
        }

        return NextResponse.json({
            data: findUser,
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