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
            router.push("/");
            location.reload();
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
            <Form className='w-[500px] gap-5 items-center' layout='vertical' onFinish={onLogin}>
                <Form.Item name="username" label="Librarian username" rules={getAntdFieldRequiredRule("Please input your username!")}>
                    <input type="text" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={getAntdFieldRequiredRule("Please input your password!")}>
                    <input type="password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={loading} className="text-black">
                Login
                </Button>

                <Link href="/auth/register" className="text-primary">
                    Don&apos;t have an account? Register
                </Link>
            </Form>
    )
}
export default LibrarianLogin