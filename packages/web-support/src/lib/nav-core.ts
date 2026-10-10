import type { SupportCategory } from './content-format'
import { categoryPath, topicPath } from './paths'

export interface NavArticle { slug: string; title: string; categorySlug: string; path: string }
/** 一级分类下的分组：二级分类，或一级分类自身直挂的文章(direct) */
export interface NavSection { slug: string; title: string; direct: boolean; path: string; articles: NavArticle[] }
export interface NavCategory {
  slug: string
  title: string
  desc: string
  icon: string
  path: string
  count: number
  sections: NavSection[]
}

function collect(c: SupportCategory, into: NavArticle[]): void {
  for (const t of c.topics) into.push({ slug: t.slug, title: t.title, categorySlug: c.slug, path: topicPath(c.slug, t.slug) })
  // 树目前最深两级;更深的层级并入所属二级分类，避免文章在导航里丢失
  c.children.forEach((child) => collect(child, into))
}

/** CMS 分类树 → 导航模型(路径不含地区/语言前缀，渲染时经 localePath 展开) */
export function buildNav(tree: SupportCategory[]): NavCategory[] {
  return tree
    .map((top) => {
      const sections: NavSection[] = []
      if (top.topics.length > 0) {
        sections.push({
          slug: top.slug,
          title: top.title,
          direct: true,
          path: categoryPath(top.slug),
          articles: top.topics.map((t) => ({ slug: t.slug, title: t.title, categorySlug: top.slug, path: topicPath(top.slug, t.slug) })),
        })
      }
      for (const child of top.children) {
        const articles: NavArticle[] = []
        collect(child, articles)
        if (articles.length > 0) sections.push({ slug: child.slug, title: child.title, direct: false, path: categoryPath(child.slug), articles })
      }
      return {
        slug: top.slug,
        title: top.title,
        desc: top.desc,
        icon: top.icon,
        path: categoryPath(top.slug),
        count: sections.reduce((n, s) => n + s.articles.length, 0),
        sections,
      }
    })
    .filter((c) => c.count > 0)
}

/** 所有可访问的分类页：一级分类 + 二级分类(现网 /support/category/{二级 slug} 也是 200) */
export function categoryPages(nav: NavCategory[]): { slug: string; category: NavCategory; section?: NavSection }[] {
  const out: { slug: string; category: NavCategory; section?: NavSection }[] = []
  for (const cat of nav) {
    out.push({ slug: cat.slug, category: cat })
    for (const sec of cat.sections) if (!sec.direct) out.push({ slug: sec.slug, category: cat, section: sec })
  }
  return out
}

/** 文章所在的分类 / 分组，以及按导航顺序的上一篇、下一篇 */
export function locateArticle(nav: NavCategory[], slug: string) {
  const flat = nav.flatMap((c) => c.sections.flatMap((s) => s.articles.map((a) => ({ a, c, s }))))
  const i = flat.findIndex((x) => x.a.slug === slug)
  if (i === -1) return null
  return {
    category: flat[i].c,
    section: flat[i].s,
    prev: i > 0 ? flat[i - 1].a : undefined,
    next: i < flat.length - 1 ? flat[i + 1].a : undefined,
  }
}

export const CATX_CARD_LIMIT = 12
