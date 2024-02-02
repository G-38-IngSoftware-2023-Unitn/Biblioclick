"use client"
import { message } from "antd";
import { ObjectId } from "mongoose";
import { useRouter } from "@/node_modules/next/navigation";


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

export default async function TableSearchElement(props: any) {

    const router = useRouter();

    const onClick = () => {
        message.success("click");
        //router.push("/catalogue/doc-view/" + props?.doc._id);
    }

    const doc: documentType = props?.doc;

    return(
        <a href={"/catalogo-bibliografico/" + props?.doc._id.toString()} className="no-underline text-black">
        <div
        onClick={onClick}
        key={doc._id.toString()}
        className="rounded bg-[#F9EFE5] cursor-pointer">
            <div>
                <p className="text-black">{doc?.title}</p>
                <p>{doc?.author}</p>
                <p>{doc?.author}</p>
            </div>
        </div>
        </a>
    )
}