import type { Metadata } from 'next'
import '@/app/globals.css'
import ThemeProvider from '@/app/providers/ThemeProvider'
import LayoutProvider from '@/app/providers/LayoutProvider'
import next from '@/node_modules/next/index'


export const metadata: Metadata = {
  title: 'BiblioClick Login',
  description: 'BiblioClick Login page',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
