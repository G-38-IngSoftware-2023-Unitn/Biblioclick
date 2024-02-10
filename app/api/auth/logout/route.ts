import { NextResponse } from "@/node_modules/next/server";

/**
 *  @swagger
 *  /api/auth/logout:
 *    delete:
 *      tags:
 *        - auth
 *      summary: Logs out user
 *      description: Logs out the user and deletes the cookies associated to them
 *      responses:
 *        200:
 *          description: Logs out the user
 *        400:
 *          description: Signals any error
 *        
 * 
 */

export async function DELETE(){

    try{

    const response = NextResponse.json({
        message: "Logout successful",
    });
    // Remove the cookie
    response.cookies.delete("token");
    response.cookies.delete("librarianToken");
    response.cookies.set("isLoggedIn", "false");
    
    return response;
    }catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 400 }
        );
    }


}