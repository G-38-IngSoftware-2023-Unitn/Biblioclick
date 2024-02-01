import { message } from "antd";
import axios from "axios";
import { ReactElement, useState } from "react";

interface documentType {
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

    async function fetchData (query: string, currentPage: number, ippg: number) {
        try {
            await axios.post("api/catalogue-search/fetchData", {search: query,page: currentPage, items: ippg}).then((response) => {
            message.success("Search successful");
            const result = response.data?.data;
            console.log("risultato in fetchData()");
            console.log(result);
            return result;
          });
        } catch (error: any) {
            //message.error(error.response?.data.message);
        }
      
    }
    
    const results = await fetchData(query, currentPage, ippg);
    console.log("risultato fuori dalla fuznione");
    console.log(results);

    return(
        <div>
            <p></p>
        </div>
    );
}