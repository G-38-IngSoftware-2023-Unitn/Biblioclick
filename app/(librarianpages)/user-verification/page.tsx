"use client"
import { Button, Form, message } from "antd";
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import axios from "axios";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import User from "@/app/models/userModel";

interface userSearch {
    email: string;
}

interface userType {
    name: string;
    surname: string;
    codiceFiscale: string;
    dateOfBirth: Date;
    email: string;
    createdAt: Date;
    isVerified: boolean;
    isActive: boolean;
}

export default function userVerification() {

    const [userData, setUserData] = useState<userType>();

    const [dataComponent, setDataComponent] = useState<ReactNode>();

    useEffect(() => {
        if(userData){
            setDataComponent(
                <div>
                    <p> {userData?.name} </p>
                    <p> {userData?.surname} </p>
                    <p> {userData?.codiceFiscale} </p>
                    <p> {JSON.stringify(userData?.dateOfBirth)} </p>
                    <p> {userData?.email} </p>
                    <p> {JSON.stringify(userData?.createdAt)} </p>
                    <p> {JSON.stringify(userData?.isVerified)} </p>
                    <p> {JSON.stringify(userData?.isActive)} </p>
                    <Button>
                        Verify (doesn't do anything just yet)
                    </Button>
                </div>
            )
        }
    }, [userData])

    const searchByEmail = async (values: userSearch) => {
        
        try{
        await axios.post("/api/user-verification", values).then((response) => {
            setUserData(response.data.data);
        });
        message.success("Search successful");
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    }

    return (

        <main>

        <Form layout="vertical" onFinish={searchByEmail}> 

            <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input the email to verify")}>
                <input type='email' />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="text-black">
                Search
            </Button>

        </Form>

        {dataComponent}

        </main>
    )

}