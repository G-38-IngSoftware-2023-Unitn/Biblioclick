"use client";
import { Pagination } from "antd";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function PaginationURL(props: any) {

    ///pagination functions
    const searchParameters = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChangePagination = (page: number, pageSize: number) => {
      const params = new URLSearchParams(searchParameters);

        params.set('page', page.toString());
        params.set('ippg', pageSize.toString());

        replace(`${pathname}?${params.toString()}`);
    }

    if (props?.numberOfDocs > 0) return(
        <Pagination
              defaultCurrent={1} current={props?.currentPage} defaultPageSize={10} pageSize={props?.itemsPerPage}
              total={props?.numberOfDocs} onChange={onChangePagination} className="mt-5"
        />
    )


}