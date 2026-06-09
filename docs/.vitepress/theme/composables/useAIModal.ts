// AI 入口统一桥接到 Helora iframe（script 由 config.mts head 注入并自动 boot）。
// 保留 openAIModal(query) / toggleAIModal() API 形态，让所有现存调用点（HomeNavbar /
// SearchDialog / 首页各 section 的 inject）无需改动；query 参数 Helora 当前 API 未
// 支持，传入会被丢弃（视觉上 panel 打开后用户重新输入）。

declare global {
  interface Window {
    Helora?: {
      open: () => void
      close: () => void
      show?: () => void
      hide?: () => void
      destroy?: () => void
    }
  }
}

export function useAIModal() {
  function openAIModal(_query?: string) {
    if (typeof window === 'undefined') return
    window.Helora?.open()
  }

  // Helora 内部自管开关；toggle 语义统一映射到 open（点击未展开时打开，
  // 已展开时再点 Helora 自己处理为 noop / 收起）
  function toggleAIModal() {
    openAIModal()
  }

  return { openAIModal, toggleAIModal }
}
