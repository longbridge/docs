import type { Dict } from '../lib/i18n'

export interface SupportClientConfig {
  region: 'hk' | 'sg'
  locale: string
  apiHost: string
  headers: Record<string, string>
  /** 当前语言的路径前缀，如 /hk 或 /hk/en(拼 /support… 得到站内链接) */
  prefix: string
  i18n: Dict
}

/** BaseLayout 输出的 #lb-support-config,浏览器脚本的唯一配置来源 */
export const config: SupportClientConfig = JSON.parse(document.getElementById('lb-support-config')?.textContent ?? '{}')
export const t: Dict = config.i18n

export async function supportFetch(path: string, init: RequestInit = {}): Promise<any> {
  const res = await fetch(`${config.apiHost}/api/forward${path}`, {
    ...init,
    headers: { ...config.headers, ...(init.body ? { 'content-type': 'application/json' } : {}) },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const body = await res.json()
  if (body?.code !== 0) throw new Error(`code ${body?.code}`)
  return body.data
}
