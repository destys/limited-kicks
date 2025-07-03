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
import { CookieNotice } from '@/components/cookie/cookie-notice'
import Script from 'next/script'
import { Widget } from '@/components/widget/widget'

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
        {/* Favicon и мета-иконки */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

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
          <CookieNotice />
          <Widget />
        </div>
        {/* Глобальный обработчик целей */}
        <Script id="ym-goals" strategy="afterInteractive">
          {`
            document.addEventListener("DOMContentLoaded", function () {
              const reachGoal = (goal) => {
                if (typeof yaCounter100049821 !== "undefined") {
                  yaCounter100049821.reachGoal(goal);
                }
              };

              // Цели по кликам
              document.querySelectorAll("a[href='https://wa.me/+79951508080']").forEach(el => {
                el.addEventListener("click", () => reachGoal("whatsapp"));
              });

              document.querySelectorAll("a[href='https://t.me/LimitedKicksOfficial']").forEach(el => {
                el.addEventListener("click", () => reachGoal("telegram"));
              });

              document.querySelectorAll("a[href='tel:+79951508080']").forEach(el => {
                el.addEventListener("click", () => reachGoal("telephone"));
              });

              document.querySelectorAll("a[href='mailto:shop@limited-kicks.ru']").forEach(el => {
                el.addEventListener("click", () => reachGoal("email"));
              });

              // Цели по времени нахождения на странице
              setTimeout(() => reachGoal("time_40_sek"), 40000);
              setTimeout(() => reachGoal("time_60_sek"), 60000);
              setTimeout(() => reachGoal("time_80_sek"), 80000);
            });
          `}
        </Script>
      </body>
    </html>
  )
}