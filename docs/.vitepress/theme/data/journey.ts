export type Market = 'hk' | 'us' | 'sg'

export interface TaskCard {
  id: string
  title: string
  subtitle: string
  href: string
  markets: Market[]
  featured: boolean
  icon: string
}

export interface Category {
  id: string
  num: string
  label: string
  tasks: TaskCard[]
}

const ALL: Market[] = ['hk', 'us', 'sg']

export const categories: Category[] = [
  {
    id: 'account',
    num: '01',
    label: 'data.journey.account.title',
    tasks: [
      { id: 'account-personal', title: '开个人账户', subtitle: '身份证 + 银行卡，5 分钟完成申请', href: '/zh-CN/account/opening/open-account', markets: ALL, featured: true, icon: 'UserPlus' },
      { id: 'account-types', title: '账户类型说明', subtitle: '个人、联名、机构的区别与限制', href: '/zh-CN/account/account-types/comprehensive-account', markets: ALL, featured: true, icon: 'Layers' },
      { id: 'account-faq', title: '开户常见问题', subtitle: '审核时长、材料要求、常见驳回原因', href: '/zh-CN/account/account-faq', markets: ALL, featured: true, icon: 'CircleHelp' },
      { id: 'account-joint', title: '开联名账户', subtitle: '两人联名，共同管理资产', href: '/zh-CN/account/account-types/comprehensive-account', markets: ALL, featured: false, icon: 'Users' },
      { id: 'account-switching', title: '账户切换指引', subtitle: '标准账户迁移至综合账户', href: '/zh-CN/account/account-switching', markets: ALL, featured: false, icon: 'ArrowLeftRight' },
    ],
  },
  {
    id: 'deposit',
    num: '02',
    label: 'data.journey.deposit.title',
    tasks: [
      { id: 'deposit-choose', title: '如何选择入金方式', subtitle: '对比各渠道速度、费率与限额', href: '/zh-CN/deposit/how-to-choose-deposit-method', markets: ALL, featured: true, icon: 'ArrowDownToLine' },
      { id: 'deposit-fps', title: 'FPS 转数快', subtitle: '最快即时到账，港币账户免手续费', href: '/zh-CN/deposit/hk-methods/fps', markets: ['hk'], featured: true, icon: 'Zap' },
      { id: 'deposit-edda', title: 'eDDA 自动扣款', subtitle: '绑定香港银行账户，自动定期入金', href: '/zh-CN/deposit/hk-methods/edda', markets: ['hk', 'us'], featured: true, icon: 'RefreshCw' },
      { id: 'deposit-wire', title: '电汇入金', subtitle: '支持港币、美元国际电汇', href: '/zh-CN/deposit/hk-methods/wire-transfer', markets: ['hk', 'us'], featured: false, icon: 'Send' },
      { id: 'deposit-paynow', title: 'PayNow 快速入金', subtitle: '新加坡本地银行，最快即时到账', href: '/zh-CN/deposit/sg-methods/paynow', markets: ['sg'], featured: true, icon: 'Smartphone' },
      { id: 'deposit-dda-sg', title: 'DDA 授权扣款', subtitle: '新加坡银行账户定期自动入金', href: '/zh-CN/deposit/sg-methods/dda-authorization', markets: ['sg'], featured: false, icon: 'RefreshCcw' },
      { id: 'deposit-wise', title: 'Wise 国际转账', subtitle: '低汇率损耗，适合跨境资金', href: '/zh-CN/deposit/sg-methods/wise', markets: ['sg'], featured: false, icon: 'Globe' },
    ],
  },
  {
    id: 'trade',
    num: '03',
    label: 'data.journey.trade.title',
    tasks: [
      { id: 'trade-first-hk', title: '买入第一只港股', subtitle: '主板/GEM，交易时段 09:30–16:00', href: '/zh-CN/getting-started/buy-first-hk-stock', markets: ['hk'], featured: true, icon: 'TrendingUp' },
      { id: 'trade-rules-hk', title: '港股交易规则', subtitle: '竞价、连续交易、收市竞价全机制', href: '/zh-CN/stock-trading/trading-hours-and-rules/hk-trading-rules', markets: ['hk'], featured: true, icon: 'BookOpen' },
      { id: 'trade-fees', title: '交易费用明细', subtitle: '平台费、佣金、印花税计算方式', href: '/zh-CN/stock-trading/trading-fees/fee-schedule', markets: ALL, featured: true, icon: 'Receipt' },
      { id: 'trade-rules-us', title: '美股交易规则', subtitle: 'NYSE/NASDAQ，盘前盘后交易说明', href: '/zh-CN/stock-trading/trading-hours-and-rules/us-trading-rules', markets: ['us'], featured: true, icon: 'BarChart2' },
      { id: 'trade-regular-us', title: '美股定投', subtitle: '按周期自动买入固定金额', href: '/zh-CN/stock-trading/trading-hours-and-rules/us-regular-investment', markets: ['us'], featured: false, icon: 'Timer' },
      { id: 'trade-short-us', title: '美股做空', subtitle: '做空资格、保证金要求详解', href: '/zh-CN/stock-trading/trading-hours-and-rules/us-short-selling', markets: ['us'], featured: false, icon: 'TrendingDown' },
      { id: 'trade-rules-sg', title: '新加坡股市规则', subtitle: '主板与凯利板，09:00–17:00', href: '/zh-CN/stock-trading/trading-hours-and-rules/sg-trading-rules', markets: ['sg'], featured: true, icon: 'Globe2' },
      { id: 'trade-order-types', title: '订单类型说明', subtitle: '限价、市价、条件单的使用场景', href: '/zh-CN/stock-trading/order-types/', markets: ALL, featured: false, icon: 'ListOrdered' },
    ],
  },
  {
    id: 'portfolio',
    num: '04',
    label: 'data.journey.portfolio.title',
    tasks: [
      { id: 'portfolio-overview', title: '持仓总览', subtitle: '实时持仓、成本价与最新市值', href: '/zh-CN/portfolio-and-statements/overview', markets: ALL, featured: true, icon: 'PieChart' },
      { id: 'portfolio-pnl', title: '盈亏分析', subtitle: '日、月、持有期盈亏与收益率', href: '/zh-CN/portfolio-and-statements/pnl', markets: ALL, featured: true, icon: 'BarChart3' },
      { id: 'portfolio-statement', title: '账单与对账单', subtitle: '下载月度、年度对账单及交易流水', href: '/zh-CN/portfolio-and-statements/statement', markets: ALL, featured: true, icon: 'FileText' },
    ],
  },
  {
    id: 'withdrawal',
    num: '05',
    label: 'data.journey.withdrawal.title',
    tasks: [
      { id: 'withdrawal-hk-bank', title: '出金到银行卡', subtitle: 'T+2 结算，支持港币、美元、新元', href: '/zh-CN/withdrawal/to-hk-bank-card', markets: ALL, featured: true, icon: 'ArrowUpFromLine' },
      { id: 'withdrawal-online', title: '网银转账出金', subtitle: '香港网银操作步骤与注意事项', href: '/zh-CN/withdrawal/hk-online-banking', markets: ['hk'], featured: true, icon: 'Building2' },
      { id: 'withdrawal-wire', title: '电汇出金', subtitle: '国际电汇，多币种支持', href: '/zh-CN/withdrawal/wire-transfer', markets: ALL, featured: false, icon: 'Send' },
      { id: 'withdrawal-transfers', title: '账户资金划转', subtitle: '跨账户资金划转说明', href: '/zh-CN/transfers-and-fx/cross-account-transfer', markets: ['sg'], featured: false, icon: 'Shuffle' },
    ],
  },
  {
    id: 'advanced',
    num: '06',
    label: 'data.journey.advanced.title',
    tasks: [
      { id: 'advanced-options', title: '期权开通与入门', subtitle: '开通资格、保证金要求、基础操作', href: '/zh-CN/derivatives/options/enable-options', markets: ALL, featured: true, icon: 'Flame' },
      { id: 'advanced-margin', title: '融资保证金规则', subtitle: '融资利率、维持保证金、追加说明', href: '/zh-CN/margin/margin-requirements', markets: ALL, featured: true, icon: 'ShieldCheck' },
      { id: 'advanced-us-tax', title: '美股税务与 W-8BEN', subtitle: '股息预扣税率、W-8BEN 表格填写', href: '/zh-CN/compliance-and-tax/us-stock-tax', markets: ['us'], featured: false, icon: 'FileCheck' },
      { id: 'advanced-troubleshoot', title: '故障排查指南', subtitle: '登录、下单、出金的常见异常处理', href: '/zh-CN/troubleshooting/', markets: ALL, featured: true, icon: 'Wrench' },
    ],
  },
]

export function getMarketTasks(categoryId: string, market: Market): TaskCard[] {
  if (categoryId === 'all') {
    return categories.flatMap(c => c.tasks).filter(t => t.markets.includes(market) && t.featured)
  }
  const cat = categories.find(c => c.id === categoryId)
  return cat ? cat.tasks.filter(t => t.markets.includes(market)) : []
}

export function getMarketCount(categoryId: string, market: Market): number {
  return getMarketTasks(categoryId, market).length
}

export const markets: { value: Market; label: string }[] = [
  { value: 'hk', label: 'journey.markets.hk' },
  { value: 'us', label: 'journey.markets.us' },
  { value: 'sg', label: 'journey.markets.sg' },
]
