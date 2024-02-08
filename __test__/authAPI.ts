import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export async function thingy(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {

    const mockUser = {email: "mail@gmail.com", password: "mail"};
        
    try {
        const response: AxiosResponse = await axios.post('/api/auth/login/user-login', mockUser);
        res.status(200);
    }catch (err) {
        res.status(400);
    }

}