/**
 * 神策(sensors)页面浏览上报。11-11 帮助中心从官网前端搬到本 Astro 站后没有接神策，
 * 数仓里帮助中心浏览几乎归零；这里补回，写法同开发者平台(longbridge/developers src/lib/sensors.ts)。
 *
 * - SDK 由 BaseLayout 的 <script defer> 加载，挂在 window.sensorsDataAnalytic201505。
 * - 首次加载上报 $pageview;文章页之间的无刷新切换(client-router.ts 用 pushState)由
 *   is_track_single_page 自动补报。
 * - 点击自动记 $WebClick,停留和滚动记 $WebStay,与开发者平台一致。
 * - 任何异常都吞掉，统计不能影响页面。
 */
import { commonProperties, sensorsServerUrl } from '../lib/sensors-core'

type SensorsSdk = {
  init: (config: Record<string, unknown>) => void
  quick: (name: string, ...args: unknown[]) => void
  registerPage: (properties: Record<string, unknown>) => void
}

const GLOBAL_KEY = 'sensorsDataAnalytic201505'
const POLL_MS = 100
const POLL_MAX_TRIES = 50 // 最多等 5 秒

const w = window as unknown as Record<string, unknown> & { __lbSupportSensors?: boolean }

function start(sdk: SensorsSdk): void {
  if (w.__lbSupportSensors) return
  w.__lbSupportSensors = true
  try {
    sdk.init({
      server_url: sensorsServerUrl(location.hostname),
      is_track_single_page: true,
      use_client_time: true,
      send_type: 'beacon',
      heatmap: { clickmap: 'default', scroll_notice_map: 'default', get_vtrack_config: false },
      show_log: false,
    })
    sdk.registerPage(commonProperties({ cookie: document.cookie, hostname: location.hostname, userAgent: navigator.userAgent }))
    sdk.quick('autoTrack')
  } catch {
    // ignore
  }
}

function boot(): void {
  let tries = 0
  const tick = () => {
    const sdk = w[GLOBAL_KEY] as SensorsSdk | undefined
    if (sdk) return start(sdk)
    if (++tries < POLL_MAX_TRIES) setTimeout(tick, POLL_MS)
  }
  tick()
}

boot()
