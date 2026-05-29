import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumina AI - Discover the Future',
  description: 'A premium AI blog covering the latest in Generative AI, Machine Learning, and Robotics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="si">
      <body>
        {children}
      </body>
    </html>
  )
}
