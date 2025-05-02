import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteMetadata } from './metadata'

export const metadata = siteMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-white text-black antialiased">
        <Header />
        <main
          className="flex-1 p-6 bg-white"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(255, 192, 203, 0.3) 0%,
                rgba(255, 221, 177, 0.3) 25%,
                rgba(173, 216, 230, 0.3) 50%,
                rgba(221, 160, 221, 0.3) 75%,
                rgba(152, 251, 152, 0.3) 100%
              )
            `,
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
