import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from './providers/ThemeProvider'
import LayoutProvider from './providers/LayoutProvider'
import next from '@/node_modules/next/index'


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

      </head>
      <body>
        
          <ThemeProvider>{children}</ThemeProvider>
          
      </body>
    </html>
  )
}
