import React from "react";
import {Menu} from "antd";
import type { MenuProps } from 'antd';
import Link from "next/link";
import Image from "next/image";

const items: MenuProps['items'] = [
    {
      label: (
        <Link href="/">
          Home
        </Link>
      ),
      key: 'Home',
    },
    {
      label:( 
        <Link href="/catalogo-bibliografico">
          Catalogo
        </Link>
      ),
      key: 'Catalogo',
    },
    {
      label:( 
        <Link href="/servizi">
          Servizi
        </Link>
      ),
      key: 'Servizi',
    },
    {
      label: (
        <Link href="/orari">
          Orari e date
        </Link>
      ),
      key: 'Hours and Dates',
    },
  ];

export default function NavigationBar() {
    return (
    <header className="flex w-full flex-col">
        <div className="bg-[#E9DBC9] px-80 flex-row flex items-center"> 
          <Image 
              src="/BiblioClickLogo.svg"
              width={141/2.5}
              height={161/2.5}
              alt="Logo"
            />
          <h1 className="mx-5">BiblioClick</h1> 
        </div>
        <Menu className="bg-[#dbbfa3] px-80 text-lg min-h-[2.5rem] pt-1" mode="horizontal" items={items} />
    </header>
    )

};