import {
  Ee,
  Qn,
  Ua,
  Yn,
  fi,
  jt,
  ri,
  si
} from "./chunk-VF4QCHVU.js";
import {
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  renderSlot,
  toDisplayString,
  watch,
  withCtx
} from "./chunk-URVHZSMY.js";
import "./chunk-7N2WBUNW.js";

// node_modules/markstream-vue/dist/index2.js
var e = (e2, a, n) => new Promise((l, t) => {
  var o = (e3) => {
    try {
      i(n.next(e3));
    } catch (a2) {
      t(a2);
    }
  }, r = (e3) => {
    try {
      i(n.throw(e3));
    } catch (a2) {
      t(a2);
    }
  }, i = (e3) => e3.done ? l(e3.value) : Promise.resolve(e3.value).then(o, r);
  i((n = n.apply(e2, a)).next());
});
var b = ["data-markstream-mode"];
var E = ["innerHTML"];
var R = { key: 1, class: "math-inline math-inline--fallback" };
var I = { class: "math-inline__loading", role: "status", "aria-live": "polite" };
var M = Ee(defineComponent({ __name: "MathInlineNode", props: { node: {} }, setup(a) {
  const T = a, M2 = ref(null), O = "undefined" == typeof window, L = computed(() => "$$" === T.node.markup), A = computed(() => Ua(T.node.content)), K = function() {
    if (!T.node.content) return { html: "", text: T.node.raw, loading: false };
    if (!O) return { html: "", text: T.node.raw, loading: false };
    const e2 = Yn();
    if (!e2) return { html: "", text: T.node.raw, loading: false };
    try {
      return { html: e2.renderToString(A.value, { throwOnError: T.node.loading, displayMode: L.value }), text: "", loading: false };
    } catch (a2) {
      return { html: "", text: T.node.raw, loading: false };
    }
  }(), S = ref(K.html), W = ref(K.text);
  let $ = false, D = 0, H = false, N = null;
  const P = ref(K.loading), j = jt();
  let B = null;
  function C() {
    return e(this, null, function* () {
      if (H) return;
      if (!T.node.content) return P.value = false, S.value = "", W.value = T.node.raw, void ($ = true);
      N && (N.abort(), N = null);
      const a2 = ++D, n = new AbortController();
      if (N = n, !$) try {
        !B && M2.value && (B = j(M2.value)), yield null == B ? void 0 : B.whenVisible;
      } catch (l) {
      }
      fi(A.value, L.value, { timeout: 1500, waitTimeout: 0, maxRetries: 0, signal: n.signal }).then((e2) => {
        H || a2 !== D || (S.value = e2, W.value = "", P.value = false, $ = true);
      }).catch((n2) => e(null, null, function* () {
        if (H || a2 !== D) return;
        const e2 = (null == n2 ? void 0 : n2.code) || (null == n2 ? void 0 : n2.name), t = "KATEX_DISABLED" === e2;
        if ("WORKER_INIT_ERROR" === e2 || (null == n2 ? void 0 : n2.fallbackToRenderer) || e2 === si || "WORKER_TIMEOUT" === e2) {
          const e3 = yield Qn();
          if (e3) {
            try {
              const a3 = e3.renderToString(A.value, { throwOnError: T.node.loading, displayMode: L.value });
              S.value = a3, W.value = "", P.value = false, $ = true, ri(A.value, L.value, a3);
            } catch (l) {
            }
            return;
          }
        }
        if (t) return P.value = false, S.value = "", void (W.value = T.node.raw);
        $ || (P.value = !t), T.node.loading ? t && (S.value = "", W.value = T.node.raw) : (P.value = false, S.value = "", W.value = T.node.raw);
      }));
    });
  }
  return (K.html || K.text) && ($ = true), watch(() => T.node.content, () => {
    C();
  }), onMounted(() => {
    O || S.value || C();
  }), onBeforeUnmount(() => {
    var e2;
    H = true, N && (N.abort(), N = null), null == (e2 = null == B ? void 0 : B.destroy) || e2.call(B), B = null;
  }), (e2, a2) => (openBlock(), createElementBlock("span", { ref_key: "containerEl", ref: M2, class: "math-inline-wrapper", "data-markstream-math": "inline", "data-markstream-mode": S.value ? "katex" : W.value ? "fallback" : "loading" }, [S.value ? (openBlock(), createElementBlock("span", { key: 0, class: "math-inline", innerHTML: S.value }, null, 8, E)) : W.value ? (openBlock(), createElementBlock("span", R, toDisplayString(W.value), 1)) : P.value ? (openBlock(), createBlock(Transition, { key: 2, name: "table-node-fade" }, { default: withCtx(() => [createBaseVNode("span", I, [renderSlot(e2.$slots, "loading", { isLoading: P.value }, () => [a2[0] || (a2[0] = createBaseVNode("span", { class: "math-inline__spinner animate-spin", "aria-hidden": "true" }, null, -1)), a2[1] || (a2[1] = createBaseVNode("span", { class: "sr-only" }, "Loading", -1))], true)])]), _: 3 })) : createCommentVNode("", true)], 8, b));
} }), [["__scopeId", "data-v-6c6e62e1"]]);
M.install = (e2) => {
  e2.component(M.__name, M);
};
export {
  M as default
};
//# sourceMappingURL=index2-UUL5H4G2.js.map
