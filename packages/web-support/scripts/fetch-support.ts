/**
 * 官网帮助中心内容同步：按地区 × 语言拉取 CMS 分类树、推荐文章与每篇文章详情，
 * 生成 apps/web-{region}/docs/{locale}/ 下的 md(正文保留 CMS HTML) 与 JSON 索引。
 *
 * 用法 (在 app 目录执行):bun run ../../packages/web-support/scripts/fetch-support.ts --region hk
 * 环境变量:SUPPORT_SYNC_HOST 覆盖接口域名 (默认生产 mr.lbkrs.com，内容为公开已发布数据)。
 *
 * 全部请求成功后才落盘;任何一篇失败即非 0 退出且不改动已有文件，避免发布残缺内容。
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { DEFAULT_API_HOST, getRegion, supportHeaders } from '../region.mjs'
import { normalizeTree, parseTopicUrl, flattenTopics, renderTopicFile, type SupportCategory, type TopicRecord, type RecommendedTopic } from '../src/lib/content-format'

const regionFlag = process.argv.indexOf('--region')
const regionCode = regionFlag > -1 ? process.argv[regionFlag + 1] : undefined
if (!regionCode) {
  console.error('[sync] missing --region <hk|sg>')
  process.exit(2)
}
const region = getRegion(regionCode)
const host = (process.env.SUPPORT_SYNC_HOST ?? DEFAULT_API_HOST).replace(/\/$/, '')
const DOCS_DIR = join(process.cwd(), 'docs')
const CONCURRENCY = 6
const TIMEOUT_MS = 30_000

async function getJson(path: string, locale: string): Promise<any> {
  const url = `${host}/api/forward${path}`
  let lastErr: unknown
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 500 * attempt * attempt))
    try {
      const res = await fetch(url, {
        headers: { ...supportHeaders(region, locale), 'user-agent': 'lb-docs-support-sync' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const body = await res.json()
      if (body?.code !== 0) throw new Error(`code ${body?.code} ${body?.message ?? ''}`)
      return body.data
    } catch (err) {
      lastErr = err
    }
  }
  throw new Error(`${url} [${locale}] failed: ${String(lastErr)}`)
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++
        out[i] = await fn(items[i])
      }
    }),
  )
  return out
}

interface LocaleSnapshot {
  locale: string
  tree: SupportCategory[]
  recommended: RecommendedTopic[]
  topics: TopicRecord[]
}

async function pullLocale(locale: string): Promise<LocaleSnapshot> {
  const treeData = await getJson('/v1/support/categories_tree', locale)
  const tree = normalizeTree(treeData?.tree?.data ?? [])
  if (tree.length === 0) throw new Error(`[${locale}] categories_tree is empty`)

  const refs = flattenTopics(tree)
  const fetched = await mapLimit(refs, CONCURRENCY, async (ref) => {
    const data = await getJson(`/v1/support/topics/${ref.categorySlug}/${ref.slug}`, locale)
    const topic = data?.data
    if (!topic?.title || !topic?.content) {
      console.warn(`[sync] ${region.code}/${locale} skip ${ref.categorySlug}/${ref.slug}: not found or empty`)
      return null
    }
    const record: TopicRecord = {
      slug: ref.slug,
      categorySlug: ref.categorySlug,
      topicId: data.id != null ? String(data.id) : undefined,
      title: topic.title,
      seoTitle: topic.seo_title || undefined,
      seoDescription: topic.seo_description || undefined,
      updatedAt: topic.updated_at || undefined,
      related: (data.other_topics ?? [])
        .filter((o: any) => o?.slug && o?.title)
        .map((o: any) => ({ categorySlug: o.category_slug, slug: o.slug, title: o.title })),
      content: topic.content,
    }
    return record
  })
  const topics = fetched.filter((t): t is TopicRecord => t !== null)
  const present = new Set(topics.map((t) => t.slug))

  const recData = await getJson('/v1/support/topics/recommended_topics', locale)
  const recommended: RecommendedTopic[] = []
  for (const item of recData?.topics ?? []) {
    const parsed = parseTopicUrl(item?.url)
    if (!parsed || !present.has(parsed.slug) || !item.title) continue
    recommended.push({ slug: parsed.slug, categorySlug: parsed.categorySlug, title: item.title })
  }

  console.log(`[sync] ${region.code}/${locale}: ${tree.length} categories, ${topics.length}/${refs.length} topics, ${recommended.length} recommended`)
  return { locale, tree, recommended, topics }
}

function writeLocale(snap: LocaleSnapshot): void {
  const dir = join(DOCS_DIR, snap.locale)
  const topicsDir = join(dir, 'topics')
  mkdirSync(topicsDir, { recursive: true })
  const present = new Set(snap.topics.map((t) => t.slug))
  // 分类树里拉不到正文的文章同步剔除，导航不出现死链
  const prune = (cats: SupportCategory[]): SupportCategory[] =>
    cats.map((c) => ({ ...c, topics: c.topics.filter((t) => present.has(t.slug)), children: prune(c.children) }))
  writeFileSync(join(dir, '_tree.json'), JSON.stringify(prune(snap.tree), null, 2) + '\n')
  writeFileSync(join(dir, '_recommended.json'), JSON.stringify(snap.recommended, null, 2) + '\n')
  for (const t of snap.topics) writeFileSync(join(topicsDir, `${t.slug}.md`), renderTopicFile(t))
  for (const f of readdirSync(topicsDir)) {
    if (f.endsWith('.md') && !present.has(f.slice(0, -3))) rmSync(join(topicsDir, f))
  }
}

const snapshots: LocaleSnapshot[] = []
try {
  for (const locale of region.locales) snapshots.push(await pullLocale(locale))
} catch (err) {
  console.error(`[sync] ${region.code} aborted, docs/ left untouched:`, err)
  process.exit(1)
}
for (const snap of snapshots) writeLocale(snap)
if (existsSync(DOCS_DIR)) {
  for (const d of readdirSync(DOCS_DIR, { withFileTypes: true })) {
    if (d.isDirectory() && !region.locales.includes(d.name)) rmSync(join(DOCS_DIR, d.name), { recursive: true })
  }
}
console.log(`[sync] ${region.code} done → ${DOCS_DIR}`)
