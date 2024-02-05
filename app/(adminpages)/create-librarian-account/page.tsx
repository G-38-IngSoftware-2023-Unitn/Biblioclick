'use client';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import { Button, Checkbox, Form, message } from 'antd';
import React from 'react'
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

interface librarian {
    username: string,
    password: string,
    isAdmin: boolean,
}

function Register() {

    const router = useRouter();
    const onRegister = async (values: librarian) => {
        try {
            await axios.post("api/librarian/create-librarian", values);
            message.success("Registration successful, please login to continue");
            router.push("/auth/login");
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };
    
    return (
        <main>
            <div className='h-full flex items-center justify-center'>
            <Form className='w-[500px] gap-5' layout='vertical' onFinish={onRegister} >

                <Form.Item name="username" label="username" rules={getAntdFieldRequiredRule("Please input username")}>
                    <input type='text' />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password")}>
                    <input type='password' />
                </Form.Item>
                <Form.Item name="isAdmin" label="Admin">
                    <Checkbox>Is admin</Checkbox>
                </Form.Item>

                <Button type="primary" htmlType="submit" block className="text-black">
                Register
                </Button>

            </Form></div>
        </main>
    )
}
export default Register