/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import jwt from "jsonwebtoken";
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

    it("'/auth/login/user-login' with correct credentials", async () => {

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

    it("'/auth/login/user-login' with incorrect password", async () => {

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

    it("'/auth/login/user-login' with non existant user", async () => {

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

    it("'/auth/currentuser' with correct token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: userData._id}, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);

        const resBody = (res as any)._getJSONData().data;
        expect(resBody._id.toString()).toEqual(userData._id);
        expect(resBody.name).toEqual(userData.name);
        expect(resBody.surname).toEqual(userData.surname);
        expect(resBody.codiceFiscale).toEqual(userData.codiceFiscale);
        expect(resBody.dateOfBirth).toEqual(userData.dateOfBirth);
        expect(resBody.email).toEqual(userData.email);
        expect(resBody.isVerified).toEqual(userData.isVerified);
        expect(resBody.isActive).toEqual(userData.isActive);
    });

    it("'/auth/currentuser' with incorrect token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: "65b459485cb532582222ef98"}, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({message: "user doesn't exist"});
    });

    it("'/auth/currentuser' with expired token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: "wrong userId"}, process.env.jwt_secret!, {expiresIn: '-10'});

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({message: 'jwt expired'});
    });

})