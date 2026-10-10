/**
 * 官网 HK / SG 页脚的数据与链接，移植自 longbridge-websites packages/website-footer/src/{hk,sg}
 * (footer.tsx + footer-defaults.ts;文案在同目录 locales 副本里)。
 * 生产 App Configs 的 web_official_footer_hk / _sg 当前为空，官网显示的就是这份默认内容。
 * 链接形态对齐线上首页实际输出 (默认语言不带语言段、学堂 /{locale}/academy 等)。
 */
import hkEn from './hk/en'
import hkZhCN from './hk/zh-cn'
import hkZhHK from './hk/zh-hk'
import sgEn from './sg/en'
import sgZhCN from './sg/zh-cn'
import sgZhHK from './sg/zh-hk'

type Dict = Record<string, unknown>
const LOCALES: Record<'hk' | 'sg', Record<string, Dict>> = {
  hk: { 'en': hkEn, 'zh-CN': hkZhCN, 'zh-HK': hkZhHK },
  sg: { 'en': sgEn, 'zh-CN': sgZhCN, 'zh-HK': sgZhHK },
}

/** 按 i18next 的点路径取文案;缺失时直接抛错，避免页脚静默漏字 */
export function footerT(region: 'hk' | 'sg', locale: string, key: string): string {
  const value = key.split('.').reduce<unknown>((node, seg) => (node as Dict | undefined)?.[seg], LOCALES[region][locale])
  if (typeof value !== 'string') throw new Error(`footer ${region}/${locale} missing key ${key}`)
  return value.replace(/\{\{year\}\}/g, String(new Date().getFullYear()))
}

const DEFAULT_LOCALE = { hk: 'zh-HK', sg: 'en' } as const
/** 官网站内路径：/{region}{/locale，默认语言省略}{path} */
export const sitePath = (region: 'hk' | 'sg', locale: string, path: string) =>
  `/${region}${locale === DEFAULT_LOCALE[region] ? '' : '/' + locale}${path}`
/** 不分地区的页面 (学堂):英文不带语言段 */
const localeOnlyPath = (locale: string, path: string) => `${locale === 'en' ? '' : '/' + locale}${path}`

export interface LicensedEntity { id: string; name: string; desc: string; flag: string; link?: string; licenseLink?: string }
export interface FooterLink { label: string; href: string; external?: boolean }
export interface FooterColumn { title: string; links: FooterLink[] }

const MAS_LICENSE_LINK = 'https://eservices.mas.gov.sg/fid/institution/detail/246919-LONG-BRIDGE-SECURITIES-PTE-LTD'
const FLAGS = {
  hk: 'https://pub.lbkrs.com/static/offline/202211/76gj1hFUrcZYqs1h/tb_round_HK.png',
  sgHk: 'https://pub.lbkrs.com/static/offline/202211/rRsVCZBUQqXd6a2r/Group_626815.png',
  sgSg: 'https://assets.lbkrs.com/uploads/4e2582ab-2192-45bf-ab22-579dc5120d17/tb_round_SG.svg',
  us: 'https://pub.lbkrs.com/static/offline/202211/Ph6iHDa2unguUgoW/tb_round_US.png',
  nz: 'https://pub.lbkrs.com/static/offline/202211/y8RCfTGyV7W2V7Ex/tb_round_NZ.png',
}

export const SOCIAL = {
  hk: [
    { name: 'Facebook', href: 'https://www.facebook.com/Longbridgehk', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/longbridgehk/', icon: 'instagram' },
    { name: 'X', href: 'https://x.com/longbridgehk', icon: 'x' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/74327933/admin/page-posts/published/', icon: 'linkedin' },
    { name: 'GitHub', href: 'https://github.com/longbridge', icon: 'github' },
  ],
  sg: [
    { name: 'facebook', href: 'https://www.facebook.com/SGLongbridge', icon: 'facebook' },
    { name: 'instagram', href: 'https://www.instagram.com/longbridge.sg?igsh=amZhano5cWl3bndk', icon: 'instagram' },
    { name: 'x', href: 'https://x.com/sg_longbridge', icon: 'x' },
    { name: 'tiktok', href: 'https://www.tiktok.com/@longbridge.sg', icon: 'tiktok' },
    { name: 'github', href: 'https://github.com/longbridge', icon: 'github' },
  ],
} as const

export function hkFooter(locale: string) {
  const t = (k: string) => footerT('hk', locale, k)
  const p = (path: string) => sitePath('hk', locale, path)
  const helpCenter = `https://longbridge.com/hk/support/topics/1v0peh2/d5vhrx?locale=${locale}`
  const terms = (slug: string) => `https://longbridge.com/hk/${locale}/support/topics/${slug}?locale=${locale}`
  return {
    contact: {
      phoneTitle: t('footer.contact.title'),
      hkPhoneLabel: t('footer.contact.hk_phone'),
      hkPhone: '+852 2652 4496',
      globalPhone: t('footer.contact.mainland_phone'),
      whatsapp: '+852 5223 6373',
      emails: [
        { title: t('footer.contact.email'), address: 'service@longbridge.hk' },
        { title: t('footer.contact.media'), address: 'media@longbridge.global' },
        { title: t('footer.contact.cooperation'), address: 'cooperation@longbridge.hk' },
      ],
    },
    columns: {
      trading: {
        title: t('footer.trading.title'),
        links: [
          { label: t('footer.trading.pricing'), href: p('/rate') },
          { label: t('footer.trading.platforms'), href: p('/trading-platforms') },
          { label: t('footer.trading.openapi'), href: `https://open.longbridge.com/${locale}`, external: true },
          { label: t('footer.trading.products'), href: p('/investment-products') },
          { label: t('footer.trading.tools'), href: p('/trade') },
        ],
      },
      account: {
        title: t('footer.account.title'),
        links: [
          { label: t('footer.account.individual'), href: p('/individuals') },
          { label: t('footer.account.institutional'), href: p('/institutions') },
          { label: t('footer.account.guide'), href: helpCenter, external: true },
        ],
      },
      info: {
        title: t('footer.info.title'),
        links: [
          { label: t('footer.info.community'), href: 'https://longbridge.com/topics', external: true },
          { label: t('footer.info.quotes'), href: p('/quotation-service') },
          { label: t('footer.info.tools'), href: p('/tools') },
          { label: t('footer.info.services'), href: p('/information-service') },
          { label: t('footer.info.dolphin'), href: 'https://longbridge.com/dolphin/research', external: true },
        ],
      },
      about: {
        title: t('footer.about.title'),
        links: [
          { label: t('footer.about.about_us'), href: p('/about') },
          { label: t('footer.about.careers'), href: p('/jobs') },
          { label: t('footer.about.blog'), href: localeOnlyPath(locale, '/academy') },
          { label: t('footer.about.status_page'), href: `https://status.longbridge.com/${locale}`, external: true },
          { label: t('footer.about.changelog'), href: `https://longbridge.com/changelog/${locale}`, external: true },
        ],
      },
      terms: {
        title: t('footer.terms.title'),
        links: [
          { label: t('footer.terms.disclaimer'), href: terms('misc/3isdzoe'), external: true },
          { label: t('footer.terms.agreement'), href: terms('us-trade/user-agreement'), external: true },
          { label: t('footer.terms.privacy'), href: terms('misc/privacy_policy'), external: true },
        ],
      },
    } satisfies Record<string, FooterColumn>,
    socialTitle: t('footer.social.title'),
    serviceHours: [t('footer_121'), t('footer_122')],
    onlineServiceNote: t('footer_13'),
    copyright: t('footer.copyright'),
    offers: t('features_layout_footer_1620'),
    languages: [
      { locale: 'zh-CN', label: t('footer.language.zh_cn') },
      { locale: 'zh-HK', label: t('footer.language.zh_hk') },
      { locale: 'en', label: t('footer.language.en') },
    ],
    statement: t('footer_36'),
    licensedTitle: t('any_key1'),
    licensed: [
      { id: 'hk', name: 'Long Bridge HK Limited', desc: t('features_layout_footer_licensedentitiesinformation_1772'), flag: FLAGS.hk, link: 'https://longbridge.com/hk' },
      { id: 'sg', name: 'Long Bridge Securities Pte. Ltd.', desc: t('features_layout_footer_licensedentitiesinformation_1770'), flag: FLAGS.sgHk, link: 'https://longbridge.com/sg', licenseLink: MAS_LICENSE_LINK },
      { id: 'us', name: 'Long Bridge Securities LLC', desc: t('features_layout_footer_licensedentitiesinformation_1773'), flag: FLAGS.us },
      { id: 'nz', name: 'Long Bridge Securities Limited', desc: t('features_layout_footer_licensedentitiesinformation_1774'), flag: FLAGS.nz, link: 'https://longbridge.com/nz' },
    ] satisfies LicensedEntity[],
    disclaimerTitle: t('footer_032'),
    disclaimerItems: [t('features_layout_footer_1686'), t('features_layout_footer_1687')],
  }
}

const RISK_DISCLOSURE_LINK = 'https://assets.lbctrl.com/uploads/cf36b321-3c2d-4f48-8800-584a33af9bba/sg_risk_disclosure_2022.pdf'

export function sgFooter(locale: string) {
  const t = (k: string) => footerT('sg', locale, k)
  const p = (path: string) => sitePath('sg', locale, path)
  const support = (slug: string) => `https://longbridge.com/sg/${locale}/support/topics/${slug}?locale=${locale}`
  const entity = (id: 'sg' | 'hk' | 'us' | 'nz', flag: string, link?: string, licenseLink?: string): LicensedEntity => ({
    id, name: t(`footer.licensed.${id}.name`), desc: t(`footer.licensed.${id}.desc`), flag, link, licenseLink,
  })
  return {
    contact: {
      emailTitle: t('footer.contact.email_title'),
      email: t('footer.contact.email'),
      emailNote: t('footer.contact.email_note'),
      phone: t('footer.contact.dealing_number'),
      dealingHours: t('footer.contact.dealing_hours'),
    },
    institutions: {
      title: t('footer.institutions.title'),
      corporate: { label: t('footer.institutions.corporate'), href: p('/institutions') },
      openapi: { label: t('footer.institutions.openapi'), href: `https://open.longbridge.com/${locale}/` },
      whatsappLabel: t('footer.institutions.whatsapp_label'),
      whatsapp: t('footer.institutions.whatsapp_number'),
      whatsappNote: t('footer.institutions.whatsapp_note'),
    },
    terms: {
      title: t('footer.terms.title'),
      links: [
        { label: t('footer.terms.customer_agreement'), href: 'https://assets.lbctrl.com/uploads/ff47fc7a-fd06-4434-9c55-9d22af9b89b6/6259aa815eaf47afa4007deb4caf4c4d.pdf', external: true },
        { label: t('footer.terms.privacy'), href: support('Other/privacy-policy'), external: true },
        { label: t('footer.terms.terms'), href: 'https://assets.lbctrl.com/uploads/71526691-ef72-4fd1-ac03-0c47cf59e720/0b7a0a7f74435118472232d2d4268e8c.pdf', external: true },
        { label: t('footer.terms.best_execution'), href: 'https://assets.lbctrl.com/uploads/84fe99c1-85d8-4837-8901-9082bd9af338/4b919b3f7f994ff4480e17cfb42279c6.pdf', external: true },
        { label: t('footer.terms.risk_disclosure'), href: support('accountopening/account-risk-disclosure-statement'), external: true },
        { label: t('footer_18'), href: support('accountopening/safe'), external: true },
      ],
    } satisfies FooterColumn,
    about: {
      title: t('footer.about.title'),
      links: [
        { label: t('footer.about.about'), href: p('/about') },
        { label: t('footer.about.license'), href: p('/about/license-regulatory') },
        { label: t('footer.about.jobs'), href: p('/jobs') },
        { label: t('footer.about.blog'), href: localeOnlyPath(locale, '/academy') },
        { label: t('footer.about.status_page'), href: `https://status.longbridge.com/${locale}`, external: true },
      ],
    } satisfies FooterColumn,
    partnership: { title: t('footer.partnership.title'), affiliate: { label: t('footer.partnership.affiliate'), href: '/sg/alliance' } },
    followTitle: t('footer.follow.title'),
    followLabel: (name: string) => t(`footer.follow.${name}`),
    copyright: t('footer.meta.copyright'),
    offers: t('footer.meta.offers'),
    // 官网 SG 页脚只列简体与英文 (繁体在源码里注释掉了)
    languages: [
      { locale: 'zh-CN', label: t('footer.language.zh_cn') },
      { locale: 'en', label: t('footer.language.en') },
    ],
    regulation: t('footer.regulation.text'),
    regulationLink: MAS_LICENSE_LINK,
    licensedTitle: t('footer.licensed.title'),
    licensed: [
      entity('sg', FLAGS.sgSg, 'https://longbridge.com/sg', MAS_LICENSE_LINK),
      entity('hk', FLAGS.hk, 'https://longbridge.com/hk'),
      entity('us', FLAGS.us),
      entity('nz', FLAGS.nz, 'https://longbridge.com/nz'),
    ],
    notes: [t('footer.disclaimer.fees'), t('footer.disclaimer.ai_native_definition')],
    disclaimerTitle: t('footer.disclaimer.title'),
    disclaimerItems: ['item1', 'item2', 'item3', 'item4', 'risk', 'item6', 'item7', 'item8', 'ai_tools', 'address'].map((k) => t(`footer.disclaimer.${k}`)),
    riskDisclosureLink: RISK_DISCLOSURE_LINK,
  }
}

/** 文案里的 `<0>…</0>` 渲染成新窗口链接 (同官网 ConfigRichText);没有 href 按普通文字。输出已转义的 HTML */
export function richText(text: string, href?: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  return text
    .split(/<0>(.*?)<\/0>/)
    .map((part, i) => (i % 2 === 1 && href ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>` : esc(part)))
    .join('')
}
