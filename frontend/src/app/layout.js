import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import React, { Suspense } from 'react'
import { ADSENCE_CLIENT_ID } from '../helper/constant'

const inter = Inter({ subsets: [ 'latin' ] })

// Modern Metadata API (replaces manual <Head> tags )
export const metadata = {
  title: 'Play Eternal Games Online – Free Brain Games & Mind Puzzles',
  description: 'Discover ultimate eternal games and mind-bending puzzles that will energize your brain. Challenge yourself with thrilling mental adventures today!',
  alternates: {
    canonical: 'https://www.eternalgames.io',
  },
  openGraph: {
    title: 'Play Eternal Games Online – Free Brain Games & Mind Puzzles',
    description: 'Discover ultimate eternal games and mind-bending puzzles that will energize your brain. Challenge yourself with thrilling mental adventures today!',
    url: 'https://www.eternalgames.io',
    siteName: 'Eternal games',
    images: [
      {
        url: "https://emoongames.com/logo-full.png",
        width: 735,
        height: 735,
        alt: "Eternal games post image",
      }
    ],
    type: 'website',
  },
  // other: {
  //   'google': 'nositelinkssearchbox',
  //   'google-site-verification': 'your-verification-code', // optional
  // },
}

const META_PIXEL_ID = "YOUR_PIXEL_ID";

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={inter.className}>
      <body style={{ width: '100%', color: 'white', minHeight: '100vh', overflowX: 'hidden', margin: 0 }}>

      {/* AdSense Script */}
      <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENCE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
      />

      {/* Meta Pixel (Facebook) */}
      <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
      />

      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>

      {/* Google Analytics component */}
      <GoogleAnalytics gaId="G-TF62GHPFEJ" />
      </body>
      </html>
  )
}
