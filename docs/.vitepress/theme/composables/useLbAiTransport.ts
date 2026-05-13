import type { ChatTransport, UIMessage, UIMessageChunk } from 'ai'
import { nanoid } from 'nanoid'
import { AI_ENDPOINT, AI_HEADERS } from '../config/ai'

function extractTextContent(msg: UIMessage): string {
  if (!msg.parts?.length) return (msg as { content?: string }).content ?? ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text)
    .join('')
}

export class LbAiTransport implements ChatTransport<UIMessage> {
  async sendMessages({
    messages,
    abortSignal,
  }: Parameters<ChatTransport<UIMessage>['sendMessages']>[0]): Promise<
    ReadableStream<UIMessageChunk>
  > {
    const body = {
      messages: messages.map(m => ({
        role: m.role,
        content: extractTextContent(m),
      })),
    }

    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify(body),
      signal: abortSignal,
    })

    if (!response.ok || !response.body) {
      throw new Error(`AI request failed: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    return new ReadableStream<UIMessageChunk>({
      async start(controller) {
        const textId = nanoid()
        let buffer = ''
        let textStarted = false

        function enqueue(chunk: UIMessageChunk) {
          controller.enqueue(chunk)
        }

        enqueue({ type: 'start' })

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed.startsWith('data:')) continue
              const raw = trimmed.slice(5).trim()
              if (!raw || raw === '[DONE]') {
                if (textStarted) {
                  enqueue({ type: 'text-end', id: textId })
                  textStarted = false
                }
                if (raw === '[DONE]') {
                  enqueue({ type: 'finish', finishReason: 'stop' })
                }
                continue
              }

              let delta = ''
              try {
                const parsed = JSON.parse(raw)
                if (parsed && typeof parsed === 'object') {
                  if (parsed.type && parsed.type !== 'text-delta') continue
                  delta =
                    typeof parsed.delta === 'string'
                      ? parsed.delta
                      : (parsed.delta?.content ?? parsed.content ?? parsed.text ?? '')
                } else {
                  delta = String(parsed)
                }
              } catch {
                delta = raw
              }

              if (!delta) continue

              if (!textStarted) {
                enqueue({ type: 'text-start', id: textId })
                textStarted = true
              }
              enqueue({ type: 'text-delta', id: textId, delta })
            }
          }
        } catch (err) {
          if ((err as { name?: string }).name !== 'AbortError') {
            controller.error(err)
            return
          }
          // AbortError: emit abort chunk so the Chat class handles cleanup
          enqueue({ type: 'abort' })
        } finally {
          if (textStarted) {
            enqueue({ type: 'text-end', id: textId })
          }
          controller.close()
        }
      },
    })
  }
}
