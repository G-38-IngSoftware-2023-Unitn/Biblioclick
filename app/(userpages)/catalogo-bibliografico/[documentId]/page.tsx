import { fetchDocumentById } from "@/app/serverside/data-fetching";
import { ObjectId } from "mongoose";

interface documentType {
    _id: ObjectId
    title: string;
    ISBN: number;
    author: string;
    publication_date: Date;
    genre: string;
    description: string;
    publisher: string;
}

export default async function docView( { params }: {
    params: {documentId: string}
}) {
    
    const docData = await fetchDocumentById(params.documentId);

    return (
        <div>
            {JSON.stringify(docData)}
        </div>
    );

}