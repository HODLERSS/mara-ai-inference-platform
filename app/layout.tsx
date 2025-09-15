import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme-context'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'MARA AI Platform',
  description: 'Enterprise AI Inference Platform - Sovereign, Fast, Cost-Effective',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}