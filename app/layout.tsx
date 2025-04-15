import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Providers from '@/components/Providers'
import './globals.css'
import { Toaster } from '@/components/ui/Toaster'
import HeaderTwo from '@/components/header/HeaderTwo'
import Footer from "@/components/footer/Footer"
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weekly ',
  description: 'seamless Academic Registration and Tracking',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    // <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <HeaderTwo />
            <Toaster />
            {children}
            <Footer />
          </Providers>
          <Toaster />
        </body>
      </html>
    // </SessionProvider>
  )
}
