'use client'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import ScrollToTop from './components/scroll-to-top'
import LenisProvider from './components/shared/lenis-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            enableSystem={false}
            defaultTheme='light'>
            <LenisProvider />
            {/* ---------------------Header Starts-----------------  */}
            <Header />
            {/* ---------------------Header Ends-------------------  */}
            {children}
            {/* ---------------------Footer Starts-----------------  */}
            <Footer />
            {/* ---------------------Footer Ends-----------------  */}
            <ScrollToTop />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
