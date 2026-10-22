/**
 * Category icon SVGs and slug-to-key mapping.
 * Icons are the Zendesk theme's `iconForCatSvg` set (lucide-style, stroke-width 2)
 * so Header mega-menu + SideTree render the exact same glyphs as the live theme.
 */

const OPEN = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'

export const CAT_ICONS: Record<string, string> = {
  // AI — sparkle
  ai: `${OPEN}<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`,
  // Trading & Investing — bar chart
  trading: `${OPEN}<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
  // Account & Security — shield + check
  security: `${OPEN}<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  // Funding — wallet
  funding: `${OPEN}<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>`,
  // Promotions / Campaigns — gift
  promotion: `${OPEN}<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`,
  // Opening an Account — user
  opening: `${OPEN}<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
  // Longbridge Community — users
  community: `${OPEN}<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>`,
  // Documents & Taxes — file
  document: `${OPEN}<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  // Fallback — book
  book: `${OPEN}<path d="M4 4h11a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M4 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h13"/></svg>`,
  // ── HK/SG 分类(按标题选，见 iconKeyForTitle)──
  withdraw: `${OPEN}<path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/></svg>`,
  deposit: `${OPEN}<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>`,
  swap: `${OPEN}<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>`,
  coins: `${OPEN}<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
  fund: `${OPEN}<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
  crypto: `${OPEN}<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg>`,
  building: `${OPEN}<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  percent: `${OPEN}<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  globe: `${OPEN}<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  grid: `${OPEN}<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  academy: `${OPEN}<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
  news: `${OPEN}<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
  rocket: `${OPEN}<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
}

/**
 * HK/SG 分类按标题(三语任一)选图标:CMS 分类 slug 是随机串，且 staging / 生产分类不同，
 * 只能看标题。规则自上而下，先具体后宽泛;都不命中回退 book。
 */
const TITLE_RULES: [RegExp, string][] = [
  [/withdraw|出金|提取/i, 'withdraw'],
  [/deposit|入金|存入/i, 'deposit'],
  [/conversion|exchange|兑换|兌換|换汇|換匯/i, 'swap'],
  [/cash ?plus|现金|現金/i, 'coins'],
  [/crypto|virtual asset|加密|虚拟资产|虛擬資產/i, 'crypto'],
  [/corporate action|公司行动|公司行動/i, 'building'],
  [/margin|融资|融資|孖展/i, 'percent'],
  [/\bipo\b|新股/i, 'rocket'],
  [/transfer|资金|資金|转仓|轉倉/i, 'funding'],
  [/\bfunds?\b|基金/i, 'fund'],
  [/opening|开户|開戶/i, 'opening'],
  [/account|security|账户|賬戶|帳戶|安全/i, 'security'],
  [/academy|education|学堂|學堂|教育/i, 'academy'],
  [/news|资讯|資訊/i, 'news'],
  [/campaign|promotion|活动|活動|优惠|優惠/i, 'promotion'],
  [/(us|hk|uk|sg|a-share|china)\s*market|美股|港股|英股|新加坡|a\s*股/i, 'globe'],
  [/market|trading|行情|交易/i, 'trading'],
  [/product|feature|desktop|产品|產品|功能|桌面/i, 'grid'],
  [/\bai\b|longbridgeai/i, 'ai'],
]

export function iconKeyForTitle(title: string): string {
  for (const [re, key] of TITLE_RULES) if (re.test(title)) return key
  return 'book'
}
