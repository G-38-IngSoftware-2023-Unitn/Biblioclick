import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '@/app/providers/ThemeProvider'
import { inter } from '@/app/ui/fonts'
import Footer from '@/app/ui/navigation-header/Footer'
import HeaderBar from '@/app/ui/navigation-header/HeaderBar'


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
