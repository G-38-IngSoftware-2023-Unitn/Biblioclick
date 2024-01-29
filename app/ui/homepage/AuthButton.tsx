"use client"
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
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

    if (user === true) return (
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