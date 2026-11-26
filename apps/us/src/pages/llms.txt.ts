import type { APIRoute } from 'astro'
import { getNav } from '../lib/nav'
import { siteUrl } from '../lib/seo'

// 格式按 llmstxt.org:H1 站名 + 引用块简介 + 按分类分节的链接列表;文章链到同名 .md
export const GET: APIRoute = async () => {
  const nav = await getNav()
  const lines = [
    '# Longbridge US Help Center',
    '',
    "> Help articles for Long Bridge Securities LLC (US): account opening and security, deposits and withdrawals, trading, LongbridgeAI, documents and taxes, and disclosures. Every article below is also available as Markdown.",
    '',
  ]
  for (const cat of nav) {
    const articles = cat.sections.flatMap((s) => s.articles)
    if (!articles.length) continue
    lines.push(`## ${cat.title}`, '')
    for (const sec of cat.sections) {
      if (!sec.articles.length) continue
      if (cat.sections.length > 1) lines.push(`### ${sec.title}`, '')
      for (const a of sec.articles) lines.push(`- [${a.title}](${siteUrl(a.path)}.md)`)
      lines.push('')
    }
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
