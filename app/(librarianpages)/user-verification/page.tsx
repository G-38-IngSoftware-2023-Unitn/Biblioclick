"use client"
import { Button, Form, message } from "antd";
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import axios from "axios";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import User from "@/app/models/userModel";
import UserInputEdit from "@/app/ui/userVerification/userInputEdit";
import { error } from "console";
import { ObjectId } from "mongodb";

interface userSearch {
    email: string;
}

interface userType {
    _id: ObjectId;
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

    const onVerify = async (values: userType) => {
        axios.patch("/api/user-verification/verify-user", values).then((response) => {
            console.log(response.data);
        }).catch(error => {
            message.error(error.response.data.message);
        })
    }

    useEffect(() => {
        if(userData){
            setDataComponent(
                <Form layout='vertical' onFinish={onVerify}> 
                    <UserInputEdit name="email" label="Email" value={userData?.email}/>
                    <UserInputEdit value={userData?.name} name="name" label="Name"/>
                    <UserInputEdit value={userData?.surname} name="surname" label="Surname"/>
                    <UserInputEdit value={userData?.codiceFiscale} name="codiceFiscale" label="Codice Fiscale"/>
                    <p> Date of Birth: {JSON.stringify(userData?.dateOfBirth)} </p>
                    <p> Created at: {JSON.stringify(userData?.createdAt)} </p>
                    <p> Verified: {JSON.stringify(userData?.isVerified)} </p>
                    <p> Active: {JSON.stringify(userData?.isActive)} </p>
                    <input type="hidden" name="_id" value={JSON.stringify(userData?._id)}/>
                    <Button htmlType="submit">
                        Verify (doesn't do anything just yet)
                    </Button>
                </Form>
            )
        }
    }, [userData])

    const searchByEmail = async (values: userSearch) => {
        
        try{
        await axios.post("/api/user-verification/search-user", values).then((response) => {
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