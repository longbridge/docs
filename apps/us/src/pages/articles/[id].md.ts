import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { siteUrl } from '../../lib/seo'

/** 每篇文章的 Markdown 版 (/articles/{id}.md),给 LLM 抓取;llms.txt 里的文章链接指向这里 */
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('docs')
  return entries
    .filter((e) => e.data.zendesk_article_id != null)
    .map((entry) => ({ params: { id: String(entry.data.zendesk_article_id) }, props: { entry } }))
}

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: CollectionEntry<'docs'> }
  const url = siteUrl(`/articles/${entry.data.zendesk_article_id}`)
  // 正文里的站内链接是根相对的 (/articles/123、/trading-and-investing/...),改成生产域绝对地址
  const body = (entry.body ?? '').replace(/\]\(\//g, `](${siteUrl('/')}/`)
  const meta = [`Source: ${url}`, entry.data.zendesk_updated_at ? `Last updated: ${entry.data.zendesk_updated_at}` : '']
    .filter(Boolean)
    .join('\n')
  return new Response(`# ${entry.data.title}\n\n${meta}\n\n${body.trim()}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
