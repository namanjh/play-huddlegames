import { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    default: 'Play | HuddleGames',
    template: '%s | Play',
  },
  description: 'Serious fun for serious teams.',
  metadataBase: new URL('https://play.huddlegames.com'),
  openGraph: {
    title: 'Play | HuddleGames',
    description: 'Serious fun for serious teams.',
    url: 'https://play.huddlegames.com',
    siteName: 'HuddleGames',
    images: [
      {
        url: '/static/images/banner-img-1.png',
        width: 1200,
        height: 630,
        alt: 'HuddleGames',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/static/favicons/favicon-32x32.png',
    shortcut: '/static/favicons/favicon-16x16.png',
    apple: '/static/favicons/apple-touch-icon.png',
  },
}
