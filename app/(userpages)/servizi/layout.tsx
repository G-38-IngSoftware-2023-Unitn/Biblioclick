import type { Metadata } from 'next'
import '@/app/globals.css'


export const metadata: Metadata = {
  title: 'Servizi Bibliotecari',
  description: 'Servizi Bibliotecari',
}

export default function ServiziLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
