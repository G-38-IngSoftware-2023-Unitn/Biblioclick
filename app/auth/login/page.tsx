'use client';
import React from "react";
import { getAntdFieldRequiredRule } from "@/app/helpers/validation";
import { Button, Form, message } from "antd";
import Link from "next/link";
import { useRouter } from "@/node_modules/next/navigation";
import axios from "@/node_modules/axios/index";

interface userType {
    email: string;
    password: string;
}


function Login() {
    const [loading, setLoading] = React.useState(false);

    console.log('Before useRouter');
    const router = useRouter();
    console.log('After useRouter', router);
            
    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            await axios.post("/api/auth/login", values);
            message.success("Login successful");
            router.push("/");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className='flex items-center justify-center h-full'>
            <Form className='w-[500px] gap-5 items-center' layout='vertical' onFinish={onLogin}>
                <h1 className='text-2x1 font-bold text-blue-800'>Login</h1>
                <hr/>
                <br />

                <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input your email!")}>
                    <input type="email" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password!")}>
                    <input type="password" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                
                    <Button type="primary" htmlType="submit" block loading={loading}>
                    Login
                    </Button>
                    <Button htmlType="button" block loading={loading} className="bg-blue-400 text-blue-900 font-semibold">
                    SPID 
                    </Button>
                </div>

                <Link href="/auth/register" className="text-primary">
                    Don't have an account? Register
                </Link>
            </Form>
        </div>
    )
}
export default Login