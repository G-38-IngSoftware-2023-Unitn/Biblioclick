/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import gatewaysHandler from '@/app/(userpages)/stufftest';
axios.defaults.baseURL = "http://localhost:3000";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';
import { thingy } from './authAPI';

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

    it("testing login response", async () => {

        const {req, res} = mockRequestResponse("POST");
        
        await thingy(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("testing currentuser response", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign("65b459485cb533882222ef98", process.env.jwt_secret!);

        const headers = {
            'content-type': 'application/json',
            'cookie': `token=${token}`,
        }
        
        try {
            
            await axios.get('/api/auth/currentuser', { headers: headers }).then((response) => {
                expect(response.status).toBe(200);
            });
        }catch (err) {
            // console.log(err);
            throw err;
        }
    });

    it("testing currentuser response", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token = jwt.sign({userId: "65b459485cb533882222ef98"}, process.env.jwt_secret!, {expiresIn: '-5'});

        const headers = {
            'content-type': 'application/json',
            'cookie': `token=${token}`,
        }
        
        try {
            
            await axios.get('/api/auth/currentuser', { headers: headers }).then((response) => {
                expect(response.status).toBe(400);
            });
        }catch (err: any) {
            expect(err.status).toBe(400);
            throw err;
        }
    });

    // it("testing logout response", async () => {
    //     const { req, res } = mockRequestResponse();

    //     await gatewaysHandler(req, res);

    //     expect(res.statusCode).toBe(200);

    // });


})