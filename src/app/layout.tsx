import './globals.css'
import type { Metadata } from 'next'
import CurvedMenu from './components/ui/curved-menu'
import Footer from './components/layout/footer/Footer'
import { headerData } from './components/layout/header/Navigation/Menudata'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Ronminco | Software Solutions by Robert & Michelle',
  description: 'A software studio founded by Robert and Michelle, crafting innovative solutions that transform businesses through cutting-edge technology.',
  metadataBase: new URL('https://www.ronminco.com'),
  alternates: {
    canonical: 'https://www.ronminco.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' },
    ],
  },
}

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
      <body>
        <Providers>
          {/* Curved Menu - Global Navigation */}
          <CurvedMenu navItems={curvedMenuItems} />
          {children}
          {/* ---------------------Footer Starts-----------------  */}
          <Footer />
          {/* ---------------------Footer Ends-----------------  */}
        </Providers>
      </body>
    </html>
  )
}
