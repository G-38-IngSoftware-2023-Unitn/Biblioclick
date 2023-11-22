'use client';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import { Button, Form, message } from 'antd';
import Link from 'next/link'
import React from 'react'
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

interface userType {
    name: string;
    email: string;
    password: string;
}

function Register() {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onRegister = async (values: userType) => {
    try {
        setLoading(true);
        await axios.post("/api/auth/register", values);
        message.success("Registration successful, please login to continue");
        router.push("/auth/login");
    } catch (error: any) {
        message.error(error.response.data.message);
    } finally {
        setLoading(false);
    }
    };
    
    return (
        <div className='grid grid-cols-2 min-h-screen'>
            <div className='h-full bg-orange-200 flex items-center justify-center' >
                <h1 className='text-7xl font-bold text-blue-800'>Biblio</h1>
                <h1 className='text-7xl font-bold text-blue-500'>Click</h1>
            </div>

            <div className='h-full flex items-center justify-center'>
            <Form className='w-[500px] gap-5' layout='vertical' onFinish={onRegister} >
                    <h1 className='text-2x1 font-bold text-blue-800'>Register</h1>
                    <hr/>
                    <br />

                    <Form.Item name="name" label="Name" rules={getAntdFieldRequiredRule("Please input your name")}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input your email")}>
                        <input type='email' />
                    </Form.Item>
                    <Form.Item name="password" label="password" rules={getAntdFieldRequiredRule("Please input your password")}>
                        <input type='password' />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                    
                        <Button type="primary" htmlType="submit" block loading={loading}>
                        Register
                        </Button>
                        <Button htmlType="button" block loading={loading} className="bg-blue-400 text-blue-900 font-semibold">
                        SPID 
                        </Button>
                    </div>

                    <Link href="/auth/login" className="text-primary">Already have an account? Login</Link>

                </Form></div>
        </div>
    )
}
export default Register