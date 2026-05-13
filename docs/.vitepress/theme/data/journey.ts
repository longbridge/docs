export type Market = 'hk' | 'us' | 'sg'

export interface DocLink {
  title: string
  path: string
}

export interface MarketDetail {
  chips: string[]
  settlement?: string
  hours?: string
}

export interface PipelineNode {
  id: string
  num: string
  kind: 'main' | 'branch'
  title: string
  docCount: number
  aiContext: string
  marketDetails: {
    hk?: MarketDetail
    us?: MarketDetail
    sg?: MarketDetail
    common?: MarketDetail
  }
  docs: {
    common?: DocLink[]
    hk?: DocLink[]
    us?: DocLink[]
    sg?: DocLink[]
  }
}

// Legacy alias
export type JourneyStep = PipelineNode

export function getNodeDetails(node: PipelineNode, market: Market): MarketDetail {
  return node.marketDetails[market] ?? node.marketDetails.common ?? { chips: [] }
}

export function getNodeDocs(node: PipelineNode, market: Market): DocLink[] {
  return node.docs[market] ?? node.docs.common ?? []
}

// Legacy alias
export const getStepDocs = getNodeDocs

export const pipelineNodes: PipelineNode[] = [
  {
    id: 'account',
    num: '01',
    kind: 'main',
    title: 'data.journey.account.title',
    docCount: 13,
    aiContext: '长桥开户流程和账户类型',
    marketDetails: {
      common: { chips: ['个人账户', '联名账户', '机构账户'] },
    },
    docs: {
      common: [
        { title: '如何开户', path: '/zh-CN/account/opening/' },
        { title: '账户类型说明', path: '/zh-CN/account/account-types/' },
        { title: '开户常见问题', path: '/zh-CN/account/account-faq' },
      ],
    },
  },
  {
    id: 'deposit',
    num: '02',
    kind: 'main',
    title: 'data.journey.deposit.title',
    docCount: 17,
    aiContext: '长桥入金方式和操作流程',
    marketDetails: {
      hk: { chips: ['FPS', 'eDDA', '电汇'] },
      us: { chips: ['电汇', 'eDDA', 'ACH'] },
      sg: { chips: ['PayNow', 'DDA', 'Wise'] },
    },
    docs: {
      hk: [
        { title: '如何选择入金方式', path: '/zh-CN/deposit/how-to-choose-deposit-method' },
        { title: 'FPS 转数快入金', path: '/zh-CN/deposit/hk-methods/fps' },
        { title: 'eDDA 自动扣款', path: '/zh-CN/deposit/hk-methods/edda' },
      ],
      us: [
        { title: '如何选择入金方式', path: '/zh-CN/deposit/how-to-choose-deposit-method' },
        { title: '电汇入金（港币账户）', path: '/zh-CN/deposit/hk-methods/wire-transfer' },
        { title: 'eDDA 自动扣款', path: '/zh-CN/deposit/hk-methods/edda' },
      ],
      sg: [
        { title: 'PayNow 快速入金', path: '/zh-CN/deposit/sg-methods/paynow' },
        { title: 'DDA 自动扣款', path: '/zh-CN/deposit/sg-methods/dda-authorization' },
        { title: 'Wise 国际转账', path: '/zh-CN/deposit/sg-methods/wise' },
      ],
    },
  },
  {
    id: 'trade',
    num: '03',
    kind: 'main',
    title: 'data.journey.trade.title',
    docCount: 11,
    aiContext: '长桥首次买入股票，交易规则和时段',
    marketDetails: {
      hk: { chips: ['主板', 'GEM'], hours: '09:30–16:00' },
      us: { chips: ['NYSE', 'NASDAQ'], hours: '21:30–04:00' },
      sg: { chips: ['主板', '凯利板'], hours: '09:00–17:00' },
    },
    docs: {
      hk: [
        { title: '买入第一只港股', path: '/zh-CN/getting-started/buy-first-hk-stock' },
        { title: '港股交易规则与时段', path: '/zh-CN/stock-trading/trading-hours-and-rules/hk-trading-rules' },
        { title: '港股交易费用明细', path: '/zh-CN/stock-trading/trading-fees/fee-schedule' },
      ],
      us: [
        { title: '美股交易规则与时段', path: '/zh-CN/stock-trading/trading-hours-and-rules/us-trading-rules' },
        { title: '美股定投', path: '/zh-CN/stock-trading/trading-hours-and-rules/us-regular-investment' },
        { title: '美股做空规则', path: '/zh-CN/stock-trading/trading-hours-and-rules/us-short-selling' },
      ],
      sg: [
        { title: '新加坡股市交易规则', path: '/zh-CN/stock-trading/trading-hours-and-rules/sg-trading-rules' },
        { title: '交易费用明细', path: '/zh-CN/stock-trading/trading-fees/fee-schedule' },
        { title: '订单类型说明', path: '/zh-CN/stock-trading/order-types/' },
      ],
    },
  },
  {
    id: 'portfolio',
    num: '04',
    kind: 'main',
    title: 'data.journey.portfolio.title',
    docCount: 9,
    aiContext: '长桥持仓查看和对账单',
    marketDetails: {
      common: { chips: ['持仓', '盈亏', '对账单'] },
    },
    docs: {
      common: [
        { title: '持仓总览', path: '/zh-CN/portfolio-and-statements/overview' },
        { title: '盈亏分析', path: '/zh-CN/portfolio-and-statements/pnl' },
        { title: '账单与对账单', path: '/zh-CN/portfolio-and-statements/statement' },
      ],
    },
  },
  {
    id: 'withdrawal',
    num: '05',
    kind: 'main',
    title: 'data.journey.withdrawal.title',
    docCount: 6,
    aiContext: '长桥出金到银行卡',
    marketDetails: {
      hk: { chips: ['港币', '美元'], settlement: 'T+2' },
      us: { chips: ['美元', '港币'], settlement: 'T+1' },
      sg: { chips: ['新元', '港币'], settlement: 'T+2' },
    },
    docs: {
      hk: [
        { title: '出金到香港银行卡', path: '/zh-CN/withdrawal/to-hk-bank-card' },
        { title: '网银转账出金', path: '/zh-CN/withdrawal/hk-online-banking' },
        { title: '电汇出金', path: '/zh-CN/withdrawal/wire-transfer' },
      ],
      us: [
        { title: '电汇出金', path: '/zh-CN/withdrawal/wire-transfer' },
        { title: '出金到香港银行卡', path: '/zh-CN/withdrawal/to-hk-bank-card' },
        { title: '美股税务与 W-8BEN', path: '/zh-CN/compliance-and-tax/us-stock-tax' },
      ],
      sg: [
        { title: '电汇出金', path: '/zh-CN/withdrawal/wire-transfer' },
        { title: '出金到香港银行卡', path: '/zh-CN/withdrawal/to-hk-bank-card' },
        { title: '账户资金划转', path: '/zh-CN/transfers-and-fx/' },
      ],
    },
  },
  {
    id: 'advanced',
    num: '06',
    kind: 'branch',
    title: 'data.journey.advanced.title',
    docCount: 24,
    aiContext: '长桥进阶交易功能和常见问题',
    marketDetails: {
      common: { chips: ['期权 24', '融资 11', '税务 9'] },
    },
    docs: {
      common: [
        { title: '期权开通与入门', path: '/zh-CN/derivatives/options/enable-options' },
        { title: '融资保证金规则', path: '/zh-CN/margin/' },
        { title: '故障排查指南', path: '/zh-CN/troubleshooting/' },
      ],
    },
  },
]

// Legacy alias
export const journeySteps = pipelineNodes

export const markets: { value: Market; label: string }[] = [
  { value: 'hk', label: 'journey.markets.hk' },
  { value: 'us', label: 'journey.markets.us' },
  { value: 'sg', label: 'journey.markets.sg' },
]
