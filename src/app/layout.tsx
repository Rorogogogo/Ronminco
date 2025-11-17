'use client'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import CurvedMenu from './components/ui/curved-menu'
import Footer from './components/layout/footer/Footer'
import ScrollToTop from './components/scroll-to-top'
import LenisProvider from './components/shared/lenis-provider'
import { headerData } from './components/layout/header/Navigation/Menudata'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Convert headerData to curved menu format
  const curvedMenuItems = headerData.map((item) => ({
    heading: item.label,
    href: item.href,
  }))

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            enableSystem={false}
            defaultTheme='dark'>
            <LenisProvider />
            {/* Curved Menu - Global Navigation */}
            <CurvedMenu navItems={curvedMenuItems} />
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
