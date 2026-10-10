/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** 当前渲染页面的语言，由 pages/[...path].astro 写入，组件经 Astro.locals 读取 */
    locale: string
  }
}
