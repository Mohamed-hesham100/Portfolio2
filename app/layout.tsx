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

export const metadata: Metadata = {
  title: 'Mohamed Dev — Full Stack Developer',
  description:
    'Mohamed Hisham — Full Stack Developer building scalable web solutions. NestJS, Next.js, PostgreSQL. Available for freelance.',
  authors: [{ name: 'Mohamed Hisham' }],
  openGraph: {
    title: 'Mohamed Dev — Full Stack Developer',
    description: 'I build scalable web solutions. Available for freelance.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#08080f',
  width: 'device-width',
  initialScale: 1,
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
