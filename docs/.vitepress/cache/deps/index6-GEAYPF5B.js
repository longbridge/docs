import {
  $n,
  Ee,
  Ln,
  On,
  Ta,
  jt
} from "./chunk-VF4QCHVU.js";
import {
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  defineComponent,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  toDisplayString,
  unref,
  vShow,
  watch,
  withDirectives
} from "./chunk-URVHZSMY.js";
import "./chunk-7N2WBUNW.js";

// node_modules/markstream-vue/dist/index6.js
var e = Object.defineProperty;
var o = Object.getOwnPropertySymbols;
var t = Object.prototype.hasOwnProperty;
var n = Object.prototype.propertyIsEnumerable;
var r = (o2, t2, n2) => t2 in o2 ? e(o2, t2, { enumerable: true, configurable: true, writable: true, value: n2 }) : o2[t2] = n2;
var l = (e2, l2) => {
  for (var a2 in l2 || (l2 = {})) t.call(l2, a2) && r(e2, a2, l2[a2]);
  if (o) for (var a2 of o(l2)) n.call(l2, a2) && r(e2, a2, l2[a2]);
  return e2;
};
var a = (e2, o2, t2) => new Promise((n2, r2) => {
  var l2 = (e3) => {
    try {
      i(t2.next(e3));
    } catch (o3) {
      r2(o3);
    }
  }, a2 = (e3) => {
    try {
      i(t2.throw(e3));
    } catch (o3) {
      r2(o3);
    }
  }, i = (e3) => e3.done ? n2(e3.value) : Promise.resolve(e3.value).then(l2, a2);
  i((t2 = t2.apply(e2, o2)).next());
});
var j = ["data-markstream-mode"];
var O = { key: 0, class: "d2-block-header flex justify-between items-center border-b" };
var F = { class: "d2-header-actions flex items-center" };
var H = { key: 0, class: "d2-mode-toggle flex items-center gap-0.5" };
var I = ["aria-label"];
var L = { key: 0, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var N = { key: 1, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var P = ["aria-label"];
var R = ["aria-pressed"];
var S = { key: 0, class: "d2-source" };
var _ = { class: "d2-code" };
var $ = { key: 0, class: "d2-error mt-2 text-xs" };
var U = { key: 1 };
var V = { key: 0, class: "d2-source" };
var X = { class: "d2-code" };
var Y = { key: 0, class: "d2-error mt-2 text-xs" };
var q = ["innerHTML"];
var z = { key: 0, class: "d2-error px-4 pb-3 text-xs" };
var G = Ee(defineComponent({ __name: "D2BlockNode", props: { node: {}, maxHeight: { default: void 0 }, loading: { type: Boolean, default: true }, isDark: { type: Boolean }, progressiveRender: { type: Boolean, default: true }, progressiveIntervalMs: { default: 700 }, themeId: {}, darkThemeId: {}, showHeader: { type: Boolean, default: true }, showModeToggle: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showExportButton: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true } }, setup(e2) {
  const o2 = e2, { t: t2 } = $n(), n2 = ref(false), r2 = ref(false), i = ref(false), T = ref(false), G2 = ref(null), J = ref(false), K = ref(""), Q = ref(0), W = ref(null), Z = ref(null), ee = ref(null), oe = jt(), te = ref(null), ne = ref("undefined" == typeof window), re = computed(() => {
    var e3;
    return null != (e3 = o2.node.code) ? e3 : "";
  }), le = computed(() => `${o2.isDark ? "dark" : "light"}:${re.value}`), ae = computed(() => i.value || !T.value || !K.value), ie = computed(() => !!K.value), ue = computed(() => {
    if (ae.value && Z.value) return { minHeight: `${Z.value}px` };
  }), se = computed(() => "none" === o2.maxHeight ? { maxHeight: "none" } : null != o2.maxHeight ? { maxHeight: "number" == typeof o2.maxHeight ? `${o2.maxHeight}px` : String(o2.maxHeight) } : void 0), de = "undefined" != typeof window;
  let ce = null, ve = false, me = false, pe = 0, fe = null, ge = false, ye = null, he = "";
  "undefined" != typeof window && watch(() => ee.value, (e3) => {
    var o3;
    if (null == (o3 = te.value) || o3.destroy(), te.value = null, !e3) return void (ne.value = false);
    const t3 = oe(e3, { rootMargin: "160px" });
    te.value = t3, ne.value = t3.isVisible.value, t3.whenVisible.then(() => {
      ne.value = true;
    });
  }, { immediate: true });
  const we = { N1: "#E5E7EB", N2: "#CBD5E1", N3: "#94A3B8", N4: "#64748B", N5: "#475569", N6: "#334155", N7: "#0B1220", B1: "#60A5FA", B2: "#3B82F6", B3: "#2563EB", B4: "#1D4ED8", B5: "#1E40AF", B6: "#111827", AA2: "#22D3EE", AA4: "#0EA5E9", AA5: "#0284C7", AB4: "#FBBF24", AB5: "#F59E0B" };
  function be(e3) {
    return !e3 || e3.disabled;
  }
  function ke(e3, t3, n3 = "top") {
    if (be(e3.currentTarget)) return;
    const r3 = e3, l2 = null != (null == r3 ? void 0 : r3.clientX) && null != (null == r3 ? void 0 : r3.clientY) ? { x: r3.clientX, y: r3.clientY } : void 0;
    Ln(e3.currentTarget, t3, n3, false, l2, o2.isDark);
  }
  function xe() {
    On();
  }
  function Be(e3) {
    if (be(e3.currentTarget)) return;
    const r3 = n2.value ? t2("common.copied") || "Copied" : t2("common.copy") || "Copy", l2 = e3, a2 = null != (null == l2 ? void 0 : l2.clientX) && null != (null == l2 ? void 0 : l2.clientY) ? { x: l2.clientX, y: l2.clientY } : void 0;
    Ln(e3.currentTarget, r3, "top", false, a2, o2.isDark);
  }
  function De() {
    return a(this, null, function* () {
      try {
        const e3 = re.value;
        "undefined" != typeof navigator && navigator.clipboard && "function" == typeof navigator.clipboard.writeText && (yield navigator.clipboard.writeText(e3)), n2.value = true, setTimeout(() => {
          n2.value = false;
        }, 1e3);
      } catch (e3) {
        console.error("Copy failed:", e3);
      }
    });
  }
  function Ce() {
    r2.value = !r2.value;
  }
  function Me(e3) {
    i.value = "source" === e3;
  }
  const Ee2 = [/javascript:/i, /expression\s*\(/i, /url\s*\(\s*javascript:/i, /@import/i], Ae = /^(?:https?:|mailto:|tel:|#|\/|data:image\/(?:png|gif|jpe?g|webp);)/i;
  function Te(e3) {
    if (!e3) return "";
    const o3 = e3.trim();
    return Ae.test(o3) ? o3 : "";
  }
  function je() {
    K.value = "";
  }
  function Oe() {
    return a(this, null, function* () {
      var e3, t3, n3, r3, u;
      if (!de || me) return;
      if (!ne.value) return;
      if (o2.loading && !o2.progressiveRender) return;
      const s = le.value;
      if (s === he && !G2.value && K.value) return T.value = true, void (o2.loading && (i.value = false));
      const d = re.value;
      if (!d) return je(), G2.value = null, void (he = "");
      const c = ++Q.value;
      J.value = true, G2.value = null;
      try {
        const v = yield function() {
          return a(this, null, function* () {
            if (ce) return ce;
            const e4 = yield Ta();
            if (!e4) return null;
            if ("function" == typeof e4) {
              const o3 = new e4();
              return o3 && "function" == typeof o3.compile ? ce = o3 : "function" == typeof e4.compile && (ce = e4), ce;
            }
            return (null == e4 ? void 0 : e4.D2) && "function" == typeof e4.D2 ? (ce = new e4.D2(), ce) : ("function" == typeof e4.compile && (ce = e4), ce);
          });
        }();
        if (!v) return T.value = false, i.value = true, je(), void (G2.value = "D2 is not available.");
        if ("function" != typeof v.compile || "function" != typeof v.render) throw new TypeError("D2 instance is missing compile/render methods.");
        T.value = true;
        const m = yield v.compile(d);
        if (c !== Q.value) return;
        const p = null != (e3 = null == m ? void 0 : m.diagram) ? e3 : m, f = null != (n3 = null != (t3 = null == m ? void 0 : m.renderOptions) ? t3 : null == m ? void 0 : m.options) ? n3 : {}, g = null != (r3 = o2.themeId) ? r3 : f.themeID, y = null != (u = o2.darkThemeId) ? u : f.darkThemeID, h = l({}, f);
        if (h.themeID = o2.isDark && null != y ? y : g, h.darkThemeID = null, h.darkThemeOverrides = null, o2.isDark) {
          const e4 = f.themeOverrides && "object" == typeof f.themeOverrides ? f.themeOverrides : null;
          h.themeOverrides = l(l({}, we), e4 || {});
        }
        const w = yield v.render(p, h);
        if (c !== Q.value) return;
        const b = function(e4) {
          return e4 ? "string" == typeof e4 ? e4 : "string" == typeof e4.svg ? e4.svg : "string" == typeof e4.data ? e4.data : "" : "";
        }(w);
        if (!b) throw new Error("D2 render returned empty output.");
        !function(e4) {
          const o3 = function(e5) {
            if ("undefined" == typeof window || "undefined" == typeof DOMParser) return "";
            if (!e5) return "";
            const o4 = e5.replace(/["']\s*javascript:/gi, "#").replace(/\bjavascript:/gi, "#").replace(/["']\s*vbscript:/gi, "#").replace(/\bvbscript:/gi, "#").replace(/\bdata:text\/html/gi, "#"), t4 = new DOMParser().parseFromString(o4, "image/svg+xml").documentElement;
            if (!t4 || "svg" !== t4.nodeName.toLowerCase()) return "";
            const n4 = t4;
            return function(e6) {
              const o5 = /* @__PURE__ */ new Set(["script"]), t5 = [e6, ...Array.from(e6.querySelectorAll("*"))];
              for (const n5 of t5) {
                if (o5.has(n5.tagName.toLowerCase())) {
                  n5.remove();
                  continue;
                }
                const e7 = Array.from(n5.attributes);
                for (const o6 of e7) {
                  const e8 = o6.name;
                  if (/^on/i.test(e8)) n5.removeAttribute(e8);
                  else {
                    if ("style" === e8 && o6.value) {
                      const t6 = o6.value;
                      if (Ee2.some((e9) => e9.test(t6))) {
                        n5.removeAttribute(e8);
                        continue;
                      }
                    }
                    if (("href" === e8 || "xlink:href" === e8) && o6.value) {
                      const t6 = Te(o6.value);
                      if (!t6) {
                        n5.removeAttribute(e8);
                        continue;
                      }
                      t6 !== o6.value && n5.setAttribute(e8, t6);
                    }
                  }
                }
              }
            }(n4), n4.classList.add("markstream-d2-root-svg"), n4.outerHTML;
          }(e4);
          K.value = o3 || "";
        }(b), he = s, o2.loading && (i.value = false), G2.value = null;
      } catch (v) {
        if (c !== Q.value) return;
        const e4 = (null == v ? void 0 : v.message) ? String(v.message) : "D2 render failed.";
        o2.loading || (G2.value = e4), he = "", e4.includes("@terrastruct/d2") && (T.value = false, i.value = true);
      } finally {
        c === Q.value && (J.value = false, ge && (ge = false, Fe()));
      }
    });
  }
  function Fe(e3 = false) {
    if (ve) return;
    if (!de) return;
    if (me) return;
    if (J.value) return void (ge = true);
    const t3 = Math.max(120, Number(o2.progressiveIntervalMs) || 0), n3 = Date.now() - pe;
    if (!e3 && n3 < t3) return ge = true, void (null == fe && (fe = window.setTimeout(() => {
      fe = null, ge && (ge = false, Fe(true));
    }, Math.max(0, t3 - n3))));
    ve = true;
    const r3 = () => {
      ve = false, pe = Date.now(), Oe();
    };
    "undefined" != typeof window && "function" == typeof window.requestAnimationFrame ? window.requestAnimationFrame(r3) : setTimeout(r3, 0);
  }
  function He() {
    if (K.value) try {
      const e3 = new Blob([K.value], { type: "image/svg+xml;charset=utf-8" }), o3 = URL.createObjectURL(e3);
      if ("undefined" != typeof document) {
        const e4 = document.createElement("a");
        e4.href = o3, e4.download = `d2-diagram-${Date.now()}.svg`, document.body.appendChild(e4), e4.click(), document.body.removeChild(e4);
      }
      URL.revokeObjectURL(o3);
    } catch (e3) {
      console.error("Failed to export SVG:", e3);
    }
  }
  function Ie() {
    const e3 = W.value;
    if (!e3) return;
    const o3 = e3.getBoundingClientRect().height;
    o3 > 0 && (Z.value = o3);
  }
  return watch(() => [o2.node.code, o2.loading, o2.isDark], () => {
    Fe();
  }, { immediate: true }), watch(() => o2.loading, (e3, o3) => {
    o3 && !e3 && Fe(true);
  }), watch(() => ne.value, (e3) => {
    e3 && Fe(true);
  }), watch(() => [ae.value, K.value, re.value], () => {
    nextTick(() => {
      Ie();
    });
  }), onMounted(() => {
    nextTick(() => {
      Ie();
    }), "undefined" != typeof ResizeObserver && (ye = new ResizeObserver(() => {
      Ie();
    }), W.value && ye.observe(W.value));
  }), onBeforeUnmount(() => {
    var e3;
    me = true, he = "", null == (e3 = te.value) || e3.destroy(), te.value = null, null != fe && (clearTimeout(fe), fe = null), null == ye || ye.disconnect(), ye = null;
  }), (e3, l2) => (openBlock(), createElementBlock("div", { ref_key: "viewportTarget", ref: ee, class: normalizeClass(["d2-block-container rounded-lg border overflow-hidden", { dark: o2.isDark }]), "data-markstream-d2": "1", "data-markstream-mode": ae.value ? "fallback" : "preview" }, [o2.showHeader ? (openBlock(), createElementBlock("div", O, [l2[16] || (l2[16] = createBaseVNode("div", { class: "flex items-center gap-x-2" }, [createBaseVNode("span", { class: "d2-label font-medium font-mono" }, "D2")], -1)), createBaseVNode("div", F, [o2.showModeToggle ? (openBlock(), createElementBlock("div", H, [createBaseVNode("button", { type: "button", class: normalizeClass(["mode-btn px-2 py-0.5 rounded", i.value ? "" : "is-active"]), onClick: l2[0] || (l2[0] = (e4) => Me("preview")), onMouseenter: l2[1] || (l2[1] = (e4) => ke(e4, unref(t2)("common.preview") || "Preview")), onFocus: l2[2] || (l2[2] = (e4) => ke(e4, unref(t2)("common.preview") || "Preview")), onMouseleave: xe, onBlur: xe }, toDisplayString(unref(t2)("common.preview") || "Preview"), 35), createBaseVNode("button", { type: "button", class: normalizeClass(["mode-btn px-2 py-0.5 rounded", i.value ? "is-active" : ""]), onClick: l2[3] || (l2[3] = (e4) => Me("source")), onMouseenter: l2[4] || (l2[4] = (e4) => ke(e4, unref(t2)("common.source") || "Source")), onFocus: l2[5] || (l2[5] = (e4) => ke(e4, unref(t2)("common.source") || "Source")), onMouseleave: xe, onBlur: xe }, toDisplayString(unref(t2)("common.source") || "Source"), 35)])) : createCommentVNode("", true), o2.showCopyButton ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md", "aria-label": n2.value ? unref(t2)("common.copied") || "Copied" : unref(t2)("common.copy") || "Copy", onClick: De, onMouseenter: l2[6] || (l2[6] = (e4) => Be(e4)), onFocus: l2[7] || (l2[7] = (e4) => Be(e4)), onMouseleave: xe, onBlur: xe }, [n2.value ? (openBlock(), createElementBlock("svg", N, [...l2[13] || (l2[13] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M20 6L9 17l-5-5" }, null, -1)])])) : (openBlock(), createElementBlock("svg", L, [...l2[12] || (l2[12] = [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), createBaseVNode("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })], -1)])]))], 40, I)) : createCommentVNode("", true), o2.showExportButton && K.value ? (openBlock(), createElementBlock("button", { key: 2, type: "button", class: "d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md", "aria-label": unref(t2)("common.export") || "Export", onClick: He, onMouseenter: l2[8] || (l2[8] = (e4) => ke(e4, unref(t2)("common.export") || "Export")), onFocus: l2[9] || (l2[9] = (e4) => ke(e4, unref(t2)("common.export") || "Export")), onMouseleave: xe, onBlur: xe }, [...l2[14] || (l2[14] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 3v12m0-12l-4 4m4-4l4 4M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" })], -1)])], 40, P)) : createCommentVNode("", true), o2.showCollapseButton ? (openBlock(), createElementBlock("button", { key: 3, type: "button", class: "d2-action-btn p-[var(--ms-action-btn-padding)] rounded-md", "aria-pressed": r2.value, onClick: Ce, onMouseenter: l2[10] || (l2[10] = (e4) => ke(e4, r2.value ? unref(t2)("common.expand") || "Expand" : unref(t2)("common.collapse") || "Collapse")), onFocus: l2[11] || (l2[11] = (e4) => ke(e4, r2.value ? unref(t2)("common.expand") || "Expand" : unref(t2)("common.collapse") || "Collapse")), onMouseleave: xe, onBlur: xe }, [(openBlock(), createElementBlock("svg", { style: normalizeStyle({ rotate: r2.value ? "0deg" : "90deg" }), xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [...l2[15] || (l2[15] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 18l6-6l-6-6" }, null, -1)])], 4))], 40, R)) : createCommentVNode("", true)])])) : createCommentVNode("", true), withDirectives(createBaseVNode("div", { ref_key: "bodyRef", ref: W, class: "d2-block-body", style: normalizeStyle(ue.value) }, [o2.loading && !ie.value ? (openBlock(), createElementBlock("div", S, [createBaseVNode("pre", _, [createBaseVNode("code", null, toDisplayString(re.value), 1)]), G2.value ? (openBlock(), createElementBlock("p", $, toDisplayString(G2.value), 1)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("div", U, [ae.value ? (openBlock(), createElementBlock("div", V, [createBaseVNode("pre", X, [createBaseVNode("code", null, toDisplayString(re.value), 1)]), G2.value ? (openBlock(), createElementBlock("p", Y, toDisplayString(G2.value), 1)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("div", { key: 1, class: "d2-render", style: normalizeStyle(se.value) }, [createBaseVNode("div", { class: "d2-svg", innerHTML: K.value }, null, 8, q), G2.value ? (openBlock(), createElementBlock("p", z, toDisplayString(G2.value), 1)) : createCommentVNode("", true)], 4))]))], 4), [[vShow, !r2.value]])], 10, j));
} }), [["__scopeId", "data-v-9be36d9c"]]);
G.install = (e2) => {
  e2.component(G.__name, G);
};
export {
  G as default
};
//# sourceMappingURL=index6-GEAYPF5B.js.map
