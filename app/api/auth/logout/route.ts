import { NextResponse } from "@/node_modules/next/server";
export async function GET(){

    try{

    const response = NextResponse.json({
        message: "Logout successful",
    });
    // Remove the cookie
    response.cookies.delete("token");
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