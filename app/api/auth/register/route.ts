import { connectDB } from "@/configs/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import Librarian from "@/app/models/librarianModel";


connectDB();

/**
 * @swagger
 *  /api/auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: Register new user
 *          description: Verifies inserted information and adds it to the database
 *          requestBody:
 *              description: User information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                              - name
 *                              - surname
 *                              - codiceFiscale
 *                              - dateOfBirth
 *                          properties:
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
 *                  description: Succesful registration
 *              400:
 *                  description: User already exists, or failed registration
 */

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        //check if the user already exists
        const userExists = await User.findOne({ email: reqBody.email });
        if (userExists) {
            throw new Error("User already exists");
        }

        // create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;
        const newUser = new User(reqBody);

        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
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