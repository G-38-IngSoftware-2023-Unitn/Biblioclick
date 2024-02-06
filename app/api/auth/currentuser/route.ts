import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";
import { TokenExpiredError } from "jsonwebtoken";
connectDB();


interface Params {
    userid: string;
}

/**
 *  @swagger
 *  /api/auth/currentuser:
 *    get:
 *      security:
 *          - UserTokenAuth: []
 *      tags:
 *        - auth
 *      summary: Get current user
 *      description: Returns the current user based on the jwt token saved in the cookies
 *      responses:
 *        200:
 *          description: Succesfully returns current user information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
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
 *        400:
 *          description: Token missing or user doesn't exist
 *        
 * 
 */


export async function GET(request: NextRequest) {
    try {
      const userId = await validateJWT(request);
      // retrieve the user without the password
      const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");
      return NextResponse.json({
        data: user,
      });
    } catch (error: any) {
      const response = NextResponse.json({
        message: error.message,
      }, {
        status: 400,
      });
      response.cookies.delete("token");
      response.cookies.set("isLoggedIn", "false");
      
    return response;
  }
}