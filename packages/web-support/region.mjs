/**
 * HK / SG 官网帮助中心的地区配置单一来源：astro.config、同步脚本、页面渲染共用。
 * 租户请求头取值对齐 longbridge-websites packages/constants/src/region-tenant.ts。
 */
export const REGIONS = {
  hk: {
    code: 'hk',
    locales: ['zh-HK', 'en', 'zh-CN'],
    defaultLocale: 'zh-HK',
    saasHost: 'support.longbridge.hk',
    accountChannel: 'lb',
    appId: 'longbridge',
    hreflang: { 'en': 'en-HK', 'zh-CN': 'zh-Hans-HK', 'zh-HK': 'zh-Hant-HK' },
  },
  sg: {
    code: 'sg',
    // 线上 /sg/zh-HK/support 仍在服务且出现在 hreflang 里，保留三语以免旧链接失效
    locales: ['en', 'zh-CN', 'zh-HK'],
    defaultLocale: 'en',
    saasHost: 'support.longbridge.sg',
    accountChannel: 'lb_sg',
    appId: 'longbridge_sg',
    hreflang: { 'en': 'en-SG', 'zh-CN': 'zh-Hans-SG', 'zh-HK': 'zh-Hant-SG' },
  },
}

/** 生产接口域名；canary 等环境由 SUPPORT_API_HOST 覆盖 */
export const DEFAULT_API_HOST = 'https://mr.lbkrs.com'

export function getRegion(code) {
  const region = REGIONS[code]
  if (!region) throw new Error(`unknown support region: ${code}`)
  return region
}

/** 租户请求头：同步脚本与浏览器端搜索 / 反馈共用 */
export function supportHeaders(region, locale) {
  return {
    'x-saas-host': region.saasHost,
    'x-account-channel': region.accountChannel,
    'account-channel': region.accountChannel,
    'x-app-id': region.appId,
    'x-prefer-language': locale,
    'accept-language': locale,
    'x-platform': 'web',
    'x-org-id': '1',
    'x-target-org-id': '1',
  }
}
