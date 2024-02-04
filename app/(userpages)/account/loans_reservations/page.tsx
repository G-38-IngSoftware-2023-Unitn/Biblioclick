"use client"
import LoanReservationElement from "@/app/ui/account/loan-reservationElement";
import LoanReservationTable from "@/app/ui/account/loan-reservationTable";
import { message } from "antd";
import axios from "axios";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

interface resultType {
    _id: ObjectId;
    documentCopyId: Object;
    userId: string;
    startDate: Date;
}

export default function LoansReservation() {

    const router = useRouter();

    const [userData, setUserData] = useState<resultType[]>();

    async function fetchUserData() {
        try {
            await axios.get("/api/account/loans-reservations").then((response) => {
                setUserData(response.data.data);
            });
        } catch (error: any) {
            router.refresh();
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <LoanReservationTable docList={userData}/>
        </div>
    )
}