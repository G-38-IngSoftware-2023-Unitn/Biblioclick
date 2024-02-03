import { NextRequest } from "@/node_modules/next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";



export const validateJWT = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("No token provided");
        }
        
        // decode the token
        const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
        return decryptedToken.id;

    } catch (error: any) {
        throw error;
    }
};