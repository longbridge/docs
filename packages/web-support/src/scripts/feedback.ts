/**
 * 文章底部「有帮助？」反馈，行为对齐 longbridge-websites topic-feedback.tsx:
 * 有帮助直接提交;无帮助弹原因;反馈区 80% 进入视口或反馈过后按 pathname 记 localStorage,以后不再展示。
 * 提交 fire-and-forget,失败不打扰用户。
 */
import { supportFetch } from './config'

const VIEWED_KEY_PREFIX = 'support_feedback_viewed_'
const DONE_DELAY_MS = 400

const viewedKey = () => VIEWED_KEY_PREFIX + location.pathname
function readViewed(): boolean {
  try { return localStorage.getItem(viewedKey()) === 'true' } catch { return false }
}
function writeViewed(): void {
  try { localStorage.setItem(viewedKey(), 'true') } catch { /* 隐私模式 */ }
}

function post(body: Record<string, string>): void {
  supportFetch('/v2/support/topics/feedback', { method: 'POST', body: JSON.stringify(body) }).catch(() => undefined)
}

function init(): void {
  const found = document.querySelector<HTMLElement>('[data-topic-feedback]')
  if (!found || readViewed()) return
  const root: HTMLElement = found
  const topicId = root.dataset.topicId ?? ''
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-feedback]'))
  const dialog = root.querySelector<HTMLElement>('[data-feedback-dialog]')!
  const reasons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-reason]'))
  const other = root.querySelector<HTMLTextAreaElement>('[data-feedback-other]')!
  const submit = root.querySelector<HTMLButtonElement>('[data-feedback-submit]')!
  let reasonType = ''
  let done = false

  root.hidden = false
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { writeViewed(); io.disconnect() }
  }, { threshold: 0.8 })
  io.observe(root)

  function finish(chosen: HTMLButtonElement): void {
    done = true
    writeViewed()
    chosen.classList.add('is-chosen')
    buttons.forEach((b) => { b.disabled = true })
    setTimeout(() => {
      root.querySelector<HTMLElement>('[data-feedback-question]')!.hidden = true
      root.querySelector<HTMLElement>('[data-feedback-thanks]')!.hidden = false
    }, DONE_DELAY_MS)
  }
  function setReason(type: string): void {
    reasonType = type
    reasons.forEach((r) => r.classList.toggle('is-active', r.dataset.reason === type))
    submit.disabled = !type
  }
  const closeDialog = () => { dialog.hidden = true }

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    if (done) return
    if (btn.dataset.feedback === 'resolved') {
      post({ topic_id: topicId, feedback_type: 'resolved' })
      finish(btn)
    } else {
      dialog.hidden = false
    }
  }))
  reasons.forEach((r) => r.addEventListener('click', () => setReason(r.dataset.reason ?? '')))
  other.addEventListener('input', () => setReason(other.value.trim() ? 'other' : ''))
  root.querySelectorAll('[data-feedback-close]').forEach((el) => el.addEventListener('click', closeDialog))
  submit.addEventListener('click', () => {
    if (!reasonType) return
    post({
      topic_id: topicId,
      feedback_type: 'unresolved',
      reason_type: reasonType,
      ...(reasonType === 'other' ? { reason_content: other.value.trim() } : {}),
    })
    closeDialog()
    finish(buttons.find((b) => b.dataset.feedback === 'unresolved')!)
  })
}

// 只绑一次：SPA 换页后对话框节点换新，按当下 DOM 查找
document.addEventListener('keydown', (e) => {
  const dialog = document.querySelector<HTMLElement>('[data-feedback-dialog]')
  if (e.key === 'Escape' && dialog && !dialog.hidden) dialog.hidden = true
})

init()
document.addEventListener('lb:content-swapped', init)
