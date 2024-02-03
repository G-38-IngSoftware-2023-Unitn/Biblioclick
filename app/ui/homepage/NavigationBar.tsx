"use client"
import React, { useEffect, useState } from "react";
import {Menu} from "antd";
import type { MenuProps } from 'antd';
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

const items: MenuProps['items'] = [
    {
      label: (
        <Link href="/">
          Home
        </Link>
      ),
      key: 'home',
    },
    {
      label:( 
        <Link href="/catalogo-bibliografico">
          Catalogo
        </Link>
      ),
      key: 'catalogo-bibliografico',
    },
    {
      label:( 
        <Link href="/servizi">
          Servizi
        </Link>
      ),
      key: 'servizi',
    },
    {
      label: (
        <Link href="/orari">
          Orari e date
        </Link>
      ),
      key: 'orari',
    },
  ];

export default function NavigationBar() {

  const pathname = usePathname();

  const [current, setCurrent] = useState("home");

  useEffect(() => {
    const split = pathname?.split("/")[1];
    console.log(split);

    if(split === "") {
      setCurrent("home");
    }
    else{
      setCurrent(split);
    }
  }, [pathname])

  return (
    <div style={{paddingLeft: "16%", paddingRight: "16%", backgroundColor: "#dbbfa3"}}>
      <Menu 
      className="bg-[#dbbfa3] text-lg min-h-[2.5rem] pt-1" 
      mode="horizontal" items={items}
      selectedKeys={[current]}
        />
    </div>
  )
};