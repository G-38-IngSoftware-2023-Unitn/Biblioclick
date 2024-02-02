import { fetchDocumentsSimple } from "@/app/serverside/data-fetching";
import { ObjectId } from "mongoose";
import TableSearchElement from "./TableSearchElement";
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

    return(
        <div>
            {results?.map((document: documentType) => (
                <TableSearchElement doc={document}/>
            ))}
        </div>
    );
}