import {
  $n,
  Br,
  Ee,
  Ir,
  Jl,
  Ln,
  Mr,
  On,
  Qr,
  Tr,
  Zt,
  _r,
  br,
  jt,
  tr,
  xr
} from "./chunk-VF4QCHVU.js";
import {
  Teleport,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createVNode,
  defineComponent,
  getCurrentInstance,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  renderSlot,
  toDisplayString,
  unref,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-URVHZSMY.js";

// node_modules/markstream-vue/dist/CodeBlockNode.js
var e = Object.defineProperty;
var t = Object.defineProperties;
var n = Object.getOwnPropertyDescriptors;
var l = Object.getOwnPropertySymbols;
var o = Object.prototype.hasOwnProperty;
var i = Object.prototype.propertyIsEnumerable;
var r = (t2, n2, l2) => n2 in t2 ? e(t2, n2, { enumerable: true, configurable: true, writable: true, value: l2 }) : t2[n2] = l2;
var a = (e2, t2) => {
  for (var n2 in t2 || (t2 = {})) o.call(t2, n2) && r(e2, n2, t2[n2]);
  if (l) for (var n2 of l(t2)) i.call(t2, n2) && r(e2, n2, t2[n2]);
  return e2;
};
var u = (e2, l2) => t(e2, n(l2));
var d = (e2, t2, n2) => new Promise((l2, o2) => {
  var i2 = (e3) => {
    try {
      a2(n2.next(e3));
    } catch (t3) {
      o2(t3);
    }
  }, r2 = (e3) => {
    try {
      a2(n2.throw(e3));
    } catch (t3) {
      o2(t3);
    }
  }, a2 = (e3) => e3.done ? l2(e3.value) : Promise.resolve(e3.value).then(i2, r2);
  a2((n2 = n2.apply(e2, t2)).next());
});
var Q = { class: "html-preview-frame__header" };
var Z = { class: "html-preview-frame__title" };
var ee = { class: "html-preview-frame__label" };
var te = ["sandbox", "srcdoc"];
var ne = Ee(defineComponent({ __name: "HtmlPreviewFrame", props: { code: {}, isDark: { type: Boolean }, htmlPreviewAllowScripts: { type: Boolean }, htmlPreviewSandbox: {}, onClose: { type: Function }, title: {} }, setup(e2) {
  const t2 = e2, n2 = void 0 !== import.meta && Boolean(false);
  let l2 = null;
  const { t: o2 } = $n(), i2 = computed(() => {
    const e3 = t2.code || "", n3 = e3.trim().toLowerCase();
    return n3.startsWith("<!doctype") || n3.startsWith("<html") || n3.startsWith("<body") ? e3 : `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: ${t2.isDark ? "#020617" : "#ffffff"};
        color: ${t2.isDark ? "#e5e7eb" : "#020617"};
      }
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', ui-sans-serif, sans-serif;
      }
    </style>
  </head>
  <body>
    ${e3}
  </body>
</html>`;
  }), r2 = computed(() => {
    return e3 = t2.htmlPreviewSandbox, o3 = t2.htmlPreviewAllowScripts, "string" == typeof e3 ? (function(e4) {
      if (!n2 || "undefined" == typeof console || l2 === e4) return;
      const t3 = function(e5) {
        return new Set(e5.trim().toLowerCase().split(/\s+/).filter(Boolean));
      }(e4);
      t3.has("allow-scripts") && t3.has("allow-same-origin") && (l2 = e4, console.warn("[markstream-vue] htmlPreviewSandbox contains both allow-scripts and allow-same-origin. Use this only for fully trusted content served from an isolated origin."));
    }(e3), e3) : void 0 !== e3 ? "" : true === o3 ? "allow-scripts" : "";
    var e3, o3;
  });
  function a2(e3) {
    var n3;
    "Escape" !== e3.key && "Esc" !== e3.key || null == (n3 = t2.onClose) || n3.call(t2);
  }
  return onMounted(() => {
    "undefined" != typeof window && window.addEventListener("keydown", a2);
  }), onUnmounted(() => {
    "undefined" != typeof window && window.removeEventListener("keydown", a2);
  }), (e3, n3) => (openBlock(), createBlock(Teleport, { to: "body" }, [createBaseVNode("div", { class: normalizeClass(["markstream-vue", { dark: t2.isDark }]) }, [createBaseVNode("div", { class: "html-preview-frame__backdrop", onClick: n3[2] || (n3[2] = (e4) => {
    var n4;
    return null == (n4 = t2.onClose) ? void 0 : n4.call(t2);
  }) }, [createBaseVNode("div", { class: "html-preview-frame", onClick: n3[1] || (n3[1] = withModifiers(() => {
  }, ["stop"])) }, [createBaseVNode("div", Q, [createBaseVNode("div", Z, [n3[3] || (n3[3] = createBaseVNode("span", { class: "html-preview-frame__dot" }, null, -1)), createBaseVNode("span", ee, toDisplayString(t2.title || unref(o2)("common.preview") || "Preview"), 1)]), createBaseVNode("button", { type: "button", class: "html-preview-frame__close", onClick: n3[0] || (n3[0] = (e4) => {
    var n4;
    return null == (n4 = t2.onClose) ? void 0 : n4.call(t2);
  }) }, " × ")]), createBaseVNode("iframe", { class: "html-preview-frame__iframe", sandbox: r2.value, referrerpolicy: "no-referrer", srcdoc: i2.value }, null, 8, te)])])], 2)]));
} }), [["__scopeId", "data-v-24e66176"]]);
var le = null;
var oe = null;
var ie = null;
var re = null;
var ae = null;
var ue = null;
var de = /* @__PURE__ */ new WeakMap();
var se = 0;
var ce = ["data-markstream-enhanced"];
var ve = { class: "code-header-main" };
var fe = ["innerHTML"];
var me = { class: "code-header-copy" };
var pe = { class: "code-header-title" };
var he = { key: 0, class: "code-header-caption" };
var ye = { class: "code-editor-layer" };
var ge = "__markstreamMonacoPassiveTouchState__";
var be = Ee(defineComponent({ __name: "CodeBlockNode", props: { node: {}, isDark: { type: Boolean, default: false }, loading: { type: Boolean, default: true }, stream: { type: Boolean, default: true }, theme: {}, darkTheme: { default: "vitesse-dark" }, lightTheme: { default: "vitesse-light" }, isShowPreview: { type: Boolean, default: true }, monacoOptions: {}, enableFontSizeControl: { type: Boolean, default: true }, minWidth: { default: void 0 }, maxWidth: { default: void 0 }, themes: {}, showHeader: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showExpandButton: { type: Boolean, default: true }, showPreviewButton: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true }, showFontSizeButtons: { type: Boolean, default: true }, showTooltips: { type: Boolean }, htmlPreviewAllowScripts: { type: Boolean }, htmlPreviewSandbox: {}, customId: {}, estimatedHeightPx: {}, estimatedContentHeightPx: {} }, emits: ["previewCode", "copy"], setup(e2, { emit: t2 }) {
  var n2;
  const l2 = e2, o2 = t2;
  const i2 = getCurrentInstance(), r2 = computed(() => {
    const e3 = null == i2 ? void 0 : i2.vnode.props;
    return !(!e3 || !e3.onPreviewCode && !e3.onPreviewCode);
  }), { t: s } = $n(), v = ref(null), h = ref(null), b = ref(false), _ = ref(br(l2.node.language)), Q2 = computed(() => Mr(_.value)), Z2 = computed(() => "plaintext" === Q2.value), ee2 = ref(false), te2 = ref(false), be2 = ref(false), we = ref(false), ke = ref(false);
  let Se = false, Ce = null;
  const xe = ref(null), Pe = ref(null);
  let Oe = 0, Me = 0;
  const Ee2 = jt(), Le = ref(null), Be = ref("undefined" == typeof window);
  "undefined" != typeof window && watch(() => h.value, (e3) => {
    var t3;
    if (null == (t3 = Le.value) || t3.destroy(), Le.value = null, !e3) return void (Be.value = false);
    const n3 = Ee2(e3, { rootMargin: "400px" });
    Le.value = n3, Be.value = n3.isVisible.value, n3.whenVisible.then(() => {
      Be.value = true;
    });
  }, { immediate: true }), onBeforeUnmount(() => {
    var e3;
    Se = true, null == (e3 = Le.value) || e3.destroy(), Le.value = null;
  });
  let He = null, ze = null, Ne = () => {
  }, Fe = () => {
  }, De = () => null, Te = () => ({ getModel: () => ({ getLineCount: () => 1 }), getOption: () => 14, updateOptions: () => {
  } }), _e = () => ({ getModel: () => ({ getLineCount: () => 1 }), getOption: () => 14, updateOptions: () => {
  } }), $e = () => {
  }, Re = () => {
  }, Ae = () => {
  }, je = null, Ie = () => {
    var e3;
    return String(null != (e3 = l2.node.language) ? e3 : "plaintext");
  }, We = () => d(null, null, function* () {
  });
  const Ue = [], qe = [];
  let Ve = null;
  const Ge = computed(() => l2.node.diff), Je = ref({ removed: 0, added: 0 }), Xe = computed(() => `-${Je.value.removed} +${Je.value.added}`), Ye = Object.freeze({ enabled: false }), Ke = Object.freeze({ enabled: true, contextLineCount: 2, minimumLineCount: 4, revealLineCount: 5 });
  function Qe(e3) {
    var t3;
    if ("boolean" == typeof e3) return e3;
    if (e3 && "object" == typeof e3) {
      const n3 = e3;
      return u(a(a({}, Ke), n3), { enabled: null == (t3 = n3.enabled) || t3 });
    }
    return a({}, Ke);
  }
  function Ze(e3, t3) {
    return { original: String(null != e3 ? e3 : ""), updated: String(null != t3 ? t3 : "") };
  }
  const et = computed(() => {
    var e3, t3, n3;
    const o3 = l2.monacoOptions ? a({}, l2.monacoOptions) : {};
    if (!Ge.value) return o3;
    const i3 = void 0 === o3.diffHideUnchangedRegions ? a({}, Ke) : Qe(o3.diffHideUnchangedRegions), r3 = void 0 === o3.hideUnchangedRegions ? void 0 : Qe(o3.hideUnchangedRegions), d2 = false !== l2.stream && false !== l2.loading, s2 = d2 ? a({}, Ye) : i3, c = d2 ? a({}, Ye) : r3, v2 = a({}, null != (e3 = o3.experimental) ? e3 : {}), f = null != (t3 = o3.diffUnchangedRegionStyle) ? t3 : "line-info", m = { maxComputationTime: 0, diffAlgorithm: "legacy", ignoreTrimWhitespace: false, renderIndicators: true, diffUpdateThrottleMs: 120, renderLineHighlight: "none", renderLineHighlightOnlyWhenFocus: true, selectionHighlight: false, occurrencesHighlight: "off", matchBrackets: "never", lineDecorationsWidth: 4, lineNumbersMinChars: 2, glyphMargin: false, renderOverviewRuler: false, overviewRulerBorder: false, hideCursorInOverviewRuler: true, scrollBeyondLastLine: false, diffHideUnchangedRegions: s2, useInlineViewWhenSpaceIsLimited: null != (n3 = o3.useInlineViewWhenSpaceIsLimited) && n3, diffLineStyle: "background", diffAppearance: "auto", diffUnchangedRegionStyle: f, diffHunkActionsOnHover: false, experimental: v2 };
    return u(a(u(a(a({}, m), o3), { experimental: v2 }), void 0 === c ? {} : { hideUnchangedRegions: c }), { diffHideUnchangedRegions: s2 });
  }), tt = computed(() => Ge.value ? "diff" : "single"), nt = ref(tt.value), lt = ref(false), ot = ref(false), it = ref(false), rt = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.wordWrap;
    return null == t3 || "off" !== String(t3);
  }), at = computed(() => !(lt.value || !it.value && (Jl() || ot.value))), ut = ref(false);
  "undefined" != typeof window && d(null, null, function* () {
    try {
      const e3 = yield tr();
      if (Se) return;
      if (!e3) return void (lt.value = true);
      const t3 = e3.useMonaco, n3 = e3.detectLanguage;
      if ("function" == typeof n3 && (Ie = n3), "function" == typeof t3) {
        const e4 = mn();
        if (e4 && l2.themes && Array.isArray(l2.themes) && !l2.themes.includes(e4)) throw new Error("Preferred theme not in provided themes array");
        Ve = gn();
        const n4 = t3(Ve);
        He = n4.createEditor || He, ze = n4.createDiffEditor || ze, Ne = n4.updateCode || Ne, Fe = n4.updateDiff || Fe, De = n4.getEditor || De, Te = n4.getEditorView || Te, _e = n4.getDiffEditorView || _e, $e = n4.cleanupEditor || $e, Re = n4.safeClean || n4.cleanupEditor || Re, Ae = n4.refreshDiffPresentation || Ae, We = n4.setTheme || We, ke.value = true, !Se && v.value && (yield dn(v.value));
      }
    } catch (e3) {
      if (Se) return;
      lt.value = true;
    }
  });
  const dt = ref("number" == typeof (null == (n2 = l2.monacoOptions) ? void 0 : n2.fontSize) ? l2.monacoOptions.fontSize : Number.NaN), st = ref(dt.value), ct = computed(() => {
    const e3 = dt.value, t3 = st.value;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 && "number" == typeof t3 && Number.isFinite(t3) && t3 > 0;
  }), vt = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.fontSize;
    if ("number" == typeof t3 && Number.isFinite(t3) && t3 > 0) return t3;
    const n3 = st.value;
    return "number" == typeof n3 && Number.isFinite(n3) && n3 > 0 ? n3 : 14;
  }), ft = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.lineHeight;
    return "number" == typeof t3 && Number.isFinite(t3) && t3 > 0 ? t3 : Math.max(12, Math.round(1.35 * vt.value));
  }), mt = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.tabSize;
    return "number" == typeof t3 && Number.isFinite(t3) && t3 > 0 ? t3 : 4;
  }), pt = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.padding;
    return { top: "number" == typeof (null == t3 ? void 0 : t3.top) && Number.isFinite(t3.top) && t3.top > 0 ? t3.top : 0, bottom: "number" == typeof (null == t3 ? void 0 : t3.bottom) && Number.isFinite(t3.bottom) && t3.bottom > 0 ? t3.bottom : 0 };
  }), ht = computed(() => {
    const e3 = l2.estimatedContentHeightPx;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 ? e3 : null;
  }), yt = computed(() => {
    const e3 = l2.estimatedHeightPx;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 ? e3 : null;
  }), gt = computed(() => {
    var e3;
    const t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.fontFamily;
    return a(a({ fontSize: `${vt.value}px`, lineHeight: `${ft.value}px`, tabSize: mt.value, boxSizing: "border-box", maxHeight: `${Jt()}px`, overflow: "auto", paddingTop: `${pt.value.top}px`, paddingBottom: `${pt.value.bottom}px` }, null != ht.value ? { height: `${ht.value}px`, minHeight: `${ht.value}px` } : {}), "string" == typeof t3 && t3.trim() ? { "--markstream-code-font-family": t3.trim() } : {});
  }), bt = computed(() => null != ht.value && (!ot.value || null != St())), wt = computed(() => {
    if (bt.value) return { minHeight: `${ht.value}px` };
  }), kt = ref(null);
  function St() {
    const e3 = kt.value;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 ? Math.round(e3) : null;
  }
  function Ct(e3, t3 = false) {
    const n3 = Math.ceil(e3), l3 = St();
    return null == l3 ? n3 : n3 >= l3 ? (t3 && we.value && (kt.value = null), n3) : l3;
  }
  function xt() {
    return new Promise((e3) => {
      Tr(() => e3());
    });
  }
  function Pt() {
    var e3, t3, n3, l3, o3;
    try {
      const i3 = Ge.value ? null != (n3 = null == (t3 = null == (e3 = _e()) ? void 0 : e3.getModifiedEditor) ? void 0 : t3.call(e3)) ? n3 : _e() : Te(), r3 = De(), a2 = null == (l3 = null == r3 ? void 0 : r3.EditorOption) ? void 0 : l3.fontInfo;
      if (i3 && null != a2) {
        const e4 = null == (o3 = i3.getOption) ? void 0 : o3.call(i3, a2), t4 = null == e4 ? void 0 : e4.fontSize;
        if ("number" == typeof t4 && Number.isFinite(t4) && t4 > 0) return t4;
      }
    } catch (i3) {
    }
    try {
      const e4 = v.value;
      if (e4) {
        const t4 = e4.querySelector(".view-lines .view-line");
        if (t4) try {
          if ("undefined" != typeof window && "function" == typeof window.getComputedStyle) {
            const e5 = window.getComputedStyle(t4).fontSize, n4 = e5 && e5.match(/^(\d+(?:\.\d+)?)/);
            if (n4) return Number.parseFloat(n4[1]);
          }
        } catch (i3) {
        }
      }
    } catch (i3) {
    }
    return null;
  }
  function Ot(e3) {
    var t3, n3;
    try {
      const l4 = De(), o4 = null == (t3 = null == l4 ? void 0 : l4.EditorOption) ? void 0 : t3.lineHeight;
      if (null != o4) {
        const t4 = null == (n3 = null == e3 ? void 0 : e3.getOption) ? void 0 : n3.call(e3, o4);
        if ("number" == typeof t4 && t4 > 0) return t4;
      }
    } catch (i3) {
    }
    const l3 = function() {
      try {
        const e4 = v.value;
        if (!e4) return null;
        const t4 = e4.querySelector(".view-lines .view-line");
        if (t4) {
          const e5 = Math.ceil(t4.getBoundingClientRect().height);
          if (e5 > 0) return e5;
        }
      } catch (i3) {
      }
      return null;
    }();
    if (l3 && l3 > 0) return l3;
    const o3 = Number.isFinite(st.value) && st.value > 0 ? st.value : 14;
    return Math.max(12, Math.round(1.35 * o3));
  }
  function Mt(e3) {
    var t3, n3, l3;
    try {
      const l4 = De(), o4 = null == (t3 = null == l4 ? void 0 : l4.EditorOption) ? void 0 : t3.padding;
      if (null != o4) {
        const t4 = null == (n3 = null == e3 ? void 0 : e3.getOption) ? void 0 : n3.call(e3, o4), l5 = "number" == typeof (null == t4 ? void 0 : t4.top) ? t4.top : 0, i4 = "number" == typeof (null == t4 ? void 0 : t4.bottom) ? t4.bottom : 0;
        if (l5 > 0 || i4 > 0) return l5 + i4;
      }
    } catch (a2) {
    }
    const o3 = null == (l3 = et.value) ? void 0 : l3.padding, i3 = "number" == typeof (null == o3 ? void 0 : o3.top) ? o3.top : 0, r3 = "number" == typeof (null == o3 ? void 0 : o3.bottom) ? o3.bottom : 0;
    return i3 > 0 || r3 > 0 ? i3 + r3 : Ge.value ? 24 : 0;
  }
  function Et(e3, t3) {
    return "number" != typeof e3 || "number" != typeof t3 || e3 < 1 || t3 < e3 ? 0 : t3 - e3 + 1;
  }
  function Lt(e3) {
    if (!e3) return [];
    const t3 = e3.split(/\r?\n/);
    return 1 === t3.length && "" === t3[0] ? [] : t3;
  }
  function Bt() {
    var e3, t3;
    Ge.value ? Je.value = function(e4, t4) {
      const n3 = Lt(e4), l3 = Lt(t4);
      let o3 = 0, i3 = n3.length - 1, r3 = l3.length - 1;
      for (; o3 <= i3 && o3 <= r3 && n3[o3] === l3[o3]; ) o3++;
      for (; i3 >= o3 && r3 >= o3 && n3[i3] === l3[r3]; ) i3--, r3--;
      return { removed: Math.max(0, i3 - o3 + 1), added: Math.max(0, r3 - o3 + 1) };
    }(String(null != (e3 = l2.node.originalCode) ? e3 : ""), String(null != (t3 = l2.node.updatedCode) ? t3 : "")) : Je.value = { removed: 0, added: 0 };
  }
  function Ht() {
    var e3;
    if (Ge.value) try {
      const t3 = _e(), n3 = null == (e3 = null == t3 ? void 0 : t3.getLineChanges) ? void 0 : e3.call(t3);
      if (!Array.isArray(n3)) return void Bt();
      let l3 = 0, o3 = 0;
      for (const e4 of n3) l3 += Et(e4.originalStartLineNumber, e4.originalEndLineNumber), o3 += Et(e4.modifiedStartLineNumber, e4.modifiedEndLineNumber);
      Je.value = { removed: l3, added: o3 };
    } catch (t3) {
      Bt();
    }
    else Je.value = { removed: 0, added: 0 };
  }
  function zt() {
    var e3;
    if (Number.isFinite(st.value) && st.value > 0 && Number.isFinite(dt.value)) return st.value;
    const t3 = Pt();
    return "number" == typeof (null == (e3 = l2.monacoOptions) ? void 0 : e3.fontSize) ? (dt.value = l2.monacoOptions.fontSize, st.value = l2.monacoOptions.fontSize, st.value) : t3 && t3 > 0 ? (dt.value = t3, st.value = t3, t3) : (dt.value = 12, st.value = 12, 12);
  }
  function Nt() {
    const e3 = zt(), t3 = Math.min(36, e3 + 1);
    st.value = t3;
  }
  function Ft() {
    const e3 = zt(), t3 = Math.max(10, e3 - 1);
    st.value = t3;
  }
  function Dt() {
    zt(), Number.isFinite(dt.value) && (st.value = dt.value);
  }
  function Tt() {
    var e3, t3, n3, l3, o3, i3, r3, a2, u2, d2, s2, c, v2, f;
    try {
      const m = Ge.value ? _e() : null, p = Ge.value ? m : Te();
      if (!p) return null;
      if ((null == m ? void 0 : m.getOriginalEditor) && (null == m ? void 0 : m.getModifiedEditor)) {
        const v3 = null == (e3 = m.getOriginalEditor) ? void 0 : e3.call(m), f2 = null == (t3 = m.getModifiedEditor) ? void 0 : t3.call(m);
        null == (n3 = null == v3 ? void 0 : v3.layout) || n3.call(v3), null == (l3 = null == f2 ? void 0 : f2.layout) || l3.call(f2);
        const p2 = (null == (o3 = null == v3 ? void 0 : v3.getContentHeight) ? void 0 : o3.call(v3)) || 0, h3 = (null == (i3 = null == f2 ? void 0 : f2.getContentHeight) ? void 0 : i3.call(f2)) || 0, y2 = Math.max(p2, h3);
        if (y2 > 0) return Math.ceil(y2 + 1);
        const g2 = (null == (u2 = null == (a2 = null == (r3 = null == v3 ? void 0 : v3.getModel) ? void 0 : r3.call(v3)) ? void 0 : a2.getLineCount) ? void 0 : u2.call(a2)) || 1, b2 = (null == (c = null == (s2 = null == (d2 = null == f2 ? void 0 : f2.getModel) ? void 0 : d2.call(f2)) ? void 0 : s2.getLineCount) ? void 0 : c.call(s2)) || 1, w = Math.max(g2, b2), k = Math.max(Ot(v3), Ot(f2));
        return Math.ceil(w * (k + 1.5) + 0 + 1);
      }
      if (null == p ? void 0 : p.getContentHeight) {
        null == (v2 = null == p ? void 0 : p.layout) || v2.call(p);
        const e4 = p.getContentHeight();
        if (e4 > 0) return Math.ceil(e4 + 1);
      }
      const h2 = null == (f = null == p ? void 0 : p.getModel) ? void 0 : f.call(p);
      let y = 1;
      h2 && "function" == typeof h2.getLineCount && (y = h2.getLineCount());
      const g = Ot(p);
      return Math.ceil(y * (g + 1.5) + 0 + 1);
    } catch (m) {
      return null;
    }
  }
  function _t(e3) {
    var t3;
    const n3 = String(null != e3 ? e3 : "").trim(), l3 = null == (t3 = n3.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) ? void 0 : t3[1];
    if (l3) {
      const e4 = 3 === l3.length ? l3.split("").map((e5) => `${e5}${e5}`).join("") : l3;
      return 0.2126 * Number.parseInt(e4.slice(0, 2), 16) + 0.7152 * Number.parseInt(e4.slice(2, 4), 16) + 0.0722 * Number.parseInt(e4.slice(4, 6), 16);
    }
    const o3 = n3.match(/\d+(?:\.\d+)?/g);
    if (!o3 || o3.length < 3) return null;
    const [i3, r3, a2] = o3.slice(0, 3).map(Number);
    return 0.2126 * i3 + 0.7152 * r3 + 0.0722 * a2;
  }
  function $t() {
    var e3, t3, n3, l3, o3, i3, r3, a2;
    const u2 = v.value, d2 = h.value;
    if (!u2 || !d2) return;
    const s2 = u2, c = u2.querySelector(".monaco-editor") || u2, f = c.querySelector(".monaco-editor-background") || c, m = c.querySelector(".view-lines") || c;
    let p = null, y = null, g = null;
    try {
      "undefined" != typeof window && "function" == typeof window.getComputedStyle && (p = window.getComputedStyle(c), y = f === c ? p : window.getComputedStyle(f), g = m === c ? p : window.getComputedStyle(m));
    } catch (x) {
      p = null, y = null, g = null;
    }
    const b2 = String(null != (e3 = null == p ? void 0 : p.getPropertyValue("--vscode-editor-foreground")) ? e3 : "").trim(), w = String(null != (t3 = null == p ? void 0 : p.getPropertyValue("--vscode-editor-background")) ? t3 : "").trim(), k = String(null != (l3 = null != (n3 = null == p ? void 0 : p.getPropertyValue("--vscode-editor-selectionBackground")) ? n3 : null == p ? void 0 : p.getPropertyValue("--vscode-editor-hoverHighlightBackground")) ? l3 : "").trim(), S = b2 || String(null != (i3 = null != (o3 = null == g ? void 0 : g.color) ? o3 : null == p ? void 0 : p.color) ? i3 : "").trim(), C = w || String(null != (a2 = null != (r3 = null == y ? void 0 : y.backgroundColor) ? r3 : null == p ? void 0 : p.backgroundColor) ? a2 : "").trim();
    return Ge.value ? (S ? (d2.style.setProperty("--markstream-diff-editor-fg", S), s2.style.setProperty("--vscode-editor-foreground", S), s2.style.setProperty("--stream-monaco-editor-fg", S)) : (d2.style.removeProperty("--markstream-diff-editor-fg"), s2.style.removeProperty("--vscode-editor-foreground"), s2.style.removeProperty("--stream-monaco-editor-fg")), C ? (d2.style.setProperty("--markstream-diff-editor-bg", C), d2.style.setProperty("--markstream-diff-panel-bg", C), d2.style.setProperty("--markstream-diff-panel-bg-soft", C), d2.style.setProperty("--markstream-diff-panel-bg-strong", C), s2.style.setProperty("--vscode-editor-background", C), s2.style.setProperty("--stream-monaco-editor-bg", C), s2.style.setProperty("--stream-monaco-fixed-editor-bg", C), s2.style.setProperty("--stream-monaco-panel-bg", C), s2.style.setProperty("--stream-monaco-panel-bg-soft", C), s2.style.setProperty("--stream-monaco-panel-bg-strong", C), s2.style.backgroundColor = C) : (d2.style.removeProperty("--markstream-diff-editor-bg"), d2.style.removeProperty("--markstream-diff-panel-bg"), d2.style.removeProperty("--markstream-diff-panel-bg-soft"), d2.style.removeProperty("--markstream-diff-panel-bg-strong"), s2.style.removeProperty("--vscode-editor-background"), s2.style.removeProperty("--stream-monaco-editor-bg"), s2.style.removeProperty("--stream-monaco-fixed-editor-bg"), s2.style.removeProperty("--stream-monaco-panel-bg"), s2.style.removeProperty("--stream-monaco-panel-bg-soft"), s2.style.removeProperty("--stream-monaco-panel-bg-strong"), s2.style.backgroundColor = ""), void (k ? s2.style.setProperty("--vscode-editor-selectionBackground", k) : s2.style.removeProperty("--vscode-editor-selectionBackground"))) : function(e4, t4, n4) {
      if (!Z2.value) return false;
      const l4 = _t(e4), o4 = _t(t4);
      return n4 ? null != l4 && l4 > 170 || null != o4 && o4 < 110 : null != l4 && l4 < 85 || null != o4 && o4 > 190;
    }(C, S, d2.classList.contains("is-dark")) ? (s2.style.removeProperty("--vscode-editor-foreground"), s2.style.removeProperty("--vscode-editor-background"), void s2.style.removeProperty("--vscode-editor-selectionBackground")) : (S && s2.style.setProperty("--vscode-editor-foreground", S), C && s2.style.setProperty("--vscode-editor-background", C), void (k && s2.style.setProperty("--vscode-editor-selectionBackground", k)));
  }
  const Rt = /auto|scroll|overlay/i;
  function At(e3, t3, n3) {
    var l3;
    if ("undefined" == typeof window) return;
    if (Ge.value) return;
    const o3 = Math.ceil(t3), i3 = Math.ceil(n3) - o3;
    if (!i3) return;
    const r3 = function(e4) {
      var t4, n4;
      if ("undefined" == typeof window) return null;
      const l4 = null != (t4 = null == e4 ? void 0 : e4.ownerDocument) ? t4 : document, o4 = l4.scrollingElement || l4.documentElement || l4.body;
      let i4 = null != (n4 = null == e4 ? void 0 : e4.parentElement) ? n4 : null;
      for (; i4 && i4 !== l4.body && i4 !== o4; ) {
        const e5 = window.getComputedStyle(i4), t5 = (e5.overflowY || "").toLowerCase(), n5 = (e5.overflow || "").toLowerCase();
        if (Rt.test(t5) || Rt.test(n5)) return i4;
        i4 = i4.parentElement;
      }
      return o4;
    }(e3);
    if (!r3) return;
    const a2 = null != (l3 = e3.ownerDocument) ? l3 : document, u2 = r3 === a2.body || r3 === a2.documentElement || r3 === a2.scrollingElement, d2 = u2 ? 0 : r3.getBoundingClientRect().top;
    e3.getBoundingClientRect().top - d2 >= 0 || (u2 && "function" == typeof window.scrollBy ? window.scrollBy(0, i3) : r3.scrollTop += i3);
  }
  function jt2() {
    try {
      const e3 = v.value;
      if (!e3) return;
      const t3 = e3.getBoundingClientRect().height, n3 = Tt();
      if (null != n3 && n3 > 0) {
        const l4 = Ct(n3, true), o3 = St();
        return e3.style.minHeight = null != o3 ? `${o3}px` : "0px", e3.style.height = `${l4}px`, e3.style.maxHeight = "none", e3.style.overflow = "visible", void At(e3, t3, l4);
      }
      const l3 = St();
      null != l3 && (e3.style.minHeight = `${l3}px`, e3.style.height = `${l3}px`, e3.style.maxHeight = "none", e3.style.overflow = "visible", At(e3, t3, l3));
    } catch (e3) {
    }
  }
  function It() {
    for (var e3, t3; Ue.length > 0; ) try {
      null == (t3 = null == (e3 = Ue.pop()) ? void 0 : e3.dispose) || t3.call(e3);
    } catch (n3) {
    }
    null != Ce && (Ir(Ce), Ce = null);
  }
  function Wt() {
    for (var e3; qe.length > 0; ) try {
      null == (e3 = qe.pop()) || e3();
    } catch (t3) {
    }
  }
  function Ut(e3 = false) {
    te2.value || (ee2.value ? jt2() : function() {
      var e4;
      try {
        const t3 = v.value;
        if (!t3) return;
        const n3 = t3.getBoundingClientRect().height, l3 = Jt(), o3 = Math.ceil((null == (e4 = t3.getBoundingClientRect) ? void 0 : e4.call(t3).height) || 0), i3 = Ge.value ? function() {
          var e5, t4, n4, l4, o4, i4, r4, a3;
          try {
            const u3 = _e(), d3 = null == (e5 = null == u3 ? void 0 : u3.getOriginalEditor) ? void 0 : e5.call(u3), s3 = null == (t4 = null == u3 ? void 0 : u3.getModifiedEditor) ? void 0 : t4.call(u3);
            if (!d3 || !s3) return null;
            const c2 = (null == (o4 = null == (l4 = null == (n4 = d3.getModel) ? void 0 : n4.call(d3)) ? void 0 : l4.getLineCount) ? void 0 : o4.call(l4)) || 1, v2 = (null == (a3 = null == (r4 = null == (i4 = s3.getModel) ? void 0 : i4.call(s3)) ? void 0 : r4.getLineCount) ? void 0 : a3.call(r4)) || 1, f = Math.max(c2, v2), m = Math.max(Ot(d3), Ot(s3)), p = Math.max(Mt(d3), Mt(s3));
            return Math.ceil(f * (m + 1.5) + p + 0 + 1);
          } catch (u3) {
            return null;
          }
        }() : null, r3 = Ge.value && function(e5) {
          if ("undefined" == typeof window) return false;
          const t4 = e5.querySelectorAll(".editor.modified .diff-hidden-lines .center, .stream-monaco-diff-unchanged-bridge");
          for (const n4 of Array.from(t4)) {
            if (!(n4 instanceof HTMLElement)) continue;
            const e6 = window.getComputedStyle(n4);
            if ("none" === e6.display || "hidden" === e6.visibility) continue;
            if (Number.parseFloat(e6.opacity || "1") <= 0.01) continue;
            const t5 = n4.getBoundingClientRect();
            if (!(t5.width <= 0 || t5.height <= 0)) return true;
          }
          return false;
        }(t3);
        if (r3 || (Pe.value = null), Me > 0 && (Me--, null != xe.value)) return void At(t3, n3, Gt(t3, xe.value, l3));
        const a2 = Ge.value ? function(e5) {
          var t4, n4;
          if ("undefined" == typeof window) return null;
          try {
            const l4 = e5.getBoundingClientRect();
            if (l4.height <= 0) return null;
            const o4 = [".editor.original .view-lines .view-line", ".editor.modified .view-lines .view-line", ".editor.original .view-zones > div", ".editor.modified .view-zones > div", ".editor.original .margin-view-zones > div", ".editor.modified .margin-view-zones > div", ".editor.original .diff-hidden-lines", ".editor.modified .diff-hidden-lines", ".stream-monaco-diff-unchanged-bridge"];
            let i4 = 0;
            for (const t5 of Array.from(e5.querySelectorAll(o4.join(",")))) {
              if (!(t5 instanceof HTMLElement)) continue;
              const e6 = window.getComputedStyle(t5);
              if ("none" === e6.display || "hidden" === e6.visibility) continue;
              if (Number.parseFloat(e6.opacity || "1") <= 0.01) continue;
              const n5 = t5.getBoundingClientRect();
              n5.height <= 0 || n5.bottom <= l4.top || (i4 = Math.max(i4, n5.bottom - l4.top));
            }
            if (i4 > 0) return Math.ceil(i4 + 1);
            const r4 = e5.querySelector(".monaco-diff-editor"), a3 = null != (n4 = null == (t4 = null == r4 ? void 0 : r4.getBoundingClientRect) ? void 0 : t4.call(r4).height) ? n4 : 0;
            return a3 > 0 ? Math.ceil(a3 + 1) : null;
          } catch (l4) {
            return null;
          }
        }(t3) : null, u2 = Ge.value ? r3 ? a2 : Math.max(null != a2 ? a2 : 0, null != i3 ? i3 : 0) || null : Tt();
        if (null != u2 && u2 > 0) {
          const e5 = null != Pe.value && Date.now() < Oe && u2 >= l3 - 1, i4 = r3 && o3 > 0 && o3 < l3 - 1 && u2 >= l3 - 1, a3 = Gt(t3, e5 ? Pe.value : i4 ? o3 : u2, l3, { clearEstimatedFloor: true });
          return r3 && a3 < l3 - 1 && (Pe.value = a3, Oe = Date.now() + 160), void At(t3, n3, a3);
        }
        if (null != xe.value) return void At(t3, n3, Gt(t3, xe.value, l3));
        const d2 = r3 ? o3 : Math.max(o3, null != i3 && i3 > 0 ? i3 : 0);
        if (d2 > 0) {
          const e5 = null != Pe.value && Date.now() < Oe && d2 >= l3 - 1, i4 = r3 && o3 > 0 && o3 < l3 - 1 && d2 >= l3 - 1, a3 = Gt(t3, e5 ? Pe.value : i4 ? o3 : d2, l3);
          return r3 && a3 < l3 - 1 && (Pe.value = a3, Oe = Date.now() + 160), void At(t3, n3, a3);
        }
        const s2 = St();
        if (null != s2) return void At(t3, n3, Gt(t3, s2, l3));
        const c = Number.parseFloat(t3.style.height);
        !Number.isNaN(c) && c > 0 ? At(t3, n3, Gt(t3, c, l3)) : Ge.value || At(t3, n3, Gt(t3, l3, l3));
      } catch (t3) {
      }
    }());
  }
  function qt() {
    if (!Ge.value) return void Wt();
    const e3 = v.value;
    if (!e3) return void Wt();
    const t3 = e3.querySelector(".monaco-diff-editor");
    if (!t3 || t3.classList.contains("side-by-side")) return void Wt();
    const n3 = Array.from(t3.querySelectorAll(".editor.original .diff-hidden-lines")), l3 = Array.from(t3.querySelectorAll(".editor.modified .diff-hidden-lines")), o3 = Math.min(n3.length, l3.length);
    for (let i3 = 0; i3 < o3; i3++) {
      const e4 = l3[i3], t4 = e4.querySelector("a"), n4 = e4.querySelector(".center > div:first-child"), o4 = e4.querySelector(".center");
      if (!t4 || !n4 || !o4) continue;
      if (o4.querySelector(".markstream-inline-fold-proxy")) continue;
      const r3 = document.createElement("button");
      r3.type = "button", r3.className = "markstream-inline-fold-proxy", r3.dataset.markstreamInlineFoldProxy = "true";
      const a2 = t4.getAttribute("title") || "Show Unchanged Region";
      r3.title = a2, r3.setAttribute("aria-label", a2);
      const u2 = (e5) => {
        e5.preventDefault(), e5.stopPropagation();
      }, d2 = (e5) => {
        e5.preventDefault(), e5.stopPropagation(), t4.click(), Tr(() => Vt());
      }, s2 = (e5) => {
        "Enter" !== e5.key && " " !== e5.key || (e5.preventDefault(), e5.stopPropagation(), t4.click(), Tr(() => Vt()));
      };
      r3.addEventListener("mousedown", u2), r3.addEventListener("click", d2), r3.addEventListener("keydown", s2), o4.appendChild(r3), qe.push(() => {
        r3.removeEventListener("mousedown", u2), r3.removeEventListener("click", d2), r3.removeEventListener("keydown", s2), r3.parentElement === o4 && o4.removeChild(r3);
      });
    }
  }
  function Vt(e3 = false) {
    null == Ce && (Ce = Tr(() => {
      Ce = null, Tr(() => {
        qt(), Ut(e3);
      });
    }));
  }
  function Gt(e3, t3, n3, l3 = {}) {
    const o3 = Ct(Math.min(t3, n3), true === l3.clearEstimatedFloor), i3 = St();
    if (e3.style.minHeight = null != i3 ? `${Math.min(i3, Math.ceil(n3))}px` : "0px", e3.style.height = `${o3}px`, e3.style.maxHeight = `${Math.ceil(n3)}px`, Ge.value) e3.style.overflow = "hidden";
    else {
      const l4 = t3 > n3 + 1;
      e3.style.overflow = l4 ? "auto" : "hidden";
    }
    return o3;
  }
  function Jt() {
    var e3, t3;
    const n3 = null != (t3 = null == (e3 = l2.monacoOptions) ? void 0 : e3.MAX_HEIGHT) ? t3 : 500;
    if ("number" == typeof n3) return n3;
    const o3 = String(n3).match(/^(\d+(?:\.\d+)?)/);
    return o3 ? Number.parseFloat(o3[1]) : 500;
  }
  const Xt = computed(() => l2.isShowPreview && ("html" === _.value || "svg" === _.value));
  watch(() => l2.node.language, (e3) => {
    _.value = br(e3);
  }), watch(() => [l2.node.originalCode, l2.node.updatedCode, Ge.value], () => {
    Bt(), Tr(() => Ht());
  }, { immediate: true }), watch(() => [l2.node.originalCode, l2.node.updatedCode, Q2.value, Ge.value], (e3) => d(null, [e3], function* ([e4, t3, n3, o3]) {
    if (false === l2.stream || !o3) return;
    if (He && !be2.value && v.value) try {
      yield dn(v.value);
    } catch (a2) {
    }
    const i3 = Ze(String(null != e4 ? e4 : ""), String(null != t3 ? t3 : "")), r3 = false === l2.loading;
    if (r3 && bn(), yield Fe(i3.original, i3.updated, Q2.value), r3) {
      if (Se || !Ge.value) return;
      Ae(), qt(), Ht(), Vt();
    }
    ee2.value && Tr(() => jt2());
  })), watch(() => l2.node.code, (e3) => d(null, null, function* () {
    if (false !== l2.stream && (_.value || (_.value = br(Ie(e3))), !Ge.value)) {
      if (He && !be2.value && v.value) try {
        yield dn(v.value);
      } catch (t3) {
      }
      Ne(e3, Q2.value), ee2.value && Tr(() => jt2());
    }
  }));
  const Yt = computed(() => {
    const e3 = _.value;
    return e3 ? Br[e3] || e3.charAt(0).toUpperCase() + e3.slice(1) : Br[""] || "Plain Text";
  });
  const Kt = computed(() => {
    var e3;
    return function(e4) {
      const t3 = function(e5) {
        var t4, n4;
        const l4 = null != (n4 = null == (t4 = String(null != e5 ? e5 : "").split(/\r?\n/, 1)[0]) ? void 0 : t4.trim()) ? n4 : "";
        if (l4.length < 3) return "";
        const o3 = l4[0];
        if ("`" !== o3 && "~" !== o3 || l4[1] !== o3 || l4[2] !== o3) return "";
        let i3 = 3;
        for (; l4[i3] === o3; ) i3 += 1;
        return l4.slice(i3).trim();
      }(e4);
      if (!t3) return "";
      const n3 = t3.split(/\s+/).filter(Boolean);
      if (!n3.length) return "";
      const l3 = "diff" === n3[0] ? n3.slice(1) : n3;
      for (const o3 of l3) {
        const e5 = o3.includes(":") ? o3.slice(o3.indexOf(":") + 1) : o3;
        if (e5 && /[./\\-]/.test(e5)) return e5;
      }
      return "";
    }(String(null != (e3 = l2.node.raw) ? e3 : ""));
  }), Qt = computed(() => Kt.value || Yt.value), Zt2 = computed(() => Kt.value ? Ge.value ? `Diff / ${Yt.value}` : Yt.value : ""), en = computed(() => (xr.value, _r(_.value || ""))), tn = computed(() => {
    var e3;
    const t3 = {}, n3 = (e4) => {
      if (null != e4) return "number" == typeof e4 ? `${e4}px` : String(e4);
    }, o3 = n3(l2.minWidth), i3 = n3(l2.maxWidth);
    return o3 && (t3.minWidth = o3), i3 && (t3.maxWidth = i3), bt.value && (t3.minHeight = `${null != (e3 = yt.value) ? e3 : ht.value}px`), Ge.value || (t3.color = "var(--vscode-editor-foreground, var(--markstream-code-fallback-fg))", t3.backgroundColor = "var(--vscode-editor-background, var(--markstream-code-fallback-bg))", t3.borderColor = "var(--markstream-code-border-color)"), t3;
  }), nn = computed(() => false !== l2.showTooltips);
  function ln() {
    return d(this, null, function* () {
      try {
        "undefined" != typeof navigator && navigator.clipboard && "function" == typeof navigator.clipboard.writeText && (yield navigator.clipboard.writeText(l2.node.code)), b.value = true, o2("copy", l2.node.code), setTimeout(() => {
          b.value = false;
        }, 1e3);
      } catch (e3) {
        console.error("复制失败:", e3);
      }
    });
  }
  function on(e3) {
    if (ee2.value = !ee2.value, e3 && nn.value) {
      const t4 = function(e4) {
        const t5 = e4.currentTarget || e4.target;
        return !t5 || t5.disabled ? null : t5;
      }(e3);
      if (t4) {
        const e4 = ee2.value ? s("common.collapse") || "Collapse" : s("common.expand") || "Expand";
        Ln(t4, e4, "top", false, void 0, l2.isDark);
      }
    }
    const t3 = Ge.value ? _e() : Te(), n3 = v.value;
    t3 && n3 && (ee2.value ? (un(true), n3.style.maxHeight = "none", n3.style.overflow = "visible", Ut(true)) : (un(false), n3.style.overflow = Ge.value ? "hidden" : "auto", Ut(true)));
  }
  function rn() {
    var e3, t3, n3;
    if (te2.value = !te2.value, te2.value) {
      if (v.value) {
        const n4 = Math.ceil((null == (t3 = (e3 = v.value).getBoundingClientRect) ? void 0 : t3.call(e3).height) || 0);
        n4 > 0 && (xe.value = n4);
      }
      un(false);
    } else {
      ee2.value && un(true), v.value && null != xe.value && (v.value.style.height = `${xe.value}px`);
      const e4 = Ge.value ? _e() : Te();
      try {
        null == (n3 = null == e4 ? void 0 : e4.layout) || n3.call(e4);
      } catch (l3) {
      }
      Me = 2, Tr(() => {
        Ut(true);
      });
    }
  }
  function an() {
    if (!Xt.value) return;
    const e3 = _.value;
    if (r2.value) {
      const t3 = "html" === e3 ? "text/html" : "image/svg+xml", n3 = "html" === e3 ? s("artifacts.htmlPreviewTitle") || "HTML Preview" : s("artifacts.svgPreviewTitle") || "SVG Preview";
      return void o2("previewCode", { node: l2.node, artifactType: t3, artifactTitle: n3, id: `temp-${e3}-${Date.now()}` });
    }
    "html" === e3 && (ut.value = !ut.value);
  }
  function un(e3) {
    var t3, n3;
    try {
      if (Ge.value) {
        const n4 = _e();
        null == (t3 = null == n4 ? void 0 : n4.updateOptions) || t3.call(n4, { automaticLayout: e3 });
      } else {
        const t4 = Te();
        null == (n3 = null == t4 ? void 0 : t4.updateOptions) || n3.call(t4, { automaticLayout: e3 });
      }
    } catch (l3) {
    }
  }
  function dn(e3) {
    if (!He || Se) return null;
    if (je) return je;
    if (be2.value && we.value) return Promise.resolve();
    be2.value = true;
    const t3 = d(null, null, function* () {
      yield function(e4) {
        return d(this, null, function* () {
          var t4;
          if ("undefined" == typeof window) return yield e4();
          try {
            const n3 = null == (t4 = window.Element) ? void 0 : t4.prototype, l3 = null == n3 ? void 0 : n3.addEventListener;
            if (!n3 || !l3) return yield e4();
            const o3 = function() {
              const e5 = window, t5 = e5[ge];
              if (t5) return t5;
              const n4 = { depth: 0, original: null };
              return e5[ge] = n4, n4;
            }();
            0 === o3.depth && (o3.original = l3, n3.addEventListener = function(e5, t5, n4) {
              var i3;
              const r3 = null != (i3 = o3.original) ? i3 : l3;
              return "touchstart" === e5 && function(e6, t6) {
                if (!e6) return false;
                const n5 = e6;
                return !("function" != typeof n5.closest || !n5.closest(".monaco-editor, .monaco-diff-editor") || t6 && "object" == typeof t6 && "passive" in t6);
              }(this, n4) ? r3.call(this, e5, t5, function(e6) {
                return null == e6 ? { passive: true } : "boolean" == typeof e6 ? { capture: e6, passive: true } : "object" == typeof e6 ? "passive" in e6 ? e6 : u(a({}, e6), { passive: true }) : { passive: true };
              }(n4)) : r3.call(this, e5, t5, n4);
            }), o3.depth++;
            try {
              return yield e4();
            } finally {
              o3.depth = Math.max(0, o3.depth - 1), 0 === o3.depth && o3.original && n3.addEventListener !== o3.original && (n3.addEventListener = o3.original, o3.original = null);
            }
          } catch (n3) {
            return yield e4();
          }
        });
      }(() => function(e4) {
        return d(this, null, function* () {
          var t4, n3, o3;
          if (!He || Se) return;
          if (it.value = false, ot.value = false, function() {
            const e5 = ht.value;
            kt.value = we.value || null == e5 ? null : e5;
          }(), It(), Wt(), function(e5) {
            e5.replaceChildren();
          }(e4), Se) return;
          if (Ge.value) {
            Re();
            const o4 = Ze(String(null != (t4 = l2.node.originalCode) ? t4 : ""), String(null != (n3 = l2.node.updatedCode) ? n3 : ""));
            ze ? yield ze(e4, o4.original, o4.updated, Q2.value) : yield He(e4, l2.node.code, Q2.value);
          } else yield He(e4, l2.node.code, Q2.value);
          if (Se) return;
          const i3 = Ge.value ? _e() : Te();
          if ("number" == typeof (null == (o3 = l2.monacoOptions) ? void 0 : o3.fontSize)) null == i3 || i3.updateOptions({ fontSize: l2.monacoOptions.fontSize, automaticLayout: false }), dt.value = l2.monacoOptions.fontSize, st.value = l2.monacoOptions.fontSize;
          else {
            const e5 = Pt();
            e5 && e5 > 0 ? (dt.value = e5, st.value = e5) : (dt.value = 12, st.value = 12);
          }
          ee2.value || te2.value || Ut(false), yield function() {
            return d(this, null, function* () {
              null != St() && (qt(), Ut(false), yield nextTick(), yield xt(), qt(), Ut(false), yield xt(), qt(), Ut(false));
            });
          }(), Se || (we.value = true, function() {
            var e5, t5, n4, l3, o4;
            if (It(), Ge.value) {
              const l4 = _e(), o5 = null == (e5 = null == l4 ? void 0 : l4.getOriginalEditor) ? void 0 : e5.call(l4), i5 = null == (t5 = null == l4 ? void 0 : l4.getModifiedEditor) ? void 0 : t5.call(l4), a2 = (e6, t6) => {
                try {
                  const n5 = null == e6 ? void 0 : e6[t6];
                  if ("function" != typeof n5) return;
                  const l5 = n5.call(e6, () => Vt());
                  l5 && Ue.push(l5);
                } catch (n5) {
                }
              };
              try {
                const e6 = null == (n4 = null == l4 ? void 0 : l4.onDidUpdateDiff) ? void 0 : n4.call(l4, () => {
                  Vt(), Tr(() => Ht());
                });
                e6 && Ue.push(e6);
              } catch (r3) {
              }
              return a2(o5, "onDidContentSizeChange"), a2(i5, "onDidContentSizeChange"), a2(o5, "onDidLayoutChange"), void a2(i5, "onDidLayoutChange");
            }
            const i4 = Te();
            try {
              const e6 = null == (l3 = null == i4 ? void 0 : i4.onDidContentSizeChange) ? void 0 : l3.call(i4, () => Vt());
              e6 && Ue.push(e6);
            } catch (r3) {
            }
            try {
              const e6 = null == (o4 = null == i4 ? void 0 : i4.onDidLayoutChange) ? void 0 : o4.call(i4, () => Vt());
              e6 && Ue.push(e6);
            } catch (r3) {
            }
          }(), $t(), qt(), Ht(), Vt(), yield function() {
            return d(this, null, function* () {
              qt(), Ut(false), yield nextTick(), yield xt(), qt(), Ut(false), yield xt(), qt(), Ut(false);
            });
          }(), Se || (ot.value = true));
        });
      }(e3));
    }).finally(() => {
      je === t3 && (je = null);
    });
    return je = t3, t3;
  }
  watch(nn, (e3) => {
    e3 || On();
  }), watch(() => st.value, (e3, t3) => {
    const n3 = Ge.value ? _e() : Te();
    n3 && "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 && (n3.updateOptions({ fontSize: e3 }), te2.value || Ut(true));
  }, { flush: "post", immediate: false });
  const sn = watch(() => [v.value, Ge.value, l2.stream, l2.loading, ke.value, Be.value], (e3) => d(null, [e3], function* ([e4, t3, n3, l3, o3, i3]) {
    if (!e4 || !He) return;
    if (!i3) return;
    if (false === n3 && false !== l3) return;
    const r3 = dn(e4);
    if (r3) {
      try {
        yield r3;
      } catch (a2) {
        we.value = false, ot.value = false, it.value = true;
      }
      sn();
    }
  }));
  function cn(e3) {
    return !!e3 && "object" == typeof e3 && "light" in e3 && "dark" in e3;
  }
  function vn(e3) {
    return "string" == typeof e3 ? e3 : e3 && "object" == typeof e3 && "name" in e3 ? String(e3.name) : null;
  }
  function fn(e3, t3) {
    if (e3 === t3) return true;
    const n3 = vn(e3), l3 = vn(t3);
    return !!n3 && n3 === l3;
  }
  function mn() {
    var e3;
    const t3 = function() {
      if (void 0 !== l2.theme) {
        const e4 = l2.theme;
        return cn(e4) ? l2.isDark ? e4.dark : e4.light : e4;
      }
      return l2.isDark ? l2.darkTheme : l2.lightTheme;
    }(), n3 = null == (e3 = et.value) ? void 0 : e3.theme, o3 = null != t3 ? t3 : n3;
    if (null != o3 && "object" == typeof o3) return o3;
    const i3 = Array.isArray(l2.themes) ? l2.themes : [];
    if (!i3.length || null == o3) return o3;
    const r3 = vn(o3), a2 = i3.map((e4) => vn(e4)).filter((e4) => !!e4);
    if (!r3 || a2.includes(r3)) return o3;
    const u2 = vn(n3);
    return null != n3 && u2 && a2.includes(u2) ? n3 : i3[0];
  }
  watch(tt, (e3, t3) => d(null, null, function* () {
    if (e3 === t3) return;
    if (nt.value = e3, !He || !v.value) return;
    if (!be2.value) return;
    if (false === l2.stream && false !== l2.loading) return;
    if (!Be.value) return;
    const n3 = je;
    if (n3) {
      try {
        yield n3;
      } catch (o3) {
      }
      if (Se || !v.value) return;
    }
    try {
      we.value = false, ot.value = false, be2.value = false, It(), Wt(), Re(), yield nextTick(), yield dn(v.value);
    } catch (i3) {
      we.value = false, ot.value = false, it.value = true;
    }
  }));
  const pn = computed(() => (void 0 !== l2.theme ? !cn(l2.theme) : fn(l2.darkTheme, l2.lightTheme)) ? function(e3) {
    var t3, n3;
    if (e3 && "object" == typeof e3 && (null == (t3 = e3.colors) ? void 0 : t3["editor.background"])) {
      const t4 = _t(e3.colors["editor.background"]);
      if (null != t4) return t4 < 128;
    }
    const o3 = (null != (n3 = vn(e3)) ? n3 : "").toLowerCase();
    return o3 ? ["dark", "night", "moon", "black", "dracula", "mocha", "frappe", "macchiato", "palenight", "ocean", "poimandres", "monokai", "laserwave", "tokyo", "slack-dark", "rose-pine", "github-dark", "material-theme", "one-dark", "catppuccin-mocha", "catppuccin-frappe", "catppuccin-macchiato"].some((e4) => o3.includes(e4)) && !["light", "latte", "dawn", "lotus"].some((e4) => o3.includes(e4)) : !!l2.isDark;
  }(mn()) : !!l2.isDark), hn = computed(() => {
    var e3;
    if (!Ge.value) return pn.value ? "dark" : "light";
    const t3 = null == (e3 = et.value) ? void 0 : e3.diffAppearance;
    return "light" === t3 || "dark" === t3 ? t3 : pn.value ? "dark" : "light";
  }), yn = computed(() => Ge.value ? "dark" === hn.value : pn.value);
  function gn() {
    return u(a(u(a({ wordWrap: "on", wrappingIndent: "same", themes: l2.themes }, et.value || {}), { theme: mn() }), Ge.value ? { diffAppearance: hn.value } : {}), { onThemeChange() {
      $t();
    } });
  }
  function bn() {
    const e3 = gn();
    if (!Ve) return Ve = e3, Ve;
    for (const t3 of Object.keys(Ve)) t3 in e3 || delete Ve[t3];
    return Object.assign(Ve, e3), Ve;
  }
  const wn = computed(() => {
    var e3, t3, n3, o3, i3, r3, u2, d2, s2, c, v2, f, m, p, h2;
    return JSON.stringify({ diffLineStyle: null != (t3 = null == (e3 = et.value) ? void 0 : e3.diffLineStyle) ? t3 : "background", diffUnchangedRegionStyle: null != (o3 = null == (n3 = et.value) ? void 0 : n3.diffUnchangedRegionStyle) ? o3 : "line-info", diffHideUnchangedRegions: void 0 === (null == (i3 = l2.monacoOptions) ? void 0 : i3.diffHideUnchangedRegions) ? a({}, Ke) : Qe(l2.monacoOptions.diffHideUnchangedRegions), renderSideBySide: null == (u2 = null == (r3 = et.value) ? void 0 : r3.renderSideBySide) || u2, useInlineViewWhenSpaceIsLimited: null == (s2 = null == (d2 = et.value) ? void 0 : d2.useInlineViewWhenSpaceIsLimited) || s2, enableSplitViewResizing: null == (v2 = null == (c = et.value) ? void 0 : c.enableSplitViewResizing) || v2, ignoreTrimWhitespace: null == (m = null == (f = et.value) ? void 0 : f.ignoreTrimWhitespace) || m, originalEditable: null != (h2 = null == (p = et.value) ? void 0 : p.originalEditable) && h2 });
  });
  return watch(() => [l2.monacoOptions, Be.value], () => {
    var e3, t3;
    if (bn(), !He || !Be.value) return;
    const n3 = Ge.value ? _e() : Te(), o3 = "number" == typeof (null == (e3 = l2.monacoOptions) ? void 0 : e3.fontSize) ? l2.monacoOptions.fontSize : Number.isFinite(st.value) ? st.value : void 0;
    "number" == typeof o3 && Number.isFinite(o3) && o3 > 0 && (null == (t3 = null == n3 ? void 0 : n3.updateOptions) || t3.call(n3, { fontSize: o3 })), Ut(false);
  }, { deep: true }), watch(() => [mn(), hn.value, ke.value, be2.value, Be.value], ([e3], t3) => {
    ke.value && be2.value && Be.value && function(e4 = {}) {
      if (e4.appearanceOnly) return;
      bn();
      const t4 = mn(), n3 = () => {
        Ge.value && Ae(), Tr(() => {
          $t(), Vt();
        });
      };
      t4 ? function(e5, t5) {
        const n4 = function(e6) {
          if (null == e6) return null;
          if ("string" == typeof e6) return e6;
          if ("object" == typeof e6 && "name" in e6) return String(e6.name);
          if ("object" == typeof e6) {
            const n5 = de.get(e6);
            if (n5) return n5;
            try {
              const t6 = JSON.stringify(e6);
              if (t6) return de.set(e6, t6), t6;
            } catch (t6) {
            }
            const l3 = "__theme_" + ++se;
            return de.set(e6, l3), l3;
          }
          return String(e6);
        }(t5);
        return n4 ? (ue = e5, le || ae !== n4 ? le ? (re === n4 || oe === n4 || (ie = t5, re = n4), le) : (ie = t5, re = n4, le = d(null, null, function* () {
          for (; re && null != ie; ) {
            const n5 = ie, l3 = re;
            if (ie = null, re = null, ae !== l3) try {
              oe = l3, yield (null != ue ? ue : e5)(n5), ae = l3;
            } catch (t6) {
            }
          }
        }).finally(() => {
          le = null, oe = null;
        }), le) : Promise.resolve()) : Promise.resolve();
      }(We, t4).then(n3).catch((e5) => {
      }) : n3();
    }({ appearanceOnly: null != t3 && fn(e3, t3[0]) });
  }, { flush: "post" }), watch(() => [wn.value, ke.value, Be.value], (e3, t3) => d(null, [e3, t3], function* ([e4, t4, n3], [o3]) {
    if (bn(), !t4 || !n3) return;
    if (!He || !v.value) return;
    if (!be2.value) return;
    if (e4 === o3) return;
    if (false === l2.stream && false !== l2.loading) return;
    const i3 = je;
    if (i3) {
      try {
        yield i3;
      } catch (r3) {
      }
      if (Se || !v.value) return;
    }
    try {
      we.value = false, ot.value = false, be2.value = false, It(), Wt(), Re(), yield nextTick(), yield dn(v.value);
    } catch (a2) {
      we.value = false, ot.value = false, it.value = true;
    }
  }), { flush: "post" }), watch(() => [l2.loading, Be.value], (e3, t3) => d(null, [e3, t3], function* ([e4, t4], n3) {
    if (!t4) return;
    if (e4) return;
    const o3 = null == n3 ? void 0 : n3[0], i3 = void 0 !== o3 && false !== o3;
    yield nextTick(), Tr(() => {
      d(null, null, function* () {
        var e5, t5, n4;
        try {
          if (i3 && be2.value) if (Ge.value && v.value) {
            const n5 = je;
            if (n5) try {
              yield n5;
            } catch (o4) {
            }
            bn();
            const i4 = Ze(String(null != (e5 = l2.node.originalCode) ? e5 : ""), String(null != (t5 = l2.node.updatedCode) ? t5 : ""));
            if (yield Fe(i4.original, i4.updated, Q2.value), Se || !Ge.value) return;
            Ae(), qt(), Ht();
          } else Ne(String(null != (n4 = l2.node.code) ? n4 : ""), Q2.value);
          Ut(false);
        } catch (r3) {
        }
      });
    });
  }), { immediate: true, flush: "post" }), onUnmounted(() => {
    It(), Wt(), $e();
  }), (t3, n3) => lt.value ? (openBlock(), createBlock(unref(Zt), { key: 0, node: l2.node, loading: l2.loading }, null, 8, ["node", "loading"])) : (openBlock(), createElementBlock("div", { key: 1, ref_key: "container", ref: h, style: normalizeStyle(tn.value), class: normalizeClass(["code-block-container rounded-lg border", [{ dark: l2.isDark, "is-rendering": l2.loading, "is-dark": yn.value, "is-diff": Ge.value, "is-plain-text": Z2.value }]]), "data-markstream-code-block": "1", "data-markstream-enhanced": ot.value && !lt.value ? "true" : "false" }, [createVNode(Qr, { "show-header": l2.showHeader, "show-collapse-button": l2.showCollapseButton, "show-font-size-buttons": l2.showFontSizeButtons, "enable-font-size-control": l2.enableFontSizeControl, "show-copy-button": l2.showCopyButton, "show-expand-button": l2.showExpandButton, "show-preview-button": l2.showPreviewButton, "show-tooltips": l2.showTooltips, "is-dark": l2.isDark, loading: l2.loading, stream: e2.stream, "is-collapsed": te2.value, "is-expanded": ee2.value, "copy-text": b.value, "is-previewable": Xt.value, "code-font-size": st.value, "code-font-min": 10, "code-font-max": 36, "default-code-font-size": dt.value, "font-baseline-ready": ct.value, "diff-stats": Ge.value ? Je.value : null, "diff-stats-aria-label": Xe.value, onToggleCollapse: rn, onDecreaseFont: Ft, onResetFont: Dt, onIncreaseFont: Nt, onCopy: ln, onToggleExpand: on, onPreview: an }, createSlots({ "header-left": withCtx(() => [renderSlot(t3.$slots, "header-left", {}, () => [createBaseVNode("div", ve, [createBaseVNode("span", { class: "icon-slot h-4 w-4 flex-shrink-0", innerHTML: en.value }, null, 8, fe), createBaseVNode("div", me, [createBaseVNode("div", pe, toDisplayString(Qt.value), 1), Zt2.value ? (openBlock(), createElementBlock("div", he, toDisplayString(Zt2.value), 1)) : createCommentVNode("", true)])])], true)]), loading: withCtx(() => [renderSlot(t3.$slots, "loading", { loading: e2.loading, stream: e2.stream }, () => [n3[0] || (n3[0] = createBaseVNode("div", { class: "loading-skeleton" }, [createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line short" })], -1))], true)]), default: withCtx(() => [withDirectives(createBaseVNode("div", ye, [createBaseVNode("div", { ref_key: "codeEditor", ref: v, class: normalizeClass(["code-editor-container", [e2.stream ? "" : "code-height-placeholder", { "is-hidden": at.value }]]), style: normalizeStyle(wt.value) }, null, 6), at.value ? (openBlock(), createBlock(unref(Zt), { key: 0, class: normalizeClass(["code-pre-fallback", { "is-wrap": rt.value }]), style: normalizeStyle(gt.value), node: l2.node }, null, 8, ["class", "style", "node"])) : createCommentVNode("", true)], 512), [[vShow, !(te2.value || !e2.stream && e2.loading)]]), ut.value && !r2.value && Xt.value && "html" === _.value ? (openBlock(), createBlock(ne, { key: 0, code: l2.node.code, "html-preview-allow-scripts": l2.htmlPreviewAllowScripts, "html-preview-sandbox": l2.htmlPreviewSandbox, "is-dark": l2.isDark, "on-close": () => ut.value = false }, null, 8, ["code", "html-preview-allow-scripts", "html-preview-sandbox", "is-dark", "on-close"])) : createCommentVNode("", true)]), _: 2 }, [t3.$slots["header-right"] ? { name: "header-right", fn: withCtx(() => [renderSlot(t3.$slots, "header-right", {}, void 0, true)]), key: "0" } : void 0]), 1032, ["show-header", "show-collapse-button", "show-font-size-buttons", "enable-font-size-control", "show-copy-button", "show-expand-button", "show-preview-button", "show-tooltips", "is-dark", "loading", "stream", "is-collapsed", "is-expanded", "copy-text", "is-previewable", "code-font-size", "default-code-font-size", "font-baseline-ready", "diff-stats", "diff-stats-aria-label"])], 14, ce));
} }), [["__scopeId", "data-v-b7ce948c"]]);

export {
  be
};
//# sourceMappingURL=chunk-OXCUENKG.js.map
