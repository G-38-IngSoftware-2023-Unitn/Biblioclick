'use client';
import React from "react";
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";
import { Badge, Popover, message } from "@/node_modules/antd/es/index";
import Loader from "@/components/Loader";
import userModel from "../models/userModel";

interface userType {
    name: string;
    email: string;
}


function LayoutProvider({ children }: { children: React.ReactNode }) {
    const content = (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex gap-2 items-center cursor-pointer text-md" onClick={()=> router.push("/profile")}>
                <i className="ri-shield-user-line"></i>
                <span>Profile</span>
            </div>
        </div>
    )
    const [loading, setLoading] = React.useState(false);
    console.log('Before useRouter');
    const router = useRouter();
    console.log('After useRouter', router);
    const onLogout = async () => {
        try {
          setLoading(true);
          await axios.get("/api/auth/logout");
          message.success("Logout successfully");
          dispatch(SetCurrentUser(null));
          router.push("/auth/login");
        } catch (error: any) {
          message.error(error.response.data.message);
        } finally {
          setLoading(false);
      } };

    return (
        <div className="flex top-0">
            <div className="bg-orange-200 py-2 px-5 flex justify-center items-center">
                
                <div className="flex gap-2 cursor-pointer" onClick={() => router.push("/")}>
                    <h1 className="text-2xl font-bold text-blue-800">Biblio</h1>
                    <h1 className="text-2xl font-bold text-blue-500">Click</h1>
                </div>

                
                <div className="flex gap-5 items-center">
                    <h5>Prenotazioni</h5>
                </div>

                
                <Popover content={content} trigger="click">
                    <div className="flex h-8 w-8 bg-white p-2 rounded-full items-center justify-center cursor-pointer">
                        <span>{}</span>
                    </div>
                </Popover>
                

                <div className="p-5">{children}</div>
            </div>
        </div>
    )
} export default LayoutProvider