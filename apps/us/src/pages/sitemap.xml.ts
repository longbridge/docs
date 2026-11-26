import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { docRoute } from '../lib/nav-core'
import { siteUrl } from '../lib/seo'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const GET: APIRoute = async () => {
  const entries = await getCollection('docs')
  const urls = [
    `  <url><loc>${siteUrl('/')}</loc></url>`,
    ...entries.map((e) => {
      const loc = siteUrl('/' + docRoute(e.id, e.data.zendesk_article_id))
      const lastmod = e.data.zendesk_updated_at ? `<lastmod>${e.data.zendesk_updated_at}</lastmod>` : ''
      return `  <url><loc>${esc(loc)}</loc>${lastmod}</url>`
    }),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
