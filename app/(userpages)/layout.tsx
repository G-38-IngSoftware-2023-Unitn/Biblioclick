import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '@/app/providers/ThemeProvider'
import LayoutProvider from '@/app/providers/LayoutProvider'
import next from '@/node_modules/next/index'
import NavigationBar from '@/app/ui/homepage/NavigationBar'
import { inter } from '@/app/ui/fonts'
import Footer from '@/app/ui/homepage/Footer'
import HeaderBar from '@/app/ui/homepage/HeaderBar'


export const metadata: Metadata = {
  title: 'BiblioClick',
  description: 'BiblioClick',
}

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
            <HeaderBar/>
            {children}
            
            <Footer/>
          </ThemeProvider>
          
      </body>
    </html>
  )
}
