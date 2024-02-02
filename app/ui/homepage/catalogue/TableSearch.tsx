import { fetchDocumentsSimple } from "@/app/serverside/data-fetching";
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

export default async function TableSearchCatalogue({
    query,
    currentPage,
    ippg,
}: {
    query: string;
    currentPage: number;
    ippg: number;
}) {
    
    const results = await fetchDocumentsSimple(query, currentPage, ippg);


    ///TODO:
    ///crea elemento che visualizza tutto il robo
    return(
        <div>
            {results?.map((document: documentType) => (
                <div
                    key={document._id.toString()}>
                    <p>{document.title}</p>
                </div>
            ))}
        </div>
    );
}