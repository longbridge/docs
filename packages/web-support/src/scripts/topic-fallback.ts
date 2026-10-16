/**
 * 兜底页(views/FallbackPage.astro)的运行时渲染：按地址里的分类段 + slug 拉文章详情。
 * 拉到 → 填正文后发 lb:content-swapped,目录 / 反馈 / 最近浏览照常工作;
 * 不是文章地址或接口查无 → 「文檔建設中」并 noindex;网络 / 5xx → 可重试。
 */
import { config, supportFetch, t } from './config'

const main = document.querySelector<HTMLElement>('[data-topic-fallback]')

const TOPIC_RE = /^\/(?:hk|sg)(?:\/(?:en|zh-CN|zh-HK))?\/support\/topics\/([^/]+)\/([^/]+)$/

function show(name: 'article' | 'empty' | 'error'): void {
  if (!main) return
  main.querySelector<HTMLElement>('[data-fallback-loading]')!.hidden = true
  main.querySelector<HTMLElement>('[data-fallback-article]')!.hidden = name !== 'article'
  main.querySelector<HTMLElement>('[data-fallback-empty]')!.hidden = name !== 'empty'
  main.querySelector<HTMLElement>('[data-fallback-error]')!.hidden = name !== 'error'
  main.setAttribute('aria-busy', 'false')
}

function setMeta(selector: string, content: string): void {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

function notFound(): void {
  setMeta('meta[name="robots"]', 'noindex, follow')
  // 404 不需要左侧分类菜单：整页单列，提示与页脚居中铺开
  main?.closest('.article-page')?.classList.add('is-not-found')
  show('empty')
}

function render(data: any): void {
  const topic = data?.data
  if (!topic?.title || !topic?.content) return notFound()
  const root = main!

  root.querySelector('[data-fallback-title]')!.textContent = topic.title
  // CMS 富文本，与静态构建写进页面的是同一份内容
  root.querySelector('[data-fallback-body]')!.innerHTML = topic.content

  const raw: string = topic.seo_title || topic.title
  const title = raw.includes(t.brand) ? raw : `${raw}${t.titleSep}${t.brand}`
  const description: string = topic.seo_description || topic.body_excerpt || title
  document.title = title
  for (const sel of ['meta[property="og:title"]', 'meta[name="twitter:title"]', 'meta[property="og:image:alt"]']) setMeta(sel, title)
  for (const sel of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) setMeta(sel, description)

  // 最近浏览(article.ts)读这个节点记录当前文章
  const mark = document.createElement('div')
  mark.hidden = true
  mark.dataset.articlePath = location.pathname
  mark.dataset.articleTitle = topic.title
  root.querySelector('[data-fallback-article]')!.appendChild(mark)

  const tpl = root.querySelector<HTMLTemplateElement>('[data-fallback-feedback]')
  if (tpl && data.id != null) {
    const node = tpl.content.cloneNode(true) as DocumentFragment
    node.querySelector<HTMLElement>('[data-topic-feedback]')?.setAttribute('data-topic-id', String(data.id))
    root.querySelector('[data-fallback-feedback-slot]')!.appendChild(node)
  }

  const related = (data.other_topics ?? []).filter((o: any) => o?.slug && o?.title && o.slug !== topic.slug).slice(0, 5)
  if (related.length > 0) {
    const section = root.querySelector<HTMLElement>('[data-fallback-related]')!
    const list = section.querySelector('ul')!
    for (const o of related) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = `${config.prefix}/support/topics/${encodeURIComponent(o.category_slug || o.slug)}/${encodeURIComponent(o.slug)}`
      a.textContent = o.title
      li.appendChild(a)
      list.appendChild(li)
    }
    section.hidden = false
  }

  show('article')
  document.dispatchEvent(new CustomEvent('lb:content-swapped'))
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
}

async function load(): Promise<void> {
  const m = TOPIC_RE.exec(location.pathname.replace(/\/$/, ''))
  if (!m) return notFound()
  try {
    render(await supportFetch(`/v1/support/topics/${m[1]}/${m[2]}`))
  } catch (e) {
    // supportFetch:接口业务码非 0 → 'code …';HTTP 4xx 也按查无处理;断网 / 5xx 才给重试
    const msg = e instanceof Error ? e.message : ''
    if (msg.startsWith('code ') || /^HTTP 4\d\d$/.test(msg)) notFound()
    else show('error')
  }
}

if (main) {
  main.querySelector('[data-fallback-retry]')?.addEventListener('click', () => location.reload())
  load()
}
