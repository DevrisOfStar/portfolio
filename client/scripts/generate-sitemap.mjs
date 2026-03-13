import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')

const rawSiteUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://example.com'
const siteUrl = rawSiteUrl.replace(/\/+$/, '')
const lastmod = new Date().toISOString().split('T')[0]

const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/blog',
    changefreq: 'daily',
    priority: '0.8',
  },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${routePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

await mkdir(publicDir, { recursive: true })
await writeFile(sitemapPath, xml, 'utf8')

if (rawSiteUrl === 'https://example.com') {
  console.warn('VITE_SITE_URL or SITE_URL is not set. Generated sitemap.xml with https://example.com.')
} else {
  console.log(`Generated sitemap.xml for ${siteUrl}`)
}
