import { ObjectId } from "mongoose";
import LoanReservationElement from "./loan-reservationElement";

interface resultType {
    _id: ObjectId;
    documentCopyId: string;
    userId: string;
    startDate: Date;
}

export default function LoanReservationTable(props: { docList: resultType[] | undefined, }) {

    const docList = props?.docList;

    return(
        <div>
            {docList?.map((element) => (
                 <LoanReservationElement key={element?._id} doc={element}/>
            ))}
        </div>
        
    )
}