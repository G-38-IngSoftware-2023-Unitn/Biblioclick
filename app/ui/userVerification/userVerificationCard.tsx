//"use client"
import { Button, DatePicker, Form, Input, Space, message } from "antd";
import axios from "axios";
import UserInputEdit from "@/app/ui/userVerification/userInputEdit";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

interface userType {
    _id: ObjectId;
    email: string;
    name: string;
    surname: string;
    codiceFiscale: string;
    dateOfBirth: Date;
    createdAt: Date;
    isVerified: boolean;
    isActive: boolean;
}

interface userMiniType {
    _id: ObjectId;
    email: string;
}

export default function UserVerificationCard(props: any) {

    const onVerify = async (values: userType) => {
        try {
            await axios.post("/api/user-verification/verify-user", values).then((response) => {
                console.log(response.data);
            })
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    }

    return (
        <Form layout='vertical' onFinish={onVerify}>
            <Form.Item name="_id" className="hidden" initialValue={props.userData?._id}></Form.Item>
            <UserInputEdit name="email" label="Email" value={props.userData?.email} />
            <UserInputEdit value={props.userData?.name} name="name" label="Name" />
            <UserInputEdit value={props.userData?.surname} name="surname" label="Surname" />
            <UserInputEdit value={props.userData?.codiceFiscale} type="codFisc" name="codiceFiscale" label="Codice Fiscale" />
            <UserInputEdit value={JSON.stringify(props.userData?.dateOfBirth).substring(1, 11)} name="dateOfBirth"
                label="Date of Birth" type="date" />
            <p> Created at: {JSON.stringify(props.userData?.createdAt)} </p>
            <p> Verified: {JSON.stringify(props.userData?.isVerified)} </p>
            <p> Active: {JSON.stringify(props.userData?.isActive)} </p>
            <Button type="primary" htmlType="submit" block className="text-black">
                Verify
            </Button>
        </Form>
    )
}