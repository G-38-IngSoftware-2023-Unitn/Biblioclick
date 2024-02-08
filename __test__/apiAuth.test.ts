/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import jwt from "jsonwebtoken";
import Password from 'antd/es/input/Password';
import gatewaysHandler from './gatewaysHandler';
axios.defaults.baseURL = "http://localhost:3000";

describe('first test', () => {

    function mockRequestResponse(method: RequestMethod = 'GET') {
        const {
            req,
            res,
        }: {
            req: NextApiRequest, res: NextApiResponse
        } = createMocks({ method });

        req.headers = {
            'content-type': 'application/json',
          };

        return {req, res};
    }

    const userData = {
        _id:"65b459485cb533882222ef98",
        name:"Giacomo",
        surname:"Lanzo",
        codiceFiscale:"fdffsddf466fdfsd",
        dateOfBirth:"2004-03-24T00:00:00.000Z",
        email:"mail@gmail.com",
        isVerified:true,
        password: "mail",
        isActive:true
    }

    it("Login with correct credentials", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/user-login";

        req.body = {
            email: userData.email,
            password: userData.password
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'Login successful' });
    });

    it("Login with incorrect password", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/user-login";

        req.body = {
            email: userData.email,
            password: "incorrect password"
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'Invalid credentials' });
    });

    it("Login with non existant user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/user-login";

        req.body = {
            email: "non existant user",
            password: "incorrect password"
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'User does not exist' });
    });

    it("currentuser with correct token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign(userData._id, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);

    });

    it("currentuser with correct token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign(userData._id, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);

    });

})