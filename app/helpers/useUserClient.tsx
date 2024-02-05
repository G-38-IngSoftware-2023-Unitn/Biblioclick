import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

export default function useUserClient() {

    const [token, setToken] = useState<boolean>();
    useEffect(() => {
        setToken(Cookies.get('isLoggedIn')==="true" ? true : false);
    }, []);

    return token;
    
    // try {
    //     const token = Cookies.get("token") || "";
    //     if (!token) {
    //         return false;
    //     }

    //     const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
    //     return true;
    // } catch (error: any) {
    //     return false;
    // }
}