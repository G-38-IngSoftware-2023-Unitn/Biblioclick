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
    documentCopyId: string;
    userId: string;
    startDate: Date;
}

function LoansReservation() {

    const router = useRouter();

    const [userData, setUserData] = useState<resultType[]>();

    async function fetchUserData() {
        try {
            console.log("hello");
            await axios.get("/api/account/loans-reservations").then((response) => {
                console.log("obj values", Object.values(response.data.data))
                setUserData(Object.values(response.data.data));
            });
        } catch (error: any) {
            router.refresh();
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserData();
        console.log("userdata", userData);
    }, []);

    return (
        <div>
            <LoanReservationTable docList={userData}/>
        </div>
    )
}
export default LoansReservation