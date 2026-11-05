import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parseTopicFile, type RecommendedTopic, type SupportCategory, type TopicRecord } from './content-format'
import { buildNav, type NavCategory } from './nav-core'

// 构建在 app 目录执行(apps/web-{region}),同步产物在其 docs/ 下
const DOCS_DIR = join(process.cwd(), 'docs')

interface LocaleContent {
  tree: SupportCategory[]
  nav: NavCategory[]
  recommended: RecommendedTopic[]
  topics: Map<string, TopicRecord>
}

const cache = new Map<string, LocaleContent>()

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as T) : fallback
}

/** 读取某语言的同步产物;缺分类树视为未同步，直接失败而不是产出空站 */
export function getContent(locale: string): LocaleContent {
  const hit = cache.get(locale)
  if (hit) return hit
  const dir = join(DOCS_DIR, locale)
  const treeFile = join(dir, '_tree.json')
  if (!existsSync(treeFile)) throw new Error(`${treeFile} missing — run \`bun run sync\` first`)
  const tree = readJson<SupportCategory[]>(treeFile, [])
  const topics = new Map<string, TopicRecord>()
  const topicsDir = join(dir, 'topics')
  for (const f of existsSync(topicsDir) ? readdirSync(topicsDir) : []) {
    if (!f.endsWith('.md')) continue
    const slug = f.slice(0, -3)
    topics.set(slug, parseTopicFile(slug, readFileSync(join(topicsDir, f), 'utf8')))
  }
  const content = { tree, nav: buildNav(tree), recommended: readJson<RecommendedTopic[]>(join(dir, '_recommended.json'), []), topics }
  cache.set(locale, content)
  return content
}
