import React from "react";
import {Button} from "antd";
import Image from "next/image";
import NavigationBar from "./NavigationBar";
import { LoginOutlined } from '@ant-design/icons';
import Link from "next/link";
import AuthButton from "./AuthButton";
  

export default function HeaderBar() {


    return (
        <header className="flex w-full flex-col">
            <div style={{paddingLeft: "16%", paddingRight: "16%"}} className="bg-[#E9DBC9] px-80 items-center flex justify-between">
                <div className="flex-row flex items-center">
                    <Image 
                        src="/BiblioClickLogo.svg"
                        width={141/3}
                        height={161/3}
                        alt="Logo"/>
                    <h2 className="mx-4 font-medium">BiblioClick</h2>
                </div>
                {/* <Link href="/auth/login">
                    <Button type="primary" icon={<LoginOutlined />} size="middle" className="right-0 text-black">
                    Log In
                    </Button>
                </Link> */}
                <AuthButton/>
                
            </div>
            <NavigationBar/>
        </header>
        


    )
}