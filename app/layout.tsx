import { Unbounded } from 'next/font/google'

import ToastProvider from '@/providers/toast-provider'
import ModalProvider from '@/providers/modal-provider'

import Header from '@/components/header/header'
import AppBar from '@/components/app-bar/app-bar'
import Footer from '@/components/footer/footer'
import Subscribe from '@/components/subscribe/subscribe'

import './globals.scss'
import styles from './layout.module.scss'
import { Suspense } from 'react'
import YandexMetrikaContainer from '@/components/metrika/metrika'
import { Viewport } from 'next'

const font = Unbounded({ subsets: ['cyrillic'] })

export const metadata = {
  robots: "noindex, nofollow",
  other: {
    ['yandex-verification']: '9669c0dc0d5afc0a',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(100049821, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });
            `,
            }}
          />
        </head>
      </head>
      <body className={font.className}>
        <Suspense>
          <YandexMetrikaContainer enabled={true} />
        </Suspense>
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