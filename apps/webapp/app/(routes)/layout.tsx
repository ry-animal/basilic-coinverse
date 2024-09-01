import '@/app/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/layout/providers'

import { appConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Viewport } from 'next'
import type { Metadata } from 'next'
import type React from 'react'
import { isMobile } from 'react-device-detect'
import { Toaster } from 'react-hot-toast'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn('max-w-full antialiased')}
      suppressHydrationWarning
    >
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {/* hamburger layout starts here */}
          <div className="flex-col flex min-h-screen">
            <Header />
            <main className="flex w-full max-w-[100vw] flex-grow flex-col">
              {children}
            </main>
            <Footer />
          </div>
          {/* hamburger layout ends here */}
        </Providers>

        <GoogleAnalytics gaId={appConfig.services.googleAnalyticsId} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    absolute: 'coinverse',
    template: '%s | coinverse',
  },
  description: 'coinverse!',
  metadataBase: new URL('https://coinverse.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://coinverse.xyz',
    title: 'coinverse',
    description: 'coinverse dApp Starter',
    images: [
      {
        url: 'https://coinverse.xyz/images/og-image.webp',
        alt: 'coinverse',
      },
    ],
  },
  twitter: {
    creator: 'coinverse',
    site: '@coinverse',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://coinverse.xyz/images/og-image.webp',
        alt: 'coinverse',
      },
    ],
  },
  robots: 'index, search',
  keywords: [],
}
