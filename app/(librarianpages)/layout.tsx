import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '../providers/ThemeProvider'
import { inter } from '@/app/ui/fonts'
import { Menu, MenuProps } from 'antd'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'BiblioClick',
  description: 'BiblioClick',
}

const items: MenuProps['items'] = [
  {
    label: (
      <Link href="/manage-loans">
        Manage Loans
      </Link>
    ),
    key: 'manage-loans',
  },
  {
    label:( 
      <Link href="/manage-reservations">
        Manage Reservations
      </Link>
    ),
    key: 'manage-reservations',
  },
  {
    label:( 
      <Link href="/user-verification">
        User verification
      </Link>
    ),
    key: 'user-verification',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/BiblioClickLogo.svg" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        
          <ThemeProvider>
            <main className='flex'>
              <Menu style={{ width: 256 }} items={items}/>
              {children}
            </main>
          </ThemeProvider>
          
      </body>
    </html>
  )
}
