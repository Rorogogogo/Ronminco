'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import LenisProvider from './components/shared/lenis-provider'
import ScrollToTop from './components/scroll-to-top'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        enableSystem={false}
        forcedTheme='dark'
      >
        <LenisProvider />
        {children}
        <ScrollToTop />
      </ThemeProvider>
    </SessionProvider>
  )
}
