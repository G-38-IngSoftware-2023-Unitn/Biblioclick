"use client"
import { Button, Form, message } from "antd";
import axios from "axios";
import UserInputEdit from "@/app/ui/userVerification/userInputEdit";
import { ObjectId } from "mongodb";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "@/node_modules/next/navigation";

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

function AccountInformation() {

    const [userData, setUserData] = useState<userType>();

    const [dataComponent, setDataComponent] = useState<ReactElement>();

    const router = useRouter();

    const onModify = async (values: userType) => {
        try {
            //console.log(values);
            await axios.post("/api/account/information", values);
            router.push("/account/information");
            location.reload();
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (userData) {
            setDataComponent(
            <Form layout='vertical' onFinish={onModify}>
                <Form.Item name="_id" className="hidden" initialValue={userData?._id}></Form.Item>
                <UserInputEdit name="email" label="Email" value={userData?.email} />
                <UserInputEdit value={userData?.name} name="name" label="Name" />
                <UserInputEdit value={userData?.surname} name="surname" label="Surname" />
                <UserInputEdit value={userData?.codiceFiscale} type="codFisc" name="codiceFiscale" label="Codice Fiscale" />
                <UserInputEdit value={JSON.stringify(userData?.dateOfBirth)?.substring(1, 11)} name="dateOfBirth"
                    label="Date of Birth" type="date" />
                <Button type="primary" htmlType="submit" block className="text-black">
                    Modify
                </Button>
            </Form>
            )
        }
    }, [userData])

    async function fetchUserData() {
        try {
            await axios.get("/api/auth/currentuser").then((response) => {
                setUserData(response.data.data);
            });
        } catch (error: any) {
            console.log("it's here");
            location.reload();
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    

    return (
        <div>{dataComponent}</div>
    )
}
export default AccountInformation

