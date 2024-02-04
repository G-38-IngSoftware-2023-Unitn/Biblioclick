'use client';
import React from "react";
import { getAntdFieldRequiredRule } from "@/app/helpers/validation";
import { Button, Form, message, Checkbox } from "antd";
import Link from "next/link";
import { useRouter } from "@/node_modules/next/navigation";
import axios from "@/node_modules/axios/index";

interface userType {
    email: string;
    password: string;
    remember: string;
}


function UserLogin() {
    const [loading, setLoading] = React.useState(false);

    //console.log('Before useRouter');
    const router = useRouter();
    //console.log('After useRouter', router);
            
    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            await axios.post("/api/auth/login/user-login", values);
            message.success("Login successful");
            router.push("/");
            router.refresh();
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
            <Form className='w-[500px] gap-5 items-center' layout='vertical' onFinish={onLogin}>
                <Form.Item name="email" label="Email" rules={getAntdFieldRequiredRule("Please input your email!")}>
                    <input type="email" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password!")}>
                    <input type="password" />
                </Form.Item>
                <Form.Item<userType>
                    name="remember"
                    valuePropName="checked">
                    <Checkbox>Remember me for 7 days</Checkbox>
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                
                    <Button type="primary" htmlType="submit" block loading={loading} className="text-black">
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
    )
}
export default UserLogin