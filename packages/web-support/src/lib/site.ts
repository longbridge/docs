import { getRegion } from '../../region.mjs'
import { getDict } from './i18n'

declare const __LB_REGION__: string
declare const __LB_API_HOST__: string

/** 当前构建的地区(由 astro-config 按 app 注入) */
export const REGION = getRegion(__LB_REGION__)
/** 浏览器端搜索 / 反馈接口域名 */
export const API_HOST = __LB_API_HOST__

// canonical 恒指向生产域,canary(xyz)也归一到它做 SEO 去重，与现网一致
export const SITE_ORIGIN = 'https://longbridge.com'
export const OG_IMAGE = 'https://assets.lbctrl.com/uploads/b510b04f-9238-4fe0-b39d-11e076876ac1/longbridge-og.png!web'
export const FAVICON = 'https://assets.wbrks.com/assets/logo/logo1.png'

export { HOME_PATH, TOPIC_CAT_TOKEN, categoryPath, topicPath } from './paths'

/**
 * 站内页面路径(以 /support 开头)→ 对外路径。默认语言不带语言段(/hk/support),
 * 其余语言带(/hk/en/support),与现网 canonical 规则一致。
 */
export function localePath(locale: string, p: string): string {
  return `/${REGION.code}${locale === REGION.defaultLocale ? '' : '/' + locale}${p}`
}

export const canonicalUrl = (locale: string, p: string) => SITE_ORIGIN + localePath(locale, p)

export function alternates(p: string): { hreflang: string; href: string }[] {
  return REGION.locales.map((l) => ({ hreflang: REGION.hreflang[l], href: canonicalUrl(l, p) }))
}

/** 标题格式同现网 formatTitle:中文「标题｜長橋證券」,英文「Title | Longbridge」 */
export function formatTitle(locale: string, raw: string): string {
  const d = getDict(locale)
  return raw.includes(d.brand) ? raw : `${raw}${d.titleSep}${d.brand}`
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}
