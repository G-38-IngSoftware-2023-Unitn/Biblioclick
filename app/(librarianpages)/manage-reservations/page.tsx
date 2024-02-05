"use client"
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
            await axios.get("/api/librarian/fetch-reservations").then((response) => {
                setUserData(response.data.data);
            });
        } catch (error: any) {
            location.reload();
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <main>
            <p> All reservations </p>
            <div>
                <Suspense>
                    {userData?.map((element: resultType) => (
                        <ReservationElement key={element?._id.toString()} doc={element}/>
                    ))}
                </Suspense>
            </div>
        </main>
    )
}