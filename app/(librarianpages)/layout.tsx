import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '../providers/ThemeProvider'
import { inter } from '@/app/ui/fonts'


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
            {children}
          </ThemeProvider>
          
      </body>
    </html>
  )
}
