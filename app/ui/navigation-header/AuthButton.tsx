"use client"
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import {Button, message } from "antd";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import LogoutButton from './LogoutButton';
import Cookies from "js-cookie";


export default function AuthButton() {

    const [loggedIn, setToken] = useState<boolean>();
    useEffect(() => {
        setToken(Cookies.get('isLoggedIn')==="true" ? true : false);
    }, []);

    if (loggedIn === true) return (
        <span>
            <Link href="/account/information">
                <Button type="primary" icon={ <UserOutlined />} size="middle" shape='circle' className="text-black mr-5"/>
            </Link>
            <LogoutButton/>
        </span>
    )

    return (
        <Link href="/auth/login">
            <Button type="primary" icon={<LoginOutlined />} size="middle" className="right-0 text-black">
            Log In
            </Button>
        </Link>
    )


}