import type { Metadata } from 'next'
import { Noto_Sans_TC, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'

const notoSansTC = Noto_Sans_TC({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '黃偉閎個人網站',
  description: '\u5c08\u6ce8\u65bc AI \u7cfb\u7d71\u8a2d\u8a08\u3001Multi-Agent Workflow\u3001\u5168\u7aef\u958b\u767c\u8207 Web3 \u61c9\u7528\u3002\u570b\u7acb\u4e2d\u592e\u5927\u5b78\u8cc7\u8a0a\u7ba1\u7406\u5b78\u7cfb\u5b78\u751f\u3002',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
