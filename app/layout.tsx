import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from './providers/ThemeProvider'
import LayoutProvider from './providers/LayoutProvider'
import next from '@/node_modules/next/index'
import NavigationBar from './ui/homepage/NavigationBar'
import { inter } from '@/app/ui/fonts'
import Footer from './ui/homepage/Footer'


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
            <NavigationBar/>
            {children}
            
            <Footer/>
          </ThemeProvider>
          
      </body>
    </html>
  )
}
