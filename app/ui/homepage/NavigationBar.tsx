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
      <Menu className="bg-[#dbbfa3] px-80 text-lg min-h-[2.5rem] pt-1" mode="horizontal" items={items} />
    )

};