/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
axios.defaults.baseURL = "http://localhost:3000";
import gatewaysHandler from '@/app/(userpages)/stufftest';

describe("testing stuff", () => {
    
    function mockRequestResponse(method: RequestMethod = 'GET') {
        const {
            req,
            res,
        }: {
            req: NextApiRequest, res: NextApiResponse
        } = createMocks({ method });

        return {req, res};
    }

    it('should return status 200', async () => {
        const {req, res} = mockRequestResponse('DELETE');

        await gatewaysHandler(req, res);

        expect(res.statusCode).toBe(200);

        // expect(resp.status).toBe(200);

    });





});