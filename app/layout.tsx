import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

const signature = Caveat({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: ['500', '600', '700'],
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mohamed Dev',
    template: '%s · Mohamed Dev',
  },
  applicationName: 'Mohamed Dev',
  description:
    'Mohamed Hisham (Mohamed Dev) — portfolio of web projects, skills, and experience. NestJS, Next.js, PostgreSQL. Available for freelance.',
  keywords: [
    'Mohamed Dev',
    'Mohamed Hisham',
    'dev',
    'portfolio',
    'web developer',
    'NestJS',
    'Next.js',
    'PostgreSQL',
    'Cairo',
  ],
  authors: [{ name: 'Mohamed Hisham', url: 'https://github.com/Mohamed-hesham100' }],
  creator: 'Mohamed Hisham',
  publisher: 'Mohamed Dev',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mohamed Dev',
    description:
      'Portfolio of Mohamed Hisham — building scalable web solutions. Available for freelance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mohamed Dev',
    images: [
      {
        url: '/logo-mh.png',
        width: 1024,
        height: 1024,
        alt: 'Mohamed Dev',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mohamed Dev',
    description:
      'Portfolio of Mohamed Hisham — building scalable web solutions. Available for freelance.',
    images: ['/logo-mh.png'],
  },
  icons: {
    icon: [{ url: '/logo-mh.png', type: 'image/png' }],
    apple: [{ url: '/logo-mh.png' }],
    shortcut: ['/logo-mh.png'],
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#08080f',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} ${signature.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
