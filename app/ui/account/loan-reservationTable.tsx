import { ObjectId } from "mongoose";
import LoanReservationElement from "./loan-reservationElement";
import { Suspense } from "react";

interface resultType {
    _id: ObjectId;
    documentCopyId: Object;
    userId: string;
    startDate: Date;
}

export default function LoanReservationTable(props: { docList: any[] | undefined, }) {

    const docList = props?.docList;

    return(
        <div>
            <Suspense>
                {docList?.map((element: resultType) => (
                    <LoanReservationElement key={element?._id.toString()} doc={element}/>
                ))}
            </Suspense>
        </div>
        
    )
}