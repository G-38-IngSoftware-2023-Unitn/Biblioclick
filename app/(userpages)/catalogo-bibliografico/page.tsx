import { fetchDocumentsAmount } from "@/app/api/serverside/data-fetching";
import PaginationURL from "@/app/ui/catalogue/PaginationURL";
import SearchURLInput from "@/app/ui/catalogue/SearchURL";
import TableSearchCatalogue from "@/app/ui/catalogue/TableSearch";
import { LoadingOutlined } from "@ant-design/icons";
import { Suspense } from "react";

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
    const itemsPerPage = Number(searchParams?.ippg) || 4;

    const numberOfDocs = await fetchDocumentsAmount(query2);

    return (

        <div>
            <SearchURLInput/>

            <Suspense key={query2 + currentPage + itemsPerPage} fallback={<LoadingOutlined/>}>
            <TableSearchCatalogue query={query2} currentPage={currentPage} ippg={itemsPerPage} />
            </Suspense>

            <PaginationURL
              currentPage={currentPage} itemsPerPage={itemsPerPage} numberOfDocs={numberOfDocs} />
        </div>

        )
}