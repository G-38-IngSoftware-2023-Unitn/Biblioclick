"use client";
import Search, { SearchProps } from "antd/es/input/Search";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchURLInput() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {

        const params = new URLSearchParams(searchParams);

        params.set('query', value);
        params.set('page', '1');

        //console.log(info?.source, value, params);

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Search placeholder="input search text" onSearch={onSearch} enterButton 
        defaultValue={searchParams.get('query')?.toString()}/>
    )
}