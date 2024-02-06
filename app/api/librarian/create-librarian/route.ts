import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import Librarian from "@/app/models/librarianModel";
import Password from "antd/es/input/Password";


connectDB();

/**
 * @swagger
 *  /api/librarian/create-librarian:
 *      post:
 *          security:
 *              - LibrarianTokenAuth: []
 *          tags:
 *              - librarian
 *          summary: Register new librarian
 *          description: If logged in as admin, creates new librarian and adds it to the database
 *          requestBody:
 *              description: User information
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - username
 *                              - password
 *                              - isAdmin
 *                          properties:
 *                              username:
 *                                  type: string
 *                              password: 
 *                                  type: string
 *                              isAdmin:
 *                                  type: boolean
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
        const librarianExists = await Librarian.findOne({ username: reqBody.username });
        if (librarianExists) {
            throw new Error("User already exists");
        }

        // create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        const newLibrarian = new Librarian({
            username: reqBody?.username,
            password: hashedPassword,
            isAdmin: reqBody?.isAdmin
        });

        await newLibrarian.save();

        return NextResponse.json({
            message: "Librarian created successfully",
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