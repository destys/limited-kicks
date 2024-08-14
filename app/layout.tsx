import { Unbounded } from 'next/font/google'

import ToastProvider from '@/providers/toast-provider'
import ModalProvider from '@/providers/modal-provider'

import Header from '@/components/header/header'
import AppBar from '@/components/app-bar/app-bar'
import Footer from '@/components/footer/footer'
import Subscribe from '@/components/subscribe/subscribe'

import './globals.scss'
import styles from './layout.module.scss'
import Head from 'next/head'

const font = Unbounded({ subsets: ['latin'] })

export const metadata = {
  robots: "noindex, nofollow"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <div className={styles.wrapper}>
          <Header />
          <AppBar />
          <main className="flex-auto pt-[72px] lg:pt-0">
            {children}
          </main>
          <Subscribe />
          <Footer />
        </div>
      </body>
    </html>
  )
}