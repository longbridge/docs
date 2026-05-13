<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import { categoryGroups } from '../../data/category-groups'

const openAIModal = inject<(q: string) => void>('openAIModal', () => {})
const { t } = useI18n()

const tradingGroup = categoryGroups[0]
const accountGroup = categoryGroups[3]
const helpGroup = categoryGroups[4]
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- 品牌列 -->
      <div class="site-footer__brand">
        <div class="site-footer__logo">Longbridge Docs</div>
        <p class="site-footer__tagline">{{ t('footerMini.tagline') }}</p>
        <button class="site-footer__ask-btn" @click="openAIModal('')">
          {{ t('footerMini.askAi') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- 交易列 -->
      <div class="site-footer__col">
        <div class="site-footer__col-title">{{ t(tradingGroup.name) }}</div>
        <ul class="site-footer__links">
          <li v-for="item in tradingGroup.items" :key="item.path">
            <a :href="item.path">{{ t(item.label) }}</a>
          </li>
        </ul>
      </div>

      <!-- 账户列 -->
      <div class="site-footer__col">
        <div class="site-footer__col-title">{{ t(accountGroup.name) }}</div>
        <ul class="site-footer__links">
          <li v-for="item in accountGroup.items" :key="item.label">
            <a :href="item.path">{{ t(item.label) }}</a>
          </li>
        </ul>
      </div>

      <!-- 帮助列 -->
      <div class="site-footer__col">
        <div class="site-footer__col-title">{{ t(helpGroup.name) }}</div>
        <ul class="site-footer__links">
          <li v-for="item in helpGroup.items" :key="item.path">
            <a :href="item.path">{{ t(item.label) }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 底部栏 -->
    <div class="site-footer__bottom">
      <div class="site-footer__bottom-inner">
        <span class="site-footer__copyright">{{ t('footerMini.copyright') }}</span>
        <nav class="site-footer__bottom-links" :aria-label="t('footerMini.navAriaLabel')">
          <a href="https://longbridgeapp.com" target="_blank" rel="noopener noreferrer">{{ t('footerMini.official') }}</a>
          <a href="/zh-CN/compliance-and-tax/privacy-policy">{{ t('footerMini.privacy') }}</a>
          <a href="/zh-CN/compliance-and-tax/">{{ t('footerMini.compliance') }}</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
}

.site-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 48px 48px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}

/* 品牌列 */
.site-footer__logo {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
  margin-bottom: 12px;
}

.site-footer__tagline {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-3);
  margin: 0 0 20px;
  max-width: 220px;
}

.site-footer__ask-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: rgba(0, 184, 184, 0.08);
  border: 1px solid rgba(0, 184, 184, 0.2);
  border-radius: 99px;
  padding: 7px 16px;
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;
}

.site-footer__ask-btn:hover {
  background: rgba(0, 184, 184, 0.16);
  border-color: rgba(0, 184, 184, 0.4);
}

/* 链接列 */
.site-footer__col-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.site-footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.site-footer__links a {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 150ms ease-out;
  line-height: 1.4;
}

.site-footer__links a:hover {
  color: var(--vp-c-brand-1);
}

/* 底部栏 */
.site-footer__bottom {
  border-top: 1px solid var(--vp-c-divider);
}

.site-footer__bottom-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.site-footer__copyright {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.site-footer__bottom-links {
  display: flex;
  gap: 20px;
}

.site-footer__bottom-links a {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 150ms ease-out;
}

.site-footer__bottom-links a:hover {
  color: var(--vp-c-brand-1);
}

/* 响应式 */
@media (max-width: 960px) {
  .site-footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    padding: 48px 32px 40px;
  }
}

@media (max-width: 640px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 20px 32px;
  }

  .site-footer__tagline {
    max-width: 100%;
  }

  .site-footer__bottom-inner {
    padding: 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .site-footer__bottom-links {
    flex-wrap: wrap;
    gap: 12px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-footer__ask-btn,
  .site-footer__links a,
  .site-footer__bottom-links a {
    transition: none !important;
  }
}
</style>
