/**
 * 神策上报的纯函数部分(无 DOM 依赖，便于单测)。运行时见 scripts/sensors.ts。
 * 写法与开发者平台 longbridge/developers src/lib/sensors.ts 一致，上报到同一套神策项目、同一张浏览表。
 */

/** 上报地址：正式域名报 production 项目，其余(canary longbridge.xyz、本地)报 default 测试项目 */
const SERVER_URL = {
  production: 'https://event-tracking.lbkrs.com/sa?project=production',
  default: 'https://event-forward.longbridge.xyz/sa?project=default',
} as const

export function isProductionHost(hostname: string): boolean {
  return hostname === 'longbridge.com' || hostname.endsWith('.longbridge.com')
}

export function sensorsServerUrl(hostname: string): string {
  return isProductionHost(hostname) ? SERVER_URL.production : SERVER_URL.default
}

/**
 * 去掉主站给设备号加的「-域名后两段」后缀(如 abc123-longbridge.com → abc123)。
 * 同 longbridge-websites packages/request/src/device-id.ts stripDeviceIdDomainSuffix,
 * 主站上报 web_deviceId 前也这样处理。
 */
export function stripDeviceIdDomainSuffix(id: string, hostname: string): string {
  if (!hostname) return id
  const suffix = `-${hostname.split('.').slice(-2).join('.')}`
  return id.endsWith(suffix) ? id.slice(0, -suffix.length) : id
}

/** 从 document.cookie 字符串读取某个 cookie;没有或解码失败返回 undefined */
export function readCookieFrom(cookie: string, name: string): string | undefined {
  const m = cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`))
  if (!m) return undefined
  try {
    return decodeURIComponent(m[1])
  } catch {
    return undefined
  }
}

/**
 * 公共属性，与官网主站 packages/sensors 同名同值，便于和主站浏览记录拼在一起：
 * 小写 platform_type、驼峰 web_deviceId(主站一级域 cookie device_id,没有就不带)。
 */
export function commonProperties(opts: { cookie: string; hostname: string; userAgent: string }): Record<string, string> {
  const raw = readCookieFrom(opts.cookie, 'device_id')
  const deviceId = raw ? stripDeviceIdDomainSuffix(raw, opts.hostname) : ''
  return {
    platform_type: 'web',
    user_agent: opts.userAgent,
    site: opts.hostname,
    ...(deviceId ? { web_deviceId: deviceId } : {}),
  }
}
