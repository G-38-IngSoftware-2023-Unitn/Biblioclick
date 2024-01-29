import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '@/app/providers/ThemeProvider'
import LayoutProvider from '@/app/providers/LayoutProvider'
import next from '@/node_modules/next/index'
import { Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'BiblioClick Account',
  description: 'BiblioClick Account Page',
}

const items: MenuProps['items'] = [
  {
    label: (
      <Link href="/account/information">
        Information
      </Link>
    ),
    key: 'information',
  },
  {
    label:( 
      <Link href="/account/loans_reservations">
        Loans and Reservations
      </Link>
    ),
    key: 'loans_reservation',
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
  <main className='flex'>
    <Menu style={{ width: 256 }} items={items}/>
    
    <span className='p-4'>{children}</span>
    </main>
  )
}
