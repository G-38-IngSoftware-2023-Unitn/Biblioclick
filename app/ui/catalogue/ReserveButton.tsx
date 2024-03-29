"use client"
import { Button, Tooltip, message } from "antd";
import axios from "axios";
import { useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export default function ReserveButton(props: any) {

    const router = useRouter();

    const onReservation = () => {
        try{
            axios.post("/api/documentDB/reserve-document", {documentId: props?.docId}).then((response) => {
                message.success(response.data.message);
            });
            router.refresh();
        }
        catch (error: any) {
            message.error(error.response.data.message);
        }
    }
    const [loggedIn, setToken] = useState<boolean>();

    useEffect(() => {
        setToken(Cookies.get('isLoggedIn')==="true" ? true : false);
    }, []);


    if (loggedIn && props?.avail > 0) return (
        <Button onClick={onReservation}>
            Available for loan: <strong> {props?.avail}</strong>
        </Button>
    )

    if (props?.avail === 0) return (
        <Tooltip placement="bottom" title={"No document available for reservation or loan"}>
            <Button disabled>
            Available for loan: <strong> {props?.avail}</strong>
            </Button>
        </Tooltip>
    )
    
    return (
        <Tooltip placement="bottom" title={"Log In to access this feature"}>
            <Button disabled>
            Available for loan: <strong> {props?.avail}</strong>
            </Button>
        </Tooltip>
    )

}