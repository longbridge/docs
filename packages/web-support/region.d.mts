export interface SupportRegion {
  code: 'hk' | 'sg'
  locales: string[]
  defaultLocale: string
  saasHost: string
  accountChannel: string
  appId: string
  hreflang: Record<string, string>
}
export const REGIONS: Record<'hk' | 'sg', SupportRegion>
export const DEFAULT_API_HOST: string
export function getRegion(code: string): SupportRegion
export function supportHeaders(region: SupportRegion, locale: string): Record<string, string>
