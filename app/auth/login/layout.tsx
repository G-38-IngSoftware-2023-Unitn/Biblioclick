import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '@/app/providers/ThemeProvider'
import LayoutProvider from '@/app/providers/LayoutProvider'
import next from '@/node_modules/next/index'


export const metadata: Metadata = {
  title: 'BiblioClick Login',
  description: 'BiblioClick Login page',
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
