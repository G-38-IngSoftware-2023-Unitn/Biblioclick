import React from "react";
import {Menu} from "antd";
import type { MenuProps } from 'antd';
import Link from "next/link";

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
        <div className="bg-amber-900 px-3 py-4"> <h1>BiblioClick</h1> </div>
        <Menu className="bg-amber-700" mode="horizontal" items={items} />
    </header>
    )

};