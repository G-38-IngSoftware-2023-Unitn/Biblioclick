"use client"
import axios from "axios";
import {Button, message } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { useRouter } from "next/navigation";

export default function LogoutButton () {

    //console.log('Before useRouter');
    const router = useRouter();
    //console.log('After useRouter', router);

    const onLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            message.success("Logout successful");
            location.reload();
        } catch (error: any) {
            message.error(error.response?.data.message);
        }
    };

    return (
        <Button type="primary" icon={ <LogoutOutlined />} size="middle" className="right-0 text-black" onClick={onLogout}>
                Log Out
        </Button>
    )
}