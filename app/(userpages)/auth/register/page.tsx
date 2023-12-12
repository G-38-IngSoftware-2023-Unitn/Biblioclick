'use client';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import { Button, Form, message } from 'antd';
import Link from 'next/link'
import React from 'react'
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

interface userType {
    name: string;
    surname: string;
    codiceFiscale: string;
    dateOfBirth: Date;
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
        
        <div className='h-full flex items-center justify-center'>
        <Form className='w-[500px] gap-5' layout='vertical' onFinish={onRegister} >
                <h1 className='text-2x1 font-bold text-blue-800'>Register</h1>
                <hr/>
                <br />

                <Form.Item name="name" label="Name" rules={getAntdFieldRequiredRule("Please input your name")}>
                    <input type='text' />
                </Form.Item>
                <Form.Item name="surname" label="Surname" rules={getAntdFieldRequiredRule("Please input your surname")}>
                    <input type='text' />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input your email")}>
                    <input type='email' />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password")}>
                    <input type='password' />
                </Form.Item>

                <Form.Item name="codiceFiscale" label="Codice Fiscale" rules={getAntdFieldRequiredRule("Please input your codice fiscale")}>
                    <input type='text' maxLength={16} className='uppercase'/> 
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Date of birth" rules={getAntdFieldRequiredRule("Please input your date of birth")}>
                    <input type='date' />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={loading} className="text-black">
                Register
                </Button>
                 

                <Link href="/auth/login" className="text-primary">Already have an account? Login</Link>

            </Form></div>
    )
}
export default Register