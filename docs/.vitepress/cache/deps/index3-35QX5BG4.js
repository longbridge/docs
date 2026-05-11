import {
  Ee,
  Qn,
  Ua,
  Yn,
  fi,
  ia,
  jt,
  ri,
  si
} from "./chunk-VF4QCHVU.js";
import {
  Transition,
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createVNode,
  defineComponent,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  toDisplayString,
  watch,
  withCtx
} from "./chunk-URVHZSMY.js";
import "./chunk-7N2WBUNW.js";

// node_modules/markstream-vue/dist/index3.js
var e = (e2, l, n) => new Promise((a, t) => {
  var o = (e3) => {
    try {
      u(n.next(e3));
    } catch (l2) {
      t(l2);
    }
  }, r = (e3) => {
    try {
      u(n.throw(e3));
    } catch (l2) {
      t(l2);
    }
  }, u = (e3) => e3.done ? a(e3.value) : Promise.resolve(e3.value).then(o, r);
  u((n = n.apply(e2, l)).next());
});
var S = ["data-markstream-mode"];
var O = { key: 0, class: "math-loading-overlay" };
var K = ["innerHTML"];
var M = { key: 1, class: "math-block__fallback text-left" };
var H = Ee(defineComponent({ __name: "MathBlockNode", props: { node: {}, indexKey: {}, cacheScope: {} }, setup(l) {
  const E = l, H2 = ref(null), I = computed(() => Ua(E.node.content)), $ = function() {
    if (!E.node.content) return { html: "", text: E.node.raw, loading: false };
    const e2 = Yn();
    if (!e2) return { html: "", text: E.node.loading ? "" : E.node.raw, loading: E.node.loading };
    try {
      return { html: e2.renderToString(I.value, { throwOnError: E.node.loading, displayMode: true }), text: "", loading: false };
    } catch (l2) {
      return { html: "", text: E.node.loading ? "" : E.node.raw, loading: E.node.loading };
    }
  }(), A = ref($.html), L = ref($.text);
  let N = false, W = 0, z = false, B = null;
  const D = ia(), P = jt();
  let j = null, C = null;
  const F = ref($.loading), U = ref(X());
  function V() {
    var e2;
    if (null == E.indexKey) return "";
    const l2 = null != (e2 = E.cacheScope) ? e2 : null == D ? void 0 : D.scope;
    return `${null != l2 && String(l2).length > 0 ? `${String(l2)}:` : ""}math-block:${String(E.indexKey)}`;
  }
  function X() {
    var e2;
    const l2 = V();
    return l2 && null != (e2 = null == D ? void 0 : D.cache.get(l2)) ? e2 : 0;
  }
  function q(e2) {
    if (!Number.isFinite(e2) || e2 <= 0) return;
    const l2 = Math.max(U.value, e2);
    if (l2 === U.value) return;
    U.value = l2;
    const n = V();
    n && (null == D || D.cache.set(n, l2));
  }
  function G() {
    nextTick(() => {
      var e2, l2;
      q(null != (l2 = null == (e2 = H2.value) ? void 0 : e2.offsetHeight) ? l2 : 0);
    });
  }
  function J() {
    return e(this, null, function* () {
      if (z) return;
      if (!E.node.content) return F.value = false, A.value = "", L.value = E.node.raw, N = true, void G();
      if (!N) try {
        !j && H2.value && (j = P(H2.value)), yield null == j ? void 0 : j.whenVisible;
      } catch (a) {
      }
      B && (B.abort(), B = null);
      const l2 = ++W, n = new AbortController();
      B = n, fi(I.value, true, { timeout: 3e3, waitTimeout: 2e3, maxRetries: 1, signal: n.signal }).then((e2) => {
        z || l2 !== W || (A.value = e2, L.value = "", N = true, F.value = false, G());
      }).catch((n2) => e(null, null, function* () {
        if (z || l2 !== W) return;
        const e2 = (null == n2 ? void 0 : n2.code) || (null == n2 ? void 0 : n2.name), t = "KATEX_DISABLED" === e2;
        if ("WORKER_INIT_ERROR" === e2 || (null == n2 ? void 0 : n2.fallbackToRenderer) || e2 === si || "WORKER_TIMEOUT" === e2) {
          const e3 = yield Qn();
          if (e3) {
            try {
              const l3 = e3.renderToString(I.value, { throwOnError: E.node.loading, displayMode: true });
              A.value = l3, L.value = "", N = true, F.value = false, G(), ri(I.value, true, l3);
            } catch (a) {
            }
            return;
          }
        }
        if (t) return F.value = false, A.value = "", L.value = E.node.raw, void G();
        N || (F.value = true), E.node.loading || (F.value = false, A.value = "", L.value = E.node.raw, G());
      }));
    });
  }
  return ($.html || $.text) && (N = true), watch(() => E.node.content, () => {
    J();
  }), watch([() => E.indexKey, () => E.cacheScope], () => {
    U.value = X(), G();
  }), onMounted(() => {
    "undefined" != typeof ResizeObserver && H2.value && (C = new ResizeObserver(() => {
      var e2, l2;
      q(null != (l2 = null == (e2 = H2.value) ? void 0 : e2.offsetHeight) ? l2 : 0);
    }), C.observe(H2.value)), G(), A.value || J();
  }), onBeforeUnmount(() => {
    var e2;
    z = true, B && (B.abort(), B = null), null == C || C.disconnect(), C = null, null == (e2 = null == j ? void 0 : j.destroy) || e2.call(j), j = null;
  }), (e2, l2) => (openBlock(), createElementBlock("div", { ref_key: "containerEl", ref: H2, class: "math-block text-center overflow-x-auto relative", "data-markstream-math": "block", "data-markstream-mode": A.value ? "katex" : L.value ? "fallback" : "loading", style: normalizeStyle(U.value ? { minHeight: `${U.value}px` } : void 0) }, [createVNode(Transition, { name: "math-fade" }, { default: withCtx(() => [!F.value || A.value || L.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", O, [...l2[0] || (l2[0] = [createBaseVNode("div", { class: "math-loading-spinner" }, null, -1)])]))]), _: 1 }), A.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["math-block__content", { "math-rendering": F.value }]), innerHTML: A.value }, null, 10, K)) : L.value ? (openBlock(), createElementBlock("pre", M, toDisplayString(L.value), 1)) : (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["math-block__content", { "math-rendering": F.value }]) }, null, 2))], 12, S));
} }), [["__scopeId", "data-v-2dc0a6cd"]]);
H.install = (e2) => {
  e2.component(H.__name, H);
};
export {
  H as default
};
//# sourceMappingURL=index3-35QX5BG4.js.map
