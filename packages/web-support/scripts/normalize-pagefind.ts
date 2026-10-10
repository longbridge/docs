/**
 * Pagefind 多语言时 pagefind-entry.json 的 languages 键顺序每次构建都不同，产物指纹随之抖动，
 * GitLab deploy 的"内容未变就跳过"闸门会失效。这里把键排序后重写;Pagefind 按键名取语言，顺序无关。
 */
import { readFileSync, writeFileSync } from 'node:fs'

const file = process.argv[2] ?? 'dist/support/pagefind/pagefind-entry.json'
const sortKeys = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(sortKeys)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sortKeys((v as Record<string, unknown>)[k])]))
      : v
writeFileSync(file, JSON.stringify(sortKeys(JSON.parse(readFileSync(file, 'utf8')))))
