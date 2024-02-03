import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import User from "@/app/models/userModel";
import { TokenExpiredError } from "jsonwebtoken";
connectDB();


interface Params {
    userid: string;
}

export async function GET(request: NextRequest) {
    try {
      const userId = await validateJWT(request);
      // retrieve the user without the password
      const user = await User.findById(userId).select("-password");
      return NextResponse.json({
        data: user,
      });
    } catch (error: any) {
      console.log(error.type);
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