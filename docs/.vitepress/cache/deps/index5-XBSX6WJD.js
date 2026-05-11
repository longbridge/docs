import {
  $n,
  Ee,
  Kl,
  Ln,
  On,
  jl,
  jt,
  ql
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
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
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
import "./chunk-7N2WBUNW.js";

// node_modules/markstream-vue/dist/index5.js
var e = (e2, o, n) => new Promise((t, l) => {
  var i = (e3) => {
    try {
      a(n.next(e3));
    } catch (o2) {
      l(o2);
    }
  }, r = (e3) => {
    try {
      a(n.throw(e3));
    } catch (o2) {
      l(o2);
    }
  }, a = (e3) => e3.done ? t(e3.value) : Promise.resolve(e3.value).then(i, r);
  a((n = n.apply(e2, o)).next());
});
var P = () => import("./infographic_markstream-vue-5PAKC3DQ.js");
var z = null;
var Z = P;
function I() {
  return null !== Z;
}
var S = ["data-markstream-mode"];
var V = { key: 0, class: "infographic-block-header flex justify-between items-center border-b" };
var _ = { key: 0 };
var X = { key: 1, class: "flex items-center gap-x-2 overflow-hidden" };
var O = ["innerHTML"];
var Y = { key: 2 };
var N = { key: 3, class: "infographic-mode-toggle flex items-center gap-0.5" };
var D = { class: "flex items-center gap-x-1" };
var R = { class: "flex items-center gap-x-1" };
var U = { key: 4 };
var A = { key: 5, class: "infographic-header-actions flex items-center" };
var q = ["aria-pressed"];
var G = { key: 0, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var J = { key: 1, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var K = ["disabled"];
var Q = ["disabled"];
var W = { key: 0, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var ee = { key: 1, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var oe = { key: 0, class: "infographic-source" };
var ne = { class: "infographic-source-code text-sm font-mono whitespace-pre-wrap" };
var te = { key: 1, class: "relative" };
var le = { key: 0, class: "absolute top-2 right-2 z-10 rounded-lg" };
var ie = { class: "flex items-center gap-2 backdrop-blur rounded-lg" };
var re = { class: "dialog-panel infographic-modal-panel relative w-full h-full max-w-full max-h-full rounded overflow-hidden" };
var ae = { class: "absolute top-6 right-6 z-50 flex items-center gap-2" };
var se = "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded";
var ue = Ee(defineComponent({ __name: "InfographicBlockNode", props: { node: {}, maxHeight: { default: void 0 }, estimatedPreviewHeightPx: {}, loading: { type: Boolean, default: true }, isDark: { type: Boolean }, showHeader: { type: Boolean, default: true }, showModeToggle: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true }, showExportButton: { type: Boolean, default: true }, showFullscreenButton: { type: Boolean, default: true }, showZoomControls: { type: Boolean, default: true } }, emits: ["copy", "export", "openModal"], setup(o, { emit: L }) {
  const ue2 = o, { t: ce } = $n(), de = jt(), ve = ref(false), he = ref(false), me = ref(), pe = ref(), we = "undefined" != typeof window && I(), fe = ref(!we), ge = ref(false), Ce = ref(false), xe = ref(), ke = ref(null), ye = ref(false), be = ref(null), Me = ref("undefined" == typeof window);
  "undefined" != typeof window && watch(() => me.value, (e2) => {
    var o2;
    if (null == (o2 = be.value) || o2.destroy(), be.value = null, !e2) return void (Me.value = false);
    const n = de(e2, { rootMargin: "160px" });
    be.value = n, Me.value = n.isVisible.value, n.whenVisible.then(() => {
      Me.value = true;
    });
  }, { immediate: true });
  const Be = computed(() => ue2.node.code), Fe = computed(() => {
    var e2;
    return function(e3) {
      if ("none" === ue2.maxHeight) return ql(e3, void 0, null);
      const o2 = jl(ue2.maxHeight);
      return ql(e3, void 0, o2);
    }(null != (e2 = jl(ue2.estimatedPreviewHeightPx)) ? e2 : Kl(Be.value));
  }), He = ref(`${Fe.value}px`);
  function Te() {
    var e2;
    if (!pe.value) return;
    const o2 = pe.value.scrollHeight;
    if (o2 > 0) {
      const n = null != (e2 = jl(function(e3) {
        if ("none" === ue2.maxHeight) return `${e3}px`;
        if (null != ue2.maxHeight) {
          const o4 = Number.parseFloat(String(ue2.maxHeight));
          if (Number.isFinite(o4)) return `${Math.min(e3, o4)}px`;
        }
        const o3 = pe.value;
        if (o3) {
          const n2 = getComputedStyle(o3).getPropertyValue("--ms-size-code-max-height").trim(), t = Number.parseFloat(n2);
          if (Number.isFinite(t)) return `${Math.min(e3, t)}px`;
        }
        return `${Math.min(e3, 500)}px`;
      }(o2))) ? e2 : o2;
      He.value = `${Math.max(n, Fe.value)}px`;
    }
  }
  const $e = ref(1), je = ref(0), Ee2 = ref(0), Le = ref(false), Pe = ref({ x: 0, y: 0 }), ze = computed(() => Be.value);
  function Ze(e2) {
    return !e2 || e2.disabled;
  }
  function Ie(e2, o2, n = "top") {
    if (Ze(e2.currentTarget)) return;
    const t = e2, l = null != (null == t ? void 0 : t.clientX) && null != (null == t ? void 0 : t.clientY) ? { x: t.clientX, y: t.clientY } : void 0;
    Ln(e2.currentTarget, o2, n, false, l, ue2.isDark);
  }
  function Se() {
    On();
  }
  function Ve(e2) {
    if (Ze(e2.currentTarget)) return;
    const o2 = ve.value ? ce("common.copied") || "Copied" : ce("common.copy") || "Copy", n = e2, t = null != (null == n ? void 0 : n.clientX) && null != (null == n ? void 0 : n.clientY) ? { x: n.clientX, y: n.clientY } : void 0;
    Ln(e2.currentTarget, o2, "top", false, t, ue2.isDark);
  }
  function _e() {
    return e(this, null, function* () {
      try {
        const e2 = Be.value;
        "undefined" != typeof navigator && navigator.clipboard && "function" == typeof navigator.clipboard.writeText && (yield navigator.clipboard.writeText(e2)), ve.value = true, setTimeout(() => {
          ve.value = false;
        }, 1e3);
      } catch (e2) {
        console.error("Failed to copy:", e2);
      }
    });
  }
  function Xe(e2) {
    ge.value = true, fe.value = "source" === e2;
  }
  function Oe() {
    var o2;
    const n = null == (o2 = pe.value) ? void 0 : o2.querySelector("svg");
    n ? function(o3) {
      e(this, null, function* () {
        try {
          const n2 = new XMLSerializer().serializeToString(o3), t = new Blob([n2], { type: "image/svg+xml;charset=utf-8" }), l = URL.createObjectURL(t);
          if ("undefined" != typeof document) {
            const o4 = document.createElement("a");
            o4.href = l, o4.download = `infographic-${Date.now()}.svg`;
            try {
              document.body.appendChild(o4), o4.click(), document.body.removeChild(o4);
            } catch (e2) {
            }
            URL.revokeObjectURL(l);
          }
        } catch (n2) {
          console.error("Failed to export SVG:", n2);
        }
      });
    }(n) : console.error("SVG element not found");
  }
  function Ye(e2) {
    "Escape" === e2.key && Ce.value && Ne();
  }
  function Ne() {
    if (Ce.value = false, xe.value && (xe.value.innerHTML = ""), ke.value = null, "undefined" != typeof document) try {
      document.body.style.overflow = "";
    } catch (e2) {
    }
    if ("undefined" != typeof window) try {
      window.removeEventListener("keydown", Ye);
    } catch (e2) {
    }
  }
  function De() {
    !function() {
      if (Ce.value = true, "undefined" != typeof document) try {
        document.body.style.overflow = "hidden";
      } catch (e2) {
      }
      if ("undefined" != typeof window) try {
        window.addEventListener("keydown", Ye);
      } catch (e2) {
      }
      nextTick(() => {
        if (pe.value && xe.value) {
          xe.value.innerHTML = "";
          const e2 = document.createElement("div");
          e2.style.transition = "transform 0.1s ease", e2.style.transformOrigin = "center center", e2.style.width = "100%", e2.style.height = "100%", e2.style.display = "flex", e2.style.alignItems = "center", e2.style.justifyContent = "center";
          const o2 = pe.value.cloneNode(true);
          o2.classList.add("fullscreen"), o2.style.height = "auto", e2.appendChild(o2), xe.value.appendChild(e2), ke.value = e2, e2.style.transform = `translate(${je.value}px, ${Ee2.value}px) scale(${$e.value})`;
        }
      });
    }();
  }
  function Re() {
    $e.value < 3 && ($e.value += 0.1);
  }
  function Ue() {
    $e.value > 0.5 && ($e.value -= 0.1);
  }
  function Ae() {
    $e.value = 1, je.value = 0, Ee2.value = 0;
  }
  function qe(e2) {
    Le.value = true, e2 instanceof MouseEvent ? Pe.value = { x: e2.clientX - je.value, y: e2.clientY - Ee2.value } : Pe.value = { x: e2.touches[0].clientX - je.value, y: e2.touches[0].clientY - Ee2.value };
  }
  function Ge(e2) {
    if (!Le.value) return;
    let o2, n;
    e2 instanceof MouseEvent ? (o2 = e2.clientX, n = e2.clientY) : (o2 = e2.touches[0].clientX, n = e2.touches[0].clientY), je.value = o2 - Pe.value.x, Ee2.value = n - Pe.value.y;
  }
  function Je() {
    Le.value = false;
  }
  let Ke = null, Qe = false, We = false, eo = false, oo = "";
  function no(o2 = false) {
    return e(this, null, function* () {
      var n, t;
      if (!Me.value) return;
      if (!pe.value) return;
      if (Qe) return We = true, void (eo = eo || o2);
      const l = ze.value;
      if (!o2 && l === oo && ye.value) return;
      Qe = true;
      const r = pe.value.innerHTML, a = ye.value;
      try {
        const o3 = yield function() {
          return e(this, null, function* () {
            if (z) return z;
            const e2 = Z;
            if (!e2) return null;
            let o4;
            try {
              o4 = yield e2();
            } catch (t2) {
              if (e2 === P) throw new Error('Optional dependency "@antv/infographic" is not installed. Please install it to enable infographic diagrams.');
              throw t2;
            }
            if (!o4) return null;
            const n2 = o4 && o4.default ? o4.default : o4;
            return z = "function" == typeof n2 && n2.prototype && n2.prototype.render ? n2 : o4.Infographic ? o4.Infographic : n2 && n2.Infographic ? n2.Infographic : n2, z;
          });
        }();
        if (!o3) return void console.warn("Infographic library failed to load.");
        Ke && (null == (n = Ke.destroy) || n.call(Ke), Ke = null), pe.value.innerHTML = "", Ke = new o3({ container: pe.value, width: "100%", height: "100%" });
        let r2 = "";
        if (null == (t = Ke.on) || t.call(Ke, "error", (e2) => {
          const o4 = Array.isArray(e2) ? e2 : [e2];
          r2 = o4.map((e3) => {
            var o5;
            return e3 instanceof Error ? e3.message : "string" == typeof e3 ? e3 : String(e3 && "object" == typeof e3 && "message" in e3 ? null != (o5 = e3.message) ? o5 : "" : null != e3 ? e3 : "");
          }).filter(Boolean).join("; ");
        }), Ke.render(Be.value), r2) throw new Error(r2);
        if (!pe.value.childNodes.length) throw new Error("Infographic render returned empty output.");
        ye.value = true, oo = l, nextTick(() => {
          Te();
        });
      } catch (s) {
        false === ue2.loading ? (console.error("Failed to render infographic:", s), ye.value = false, oo = "", pe.value && (pe.value.innerHTML = `<div style="padding: var(--ms-inset-panel-body); color: hsl(var(--ms-destructive))">Failed to render infographic: ${s instanceof Error ? s.message : "Unknown error"}</div>`)) : (ye.value = a, a && pe.value && (pe.value.innerHTML = r));
      } finally {
        if (Qe = false, We) {
          const e2 = eo;
          We = false, eo = false, nextTick(() => {
            no(e2);
          });
        }
      }
    });
  }
  function to(e2 = false) {
    !Me.value || fe.value || he.value || nextTick(() => {
      no(e2);
    });
  }
  watch(() => Be.value, () => {
    to(true);
  }), watch(() => ue2.loading, (e2, o2) => {
    o2 && !e2 && to(true);
  }), watch(() => fe.value, (e2) => {
    e2 || to(true);
  }), watch(() => he.value, (e2) => {
    e2 || to();
  }), watch(() => ue2.maxHeight, () => {
    nextTick(() => {
      Te();
    });
  }), watch([() => ue2.estimatedPreviewHeightPx, () => Be.value], () => {
    ye.value || fe.value || (He.value = `${Fe.value}px`);
  }), watch(() => Me.value, (e2) => {
    !e2 || fe.value || he.value || to();
  }), onMounted(() => {
    !ge.value && I() && (fe.value = false), to();
  }), onBeforeUnmount(() => {
    var e2, o2;
    if (null == (e2 = be.value) || e2.destroy(), be.value = null, Ke && (null == (o2 = Ke.destroy) || o2.call(Ke), Ke = null), oo = "", "undefined" != typeof window) try {
      window.removeEventListener("keydown", Ye);
    } catch (n) {
    }
  });
  const lo = computed(() => fe.value || he.value), io = computed(() => fe.value ? "fallback" : ye.value ? "preview" : "pending"), ro = computed(() => ({ transform: `translate(${je.value}px, ${Ee2.value}px) scale(${$e.value})` }));
  return watch(ro, (e2) => {
    Ce.value && ke.value && (ke.value.style.transform = e2.transform);
  }), (e2, o2) => (openBlock(), createElementBlock("div", { ref_key: "viewportTarget", ref: me, class: normalizeClass(["infographic-block-container rounded-lg border overflow-hidden", [{ "is-rendering": ue2.loading, dark: ue2.isDark }]]), "data-markstream-infographic": "1", "data-markstream-mode": io.value }, [ue2.showHeader ? (openBlock(), createElementBlock("div", V, [e2.$slots["header-left"] ? (openBlock(), createElementBlock("div", _, [renderSlot(e2.$slots, "header-left", {}, void 0, true)])) : (openBlock(), createElementBlock("div", X, [createBaseVNode("span", { class: "icon-slot action-icon shrink-0", innerHTML: unref('<svg width="15.52" height="16" viewBox="0 0 291 300" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M140.904 239.376C128.83 239.683 119.675 239.299 115.448 243.843C110.902 248.07 111.288 257.227 110.979 269.302C111.118 274.675 111.118 279.478 111.472 283.52C111.662 285.638 111.95 287.547 112.406 289.224C112.411 289.243 112.416 289.259 112.422 289.28C112.462 289.419 112.496 289.558 112.539 289.691C113.168 291.787 114.088 293.491 115.446 294.758C116.662 296.064 118.283 296.963 120.264 297.59C120.36 297.614 120.464 297.646 120.555 297.675C120.56 297.68 120.56 297.68 120.566 297.68C120.848 297.768 121.142 297.846 121.443 297.923C121.454 297.923 121.464 297.928 121.478 297.934C122.875 298.272 124.424 298.507 126.11 298.678C126.326 298.696 126.542 298.718 126.763 298.739C130.79 299.086 135.558 299.088 140.904 299.222C152.974 298.912 162.128 299.302 166.36 294.758C170.904 290.526 170.515 281.371 170.824 269.302C170.515 257.227 170.907 248.07 166.36 243.843C162.131 239.299 152.974 239.683 140.904 239.376Z" fill="#FF6376"></path><path d="M21.2155 128.398C12.6555 128.616 6.16484 128.339 3.16751 131.56C-0.0538222 134.56 0.218178 141.054 -0.000488281 149.608C0.218178 158.168 -0.0538222 164.659 3.16751 167.656C6.16484 170.878 12.6555 170.606 21.2155 170.824C25.0262 170.726 28.4288 170.726 31.2955 170.475C32.7968 170.342 34.1488 170.136 35.3382 169.814C35.3542 169.811 35.3648 169.806 35.3782 169.803C35.4768 169.774 35.5755 169.747 35.6688 169.718C37.1568 169.272 38.3648 168.622 39.2635 167.656C40.1915 166.795 40.8262 165.646 41.2715 164.243C41.2875 164.174 41.3115 164.102 41.3328 164.035C41.3328 164.035 41.3355 164.032 41.3355 164.027C41.3968 163.827 41.4529 163.622 41.5062 163.406C41.5062 163.398 41.5115 163.392 41.5142 163.382C41.7542 162.392 41.9222 161.294 42.0422 160.096C42.0555 159.944 42.0715 159.792 42.0848 159.635C42.3328 156.779 42.3328 153.398 42.4262 149.608C42.2075 141.054 42.4848 134.56 39.2635 131.56C36.2635 128.339 29.7728 128.616 21.2155 128.398Z" fill="#FFCCCC"></path><path d="M81.0595 184.171C70.8568 184.433 63.1208 184.102 59.5475 187.942C55.7075 191.518 56.0328 199.254 55.7742 209.454C56.0328 219.657 55.7075 227.393 59.5475 230.963C63.1208 234.803 70.8568 234.478 81.0595 234.739C85.6008 234.622 89.6595 234.622 93.0728 234.323C94.8648 234.163 96.4755 233.921 97.8942 233.534C97.9102 233.529 97.9235 233.526 97.9422 233.521C98.0568 233.486 98.1742 233.457 98.2888 233.422C100.06 232.889 101.5 232.113 102.569 230.963C103.676 229.937 104.433 228.566 104.964 226.894C104.985 226.811 105.012 226.726 105.036 226.646C105.041 226.643 105.041 226.643 105.041 226.638C105.116 226.401 105.18 226.153 105.244 225.897C105.244 225.889 105.249 225.881 105.254 225.867C105.54 224.689 105.74 223.379 105.881 221.953C105.9 221.771 105.916 221.59 105.934 221.403C106.228 218.001 106.228 213.969 106.342 209.454C106.081 199.254 106.412 191.518 102.572 187.942C98.9955 184.102 91.2568 184.433 81.0595 184.171Z" fill="#FF939F"></path><path d="M260.591 151.87C215.652 151.87 203.02 164.523 203.02 209.462H198.476C198.476 164.523 185.836 151.881 140.895 151.881V147.337C185.836 147.337 198.487 134.705 198.487 89.7659H203.02C203.02 134.705 215.652 147.337 260.591 147.337V151.87ZM286.052 124.158C281.82 119.614 272.66 120.001 260.591 119.689C248.521 119.385 239.361 119.771 235.129 115.227C230.585 110.995 230.983 101.846 230.671 89.7659C230.513 83.7312 230.535 78.4272 230.023 74.1019C229.513 69.7659 228.481 66.4219 226.209 64.3046C221.967 59.7606 212.817 60.1472 200.748 59.8459C188.681 60.1472 179.519 59.7606 175.287 64.3046C170.753 68.5366 171.129 77.6966 170.828 89.7659C170.516 101.835 170.9 110.995 166.356 115.227C162.124 119.771 152.985 119.374 140.905 119.689C138.873 119.739 136.924 119.771 135.071 119.811C119.313 118.697 106.337 112.318 106.337 89.7659C106.212 84.6699 106.233 80.1792 105.807 76.5206C105.367 72.8726 104.492 70.0379 102.575 68.2566C99.0013 64.4112 91.2573 64.7446 81.0653 64.4832C70.86 64.7446 63.1186 64.4112 59.5533 68.2566C55.708 71.8299 56.0306 79.5632 55.7693 89.7659C56.0306 99.9686 55.708 107.702 59.5533 111.278C63.1186 115.113 70.86 114.79 81.0653 115.049C103.617 115.049 109.996 128.035 111.1 143.803C111.068 145.659 111.028 147.587 110.975 149.619C111.121 154.987 111.121 159.79 111.476 163.835C111.663 165.95 111.945 167.857 112.404 169.534C112.412 169.555 112.412 169.566 112.423 169.598C112.465 169.734 112.497 169.867 112.537 170.003C113.164 172.099 114.092 173.809 115.447 175.07C116.665 176.371 118.281 177.278 120.271 177.905C120.364 177.934 120.46 177.955 120.564 177.987C120.855 178.081 121.145 178.153 121.439 178.238C121.46 178.238 121.471 178.238 121.479 178.249C122.876 178.582 124.42 178.822 126.108 178.987C126.327 179.009 126.545 179.03 126.764 179.051C130.788 179.395 135.559 179.395 140.905 179.529C152.975 179.843 162.124 179.457 166.356 184.001C170.9 188.233 170.516 197.371 170.828 209.451C171.129 221.529 170.743 230.681 175.287 234.91C179.519 239.454 188.681 239.07 200.748 239.371C206.127 239.235 210.921 239.235 214.975 238.881C217.079 238.694 218.985 238.403 220.676 237.955C220.695 237.945 220.705 237.934 220.727 237.934C220.873 237.891 220.999 237.859 221.135 237.819C223.228 237.193 224.937 236.265 226.209 234.91C227.511 233.691 228.409 232.065 229.044 230.097C229.065 230.003 229.095 229.899 229.127 229.803V229.793C229.22 229.513 229.295 229.222 229.367 228.918C229.367 228.897 229.377 228.897 229.377 228.878C229.721 227.481 229.951 225.937 230.127 224.249C230.137 224.03 230.169 223.811 230.191 223.593C230.535 219.571 230.535 214.798 230.671 209.451C230.972 197.371 230.585 188.233 235.129 184.001C239.361 179.457 248.511 179.843 260.591 179.529C272.66 179.227 281.82 179.614 286.052 175.07C290.596 170.838 290.209 161.689 290.511 149.619C290.209 137.539 290.596 128.379 286.052 124.158Z" fill="#FF356A"></path><path d="M112.405 49.848C112.411 49.8694 112.416 49.8827 112.421 49.904C112.461 50.0427 112.499 50.1814 112.539 50.3147C113.171 52.4134 114.088 54.1147 115.448 55.384C116.661 56.6907 118.283 57.5894 120.264 58.2134C120.36 58.24 120.464 58.2694 120.555 58.3014C120.56 58.3067 120.56 58.3067 120.565 58.3067C120.848 58.3947 121.141 58.4694 121.443 58.5467C121.453 58.5467 121.464 58.552 121.48 58.5574C122.875 58.896 124.424 59.1334 126.112 59.3014C126.325 59.3227 126.541 59.3414 126.763 59.3627C130.789 59.712 135.56 59.712 140.904 59.8454C152.973 59.5387 162.128 59.928 166.36 55.384C170.907 51.152 170.515 41.9947 170.824 29.9254C170.517 17.8507 170.907 8.69602 166.363 4.46935C162.131 -0.0746511 152.973 0.309349 140.904 1.52588e-05C128.829 0.309349 119.675 -0.0746511 115.448 4.46935C110.904 8.69602 111.288 17.8507 110.979 29.9254C111.117 35.3014 111.117 40.1014 111.472 44.144C111.661 46.2614 111.949 48.1707 112.405 49.848Z" fill="#FF6376"></path></g></svg>\n') }, null, 8, O), o2[21] || (o2[21] = createBaseVNode("span", { class: "infographic-label font-medium font-mono truncate" }, "Infographic", -1))])), e2.$slots["header-center"] ? (openBlock(), createElementBlock("div", Y, [renderSlot(e2.$slots, "header-center", {}, void 0, true)])) : ue2.showModeToggle ? (openBlock(), createElementBlock("div", N, [createBaseVNode("button", { class: normalizeClass(["infographic-mode-btn px-2 py-0.5 rounded transition-colors", [fe.value ? "" : "is-active"]]), onClick: o2[0] || (o2[0] = () => Xe("preview")), onMouseenter: o2[1] || (o2[1] = (e3) => Ie(e3, unref(ce)("common.preview") || "Preview")), onFocus: o2[2] || (o2[2] = (e3) => Ie(e3, unref(ce)("common.preview") || "Preview")), onMouseleave: Se, onBlur: Se }, [createBaseVNode("div", D, [o2[22] || (o2[22] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), createBaseVNode("circle", { cx: "12", cy: "12", r: "3" })])], -1)), createBaseVNode("span", null, toDisplayString(unref(ce)("common.preview") || "Preview"), 1)])], 34), createBaseVNode("button", { class: normalizeClass(["infographic-mode-btn px-2 py-0.5 rounded transition-colors", [fe.value ? "is-active" : ""]]), onClick: o2[3] || (o2[3] = () => Xe("source")), onMouseenter: o2[4] || (o2[4] = (e3) => Ie(e3, unref(ce)("common.source") || "Source")), onFocus: o2[5] || (o2[5] = (e3) => Ie(e3, unref(ce)("common.source") || "Source")), onMouseleave: Se, onBlur: Se }, [createBaseVNode("div", R, [o2[23] || (o2[23] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m16 18l6-6l-6-6M8 6l-6 6l6 6" })], -1)), createBaseVNode("span", null, toDisplayString(unref(ce)("common.source") || "Source"), 1)])], 34)])) : createCommentVNode("", true), e2.$slots["header-right"] ? (openBlock(), createElementBlock("div", U, [renderSlot(e2.$slots, "header-right", {}, void 0, true)])) : (openBlock(), createElementBlock("div", A, [ue2.showCollapseButton ? (openBlock(), createElementBlock("button", { key: 0, class: normalizeClass(se), "aria-pressed": he.value, onClick: o2[6] || (o2[6] = (e3) => he.value = !he.value), onMouseenter: o2[7] || (o2[7] = (e3) => Ie(e3, he.value ? unref(ce)("common.expand") || "Expand" : unref(ce)("common.collapse") || "Collapse")), onFocus: o2[8] || (o2[8] = (e3) => Ie(e3, he.value ? unref(ce)("common.expand") || "Expand" : unref(ce)("common.collapse") || "Collapse")), onMouseleave: Se, onBlur: Se }, [(openBlock(), createElementBlock("svg", { style: normalizeStyle({ rotate: he.value ? "0deg" : "90deg" }), xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [...o2[24] || (o2[24] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 18l6-6l-6-6" }, null, -1)])], 4))], 40, q)) : createCommentVNode("", true), ue2.showCopyButton ? (openBlock(), createElementBlock("button", { key: 1, class: normalizeClass(se), onClick: _e, onMouseenter: o2[9] || (o2[9] = (e3) => Ve(e3)), onFocus: o2[10] || (o2[10] = (e3) => Ve(e3)), onMouseleave: Se, onBlur: Se }, [ve.value ? (openBlock(), createElementBlock("svg", J, [...o2[26] || (o2[26] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M20 6L9 17l-5-5" }, null, -1)])])) : (openBlock(), createElementBlock("svg", G, [...o2[25] || (o2[25] = [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), createBaseVNode("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })], -1)])]))], 32)) : createCommentVNode("", true), ue2.showExportButton ? (openBlock(), createElementBlock("button", { key: 2, class: normalizeClass(`${se} ${lo.value ? "opacity-50 cursor-not-allowed" : ""}`), disabled: lo.value, onClick: Oe, onMouseenter: o2[11] || (o2[11] = (e3) => Ie(e3, unref(ce)("common.export") || "Export")), onFocus: o2[12] || (o2[12] = (e3) => Ie(e3, unref(ce)("common.export") || "Export")), onMouseleave: Se, onBlur: Se }, [...o2[27] || (o2[27] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), createBaseVNode("path", { d: "m7 10l5 5l5-5" })])], -1)])], 42, K)) : createCommentVNode("", true), ue2.showFullscreenButton ? (openBlock(), createElementBlock("button", { key: 3, class: normalizeClass(`${se} ${lo.value ? "opacity-50 cursor-not-allowed" : ""}`), disabled: lo.value, onClick: De, onMouseenter: o2[13] || (o2[13] = (e3) => Ie(e3, Ce.value ? unref(ce)("common.minimize") || "Minimize" : unref(ce)("common.open") || "Open")), onFocus: o2[14] || (o2[14] = (e3) => Ie(e3, Ce.value ? unref(ce)("common.minimize") || "Minimize" : unref(ce)("common.open") || "Open")), onMouseleave: Se, onBlur: Se }, [Ce.value ? (openBlock(), createElementBlock("svg", ee, [...o2[29] || (o2[29] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6" }, null, -1)])])) : (openBlock(), createElementBlock("svg", W, [...o2[28] || (o2[28] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6" }, null, -1)])]))], 42, Q)) : createCommentVNode("", true)]))])) : createCommentVNode("", true), withDirectives(createBaseVNode("div", null, [fe.value ? (openBlock(), createElementBlock("div", oe, [createBaseVNode("pre", ne, toDisplayString(Be.value), 1)])) : (openBlock(), createElementBlock("div", te, [ue2.showZoomControls ? (openBlock(), createElementBlock("div", le, [createBaseVNode("div", ie, [createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Re, onMouseenter: o2[15] || (o2[15] = (e3) => Ie(e3, unref(ce)("common.zoomIn") || "Zoom in")), onFocus: o2[16] || (o2[16] = (e3) => Ie(e3, unref(ce)("common.zoomIn") || "Zoom in")), onMouseleave: Se, onBlur: Se }, [...o2[30] || (o2[30] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })])], -1)])], 32), createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Ue, onMouseenter: o2[17] || (o2[17] = (e3) => Ie(e3, unref(ce)("common.zoomOut") || "Zoom out")), onFocus: o2[18] || (o2[18] = (e3) => Ie(e3, unref(ce)("common.zoomOut") || "Zoom out")), onMouseleave: Se, onBlur: Se }, [...o2[31] || (o2[31] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M8 11h6" })])], -1)])], 32), createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Ae, onMouseenter: o2[19] || (o2[19] = (e3) => Ie(e3, unref(ce)("common.resetZoom") || "Reset zoom")), onFocus: o2[20] || (o2[20] = (e3) => Ie(e3, unref(ce)("common.resetZoom") || "Reset zoom")), onMouseleave: Se, onBlur: Se }, toDisplayString(Math.round(100 * $e.value)) + "% ", 33)])])) : createCommentVNode("", true), createBaseVNode("div", { class: "infographic-preview relative transition-all overflow-hidden block", style: normalizeStyle({ height: He.value }), onMousedown: qe, onMousemove: Ge, onMouseup: Je, onMouseleave: Je, onTouchstartPassive: qe, onTouchmovePassive: Ge, onTouchendPassive: Je }, [createBaseVNode("div", { class: normalizeClass(["absolute inset-0 cursor-grab", { "cursor-grabbing": Le.value }]), style: normalizeStyle(ro.value) }, [createBaseVNode("div", { ref_key: "infographicContainer", ref: pe, class: "w-full text-center flex items-center justify-center min-h-full" }, null, 512)], 6)], 36)]))], 512), [[vShow, !he.value]]), (openBlock(), createBlock(Teleport, { to: "body" }, [createBaseVNode("div", { class: normalizeClass(["markstream-vue", { dark: ue2.isDark }]) }, [createVNode(Transition, { name: "infographic-dialog", appear: "" }, { default: withCtx(() => [Ce.value ? (openBlock(), createElementBlock("div", { key: 0, class: "infographic-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4", onClick: withModifiers(Ne, ["self"]) }, [createBaseVNode("div", re, [createBaseVNode("div", ae, [createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Re }, [...o2[32] || (o2[32] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })])], -1)])]), createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Ue }, [...o2[33] || (o2[33] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("circle", { cx: "11", cy: "11", r: "8" }), createBaseVNode("path", { d: "m21 21l-4.35-4.35M8 11h6" })])], -1)])]), createBaseVNode("button", { class: "infographic-action-btn p-[var(--ms-action-btn-padding)] rounded", onClick: Ae }, toDisplayString(Math.round(100 * $e.value)) + "% ", 1), createBaseVNode("button", { class: "infographic-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded", onClick: Ne }, [...o2[34] || (o2[34] = [createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", role: "img", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18 6L6 18M6 6l12 12" })], -1)])])]), createBaseVNode("div", { ref_key: "modalContent", ref: xe, class: normalizeClass(["w-full h-full flex items-center justify-center p-4 overflow-hidden", { "cursor-grab": !Le.value, "cursor-grabbing": Le.value }]), onMousedown: qe, onMousemove: Ge, onMouseup: Je, onMouseleave: Je, onTouchstartPassive: qe, onTouchmovePassive: Ge, onTouchendPassive: Je }, null, 34)])])) : createCommentVNode("", true)]), _: 1 })], 2)]))], 10, S));
} }), [["__scopeId", "data-v-65b7e21c"]]);
ue.install = (e2) => {
  e2.component(ue.__name, ue);
};
export {
  ue as default
};
//# sourceMappingURL=index5-XBSX6WJD.js.map
