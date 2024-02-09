/**
 * @jest-environment node
 */
import axios from 'axios';
import jwt from "jsonwebtoken";
import { gatewaysHandler, mockRequestResponse } from '../__test__/testingSupportFunctions';
import mongoose from 'mongoose';
import User from "@/app/models/userModel";
import { connectDB } from '@/configs/dbConfig';

axios.defaults.baseURL = "http://localhost:3000";

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {

    // delete all testing users
    await User.deleteOne({email: "test1@gmail.com"}).exec();

    await mongoose.connection.close();

});

describe("'/api/documentDB/add-document' testing", () => {



});