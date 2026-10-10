import { describe, expect, test } from 'bun:test'
import { flattenTopics, normalizeTree, parseTopicFile, parseTopicUrl, renderTopicFile } from '../src/lib/content-format'
import { buildNav, categoryPages, locateArticle } from '../src/lib/nav-core'

// 接口原始形状(PascalCase),取自 categories_tree 实际返回
const RAW = [
  {
    CategorySlug: 'acct', Title: 'Account ', Desc: 'd', Icon: 'i.png', Topics: [],
    Child: [
      { CategorySlug: 'open', Title: 'Open', Child: null, Topics: [{ Slug: 'a1', Title: 'A1' }, { Slug: 'a2', Title: 'A2' }] },
      { CategorySlug: 'sec', Title: 'Security', Topics: [{ Slug: 'a3', Title: 'A3' }], Child: [{ CategorySlug: 'deep', Title: 'Deep', Topics: [{ Slug: 'a4', Title: 'A4' }] }] },
      { CategorySlug: 'empty', Title: 'Empty', Topics: [] },
    ],
  },
  { CategorySlug: 'desk', Title: 'Desktop', Topics: [{ Slug: 'd1', Title: 'D1' }], Child: [{ CategorySlug: 'win', Title: 'Win', Topics: [{ Slug: 'd2', Title: 'D2' }] }] },
  { CategorySlug: 'none', Title: 'Nothing', Topics: [], Child: [] },
]

describe('content-format', () => {
  test('normalizeTree 归一字段并去掉标题首尾空白', () => {
    const tree = normalizeTree(RAW)
    expect(tree[0].title).toBe('Account')
    expect(tree[0].children[0].topics).toEqual([{ slug: 'a1', title: 'A1' }, { slug: 'a2', title: 'A2' }])
    expect(tree[0].children[0].children).toEqual([])
  })

  test('flattenTopics 先序遍历，带直属分类', () => {
    const flat = flattenTopics(normalizeTree(RAW))
    expect(flat.map((t) => `${t.categorySlug}/${t.slug}`)).toEqual(['open/a1', 'open/a2', 'sec/a3', 'deep/a4', 'desk/d1', 'win/d2'])
  })

  test('parseTopicUrl 解析 CMS 文章地址', () => {
    expect(parseTopicUrl('https://support.longbridgehk.com/topics/depositfunds/41fajdm')).toEqual({ categorySlug: 'depositfunds', slug: '41fajdm' })
    expect(parseTopicUrl('/hk/support/topics/x/y/')).toEqual({ categorySlug: 'x', slug: 'y' })
    expect(parseTopicUrl('https://example.com/other')).toBeNull()
    expect(parseTopicUrl(undefined)).toBeNull()
  })

  test('文章文件写出再读回保持一致(正文 HTML 原样保留)', () => {
    const rec = {
      slug: 'faq', categorySlug: 'marketoverview', topicId: '25388', title: 'Crypto "FAQ": 1',
      seoTitle: 'T | Longbridge', updatedAt: '1784789420',
      related: [{ categorySlug: 'c', slug: 's', title: 'R' }],
      content: '<p>a</p>\n\n    <figure class="image"><img src="x"/></figure>\n<p>b: c</p>',
    }
    const back = parseTopicFile('faq', renderTopicFile(rec))
    expect(back).toEqual({ ...rec, seoDescription: undefined, content: rec.content + '\n' })
  })
})

describe('nav-core', () => {
  const nav = buildNav(normalizeTree(RAW))

  test('无文章的分类不出现在导航里', () => {
    expect(nav.map((c) => c.slug)).toEqual(['acct', 'desk'])
    expect(nav[0].sections.map((s) => s.slug)).toEqual(['open', 'sec'])
  })

  test('一级分类直挂文章成为 direct 分组，三级文章并入所属二级分类', () => {
    expect(nav[1].sections[0]).toMatchObject({ slug: 'desk', direct: true })
    expect(nav[0].sections[1].articles.map((a) => a.path)).toEqual(['/support/topics/sec/a3', '/support/topics/deep/a4'])
    expect(nav[0].count).toBe(4)
  })

  test('分类页覆盖一级与二级分类，direct 分组不单独成页', () => {
    expect(categoryPages(nav).map((p) => p.slug)).toEqual(['acct', 'open', 'sec', 'desk', 'win'])
  })

  test('上一篇 / 下一篇按导航顺序跨分类', () => {
    const loc = locateArticle(nav, 'd1')!
    expect(loc.category.slug).toBe('desk')
    expect(loc.prev?.slug).toBe('a4')
    expect(loc.next?.slug).toBe('d2')
    expect(locateArticle(nav, 'a1')?.prev).toBeUndefined()
    expect(locateArticle(nav, 'missing')).toBeNull()
  })
})
