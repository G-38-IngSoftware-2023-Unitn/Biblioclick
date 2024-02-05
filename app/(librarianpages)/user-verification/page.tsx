"use client"
import { Button, Form, Input, Space, message } from "antd";
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import axios from "axios";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import UserVerificationCard from "@/app/ui/userVerification/userVerificationCard";
import { EditOutlined } from "@ant-design/icons";

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

export default function UserVerification() {

    const [userData, setUserData] = useState<userType>();

    const [dataComponent, setDataComponent] = useState<ReactElement>();

    useEffect(() => {
        if (userData) {
            setDataComponent(
                <UserVerificationCard userData={userData} />
            )
        }
    }, [userData])

    const searchByEmail = async (values: userSearch) => {

        try {
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
                    <Input type='email' />
                </Form.Item>

                <Button type="primary" htmlType="submit" block className="text-black">
                    Search
                </Button>

            </Form>

            {dataComponent}

        </main>
    )

}