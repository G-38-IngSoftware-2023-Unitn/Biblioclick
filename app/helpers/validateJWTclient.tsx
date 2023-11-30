import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export async function validateJWTclient () {
    try {
        const token = cookies().get("token")?.value || "";
        if (!token) {
            return false;
        }
        
        // decode the token
        const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
        return true;
    } catch (error: any) {
        return false;
    }
}