/** 站内页面路径(不含地区 / 语言前缀),与现网 /support 路由一一对应 */
export const HOME_PATH = '/support'
export const categoryPath = (slug: string) => `/support/category/${slug}`
export const topicPath = (categorySlug: string, slug: string) => `/support/topics/${categorySlug}/${slug}`

/**
 * 文章页 SEO 地址(canonical / og:url / hreflang / llms / 面包屑)里的分类段占位符。
 * 现网 canonical 跟随请求 URL 里的分类段，而产物按 slug 只有一份，故由 nginx sub_filter
 * 在响应时替换成请求里的分类段(websites-nginx _hk_sg_support_docs_body.conf)。
 * 只能出现在 HTML 里，nginx 只对 text/html 做替换。
 */
export const TOPIC_CAT_TOKEN = '__lb_topic_cat__'
