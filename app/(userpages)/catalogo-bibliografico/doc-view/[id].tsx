import { fetchDocumentById, getAllIds } from "@/app/serverside/data-fetching"
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

export default function Page({props} : 
    {props: { document: documentType}
}) {

    console.log(props);

    return (
        <div>
            {/* {JSON.stringify(docData)} */}
            hello
        </div>
    );

}

export async function getStaticPaths() {
    const paths = getAllIds();
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params } : {
    params: {id: string}
}) {
    const docData = await fetchDocumentById(params.id);

    console.log(docData);

    return {
        props: {
            document: docData
        },
    };
}