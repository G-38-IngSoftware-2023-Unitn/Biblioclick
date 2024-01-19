//"use client"
import { Button, Form, Input, Space, message } from "antd";
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

    const [inputDisabled, setInputDisabled] = useState(true);

    const editButton = (
        <Button className="float-right" icon={<EditOutlined/>} onClick={() => {
            setInputDisabled(!inputDisabled);
        }}>
        </Button>
    )

    const onVerify = async (values: userMiniType) => {
        try {
            console.log(props.userData?._id);
            await axios.post("/api/user-verification/verify-user", values).then((response) => {
                console.log(response.data);
            })
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    }

    return (
        <Form layout='vertical' onFinish={onVerify}> 
            <Form.Item name="_id" className="hidden"><input type="hidden" value={props.userData?._id}/></Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: !inputDisabled }]}>
                <Space.Compact>
                <Input defaultValue={props.userData?.email} disabled={inputDisabled} type="text" /> {editButton}
                </Space.Compact>
            </Form.Item>
            <p> Date of Birth: {JSON.stringify(props.userData?.dateOfBirth)} </p>
            <p> Created at: {JSON.stringify(props.userData?.createdAt)} </p>
            <p> Verified: {JSON.stringify(props.userData?.isVerified)} </p>
            <p> Active: {JSON.stringify(props.userData?.isActive)} </p>
            <Button type="primary" htmlType="submit" block className="text-black">
                Verify (doesn't do anything just yet)
            </Button>
        </Form>
    )

    return (
        <Form layout='vertical' onFinish={onVerify}> 
            <Form.Item name="_id" className="hidden"><input type="hidden" value={props.userData?._id}/></Form.Item>
            <UserInputEdit name="email" label="Email" value={props.userData?.email}/>
            <UserInputEdit value={props.userData?.name} name="name" label="Name"/>
            <UserInputEdit value={props.userData?.surname} name="surname" label="Surname"/>
            <UserInputEdit value={props.userData?.codiceFiscale} name="codiceFiscale" label="Codice Fiscale"/>
            <p> Date of Birth: {JSON.stringify(props.userData?.dateOfBirth)} </p>
            <p> Created at: {JSON.stringify(props.userData?.createdAt)} </p>
            <p> Verified: {JSON.stringify(props.userData?.isVerified)} </p>
            <p> Active: {JSON.stringify(props.userData?.isActive)} </p>
            <Button type="primary" htmlType="submit" block className="text-black">
                Verify (doesn't do anything just yet)
            </Button>
        </Form>
    )
}