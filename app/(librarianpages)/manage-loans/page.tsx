"use client"
import LoanReservationElement from "@/app/ui/account/loan-reservationElement";
import LoanReservationTable from "@/app/ui/account/loan-reservationTable";
import LoanElement from "@/app/ui/librarian/loansElement";
import ReservationElement from "@/app/ui/librarian/reservationsElement";
import { message } from "antd";
import axios from "axios";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { ReactElement, Suspense, useEffect, useState } from "react";

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
            await axios.get("/api/librarian/fetch-loans").then((response) => {
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
        <main>
            <p> All loans </p>
            <div>
                <Suspense>
                    {userData?.map((element: resultType) => (
                        <LoanElement key={element?._id.toString()} doc={element}/>
                    ))}
                </Suspense>
            </div>
        </main>
    )
}