import SearchURLInput from "@/app/ui/homepage/SearchURL";
import TableSearchCatalogue from "@/app/ui/homepage/TableSearch";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import axios from "axios";
import { query } from "firebase/database";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect } from "react";

interface documentType {
    title: string;
    ISBN: number;
    author: string;
    publication_date: Date;
    genre: string;
    description: string;
    publisher: string;
}


export default async function Catalogo({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
      ippg?: string;
    };
  }) {

    const query2 = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const itemsPerPage = Number(searchParams?.ippg) || 25;

    return (

        <div>
            <SearchURLInput/>

            <Suspense key={query2 + currentPage + itemsPerPage} fallback={<LoadingOutlined/>}>
            <TableSearchCatalogue query={query2} currentPage={currentPage} ippg={itemsPerPage} />
            </Suspense>
        </div>

        )
}