/**
 * @jest-environment node
 */
import axios from 'axios';
import jwt from "jsonwebtoken";
import { gatewaysHandler, mockRequestResponse } from './testingSupportFunctions';
import mongoose from 'mongoose';
import User from "@/app/models/userModel";
import { connectDB } from '@/configs/dbConfig';

axios.defaults.baseURL = "http://localhost:3000";


beforeAll(async () => {
    connectDB();
});

afterAll(async () => {

    // delete all testing users

    await mongoose.connection.close();

});

describe("'/api/account' testing", () => {

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

    it("with existing user", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/account/information/modify";

        req.body = {
            _id:"65b459485cb533882222ef98",
            name:"Giacomo",
            surname:"Lanzo",
            codiceFiscale:"fdffsddf466fdfsd",
            dateOfBirth:"2004-03-24T00:00:00.000Z",
            email:"mail@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'user info modified successfully' });
    });

    it("with non existing user", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/account/information/modify";

        req.body = {
            _id:"65b459485cb53386a222ef98",
            name:"Giacomo",
            surname:"Lanzo",
            codiceFiscale:"fdffsddf466fdfsd",
            dateOfBirth:"2004-03-24T00:00:00.000Z",
            email:"mail@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "User doesn't exist" });
    });

});

describe("'/api/account' testing", () => {

    const userId = {
        _id:"65b459485cb533882222ef98",
    }

    const results = [
        {
          _id: '65c1425c782f42f62ae7b8ab',
          documentCopyId: '65c11b523b04bfca8e63f8af',
          userId: '65b459485cb533882222ef98',
          startDate: '2024-02-05T20:17:32.596Z',
          reservationStatus: true,
          loanStatus: false,
          isLoanable: true,
          documentId: '65c11b3b3b04bfca8e63f8ac',
          title: 'Iron flame',
          author: 'Rebecca Yarros',
          publication_date: '2024-01-01T00:00:00.000Z',
          publisher: 'Sperling & Kupfer'
        },
        {
          _id: '65c14260782f42f62ae7b8b8',
          documentCopyId: '65bee11c09fa8b926cbbb1d1',
          userId: '65b459485cb533882222ef98',
          startDate: '2024-02-05T20:17:36.280Z',
          reservationStatus: true,
          loanStatus: false,
          isLoanable: true,
          documentId: '65b998430706773e6a3f31a3',
          title: 'Le cronache di Narnia',
          author: 'C.S. Lewis',
          publication_date: '2008-09-14T00:00:00.000Z',
          publisher: 'Mondadori'
        },
        {
          _id: '65c14263782f42f62ae7b8c3',
          documentCopyId: '65bee0e809fa8b926cbbb1c5',
          userId: '65b459485cb533882222ef98',
          startDate: '2024-02-05T20:17:39.404Z',
          reservationStatus: true,
          loanStatus: false,
          isLoanable: true,
          documentId: '65b997620706773e6a3f31a0',
          title: 'I viaggi di Gulliver',
          author: 'Jonathan Swift',
          publication_date: '2014-06-04T00:00:00.000Z',
          publisher: 'Feltrinelli'
        }
      ]

    it("with correct token", async () => {

        const {req, res} = mockRequestResponse("GET");
        
        const token: string = jwt.sign({id: userId._id}, process.env.jwt_secret!);

        req.url="/api/account/loans-reservations";

        req.headers.cookie = `token=${token}`;

        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ data: results });
    });

    it("with expired token", async () => {

        const {req, res} = mockRequestResponse("GET");
        
        const token: string = jwt.sign({id: userId._id}, process.env.jwt_secret!, {expiresIn: "-5"});

        req.url="/api/account/loans-reservations";

        req.headers.cookie = `token=${token}`;

        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "jwt expired" });
    });


})