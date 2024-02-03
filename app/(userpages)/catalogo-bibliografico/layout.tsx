import type { Metadata } from 'next'
import '@/app/globals.css'


export const metadata: Metadata = {
  title: 'Catalogo Bibliografico',
  description: 'Catalogo Bibliografico',
}

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<main>{children}</main>)
}
