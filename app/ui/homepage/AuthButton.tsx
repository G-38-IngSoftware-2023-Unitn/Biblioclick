"use client"
import { LoginOutlined } from '@ant-design/icons';
import {Button, message } from "antd";
import Link from "next/link";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import React, { ReactElement, useEffect, useState } from "react";
import axios from 'axios';
import LogoutButton from './LogoutButton';
import useUserClient from '@/app/helpers/useUserClient';


export default function AuthButton() {

    const user = useUserClient();

    // const [ButtonToDisplay, setButtonToDisplay] = useState<ReactElement>();

    // useEffect(() => {
    //     setButtonToDisplay(
    //         user ? <LogoutButton/> : (<Link href="/auth/login">
    //         <Button type="primary" icon={<LoginOutlined />} size="middle" className="right-0 text-black">
    //         Log In
    //         </Button>
    //      </Link>)
    //     )
    // }, [user]);
    // return ButtonToDisplay;

    if (user === true) return <LogoutButton/>
    return (
        <Link href="/auth/login">
            <Button type="primary" icon={<LoginOutlined />} size="middle" className="right-0 text-black">
            Log In
            </Button>
        </Link>
    )


}