import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fintrack - Financial Tracking App',
  description: 'A modern financial tracking application to manage your finances',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
