# Longbridge Docs

长桥证券用户知识库，涵盖账户管理、资金操作、交易规则、产品功能等知识领域。

**线上地址**：[docs.longbridge.com](http://docs.longbridge.com/)

## 仓库结构（bun workspaces monorepo）

```
apps/
├── hk/          # 香港站(/hk/*):VitePress,内容主源 zh-CN,人工维护 markdown
├── sg/          # 新加坡站(/sg/*):VitePress,内容主源 zh-CN,人工维护 markdown
├── us/          # 美国站(/us/*):Astro,内容主源 en,由 Zendesk 同步生成
│   ├── scripts/ # Zendesk 同步器(bun run sync:us)
│   └── src/     # Astro 站(布局/组件/脚本/样式),视觉对齐 Zendesk 帮助中心主题
├── web-hk/      # 官网 HK 帮助中心(/hk/{locale?}/support/*):只放配置 + 同步产物 docs/
└── web-sg/      # 官网 SG 帮助中心(/sg/{locale?}/support/*):同上
packages/
├── shared/      # 共享层:theme 组件 / composables / i18n / VitePress 配置工厂 / UnoCSS(仅 hk/sg)
└── web-support/ # web-hk / web-sg 共用的 Astro 源码与 CMS 同步脚本(由 apps/us 派生，交互与样式对齐 US)
```

> `apps/hk`、`apps/sg` 是 docs 知识库;`apps/web-hk`、`apps/web-sg` 是 longbridge.com 官网的
> HK / SG 帮助中心(原 longbridge-websites discover 应用里的 support 模块),两者是不同产品。

三个 region 是互相独立的应用 (hk/sg 为 VitePress,us 为 Astro):独立 dev、独立
构建。URL 上的 `/hk/ /sg/ /us/` 前缀由各 app 的 `base` 提供，部署时 CI 把三份
产物合并到同一域名下，对外 URL 与历史完全一致。US 站的站内搜索由 Pagefind 在
构建时 (`astro build && pagefind`) 生成索引。

## 常用命令（仓库根目录）

```bash
bun install          # 安装(workspace hoisted)

bun run dev:hk       # 起 HK dev server
bun run dev:sg       # 起 SG dev server
bun run dev:us       # 起 US dev server

bun run build:hk     # 单独构建某个 app
bun run build        # 依次构建三个 app

bun run sync:us      # 从 Zendesk 拉取 US 内容(需 apps/us/.env.local 凭据)

bun run sync:web-hk  # 从官网 CMS 接口拉取 HK 帮助中心内容(公开接口，无需凭据)
bun run dev:web-hk   # 起官网 HK 帮助中心 dev server(http://localhost:4331/hk/support)
bun run build:web-hk # 构建 + Pagefind 索引(SG 同理:sync/dev/build:web-sg,端口 4332)
```

## 已知限制

- **dev 下跨 region 跳转不可用**：三个 app 是独立 dev server(不同端口)，右上角
  region 切换器指向 `/sg/` 这类绝对路径，在 dev 只会 404。生产环境三份产物
  合并在同一域名下，无此问题。
- **region 切换是整页跳转**：跨 region = 跨应用，没有 SPA 内切换。

## 内容维护

- **HK / SG**：直接改 `apps/{hk,sg}/docs/zh-CN/**` 下的 markdown 提 PR。
  en / zh-HK 目录缺失的文件会在构建时从 zh-CN 自动镜像。
- **US**：内容在 [Zendesk 后台](https://longbridgeus.zendesk.com) 维护，
  不要手改 `apps/us/docs/**`(会被下次同步覆盖)。同步只拉已发布
  (`draft:false`) 文章。
- **官网 HK / SG 帮助中心**：内容在官网 CMS 维护，`apps/web-{hk,sg}/docs/**` 由
  `sync:web-*` 生成(GitHub `support-sync.yml` 每 6 小时提交一次，GitLab 构建前再同步一次),
  不要手改。文章只按 slug 生成一份(`support/topics/{slug}.html`),对外路径
  `/support/topics/{任意分类}/{slug}` 与显式默认语言段由 nginx 改写；静态产物里没有的
  路径(如不在分类树里的文章)由 nginx 回落到原 discover SSR。
