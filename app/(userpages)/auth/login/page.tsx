'use client';
import React from "react";
import { Tabs } from "antd"
import UserLogin from "./user-login";
import LibrarianLogin from "./librarian-login";

const items = [
    {
        label: "User Login",
        key: "user-login",
        children: (<UserLogin/>),
    },
    {
        label: "Librarian Login",
        key: "librarian-login",
        children: (<LibrarianLogin/>),
    }
]

function Login() {
    return (
        
        <div className='flex items-center justify-center h-full flex-col'>
            <h1 className='text-2x1 font-bold text-blue-800'>Login</h1>
            <Tabs
                type="card"
                items = {items}/>
        </div>
    )
}
export default Login