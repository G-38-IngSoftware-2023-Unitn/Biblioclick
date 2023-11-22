import { NextResponse } from "@/node_modules/next/server";
export async function GET(){
    const response = NextResponse.json({
        message: "Logout successful",
    });
    // Remove the cookie
    response.cookies.delete("token");
    return response;
}