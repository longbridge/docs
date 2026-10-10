/**
 * 同步产物的数据契约：同步脚本写、站点构建读，两端都只经过这里。
 * md 文件 frontmatter 每行 `key: <JSON>`(JSON 是合法 YAML，文件仍是标准 md),正文为 CMS 原始 HTML。
 */

export interface TopicRef { slug: string; title: string }
export interface SupportCategory {
  slug: string
  title: string
  desc: string
  icon: string
  topics: TopicRef[]
  children: SupportCategory[]
}
export interface RelatedTopic { categorySlug: string; slug: string; title: string }
export interface TopicRecord {
  slug: string
  /** 文章直属分类 (可能是二级分类),canonical 路径用它 */
  categorySlug: string
  topicId?: string
  title: string
  seoTitle?: string
  seoDescription?: string
  updatedAt?: string
  related: RelatedTopic[]
  content: string
}
export interface RecommendedTopic { slug: string; categorySlug: string; title: string }

/** 接口返回 PascalCase(CategorySlug/Child/Topics),这里归一成稳定结构 */
export function normalizeTree(raw: any[]): SupportCategory[] {
  return (raw ?? [])
    .filter((c) => c?.CategorySlug)
    .map((c) => ({
      slug: String(c.CategorySlug),
      title: String(c.Title ?? '').trim(),
      desc: String(c.Desc ?? ''),
      icon: String(c.Icon ?? ''),
      topics: (c.Topics ?? [])
        .filter((t: any) => t?.Slug && t?.Title)
        .map((t: any) => ({ slug: String(t.Slug), title: String(t.Title).trim() })),
      children: normalizeTree(c.Child ?? []),
    }))
}

/** 按树的先序遍历拉平文章 (上一篇/下一篇顺序同线上 utils/tree.ts) */
export function flattenTopics(tree: SupportCategory[]): (TopicRef & { categorySlug: string })[] {
  const out: (TopicRef & { categorySlug: string })[] = []
  const seen = new Set<string>()
  const walk = (c: SupportCategory) => {
    for (const t of c.topics) {
      if (seen.has(t.slug)) continue
      seen.add(t.slug)
      out.push({ ...t, categorySlug: c.slug })
    }
    c.children.forEach(walk)
  }
  tree.forEach(walk)
  return out
}

/** 解析 CMS 返回的文章 URL(如 https://support.longbridgehk.com/topics/{cat}/{slug}) */
export function parseTopicUrl(url?: string): { categorySlug: string; slug: string } | null {
  if (!url) return null
  try {
    const pathname = url.startsWith('http') ? new URL(url).pathname : url
    const m = pathname.match(/\/topics\/([^/?#]+)\/([^/?#]+)\/?$/)
    return m ? { categorySlug: m[1], slug: m[2] } : null
  } catch {
    return null
  }
}

const FRONTMATTER_KEYS = ['title', 'topic_id', 'category_slug', 'updated_at', 'seo_title', 'seo_description', 'related'] as const

export function renderTopicFile(t: TopicRecord): string {
  const fm: Record<string, unknown> = {
    title: t.title,
    topic_id: t.topicId,
    category_slug: t.categorySlug,
    updated_at: t.updatedAt,
    seo_title: t.seoTitle,
    seo_description: t.seoDescription,
    related: t.related,
  }
  const lines = FRONTMATTER_KEYS.filter((k) => fm[k] !== undefined).map((k) => `${k}: ${JSON.stringify(fm[k])}`)
  return `---\n${lines.join('\n')}\n---\n${t.content.trim()}\n`
}

export function parseTopicFile(slug: string, raw: string): TopicRecord {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error(`topic ${slug}: missing frontmatter`)
  const fm: Record<string, any> = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(': ')
    if (i > 0) fm[line.slice(0, i)] = JSON.parse(line.slice(i + 2))
  }
  return {
    slug,
    categorySlug: fm.category_slug,
    topicId: fm.topic_id,
    title: fm.title,
    seoTitle: fm.seo_title,
    seoDescription: fm.seo_description,
    updatedAt: fm.updated_at,
    related: fm.related ?? [],
    content: m[2],
  }
}
