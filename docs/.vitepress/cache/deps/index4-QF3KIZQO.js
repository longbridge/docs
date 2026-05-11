import {
  $n,
  Dl,
  Ee,
  Ei,
  Fa,
  Fl,
  Ii,
  Ln,
  On,
  Pa,
  Ti,
  Tr,
  Ul,
  jl,
  jt
} from "./chunk-VF4QCHVU.js";
import {
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  defineComponent,
  mergeProps,
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
  toHandlers,
  unref,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-URVHZSMY.js";
import "./chunk-7N2WBUNW.js";

// node_modules/markstream-vue/dist/index4.js
var e = Object.defineProperty;
var t = Object.defineProperties;
var n = Object.getOwnPropertyDescriptors;
var l = Object.getOwnPropertySymbols;
var o = Object.prototype.hasOwnProperty;
var r = Object.prototype.propertyIsEnumerable;
var a = (t2, n2, l2) => n2 in t2 ? e(t2, n2, { enumerable: true, configurable: true, writable: true, value: l2 }) : t2[n2] = l2;
var i = (e2, t2) => {
  for (var n2 in t2 || (t2 = {})) o.call(t2, n2) && a(e2, n2, t2[n2]);
  if (l) for (var n2 of l(t2)) r.call(t2, n2) && a(e2, n2, t2[n2]);
  return e2;
};
var u = (e2, t2, n2) => new Promise((l2, o2) => {
  var r2 = (e3) => {
    try {
      i2(n2.next(e3));
    } catch (t3) {
      o2(t3);
    }
  }, a2 = (e3) => {
    try {
      i2(n2.throw(e3));
    } catch (t3) {
      o2(t3);
    }
  }, i2 = (e3) => e3.done ? l2(e3.value) : Promise.resolve(e3.value).then(r2, a2);
  i2((n2 = n2.apply(e2, t2)).next());
});
var K = ["data-markstream-mode"];
var J = { key: 0, class: "mermaid-block-header flex items-center justify-between border-b px-[var(--ms-inset-panel-x)] py-[var(--ms-inset-panel-y)]" };
var Q = { key: 0 };
var ee = { key: 1, class: "flex items-center gap-x-2 overflow-hidden" };
var te = ["innerHTML"];
var ne = { key: 2 };
var le = { key: 3, class: "mermaid-mode-toggle-group flex items-center gap-0.5" };
var oe = { class: "flex items-center gap-x-1" };
var re = { class: "flex items-center gap-x-1" };
var ae = { key: 4 };
var ie = { key: 5, class: "mermaid-header-actions flex items-center" };
var ue = ["aria-pressed"];
var se = { key: 0, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var ce = { key: 1, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var de = ["aria-label", "disabled"];
var ve = ["aria-label", "disabled"];
var me = { key: 0, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var fe = { key: 1, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var he = { key: 0, class: "mermaid-source-panel" };
var pe = { class: "mermaid-source-code text-sm font-mono whitespace-pre-wrap" };
var ge = { key: 1, class: "relative" };
var we = { key: 0, class: "absolute top-2 right-2 z-10 rounded-lg" };
var ye = { class: "flex items-center gap-2 backdrop-blur rounded-lg" };
var xe = { class: "dialog-panel mermaid-modal-panel relative w-full h-full max-w-full max-h-full rounded overflow-hidden" };
var ke = { class: "absolute top-6 right-6 z-50 flex items-center gap-2" };
var be = "mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded";
var Me = Ee(defineComponent({ __name: "MermaidBlockNode", props: { node: {}, maxHeight: { default: void 0 }, estimatedPreviewHeightPx: {}, loading: { type: Boolean, default: true }, isDark: { type: Boolean }, workerTimeoutMs: { default: 1400 }, parseTimeoutMs: { default: 1800 }, renderTimeoutMs: { default: 2500 }, fullRenderTimeoutMs: { default: 4e3 }, renderDebounceMs: { default: 300 }, contentStableDelayMs: { default: 500 }, previewPollDelayMs: { default: 800 }, previewPollMaxDelayMs: { default: 4e3 }, previewPollMaxAttempts: { default: 12 }, showHeader: { type: Boolean, default: true }, showModeToggle: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showExportButton: { type: Boolean, default: true }, showFullscreenButton: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true }, showZoomControls: { type: Boolean, default: true }, enableWheelZoom: { type: Boolean, default: false }, isStrict: { type: Boolean, default: true }, showTooltips: { type: Boolean, default: true }, onRenderError: {} }, emits: ["copy", "export", "openModal", "toggleMode"], setup(e2, { emit: l2 }) {
  var o2, r2;
  const a2 = e2, s = l2, U = { USE_PROFILES: { svg: true }, FORBID_TAGS: ["script"], FORBID_ATTR: [/^on/i], ADD_TAGS: ["style"], ADD_ATTR: ["style"], SAFE_FOR_TEMPLATES: true }, Me2 = "undefined" != typeof window && Pa(), Te = ref(Me2), Ce = computed(() => a2.isStrict ? "strict" : "loose"), Be = computed(() => ({ startOnLoad: false, securityLevel: Ce.value, dompurifyConfig: "strict" === Ce.value ? U : void 0, flowchart: "strict" === Ce.value ? { htmlLabels: false } : void 0 })), Pe = [/javascript:/i, /expression\s*\(/i, /url\s*\(\s*javascript:/i, /@import/i], De = /^(?:https?:|mailto:|tel:|#|\/|data:image\/(?:png|gif|jpe?g|webp);)/i, Se = /* @__PURE__ */ new Set(["circle", "ellipse", "foreignobject", "image", "line", "path", "polygon", "polyline", "rect", "text", "tspan", "use"]);
  function Ee2(e3) {
    if (!e3) return "";
    const t2 = e3.trim();
    return De.test(t2) ? t2 : "";
  }
  function Oe(e3, t2) {
    const n2 = Array.from(e3.childNodes), l3 = document.createElement("div");
    l3.dataset.mermaidSvgLayer = "1", l3.style.zIndex = "1", l3.appendChild(t2), e3.insertBefore(l3, e3.firstChild), n2.length > 0 && function(e4) {
      const t3 = () => {
        var t4;
        for (const n3 of e4) null == (t4 = n3.parentNode) || t4.removeChild(n3);
      };
      "function" == typeof requestAnimationFrame ? requestAnimationFrame(() => {
        requestAnimationFrame(t3);
      }) : setTimeout(t3, 32);
    }(n2);
  }
  function Fe(e3) {
    if (e3) try {
      e3.replaceChildren();
    } catch (t2) {
      e3.innerHTML = "";
    }
  }
  function je(e3, t2) {
    if (!e3) return "";
    if (Ae(t2)) return "";
    if ("strict" === Ce.value) return function(e4, t3) {
      if (!e4) return "";
      const n3 = function(e5) {
        if ("undefined" == typeof window || "undefined" == typeof DOMParser) return null;
        if (!e5) return null;
        const t4 = e5.replace(/["']\s*javascript:/gi, "#").replace(/\bjavascript:/gi, "#").replace(/["']\s*vbscript:/gi, "#").replace(/\bvbscript:/gi, "#").replace(/\bdata:text\/html/gi, "#"), n4 = new DOMParser().parseFromString(t4, "image/svg+xml").documentElement;
        if (!n4 || "svg" !== n4.nodeName.toLowerCase()) return null;
        const l3 = n4;
        return function(e6) {
          const t5 = /* @__PURE__ */ new Set(["script"]), n5 = [e6, ...Array.from(e6.querySelectorAll("*"))];
          for (const l4 of n5) {
            if (t5.has(l4.tagName.toLowerCase())) {
              l4.remove();
              continue;
            }
            const e7 = Array.from(l4.attributes);
            for (const t6 of e7) {
              const e8 = t6.name;
              if (/^on/i.test(e8)) l4.removeAttribute(e8);
              else {
                if ("style" === e8 && t6.value) {
                  const n6 = t6.value;
                  if (Pe.some((e9) => e9.test(n6))) {
                    l4.removeAttribute(e8);
                    continue;
                  }
                }
                if (("href" === e8 || "xlink:href" === e8) && t6.value) {
                  const n6 = Ee2(t6.value);
                  if (!n6) {
                    l4.removeAttribute(e8);
                    continue;
                  }
                  n6 !== t6.value && l4.setAttribute(e8, n6);
                }
              }
            }
          }
        }(l3), l3;
      }(t3);
      return n3 ? (Oe(e4, n3), n3.outerHTML) : "";
    }(e3, t2);
    const n2 = function(e4) {
      const t3 = document.createElement("template");
      try {
        t3.innerHTML = e4;
      } catch (l3) {
        return null;
      }
      const n3 = t3.content.firstElementChild;
      return "svg" === (null == n3 ? void 0 : n3.nodeName.toLowerCase()) ? n3 : null;
    }(t2);
    return n2 ? (Oe(e3, n2), n2.outerHTML) : "";
  }
  function Ae(e3) {
    if (!e3 || "undefined" == typeof DOMParser) return !e3;
    const t2 = new DOMParser().parseFromString(e3, "image/svg+xml").documentElement;
    if (!t2 || "svg" !== t2.nodeName.toLowerCase()) return true;
    const n2 = t2.getAttribute("viewBox");
    if (n2) {
      const e4 = n2.trim().split(/[\s,]+/);
      if (4 === e4.length) {
        const t3 = Number.parseFloat(e4[2] || ""), n3 = Number.parseFloat(e4[3] || "");
        if (!Number.isFinite(t3) || !Number.isFinite(n3) || t3 <= 0 || n3 <= 0) return true;
      }
    }
    const l3 = [t2, ...Array.from(t2.querySelectorAll("*"))];
    let o3 = false;
    for (const r3 of l3) {
      Se.has(r3.nodeName.toLowerCase()) && (o3 = true);
      for (const e4 of Array.from(r3.attributes)) {
        if (/\bNaN\b/i.test(e4.value)) return true;
        if ("style" === e4.name && /max-width:\s*0(?:px)?/i.test(e4.value)) return true;
      }
    }
    return !o3;
  }
  const { t: Le } = $n();
  function ze() {
    return u(this, null, function* () {
      try {
        const e3 = yield Fa();
        return Te.value = !!e3, e3;
      } catch (e3) {
        throw Te.value = false, e3;
      }
    });
  }
  const $e = ref(false), Ne = ref(false), He = ref(), Re = ref(), _e = ref(), Xe = ref(null), Ye = jt(), qe = ref(null), Ve = ref("undefined" == typeof window), Ze = ref(), Ie = computed(() => a2.node.code.replace(/\]::([^:])/g, "]:::$1").replace(/:::subgraphNode$/gm, "::subgraphNode"));
  function We() {
    var e3;
    return function(e4) {
      const t2 = function() {
        var e5;
        const t3 = He.value ? getComputedStyle(He.value).getPropertyValue("--ms-size-diagram-min-height").trim() : "";
        return null != (e5 = jl(t3)) ? e5 : 360;
      }(), n2 = un();
      return Ul(e4, t2, n2);
    }(null != (e3 = jl(a2.estimatedPreviewHeightPx)) ? e3 : Dl(Ie.value));
  }
  function Ge() {
    return `${We()}px`;
  }
  const Ue = ref(null);
  function Ke() {
    var e3;
    return !!(null == (e3 = Re.value) ? void 0 : e3.querySelector("svg"));
  }
  function Je() {
    return false !== a2.loading && (Ke() || !!Ue.value);
  }
  const Qe = ref(1), et = ref(0), tt = ref(0), nt = ref(false), lt = ref({ x: 0, y: 0 }), ot = ref(!Me2), rt = ref(false), at = ref(false), it = ref(null), ut = ref(0), st = ref(false), ct = computed(() => {
    var e3;
    return Math.max(0, null != (e3 = a2.renderDebounceMs) ? e3 : 300);
  }), dt = computed(() => {
    var e3;
    return Math.max(0, null != (e3 = a2.contentStableDelayMs) ? e3 : 500);
  }), vt = computed(() => {
    var e3;
    return Math.max(120, null != (e3 = a2.previewPollDelayMs) ? e3 : 800);
  }), mt = computed(() => {
    var e3;
    return Math.max(vt.value, null != (e3 = a2.previewPollMaxDelayMs) ? e3 : 4e3);
  }), ft = computed(() => {
    var e3;
    return Math.max(1, Math.trunc(null != (e3 = a2.previewPollMaxAttempts) ? e3 : 12));
  }), ht = computed(() => false !== a2.loading);
  let pt = null, gt = null, wt = null, yt = 0;
  const xt = null != (o2 = globalThis.requestIdleCallback) ? o2 : (e3, t2) => setTimeout(() => e3({ didTimeout: true }), 16);
  function kt() {
    return Ve.value && !Ne.value;
  }
  function bt() {
    null != wt && (globalThis.clearTimeout(wt), wt = null);
  }
  function Mt() {
    bt(), wt = globalThis.setTimeout(() => {
      wt = null, kt() && xt(() => {
        kt() && Sn();
      }, { timeout: 500 });
    }, ct.value);
  }
  function Tt() {
    null != gt && (globalThis.clearTimeout(gt), gt = null);
  }
  function Ct(e3 = 600) {
    if ("undefined" == typeof globalThis) return;
    const t2 = Math.max(0, e3);
    Tt(), gt = globalThis.setTimeout(() => {
      gt = null, a2.loading || at.value || !kt() ? Ct(Math.min(1200, Math.max(300, 1.2 * t2))) : Mt();
    }, t2);
  }
  const Bt = ref(Ge());
  let Pt = null;
  const Dt = ref(false), St = ref(false), Et = ref({}), Ot = ref(""), Ft = ref(0);
  let jt2 = null;
  const At = ref(false), Lt = ref({ zoom: 1, translateX: 0, translateY: 0, containerHeight: Bt.value }), zt = computed(() => a2.enableWheelZoom ? { wheel: xn } : {}), $t = computed(() => {
    var e3, t2, n2, l3;
    return { worker: null != (e3 = a2.workerTimeoutMs) ? e3 : 1400, parse: null != (t2 = a2.parseTimeoutMs) ? t2 : 1800, render: null != (n2 = a2.renderTimeoutMs) ? n2 : 2500, fullRender: null != (l3 = a2.fullRenderTimeoutMs) ? l3 : 4e3 };
  }), Nt = null != (r2 = globalThis.cancelIdleCallback) ? r2 : (e3) => clearTimeout(e3);
  let Ht = null, Rt = null, _t = false, Xt = vt.value, Yt = null, qt = 0, Vt = true, Zt = 0;
  function It(e3, t2) {
    const n2 = null == t2 ? void 0 : t2.timeoutMs, l3 = null == t2 ? void 0 : t2.signal;
    if (null == l3 ? void 0 : l3.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
    let o3 = null, r3 = false, a3 = null;
    return new Promise((t3, i2) => {
      const u2 = () => {
        null != o3 && clearTimeout(o3), a3 && l3 && l3.removeEventListener("abort", a3);
      };
      n2 && n2 > 0 && (o3 = globalThis.setTimeout(() => {
        r3 || (r3 = true, u2(), i2(new Error("Operation timed out")));
      }, n2)), l3 && (a3 = () => {
        r3 || (r3 = true, u2(), i2(new DOMException("Aborted", "AbortError")));
      }, l3.addEventListener("abort", a3)), e3().then((e4) => {
        r3 || (r3 = true, u2(), t3(e4));
      }).catch((e4) => {
        r3 || (r3 = true, u2(), i2(e4));
      });
    });
  }
  function Wt(e3) {
    if ("undefined" == typeof document) return;
    if (!Re.value) return;
    if ("function" == typeof a2.onRenderError && true === a2.onRenderError(e3, Ie.value, Re.value)) return At.value = true, void En();
    const t2 = document.createElement("div");
    t2.style.padding = "var(--ms-inset-panel-body)", t2.style.color = "hsl(var(--ms-destructive))", t2.textContent = "Failed to render diagram: ";
    const n2 = document.createElement("span");
    n2.textContent = e3 instanceof Error ? e3.message : "Unknown error", t2.appendChild(n2), Fe(Re.value), Re.value.appendChild(t2);
    const l3 = Re.value ? getComputedStyle(Re.value).getPropertyValue("--ms-size-diagram-min-height").trim() : "";
    Bt.value = l3 || "360px", At.value = true, En();
  }
  "undefined" != typeof window && watch(() => He.value, (e3) => {
    var t2;
    if (null == (t2 = qe.value) || t2.destroy(), qe.value = null, !e3) return void (Ve.value = false);
    const n2 = Ye(e3, { rootMargin: "400px" });
    qe.value = n2, Ve.value = n2.isVisible.value, n2.whenVisible.then(() => {
      Ve.value = true;
    });
  }, { immediate: true }), onBeforeUnmount(() => {
    var e3;
    null == (e3 = qe.value) || e3.destroy(), qe.value = null, bt();
  });
  const Gt = computed(() => false !== a2.showTooltips);
  function Ut(e3) {
    return !e3 || e3.disabled;
  }
  function Kt(e3, t2, n2 = "top") {
    if (!Gt.value) return;
    if (Ut(e3.currentTarget)) return;
    const l3 = e3, o3 = null != (null == l3 ? void 0 : l3.clientX) && null != (null == l3 ? void 0 : l3.clientY) ? { x: l3.clientX, y: l3.clientY } : void 0;
    Ln(e3.currentTarget, t2, n2, false, o3, a2.isDark);
  }
  function Jt() {
    Gt.value && On();
  }
  function Qt(e3) {
    if (!Gt.value) return;
    if (Ut(e3.currentTarget)) return;
    const t2 = $e.value ? Le("common.copied") || "Copied" : Le("common.copy") || "Copy", n2 = e3, l3 = null != (null == n2 ? void 0 : n2.clientX) && null != (null == n2 ? void 0 : n2.clientY) ? { x: n2.clientX, y: n2.clientY } : void 0;
    Ln(e3.currentTarget, t2, "top", false, l3, a2.isDark);
  }
  function en(e3, t2) {
    const n2 = `%%{init: {"theme": "${"dark" === t2 ? "dark" : "default"}"}}%%
`;
    return e3.trimStart().startsWith("%%{") ? e3 : n2 + e3;
  }
  function tn() {
    return Vt && !ot.value && !Dt.value && !At.value;
  }
  function nn(e3) {
    const t2 = e3.trim();
    return !(!t2 || t2.startsWith("%%")) && !/^(?:gantt|title|dateformat|axisformat|tickinterval|excludes|section|todaymarker|topaxis|weekday|weekend|acctitle|accdescr|accdescrmultiline)\b/i.test(t2) && t2.includes(":");
  }
  function ln(e3) {
    if ("gantt" === Fl(e3)) return function(e4) {
      var t3;
      const n2 = e4.split(/\r?\n/);
      for (!/\r?\n$/.test(e4) && n2.length > 0 && n2.pop(); n2.length > 0; ) {
        const e5 = null == (t3 = n2[n2.length - 1]) ? void 0 : t3.trim();
        if (e5 && !e5.startsWith("%%")) {
          if (nn(e5)) break;
          n2.pop();
        } else n2.pop();
      }
      return n2.some(nn) ? n2.join("\n") : "";
    }(e3);
    const t2 = e3.split(/\r?\n/);
    for (; t2.length > 0; ) {
      const e4 = t2[t2.length - 1].trimEnd();
      if ("" !== e4) {
        if (!(/^[-=~>|<\s]+$/.test(e4.trim()) || /(?:--|==|~~|->|<-|-\||-\)|-x|o-|\|-|\.-)\s*$/.test(e4) || /[-|><]$/.test(e4) || /(?:graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt)\s*$/i.test(e4))) break;
        t2.pop();
      } else t2.pop();
    }
    return t2.join("\n");
  }
  function on(e3, t2, n2) {
    return u(this, null, function* () {
      var l3;
      try {
        return yield Ei(e3, t2, null != (l3 = null == n2 ? void 0 : n2.timeoutMs) ? l3 : $t.value.worker);
      } catch (o3) {
        return yield function(e4, t3, n3) {
          return u(this, null, function* () {
            var l4, o4;
            const r3 = yield ze();
            if (!r3) return;
            const a3 = r3, i2 = en(e4, t3);
            if ("function" == typeof a3.parse) return yield It(() => a3.parse(i2), { timeoutMs: null != (l4 = null == n3 ? void 0 : n3.timeoutMs) ? l4 : $t.value.parse, signal: null == n3 ? void 0 : n3.signal }), true;
            const u2 = `mermaid-parse-${Math.random().toString(36).slice(2, 9)}`;
            return yield It(() => r3.render(u2, i2), { timeoutMs: null != (o4 = null == n3 ? void 0 : n3.timeoutMs) ? o4 : $t.value.render, signal: null == n3 ? void 0 : n3.signal }), true;
          });
        }(e3, t2, n2);
      }
    });
  }
  function rn(e3, t2, n2) {
    return u(this, null, function* () {
      var l3;
      if ("gantt" === Fl(e3)) {
        const l4 = ln(e3);
        if (!l4.trim()) return { fullOk: false, prefixOk: false };
        try {
          if (yield on(l4, t2, n2)) return l4 === e3 ? { fullOk: true, prefixOk: false } : { fullOk: false, prefixOk: true, prefix: l4 };
        } catch (r3) {
          if ("AbortError" === (null == r3 ? void 0 : r3.name)) throw r3;
        }
        return { fullOk: false, prefixOk: false };
      }
      try {
        if (yield on(e3, t2, n2)) return { fullOk: true, prefixOk: false };
      } catch (r3) {
        if ("AbortError" === (null == r3 ? void 0 : r3.name)) throw r3;
      }
      let o3 = ln(e3);
      if (o3 && o3.trim() && o3 !== e3) try {
        try {
          const r3 = yield Ti(e3, t2, null != (l3 = null == n2 ? void 0 : n2.timeoutMs) ? l3 : $t.value.worker);
          r3 && r3.trim() && (o3 = r3);
        } catch (r3) {
        }
        if (yield on(o3, t2, n2)) return { fullOk: false, prefixOk: true, prefix: o3 };
      } catch (r3) {
        if ("AbortError" === (null == r3 ? void 0 : r3.name)) throw r3;
      }
      return { fullOk: false, prefixOk: false };
    });
  }
  const an = computed(() => ot.value || at.value || Ne.value);
  function un() {
    if ("none" === a2.maxHeight) return null;
    if (null != a2.maxHeight) {
      const e4 = Number.parseFloat(String(a2.maxHeight));
      if (Number.isFinite(e4)) return e4;
    }
    const e3 = He.value;
    if (e3) {
      const t2 = getComputedStyle(e3).getPropertyValue("--ms-size-code-max-height").trim(), n2 = Number.parseFloat(t2);
      if (Number.isFinite(n2)) return n2;
    }
    return 500;
  }
  function sn(e3, t2) {
    if (!He.value || !Re.value) return;
    if (!(null == t2 ? void 0 : t2.force) && false !== a2.loading && Ke()) return;
    const n2 = Re.value.querySelector("svg");
    if (!n2) return;
    let l3 = 0, o3 = 0;
    const r3 = n2.getAttribute("viewBox"), i2 = n2.getAttribute("width"), u2 = n2.getAttribute("height");
    if (r3) {
      const e4 = r3.split(" ");
      4 === e4.length && (l3 = Number.parseFloat(e4[2]), o3 = Number.parseFloat(e4[3]));
    }
    if (l3 && o3 || i2 && u2 && (l3 = Number.parseFloat(i2), o3 = Number.parseFloat(u2)), Number.isNaN(l3) || Number.isNaN(o3) || l3 <= 0 || o3 <= 0) try {
      const e4 = n2.getBBox();
      e4 && e4.width > 0 && e4.height > 0 && (l3 = e4.width, o3 = e4.height);
    } catch (s2) {
      return void console.error("Failed to get SVG BBox:", s2);
    }
    if (l3 > 0 && o3 > 0) {
      const t3 = o3 / l3, n3 = null != e3 ? e3 : He.value.clientWidth, r4 = un(), a3 = n3 * t3, i3 = null == r4 ? a3 : Math.min(a3, r4);
      Bt.value = `${Math.max(i3, We())}px`;
    }
  }
  const cn = ref(false), dn = computed(() => ({ transform: `translate(${et.value}px, ${tt.value}px) scale(${Qe.value})` }));
  function vn(e3) {
    "Escape" === e3.key && cn.value && mn();
  }
  function mn() {
    if (cn.value = false, _e.value && Fe(_e.value), Xe.value = null, "undefined" != typeof document) try {
      document.body.style.overflow = "";
    } catch (e3) {
    }
    if ("undefined" != typeof window) try {
      window.removeEventListener("keydown", vn);
    } catch (e3) {
    }
  }
  function fn() {
    Qe.value < 3 && (Qe.value += 0.1);
  }
  function hn() {
    Qe.value > 0.5 && (Qe.value -= 0.1);
  }
  function pn() {
    Qe.value = 1, et.value = 0, tt.value = 0;
  }
  function gn(e3) {
    nt.value = true, e3 instanceof MouseEvent ? lt.value = { x: e3.clientX - et.value, y: e3.clientY - tt.value } : lt.value = { x: e3.touches[0].clientX - et.value, y: e3.touches[0].clientY - tt.value };
  }
  function wn(e3) {
    if (!nt.value) return;
    let t2, n2;
    e3 instanceof MouseEvent ? (t2 = e3.clientX, n2 = e3.clientY) : (t2 = e3.touches[0].clientX, n2 = e3.touches[0].clientY), et.value = t2 - lt.value.x, tt.value = n2 - lt.value.y;
  }
  function yn() {
    nt.value = false;
  }
  function xn(e3) {
    if (a2.enableWheelZoom && (e3.ctrlKey || e3.metaKey)) {
      if (e3.preventDefault(), !He.value) return;
      const t2 = He.value.getBoundingClientRect(), n2 = e3.clientX - t2.left, l3 = e3.clientY - t2.top, o3 = n2 - t2.width / 2, r3 = l3 - t2.height / 2, a3 = (o3 - et.value) / Qe.value, i2 = (r3 - tt.value) / Qe.value, u2 = 0.01, s2 = -e3.deltaY * u2, c = Math.min(Math.max(Qe.value + s2, 0.5), 3);
      c !== Qe.value && (et.value = o3 - a3 * c, tt.value = r3 - i2 * c, Qe.value = c);
    }
  }
  function kn() {
    return u(this, null, function* () {
      try {
        const e3 = Ie.value, t2 = { payload: { type: "copy", text: e3 }, defaultPrevented: false, preventDefault() {
          this.defaultPrevented = true;
        } };
        if (s("copy", t2), t2.defaultPrevented) return;
        "undefined" != typeof navigator && navigator.clipboard && "function" == typeof navigator.clipboard.writeText && (yield navigator.clipboard.writeText(e3)), $e.value = true, setTimeout(() => {
          $e.value = false;
        }, 1e3);
      } catch (e3) {
        console.error("Failed to copy:", e3);
      }
    });
  }
  function bn() {
    var e3;
    const t2 = null == (e3 = Re.value) ? void 0 : e3.querySelector("svg");
    if (!t2) return void console.error("SVG element not found");
    const n2 = new XMLSerializer().serializeToString(t2), l3 = { payload: { type: "export" }, defaultPrevented: false, preventDefault() {
      this.defaultPrevented = true;
    }, svgElement: t2, svgString: n2 };
    s("export", l3), l3.defaultPrevented || function(e4, t3 = null) {
      u(this, null, function* () {
        try {
          const l4 = null != t3 ? t3 : new XMLSerializer().serializeToString(e4), o3 = new Blob([l4], { type: "image/svg+xml;charset=utf-8" }), r3 = URL.createObjectURL(o3);
          if ("undefined" != typeof document) {
            const e5 = document.createElement("a");
            e5.href = r3, e5.download = `mermaid-diagram-${Date.now()}.svg`;
            try {
              document.body.appendChild(e5), e5.click(), document.body.removeChild(e5);
            } catch (n3) {
            }
            URL.revokeObjectURL(r3);
          }
        } catch (l4) {
          console.error("Failed to export SVG:", l4);
        }
      });
    }(t2, n2);
  }
  function Mn() {
    var e3, t2;
    const n2 = null != (t2 = null == (e3 = Re.value) ? void 0 : e3.querySelector("svg")) ? t2 : null, l3 = n2 ? new XMLSerializer().serializeToString(n2) : null, o3 = { payload: { type: "open-modal" }, defaultPrevented: false, preventDefault() {
      this.defaultPrevented = true;
    }, svgElement: n2, svgString: l3 };
    s("openModal", o3), o3.defaultPrevented || function() {
      if (cn.value = true, "undefined" != typeof document) try {
        document.body.style.overflow = "hidden";
      } catch (e4) {
      }
      if ("undefined" != typeof window) try {
        window.addEventListener("keydown", vn);
      } catch (e4) {
      }
      nextTick(() => {
        if (He.value && _e.value) {
          const e4 = He.value.cloneNode(true);
          e4.classList.add("fullscreen"), e4.style.height = "100%", e4.style.maxHeight = "100%";
          const t3 = e4.querySelector("[data-mermaid-wrapper]");
          t3 && (Xe.value = t3, t3.style.transform = dn.value.transform), Fe(_e.value), _e.value.appendChild(e4);
        }
      });
    }();
  }
  function Tn(e3) {
    const t2 = { payload: { type: "toggle-mode", target: e3 }, defaultPrevented: false, preventDefault() {
      this.defaultPrevented = true;
    } };
    s("toggleMode", e3, t2), t2.defaultPrevented || Cn(e3);
  }
  function Cn(e3) {
    return u(this, null, function* () {
      const t2 = Ze.value;
      if (!t2) return rt.value = true, void (ot.value = "source" === e3);
      const n2 = t2.getBoundingClientRect().height;
      t2.style.height = `${n2}px`, t2.style.overflow = "hidden", rt.value = true, ot.value = "source" === e3, yield nextTick();
      const l3 = t2.scrollHeight;
      t2.style.transition = "height var(--ms-duration-standard) var(--ms-ease-standard)", t2.offsetHeight, t2.style.height = `${l3}px`;
      const o3 = () => {
        t2.style.transition = "", t2.style.height = "", t2.style.overflow = "", t2.removeEventListener("transitionend", r3);
      };
      function r3() {
        o3();
      }
      t2.addEventListener("transitionend", r3), setTimeout(() => o3(), 220);
    });
  }
  function Bn() {
    return u(this, null, function* () {
      return at.value ? it.value : Re.value || (yield nextTick(), Re.value) ? (at.value = true, it.value = u(null, null, function* () {
        var e3, l3, o3;
        try {
          const r3 = yield ze();
          if (!r3) return;
          const u2 = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
          Dt.value || St.value || null == (e3 = r3.initialize) || e3.call(r3, (l3 = i({}, Be.value), o3 = { dompurifyConfig: i({}, U) }, t(l3, n(o3))));
          const s2 = function(e4, t2 = Ie.value) {
            const n2 = t2, l4 = `%%{init: {"theme": "${"dark" === e4 ? "dark" : "default"}"}}%%
`;
            return n2.trim().startsWith("%%{") ? n2 : l4 + n2;
          }(a2.isDark ? "dark" : "light"), c = yield It(() => r3.render(u2, s2), { timeoutMs: $t.value.fullRender }), d = null == c ? void 0 : c.svg;
          if (Ae(d)) throw new Error("Mermaid produced invalid SVG during preview");
          if (Re.value) {
            const e4 = je(Re.value, d);
            Dt.value || St.value || (Tr(() => sn()), Dt.value = true, Lt.value = { zoom: Qe.value, translateX: et.value, translateY: tt.value, containerHeight: Bt.value });
            const t2 = a2.isDark ? "dark" : "light";
            e4 && (Et.value[t2] = e4), St.value && (St.value = false), At.value = false, yt = 0, Tt();
          }
          return true;
        } catch (r3) {
          const e4 = function(e5) {
            const t3 = "string" == typeof e5 ? e5 : "string" == typeof (null == e5 ? void 0 : e5.message) ? e5.message : "";
            return "string" == typeof t3 && /timed out/i.test(t3);
          }(r3), t2 = yt + 1;
          return e4 && t2 <= 3 ? (yt = t2, Ct(Math.min(1200, 600 * t2))) : (yt = 0, Tt(), false === a2.loading && console.error("Failed to render mermaid diagram:", r3), false === a2.loading && Wt(r3)), false;
        } finally {
          at.value = false, it.value = null;
        }
      }), it.value) : void console.warn("Mermaid container not ready");
    });
  }
  function Pn() {
    return u(this, null, function* () {
      var e3, t2, n2;
      const l3 = Ie.value;
      if (!l3.trim()) {
        if (Je()) return;
        return Re.value && Fe(Re.value), Ue.value = null, Ot.value = "", void (At.value = false);
      }
      if (!Te.value || !kt()) return;
      const o3 = l3.replace(/\s+/g, "");
      Dt.value && o3 === Ot.value && (null == (e3 = Re.value) ? void 0 : e3.querySelector("svg")) || (yield Bn()) && (Ot.value = o3, Ue.value = null != (n2 = null == (t2 = Re.value) ? void 0 : t2.innerHTML) ? n2 : null, At.value = false);
    });
  }
  function Dn(e3) {
    return u(this, null, function* () {
      if (tn() && (Re.value || (yield nextTick(), Re.value)) && !at.value) {
        at.value = true;
        try {
          const t2 = yield ze();
          if (!t2) return;
          const n2 = `mermaid-partial-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, l3 = a2.isDark ? "dark" : "light", o3 = ln(e3), r3 = en(o3 && o3.trim() ? o3 : e3, l3), i2 = yield It(() => t2.render(n2, r3), { timeoutMs: $t.value.render }), u2 = null == i2 ? void 0 : i2.svg;
          Re.value && u2 && !Ae(u2) && (je(Re.value, u2), Tr(() => sn()));
        } catch (t2) {
        } finally {
          at.value = false;
        }
      }
    });
  }
  function Sn() {
    return u(this, null, function* () {
      var e3, t2;
      const n2 = Date.now(), l3 = ++Ft.value;
      jt2 && jt2.abort(), jt2 = new AbortController();
      const o3 = jt2.signal, r3 = a2.isDark ? "dark" : "light", i2 = Ie.value, u2 = i2.replace(/\s+/g, "");
      if (!i2.trim()) {
        if (Je()) return;
        return Re.value && Fe(Re.value), Ue.value = null, Ot.value = "", void (At.value = false);
      }
      if (u2 === Ot.value) return;
      try {
        const a3 = yield rn(i2, r3, { signal: o3, timeoutMs: $t.value.worker });
        if (a3.fullOk) {
          if (!(yield Bn())) return;
          return void (Ft.value === l3 && (Ue.value = null != (t2 = null == (e3 = Re.value) ? void 0 : e3.innerHTML) ? t2 : null, Ot.value = u2, At.value = false));
        }
        const s3 = qt && n2 <= qt;
        if (a3.prefixOk && a3.prefix && tn() && !s3) return void (yield Dn(a3.prefix));
      } catch (c) {
        if ("AbortError" === (null == c ? void 0 : c.name)) return;
      }
      if (Ft.value !== l3) return;
      if (At.value) return;
      const s2 = Et.value[r3];
      s2 && Re.value && je(Re.value, s2);
    });
  }
  function En() {
    _t && (_t = false, Xt = vt.value, Vt = false, Yt && (Yt.abort(), Yt = null), Ht && (globalThis.clearTimeout(Ht), Ht = null), Rt && (Nt(Rt), Rt = null), qt = Date.now());
  }
  function On2() {
    if (En(), bt(), jt2) {
      try {
        jt2.abort();
      } catch (e3) {
      }
      jt2 = null;
    }
    if (Yt) {
      try {
        Yt.abort();
      } catch (e3) {
      }
      Yt = null;
    }
    Ii(), Tt(), yt = 0;
  }
  function Fn(e3 = vt.value) {
    _t && (Zt >= ft.value ? En() : (Ht && globalThis.clearTimeout(Ht), Ht = globalThis.setTimeout(() => {
      Rt = xt(() => u(null, null, function* () {
        if (!_t) return;
        if (!kt()) return void En();
        if (ot.value || Dt.value) return void En();
        const e4 = a2.isDark ? "dark" : "light", t2 = Ie.value;
        if (!t2.trim()) return false === a2.loading ? void En() : void Fn(Xt);
        if (Zt++, Zt > ft.value) En();
        else {
          Yt && Yt.abort(), Yt = new AbortController();
          try {
            const n2 = yield rn(t2, e4, { signal: Yt.signal, timeoutMs: $t.value.worker });
            if (n2.fullOk) {
              if ((yield Bn()) && Dt.value) return void En();
            } else n2.prefixOk && n2.prefix && tn() && (yield Dn(n2.prefix));
          } catch (n2) {
          }
          Xt = Math.min(Math.floor(1.5 * Xt), mt.value), Fn(Xt);
        }
      }), { timeout: 500 });
    }, e3)));
  }
  function jn() {
    _t || ht.value && Te.value && kt() && (ot.value || Dt.value || (_t = true, qt = 0, Vt = true, Zt = 0, Xt = vt.value, Fn(Xt)));
  }
  return watch(dn, (e3) => {
    cn.value && Xe.value && (Xe.value.style.transform = e3.transform);
  }, { immediate: true }), watch(Gt, (e3) => {
    e3 || On();
  }), watch(() => Ie.value, (e3) => {
    if ((e3.trim() || false === a2.loading) && (Dt.value = false, Et.value = {}), !ht.value) return En(), void (kt() && !ot.value && Pn());
    kt() && Mt(), !ot.value && Te.value && kt() ? jn() : En(), function() {
      if (!ht.value) return;
      if (!ot.value) return;
      if (!Te.value) return;
      const e4 = Ie.value.length;
      e4 !== ut.value && (st.value = true, ut.value = e4, pt && clearTimeout(pt), pt = setTimeout(() => {
        st.value && ot.value && Ie.value.trim() && (st.value = false, Cn("preview"));
      }, dt.value));
    }();
  }), watch(() => a2.isDark, () => u(null, null, function* () {
    if (!Dt.value) return;
    if (At.value) return;
    const e3 = a2.isDark ? "dark" : "light", t2 = Et.value[e3];
    if (t2) return void (Re.value && je(Re.value, t2));
    const n2 = { zoom: Qe.value, translateX: et.value, translateY: tt.value, containerHeight: Bt.value }, l3 = 1 !== Qe.value || 0 !== et.value || 0 !== tt.value;
    St.value = true, l3 && (Qe.value = 1, et.value = 0, tt.value = 0, yield nextTick()), yield Bn(), l3 && (yield nextTick(), Qe.value = n2.zoom, et.value = n2.translateX, tt.value = n2.translateY, Bt.value = n2.containerHeight, Lt.value = n2);
  })), watch(() => ot.value, (e3) => u(null, null, function* () {
    if (e3) En(), Dt.value && (Lt.value = { zoom: Qe.value, translateX: et.value, translateY: tt.value, containerHeight: Bt.value });
    else {
      if (At.value) return;
      const e4 = a2.isDark ? "dark" : "light";
      if (Dt.value && Et.value[e4]) return yield nextTick(), Re.value && je(Re.value, Et.value[e4]), Qe.value = Lt.value.zoom, et.value = Lt.value.translateX, tt.value = Lt.value.translateY, void (Bt.value = Lt.value.containerHeight);
      if (yield nextTick(), !Te.value || !kt()) return;
      if (!ht.value) return En(), void (yield Pn());
      jn(), yield Sn();
    }
  })), watch(() => a2.loading, (e3, t2) => u(null, null, function* () {
    if (true === t2 && false === e3) {
      const e4 = Ie.value.trim();
      if (!e4) return Re.value && Fe(Re.value), Ue.value = null, Ot.value = "", At.value = false, On2();
      const t3 = a2.isDark ? "dark" : "light", l3 = e4.replace(/\s+/g, "");
      if (Dt.value && l3 === Ot.value) return yield nextTick(), Re.value && !Re.value.querySelector("svg") && Et.value[t3] && je(Re.value, Et.value[t3]), sn(void 0, { force: true }), void On2();
      try {
        if (yield on(e4, t3, { timeoutMs: $t.value.worker }), !(yield Bn())) return;
        Ot.value = l3, At.value = false, On2();
      } catch (n2) {
        On2(), Wt(n2);
      }
    }
  })), watch(He, (e3) => {
    Pt && Pt.disconnect(), e3 && (Pt = new ResizeObserver((e4) => {
      e4 && e4.length > 0 && !ot.value && !Ne.value && Tr(() => {
        sn(e4[0].contentRect.width);
      });
    }), Pt.observe(e3));
  }, { immediate: true }), onMounted(() => u(null, null, function* () {
    ze().catch((e3) => {
      Te.value = false, console.warn("[markstream-vue] Failed to initialize mermaid renderer. Call enableMermaid() to configure a loader.", e3);
    }), yield nextTick(), rt.value || (ot.value = !Te.value), kt() && (ht.value ? (Mt(), ut.value = Ie.value.length) : ot.value || Pn());
  })), watch(() => Te.value, (e3) => {
    rt.value || (ot.value = !e3);
  }), watch(() => a2.maxHeight, () => {
    nextTick(() => {
      sn();
    });
  }), watch([() => a2.estimatedPreviewHeightPx, () => Ie.value], () => {
    Dt.value || Ke() || ot.value || (Bt.value = Ge());
  }), watch(() => Ve.value, (e3) => {
    e3 && (Dt.value || (ht.value ? (Mt(), ut.value = Ie.value.length) : Pn()), a2.loading || Dt.value || Pn(), !ot.value && Te.value && ht.value && jn());
  }, { immediate: false }), onUnmounted(() => {
    pt && clearTimeout(pt), bt(), Pt && Pt.disconnect(), jt2 && (jt2.abort(), jt2 = null), Ii(), En(), Tt();
  }), watch(() => Ne.value, (e3) => u(null, null, function* () {
    e3 ? (En(), jt2 && jt2.abort()) : kt() && !Dt.value && (yield nextTick(), ht.value ? (Mt(), jn()) : ot.value || Pn());
  }), { immediate: false }), (e3, t2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["mermaid-block-container rounded-lg border overflow-hidden", [{ "is-rendering": a2.loading, dark: a2.isDark }]]), "data-markstream-mermaid": "1", "data-markstream-mode": ot.value ? "fallback" : Dt.value ? "preview" : "pending" }, [a2.showHeader ? (openBlock(), createElementBlock("div", J, [e3.$slots["header-left"] ? (openBlock(), createElementBlock("div", Q, [renderSlot(e3.$slots, "header-left", {}, void 0, true)])) : (openBlock(), createElementBlock("div", ee, [createBaseVNode("span", { class: "icon-slot action-icon shrink-0", innerHTML: unref('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\n  <path fill="none" stroke="#ca9ee6" stroke-linecap="round" stroke-linejoin="round" d="M1.5 2.5c0 6 2.25 5.75 4 7 .83.67 1.17 2 1 4h3c-.17-2 .17-3.33 1-4 1.75-1.25 4-1 4-7C12 2.5 10 3 8 7 6 3 4 2.5 1.5 2.5" />\n</svg>\n') }, null, 8, te), t2[21] || (t2[21] = createBaseVNode("span", { class: "mermaid-label-text text-[length:var(--ms-text-label)] font-medium font-mono truncate" }, "Mermaid", -1))])), e3.$slots["header-center"] ? (openBlock(), createElementBlock("div", ne, [renderSlot(e3.$slots, "header-center", {}, void 0, true)])) : a2.showModeToggle && Te.value ? (openBlock(), createElementBlock("div", le, [createBaseVNode("button", { class: normalizeClass(["mermaid-mode-btn px-2 py-0.5 rounded transition-colors", [ot.value ? "" : "is-active"]]), onClick: t2[0] || (t2[0] = () => Tn("preview")), onMouseenter: t2[1] || (t2[1] = (e4) => Kt(e4, unref(Le)("common.preview") || "Preview")), onFocus: t2[2] || (t2[2] = (e4) => Kt(e4, unref(Le)("common.preview") || "Preview")), onMouseleave: Jt, onBlur: Jt }, [createBaseVNode("div", oe, [t2[22] || (t2[22] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), createBaseVNode("circle", { cx: "12", cy: "12", r: "3" })])], -1)), createBaseVNode("span", null, toDisplayString(unref(Le)("common.preview") || "Preview"), 1)])], 34), createBaseVNode("button", { class: normalizeClass(["mermaid-mode-btn px-2 py-0.5 rounded transition-colors", [ot.value ? "is-active" : ""]]), onClick: t2[3] || (t2[3] = () => Tn("source")), onMouseenter: t2[4] || (t2[4] = (e4) => Kt(e4, unref(Le)("common.source") || "Source")), onFocus: t2[5] || (t2[5] = (e4) => Kt(e4, unref(Le)("common.source") || "Source")), onMouseleave: Jt, onBlur: Jt }, [createBaseVNode("div", re, [t2[23] || (t2[23] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m16 18l6-6l-6-6M8 6l-6 6l6 6" })], -1)), createBaseVNode("span", null, toDisplayString(unref(Le)("common.source") || "Source"), 1)])], 34)])) : createCommentVNode("", true), e3.$slots["header-right"] ? (openBlock(), createElementBlock("div", ae, [renderSlot(e3.$slots, "header-right", {}, void 0, true)])) : (openBlock(), createElementBlock("div", ie, [a2.showCollapseButton ? (openBlock(), createElementBlock("button", { key: 0, class: normalizeClass(be), "aria-pressed": Ne.value, onClick: t2[6] || (t2[6] = (e4) => Ne.value = !Ne.value), onMouseenter: t2[7] || (t2[7] = (e4) => Kt(e4, Ne.value ? unref(Le)("common.expand") || "Expand" : unref(Le)("common.collapse") || "Collapse")), onFocus: t2[8] || (t2[8] = (e4) => Kt(e4, Ne.value ? unref(Le)("common.expand") || "Expand" : unref(Le)("common.collapse") || "Collapse")), onMouseleave: Jt, onBlur: Jt }, [(openBlock(), createElementBlock("svg", { style: normalizeStyle({ rotate: Ne.value ? "0deg" : "90deg" }), xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [...t2[24] || (t2[24] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 18l6-6l-6-6" }, null, -1)])], 4))], 40, ue)) : createCommentVNode("", true), a2.showCopyButton ? (openBlock(), createElementBlock("button", { key: 1, class: normalizeClass(be), onClick: kn, onMouseenter: t2[9] || (t2[9] = (e4) => Qt(e4)), onFocus: t2[10] || (t2[10] = (e4) => Qt(e4)), onMouseleave: Jt, onBlur: Jt }, [$e.value ? (openBlock(), createElementBlock("svg", ce, [...t2[26] || (t2[26] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M20 6L9 17l-5-5" }, null, -1)])])) : (openBlock(), createElementBlock("svg", se, [...t2[25] || (t2[25] = [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), createBaseVNode("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })], -1)])]))], 32)) : createCommentVNode("", true), a2.showExportButton && Te.value ? (openBlock(), createElementBlock("button", { key: 2, class: normalizeClass(`${be} ${an.value ? "opacity-50 cursor-not-allowed" : ""}`), "aria-label": unref(Le)("common.export") || "Export", disabled: an.value, onClick: bn, onMouseenter: t2[11] || (t2[11] = (e4) => Kt(e4, unref(Le)("common.export") || "Export")), onFocus: t2[12] || (t2[12] = (e4) => Kt(e4, unref(Le)("common.export") || "Export")), onMouseleave: Jt, onBlur: Jt }, [...t2[27] || (t2[27] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), createBaseVNode("path", { d: "m7 10l5 5l5-5" })])], -1)])], 42, de)) : createCommentVNode("", true), a2.showFullscreenButton && Te.value ? (openBlock(), createElementBlock("button", { key: 3, class: normalizeClass(`${be} ${an.value ? "opacity-50 cursor-not-allowed" : ""}`), "aria-label": cn.value ? unref(Le)("common.minimize") || "Minimize" : unref(Le)("common.open") || "Open", disabled: an.value, onClick: Mn, onMouseenter: t2[13] || (t2[13] = (e4) => Kt(e4, cn.value ? unref(Le)("common.minimize") || "Minimize" : unref(Le)("common.open") || "Open")), onFocus: t2[14] || (t2[14] = (e4) => Kt(e4, cn.value ? unref(Le)("common.minimize") || "Minimize" : unref(Le)("common.open") || "Open")), onMouseleave: Jt, onBlur: Jt }, [cn.value ? (openBlock(), createElementBlock("svg", fe, [...t2[29] || (t2[29] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6" }, null, -1)])])) : (openBlock(), createElementBlock("svg", me, [...t2[28] || (t2[28] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6" }, null, -1)])]))], 42, ve)) : createCommentVNode("", true)]))])) : createCommentVNode("", true), withDirectives(createBaseVNode("div", { ref_key: "modeContainerRef", ref: Ze }, [ot.value ? (openBlock(), createElementBlock("div", he, [createBaseVNode("pre", pe, toDisplayString(Ie.value), 1)])) : (openBlock(), createElementBlock("div", ge, [a2.showZoomControls ? (openBlock(), createElementBlock("div", we, [createBaseVNode("div", ye, [createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors", onClick: fn, onMouseenter: t2[15] || (t2[15] = (e4) => Kt(e4, unref(Le)("common.zoomIn") || "Zoom in")), onFocus: t2[16] || (t2[16] = (e4) => Kt(e4, unref(Le)("common.zoomIn") || "Zoom in")), onMouseleave: Jt, onBlur: Jt }, [...t2[30] || (t2[30] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })])], -1)])], 32), createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors", onClick: hn, onMouseenter: t2[17] || (t2[17] = (e4) => Kt(e4, unref(Le)("common.zoomOut") || "Zoom out")), onFocus: t2[18] || (t2[18] = (e4) => Kt(e4, unref(Le)("common.zoomOut") || "Zoom out")), onMouseleave: Jt, onBlur: Jt }, [...t2[31] || (t2[31] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M8 11h6" })])], -1)])], 32), createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] text-[length:var(--ms-text-label)] rounded transition-colors", onClick: pn, onMouseenter: t2[19] || (t2[19] = (e4) => Kt(e4, unref(Le)("common.resetZoom") || "Reset zoom")), onFocus: t2[20] || (t2[20] = (e4) => Kt(e4, unref(Le)("common.resetZoom") || "Reset zoom")), onMouseleave: Jt, onBlur: Jt }, toDisplayString(Math.round(100 * Qe.value)) + "% ", 33)])])) : createCommentVNode("", true), createBaseVNode("div", mergeProps({ ref_key: "mermaidContainer", ref: He, class: "mermaid-preview-area relative overflow-hidden block transition-[height] ease-out", style: { height: Bt.value } }, toHandlers(zt.value, true), { onMousedown: gn, onMousemove: wn, onMouseup: yn, onMouseleave: yn, onTouchstartPassive: gn, onTouchmovePassive: wn, onTouchendPassive: yn }), [createBaseVNode("div", { "data-mermaid-wrapper": "", class: normalizeClass(["absolute inset-0 cursor-grab", { "cursor-grabbing": nt.value }]), style: normalizeStyle(dn.value) }, [createBaseVNode("div", { ref_key: "mermaidContent", ref: Re, class: "_mermaid w-full text-center flex items-center justify-center min-h-full" }, null, 512)], 6)], 16), (openBlock(), createBlock(Teleport, { to: "body" }, [createBaseVNode("div", { class: normalizeClass(["markstream-vue", { dark: a2.isDark }]) }, [createVNode(Transition, { name: "mermaid-dialog", appear: "" }, { default: withCtx(() => [cn.value ? (openBlock(), createElementBlock("div", { key: 0, class: "mermaid-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4", onClick: withModifiers(mn, ["self"]) }, [createBaseVNode("div", xe, [createBaseVNode("div", ke, [createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors", onClick: fn }, [...t2[32] || (t2[32] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })])], -1)])]), createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] rounded transition-colors", onClick: hn }, [...t2[33] || (t2[33] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M8 11h6" })])], -1)])]), createBaseVNode("button", { class: "mermaid-action-btn p-[var(--ms-action-btn-padding)] text-[length:var(--ms-text-label)] rounded transition-colors", onClick: pn }, toDisplayString(Math.round(100 * Qe.value)) + "% ", 1), createBaseVNode("button", { class: "mermaid-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded transition-colors", onClick: mn }, [...t2[34] || (t2[34] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18 6L6 18M6 6l12 12" })], -1)])])]), createBaseVNode("div", mergeProps({ ref_key: "modalContent", ref: _e, class: "w-full h-full flex items-center justify-center p-4 overflow-hidden" }, toHandlers(zt.value, true), { onMousedown: gn, onMousemove: wn, onMouseup: yn, onMouseleave: yn, onTouchstartPassive: gn, onTouchmovePassive: wn, onTouchendPassive: yn }), null, 16)])])) : createCommentVNode("", true)]), _: 1 })], 2)]))]))], 512), [[vShow, !Ne.value]])], 10, K));
} }), [["__scopeId", "data-v-44da2025"]]);
Me.install = (e2) => {
  e2.component(Me.__name, Me);
};
export {
  Me as default
};
//# sourceMappingURL=index4-QF3KIZQO.js.map
