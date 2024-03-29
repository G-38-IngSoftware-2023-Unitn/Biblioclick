'use client';
import React from "react";
import { getAntdFieldRequiredRule } from "@/app/helpers/validation";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "@/node_modules/next/navigation";
import axios from "@/node_modules/axios/index";

interface userType {
    email: string;
    password: string;
}


function LibrarianLogin() {
    const [loading, setLoading] = React.useState(false);

    //console.log('Before useRouter');
    const router = useRouter();
    //console.log('After useRouter', router);
            
    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            await axios.post("/api/auth/login/librarian-login", values);
            message.success("Login successful");
            router.push("/user-verification");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
            <Form className='w-[500px] gap-5 items-center' layout='vertical' onFinish={onLogin}>
                <Form.Item name="username" label="Librarian username" rules={getAntdFieldRequiredRule("Please input your username!")}>
                <Input/> 
                </Form.Item>

                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password!")}>
                    <input type="password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={loading} className="text-black">
                Login
                </Button>
            </Form>
    )
}
export default LibrarianLogin