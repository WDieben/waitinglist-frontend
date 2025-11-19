import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Stepps - Step-by-Step Guides Made Simple',
  description: 'Create beautiful, step-by-step guides in seconds with stepps.ai',
  generator: 'stepps.ai',
  icons: {
    icon: [
      {
        url: '/favicon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon-16.png',
  },
  openGraph: {
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'stepps.ai Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-mono antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
