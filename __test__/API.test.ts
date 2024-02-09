/**
 * @jest-environment node
 */
import axios from 'axios';
import jwt from "jsonwebtoken";
import { gatewaysHandler, mockRequestResponse } from './testingSupportFunctions';
import mongoose from 'mongoose';
import User from "@/app/models/userModel";
import { connectDB } from '@/configs/dbConfig';
import documentModel from '@/app/models/documentModel';
import documentCopiesModel from '@/app/models/documentCopiesModel';
import reservationModel from '@/app/models/reservationModel';
import loansModel from '@/app/models/loansModel';

axios.defaults.baseURL = "http://localhost:3000";

interface user {
    _id?: string,
    name: string,
    surname: string,
    codiceFiscale:string,
    dateOfBirth:string,
    email:string,
    isVerified?:boolean,
    password: string,
    isActive?:boolean
}

const userData : user = {
    name:"Marco",
    surname:"Rossi",
    codiceFiscale:"fdffsddf466fdfaa",
    dateOfBirth:"2012-03-24T00:00:00.000Z",
    email:"test1@mail.com",
    password: "test",
    isVerified: false,
    isActive: false
}

const librarianCredentials = {
    _id:"65c0dc780b55f3bdcbf9f234",
    username:"admin1",
    password:"HhM15wjBql9N!k!U",
    "isAdmin":true,
}

const newDocument = {
    _id: '',
    title: 'Compleanno di sangue',
    ISBN: 9788830461468,
    author: 'James Patterson e Maxine Paetro',
    publication_date: '2024-03-24T00:00:00.000Z',
    genre: 'fiction',
    description: "Sono le 17.30 di un anonimo lunedì quando una donna in preda al panico fa irruzione nell'ufficio di Cindy Thomas, giornalista investigativa del San Francisco Chronicle, supplicandola di indagare sulla scomparsa di sua figlia Tara e della nipotina Lorrie. La donna non ha alcun dubbio: accusa il marito della figlia, un uomo violento, non solo di averle fatte sparire ma addirittura di averle uccise. Ma non ha prove che possano dimostrarne la colpevolezza. La disperazione della donna convince Cindy a passare il caso all'amica Lindsay Boxer, sergente della polizia di San Francisco. Agli occhi di Lindsay, la vicenda appare in un primo momento come un tragico episodio di violenza domestica, e anche i suoi sospetti ricadono sul marito. Eppure, qualcosa non torna... L'uomo nega con ostinazione qualsiasi coinvolgimento, e racconta agli investigatori un'altra storia: sua moglie era una donna ribelle e inquieta, che in passato era scappata altre volte. Che si tratti anche adesso di una sparizione volontaria? Nella mente di Lindsay si insinua il dubbio che la vicenda sia ben più complessa, e il ritrovamento del corpo della piccola Lorrie non fa che accelerare gli eventi. Il caso assume dimensioni sempre più ampie e le donne del Club Omicidi dovranno unire le forze per districare un'inquietante ragnatela di bugie.",
    publisher: 'Longanesi',
}

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {

    // delete all testing elements
    await loansModel.deleteMany({userId: userData._id}).exec();

    await reservationModel.deleteMany({userId: userData._id}).exec();

    await documentCopiesModel.deleteMany({documentId: newDocument._id}).exec();

    await documentModel.deleteOne({_id: newDocument._id}).exec();

    await User.deleteOne({email: userData.email}).exec();

    //close DB connection
    await mongoose.connection.close();

});

describe("'/api/auth/register' testing", () => {
    
    it("with new user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/register";

        req.body = {
            name: userData.name,
            surname: userData.surname,
            codiceFiscale: userData.codiceFiscale,
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            password: userData.password,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'User created successfully' });
    });

    it("with duplicate key error", async () => {

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

    it("with incomplete information", async () => {

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
    
    it("with existing user", async () => {

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

});

describe("'/api/auth/login/user-login' testing", () => {

    it("with correct credentials", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/auth/login/user-login";

        req.body = {
            email: userData.email,
            password: userData.password
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'Login successful' });

        await User.findOne({email: userData.email}).then((value:user) => {
            userData._id = value._id?.toString();
        });

    });

    it("with incorrect password", async () => {

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

    it("with non existant user", async () => {

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

});

describe("'/api/auth/logout' testing", () => {

    it("success", async () => {

        const {req, res} = mockRequestResponse("DELETE");
        
        req.url="/api/auth/logout";
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({message: 'Logout successful'});
    });
});

describe("'/api/auth/currentuser' testing", () => {

    it("with correct token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: userData._id}, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);

        const resBody = (res as any)._getJSONData().data;

        // expect(resBody._id).toEqual(userData._id);
        expect(resBody.name).toEqual(userData.name);
        expect(resBody.surname).toEqual(userData.surname);
        expect(resBody.codiceFiscale).toEqual(userData.codiceFiscale);
        expect(resBody.dateOfBirth).toEqual(userData.dateOfBirth);
        expect(resBody.email).toEqual(userData.email);
        expect(resBody.isVerified).toEqual(userData.isVerified);
        expect(resBody.isActive).toEqual(userData.isActive);
    });

    it("with incorrect token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: "65b459485cb532582222ef98"}, process.env.jwt_secret!);

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({message: "user doesn't exist"});
    });

    it("with expired token", async () => {

        const {req, res} = mockRequestResponse("GET");

        const token: string = jwt.sign({id: "wrong userId"}, process.env.jwt_secret!, {expiresIn: '-10'});

        req.url="/api/auth/currentuser";

        req.headers.cookie = `token=${token}`;
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({message: 'jwt expired'});
    });
});

describe("'/api/auth/login/librarian-login' testing", () => {

    it("with correct credentials", async () => {

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

    it("with incorrect password", async () => {

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

    it("with non existant user", async () => {

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
});

describe("'/api/user-verification/' testing", () => {

    it("'/search-user' with unverified user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/user-verification/search-user";

        req.body = {
            email: userData.email,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ data: {
            _id: userData._id,
            codiceFiscale: userData.codiceFiscale,
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            isActive: userData.isActive,
            isVerified: userData.isVerified,
            name: userData.name,
            surname: userData.surname,
          } });

    });

    it("'/verify-user' with unverified user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/user-verification/verify-user";

        req.body = {
            _id: userData._id,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "User succesfully verified" });

    });

    it("with already verified user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/user-verification/search-user";

        req.body = {
            email: userData.email,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "User is already verified" });

    });

    it("with non existant user", async () => {

        const {req, res} = mockRequestResponse("POST");

        req.url="/api/user-verification/search-user";

        req.body = {
            email: "userData.email",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "User doesn't exist" });

    });

});

describe("'/api/account/information/modify' testing", () => {

    it("with existing user", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/account/information/modify";

        req.body = {
            _id: userData._id,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: 'user info modified successfully' });
    });

    it("with non existing user", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/account/information/modify";

        req.body = {
            _id: "65b459485cb533882222ef95",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "User doesn't exist" });
    });

});

describe("'/api/documentDB/add-document' testing", () => {

    it("with new document", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/add-document";

        req.body = {
            title: newDocument.title,
            ISBN: newDocument.ISBN,
            author: newDocument.author,
            publication_date: newDocument.publication_date,
            genre: newDocument.genre,
            description: newDocument.description,
            publisher: newDocument.publisher,
        }
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "Document added successfully" });

        await documentModel.findOne({ISBN: newDocument.ISBN}).then((value) => {
            newDocument._id = value.id;
        });
    });

    it("with existing document", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/add-document";

        req.body = {
            title: newDocument.title,
            ISBN: newDocument.ISBN,
            author: newDocument.author,
            publication_date: newDocument.publication_date,
            genre: newDocument.genre,
            description: newDocument.description,
            publisher: newDocument.publisher,
        }
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "Document with same ISBN already exists" });
    });

});

describe("'/api/documentDB/create-document-copy' testing", () => {

    it("with document inside collection", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/create-document-copy";

        req.body = {
            documentId: newDocument._id,
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "Document copy successfully" });
        
        //make two copies, one for cancel-reservation testing and another for loan testing
        await gatewaysHandler(req, res);
    });

    it("with document not existing in collection", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/create-document-copy";

        req.body = {
            documentId: "65b997620706773e6a3f31aa",
        };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "Document doesn't exist" });
    });

});

describe("'/api/documentDB/reserve-document' testing", () => {

    it("with available document", async () => {
        const {req, res} = mockRequestResponse("POST");

        const token: string = jwt.sign({id: userData._id}, process.env.jwt_secret!);

        req.headers.cookie = `token=${token}`;

        req.url="/api/documentDB/reserve-document";

        req.body = { documentId: newDocument._id };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "reservation made succesfully" });

        //make two reservations, one for cancel-reservation testing and another for loan testing
        await gatewaysHandler(req, res);
    });

    it("with unavailable document", async () => {
        const {req, res} = mockRequestResponse("POST");

        const token: string = jwt.sign({id: userData._id}, process.env.jwt_secret!);

        req.headers.cookie = `token=${token}`;

        req.url="/api/documentDB/reserve-document";

        req.body = { documentId: newDocument._id };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "No available documents exist" });
    });

});

describe("'/api/documentDB/cancel-reservation' testing", () => {

    var resId: string;

    it("with existing reservation", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/cancel-reservation";

        const reservationId = await reservationModel.findOne({userId: userData._id});

        resId = reservationId;

        req.body = { reservationId: reservationId };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "Succesfully deleted" });
    });

    it("with already deleted reservation", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/cancel-reservation";

        req.body = { reservationId: resId };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "Failed to fetch reservation" });
    });


});

describe("'/api/documentDB/loan-document' testing", () => {

    it("with existing reservation", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/loan-document";

        const reservationId = await reservationModel.findOne({userId: userData._id});

        req.body = { reservationId: reservationId };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "Succesfully loaned" });
    });

    it("with non existent reservation", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/loan-document";

        req.body = { reservationId: "65c0dc780b55f3bdcbf9f234" };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "Failed to fetch reservation" });
    });


});

describe("'/api/documentDB/end-loan' testing", () => {

    var loId: string;

    it("with existing loan", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/end-loan";

        const loanId = await loansModel.findOne({userId: userData._id});

        loId = loanId;

        req.body = { loanId: loanId };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(200);
        expect((res as any)._getJSONData()).toEqual({ message: "Loan successfully ended" });
    });

    it("with already ended loan", async () => {
        const {req, res} = mockRequestResponse("POST");

        req.url="/api/documentDB/end-loan";

        req.body = { loanId: loId };
        
        await gatewaysHandler(req, res);
        expect(res.statusCode).toBe(400);
        expect((res as any)._getJSONData()).toEqual({ message: "Failed to fetch loan" });
    });


});