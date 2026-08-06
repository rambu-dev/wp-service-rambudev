import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleTagManager } from '@/components/google-tag-manager'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
title: 'rambudev | Senior WordPress Development',
  description: 'Custom WordPress plugins, themes, maintenance, performance optimization, and emergency fixes from a senior developer with 10+ years of experience.',
  generator: 'v0.app',
  metadataBase: new URL('https://wpcraft.dev'),
  openGraph: {
    title: 'rambudev | WordPress Problems Solved. Custom Solutions Built.',
    description: 'Senior WordPress development for businesses that need a site that works harder.',
    type: 'website',
    url: 'https://wpcraft.dev',
    siteName: 'rambudev',
  },
  twitter: { card: 'summary_large_image', title: 'rambudev | Senior WordPress Development', description: 'Custom WordPress development, maintenance, and troubleshooting.' },
}

export const viewport: Viewport = { themeColor: '#f8fafc', colorScheme: 'light', width: 'device-width', initialScale: 1 }

const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'rambudev', url: 'https://wpcraft.dev', description: 'Senior WordPress development, custom plugins, themes, maintenance, and troubleshooting.', email: 'vn.nqhung@gmail.com', areaServed: 'Worldwide', priceRange: '$$' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${geist.variable} ${geistMono.variable} antialiased`}><GoogleTagManager /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
