<!-- docs/.vitepress/theme/components/AiChatDrawer.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useLocalStorage, useMediaQuery, useEventListener } from '@vueuse/core'
import { Chat } from '@ai-sdk/vue'
import type { UIMessage } from 'ai'
import { nanoid } from 'nanoid'
import { Trash2, Maximize2, Minimize2, X, Copy, Check, RotateCcw, Paperclip } from 'lucide-vue-next'
import { useI18n } from '../../i18n/useI18n'
import { LbAiTransport } from '../composables/useLbAiTransport'
import RiveThinkingIcon from './RiveThinkingIcon.vue'
import { MessageResponse } from './ai-elements/message'
import { MessageAction, MessageActions } from './ai-elements/message'
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputTextarea,
  PromptInputSubmit,
} from './ai-elements/prompt-input'

const props = defineProps<{
  modelValue: boolean
  initialQuery?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const { t } = useI18n()

// ── Chat state via AI SDK ─────────────────────────────────────
const savedMessages = useLocalStorage<UIMessage[]>('lb-ai-chat-v2', [], {
  serializer: {
    read: (raw) => {
      try { return JSON.parse(raw) as UIMessage[] } catch { return [] }
    },
    write: (val) => JSON.stringify(val),
  },
})

const chat = new Chat({
  transport: new LbAiTransport(),
  messages: savedMessages.value,
  generateId: () => nanoid(),
})

watch(
  () => chat.messages,
  (msgs) => { savedMessages.value = [...msgs] },
  { deep: true },
)

const isStreaming = computed(
  () => chat.status === 'streaming' || chat.status === 'submitted',
)

function extractText(msg: UIMessage): string {
  if (!msg.parts?.length) return (msg as { content?: string }).content ?? ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text)
    .join('')
}

const showThinking = computed(() => {
  if (chat.status !== 'submitted' && chat.status !== 'streaming') return false
  const last = chat.messages[chat.messages.length - 1]
  if (!last || last.role !== 'assistant') return true
  return !extractText(last)
})

// ── Actions ───────────────────────────────────────────────────
const copiedId = ref<string | null>(null)

async function copyMessage(msg: UIMessage) {
  await navigator.clipboard.writeText(extractText(msg))
  copiedId.value = msg.id
  setTimeout(() => { copiedId.value = null }, 2000)
}

function clearChat() {
  chat.messages = []
  savedMessages.value = []
}

async function handlePromptSubmit({ text }: { text: string }) {
  if (chat.status === 'streaming' || chat.status === 'submitted') {
    await chat.stop()
    return
  }
  const trimmed = text.trim()
  if (!trimmed) return
  await chat.sendMessage({ text: trimmed })
}

function isMessageFinal(msg: UIMessage, index: number): boolean {
  if (msg.role !== 'assistant') return false
  if (index < chat.messages.length - 1) return true
  return chat.status === 'ready'
}

// ── InitialQuery handling ─────────────────────────────────────
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    sheetRatio.value = DEFAULT_SHEET
    nextTick(() => {
      if (props.initialQuery) {
        void chat.sendMessage({ text: props.initialQuery })
      }
    })
  },
)

watch(
  () => props.initialQuery,
  (q) => {
    if (!props.modelValue || !q) return
    void chat.sendMessage({ text: q })
  },
)

function close() {
  emit('update:modelValue', false)
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) close()
})

// ── Resizable drawer ──────────────────────────────────────────
const MIN_WIDTH = 320
const MAX_WIDTH = 720
const drawerWidth = useLocalStorage('lb-ai-drawer-width', 380)

function syncWidthVar(w: number) {
  document.documentElement.style.setProperty('--ai-drawer-width', `${w}px`)
}

onMounted(() => syncWidthVar(drawerWidth.value))
watch(drawerWidth, syncWidthVar)

function startResize(e: MouseEvent) {
  e.preventDefault()
  const startX = e.clientX
  const startW = drawerWidth.value
  document.documentElement.classList.add('ai-resizing')
  function onMove(ev: MouseEvent) {
    const newW = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW + startX - ev.clientX))
    drawerWidth.value = newW
    syncWidthVar(newW)
  }
  function onUp() {
    document.documentElement.classList.remove('ai-resizing')
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function toggleExpand() {
  drawerWidth.value = drawerWidth.value >= MAX_WIDTH ? 380 : MAX_WIDTH
}

// ── Mobile bottom sheet ───────────────────────────────────────
const isMobile = useMediaQuery('(max-width: 639.98px)')
const SNAP_POINTS = [0.5, 0.88]
const DEFAULT_SHEET = 0.88
const CLOSE_THRESHOLD = 0.3
const VELOCITY_THRESHOLD = 0.8
const sheetRatio = ref(DEFAULT_SHEET)
const isDragging = ref(false)
const sheetStyle = computed(() => ({ '--ai-sheet-height': `${sheetRatio.value * 100}vh` }))

let dragStartY = 0
let dragStartRatio = 0
let dragStartTime = 0

function onDragStart(e: TouchEvent) {
  dragStartY = e.touches[0].clientY
  dragStartRatio = sheetRatio.value
  dragStartTime = Date.now()
  isDragging.value = true
}

function onDragMove(e: TouchEvent) {
  if (!isDragging.value) return
  e.preventDefault()
  const delta = (e.touches[0].clientY - dragStartY) / window.innerHeight
  sheetRatio.value = Math.max(0.05, Math.min(0.95, dragStartRatio - delta))
}

function onDragEnd(e: TouchEvent) {
  if (!isDragging.value) return
  const dy = e.changedTouches[0].clientY - dragStartY
  const dt = Math.max(1, Date.now() - dragStartTime)
  const velocity = (dy / window.innerHeight) * 100 / dt
  isDragging.value = false
  if (sheetRatio.value < CLOSE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
    close()
    nextTick(() => { sheetRatio.value = DEFAULT_SHEET })
    return
  }
  const candidates =
    velocity < -VELOCITY_THRESHOLD ? [SNAP_POINTS[SNAP_POINTS.length - 1]] : SNAP_POINTS
  sheetRatio.value = candidates.reduce(
    (best, p) => (Math.abs(p - sheetRatio.value) < Math.abs(best - sheetRatio.value) ? p : best),
    candidates[0],
  )
}
</script>

<template>
  <!-- Mobile backdrop -->
  <Transition name="fade">
    <div v-if="modelValue && isMobile" class="ai-sheet-backdrop" @click="close" />
  </Transition>

  <Transition :name="isMobile ? 'sheet' : 'drawer'">
    <div
      v-if="modelValue"
      class="ai-drawer"
      :class="{ 'is-sheet': isMobile, 'is-dragging': isDragging }"
      :style="isMobile ? sheetStyle : { width: drawerWidth + 'px' }"
    >
      <!-- Desktop: resize handle on left edge -->
      <div v-if="!isMobile" class="ai-resize-handle" @mousedown="startResize" />

      <!-- Mobile: drag handle at top -->
      <div
        v-if="isMobile"
        class="ai-sheet-handle"
        @touchstart.passive="onDragStart"
        @touchmove="onDragMove"
        @touchend="onDragEnd"
      >
        <div class="ai-sheet-grabber" />
      </div>

      <!-- Header -->
      <div class="ai-drawer-header">
        <div class="ai-drawer-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="ai-star-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.111 2.34728C7.29334 1.80026 8.06709 1.80026 8.24942 2.34728L9.5054 6.1152C9.56512 6.29437 9.70571 6.43496 9.88487 6.49468L13.6528 7.75065C14.1998 7.93299 14.1998 8.70673 13.6528 8.88907L9.88487 10.145C9.70571 10.2048 9.56512 10.3454 9.5054 10.5245L8.24942 14.2924C8.06709 14.8395 7.29334 14.8395 7.111 14.2924L5.85503 10.5245C5.79531 10.3454 5.65472 10.2048 5.47556 10.145L1.70763 8.88907C1.16061 8.70673 1.16061 7.93299 1.70763 7.75065L5.47556 6.49468C5.65472 6.43496 5.79531 6.29437 5.85503 6.1152L7.111 2.34728Z" fill="currentColor"/>
            <path d="M13.0648 1.0138C13.1937 0.665555 13.6862 0.665555 13.8151 1.0138L14.0676 1.69612C14.1081 1.80561 14.1944 1.89194 14.3039 1.93245L14.9862 2.18493C15.3345 2.31379 15.3345 2.80635 14.9862 2.93521L14.3039 3.18769C14.1944 3.22821 14.1081 3.31453 14.0676 3.42402L13.8151 4.10634C13.6862 4.45459 13.1937 4.45459 13.0648 4.10634L12.8123 3.42402C12.7718 3.31453 12.6855 3.22821 12.576 3.18769L11.8937 2.93521C11.5454 2.80635 11.5454 2.31379 11.8937 2.18493L12.576 1.93245C12.6855 1.89194 12.7718 1.80561 12.8123 1.69612L13.0648 1.0138Z" fill="currentColor"/>
          </svg>
          <span>{{ t('ai.title') }}</span>
        </div>
        <div class="ai-drawer-header-actions">
          <button
            v-if="chat.messages.length > 0"
            class="ai-header-btn"
            :title="t('ai.clearChat')"
            @click="clearChat"
          >
            <Trash2 :size="14" />
          </button>
          <button
            v-if="!isMobile"
            class="ai-header-btn"
            :title="drawerWidth >= MAX_WIDTH ? t('ai.collapse') : t('ai.expand')"
            @click="toggleExpand"
          >
            <Maximize2 v-if="drawerWidth < MAX_WIDTH" :size="14" />
            <Minimize2 v-else :size="14" />
          </button>
          <button class="ai-header-btn" :aria-label="t('ai.close')" @click="close">
            <X :size="15" />
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div class="ai-messages" aria-live="polite" aria-atomic="false">
        <div v-if="chat.messages.length === 0" class="ai-empty" />

        <div
          v-for="(msg, i) in chat.messages"
          :key="msg.id"
          class="ai-msg"
          :class="msg.role"
        >
          <div class="ai-msg-bubble">
            <!-- User message: plain text -->
            <template v-if="msg.role === 'user'">{{ extractText(msg) }}</template>

            <!-- Assistant message -->
            <template v-else>
              <!-- Thinking state: status=submitted and no content yet -->
              <div v-if="showThinking && i === chat.messages.length - 1 && !extractText(msg)" class="ai-thinking">
                <ClientOnly>
                  <RiveThinkingIcon :size="16" class="ai-thinking-rive" />
                </ClientOnly>
                <span class="ai-thinking-text">{{ t('ai.thinking') }}</span>
              </div>

              <!-- Streaming / final markdown -->
              <ClientOnly v-else-if="extractText(msg)">
                <MessageResponse :content="extractText(msg)" />
              </ClientOnly>

              <!-- Action buttons (copy / regenerate) shown on final messages -->
              <MessageActions v-if="isMessageFinal(msg, i)" class="ai-msg-actions-row">
                <MessageAction
                  :tooltip="copiedId === msg.id ? t('ai.copied') : t('ai.copy')"
                  :class="{ 'text-green-600': copiedId === msg.id }"
                  @click="copyMessage(msg)"
                >
                  <Check v-if="copiedId === msg.id" :size="13" />
                  <Copy v-else :size="13" />
                </MessageAction>
                <MessageAction
                  :tooltip="t('ai.regenerate')"
                  @click="chat.regenerate({ messageId: msg.id })"
                >
                  <RotateCcw :size="12" />
                </MessageAction>
              </MessageActions>
            </template>
          </div>
        </div>

        <!-- Standalone thinking indicator: shown when waiting for first delta (no assistant msg yet) -->
        <div
          v-if="showThinking && (!chat.messages.length || chat.messages[chat.messages.length - 1].role !== 'assistant')"
          class="ai-msg assistant"
        >
          <div class="ai-msg-bubble">
            <div class="ai-thinking">
              <ClientOnly>
                <RiveThinkingIcon :size="16" class="ai-thinking-rive" />
              </ClientOnly>
              <span class="ai-thinking-text">{{ t('ai.thinking') }}</span>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-if="chat.status === 'error'" class="ai-error">
          {{ chat.error?.message || t('ai.error') }}
        </div>
      </div>

      <!-- Input area -->
      <div class="ai-input-wrap">
        <PromptInput
          class="ai-prompt-input"
          @submit="handlePromptSubmit"
        >
          <PromptInputBody>
            <PromptInputTextarea
              :placeholder="t('ai.placeholder')"
              class="ai-prompt-textarea"
            />
          </PromptInputBody>
          <PromptInputFooter class="ai-prompt-footer">
            <!-- Attachment placeholder -->
            <button class="ai-attach-btn" disabled :aria-label="t('ai.attach')" tabindex="-1">
              <Paperclip :size="15" />
            </button>
            <PromptInputSubmit
              :status="chat.status"
              class="ai-prompt-submit"
              :aria-label="isStreaming ? t('ai.stop') : t('ai.send')"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>

      <!-- Disclaimer -->
      <p class="ai-disclaimer">{{ t('ai.disclaimer') }}</p>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Drawer shell ─────────────────────────────────────────── */
.ai-drawer {
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--ai-drawer-width, 380px);
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-border);
  z-index: 200;
  max-width: 100vw;
  @apply fixed flex flex-col;
}

/* ── Mobile bottom sheet overrides ──────────────────────────── */
.ai-drawer.is-sheet {
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: none;
  border-left: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.18);
  height: var(--ai-sheet-height, 88vh);
  max-height: 92vh;
  transition: height 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.ai-drawer.is-sheet.is-dragging {
  transition: none !important;
}

.ai-sheet-backdrop {
  @apply fixed inset-0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;
}

.ai-sheet-handle {
  @apply flex items-center justify-center;
  height: 24px;
  flex-shrink: 0;
  cursor: grab;
  touch-action: none;
}
.ai-sheet-handle:active { cursor: grabbing; }
.ai-sheet-grabber {
  @apply w-9 h-1 rounded-full;
  background: var(--vp-c-divider);
}

/* Resize handle — left edge */
.ai-resize-handle {
  @apply absolute w-3 flex items-center justify-center;
  left: 0;
  top: 0;
  bottom: 0;
  cursor: col-resize;
  z-index: 10;
}
.ai-resize-handle::after {
  content: '';
  @apply w-1 h-8;
  border-radius: 99px;
  background: transparent;
  transition: background 0.2s;
}
.ai-resize-handle:hover::after,
.ai-resize-handle:active::after {
  background: var(--vp-c-border);
}

/* ── Header ──────────────────────────────────────────────── */
.ai-drawer-header {
  @apply flex items-center justify-between py-0 px-5 h-14;
  flex-shrink: 0;
}
.ai-drawer-title {
  @apply flex items-center gap-2 font-semibold text-base;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}
.ai-star-icon { color: var(--vp-c-brand-1); flex-shrink: 0; }

.ai-disclaimer {
  @apply m-0 px-5 pb-3 text-xs leading-normal text-center;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}
.ai-drawer-header-actions { display: flex; align-items: center; gap: 4px; }
.ai-header-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-3);
  @apply p-1.5 flex items-center leading-none;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.ai-header-btn:hover { background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); }

/* ── Messages ─────────────────────────────────────────────── */
.ai-messages {
  flex: 1;
  overflow-y: auto;
  @apply pt-2 px-5 pb-2 flex flex-col gap-4;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-border) transparent;
}
.ai-messages::-webkit-scrollbar { width: 4px; }
.ai-messages::-webkit-scrollbar-track { background: transparent; }
.ai-messages::-webkit-scrollbar-thumb { background: var(--vp-c-border); border-radius: 2px; }

.ai-empty { flex: 1; }

.ai-msg { display: flex; }
.ai-msg.user { justify-content: flex-end; }
.ai-msg.assistant { justify-content: flex-start; }

.user .ai-msg-bubble {
  max-width: 75%;
  @apply py-2.5 px-3.5 text-sm leading-relaxed;
  border-radius: 16px 16px 4px 16px;
  background: var(--vp-c-brand-1);
  color: #fff;
  white-space: pre-wrap;
}

.assistant .ai-msg-bubble {
  max-width: 90%;
  @apply py-1 px-0 text-sm leading-relaxed flex flex-col gap-2;
  color: var(--vp-c-text-1);
}

/* Thinking state */
.ai-thinking {
  @apply inline-flex items-center gap-1.5 py-1 px-0;
}
.ai-thinking-rive {
  flex-shrink: 0;
  display: block;
}
.ai-thinking-text {
  @apply text-sm;
  color: var(--vp-c-text-2);
  animation: ai-text-breathe 2s ease-in-out infinite;
}
@keyframes ai-text-breathe {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.85; }
}

/* Error state */
.ai-error {
  @apply text-sm px-3 py-2 rounded-lg;
  color: var(--lb-c-danger);
  background: color-mix(in srgb, var(--lb-c-danger) 8%, transparent);
}

/* Message actions row */
.ai-msg-actions-row {
  @apply mt-1;
}

/* Override AI Elements MessageAction button to match theme */
.ai-msg-bubble :deep(button) {
  color: var(--vp-c-text-3);
  transition: color 0.15s, background 0.15s;
}
.ai-msg-bubble :deep(button:hover) {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

/* Markdown overrides for vue-stream-markdown */
.assistant .ai-msg-bubble :deep(.markdown-body),
.assistant .ai-msg-bubble :deep([class*="markdown"]) {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}
.assistant .ai-msg-bubble :deep(pre) {
  border-radius: 8px;
  @apply text-sm;
  background: var(--vp-c-bg-soft) !important;
  border: 1px solid var(--vp-c-border);
}
.assistant .ai-msg-bubble :deep(code:not(pre code)) {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand-1);
  @apply py-0.5 px-1.5 text-sm;
  border-radius: 4px;
}
.assistant .ai-msg-bubble :deep(p) { margin: 0 0 8px; color: var(--vp-c-text-1); }
.assistant .ai-msg-bubble :deep(p:last-child) { margin-bottom: 0; }
.assistant .ai-msg-bubble :deep(ul),
.assistant .ai-msg-bubble :deep(ol) { padding-left: 20px; margin: 4px 0 8px; color: var(--vp-c-text-1); }
.assistant .ai-msg-bubble :deep(h1),
.assistant .ai-msg-bubble :deep(h2),
.assistant .ai-msg-bubble :deep(h3) { color: var(--vp-c-text-1); margin: 12px 0 6px; }
.assistant .ai-msg-bubble :deep(a) { color: var(--vp-c-brand-1); }
.assistant .ai-msg-bubble :deep(strong) { color: var(--vp-c-text-1); }
.assistant .ai-msg-bubble :deep(blockquote) {
  border-left: 3px solid var(--vp-c-border);
  @apply pl-3 my-2 mx-0;
  color: var(--vp-c-text-2);
}
.assistant .ai-msg-bubble :deep(table) { width: 100%; border-collapse: collapse; font-size: 13px; }
.assistant .ai-msg-bubble :deep(th),
.assistant .ai-msg-bubble :deep(td) { padding: 6px 10px; border: 1px solid var(--vp-c-border); color: var(--vp-c-text-1); }
.assistant .ai-msg-bubble :deep(th) { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }

/* ── Input area ──────────────────────────────────────────── */
.ai-input-wrap {
  @apply pt-3 px-4 pb-2;
  flex-shrink: 0;
}

/* Override PromptInput / InputGroup to match our design */
.ai-prompt-input :deep([data-slot="input-group"]) {
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: border-color 0.15s, box-shadow 0.15s;
  overflow: hidden;
  /* reset focus ring — we add our own below */
  --tw-ring-shadow: none !important;
}
.ai-prompt-input:focus-within :deep([data-slot="input-group"]) {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.ai-prompt-input :deep([data-slot="input-group-control"]) {
  @apply text-sm leading-normal;
  color: var(--vp-c-text-1);
  background: transparent;
  font-family: inherit;
  padding-top: 0.75rem;
  padding-bottom: 0.25rem;
  min-height: 1.5rem;
  max-height: 8rem;
  resize: none;
}
.ai-prompt-input :deep([data-slot="input-group-control"]::placeholder) {
  color: var(--vp-c-text-3);
}

.ai-prompt-input :deep([data-slot="input-group-addon"]) {
  @apply px-2.5 py-2;
  background: transparent;
  border: none;
}

.ai-attach-btn {
  background: none;
  border: none;
  cursor: default;
  color: var(--vp-c-text-3);
  @apply p-1 flex items-center;
  opacity: 0.5;
}

.ai-prompt-submit :deep(button) {
  @apply w-8 h-8 flex items-center justify-center;
  border-radius: 50% !important;
  background: var(--vp-c-text-1) !important;
  color: var(--vp-c-bg) !important;
  transition: opacity 0.15s !important;
  flex-shrink: 0;
}
.ai-prompt-submit :deep(button:hover:not(:disabled)) {
  opacity: 0.8;
}
.ai-prompt-submit :deep(button:disabled) {
  opacity: 0.2 !important;
  cursor: not-allowed !important;
}

/* Desktop slide-in from right */
.drawer-enter-active,
.drawer-leave-active { transition: transform .25s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-enter-from,
.drawer-leave-to { transform: translateX(100%); }

/* Mobile sheet slide-up from bottom */
.sheet-enter-active,
.sheet-leave-active { transition: transform .28s cubic-bezier(0.4, 0, 0.2, 1); }
.sheet-enter-from,
.sheet-leave-to { transform: translateY(100%); }

/* Backdrop fade */
.fade-enter-active,
.fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active,
  .drawer-leave-active,
  .sheet-enter-active,
  .sheet-leave-active,
  .fade-enter-active,
  .fade-leave-active { transition: none; }
  .ai-drawer.is-sheet:not(.is-dragging) { transition: none; }
  .ai-thinking-text { animation: none; opacity: 0.6; }
}
</style>
