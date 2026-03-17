import gameService from '../../services/game.service'
import { GoogleAnalytics } from '@next/third-parties/google'
import React from 'react'

export default async function Sitemap() {
  const baseUrl = 'https://www.eternalgames.io/'

  // Fetch dynamic game pages from API
  let gamePages = []
  try {
    document.title = `EternalGames - Sitemap`
    const response = await gameService.getGameList()
    if (response?.games) {
      gamePages = response.games.map((game) => ({
        loc: `/game?slug=${game.slug}`,
        lastmod: new Date().toISOString().split('T')[0], // Current date
        changefreq: 'weekly',
        priority: 0.7
      }))
    }
  } catch (error) {
    console.error('Error fetching game list:', error.message)
  }

  // Define static pages
  const staticPages = [
    { loc: '/', lastmod: '2024-02-04', changefreq: 'daily', priority: 1.0 },
    { loc: '/about-us', lastmod: '2024-02-04', changefreq: 'monthly', priority: 0.8 },
    { loc: '/contact-us', lastmod: '2024-02-04', changefreq: 'monthly', priority: 0.7 },
    { loc: '/privacy-policy', lastmod: '2024-02-04', changefreq: 'monthly', priority: 0.6 },
    { loc: '/terms-of-service', lastmod: '2024-02-04', changefreq: 'monthly', priority: 0.5 },
    { loc: '/faq', lastmod: '2024-02-04', changefreq: 'monthly', priority: 0.4 },
    { loc: '/cookie-policy', lastmod: '2024-02-04', changefreq: 'weekly', priority: 0.3 }
  ]

  // Merge static and dynamic game pages
  const allPages = [ ...staticPages, ...gamePages ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
   
  </url>`
  ).join('')}
</urlset>`

  //     <lastmod>${page.lastmod}</lastmod>
  // <changefreq>${page.changefreq}</changefreq>
  // <priority>${page.priority}</priority>
  return (
      <div className="text-black dark:text-white tracking-wide">
        <div dangerouslySetInnerHTML={{ __html: sitemap }}/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
