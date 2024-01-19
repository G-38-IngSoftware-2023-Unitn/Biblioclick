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

interface userMiniType {
    _id: string;
}

export default function userVerification() {
//test 
    const onVerify = async (values: userMiniType) => {
        try {
            console.log(values);
            await axios.post("/api/user-verification/verify-user", values).then((response) => {
                console.log(response.data);
            })
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    }

    //end test


    
    const [userData, setUserData] = useState<userType>();

    const [dataComponent, setDataComponent] = useState<boolean>();

    useEffect(() => {
        if(userData){ 
            setDataComponent(true);
            // setDataComponent(
            //     <UserVerificationCard userData={userData}/>
            // )
            // setDataComponent (
            //     <Form key={2} layout='vertical' onFinish={onVerify}> 
            //         <Form.Item name="_id" className="hidden"><input type="hidden" value={JSON.stringify(userData?._id)}/></Form.Item>
            //         <Button type="primary" htmlType="submit" block className="text-black">
            //             Verify (doesn't do anything just yet)
            //         </Button>
            //     </Form>
            // )
        }
    }, [userData])

    const searchByEmail = async (values: userSearch) => {
        
        try{
            console.log(values);
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

        <Form key={1} layout="vertical" onFinish={searchByEmail}> 

            <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input the email to verify")}>
                <Input type='email' />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="text-black">
                Search
            </Button>

        </Form>


         
        <Form key={2} layout='vertical' onFinish={onVerify}> 
                <Form.Item name="_id" className="hidden"><input type="hidden" value="fiuhuih"/></Form.Item>
                <Form.Item name="email" label="Email">
                <Input defaultValue="fds" disabled type="text" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block className="text-black">
                    Verify (doesn't do anything just yet)
                </Button>
        </Form>

        </main>
    )

}