/**
 * mirror-zh-cn-to-zh-hk.ts
 *
 * M1 一次性迁移脚本：把 docs/zh-CN/ 的全部内容镜像到 docs/zh-HK/，
 * 让 Rspress 语言切换器在繁中没翻译时不再 404。
 *
 * 行为：
 *   - 遍历 docs/zh-CN/ 下所有 .md / .mdx
 *   - 对每个文件，在 docs/zh-HK/ 同相对路径下创建 stub .mdx
 *   - stub 保留原 frontmatter 的 title（若有），追加"未翻译"提示 + 指向简体的链接
 *   - 复制所有 _meta.json（保持 sidebar 层级一致）
 *   - 已存在的 zh-HK 文件不覆盖（保护手写翻译）
 *
 * 用法：
 *   bun run scripts/mirror-zh-cn-to-zh-hk.ts
 *
 * M2 翻译流程：人工逐文件替换 stub 即可，无需调整目录结构。
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync, copyFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const SRC = join(ROOT, 'docs/zh-CN');
const DST = join(ROOT, 'docs/zh-HK');

let stubsCreated = 0;
let stubsSkipped = 0;
let metaCopied = 0;

function extractTitle(content: string): string | null {
  // 1) frontmatter title
  const fm = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (fm) {
    const titleLine = fm[1].match(/^title:\s*(.+)$/m);
    if (titleLine) return titleLine[1].trim().replace(/^["']|["']$/g, '');
  }
  // 2) first H1
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return null;
}

function buildStub(srcRelPath: string, originalContent: string): string {
  const title = extractTitle(originalContent) ?? srcRelPath.replace(/\.(md|mdx)$/, '');
  // zh-HK 对应的 zh-CN URL（去掉 .md/.mdx 后缀，拼接成 /zh-CN/... 路径）
  const zhCnUrl = '/zh-CN/' + srcRelPath.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '/');
  return `---
title: ${title}
---

# ${title}

> 本頁面繁體中文版本暫未提供。請參閱[簡體中文版本](${zhCnUrl})。
> The Traditional Chinese version of this page is not yet available. Please refer to the [Simplified Chinese version](${zhCnUrl}).
`;
}

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(SRC, full);
    const dstFull = join(DST, rel);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    // _meta.json：直接复制（Rspress 侧边栏结构必须一致）
    if (entry === '_meta.json') {
      mkdirSync(dirname(dstFull), { recursive: true });
      if (!existsSync(dstFull)) {
        copyFileSync(full, dstFull);
        metaCopied++;
      }
      continue;
    }

    // 仅处理 .md / .mdx
    if (!/\.(md|mdx)$/.test(entry)) continue;

    // zh-HK 用 .mdx 后缀（rspress 推荐 + 与 stub 模板一致）
    const dstFullMdx = dstFull.replace(/\.md$/, '.mdx');
    if (existsSync(dstFullMdx) || existsSync(dstFull)) {
      stubsSkipped++;
      continue;
    }

    const original = readFileSync(full, 'utf8');
    const stub = buildStub(rel, original);
    mkdirSync(dirname(dstFullMdx), { recursive: true });
    writeFileSync(dstFullMdx, stub, 'utf8');
    stubsCreated++;
  }
}

console.log('Mirror zh-CN → zh-HK ...');
walk(SRC);
console.log(`  stubs created : ${stubsCreated}`);
console.log(`  stubs skipped : ${stubsSkipped} (already exists, preserved)`);
console.log(`  _meta.json    : ${metaCopied}`);
console.log('Done.');
