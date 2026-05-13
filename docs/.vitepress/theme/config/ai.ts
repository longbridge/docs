const env = import.meta.env

const HOST: string = (env.VITE_AI_API_HOST || '').replace(/\/$/, '')
const ENDPOINT_PATH: string =
  env.VITE_AI_API_ENDPOINT || '/api/forward/v1/customer-service/docs/chat'

// 生产构建时把 HOST 拼进 URL（静态站点没有反向代理，相对路径会落到当前域名）。
// dev 保持相对路径，由 vite server.proxy 转发到 HOST，避免 CORS。
const NORMALIZED_ENDPOINT = ENDPOINT_PATH.startsWith('/')
  ? ENDPOINT_PATH
  : `/${ENDPOINT_PATH}`

export const AI_ENDPOINT: string =
  HOST && import.meta.env.PROD ? `${HOST}${NORMALIZED_ENDPOINT}` : NORMALIZED_ENDPOINT

export const AI_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
}
