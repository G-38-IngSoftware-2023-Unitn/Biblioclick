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


describe('first test', () => {

    beforeAll(async () => {
        connectDB();
    });
    
    afterAll(async () => {

    // delete all testing users (in this case used for mock registration)
    await User.deleteOne({email: "test1@gmail.com"}).exec();

    await mongoose.connection.close();

    });

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

    const librarianCredentials = {
        _id:"65c0dc780b55f3bdcbf9f234",
        username:"admin1",
        password:"HhM15wjBql9N!k!U",
        "isAdmin":true,
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

    it("'/auth/logout' test", async () => {

        const {req, res} = mockRequestResponse("DELETE");
        
        req.url="/api/auth/logout";
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({message: 'Logout successful'});
    });

    it("'/auth/login/librarian-login' with correct credentials", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/librarian-login";

        req.body = {
            username: librarianCredentials.username,
            password: librarianCredentials.password
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'Login successful' });
    });

    it("'/auth/login/librarian-login' with incorrect password", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/librarian-login";

        req.body = {
            username: librarianCredentials.username,
            password: "incorrect password"
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'Invalid credentials' });
    });

    it("'/auth/login/librarian-login' with non existant user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/librarian-login";

        req.body = {
            username: "non existant user",
            password: "incorrect password"
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'User does not exist' });
    });

    it("'/auth/register' with new user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/register";

        req.body = {
            name:"Marco",
            surname:"Rossi",
            codiceFiscale:"fdffsddf466fdfaa",
            dateOfBirth:"2004-03-24T00:00:00.000Z",
            email:"test1@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'User created successfully' });
    });

    it("'/auth/register' with duplicate key error", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/register";

        req.body = {
            name:"Marco",
            surname:"Rossi",
            codiceFiscale:"fdffsddf466fdfsd",
            dateOfBirth:"2004-03-24T00:00:00.000Z",
            email:"test3@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'E11000 duplicate key error collection: test.users index: codiceFiscale_1 dup key: { codiceFiscale: \"fdffsddf466fdfsd\" }' });
    });

    it("'/auth/register' with incomplete information", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/register";

        req.body = {
            email:"test2@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual(
            { message: 'users validation failed: dateOfBirth: Path `dateOfBirth` is required., codiceFiscale: Path `codiceFiscale` is required., surname: Path `surname` is required., name: Path `name` is required.' });
    });
    

    it("'/auth/register' with existing user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/register";

        req.body = {
            name:"Giacomo",
            surname:"Lanzo",
            codiceFiscale:"fdffsddf466fdfsd",
            email:"mail@gmail.com",
            password: "mail",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: 'User already exists' });
    });

})