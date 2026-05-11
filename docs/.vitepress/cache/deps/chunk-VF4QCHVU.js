import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  markRaw,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowRef,
  toDisplayString,
  unref,
  useAttrs,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-URVHZSMY.js";
import {
  __publicField
} from "./chunk-7N2WBUNW.js";

// node_modules/stream-markdown-parser/dist/index.js
var __create = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export$1 = (all) => {
  let target = {};
  for (var name in all) __defProp$1(target, name, {
    get: all[name],
    enumerable: true
  });
  return target;
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i2 = 0, n2 = keys.length, key; i2 < n2; i2++) {
    key = keys[i2];
    if (!__hasOwnProp.call(to2, key) && key !== except) __defProp$1(to2, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
function render_footnote_anchor_name(tokens, idx, options, env) {
  const n2 = Number(tokens[idx].meta.id + 1).toString();
  let prefix = "";
  if (typeof env.docId === "string") prefix = `-${env.docId}-`;
  return prefix + n2;
}
function render_footnote_caption(tokens, idx) {
  let n2 = Number(tokens[idx].meta.id + 1).toString();
  if (tokens[idx].meta.subId > 0) n2 += `:${tokens[idx].meta.subId}`;
  return `[${n2}]`;
}
function render_footnote_ref(tokens, idx, options, env, slf) {
  const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  let refid = id;
  if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`;
  return `<sup class="footnote-ref"><a href="#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
}
function render_footnote_block_open(tokens, idx, options) {
  return (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') + '<section class="footnotes">\n<ol class="footnotes-list">\n';
}
function render_footnote_block_close() {
  return "</ol>\n</section>\n";
}
function render_footnote_open(tokens, idx, options, env, slf) {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;
  return `<li id="fn${id}" class="footnote-item">`;
}
function render_footnote_close() {
  return "</li>\n";
}
function render_footnote_anchor(tokens, idx, options, env, slf) {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;
  return ` <a href="#fnref${id}" class="footnote-backref">↩︎</a>`;
}
function footnote_plugin(md) {
  const parseLinkLabel$1 = md.helpers.parseLinkLabel;
  const isSpace$9 = md.utils.isSpace;
  md.renderer.rules.footnote_ref = render_footnote_ref;
  md.renderer.rules.footnote_block_open = render_footnote_block_open;
  md.renderer.rules.footnote_block_close = render_footnote_block_close;
  md.renderer.rules.footnote_open = render_footnote_open;
  md.renderer.rules.footnote_close = render_footnote_close;
  md.renderer.rules.footnote_anchor = render_footnote_anchor;
  md.renderer.rules.footnote_caption = render_footnote_caption;
  md.renderer.rules.footnote_anchor_name = render_footnote_anchor_name;
  function footnote_def(state, startLine, endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max2 = state.eMarks[startLine];
    if (start + 4 > max2) return false;
    if (state.src.charCodeAt(start) !== 91) return false;
    if (state.src.charCodeAt(start + 1) !== 94) return false;
    let pos;
    for (pos = start + 2; pos < max2; pos++) {
      if (state.src.charCodeAt(pos) === 32) return false;
      if (state.src.charCodeAt(pos) === 93) break;
    }
    if (pos === start + 2) return false;
    if (pos + 1 >= max2 || state.src.charCodeAt(++pos) !== 58) return false;
    if (silent) return true;
    pos++;
    if (!state.env.footnotes) state.env.footnotes = {};
    if (!state.env.footnotes.refs) state.env.footnotes.refs = {};
    const label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[`:${label}`] = -1;
    const token_fref_o = new state.Token("footnote_reference_open", "", 1);
    token_fref_o.meta = { label };
    token_fref_o.level = state.level++;
    state.tokens.push(token_fref_o);
    const oldBMark = state.bMarks[startLine];
    const oldTShift = state.tShift[startLine];
    const oldSCount = state.sCount[startLine];
    const oldParentType = state.parentType;
    const posAfterColon = pos;
    const initial = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);
    let offset3 = initial;
    while (pos < max2) {
      const ch = state.src.charCodeAt(pos);
      if (isSpace$9(ch)) if (ch === 9) offset3 += 4 - offset3 % 4;
      else offset3++;
      else break;
      pos++;
    }
    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset3 - initial;
    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;
    state.parentType = "footnote";
    if (state.sCount[startLine] < state.blkIndent) state.sCount[startLine] += state.blkIndent;
    state.md.block.tokenize(state, startLine, endLine, true);
    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;
    const token_fref_c = new state.Token("footnote_reference_close", "", -1);
    token_fref_c.level = --state.level;
    state.tokens.push(token_fref_c);
    return true;
  }
  function footnote_inline(state, silent) {
    const max2 = state.posMax;
    const start = state.pos;
    if (start + 2 >= max2) return false;
    if (state.src.charCodeAt(start) !== 94) return false;
    if (state.src.charCodeAt(start + 1) !== 91) return false;
    const labelStart = start + 2;
    const labelEnd = parseLinkLabel$1(state, start + 1);
    if (labelEnd < 0) return false;
    if (!silent) {
      if (!state.env.footnotes) state.env.footnotes = {};
      if (!state.env.footnotes.list) state.env.footnotes.list = [];
      const footnoteId = state.env.footnotes.list.length;
      const tokens = [];
      state.md.inline.parse(state.src.slice(labelStart, labelEnd), state.md, state.env, tokens);
      const token = state.push("footnote_ref", "", 0);
      token.meta = { id: footnoteId };
      state.env.footnotes.list[footnoteId] = {
        content: state.src.slice(labelStart, labelEnd),
        tokens
      };
    }
    state.pos = labelEnd + 1;
    state.posMax = max2;
    return true;
  }
  function footnote_ref(state, silent) {
    const max2 = state.posMax;
    const start = state.pos;
    if (start + 3 > max2) return false;
    if (!state.env.footnotes || !state.env.footnotes.refs) return false;
    if (state.src.charCodeAt(start) !== 91) return false;
    if (state.src.charCodeAt(start + 1) !== 94) return false;
    let pos;
    for (pos = start + 2; pos < max2; pos++) {
      if (state.src.charCodeAt(pos) === 32) return false;
      if (state.src.charCodeAt(pos) === 10) return false;
      if (state.src.charCodeAt(pos) === 93) break;
    }
    if (pos === start + 2) return false;
    if (pos >= max2) return false;
    pos++;
    const label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[`:${label}`] === "undefined") return false;
    if (!silent) {
      if (!state.env.footnotes.list) state.env.footnotes.list = [];
      let footnoteId;
      if (state.env.footnotes.refs[`:${label}`] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = {
          label,
          count: 0
        };
        state.env.footnotes.refs[`:${label}`] = footnoteId;
      } else footnoteId = state.env.footnotes.refs[`:${label}`];
      const footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;
      const token = state.push("footnote_ref", "", 0);
      token.meta = {
        id: footnoteId,
        subId: footnoteSubId,
        label
      };
    }
    state.pos = pos;
    state.posMax = max2;
    return true;
  }
  function footnote_tail(state) {
    let tokens;
    let current;
    let currentLabel;
    let insideRef = false;
    const refTokens = {};
    if (!state.env.footnotes) return;
    state.tokens = state.tokens.filter(function(tok) {
      if (tok.type === "footnote_reference_open") {
        insideRef = true;
        current = [];
        currentLabel = tok.meta.label;
        return false;
      }
      if (tok.type === "footnote_reference_close") {
        insideRef = false;
        refTokens[":" + currentLabel] = current;
        return false;
      }
      if (insideRef) current.push(tok);
      return !insideRef;
    });
    if (!state.env.footnotes.list) return;
    const list$1 = state.env.footnotes.list;
    state.tokens.push(new state.Token("footnote_block_open", "", 1));
    for (let i2 = 0, l2 = list$1.length; i2 < l2; i2++) {
      const token_fo = new state.Token("footnote_open", "", 1);
      token_fo.meta = {
        id: i2,
        label: list$1[i2].label
      };
      state.tokens.push(token_fo);
      if (list$1[i2].tokens) {
        tokens = [];
        const token_po = new state.Token("paragraph_open", "p", 1);
        token_po.block = true;
        tokens.push(token_po);
        const token_i = new state.Token("inline", "", 0);
        token_i.children = list$1[i2].tokens;
        token_i.content = list$1[i2].content;
        tokens.push(token_i);
        const token_pc = new state.Token("paragraph_close", "p", -1);
        token_pc.block = true;
        tokens.push(token_pc);
      } else if (list$1[i2].label) tokens = refTokens[`:${list$1[i2].label}`];
      if (tokens) state.tokens = state.tokens.concat(tokens);
      let lastParagraph;
      if (state.tokens[state.tokens.length - 1].type === "paragraph_close") lastParagraph = state.tokens.pop();
      else lastParagraph = null;
      const t2 = list$1[i2].count > 0 ? list$1[i2].count : 1;
      for (let j = 0; j < t2; j++) {
        const token_a = new state.Token("footnote_anchor", "", 0);
        token_a.meta = {
          id: i2,
          subId: j,
          label: list$1[i2].label
        };
        state.tokens.push(token_a);
      }
      if (lastParagraph) state.tokens.push(lastParagraph);
      state.tokens.push(new state.Token("footnote_close", "", -1));
    }
    state.tokens.push(new state.Token("footnote_block_close", "", -1));
  }
  md.block.ruler.before("reference", "footnote_def", footnote_def, { alt: ["paragraph", "reference"] });
  md.inline.ruler.after("image", "footnote_inline", footnote_inline);
  md.inline.ruler.after("footnote_inline", "footnote_ref", footnote_ref);
  md.core.ruler.after("inline", "footnote_tail", footnote_tail);
}
function ins_plugin(md) {
  function tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) return false;
    if (marker !== 43) return false;
    const scanned = state.scanDelims(state.pos, true);
    let len = scanned.length;
    const ch = String.fromCharCode(marker);
    if (len < 2) return false;
    if (len % 2) {
      const token = state.push("text", "", 0);
      token.content = ch;
      len--;
    }
    for (let i2 = 0; i2 < len; i2 += 2) {
      const token = state.push("text", "", 0);
      token.content = ch + ch;
      if (!scanned.can_open && !scanned.can_close) continue;
      state.delimiters.push({
        marker,
        length: 0,
        jump: i2 / 2,
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess$2(state, delimiters) {
    let token;
    const loneMarkers = [];
    const max2 = delimiters.length;
    for (let i2 = 0; i2 < max2; i2++) {
      const startDelim = delimiters[i2];
      if (startDelim.marker !== 43) continue;
      if (startDelim.end === -1) continue;
      const endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = "ins_open";
      token.tag = "ins";
      token.nesting = 1;
      token.markup = "++";
      token.content = "";
      token = state.tokens[endDelim.token];
      token.type = "ins_close";
      token.tag = "ins";
      token.nesting = -1;
      token.markup = "++";
      token.content = "";
      if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "+") loneMarkers.push(endDelim.token - 1);
    }
    while (loneMarkers.length) {
      const i2 = loneMarkers.pop();
      let j = i2 + 1;
      while (j < state.tokens.length && state.tokens[j].type === "ins_close") j++;
      j--;
      if (i2 !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i2];
        state.tokens[i2] = token;
      }
    }
  }
  md.inline.ruler.before("emphasis", "ins", tokenize);
  md.inline.ruler2.before("emphasis", "ins", function(state) {
    const tokens_meta = state.tokens_meta;
    const max2 = (state.tokens_meta || []).length;
    postProcess$2(state, state.delimiters);
    for (let curr = 0; curr < max2; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess$2(state, tokens_meta[curr].delimiters);
  });
}
function ins_plugin$1(md) {
  function tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) return false;
    if (marker !== 61) return false;
    const scanned = state.scanDelims(state.pos, true);
    let len = scanned.length;
    const ch = String.fromCharCode(marker);
    if (len < 2) return false;
    if (len % 2) {
      const token = state.push("text", "", 0);
      token.content = ch;
      len--;
    }
    for (let i2 = 0; i2 < len; i2 += 2) {
      const token = state.push("text", "", 0);
      token.content = ch + ch;
      if (!scanned.can_open && !scanned.can_close) continue;
      state.delimiters.push({
        marker,
        length: 0,
        jump: i2 / 2,
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess$2(state, delimiters) {
    const loneMarkers = [];
    const max2 = delimiters.length;
    for (let i2 = 0; i2 < max2; i2++) {
      const startDelim = delimiters[i2];
      if (startDelim.marker !== 61) continue;
      if (startDelim.end === -1) continue;
      const endDelim = delimiters[startDelim.end];
      const token_o = state.tokens[startDelim.token];
      token_o.type = "mark_open";
      token_o.tag = "mark";
      token_o.nesting = 1;
      token_o.markup = "==";
      token_o.content = "";
      const token_c = state.tokens[endDelim.token];
      token_c.type = "mark_close";
      token_c.tag = "mark";
      token_c.nesting = -1;
      token_c.markup = "==";
      token_c.content = "";
      if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "=") loneMarkers.push(endDelim.token - 1);
    }
    while (loneMarkers.length) {
      const i2 = loneMarkers.pop();
      let j = i2 + 1;
      while (j < state.tokens.length && state.tokens[j].type === "mark_close") j++;
      j--;
      if (i2 !== j) {
        const token = state.tokens[j];
        state.tokens[j] = state.tokens[i2];
        state.tokens[i2] = token;
      }
    }
  }
  md.inline.ruler.before("emphasis", "mark", tokenize);
  md.inline.ruler2.before("emphasis", "mark", function(state) {
    let curr;
    const tokens_meta = state.tokens_meta;
    const max2 = (state.tokens_meta || []).length;
    postProcess$2(state, state.delimiters);
    for (curr = 0; curr < max2; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess$2(state, tokens_meta[curr].delimiters);
  });
}
var UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function subscript(state, silent) {
  const max2 = state.posMax;
  const start = state.pos;
  if (state.src.charCodeAt(start) !== 126) return false;
  if (silent) return false;
  if (start + 2 >= max2) return false;
  state.pos = start + 1;
  let found = false;
  while (state.pos < max2) {
    if (state.src.charCodeAt(state.pos) === 126) {
      found = true;
      break;
    }
    state.md.inline.skipToken(state);
  }
  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }
  const content = state.src.slice(start + 1, state.pos);
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }
  state.posMax = state.pos;
  state.pos = start + 1;
  const token_so = state.push("sub_open", "sub", 1);
  token_so.markup = "~";
  const token_t = state.push("text", "", 0);
  token_t.content = content.replace(UNESCAPE_RE$1, "$1");
  const token_sc = state.push("sub_close", "sub", -1);
  token_sc.markup = "~";
  state.pos = state.posMax + 1;
  state.posMax = max2;
  return true;
}
function sub_plugin(md) {
  md.inline.ruler.after("emphasis", "sub", subscript);
}
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function superscript(state, silent) {
  const max2 = state.posMax;
  const start = state.pos;
  if (state.src.charCodeAt(start) !== 94) return false;
  if (silent) return false;
  if (start + 2 >= max2) return false;
  state.pos = start + 1;
  let found = false;
  while (state.pos < max2) {
    if (state.src.charCodeAt(state.pos) === 94) {
      found = true;
      break;
    }
    state.md.inline.skipToken(state);
  }
  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }
  const content = state.src.slice(start + 1, state.pos);
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }
  state.posMax = state.pos;
  state.pos = start + 1;
  const token_so = state.push("sup_open", "sup", 1);
  token_so.markup = "^";
  const token_t = state.push("text", "", 0);
  token_t.content = content.replace(UNESCAPE_RE, "$1");
  const token_sc = state.push("sup_close", "sup", -1);
  token_sc.markup = "^";
  state.pos = state.posMax + 1;
  state.posMax = max2;
  return true;
}
function sup_plugin(md) {
  md.inline.ruler.after("emphasis", "sup", superscript);
}
var require_markdown_it_task_checkbox = __commonJS({ "../../node_modules/.pnpm/markdown-it-task-checkbox@1.0.6/node_modules/markdown-it-task-checkbox/index.js": (exports, module) => {
  module.exports = function(md, options) {
    options = Object.assign({}, {
      disabled: true,
      divWrap: false,
      divClass: "checkbox",
      idPrefix: "cbx_",
      ulClass: "task-list",
      liClass: "task-list-item"
    }, options);
    md.core.ruler.after("inline", "github-task-lists", function(state) {
      var tokens = state.tokens;
      var lastId = 0;
      for (var i2 = 2; i2 < tokens.length; i2++) if (isTodoItem(tokens, i2)) {
        todoify(tokens[i2], lastId, options, state.Token);
        lastId += 1;
        attrSet$1(tokens[i2 - 2], "class", options.liClass);
        attrSet$1(tokens[parentToken(tokens, i2 - 2)], "class", options.ulClass);
      }
    });
  };
  function attrSet$1(token, name, value) {
    var index = token.attrIndex(name);
    var attr = [name, value];
    if (index < 0) token.attrPush(attr);
    else token.attrs[index] = attr;
  }
  function parentToken(tokens, index) {
    var targetLevel = tokens[index].level - 1;
    for (var i2 = index - 1; i2 >= 0; i2--) if (tokens[i2].level === targetLevel) return i2;
    return -1;
  }
  function isTodoItem(tokens, index) {
    return isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithTodoMarkdown(tokens[index]);
  }
  function todoify(token, lastId, options, TokenConstructor) {
    var id = options.idPrefix + lastId;
    token.children[0].content = token.children[0].content.slice(3);
    token.children.unshift(beginLabel(id, TokenConstructor));
    token.children.push(endLabel(TokenConstructor));
    token.children.unshift(makeCheckbox(token, id, options, TokenConstructor));
    if (options.divWrap) {
      token.children.unshift(beginWrap(options, TokenConstructor));
      token.children.push(endWrap(TokenConstructor));
    }
  }
  function makeCheckbox(token, id, options, TokenConstructor) {
    var checkbox = new TokenConstructor("checkbox_input", "input", 0);
    checkbox.attrs = [["type", "checkbox"], ["id", id]];
    if (/^\[[xX]\][ \u00A0]/.test(token.content) === true) checkbox.attrs.push(["checked", "true"]);
    if (options.disabled === true) checkbox.attrs.push(["disabled", "true"]);
    return checkbox;
  }
  function beginLabel(id, TokenConstructor) {
    var label = new TokenConstructor("label_open", "label", 1);
    label.attrs = [["for", id]];
    return label;
  }
  function endLabel(TokenConstructor) {
    return new TokenConstructor("label_close", "label", -1);
  }
  function beginWrap(options, TokenConstructor) {
    var token = new TokenConstructor("checkbox_open", "div", 0);
    token.attrs = [["class", options.divClass]];
    return token;
  }
  function endWrap(TokenConstructor) {
    return new TokenConstructor("checkbox_close", "div", -1);
  }
  function isInline(token) {
    return token.type === "inline";
  }
  function isParagraph(token) {
    return token.type === "paragraph_open";
  }
  function isListItem(token) {
    return token.type === "list_item_open";
  }
  function startsWithTodoMarkdown(token) {
    return /^\[[xX \u00A0]\][ \u00A0]/.test(token.content);
  }
} });
var import_markdown_it_task_checkbox = __toESM(require_markdown_it_task_checkbox(), 1);
var __defProp = Object.defineProperty;
var __export = (all) => {
  let target = {};
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
  return target;
};
var regex_default = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var regex_default$1 = /[\0-\x1F\x7F-\x9F]/;
var regex_default$4 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
var regex_default$3 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
var regex_default$5 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;
var regex_default$2 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
var uc_exports = __export$1({
  Any: () => regex_default,
  Cc: () => regex_default$1,
  Cf: () => regex_default$4,
  P: () => regex_default$3,
  S: () => regex_default$5,
  Z: () => regex_default$2
});
function re_default(opts) {
  const re = {};
  opts = opts || {};
  re.src_Any = regex_default.source;
  re.src_Cc = regex_default$1.source;
  re.src_Z = regex_default$2.source;
  re.src_P = regex_default$3.source;
  re.src_ZPCc = [
    re.src_Z,
    re.src_P,
    re.src_Cc
  ].join("|");
  re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
  const text_separators = "[><｜]";
  re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
  re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
  re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
  re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
  re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + `|[><｜]|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
  re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
  re.src_xn = "xn--[a-z0-9\\-]{1,59}";
  re.src_domain_root = "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
  re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
  re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
  re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
  re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
  re.src_host_strict = re.src_host + re.src_host_terminator;
  re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
  re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
  re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
  re.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
  re.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
  re.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
  return re;
}
function assign$1(obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    if (!source) return;
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function _class$1(obj) {
  return Object.prototype.toString.call(obj);
}
function isString$1(obj) {
  return _class$1(obj) === "[object String]";
}
function isObject(obj) {
  return _class$1(obj) === "[object Object]";
}
function isRegExp(obj) {
  return _class$1(obj) === "[object RegExp]";
}
function isFunction(obj) {
  return _class$1(obj) === "[object Function]";
}
function escapeRE$1(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};
function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function(acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}
var defaultSchemas = {
  "http:": { validate: function(text$1, pos, self) {
    const tail = text$1.slice(pos);
    if (!self.re.http) self.re.http = new RegExp("^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, "i");
    if (self.re.http.test(tail)) return tail.match(self.re.http)[0].length;
    return 0;
  } },
  "https:": "http:",
  "ftp:": "http:",
  "//": { validate: function(text$1, pos, self) {
    const tail = text$1.slice(pos);
    if (!self.re.no_http) self.re.no_http = new RegExp("^" + self.re.src_auth + "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path, "i");
    if (self.re.no_http.test(tail)) {
      if (pos >= 3 && text$1[pos - 3] === ":") return 0;
      if (pos >= 3 && text$1[pos - 3] === "/") return 0;
      return tail.match(self.re.no_http)[0].length;
    }
    return 0;
  } },
  "mailto:": { validate: function(text$1, pos, self) {
    const tail = text$1.slice(pos);
    if (!self.re.mailto) self.re.mailto = new RegExp("^" + self.re.src_email_name + "@" + self.re.src_host_strict, "i");
    if (self.re.mailto.test(tail)) return tail.match(self.re.mailto)[0].length;
    return 0;
  } }
};
var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__ = "";
}
function createValidator(re) {
  return function(text$1, pos) {
    const tail = text$1.slice(pos);
    if (re.test(tail)) return tail.match(re)[0].length;
    return 0;
  };
}
function createNormalizer() {
  return function(match2, self) {
    self.normalize(match2);
  };
}
function compile(self) {
  const re = self.re = re_default(self.__opts__);
  const tlds2 = self.__tlds__.slice();
  self.onCompile();
  if (!self.__tlds_replaced__) tlds2.push(tlds_2ch_src_re);
  tlds2.push(re.src_xn);
  re.src_tlds = tlds2.join("|");
  function untpl(tpl) {
    return tpl.replace("%TLDS%", re.src_tlds);
  }
  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
  const aliases = [];
  self.__compiled__ = {};
  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }
  Object.keys(self.__schemas__).forEach(function(name) {
    const val = self.__schemas__[name];
    if (val === null) return;
    const compiled = {
      validate: null,
      link: null
    };
    self.__compiled__[name] = compiled;
    if (isObject(val)) {
      if (isRegExp(val.validate)) compiled.validate = createValidator(val.validate);
      else if (isFunction(val.validate)) compiled.validate = val.validate;
      else schemaError(name, val);
      if (isFunction(val.normalize)) compiled.normalize = val.normalize;
      else if (!val.normalize) compiled.normalize = createNormalizer();
      else schemaError(name, val);
      return;
    }
    if (isString$1(val)) {
      aliases.push(name);
      return;
    }
    schemaError(name, val);
  });
  aliases.forEach(function(alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) return;
    self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
  });
  self.__compiled__[""] = {
    validate: null,
    normalize: createNormalizer()
  };
  const slist = Object.keys(self.__compiled__).filter(function(name) {
    return name.length > 0 && self.__compiled__[name];
  }).map(escapeRE$1).join("|");
  self.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "i");
  self.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
  self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
  self.re.pretest = RegExp("(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@", "i");
  resetScanCache(self);
}
function Match(self, shift3) {
  const start = self.__index__;
  const end = self.__last_index__;
  const text$1 = self.__text_cache__.slice(start, end);
  this.schema = self.__schema__.toLowerCase();
  this.index = start + shift3;
  this.lastIndex = end + shift3;
  this.raw = text$1;
  this.text = text$1;
  this.url = text$1;
}
function createMatch(self, shift3) {
  const match2 = new Match(self, shift3);
  self.__compiled__[match2.schema].normalize(match2, self);
  return match2;
}
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) return new LinkifyIt(schemas, options);
  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }
  this.__opts__ = assign$1({}, defaultOptions, options);
  this.__index__ = -1;
  this.__last_index__ = -1;
  this.__schema__ = "";
  this.__text_cache__ = "";
  this.__schemas__ = assign$1({}, defaultSchemas, schemas);
  this.__compiled__ = {};
  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;
  this.re = {};
  compile(this);
}
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign$1(this.__opts__, options);
  return this;
};
LinkifyIt.prototype.test = function test(text$1) {
  this.__text_cache__ = text$1;
  this.__index__ = -1;
  if (!text$1.length) return false;
  let m, ml2, me, len, shift3, next, re, tld_pos, at_pos;
  if (this.re.schema_test.test(text$1)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text$1)) !== null) {
      len = this.testSchemaAt(text$1, m[2], re.lastIndex);
      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }
  if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
    tld_pos = text$1.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml2 = text$1.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift3 = ml2.index + ml2[1].length;
          if (this.__index__ < 0 || shift3 < this.__index__) {
            this.__schema__ = "";
            this.__index__ = shift3;
            this.__last_index__ = ml2.index + ml2[0].length;
          }
        }
      }
    }
  }
  if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
    at_pos = text$1.indexOf("@");
    if (at_pos >= 0) {
      if ((me = text$1.match(this.re.email_fuzzy)) !== null) {
        shift3 = me.index + me[1].length;
        next = me.index + me[0].length;
        if (this.__index__ < 0 || shift3 < this.__index__ || shift3 === this.__index__ && next > this.__last_index__) {
          this.__schema__ = "mailto:";
          this.__index__ = shift3;
          this.__last_index__ = next;
        }
      }
    }
  }
  return this.__index__ >= 0;
};
LinkifyIt.prototype.pretest = function pretest(text$1) {
  return this.re.pretest.test(text$1);
};
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text$1, schema, pos) {
  if (!this.__compiled__[schema.toLowerCase()]) return 0;
  return this.__compiled__[schema.toLowerCase()].validate(text$1, pos, this);
};
LinkifyIt.prototype.match = function match(text$1) {
  const result = [];
  let shift3 = 0;
  if (this.__index__ >= 0 && this.__text_cache__ === text$1) {
    result.push(createMatch(this, shift3));
    shift3 = this.__last_index__;
  }
  let tail = shift3 ? text$1.slice(shift3) : text$1;
  while (this.test(tail)) {
    result.push(createMatch(this, shift3));
    tail = tail.slice(this.__last_index__);
    shift3 += this.__last_index__;
  }
  if (result.length) return result;
  return null;
};
LinkifyIt.prototype.matchAtStart = function matchAtStart(text$1) {
  this.__text_cache__ = text$1;
  this.__index__ = -1;
  if (!text$1.length) return null;
  const m = this.re.schema_at_start.exec(text$1);
  if (!m) return null;
  const len = this.testSchemaAt(text$1, m[2], m[0].length);
  if (!len) return null;
  this.__schema__ = m[2];
  this.__index__ = m.index + m[1].length;
  this.__last_index__ = m.index + m[0].length + len;
  return createMatch(this, 0);
};
LinkifyIt.prototype.tlds = function tlds(list$1, keepOld) {
  list$1 = Array.isArray(list$1) ? list$1 : [list$1];
  if (!keepOld) {
    this.__tlds__ = list$1.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }
  this.__tlds__ = this.__tlds__.concat(list$1).sort().filter(function(el2, idx, arr) {
    return el2 !== arr[idx - 1];
  }).reverse();
  compile(this);
  return this;
};
LinkifyIt.prototype.normalize = function normalize$1(match2) {
  if (!match2.schema) match2.url = "http://" + match2.url;
  if (match2.schema === "mailto:" && !/^mailto:/i.test(match2.url)) match2.url = "mailto:" + match2.url;
};
LinkifyIt.prototype.onCompile = function onCompile() {
};
var linkify_it_default = LinkifyIt;
var decode_data_html_default = new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0)));
var decode_data_xml_default = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0)));
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint$2 = (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
  let output = "";
  if (codePoint > 65535) {
    codePoint -= 65536;
    output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
    codePoint = 56320 | codePoint & 1023;
  }
  output += String.fromCharCode(codePoint);
  return output;
};
function replaceCodePoint(codePoint) {
  var _a$1;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) return 65533;
  return (_a$1 = decodeMap.get(codePoint)) !== null && _a$1 !== void 0 ? _a$1 : codePoint;
}
var CharCodes;
(function(CharCodes$1) {
  CharCodes$1[CharCodes$1["NUM"] = 35] = "NUM";
  CharCodes$1[CharCodes$1["SEMI"] = 59] = "SEMI";
  CharCodes$1[CharCodes$1["EQUALS"] = 61] = "EQUALS";
  CharCodes$1[CharCodes$1["ZERO"] = 48] = "ZERO";
  CharCodes$1[CharCodes$1["NINE"] = 57] = "NINE";
  CharCodes$1[CharCodes$1["LOWER_A"] = 97] = "LOWER_A";
  CharCodes$1[CharCodes$1["LOWER_F"] = 102] = "LOWER_F";
  CharCodes$1[CharCodes$1["LOWER_X"] = 120] = "LOWER_X";
  CharCodes$1[CharCodes$1["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes$1[CharCodes$1["UPPER_A"] = 65] = "UPPER_A";
  CharCodes$1[CharCodes$1["UPPER_F"] = 70] = "UPPER_F";
  CharCodes$1[CharCodes$1["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags$1) {
  BinTrieFlags$1[BinTrieFlags$1["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags$1[BinTrieFlags$1["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags$1[BinTrieFlags$1["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code$1) {
  return code$1 >= CharCodes.ZERO && code$1 <= CharCodes.NINE;
}
function isHexadecimalCharacter(code$1) {
  return code$1 >= CharCodes.UPPER_A && code$1 <= CharCodes.UPPER_F || code$1 >= CharCodes.LOWER_A && code$1 <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code$1) {
  return code$1 >= CharCodes.UPPER_A && code$1 <= CharCodes.UPPER_Z || code$1 >= CharCodes.LOWER_A && code$1 <= CharCodes.LOWER_Z || isNumber(code$1);
}
function isEntityInAttributeInvalidEnd(code$1) {
  return code$1 === CharCodes.EQUALS || isAsciiAlphaNumeric(code$1);
}
var EntityDecoderState;
(function(EntityDecoderState$1) {
  EntityDecoderState$1[EntityDecoderState$1["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState$1[EntityDecoderState$1["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState$1[EntityDecoderState$1["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState$1[EntityDecoderState$1["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState$1[EntityDecoderState$1["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode$1) {
  DecodingMode$1[DecodingMode$1["Legacy"] = 0] = "Legacy";
  DecodingMode$1[DecodingMode$1["Strict"] = 1] = "Strict";
  DecodingMode$1[DecodingMode$1["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors$1) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors$1;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
  * Write an entity to the decoder. This can be called multiple times with partial entities.
  * If the entity is incomplete, the decoder will return -1.
  *
  * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
  * entity is incomplete, and resume when the next string is written.
  *
  * @param string The string containing the entity (or a continuation of the entity).
  * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
  * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  */
  write(str, offset3) {
    switch (this.state) {
      case EntityDecoderState.EntityStart:
        if (str.charCodeAt(offset3) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset3 + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset3);
      case EntityDecoderState.NumericStart:
        return this.stateNumericStart(str, offset3);
      case EntityDecoderState.NumericDecimal:
        return this.stateNumericDecimal(str, offset3);
      case EntityDecoderState.NumericHex:
        return this.stateNumericHex(str, offset3);
      case EntityDecoderState.NamedEntity:
        return this.stateNamedEntity(str, offset3);
    }
  }
  /**
  * Switches between the numeric decimal and hexadecimal states.
  *
  * Equivalent to the `Numeric character reference state` in the HTML spec.
  *
  * @param str The string containing the entity (or a continuation of the entity).
  * @param offset The current offset.
  * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  */
  stateNumericStart(str, offset3) {
    if (offset3 >= str.length) return -1;
    if ((str.charCodeAt(offset3) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset3 + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset3);
  }
  addToNumericResult(str, start, end, base$1) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base$1, digitCount) + parseInt(str.substr(start, digitCount), base$1);
      this.consumed += digitCount;
    }
  }
  /**
  * Parses a hexadecimal numeric entity.
  *
  * Equivalent to the `Hexademical character reference state` in the HTML spec.
  *
  * @param str The string containing the entity (or a continuation of the entity).
  * @param offset The current offset.
  * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  */
  stateNumericHex(str, offset3) {
    const startIdx = offset3;
    while (offset3 < str.length) {
      const char = str.charCodeAt(offset3);
      if (isNumber(char) || isHexadecimalCharacter(char)) offset3 += 1;
      else {
        this.addToNumericResult(str, startIdx, offset3, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset3, 16);
    return -1;
  }
  /**
  * Parses a decimal numeric entity.
  *
  * Equivalent to the `Decimal character reference state` in the HTML spec.
  *
  * @param str The string containing the entity (or a continuation of the entity).
  * @param offset The current offset.
  * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  */
  stateNumericDecimal(str, offset3) {
    const startIdx = offset3;
    while (offset3 < str.length) {
      const char = str.charCodeAt(offset3);
      if (isNumber(char)) offset3 += 1;
      else {
        this.addToNumericResult(str, startIdx, offset3, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset3, 10);
    return -1;
  }
  /**
  * Validate and emit a numeric entity.
  *
  * Implements the logic from the `Hexademical character reference start
  * state` and `Numeric character reference end state` in the HTML spec.
  *
  * @param lastCp The last code point of the entity. Used to see if the
  *               entity was terminated with a semicolon.
  * @param expectedLength The minimum number of characters that should be
  *                       consumed. Used to validate that at least one digit
  *                       was consumed.
  * @returns The number of characters that were consumed.
  */
  emitNumericEntity(lastCp, expectedLength) {
    var _a$1;
    if (this.consumed <= expectedLength) {
      (_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) this.consumed += 1;
    else if (this.decodeMode === DecodingMode.Strict) return 0;
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
  * Parses a named entity.
  *
  * Equivalent to the `Named character reference state` in the HTML spec.
  *
  * @param str The string containing the entity (or a continuation of the entity).
  * @param offset The current offset.
  * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  */
  stateNamedEntity(str, offset3) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset3 < str.length; offset3++, this.excess++) {
      const char = str.charCodeAt(offset3);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
  * Emit a named entity that was not terminated with a semicolon.
  *
  * @returns The number of characters consumed.
  */
  emitNotTerminatedNamedEntity() {
    var _a$1;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
  * Emit a named entity.
  *
  * @param result The index of the entity in the decode tree.
  * @param valueLength The number of bytes in the entity.
  * @param consumed The number of characters consumed.
  *
  * @returns The number of characters consumed.
  */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
    return consumed;
  }
  /**
  * Signal to the parser that the end of the input was reached.
  *
  * Remaining data will be emitted and relevant errors will be produced.
  *
  * @returns The number of characters consumed.
  */
  end() {
    var _a$1;
    switch (this.state) {
      case EntityDecoderState.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case EntityDecoderState.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case EntityDecoderState.NumericHex:
        return this.emitNumericEntity(0, 3);
      case EntityDecoderState.NumericStart:
        (_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      case EntityDecoderState.EntityStart:
        return 0;
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint$2(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset3 = 0;
    while ((offset3 = str.indexOf("&", offset3)) >= 0) {
      ret += str.slice(lastIndex, offset3);
      decoder.startEntity(decodeMode);
      const len = decoder.write(str, offset3 + 1);
      if (len < 0) {
        lastIndex = offset3 + decoder.end();
        break;
      }
      lastIndex = offset3 + len;
      offset3 = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo2 = nodeIdx;
  let hi2 = lo2 + branchCount - 1;
  while (lo2 <= hi2) {
    const mid = lo2 + hi2 >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) lo2 = mid + 1;
    else if (midVal > char) hi2 = mid - 1;
    else return decodeTree[mid + branchCount];
  }
  return -1;
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);
function decodeHTML(str, mode = DecodingMode.Legacy) {
  return htmlDecoder(str, mode);
}
var decodeCache = {};
function getDecodeCache(exclude) {
  let cache = decodeCache[exclude];
  if (cache) return cache;
  cache = decodeCache[exclude] = [];
  for (let i2 = 0; i2 < 128; i2++) {
    const ch = String.fromCharCode(i2);
    cache.push(ch);
  }
  for (let i2 = 0; i2 < exclude.length; i2++) {
    const ch = exclude.charCodeAt(i2);
    cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
  }
  return cache;
}
function decode$1(string, exclude) {
  if (typeof exclude !== "string") exclude = decode$1.defaultChars;
  const cache = getDecodeCache(exclude);
  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    let result = "";
    for (let i2 = 0, l2 = seq.length; i2 < l2; i2 += 3) {
      const b1 = parseInt(seq.slice(i2 + 1, i2 + 3), 16);
      if (b1 < 128) {
        result += cache[b1];
        continue;
      }
      if ((b1 & 224) === 192 && i2 + 3 < l2) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        if ((b2 & 192) === 128) {
          const chr = b1 << 6 & 1984 | b2 & 63;
          if (chr < 128) result += "��";
          else result += String.fromCharCode(chr);
          i2 += 3;
          continue;
        }
      }
      if ((b1 & 240) === 224 && i2 + 6 < l2) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        const b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128) {
          const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
          if (chr < 2048 || chr >= 55296 && chr <= 57343) result += "���";
          else result += String.fromCharCode(chr);
          i2 += 6;
          continue;
        }
      }
      if ((b1 & 248) === 240 && i2 + 9 < l2) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        const b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
        const b4 = parseInt(seq.slice(i2 + 10, i2 + 12), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
          let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
          if (chr < 65536 || chr > 1114111) result += "����";
          else {
            chr -= 65536;
            result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
          }
          i2 += 9;
          continue;
        }
      }
      result += "�";
    }
    return result;
  });
}
decode$1.defaultChars = ";/?:@&=+$,#";
decode$1.componentChars = "";
var decode_default = decode$1;
var encodeCache = {};
function getEncodeCache(exclude) {
  let cache = encodeCache[exclude];
  if (cache) return cache;
  cache = encodeCache[exclude] = [];
  for (let i2 = 0; i2 < 128; i2++) {
    const ch = String.fromCharCode(i2);
    if (/^[0-9a-z]$/i.test(ch)) cache.push(ch);
    else cache.push("%" + ("0" + i2.toString(16).toUpperCase()).slice(-2));
  }
  for (let i2 = 0; i2 < exclude.length; i2++) cache[exclude.charCodeAt(i2)] = exclude[i2];
  return cache;
}
function encode$1(string, exclude, keepEscaped) {
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode$1.defaultChars;
  }
  if (typeof keepEscaped === "undefined") keepEscaped = true;
  const cache = getEncodeCache(exclude);
  let result = "";
  for (let i2 = 0, l2 = string.length; i2 < l2; i2++) {
    const code$1 = string.charCodeAt(i2);
    if (keepEscaped && code$1 === 37 && i2 + 2 < l2) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i2 + 1, i2 + 3))) {
        result += string.slice(i2, i2 + 3);
        i2 += 2;
        continue;
      }
    }
    if (code$1 < 128) {
      result += cache[code$1];
      continue;
    }
    if (code$1 >= 55296 && code$1 <= 57343) {
      if (code$1 >= 55296 && code$1 <= 56319 && i2 + 1 < l2) {
        const nextCode = string.charCodeAt(i2 + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string[i2] + string[i2 + 1]);
          i2++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string[i2]);
  }
  return result;
}
encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";
var encode_default = encode$1;
function format(url) {
  let result = "";
  result += url.protocol || "";
  result += url.slashes ? "//" : "";
  result += url.auth ? url.auth + "@" : "";
  if (url.hostname && url.hostname.indexOf(":") !== -1) result += "[" + url.hostname + "]";
  else result += url.hostname || "";
  result += url.port ? ":" + url.port : "";
  result += url.pathname || "";
  result += url.search || "";
  result += url.hash || "";
  return result;
}
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i;
var portPattern = /:[0-9]*$/;
var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var unwise = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat([
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  "\n",
  "	"
]);
var autoEscape = ["'"].concat(unwise);
var nonHostChars = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(autoEscape);
var hostEndingChars = [
  "/",
  "?",
  "#"
];
var hostnameMaxLen = 255;
var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var hostlessProtocol = {
  javascript: true,
  "javascript:": true
};
var slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) return url;
  const u2 = new Url();
  u2.parse(url, slashesDenoteHost);
  return u2;
}
Url.prototype.parse = function(url, slashesDenoteHost) {
  let lowerProto, hec, slashes;
  let rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    const simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) this.search = simplePath[2];
      return this;
    }
  }
  let proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    let hostEnd = -1;
    for (let i2 = 0; i2 < hostEndingChars.length; i2++) {
      hec = rest.indexOf(hostEndingChars[i2]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    }
    let auth, atSign;
    if (hostEnd === -1) atSign = rest.lastIndexOf("@");
    else atSign = rest.lastIndexOf("@", hostEnd);
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }
    hostEnd = -1;
    for (let i2 = 0; i2 < nonHostChars.length; i2++) {
      hec = rest.indexOf(nonHostChars[i2]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    }
    if (hostEnd === -1) hostEnd = rest.length;
    if (rest[hostEnd - 1] === ":") hostEnd--;
    const host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost(host);
    this.hostname = this.hostname || "";
    const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      const hostparts = this.hostname.split(/\./);
      for (let i2 = 0, l2 = hostparts.length; i2 < l2; i2++) {
        const part = hostparts[i2];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          let newpart = "";
          for (let j = 0, k = part.length; j < k; j++) if (part.charCodeAt(j) > 127) newpart += "x";
          else newpart += part[j];
          if (!newpart.match(hostnamePartPattern)) {
            const validParts = hostparts.slice(0, i2);
            const notHost = hostparts.slice(i2 + 1);
            const bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) rest = notHost.join(".") + rest;
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (this.hostname.length > hostnameMaxLen) this.hostname = "";
    if (ipv6Hostname) this.hostname = this.hostname.substr(1, this.hostname.length - 2);
  }
  const hash = rest.indexOf("#");
  if (hash !== -1) {
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  const qm = rest.indexOf("?");
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = "";
  return this;
};
Url.prototype.parseHost = function(host) {
  let port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") this.port = port.substr(1);
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};
var parse_default = urlParse;
var mdurl_exports = __export$1({
  decode: () => decode_default,
  encode: () => encode_default,
  format: () => format,
  parse: () => parse_default
});
var require_punycode = __commonJS({ "../../node_modules/.pnpm/punycode.js@2.3.1/node_modules/punycode.js/punycode.js": (exports, module) => {
  const maxInt = 2147483647;
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const delimiter = "-";
  const regexPunycode = /^xn--/;
  const regexNonASCII = /[^\0-\x7F]/;
  const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
  const errors = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  };
  const baseMinusTMin = base - tMin;
  const floor2 = Math.floor;
  const stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw new RangeError(errors[type]);
  }
  function map(array, callback) {
    const result = [];
    let length = array.length;
    while (length--) result[length] = callback(array[length]);
    return result;
  }
  function mapDomain(domain, callback) {
    const parts = domain.split("@");
    let result = "";
    if (parts.length > 1) {
      result = parts[0] + "@";
      domain = parts[1];
    }
    domain = domain.replace(regexSeparators, ".");
    const encoded = map(domain.split("."), callback).join(".");
    return result + encoded;
  }
  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
      const value = string.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        else {
          output.push(value);
          counter--;
        }
      } else output.push(value);
    }
    return output;
  }
  const ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
  const basicToDigit = function(codePoint) {
    if (codePoint >= 48 && codePoint < 58) return 26 + (codePoint - 48);
    if (codePoint >= 65 && codePoint < 91) return codePoint - 65;
    if (codePoint >= 97 && codePoint < 123) return codePoint - 97;
    return base;
  };
  const digitToBasic = function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };
  const adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor2(delta / damp) : delta >> 1;
    delta += floor2(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k += base) delta = floor2(delta / baseMinusTMin);
    return floor2(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  const decode = function(input) {
    const output = [];
    const inputLength = input.length;
    let i2 = 0;
    let n2 = initialN;
    let bias = initialBias;
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) basic = 0;
    for (let j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 128) error("not-basic");
      output.push(input.charCodeAt(j));
    }
    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      const oldi = i2;
      for (let w = 1, k = base; ; k += base) {
        if (index >= inputLength) error("invalid-input");
        const digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base) error("invalid-input");
        if (digit > floor2((maxInt - i2) / w)) error("overflow");
        i2 += digit * w;
        const t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
        if (digit < t2) break;
        const baseMinusT = base - t2;
        if (w > floor2(maxInt / baseMinusT)) error("overflow");
        w *= baseMinusT;
      }
      const out = output.length + 1;
      bias = adapt(i2 - oldi, out, oldi == 0);
      if (floor2(i2 / out) > maxInt - n2) error("overflow");
      n2 += floor2(i2 / out);
      i2 %= out;
      output.splice(i2++, 0, n2);
    }
    return String.fromCodePoint(...output);
  };
  const encode = function(input) {
    const output = [];
    input = ucs2decode(input);
    const inputLength = input.length;
    let n2 = initialN;
    let delta = 0;
    let bias = initialBias;
    for (const currentValue of input) if (currentValue < 128) output.push(stringFromCharCode(currentValue));
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) output.push(delimiter);
    while (handledCPCount < inputLength) {
      let m = maxInt;
      for (const currentValue of input) if (currentValue >= n2 && currentValue < m) m = currentValue;
      const handledCPCountPlusOne = handledCPCount + 1;
      if (m - n2 > floor2((maxInt - delta) / handledCPCountPlusOne)) error("overflow");
      delta += (m - n2) * handledCPCountPlusOne;
      n2 = m;
      for (const currentValue of input) {
        if (currentValue < n2 && ++delta > maxInt) error("overflow");
        if (currentValue === n2) {
          let q = delta;
          for (let k = base; ; k += base) {
            const t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t2) break;
            const qMinusT = q - t2;
            const baseMinusT = base - t2;
            output.push(stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0)));
            q = floor2(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n2;
    }
    return output.join("");
  };
  const toUnicode = function(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  };
  const toASCII = function(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
    });
  };
  const punycode$1 = {
    "version": "2.3.1",
    "ucs2": {
      "decode": ucs2decode,
      "encode": ucs2encode
    },
    "decode": decode,
    "encode": encode,
    "toASCII": toASCII,
    "toUnicode": toUnicode
  };
  module.exports = punycode$1;
} });
var import_punycode = __toESM(require_punycode(), 1);
var utils_exports = __export({
  arrayReplaceAt: () => arrayReplaceAt,
  assign: () => assign,
  countLines: () => countLines,
  escapeHtml: () => escapeHtml$1,
  escapeRE: () => escapeRE,
  fromCodePoint: () => fromCodePoint$1,
  has: () => has,
  isMdAsciiPunct: () => isMdAsciiPunct,
  isPunctChar: () => isPunctChar,
  isPunctCode: () => isPunctCode,
  isSpace: () => isSpace$8,
  isString: () => isString,
  isValidEntityCode: () => isValidEntityCode$1,
  isWhiteSpace: () => isWhiteSpace,
  lib: () => lib,
  mdurl: () => mdurl_exports,
  normalizeReference: () => normalizeReference,
  ucmicro: () => uc_exports,
  unescapeAll: () => unescapeAll$1,
  unescapeMd: () => unescapeMd
});
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function isString(obj) {
  return _class(obj) === "[object String]";
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function has(object, key) {
  return _hasOwnProperty.call(object, key);
}
function assign(obj, ...sources) {
  sources.forEach((source) => {
    if (!source) return;
    if (typeof source !== "object") throw new TypeError(`${String(source)}must be object`);
    Object.keys(source).forEach((key) => {
      obj[key] = source[key];
    });
  });
  return obj;
}
function isSpace$8(code$1) {
  return code$1 === 9 || code$1 === 32;
}
function isWhiteSpace(code$1) {
  if (code$1 >= 8192 && code$1 <= 8202) return true;
  switch (code$1) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return true;
  }
  return false;
}
function isPunctChar(ch) {
  return regex_default$3.test(ch) || regex_default$5.test(ch);
}
var PUNCT_CHAR_CACHE = /* @__PURE__ */ new Map();
function isPunctCode(ch) {
  if (isMdAsciiPunct(ch)) return true;
  const cached = PUNCT_CHAR_CACHE.get(ch);
  if (cached !== void 0) return cached;
  const value = isPunctChar(String.fromCharCode(ch));
  PUNCT_CHAR_CACHE.set(ch, value);
  return value;
}
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function normalizeReference(str) {
  str = str.trim().replace(/\s+/g, " ");
  if ("ẞ".toLowerCase() === "Ṿ") str = str.replace(/ẞ/g, "ß");
  return str.toLowerCase().toUpperCase();
}
function arrayReplaceAt(src, pos, newElements) {
  return [
    ...src.slice(0, pos),
    ...newElements,
    ...src.slice(pos + 1)
  ];
}
function isValidEntityCode$1(c) {
  if (c >= 55296 && c <= 57343) return false;
  if (c >= 64976 && c <= 65007) return false;
  if ((c & 65535) === 65535 || (c & 65535) === 65534) return false;
  if (c >= 0 && c <= 8) return false;
  if (c === 11) return false;
  if (c >= 14 && c <= 31) return false;
  if (c >= 127 && c <= 159) return false;
  if (c > 1114111) return false;
  return true;
}
function fromCodePoint$1(c) {
  if (c > 65535) {
    c -= 65536;
    const surrogate1 = 55296 + (c >> 10);
    const surrogate2 = 56320 + (c & 1023);
    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}
var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-\./:;<=>?@[\\\]^_`{|}~])/g;
var UNESCAPE_ALL_RE$1 = new RegExp(`${UNESCAPE_MD_RE.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`, "gi");
var DIGITAL_ENTITY_TEST_RE$1 = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function replaceEntityPattern(match2, name) {
  if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE$1.test(name)) {
    const code$1 = name[1].toLowerCase() === "x" ? Number.parseInt(name.slice(2), 16) : Number.parseInt(name.slice(1), 10);
    if (isValidEntityCode$1(code$1)) return fromCodePoint$1(code$1);
    return match2;
  }
  const decoded = decodeHTML(match2);
  if (decoded !== match2) return decoded;
  return match2;
}
function unescapeMd(str) {
  if (!str.includes("\\")) return str;
  return str.replace(UNESCAPE_MD_RE, "$1");
}
function unescapeAll$1(str) {
  if (!str.includes("\\") && !str.includes("&")) return str;
  return str.replace(UNESCAPE_ALL_RE$1, (match2, escaped, entity$1) => {
    if (escaped) return escaped;
    return replaceEntityPattern(match2, entity$1);
  });
}
var HTML_ESCAPE_TEST_RE$1 = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE$1 = /[&<>"]/g;
var HTML_REPLACEMENTS$1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function replaceUnsafeChar$1(ch) {
  return HTML_REPLACEMENTS$1[ch];
}
function escapeHtml$1(str) {
  if (HTML_ESCAPE_TEST_RE$1.test(str)) return str.replace(HTML_ESCAPE_REPLACE_RE$1, replaceUnsafeChar$1);
  return str;
}
var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, "\\$&");
}
var lib = {
  mdurl: mdurl_exports,
  ucmicro: uc_exports
};
function countLines(input) {
  if (input.length === 0) return 0;
  let count = 0;
  let pos = -1;
  while ((pos = input.indexOf("\n", pos + 1)) !== -1) count++;
  return count;
}
function parseLinkDestination(str, start, max2) {
  let code$1;
  let pos = start;
  const result = {
    ok: false,
    pos: 0,
    str: ""
  };
  if (str.charCodeAt(pos) === 60) {
    pos++;
    while (pos < max2) {
      code$1 = str.charCodeAt(pos);
      if (code$1 === 10) return result;
      if (code$1 === 60) return result;
      if (code$1 === 62) {
        result.pos = pos + 1;
        result.str = str.slice(start + 1, pos);
        result.ok = true;
        return result;
      }
      if (code$1 === 92 && pos + 1 < max2) {
        pos += 2;
        continue;
      }
      pos++;
    }
    return result;
  }
  let level = 0;
  while (pos < max2) {
    code$1 = str.charCodeAt(pos);
    if (code$1 === 32) break;
    if (code$1 < 32 || code$1 === 127) break;
    if (code$1 === 92 && pos + 1 < max2) {
      if (str.charCodeAt(pos + 1) === 32) break;
      pos += 2;
      continue;
    }
    if (code$1 === 40) {
      level++;
      if (level > 32) return result;
    }
    if (code$1 === 41) {
      if (level === 0) break;
      level--;
    }
    pos++;
  }
  if (start === pos) return result;
  if (level !== 0) return result;
  result.str = str.slice(start, pos);
  result.pos = pos;
  result.ok = true;
  return result;
}
var parse_link_destination_default = parseLinkDestination;
var FALLBACK_TO_INLINE_SCAN = -2;
function scanPlainLinkLabel(src, start, max2) {
  let pos = start + 1;
  while (pos < max2) {
    const marker = src.charCodeAt(pos);
    if (marker === 93) return pos;
    if (marker === 92) {
      pos += 2;
      continue;
    }
    if (marker === 96 || marker === 60) return FALLBACK_TO_INLINE_SCAN;
    if (marker === 33 && pos + 1 < max2 && src.charCodeAt(pos + 1) === 91) return FALLBACK_TO_INLINE_SCAN;
    if (marker === 91) return FALLBACK_TO_INLINE_SCAN;
    pos++;
  }
  return -1;
}
function parseLinkLabel(state, start, disableNested) {
  let level = 1;
  let found = false;
  let marker;
  let prevPos;
  const src = state.src;
  const max2 = state.posMax;
  const oldPos = state.pos;
  const noCloseFrom = state.__mdtsLinkLabelNoCloseFrom;
  if (typeof noCloseFrom === "number" && start + 1 >= noCloseFrom) return -1;
  const nextClose = src.indexOf("]", start + 1);
  if (nextClose < 0 || nextClose >= max2) {
    state.__mdtsLinkLabelNoCloseFrom = start + 1;
    return -1;
  }
  const fastLabelEnd = scanPlainLinkLabel(src, start, max2);
  if (fastLabelEnd !== FALLBACK_TO_INLINE_SCAN) return fastLabelEnd;
  state.pos = start + 1;
  while (state.pos < max2) {
    marker = src.charCodeAt(state.pos);
    if (marker === 93) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }
    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 91) {
      if (prevPos === state.pos - 1) level++;
      else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }
  let labelEnd = -1;
  if (found) labelEnd = state.pos;
  state.pos = oldPos;
  return labelEnd;
}
var parse_link_label_default = parseLinkLabel;
function parseLinkTitle(str, start, max2, prev_state) {
  let code$1;
  let pos = start;
  const state = {
    ok: false,
    can_continue: false,
    pos: 0,
    str: "",
    marker: 0
  };
  if (prev_state) {
    state.str = prev_state.str;
    state.marker = prev_state.marker;
  } else {
    if (pos >= max2) return state;
    let marker = str.charCodeAt(pos);
    if (marker !== 34 && marker !== 39 && marker !== 40) return state;
    start++;
    pos++;
    if (marker === 40) marker = 41;
    state.marker = marker;
  }
  while (pos < max2) {
    code$1 = str.charCodeAt(pos);
    if (code$1 === state.marker) {
      state.pos = pos + 1;
      state.str += str.slice(start, pos);
      state.ok = true;
      return state;
    } else if (code$1 === 40 && state.marker === 41) return state;
    else if (code$1 === 92 && pos + 1 < max2) pos++;
    pos++;
  }
  state.can_continue = true;
  state.str += str.slice(start, pos);
  return state;
}
var parse_link_title_default = parseLinkTitle;
function attrIndex(token, name) {
  if (!token.attrs) return -1;
  for (let i2 = 0; i2 < token.attrs.length; i2++) if (token.attrs[i2][0] === name) return i2;
  return -1;
}
function attrPush(token, attrData) {
  if (!token.attrs) token.attrs = [];
  token.attrs.push(attrData);
}
function attrSet(token, name, value) {
  const idx = attrIndex(token, name);
  const attrData = [name, value];
  if (idx < 0) attrPush(token, attrData);
  else token.attrs[idx] = attrData;
}
function attrGet(token, name) {
  const idx = attrIndex(token, name);
  if (idx >= 0) return token.attrs[idx][1];
  return null;
}
function attrJoin(token, name, value) {
  const idx = attrIndex(token, name);
  if (idx < 0) attrPush(token, [name, value]);
  else token.attrs[idx][1] = `${token.attrs[idx][1]} ${value}`;
}
var helpers_exports = __export({
  attrGet: () => attrGet,
  attrIndex: () => attrIndex,
  attrJoin: () => attrJoin,
  attrPush: () => attrPush,
  attrSet: () => attrSet,
  parseLinkDestination: () => parseLinkDestination,
  parseLinkLabel: () => parseLinkLabel,
  parseLinkTitle: () => parseLinkTitle
});
var BAD_PROTO_RE = /^(?:vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(?:gif|png|jpeg|webp);/;
var RECODE_HOSTNAME_FOR = [
  "http:",
  "https:",
  "mailto:"
];
function validateLink(url) {
  const str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
}
function normalizeLink(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.includes(parsed.protocol)) try {
      parsed.hostname = import_punycode.default.toASCII(parsed.hostname);
    } catch {
    }
  }
  return encode_default(format(parsed));
}
function normalizeLinkText(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.includes(parsed.protocol)) try {
      parsed.hostname = import_punycode.default.toUnicode(parsed.hostname);
    } catch {
    }
  }
  return decode_default(format(parsed), `${decode_default.defaultChars}%`);
}
function setStrategyDiagnostics(env, info) {
  if (!env) return;
  try {
    env.__mdtsStrategyInfo = info;
  } catch {
  }
}
var Token = class {
  constructor(type, tag, nesting) {
    /**
    * Token#type -> String
    *
    * Type of the token (string, e.g. "paragraph_open")
    */
    __publicField(this, "type");
    /**
    * Token#tag -> String
    *
    * html tag name, e.g. "p"
    */
    __publicField(this, "tag");
    /**
    * Token#attrs -> Array
    *
    * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
    */
    __publicField(this, "attrs");
    /**
    * Token#map -> Array
    *
    * Source map info. Format: `[ line_begin, line_end ]`
    */
    __publicField(this, "map");
    /**
    * Token#nesting -> Number
    *
    * Level change (number in {-1, 0, 1} set), where:
    *
    * -  `1` means the tag is opening
    * -  `0` means the tag is self-closing
    * - `-1` means the tag is closing
    */
    __publicField(this, "nesting");
    /**
    * Token#level -> Number
    *
    * nesting level, the same as `state.level`
    */
    __publicField(this, "level");
    /**
    * Token#children -> Array
    *
    * An array of child nodes (inline and img tokens)
    */
    __publicField(this, "children");
    /**
    * Token#content -> String
    *
    * In a case of self-closing tag (code, html, fence, etc.),
    * it has contents of this tag.
    */
    __publicField(this, "content");
    /**
    * Token#markup -> String
    *
    * '*' or '_' for emphasis, fence string for fence, etc.
    */
    __publicField(this, "markup");
    /**
    * Token#info -> String
    *
    * Additional information:
    *
    * - Info string for "fence" tokens
    * - The value "auto" for autolink "link_open" and "link_close" tokens
    * - The string value of the item marker for ordered-list "list_item_open" tokens
    */
    __publicField(this, "info");
    /**
    * Token#meta -> Object
    *
    * A place for plugins to store an arbitrary data
    */
    __publicField(this, "meta");
    /**
    * Token#block -> Boolean
    *
    * True for block-level tokens, false for inline tokens.
    * Used in renderer to calculate line breaks
    */
    __publicField(this, "block");
    /**
    * Token#hidden -> Boolean
    *
    * If it's true, ignore this element when rendering. Used for tight lists
    * to hide paragraphs.
    */
    __publicField(this, "hidden");
    this.type = type;
    this.tag = tag;
    this.attrs = null;
    this.map = null;
    this.nesting = nesting;
    this.level = 0;
    this.children = null;
    this.content = "";
    this.markup = "";
    this.info = "";
    this.meta = null;
    this.block = false;
    this.hidden = false;
  }
  /**
  * Token.attrIndex(name) -> Number
  *
  * Search attribute index by name.
  */
  attrIndex(name) {
    if (!this.attrs) return -1;
    const attrs = this.attrs;
    for (let i2 = 0, len = attrs.length; i2 < len; i2++) if (attrs[i2][0] === name) return i2;
    return -1;
  }
  /**
  * Token.attrPush(attrData)
  *
  * Add `[ name, value ]` attribute to list. Init attrs if necessary
  */
  attrPush(attrData) {
    if (this.attrs) this.attrs.push(attrData);
    else this.attrs = [attrData];
  }
  /**
  * Token.attrSet(name, value)
  *
  * Set `name` attribute to `value`. Override old value if exists.
  */
  attrSet(name, value) {
    const idx = this.attrIndex(name);
    const attrData = [name, value];
    if (idx < 0) this.attrPush(attrData);
    else this.attrs[idx] = attrData;
  }
  /**
  * Token.attrGet(name)
  *
  * Get the value of attribute `name`, or null if it does not exist.
  */
  attrGet(name) {
    const idx = this.attrIndex(name);
    let value = null;
    if (idx >= 0) value = this.attrs[idx][1];
    return value;
  }
  /**
  * Token.attrJoin(name, value)
  *
  * Join value to existing attribute via space. Or create new attribute if not
  * exists. Useful to operate with token classes.
  */
  attrJoin(name, value) {
    const idx = this.attrIndex(name);
    if (idx < 0) this.attrPush([name, value]);
    else this.attrs[idx][1] = `${this.attrs[idx][1]} ${value}`;
  }
};
function hasNormalizationChars(src) {
  return src.includes("\r") || src.includes("\0");
}
function sourceToString(src) {
  return typeof src === "string" ? src : src.toString();
}
function block(state) {
  if (state.inlineMode) {
    const token = new Token("inline", "", 0);
    token.content = sourceToString(state.src);
    token.map = [0, 1];
    token.children = [];
    token.level = 0;
    state.tokens.push(token);
  } else if (state.md && state.md.block) state.md.block.parse(state.src, state.md, state.env, state.tokens);
}
var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function autolink(state, silent) {
  let pos = state.pos;
  const src = state.src;
  if (src.charCodeAt(pos) !== 60) return false;
  const start = pos;
  const max2 = state.posMax;
  for (; ; ) {
    if (++pos >= max2) return false;
    const ch = src.charCodeAt(pos);
    if (ch === 60) return false;
    if (ch === 62) break;
  }
  const url = src.slice(start + 1, pos);
  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) return false;
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(`mailto:${url}`);
    if (!state.md.validateLink(fullUrl)) return false;
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  return false;
}
var autolink_default = autolink;
function backticks(state, silent) {
  const src = state.src;
  let pos = state.pos;
  if (src.charCodeAt(pos) !== 96) return false;
  const start = pos;
  pos++;
  const max2 = state.posMax;
  while (pos < max2 && src.charCodeAt(pos) === 96) pos++;
  const marker = src.slice(start, pos);
  const openerLength = marker.length;
  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }
  let matchEnd = pos;
  let matchStart;
  while ((matchStart = src.indexOf("`", matchEnd)) !== -1) {
    matchEnd = matchStart + 1;
    while (matchEnd < max2 && src.charCodeAt(matchEnd) === 96) matchEnd++;
    const closerLength = matchEnd - matchStart;
    if (closerLength === openerLength) {
      if (!silent) {
        const token = state.push("code_inline", "code", 0);
        token.markup = marker;
        let content = src.slice(pos, matchStart);
        if (content.includes("\n")) content = content.replace(/\n/g, " ");
        if (content.length > 2 && content.charCodeAt(0) === 32 && content.charCodeAt(content.length - 1) === 32) content = content.slice(1, -1);
        token.content = content;
      }
      state.pos = matchEnd;
      return true;
    }
    state.backticks[closerLength] = matchStart;
  }
  state.backticksScanned = true;
  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true;
}
var backticks_default = backticks;
function processDelimiters(delimiters) {
  const openersBottom = {};
  const max2 = delimiters.length;
  if (!max2) return;
  let headerIdx = 0;
  let lastTokenIdx = -2;
  const jumps = [];
  for (let closerIdx = 0; closerIdx < max2; closerIdx++) {
    const closer = delimiters[closerIdx];
    jumps.push(0);
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) headerIdx = closerIdx;
    lastTokenIdx = closer.token;
    closer.length = closer.length || 0;
    if (!closer.close) continue;
    if (!Object.prototype.hasOwnProperty.call(openersBottom, closer.marker)) openersBottom[closer.marker] = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
    let openerIdx = headerIdx - jumps[headerIdx] - 1;
    let newMinOpenerIdx = openerIdx;
    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];
      if (opener.marker !== closer.marker) continue;
      if (opener.open && opener.end < 0) {
        let isOddMatch = false;
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) isOddMatch = true;
          }
        }
        if (!isOddMatch) {
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;
          closer.open = false;
          opener.end = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          lastTokenIdx = -2;
          break;
        }
      }
    }
    if (newMinOpenerIdx !== -1) openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
  }
}
function balance_pairs(state) {
  const tokens_meta = state.tokens_meta;
  const max2 = state.tokens_meta.length;
  processDelimiters(state.delimiters);
  for (let curr = 0; curr < max2; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) processDelimiters(tokens_meta[curr].delimiters);
}
var balance_pairs_default = balance_pairs;
function emphasis_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) return false;
  if (marker !== 95 && marker !== 42) return false;
  const scanned = state.scanDelims(state.pos, marker === 42);
  if (!scanned || scanned.length === 0) return false;
  for (let i2 = 0; i2 < scanned.length; i2++) {
    const token = state.push("text", "", 0);
    token.content = String.fromCharCode(marker);
    state.delimiters.push({
      marker,
      length: scanned.length,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess$1(state, delimiters) {
  const max2 = delimiters.length;
  for (let i2 = max2 - 1; i2 >= 0; i2--) {
    const startDelim = delimiters[i2];
    if (startDelim.marker !== 95 && startDelim.marker !== 42) continue;
    if (startDelim.end === -1) continue;
    const endDelim = delimiters[startDelim.end];
    const isStrong = i2 > 0 && delimiters[i2 - 1].end === startDelim.end + 1 && delimiters[i2 - 1].marker === startDelim.marker && delimiters[i2 - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1;
    const ch = String.fromCharCode(startDelim.marker);
    const token_o = state.tokens[startDelim.token];
    token_o.type = isStrong ? "strong_open" : "em_open";
    token_o.tag = isStrong ? "strong" : "em";
    token_o.nesting = 1;
    token_o.markup = isStrong ? ch + ch : ch;
    token_o.content = "";
    const token_c = state.tokens[endDelim.token];
    token_c.type = isStrong ? "strong_close" : "em_close";
    token_c.tag = isStrong ? "strong" : "em";
    token_c.nesting = -1;
    token_c.markup = isStrong ? ch + ch : ch;
    token_c.content = "";
    if (isStrong) {
      state.tokens[delimiters[i2 - 1].token].content = "";
      state.tokens[delimiters[startDelim.end + 1].token].content = "";
      i2--;
    }
  }
}
function emphasis_postProcess(state) {
  const tokens_meta = state.tokens_meta;
  const max2 = state.tokens_meta.length;
  postProcess$1(state, state.delimiters);
  for (let curr = 0; curr < max2; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess$1(state, tokens_meta[curr].delimiters);
}
var emphasis = {
  tokenize: emphasis_tokenize,
  postProcess: emphasis_postProcess
};
var entities = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " "
};
function isValidEntityCode(code$1) {
  if (code$1 >= 55296 && code$1 <= 57343) return false;
  if (code$1 >= 1114111) return false;
  return true;
}
function fromCodePoint(code$1) {
  return String.fromCodePoint(code$1);
}
function decodeHTML$1(str) {
  if (str.length >= 4 && str.charCodeAt(0) === 38 && str.charCodeAt(str.length - 1) === 59) {
    const name = str.slice(1, -1).toLowerCase();
    if (entities[name]) return entities[name];
  }
  return str;
}
function isDigit$1(code$1) {
  return code$1 >= 48 && code$1 <= 57;
}
function isHexDigit(code$1) {
  const lower = code$1 | 32;
  return isDigit$1(code$1) || lower >= 97 && lower <= 102;
}
function isAsciiLetter$1(code$1) {
  const lower = code$1 | 32;
  return lower >= 97 && lower <= 122;
}
function isAsciiAlphaNum(code$1) {
  return isAsciiLetter$1(code$1) || isDigit$1(code$1);
}
function scanNumericEntity(src, start, max2) {
  let pos = start + 2;
  if (pos >= max2) return null;
  let isHex = false;
  let digitLimit = 7;
  let digitStart = pos;
  if ((src.charCodeAt(pos) | 32) === 120) {
    isHex = true;
    digitLimit = 6;
    pos++;
    digitStart = pos;
  }
  while (pos < max2 && pos - digitStart < digitLimit) {
    const ch = src.charCodeAt(pos);
    if (!(isHex ? isHexDigit(ch) : isDigit$1(ch))) break;
    pos++;
  }
  if (pos === digitStart || pos >= max2) return null;
  if (src.charCodeAt(pos) !== 59) return null;
  return src.slice(start, pos + 1);
}
function scanNamedEntity(src, start, max2) {
  let pos = start + 1;
  if (pos >= max2 || !isAsciiLetter$1(src.charCodeAt(pos))) return null;
  pos++;
  while (pos < max2 && pos - start - 1 < 32 && isAsciiAlphaNum(src.charCodeAt(pos))) pos++;
  if (pos - start - 1 < 2 || pos >= max2 || src.charCodeAt(pos) !== 59) return null;
  const markup = src.slice(start, pos + 1);
  return decodeHTML$1(markup) !== markup ? markup : null;
}
function entity(state, silent) {
  const pos = state.pos;
  const max2 = state.posMax;
  if (state.src.charCodeAt(pos) !== 38) return false;
  if (pos + 1 >= max2) return false;
  if (state.src.charCodeAt(pos + 1) === 35) {
    const markup = scanNumericEntity(state.src, pos, max2);
    if (markup) {
      if (!silent) {
        const code$1 = (markup.charCodeAt(2) | 32) === 120 ? Number.parseInt(markup.slice(3, -1), 16) : Number.parseInt(markup.slice(2, -1), 10);
        const token = state.push("text_special", "", 0);
        token.content = isValidEntityCode(code$1) ? fromCodePoint(code$1) : fromCodePoint(65533);
        token.markup = markup;
        token.info = "entity";
      }
      state.pos += markup.length;
      return true;
    }
  } else {
    const markup = scanNamedEntity(state.src, pos, max2);
    if (markup) {
      const decoded = decodeHTML$1(markup);
      if (!silent) {
        const token = state.push("text_special", "", 0);
        token.content = decoded;
        token.markup = markup;
        token.info = "entity";
      }
      state.pos += markup.length;
      return true;
    }
  }
  return false;
}
var entity_default = entity;
var ESCAPED = (() => {
  const table$1 = new Array(256).fill(0);
  const chars = "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-";
  for (let i2 = 0; i2 < 32; i2++) table$1[chars.charCodeAt(i2)] = 1;
  return table$1;
})();
var ESCAPED_MARKUP = new Array(128);
var ESCAPED_CONTENT = new Array(128);
for (let i2 = 0; i2 < 128; i2++) {
  const ch = String.fromCharCode(i2);
  ESCAPED_MARKUP[i2] = `\\${ch}`;
  ESCAPED_CONTENT[i2] = ESCAPED[i2] ? ch : ESCAPED_MARKUP[i2];
}
function pushEscapeToken(state, content, markup) {
  if (state.pending) state.pushPending();
  const token = new Token("text_special", "", 0);
  token.level = state.level;
  token.content = content;
  token.markup = markup;
  token.info = "escape";
  state.pendingLevel = state.level;
  state.tokens.push(token);
  state.tokens_meta.push(null);
}
function escape(state, silent) {
  let pos = state.pos;
  const max2 = state.posMax;
  const src = state.src;
  if (src.charCodeAt(pos) !== 92) return false;
  pos++;
  if (pos >= max2) return false;
  let ch = src.charCodeAt(pos);
  if (ch === 10) {
    if (!silent) state.push("hardbreak", "br", 0);
    pos++;
    while (pos < max2) {
      ch = src.charCodeAt(pos);
      if (ch !== 9 && ch !== 32) break;
      pos++;
    }
    state.pos = pos;
    return true;
  }
  if (ch < 128) {
    if (silent) {
      state.pos = pos + 1;
      return true;
    }
    pushEscapeToken(state, ESCAPED_CONTENT[ch], ESCAPED_MARKUP[ch]);
    state.pos = pos + 1;
    return true;
  }
  if (silent) {
    if (ch >= 55296 && ch <= 56319 && pos + 1 < max2) {
      const ch2 = src.charCodeAt(pos + 1);
      if (ch2 >= 56320 && ch2 <= 57343) pos++;
    }
    state.pos = pos + 1;
    return true;
  }
  let escapedStr = src.charAt(pos);
  if (ch >= 55296 && ch <= 56319 && pos + 1 < max2) {
    const ch2 = src.charCodeAt(pos + 1);
    if (ch2 >= 56320 && ch2 <= 57343) {
      escapedStr += src.charAt(pos + 1);
      pos++;
    }
  }
  const origStr = `\\${escapedStr}`;
  pushEscapeToken(state, ch < 256 && ESCAPED[ch] ? escapedStr : origStr, origStr);
  state.pos = pos + 1;
  return true;
}
var escape_default = escape;
function fragments_join(state) {
  var _a3;
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max2 = state.tokens.length;
  for (curr = last = 0; curr < max2; curr++) {
    const token = tokens[curr];
    if (!token) continue;
    if (token.nesting && token.nesting < 0) level--;
    token.level = level;
    if (token.nesting && token.nesting > 0) level++;
    if (token.type === "text" && curr + 1 < max2 && ((_a3 = tokens[curr + 1]) == null ? void 0 : _a3.type) === "text") tokens[curr + 1].content = token.content + tokens[curr + 1].content;
    else {
      if (curr !== last) tokens[last] = token;
      last++;
    }
  }
  if (curr !== last) tokens.length = last;
}
var fragments_join_default = fragments_join;
var open_tag = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`;
var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
var HTML_TAG_RE = new RegExp(`^(?:${open_tag}|${close_tag}|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<\\?[\\s\\S]*?\\?>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`);
var HTML_OPEN_CLOSE_TAG_RE = new RegExp(`^(?:${open_tag}|${close_tag})`);
function isHtmlSpace(code$1) {
  return code$1 === 32 || code$1 === 9 || code$1 === 10 || code$1 === 12 || code$1 === 13;
}
function isLinkOpen$1(str) {
  if (str.length < 3) return false;
  if (str.charCodeAt(0) !== 60) return false;
  if ((str.charCodeAt(1) | 32) !== 97) return false;
  const ch = str.charCodeAt(2);
  return ch === 62 || isHtmlSpace(ch);
}
function isLinkClose$1(str) {
  if (str.length < 4) return false;
  if (str.charCodeAt(0) !== 60 || str.charCodeAt(1) !== 47) return false;
  if ((str.charCodeAt(2) | 32) !== 97) return false;
  for (let i2 = 3; i2 < str.length; i2++) {
    const ch = str.charCodeAt(i2);
    if (ch === 62) return true;
    if (!isHtmlSpace(ch)) return false;
  }
  return false;
}
function isLetter(ch) {
  const lc = ch | 32;
  return lc >= 97 && lc <= 122;
}
function html_inline(state, silent) {
  if (!state.md.options.html) return false;
  const max2 = state.posMax;
  const pos = state.pos;
  const src = state.src;
  if (src.charCodeAt(pos) !== 60 || pos + 2 >= max2) return false;
  const ch = src.charCodeAt(pos + 1);
  if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) return false;
  const match2 = src.slice(pos).match(HTML_TAG_RE);
  if (!match2) return false;
  const markup = match2[0];
  if (!silent) {
    const token = state.pushSimple("html_inline", "");
    token.content = markup;
    if (isLinkOpen$1(markup)) state.linkLevel++;
    if (isLinkClose$1(markup)) state.linkLevel--;
  }
  state.pos += markup.length;
  return true;
}
var html_inline_default = html_inline;
function image(state, silent) {
  let code$1, content, label, pos, ref2, res, title, start;
  let href = "";
  const oldPos = state.pos;
  const max2 = state.posMax;
  if (state.src.charCodeAt(state.pos) !== 33) return false;
  if (state.src.charCodeAt(state.pos + 1) !== 91) return false;
  const labelStart = state.pos + 2;
  const labelEnd = parse_link_label_default(state, state.pos + 1, false);
  if (labelEnd < 0) return false;
  pos = labelEnd + 1;
  if (pos < max2 && state.src.charCodeAt(pos) === 40) {
    pos++;
    for (; pos < max2; pos++) {
      code$1 = state.src.charCodeAt(pos);
      if (code$1 !== 32 && code$1 !== 10) break;
    }
    if (pos >= max2) return false;
    res = parse_link_destination_default(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) pos = res.pos;
      else href = "";
      start = pos;
      for (; pos < max2; pos++) {
        code$1 = state.src.charCodeAt(pos);
        if (code$1 !== 32 && code$1 !== 10) break;
      }
      res = parse_link_title_default(state.src, pos, state.posMax);
      if (pos < max2 && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max2; pos++) {
          code$1 = state.src.charCodeAt(pos);
          if (code$1 !== 32 && code$1 !== 10) break;
        }
      } else title = "";
    }
    if (pos >= max2 || state.src.charCodeAt(pos) !== 41) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    if (typeof state.env.references === "undefined") return false;
    if (pos < max2 && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = parse_link_label_default(state, pos);
      if (pos >= 0) label = state.src.slice(start, pos++);
      else pos = labelEnd + 1;
    } else pos = labelEnd + 1;
    if (!label) label = state.src.slice(labelStart, labelEnd);
    ref2 = state.env.references[normalizeReference(label)];
    if (!ref2) {
      state.pos = oldPos;
      return false;
    }
    href = ref2.href;
    title = ref2.title;
  }
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    const tokens = [];
    state.md.inline.parse(content, state.md, state.env, tokens);
    const token = state.push("image", "img", 0);
    token.attrs = [["src", href], ["alt", ""]];
    token.children = tokens;
    token.content = content;
    if (title) token.attrs.push(["title", title]);
  }
  state.pos = pos;
  state.posMax = max2;
  return true;
}
var image_default = image;
function link(state, silent) {
  let code$1, label, res, ref2;
  let href = "";
  let title = "";
  let start = state.pos;
  let parseReference = true;
  if (state.src.charCodeAt(state.pos) !== 91) return false;
  const oldPos = state.pos;
  const max2 = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = parse_link_label_default(state, state.pos, true);
  if (labelEnd < 0) return false;
  let pos = labelEnd + 1;
  if (pos < max2 && state.src.charCodeAt(pos) === 40) {
    parseReference = false;
    pos++;
    for (; pos < max2; pos++) {
      code$1 = state.src.charCodeAt(pos);
      if (code$1 !== 32 && code$1 !== 10) break;
    }
    if (pos >= max2) return false;
    res = parse_link_destination_default(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) pos = res.pos;
      else href = "";
      start = pos;
      for (; pos < max2; pos++) {
        code$1 = state.src.charCodeAt(pos);
        if (code$1 !== 32 && code$1 !== 10) break;
      }
      res = parse_link_title_default(state.src, pos, state.posMax);
      if (pos < max2 && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max2; pos++) {
          code$1 = state.src.charCodeAt(pos);
          if (code$1 !== 32 && code$1 !== 10) break;
        }
      }
    }
    if (pos >= max2 || state.src.charCodeAt(pos) !== 41) parseReference = true;
    pos++;
  }
  if (parseReference) {
    if (typeof state.env.references === "undefined") return false;
    if (pos < max2 && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = parse_link_label_default(state, pos);
      if (pos >= 0) label = state.src.slice(start, pos++);
      else pos = labelEnd + 1;
    } else pos = labelEnd + 1;
    if (!label) label = state.src.slice(labelStart, labelEnd);
    ref2 = state.env.references[normalizeReference(label)];
    if (!ref2) {
      state.pos = oldPos;
      return false;
    }
    href = ref2.href;
    title = ref2.title;
  }
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    const token_o = state.push("link_open", "a", 1);
    const attrs = [["href", href]];
    token_o.attrs = attrs;
    if (title) attrs.push(["title", title]);
    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;
    state.push("link_close", "a", -1);
  }
  state.pos = pos;
  state.posMax = max2;
  return true;
}
var link_default = link;
function isAsciiLetter(code$1) {
  const lower = code$1 | 32;
  return lower >= 97 && lower <= 122;
}
function isDigit(code$1) {
  return code$1 >= 48 && code$1 <= 57;
}
function isSchemeChar(code$1) {
  return isAsciiLetter(code$1) || isDigit(code$1) || code$1 === 43 || code$1 === 45 || code$1 === 46;
}
function extractTrailingScheme(pending) {
  if (pending.length === 0) return null;
  let start = pending.length - 1;
  while (start >= 0 && isSchemeChar(pending.charCodeAt(start))) start--;
  start++;
  if (start >= pending.length || !isAsciiLetter(pending.charCodeAt(start))) return null;
  return pending.slice(start);
}
function scanLinkifyCandidate(src, start, max2) {
  let end = start;
  while (end < max2) {
    const ch = src.charCodeAt(end);
    if (ch <= 32 || ch === 127 || ch === 60) break;
    end++;
  }
  return src.slice(start, end);
}
function linkify$1(state, silent) {
  if (!state.md.options.linkify) return false;
  if (state.linkLevel > 0) return false;
  const pos = state.pos;
  const max2 = state.posMax;
  if (pos + 3 > max2) return false;
  if (state.src.charCodeAt(pos) !== 58) return false;
  if (state.src.charCodeAt(pos + 1) !== 47) return false;
  if (state.src.charCodeAt(pos + 2) !== 47) return false;
  const proto = extractTrailingScheme(state.pending);
  if (!proto) return false;
  const candidate = scanLinkifyCandidate(state.src, pos - proto.length, max2);
  const link$1 = state.md.linkify.matchAtStart(candidate);
  if (!link$1) return false;
  let url = link$1.url;
  if (url.length <= proto.length) return false;
  url = url.replace(/\*+$/, "");
  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl)) return false;
  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);
    const token_o = state.push("link_open", "a", 1);
    token_o.attrs = [["href", fullUrl]];
    token_o.markup = "linkify";
    token_o.info = "auto";
    const token_t = state.push("text", "", 0);
    token_t.content = state.md.normalizeLinkText(url);
    const token_c = state.push("link_close", "a", -1);
    token_c.markup = "linkify";
    token_c.info = "auto";
  }
  state.pos += url.length - proto.length;
  return true;
}
function newline(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 10) return false;
  const pmax = state.pending.length - 1;
  const max2 = state.posMax;
  if (!silent) if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
    let ws = pmax - 1;
    while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
    state.pending = state.pending.slice(0, ws);
    state.pushSimple("hardbreak", "br");
  } else {
    state.pending = state.pending.slice(0, -1);
    state.pushSimple("softbreak", "br");
  }
  else state.pushSimple("softbreak", "br");
  pos++;
  while (pos < max2) {
    const ch = state.src.charCodeAt(pos);
    if (ch !== 9 && ch !== 32) break;
    pos++;
  }
  state.pos = pos;
  return true;
}
var newline_default = newline;
function strikethrough_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) return false;
  if (marker !== 126) return false;
  const scanned = state.scanDelims(state.pos, true);
  if (!scanned) return false;
  let len = scanned.length;
  const ch = String.fromCharCode(marker);
  if (len < 2) return false;
  let token;
  if (len % 2) {
    token = state.push("text", "", 0);
    token.content = ch;
    len--;
  }
  for (let i2 = 0; i2 < len; i2 += 2) {
    token = state.push("text", "", 0);
    token.content = ch + ch;
    state.delimiters.push({
      marker,
      length: 0,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess(state, delimiters) {
  let token;
  const loneMarkers = [];
  const max2 = delimiters.length;
  for (let i2 = 0; i2 < max2; i2++) {
    const startDelim = delimiters[i2];
    if (startDelim.marker !== 126) continue;
    if (startDelim.end === -1) continue;
    const endDelim = delimiters[startDelim.end];
    token = state.tokens[startDelim.token];
    token.type = "s_open";
    token.tag = "s";
    token.nesting = 1;
    token.markup = "~~";
    token.content = "";
    token = state.tokens[endDelim.token];
    token.type = "s_close";
    token.tag = "s";
    token.nesting = -1;
    token.markup = "~~";
    token.content = "";
    if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") loneMarkers.push(endDelim.token - 1);
  }
  while (loneMarkers.length) {
    const i2 = loneMarkers.pop();
    let j = i2 + 1;
    while (j < state.tokens.length && state.tokens[j].type === "s_close") j++;
    j--;
    if (i2 !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i2];
      state.tokens[i2] = token;
    }
  }
}
function strikethrough_postProcess(state) {
  const delimiters = state.delimiters;
  postProcess(state, delimiters);
  const tokens_meta = state.tokens_meta;
  if (tokens_meta) {
    for (let curr = 0; curr < tokens_meta.length; curr++) if (tokens_meta[curr] && tokens_meta[curr].delimiters) postProcess(state, tokens_meta[curr].delimiters);
  }
}
var strikethrough = {
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
};
function isTerminatorChar(ch) {
  switch (ch) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function text(state, silent) {
  const src = state.src;
  const start = state.pos;
  const max2 = state.posMax;
  if (start >= max2 || isTerminatorChar(src.charCodeAt(start))) return false;
  let pos = start + 1;
  while (pos < max2 && !isTerminatorChar(src.charCodeAt(pos))) pos++;
  if (!silent) state.pending += pos === start + 1 ? src.charAt(start) : src.slice(start, pos);
  state.pos = pos;
  return true;
}
var text_default = text;
var InlineRuler = class {
  constructor() {
    __publicField(this, "rules", []);
    __publicField(this, "cache", null);
    __publicField(this, "namedCache", null);
    __publicField(this, "version", 0);
  }
  invalidateCache() {
    this.cache = null;
    this.namedCache = null;
    this.version++;
  }
  /**
  * Push new rule to the end of chain
  */
  push(name, fn2, options) {
    const idx = this.rules.findIndex((r2) => r2.name === name);
    if (idx >= 0) this.rules.splice(idx, 1);
    this.rules.push({
      name,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || [],
      enabled: true
    });
    this.invalidateCache();
  }
  at(name) {
    return this.rules.find((rule) => rule.name === name);
  }
  before(beforeName, name, fn2, options) {
    const i2 = this.rules.findIndex((r2) => r2.name === beforeName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${beforeName}`);
    const exists = this.rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this.rules.splice(exists, 1);
    this.rules.splice(i2, 0, {
      name,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || [],
      enabled: true
    });
    this.invalidateCache();
  }
  after(afterName, name, fn2, options) {
    const i2 = this.rules.findIndex((r2) => r2.name === afterName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${afterName}`);
    const exists = this.rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this.rules.splice(exists, 1);
    this.rules.splice(i2 + 1, 0, {
      name,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || [],
      enabled: true
    });
    this.invalidateCache();
  }
  enable(names, ignoreInvalid) {
    const list$1 = Array.isArray(names) ? names : [names];
    const changed = [];
    for (const n2 of list$1) {
      const idx = this.rules.findIndex((r2) => r2.name === n2);
      if (idx < 0) {
        if (!ignoreInvalid) throw new Error(`Rules manager: invalid rule name ${n2}`);
        continue;
      }
      if (!this.rules[idx].enabled) {
        this.rules[idx].enabled = true;
        changed.push(n2);
      }
    }
    if (changed.length) this.invalidateCache();
    return changed;
  }
  disable(names, ignoreInvalid) {
    const list$1 = Array.isArray(names) ? names : [names];
    const changed = [];
    for (const n2 of list$1) {
      const idx = this.rules.findIndex((r2) => r2.name === n2);
      if (idx < 0) {
        if (!ignoreInvalid) throw new Error(`Rules manager: invalid rule name ${n2}`);
        continue;
      }
      if (this.rules[idx].enabled) {
        this.rules[idx].enabled = false;
        changed.push(n2);
      }
    }
    if (changed.length) this.invalidateCache();
    return changed;
  }
  enableOnly(names) {
    const allow = new Set(names);
    let changed = false;
    for (const r2 of this.rules) {
      const next = allow.has(r2.name);
      if (r2.enabled !== next) {
        r2.enabled = next;
        changed = true;
      }
    }
    if (changed) this.invalidateCache();
  }
  /**
  * Get rules for specified chain name (or empty string for default)
  */
  getRules(chainName) {
    const chain = chainName || "";
    if (!this.cache) this.compileCache();
    return this.cache.get(chain) ?? [];
  }
  getNamedRules(chainName) {
    const chain = chainName || "";
    if (!this.namedCache) this.compileCache();
    return this.namedCache.get(chain) ?? [];
  }
  compileCache() {
    var _a3;
    const chains = /* @__PURE__ */ new Set([""]);
    for (const rule of this.rules) {
      if (!rule.enabled) continue;
      if (rule.alt) for (const alt of rule.alt) chains.add(alt);
    }
    const cache = /* @__PURE__ */ new Map();
    const namedCache = /* @__PURE__ */ new Map();
    for (const chain of chains) {
      const bucket = [];
      const namedBucket = [];
      for (const rule of this.rules) {
        if (!rule.enabled) continue;
        if (chain !== "" && !((_a3 = rule.alt) == null ? void 0 : _a3.includes(chain))) continue;
        bucket.push(rule.fn);
        namedBucket.push({
          name: rule.name,
          fn: rule.fn
        });
      }
      cache.set(chain, bucket);
      namedCache.set(chain, namedBucket);
    }
    this.cache = cache;
    this.namedCache = namedCache;
  }
};
var StateInline = class {
  constructor(src, md, env, outTokens) {
    __publicField(this, "src");
    __publicField(this, "md");
    __publicField(this, "env");
    __publicField(this, "tokens");
    __publicField(this, "tokens_meta");
    __publicField(this, "pos");
    __publicField(this, "posMax");
    __publicField(this, "level");
    __publicField(this, "pending");
    __publicField(this, "pendingLevel");
    __publicField(this, "cache");
    __publicField(this, "delimiters");
    __publicField(this, "_prev_delimiters");
    __publicField(this, "backticks");
    __publicField(this, "backticksScanned");
    __publicField(this, "linkLevel");
    __publicField(this, "maxNesting");
    this.src = src;
    this.md = md;
    this.env = env;
    this.tokens = outTokens;
    this.tokens_meta = new Array(outTokens.length);
    this.pos = 0;
    this.posMax = src.length;
    this.level = 0;
    this.pending = "";
    this.pendingLevel = 0;
    this.cache = [];
    this.delimiters = [];
    this._prev_delimiters = [];
    this.backticks = {};
    this.backticksScanned = false;
    this.linkLevel = 0;
    this.maxNesting = md.options.maxNesting;
  }
  /**
  * Push pending text as a text token
  */
  pushPending() {
    const token = new Token("text", "", 0);
    token.content = this.pending;
    token.level = this.pendingLevel;
    this.tokens.push(token);
    this.pending = "";
    return token;
  }
  pushSimple(type, tag) {
    if (this.pending) this.pushPending();
    const token = new Token(type, tag, 0);
    token.level = this.level;
    this.pendingLevel = this.level;
    this.tokens.push(token);
    this.tokens_meta.push(null);
    return token;
  }
  /**
  * Push a new token to the output
  */
  push(type, tag, nesting) {
    if (this.pending) this.pushPending();
    if (nesting === 0) return this.pushSimple(type, tag);
    const token = new Token(type, tag, nesting);
    let token_meta = null;
    if (nesting < 0) {
      this.level--;
      this.delimiters = this._prev_delimiters.pop();
    }
    token.level = this.level;
    if (nesting > 0) {
      this.level++;
      this._prev_delimiters.push(this.delimiters);
      this.delimiters = [];
      token_meta = { delimiters: this.delimiters };
    }
    this.pendingLevel = this.level;
    this.tokens.push(token);
    this.tokens_meta.push(token_meta);
    return token;
  }
  /**
  * Scan delimiter run (for emphasis)
  */
  scanDelims(start, canSplitWord) {
    const { src, posMax } = this;
    const marker = src.charCodeAt(start);
    let pos = start;
    while (pos < posMax && src.charCodeAt(pos) === marker) pos++;
    const count = pos - start;
    const lastChar = start > 0 ? src.charCodeAt(start - 1) : 32;
    const nextChar = pos < posMax ? src.charCodeAt(pos) : 32;
    const isLastWhiteSpace = isWhiteSpace(lastChar);
    const isNextWhiteSpace = isWhiteSpace(nextChar);
    const isLastPunctChar = isPunctCode(lastChar);
    const isNextPunctChar = isPunctCode(nextChar);
    const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
    const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
    return {
      can_open: left_flanking && (canSplitWord || !right_flanking || isLastPunctChar),
      can_close: right_flanking && (canSplitWord || !left_flanking || isNextPunctChar),
      length: count
    };
  }
};
StateInline.prototype.Token = Token;
function now() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") return performance.now();
  return Date.now();
}
function median(values) {
  if (values.length === 0) return 0;
  const sorted = values.slice().sort((a2, b) => a2 - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
function createRecord(chain, name) {
  return {
    chain,
    name,
    calls: 0,
    hits: 0,
    inclusiveMs: 0,
    medianMs: 0,
    maxMs: 0,
    normalCalls: 0,
    normalHits: 0,
    silentCalls: 0,
    silentHits: 0,
    samples: []
  };
}
function getRuleProfile(env) {
  const carrier = env;
  if (!carrier) return null;
  if (carrier.__mdtsRuleProfile) return carrier.__mdtsRuleProfile;
  if (!carrier.__mdtsProfileRules) return null;
  const meta = carrier.__mdtsProfileRules === true ? {} : carrier.__mdtsProfileRules;
  const session = {
    enabled: true,
    fixture: meta.fixture,
    mode: meta.mode,
    startedAt: now(),
    records: /* @__PURE__ */ Object.create(null)
  };
  carrier.__mdtsRuleProfile = session;
  return session;
}
function recordRuleInvocation(env, chain, name, durationMs, hit, silent) {
  const session = getRuleProfile(env);
  if (!session) return;
  const key = `${chain}:${name}`;
  const record = session.records[key] ?? (session.records[key] = createRecord(chain, name));
  record.calls++;
  record.inclusiveMs += durationMs;
  if (durationMs > record.maxMs) record.maxMs = durationMs;
  record.samples.push(durationMs);
  if (silent) {
    record.silentCalls++;
    if (hit) record.silentHits++;
  } else {
    record.normalCalls++;
    if (hit) record.normalHits++;
  }
  if (hit) record.hits++;
  session.completedAt = now();
}
function finalizeRuleProfile(env) {
  const session = getRuleProfile(env);
  if (!session) return null;
  const records = Object.keys(session.records);
  for (let i2 = 0; i2 < records.length; i2++) {
    const record = session.records[records[i2]];
    record.medianMs = median(record.samples);
  }
  session.completedAt = now();
  return session;
}
function isInlineTerminatorChar(ch) {
  switch (ch) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function isPlainInlineText(src) {
  for (let i2 = 0; i2 < src.length; i2++) if (isInlineTerminatorChar(src.charCodeAt(i2))) return false;
  return true;
}
var ParserInline = class {
  constructor() {
    __publicField(this, "ruler");
    __publicField(this, "ruler2");
    __publicField(this, "cachedRulesVersion", -1);
    __publicField(this, "cachedRules", []);
    __publicField(this, "cachedRules2Version", -1);
    __publicField(this, "cachedRules2", []);
    this.ruler = new InlineRuler();
    this.ruler2 = new InlineRuler();
    this.ruler.push("text", text_default);
    this.ruler.push("linkify", linkify$1);
    this.ruler.push("newline", newline_default);
    this.ruler.push("escape", escape_default);
    this.ruler.push("backticks", backticks_default);
    this.ruler.push("strikethrough", strikethrough.tokenize);
    this.ruler.push("emphasis", emphasis.tokenize);
    this.ruler.push("link", link_default);
    this.ruler.push("image", image_default);
    this.ruler.push("autolink", autolink_default);
    this.ruler.push("html_inline", html_inline_default);
    this.ruler.push("entity", entity_default);
    this.ruler2.push("balance_pairs", balance_pairs_default);
    this.ruler2.push("strikethrough", strikethrough.postProcess);
    this.ruler2.push("emphasis", emphasis.postProcess);
    this.ruler2.push("fragments_join", fragments_join_default);
  }
  /**
  * Skip single token by running all rules in validation mode
  */
  skipToken(state) {
    const pos = state.pos;
    const rules = this.getRules();
    const namedRules = this.ruler.getNamedRules("");
    const len = rules.length;
    const cache = state.cache;
    const cached = cache[pos];
    const shouldProfile = !!state.env && (Object.prototype.hasOwnProperty.call(state.env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(state.env, "__mdtsProfileRules"));
    if (cached !== void 0) {
      state.pos = cached;
      return;
    }
    let ok = false;
    if (state.level < state.maxNesting) for (let i2 = 0; i2 < len; i2++) {
      state.level++;
      if (!shouldProfile) ok = rules[i2](state, true);
      else {
        const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
        ok = namedRules[i2].fn(state, true);
        const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
        recordRuleInvocation(state.env, "inline", namedRules[i2].name, endedAt - startedAt, !!ok, true);
      }
      state.level--;
      if (ok) {
        if (pos >= state.pos) throw new Error("inline rule didn't increment state.pos");
        break;
      }
    }
    else state.pos = state.posMax;
    if (!ok) state.pos++;
    cache[pos] = state.pos;
  }
  /**
  * Generate tokens for input string
  */
  tokenize(state) {
    const rules = this.getRules();
    const namedRules = this.ruler.getNamedRules("");
    const len = rules.length;
    const end = state.posMax;
    const shouldProfile = !!state.env && (Object.prototype.hasOwnProperty.call(state.env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(state.env, "__mdtsProfileRules"));
    while (state.pos < end) {
      const prevPos = state.pos;
      let ok = false;
      if (state.level < state.maxNesting) for (let i2 = 0; i2 < len; i2++) {
        if (!shouldProfile) ok = rules[i2](state, false);
        else {
          const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
          ok = namedRules[i2].fn(state, false);
          const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
          recordRuleInvocation(state.env, "inline", namedRules[i2].name, endedAt - startedAt, !!ok, false);
        }
        if (ok) {
          if (prevPos >= state.pos) throw new Error("inline rule didn't increment state.pos");
          break;
        }
      }
      if (ok) {
        if (state.pos >= end) break;
        continue;
      }
      state.pending += state.src.charAt(state.pos++);
    }
    if (state.pending) state.pushPending();
  }
  /**
  * ParserInline.parse(str, md, env, outTokens)
  *
  * Process input string and push inline tokens into `outTokens`.
  * Matches the signature from original markdown-it/lib/parser_inline.mjs
  */
  parseSource(src, md, env, outTokens) {
    if (typeof src === "string" && src.length > 0 && isPlainInlineText(src)) {
      const token = new Token("text", "", 0);
      token.content = src;
      outTokens.push(token);
      return;
    }
    const state = new StateInline(src, md, env, outTokens);
    this.tokenize(state);
    const rules2 = this.getRules2();
    const namedRules2 = this.ruler2.getNamedRules("");
    const len = rules2.length;
    const shouldProfile = !!state.env && (Object.prototype.hasOwnProperty.call(state.env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(state.env, "__mdtsProfileRules"));
    for (let i2 = 0; i2 < len; i2++) if (!shouldProfile) rules2[i2](state, false);
    else {
      const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
      namedRules2[i2].fn(state, false);
      const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
      recordRuleInvocation(state.env, "inline2", namedRules2[i2].name, endedAt - startedAt, true, false);
    }
  }
  parse(str, md, env, outTokens) {
    this.parseSource(str, md, env, outTokens);
  }
  getRules() {
    if (this.cachedRulesVersion !== this.ruler.version) {
      this.cachedRules = this.ruler.getRules("");
      this.cachedRulesVersion = this.ruler.version;
    }
    return this.cachedRules;
  }
  getRules2() {
    if (this.cachedRules2Version !== this.ruler2.version) {
      this.cachedRules2 = this.ruler2.getRules("");
      this.cachedRules2Version = this.ruler2.version;
    }
    return this.cachedRules2;
  }
};
function inline(state) {
  const tokens = state.tokens;
  for (let i2 = 0, l2 = tokens.length; i2 < l2; i2++) {
    const tok = tokens[i2];
    if (tok.type === "inline" && state.md) {
      if (!tok.children) tok.children = [];
      if (tok.content.length > 0 && isPlainInlineText(tok.content)) {
        const text$1 = new Token("text", "", 0);
        text$1.content = tok.content;
        tok.children.push(text$1);
        continue;
      }
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}
var CJK_CHAR_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
var ASCII_DOMAIN_START_RE = /[0-9a-z]/i;
function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}
function trimCjkPrefixFromFuzzyLink(linkify$2, link$1) {
  var _a3;
  if (link$1.schema || link$1.index !== 0 || !link$1.raw) return link$1;
  for (let offset3 = 1; offset3 < link$1.raw.length; offset3++) {
    const prevChar = link$1.raw[offset3 - 1];
    const nextChar = link$1.raw[offset3];
    if (!CJK_CHAR_RE.test(prevChar) || !ASCII_DOMAIN_START_RE.test(nextChar)) continue;
    const suffix = link$1.raw.slice(offset3);
    const candidate = (_a3 = linkify$2.match(suffix)) == null ? void 0 : _a3[0];
    if (!candidate || candidate.index !== 0 || candidate.lastIndex !== suffix.length) continue;
    return {
      ...candidate,
      index: link$1.index + offset3,
      lastIndex: link$1.index + offset3 + candidate.lastIndex
    };
  }
  return link$1;
}
function linkify(state) {
  var _a3, _b;
  const blockTokens = state.tokens;
  if (!((_b = (_a3 = state.md) == null ? void 0 : _a3.options) == null ? void 0 : _b.linkify)) return;
  for (let j = 0; j < blockTokens.length; j++) {
    const blockToken = blockTokens[j];
    if (blockToken.type !== "inline" || !state.md.linkify.pretest(blockToken.content)) continue;
    let tokens = blockToken.children;
    if (!tokens) {
      tokens = [];
      blockToken.children = tokens;
    }
    let htmlLinkLevel = 0;
    for (let i2 = tokens.length - 1; i2 >= 0; i2--) {
      const currentToken = tokens[i2];
      if (currentToken.type === "link_close") {
        i2--;
        while (i2 >= 0 && tokens[i2].level !== currentToken.level && tokens[i2].type !== "link_open") i2--;
        continue;
      }
      if (currentToken.type === "html_inline") {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) htmlLinkLevel--;
        if (isLinkClose(currentToken.content)) htmlLinkLevel++;
      }
      if (htmlLinkLevel > 0) continue;
      if (currentToken.type !== "text" || !state.md.linkify.test(currentToken.content)) continue;
      const text$1 = currentToken.content;
      let links = (state.md.linkify.match(text$1) || []).map((link$1) => trimCjkPrefixFromFuzzyLink(state.md.linkify, link$1));
      if (links.length === 0) continue;
      const nodes = [];
      let level = currentToken.level;
      let lastPos = 0;
      if (links.length > 0 && links[0].index === 0 && i2 > 0 && tokens[i2 - 1].type === "text_special") links = links.slice(1);
      for (let ln2 = 0; ln2 < links.length; ln2++) {
        const link$1 = links[ln2];
        const fullUrl = state.md.normalizeLink(link$1.url);
        if (!state.md.validateLink(fullUrl)) continue;
        let urlText = link$1.text;
        if (!link$1.schema) urlText = state.md.normalizeLinkText(`http://${urlText}`).replace(/^http:\/\//, "");
        else if (link$1.schema === "mailto:" && !/^mailto:/i.test(urlText)) urlText = state.md.normalizeLinkText(`mailto:${urlText}`).replace(/^mailto:/, "");
        else urlText = state.md.normalizeLinkText(urlText);
        const pos = link$1.index;
        if (pos > lastPos) {
          const textToken$1 = new Token("text", "", 0);
          textToken$1.content = text$1.slice(lastPos, pos);
          textToken$1.level = level;
          nodes.push(textToken$1);
        }
        const tokenOpen = new Token("link_open", "a", 1);
        tokenOpen.attrs = [["href", fullUrl]];
        tokenOpen.level = level++;
        tokenOpen.markup = "linkify";
        tokenOpen.info = "auto";
        nodes.push(tokenOpen);
        const tokenText = new Token("text", "", 0);
        tokenText.content = urlText;
        tokenText.level = level;
        nodes.push(tokenText);
        const tokenClose = new Token("link_close", "a", -1);
        tokenClose.level = --level;
        tokenClose.markup = "linkify";
        tokenClose.info = "auto";
        nodes.push(tokenClose);
        lastPos = link$1.lastIndex;
      }
      if (lastPos === 0) continue;
      if (lastPos < text$1.length) {
        const textToken$1 = new Token("text", "", 0);
        textToken$1.content = text$1.slice(lastPos);
        textToken$1.level = level;
        nodes.push(textToken$1);
      }
      tokens.splice(i2, 1, ...nodes);
    }
  }
}
var NEWLINES_RE = /\r\n?|\n/g;
var NULL_RE = /\0/g;
function normalize(state) {
  if (!state || typeof state.src !== "string") return;
  const src = state.src;
  const hasCR = src.includes("\r");
  const hasNull = src.includes("\0");
  if (!hasCR && !hasNull) return;
  let str = src;
  if (hasCR) str = str.replace(NEWLINES_RE, "\n");
  if (hasNull) str = str.replace(NULL_RE, "�");
  state.src = str;
}
var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
var SCOPED_ABBR_TEST_RE = /\((?:c|tm|r)\)/i;
var SCOPED_ABBR_RE = /\((c|tm|r)\)/gi;
var SCOPED_ABBR = {
  c: "©",
  r: "®",
  tm: "™"
};
function replaceFn(_match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}
function replace_scoped(inlineTokens) {
  let inside_autolink = 0;
  for (let i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
    const token = inlineTokens[i2];
    if (token.type === "text" && !inside_autolink) token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    if (token.type === "link_open" && token.info === "auto") inside_autolink--;
    if (token.type === "link_close" && token.info === "auto") inside_autolink++;
  }
}
function replace_rare(inlineTokens) {
  let inside_autolink = 0;
  for (let i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
    const token = inlineTokens[i2];
    if (token.type === "text" && !inside_autolink) {
      if (RARE_RE.test(token.content)) token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–");
    }
    if (token.type === "link_open" && token.info === "auto") inside_autolink--;
    if (token.type === "link_close" && token.info === "auto") inside_autolink++;
  }
}
function replacements(state) {
  var _a3, _b;
  if (!((_b = (_a3 = state.md) == null ? void 0 : _a3.options) == null ? void 0 : _b.typographer)) return;
  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    const blk = state.tokens[blkIdx];
    if (blk.type !== "inline") continue;
    const blkContent = blk.content || (Array.isArray(blk.children) ? blk.children.map((c) => c.type === "text" ? c.content : "").join("") : "");
    if (SCOPED_ABBR_TEST_RE.test(blkContent)) replace_scoped(blk.children || []);
    if (RARE_RE.test(blkContent)) replace_rare(blk.children || []);
  }
}
var CoreRuler = class {
  constructor() {
    __publicField(this, "rules", []);
    __publicField(this, "cache", null);
    __publicField(this, "namedCache", null);
  }
  invalidateCache() {
    this.cache = null;
    this.namedCache = null;
  }
  push(name, fn2) {
    const idx = this.rules.findIndex((r2) => r2.name === name);
    if (idx >= 0) this.rules.splice(idx, 1);
    this.rules.push({
      name,
      fn: fn2,
      enabled: true
    });
    this.invalidateCache();
  }
  at(name, fn2) {
    const idx = this.rules.findIndex((r2) => r2.name === name);
    if (idx < 0) throw new Error(`Parser rule not found: ${name}`);
    this.rules[idx].fn = fn2;
    this.invalidateCache();
  }
  before(beforeName, name, fn2) {
    const i2 = this.rules.findIndex((r2) => r2.name === beforeName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${beforeName}`);
    const exists = this.rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this.rules.splice(exists, 1);
    this.rules.splice(i2, 0, {
      name,
      fn: fn2,
      enabled: true
    });
    this.invalidateCache();
  }
  after(afterName, name, fn2) {
    const i2 = this.rules.findIndex((r2) => r2.name === afterName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${afterName}`);
    const exists = this.rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this.rules.splice(exists, 1);
    this.rules.splice(i2 + 1, 0, {
      name,
      fn: fn2,
      enabled: true
    });
    this.invalidateCache();
  }
  enable(names, ignoreInvalid) {
    const list$1 = Array.isArray(names) ? names : [names];
    const changed = [];
    for (const n2 of list$1) {
      const idx = this.rules.findIndex((r2) => r2.name === n2);
      if (idx < 0) {
        if (!ignoreInvalid) throw new Error(`Rules manager: invalid rule name ${n2}`);
        continue;
      }
      if (!this.rules[idx].enabled) {
        this.rules[idx].enabled = true;
        changed.push(n2);
      }
    }
    if (changed.length) this.invalidateCache();
    return changed;
  }
  disable(names, ignoreInvalid) {
    const list$1 = Array.isArray(names) ? names : [names];
    const changed = [];
    for (const n2 of list$1) {
      const idx = this.rules.findIndex((r2) => r2.name === n2);
      if (idx < 0) {
        if (!ignoreInvalid) throw new Error(`Rules manager: invalid rule name ${n2}`);
        continue;
      }
      if (this.rules[idx].enabled) {
        this.rules[idx].enabled = false;
        changed.push(n2);
      }
    }
    if (changed.length) this.invalidateCache();
    return changed;
  }
  enableOnly(names) {
    const set2 = new Set(names);
    let changed = false;
    for (const r2 of this.rules) {
      const next = set2.has(r2.name);
      if (r2.enabled !== next) {
        r2.enabled = next;
        changed = true;
      }
    }
    if (changed) this.invalidateCache();
  }
  compileCache() {
    this.cache = this.rules.filter((r2) => r2.enabled).map((r2) => r2.fn);
    this.namedCache = this.rules.filter((r2) => r2.enabled).map((r2) => ({
      name: r2.name,
      fn: r2.fn
    }));
  }
  getRules(_chainName = "") {
    if (!this.cache) this.compileCache();
    return this.cache;
  }
  getNamedRules(_chainName = "") {
    if (!this.namedCache) this.compileCache();
    return this.namedCache;
  }
};
var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = "’";
function replaceAt(str, index, ch) {
  return str.slice(0, index) + ch + str.slice(index + 1);
}
function process_inlines(tokens, state) {
  let j;
  const stack = [];
  const quotes = state.md && state.md.options && state.md.options.quotes || "“”‘’";
  for (let i2 = 0; i2 < tokens.length; i2++) {
    const token = tokens[i2];
    const thisLevel = tokens[i2].level;
    for (j = stack.length - 1; j >= 0; j--) if (stack[j].level <= thisLevel) break;
    stack.length = j + 1;
    if (token.type !== "text") continue;
    let text$1 = token.content;
    let pos = 0;
    let max2 = text$1.length;
    OUTER: while (pos < max2) {
      QUOTE_RE.lastIndex = pos;
      const t2 = QUOTE_RE.exec(text$1);
      if (!t2) break;
      let canOpen = true;
      let canClose = true;
      pos = t2.index + 1;
      const isSingle = t2[0] === "'";
      let lastChar = 32;
      if (t2.index - 1 >= 0) lastChar = text$1.charCodeAt(t2.index - 1);
      else for (j = i2 - 1; j >= 0; j--) {
        if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
        if (!tokens[j].content) continue;
        lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
        break;
      }
      let nextChar = 32;
      if (pos < max2) nextChar = text$1.charCodeAt(pos);
      else for (j = i2 + 1; j < tokens.length; j++) {
        if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
        if (!tokens[j].content) continue;
        nextChar = tokens[j].content.charCodeAt(0);
        break;
      }
      const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
      const isLastWhiteSpace = isWhiteSpace(lastChar);
      const isNextWhiteSpace = isWhiteSpace(nextChar);
      if (isNextWhiteSpace) canOpen = false;
      else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) canOpen = false;
      }
      if (isLastWhiteSpace) canClose = false;
      else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) canClose = false;
      }
      if (nextChar === 34 && t2[0] === '"') {
        if (lastChar >= 48 && lastChar <= 57) canClose = canOpen = false;
      }
      if (canOpen && canClose) {
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }
      if (!canOpen && !canClose) {
        if (isSingle) token.content = replaceAt(token.content, t2.index, APOSTROPHE);
        continue;
      }
      if (canClose) for (j = stack.length - 1; j >= 0; j--) {
        let item = stack[j];
        if (stack[j].level < thisLevel) break;
        if (item.single === isSingle && stack[j].level === thisLevel) {
          item = stack[j];
          let openQuote;
          let closeQuote;
          if (isSingle) {
            openQuote = quotes[2] || "‘";
            closeQuote = quotes[3] || "’";
          } else {
            openQuote = quotes[0] || "“";
            closeQuote = quotes[1] || "”";
          }
          token.content = replaceAt(token.content, t2.index, closeQuote);
          tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
          pos += closeQuote.length - 1;
          if (item.token === i2) pos += openQuote.length - 1;
          text$1 = token.content;
          max2 = text$1.length;
          stack.length = j;
          continue OUTER;
        }
      }
      if (canOpen) stack.push({
        token: i2,
        pos: t2.index,
        single: isSingle,
        level: thisLevel
      });
      else if (canClose && isSingle) token.content = replaceAt(token.content, t2.index, APOSTROPHE);
    }
  }
}
function smartquotes(state) {
  if (!state.md.options.typographer) return;
  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    const inlineToken = state.tokens[blkIdx];
    if (inlineToken.type !== "inline") continue;
    const inlineContent = typeof inlineToken.content === "string" ? inlineToken.content : (inlineToken.children || []).map((t2) => t2.content || "").join("");
    if (!QUOTE_TEST_RE.test(inlineContent) || !inlineToken.children) continue;
    process_inlines(inlineToken.children, state);
  }
}
function text_join(state) {
  const blockTokens = state.tokens || [];
  const length = blockTokens.length;
  for (let j = 0; j < length; j++) {
    const blockToken = blockTokens[j];
    if (blockToken.type !== "inline" || !Array.isArray(blockToken.children)) continue;
    const tokens = blockToken.children;
    const max2 = tokens.length;
    for (let curr$1 = 0; curr$1 < max2; curr$1++) if (tokens[curr$1].type === "text_special") tokens[curr$1].type = "text";
    let last = 0;
    let curr = 0;
    for (; curr < max2; curr++) if (tokens[curr].type === "text" && curr + 1 < max2 && tokens[curr + 1].type === "text") tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    else {
      if (curr !== last) tokens[last] = tokens[curr];
      last++;
    }
    if (curr !== last) tokens.length = last;
  }
}
function isSpace$7(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function blockquote(state, startLine, endLine, silent) {
  const src = state.src;
  const bMarks = state.bMarks;
  const eMarks = state.eMarks;
  const tShift = state.tShift;
  const sCount = state.sCount;
  const bsCount = state.bsCount;
  let pos = bMarks[startLine] + tShift[startLine];
  let max2 = eMarks[startLine];
  const oldLineMax = state.lineMax;
  if (sCount[startLine] - state.blkIndent >= 4) return false;
  if (src.charCodeAt(pos) !== 62) return false;
  if (silent) return true;
  const oldBMarks = [];
  const oldBSCount = [];
  const oldSCount = [];
  const oldTShift = [];
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "blockquote");
  const oldParentType = state.parentType;
  state.parentType = "blockquote";
  let lastLineEmpty = false;
  let nextLine;
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    const isOutdented = sCount[nextLine] < state.blkIndent;
    pos = bMarks[nextLine] + tShift[nextLine];
    max2 = eMarks[nextLine];
    if (pos >= max2) break;
    if (src.charCodeAt(pos++) === 62 && !isOutdented) {
      let initial = sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;
      if (src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((bsCount[nextLine] + initial) % 4 === 3) {
          pos++;
          initial++;
          adjustTab = false;
        } else adjustTab = true;
      } else spaceAfterMarker = false;
      let offset3 = initial;
      oldBMarks.push(bMarks[nextLine]);
      bMarks[nextLine] = pos;
      while (pos < max2) {
        const ch = src.charCodeAt(pos);
        if (isSpace$7(ch)) if (ch === 9) offset3 += 4 - (offset3 + bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
        else offset3++;
        else break;
        pos++;
      }
      lastLineEmpty = pos >= max2;
      oldBSCount.push(bsCount[nextLine]);
      bsCount[nextLine] = sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
      oldSCount.push(sCount[nextLine]);
      sCount[nextLine] = offset3 - initial;
      oldTShift.push(tShift[nextLine]);
      tShift[nextLine] = pos - bMarks[nextLine];
      continue;
    }
    if (lastLineEmpty) break;
    let terminate = false;
    for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine, endLine, true)) {
      terminate = true;
      break;
    }
    if (terminate) {
      state.lineMax = nextLine;
      if (state.blkIndent !== 0) {
        oldBMarks.push(bMarks[nextLine]);
        oldBSCount.push(bsCount[nextLine]);
        oldTShift.push(tShift[nextLine]);
        oldSCount.push(sCount[nextLine]);
        sCount[nextLine] -= state.blkIndent;
      }
      break;
    }
    oldBMarks.push(bMarks[nextLine]);
    oldBSCount.push(bsCount[nextLine]);
    oldTShift.push(tShift[nextLine]);
    oldSCount.push(sCount[nextLine]);
    sCount[nextLine] = -1;
  }
  const oldIndent = state.blkIndent;
  state.blkIndent = 0;
  const token_o = state.push("blockquote_open", "blockquote", 1);
  token_o.markup = ">";
  const lines = [startLine, 0];
  token_o.map = lines;
  state.md.block.tokenize(state, startLine, nextLine);
  const token_c = state.push("blockquote_close", "blockquote", -1);
  token_c.markup = ">";
  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;
  for (let i2 = 0; i2 < oldTShift.length; i2++) {
    bMarks[i2 + startLine] = oldBMarks[i2];
    tShift[i2 + startLine] = oldTShift[i2];
    sCount[i2 + startLine] = oldSCount[i2];
    bsCount[i2 + startLine] = oldBSCount[i2];
  }
  state.blkIndent = oldIndent;
  return true;
}
function code(state, startLine, endLine) {
  if (state.sCount[startLine] - state.blkIndent < 4) return false;
  let nextLine = startLine + 1;
  let last = nextLine;
  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }
  state.line = last;
  const token = state.push("code_block", "code", 0);
  token.content = `${state.getLines(startLine, last, 4 + state.blkIndent, false)}
`;
  token.map = [startLine, state.line];
  return true;
}
function fence(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max2 = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (pos + 3 > max2) return false;
  const marker = state.src.charCodeAt(pos);
  if (marker !== 126 && marker !== 96) return false;
  let mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) return false;
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max2);
  if (marker === 96) {
    if (params.includes(String.fromCharCode(marker))) return false;
  }
  if (silent) return true;
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) break;
    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max2 = state.eMarks[nextLine];
    if (pos < max2 && state.sCount[nextLine] < state.blkIndent) break;
    if (state.src.charCodeAt(pos) !== marker) continue;
    if (state.sCount[nextLine] - state.blkIndent >= 4) continue;
    pos = state.skipChars(pos, marker);
    if (pos - mem < len) continue;
    pos = state.skipSpaces(pos);
    if (pos < max2) continue;
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("fence", "code", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
}
var HEADING_TAGS$1 = [
  "",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
];
var HEADING_MARKUP = [
  "",
  "#",
  "##",
  "###",
  "####",
  "#####",
  "######"
];
function isSpace$6(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function heading(state, startLine, endLine, silent) {
  const src = state.src;
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const eMarks = state.eMarks;
  let pos = bMarks[startLine] + tShift[startLine];
  const max2 = eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  let ch = src.charCodeAt(pos);
  if (ch !== 35 || pos >= max2) return false;
  let level = 1;
  ch = src.charCodeAt(++pos);
  while (ch === 35 && pos < max2 && level <= 6) {
    level++;
    ch = src.charCodeAt(++pos);
  }
  if (level > 6 || pos < max2 && !isSpace$6(ch)) return false;
  if (silent) return true;
  let contentStart = pos;
  while (contentStart < max2) {
    ch = src.charCodeAt(contentStart);
    if (ch !== 9 && ch !== 32) break;
    contentStart++;
  }
  let contentEnd = max2;
  if (contentEnd > contentStart) {
    ch = src.charCodeAt(contentEnd - 1);
    if (ch === 9 || ch === 32 || ch === 35) {
      while (contentEnd > contentStart) {
        ch = src.charCodeAt(contentEnd - 1);
        if (ch !== 9 && ch !== 32) break;
        contentEnd--;
      }
      let tmp = contentEnd;
      while (tmp > contentStart && src.charCodeAt(tmp - 1) === 35) tmp--;
      if (tmp > contentStart && isSpace$6(src.charCodeAt(tmp - 1))) contentEnd = tmp;
      while (contentEnd > contentStart) {
        ch = src.charCodeAt(contentEnd - 1);
        if (ch !== 9 && ch !== 32) break;
        contentEnd--;
      }
    }
  }
  state.line = startLine + 1;
  const token_o = state.push("heading_open", HEADING_TAGS$1[level], 1);
  token_o.markup = HEADING_MARKUP[level];
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = src.slice(contentStart, contentEnd);
  token_i.map = [startLine, state.line];
  token_i.children = [];
  const token_c = state.push("heading_close", HEADING_TAGS$1[level], -1);
  token_c.markup = HEADING_MARKUP[level];
  return true;
}
function isSpace$5(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function hr(state, startLine, endLine, silent) {
  const max2 = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 95) return false;
  let cnt = 1;
  while (pos < max2) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace$5(ch)) return false;
    if (ch === marker) cnt++;
  }
  if (cnt < 3) return false;
  if (silent) return true;
  state.line = startLine + 1;
  const token = state.push("hr", "hr", 0);
  token.map = [startLine, state.line];
  token.markup = new Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
}
var HTML_SEQUENCES = [
  [
    /^<(script|pre|style|textarea)(?=(\s|>|$))/i,
    /<\/(script|pre|style|textarea)>/i,
    true
  ],
  [
    /^<!--/,
    /-->/,
    true
  ],
  [
    /^<\?/,
    /\?>/,
    true
  ],
  [
    /^<![A-Z]/,
    />/,
    true
  ],
  [
    /^<!\[CDATA\[/,
    /\]\]>/,
    true
  ],
  [
    new RegExp(`^</?(${[
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "search",
      "section",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ].join("|")})(?=(\\s|/?>|$))`, "i"),
    /^$/,
    true
  ],
  [
    new RegExp(`${HTML_OPEN_CLOSE_TAG_RE.source}\\s*$`),
    /^$/,
    false
  ]
];
function html_block(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max2 = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (!state.md.options.html) return false;
  if (state.src.charCodeAt(pos) !== 60) return false;
  let lineText = state.src.slice(pos, max2);
  let i2 = 0;
  for (; i2 < HTML_SEQUENCES.length; i2++) if (HTML_SEQUENCES[i2][0].test(lineText)) break;
  if (i2 === HTML_SEQUENCES.length) return false;
  if (silent) return HTML_SEQUENCES[i2][2];
  let nextLine = startLine + 1;
  if (!HTML_SEQUENCES[i2][1].test(lineText)) for (; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) break;
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max2 = state.eMarks[nextLine];
    lineText = state.src.slice(pos, max2);
    if (HTML_SEQUENCES[i2][1].test(lineText)) {
      if (lineText.length !== 0) nextLine++;
      break;
    }
  }
  state.line = nextLine;
  const token = state.push("html_block", "", 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
  return true;
}
function hasPipeOnLine(src, start, max2) {
  for (let pos = start; pos < max2; pos++) if (src.charCodeAt(pos) === 124) return true;
  return false;
}
function canUseParagraphTerminatorFastPath(state) {
  var _a3, _b;
  const ruler = (_b = (_a3 = state == null ? void 0 : state.md) == null ? void 0 : _a3.block) == null ? void 0 : _b.ruler;
  if (!ruler) return false;
  return ruler.version === ruler.__mdtsDefaultVersion;
}
function couldTerminateParagraph(src, start, max2) {
  if (start >= max2) return false;
  const marker = src.charCodeAt(start);
  switch (marker) {
    case 35:
    case 42:
    case 43:
    case 45:
    case 60:
    case 62:
    case 95:
    case 96:
    case 126:
      return true;
  }
  if (marker >= 48 && marker <= 57) return true;
  return hasPipeOnLine(src, start, max2);
}
var HEADING_TAGS = [
  "",
  "h1",
  "h2"
];
function lheading(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "paragraph");
  const src = state.src;
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const eMarks = state.eMarks;
  const sCount = state.sCount;
  const blkIndent = state.blkIndent;
  const canUseFastTerminatorHint = canUseParagraphTerminatorFastPath(state);
  if (sCount[startLine] - blkIndent >= 4) return false;
  const oldParentType = state.parentType;
  state.parentType = "paragraph";
  let level = 0;
  let marker;
  let nextLine = startLine + 1;
  for (; nextLine < endLine; nextLine++) {
    const lineStart = bMarks[nextLine] + tShift[nextLine];
    const max2 = eMarks[nextLine];
    if (lineStart >= max2) break;
    if (sCount[nextLine] - blkIndent > 3) continue;
    if (sCount[nextLine] >= blkIndent) {
      marker = src.charCodeAt(lineStart);
      if (marker === 45 || marker === 61) {
        let pos = lineStart + 1;
        let markerEnd = pos;
        while (pos < max2 && src.charCodeAt(pos) === marker) pos++;
        markerEnd = pos;
        while (pos < max2) {
          const ch = src.charCodeAt(pos);
          if (ch !== 9 && ch !== 32) break;
          pos++;
        }
        if (pos >= max2) {
          level = marker === 61 ? 1 : 2;
          break;
        }
        if (markerEnd - lineStart > 1) continue;
      }
    }
    if (sCount[nextLine] < 0) continue;
    if (canUseFastTerminatorHint && !couldTerminateParagraph(src, lineStart, max2)) continue;
    let terminate = false;
    for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine, endLine, true)) {
      terminate = true;
      break;
    }
    if (terminate) break;
  }
  if (!level) return false;
  let content;
  if (nextLine === startLine + 1) {
    const lineStart = bMarks[startLine] + tShift[startLine];
    let lineEnd = eMarks[startLine];
    while (lineEnd > lineStart) {
      const ch = src.charCodeAt(lineEnd - 1);
      if (ch !== 9 && ch !== 32) break;
      lineEnd--;
    }
    content = src.slice(lineStart, lineEnd);
  } else content = state.getLines(startLine, nextLine, blkIndent, false).trim();
  state.line = nextLine + 1;
  const markup = marker === 61 ? "=" : "-";
  const token_o = state.push("heading_open", HEADING_TAGS[level], 1);
  token_o.markup = markup;
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line - 1];
  token_i.children = [];
  const token_c = state.push("heading_close", HEADING_TAGS[level], -1);
  token_c.markup = markup;
  state.parentType = oldParentType;
  return true;
}
function isSpace$4(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function skipBulletListMarker(state, startLine) {
  const eMarks = state.eMarks;
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const src = state.src;
  const max2 = eMarks[startLine];
  let pos = bMarks[startLine] + tShift[startLine];
  const marker = src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 43) return -1;
  if (pos < max2) {
    if (!isSpace$4(src.charCodeAt(pos))) return -1;
  }
  return pos;
}
function skipOrderedListMarker(state, startLine) {
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const eMarks = state.eMarks;
  const src = state.src;
  const start = bMarks[startLine] + tShift[startLine];
  const max2 = eMarks[startLine];
  let pos = start;
  if (pos + 1 >= max2) return -1;
  let ch = src.charCodeAt(pos++);
  if (ch < 48 || ch > 57) return -1;
  for (; ; ) {
    if (pos >= max2) return -1;
    ch = src.charCodeAt(pos++);
    if (ch >= 48 && ch <= 57) {
      if (pos - start >= 10) return -1;
      continue;
    }
    if (ch === 41 || ch === 46) break;
    return -1;
  }
  if (pos < max2) {
    ch = src.charCodeAt(pos);
    if (!isSpace$4(ch)) return -1;
  }
  return pos;
}
function parseOrderedListMarkerValue(state, startLine, markerEnd) {
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const src = state.src;
  const start = bMarks[startLine] + tShift[startLine];
  let value = 0;
  for (let pos = start; pos < markerEnd - 1; pos++) value = value * 10 + src.charCodeAt(pos) - 48;
  return value;
}
var SINGLE_DIGIT_MARKERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
function markTightParagraphs(state, idx) {
  const level = state.level + 2;
  const tokens = state.tokens;
  for (let i2 = idx + 2, l2 = tokens.length - 2; i2 < l2; i2++) {
    const token = tokens[i2];
    if (token.level !== level) continue;
    if (token.type === "paragraph_open") {
      token.hidden = true;
      tokens[i2 + 2].hidden = true;
      i2 += 2;
      continue;
    }
    if (token.nesting === 1) {
      let nesting = 1;
      while (nesting > 0 && ++i2 < l2) nesting += tokens[i2].nesting;
    }
  }
}
function list(state, startLine, endLine, silent) {
  let max2;
  let pos;
  let start = 0;
  let nextLine = startLine;
  let tight = true;
  if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
  if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) return false;
  let isTerminatingParagraph = false;
  if (silent && state.parentType === "paragraph") {
    if (state.sCount[nextLine] >= state.blkIndent) isTerminatingParagraph = true;
  }
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  const src = state.src;
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const eMarks = state.eMarks;
  const sCount = state.sCount;
  const bsCount = state.bsCount;
  const lineStart = bMarks[nextLine] + tShift[nextLine];
  if (lineStart >= eMarks[nextLine]) return false;
  const marker = src.charCodeAt(lineStart);
  if (marker >= 48 && marker <= 57) {
    posAfterMarker = skipOrderedListMarker(state, nextLine);
    if (posAfterMarker < 0) return false;
    isOrdered = true;
    start = lineStart;
    markerValue = parseOrderedListMarkerValue(state, nextLine, posAfterMarker);
    if (isTerminatingParagraph && markerValue !== 1) return false;
  } else if (marker === 42 || marker === 45 || marker === 43) {
    posAfterMarker = skipBulletListMarker(state, nextLine);
    if (posAfterMarker < 0) return false;
    isOrdered = false;
  } else return false;
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= eMarks[nextLine]) return false;
  }
  if (silent) return true;
  const markerCharCode = src.charCodeAt(posAfterMarker - 1);
  const markerMarkup = String.fromCharCode(markerCharCode);
  if (isOrdered) {
    const token = state.push("ordered_list_open", "ol", 1);
    if (markerValue !== void 0 && markerValue !== 1) token.attrs = [["start", String(markerValue)]];
  } else state.push("bullet_list_open", "ul", 1);
  const listLines = [nextLine, 0];
  state.tokens[state.tokens.length - 1].map = listLines;
  state.tokens[state.tokens.length - 1].markup = markerMarkup;
  let prevEmptyEnd = false;
  const listTokIdx = state.tokens.length - 1;
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "list");
  const oldParentType = state.parentType;
  state.parentType = "list";
  while (nextLine < endLine) {
    pos = posAfterMarker;
    max2 = eMarks[nextLine];
    const initial = sCount[nextLine] + posAfterMarker - (bMarks[nextLine] + tShift[nextLine]);
    let offset3 = initial;
    while (pos < max2) {
      const ch = src.charCodeAt(pos);
      if (ch === 9) offset3 += 4 - (offset3 + bsCount[nextLine]) % 4;
      else if (ch === 32) offset3++;
      else break;
      pos++;
    }
    const contentStart = pos;
    let indentAfterMarker;
    if (contentStart >= max2) indentAfterMarker = 1;
    else indentAfterMarker = offset3 - initial;
    if (indentAfterMarker > 4) indentAfterMarker = 1;
    const indent = initial + indentAfterMarker;
    const token = state.push("list_item_open", "li", 1);
    token.markup = markerMarkup;
    const itemLines = [nextLine, 0];
    token.map = itemLines;
    if (isOrdered) token.info = posAfterMarker - start - 1 === 1 ? SINGLE_DIGIT_MARKERS[src.charCodeAt(start) - 48] : src.slice(start, posAfterMarker - 1);
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;
    state.tight = true;
    state.tShift[nextLine] = contentStart - bMarks[nextLine];
    state.sCount[nextLine] = offset3;
    if (contentStart >= max2 && state.isEmpty(nextLine + 1)) state.line = Math.min(state.line + 2, endLine);
    else state.md.block.tokenize(state, nextLine, endLine, true);
    if (!state.tight || prevEmptyEnd) tight = false;
    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;
    state.push("list_item_close", "li", -1).markup = markerMarkup;
    nextLine = state.line;
    itemLines[1] = nextLine;
    if (nextLine >= endLine) break;
    if (state.sCount[nextLine] < state.blkIndent) break;
    if (state.sCount[nextLine] - state.blkIndent >= 4) break;
    if (!isOrdered) {
      const nextLineStart = bMarks[nextLine] + tShift[nextLine];
      const nextLineEnd = eMarks[nextLine];
      if (nextLineStart < nextLineEnd && src.charCodeAt(nextLineStart) === markerCharCode) {
        const afterMarker = nextLineStart + 1;
        if (afterMarker >= nextLineEnd) {
          posAfterMarker = afterMarker;
          continue;
        }
        const nextChar = src.charCodeAt(afterMarker);
        if (nextChar === 9 || nextChar === 32) {
          if (markerCharCode !== 45) {
            posAfterMarker = afterMarker;
            continue;
          }
          let probe = afterMarker + 1;
          while (probe < nextLineEnd) {
            const ch = src.charCodeAt(probe);
            if (ch !== 9 && ch !== 32) break;
            probe++;
          }
          if (probe >= nextLineEnd || src.charCodeAt(probe) !== 45) {
            posAfterMarker = afterMarker;
            continue;
          }
        }
      }
    }
    let terminate = false;
    for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine, endLine, true)) {
      terminate = true;
      break;
    }
    if (terminate) break;
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) break;
      start = bMarks[nextLine] + tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) break;
    }
    if (markerCharCode !== src.charCodeAt(posAfterMarker - 1)) break;
  }
  if (isOrdered) state.push("ordered_list_close", "ol", -1).markup = markerMarkup;
  else state.push("bullet_list_close", "ul", -1).markup = markerMarkup;
  listLines[1] = nextLine;
  state.line = nextLine;
  state.parentType = oldParentType;
  if (tight) markTightParagraphs(state, listTokIdx);
  return true;
}
function isSpace$3(code$1) {
  return code$1 === 9 || code$1 === 32;
}
function paragraph(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "paragraph");
  const oldParentType = state.parentType;
  const src = state.src;
  const bMarks = state.bMarks;
  const tShift = state.tShift;
  const eMarks = state.eMarks;
  const sCount = state.sCount;
  const blkIndent = state.blkIndent;
  const canUseFastTerminatorHint = canUseParagraphTerminatorFastPath(state);
  let nextLine = startLine + 1;
  state.parentType = "paragraph";
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (sCount[nextLine] - blkIndent > 3) continue;
    if (sCount[nextLine] < 0) continue;
    if (oldParentType === "list" && sCount[nextLine] >= blkIndent) {
      const start$1 = bMarks[nextLine] + tShift[nextLine];
      const max$1 = eMarks[nextLine];
      if (start$1 < max$1) {
        const marker = src.charCodeAt(start$1);
        if (marker === 42 || marker === 45 || marker === 43) {
          if (start$1 + 1 >= max$1 || isSpace$3(src.charCodeAt(start$1 + 1))) break;
        } else if (marker >= 48 && marker <= 57 && start$1 + 1 < max$1) {
          let pos = start$1 + 1;
          for (; ; ) {
            if (pos >= max$1) {
              pos = -1;
              break;
            }
            const ch = src.charCodeAt(pos++);
            if (ch >= 48 && ch <= 57) {
              if (pos - start$1 >= 10) {
                pos = -1;
                break;
              }
              continue;
            }
            if ((ch === 41 || ch === 46) && (pos >= max$1 || isSpace$3(src.charCodeAt(pos)))) break;
            pos = -1;
            break;
          }
          if (pos >= 0) break;
        }
      }
    }
    const start = bMarks[nextLine] + tShift[nextLine];
    const max2 = eMarks[nextLine];
    if (canUseFastTerminatorHint && !couldTerminateParagraph(src, start, max2)) continue;
    let terminate = false;
    for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine, endLine, true)) {
      terminate = true;
      break;
    }
    if (terminate) break;
  }
  const content = state.getLines(startLine, nextLine, blkIndent, false).trim();
  state.line = nextLine;
  const token_o = state.push("paragraph_open", "p", 1);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line];
  token_i.children = [];
  state.push("paragraph_close", "p", -1);
  state.parentType = oldParentType;
  return true;
}
function isSpace$2(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function reference(state, startLine, _endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max2 = state.eMarks[startLine];
  let nextLine = startLine + 1;
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "reference");
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (state.src.charCodeAt(pos) !== 91) return false;
  function getNextLine(nextLine$1) {
    const endLine = state.lineMax;
    if (nextLine$1 >= endLine || state.isEmpty(nextLine$1)) return null;
    let isContinuation = false;
    if (state.sCount[nextLine$1] - state.blkIndent > 3) isContinuation = true;
    if (state.sCount[nextLine$1] < 0) isContinuation = true;
    if (!isContinuation) {
      const oldParentType = state.parentType;
      state.parentType = "reference";
      let terminate = false;
      for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine$1, endLine, true)) {
        terminate = true;
        break;
      }
      state.parentType = oldParentType;
      if (terminate) return null;
    }
    const pos$1 = state.bMarks[nextLine$1] + state.tShift[nextLine$1];
    const max$1 = state.eMarks[nextLine$1];
    return state.src.slice(pos$1, max$1 + 1);
  }
  let str = state.src.slice(pos, max2 + 1);
  max2 = str.length;
  let labelEnd = -1;
  for (pos = 1; pos < max2; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 91) return false;
    else if (ch === 93) {
      labelEnd = pos;
      break;
    } else if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max2 = str.length;
        nextLine++;
      }
    } else if (ch === 92) {
      pos++;
      if (pos < max2 && str.charCodeAt(pos) === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max2 = str.length;
          nextLine++;
        }
      }
    }
  }
  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) return false;
  for (pos = labelEnd + 2; pos < max2; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max2 = str.length;
        nextLine++;
      }
    } else if (isSpace$2(ch)) {
    } else break;
  }
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max2);
  if (!destRes.ok) return false;
  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) return false;
  pos = destRes.pos;
  const destEndPos = pos;
  const destEndLineNo = nextLine;
  const start = pos;
  for (; pos < max2; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max2 = str.length;
        nextLine++;
      }
    } else if (isSpace$2(ch)) {
    } else break;
  }
  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max2);
  while (titleRes.can_continue) {
    const lineContent = getNextLine(nextLine);
    if (lineContent === null) break;
    str += lineContent;
    pos = max2;
    max2 = str.length;
    nextLine++;
    titleRes = state.md.helpers.parseLinkTitle(str, pos, max2, titleRes);
  }
  let title;
  if (pos < max2 && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
  } else {
    title = "";
    pos = destEndPos;
    nextLine = destEndLineNo;
  }
  while (pos < max2) {
    if (!isSpace$2(str.charCodeAt(pos))) break;
    pos++;
  }
  if (pos < max2 && str.charCodeAt(pos) !== 10) {
    if (title) {
      title = "";
      pos = destEndPos;
      nextLine = destEndLineNo;
      while (pos < max2) {
        if (!isSpace$2(str.charCodeAt(pos))) break;
        pos++;
      }
    }
  }
  if (pos < max2 && str.charCodeAt(pos) !== 10) return false;
  const label = normalizeReference(str.slice(1, labelEnd));
  if (!label) return false;
  if (silent) return true;
  if (typeof state.env.references === "undefined") state.env.references = {};
  if (typeof state.env.references[label] === "undefined") state.env.references[label] = {
    title,
    href
  };
  state.line = nextLine;
  return true;
}
function isSpace$1(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
var MAX_AUTOCOMPLETED_CELLS = 65536;
function getLine(state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max2 = state.eMarks[line];
  return state.src.slice(pos, max2);
}
function lineContainsPipe(state, line) {
  for (let pos = state.bMarks[line] + state.tShift[line], max2 = state.eMarks[line]; pos < max2; pos++) if (state.src.charCodeAt(pos) === 124) return true;
  return false;
}
function escapedSplit(str) {
  const result = [];
  const max2 = str.length;
  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = "";
  while (pos < max2) {
    if (ch === 124) if (!isEscaped) {
      result.push(current + str.substring(lastPos, pos));
      current = "";
      lastPos = pos + 1;
    } else {
      current += str.substring(lastPos, pos - 1);
      lastPos = pos;
    }
    isEscaped = ch === 92;
    pos++;
    ch = str.charCodeAt(pos);
  }
  result.push(current + str.substring(lastPos));
  return result;
}
function table(state, startLine, endLine, silent) {
  if (startLine + 2 > endLine) return false;
  let nextLine = startLine + 1;
  if (state.sCount[nextLine] < state.blkIndent) return false;
  if (state.sCount[nextLine] - state.blkIndent >= 4) return false;
  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) return false;
  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) return false;
  if (pos >= state.eMarks[nextLine]) return false;
  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace$1(secondCh)) return false;
  if (firstCh === 45 && isSpace$1(secondCh)) return false;
  if (!lineContainsPipe(state, startLine)) return false;
  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);
    if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace$1(ch)) return false;
    pos++;
  }
  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split("|");
  const aligns = [];
  for (let i2 = 0; i2 < columns.length; i2++) {
    const t2 = columns[i2].trim();
    if (!t2) if (i2 === 0 || i2 === columns.length - 1) continue;
    else return false;
    if (!/^:?-+:?$/.test(t2)) return false;
    if (t2.charCodeAt(t2.length - 1) === 58) aligns.push(t2.charCodeAt(0) === 58 ? "center" : "right");
    else if (t2.charCodeAt(0) === 58) aligns.push("left");
    else aligns.push("");
  }
  lineText = getLine(state, startLine).trim();
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === "") columns.shift();
  if (columns.length && columns[columns.length - 1] === "") columns.pop();
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) return false;
  if (silent) return true;
  const oldParentType = state.parentType;
  state.parentType = "table";
  const terminatorRules = state.md.block.ruler.getRulesForState(state, "blockquote");
  const token_to = state.push("table_open", "table", 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;
  const token_tho = state.push("thead_open", "thead", 1);
  token_tho.map = [startLine, startLine + 1];
  const token_htro = state.push("tr_open", "tr", 1);
  token_htro.map = [startLine, startLine + 1];
  for (let i2 = 0; i2 < columns.length; i2++) {
    const token_ho = state.push("th_open", "th", 1);
    if (aligns[i2]) token_ho.attrs = [["style", `text-align:${aligns[i2]}`]];
    const token_il = state.push("inline", "", 0);
    token_il.content = columns[i2].trim();
    token_il.children = [];
    state.push("th_close", "th", -1);
  }
  state.push("tr_close", "tr", -1);
  state.push("thead_close", "thead", -1);
  let tbodyLines;
  let autocompletedCells = 0;
  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) break;
    let terminate = false;
    for (let i2 = 0, l2 = terminatorRules.length; i2 < l2; i2++) if (terminatorRules[i2](state, nextLine, endLine, true)) {
      terminate = true;
      break;
    }
    if (terminate) break;
    lineText = getLine(state, nextLine).trim();
    if (!lineText) break;
    if (state.sCount[nextLine] - state.blkIndent >= 4) break;
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();
    autocompletedCells += columnCount - columns.length;
    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) break;
    if (nextLine === startLine + 2) {
      const token_tbo = state.push("tbody_open", "tbody", 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }
    const token_tro = state.push("tr_open", "tr", 1);
    token_tro.map = [nextLine, nextLine + 1];
    for (let i2 = 0; i2 < columnCount; i2++) {
      const token_tdo = state.push("td_open", "td", 1);
      if (aligns[i2]) token_tdo.attrs = [["style", `text-align:${aligns[i2]}`]];
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i2] ? columns[i2].trim() : "";
      token_il.children = [];
      state.push("td_close", "td", -1);
    }
    state.push("tr_close", "tr", -1);
  }
  if (tbodyLines) {
    state.push("tbody_close", "tbody", -1);
    tbodyLines[1] = nextLine;
  }
  state.push("table_close", "table", -1);
  tableLines[1] = nextLine;
  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
}
var BlockRuler = class {
  constructor() {
    __publicField(this, "_rules", []);
    __publicField(this, "cache", null);
    __publicField(this, "namedCache", null);
    __publicField(this, "version", 0);
  }
  invalidateCache() {
    this.cache = null;
    this.namedCache = null;
    this.version++;
  }
  push(name, fn2, options) {
    this._rules.push({
      name,
      enabled: true,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || []
    });
    this.invalidateCache();
  }
  before(beforeName, name, fn2, options) {
    const i2 = this._rules.findIndex((r2) => r2.name === beforeName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${beforeName}`);
    const exists = this._rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this._rules.splice(exists, 1);
    this._rules.splice(i2, 0, {
      name,
      enabled: true,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || []
    });
    this.invalidateCache();
  }
  after(afterName, name, fn2, options) {
    const i2 = this._rules.findIndex((r2) => r2.name === afterName);
    if (i2 < 0) throw new Error(`Parser rule not found: ${afterName}`);
    const exists = this._rules.findIndex((r2) => r2.name === name);
    if (exists >= 0) this._rules.splice(exists, 1);
    this._rules.splice(i2 + 1, 0, {
      name,
      enabled: true,
      fn: fn2,
      alt: (options == null ? void 0 : options.alt) || []
    });
    this.invalidateCache();
  }
  getRules(chainName) {
    const chain = chainName || "";
    if (!this.cache) this.compileCache();
    return this.cache[chain] ?? [];
  }
  getNamedRules(chainName) {
    const chain = chainName || "";
    if (!this.namedCache) this.compileCache();
    return this.namedCache[chain] ?? [];
  }
  getRulesForState(state, chainName) {
    const env = state == null ? void 0 : state.env;
    if (!(!!env && (Object.prototype.hasOwnProperty.call(env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(env, "__mdtsProfileRules")))) return this.getRules(chainName);
    return this.getNamedRules(chainName).map(({ name, fn: fn2 }) => {
      return (currentState, startLine, endLine, silent) => {
        const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
        const ok = fn2(currentState, startLine, endLine, silent);
        const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
        recordRuleInvocation(currentState == null ? void 0 : currentState.env, "block", name, endedAt - startedAt, ok, !!silent);
        return ok;
      };
    });
  }
  at(name, fn2, options) {
    const index = this._rules.findIndex((r2) => r2.name === name);
    if (index === -1) throw new Error(`Parser rule not found: ${name}`);
    this._rules[index].fn = fn2;
    if (options == null ? void 0 : options.alt) this._rules[index].alt = options.alt;
    this.invalidateCache();
  }
  enable(names, ignoreInvalid) {
    const nameList = Array.isArray(names) ? names : [names];
    const result = [];
    nameList.forEach((name) => {
      const idx = this._rules.findIndex((r2) => r2.name === name);
      if (idx === -1) {
        if (ignoreInvalid) return;
        throw new Error(`Rules manager: invalid rule name ${name}`);
      }
      if (!this._rules[idx].enabled) {
        this._rules[idx].enabled = true;
        result.push(name);
      }
    });
    if (result.length) this.invalidateCache();
    return result;
  }
  disable(names, ignoreInvalid) {
    const nameList = Array.isArray(names) ? names : [names];
    const result = [];
    nameList.forEach((name) => {
      const idx = this._rules.findIndex((r2) => r2.name === name);
      if (idx === -1) {
        if (ignoreInvalid) return;
        throw new Error(`Rules manager: invalid rule name ${name}`);
      }
      if (this._rules[idx].enabled) {
        this._rules[idx].enabled = false;
        result.push(name);
      }
    });
    if (result.length) this.invalidateCache();
    return result;
  }
  enableOnly(names) {
    const allow = new Set(names);
    let changed = false;
    for (const r2 of this._rules) {
      const next = allow.has(r2.name);
      if (r2.enabled !== next) {
        r2.enabled = next;
        changed = true;
      }
    }
    if (changed) this.invalidateCache();
  }
  compileCache() {
    const chains = /* @__PURE__ */ new Set([""]);
    for (const rule of this._rules) {
      if (!rule.enabled) continue;
      for (const alt of rule.alt) chains.add(alt);
    }
    const cache = /* @__PURE__ */ Object.create(null);
    const namedCache = /* @__PURE__ */ Object.create(null);
    for (const chain of chains) {
      const bucket = [];
      const namedBucket = [];
      for (const rule of this._rules) {
        if (!rule.enabled) continue;
        if (chain !== "" && !rule.alt.includes(chain)) continue;
        bucket.push(rule.fn);
        namedBucket.push({
          name: rule.name,
          fn: rule.fn
        });
      }
      cache[chain] = bucket;
      namedCache[chain] = namedBucket;
    }
    this.cache = cache;
    this.namedCache = namedCache;
  }
};
function isSpace(code$1) {
  switch (code$1) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
var StateBlock = class {
  constructor(src, md, env, tokens) {
    __publicField(this, "src");
    __publicField(this, "md");
    __publicField(this, "env");
    __publicField(this, "tokens");
    __publicField(this, "bMarks", []);
    __publicField(this, "eMarks", []);
    __publicField(this, "tShift", []);
    __publicField(this, "sCount", []);
    __publicField(this, "bsCount", []);
    __publicField(this, "blkIndent", 0);
    __publicField(this, "line", 0);
    __publicField(this, "lineMax", 0);
    __publicField(this, "tight", false);
    __publicField(this, "ddIndent", -1);
    __publicField(this, "listIndent", -1);
    __publicField(this, "parentType", "root");
    __publicField(this, "level", 0);
    this.src = src;
    this.md = md;
    this.env = env;
    this.tokens = tokens;
    const s2 = this.src;
    let indent = 0;
    let offset3 = 0;
    let start = 0;
    let indent_found = false;
    for (let pos = 0, len = s2.length; pos < len; pos++) {
      const ch = s2.charCodeAt(pos);
      if (!indent_found) if (isSpace(ch)) {
        indent++;
        if (ch === 9) offset3 += 4 - offset3 % 4;
        else offset3++;
        continue;
      } else indent_found = true;
      if (ch === 10 || pos === len - 1) {
        if (ch !== 10) pos++;
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);
        this.sCount.push(offset3);
        this.bsCount.push(0);
        indent_found = false;
        indent = 0;
        offset3 = 0;
        start = pos + 1;
      }
    }
    this.bMarks.push(s2.length);
    this.eMarks.push(s2.length);
    this.tShift.push(0);
    this.sCount.push(0);
    this.bsCount.push(0);
    this.lineMax = this.bMarks.length - 1;
  }
  push(type, tag, nesting) {
    if (nesting === 0) {
      const token$1 = new Token(type, tag, 0);
      token$1.block = true;
      token$1.level = this.level;
      this.tokens.push(token$1);
      return token$1;
    }
    const token = new Token(type, tag, nesting);
    token.block = true;
    if (nesting < 0) this.level--;
    token.level = this.level;
    if (nesting > 0) this.level++;
    this.tokens.push(token);
    return token;
  }
  isEmpty(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  }
  skipEmptyLines(from) {
    const bMarks = this.bMarks;
    const tShift = this.tShift;
    const eMarks = this.eMarks;
    for (let max2 = this.lineMax; from < max2; from++) if (bMarks[from] + tShift[from] < eMarks[from]) break;
    return from;
  }
  skipSpaces(pos) {
    const src = this.src;
    for (let max2 = src.length; pos < max2; pos++) {
      const ch = src.charCodeAt(pos);
      if (ch !== 9 && ch !== 32) break;
    }
    return pos;
  }
  skipSpacesBack(pos, min2) {
    if (pos <= min2) return pos;
    const src = this.src;
    while (pos > min2) {
      const ch = src.charCodeAt(--pos);
      if (ch !== 9 && ch !== 32) return pos + 1;
    }
    return pos;
  }
  skipChars(pos, code$1) {
    const src = this.src;
    for (let max2 = src.length; pos < max2; pos++) if (src.charCodeAt(pos) !== code$1) break;
    return pos;
  }
  skipCharsBack(pos, code$1, min2) {
    if (pos <= min2) return pos;
    const src = this.src;
    while (pos > min2) if (code$1 !== src.charCodeAt(--pos)) return pos + 1;
    return pos;
  }
  getLines(begin, end, indent, keepLastLF) {
    if (begin >= end) return "";
    if (begin + 1 === end) {
      const line = begin;
      const lineStart = this.bMarks[line];
      let first = lineStart;
      const last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
      let lineIndent = 0;
      const src$1 = this.src;
      const bsCount$1 = this.bsCount;
      const tShift$1 = this.tShift;
      while (first < last && lineIndent < indent) {
        const ch = src$1.charCodeAt(first);
        if (ch === 9 || ch === 32) if (ch === 9) lineIndent += 4 - (lineIndent + bsCount$1[line]) % 4;
        else lineIndent++;
        else if (first - lineStart < tShift$1[line]) lineIndent++;
        else break;
        first++;
      }
      if (lineIndent > indent) return new Array(lineIndent - indent + 1).join(" ") + src$1.slice(first, last);
      return src$1.slice(first, last);
    }
    const queue = new Array(end - begin);
    const src = this.src;
    const bMarks = this.bMarks;
    const eMarks = this.eMarks;
    const bsCount = this.bsCount;
    const tShift = this.tShift;
    for (let i2 = 0, line = begin; line < end; line++, i2++) {
      let lineIndent = 0;
      const lineStart = bMarks[line];
      let first = lineStart;
      let last;
      if (line + 1 < end || keepLastLF) last = eMarks[line] + 1;
      else last = eMarks[line];
      while (first < last && lineIndent < indent) {
        const ch = src.charCodeAt(first);
        if (isSpace(ch)) if (ch === 9) lineIndent += 4 - (lineIndent + bsCount[line]) % 4;
        else lineIndent++;
        else if (first - lineStart < tShift[line]) lineIndent++;
        else break;
        first++;
      }
      if (lineIndent > indent) queue[i2] = new Array(lineIndent - indent + 1).join(" ") + src.slice(first, last);
      else queue[i2] = src.slice(first, last);
    }
    return queue.join("");
  }
};
StateBlock.prototype.Token = Token;
var _rules = [
  [
    "table",
    table,
    ["paragraph", "reference"]
  ],
  ["code", code],
  [
    "fence",
    fence,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "blockquote",
    blockquote,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "hr",
    hr,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "list",
    list,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["reference", reference],
  [
    "html_block",
    html_block,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  [
    "heading",
    heading,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["lheading", lheading],
  ["paragraph", paragraph]
];
var ParserBlock = class {
  constructor() {
    __publicField(this, "ruler");
    __publicField(this, "cachedRulesVersion", -1);
    __publicField(this, "cachedRules", []);
    this.ruler = new BlockRuler();
    for (let i2 = 0; i2 < _rules.length; i2++) this.ruler.push(_rules[i2][0], _rules[i2][1], { alt: (_rules[i2][2] || []).slice() });
    this.ruler.__mdtsDefaultVersion = this.ruler.version;
  }
  /**
  * Generate tokens for input range
  */
  tokenize(state, startLine, endLine) {
    const rules = this.getRules();
    const namedRules = this.ruler.getNamedRules("");
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    const bMarks = state.bMarks;
    const tShift = state.tShift;
    const eMarks = state.eMarks;
    const sCount = state.sCount;
    let line = startLine;
    let hasEmptyLines = false;
    const shouldProfile = !!state.env && (Object.prototype.hasOwnProperty.call(state.env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(state.env, "__mdtsProfileRules"));
    while (line < endLine) {
      while (line < endLine && bMarks[line] + tShift[line] >= eMarks[line]) line++;
      state.line = line;
      if (line >= endLine) break;
      if (sCount[line] < state.blkIndent) break;
      if (state.level >= maxNesting) {
        state.line = endLine;
        break;
      }
      const prevLine = state.line;
      let ok = false;
      for (let i2 = 0; i2 < len; i2++) {
        if (!shouldProfile) ok = rules[i2](state, line, endLine, false);
        else {
          const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
          ok = namedRules[i2].fn(state, line, endLine, false);
          const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
          recordRuleInvocation(state.env, "block", namedRules[i2].name, endedAt - startedAt, ok, false);
        }
        if (ok) {
          if (prevLine >= state.line) throw new Error("block rule didn't increment state.line");
          break;
        }
      }
      if (!ok) throw new Error("none of the block rules matched");
      state.tight = !hasEmptyLines;
      if (bMarks[state.line - 1] + tShift[state.line - 1] >= eMarks[state.line - 1]) hasEmptyLines = true;
      line = state.line;
      if (line < endLine && bMarks[line] + tShift[line] >= eMarks[line]) {
        hasEmptyLines = true;
        line++;
        state.line = line;
      }
    }
  }
  /**
  * ParserBlock.parse(src, md, env, outTokens)
  *
  * Process input string and push block tokens into `outTokens`
  */
  parse(src, md, env, outTokens) {
    if (!src || src.length === 0) return;
    const state = new StateBlock(src, md, env, outTokens);
    this.tokenize(state, state.line, state.lineMax);
  }
  getRules() {
    if (this.cachedRulesVersion !== this.ruler.version) {
      this.cachedRules = this.ruler.getRules("");
      this.cachedRulesVersion = this.ruler.version;
    }
    return this.cachedRules;
  }
};
var State = class {
  constructor(src, md, env = {}) {
    __publicField(this, "src");
    __publicField(this, "env");
    __publicField(this, "tokens");
    __publicField(this, "inlineMode");
    __publicField(this, "md");
    this.src = typeof src === "string" ? src || "" : src;
    this.env = env;
    this.tokens = [];
    this.inlineMode = false;
    this.md = md;
  }
};
State.prototype.Token = Token;
var CORE_RULES = [
  ["normalize", normalize],
  ["block", block],
  ["inline", inline],
  ["linkify", linkify],
  ["replacements", replacements],
  ["smartquotes", smartquotes],
  ["text_join", text_join]
];
var DEFAULT_OPTIONS_TEMPLATE = {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: false,
  typographer: false,
  quotes: "“”‘’",
  maxNesting: 100
};
var DEFAULT_HELPERS = {
  parseLinkLabel,
  parseLinkDestination,
  parseLinkTitle
};
function cloneDefaultOptions() {
  return { ...DEFAULT_OPTIONS_TEMPLATE };
}
function cloneDefaultHelpers() {
  return { ...DEFAULT_HELPERS };
}
var ParserCore = class {
  constructor() {
    __publicField(this, "fallbackParser");
    __publicField(this, "lastState", null);
    __publicField(this, "block");
    __publicField(this, "inline");
    __publicField(this, "ruler");
    __publicField(this, "linkifyInstance", null);
    __publicField(this, "cachedCoreRules", null);
    this.block = new ParserBlock();
    this.inline = new ParserInline();
    this.ruler = new CoreRuler();
    for (let i2 = 0; i2 < CORE_RULES.length; i2++) {
      const [name, rule] = CORE_RULES[i2];
      this.ruler.push(name, rule);
    }
    this.fallbackParser = {
      block: this.block,
      inline: this.inline,
      core: this,
      options: cloneDefaultOptions(),
      helpers: cloneDefaultHelpers(),
      normalizeLink,
      normalizeLinkText,
      validateLink,
      linkify: null
    };
  }
  resolveParser(md) {
    if (md) return md;
    if (!this.linkifyInstance) this.linkifyInstance = new linkify_it_default();
    if (this.fallbackParser.block !== this.block) this.fallbackParser.block = this.block;
    if (this.fallbackParser.inline !== this.inline) this.fallbackParser.inline = this.inline;
    this.fallbackParser.core = this;
    this.fallbackParser.linkify = this.linkifyInstance;
    return this.fallbackParser;
  }
  createState(src, env = {}, md) {
    return new State(src, this.resolveParser(md), env);
  }
  process(state) {
    const rules = this.cachedCoreRules ?? (this.cachedCoreRules = this.ruler.getRules(""));
    const namedRules = this.ruler.getNamedRules("");
    const shouldProfile = !!state.env && (Object.prototype.hasOwnProperty.call(state.env, "__mdtsRuleProfile") || Object.prototype.hasOwnProperty.call(state.env, "__mdtsProfileRules"));
    for (let i2 = 0; i2 < rules.length; i2++) {
      if (!shouldProfile) {
        rules[i2](state);
        continue;
      }
      const startedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
      namedRules[i2].fn(state);
      const endedAt = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
      recordRuleInvocation(state.env, "core", namedRules[i2].name, endedAt - startedAt, true, false);
    }
    finalizeRuleProfile(state.env);
  }
  parseSource(src, env = {}, md) {
    if (typeof src !== "string" && hasNormalizationChars(src)) return this.parse(sourceToString(src), env, md);
    const state = this.createState(src, env, md);
    this.process(state);
    this.lastState = state;
    return state;
  }
  parse(src, env = {}, md) {
    if (typeof src !== "string") throw new TypeError("Input data should be a String");
    return this.parseSource(src, env, md);
  }
  getTokens() {
    return this.lastState ? this.lastState.tokens : [];
  }
};
var commonmark_default = { options: {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: false,
  typographer: false
} };
var default_default = {
  options: {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: null,
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
};
var zero_default = {
  options: {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    maxNesting: 20
  },
  components: {
    core: { rules: [
      "normalize",
      "block",
      "inline",
      "text_join"
    ] },
    block: { rules: ["paragraph"] },
    inline: { rules: ["text"] },
    inline2: { rules: ["balance_pairs", "fragments_join"] }
  }
};
var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_ESCAPE_AMP_RE = /&/g;
var HTML_ESCAPE_NO_AMP_RE = /[<>"]/g;
var HTML_REPLACEMENTS = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch] || ch;
}
function escapeHtml$2(str) {
  if (str.length === 0) return "";
  if (str.length < 32) {
    if (HTML_ESCAPE_TEST_RE.test(str)) return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    return str;
  }
  const hasAmp = str.includes("&");
  const hasLt = str.includes("<");
  const hasGt = str.includes(">");
  const hasQuot = str.includes('"');
  if (!hasAmp && !hasLt && !hasGt && !hasQuot) return str;
  if (hasAmp && !hasLt && !hasGt && !hasQuot) return str.replace(HTML_ESCAPE_AMP_RE, "&amp;");
  if (!hasAmp) return str.replace(HTML_ESCAPE_NO_AMP_RE, replaceUnsafeChar);
  return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
}
var UNESCAPE_ALL_RE = new RegExp(`${/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`, "gi");
var DIGITAL_ENTITY_TEST_RE = /^#(?:x[a-f0-9]{1,8}|\d{1,8})$/i;
function unescapeAll(str) {
  if (!str.includes("\\") && !str.includes("&")) return str;
  return str.replace(UNESCAPE_ALL_RE, (match2, escaped, entity$1) => {
    if (escaped) return escaped;
    if (DIGITAL_ENTITY_TEST_RE.test(entity$1)) {
      const code$1 = entity$1[1].toLowerCase() === "x" ? Number.parseInt(entity$1.slice(2), 16) : Number.parseInt(entity$1.slice(1), 10);
      if (code$1 >= 55296 && code$1 <= 57343) return "�";
      if (code$1 >= 128 && code$1 <= 159) return "�";
      return String.fromCodePoint(code$1);
    }
    return match2;
  });
}
function isPromiseLike(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
}
function ensureSyncResult(value, ruleName) {
  if (isPromiseLike(value)) throw new TypeError(`Renderer rule "${ruleName}" returned a Promise. Use renderAsync() instead.`);
  return value;
}
var resolveResult = (value) => isPromiseLike(value) ? value : Promise.resolve(value);
function renderAttrName(name) {
  switch (name) {
    case "alt":
    case "class":
    case "href":
    case "id":
    case "lang":
    case "rel":
    case "src":
    case "start":
    case "style":
    case "target":
    case "title":
      return name;
    default:
      return escapeHtml$2(name);
  }
}
function renderAttrsFromList(attrs) {
  if (!attrs || attrs.length === 0) return "";
  const firstAttr = attrs[0];
  let result = ` ${renderAttrName(firstAttr[0])}="${escapeHtml$2(firstAttr[1])}"`;
  for (let i2 = 1; i2 < attrs.length; i2++) {
    const attr = attrs[i2];
    result += ` ${renderAttrName(attr[0])}="${escapeHtml$2(attr[1])}"`;
  }
  return result;
}
function parseFenceInfo(info) {
  if (!info) return {
    langName: "",
    langAttrs: ""
  };
  let markerEnd = 0;
  while (markerEnd < info.length) {
    const ch = info.charCodeAt(markerEnd);
    if (ch === 32 || ch === 9 || ch === 10) break;
    markerEnd++;
  }
  if (markerEnd >= info.length) return {
    langName: info,
    langAttrs: ""
  };
  let attrsStart = markerEnd;
  while (attrsStart < info.length) {
    const ch = info.charCodeAt(attrsStart);
    if (ch !== 32 && ch !== 9 && ch !== 10) break;
    attrsStart++;
  }
  return {
    langName: info.slice(0, markerEnd),
    langAttrs: attrsStart < info.length ? info.slice(attrsStart) : ""
  };
}
function renderFence(token, highlighted, info, langName, options) {
  if (highlighted.indexOf("<pre") === 0) return `${highlighted}
`;
  if (info) {
    if (!token.attrs || token.attrs.length === 0) return `<pre><code class="${escapeHtml$2(`${options.langPrefix ?? "language-"}${langName}`)}">${highlighted}</code></pre>
`;
    const classIndex = token.attrIndex("class");
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];
    const langClass = `${options.langPrefix ?? "language-"}${langName}`;
    if (classIndex < 0) tmpAttrs.push(["class", langClass]);
    else {
      tmpAttrs[classIndex] = tmpAttrs[classIndex].slice();
      tmpAttrs[classIndex][1] += ` ${langClass}`;
    }
    return `<pre><code${renderAttrsFromList(tmpAttrs)}>${highlighted}</code></pre>
`;
  }
  return `<pre><code${renderAttrsFromList(token.attrs)}>${highlighted}</code></pre>
`;
}
function renderCodeInlineToken(token) {
  if (!token.attrs || token.attrs.length === 0) return `<code>${escapeHtml$2(token.content)}</code>`;
  return `<code${renderAttrsFromList(token.attrs)}>${escapeHtml$2(token.content)}</code>`;
}
function renderCodeBlockToken(token) {
  const content = escapeHtml$2(token.content);
  if (!token.attrs) return `<pre><code>${content}</code></pre>
`;
  return `<pre${renderAttrsFromList(token.attrs)}><code>${content}</code></pre>
`;
}
function renderFastBlockOpenWithInline(token, prefix) {
  const attrs = token.attrs;
  if (!attrs || attrs.length === 0) switch (token.type) {
    case "paragraph_open":
      return `${prefix}<p>`;
    case "heading_open":
      return `<${token.tag}>`;
    case "td_open":
      return `${prefix}<td>`;
    case "th_open":
      return `${prefix}<th>`;
    default:
      return null;
  }
  if (attrs.length === 1 && attrs[0][0] === "style") {
    if (token.type === "td_open") return `${prefix}<td style="${escapeHtml$2(attrs[0][1])}">`;
    if (token.type === "th_open") return `${prefix}<th style="${escapeHtml$2(attrs[0][1])}">`;
  }
  return null;
}
function renderLinkOpenToken(token) {
  const attrs = token.attrs;
  if (!attrs || attrs.length === 0) return "<a>";
  if (attrs.length === 1) return `<a ${renderAttrName(attrs[0][0])}="${escapeHtml$2(attrs[0][1])}">`;
  if (attrs.length === 2) return `<a ${renderAttrName(attrs[0][0])}="${escapeHtml$2(attrs[0][1])}" ${renderAttrName(attrs[1][0])}="${escapeHtml$2(attrs[1][1])}">`;
  return `<a${renderAttrsFromList(attrs)}>`;
}
function canUseLinkInlineFastPath(token) {
  switch (token.type) {
    case "text":
    case "text_special":
    case "softbreak":
    case "hardbreak":
    case "html_inline":
    case "code_inline":
    case "image":
      return true;
    default:
      return false;
  }
}
function canUseWrappedInlineFastPath(token) {
  switch (token.type) {
    case "text":
    case "text_special":
    case "softbreak":
    case "hardbreak":
    case "html_inline":
    case "code_inline":
      return true;
    default:
      return false;
  }
}
function renderFlatToken(token, xhtmlOut) {
  if (token.hidden) return "";
  const attrs = token.attrs;
  const nesting = token.nesting;
  const tag = token.tag;
  if (!attrs || attrs.length === 0) {
    if (nesting === 0) return xhtmlOut ? `<${tag} />` : `<${tag}>`;
    return nesting === -1 ? `</${tag}>` : `<${tag}>`;
  }
  let result = (nesting === -1 ? "</" : "<") + tag + renderAttrsFromList(attrs);
  if (nesting === 0 && xhtmlOut) result += " /";
  return `${result}>`;
}
var DEFAULT_RENDERER_OPTIONS = {
  langPrefix: "language-",
  xhtmlOut: false,
  breaks: false
};
var hasOwn$1 = Object.prototype.hasOwnProperty;
var defaultRules = {
  code_inline(tokens, idx) {
    return renderCodeInlineToken(tokens[idx]);
  },
  code_block(tokens, idx) {
    return renderCodeBlockToken(tokens[idx]);
  },
  fence(tokens, idx, options, _env, _self) {
    const token = tokens[idx];
    const info = token.info ? unescapeAll(token.info).trim() : "";
    const { langName, langAttrs } = parseFenceInfo(info);
    const highlight = options.highlight;
    const fallback = escapeHtml$2(token.content);
    if (!highlight) return renderFence(token, fallback, info, langName, options);
    const highlighted = highlight(token.content, langName, langAttrs);
    if (isPromiseLike(highlighted)) return highlighted.then((res) => renderFence(token, res || fallback, info, langName, options));
    return renderFence(token, highlighted || fallback, info, langName, options);
  },
  image(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const altText = self.renderInlineAsText(token.children || [], options, env);
    const altIndex = token.attrIndex("alt");
    if (altIndex >= 0 && token.attrs) token.attrs[altIndex][1] = altText;
    else if (token.attrs) token.attrs.push(["alt", altText]);
    else token.attrs = [["alt", altText]];
    return renderFlatToken(token, options.xhtmlOut === true);
  },
  hardbreak(_tokens, _idx, options) {
    return options.xhtmlOut ? "<br />\n" : "<br>\n";
  },
  softbreak(_tokens, _idx, options) {
    return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
  },
  text(tokens, idx) {
    return escapeHtml$2(tokens[idx].content);
  },
  text_special(tokens, idx) {
    return escapeHtml$2(tokens[idx].content);
  },
  html_block(tokens, idx) {
    return tokens[idx].content;
  },
  html_inline(tokens, idx) {
    return tokens[idx].content;
  }
};
function renderFenceSyncToken(token, options, _self) {
  const info = token.info ? unescapeAll(token.info).trim() : "";
  const { langName, langAttrs } = parseFenceInfo(info);
  const highlight = options.highlight;
  const fallback = escapeHtml$2(token.content);
  if (!highlight) return renderFence(token, fallback, info, langName, options);
  const highlighted = highlight(token.content, langName, langAttrs);
  if (isPromiseLike(highlighted)) throw new TypeError('Renderer rule "fence" returned a Promise. Use renderAsync() instead.');
  return renderFence(token, highlighted || fallback, info, langName, options);
}
function renderSingleInlineTokenSync(tokens, options, env, self, rules, inlineBreak, softbreak) {
  const token = tokens[0];
  switch (token.type) {
    case "text":
      if (rules.text === defaultRules.text) return token.content.length === 0 ? "" : escapeHtml$2(token.content);
      break;
    case "text_special":
      if (rules.text_special === defaultRules.text_special) return token.content.length === 0 ? "" : escapeHtml$2(token.content);
      break;
    case "softbreak":
      if (rules.softbreak === defaultRules.softbreak) return softbreak;
      break;
    case "hardbreak":
      if (rules.hardbreak === defaultRules.hardbreak) return inlineBreak;
      break;
    case "html_inline":
      if (rules.html_inline === defaultRules.html_inline) return token.content;
      break;
    case "code_inline":
      if (rules.code_inline === defaultRules.code_inline) return renderCodeInlineToken(token);
      break;
    default:
      break;
  }
  const rule = rules[token.type];
  if (!rule) return renderFlatToken(token, options.xhtmlOut === true);
  const rendered = rule(tokens, 0, options, env, self);
  if (typeof rendered === "string") return rendered;
  return ensureSyncResult(rendered, token.type);
}
var Renderer = class {
  constructor(options = {}) {
    __publicField(this, "rules");
    __publicField(this, "baseOptions");
    __publicField(this, "normalizedBase");
    this.baseOptions = { ...options };
    this.normalizedBase = this.buildNormalizedBase();
    this.rules = { ...defaultRules };
  }
  set(options) {
    this.baseOptions = {
      ...this.baseOptions,
      ...options
    };
    this.normalizedBase = this.buildNormalizedBase();
    return this;
  }
  render(tokens, options, env) {
    if (!Array.isArray(tokens)) throw new TypeError("render expects token array as first argument");
    if (tokens.length === 1) return this.renderSingleToken(tokens, tokens[0], options, env);
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    const rules = this.rules;
    const xhtmlOut = merged.xhtmlOut === true;
    let textRule;
    let textSpecialRule;
    let softbreakRule;
    let hardbreakRule;
    let htmlInlineRule;
    let codeInlineRule;
    let inlineBreak = "";
    let softbreak = "";
    let inlineFastPathReady = false;
    let result = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      const type = token.type;
      const prefix = i2 > 0 && tokens[i2 - 1].hidden ? "\n" : "";
      if (type === "list_item_open" && (!token.attrs || token.attrs.length === 0) && i2 + 3 < tokens.length) {
        const paragraphOpen = tokens[i2 + 1];
        const inlineToken = tokens[i2 + 2];
        const paragraphClose = tokens[i2 + 3];
        if (paragraphOpen.type === "paragraph_open" && paragraphOpen.hidden && inlineToken.type === "inline" && paragraphClose.type === "paragraph_close" && paragraphClose.hidden) {
          result += `${prefix}<li>${this.renderInlineTokens(inlineToken.children || [], merged, envRef)}`;
          i2 += 3;
          continue;
        }
      }
      if (i2 + 2 < tokens.length) {
        const inlineToken = tokens[i2 + 1];
        const closeToken = tokens[i2 + 2];
        if (inlineToken.type === "inline" && closeToken.nesting === -1 && closeToken.tag === token.tag && !closeToken.hidden) {
          const open = renderFastBlockOpenWithInline(token, prefix);
          if (open !== null) {
            result += `${open + this.renderInlineTokens(inlineToken.children || [], merged, envRef)}</${token.tag}>
`;
            i2 += 2;
            continue;
          }
        }
      }
      if (type === "inline") {
        const children = token.children || [];
        if (children.length === 1) {
          if (!inlineFastPathReady) {
            textRule = rules.text;
            textSpecialRule = rules.text_special;
            softbreakRule = rules.softbreak;
            hardbreakRule = rules.hardbreak;
            htmlInlineRule = rules.html_inline;
            codeInlineRule = rules.code_inline;
            inlineBreak = merged.xhtmlOut ? "<br />\n" : "<br>\n";
            softbreak = merged.breaks ? inlineBreak : "\n";
            inlineFastPathReady = true;
          }
          const child = children[0];
          switch (child.type) {
            case "text":
              if (textRule === defaultRules.text) {
                result += escapeHtml$2(child.content);
                continue;
              }
              break;
            case "text_special":
              if (textSpecialRule === defaultRules.text_special) {
                result += escapeHtml$2(child.content);
                continue;
              }
              break;
            case "softbreak":
              if (softbreakRule === defaultRules.softbreak) {
                result += softbreak;
                continue;
              }
              break;
            case "hardbreak":
              if (hardbreakRule === defaultRules.hardbreak) {
                result += inlineBreak;
                continue;
              }
              break;
            case "html_inline":
              if (htmlInlineRule === defaultRules.html_inline) {
                result += child.content;
                continue;
              }
              break;
            case "code_inline":
              if (codeInlineRule === defaultRules.code_inline) {
                result += renderCodeInlineToken(child);
                continue;
              }
              break;
            default:
              break;
          }
        }
        result += this.renderInlineTokens(children, merged, envRef);
        continue;
      }
      const rule = rules[type];
      if (!rule) {
        const attrs = token.attrs;
        if (!token.hidden) {
          if (!attrs || attrs.length === 0) switch (type) {
            case "hr":
              result += xhtmlOut ? "<hr />\n" : "<hr>\n";
              continue;
            case "heading_open":
              result += `<${token.tag}>`;
              continue;
            case "heading_close":
              result += `</${token.tag}>
`;
              continue;
            case "paragraph_open":
              result += `${prefix}<p>`;
              continue;
            case "paragraph_close":
              result += "</p>\n";
              continue;
            case "list_item_open": {
              const nextToken = tokens[i2 + 1];
              result += prefix + (nextToken && (nextToken.type === "inline" || nextToken.hidden || nextToken.nesting === -1 && nextToken.tag === "li") ? "<li>" : "<li>\n");
              continue;
            }
            case "list_item_close":
              result += "</li>\n";
              continue;
            case "bullet_list_open":
              result += `${prefix}<ul>
`;
              continue;
            case "bullet_list_close":
              result += "</ul>\n";
              continue;
            case "blockquote_open":
              result += prefix + (tokens[i2 + 1] && tokens[i2 + 1].nesting === -1 && tokens[i2 + 1].tag === "blockquote" ? "<blockquote>" : "<blockquote>\n");
              continue;
            case "blockquote_close":
              result += "</blockquote>\n";
              continue;
            case "ordered_list_open":
              result += `${prefix}<ol>
`;
              continue;
            case "ordered_list_close":
              result += "</ol>\n";
              continue;
            case "table_open":
              result += `${prefix}<table>
`;
              continue;
            case "table_close":
              result += "</table>\n";
              continue;
            case "thead_open":
              result += `${prefix}<thead>
`;
              continue;
            case "thead_close":
              result += "</thead>\n";
              continue;
            case "tbody_open":
              result += `${prefix}<tbody>
`;
              continue;
            case "tbody_close":
              result += "</tbody>\n";
              continue;
            case "tr_open":
              result += `${prefix}<tr>
`;
              continue;
            case "tr_close":
              result += "</tr>\n";
              continue;
            case "td_open":
              result += `${prefix}<td>`;
              continue;
            case "td_close":
              result += "</td>\n";
              continue;
            case "th_open":
              result += `${prefix}<th>`;
              continue;
            case "th_close":
              result += "</th>\n";
              continue;
            default:
              break;
          }
          else if (attrs.length === 1) {
            const attr = attrs[0];
            if (type === "ordered_list_open" && attr[0] === "start") {
              result += `${prefix}<ol start="${escapeHtml$2(attr[1])}">
`;
              continue;
            }
            if (type === "td_open" && attr[0] === "style") {
              result += `${prefix}<td style="${escapeHtml$2(attr[1])}">`;
              continue;
            }
            if (type === "th_open" && attr[0] === "style") {
              result += `${prefix}<th style="${escapeHtml$2(attr[1])}">`;
              continue;
            }
          }
        }
        result += this.renderToken(tokens, i2, merged);
        continue;
      }
      if (type === "code_block" && rule === defaultRules.code_block) {
        result += renderCodeBlockToken(token);
        continue;
      }
      if (type === "fence" && rule === defaultRules.fence) {
        result += renderFenceSyncToken(token, merged, this);
        continue;
      }
      if (type === "html_block" && rule === defaultRules.html_block) {
        result += token.content;
        continue;
      }
      const rendered = rule(tokens, i2, merged, envRef, this);
      if (typeof rendered === "string") result += rendered;
      else result += ensureSyncResult(rendered, token.type);
    }
    return result;
  }
  async renderAsync(tokens, options, env) {
    if (!Array.isArray(tokens)) throw new TypeError("render expects token array as first argument");
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    const rules = this.rules;
    let result = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (token.type === "inline") {
        result += await this.renderInlineTokensAsync(token.children || [], merged, envRef);
        continue;
      }
      const rule = rules[token.type];
      if (rule) result += await resolveResult(rule(tokens, i2, merged, envRef, this));
      else result += this.renderToken(tokens, i2, merged);
    }
    return result;
  }
  renderInline(tokens, options, env) {
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    return this.renderInlineTokens(tokens, merged, envRef);
  }
  async renderInlineAsync(tokens, options, env) {
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    return this.renderInlineTokensAsync(tokens, merged, envRef);
  }
  renderInlineAsText(tokens, options, env) {
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    return this.renderInlineAsTextInternal(tokens, merged, envRef);
  }
  renderAttrs(token) {
    return renderAttrsFromList(token.attrs);
  }
  renderToken(tokens, idx, options) {
    const token = tokens[idx];
    if (token.hidden) return "";
    const block$1 = token.block;
    const nesting = token.nesting;
    const tag = token.tag;
    const attrs = token.attrs;
    let needLineFeed = false;
    if (block$1) {
      needLineFeed = true;
      if (nesting === 1 && idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];
        if (nextToken.type === "inline" || nextToken.hidden) needLineFeed = false;
        else if (nextToken.nesting === -1 && nextToken.tag === tag) needLineFeed = false;
      }
    }
    const prefix = block$1 && nesting !== -1 && idx > 0 && tokens[idx - 1].hidden ? "\n" : "";
    const suffix = needLineFeed ? ">\n" : ">";
    if (!attrs || attrs.length === 0) {
      if (nesting === 0) {
        if (options.xhtmlOut) return `${prefix}<${tag} /${suffix}`;
        return `${prefix}<${tag}${suffix}`;
      }
      if (nesting === -1) return `${prefix}</${tag}${suffix}`;
      return `${prefix}<${tag}${suffix}`;
    }
    let result = prefix + (nesting === -1 ? "</" : "<") + tag + renderAttrsFromList(attrs);
    if (nesting === 0 && options.xhtmlOut) result += " /";
    return result + suffix;
  }
  mergeOptions(overrides) {
    const base$1 = this.normalizedBase;
    if (!overrides) return base$1;
    if (overrides.highlight === base$1.highlight && overrides.langPrefix === base$1.langPrefix && overrides.xhtmlOut === base$1.xhtmlOut && overrides.breaks === base$1.breaks) return base$1;
    let merged = null;
    const ensureMerged = () => {
      if (!merged) merged = { ...base$1 };
      return merged;
    };
    if (hasOwn$1.call(overrides, "highlight") && overrides.highlight !== base$1.highlight) ensureMerged().highlight = overrides.highlight;
    if (hasOwn$1.call(overrides, "langPrefix")) {
      const value = overrides.langPrefix;
      if (value !== base$1.langPrefix) ensureMerged().langPrefix = value;
    }
    if (hasOwn$1.call(overrides, "xhtmlOut")) {
      const value = overrides.xhtmlOut;
      if (value !== base$1.xhtmlOut) ensureMerged().xhtmlOut = value;
    }
    if (hasOwn$1.call(overrides, "breaks")) {
      const value = overrides.breaks;
      if (value !== base$1.breaks) ensureMerged().breaks = value;
    }
    return merged || base$1;
  }
  buildNormalizedBase() {
    return Object.freeze({
      ...DEFAULT_RENDERER_OPTIONS,
      ...this.baseOptions
    });
  }
  renderSingleToken(tokens, token, options, env) {
    const rules = this.rules;
    const type = token.type;
    if (type === "code_block" && rules.code_block === defaultRules.code_block) return renderCodeBlockToken(token);
    if (type === "html_block" && rules.html_block === defaultRules.html_block) return token.content;
    const merged = this.mergeOptions(options);
    const envRef = env ?? {};
    if (type === "inline") return this.renderInlineTokens(token.children || [], merged, envRef);
    const rule = rules[type];
    if (!rule) return token.block ? this.renderToken(tokens, 0, merged) : renderFlatToken(token, merged.xhtmlOut === true);
    if (type === "fence" && rule === defaultRules.fence) return renderFenceSyncToken(token, merged, this);
    const rendered = rule(tokens, 0, merged, envRef, this);
    if (typeof rendered === "string") return rendered;
    return ensureSyncResult(rendered, type);
  }
  renderInlineTokens(tokens, options, env) {
    if (!tokens || tokens.length === 0) return "";
    const rules = this.rules;
    const textRule = rules.text;
    const textSpecialRule = rules.text_special;
    const softbreakRule = rules.softbreak;
    const hardbreakRule = rules.hardbreak;
    const htmlInlineRule = rules.html_inline;
    const codeInlineRule = rules.code_inline;
    const linkOpenRule = rules.link_open;
    const linkCloseRule = rules.link_close;
    const emOpenRule = rules.em_open;
    const emCloseRule = rules.em_close;
    const strongOpenRule = rules.strong_open;
    const strongCloseRule = rules.strong_close;
    const xhtmlOut = options.xhtmlOut === true;
    const inlineBreak = xhtmlOut ? "<br />\n" : "<br>\n";
    const softbreak = options.breaks ? inlineBreak : "\n";
    if (tokens.length === 1) return renderSingleInlineTokenSync(tokens, options, env, this, rules, inlineBreak, softbreak);
    let result = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (token.type === "link_open" && !linkOpenRule && !linkCloseRule && i2 + 2 < tokens.length) {
        const bodyToken = tokens[i2 + 1];
        if (tokens[i2 + 2].type === "link_close" && canUseLinkInlineFastPath(bodyToken)) {
          const renderedLink = `${renderLinkOpenToken(token) + renderSingleInlineTokenSync([bodyToken], options, env, this, rules, inlineBreak, softbreak)}</a>`;
          if (softbreakRule === defaultRules.softbreak && i2 + 3 < tokens.length && tokens[i2 + 3].type === "softbreak") {
            result += renderedLink + softbreak;
            i2 += 3;
            continue;
          }
          result += renderedLink;
          i2 += 2;
          continue;
        }
      }
      if (token.type === "link_open" && !linkOpenRule && !linkCloseRule && i2 + 1 < tokens.length) {
        if (tokens[i2 + 1].type === "link_close") {
          result += `${renderLinkOpenToken(token)}</a>`;
          i2 += 1;
          continue;
        }
      }
      if (token.type === "em_open" && !emOpenRule && !emCloseRule && i2 + 2 < tokens.length) {
        const bodyToken = tokens[i2 + 1];
        if (tokens[i2 + 2].type === "em_close" && canUseWrappedInlineFastPath(bodyToken)) {
          result += `<em>${renderSingleInlineTokenSync([bodyToken], options, env, this, rules, inlineBreak, softbreak)}</em>`;
          i2 += 2;
          continue;
        }
      }
      if (token.type === "strong_open" && !strongOpenRule && !strongCloseRule && i2 + 2 < tokens.length) {
        const bodyToken = tokens[i2 + 1];
        if (tokens[i2 + 2].type === "strong_close" && canUseWrappedInlineFastPath(bodyToken)) {
          result += `<strong>${renderSingleInlineTokenSync([bodyToken], options, env, this, rules, inlineBreak, softbreak)}</strong>`;
          i2 += 2;
          continue;
        }
      }
      switch (token.type) {
        case "text":
          if (textRule === defaultRules.text) {
            const escaped = token.content.length === 0 ? "" : escapeHtml$2(token.content);
            if (htmlInlineRule === defaultRules.html_inline && i2 + 1 < tokens.length && tokens[i2 + 1].type === "html_inline") {
              result += escaped + tokens[++i2].content;
              while (i2 + 1 < tokens.length && tokens[i2 + 1].type === "html_inline") result += tokens[++i2].content;
              continue;
            }
            result += escaped;
            continue;
          }
          break;
        case "text_special":
          if (textSpecialRule === defaultRules.text_special) {
            if (token.content.length !== 0) result += escapeHtml$2(token.content);
            continue;
          }
          break;
        case "softbreak":
          if (softbreakRule === defaultRules.softbreak) {
            result += softbreak;
            continue;
          }
          break;
        case "hardbreak":
          if (hardbreakRule === defaultRules.hardbreak) {
            result += inlineBreak;
            continue;
          }
          break;
        case "html_inline":
          if (htmlInlineRule === defaultRules.html_inline) {
            result += token.content;
            while (i2 + 1 < tokens.length && tokens[i2 + 1].type === "html_inline") result += tokens[++i2].content;
            continue;
          }
          break;
        case "code_inline":
          if (codeInlineRule === defaultRules.code_inline) {
            result += renderCodeInlineToken(token);
            continue;
          }
          break;
        default:
          break;
      }
      const rule = rules[token.type];
      if (!rule) {
        result += token.block ? this.renderToken(tokens, i2, options) : renderFlatToken(token, xhtmlOut);
        continue;
      }
      const rendered = rule(tokens, i2, options, env, this);
      if (typeof rendered === "string") result += rendered;
      else result += ensureSyncResult(rendered, token.type);
    }
    return result;
  }
  async renderInlineTokensAsync(tokens, options, env) {
    if (!tokens || tokens.length === 0) return "";
    const rules = this.rules;
    let result = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const rule = rules[tokens[i2].type];
      if (rule) result += await resolveResult(rule(tokens, i2, options, env, this));
      else result += this.renderToken(tokens, i2, options);
    }
    return result;
  }
  renderInlineAsTextInternal(tokens, options, env) {
    if (!tokens || tokens.length === 0) return "";
    let output = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      switch (token.type) {
        case "text":
        case "text_special":
          output += token.content;
          break;
        case "image":
          output += this.renderInlineAsTextInternal(token.children || [], options, env);
          break;
        case "html_inline":
        case "html_block":
          output += token.content;
          break;
        case "softbreak":
        case "hardbreak":
          output += "\n";
          break;
        default:
          break;
      }
    }
    return output;
  }
};
var renderer_default = Renderer;
var DEFAULTS = {
  maxChunkChars: 1e4,
  maxChunkLines: 200,
  fenceAware: true,
  maxChunks: void 0
};
function chunkedParse(md, src, env = {}, opts) {
  const options = {
    ...DEFAULTS,
    ...opts || {}
  };
  let ranges = splitIntoChunkRanges(src, options);
  if (options.maxChunks && ranges.length > options.maxChunks) ranges = rebalanceChunkRanges(ranges, options.maxChunks);
  let lineOffset = 0;
  const out = [];
  try {
    env.__mdtsChunkInfo = {
      count: ranges.length,
      maxChunkChars: options.maxChunkChars,
      maxChunkLines: options.maxChunkLines
    };
  } catch {
  }
  for (let i2 = 0; i2 < ranges.length; i2++) {
    const range = ranges[i2];
    const ch = src.slice(range.start, range.end);
    const tokens = md.core.parse(ch, env, md).tokens;
    if (lineOffset !== 0 && tokens.length) shiftTokenLines$2(tokens, lineOffset);
    appendTokens$2(out, tokens);
    lineOffset += range.lineCount;
  }
  return out;
}
function splitIntoChunkRanges(src, opts, final = true) {
  const chunks = [];
  let charCount = 0;
  let lineCount = 0;
  let chunkStart = 0;
  let chunkLines = 0;
  let sinceBlankLines = 0;
  let sinceBlankChars = 0;
  let inFence = null;
  function flush(end) {
    if (end <= chunkStart) return;
    chunks.push({
      start: chunkStart,
      end,
      lineCount: chunkLines
    });
    chunkStart = end;
    charCount = 0;
    lineCount = 0;
    chunkLines = 0;
  }
  for (let lineStart = 0; lineStart < src.length; ) {
    let lineEnd = src.indexOf("\n", lineStart);
    let lineEndWithNl = lineEnd;
    if (lineEnd === -1) {
      lineEnd = src.length;
      lineEndWithNl = src.length;
    } else lineEndWithNl = lineEnd + 1;
    const blank = isBlankLine$1(src, lineStart, lineEnd);
    if (opts.fenceAware) {
      let p = lineStart;
      while (p < lineEnd) {
        const c = src.charCodeAt(p);
        if (c === 32 || c === 9) p++;
        else break;
      }
      const ch = src[p];
      if (ch === "`" || ch === "~") {
        let q = p;
        while (q < lineEnd && src[q] === ch) q++;
        const runLen = q - p;
        if (runLen >= 3) {
          if (!inFence) inFence = {
            marker: ch,
            length: runLen
          };
          else if (inFence.marker === ch && runLen >= inFence.length) inFence = null;
        }
      }
    }
    const lineWithNlLen = lineEndWithNl - lineStart;
    charCount += lineWithNlLen;
    lineCount += 1;
    chunkLines += 1;
    if (blank) {
      sinceBlankLines = 0;
      sinceBlankChars = 0;
    } else {
      sinceBlankLines += 1;
      sinceBlankChars += lineWithNlLen;
    }
    const atBlankBoundary = blank;
    if ((charCount >= opts.maxChunkChars || lineCount >= opts.maxChunkLines) && !inFence) if (atBlankBoundary) flush(lineEndWithNl);
    else {
      const maxSinceBlankLines = Math.max(10, Math.floor(opts.maxChunkLines * 0.5));
      const maxSinceBlankChars = Math.max(opts.maxChunkChars, 8e3);
      if (sinceBlankLines >= maxSinceBlankLines || sinceBlankChars >= maxSinceBlankChars) flush(lineEndWithNl);
    }
    lineStart = lineEndWithNl;
  }
  if (final) flush(src.length);
  return chunks;
}
function shiftTokenLines$2(tokens, offset3) {
  if (offset3 === 0) return;
  const stack = [];
  for (let i2 = tokens.length - 1; i2 >= 0; i2--) stack.push(tokens[i2]);
  while (stack.length) {
    const t2 = stack.pop();
    if (t2.map) {
      t2.map[0] += offset3;
      t2.map[1] += offset3;
    }
    if (t2.children) for (let i2 = t2.children.length - 1; i2 >= 0; i2--) stack.push(t2.children[i2]);
  }
}
function appendTokens$2(out, tokens) {
  for (let i2 = 0; i2 < tokens.length; i2++) out.push(tokens[i2]);
}
function rebalanceChunkRanges(chunks, maxChunks) {
  if (chunks.length <= maxChunks) return chunks;
  const out = [];
  let index = 0;
  for (let group = 0; group < maxChunks; group++) {
    const groupsLeft = maxChunks - group;
    const chunksLeft = chunks.length - index;
    const take = Math.ceil(chunksLeft / groupsLeft);
    const slice = chunks.slice(index, index + take);
    let lineCount = 0;
    for (let i2 = 0; i2 < slice.length; i2++) lineCount += slice[i2].lineCount;
    out.push({
      start: slice[0].start,
      end: slice[slice.length - 1].end,
      lineCount
    });
    index += take;
  }
  return out;
}
function isBlankLine$1(src, start, end) {
  for (let i2 = start; i2 < end; i2++) {
    const ch = src.charCodeAt(i2);
    if (ch !== 32 && ch !== 9 && ch !== 13) return false;
  }
  return true;
}
var clamp = (v, lo2, hi2) => v < lo2 ? lo2 : v > hi2 ? hi2 : v;
var FULL_DISCRETE_RECOMMENDATIONS = [
  {
    max: 5e3,
    strategy: "discrete",
    maxChunkChars: 32e3,
    maxChunkLines: 150,
    maxChunks: 8,
    notes: "<=5k"
  },
  {
    max: 2e4,
    strategy: "discrete",
    maxChunkChars: 24e3,
    maxChunkLines: 200,
    maxChunks: 12,
    notes: "<=20k"
  },
  {
    max: 1e5,
    strategy: "plain",
    notes: "<=100k plain"
  },
  {
    max: 2e5,
    strategy: "discrete",
    maxChunkChars: 2e4,
    maxChunkLines: 150,
    maxChunks: 12,
    notes: "<=200k"
  },
  {
    max: 5e5,
    strategy: "discrete",
    maxChunkChars: 64e3,
    maxChunkLines: 700,
    maxChunks: 16,
    notes: "<=500k"
  },
  {
    max: 5e6,
    strategy: "discrete",
    maxChunkChars: 64e3,
    maxChunkLines: 700,
    maxChunks: 16,
    notes: "<=5M"
  }
];
var STREAM_DISCRETE_RECOMMENDATIONS = [
  {
    max: 5e3,
    strategy: "discrete",
    maxChunkChars: 16e3,
    maxChunkLines: 250,
    maxChunks: 8,
    notes: "<=5k"
  },
  {
    max: 2e4,
    strategy: "discrete",
    maxChunkChars: 2e4,
    maxChunkLines: 200,
    maxChunks: 24,
    notes: "<=20k"
  },
  {
    max: 1e5,
    strategy: "discrete",
    maxChunkChars: 2e4,
    maxChunkLines: 200,
    maxChunks: 24,
    notes: "<=100k"
  },
  {
    max: 5e5,
    strategy: "discrete",
    maxChunkChars: 64e3,
    maxChunkLines: 700,
    maxChunks: 32,
    notes: "<=500k"
  },
  {
    max: 5e6,
    strategy: "discrete",
    maxChunkChars: 64e3,
    maxChunkLines: 700,
    maxChunks: 32,
    notes: "<=5M"
  }
];
function toRecommendation(fenceAware, discrete) {
  return {
    strategy: discrete.strategy,
    maxChunkChars: discrete.maxChunkChars,
    maxChunkLines: discrete.maxChunkLines,
    maxChunks: discrete.maxChunks,
    fenceAware,
    notes: discrete.notes
  };
}
function recommendFullChunkStrategy(sizeChars, sizeLines = Math.max(0, sizeChars / 40 | 0), opts = {}) {
  const fenceAware = opts.fullChunkFenceAware ?? true;
  const target = opts.fullChunkTargetChunks ?? 8;
  const adaptive = opts.fullChunkAdaptive !== false;
  for (let i2 = 0; i2 < FULL_DISCRETE_RECOMMENDATIONS.length; i2++) {
    const rec = FULL_DISCRETE_RECOMMENDATIONS[i2];
    if (sizeChars <= rec.max) {
      if (rec.strategy !== "adaptive") return toRecommendation(fenceAware, rec);
      break;
    }
  }
  if (sizeChars > 5e6) return {
    strategy: "plain",
    fenceAware,
    notes: ">5M plain"
  };
  if (adaptive) return {
    strategy: "adaptive",
    maxChunkChars: clamp(Math.ceil(sizeChars / target), 8e3, 64e3),
    maxChunkLines: clamp(Math.ceil(sizeLines / target), 150, 700),
    maxChunks: clamp(Math.ceil(sizeChars / 64e3), target, 16),
    fenceAware,
    notes: "adaptive fallback"
  };
  return {
    strategy: "discrete",
    maxChunkChars: opts.fullChunkSizeChars ?? 1e4,
    maxChunkLines: opts.fullChunkSizeLines ?? 200,
    fenceAware,
    maxChunks: opts.fullChunkMaxChunks
  };
}
function recommendStreamChunkStrategy(sizeChars, sizeLines = Math.max(0, sizeChars / 40 | 0), opts = {}) {
  const fenceAware = opts.streamChunkFenceAware ?? true;
  const target = opts.streamChunkTargetChunks ?? 8;
  const adaptive = opts.streamChunkAdaptive !== false;
  for (let i2 = 0; i2 < STREAM_DISCRETE_RECOMMENDATIONS.length; i2++) {
    const rec = STREAM_DISCRETE_RECOMMENDATIONS[i2];
    if (sizeChars <= rec.max) {
      if (rec.strategy !== "adaptive") return toRecommendation(fenceAware, rec);
      break;
    }
  }
  if (sizeChars > 5e6) return {
    strategy: "plain",
    fenceAware,
    notes: ">5M plain"
  };
  if (adaptive) return {
    strategy: "adaptive",
    maxChunkChars: clamp(Math.ceil(sizeChars / target), 8e3, 64e3),
    maxChunkLines: clamp(Math.ceil(sizeLines / target), 150, 700),
    maxChunks: clamp(Math.ceil(sizeChars / 64e3), target, 32),
    fenceAware,
    notes: "adaptive fallback"
  };
  return {
    strategy: "discrete",
    maxChunkChars: opts.streamChunkSizeChars ?? 1e4,
    maxChunkLines: opts.streamChunkSizeLines ?? 200,
    maxChunks: opts.streamChunkMaxChunks,
    fenceAware
  };
}
var DEFAULT_AUTO_UNBOUNDED_THRESHOLD_CHARS = 4e6;
var DEFAULT_AUTO_UNBOUNDED_THRESHOLD_LINES = 8e4;
var DEFAULT_FULL_CHUNK_CHARS = 1e4;
var DEFAULT_FULL_CHUNK_LINES = 200;
var DEFAULT_STREAM_CHUNK_CHARS = 1e4;
var DEFAULT_STREAM_CHUNK_LINES = 200;
function appendTokens$1(out, tokens) {
  for (let i2 = 0; i2 < tokens.length; i2++) out.push(tokens[i2]);
}
function shiftTokenLines$1(tokens, offset3) {
  if (offset3 === 0) return;
  const stack = [];
  for (let i2 = tokens.length - 1; i2 >= 0; i2--) stack.push(tokens[i2]);
  while (stack.length) {
    const token = stack.pop();
    if (token.map) {
      token.map[0] += offset3;
      token.map[1] += offset3;
    }
    if (token.children) for (let i2 = token.children.length - 1; i2 >= 0; i2--) stack.push(token.children[i2]);
  }
}
function estimateLines(src) {
  if (src.length === 0) return 0;
  return countLines(src) + (src.charCodeAt(src.length - 1) === 10 ? 0 : 1);
}
function isBlankLine(src, start, end) {
  for (let i2 = start; i2 < end; i2++) {
    const ch = src.charCodeAt(i2);
    if (ch !== 32 && ch !== 9 && ch !== 13) return false;
  }
  return true;
}
function endsInsideFence(src, fenceAware) {
  if (!fenceAware || src.length === 0) return false;
  let inFence = null;
  for (let lineStart = 0; lineStart < src.length; ) {
    let lineEnd = src.indexOf("\n", lineStart);
    if (lineEnd === -1) lineEnd = src.length;
    let p = lineStart;
    while (p < lineEnd) {
      const c = src.charCodeAt(p);
      if (c === 32 || c === 9) p++;
      else break;
    }
    const ch = src[p];
    if (ch === "`" || ch === "~") {
      let q = p;
      while (q < lineEnd && src[q] === ch) q++;
      const runLen = q - p;
      if (runLen >= 3) {
        if (!inFence) inFence = {
          marker: ch,
          length: runLen
        };
        else if (inFence.marker === ch && runLen >= inFence.length) inFence = null;
      }
    }
    lineStart = lineEnd === src.length ? src.length : lineEnd + 1;
  }
  return inFence !== null;
}
function endsAtBlankBoundary(src, fenceAware) {
  if (src.length === 0 || src.charCodeAt(src.length - 1) !== 10) return false;
  let prevNl = src.length - 2;
  while (prevNl >= 0 && src.charCodeAt(prevNl) !== 10) prevNl--;
  if (!isBlankLine(src, prevNl + 1, src.length - 1)) return false;
  return !endsInsideFence(src, fenceAware);
}
function resolveWindow(md, totalChars, totalLines, opts = {}) {
  const mode = opts.mode ?? "full";
  const fenceAware = opts.fenceAware ?? (mode === "stream" ? md.options.streamChunkFenceAware ?? true : md.options.fullChunkFenceAware ?? true);
  if (opts.maxChunkChars !== void 0 || opts.maxChunkLines !== void 0 || opts.autoTune === false) {
    const maxChunkChars = opts.maxChunkChars ?? (mode === "stream" ? md.options.streamChunkSizeChars ?? DEFAULT_STREAM_CHUNK_CHARS : md.options.fullChunkSizeChars ?? DEFAULT_FULL_CHUNK_CHARS);
    const maxChunkLines = opts.maxChunkLines ?? (mode === "stream" ? md.options.streamChunkSizeLines ?? DEFAULT_STREAM_CHUNK_LINES : md.options.fullChunkSizeLines ?? DEFAULT_FULL_CHUNK_LINES);
    return {
      maxChunkChars,
      maxChunkLines,
      holdBelowChars: maxChunkChars,
      holdBelowLines: maxChunkLines,
      fenceAware
    };
  }
  if (mode === "stream") {
    if (totalChars <= 5e3) return {
      maxChunkChars: 16e3,
      maxChunkLines: 250,
      holdBelowChars: 16e3,
      holdBelowLines: 250,
      fenceAware
    };
    if (totalChars <= 2e4) return {
      maxChunkChars: 16e3,
      maxChunkLines: 200,
      holdBelowChars: 16e3,
      holdBelowLines: 200,
      fenceAware
    };
    if (totalChars <= 5e4) return {
      maxChunkChars: 16e3,
      maxChunkLines: 250,
      holdBelowChars: 16e3,
      holdBelowLines: 250,
      fenceAware
    };
    if (totalChars <= 5e5) return {
      maxChunkChars: 32e3,
      maxChunkLines: 350,
      holdBelowChars: 32e3,
      holdBelowLines: 350,
      fenceAware
    };
    return {
      maxChunkChars: 64e3,
      maxChunkLines: 700,
      holdBelowChars: 64e3,
      holdBelowLines: 700,
      fenceAware
    };
  }
  if (totalChars <= 1e5 && totalLines <= 2500) return {
    maxChunkChars: 32e3,
    maxChunkLines: 350,
    holdBelowChars: 1e5,
    holdBelowLines: 2500,
    fenceAware
  };
  if (totalChars <= 2e5) return {
    maxChunkChars: 2e4,
    maxChunkLines: 150,
    holdBelowChars: 2e4,
    holdBelowLines: 150,
    fenceAware
  };
  if (totalChars <= 5e5) return {
    maxChunkChars: 32e3,
    maxChunkLines: 350,
    holdBelowChars: 32e3,
    holdBelowLines: 350,
    fenceAware
  };
  return {
    maxChunkChars: 64e3,
    maxChunkLines: 700,
    holdBelowChars: 64e3,
    holdBelowLines: 700,
    fenceAware
  };
}
var UnboundedBuffer = class {
  constructor(md, opts = {}) {
    __publicField(this, "md");
    __publicField(this, "options");
    __publicField(this, "pending", "");
    __publicField(this, "tokens", []);
    __publicField(this, "committedChars", 0);
    __publicField(this, "committedLines", 0);
    __publicField(this, "fedChunks", 0);
    __publicField(this, "parsedChunks", 0);
    this.md = md;
    this.options = {
      mode: "full",
      autoTune: true,
      retainTokens: true,
      ...opts
    };
    if (this.options.retainTokens === false && !this.options.onChunkTokens) throw new Error("UnboundedBuffer with retainTokens=false requires onChunkTokens");
  }
  feed(chunk) {
    if (!chunk) return;
    this.pending += chunk;
    this.fedChunks += 1;
  }
  flushAvailable(env = {}) {
    if (!this.pending) return null;
    const window2 = this.resolveWindow();
    const pendingLines = estimateLines(this.pending);
    if (this.pending.length < window2.holdBelowChars && pendingLines < window2.holdBelowLines) {
      this.updateEnvDiagnostics(env, window2, pendingLines);
      return null;
    }
    const ranges = splitIntoChunkRanges(this.pending, {
      maxChunkChars: window2.maxChunkChars,
      maxChunkLines: window2.maxChunkLines,
      fenceAware: window2.fenceAware,
      maxChunks: void 0
    }, false);
    if (!ranges.length) {
      this.updateEnvDiagnostics(env, window2, pendingLines);
      return null;
    }
    const consumed = this.commitRanges(ranges, env);
    this.pending = this.pending.slice(consumed);
    this.updateEnvDiagnostics(env, window2, estimateLines(this.pending));
    return this.tokens;
  }
  flushIfBoundary(env = {}) {
    if (!this.pending) return null;
    const window2 = this.resolveWindow();
    if (!endsAtBlankBoundary(this.pending, window2.fenceAware)) {
      this.updateEnvDiagnostics(env, window2, estimateLines(this.pending));
      return null;
    }
    const ranges = splitIntoChunkRanges(this.pending, {
      maxChunkChars: window2.maxChunkChars,
      maxChunkLines: window2.maxChunkLines,
      fenceAware: window2.fenceAware,
      maxChunks: void 0
    }, true);
    if (!ranges.length) {
      this.updateEnvDiagnostics(env, window2, estimateLines(this.pending));
      return null;
    }
    this.commitRanges(ranges, env);
    this.pending = "";
    this.updateEnvDiagnostics(env, window2, 0);
    return this.tokens;
  }
  flushForce(env = {}) {
    if (!this.pending) {
      const window$1 = this.resolveWindow();
      this.updateEnvDiagnostics(env, window$1, 0);
      return this.tokens;
    }
    const window2 = this.resolveWindow();
    const ranges = splitIntoChunkRanges(this.pending, {
      maxChunkChars: window2.maxChunkChars,
      maxChunkLines: window2.maxChunkLines,
      fenceAware: window2.fenceAware,
      maxChunks: void 0
    }, true);
    if (ranges.length) {
      this.commitRanges(ranges, env);
      this.pending = "";
    }
    this.updateEnvDiagnostics(env, window2, 0);
    return this.tokens;
  }
  reset() {
    this.pending = "";
    this.tokens = [];
    this.committedChars = 0;
    this.committedLines = 0;
    this.fedChunks = 0;
    this.parsedChunks = 0;
  }
  peek() {
    return this.tokens;
  }
  pendingText() {
    return this.pending;
  }
  stats() {
    return {
      mode: this.options.mode ?? "full",
      fedChunks: this.fedChunks,
      parsedChunks: this.parsedChunks,
      committedChars: this.committedChars,
      committedLines: this.committedLines,
      pendingChars: this.pending.length,
      pendingLines: estimateLines(this.pending),
      retainedTokens: this.options.retainTokens !== false
    };
  }
  resolveWindow() {
    const totalChars = this.committedChars + this.pending.length;
    const totalLines = this.committedLines + estimateLines(this.pending);
    return resolveWindow(this.md, totalChars, totalLines, this.options);
  }
  commitRanges(ranges, env) {
    if (!ranges.length) return 0;
    let consumed = 0;
    for (let i2 = 0; i2 < ranges.length; i2++) {
      const range = ranges[i2];
      const src = this.pending.slice(range.start, range.end);
      const nextTokens = this.md.core.parse(src, env, this.md).tokens;
      const startOffset = this.committedChars;
      const startLine = this.committedLines;
      if (startLine !== 0 && nextTokens.length) shiftTokenLines$1(nextTokens, startLine);
      if (this.options.retainTokens !== false) appendTokens$1(this.tokens, nextTokens);
      this.committedChars += src.length;
      this.committedLines += range.lineCount;
      this.parsedChunks += 1;
      if (this.options.onChunkTokens) this.options.onChunkTokens(nextTokens, {
        chunkIndex: this.parsedChunks,
        chunkChars: src.length,
        chunkLines: range.lineCount,
        tokenCount: nextTokens.length,
        startOffset,
        endOffset: this.committedChars,
        startLine,
        endLine: this.committedLines
      });
      consumed = range.end;
    }
    return consumed;
  }
  updateEnvDiagnostics(env, window2, pendingLines) {
    try {
      env.__mdtsUnboundedInfo = {
        mode: this.options.mode ?? "full",
        maxChunkChars: window2.maxChunkChars,
        maxChunkLines: window2.maxChunkLines,
        committedChars: this.committedChars,
        committedLines: this.committedLines,
        pendingChars: this.pending.length,
        pendingLines,
        fedChunks: this.fedChunks,
        parsedChunks: this.parsedChunks
      };
    } catch {
    }
  }
};
function parseIterable(md, chunks, env = {}, opts = {}) {
  const buffer = new UnboundedBuffer(md, {
    mode: "full",
    ...opts
  });
  for (const chunk of chunks) {
    buffer.feed(chunk);
    buffer.flushAvailable(env);
  }
  return buffer.flushForce(env);
}
async function parseAsyncIterable(md, chunks, env = {}, opts = {}) {
  const buffer = new UnboundedBuffer(md, {
    mode: "full",
    ...opts
  });
  for await (const chunk of chunks) {
    buffer.feed(chunk);
    buffer.flushAvailable(env);
  }
  return buffer.flushForce(env);
}
function parseIterableToSink(md, chunks, onChunkTokens, env = {}, opts = {}) {
  const buffer = new UnboundedBuffer(md, {
    mode: "full",
    ...opts,
    retainTokens: false,
    onChunkTokens
  });
  for (const chunk of chunks) {
    buffer.feed(chunk);
    buffer.flushAvailable(env);
  }
  buffer.flushForce(env);
  return buffer.stats();
}
async function parseAsyncIterableToSink(md, chunks, onChunkTokens, env = {}, opts = {}) {
  const buffer = new UnboundedBuffer(md, {
    mode: "full",
    ...opts,
    retainTokens: false,
    onChunkTokens
  });
  for await (const chunk of chunks) {
    buffer.feed(chunk);
    buffer.flushAvailable(env);
  }
  buffer.flushForce(env);
  return buffer.stats();
}
function shouldAutoUseUnbounded(md, totalChars, totalLines) {
  if (md.options.autoUnbounded === false) return false;
  const thresholdChars = md.options.autoUnboundedThresholdChars ?? DEFAULT_AUTO_UNBOUNDED_THRESHOLD_CHARS;
  const thresholdLines = md.options.autoUnboundedThresholdLines ?? DEFAULT_AUTO_UNBOUNDED_THRESHOLD_LINES;
  return totalChars >= thresholdChars || totalLines >= thresholdLines;
}
function getAutoUnboundedDecision(md, totalChars, totalLines) {
  if (md.options.autoUnbounded === false) return "no";
  if (totalChars >= (md.options.autoUnboundedThresholdChars ?? DEFAULT_AUTO_UNBOUNDED_THRESHOLD_CHARS)) return "yes";
  const thresholdLines = md.options.autoUnboundedThresholdLines ?? DEFAULT_AUTO_UNBOUNDED_THRESHOLD_LINES;
  if (totalLines !== void 0) return totalLines >= thresholdLines ? "yes" : "no";
  if (totalChars + 1 < thresholdLines) return "no";
  return "need-lines";
}
function parseStringUnbounded(md, src, env = {}, opts = {}) {
  const tokens = [];
  const buffer = new UnboundedBuffer(md, {
    mode: "full",
    ...opts,
    retainTokens: false,
    onChunkTokens(nextTokens) {
      appendTokens$1(tokens, nextTokens);
    }
  });
  buffer.feed(src);
  buffer.flushForce(env);
  return tokens;
}
var EMPTY_TOKENS = [];
function makeEmptyStats() {
  return {
    total: 0,
    cacheHits: 0,
    appendHits: 0,
    unboundedAppendHits: 0,
    tailHits: 0,
    fullParses: 0,
    resets: 0,
    chunkedParses: 0,
    lastMode: "idle"
  };
}
var StreamParser = class {
  constructor(core) {
    __publicField(this, "core");
    __publicField(this, "cache", null);
    __publicField(this, "stats", makeEmptyStats());
    __publicField(this, "MIN_SIZE_FOR_OPTIMIZATION", 1e3);
    __publicField(this, "DEFAULT_SKIP_CACHE_CHARS", 1e6);
    __publicField(this, "DEFAULT_SKIP_CACHE_LINES", 1e5);
    __publicField(this, "IMPLICIT_STREAM_CHUNK_MIN_CHARS", 16e4);
    __publicField(this, "MIN_LIST_LINES_FOR_MERGE", 80);
    __publicField(this, "MIN_LIST_CHARS_FOR_MERGE", 800);
    __publicField(this, "MIN_TABLE_LINES_FOR_MERGE", 48);
    __publicField(this, "MIN_TABLE_CHARS_FOR_MERGE", 1200);
    __publicField(this, "MIN_UNBOUNDED_APPEND_TOTAL_CHARS", 5e5);
    __publicField(this, "MIN_UNBOUNDED_APPEND_CHARS", 64e3);
    __publicField(this, "MIN_UNBOUNDED_APPEND_LINES", 700);
    this.core = core;
  }
  reset() {
    this.cache = null;
    this.stats.resets += 1;
    this.stats.lastMode = "reset";
  }
  resetStats() {
    const { resets } = this.stats;
    this.stats = makeEmptyStats();
    this.stats.resets = resets;
  }
  parse(src, env, md) {
    var _a3, _b, _c, _d, _e, _f, _g, _h, _i2, _j, _k, _l2, _m, _n2, _o2, _p, _q, _r2, _s, _t2, _u, _v;
    const envProvided = env;
    const cached = this.cache;
    if (!cached || envProvided && envProvided !== cached.env) {
      const workingEnv = envProvided ?? {};
      const explicitChunkFallbackSetting$1 = !!md.__explicitStreamChunkFallbackSetting;
      const wantsChunking$1 = !!((_a3 = md.options) == null ? void 0 : _a3.streamChunkedFallback);
      const allowImplicitChunk$1 = !explicitChunkFallbackSetting$1;
      const chunkedEnabled$1 = wantsChunking$1 || allowImplicitChunk$1;
      const chunkAdaptive$1 = ((_b = md.options) == null ? void 0 : _b.streamChunkAdaptive) !== false;
      const targetChunks$1 = ((_c = md.options) == null ? void 0 : _c.streamChunkTargetChunks) ?? 8;
      const chunkSizeCharsCfg$1 = (_d = md.options) == null ? void 0 : _d.streamChunkSizeChars;
      const chunkSizeLinesCfg$1 = (_e = md.options) == null ? void 0 : _e.streamChunkSizeLines;
      const chunkMaxChunksCfg$1 = (_f = md.options) == null ? void 0 : _f.streamChunkMaxChunks;
      const explicitChunkConfig$1 = !!md.__explicitStreamChunkConfig;
      const auto$1 = ((_g = md.options) == null ? void 0 : _g.autoTuneChunks) !== false;
      const chunkFenceAware$1 = ((_h = md.options) == null ? void 0 : _h.streamChunkFenceAware) ?? true;
      const skipCacheChars = ((_i2 = md.options) == null ? void 0 : _i2.streamSkipCacheAboveChars) ?? this.DEFAULT_SKIP_CACHE_CHARS;
      const skipCacheLines = ((_j = md.options) == null ? void 0 : _j.streamSkipCacheAboveLines) ?? this.DEFAULT_SKIP_CACHE_LINES;
      let srcLineCount;
      let isVeryLargeOneShot = src.length >= skipCacheChars;
      if (!isVeryLargeOneShot && skipCacheLines !== void 0) {
        srcLineCount = countLines(src);
        isVeryLargeOneShot = srcLineCount >= skipCacheLines;
      }
      if (isVeryLargeOneShot) {
        const parsed$2 = this.parseFullDocument(src, workingEnv, md, srcLineCount, false);
        this.stats.total += 1;
        this.stats.fullParses += 1;
        this.stats.lastMode = "full";
        setStrategyDiagnostics(workingEnv, {
          area: "stream",
          path: "stream-full",
          reason: "skip-cache-large-one-shot",
          unbounded: !!workingEnv.__mdtsUnboundedInfo
        });
        return parsed$2.tokens;
      } else if (chunkedEnabled$1) {
        const clamp$1 = (v, lo2, hi2) => v < lo2 ? lo2 : v > hi2 ? hi2 : v;
        if (srcLineCount === void 0) srcLineCount = countLines(src);
        const recommendation = auto$1 && !explicitChunkConfig$1 ? recommendStreamChunkStrategy(src.length, srcLineCount, md.options) : null;
        const useChars = (recommendation == null ? void 0 : recommendation.maxChunkChars) ?? (chunkAdaptive$1 ? clamp$1(Math.ceil(src.length / targetChunks$1), 8e3, 64e3) : chunkSizeCharsCfg$1 ?? 1e4);
        const useLines = (recommendation == null ? void 0 : recommendation.maxChunkLines) ?? (chunkAdaptive$1 ? clamp$1(Math.ceil(srcLineCount / targetChunks$1), 150, 700) : chunkSizeLinesCfg$1 ?? 200);
        const useMaxChunks = (recommendation == null ? void 0 : recommendation.maxChunks) ?? (chunkAdaptive$1 ? clamp$1(Math.ceil(src.length / 64e3), targetChunks$1, 32) : chunkMaxChunksCfg$1);
        const hasTrailingNewline = src.length > 0 && src.charCodeAt(src.length - 1) === 10;
        const shouldAutoChunk = allowImplicitChunk$1 && src.length >= this.IMPLICIT_STREAM_CHUNK_MIN_CHARS && (recommendation == null ? void 0 : recommendation.strategy) !== "plain";
        if ((wantsChunking$1 || shouldAutoChunk) && (src.length >= useChars * 2 || srcLineCount >= useLines * 2) && hasTrailingNewline) {
          const tokens = chunkedParse(md, src, workingEnv, {
            maxChunkChars: useChars,
            maxChunkLines: useLines,
            fenceAware: (recommendation == null ? void 0 : recommendation.fenceAware) ?? chunkFenceAware$1,
            maxChunks: useMaxChunks
          });
          this.cache = {
            src,
            tokens,
            env: workingEnv,
            lineCount: srcLineCount,
            lastSegment: void 0
          };
          this.updateCacheLineCount(this.cache, srcLineCount);
          this.stats.total += 1;
          this.stats.chunkedParses = (this.stats.chunkedParses || 0) + 1;
          this.stats.lastMode = "chunked";
          setStrategyDiagnostics(workingEnv, {
            area: "stream",
            path: "stream-chunked",
            chunked: true,
            reason: wantsChunking$1 ? "explicit-initial-large-doc" : "default-initial-large-doc"
          });
          return tokens;
        }
      }
      const parsed$1 = this.parseFullDocument(src, workingEnv, md, srcLineCount);
      srcLineCount = parsed$1.lineCount;
      this.cache = {
        src,
        tokens: parsed$1.tokens,
        env: workingEnv,
        lineCount: srcLineCount,
        lastSegment: void 0
      };
      this.updateCacheLineCount(this.cache, srcLineCount);
      this.stats.total += 1;
      this.stats.fullParses += 1;
      this.stats.lastMode = "full";
      setStrategyDiagnostics(workingEnv, {
        area: "stream",
        path: "stream-full",
        reason: "initial-parse",
        unbounded: !!workingEnv.__mdtsUnboundedInfo
      });
      return parsed$1.tokens;
    }
    if (src === cached.src) {
      this.stats.total += 1;
      this.stats.cacheHits += 1;
      this.stats.lastMode = "cache";
      setStrategyDiagnostics(cached.env, {
        area: "stream",
        path: "stream-cache",
        reason: "same-source"
      });
      return cached.tokens;
    }
    const threshold = ((_k = md.options) == null ? void 0 : _k.streamOptimizationMinSize) ?? this.MIN_SIZE_FOR_OPTIMIZATION;
    if (cached.src.length < threshold && src.length < threshold * 1.5 && !src.startsWith(cached.src)) {
      const fallbackEnv$1 = envProvided ?? cached.env;
      const parsed$1 = this.parseFullDocument(src, fallbackEnv$1, md);
      const nextTokens$1 = parsed$1.tokens;
      const lineCount = parsed$1.lineCount;
      this.cache = {
        src,
        tokens: nextTokens$1,
        env: fallbackEnv$1,
        lineCount,
        lastSegment: void 0
      };
      this.updateCacheLineCount(this.cache, lineCount);
      this.stats.total += 1;
      this.stats.fullParses += 1;
      this.stats.lastMode = "full";
      setStrategyDiagnostics(fallbackEnv$1, {
        area: "stream",
        path: "stream-full",
        reason: "small-non-append",
        unbounded: !!fallbackEnv$1.__mdtsUnboundedInfo
      });
      return nextTokens$1;
    }
    const appended = this.getAppendedSegment(cached.src, src);
    if (appended && !this.shouldPreferTailReparseForAppend(cached)) {
      let appendedHasBlockConstructs = function(s2) {
        const len = s2.length;
        let lineStart = 0;
        while (lineStart <= len) {
          let lineEnd = s2.indexOf("\n", lineStart);
          if (lineEnd === -1) lineEnd = len;
          const hasLineBreak = lineEnd < len;
          let p = lineStart;
          let indent = 0;
          while (p < lineEnd) {
            const c = s2.charCodeAt(p);
            if (c === 32) {
              indent++;
              p++;
              if (indent >= 4) return true;
              continue;
            }
            if (c === 9) {
              indent += 4 - indent % 4;
              p++;
              if (indent >= 4) return true;
              continue;
            }
            break;
          }
          if (p < lineEnd) {
            const ch = s2.charCodeAt(p);
            switch (ch) {
              case 35: {
                let q = p;
                while (q < lineEnd && s2.charCodeAt(q) === 35) q++;
                const runLen = q - p;
                if (runLen > 0 && runLen <= 6) {
                  if (q < lineEnd) {
                    const next = s2.charCodeAt(q);
                    if (next === 32 || next === 9 || next === 13) return true;
                  } else if (q === lineEnd && hasLineBreak) return true;
                }
                break;
              }
              case 62: {
                const nextPos = p + 1;
                if (nextPos < lineEnd) {
                  const next = s2.charCodeAt(nextPos);
                  if (next === 32 || next === 9 || next === 13) return true;
                } else if (nextPos === lineEnd && hasLineBreak) return true;
                break;
              }
              case 45:
              case 42:
              case 43: {
                const nextPos = p + 1;
                if (nextPos < lineEnd) {
                  const next = s2.charCodeAt(nextPos);
                  if (next === 32 || next === 9 || next === 13) return true;
                } else if (nextPos === lineEnd && hasLineBreak) return true;
                break;
              }
              case 96:
              case 126: {
                let q = p;
                while (q < lineEnd && s2.charCodeAt(q) === ch) q++;
                if (q - p >= 3) return true;
                break;
              }
              default:
                if (ch >= 48 && ch <= 57) {
                  let q = p + 1;
                  while (q < lineEnd) {
                    const d2 = s2.charCodeAt(q);
                    if (d2 < 48 || d2 > 57) break;
                    q++;
                  }
                  if (q < lineEnd && s2.charCodeAt(q) === 46) {
                    const nextPos = q + 1;
                    if (nextPos < lineEnd) {
                      const next = s2.charCodeAt(nextPos);
                      if (next === 32 || next === 9 || next === 13) return true;
                    } else if (nextPos === lineEnd && hasLineBreak) return true;
                  }
                }
                break;
            }
          }
          if (lineEnd === len) break;
          lineStart = lineEnd + 1;
        }
        return false;
      };
      const cachedLineCount = cached.lineCount ?? countLines(cached.src);
      let ctxLines = 3;
      if (appended.length > 5e3) ctxLines = 8;
      else if (appended.length > 1e3) ctxLines = 6;
      else if (appended.length > 200) ctxLines = 4;
      ctxLines = Math.min(ctxLines, cachedLineCount);
      let appendedState = null;
      const ctxStrategy = ((_l2 = md.options) == null ? void 0 : _l2.streamContextParseStrategy) ?? "chars";
      const CONTEXT_PARSE_MIN_CHARS = ((_m = md.options) == null ? void 0 : _m.streamContextParseMinChars) ?? 200;
      const CONTEXT_PARSE_MIN_LINES = ((_n2 = md.options) == null ? void 0 : _n2.streamContextParseMinLines) ?? 2;
      let appendedLineCount = null;
      const getAppendedLineCount = () => {
        if (appendedLineCount === null) appendedLineCount = countLines(appended);
        return appendedLineCount;
      };
      const canDirectParseAppend = this.canDirectlyParseAppend(cached);
      const useUnboundedAppend = canDirectParseAppend && this.shouldUseUnboundedAppend(src, cached, appended);
      let shouldAttemptContext = false;
      if (!canDirectParseAppend) switch (ctxStrategy) {
        case "lines":
          shouldAttemptContext = getAppendedLineCount() >= CONTEXT_PARSE_MIN_LINES;
          break;
        case "constructs":
          if (appended.length >= CONTEXT_PARSE_MIN_CHARS) {
            shouldAttemptContext = true;
            break;
          }
          if (appendedHasBlockConstructs(appended)) {
            shouldAttemptContext = true;
            break;
          }
          shouldAttemptContext = getAppendedLineCount() >= CONTEXT_PARSE_MIN_LINES;
          break;
        case "chars":
        default:
          shouldAttemptContext = appended.length >= CONTEXT_PARSE_MIN_CHARS;
      }
      if (ctxLines > 0 && shouldAttemptContext) {
        const ctxSrc = this.getTailLines(cached.src, ctxLines) + appended;
        try {
          const ctxTokens = this.core.parse(ctxSrc, cached.env, md).tokens;
          const idx = ctxTokens.findIndex((t2) => t2.map && typeof t2.map[1] === "number" && t2.map[1] >= ctxLines);
          if (idx !== -1) {
            const appendedTokens = ctxTokens.slice(idx);
            const shiftBy = cachedLineCount - ctxLines;
            if (shiftBy !== 0) this.shiftTokenLines(appendedTokens, shiftBy);
            appendedState = { tokens: appendedTokens };
          }
        } catch {
          appendedState = null;
        }
      } else appendedState = null;
      if (!appendedState) {
        const lineOffset = cachedLineCount;
        if (useUnboundedAppend) {
          appendedState = { tokens: parseStringUnbounded(md, appended, cached.env, { mode: "stream" }) };
          if (lineOffset > 0) this.shiftTokenLines(appendedState.tokens, lineOffset);
        } else {
          const simpleState = this.core.parse(appended, cached.env, md);
          if (lineOffset > 0) this.shiftTokenLines(simpleState.tokens, lineOffset);
          appendedState = simpleState;
        }
      }
      if (cached.tokens.length > 0 && appendedState.tokens.length > 0) {
        const lastCached = cached.tokens[cached.tokens.length - 1];
        const firstApp = appendedState.tokens[0];
        try {
          if (lastCached.type === "inline" && firstApp.type === "inline") {
            if (firstApp.children && firstApp.children.length > 0) {
              if (!lastCached.children) lastCached.children = [];
              this.appendTokens(lastCached.children, firstApp.children);
            }
            lastCached.content = (lastCached.content || "") + (firstApp.content || "");
            appendedState.tokens.shift();
          }
        } catch {
        }
      }
      const appendStart = cached.tokens.length;
      if (appendedState.tokens.length > 0) {
        let tokenEquals = function(x, y) {
          if (!x || !y) return false;
          if (x.type !== y.type) return false;
          if (x.type === "inline") return (x.content || "") === (y.content || "");
          return true;
        };
        const cachedTail = cached.tokens;
        const a2 = appendedState.tokens;
        const maxCheck = Math.min(cachedTail.length, a2.length);
        let dup = 0;
        for (let n2 = maxCheck; n2 > 0; n2--) {
          let ok = true;
          for (let i2 = 0; i2 < n2; i2++) {
            const tailToken = cachedTail[cachedTail.length - n2 + i2];
            const prefToken = a2[i2];
            if (!tokenEquals(tailToken, prefToken)) {
              ok = false;
              break;
            }
          }
          if (ok) {
            dup = n2;
            break;
          }
        }
        if (dup > 0) a2.splice(0, dup);
        if (a2.length > 0) this.appendTokens(cached.tokens, a2);
      }
      cached.src = src;
      cached.lineCount = cachedLineCount + (appendedLineCount ?? countLines(appended));
      if (cached.tokens.length > appendStart) {
        const appendedLastSegment = this.getLastSegment(cached.tokens.slice(appendStart), src);
        if (appendedLastSegment) cached.lastSegment = {
          tokenStart: appendStart + appendedLastSegment.tokenStart,
          tokenEnd: appendStart + appendedLastSegment.tokenEnd,
          lineStart: appendedLastSegment.lineStart,
          lineEnd: appendedLastSegment.lineEnd,
          srcOffset: appendedLastSegment.srcOffset
        };
        else cached.lastSegment = void 0;
      } else cached.lastSegment = void 0;
      this.stats.total += 1;
      this.stats.appendHits += 1;
      if (useUnboundedAppend) this.stats.unboundedAppendHits = (this.stats.unboundedAppendHits || 0) + 1;
      this.stats.lastMode = "append";
      setStrategyDiagnostics(cached.env, {
        area: "stream",
        path: useUnboundedAppend ? "stream-unbounded-append" : "stream-append",
        reason: useUnboundedAppend ? "large-delta" : "safe-append",
        unbounded: useUnboundedAppend
      });
      return cached.tokens;
    }
    const fallbackEnv = envProvided ?? cached.env;
    const tailReparsed = this.tryTailSegmentReparse(src, cached, fallbackEnv, md);
    if (tailReparsed) {
      this.stats.total += 1;
      this.stats.tailHits += 1;
      this.stats.lastMode = "tail";
      setStrategyDiagnostics(fallbackEnv, {
        area: "stream",
        path: "stream-tail",
        reason: "tail-reparse"
      });
      return tailReparsed;
    }
    const explicitChunkFallbackSetting = !!md.__explicitStreamChunkFallbackSetting;
    const wantsChunking = !!((_o2 = md.options) == null ? void 0 : _o2.streamChunkedFallback);
    const allowImplicitChunk = !explicitChunkFallbackSetting && !appended;
    const chunkedEnabled = wantsChunking || allowImplicitChunk;
    const chunkAdaptive = ((_p = md.options) == null ? void 0 : _p.streamChunkAdaptive) !== false;
    const targetChunks = ((_q = md.options) == null ? void 0 : _q.streamChunkTargetChunks) ?? 8;
    const chunkSizeCharsCfg = (_r2 = md.options) == null ? void 0 : _r2.streamChunkSizeChars;
    const chunkSizeLinesCfg = (_s = md.options) == null ? void 0 : _s.streamChunkSizeLines;
    const chunkMaxChunksCfg = (_t2 = md.options) == null ? void 0 : _t2.streamChunkMaxChunks;
    const explicitChunkConfig = !!md.__explicitStreamChunkConfig;
    const auto = ((_u = md.options) == null ? void 0 : _u.autoTuneChunks) !== false;
    const chunkFenceAware = ((_v = md.options) == null ? void 0 : _v.streamChunkFenceAware) ?? true;
    let srcLineCount2 = cached.lineCount;
    if (chunkedEnabled) {
      if (srcLineCount2 === void 0) srcLineCount2 = countLines(src);
      const clamp$1 = (v, lo2, hi2) => v < lo2 ? lo2 : v > hi2 ? hi2 : v;
      const recommendation = auto && !explicitChunkConfig ? recommendStreamChunkStrategy(src.length, srcLineCount2, md.options) : null;
      const useChars = (recommendation == null ? void 0 : recommendation.maxChunkChars) ?? (chunkAdaptive ? clamp$1(Math.ceil(src.length / targetChunks), 8e3, 64e3) : chunkSizeCharsCfg ?? 1e4);
      const useLines = (recommendation == null ? void 0 : recommendation.maxChunkLines) ?? (chunkAdaptive ? clamp$1(Math.ceil(srcLineCount2 / targetChunks), 150, 700) : chunkSizeLinesCfg ?? 200);
      const useMaxChunks = (recommendation == null ? void 0 : recommendation.maxChunks) ?? (chunkAdaptive ? clamp$1(Math.ceil(src.length / 64e3), targetChunks, 32) : chunkMaxChunksCfg);
      const hasTrailingNewline2 = src.length > 0 && src.charCodeAt(src.length - 1) === 10;
      const shouldAutoChunk = allowImplicitChunk && src.length >= this.IMPLICIT_STREAM_CHUNK_MIN_CHARS && (recommendation == null ? void 0 : recommendation.strategy) !== "plain";
      if ((wantsChunking || shouldAutoChunk) && (src.length >= useChars * 2 || srcLineCount2 >= useLines * 2) && hasTrailingNewline2) {
        const tokens = chunkedParse(md, src, fallbackEnv, {
          maxChunkChars: useChars,
          maxChunkLines: useLines,
          fenceAware: (recommendation == null ? void 0 : recommendation.fenceAware) ?? chunkFenceAware,
          maxChunks: useMaxChunks
        });
        this.cache = {
          src,
          tokens,
          env: fallbackEnv,
          lineCount: srcLineCount2,
          lastSegment: void 0
        };
        this.updateCacheLineCount(this.cache, srcLineCount2);
        this.stats.total += 1;
        this.stats.chunkedParses = (this.stats.chunkedParses || 0) + 1;
        this.stats.lastMode = "chunked";
        setStrategyDiagnostics(fallbackEnv, {
          area: "stream",
          path: "stream-chunked",
          chunked: true,
          reason: wantsChunking ? "explicit-fallback-large-doc" : "default-fallback-large-doc"
        });
        return tokens;
      }
    }
    const parsed = this.parseFullDocument(src, fallbackEnv, md, srcLineCount2);
    const nextTokens = parsed.tokens;
    srcLineCount2 = parsed.lineCount;
    this.cache = {
      src,
      tokens: nextTokens,
      env: fallbackEnv,
      lineCount: srcLineCount2,
      lastSegment: void 0
    };
    this.updateCacheLineCount(this.cache, srcLineCount2);
    this.stats.total += 1;
    this.stats.fullParses += 1;
    this.stats.lastMode = "full";
    setStrategyDiagnostics(fallbackEnv, {
      area: "stream",
      path: "stream-full",
      reason: "fallback-full",
      unbounded: !!fallbackEnv.__mdtsUnboundedInfo
    });
    return nextTokens;
  }
  parseFullDocument(src, env, md, knownLineCount, needLineCount = true) {
    const autoUnboundedDecision = getAutoUnboundedDecision(md, src.length, knownLineCount);
    if (autoUnboundedDecision === "yes") {
      setStrategyDiagnostics(env, {
        area: "stream",
        path: "stream-full",
        reason: "auto-unbounded-char-threshold",
        unbounded: true
      });
      return {
        tokens: parseStringUnbounded(md, src, env),
        lineCount: knownLineCount ?? (needLineCount ? countLines(src) : 0)
      };
    }
    let lineCount = knownLineCount;
    if (autoUnboundedDecision === "need-lines") {
      lineCount = countLines(src);
      if (shouldAutoUseUnbounded(md, src.length, lineCount)) {
        setStrategyDiagnostics(env, {
          area: "stream",
          path: "stream-full",
          reason: "auto-unbounded-line-threshold",
          unbounded: true
        });
        return {
          tokens: parseStringUnbounded(md, src, env),
          lineCount
        };
      }
    }
    if (lineCount === void 0) lineCount = needLineCount ? countLines(src) : 0;
    return {
      tokens: this.core.parse(src, env, md).tokens,
      lineCount
    };
  }
  shouldUseUnboundedAppend(src, _cached, appended) {
    if (!appended) return false;
    if (src.length < this.MIN_UNBOUNDED_APPEND_TOTAL_CHARS && appended.length < this.MIN_UNBOUNDED_APPEND_CHARS) return false;
    if (appended.length >= this.MIN_UNBOUNDED_APPEND_CHARS) return true;
    return countLines(appended) >= this.MIN_UNBOUNDED_APPEND_LINES;
  }
  getAppendedSegment(prev, next) {
    if (!next.startsWith(prev)) return null;
    if (!prev.endsWith("\n")) return null;
    const segment = next.slice(prev.length);
    if (!segment) return null;
    const segLen = segment.length;
    if (segment.charCodeAt(segLen - 1) !== 10) return null;
    let newlineCount = 0;
    let firstLineBreak = -1;
    for (let i2 = 0; i2 < segLen; i2++) if (segment.charCodeAt(i2) === 10) {
      if (firstLineBreak === -1) firstLineBreak = i2;
      newlineCount++;
      if (newlineCount >= 2) break;
    }
    if (newlineCount < 2) return null;
    const trimmedFirstLine = (firstLineBreak === -1 ? segment : segment.slice(0, firstLineBreak)).trim();
    if (trimmedFirstLine.length === 0) return null;
    if (/^[-=]+$/.test(trimmedFirstLine)) {
      const prevWithoutTrailingNewline = prev.slice(0, -1);
      const lastBreak = prevWithoutTrailingNewline.lastIndexOf("\n");
      if (prevWithoutTrailingNewline.slice(lastBreak + 1).trim().length > 0) return null;
    }
    if (this.endsInsideOpenFence(prev)) return null;
    if (this.mayContainReferenceDefinition(segment)) return null;
    return segment;
  }
  tryTailSegmentReparse(src, cached, env, md) {
    const lastSegment = this.ensureLastSegment(cached);
    if (!lastSegment) return null;
    if (lastSegment.srcOffset <= 0 && lastSegment.tokenStart <= 0) return null;
    const stablePrefix = cached.src.slice(0, lastSegment.srcOffset);
    if (!src.startsWith(stablePrefix)) return null;
    const prevTail = cached.src.slice(lastSegment.srcOffset);
    const nextTail = src.slice(lastSegment.srcOffset);
    if (nextTail === prevTail) return null;
    const appended = src.startsWith(cached.src) ? src.slice(cached.src.length) : null;
    if (appended) {
      const merged = this.tryContainerTailAppendMerge(src, cached, env, md, lastSegment, appended);
      if (merged) return merged;
    }
    if (this.mayContainReferenceDefinition(prevTail) || this.mayContainReferenceDefinition(nextTail)) return null;
    try {
      const tailState = this.core.parse(nextTail, env, md);
      const localLastSegment = this.getLastSegment(tailState.tokens, nextTail);
      if (lastSegment.lineStart > 0) this.shiftTokenLines(tailState.tokens, lastSegment.lineStart);
      cached.src = src;
      cached.env = env;
      cached.tokens.length = lastSegment.tokenStart;
      this.appendTokens(cached.tokens, tailState.tokens);
      cached.lineCount = countLines(src);
      if (localLastSegment) cached.lastSegment = {
        tokenStart: lastSegment.tokenStart + localLastSegment.tokenStart,
        tokenEnd: lastSegment.tokenStart + localLastSegment.tokenEnd,
        lineStart: lastSegment.lineStart + localLastSegment.lineStart,
        lineEnd: lastSegment.lineStart + localLastSegment.lineEnd,
        srcOffset: lastSegment.srcOffset + localLastSegment.srcOffset
      };
      else cached.lastSegment = null;
      return cached.tokens;
    } catch {
      return null;
    }
  }
  getTailLines(src, lineCount) {
    if (lineCount <= 0) return "";
    let remaining = lineCount;
    for (let i2 = src.length - 1; i2 >= 0; i2--) if (src.charCodeAt(i2) === 10) {
      remaining--;
      if (remaining === 0) return src.slice(i2 + 1);
    }
    return src;
  }
  endsInsideOpenFence(text$1) {
    const WINDOW = 4e3;
    const start = text$1.length > WINDOW ? text$1.length - WINDOW : 0;
    const chunk = text$1.slice(start);
    const len = chunk.length;
    let inFence = null;
    let lineStart = 0;
    while (lineStart <= len) {
      let lineEnd = chunk.indexOf("\n", lineStart);
      if (lineEnd === -1) lineEnd = len;
      let p = lineStart;
      while (p < lineEnd) {
        const c = chunk.charCodeAt(p);
        if (c === 32 || c === 9) p++;
        else break;
      }
      if (p < lineEnd) {
        const ch = chunk.charCodeAt(p);
        if (ch === 96 || ch === 126) {
          let q = p;
          while (q < lineEnd && chunk.charCodeAt(q) === ch) q++;
          const runLen = q - p;
          if (runLen >= 3) {
            if (!inFence) inFence = {
              marker: ch,
              length: runLen
            };
            else if (inFence.marker === ch && runLen >= inFence.length) inFence = null;
          }
        }
      }
      if (lineEnd === len) break;
      lineStart = lineEnd + 1;
    }
    return inFence !== null;
  }
  peek() {
    var _a3;
    return ((_a3 = this.cache) == null ? void 0 : _a3.tokens) ?? EMPTY_TOKENS;
  }
  getStats() {
    return { ...this.stats };
  }
  appendTokens(target, source) {
    for (let i2 = 0; i2 < source.length; i2++) target.push(source[i2]);
  }
  updateCacheLineCount(cache, lineCount) {
    cache.lineCount = lineCount ?? countLines(cache.src);
    cache.lastSegment = void 0;
  }
  ensureLastSegment(cache) {
    if (cache.lastSegment !== void 0) return cache.lastSegment;
    cache.lastSegment = this.getLastSegment(cache.tokens, cache.src);
    return cache.lastSegment;
  }
  getLastSegment(tokens, src) {
    var _a3, _b, _c, _d;
    if (tokens.length === 0) return null;
    let lineStart = Number.POSITIVE_INFINITY;
    let lineEnd = -1;
    let depth = 0;
    for (let i2 = tokens.length - 1; i2 >= 0; i2--) {
      const token = tokens[i2];
      if (token.map) {
        if (token.map[0] < lineStart) lineStart = token.map[0];
        if (token.map[1] > lineEnd) lineEnd = token.map[1];
      }
      if (token.nesting < 0) {
        depth += -token.nesting;
        continue;
      }
      if (token.nesting > 0) {
        depth -= token.nesting;
        if (token.level === 0 && depth <= 0) {
          const resolvedStart = Number.isFinite(lineStart) ? lineStart : ((_a3 = token.map) == null ? void 0 : _a3[0]) ?? 0;
          const resolvedEnd = lineEnd >= resolvedStart ? lineEnd : ((_b = token.map) == null ? void 0 : _b[1]) ?? resolvedStart;
          return {
            tokenStart: i2,
            tokenEnd: tokens.length,
            lineStart: resolvedStart,
            lineEnd: resolvedEnd,
            srcOffset: this.getLineStartOffset(src, resolvedStart)
          };
        }
        continue;
      }
      if (token.level === 0 && depth === 0) {
        const resolvedStart = Number.isFinite(lineStart) ? lineStart : ((_c = token.map) == null ? void 0 : _c[0]) ?? 0;
        const resolvedEnd = lineEnd >= resolvedStart ? lineEnd : ((_d = token.map) == null ? void 0 : _d[1]) ?? resolvedStart;
        return {
          tokenStart: i2,
          tokenEnd: tokens.length,
          lineStart: resolvedStart,
          lineEnd: resolvedEnd,
          srcOffset: this.getLineStartOffset(src, resolvedStart)
        };
      }
    }
    return null;
  }
  getLineStartOffset(src, line) {
    if (line <= 0) return 0;
    let remaining = line;
    let pos = -1;
    while (remaining > 0) {
      pos = src.indexOf("\n", pos + 1);
      if (pos === -1) return src.length;
      remaining--;
    }
    return pos + 1;
  }
  mayContainReferenceDefinition(src) {
    if (!src.includes("]:")) return false;
    return /(?:^|\n)[ \t]{0,3}\[[^\]\n]+\]:/.test(src);
  }
  canDirectlyParseAppend(cache) {
    var _a3;
    if (!this.endsWithBlankLine(cache.src)) return false;
    const lastSegment = this.ensureLastSegment(cache);
    if (!lastSegment) return false;
    switch ((_a3 = cache.tokens[lastSegment.tokenStart]) == null ? void 0 : _a3.type) {
      case "paragraph_open":
      case "heading_open":
      case "fence":
      case "code_block":
      case "html_block":
      case "hr":
      case "table_open":
        return true;
      default:
        return false;
    }
  }
  tryContainerTailAppendMerge(src, cached, env, md, lastSegment, appended) {
    if (!appended || this.mayContainReferenceDefinition(appended)) return null;
    const lastToken = cached.tokens[lastSegment.tokenStart];
    switch (lastToken == null ? void 0 : lastToken.type) {
      case "bullet_list_open":
      case "ordered_list_open":
        return this.tryListTailAppendMerge(src, cached, env, md, lastSegment, appended, lastToken);
      case "table_open":
        return this.tryTableTailAppendMerge(src, cached, env, md, lastSegment, appended, lastToken);
      default:
        return null;
    }
  }
  tryListTailAppendMerge(src, cached, env, md, lastSegment, appended, listOpen) {
    var _a3, _b;
    if (cached.src.length === 0 || cached.src.charCodeAt(cached.src.length - 1) !== 10) return null;
    const segmentLineSpan = lastSegment.lineEnd - lastSegment.lineStart;
    const segmentChars = cached.src.length - lastSegment.srcOffset;
    if (segmentLineSpan < this.MIN_LIST_LINES_FOR_MERGE && segmentChars < this.MIN_LIST_CHARS_FOR_MERGE) return null;
    const closeType = listOpen.type === "bullet_list_open" ? "bullet_list_close" : "ordered_list_close";
    let parsed;
    try {
      parsed = this.core.parse(appended, env, md).tokens;
    } catch {
      return null;
    }
    if (!this.isSingleTopLevelContainer(parsed, listOpen.type, closeType, listOpen.markup)) return null;
    const inserted = parsed.slice(1, -1);
    if (inserted.length === 0) return null;
    const lineOffset = cached.lineCount ?? countLines(cached.src);
    if (lineOffset > 0) this.shiftTokenLines(inserted, lineOffset);
    const existingMode = this.getListParagraphMode(cached.tokens, lastSegment.tokenStart, cached.tokens.length, listOpen.level);
    const appendedMode = this.getListParagraphMode(parsed, 0, parsed.length, 0);
    if (existingMode === "loose" || appendedMode === "loose" || this.endsWithBlankLine(cached.src) || (((_b = (_a3 = parsed[0]) == null ? void 0 : _a3.map) == null ? void 0 : _b[0]) ?? 0) > 0) {
      this.setListParagraphVisibility(cached.tokens, lastSegment.tokenStart, cached.tokens.length, listOpen.level, false);
      this.setListParagraphVisibility(inserted, 0, inserted.length, listOpen.level, false);
    }
    cached.tokens.splice(cached.tokens.length - 1, 0, ...inserted);
    cached.src = src;
    cached.env = env;
    cached.lineCount = countLines(src);
    if (listOpen.map) listOpen.map[1] = this.getDocLineCount(src);
    cached.lastSegment = {
      tokenStart: lastSegment.tokenStart,
      tokenEnd: cached.tokens.length,
      lineStart: lastSegment.lineStart,
      lineEnd: this.getDocLineCount(src),
      srcOffset: lastSegment.srcOffset
    };
    return cached.tokens;
  }
  tryTableTailAppendMerge(src, cached, env, md, lastSegment, appended, tableOpen) {
    var _a3, _b;
    if (cached.src.length === 0 || cached.src.charCodeAt(cached.src.length - 1) !== 10) return null;
    if (/(?:^|\n)[ \t]*\n/.test(appended)) return null;
    const segmentLineSpan = lastSegment.lineEnd - lastSegment.lineStart;
    const segmentChars = cached.src.length - lastSegment.srcOffset;
    if (segmentLineSpan < this.MIN_TABLE_LINES_FOR_MERGE && segmentChars < this.MIN_TABLE_CHARS_FOR_MERGE) return null;
    const tableContext = this.getTableHeaderContext(cached.src.slice(lastSegment.srcOffset));
    if (!tableContext) return null;
    const syntheticSrc = `${tableContext}${appended}`;
    let parsed;
    try {
      parsed = this.core.parse(syntheticSrc, env, md).tokens;
    } catch {
      return null;
    }
    if (!this.isSingleTopLevelContainer(parsed, "table_open", "table_close")) return null;
    if ((((_b = (_a3 = parsed[0]) == null ? void 0 : _a3.map) == null ? void 0 : _b[1]) ?? -1) !== this.getDocLineCount(syntheticSrc)) return null;
    const parsedSection = this.getTableBodySection(parsed, 0, parsed.length, 0);
    const cachedSection = this.getTableBodySection(cached.tokens, lastSegment.tokenStart, cached.tokens.length, tableOpen.level);
    if (!parsedSection || !cachedSection || parsedSection.tbodyOpenIndex < 0 || parsedSection.tbodyCloseIndex < 0) return null;
    const inserted = cachedSection.tbodyOpenIndex >= 0 ? parsed.slice(parsedSection.tbodyOpenIndex + 1, parsedSection.tbodyCloseIndex) : parsed.slice(parsedSection.tbodyOpenIndex, parsedSection.tbodyCloseIndex + 1);
    if (inserted.length === 0) return null;
    const lineOffset = lastSegment.lineEnd - 2;
    if (lineOffset !== 0) this.shiftTokenLines(inserted, lineOffset);
    const insertAt = cachedSection.tbodyCloseIndex >= 0 ? cachedSection.tbodyCloseIndex : cachedSection.tableCloseIndex;
    cached.tokens.splice(insertAt, 0, ...inserted);
    cached.src = src;
    cached.env = env;
    cached.lineCount = countLines(src);
    const nextDocLineCount = this.getDocLineCount(src);
    if (tableOpen.map) tableOpen.map[1] = nextDocLineCount;
    if (cachedSection.tbodyOpenIndex >= 0) {
      const tbodyOpen = cached.tokens[cachedSection.tbodyOpenIndex];
      if (tbodyOpen == null ? void 0 : tbodyOpen.map) tbodyOpen.map[1] = nextDocLineCount;
    }
    cached.lastSegment = {
      tokenStart: lastSegment.tokenStart,
      tokenEnd: cached.tokens.length,
      lineStart: lastSegment.lineStart,
      lineEnd: nextDocLineCount,
      srcOffset: lastSegment.srcOffset
    };
    return cached.tokens;
  }
  getTableHeaderContext(src) {
    const firstBreak = src.indexOf("\n");
    if (firstBreak < 0) return null;
    const secondBreak = src.indexOf("\n", firstBreak + 1);
    if (secondBreak < 0) return null;
    return src.slice(0, secondBreak + 1);
  }
  getTableBodySection(tokens, start, end, tableLevel) {
    var _a3;
    if (start < 0 || start >= end || ((_a3 = tokens[start]) == null ? void 0 : _a3.type) !== "table_open") return null;
    let tableCloseIndex = -1;
    for (let i2 = end - 1; i2 > start; i2--) {
      const token = tokens[i2];
      if (token.type === "table_close" && token.level === tableLevel) {
        tableCloseIndex = i2;
        break;
      }
    }
    if (tableCloseIndex < 0) return null;
    let tbodyOpenIndex = -1;
    let tbodyCloseIndex = -1;
    for (let i2 = start + 1; i2 < tableCloseIndex; i2++) {
      const token = tokens[i2];
      if (token.type === "tbody_open" && token.level === tableLevel + 1) {
        tbodyOpenIndex = i2;
        break;
      }
    }
    if (tbodyOpenIndex >= 0) {
      for (let i2 = tableCloseIndex - 1; i2 > tbodyOpenIndex; i2--) {
        const token = tokens[i2];
        if (token.type === "tbody_close" && token.level === tableLevel + 1) {
          tbodyCloseIndex = i2;
          break;
        }
      }
      if (tbodyCloseIndex < 0) return null;
    }
    return {
      tableCloseIndex,
      tbodyOpenIndex,
      tbodyCloseIndex
    };
  }
  isSingleTopLevelContainer(tokens, openType, closeType, markup) {
    if (tokens.length < 2) return false;
    const first = tokens[0];
    const last = tokens[tokens.length - 1];
    if (first.type !== openType || last.type !== closeType || first.level !== 0 || last.level !== 0) return false;
    if (markup !== void 0 && first.markup !== markup) return false;
    let depth = 0;
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (token.level === 0 && i2 > 0 && i2 < tokens.length - 1 && depth === 0) return false;
      if (token.nesting > 0) depth += token.nesting;
      else if (token.nesting < 0) depth += token.nesting;
    }
    return depth === 0;
  }
  getListParagraphMode(tokens, start, end, listLevel) {
    let sawHidden = false;
    let sawVisible = false;
    const paragraphLevel = listLevel + 2;
    for (let i2 = start; i2 < end; i2++) {
      const token = tokens[i2];
      if (token.type !== "paragraph_open" || token.level !== paragraphLevel) continue;
      if (token.hidden) sawHidden = true;
      else sawVisible = true;
      if (sawHidden && sawVisible) return "loose";
    }
    if (sawVisible) return "loose";
    if (sawHidden) return "tight";
    return "none";
  }
  setListParagraphVisibility(tokens, start, end, listLevel, hidden) {
    const paragraphLevel = listLevel + 2;
    for (let i2 = start; i2 < end; i2++) {
      const token = tokens[i2];
      if ((token.type === "paragraph_open" || token.type === "paragraph_close") && token.level === paragraphLevel) token.hidden = hidden;
    }
  }
  shouldPreferTailReparseForAppend(cache) {
    var _a3;
    const lastSegment = this.ensureLastSegment(cache);
    if (!lastSegment) return false;
    switch ((_a3 = cache.tokens[lastSegment.tokenStart]) == null ? void 0 : _a3.type) {
      case "bullet_list_open":
      case "ordered_list_open":
      case "blockquote_open":
      case "table_open":
        return true;
      case "paragraph_open":
      case "code_block":
      case "html_block":
        return !this.endsWithBlankLine(cache.src);
      default:
        return false;
    }
  }
  endsWithBlankLine(src) {
    const len = src.length;
    if (len < 2 || src.charCodeAt(len - 1) !== 10) return false;
    let pos = len - 2;
    while (pos >= 0) {
      const ch = src.charCodeAt(pos);
      if (ch === 32 || ch === 9) {
        pos--;
        continue;
      }
      return ch === 10;
    }
    return true;
  }
  getDocLineCount(src) {
    const lines = countLines(src);
    if (src.length === 0) return 0;
    return src.charCodeAt(src.length - 1) === 10 ? lines : lines + 1;
  }
  shiftTokenLines(tokens, offset3) {
    if (offset3 === 0) return;
    const stack = [...tokens];
    while (stack.length > 0) {
      const token = stack.pop();
      if (token.map) {
        token.map[0] += offset3;
        token.map[1] += offset3;
      }
      if (token.children) for (let i2 = token.children.length - 1; i2 >= 0; i2--) stack.push(token.children[i2]);
    }
  }
};
var config = {
  default: default_default,
  zero: zero_default,
  commonmark: commonmark_default
};
function hasExplicitChunkOverride(presetOptions, userOptions, keys) {
  const hasOwn$1$1 = (obj, key) => !!obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== void 0;
  for (let i2 = 0; i2 < keys.length; i2++) {
    const key = keys[i2];
    if (hasOwn$1$1(userOptions, key) || hasOwn$1$1(presetOptions, key)) return true;
  }
  return false;
}
function hasExplicitOption(presetOptions, userOptions, key) {
  return !!userOptions && Object.prototype.hasOwnProperty.call(userOptions, key) || !!presetOptions && Object.prototype.hasOwnProperty.call(presetOptions, key);
}
function markdownIt(presetName, options) {
  var _a3, _b, _c, _d;
  let opts = {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: null,
    maxNesting: 100,
    stream: false,
    streamOptimizationMinSize: 1e3,
    streamChunkedFallback: false,
    streamChunkSizeChars: 1e4,
    streamChunkSizeLines: 200,
    streamChunkFenceAware: true,
    streamChunkAdaptive: true,
    streamChunkTargetChunks: 8,
    streamChunkMaxChunks: void 0,
    streamSkipCacheAboveChars: 1e6,
    streamSkipCacheAboveLines: 1e5,
    fullChunkedFallback: false,
    fullChunkThresholdChars: 2e4,
    fullChunkThresholdLines: 400,
    fullChunkSizeChars: 1e4,
    fullChunkSizeLines: 200,
    fullChunkFenceAware: true,
    fullChunkAdaptive: true,
    fullChunkTargetChunks: 8,
    fullChunkMaxChunks: void 0,
    autoTuneChunks: true,
    autoUnbounded: true,
    autoUnboundedThresholdChars: 4e6,
    autoUnboundedThresholdLines: 8e4
  };
  let presetToUse = "default";
  let userOptions;
  if (!options && typeof presetName !== "string") {
    userOptions = presetName;
    presetToUse = "default";
  } else if (typeof presetName === "string") {
    presetToUse = presetName;
    userOptions = options;
  }
  const preset = config[presetToUse];
  if (!preset) throw new Error(`Wrong \`markdown-it\` preset "${presetToUse}", check name`);
  if (preset == null ? void 0 : preset.options) opts = {
    ...opts,
    ...preset.options
  };
  if (userOptions) opts = {
    ...opts,
    ...userOptions
  };
  if (typeof opts.quotes === "string") {
    const quotesStr = opts.quotes;
    if (quotesStr.length >= 4) opts.quotes = [
      quotesStr[0],
      quotesStr[1],
      quotesStr[2],
      quotesStr[3]
    ];
    else opts.quotes = [
      "“",
      "”",
      "‘",
      "’"
    ];
  }
  let explicitFullChunkConfig = hasExplicitChunkOverride(preset == null ? void 0 : preset.options, userOptions, [
    "fullChunkSizeChars",
    "fullChunkSizeLines",
    "fullChunkMaxChunks"
  ]);
  let explicitStreamChunkConfig = hasExplicitChunkOverride(preset == null ? void 0 : preset.options, userOptions, [
    "streamChunkSizeChars",
    "streamChunkSizeLines",
    "streamChunkMaxChunks"
  ]);
  let explicitFullChunkFallbackSetting = hasExplicitOption(preset == null ? void 0 : preset.options, userOptions, "fullChunkedFallback");
  let explicitStreamChunkFallbackSetting = hasExplicitOption(preset == null ? void 0 : preset.options, userOptions, "streamChunkedFallback");
  const core = new ParserCore();
  let renderer = null;
  const getRenderer = () => {
    if (!renderer) renderer = new renderer_default(opts);
    return renderer;
  };
  let streamParser = null;
  const getStreamParser = () => {
    if (!streamParser) streamParser = new StreamParser(core);
    return streamParser;
  };
  let linkifyInstance = null;
  const getLinkify = () => {
    if (!linkifyInstance) linkifyInstance = new linkify_it_default();
    return linkifyInstance;
  };
  const md = {
    core,
    block: core.block,
    inline: core.inline,
    get linkify() {
      const inst = getLinkify();
      Object.defineProperty(this, "linkify", {
        value: inst,
        writable: true,
        configurable: true
      });
      return inst;
    },
    get renderer() {
      const r2 = getRenderer();
      Object.defineProperty(this, "renderer", {
        value: r2,
        writable: true,
        configurable: true
      });
      return r2;
    },
    options: opts,
    __explicitFullChunkConfig: explicitFullChunkConfig,
    __explicitStreamChunkConfig: explicitStreamChunkConfig,
    __explicitFullChunkFallbackSetting: explicitFullChunkFallbackSetting,
    __explicitStreamChunkFallbackSetting: explicitStreamChunkFallbackSetting,
    set(newOpts) {
      this.options = {
        ...this.options,
        ...newOpts
      };
      if (newOpts.fullChunkSizeChars !== void 0 || newOpts.fullChunkSizeLines !== void 0 || newOpts.fullChunkMaxChunks !== void 0) {
        explicitFullChunkConfig = true;
        this.__explicitFullChunkConfig = true;
      }
      if (newOpts.streamChunkSizeChars !== void 0 || newOpts.streamChunkSizeLines !== void 0 || newOpts.streamChunkMaxChunks !== void 0) {
        explicitStreamChunkConfig = true;
        this.__explicitStreamChunkConfig = true;
      }
      if (Object.prototype.hasOwnProperty.call(newOpts, "fullChunkedFallback")) {
        explicitFullChunkFallbackSetting = true;
        this.__explicitFullChunkFallbackSetting = true;
      }
      if (Object.prototype.hasOwnProperty.call(newOpts, "streamChunkedFallback")) {
        explicitStreamChunkFallbackSetting = true;
        this.__explicitStreamChunkFallbackSetting = true;
      }
      if (renderer) renderer.set(newOpts);
      if (typeof newOpts.stream === "boolean") {
        this.stream.enabled = newOpts.stream;
        if (streamParser) {
          streamParser.reset();
          streamParser.resetStats();
        }
      }
      return this;
    },
    configure(presets) {
      var _a4, _b2, _c2, _d2;
      const p = typeof presets === "string" ? config[presets] : presets;
      if (!p) throw new Error("Wrong `markdown-it` preset, can't be empty");
      if (p.options) this.set(p.options);
      if (p.components) {
        const c = p.components;
        if ((_a4 = c.core) == null ? void 0 : _a4.rules) this.core.ruler.enableOnly(c.core.rules);
        if ((_b2 = c.block) == null ? void 0 : _b2.rules) this.block.ruler.enableOnly(c.block.rules);
        if ((_c2 = c.inline) == null ? void 0 : _c2.rules) this.inline.ruler.enableOnly(c.inline.rules);
        if ((_d2 = c.inline2) == null ? void 0 : _d2.rules) this.inline.ruler2.enableOnly(c.inline2.rules);
      }
      return this;
    },
    enable(list$1, ignoreInvalid) {
      var _a4, _b2, _c2, _d2;
      const names = Array.isArray(list$1) ? list$1 : [list$1];
      const managers = [
        (_a4 = this.core) == null ? void 0 : _a4.ruler,
        (_b2 = this.block) == null ? void 0 : _b2.ruler,
        (_c2 = this.inline) == null ? void 0 : _c2.ruler,
        (_d2 = this.inline) == null ? void 0 : _d2.ruler2
      ];
      let changed = 0;
      for (const m of managers) {
        if (!m) continue;
        const enabled = m.enable(names, true);
        changed += enabled.length;
      }
      if (!ignoreInvalid && changed < names.length) throw new Error("Rules manager: invalid rule name in list");
      return this;
    },
    disable(list$1, ignoreInvalid) {
      var _a4, _b2, _c2, _d2;
      const names = Array.isArray(list$1) ? list$1 : [list$1];
      const managers = [
        (_a4 = this.core) == null ? void 0 : _a4.ruler,
        (_b2 = this.block) == null ? void 0 : _b2.ruler,
        (_c2 = this.inline) == null ? void 0 : _c2.ruler,
        (_d2 = this.inline) == null ? void 0 : _d2.ruler2
      ];
      let changed = 0;
      for (const m of managers) {
        if (!m) continue;
        const disabled = m.disable(names, true);
        changed += disabled.length;
      }
      if (!ignoreInvalid && changed < names.length) throw new Error("Rules manager: invalid rule name in list");
      return this;
    },
    use(plugin, ...params) {
      const fn2 = typeof plugin === "function" ? plugin : plugin && typeof plugin.default === "function" ? plugin.default : void 0;
      if (!fn2) throw new TypeError("MarkdownIt.use: plugin must be a function");
      const args = [this, ...params];
      const thisArg = typeof plugin === "function" ? plugin : plugin;
      fn2.apply(thisArg, args);
      return this;
    },
    render(src, env = {}) {
      const tokens = this.parse(src, env);
      return getRenderer().render(tokens, this.options, env);
    },
    async renderAsync(src, env = {}) {
      const tokens = this.parse(src, env);
      return getRenderer().renderAsync(tokens, this.options, env);
    },
    renderIterable(chunks, env = {}) {
      const tokens = this.parseIterable(chunks, env);
      return getRenderer().render(tokens, this.options, env);
    },
    async renderAsyncIterable(chunks, env = {}) {
      const tokens = await this.parseAsyncIterable(chunks, env);
      return getRenderer().renderAsync(tokens, this.options, env);
    },
    renderInline(src, env = {}) {
      const tokens = this.parseInline(src, env);
      return getRenderer().render(tokens, this.options, env);
    },
    validateLink,
    normalizeLink,
    normalizeLinkText,
    utils: utils_exports,
    helpers: { ...helpers_exports },
    parse(src, env = {}) {
      if (typeof src !== "string") throw new TypeError("Input data should be a String");
      let countedLines;
      if (!this.stream.enabled && !this.options.fullChunkedFallback) {
        const autoUnboundedDecision = getAutoUnboundedDecision(this, src.length);
        if (autoUnboundedDecision === "yes") {
          setStrategyDiagnostics(env, {
            area: "parse",
            path: "auto-unbounded",
            unbounded: true,
            reason: "char-threshold"
          });
          return parseStringUnbounded(this, src, env);
        }
        if (autoUnboundedDecision === "need-lines") countedLines = countLines(src);
      }
      if (!this.stream.enabled) {
        const chars = src.length;
        const lines = countedLines ?? countLines(src);
        const auto = this.options.autoTuneChunks !== false;
        const userForcedChunk = explicitFullChunkConfig;
        const allowImplicitChunk = !explicitFullChunkFallbackSetting;
        const wantsChunking = !!this.options.fullChunkedFallback;
        const shouldAutoChunk = allowImplicitChunk && chars >= 2e5;
        const autoRecommendation = auto && !userForcedChunk ? recommendFullChunkStrategy(chars, lines, this.options) : null;
        if (wantsChunking || shouldAutoChunk) {
          if (wantsChunking ? chars >= (this.options.fullChunkThresholdChars ?? 2e4) || lines >= (this.options.fullChunkThresholdLines ?? 400) : shouldAutoChunk) {
            if (autoRecommendation && autoRecommendation.strategy !== "plain") {
              setStrategyDiagnostics(env, {
                area: "parse",
                path: "full-chunk",
                chunked: true,
                reason: wantsChunking ? "explicit-full-chunk" : "default-large-string"
              });
              return chunkedParse(this, src, env, {
                maxChunkChars: autoRecommendation.maxChunkChars,
                maxChunkLines: autoRecommendation.maxChunkLines,
                fenceAware: autoRecommendation.fenceAware,
                maxChunks: autoRecommendation.maxChunks
              });
            }
            if (wantsChunking) {
              const clamp$1 = (v, lo2, hi2) => v < lo2 ? lo2 : v > hi2 ? hi2 : v;
              const adaptive = this.options.fullChunkAdaptive !== false;
              const target = this.options.fullChunkTargetChunks ?? 8;
              const dynMaxChunkChars = clamp$1(Math.ceil(chars / target), 8e3, 64e3);
              const dynMaxChunkLines = clamp$1(Math.ceil(lines / target), 150, 700);
              const maxChunkChars = adaptive ? dynMaxChunkChars : this.options.fullChunkSizeChars ?? 1e4;
              const maxChunkLines = adaptive ? dynMaxChunkLines : this.options.fullChunkSizeLines ?? 200;
              const maxChunks = adaptive ? clamp$1(Math.ceil(chars / 64e3), target, 32) : this.options.fullChunkMaxChunks;
              setStrategyDiagnostics(env, {
                area: "parse",
                path: "full-chunk",
                chunked: true,
                reason: "explicit-full-chunk"
              });
              return chunkedParse(this, src, env, {
                maxChunkChars,
                maxChunkLines,
                fenceAware: this.options.fullChunkFenceAware ?? true,
                maxChunks
              });
            }
          }
        }
        if (countedLines !== void 0 && shouldAutoUseUnbounded(this, chars, lines)) {
          setStrategyDiagnostics(env, {
            area: "parse",
            path: "auto-unbounded",
            unbounded: true,
            reason: "line-threshold"
          });
          return parseStringUnbounded(this, src, env);
        }
      }
      setStrategyDiagnostics(env, {
        area: "parse",
        path: "plain",
        reason: "default-plain"
      });
      return core.parse(src, env, this).tokens;
    },
    parseIterable(chunks, env = {}) {
      return parseIterable(this, chunks, env);
    },
    parseAsyncIterable(chunks, env = {}) {
      return parseAsyncIterable(this, chunks, env);
    },
    parseIterableToSink(chunks, onChunkTokens, env = {}) {
      return parseIterableToSink(this, chunks, onChunkTokens, env);
    },
    parseAsyncIterableToSink(chunks, onChunkTokens, env = {}) {
      return parseAsyncIterableToSink(this, chunks, onChunkTokens, env);
    },
    parseInline(src, env = {}) {
      if (typeof src !== "string") throw new TypeError("Input data should be a String");
      const state = core.createState(src, env, this);
      state.inlineMode = true;
      core.process(state);
      return state.tokens;
    }
  };
  md.stream = {
    enabled: Boolean(opts.stream),
    parse(src, env) {
      if (!md.stream.enabled) return md.parse(src, env ?? {});
      return getStreamParser().parse(src, env, md);
    },
    reset() {
      getStreamParser().reset();
    },
    peek() {
      return streamParser ? streamParser.peek() : [];
    },
    stats() {
      return streamParser ? streamParser.getStats() : {
        total: 0,
        cacheHits: 0,
        appendHits: 0,
        unboundedAppendHits: 0,
        tailHits: 0,
        fullParses: 0,
        resets: 0,
        chunkedParses: 0,
        lastMode: "idle"
      };
    },
    resetStats() {
      if (streamParser) streamParser.resetStats();
    }
  };
  if (presetToUse === "zero" && (preset == null ? void 0 : preset.components)) {
    const c = preset.components;
    if ((_a3 = c.core) == null ? void 0 : _a3.rules) md.core.ruler.enableOnly(c.core.rules);
    if ((_b = c.block) == null ? void 0 : _b.rules) md.block.ruler.enableOnly(c.block.rules);
    if ((_c = c.inline) == null ? void 0 : _c.rules) md.inline.ruler.enableOnly(c.inline.rules);
    if ((_d = c.inline2) == null ? void 0 : _d.rules) md.inline.ruler2.enableOnly(c.inline2.rules);
  }
  return md;
}
var src_default = markdownIt;
var defaultMathOptions;
function setDefaultMathOptions(opts) {
  defaultMathOptions = opts;
}
function getDefaultMathOptions() {
  return defaultMathOptions;
}
function container_plugin(md, name, options) {
  function validateDefault(params) {
    return params.trim().split(" ", 2)[0] === name;
  }
  function renderDefault(tokens, idx, _options, env, slf) {
    if (tokens[idx].nesting === 1) tokens[idx].attrJoin("class", name);
    return slf.renderToken(tokens, idx, _options, env, slf);
  }
  options = options || {};
  const min_markers = 3;
  const marker_str = options.marker || ":";
  const marker_char = marker_str.charCodeAt(0);
  const marker_len = marker_str.length;
  const validate = options.validate || validateDefault;
  const render = options.render || renderDefault;
  function container(state, startLine, endLine, silent) {
    let pos;
    let auto_closed = false;
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max2 = state.eMarks[startLine];
    if (marker_char !== state.src.charCodeAt(start)) return false;
    for (pos = start + 1; pos <= max2; pos++) if (marker_str[(pos - start) % marker_len] !== state.src[pos]) break;
    const marker_count = Math.floor((pos - start) / marker_len);
    if (marker_count < min_markers) return false;
    pos -= (pos - start) % marker_len;
    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max2);
    if (!validate(params, markup)) return false;
    if (silent) return true;
    let nextLine = startLine;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) break;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max2 = state.eMarks[nextLine];
      if (start < max2 && state.sCount[nextLine] < state.blkIndent) break;
      if (marker_char !== state.src.charCodeAt(start)) continue;
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue;
      for (pos = start + 1; pos <= max2; pos++) if (marker_str[(pos - start) % marker_len] !== state.src[pos]) break;
      if (Math.floor((pos - start) / marker_len) < marker_count) continue;
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);
      if (pos < max2) continue;
      auto_closed = true;
      break;
    }
    const old_parent = state.parentType;
    const old_line_max = state.lineMax;
    state.parentType = "container";
    state.lineMax = nextLine;
    const token_o = state.push("container_" + name + "_open", "div", 1);
    token_o.markup = markup;
    token_o.block = true;
    token_o.info = params;
    token_o.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    const token_c = state.push("container_" + name + "_close", "div", -1);
    token_c.markup = state.src.slice(start, pos);
    token_c.block = true;
    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);
    return true;
  }
  md.block.ruler.before("fence", "container_" + name, container, { alt: [
    "paragraph",
    "reference",
    "blockquote",
    "list"
  ] });
  md.renderer.rules["container_" + name + "_open"] = render;
  md.renderer.rules["container_" + name + "_close"] = render;
}
function parseLooseInlineAttrs(input) {
  const s2 = String(input ?? "").trim();
  if (!s2.startsWith("{") || !s2.endsWith("}")) return null;
  const inner = s2.slice(1, -1).trim();
  if (!inner) return {};
  if (inner.includes("{") || inner.includes("[") || inner.includes("]")) return null;
  const parts = [];
  let buf = "";
  let inSingle = false;
  let inDouble = false;
  for (let i2 = 0; i2 < inner.length; i2++) {
    const ch = inner[i2];
    if (ch === "\\") {
      buf += ch;
      if (i2 + 1 < inner.length) {
        buf += inner[i2 + 1];
        i2++;
      }
      continue;
    }
    if (!inDouble && ch === "'") {
      inSingle = !inSingle;
      buf += ch;
      continue;
    }
    if (!inSingle && ch === '"') {
      inDouble = !inDouble;
      buf += ch;
      continue;
    }
    if (!inSingle && !inDouble && ch === ",") {
      parts.push(buf.trim());
      buf = "";
      continue;
    }
    buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  const out = {};
  for (const part of parts) {
    if (!part) continue;
    let inS = false;
    let inD = false;
    let split = -1;
    for (let i2 = 0; i2 < part.length; i2++) {
      const ch = part[i2];
      if (ch === "\\") {
        i2++;
        continue;
      }
      if (!inD && ch === "'") {
        inS = !inS;
        continue;
      }
      if (!inS && ch === '"') {
        inD = !inD;
        continue;
      }
      if (!inS && !inD && ch === ":") {
        split = i2;
        break;
      }
    }
    if (split === -1) return null;
    const rawKey = part.slice(0, split).trim();
    const rawVal = part.slice(split + 1).trim();
    if (!rawKey) return null;
    let key = rawKey;
    if (key.startsWith('"') && key.endsWith('"') || key.startsWith("'") && key.endsWith("'")) try {
      key = JSON.parse(key.replace(/^'/, '"').replace(/'$/, '"'));
    } catch {
      return null;
    }
    if (!/^[_$A-Z][\w$-]*$/i.test(key)) return null;
    let value;
    if (!rawVal) value = "";
    else if (rawVal.startsWith('"') && rawVal.endsWith('"') || rawVal.startsWith("'") && rawVal.endsWith("'")) try {
      value = JSON.parse(rawVal.replace(/^'/, '"').replace(/'$/, '"'));
    } catch {
      value = rawVal;
    }
    else if (/^-?\d+(?:\.\d+)?$/.test(rawVal)) value = Number(rawVal);
    else if (rawVal === "true" || rawVal === "false") value = rawVal === "true";
    else if (rawVal === "null") value = null;
    else value = rawVal;
    out[key] = value;
  }
  return out;
}
function applyContainers(md) {
  [
    "admonition",
    "info",
    "warning",
    "error",
    "tip",
    "danger",
    "note",
    "caution"
  ].forEach((name) => {
    md.use(container_plugin, name, { render(tokens, idx) {
      if (tokens[idx].nesting === 1) return `<div class="vmr-container vmr-container-${name}">`;
      else return "</div>\n";
    } });
  });
  md.block.ruler.before("fence", "vmr_container_fallback", (state, startLine, endLine, silent) => {
    const s2 = state;
    const startPos = s2.bMarks[startLine] + s2.tShift[startLine];
    const lineMax = s2.eMarks[startLine];
    const line = s2.src.slice(startPos, lineMax);
    const nameMatch = line.match(/^:::\s*([^\s{]+)/);
    if (!nameMatch) return false;
    const name = nameMatch[1];
    if (!name.trim()) return false;
    const trimmedRest = line.slice(nameMatch[0].length).trim();
    let argsStr;
    let jsonStr;
    const jsonStart = trimmedRest.indexOf("{");
    const jsonCandidate = jsonStart >= 0 ? trimmedRest.slice(jsonStart).trimStart() : void 0;
    if (jsonStart === -1) argsStr = trimmedRest || void 0;
    else {
      argsStr = trimmedRest.slice(0, jsonStart).trim() || void 0;
      if (jsonCandidate == null ? void 0 : jsonCandidate.startsWith("{")) {
        let depth = 0;
        let jsonEnd = -1;
        for (let i2 = 0; i2 < jsonCandidate.length; i2++) {
          if (jsonCandidate[i2] === "{") depth++;
          else if (jsonCandidate[i2] === "}") depth--;
          if (depth === 0) {
            jsonEnd = i2 + 1;
            break;
          }
        }
        if (jsonEnd > 0) jsonStr = jsonCandidate.slice(0, jsonEnd);
      }
      if (!jsonStr) argsStr = trimmedRest || void 0;
    }
    if (silent) return true;
    const envFinal = !!s2.env.__markstreamFinal;
    let nextLine = startLine + 1;
    let found = false;
    while (nextLine <= endLine) {
      const sPos = s2.bMarks[nextLine] + s2.tShift[nextLine];
      const ePos = s2.eMarks[nextLine];
      if (s2.src.slice(sPos, ePos).trim() === ":::") {
        found = true;
        break;
      }
      nextLine++;
    }
    if (!found) nextLine = endLine;
    const tokenOpen = s2.push("vmr_container_open", "div", 1);
    tokenOpen.attrSet("class", `vmr-container vmr-container-${name}`);
    tokenOpen.meta = {
      ...tokenOpen.meta ?? {},
      unclosed: !found && !envFinal
    };
    if (argsStr) tokenOpen.attrSet("data-args", argsStr);
    if (jsonStr) try {
      const attrs = JSON.parse(jsonStr);
      for (const [key, value] of Object.entries(attrs)) {
        const isComplexValue = value != null && typeof value === "object";
        tokenOpen.attrSet(`data-${key}`, isComplexValue ? JSON.stringify(value) : String(value));
      }
    } catch {
      const loose = parseLooseInlineAttrs(jsonStr);
      if (loose) for (const [key, value] of Object.entries(loose)) {
        const isComplexValue = value != null && typeof value === "object";
        tokenOpen.attrSet(`data-${key}`, isComplexValue ? JSON.stringify(value) : String(value));
      }
      else tokenOpen.attrSet("data-attrs", jsonStr);
    }
    const contentLines = [];
    for (let i2 = startLine + 1; i2 < nextLine; i2++) {
      const sPos = s2.bMarks[i2] + s2.tShift[i2];
      const ePos = s2.eMarks[i2];
      contentLines.push(s2.src.slice(sPos, ePos));
    }
    if (contentLines.some((line$1) => line$1.trim().length > 0)) {
      let innerSrc = contentLines.join("\n");
      if (!innerSrc.endsWith("\n")) innerSrc += "\n";
      if (!innerSrc.endsWith("\n\n")) innerSrc += "\n";
      const prevToken = s2.tokens[s2.tokens.length - 1];
      if (prevToken) prevToken.raw = innerSrc;
      const innerTokens = [];
      s2.md.block.parse(innerSrc, s2.md, s2.env, innerTokens);
      s2.tokens.push(...innerTokens);
    }
    if (found) s2.push("vmr_container_close", "div", -1);
    s2.line = found ? nextLine + 1 : nextLine;
    return true;
  }, { alt: [
    "paragraph",
    "reference",
    "blockquote",
    "list"
  ] });
}
var VOID_HTML_TAG_NAMES = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var INLINE_HTML_TAG_NAMES = [
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "button",
  "cite",
  "code",
  "data",
  "del",
  "dfn",
  "em",
  "font",
  "i",
  "ins",
  "kbd",
  "label",
  "mark",
  "q",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var"
];
var BLOCK_HTML_TAG_NAMES = [
  "article",
  "aside",
  "blockquote",
  "details",
  "div",
  "figcaption",
  "figure",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul"
];
var SVG_HTML_TAG_NAMES = [
  "svg",
  "g",
  "path"
];
var EXTENDED_STANDARD_HTML_TAG_NAMES = [
  "address",
  "audio",
  "body",
  "canvas",
  "caption",
  "colgroup",
  "datalist",
  "dd",
  "dialog",
  "dl",
  "dt",
  "fieldset",
  "form",
  "head",
  "hgroup",
  "html",
  "iframe",
  "legend",
  "map",
  "menu",
  "meter",
  "noscript",
  "object",
  "optgroup",
  "option",
  "output",
  "picture",
  "progress",
  "rp",
  "rt",
  "ruby",
  "script",
  "select",
  "style",
  "template",
  "textarea",
  "tfoot",
  "title",
  "video"
];
var DANGEROUS_HTML_ATTR_NAMES = [
  "onclick",
  "onerror",
  "onload",
  "onmouseover",
  "onmouseout",
  "onmousedown",
  "onmouseup",
  "onkeydown",
  "onkeyup",
  "onfocus",
  "onblur",
  "onsubmit",
  "onreset",
  "onchange",
  "onselect",
  "ondblclick",
  "ontouchstart",
  "ontouchend",
  "ontouchmove",
  "ontouchcancel",
  "onwheel",
  "onscroll",
  "oncopy",
  "oncut",
  "onpaste",
  "oninput",
  "oninvalid",
  "onsearch"
];
var URL_HTML_ATTR_NAMES = [
  "href",
  "src",
  "srcset",
  "xlink:href",
  "formaction"
];
var BLOCKED_HTML_TAG_NAMES = ["script"];
var NON_STRUCTURING_HTML_TAG_NAMES = [
  "pre",
  "script",
  "style",
  "textarea",
  "title"
];
var VOID_HTML_TAGS = new Set(VOID_HTML_TAG_NAMES);
var STANDARD_BLOCK_HTML_TAGS = new Set(BLOCK_HTML_TAG_NAMES);
var STANDARD_HTML_TAGS = /* @__PURE__ */ new Set([
  ...VOID_HTML_TAG_NAMES,
  ...INLINE_HTML_TAG_NAMES,
  ...BLOCK_HTML_TAG_NAMES,
  ...SVG_HTML_TAG_NAMES
]);
var EXTENDED_STANDARD_HTML_TAGS = /* @__PURE__ */ new Set([...STANDARD_HTML_TAGS, ...EXTENDED_STANDARD_HTML_TAG_NAMES]);
var DANGEROUS_HTML_ATTRS = new Set(DANGEROUS_HTML_ATTR_NAMES);
var URL_HTML_ATTRS = new Set(URL_HTML_ATTR_NAMES);
var BLOCKED_HTML_TAGS = new Set(BLOCKED_HTML_TAG_NAMES);
var NON_STRUCTURING_HTML_TAGS = new Set(NON_STRUCTURING_HTML_TAG_NAMES);
function stripHtmlControlAndWhitespace(value) {
  let out = "";
  for (const ch of value) {
    const code$1 = ch.charCodeAt(0);
    if (code$1 <= 31 || code$1 === 127) continue;
    if (/\s/u.test(ch)) continue;
    out += ch;
  }
  return out;
}
function isUnsafeHtmlUrl(value) {
  const normalized = stripHtmlControlAndWhitespace(value).toLowerCase();
  if (normalized.startsWith("javascript:") || normalized.startsWith("vbscript:")) return true;
  if (normalized.startsWith("data:")) return !(normalized.startsWith("data:image/") || normalized.startsWith("data:video/") || normalized.startsWith("data:audio/"));
  return false;
}
function escapeTagForRegExp(tag) {
  return tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function findTagCloseIndexOutsideQuotes(input) {
  let inSingle = false;
  let inDouble = false;
  for (let i2 = 0; i2 < input.length; i2++) {
    const ch = input[i2];
    if (ch === "\\") {
      i2++;
      continue;
    }
    if (!inDouble && ch === "'") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && ch === '"') {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === ">") return i2;
  }
  return -1;
}
function parseTagAttrs(openTag) {
  const attrs = [];
  const attrRegex = /\s([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match2;
  while ((match2 = attrRegex.exec(openTag)) !== null) {
    const attrName = match2[1];
    if (!attrName) continue;
    const attrValue = match2[2] || match2[3] || match2[4] || "";
    attrs.push([attrName, attrValue]);
  }
  return attrs;
}
var HTML_LIKE_TAG_NAME_RE = /^[a-z][a-z0-9_-]*$/;
function isHtmlLikeTagName(tag) {
  return HTML_LIKE_TAG_NAME_RE.test(String(tag ?? "").trim().toLowerCase());
}
function normalizeCustomHtmlTagName(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (!raw.startsWith("<")) return isHtmlLikeTagName(raw) ? raw.toLowerCase() : "";
  let index = 1;
  while (index < raw.length && /\s/.test(raw[index])) index++;
  if (raw[index] === "/") {
    index++;
    while (index < raw.length && /\s/.test(raw[index])) index++;
  }
  const start = index;
  while (index < raw.length && /[\w-]/.test(raw[index])) index++;
  const normalized = raw.slice(start, index).toLowerCase();
  const next = raw[index] ?? "";
  if (next && !/[\s/>]/.test(next)) return "";
  return isHtmlLikeTagName(normalized) ? normalized : "";
}
function normalizeCustomHtmlTags(tags) {
  if (!tags || tags.length === 0) return [];
  const seen = /* @__PURE__ */ new Set();
  const normalized = [];
  for (const tag of tags) {
    const value = normalizeCustomHtmlTagName(tag);
    if (!value || seen.has(value)) continue;
    seen.add(value);
    normalized.push(value);
  }
  return normalized;
}
function mergeCustomHtmlTags(...lists) {
  const seen = /* @__PURE__ */ new Set();
  const normalized = [];
  for (const list$1 of lists) for (const tag of normalizeCustomHtmlTags(list$1)) {
    if (seen.has(tag)) continue;
    seen.add(tag);
    normalized.push(tag);
  }
  return normalized;
}
function resolveCustomHtmlTags(tags) {
  const normalized = normalizeCustomHtmlTags(tags);
  return {
    key: normalized.join(","),
    tags: normalized
  };
}
function getHtmlTagFromContent(html) {
  return normalizeCustomHtmlTagName(html);
}
function hasCompleteHtmlTagContent(html, tag) {
  const raw = String(html ?? "");
  const normalizedTag = normalizeCustomHtmlTagName(tag);
  if (!normalizedTag) return false;
  const escaped = escapeTagForRegExp(normalizedTag);
  const openMatch = raw.match(new RegExp(String.raw`^\s*<\s*${escaped}(?:\s[^>]*)?(\s*\/)?>`, "i"));
  if (!openMatch) return false;
  if (openMatch[1]) return true;
  return new RegExp(String.raw`<\s*\/\s*${escaped}\s*>`, "i").test(raw);
}
function shouldRenderUnknownHtmlTagAsText(html, tag) {
  const normalizedTag = normalizeCustomHtmlTagName(tag);
  return Boolean(normalizedTag) && !STANDARD_HTML_TAGS.has(normalizedTag) && !hasCompleteHtmlTagContent(html, normalizedTag);
}
function stripCustomHtmlWrapper(html, tag) {
  const raw = String(html ?? "");
  const normalizedTag = normalizeCustomHtmlTagName(tag);
  if (!normalizedTag) return raw;
  const escaped = escapeTagForRegExp(normalizedTag);
  const openRe = new RegExp(String.raw`^\s*<\s*${escaped}(?:\s[^>]*)?>\s*`, "i");
  const closeRe = new RegExp(String.raw`\s*<\s*\/\s*${escaped}\s*>\s*$`, "i");
  return raw.replace(openRe, "").replace(closeRe, "");
}
var VOID_TAGS = VOID_HTML_TAGS;
var BASE_COMMON_HTML_TAGS = STANDARD_HTML_TAGS;
var BLOCK_LEVEL_HTML_TAGS = new Set(STANDARD_BLOCK_HTML_TAGS);
BLOCK_LEVEL_HTML_TAGS.delete("details");
var OPEN_TAG_RE = /<([A-Z][\w-]*)(?=[\s/>]|$)/gi;
var CLOSE_TAG_RE = /<\/\s*([A-Z][\w-]*)(?=[\s/>]|$)/gi;
var TAG_NAME_AT_START_RE = /^<\s*(?:\/\s*)?([A-Z][\w-]*)/i;
var STRICT_OPEN_TAG_NAME_AT_START_RE = /^<\s*([A-Z][\w:-]*)(?=[\s/>]|$)/i;
function getHtmlInlineTagName(content) {
  var _a3;
  return (((_a3 = content.match(TAG_NAME_AT_START_RE)) == null ? void 0 : _a3[1]) ?? "").toLowerCase();
}
function isHtmlInlineClosingTag(content) {
  return /^\s*<\s*\//.test(content);
}
function isSelfClosingHtmlInline(content, tag) {
  return VOID_TAGS.has(tag) || /\/\s*>\s*$/.test(content);
}
function findMatchingCloseChildIndex(children, tag) {
  let depth = 0;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (!child || child.type !== "html_inline") continue;
    const content = String(child.content ?? "");
    const childTag = getHtmlInlineTagName(content);
    if (childTag !== tag) continue;
    if (isHtmlInlineClosingTag(content)) {
      if (depth === 0) return index;
      depth--;
      continue;
    }
    if (!isSelfClosingHtmlInline(content, childTag)) depth++;
  }
  return -1;
}
function getTrailingOpenDepth(children, tag) {
  let depth = 0;
  for (const child of children) {
    if (!child || child.type !== "html_inline") continue;
    const content = String(child.content ?? "");
    const childTag = getHtmlInlineTagName(content);
    if (childTag !== tag) continue;
    if (isHtmlInlineClosingTag(content)) {
      if (depth > 0) depth--;
      continue;
    }
    if (!isSelfClosingHtmlInline(content, childTag)) depth++;
  }
  return depth;
}
function findMatchingCloseRangeInHtml(content, tag, startIndex = 0) {
  const tokenRe = new RegExp(String.raw`<\s*(\/?)\s*${escapeTagForRegExp(tag)}(?=[\s>/])[^>]*>`, "gi");
  tokenRe.lastIndex = Math.max(0, startIndex);
  let depth = 0;
  let match2;
  while ((match2 = tokenRe.exec(content)) !== null) {
    const raw = match2[0] ?? "";
    const closing = !!match2[1];
    const selfClosing = !closing && /\/\s*>$/.test(raw);
    if (closing) {
      if (depth === 0) return {
        start: match2.index,
        end: match2.index + raw.length
      };
      depth--;
      continue;
    }
    if (!selfClosing) depth++;
  }
  return null;
}
function getTrailingCustomTagDepthInHtml(content, tag) {
  const tokenRe = new RegExp(String.raw`<\s*(\/?)\s*${escapeTagForRegExp(tag)}(?=[\s>/])[^>]*>`, "gi");
  let depth = 0;
  let match2;
  while ((match2 = tokenRe.exec(content)) !== null) {
    const raw = match2[0] ?? "";
    const closing = !!match2[1];
    const selfClosing = !closing && /\/\s*>$/.test(raw);
    if (closing) {
      if (depth > 0) depth--;
      continue;
    }
    if (!selfClosing) depth++;
  }
  return depth;
}
function tokenToRaw$1(token) {
  const shape = token;
  return String(shape.raw ?? shape.content ?? shape.markup ?? "");
}
function isNonElementHtmlBlock(content) {
  return /^\s*<\s*[!?]/.test(content);
}
function buildCommonHtmlTagSet(extraTags) {
  const set2 = new Set(BASE_COMMON_HTML_TAGS);
  if (extraTags && Array.isArray(extraTags)) for (const t2 of extraTags) {
    const raw = String(t2 ?? "").trim();
    if (!raw) continue;
    const m = raw.match(/^[<\s/]*([A-Z][\w-]*)/i);
    if (!m) continue;
    set2.add(m[1].toLowerCase());
  }
  return set2;
}
function isCommonHtmlTagOrPrefix(tag, tagSet) {
  if (tagSet.has(tag)) return true;
  for (const common of tagSet) if (common.startsWith(tag)) return true;
  return false;
}
function findFirstIncompleteTag(content, tagSet) {
  let first = null;
  for (const m of content.matchAll(OPEN_TAG_RE)) {
    const idx = m.index ?? -1;
    if (idx < 0) continue;
    const tag = (m[1] ?? "").toLowerCase();
    if (!isCommonHtmlTagOrPrefix(tag, tagSet)) continue;
    if (findTagCloseIndexOutsideQuotes(content.slice(idx)) !== -1) continue;
    if (!first || idx < first.index) first = {
      index: idx,
      tag,
      closing: false
    };
  }
  for (const m of content.matchAll(CLOSE_TAG_RE)) {
    const idx = m.index ?? -1;
    if (idx < 0) continue;
    const tag = (m[1] ?? "").toLowerCase();
    if (!isCommonHtmlTagOrPrefix(tag, tagSet)) continue;
    if (findTagCloseIndexOutsideQuotes(content.slice(idx)) !== -1) continue;
    if (!first || idx < first.index) first = {
      index: idx,
      tag,
      closing: true
    };
  }
  const bareClose = /<\/\s*$/.exec(content);
  if (bareClose && typeof bareClose.index === "number") {
    const idx = bareClose.index;
    if (!content.slice(idx).includes(">") && (!first || idx < first.index)) first = {
      index: idx,
      tag: "",
      closing: true
    };
  }
  const bareOpen = /<\s*$/.exec(content);
  if (bareOpen && typeof bareOpen.index === "number") {
    const idx = bareOpen.index;
    const rest = content.slice(idx);
    if (!rest.startsWith("</") && !rest.includes(">") && (!first || idx < first.index)) first = {
      index: idx,
      tag: "",
      closing: false
    };
  }
  return first;
}
function splitTextToken(token, content) {
  const t2 = token;
  return Object.assign(Object.create(Object.getPrototypeOf(t2)), t2, {
    type: "text",
    content,
    raw: content
  });
}
function fixStreamingHtmlInlineChildren(children, tagSet) {
  var _a3;
  if (!children.length) return { children };
  const out = [];
  let pending = null;
  let pendingAtEnd = null;
  function pushTextPart(text$1, baseToken) {
    if (!text$1) return;
    if (baseToken) out.push(splitTextToken(baseToken, text$1));
    else out.push({
      type: "text",
      content: text$1,
      raw: text$1
    });
  }
  function splitCompleteHtmlFromText(chunk, baseToken) {
    let cursor = 0;
    while (cursor < chunk.length) {
      const lt2 = chunk.indexOf("<", cursor);
      if (lt2 === -1) {
        pushTextPart(chunk.slice(cursor), baseToken);
        break;
      }
      pushTextPart(chunk.slice(cursor, lt2), baseToken);
      const sub = chunk.slice(lt2);
      const tagMatch = sub.match(TAG_NAME_AT_START_RE);
      if (!tagMatch) {
        pushTextPart("<", baseToken);
        cursor = lt2 + 1;
        continue;
      }
      const closeIdx = findTagCloseIndexOutsideQuotes(sub);
      if (closeIdx === -1) {
        pushTextPart("<", baseToken);
        cursor = lt2 + 1;
        continue;
      }
      const tagText = sub.slice(0, closeIdx + 1);
      const tagName = (tagMatch[1] ?? "").toLowerCase();
      if (tagSet.has(tagName)) out.push({
        type: "html_inline",
        tag: "",
        content: tagText,
        raw: tagText
      });
      else pushTextPart(tagText, baseToken);
      cursor = lt2 + tagText.length;
    }
  }
  function processTextChunk(chunk, baseToken) {
    if (!chunk) return;
    const match2 = findFirstIncompleteTag(chunk, tagSet);
    if (!match2) {
      splitCompleteHtmlFromText(chunk, baseToken);
      return;
    }
    const before = chunk.slice(0, match2.index);
    if (before) splitCompleteHtmlFromText(before, baseToken);
    pending = {
      tag: match2.tag,
      buffer: chunk.slice(match2.index),
      closing: match2.closing
    };
    pendingAtEnd = pending.buffer;
  }
  for (const child of children) {
    if (pending) {
      pending.buffer += tokenToRaw$1(child);
      pendingAtEnd = pending.buffer;
      const closeIdx = findTagCloseIndexOutsideQuotes(pending.buffer);
      if (closeIdx === -1) continue;
      const tagChunk = pending.buffer.slice(0, closeIdx + 1);
      const afterChunk = pending.buffer.slice(closeIdx + 1);
      out.push({
        type: "html_inline",
        tag: "",
        content: tagChunk,
        raw: tagChunk
      });
      pending = null;
      pendingAtEnd = null;
      if (afterChunk) processTextChunk(afterChunk);
      continue;
    }
    if (child.type === "html_inline") {
      const content = tokenToRaw$1(child);
      const tagName = (((_a3 = content.match(TAG_NAME_AT_START_RE)) == null ? void 0 : _a3[1]) ?? "").toLowerCase();
      if (tagName && tagSet.has(tagName) && findTagCloseIndexOutsideQuotes(content) === -1) {
        pending = {
          tag: tagName,
          buffer: content,
          closing: /^<\s*\//.test(content)
        };
        pendingAtEnd = pending.buffer;
        continue;
      }
    }
    if (child.type === "text") {
      const content = String(child.content ?? "");
      if (!content.includes("<")) {
        out.push(child);
        continue;
      }
      processTextChunk(content, child);
      continue;
    }
    out.push(child);
  }
  return {
    children: out,
    pendingBuffer: pendingAtEnd ?? void 0
  };
}
function applyFixHtmlInlineTokens(md, options = {}) {
  var _a3;
  const commonHtmlTags = buildCommonHtmlTagSet(options.customHtmlTags);
  const autoCloseInlineTagSet = /* @__PURE__ */ new Set([
    "a",
    "span",
    "strong",
    "em",
    "b",
    "i",
    "u"
  ]);
  const customTagSet = /* @__PURE__ */ new Set();
  if ((_a3 = options.customHtmlTags) == null ? void 0 : _a3.length) for (const t2 of options.customHtmlTags) {
    const name = normalizeCustomHtmlTagName(t2);
    if (!name) continue;
    customTagSet.add(name);
    autoCloseInlineTagSet.add(name);
  }
  const shouldMergeHtmlBlockTag = (tag) => customTagSet.has(tag) || !commonHtmlTags.has(tag) || BLOCK_LEVEL_HTML_TAGS.has(tag);
  const getHtmlBlockCarrierContent = (token) => {
    if (token.type === "html_block") return String(token.content ?? "");
    if (token.type !== "inline" || !Array.isArray(token.children) || token.children.length !== 1) return "";
    const onlyChild = token.children[0];
    if ((onlyChild == null ? void 0 : onlyChild.type) !== "html_block") return "";
    return String(token.content ?? onlyChild.content ?? "");
  };
  const normalizeHtmlBlockCarrier = (token, content) => {
    token.type = "html_block";
    token.content = content;
    token.raw = content;
    token.children = [];
  };
  md.core.ruler.after("inline", "fix_html_inline_streaming", (state) => {
    const toks = state.tokens ?? [];
    for (const t2 of toks) {
      const tok = t2;
      if (tok.type !== "inline" || !Array.isArray(tok.children)) continue;
      const originalContent = String(tok.content ?? "");
      const sourceChildren = tok.children.length ? tok.children : originalContent.includes("<") ? [{
        type: "text",
        content: originalContent,
        raw: originalContent
      }] : null;
      if (!sourceChildren) continue;
      try {
        const fixed = fixStreamingHtmlInlineChildren(sourceChildren, commonHtmlTags);
        tok.children = fixed.children;
        if (fixed.pendingBuffer) {
          const idx = originalContent.lastIndexOf(fixed.pendingBuffer);
          if (idx !== -1) {
            const trimmed = originalContent.slice(0, idx);
            tok.content = trimmed;
            if (typeof tok.raw === "string") tok.raw = trimmed;
          }
        }
      } catch (e2) {
        console.error("[applyFixHtmlInlineTokens] failed to fix streaming html inline", e2);
      }
    }
  });
  md.core.ruler.push("fix_html_inline_tokens", (state) => {
    var _a4, _b, _c, _d, _e, _f, _g, _h, _i2, _j, _k, _l2, _m, _n2, _o2;
    const toks = state.tokens ?? [];
    const tagStack = [];
    for (let i2 = 0; i2 < toks.length; i2++) {
      const t2 = toks[i2];
      if (tagStack.length > 0) {
        const [openTag, openIndex] = tagStack[tagStack.length - 1];
        if (i2 !== openIndex) {
          if (t2.type === "paragraph_open" || t2.type === "paragraph_close") {
            toks.splice(i2, 1);
            i2--;
            continue;
          }
          const chunk = String(t2.content ?? t2.raw ?? "");
          if (chunk) {
            const openToken = toks[openIndex];
            const mergedContent = `${String(openToken.content || "")}
${chunk}`;
            const openEnd = findTagCloseIndexOutsideQuotes(mergedContent);
            const closeRange = openEnd === -1 ? null : findMatchingCloseRangeInHtml(mergedContent, openTag, openEnd + 1);
            if (closeRange) {
              const before = mergedContent.slice(0, closeRange.end);
              const after = mergedContent.slice(closeRange.end);
              openToken.content = before;
              openToken.loading = false;
              const afterTrimmed = after.replace(/^\s+/, "");
              toks.splice(i2, 1);
              tagStack.pop();
              if (afterTrimmed) toks.splice(i2, 0, afterTrimmed.startsWith("<") ? {
                type: "html_block",
                content: afterTrimmed
              } : {
                type: "inline",
                content: afterTrimmed,
                children: [{
                  type: "text",
                  content: afterTrimmed,
                  raw: afterTrimmed
                }]
              });
              i2--;
              continue;
            }
            openToken.content = mergedContent;
            if (openToken.loading !== false) openToken.loading = true;
          }
          toks.splice(i2, 1);
          i2--;
          continue;
        }
      }
      const rawContent = getHtmlBlockCarrierContent(t2);
      if (rawContent) {
        if (isNonElementHtmlBlock(rawContent)) continue;
        const tag = (((_a4 = rawContent.match(/<\s*(?:\/\s*)?([^\s>/]+)/)) == null ? void 0 : _a4[1]) ?? "").toLowerCase();
        const isClosingTag$1 = /^\s*<\s*\//.test(rawContent);
        if (!tag || !shouldMergeHtmlBlockTag(tag)) continue;
        normalizeHtmlBlockCarrier(t2, rawContent);
        if (!isClosingTag$1) {
          if (tag) {
            if (!new RegExp(`^\\s*<\\s*${tag}\\b[^>]*\\/\\s*>`, "i").test(rawContent) && getTrailingCustomTagDepthInHtml(rawContent, tag) > 0) tagStack.push([tag, i2]);
          }
        } else if (tagStack.length > 0 && tag && tagStack[tagStack.length - 1][0] === tag) {
          const [, openIndex] = tagStack[tagStack.length - 1];
          const openToken = toks[openIndex];
          openToken.content = `${String(openToken.content || "")}
${rawContent}`;
          openToken.loading = false;
          tagStack.pop();
          toks.splice(i2, 1);
          i2--;
        }
        continue;
      } else if (tagStack.length > 0) {
        if (t2.type === "paragraph_open" || t2.type === "paragraph_close") {
          toks.splice(i2, 1);
          i2--;
          continue;
        }
        const content = t2.content || "";
        const isClosingTag$1 = new RegExp(`<\\s*\\/\\s*${tagStack[tagStack.length - 1][0]}\\s*>`, "i").test(content);
        if (content) {
          const [, openIndex] = tagStack[tagStack.length - 1];
          const openToken = toks[openIndex];
          openToken.content = `${openToken.content || ""}
${content}`;
          if (openToken.loading !== false) openToken.loading = !isClosingTag$1;
        }
        if (isClosingTag$1) tagStack.pop();
        toks.splice(i2, 1);
        i2--;
      } else continue;
    }
    if (customTagSet.size > 0) {
      const openReCache = /* @__PURE__ */ new Map();
      const closeReCache = /* @__PURE__ */ new Map();
      const getOpenRe = (tag) => {
        let r2 = openReCache.get(tag);
        if (!r2) {
          r2 = new RegExp(`<\\s*${tag}\\b`, "i");
          openReCache.set(tag, r2);
        }
        return r2;
      };
      const getCloseRe = (tag) => {
        let r2 = closeReCache.get(tag);
        if (!r2) {
          r2 = new RegExp(`<\\s*\\/\\s*${tag}\\s*>`, "i");
          closeReCache.set(tag, r2);
        }
        return r2;
      };
      const stack = [];
      for (let i2 = 0; i2 < toks.length; i2++) {
        const tok = toks[i2];
        const content = String(tok.content ?? "");
        if (stack.length > 0) {
          const top = stack[stack.length - 1];
          const openTok = toks[top.index];
          if (tok.type === "html_block" && getCloseRe(top.tag).test(content)) {
            openTok.content = `${String(openTok.content ?? "")}
${content}`;
            if (Array.isArray(openTok.children)) openTok.children.push({
              type: "html_inline",
              content: `</${top.tag}>`,
              raw: `</${top.tag}>`
            });
            toks.splice(i2, 1);
            i2--;
            stack.pop();
            continue;
          }
          if (tok.type !== "inline") continue;
          const children$1 = Array.isArray(tok.children) ? tok.children : [];
          const closeChildIndex = findMatchingCloseChildIndex(children$1, top.tag);
          if (closeChildIndex !== -1) {
            const beforeChildren = children$1.slice(0, closeChildIndex + 1);
            const afterChildren = children$1.slice(closeChildIndex + 1);
            const beforeText = beforeChildren.map((c) => String((c == null ? void 0 : c.content) ?? (c == null ? void 0 : c.raw) ?? "")).join("");
            openTok.content = `${String(openTok.content ?? "")}
${beforeText}`;
            if (Array.isArray(openTok.children)) openTok.children.push(...beforeChildren);
            if (afterChildren.length) {
              const afterText = afterChildren.map((c) => String(c.content ?? c.raw ?? "")).join("");
              if (afterText.trim()) {
                const trimmed = afterText.replace(/^\s+/, "");
                if (trimmed.startsWith("<")) toks.splice(i2, 1, {
                  type: "html_block",
                  content: trimmed
                });
                else toks.splice(i2, 1, {
                  type: "paragraph_open",
                  tag: "p",
                  nesting: 1
                }, {
                  type: "inline",
                  tag: "",
                  nesting: 0,
                  content: afterText,
                  children: [{
                    type: "text",
                    content: afterText,
                    raw: afterText
                  }]
                }, {
                  type: "paragraph_close",
                  tag: "p",
                  nesting: -1
                });
              } else {
                toks.splice(i2, 1);
                i2--;
              }
            } else {
              toks.splice(i2, 1);
              i2--;
            }
            stack.pop();
            continue;
          }
          openTok.content = `${String(openTok.content ?? "")}
${content}`;
          if (Array.isArray(openTok.children)) openTok.children.push(...children$1);
          toks.splice(i2, 1);
          i2--;
          continue;
        }
        if (tok.type !== "inline") continue;
        const children = Array.isArray(tok.children) ? tok.children : [];
        for (const tag of customTagSet) if ((children.length ? getTrailingOpenDepth(children, tag) : getOpenRe(tag).test(content) && !getCloseRe(tag).test(content) ? 1 : 0) > 0) {
          stack.push({
            tag,
            index: i2
          });
          break;
        }
      }
    }
    {
      let depth = 0;
      for (let i2 = 0; i2 < toks.length; i2++) {
        const t2 = toks[i2];
        if (t2.type === "paragraph_open") {
          depth++;
          continue;
        }
        if (t2.type === "paragraph_close") if (depth > 0) depth--;
        else {
          toks.splice(i2, 1);
          i2--;
        }
      }
    }
    for (let i2 = 0; i2 < toks.length; i2++) {
      const t2 = toks[i2];
      if (t2.type === "html_block") {
        const tag = (((_c = (_b = t2.content) == null ? void 0 : _b.match(/<([^\s>/]+)/)) == null ? void 0 : _c[1]) ?? "").toLowerCase();
        if (tag.startsWith("!") || tag.startsWith("?")) {
          t2.loading = false;
          continue;
        }
        if (customTagSet.has(tag)) {
          const raw$2 = String(t2.content ?? "");
          const openEnd = findTagCloseIndexOutsideQuotes(raw$2);
          const closeRange = openEnd === -1 ? null : findMatchingCloseRangeInHtml(raw$2, tag, openEnd + 1);
          t2.loading = !!closeRange ? false : t2.loading !== void 0 ? t2.loading : true;
          const endTagIndex$1 = (closeRange == null ? void 0 : closeRange.start) ?? -1;
          const closeLen$1 = closeRange ? closeRange.end - closeRange.start : 0;
          if (endTagIndex$1 !== -1) {
            const rawForNode = raw$2.slice(0, endTagIndex$1 + closeLen$1);
            let inner = "";
            if (openEnd !== -1 && openEnd < endTagIndex$1) inner = raw$2.slice(openEnd + 1, endTagIndex$1);
            t2.children = [{
              type: tag,
              content: inner,
              raw: rawForNode,
              attrs: [],
              tag,
              loading: false
            }];
            t2.content = rawForNode;
            t2.raw = rawForNode;
            const afterTrimmed = (raw$2.slice(endTagIndex$1 + closeLen$1) || "").replace(/^\s+/, "");
            if (afterTrimmed) toks.splice(i2 + 1, 0, afterTrimmed.startsWith("<") ? {
              type: "html_block",
              content: afterTrimmed
            } : {
              type: "text",
              content: afterTrimmed,
              raw: afterTrimmed
            });
          } else t2.children = [{
            type: tag,
            content: "",
            raw: raw$2,
            attrs: [],
            tag,
            loading: true
          }];
          continue;
        }
        if ([
          "br",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "div",
          "p",
          "ul",
          "li"
        ].includes(tag)) continue;
        t2.type = "inline";
        const attrs = [];
        const attrRegex = /\s([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
        let match2;
        while ((match2 = attrRegex.exec(t2.content || "")) !== null) {
          const attrName = match2[1];
          const attrValue = match2[2] || match2[3] || match2[4] || "";
          attrs.push([attrName, attrValue]);
        }
        const raw$1 = String(t2.content ?? "");
        const closeMatch = new RegExp(`<\\/\\s*${tag}\\s*>`, "i").exec(raw$1);
        const endTagIndex = closeMatch ? closeMatch.index : -1;
        const closeLen = closeMatch ? closeMatch[0].length : 0;
        if (endTagIndex !== -1) {
          const rawForNode = raw$1.slice(0, endTagIndex + closeLen);
          const afterTrimmed = (raw$1.slice(endTagIndex + closeLen) || "").replace(/^\s+/, "");
          t2.children = [{
            type: "html_block",
            content: rawForNode,
            tag,
            loading: false
          }];
          t2.content = rawForNode;
          t2.raw = rawForNode;
          if (afterTrimmed) toks.splice(i2 + 1, 0, afterTrimmed.startsWith("<") ? {
            type: "html_block",
            content: afterTrimmed
          } : {
            type: "text",
            content: afterTrimmed,
            raw: afterTrimmed
          });
        } else t2.children = [{
          type: "html_block",
          content: t2.content,
          tag,
          loading: true
        }];
        continue;
      }
      if (!t2 || t2.type !== "inline") continue;
      if (t2.children.length === 2 && t2.children[0].type === "html_inline") {
        const tag = (((_e = (_d = t2.children[0].content) == null ? void 0 : _d.match(/<([^\s>/]+)/)) == null ? void 0 : _e[1]) ?? "").toLowerCase();
        const second = t2.children[1];
        const secondCloseTag = ((_g = (_f = String((second == null ? void 0 : second.content) ?? "").match(/^<\s*\/\s*([^\s>]+)/)) == null ? void 0 : _f[1]) == null ? void 0 : _g.toLowerCase()) ?? "";
        if ((second == null ? void 0 : second.type) === "html_inline" && secondCloseTag === tag) continue;
        if (autoCloseInlineTagSet.has(tag)) {
          t2.children[0].loading = true;
          t2.children[0].tag = tag;
          t2.children.push({
            type: "html_inline",
            tag,
            loading: true,
            content: `</${tag}>`
          });
        } else t2.children = [{
          type: "html_block",
          loading: true,
          tag,
          content: String(((_h = t2.children[0]) == null ? void 0 : _h.content) ?? "") + String(((_i2 = t2.children[1]) == null ? void 0 : _i2.content) ?? "")
        }];
        continue;
      } else if (t2.children.length === 3 && t2.children[0].type === "html_inline" && t2.children[2].type === "html_inline") {
        const tag = (((_k = (_j = t2.children[0].content) == null ? void 0 : _j.match(/<([^\s>/]+)/)) == null ? void 0 : _k[1]) ?? "").toLowerCase();
        if (autoCloseInlineTagSet.has(tag)) continue;
        t2.children = [{
          type: "html_block",
          loading: false,
          tag,
          content: t2.children.map((ct2) => ct2.content).join("")
        }];
        continue;
      }
      if (!((_l2 = t2.content) == null ? void 0 : _l2.startsWith("<")) || ((_m = t2.children) == null ? void 0 : _m.length) !== 1) continue;
      const raw = String(t2.content);
      const htmlToken = t2;
      const onlyChild = htmlToken.children[0];
      if ((onlyChild == null ? void 0 : onlyChild.type) !== "html_inline") {
        if (/^<\s*(?:\/\s*)?[A-Z][\w:-]*\s*$/i.test(raw)) htmlToken.children.length = 0;
        continue;
      }
      const strictTagName = ((_o2 = (_n2 = String(onlyChild.content ?? raw).match(STRICT_OPEN_TAG_NAME_AT_START_RE)) == null ? void 0 : _n2[1]) == null ? void 0 : _o2.toLowerCase()) ?? "";
      if (!strictTagName) continue;
      if (/\/\s*>\s*$/.test(raw) || VOID_TAGS.has(strictTagName)) {
        htmlToken.children = [{
          type: "html_inline",
          content: raw
        }];
        continue;
      }
      htmlToken.children.length = 0;
    }
  });
}
function looksLikeCode(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^&[a-z0-9#]+;/i.test(trimmed)) return false;
  if (/^(?:const|let|var|function|class|import|export|if|for|while|return|await|async|yield|try|catch|throw|new|typeof|instanceof|switch|case|break|continue|def|ruby|perl|print|echo|true|false|null|undefined|NaN|Infinity|this)\b/.test(trimmed)) return true;
  if (/[a-z_$][\w$]*(?:\.[a-z_$][\w$]*|\['[^']*'\]|\["[^"]*"\]|\[\d+\])*\s*\(/i.test(trimmed)) return true;
  if (/[a-z_$][\w$]*(?:\.[a-z_$][\w$]*|\['[^']*'\]|\["[^"]*"\]|\[[\d+\]])+/i.test(trimmed)) return true;
  if (/\w+\s*(?:===?|!==?|<=?|>=?|\+\+|--|&&|\|\||\?\.)/.test(trimmed)) return true;
  if (/^(?:!!|\+\+|--)\s*\w/.test(trimmed)) return true;
  if (/[\w$]+\s*(?:\+=|-=|\*=|\/=|%=|\*\*=|=)/.test(trimmed)) return true;
  if (/^(?:https?:\/\/|ftp:\/\/|file:\/\/|\/\/|www\.)/i.test(trimmed)) return true;
  if (/`[^`]*\$\{[^}]*\}[^`]*`/.test(trimmed)) return true;
  if (/<\/?[A-Z][a-zA-Z0-9]*/.test(trimmed)) return true;
  if (/<[a-z][a-z0-9]*\s[^>]+>/.test(trimmed)) return true;
  if (/^(["'`]).*\1\s*[;,]?$/.test(trimmed)) return true;
  if (/^\[[\s\S]*\]$/.test(trimmed) || /^\{[\s\S]*\}$/.test(trimmed) || /^\(\s*\)$/.test(trimmed)) return true;
  if (/[\w$]+(?:\s*[+\-*/%<>=!&|^~:]+\s*[\w$]+|\s*\.\s*[\w$]+)/.test(trimmed)) return true;
  if (/=>|->|::/.test(trimmed)) return true;
  if (/^@[\w.$]+$/.test(trimmed)) return true;
  if (/^(?:0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+(?:\.\d*)?(?:px|em|rem|%|vh|vw|deg|s|ms)?)$/.test(trimmed)) return true;
  if (/^\$[\w$]+\s*[=:]/.test(trimmed)) return true;
  if (/\|\s*\w+|\w+\s*\|/.test(trimmed)) return true;
  if (/^(?:git|npm|yarn|pnpm|bun|pip|cargo|go|rust|python|node|java|mvn|gradle|docker|kubectl)\s+/.test(trimmed)) return true;
  if (/(?:console|window|document|Math|JSON|Date|Array|Object|String|Number|Boolean)\.[a-zA-Z]/.test(trimmed)) return true;
  if (/^(?:\/\/|#|\/\*|\*\/|<!--|-->)/.test(trimmed)) return true;
  if (/^(?:<<<|<<\s*['"]?\w+['"]?)/.test(trimmed)) return true;
  return false;
}
function applyFixIndentedCodeBlock(md, options = {}) {
  if (options.enabled === false) return;
  md.core.ruler.after("inline", "fix_indented_code_block", (state) => {
    const tokens = state.tokens ?? [];
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (token.type !== "code_block") continue;
      const content = String(token.content ?? "").trim();
      if (!content) continue;
      const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
      if (lines.length === 1 && !looksLikeCode(lines[0] ?? "")) {
        const textContent = lines[0] ?? "";
        const level = token.level ?? 0;
        tokens.splice(i2, 1, {
          type: "paragraph_open",
          tag: "p",
          nesting: 1,
          level
        }, {
          type: "inline",
          tag: "",
          nesting: 0,
          level,
          content: textContent,
          children: [{
            type: "text",
            content: textContent,
            level: level + 1,
            raw: textContent
          }],
          block: true
        }, {
          type: "paragraph_close",
          tag: "p",
          nesting: -1,
          level
        });
        i2 += 2;
      }
    }
  });
}
var FILENAMEISH_EXTENSION_RE = /\.([a-z0-9]{1,10})$/i;
var FILENAMEISH_SEGMENT_RE = /[_()[\]{}<>]/u;
var URL_PREFIX_HINT_RE = /^(?:https?:\/\/|ftp:\/\/|mailto:|www\.)/i;
var URL_QUERY_OR_AUTH_HINT_RE = /[?#@]/u;
var PATH_SEPARATOR_RE = /[\\/]/u;
var DOMAINISH_TEXT_RE = /^[\p{L}\p{N}./\\-]+$/u;
var DOMAIN_LABEL_RE = /^[A-Za-z0-9-]{1,63}$/u;
var PUNYCODE_TLD_RE = /^xn--[a-z0-9-]{2,59}$/i;
var AMBIGUOUS_BARE_DOMAIN_EXTENSIONS = /* @__PURE__ */ new Set([
  "ai",
  "md",
  "py",
  "rs",
  "sh",
  "zip"
]);
var FILENAMEISH_LINK_EXTENSIONS = /* @__PURE__ */ new Set([
  "7z",
  "ai",
  "astro",
  "avi",
  "bash",
  "bz2",
  "c",
  "cjs",
  "cpp",
  "cs",
  "csv",
  "doc",
  "docx",
  "fish",
  "flac",
  "gif",
  "go",
  "gz",
  "h",
  "hpp",
  "html",
  "java",
  "jpeg",
  "jpg",
  "js",
  "json",
  "jsx",
  "kt",
  "md",
  "mdx",
  "mjs",
  "mov",
  "mp3",
  "mp4",
  "pdf",
  "php",
  "png",
  "ppt",
  "pptx",
  "ps1",
  "py",
  "rar",
  "rb",
  "rs",
  "sh",
  "sql",
  "svg",
  "swift",
  "svelte",
  "tar",
  "tgz",
  "toml",
  "ts",
  "tsx",
  "txt",
  "vue",
  "wav",
  "webp",
  "xls",
  "xlsx",
  "xml",
  "yaml",
  "yml",
  "zip",
  "zsh"
]);
function isValidDomainLabel(label) {
  return DOMAIN_LABEL_RE.test(label) && !label.startsWith("-") && !label.endsWith("-");
}
function isPlausibleBareDomain(text$1) {
  var _a3;
  const labels = text$1.split(".");
  if (labels.length < 2) return false;
  const tld = ((_a3 = labels[labels.length - 1]) == null ? void 0 : _a3.toLowerCase()) ?? "";
  if (!(isValidDomainLabel(tld) || PUNYCODE_TLD_RE.test(tld))) return false;
  return labels.every(isValidDomainLabel);
}
function hasDomainAuthorityPrefix(text$1) {
  return isPlausibleBareDomain(text$1.split(/[\\/]/)[0] ?? "");
}
function isUppercaseFilenameSegment(segment) {
  const lettersOnly = segment.replace(/[^a-z]/gi, "");
  return lettersOnly.length >= 2 && lettersOnly === lettersOnly.toUpperCase();
}
function hasStrongFilenameSignals(linkText) {
  if (FILENAMEISH_SEGMENT_RE.test(linkText)) return true;
  if (!DOMAINISH_TEXT_RE.test(linkText)) return true;
  if (PATH_SEPARATOR_RE.test(linkText)) return !hasDomainAuthorityPrefix(linkText);
  return linkText.replace(FILENAMEISH_EXTENSION_RE, "").split(".").filter(Boolean).some(isUppercaseFilenameSegment);
}
function shouldDemoteFilenameLikeLinkify(linkText) {
  if (!linkText || URL_PREFIX_HINT_RE.test(linkText) || URL_QUERY_OR_AUTH_HINT_RE.test(linkText)) return false;
  const extensionMatch = linkText.match(FILENAMEISH_EXTENSION_RE);
  if (!extensionMatch) return false;
  const extension = String(extensionMatch[1] ?? "").toLowerCase();
  if (!FILENAMEISH_LINK_EXTENSIONS.has(extension)) return false;
  if (!AMBIGUOUS_BARE_DOMAIN_EXTENSIONS.has(extension)) return true;
  return hasStrongFilenameSignals(linkText);
}
var LINKIFY_HARD_STOP_CHARS = ["！"];
function textToken(content) {
  return {
    type: "text",
    content,
    raw: content
  };
}
function pushEmOpen(arr, type) {
  if (type === 1) arr.push({
    type: "em_open",
    tag: "em",
    nesting: 1
  });
  else if (type === 2) arr.push({
    type: "strong_open",
    tag: "strong",
    nesting: 1
  });
  else if (type === 3) {
    arr.push({
      type: "strong_open",
      tag: "strong",
      nesting: 1
    });
    arr.push({
      type: "em_open",
      tag: "em",
      nesting: 1
    });
  }
}
function pushEmClose(arr, type) {
  if (type === 1) arr.push({
    type: "em_close",
    tag: "em",
    nesting: -1
  });
  else if (type === 2) arr.push({
    type: "strong_close",
    tag: "strong",
    nesting: -1
  });
  else if (type === 3) {
    arr.push({
      type: "em_close",
      tag: "em",
      nesting: -1
    });
    arr.push({
      type: "strong_close",
      tag: "strong",
      nesting: -1
    });
  }
}
function createLinkToken(text$1, href, loading) {
  let title = "";
  if (href.includes('"')) {
    const temps = href.split('"');
    href = temps[0].trim();
    title = temps[1].trim();
  }
  return {
    type: "link",
    loading,
    href,
    title,
    text: text$1,
    children: [{
      type: "text",
      content: text$1,
      raw: text$1
    }],
    raw: String(`[${text$1}](${href})`)
  };
}
function appendToLinkToken(link$1, suffix) {
  if (!link$1 || !suffix) return;
  link$1.href = String(link$1.href ?? "") + suffix;
  link$1.text = String(link$1.text ?? "") + suffix;
  link$1.raw = String(`[${link$1.text}](${link$1.href})`);
  if (Array.isArray(link$1.children) && link$1.children.length) {
    const last = link$1.children[link$1.children.length - 1];
    if ((last == null ? void 0 : last.type) === "text") {
      last.content = String(last.content ?? "") + suffix;
      last.raw = String(last.raw ?? "") + suffix;
    } else link$1.children.push(textToken(suffix));
  }
}
function firstIndexOfAny(input, chars) {
  let first = -1;
  for (const ch of chars) {
    const idx = input.indexOf(ch);
    if (idx !== -1 && (first === -1 || idx < first)) first = idx;
  }
  return first;
}
function getHrefFromLinkOpen(token) {
  var _a3, _b;
  const href = (_b = (_a3 = token.attrs) == null ? void 0 : _a3.find((attr) => (attr == null ? void 0 : attr[0]) === "href")) == null ? void 0 : _b[1];
  return typeof href === "string" ? href : "";
}
function setHrefOnLinkOpen(token, href) {
  if (!token) return;
  token.attrs = Array.isArray(token.attrs) ? token.attrs : [];
  const idx = token.attrs.findIndex((attr) => (attr == null ? void 0 : attr[0]) === "href");
  if (idx >= 0) token.attrs[idx][1] = href;
  else token.attrs.push(["href", href]);
}
function collectLinkifyText(tokens, openIndex, closeIndex) {
  let text$1 = "";
  for (let index = openIndex + 1; index < closeIndex; index++) {
    const token = tokens[index];
    if ((token == null ? void 0 : token.type) !== "text" || typeof token.content !== "string") return null;
    text$1 += token.content;
  }
  return text$1 || null;
}
function applyFixLinkTokens(md) {
  md.core.ruler.after("inline", "fix_link_tokens", (state) => {
    const toks = state.tokens ?? [];
    for (let i2 = 0; i2 < toks.length; i2++) {
      const t2 = toks[i2];
      if (t2 && t2.type === "inline" && Array.isArray(t2.children)) try {
        t2.children = fixLinkToken(t2.children);
      } catch (e2) {
        console.error("[applyFixLinkTokens] failed to fix inline children", e2);
      }
    }
  });
}
function fixLinkToken(tokens) {
  var _a3, _b, _c, _d, _e, _f, _g, _h, _i2, _j, _k, _l2, _m, _n2, _o2, _p, _q, _r2, _s, _t2, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa;
  if (tokens.length < 3) return tokens;
  if (tokens.some((token) => token.type === "code_inline")) return tokens;
  for (let i2 = 0; i2 <= tokens.length - 1; i2++) {
    if (i2 < 0) i2 = 0;
    const curToken = tokens[i2];
    if (!curToken) break;
    if (curToken.type === "link_open" && (curToken.markup === "linkify" || curToken.markup === "autolink")) {
      let closeIdx = -1;
      for (let j = i2 + 1; j < tokens.length; j++) if (((_a3 = tokens[j]) == null ? void 0 : _a3.type) === "link_close") {
        closeIdx = j;
        break;
      }
      if (closeIdx !== -1) {
        const linkText = collectLinkifyText(tokens, i2, closeIdx);
        if (curToken.markup === "linkify" && linkText && shouldDemoteFilenameLikeLinkify(linkText)) {
          tokens.splice(i2, closeIdx - i2 + 1, textToken(linkText));
          continue;
        }
        const href = getHrefFromLinkOpen(curToken);
        const hrefStop = firstIndexOfAny(href, LINKIFY_HARD_STOP_CHARS);
        for (let j = i2 + 1; j < closeIdx; j++) {
          const t2 = tokens[j];
          if ((t2 == null ? void 0 : t2.type) !== "text" || typeof t2.content !== "string") continue;
          const stopAt = firstIndexOfAny(t2.content, LINKIFY_HARD_STOP_CHARS);
          if (stopAt === -1) continue;
          const stopChar = t2.content[stopAt];
          const before = t2.content.slice(0, stopAt);
          let tail = t2.content.slice(stopAt);
          for (let k = j + 1; k < closeIdx; k++) {
            const tk = tokens[k];
            if ((tk == null ? void 0 : tk.type) === "text" && typeof tk.content === "string") tail += tk.content;
          }
          t2.content = before;
          t2.raw = before;
          const removeCount = closeIdx - (j + 1);
          if (removeCount > 0) {
            tokens.splice(j + 1, removeCount);
            closeIdx = j + 1;
          }
          let newHref = href;
          if (hrefStop !== -1) newHref = href.slice(0, hrefStop);
          else if (tail) {
            const encodedTail = encodeURI(tail);
            if (encodedTail && href.endsWith(encodedTail)) newHref = href.slice(0, href.length - encodedTail.length);
            else {
              const encodedStop = stopChar ? encodeURI(stopChar) : "";
              const idx = encodedStop ? href.indexOf(encodedStop) : -1;
              if (idx !== -1) newHref = href.slice(0, idx);
            }
          }
          if (newHref !== href) setHrefOnLinkOpen(curToken, newHref);
          if (tail) tokens.splice(closeIdx + 1, 0, textToken(tail));
          break;
        }
      }
    }
    if ((curToken == null ? void 0 : curToken.type) === "em_open" && ((_b = tokens[i2 - 1]) == null ? void 0 : _b.type) === "text" && ((_c = tokens[i2 - 1].content) == null ? void 0 : _c.endsWith("*"))) {
      const beforeText = ((_d = tokens[i2 - 1].content) == null ? void 0 : _d.replace(/(\*+)$/, "")) || "";
      tokens[i2 - 1].content = beforeText;
      curToken.type = "strong_open";
      curToken.tag = "strong";
      curToken.markup = "**";
      for (let j = i2 + 1; j < tokens.length; j++) if (((_e = tokens[j]) == null ? void 0 : _e.type) === "em_close") {
        tokens[j].type = "strong_close";
        tokens[j].tag = "strong";
        tokens[j].markup = "**";
        break;
      }
    } else if ((curToken == null ? void 0 : curToken.type) === "text" && ((_f = curToken.content) == null ? void 0 : _f.endsWith("(")) && ((_g = tokens[i2 + 1]) == null ? void 0 : _g.type) === "link_open") {
      const match2 = curToken.content.match(/\[([^\]]+)\]/);
      if (match2) {
        let beforeText = curToken.content.slice(0, match2.index);
        const emphasisMatch = beforeText.match(/(\*+)$/);
        const replacerTokens = [];
        if (emphasisMatch) {
          beforeText = beforeText.slice(0, emphasisMatch.index);
          if (beforeText) replacerTokens.push(textToken(beforeText));
          const text$1 = match2[1];
          const type = emphasisMatch[1].length;
          pushEmOpen(replacerTokens, type);
          let href = ((_h = tokens[i2 + 2]) == null ? void 0 : _h.content) || "";
          if (((_i2 = tokens[i2 + 4]) == null ? void 0 : _i2.type) === "text" && !((_j = tokens[i2 + 4].content) == null ? void 0 : _j.startsWith(")"))) {
            href += ((_k = tokens[i2 + 4]) == null ? void 0 : _k.content) || "";
            tokens[i2 + 4].content = "";
          }
          replacerTokens.push(createLinkToken(text$1, href, !((_m = (_l2 = tokens[i2 + 4]) == null ? void 0 : _l2.content) == null ? void 0 : _m.startsWith(")"))));
          pushEmClose(replacerTokens, type);
          if (((_n2 = tokens[i2 + 4]) == null ? void 0 : _n2.type) === "text") {
            const afterText = (_o2 = tokens[i2 + 4].content) == null ? void 0 : _o2.replace(/^\)\**/, "");
            if (afterText) replacerTokens.push(textToken(afterText));
            tokens.splice(i2, 5, ...replacerTokens);
          } else tokens.splice(i2, 4, ...replacerTokens);
        } else {
          if (beforeText) replacerTokens.push(textToken(beforeText));
          let text$1 = match2[1];
          const emphasisMatch$1 = text$1.match(/^\*+/);
          if (emphasisMatch$1) {
            const type = emphasisMatch$1[0].length;
            text$1 = text$1.replace(/^\*+/, "").replace(/\*+$/, "");
            let href$1 = ((_p = tokens[i2 + 2]) == null ? void 0 : _p.content) || "";
            if (((_q = tokens[i2 + 4]) == null ? void 0 : _q.type) === "text" && !((_r2 = tokens[i2 + 4].content) == null ? void 0 : _r2.startsWith(")"))) {
              href$1 += ((_s = tokens[i2 + 4]) == null ? void 0 : _s.content) || "";
              tokens[i2 + 4].content = "";
            }
            pushEmOpen(replacerTokens, type);
            replacerTokens.push(createLinkToken(text$1, href$1, !((_u = (_t2 = tokens[i2 + 4]) == null ? void 0 : _t2.content) == null ? void 0 : _u.startsWith(")"))));
            pushEmClose(replacerTokens, type);
            if (((_v = tokens[i2 + 4]) == null ? void 0 : _v.type) === "text") {
              const afterText = (_w = tokens[i2 + 4].content) == null ? void 0 : _w.replace(/^\)/, "");
              if (afterText) replacerTokens.push(textToken(afterText));
              tokens.splice(i2, 5, ...replacerTokens);
            } else tokens.splice(i2, 4, ...replacerTokens);
            if (i2 === 0) i2 = replacerTokens.length - 1;
            else i2 -= replacerTokens.length + 1;
            continue;
          }
          let href = ((_x = tokens[i2 + 2]) == null ? void 0 : _x.content) || "";
          if (((_y = tokens[i2 + 4]) == null ? void 0 : _y.type) === "text" && !((_z = tokens[i2 + 4].content) == null ? void 0 : _z.startsWith(")"))) {
            href += ((_A = tokens[i2 + 4]) == null ? void 0 : _A.content) || "";
            tokens[i2 + 4].content = "";
          }
          replacerTokens.push(createLinkToken(text$1, href, !((_C = (_B = tokens[i2 + 4]) == null ? void 0 : _B.content) == null ? void 0 : _C.startsWith(")"))));
          if (((_D = tokens[i2 + 4]) == null ? void 0 : _D.type) === "text") {
            const afterText = (_E = tokens[i2 + 4].content) == null ? void 0 : _E.replace(/^\)/, "");
            if (afterText) replacerTokens.push(textToken(afterText));
            tokens.splice(i2, 5, ...replacerTokens);
          } else tokens.splice(i2, 4, ...replacerTokens);
        }
        i2 -= replacerTokens.length + 1;
        continue;
      }
    } else if (curToken.type === "link_open" && curToken.markup === "linkify" && ((_F = tokens[i2 - 1]) == null ? void 0 : _F.type) === "text" && ((_G = tokens[i2 - 1].content) == null ? void 0 : _G.endsWith("("))) {
      if (((_H = tokens[i2 - 2]) == null ? void 0 : _H.type) === "link_close") {
        const replacerTokens = [];
        const text$1 = tokens[i2 - 3].content || "";
        let href = ((_J = (_I = curToken.attrs) == null ? void 0 : _I.find((attr) => attr[0] === "href")) == null ? void 0 : _J[1]) || "";
        if (((_K = tokens[i2 + 3]) == null ? void 0 : _K.type) === "text") {
          const m = (((_L = tokens[i2 + 3]) == null ? void 0 : _L.content) ?? "").indexOf(")");
          const loading = m === -1;
          if (m === -1) {
            href += ((_N = (_M = tokens[i2 + 3]) == null ? void 0 : _M.content) == null ? void 0 : _N.slice(0, m)) || "";
            tokens[i2 + 3].content = "";
          }
          replacerTokens.push(createLinkToken(text$1, href, loading));
          const afterText = (_O = tokens[i2 + 3].content) == null ? void 0 : _O.replace(/^\)\**/, "");
          if (afterText) replacerTokens.push(textToken(afterText));
          tokens.splice(i2 - 4, 8, ...replacerTokens);
        } else {
          replacerTokens.push({
            type: "link",
            loading: true,
            href,
            title: "",
            text: text$1,
            children: [{
              type: "text",
              content: href,
              raw: href
            }],
            raw: String(`[${text$1}](${href})`)
          });
          tokens.splice(i2 - 4, 7, ...replacerTokens);
        }
        continue;
      } else if (tokens[i2 - 1].content === "](" && ((_P = tokens[i2 - 3]) == null ? void 0 : _P.type) === "text" && ((_Q = tokens[i2 - 3].content) == null ? void 0 : _Q.endsWith(")"))) if (((_R = tokens[i2 - 2]) == null ? void 0 : _R.type) === "strong_open") {
        const [beforeText, linText] = ((_S = tokens[i2 - 3].content) == null ? void 0 : _S.split("[**")) || [];
        tokens[i2 + 1].content = linText || "";
        tokens[i2 - 3].content = beforeText || "";
        tokens[i2 - 1].content = "";
      } else if (((_T = tokens[i2 - 2]) == null ? void 0 : _T.type) === "em_open") {
        const [beforeText, linText] = ((_U = tokens[i2 - 3].content) == null ? void 0 : _U.split("[*")) || [];
        tokens[i2 + 1].content = linText || "";
        tokens[i2 - 3].content = beforeText || "";
        tokens[i2 - 1].content = "";
      } else {
        const [beforeText, linText] = ((_V = tokens[i2 - 3].content) == null ? void 0 : _V.split("[")) || [];
        tokens[i2 + 1].content = linText || "";
        tokens[i2 - 3].content = beforeText || "";
        tokens[i2 - 1].content = "";
      }
    }
    if (curToken.type === "link_close" && curToken.nesting === -1 && ((_W = tokens[i2 - 2]) == null ? void 0 : _W.type) === "link_open" && ((_X = tokens[i2 + 1]) == null ? void 0 : _X.type) === "text" && ((_Y = tokens[i2 - 1]) == null ? void 0 : _Y.type) === "text") {
      const text$1 = tokens[i2 - 1].content || "";
      const attrs = tokens[i2 - 2].attrs || [];
      const href = ((_Z = attrs.find((a2) => a2[0] === "href")) == null ? void 0 : _Z[1]) || "";
      const title = ((__ = attrs.find((a2) => a2[0] === "title")) == null ? void 0 : __[1]) || "";
      let count = 3;
      let deleteCount = 2;
      const emphasisMatch = (((_$ = tokens[i2 - 3]) == null ? void 0 : _$.content) || "").match(/^(\*+)$/);
      const replacerTokens = [];
      if (emphasisMatch) {
        deleteCount += 1;
        const type = emphasisMatch[1].length;
        pushEmOpen(replacerTokens, type);
      }
      if (curToken.markup !== "linkify" && tokens[i2 + 1].type === "text" && ((_ba = (_aa = tokens[i2 + 1]) == null ? void 0 : _aa.content) == null ? void 0 : _ba.startsWith("]("))) {
        count += 1;
        for (let j = i2 + 1; j < tokens.length; j++) {
          const type = emphasisMatch ? emphasisMatch[1].length : tokens[i2 - 3].markup.length;
          const t2 = tokens[j];
          if (type === 1 && t2.type === "em_close") break;
          else if (type === 2 && t2.type === "strong_close") break;
          else if (type === 3) {
            if (t2.type === "em_close" || t2.type === "strong_close") break;
          }
          count += 1;
        }
      }
      const linkToken = {
        type: "link",
        loading: false,
        href,
        title,
        text: text$1,
        children: [{
          type: "text",
          content: text$1,
          raw: text$1
        }],
        raw: String(`[${text$1}](${href})`)
      };
      replacerTokens.push(linkToken);
      if (emphasisMatch) {
        const type = emphasisMatch[1].length;
        pushEmClose(replacerTokens, type);
      }
      tokens.splice(i2 - deleteCount, count, ...replacerTokens);
      i2 -= replacerTokens.length + 1;
      continue;
    } else if (((_ca = curToken.content) == null ? void 0 : _ca.startsWith("](")) && ((_da = tokens[i2 - 1].markup) == null ? void 0 : _da.includes("*")) && ((_ea = tokens[i2 - 4]) == null ? void 0 : _ea.type) === "text" && ((_fa = tokens[i2 - 4].content) == null ? void 0 : _fa.endsWith("["))) {
      const type = tokens[i2 - 1].markup.length;
      const replacerTokens = [];
      const beforeText = tokens[i2 - 4].content.slice(0, tokens[i2 - 4].content.length - type);
      if (beforeText) replacerTokens.push(textToken(beforeText));
      pushEmOpen(replacerTokens, type);
      const text$1 = tokens[i2 - 2].content || "";
      let href = curToken.content.slice(2);
      let loading = true;
      if (((_ga = tokens[i2 + 1]) == null ? void 0 : _ga.type) === "text") {
        const m = (((_ha = tokens[i2 + 1]) == null ? void 0 : _ha.content) ?? "").indexOf(")");
        loading = m === -1;
        if (m === -1) {
          href += ((_ja = (_ia = tokens[i2 + 1]) == null ? void 0 : _ia.content) == null ? void 0 : _ja.slice(0, m)) || "";
          tokens[i2 + 1].content = "";
        }
      }
      replacerTokens.push(createLinkToken(text$1, href, loading));
      pushEmClose(replacerTokens, type);
      if (((_ka = tokens[i2 + 1]) == null ? void 0 : _ka.type) === "text") {
        const afterText = (_la = tokens[i2 + 1].content) == null ? void 0 : _la.replace(/^\)\**/, "");
        if (afterText) replacerTokens.push(textToken(afterText));
        tokens.splice(i2 - 4, 8, ...replacerTokens);
      } else if (((_ma = tokens[i2 + 1]) == null ? void 0 : _ma.type) === "link_open") tokens.splice(i2 - 4, 10, ...replacerTokens);
      else tokens.splice(i2 - 4, 7, ...replacerTokens);
      i2 -= replacerTokens.length + 1;
      continue;
    } else if (((_na = curToken.content) == null ? void 0 : _na.startsWith("](")) && tokens[i2 - 1].type === "strong_close" && ((_oa = tokens[i2 - 4]) == null ? void 0 : _oa.type) === "text" && ((_qa = (_pa = tokens[i2 - 4]) == null ? void 0 : _pa.content) == null ? void 0 : _qa.includes("**["))) {
      const replacerTokens = [];
      const beforeText = tokens[i2 - 4].content.split("**[")[0];
      if (beforeText) replacerTokens.push(textToken(beforeText));
      pushEmOpen(replacerTokens, 2);
      const text$1 = tokens[i2 - 2].content || "";
      let href = curToken.content.slice(2);
      let loading = true;
      if (((_ra = tokens[i2 + 1]) == null ? void 0 : _ra.type) === "text") {
        const m = (((_sa = tokens[i2 + 1]) == null ? void 0 : _sa.content) ?? "").indexOf(")");
        loading = m === -1;
        if (m === -1) {
          href += ((_ua = (_ta = tokens[i2 + 1]) == null ? void 0 : _ta.content) == null ? void 0 : _ua.slice(0, m)) || "";
          tokens[i2 + 1].content = "";
        }
      }
      replacerTokens.push(createLinkToken(text$1, href, loading));
      pushEmClose(replacerTokens, 2);
      if (((_va = tokens[i2 + 1]) == null ? void 0 : _va.type) === "text") {
        const afterText = (_wa = tokens[i2 + 1].content) == null ? void 0 : _wa.replace(/^\)\**/, "");
        if (afterText) replacerTokens.push(textToken(afterText));
        tokens.splice(i2 - 4, 8, ...replacerTokens);
      } else if (((_xa = tokens[i2 + 1]) == null ? void 0 : _xa.type) === "link_open") tokens.splice(i2 - 4, 10, ...replacerTokens);
      else tokens.splice(i2 - 4, 7, ...replacerTokens);
      i2 -= replacerTokens.length + 1;
      continue;
    } else if (curToken.type === "strong_close" && ((_ya = tokens[i2 + 1]) == null ? void 0 : _ya.type) === "text" && ((_za = tokens[i2 + 1].content) == null ? void 0 : _za.includes("](")) && tokens[i2 - 1].type === "text" && /\[.*$/.test(tokens[i2 - 1].content || "")) {
      const replacerTokens = [];
      const [beforeText, afterText] = ((_Aa = tokens[i2 - 1].content) == null ? void 0 : _Aa.split("[")) || ["", ""];
      if (beforeText) replacerTokens.push(textToken(beforeText));
      pushEmOpen(replacerTokens, 2);
      let [text$1, href] = tokens[i2 + 1].content.split("](");
      text$1 = afterText + text$1;
      let deleteCount = 4;
      if (((_Ba = tokens[i2 + 2]) == null ? void 0 : _Ba.type) === "link_open") {
        const _href = (_Da = (_Ca = tokens[i2 + 2].attrs) == null ? void 0 : _Ca.find((a2) => a2[0] === "href")) == null ? void 0 : _Da[1];
        if (((_Ea = tokens[i2 + 5]) == null ? void 0 : _Ea.type) === "text" && tokens[i2 + 5].content === ".") {
          href = (_href || href) + tokens[i2 + 5].content;
          tokens[i2 + 5].content = "";
        } else href = _href || href;
        deleteCount += 3;
      }
      let loading = true;
      if (curToken.nesting === -1) text$1 = text$1.replace(/\*+$/, "");
      if (((_Fa = tokens[i2 + 2]) == null ? void 0 : _Fa.type) === "text") {
        const m = (((_Ga = tokens[i2 + 2]) == null ? void 0 : _Ga.content) ?? "").indexOf(")");
        loading = m === -1;
        if (m === -1) {
          href += ((_Ia = (_Ha = tokens[i2 + 2]) == null ? void 0 : _Ha.content) == null ? void 0 : _Ia.slice(0, m)) || "";
          tokens[i2 + 2].content = "";
        }
      }
      replacerTokens.push(createLinkToken(text$1, href, loading));
      pushEmClose(replacerTokens, 2);
      tokens.splice(i2 - 2, deleteCount, ...replacerTokens);
    }
    if (curToken.type === "text" && /\*+\[[^\]]*$/.test(curToken.content || "") && ((_Ja = tokens[i2 + 1]) == null ? void 0 : _Ja.type) === "strong_open" && ((_Ka = tokens[i2 + 2]) == null ? void 0 : _Ka.type) === "text" && tokens[i2 + 2].content === "](" && ((_La = tokens[i2 + 3]) == null ? void 0 : _La.type) === "link_open" && ((_Ma = tokens[i2 + 5]) == null ? void 0 : _Ma.type) === "link_close" && ((_Na = tokens[i2 + 6]) == null ? void 0 : _Na.type) === "text" && tokens[i2 + 6].content === ")" && ((_Oa = tokens[i2 + 7]) == null ? void 0 : _Oa.type) === "strong_close") {
      const startMatch = (curToken.content || "").match(/^(\*+)\[(.*)$/);
      if (startMatch) {
        const finalLabel = (startMatch[2] || "") + startMatch[1];
        let href = ((_Ra = (_Qa = (_Pa = tokens[i2 + 3]) == null ? void 0 : _Pa.attrs) == null ? void 0 : _Qa.find((a2) => a2[0] === "href")) == null ? void 0 : _Ra[1]) || "";
        if (!href && ((_Sa = tokens[i2 + 4]) == null ? void 0 : _Sa.type) === "text") href = tokens[i2 + 4].content || "";
        const out = [];
        pushEmOpen(out, 2);
        out.push(createLinkToken(finalLabel, href, false));
        pushEmClose(out, 2);
        tokens.splice(i2, 9, ...out);
        i2 -= out.length - 1;
        continue;
      }
    }
  }
  for (let i2 = 0; i2 < tokens.length - 1; i2++) {
    const t2 = tokens[i2];
    const next = tokens[i2 + 1];
    if ((t2 == null ? void 0 : t2.type) !== "link" || (next == null ? void 0 : next.type) !== "text" || typeof next.content !== "string") continue;
    if (!next.content.startsWith("!")) continue;
    const href = String(t2.href ?? "");
    if (String(t2.text ?? "") !== href) continue;
    if (!href.endsWith("=") && !href.endsWith("#")) continue;
    appendToLinkToken(t2, "!");
    const rest = next.content.slice(1);
    if (rest) {
      next.content = rest;
      next.raw = rest;
    } else tokens.splice(i2 + 1, 1);
  }
  return tokens;
}
function applyFixListItem(md) {
  md.core.ruler.after("inline", "fix_list_item_tokens", (state) => {
    const toks = state.tokens ?? [];
    for (let i2 = 0; i2 < toks.length; i2++) {
      const t2 = toks[i2];
      if (t2 && t2.type === "inline" && Array.isArray(t2.children)) try {
        t2.children = fixListItem(t2.children);
      } catch (e2) {
        console.error("[applyFixListItem] failed to fix inline children", e2);
      }
    }
  });
}
function fixListItem(tokens) {
  var _a3;
  const last = tokens[tokens.length - 1];
  const lastContent = String((last == null ? void 0 : last.content) ?? "");
  if ((last == null ? void 0 : last.type) === "text" && /^\s*\d+\.\s*$/.test(lastContent) && ((_a3 = tokens[tokens.length - 2]) == null ? void 0 : _a3.tag) === "br") tokens.splice(tokens.length - 1, 1);
  return tokens;
}
function applyFixStrongTokens(md) {
  md.core.ruler.after("inline", "fix_strong_tokens", (state) => {
    const toks = state.tokens ?? [];
    for (let i2 = 0; i2 < toks.length; i2++) {
      const t2 = toks[i2];
      if (t2 && t2.type === "inline" && Array.isArray(t2.children)) try {
        t2.children = fixStrongTokens(t2.children);
      } catch (e2) {
        console.error("[applyFixStrongTokens] failed to fix inline children", e2);
      }
    }
  });
}
function fixStrongTokens(tokens) {
  var _a3, _b, _c, _d, _e, _f, _g, _h, _i2;
  let strongIndex = 0;
  const cleansStrong = /* @__PURE__ */ new Set();
  const cleansEm = /* @__PURE__ */ new Set();
  let emIndex = 0;
  for (let i$1 = 0; i$1 < tokens.length; i$1++) {
    const t2 = tokens[i$1];
    const type = t2.type;
    if (type === "strong_open") {
      strongIndex++;
      const markup = String(t2.markup ?? "");
      let j = i$1 - 1;
      while (j >= 0 && tokens[j].type === "text" && tokens[j].content === "") j--;
      const preToken = tokens[j];
      let k = i$1 + 1;
      while (k < tokens.length && tokens[k].type === "text" && tokens[k].content === "") k++;
      const postToken = tokens[k];
      if (markup === "__" && (((_a3 = preToken == null ? void 0 : preToken.content) == null ? void 0 : _a3.endsWith("_")) || ((_b = postToken == null ? void 0 : postToken.content) == null ? void 0 : _b.startsWith("_")) || ((_c = postToken == null ? void 0 : postToken.markup) == null ? void 0 : _c.includes("_")))) {
        t2.type = "text";
        t2.tag = "";
        t2.content = markup;
        t2.raw = markup;
        t2.markup = "";
        t2.attrs = null;
        t2.map = null;
        t2.info = "";
        t2.meta = null;
        cleansStrong.add(strongIndex);
      }
    } else if (type === "strong_close") {
      if (cleansStrong.has(strongIndex) && t2.markup === "__") {
        t2.type = "text";
        t2.content = t2.markup;
        t2.raw = String(t2.markup ?? "");
        t2.tag = "";
        t2.markup = "";
        t2.attrs = null;
        t2.map = null;
        t2.info = "";
        t2.meta = null;
      }
      strongIndex--;
      if (strongIndex < 0) strongIndex = 0;
    } else if (type === "em_open") {
      emIndex++;
      const markup = String(t2.markup ?? "");
      let j = i$1 - 1;
      while (j >= 0 && tokens[j].type === "text" && tokens[j].content === "") j--;
      const preToken = tokens[j];
      let k = i$1 + 1;
      while (k < tokens.length && tokens[k].type === "text" && tokens[k].content === "") k++;
      const postToken = tokens[k];
      if (markup === "_" && (((_d = preToken == null ? void 0 : preToken.content) == null ? void 0 : _d.endsWith("_")) || ((_e = postToken == null ? void 0 : postToken.content) == null ? void 0 : _e.startsWith("_")) || ((_f = postToken == null ? void 0 : postToken.markup) == null ? void 0 : _f.includes("_")))) {
        t2.type = "text";
        t2.tag = "";
        t2.content = markup;
        t2.raw = markup;
        t2.markup = "";
        t2.attrs = null;
        t2.map = null;
        t2.info = "";
        t2.meta = null;
        cleansEm.add(emIndex);
      }
    } else if (type === "em_close") {
      if (cleansEm.has(emIndex) && t2.markup === "_") {
        t2.type = "text";
        t2.content = t2.markup;
        t2.raw = String(t2.markup ?? "");
        t2.tag = "";
        t2.markup = "";
        t2.attrs = null;
        t2.map = null;
        t2.info = "";
        t2.meta = null;
      }
      emIndex--;
      if (emIndex < 0) emIndex = 0;
    }
  }
  if (tokens.length < 5) return tokens;
  const i2 = tokens.length - 4;
  const token = tokens[i2];
  let fixedTokens = [...tokens];
  const nextToken = tokens[i2 + 1];
  const tokenContent = String(token.content ?? "");
  if (token.type === "link_open" && ((_g = tokens[i2 - 1]) == null ? void 0 : _g.type) === "em_open" && ((_h = tokens[i2 - 2]) == null ? void 0 : _h.type) === "text" && ((_i2 = tokens[i2 - 2].content) == null ? void 0 : _i2.endsWith("*"))) {
    const textContent = String(tokens[i2 - 2].content ?? "").slice(0, -1);
    const replaceTokens = [
      {
        type: "strong_open",
        tag: "strong",
        attrs: null,
        map: null,
        children: null,
        content: "",
        markup: "**",
        info: "",
        meta: null,
        raw: ""
      },
      tokens[i2],
      tokens[i2 + 1],
      tokens[i2 + 2],
      {
        type: "strong_close",
        tag: "strong",
        attrs: null,
        map: null,
        children: null,
        content: "",
        markup: "**",
        info: "",
        meta: null,
        raw: ""
      }
    ];
    if (textContent) replaceTokens.unshift({
      type: "text",
      content: textContent,
      raw: textContent
    });
    fixedTokens.splice(i2 - 2, 6, ...replaceTokens);
  } else if (token.type === "text" && tokenContent.endsWith("*") && nextToken.type === "em_open") {
    const _nextToken = tokens[i2 + 2];
    const count = (_nextToken == null ? void 0 : _nextToken.type) === "text" ? 4 : 3;
    const insert = [
      {
        type: "strong_open",
        tag: "strong",
        attrs: null,
        map: null,
        children: null,
        content: "",
        markup: "**",
        info: "",
        meta: null,
        raw: ""
      },
      {
        type: "text",
        content: (_nextToken == null ? void 0 : _nextToken.type) === "text" ? String(_nextToken.content ?? "") : "",
        raw: (_nextToken == null ? void 0 : _nextToken.type) === "text" ? String(_nextToken.content ?? "") : ""
      },
      {
        type: "strong_close",
        tag: "strong",
        attrs: null,
        map: null,
        children: null,
        content: "",
        markup: "**",
        info: "",
        meta: null,
        raw: ""
      }
    ];
    const beforeText = tokenContent.slice(0, -1);
    if (beforeText) insert.unshift({
      type: "text",
      content: beforeText,
      raw: beforeText
    });
    fixedTokens.splice(i2, count, ...insert);
  }
  fixedTokens = mergeBrokenStrongAroundMathInline(fixedTokens);
  return fixedTokens;
}
function mergeBrokenStrongAroundMathInline(tokens) {
  if (tokens.length < 7) return tokens;
  const out = [];
  for (let i2 = 0; i2 < tokens.length; i2++) {
    const t0 = tokens[i2];
    const t1 = tokens[i2 + 1];
    const t2 = tokens[i2 + 2];
    const t3 = tokens[i2 + 3];
    const t4 = tokens[i2 + 4];
    const t5 = tokens[i2 + 5];
    const t6 = tokens[i2 + 6];
    if ((t0 == null ? void 0 : t0.type) === "strong_open" && (t1 == null ? void 0 : t1.type) === "text" && (t2 == null ? void 0 : t2.type) === "strong_close" && (t3 == null ? void 0 : t3.type) === "strong_open" && (t4 == null ? void 0 : t4.type) === "math_inline" && (t5 == null ? void 0 : t5.type) === "strong_close" && (t6 == null ? void 0 : t6.type) === "text") {
      const textContent = String(t6.content ?? "");
      const closeIdx = textContent.indexOf("**");
      if (closeIdx !== -1) {
        const beforeClose = textContent.slice(0, closeIdx);
        const afterClose = textContent.slice(closeIdx + 2);
        out.push(t0);
        out.push(t1);
        out.push(t4);
        if (beforeClose) out.push({
          ...t6,
          type: "text",
          content: beforeClose,
          raw: beforeClose
        });
        out.push(t5);
        if (afterClose) out.push({
          ...t6,
          type: "text",
          content: afterClose,
          raw: afterClose
        });
        i2 += 6;
        continue;
      }
    }
    if ((t0 == null ? void 0 : t0.type) === "strong_open" && (t1 == null ? void 0 : t1.type) === "text" && (t2 == null ? void 0 : t2.type) === "strong_close" && (t3 == null ? void 0 : t3.type) === "strong_open" && (t4 == null ? void 0 : t4.type) === "math_inline" && (t5 == null ? void 0 : t5.type) === "strong_close") {
      const close = findTrailingTextStrongClose(tokens, i2 + 6);
      if (close) {
        out.push(t0);
        out.push(t1);
        out.push(t4);
        for (let j = i2 + 6; j < close.index; j++) out.push(tokens[j]);
        if (close.beforeClose) out.push({
          ...tokens[close.index],
          type: "text",
          content: close.beforeClose,
          raw: close.beforeClose
        });
        out.push(t5);
        if (close.afterClose) out.push({
          ...tokens[close.index],
          type: "text",
          content: close.afterClose,
          raw: close.afterClose
        });
        i2 = close.index;
        continue;
      }
    }
    out.push(t0);
  }
  return out;
}
function findTrailingTextStrongClose(tokens, startIndex) {
  for (let i2 = startIndex; i2 < tokens.length; i2++) {
    const token = tokens[i2];
    if ((token == null ? void 0 : token.type) === "strong_open") return null;
    if ((token == null ? void 0 : token.type) !== "text") continue;
    const content = String(token.content ?? "");
    const closeIdx = content.indexOf("**");
    if (closeIdx === -1) continue;
    return {
      index: i2,
      beforeClose: content.slice(0, closeIdx),
      afterClose: content.slice(closeIdx + 2)
    };
  }
  return null;
}
function applyFixTableTokens(md) {
  md.core.ruler.after("block", "fix_table_tokens", (state) => {
    var _a3;
    const s2 = state;
    try {
      const fixed = fixTableTokens(s2.tokens ?? [], !!((_a3 = s2.env) == null ? void 0 : _a3.__markstreamFinal), s2.src ?? "");
      if (Array.isArray(fixed)) s2.tokens = fixed;
    } catch (e2) {
      console.error("[applyFixTableTokens] failed to fix table tokens", e2);
    }
  });
}
function createStart() {
  return [
    {
      type: "table_open",
      tag: "table",
      attrs: null,
      map: null,
      children: null,
      content: "",
      markup: "",
      info: "",
      level: 0,
      loading: true,
      meta: null
    },
    {
      type: "thead_open",
      tag: "thead",
      attrs: null,
      block: true,
      level: 1,
      children: null
    },
    {
      type: "tr_open",
      tag: "tr",
      attrs: null,
      block: true,
      level: 2,
      children: null
    }
  ];
}
function createEnd() {
  return [
    {
      type: "tr_close",
      tag: "tr",
      attrs: null,
      block: true,
      level: 2,
      children: null
    },
    {
      type: "thead_close",
      tag: "thead",
      attrs: null,
      block: true,
      level: 1,
      children: null
    },
    {
      type: "table_close",
      tag: "table",
      attrs: null,
      map: null,
      children: null,
      content: "",
      markup: "",
      info: "",
      level: 0,
      meta: null
    }
  ];
}
function createTh(text$1) {
  return [
    {
      type: "th_open",
      tag: "th",
      attrs: null,
      block: true,
      level: 3,
      children: null
    },
    {
      type: "inline",
      tag: "",
      children: null,
      content: text$1,
      level: 4,
      attrs: null,
      block: true
    },
    {
      type: "th_close",
      tag: "th",
      attrs: null,
      block: true,
      level: 3,
      children: null
    }
  ];
}
function getPipeRowCells(line, requireTrailingPipe) {
  if (!line.startsWith("|") || line.includes("\n")) return null;
  if (requireTrailingPipe && !line.endsWith("|")) return null;
  const cells = line.slice(1).split("|");
  if (cells.at(-1) === "") cells.pop();
  return cells.length > 0 && cells.every((cell) => cell.trim().length > 0) ? cells : null;
}
function hasTrailingPipeHeaderRow(line) {
  return getPipeRowCells(line, true) !== null;
}
function isSeparatorCell(cell) {
  return /^:?-+:?$/.test(cell.trim());
}
function isTableSeparatorRow(line) {
  if (!line.startsWith("|")) return false;
  const cells = line.slice(1).split("|");
  if (cells.at(-1) === "") cells.pop();
  return cells.length > 0 && cells.every(isSeparatorCell);
}
function isPartialSeparatorTail(cell) {
  return /^(?:[:：]-*|:?-+:?)?$/.test(cell.trim());
}
function isTableSeparatorRowWithPartialTail(line) {
  if (line === "") return true;
  if (!line.startsWith("|")) return false;
  const cells = line.slice(1).split("|");
  const tail = cells.at(-1) ?? "";
  return cells.slice(0, -1).every(isSeparatorCell) && isPartialSeparatorTail(tail);
}
function isTruncatedSeparatorRow(line) {
  return line === "|" || line === "|:";
}
function hasTrailingPipeHeaderRowWithoutColon(line) {
  const cells = getPipeRowCells(line, true);
  return cells !== null && cells.every((cell) => !cell.includes(":"));
}
function fixTableTokens(tokens, final = false, source = "") {
  const fixedTokens = [...tokens];
  if (tokens.length < 3) return fixedTokens;
  const i2 = tokens.length - 2;
  const token = tokens[i2];
  if (token.type === "inline") {
    const tcontent = String(token.content ?? "");
    const headerContent = tcontent.split("\n")[0] ?? "";
    const [headerLine = "", separatorLine = "", ...rest] = tcontent.split("\n");
    const hasTrailingNewlineSeparatorStart = !final && !tcontent.includes("\n") && /\r?\n$/.test(source) && hasTrailingPipeHeaderRow(tcontent);
    if (!final && (tcontent.includes("\n") && rest.length === 0 && hasTrailingPipeHeaderRow(headerLine) && isTableSeparatorRowWithPartialTail(separatorLine) || hasTrailingNewlineSeparatorStart)) {
      const body = headerContent.slice(1, -1).split("|").map((i$1) => i$1.trim()).flatMap((i$1) => createTh(i$1));
      const insert = [
        ...createStart(),
        ...body,
        ...createEnd()
      ];
      fixedTokens.splice(i2 - 1, 3, ...insert);
    } else if (tcontent.includes("\n") && rest.length === 0 && hasTrailingPipeHeaderRow(headerLine) && isTableSeparatorRow(separatorLine)) {
      const body = headerContent.slice(1, -1).split("|").map((i$1) => i$1.trim()).flatMap((i$1) => createTh(i$1));
      const insert = [
        ...createStart(),
        ...body,
        ...createEnd()
      ];
      fixedTokens.splice(i2 - 1, 3, ...insert);
    } else if (tcontent.includes("\n") && rest.length === 0 && hasTrailingPipeHeaderRowWithoutColon(headerLine) && isTruncatedSeparatorRow(separatorLine)) {
      token.content = tcontent.slice(0, -2);
      token.children.splice(2, 1);
    }
  }
  return fixedTokens;
}
function findMatchingClose(src, startIdx, open, close) {
  const len = src.length;
  if (open === "$$" && close === "$$") {
    let i$1 = startIdx;
    while (i$1 < len - 1) {
      if (src[i$1] === "$" && src[i$1 + 1] === "$") {
        let k = i$1 - 1;
        let backslashes = 0;
        while (k >= 0 && src[k] === "\\") {
          backslashes++;
          k--;
        }
        if (backslashes % 2 === 0) return i$1;
      }
      i$1++;
    }
    return -1;
  }
  const openChar = open[open.length - 1];
  const closeSeq = close;
  let depth = 0;
  let i2 = startIdx;
  while (i2 < len) {
    if (src.slice(i2, i2 + closeSeq.length) === closeSeq) {
      let k = i2 - 1;
      let backslashes = 0;
      while (k >= 0 && src[k] === "\\") {
        backslashes++;
        k--;
      }
      if (backslashes % 2 === 0) {
        if (depth === 0) return i2;
        depth--;
        i2 += closeSeq.length;
        continue;
      }
    }
    const ch = src[i2];
    if (ch === "\\") {
      i2 += 2;
      continue;
    }
    if (ch === openChar) depth++;
    else if (ch === closeSeq[closeSeq.length - 1]) {
      if (depth > 0) depth--;
    }
    i2++;
  }
  return -1;
}
var findMatchingClose_default = findMatchingClose;
var TEX_BRACE_COMMANDS = [
  "boldsymbol",
  "mathbb",
  "mathcal",
  "mathfrak",
  "mathrm",
  "mathit",
  "mathsf",
  "vec",
  "hat",
  "bar",
  "tilde",
  "overline",
  "underline",
  "mathscr",
  "mathnormal",
  "operatorname",
  "mathbf*"
];
var ESCAPED_TEX_BRACE_COMMANDS = TEX_BRACE_COMMANDS.map((c) => c.replace(/[.*+?^${}()|[\\]"\]/g, "\\$&")).join("|");
var TEX_CMD_RE = /\\[a-z]+/i;
var PREFIX_CLASS = "(?:\\\\|\\u0008)";
var TEX_CMD_WITH_BRACES_RE = new RegExp(String.raw`${PREFIX_CLASS}(?:${ESCAPED_TEX_BRACE_COMMANDS})\s*\{[^}]+\}`, "i");
var TEX_BRACE_CMD_START_RE = new RegExp(String.raw`(?:${PREFIX_CLASS})?(?:${ESCAPED_TEX_BRACE_COMMANDS})\s*\{`, "i");
var TEX_SPECIFIC_RE = /\\(?:text|frac|left|right|times)/;
var OPS_RE = /(?:^|[^+])\+(?!\+)|[=\-*/^<>]|\\times|\\pm|\\cdot|\\le|\\ge|\\neq/;
var HYPHENATED_MULTIWORD_RE = /\b[A-Z]{2,}-[A-Z]{2,}\b/i;
var FUNC_CALL_RE = /[A-Z]+\s*\([^)]+\)/i;
var PAREN_VARIABLE_TUPLE_RE = /^\(\s*[a-z](?:\s*,\s*[a-z])+\s*\)$/i;
var WORDS_RE = /\b(?:sin|cos|tan|log|ln|exp|sqrt|frac|sum|lim|int|prod)\b/;
var DATE_TIME_RE = /\b\d{4}\/\d{1,2}\/\d{1,2}(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?\b/;
var CONTROL_TEX_REPLACEMENTS = {
  [String.fromCharCode(8)]: "\\b",
  [String.fromCharCode(11)]: "\\v",
  [String.fromCharCode(12)]: "\\f"
};
function normalizeMathControlChars(value) {
  let result = "";
  for (const ch of value) result += CONTROL_TEX_REPLACEMENTS[ch] ?? ch;
  return result;
}
function isMathLike(s2) {
  if (!s2) return false;
  const norm = normalizeMathControlChars(s2);
  const stripped = norm.trim();
  if (DATE_TIME_RE.test(stripped)) return false;
  if (stripped.includes("**")) return false;
  if (stripped.length > 2e3) return true;
  const texCmd = TEX_CMD_RE.test(norm);
  const texCmdWithBraces = TEX_CMD_WITH_BRACES_RE.test(norm);
  const texBraceStart = TEX_BRACE_CMD_START_RE.test(norm);
  const texSpecific = TEX_SPECIFIC_RE.test(norm);
  const superSub = /(?:^|[^\w\\])(?:[A-Z]|\\[A-Z]+)_(?:\{[^}]+\}|[A-Z0-9\\])/i.test(norm) || /(?:^|[^\w\\])(?:[A-Z]|\\[A-Z]+)\^(?:\{[^}]+\}|[A-Z0-9\\])/i.test(norm);
  const ops = OPS_RE.test(norm) && !HYPHENATED_MULTIWORD_RE.test(norm);
  const funcCall = FUNC_CALL_RE.test(norm);
  const variableTuple = PAREN_VARIABLE_TUPLE_RE.test(stripped);
  const words = WORDS_RE.test(norm);
  const pureWord = /^\([a-z]\)$/i.test(stripped) || /^(?:[a-z]|pi)$/i.test(stripped);
  const chemicalLike = /^(?:[A-Z][a-z]?(?:_\{?\d+\}?|\^\{?\d+\}?)?)+$/.test(stripped);
  return texCmd || texCmdWithBraces || texBraceStart || texSpecific || superSub || ops || funcCall || variableTuple || words || pureWord || chemicalLike;
}
var KATEX_COMMANDS = [
  "ldots",
  "cdots",
  "quad",
  "in",
  "displaystyle",
  "int_",
  "lim",
  "lim_",
  "ce",
  "pu",
  "end",
  "infty",
  "perp",
  "mid",
  "operatorname",
  "to",
  "rightarrow",
  "leftarrow",
  "math",
  "mathrm",
  "mathit",
  "mathbb",
  "mathcal",
  "mathfrak",
  "implies",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "lambda",
  "sum",
  "sum_",
  "prod",
  "sqrt",
  "fbox",
  "boxed",
  "color",
  "rule",
  "edef",
  "fcolorbox",
  "hline",
  "hdashline",
  "cdot",
  "times",
  "pm",
  "le",
  "ge",
  "neq",
  "sin",
  "cos",
  "tan",
  "log",
  "ln",
  "exp",
  "frac",
  "text",
  "left",
  "right"
];
var ANY_COMMANDS = [
  "cdot",
  "mathbf{",
  "partial",
  "mu_{"
];
var ESCAPED_KATEX_COMMANDS = KATEX_COMMANDS.slice().sort((a2, b) => b.length - a2.length).map((c) => c.replace(/[.*+?^${}()|[\\]\\\]/g, "\\$&")).join("|");
var CONTROL_CHARS_CLASS = "[	\r\b\f\v]";
var ESCAPED_MKATWX_COMMANDS = new RegExp(`([^\\\\])(${ANY_COMMANDS.map((c) => c).join("|")})+`, "g");
var SPAN_CURLY_RE = /span\{([^}]+)\}/;
var OPERATORNAME_SPAN_RE = /\\operatorname\{span\}\{((?:[^{}]|\{[^}]*\})+)\}/;
var SINGLE_BACKSLASH_NEWLINE_RE = /(^|[^\\])\\\r?\n/g;
var ENDING_SINGLE_BACKSLASH_RE = /(^|[^\\])\\$/g;
var DEFAULT_MATH_RE = new RegExp(`(${CONTROL_CHARS_CLASS})|(${ESCAPED_KATEX_COMMANDS})\\b`, "g");
var MATH_RE_CACHE = /* @__PURE__ */ new Map();
var BRACE_CMD_RE_CACHE = /* @__PURE__ */ new Map();
function getMathRegex(commands) {
  if (!commands) return DEFAULT_MATH_RE;
  const arr = [...commands];
  arr.sort((a2, b) => b.length - a2.length);
  const key = arr.join("");
  const cached = MATH_RE_CACHE.get(key);
  if (cached) return cached;
  const commandPattern = `(?:${arr.map((c) => c.replace(/[.*+?^${}()|[\\]\\"\]/g, "\\$&")).join("|")})`;
  const re = new RegExp(`(${CONTROL_CHARS_CLASS})|(${commandPattern})\\b`, "g");
  MATH_RE_CACHE.set(key, re);
  return re;
}
function getBraceCmdRegex(useDefault, commands) {
  const arr = useDefault ? [] : [...commands ?? []];
  if (!useDefault) arr.sort((a2, b) => b.length - a2.length);
  const key = useDefault ? "__default__" : arr.join("");
  const cached = BRACE_CMD_RE_CACHE.get(key);
  if (cached) return cached;
  const braceEscaped = useDefault ? [ESCAPED_TEX_BRACE_COMMANDS, ESCAPED_KATEX_COMMANDS].filter(Boolean).join("|") : [arr.map((c) => c.replace(/[.*+?^${}()|[\\]\\\]/g, "\\$&")).join("|"), ESCAPED_TEX_BRACE_COMMANDS].filter(Boolean).join("|");
  const re = new RegExp(`(^|[^\\\\\\w])(${braceEscaped})\\s*\\{`, "g");
  BRACE_CMD_RE_CACHE.set(key, re);
  return re;
}
var CONTROL_MAP = {
  "	": "t",
  "\r": "r",
  "\b": "b",
  "\f": "f",
  "\v": "v"
};
function countUnescapedStrong(s2) {
  const re = /(^|[^\\])(__|\*\*)/g;
  let c = 0;
  while (re.exec(s2) !== null) c++;
  return c;
}
function findLastUnescapedStrongMarker(s2) {
  var _a3;
  const re = /(^|[^\\])(__|\*\*)/g;
  let m;
  let last = null;
  while ((m = re.exec(s2)) !== null) last = {
    marker: m[2],
    index: m.index + (((_a3 = m[1]) == null ? void 0 : _a3.length) ?? 0)
  };
  return last;
}
function normalizeStandaloneBackslashT(s2, opts) {
  const commands = (opts == null ? void 0 : opts.commands) ?? KATEX_COMMANDS;
  const escapeExclamation = (opts == null ? void 0 : opts.escapeExclamation) ?? true;
  const useDefault = (opts == null ? void 0 : opts.commands) == null;
  const re = getMathRegex(useDefault ? void 0 : commands);
  let out = s2.replace(re, (m, control, cmd, offset3, str) => {
    if (control !== void 0 && CONTROL_MAP[control] !== void 0) return `\\${CONTROL_MAP[control]}`;
    if (cmd && commands.includes(cmd)) {
      const prev = str && typeof offset3 === "number" ? str[offset3 - 1] : void 0;
      if (prev === "\\" || prev && /\w/.test(prev)) return m;
      return `\\${cmd}`;
    }
    return m;
  });
  if (escapeExclamation) out = out.replace(/(^|[^\\])!/g, "$1\\!");
  let result = out;
  const braceCmdRe = getBraceCmdRegex(useDefault, useDefault ? void 0 : commands);
  result = result.replace(braceCmdRe, (_m, p1, p2) => `${p1}\\${p2}{`);
  result = result.replace(SPAN_CURLY_RE, "span\\{$1\\}").replace(OPERATORNAME_SPAN_RE, "\\operatorname{span}\\{$1\\}");
  result = result.replace(SINGLE_BACKSLASH_NEWLINE_RE, "$1\\\\\n");
  result = result.replace(ENDING_SINGLE_BACKSLASH_RE, "$1\\\\");
  result = result.replace(ESCAPED_MKATWX_COMMANDS, "$1\\$2");
  return result;
}
function isPlainBracketMathLike(content) {
  const stripped = content.trim();
  if (!isMathLike(stripped)) return false;
  if (/"[^"\n]{1,80}"\s*:\s*/.test(stripped)) return false;
  if (!(/\\[a-z]+/i.test(stripped) || /[=+*/^<>]|\\times|\\pm|\\cdot|\\le|\\ge|\\neq/.test(stripped) || /[_^]/.test(stripped)) && /\s-\s/.test(stripped)) return false;
  return true;
}
function buildCodeSpanRanges(src) {
  const ranges = [];
  let i2 = 0;
  while (i2 < src.length) {
    if (src[i2] !== "`") {
      i2++;
      continue;
    }
    const openStart = i2;
    let openLen = 1;
    while (openStart + openLen < src.length && src[openStart + openLen] === "`") openLen++;
    let j = openStart + openLen;
    let closeStart = -1;
    while (j < src.length) {
      if (src[j] !== "`") {
        j++;
        continue;
      }
      let runLen = 1;
      while (j + runLen < src.length && src[j + runLen] === "`") runLen++;
      if (runLen === openLen) {
        closeStart = j;
        break;
      }
      j += runLen;
    }
    if (closeStart !== -1) {
      ranges.push([openStart, closeStart + openLen]);
      i2 = closeStart + openLen;
      continue;
    }
    i2 = openStart + openLen;
  }
  return ranges;
}
function findRangeAt(ranges, index) {
  for (const range of ranges) if (index >= range[0] && index < range[1]) return range;
  return null;
}
function buildImageRanges(src) {
  const ranges = [];
  let i2 = 0;
  while (i2 < src.length - 1) {
    if (src[i2] === "!" && src[i2 + 1] === "[") {
      const start = i2;
      let j = i2 + 2;
      while (j < src.length) {
        if (src[j] === "\\" && j + 1 < src.length) {
          j += 2;
          continue;
        }
        if (src[j] === "]") break;
        j++;
      }
      if (j < src.length && src[j] === "]" && j + 1 < src.length && src[j + 1] === "(") {
        let k = j + 2;
        let depth = 1;
        while (k < src.length && depth > 0) {
          if (src[k] === "\\" && k + 1 < src.length) {
            k += 2;
            continue;
          }
          if (src[k] === "(") depth++;
          else if (src[k] === ")") depth--;
          k++;
        }
        if (depth === 0) {
          ranges.push([start, k]);
          i2 = k;
          continue;
        }
      }
    }
    i2++;
  }
  return ranges;
}
function isEscapedAt(src, index) {
  let cursor = index - 1;
  let backslashes = 0;
  while (cursor >= 0 && src[cursor] === "\\") {
    backslashes++;
    cursor--;
  }
  return backslashes % 2 === 1;
}
function findNextUnescapedDollar(src, startIdx) {
  let searchPos = startIdx;
  while (searchPos < src.length) {
    const index = src.indexOf("$", searchPos);
    if (index === -1) return -1;
    if (isEscapedAt(src, index)) {
      searchPos = index + 1;
      continue;
    }
    return index;
  }
  return -1;
}
function findSingleDollarClose(src, startIdx) {
  let searchPos = startIdx;
  while (searchPos < src.length) {
    const index = findNextUnescapedDollar(src, searchPos);
    if (index === -1) return -1;
    if (index > 0 && src[index - 1] === "$" || index + 1 < src.length && src[index + 1] === "$") {
      searchPos = index + 1;
      continue;
    }
    return index;
  }
  return -1;
}
function isLikelyCurrencyRangeDollar(content, nextChar) {
  const stripped = String(content ?? "").trim();
  if (!stripped) return false;
  if (!/^\d[\d,.]*\s*[~～-]\s*$/.test(stripped)) return false;
  return /\d/.test(String(nextChar ?? ""));
}
function isLikelyPlaceholderDollar(content) {
  const stripped = String(content ?? "").trim();
  if (!stripped) return false;
  return /^(?:\.{3,}|…+)$/.test(stripped);
}
function applyMath(md, mathOpts) {
  const mathInline = (state, silent) => {
    var _a3, _b;
    const s2 = state;
    const strict = !!(mathOpts == null ? void 0 : mathOpts.strictDelimiters);
    const allowLoading = !((_a3 = s2 == null ? void 0 : s2.env) == null ? void 0 : _a3.__markstreamFinal);
    const preserveSpacesBeforeLineBreak = (src, start) => {
      let end = start;
      while (end < src.length && (src[end] === " " || src[end] === "	")) end++;
      if (end === start) return start;
      if (!(src[end] === "\n" || src[end] === "\r" && src[end + 1] === "\n")) return start;
      const text$1 = src.slice(start, end);
      const token = s2.push("text", "", 0);
      token.content = text$1;
      return end;
    };
    if (/^\*[^*]+/.test(s2.src)) return false;
    const delimiters = [
      ["$$", "$$"],
      ["$", "$"],
      ["\\(", "\\)"]
    ];
    const pending = String(s2.pending ?? "");
    const currentStart = Math.max(0, s2.pos - pending.length);
    let searchPos = currentStart;
    let preMathPos = currentStart;
    const initialPos = currentStart;
    for (const [open, close] of delimiters) {
      const src = s2.src;
      const codeSpanRanges = buildCodeSpanRanges(src);
      const imageRanges = buildImageRanges(src);
      let foundAny = false;
      if (open === "$$" && searchPos !== initialPos) searchPos = initialPos;
      let lastIndex = -1;
      let lastSearchPos = -1;
      let stallCount = 0;
      const pushText = (text$1) => {
        if (text$1 === "undefined" || text$1 == null) text$1 = "";
        if (text$1 === "\\") {
          s2.pos = s2.pos + text$1.length;
          searchPos = s2.pos;
          return;
        }
        if (text$1 === "\\)" || text$1 === "\\(") {
          const t$1 = s2.push("text_special", "", 0);
          t$1.content = text$1 === "\\)" ? ")" : "(";
          t$1.markup = text$1;
          s2.pos = s2.pos + text$1.length;
          searchPos = s2.pos;
          return;
        }
        if (!text$1) return;
        if (open === "$$" && text$1.includes("$")) {
          let localPos = 0;
          while (localPos < text$1.length) {
            const dollarIndex = findNextUnescapedDollar(text$1, localPos);
            if (dollarIndex === -1) {
              const rest = text$1.slice(localPos);
              if (rest) {
                const t$2 = s2.push("text", "", 0);
                t$2.content = rest;
                s2.pos = s2.pos + rest.length;
                searchPos = s2.pos;
              }
              break;
            }
            if (dollarIndex > 0 && text$1[dollarIndex - 1] === "$" || dollarIndex + 1 < text$1.length && text$1[dollarIndex + 1] === "$") {
              const beforeSkip = text$1.slice(localPos, dollarIndex + 1);
              if (beforeSkip) {
                const t$2 = s2.push("text", "", 0);
                t$2.content = beforeSkip;
                s2.pos = s2.pos + beforeSkip.length;
                searchPos = s2.pos;
              }
              localPos = dollarIndex + 1;
              continue;
            }
            const before = text$1.slice(localPos, dollarIndex);
            if (before) {
              const t$2 = s2.push("text", "", 0);
              t$2.content = before;
              s2.pos = s2.pos + before.length;
              searchPos = s2.pos;
            }
            const closingDollarIndex = findSingleDollarClose(text$1, dollarIndex + 1);
            if (closingDollarIndex === -1) {
              const rest = text$1.slice(dollarIndex);
              const t$2 = s2.push("text", "", 0);
              t$2.content = rest;
              s2.pos = s2.pos + rest.length;
              searchPos = s2.pos;
              break;
            }
            const content = text$1.slice(dollarIndex + 1, closingDollarIndex);
            const hasBacktick = content.includes("`");
            const isEmpty = !content || !content.trim();
            const nextChar = text$1[closingDollarIndex + 1];
            const isCurrencyRange = isLikelyCurrencyRangeDollar(content, nextChar);
            const isPlaceholder = isLikelyPlaceholderDollar(content);
            if (!hasBacktick && !isEmpty && !isCurrencyRange && !isPlaceholder) {
              const token = s2.push("math_inline", "math", 0);
              token.content = normalizeStandaloneBackslashT(content, mathOpts);
              token.markup = "$";
              token.raw = `$${content}$`;
              token.loading = false;
              s2.pos = s2.pos + (closingDollarIndex - dollarIndex + 1);
              searchPos = s2.pos;
              localPos = closingDollarIndex + 1;
              continue;
            }
            const t$1 = s2.push("text", "", 0);
            t$1.content = "$";
            s2.pos = s2.pos + 1;
            searchPos = s2.pos;
            localPos = dollarIndex + 1;
          }
          return;
        }
        const imageStart = text$1.indexOf("![");
        if (imageStart !== -1) {
          if (imageStart > 0) {
            const beforeImage = text$1.slice(0, imageStart);
            const t$2 = s2.push("text", "", 0);
            t$2.content = beforeImage;
            s2.pos = s2.pos + beforeImage.length;
            searchPos = s2.pos;
          }
          const imageMatch = text$1.slice(imageStart).match(/^!\[([^\]]*)\]\(([^)]+)\)/);
          if (imageMatch) {
            const [, alt, srcAndTitle] = imageMatch;
            const srcMatch = srcAndTitle.match(/^(\S+)(?:\s+"([^"]+)")?\s*$/);
            const src$1 = srcMatch ? srcMatch[1] : srcAndTitle;
            const title = srcMatch && srcMatch[2] ? srcMatch[2] : null;
            const token = s2.push("image", "img", 0);
            token.attrs = [["src", src$1], ["alt", alt]];
            if (title) token.attrs.push(["title", title]);
            token.content = alt;
            token.children = [{
              type: "text",
              content: alt,
              tag: ""
            }];
            s2.pos = s2.pos + imageMatch[0].length;
            searchPos = s2.pos;
            const remainingText = text$1.slice(imageStart + imageMatch[0].length);
            if (remainingText) pushText(remainingText);
            return;
          }
          const t$1 = s2.push("text", "", 0);
          t$1.content = text$1;
          s2.pos = s2.pos + text$1.length;
          searchPos = s2.pos;
          return;
        }
        const t2 = s2.push("text", "", 0);
        t2.content = text$1;
        s2.pos = s2.pos + text$1.length;
        searchPos = s2.pos;
      };
      while (true) {
        if (searchPos >= src.length) break;
        const index = src.indexOf(open, searchPos);
        if (index === -1) break;
        if (isEscapedAt(src, index)) {
          searchPos = index + Math.max(1, open.length);
          continue;
        }
        const codeSpanAtIndex = findRangeAt(codeSpanRanges, index);
        if (codeSpanAtIndex) {
          searchPos = codeSpanAtIndex[1];
          continue;
        }
        const imageRangeAtIndex = findRangeAt(imageRanges, index);
        if (imageRangeAtIndex) {
          searchPos = imageRangeAtIndex[1];
          continue;
        }
        if (index === lastIndex && searchPos === lastSearchPos) {
          stallCount++;
          if (stallCount > 2) {
            searchPos = index + Math.max(1, open.length);
            continue;
          }
        } else {
          stallCount = 0;
          lastIndex = index;
          lastSearchPos = searchPos;
        }
        if (open === "(" && index > 0) {
          let i2 = index - 1;
          while (i2 >= 0 && src[i2] === " ") i2--;
          if (i2 >= 0 && src[i2] === "]") {
            searchPos = index + open.length;
            continue;
          }
        }
        if (open === "$" && index > 0 && src[index - 1] === "$") {
          searchPos = index + 1;
          continue;
        }
        if (open === "$" && index < src.length - 1 && src[index + 1] === "$") {
          searchPos = index + 2;
          continue;
        }
        const endIdx = open === "$" ? findSingleDollarClose(src, index + open.length) : findMatchingClose_default(src, index + open.length, open, close);
        if (endIdx === -1) {
          const content$1 = src.slice(index + open.length);
          if (content$1.includes(open)) {
            searchPos = src.indexOf(open, index + open.length);
            continue;
          }
          if (endIdx === -1) {
            if (allowLoading && !strict && isMathLike(content$1) && !content$1.includes("`")) {
              searchPos = index + open.length;
              foundAny = true;
              if (!silent) {
                s2.pending = "";
                const toPushBefore = preMathPos ? src.slice(preMathPos, searchPos) : src.slice(0, searchPos);
                const isStrongPrefix = countUnescapedStrong(toPushBefore) % 2 === 1;
                if (preMathPos) pushText(src.slice(preMathPos, searchPos));
                else {
                  let text$1 = src.slice(0, searchPos);
                  if (text$1.endsWith(open)) text$1 = text$1.slice(0, text$1.length - open.length);
                  pushText(text$1);
                }
                if (isStrongPrefix) {
                  const strongMarker = ((_b = findLastUnescapedStrongMarker(toPushBefore)) == null ? void 0 : _b.marker) ?? "**";
                  const strongToken = s2.push("strong_open", "", 0);
                  strongToken.markup = strongMarker;
                  const token = s2.push("math_inline", "math", 0);
                  token.content = normalizeStandaloneBackslashT(content$1, mathOpts);
                  token.markup = open === "$$" ? "$$" : open === "\\(" ? "\\(\\)" : open === "$" ? "$" : "()";
                  token.raw = `${open}${content$1}${close}`;
                  token.loading = true;
                  strongToken.content = content$1;
                  s2.push("strong_close", "", 0);
                } else {
                  const token = s2.push("math_inline", "math", 0);
                  token.content = normalizeStandaloneBackslashT(content$1, mathOpts);
                  token.markup = open === "$$" ? "$$" : open === "\\(" ? "\\(\\)" : open === "$" ? "$" : "()";
                  token.raw = `${open}${content$1}${close}`;
                  token.loading = true;
                }
                s2.pos = src.length;
              }
              searchPos = src.length;
              preMathPos = searchPos;
            }
            break;
          }
        }
        const content = src.slice(index + open.length, endIdx);
        const hasBacktick = content.includes("`");
        const isEmpty = !content || !content.trim();
        const isDollar = open === "$";
        const nextChar = src[endIdx + close.length];
        const isCurrencyRange = isDollar && isLikelyCurrencyRangeDollar(content, nextChar);
        const isPlaceholder = isDollar && isLikelyPlaceholderDollar(content);
        if (strict ? hasBacktick || isEmpty || isCurrencyRange || isPlaceholder : hasBacktick || isEmpty || isCurrencyRange || isPlaceholder || !isDollar && !isMathLike(content)) {
          searchPos = endIdx + close.length;
          const text$1 = src.slice(s2.pos, searchPos);
          if (!s2.pending) {
            pushText(text$1);
            preMathPos = searchPos;
          }
          continue;
        }
        foundAny = true;
        if (!silent) {
          const before = src.slice(s2.pos - (s2.pending ?? "").length, index);
          let toPushBefore = src.slice(0, searchPos) ? src.slice(preMathPos, index) : before;
          const isStrongPrefix = countUnescapedStrong(toPushBefore) % 2 === 1;
          if (index !== s2.pos && isStrongPrefix) toPushBefore = s2.pending + src.slice(s2.pos, index);
          const strongMarkerInfo = isStrongPrefix ? findLastUnescapedStrongMarker(toPushBefore) : null;
          const strongMarker = (strongMarkerInfo == null ? void 0 : strongMarkerInfo.marker) ?? "**";
          if (s2.pending !== toPushBefore) {
            s2.pending = "";
            if (isStrongPrefix) if (strongMarkerInfo) {
              const after = toPushBefore.slice(strongMarkerInfo.index + strongMarker.length);
              pushText(toPushBefore.slice(0, strongMarkerInfo.index));
              const strongToken = s2.push("strong_open", "", 0);
              strongToken.markup = strongMarker;
              const textToken$1 = s2.push("text", "", 0);
              textToken$1.content = after;
              s2.push("strong_close", "", 0);
            } else pushText(toPushBefore);
            else pushText(toPushBefore);
          }
          if (isStrongPrefix) {
            const strongToken = s2.push("strong_open", "", 0);
            strongToken.markup = strongMarker;
            const token = s2.push("math_inline", "math", 0);
            token.content = normalizeStandaloneBackslashT(content, mathOpts);
            token.markup = open === "$$" ? "$$" : open === "\\(" ? "\\(\\)" : open === "$" ? "$" : "()";
            token.raw = `${open}${content}${close}`;
            token.loading = false;
            const isBeforeClose = src.slice(endIdx + close.length).startsWith(strongMarker);
            if (isBeforeClose) s2.push("strong_close", "", 0);
            s2.pos = preserveSpacesBeforeLineBreak(src, endIdx + close.length);
            searchPos = s2.pos;
            preMathPos = searchPos;
            if (!isBeforeClose) s2.push("strong_close", "", 0);
            return true;
          } else {
            const token = s2.push("math_inline", "math", 0);
            token.content = normalizeStandaloneBackslashT(content, mathOpts);
            token.markup = open === "$$" ? "$$" : open === "\\(" ? "\\(\\)" : open === "$" ? "$" : "()";
            token.raw = `${open}${content}${close}`;
            token.loading = false;
          }
        }
        searchPos = preserveSpacesBeforeLineBreak(src, endIdx + close.length);
        preMathPos = searchPos;
        s2.pos = searchPos;
        return true;
      }
      if (foundAny) {
        if (!silent) {
          if (open === "$$" && searchPos < src.length && src.slice(searchPos).includes("$")) {
            let remainingPos = searchPos;
            while (true) {
              if (remainingPos >= src.length) break;
              const dollarIndex = findNextUnescapedDollar(src, remainingPos);
              if (dollarIndex === -1) break;
              if (dollarIndex + 1 < src.length && src[dollarIndex + 1] === "$") {
                remainingPos = dollarIndex + 2;
                continue;
              }
              if (dollarIndex > 0 && src[dollarIndex - 1] === "$") {
                remainingPos = dollarIndex + 1;
                continue;
              }
              const closingDollarIndex = findSingleDollarClose(src, dollarIndex + 1);
              if (closingDollarIndex === -1) break;
              const content = src.slice(dollarIndex + 1, closingDollarIndex);
              const hasBacktick = content.includes("`");
              const isEmpty = !content || !content.trim();
              const nextChar = src[closingDollarIndex + 1];
              const isCurrencyRange = isLikelyCurrencyRangeDollar(content, nextChar);
              const isPlaceholder = isLikelyPlaceholderDollar(content);
              if (!hasBacktick && !isEmpty && !isCurrencyRange && !isPlaceholder) {
                const before = src.slice(searchPos, dollarIndex);
                if (before) pushText(before);
                const token = s2.push("math_inline", "math", 0);
                token.content = normalizeStandaloneBackslashT(content, mathOpts);
                token.markup = "$";
                token.raw = `$${content}$`;
                token.loading = false;
                searchPos = closingDollarIndex + 1;
                remainingPos = closingDollarIndex + 1;
              } else {
                pushText("$");
                remainingPos = dollarIndex + 1;
              }
            }
            if (remainingPos < src.length) pushText(src.slice(remainingPos));
          } else if (searchPos < src.length) pushText(src.slice(searchPos));
          s2.pos = src.length;
        } else s2.pos = searchPos;
        return true;
      }
    }
    return false;
  };
  const mathBlock = (state, startLine, endLine, silent) => {
    var _a3;
    const s2 = state;
    const allowLoading = !((_a3 = s2 == null ? void 0 : s2.env) == null ? void 0 : _a3.__markstreamFinal);
    const strict = mathOpts == null ? void 0 : mathOpts.strictDelimiters;
    const delimiters = strict ? [["\\[", "\\]"], ["$$", "$$"]] : [
      ["\\[", "\\]"],
      ["[", "]"],
      ["$$", "$$"]
    ];
    const startPos = s2.bMarks[startLine] + s2.tShift[startLine];
    let lineText = s2.src.slice(startPos, s2.eMarks[startLine]).trim();
    let matched = false;
    let openDelim = "";
    let closeDelim = "";
    let skipFirstLine = false;
    for (const [open, close] of delimiters) if (lineText.startsWith(open)) if (open.includes("[")) if (mathOpts == null ? void 0 : mathOpts.strictDelimiters) {
      if (lineText.replace("\\", "") === "[") {
        if (startLine + 1 < endLine) {
          matched = true;
          openDelim = open;
          closeDelim = close;
          break;
        }
        continue;
      }
    } else if (lineText.replace("\\", "") === "[") {
      if (startLine + 1 < endLine) {
        matched = true;
        openDelim = open;
        closeDelim = close;
        break;
      }
      continue;
    } else {
      const lastToken = s2.tokens[s2.tokens.length - 1];
      if (lastToken && lastToken.type === "list_item_open" && lastToken.mark === "-" && lineText.slice(open.length, lineText.indexOf("]")).trim() === "x") continue;
      if (lineText.replace("\\", "").startsWith("[") && !lineText.includes("](")) {
        const closeIndex = lineText.indexOf("]");
        if (lineText.slice(closeIndex).trim() !== "]") continue;
        const inner = lineText.slice(open.length, closeIndex);
        if (open === "[" ? isPlainBracketMathLike(inner) : isMathLike(inner)) {
          matched = true;
          openDelim = open;
          closeDelim = close;
          break;
        }
        continue;
      }
    }
    else {
      matched = true;
      openDelim = open;
      closeDelim = close;
      break;
    }
    else if (open === "$$" && lineText.endsWith(open) && !lineText.slice(0, lineText.length - open.length).trim().includes(open) && startLine + 1 < endLine) {
      s2.push("text", "", 0).content = lineText.slice(0, lineText.length - open.length);
      const nextLineStartPos = s2.bMarks[startLine + 1] + s2.tShift[startLine + 1];
      lineText = s2.src.slice(nextLineStartPos, s2.eMarks[startLine + 1]).trim();
      skipFirstLine = true;
      matched = true;
      openDelim = open;
      closeDelim = close;
      break;
    }
    if (!matched) return false;
    if (silent) return true;
    if (lineText.includes(closeDelim) && lineText.indexOf(closeDelim) > openDelim.length) {
      const startDelimIndex = lineText.indexOf(openDelim);
      const endDelimIndex = lineText.indexOf(closeDelim, startDelimIndex + openDelim.length);
      const content$1 = lineText.slice(startDelimIndex + openDelim.length, endDelimIndex);
      const token$1 = s2.push("math_block", "math", 0);
      token$1.content = normalizeStandaloneBackslashT(content$1);
      token$1.markup = openDelim === "$$" ? "$$" : openDelim === "[" ? "[]" : "\\[\\]";
      token$1.map = [startLine, startLine + 1];
      token$1.raw = `${openDelim}${content$1}${closeDelim}`;
      token$1.block = true;
      token$1.loading = false;
      s2.line = startLine + 1;
      return true;
    }
    let nextLine = startLine;
    let content = "";
    let found = false;
    const firstLineContent = lineText === openDelim ? "" : lineText.slice(openDelim.length);
    if (firstLineContent.includes(closeDelim)) {
      const endIndex = firstLineContent.indexOf(closeDelim);
      content = firstLineContent.slice(0, endIndex);
      found = true;
      nextLine = startLine;
    } else {
      if (firstLineContent && !skipFirstLine) content = firstLineContent;
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        const lineStart = s2.bMarks[nextLine] + s2.tShift[nextLine];
        const lineEnd = s2.eMarks[nextLine];
        const currentLine = s2.src.slice(lineStart, lineEnd);
        if (currentLine.trim() === closeDelim) {
          found = true;
          break;
        } else if (currentLine.includes(closeDelim)) {
          found = true;
          const endIndex = currentLine.indexOf(closeDelim);
          content += (content ? "\n" : "") + currentLine.slice(0, endIndex);
          break;
        }
        content += (content ? "\n" : "") + currentLine;
      }
    }
    if ((!allowLoading || strict) && !found) return false;
    const hasMarkdownPrefix = /^\s*!\[/.test(content);
    if (!(openDelim === "$$" ? !hasMarkdownPrefix : openDelim === "[" ? isPlainBracketMathLike(content) : isMathLike(content))) return false;
    const token = s2.push("math_block", "math", 0);
    token.content = normalizeStandaloneBackslashT(content);
    token.markup = openDelim === "$$" ? "$$" : openDelim === "[" ? "[]" : "\\[\\]";
    token.raw = `${openDelim}${content}${content.startsWith("\n") ? "\n" : ""}${closeDelim}`;
    token.map = [startLine, nextLine + 1];
    token.block = true;
    token.loading = !found;
    s2.line = nextLine + 1;
    return true;
  };
  const explicitMathBlockBeforeSetext = (state, startLine, endLine, silent) => {
    const s2 = state;
    const startPos = s2.bMarks[startLine] + s2.tShift[startLine];
    const lineText = s2.src.slice(startPos, s2.eMarks[startLine]).trim();
    if (!lineText.startsWith("$$") && !lineText.startsWith("\\[")) return false;
    return mathBlock(state, startLine, endLine, silent);
  };
  md.inline.ruler.before("escape", "math", mathInline);
  md.block.ruler.before("lheading", "explicit_math_block", explicitMathBlockBeforeSetext, { alt: [
    "paragraph",
    "reference",
    "blockquote",
    "list"
  ] });
  md.block.ruler.before("paragraph", "math_block", mathBlock, { alt: [
    "paragraph",
    "reference",
    "blockquote",
    "list"
  ] });
}
function applyRenderRules(md) {
  const defaultImage = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    const tokensAny = tokens;
    const selfShape = self;
    return selfShape.renderToken ? selfShape.renderToken(tokensAny, idx, options) : "";
  };
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    var _a3, _b;
    const tokensAny = tokens;
    (_b = (_a3 = tokensAny[idx]).attrSet) == null ? void 0 : _b.call(_a3, "loading", "lazy");
    return defaultImage(tokensAny, idx, options, env, self);
  };
  md.renderer.rules.fence = md.renderer.rules.fence || ((tokens, idx) => {
    const tokenShape = tokens[idx];
    const info = String(tokenShape.info ?? "").trim();
    return `<pre class="${info ? `language-${md.utils.escapeHtml(info.split(/\s+/g)[0])}` : ""}"><code>${md.utils.escapeHtml(String(tokenShape.content ?? ""))}</code></pre>`;
  });
}
function factory(opts = {}) {
  const md = new src_default({
    html: true,
    linkify: true,
    typographer: true,
    stream: true,
    ...opts.markdownItOptions ?? {}
  });
  if (opts.enableMath ?? true) applyMath(md, {
    ...getDefaultMathOptions() ?? {},
    ...opts.mathOptions ?? {}
  });
  if (opts.enableContainers ?? true) applyContainers(md);
  if (opts.enableFixIndentedCodeBlock !== false) applyFixIndentedCodeBlock(md);
  applyFixLinkTokens(md);
  applyFixStrongTokens(md);
  applyFixListItem(md);
  applyFixTableTokens(md);
  applyRenderRules(md);
  applyFixHtmlInlineTokens(md, { customHtmlTags: opts.customHtmlTags });
  return md;
}
function parseCheckboxToken(token) {
  const tokenMeta = token.meta ?? {};
  return {
    type: "checkbox",
    checked: tokenMeta.checked === true,
    raw: tokenMeta.checked ? "[x]" : "[ ]"
  };
}
function parseCheckboxInputToken(token) {
  const tokenAny = token;
  const rawAttr = tokenAny.attrGet ? tokenAny.attrGet("checked") : void 0;
  const checked = rawAttr === "" || rawAttr === "true";
  return {
    type: "checkbox_input",
    checked,
    raw: checked ? "[x]" : "[ ]"
  };
}
function parseEmojiToken(token) {
  const name = String(token.content ?? "");
  return {
    type: "emoji",
    name,
    markup: String(token.markup ?? ""),
    raw: `:${name}:`
  };
}
function parseEmphasisToken(tokens, startIndex, options) {
  const children = [];
  let emText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "em_close") {
    const tokenText = tokens[i2];
    emText += String(tokens[i2].content ?? tokenText.text ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  return {
    node: {
      type: "emphasis",
      children,
      raw: `*${emText}*`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
var TRAILING_FENCE_LINE_RE = /\r?\n[ \t]*`+\s*$/;
var DIFF_HEADER_PREFIXES = [
  "diff ",
  "index ",
  "--- ",
  "+++ ",
  "@@ "
];
var NEWLINE_RE = /\r?\n/;
function flushPendingDiffHunk(orig, updated, pendingOrig, pendingUpdated) {
  if (pendingOrig.length > 0) orig.push(...pendingOrig);
  if (pendingUpdated.length > 0) updated.push(...pendingUpdated);
  pendingOrig.length = 0;
  pendingUpdated.length = 0;
}
function splitUnifiedDiff(content, closed) {
  const orig = [];
  const updated = [];
  const pendingOrig = [];
  const pendingUpdated = [];
  const lines = content.split(NEWLINE_RE);
  const stableLineCount = Math.max(0, lines.length - 1);
  const hasUnifiedDiffHeaders = lines.some((line) => line.startsWith("diff ") || line.startsWith("--- ") || line.startsWith("+++ ") || line.startsWith("@@ "));
  const processLine = (rawLine) => {
    const line = rawLine;
    if (DIFF_HEADER_PREFIXES.some((p) => line.startsWith(p))) return;
    if (line.startsWith("-")) {
      const body = line.slice(1);
      pendingOrig.push(!hasUnifiedDiffHeaders && body.startsWith(" ") ? ` ${body}` : body);
    } else if (line.startsWith("+")) {
      const body = line.slice(1);
      pendingUpdated.push(!hasUnifiedDiffHeaders && body.startsWith(" ") ? ` ${body}` : body);
    } else {
      flushPendingDiffHunk(orig, updated, pendingOrig, pendingUpdated);
      const contextLine = hasUnifiedDiffHeaders && line.startsWith(" ") ? line.slice(1) : line;
      orig.push(contextLine);
      updated.push(contextLine);
    }
  };
  for (let index = 0; index < stableLineCount; index++) processLine(lines[index] ?? "");
  if (closed && stableLineCount < lines.length) processLine(lines[lines.length - 1] ?? "");
  if (closed || pendingOrig.length > 0 && pendingUpdated.length > 0) flushPendingDiffHunk(orig, updated, pendingOrig, pendingUpdated);
  return {
    original: orig.join("\n"),
    updated: updated.join("\n")
  };
}
function parseFenceToken(token) {
  const hasMap = Array.isArray(token.map) && token.map.length === 2;
  const tokenMeta = token.meta ?? {};
  const closed = typeof tokenMeta.closed === "boolean" ? tokenMeta.closed : void 0;
  const info = String(token.info ?? "");
  const diff = info.startsWith("diff");
  const language = diff ? (() => {
    const s2 = info;
    const sp = s2.indexOf(" ");
    return sp === -1 ? "" : String(s2.slice(sp + 1) ?? "");
  })() : info;
  let content = String(token.content ?? "");
  if (TRAILING_FENCE_LINE_RE.test(content)) content = content.replace(TRAILING_FENCE_LINE_RE, "");
  if (diff) {
    const { original, updated } = splitUnifiedDiff(content, closed === true);
    return {
      type: "code_block",
      language,
      code: String(updated ?? ""),
      raw: String(content ?? ""),
      diff,
      loading: closed === true ? false : closed === false ? true : !hasMap,
      originalCode: original,
      updatedCode: updated
    };
  }
  return {
    type: "code_block",
    language,
    code: String(content ?? ""),
    raw: String(content ?? ""),
    diff,
    loading: closed === true ? false : closed === false ? true : !hasMap
  };
}
function parseFootnoteRefToken(token) {
  const tokenMeta = token.meta ?? {};
  return {
    type: "footnote_reference",
    id: String(tokenMeta.label ?? ""),
    raw: `[^${String(tokenMeta.label ?? "")}]`
  };
}
function parseHardbreakToken() {
  return {
    type: "hardbreak",
    raw: "\\\n"
  };
}
function parseHighlightToken(tokens, startIndex, options) {
  const children = [];
  let markText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "mark_close") {
    markText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  return {
    node: {
      type: "highlight",
      children,
      raw: `==${markText}==`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
var emptyTagSets = null;
var TAG_SET_CACHE = /* @__PURE__ */ new WeakMap();
function getEmptyTagSets() {
  if (!emptyTagSets) emptyTagSets = {
    customTagSet: null,
    allowedTagSet: buildAllowedHtmlTagSet()
  };
  return emptyTagSets;
}
function getTagName(html) {
  const match2 = html.match(/^<\s*(?:\/\s*)?([\w-]+)/);
  return match2 ? match2[1].toLowerCase() : "";
}
function isClosingTag(html) {
  return /^<\s*\//.test(html);
}
function isSelfClosing(tag, html) {
  return /\/\s*>\s*$/.test(html) || VOID_HTML_TAGS.has(tag);
}
function getTagSets(customTags) {
  if (!customTags || customTags.length === 0) return getEmptyTagSets();
  const cached = TAG_SET_CACHE.get(customTags);
  if (cached) return cached;
  const normalized = customTags.map(normalizeCustomHtmlTagName).filter(Boolean);
  if (!normalized.length) {
    const entry$1 = getEmptyTagSets();
    TAG_SET_CACHE.set(customTags, entry$1);
    return entry$1;
  }
  const entry = {
    customTagSet: new Set(normalized),
    allowedTagSet: buildAllowedHtmlTagSet({ customHtmlTags: customTags })
  };
  TAG_SET_CACHE.set(customTags, entry);
  return entry;
}
function tokenToRaw(token) {
  const shape = token;
  const raw = shape.raw ?? shape.content ?? shape.markup ?? "";
  return String(raw ?? "");
}
function getAttrValue$1(attrs, name) {
  const lowerName = name.toLowerCase();
  for (let i2 = attrs.length - 1; i2 >= 0; i2--) {
    const [key, value] = attrs[i2];
    if (String(key).toLowerCase() === lowerName) return value;
  }
}
function normalizeLinkAttrs$1(attrs, href, title) {
  const normalized = attrs.slice();
  if (!getAttrValue$1(normalized, "href")) normalized.push(["href", href]);
  if (title != null && !getAttrValue$1(normalized, "title")) normalized.push(["title", title]);
  return normalized;
}
function stringifyTokens(tokens) {
  return tokens.map(tokenToRaw).join("");
}
function normalizeStandardHtmlChildren(children) {
  const normalized = [];
  const pushText = (rawText) => {
    const text$1 = String(rawText ?? "");
    if (!text$1) return;
    const last = normalized[normalized.length - 1];
    if ((last == null ? void 0 : last.type) === "text") {
      last.content = `${last.content}${text$1}`;
      last.raw = `${last.raw}${text$1}`;
      return;
    }
    normalized.push({
      type: "text",
      content: text$1,
      raw: text$1
    });
  };
  for (const child of children) {
    if (!child) continue;
    if (child.type === "reference" || child.type === "footnote_reference") {
      pushText(String(child.raw ?? ""));
      continue;
    }
    if ("children" in child && Array.isArray(child.children)) {
      normalized.push({
        ...child,
        children: normalizeStandardHtmlChildren(child.children)
      });
      continue;
    }
    normalized.push(child);
  }
  return normalized;
}
function findMatchingClosing(tokens, startIndex, tag) {
  let depth = 0;
  for (let idx = startIndex; idx < tokens.length; idx++) {
    const t2 = tokens[idx];
    if (t2.type !== "html_inline") continue;
    const content = String(t2.content ?? "");
    const tTag = getTagName(content);
    const closing = isClosingTag(content);
    const selfClosing = isSelfClosing(tTag, content);
    if (!closing && !selfClosing && tTag === tag) {
      depth++;
      continue;
    }
    if (closing && tTag === tag) {
      if (depth === 0) return idx;
      depth--;
    }
  }
  return -1;
}
function collectHtmlFragment(tokens, startIndex, tag) {
  const fragmentTokens = [tokens[startIndex]];
  let innerTokens = [];
  let nextIndex = startIndex + 1;
  let closed = false;
  const closingIndex = tag ? findMatchingClosing(tokens, startIndex + 1, tag) : -1;
  if (closingIndex !== -1) {
    innerTokens = tokens.slice(startIndex + 1, closingIndex);
    fragmentTokens.push(...innerTokens, tokens[closingIndex]);
    nextIndex = closingIndex + 1;
    closed = true;
  } else {
    innerTokens = tokens.slice(startIndex + 1);
    if (innerTokens.length) fragmentTokens.push(...innerTokens);
    nextIndex = tokens.length;
  }
  return {
    closed,
    html: stringifyTokens(fragmentTokens),
    innerTokens,
    nextIndex
  };
}
function parseHtmlInlineCodeToken(token, tokens, i2, parseInlineTokens$1, raw, pPreToken, options) {
  const code$1 = String(token.content ?? "");
  const tag = getTagName(code$1);
  const { customTagSet, allowedTagSet } = getTagSets(options == null ? void 0 : options.customHtmlTags);
  if (!tag) return [{
    type: "inline_code",
    code: code$1,
    raw: code$1
  }, i2 + 1];
  if (!allowedTagSet.has(tag)) {
    if (!collectHtmlFragment(tokens, i2, tag).closed) {
      const content$1 = tokenToRaw(token);
      return [{
        type: "text",
        content: content$1,
        raw: content$1
      }, i2 + 1];
    }
  }
  if (tag === "br") return [{
    type: "hardbreak",
    raw: code$1
  }, i2 + 1];
  const closing = isClosingTag(code$1);
  const selfClosing = isSelfClosing(tag, code$1);
  if (closing) return [{
    type: "html_inline",
    tag,
    content: code$1,
    children: [],
    raw: code$1,
    loading: false
  }, i2 + 1];
  if (tag === "a") {
    const fragment$1 = collectHtmlFragment(tokens, i2, tag);
    const attrs$1 = parseTagAttrs(code$1);
    const innerTokens = fragment$1.innerTokens;
    const href = String(getAttrValue$1(attrs$1, "href") ?? "");
    const titleAttr = getAttrValue$1(attrs$1, "title");
    const title = titleAttr == null ? null : String(titleAttr);
    const normalizedAttrs = normalizeLinkAttrs$1(attrs$1, href, title);
    const normalizedChildren$1 = normalizeStandardHtmlChildren(innerTokens.length ? parseInlineTokens$1(innerTokens, raw, pPreToken, options) : []);
    const textContent = innerTokens.length ? stringifyTokens(innerTokens) : href || "";
    if (!normalizedChildren$1.length && textContent) normalizedChildren$1.push({
      type: "text",
      content: textContent,
      raw: textContent
    });
    return [{
      type: "link",
      href,
      title,
      text: textContent,
      attrs: normalizedAttrs,
      children: normalizedChildren$1,
      loading: !fragment$1.closed,
      raw: fragment$1.html || code$1
    }, fragment$1.nextIndex];
  }
  if (selfClosing) return [{
    type: (customTagSet == null ? void 0 : customTagSet.has(tag)) ? tag : "html_inline",
    tag,
    content: code$1,
    children: [],
    raw: code$1,
    loading: false
  }, i2 + 1];
  const fragment = collectHtmlFragment(tokens, i2, tag);
  if (tag === "p" || tag === "div") return [{
    type: "paragraph",
    children: normalizeStandardHtmlChildren(fragment.innerTokens.length ? parseInlineTokens$1(fragment.innerTokens, raw, pPreToken, options) : []),
    raw: fragment.html
  }, fragment.nextIndex];
  const normalizedChildren = normalizeStandardHtmlChildren(fragment.innerTokens.length ? parseInlineTokens$1(fragment.innerTokens, raw, pPreToken, options) : []);
  let content = fragment.html || code$1;
  let loading = !fragment.closed;
  let autoClosed = false;
  if (!fragment.closed) {
    const closeTag = `</${tag}>`;
    if (!content.toLowerCase().includes(closeTag.toLowerCase())) content += closeTag;
    autoClosed = true;
    loading = true;
  }
  const attrs = [];
  const attrRegex = /\s([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match2;
  while ((match2 = attrRegex.exec(code$1)) !== null) {
    const attrName = match2[1];
    const attrValue = match2[2] || match2[3] || match2[4] || "";
    attrs.push([attrName, attrValue]);
  }
  if (customTagSet == null ? void 0 : customTagSet.has(tag)) return [{
    type: tag,
    tag,
    attrs,
    content: fragment.innerTokens.length ? stringifyTokens(fragment.innerTokens) : "",
    children: fragment.innerTokens.length ? parseInlineTokens$1(fragment.innerTokens, raw, pPreToken, options) : [],
    raw: content,
    loading: token.loading || loading,
    autoClosed
  }, fragment.nextIndex];
  return [{
    type: "html_inline",
    tag,
    attrs,
    content,
    children: normalizedChildren,
    raw: content,
    loading,
    autoClosed
  }, fragment.nextIndex];
}
function parseImageToken(token, loading = false) {
  var _a3, _b, _c, _d, _e;
  let attrs = token.attrs ?? [];
  let childWithAttrs = null;
  if ((!attrs || attrs.length === 0) && Array.isArray(token.children)) for (const child of token.children) {
    const childAttrs = child.attrs;
    if (Array.isArray(childAttrs) && childAttrs.length > 0) {
      attrs = childAttrs;
      childWithAttrs = child;
      break;
    }
  }
  const src = String(((_a3 = attrs.find((attr) => attr[0] === "src")) == null ? void 0 : _a3[1]) ?? "");
  const altAttr = (_b = attrs.find((attr) => attr[0] === "alt")) == null ? void 0 : _b[1];
  let alt = "";
  if (altAttr != null && String(altAttr).length > 0) alt = String(altAttr);
  else if ((childWithAttrs == null ? void 0 : childWithAttrs.content) != null && String(childWithAttrs.content).length > 0) alt = String(childWithAttrs.content);
  else if (Array.isArray(childWithAttrs == null ? void 0 : childWithAttrs.children) && ((_c = childWithAttrs.children[0]) == null ? void 0 : _c.content)) alt = String(childWithAttrs.children[0].content);
  else if (Array.isArray(token.children) && ((_d = token.children[0]) == null ? void 0 : _d.content)) alt = String(token.children[0].content);
  else if (token.content != null && String(token.content).length > 0) alt = String(token.content);
  const _title = ((_e = attrs.find((attr) => attr[0] === "title")) == null ? void 0 : _e[1]) ?? null;
  const title = _title === null ? null : String(_title);
  const raw = String(token.content ?? "");
  return {
    type: "image",
    src,
    alt,
    title,
    raw,
    loading
  };
}
function parseInlineCodeToken(token) {
  const code$1 = String(token.content ?? "");
  return {
    type: "inline_code",
    code: code$1,
    raw: code$1
  };
}
function parseInsertToken(tokens, startIndex, options) {
  const children = [];
  let insText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "ins_close") {
    insText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  return {
    node: {
      type: "insert",
      children,
      raw: `++${String(insText)}++`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
function toAttrsTuple(attrs) {
  const tuples = [];
  if (!Array.isArray(attrs)) return tuples;
  for (const attr of attrs) {
    const key = attr == null ? void 0 : attr[0];
    if (!key) continue;
    tuples.push([String(key), String((attr == null ? void 0 : attr[1]) ?? "")]);
  }
  return tuples;
}
function getAttrValue(attrs, name) {
  const lowerName = name.toLowerCase();
  for (let i2 = attrs.length - 1; i2 >= 0; i2--) {
    const [key, value] = attrs[i2];
    if (String(key).toLowerCase() === lowerName) return value;
  }
}
function normalizeLinkAttrs(attrs, href, title) {
  const normalized = attrs.slice();
  if (!getAttrValue(normalized, "href")) normalized.push(["href", href]);
  if (title != null && !getAttrValue(normalized, "title")) normalized.push(["title", title]);
  return normalized;
}
function parseLinkToken(tokens, startIndex, options) {
  var _a3;
  const openToken = tokens[startIndex];
  const attrsTuple = toAttrsTuple(openToken.attrs);
  const href = String(getAttrValue(attrsTuple, "href") ?? "");
  const _title = getAttrValue(attrsTuple, "title");
  const title = _title == null ? null : String(_title);
  const normalizedAttrs = normalizeLinkAttrs(attrsTuple, href, title);
  let i2 = startIndex + 1;
  const linkTokens = [];
  let loading = true;
  while (i2 < tokens.length && tokens[i2].type !== "link_close") {
    linkTokens.push(tokens[i2]);
    i2++;
  }
  if (((_a3 = tokens[i2]) == null ? void 0 : _a3.type) === "link_close") loading = false;
  const lastLinkToken = linkTokens[linkTokens.length - 1];
  if ((options == null ? void 0 : options.__insideStrong) && (lastLinkToken == null ? void 0 : lastLinkToken.type) === "text" && String(lastLinkToken.content ?? "").endsWith("**") && !linkTokens.some((token) => token.type === "strong_open")) {
    const originalContent = String(lastLinkToken.content ?? "");
    const originalRaw = String(lastLinkToken.raw ?? originalContent);
    lastLinkToken.content = originalContent.slice(0, -2);
    lastLinkToken.raw = originalRaw.replace(/\*\*$/, "");
  }
  const children = parseInlineTokens(linkTokens, void 0, void 0, options);
  const linkText = children.map((node) => {
    const nodeAny = node;
    if ("content" in node) return String(nodeAny.content ?? "");
    return String(nodeAny.raw ?? "");
  }).join("");
  return {
    node: {
      type: "link",
      href,
      title,
      text: linkText,
      children,
      raw: String(`[${linkText}](${href}${title ? ` "${title}"` : ""})`),
      loading,
      attrs: normalizedAttrs
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
function parseMathInlineToken(token) {
  const content = token.content ?? "";
  const raw = token.raw === "$$" ? `$${content}$` : token.raw || "";
  return {
    type: "math_inline",
    content,
    loading: !!token.loading,
    raw,
    markup: token.markup
  };
}
function parseReferenceToken(token) {
  return {
    type: "reference",
    id: String(token.content ?? ""),
    raw: String(token.markup ?? `[${token.content ?? ""}]`)
  };
}
function parseStrikethroughToken(tokens, startIndex, options) {
  const children = [];
  let sText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "s_close") {
    sText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  return {
    node: {
      type: "strikethrough",
      children,
      raw: `~~${sText}~~`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
var ESCAPED_PUNCTUATION_RE$1 = /\\([\\()[\]`$|*_\-!])/g;
function resolveInnerRaw(raw, strongText) {
  if (!raw) return void 0;
  const rawText = String(raw);
  if (!rawText) return void 0;
  if (rawText === strongText) return rawText;
  if (rawText.replace(ESCAPED_PUNCTUATION_RE$1, "$1") === strongText) return rawText;
}
function parseStrongToken(tokens, startIndex, raw, options) {
  const children = [];
  let strongText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  let openCount = 1;
  while (i2 < tokens.length) {
    if (tokens[i2].type === "strong_close") {
      if (openCount === 1) break;
      openCount--;
    }
    if (tokens[i2].type === "strong_open") openCount++;
    strongText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  const innerOptions = {
    ...options,
    __insideStrong: true
  };
  children.push(...parseInlineTokens(innerTokens, resolveInnerRaw(raw, strongText), void 0, innerOptions));
  return {
    node: {
      type: "strong",
      children,
      raw: `**${String(strongText)}**`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
function parseSubscriptToken(tokens, startIndex, options) {
  const children = [];
  let subText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "sub_close") {
    subText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  const startContent = String(tokens[startIndex].content ?? "");
  const display = subText || startContent;
  return {
    node: {
      type: "subscript",
      children: children.length > 0 ? children : [{
        type: "text",
        content: display,
        raw: display
      }],
      raw: `~${display}~`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
function parseSuperscriptToken(tokens, startIndex, options) {
  const children = [];
  let supText = "";
  let i2 = startIndex + 1;
  const innerTokens = [];
  while (i2 < tokens.length && tokens[i2].type !== "sup_close") {
    supText += String(tokens[i2].content ?? "");
    innerTokens.push(tokens[i2]);
    i2++;
  }
  children.push(...parseInlineTokens(innerTokens, void 0, void 0, options));
  return {
    node: {
      type: "superscript",
      children: children.length > 0 ? children : [{
        type: "text",
        content: supText || String(tokens[startIndex].content ?? ""),
        raw: supText || String(tokens[startIndex].content ?? "")
      }],
      raw: `^${supText || String(tokens[startIndex].content ?? "")}^`
    },
    nextIndex: i2 < tokens.length ? i2 + 1 : tokens.length
  };
}
function parseTextToken(token) {
  const content = String(token.content ?? "");
  return {
    type: "text",
    content,
    raw: content
  };
}
var STRIKETHROUGH_RE = /[^~]*~{2,}[^~]+/;
var HAS_STRONG_RE = /\*\*/;
var INLINE_REPARSE_MARKER_RE = /[[_*^~]/;
var ESCAPED_PUNCTUATION_RE = /\\([\\()[\]`$|*_\-!])/g;
var ESCAPABLE_PUNCTUATION = /* @__PURE__ */ new Set([
  "\\",
  "(",
  ")",
  "[",
  "]",
  "`",
  "$",
  "|",
  "*",
  "_",
  "-",
  "!"
]);
var WHITESPACE_RE = /\s/u;
var ASCII_PUNCTUATION_RE = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
var UNICODE_PUNCTUATION_RE = new RegExp("\\p{P}", "u");
var AUTOLINK_PROTOCOL_RE = /^(?:https?:\/\/|mailto:|ftp:\/\/)/i;
var AUTOLINK_GENERIC_RE = /:\/\//;
function countUnescapedAsterisks(str) {
  let count = 0;
  let i2 = 0;
  while (i2 < str.length) {
    if (str[i2] === "\\" && i2 + 1 < str.length && str[i2 + 1] === "*") {
      i2 += 2;
      continue;
    }
    if (str[i2] === "*") count++;
    i2++;
  }
  return count;
}
function findNextUnescapedAsterisk(rawContent, startContentIndex = 0) {
  if (!rawContent) return -1;
  let contentIndex = 0;
  for (let rawIndex = 0; rawIndex < rawContent.length; rawIndex++) {
    const char = rawContent[rawIndex];
    const nextChar = rawContent[rawIndex + 1];
    if (char === "\\" && nextChar && ESCAPABLE_PUNCTUATION.has(nextChar)) {
      if (nextChar === "*" && contentIndex >= startContentIndex) {
        contentIndex++;
        rawIndex++;
        continue;
      }
      contentIndex++;
      rawIndex++;
      continue;
    }
    if (char === "*" && contentIndex >= startContentIndex) return contentIndex;
    contentIndex++;
  }
  return -1;
}
function isWhitespaceChar(ch) {
  return !!ch && WHITESPACE_RE.test(ch);
}
function isPunctuationChar(ch) {
  return !!ch && (ASCII_PUNCTUATION_RE.test(ch) || UNICODE_PUNCTUATION_RE.test(ch));
}
function isEmphasisOpenDelimiter(content, index) {
  const prev = index > 0 ? content[index - 1] : void 0;
  const next = content[index + 1];
  if (!next || isWhitespaceChar(next)) return false;
  return !(isPunctuationChar(next) && !!prev && !isWhitespaceChar(prev) && !isPunctuationChar(prev));
}
function isEmphasisCloseDelimiter(content, index) {
  const prev = index > 0 ? content[index - 1] : void 0;
  const next = content[index + 1];
  if (!prev || isWhitespaceChar(prev)) return false;
  return !(isPunctuationChar(prev) && !!next && !isWhitespaceChar(next) && !isPunctuationChar(next));
}
function findNextUnescapedEmphasisClose(rawContent, content, startContentIndex = 0) {
  let searchIndex = startContentIndex;
  let sawInvalidClose = false;
  while (searchIndex < content.length) {
    const closeIndex = rawContent ? findNextUnescapedAsterisk(rawContent, searchIndex) : content.indexOf("*", searchIndex);
    if (closeIndex === -1) break;
    if (isEmphasisCloseDelimiter(content, closeIndex)) return {
      index: closeIndex,
      sawInvalidClose
    };
    sawInvalidClose = true;
    searchIndex = closeIndex + 1;
  }
  return {
    index: -1,
    sawInvalidClose
  };
}
function isStrongOpenDelimiter(content, index) {
  const prev = index > 0 ? content[index - 1] : void 0;
  const next = content[index + 2];
  if (!next || isWhitespaceChar(next)) return false;
  return !(isPunctuationChar(next) && !!prev && !isWhitespaceChar(prev) && !isPunctuationChar(prev));
}
function isStrongCloseDelimiter(content, index) {
  const prev = index > 0 ? content[index - 1] : void 0;
  const next = content[index + 2];
  if (!prev || isWhitespaceChar(prev)) return false;
  return !(isPunctuationChar(prev) && !!next && !isWhitespaceChar(next) && !isPunctuationChar(next));
}
function findNextStrongClose(content, startContentIndex = 0) {
  let searchIndex = startContentIndex;
  let sawInvalidClose = false;
  while (searchIndex < content.length) {
    const closeIndex = content.indexOf("**", searchIndex);
    if (closeIndex === -1) break;
    if (isStrongCloseDelimiter(content, closeIndex)) return {
      index: closeIndex,
      sawInvalidClose
    };
    sawInvalidClose = true;
    searchIndex = closeIndex + 2;
  }
  return {
    index: -1,
    sawInvalidClose
  };
}
function decodeVisibleTextFromRaw(rawText) {
  let output = "";
  let index = 0;
  while (index < rawText.length) {
    if (rawText[index] !== "\\") {
      output += rawText[index];
      index++;
      continue;
    }
    let slashCount = 0;
    while (index + slashCount < rawText.length && rawText[index + slashCount] === "\\") slashCount++;
    const nextChar = rawText[index + slashCount];
    output += "\\".repeat(Math.floor(slashCount / 2));
    if (slashCount % 2 === 1) {
      if (nextChar && ESCAPABLE_PUNCTUATION.has(nextChar)) {
        output += nextChar;
        index += slashCount + 1;
        continue;
      }
      output += "\\";
    }
    index += slashCount;
  }
  return output;
}
function getRawIndexForVisibleIndex(rawText, visibleIndex) {
  let outputIndex = 0;
  for (let rawIndex = 0; rawIndex < rawText.length; rawIndex++) {
    const char = rawText[rawIndex];
    const nextChar = rawText[rawIndex + 1];
    if (char === "\\" && nextChar && ESCAPABLE_PUNCTUATION.has(nextChar)) {
      if (outputIndex === visibleIndex) return rawIndex + 1;
      outputIndex++;
      rawIndex++;
      continue;
    }
    if (outputIndex === visibleIndex) return rawIndex;
    outputIndex++;
  }
  return -1;
}
function isEscapedVisibleChar(rawText, visibleIndex, expectedChar) {
  const rawIndex = getRawIndexForVisibleIndex(rawText, visibleIndex);
  if (rawIndex === -1) return false;
  if (expectedChar && rawText[rawIndex] !== expectedChar) return false;
  let slashCount = 0;
  for (let i2 = rawIndex - 1; i2 >= 0 && rawText[i2] === "\\"; i2--) slashCount++;
  return slashCount % 2 === 1;
}
var WORD_CHAR_RE = /[\p{L}\p{N}]/u;
var WORD_ONLY_RE = /^[\p{L}\p{N}]+$/u;
function isWordChar(ch) {
  if (!ch) return false;
  return WORD_CHAR_RE.test(ch);
}
function isWordOnly(text$1) {
  if (!text$1) return false;
  return WORD_ONLY_RE.test(text$1);
}
function getAsteriskRunInfo(content, start) {
  let end = start;
  while (end < content.length && content[end] === "*") end++;
  const prev = start > 0 ? content[start - 1] : void 0;
  const next = end < content.length ? content[end] : void 0;
  return {
    len: end - start,
    prev,
    next,
    intraword: isWordChar(prev) && isWordChar(next)
  };
}
function findLiteralIntrawordAsteriskRunPairEnd(content) {
  const runs = [];
  for (let index = 0; index < content.length; ) {
    if (content[index] !== "*") {
      index++;
      continue;
    }
    const info = getAsteriskRunInfo(content, index);
    const end = index + info.len;
    if (info.len >= 2 && info.intraword) runs.push({
      start: index,
      end
    });
    index = end;
  }
  for (let index = 0; index < runs.length - 1; index++) {
    const current = runs[index];
    const next = runs[index + 1];
    if (!isWordOnly(content.slice(current.end, next.start))) return next.end;
  }
  return -1;
}
function isTripleAsteriskInnerText(text$1) {
  return !!text$1 && text$1.trim() === text$1 && /^[\p{L}\p{N}\s]+$/u.test(text$1);
}
function findTripleAsteriskClose(content, start) {
  let searchIndex = start;
  while (searchIndex < content.length) {
    const index = content.indexOf("***", searchIndex);
    if (index === -1) return -1;
    const info = getAsteriskRunInfo(content, index);
    if (info.len >= 3) return index;
    searchIndex = index + info.len;
  }
  return -1;
}
function isLikelyUrl(href) {
  if (!href) return false;
  return AUTOLINK_PROTOCOL_RE.test(href) || AUTOLINK_GENERIC_RE.test(href);
}
function recoverTrailingMarkdownLinkLabel(raw, href) {
  if (!raw || !href) return null;
  const match2 = raw.match(/\[([^\]\n]+)\]\(([^)]*)$/);
  if (!match2) return null;
  return match2[2] === href ? match2[1] : null;
}
function parseInlineTokens(tokens, raw, pPreToken, options) {
  if (!tokens || tokens.length === 0) return [];
  const internalOptions = options;
  const result = [];
  let currentTextNode = null;
  let i2 = 0;
  const requireClosingStrong = options == null ? void 0 : options.requireClosingStrong;
  function resetCurrentTextNode() {
    currentTextNode = null;
  }
  function handleEmphasisAndStrikethrough(content, token) {
    const rawSource = tokens.length === 1 ? raw : String(token.content ?? "");
    const markerCandidates = [];
    const literalIntrawordRunPairEnd = findLiteralIntrawordAsteriskRunPairEnd(content);
    if (literalIntrawordRunPairEnd !== -1) {
      pushText(content.slice(0, literalIntrawordRunPairEnd), content.slice(0, literalIntrawordRunPairEnd));
      const afterContent = content.slice(literalIntrawordRunPairEnd);
      if (afterContent) {
        handleToken({
          type: "text",
          content: afterContent,
          raw: afterContent
        });
        i2--;
      }
      i2++;
      return true;
    }
    if (STRIKETHROUGH_RE.test(content)) {
      const idx = content.indexOf("~~");
      if (idx !== -1) markerCandidates.push({
        type: "strikethrough",
        index: idx
      });
    }
    if (HAS_STRONG_RE.test(content)) {
      const idx = content.indexOf("**");
      if (idx !== -1) markerCandidates.push({
        type: "strong",
        index: idx
      });
    }
    if (/[^*]*\*[^*]+/.test(content)) {
      const idx = rawSource ? findNextUnescapedAsterisk(rawSource, 0) : content.indexOf("*");
      if (rawSource && idx === -1) return false;
      if (idx !== -1) markerCandidates.push({
        type: "emphasis",
        index: idx
      });
    }
    markerCandidates.sort((a2, b) => {
      if (a2.index !== b.index) return a2.index - b.index;
      if (a2.type === b.type) return 0;
      if (a2.type === "strong") return -1;
      if (b.type === "strong") return 1;
      return 0;
    });
    const nextMarker = markerCandidates[0];
    if (!nextMarker) return false;
    if (nextMarker.type === "strikethrough") {
      const idx = nextMarker.index;
      const beforeText = idx > -1 ? content.slice(0, idx) : "";
      if (beforeText) pushText(beforeText, beforeText);
      if (idx === -1) {
        i2++;
        return true;
      }
      const closeIdx = content.indexOf("~~", idx + 2);
      const inner = closeIdx === -1 ? content.slice(idx + 2) : content.slice(idx + 2, closeIdx);
      const after = closeIdx === -1 ? "" : content.slice(closeIdx + 2);
      const { node } = parseStrikethroughToken([
        {
          type: "s_open",
          tag: "s",
          content: "",
          markup: "~~",
          info: "",
          meta: null
        },
        {
          type: "text",
          tag: "",
          content: inner,
          markup: "",
          info: "",
          meta: null
        },
        {
          type: "s_close",
          tag: "s",
          content: "",
          markup: "~~",
          info: "",
          meta: null
        }
      ], 0, options);
      resetCurrentTextNode();
      pushNode(node);
      if (after) {
        handleToken({
          type: "text",
          content: after,
          raw: after
        });
        i2--;
      }
      i2++;
      return true;
    }
    if (nextMarker.type === "strong") {
      const openIdx = nextMarker.index;
      const beforeText = openIdx > -1 ? content.slice(0, openIdx) : "";
      if (beforeText) pushText(beforeText, beforeText);
      if (openIdx === -1) {
        i2++;
        return true;
      }
      if (raw && openIdx === 0) {
        let rawHasEscapedAsteriskAtStart = false;
        let asteriskCount = 0;
        while (asteriskCount < content.length && content[asteriskCount] === "*") asteriskCount++;
        if (raw.startsWith("\\*")) rawHasEscapedAsteriskAtStart = true;
        if (rawHasEscapedAsteriskAtStart) {
          let escapedCount = 0;
          let j = 0;
          while (j < raw.length && escapedCount < asteriskCount) if (raw[j] === "\\" && j + 1 < raw.length && raw[j + 1] === "*") {
            escapedCount += 1;
            j += 2;
          } else if (raw[j] === "*") break;
          else j++;
          if (escapedCount >= 2) {
            pushText(content, content);
            i2++;
            return true;
          }
        }
      }
      if (raw) {
        if ((content.match(/\*/g) || []).length > countUnescapedAsterisks(raw)) {
          pushText(content.slice(beforeText.length), content.slice(beforeText.length));
          i2++;
          return true;
        }
      }
      const runInfo = getAsteriskRunInfo(content, openIdx);
      if (runInfo.len >= 3) {
        const closeIndex = findTripleAsteriskClose(content, openIdx + runInfo.len);
        if (closeIndex !== -1) {
          const inner$1 = content.slice(openIdx + runInfo.len, closeIndex);
          if (isTripleAsteriskInnerText(inner$1)) {
            const { node: node$1 } = parseStrongToken([
              {
                type: "strong_open",
                tag: "strong",
                content: "",
                markup: "**",
                info: "",
                meta: null
              },
              {
                type: "em_open",
                tag: "em",
                content: "",
                markup: "*",
                info: "",
                meta: null
              },
              {
                type: "text",
                tag: "",
                content: inner$1,
                markup: "",
                info: "",
                meta: null
              },
              {
                type: "em_close",
                tag: "em",
                content: "",
                markup: "*",
                info: "",
                meta: null
              },
              {
                type: "strong_close",
                tag: "strong",
                content: "",
                markup: "**",
                info: "",
                meta: null
              }
            ], 0, raw, options);
            resetCurrentTextNode();
            pushNode(node$1);
            const afterContent = content.slice(closeIndex + 3);
            if (afterContent) {
              handleToken({
                type: "text",
                content: afterContent,
                raw: afterContent
              });
              i2--;
            }
            i2++;
            return true;
          }
        }
      }
      if (!isStrongOpenDelimiter(content, openIdx)) {
        const literalRun = content.slice(openIdx, openIdx + runInfo.len);
        pushText(literalRun, literalRun);
        const afterContent = content.slice(openIdx + runInfo.len);
        if (afterContent) {
          handleToken({
            type: "text",
            content: afterContent,
            raw: afterContent
          });
          i2--;
        }
        i2++;
        return true;
      }
      const close = findNextStrongClose(content, openIdx + 2);
      let inner = "";
      let after = "";
      if (close.index !== -1) {
        inner = content.slice(openIdx + 2, close.index);
        after = content.slice(close.index + 2);
        const closeIdx = close.index;
        const closeRunInfo = getAsteriskRunInfo(content, closeIdx);
        if (runInfo.intraword && closeRunInfo.intraword && !isWordOnly(inner)) {
          pushText(content.slice(beforeText.length), content.slice(beforeText.length));
          i2++;
          return true;
        }
        if (!inner && runInfo.len >= 4 && runInfo.intraword) {
          pushText(content.slice(beforeText.length), content.slice(beforeText.length));
          i2++;
          return true;
        }
      } else {
        if (requireClosingStrong || close.sawInvalidClose) {
          pushText(content.slice(beforeText.length), content.slice(beforeText.length));
          i2++;
          return true;
        }
        if (runInfo.intraword) {
          pushText(content.slice(beforeText.length), content.slice(beforeText.length));
          i2++;
          return true;
        }
        inner = content.slice(openIdx + 2);
        after = "";
      }
      if (!inner && /^\*+$/.test(after)) {
        pushText(content, content);
        i2++;
        return true;
      }
      const { node } = parseStrongToken([
        {
          type: "strong_open",
          tag: "strong",
          content: "",
          markup: "**",
          info: "",
          meta: null
        },
        {
          type: "text",
          tag: "",
          content: inner,
          markup: "",
          info: "",
          meta: null
        },
        {
          type: "strong_close",
          tag: "strong",
          content: "",
          markup: "**",
          info: "",
          meta: null
        }
      ], 0, raw, options);
      resetCurrentTextNode();
      pushNode(node);
      if (after) {
        handleToken({
          type: "text",
          content: after,
          raw: after
        });
        i2--;
      }
      i2++;
      return true;
    }
    if (nextMarker.type === "emphasis") {
      let idx = nextMarker.index;
      if (idx === -1) idx = 0;
      const _text = content.slice(0, idx);
      if (_text) pushText(_text, _text);
      if (!isEmphasisOpenDelimiter(content, idx)) {
        pushText(content[idx], content[idx]);
        const afterContent = content.slice(idx + 1);
        if (afterContent) {
          handleToken({
            type: "text",
            content: afterContent,
            raw: afterContent
          });
          i2--;
        }
        i2++;
        return true;
      }
      const runInfo = getAsteriskRunInfo(content, idx);
      const close = findNextUnescapedEmphasisClose(rawSource, content, idx + 1);
      const closeIndex = close.index;
      const nextInlineToken = tokens[i2 + 1];
      if ((options == null ? void 0 : options.final) && (nextInlineToken == null ? void 0 : nextInlineToken.type) === "em_open" && closeIndex !== -1 && content.slice(idx + 1, closeIndex).trim() !== content.slice(idx + 1, closeIndex)) {
        pushText(content.slice(idx), content.slice(idx));
        i2++;
        return true;
      }
      if (closeIndex === -1 && (close.sawInvalidClose || (options == null ? void 0 : options.final) || runInfo.intraword || !isWordChar(content[idx + 1]))) {
        pushText(content.slice(idx), content.slice(idx));
        i2++;
        return true;
      }
      const { node } = parseEmphasisToken([
        {
          type: "em_open",
          tag: "em",
          content: "",
          markup: "*",
          info: "",
          meta: null
        },
        {
          type: "text",
          tag: "",
          content: closeIndex > -1 ? content.slice(idx + 1, closeIndex) : content.slice(idx + 1),
          markup: "",
          info: "",
          meta: null
        },
        {
          type: "em_close",
          tag: "em",
          content: "",
          markup: "*",
          info: "",
          meta: null
        }
      ], 0, options);
      resetCurrentTextNode();
      pushNode(node);
      if (closeIndex !== -1 && closeIndex < content.length - 1) {
        const afterContent = content.slice(closeIndex + 1);
        if (afterContent) {
          handleToken({
            type: "text",
            content: afterContent,
            raw: afterContent
          });
          i2--;
        }
      }
      i2++;
      return true;
    }
    return false;
  }
  function handleInlineCodeContent(content, _token) {
    if (!content.includes("`")) return false;
    const findFirstUnescapedBacktick = (src) => {
      for (let idx = 0; idx < src.length; idx++) {
        if (src[idx] !== "`") continue;
        let slashCount = 0;
        for (let j = idx - 1; j >= 0 && src[j] === "\\"; j--) slashCount++;
        if (slashCount % 2 === 0) return idx;
      }
      return -1;
    };
    const codeStart = findFirstUnescapedBacktick(content);
    if (codeStart === -1) return false;
    let runLen = 1;
    for (let k = codeStart + 1; k < content.length && content[k] === "`"; k++) runLen++;
    const closingSeq = "`".repeat(runLen);
    const searchFrom = codeStart + runLen;
    const codeEnd = content.indexOf(closingSeq, searchFrom);
    if (codeEnd === -1) {
      if (runLen === 1) {
        const beforeText$1 = content.slice(0, codeStart);
        const codeContent$1 = content.slice(codeStart + 1);
        if (beforeText$1) if (!handleEmphasisAndStrikethrough(beforeText$1, _token)) pushText(beforeText$1, beforeText$1);
        else i2--;
        pushParsed({
          type: "inline_code",
          code: codeContent$1,
          raw: String(codeContent$1)
        });
        i2++;
        return true;
      }
      let merged = content;
      for (let j = i2 + 1; j < tokens.length; j++) merged += String((tokens[j].content ?? "") + (tokens[j].markup ?? ""));
      i2 = tokens.length - 1;
      pushText(merged, merged);
      i2++;
      return true;
    }
    resetCurrentTextNode();
    const beforeText = content.slice(0, codeStart);
    const codeContent = content.slice(codeStart + runLen, codeEnd);
    const after = content.slice(codeEnd + runLen);
    if (beforeText) if (!handleEmphasisAndStrikethrough(beforeText, _token)) pushText(beforeText, beforeText);
    else i2--;
    pushParsed({
      type: "inline_code",
      code: codeContent,
      raw: String(codeContent ?? "")
    });
    if (after) {
      handleToken({
        type: "text",
        content: after,
        raw: after
      });
      i2--;
    }
    i2++;
    return true;
  }
  function tryReparseCollapsedInlineText(rawContent) {
    var _a3, _b;
    const md = internalOptions == null ? void 0 : internalOptions.__markdownIt;
    if (!md) return null;
    if (tokens.length <= 1 || !tokens.some((token) => (token == null ? void 0 : token.type) === "math_inline")) return null;
    if (!INLINE_REPARSE_MARKER_RE.test(rawContent)) return null;
    const reparsed = md.parseInline(rawContent, { __markstreamFinal: !!(options == null ? void 0 : options.final) });
    if (!Array.isArray(reparsed) || reparsed.length === 0) return null;
    const children = (((_a3 = reparsed.find((token) => (token == null ? void 0 : token.type) === "inline")) == null ? void 0 : _a3.children) ?? []).filter((child) => !((child == null ? void 0 : child.type) === "text" && String(child.content ?? "") === ""));
    if (!children.length) return null;
    if (!children.some((child) => (child == null ? void 0 : child.type) !== "text")) return null;
    if (children.length === 1 && ((_b = children[0]) == null ? void 0 : _b.type) === "text" && String(children[0].content ?? "") === rawContent) return null;
    const reparsedNodes = parseInlineTokens(children, rawContent, pPreToken, options);
    return reparsedNodes.length ? reparsedNodes : null;
  }
  function pushParsed(node) {
    resetCurrentTextNode();
    result.push(node);
  }
  function pushToken(token) {
    resetCurrentTextNode();
    result.push(token);
  }
  function pushNode(node) {
    pushParsed(node);
  }
  function pushText(content, raw$1) {
    if (currentTextNode) {
      currentTextNode.content += content;
      currentTextNode.raw += raw$1 ?? content;
    } else {
      currentTextNode = {
        type: "text",
        content: String(content ?? ""),
        raw: String(raw$1 ?? content ?? "")
      };
      result.push(currentTextNode);
    }
  }
  function pushInlineTextContent(content, token) {
    var _a3;
    if (!content) return;
    const parsed = parseInlineTokens([{
      ...token,
      type: "text",
      content,
      raw: content
    }], content, pPreToken, options);
    if (parsed.length === 1 && ((_a3 = parsed[0]) == null ? void 0 : _a3.type) === "text") {
      const text$1 = parsed[0];
      pushText(String(text$1.content ?? ""), String(text$1.raw ?? text$1.content ?? ""));
      return;
    }
    for (const node of parsed) pushNode(node);
  }
  function hasEscapedMarkup(token, escapedPrefix) {
    return String(token.markup ?? "").startsWith(escapedPrefix);
  }
  function isMarkdownLinkBeforeLinkifiedUrl(content) {
    var _a3, _b, _c, _d, _e, _f;
    if (!content.endsWith("](")) return false;
    return ((_a3 = tokens[i2 + 1]) == null ? void 0 : _a3.type) === "link_open" && ((_b = tokens[i2 + 1]) == null ? void 0 : _b.markup) === "linkify" && ((_c = tokens[i2 + 2]) == null ? void 0 : _c.type) === "text" && ((_d = tokens[i2 + 3]) == null ? void 0 : _d.type) === "link_close" && ((_e = tokens[i2 + 4]) == null ? void 0 : _e.type) === "text" && String(((_f = tokens[i2 + 4]) == null ? void 0 : _f.content) ?? "").startsWith(")");
  }
  function stripTrailingMidStateMarker(content, token) {
    let nextContent = content;
    const rawTokenContent = String(token.content ?? "");
    if (nextContent.endsWith("\\") && !hasEscapedMarkup(token, "\\\\") && !rawTokenContent.endsWith("\\\\")) nextContent = nextContent.slice(0, -1);
    if (nextContent.endsWith("(") && !hasEscapedMarkup(token, "\\(") && !rawTokenContent.endsWith("\\(")) nextContent = nextContent.slice(0, -1);
    if (/\*+$/.test(nextContent) && !hasEscapedMarkup(token, "\\*") && !rawTokenContent.endsWith("\\*")) nextContent = nextContent.replace(/\*+$/, "");
    return nextContent;
  }
  while (i2 < tokens.length) {
    const token = tokens[i2];
    handleToken(token);
  }
  function handleToken(token) {
    var _a3, _b;
    switch (token.type) {
      case "text":
        handleTextToken(token);
        break;
      case "softbreak":
        if (currentTextNode) {
          currentTextNode.content += "\n";
          currentTextNode.raw += "\n";
        } else {
          currentTextNode = {
            type: "text",
            content: "\n",
            raw: "\n"
          };
          result.push(currentTextNode);
        }
        i2++;
        break;
      case "code_inline":
        pushNode(parseInlineCodeToken(token));
        i2++;
        break;
      case "html_inline": {
        const [node, index] = parseHtmlInlineCodeToken(token, tokens, i2, parseInlineTokens, raw, pPreToken, options);
        pushNode(node);
        i2 = index;
        break;
      }
      case "link_open":
        handleLinkOpen(token);
        break;
      case "image":
        if (!recoverOuterImageLinkStartFromImageToken(token)) {
          resetCurrentTextNode();
          pushNode(parseImageToken(token));
          i2++;
        }
        break;
      case "strong_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseStrongToken(tokens, i2, token.content, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "em_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseEmphasisToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "s_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseStrikethroughToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "mark_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseHighlightToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "ins_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseInsertToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "sub_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseSubscriptToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "sup_open": {
        resetCurrentTextNode();
        const { node, nextIndex } = parseSuperscriptToken(tokens, i2, options);
        pushNode(node);
        i2 = nextIndex;
        break;
      }
      case "sub":
        resetCurrentTextNode();
        pushNode({
          type: "subscript",
          children: [{
            type: "text",
            content: String(token.content ?? ""),
            raw: String(token.content ?? "")
          }],
          raw: `~${String(token.content ?? "")}~`
        });
        i2++;
        break;
      case "sup":
        resetCurrentTextNode();
        pushNode({
          type: "superscript",
          children: [{
            type: "text",
            content: String(token.content ?? ""),
            raw: String(token.content ?? "")
          }],
          raw: `^${String(token.content ?? "")}^`
        });
        i2++;
        break;
      case "emoji": {
        resetCurrentTextNode();
        const preToken = tokens[i2 - 1];
        if ((preToken == null ? void 0 : preToken.type) === "text" && /\|:-+/.test(String(preToken.content ?? ""))) pushText("", "");
        else pushNode(parseEmojiToken(token));
        i2++;
        break;
      }
      case "checkbox":
        resetCurrentTextNode();
        pushNode(parseCheckboxToken(token));
        i2++;
        break;
      case "checkbox_input":
        resetCurrentTextNode();
        pushNode(parseCheckboxInputToken(token));
        i2++;
        break;
      case "footnote_ref":
        resetCurrentTextNode();
        pushNode(parseFootnoteRefToken(token));
        i2++;
        break;
      case "footnote_anchor": {
        resetCurrentTextNode();
        const meta = token.meta ?? {};
        pushParsed({
          type: "footnote_anchor",
          id: String(meta.label ?? token.content ?? ""),
          raw: String(token.content ?? "")
        });
        i2++;
        break;
      }
      case "hardbreak":
        resetCurrentTextNode();
        pushNode(parseHardbreakToken());
        i2++;
        break;
      case "fence":
        resetCurrentTextNode();
        pushNode(parseFenceToken(tokens[i2]));
        i2++;
        break;
      case "math_inline":
        resetCurrentTextNode();
        if (!token.content && token.markup === "$" && ((_a3 = tokens[i2 + 1]) == null ? void 0 : _a3.type) === "text" && ((_b = tokens[i2 + 2]) == null ? void 0 : _b.type) === "math_inline") {
          pushNode(parseMathInlineToken({
            ...token,
            content: tokens[i2 + 1].content
          }));
          i2 += 2;
        } else pushNode(parseMathInlineToken(token));
        i2++;
        break;
      case "reference":
        handleReference(token);
        break;
      case "text_special":
        pushText(String(token.content ?? ""), String(token.content ?? ""));
        i2++;
        break;
      default: {
        const syntheticLink = token;
        if (token.type === "link" && syntheticLink.href != null && (options == null ? void 0 : options.validateLink) && !options.validateLink(String(syntheticLink.href))) {
          resetCurrentTextNode();
          const displayText = String(syntheticLink.text ?? "");
          pushText(displayText, displayText);
          i2++;
        } else if (recoverOuterImageLinkFromSyntheticLinkToken(token)) i2++;
        else if (recoverMarkdownImageFromTrailingBang(token)) i2++;
        else if (recoverMarkdownLinkFromTrailingText(token)) i2++;
        else {
          pushToken(token);
          i2++;
        }
        break;
      }
    }
  }
  function commitTextNode(content, token, preToken, nextToken) {
    var _a3;
    const textNode = parseTextToken({
      ...token,
      content
    });
    if (currentTextNode) {
      currentTextNode.content += stripTrailingMidStateMarker(textNode.content, token);
      currentTextNode.raw += textNode.raw;
      return;
    }
    const maybeMath = (preToken == null ? void 0 : preToken.tag) === "br" && ((_a3 = tokens[i2 - 2]) == null ? void 0 : _a3.content) === "[";
    if (!nextToken) textNode.content = stripTrailingMidStateMarker(textNode.content, token);
    currentTextNode = textNode;
    currentTextNode.center = maybeMath;
    result.push(currentTextNode);
  }
  function handleTextToken(token) {
    var _a3, _b, _c, _d;
    const rawContent = String(token.content ?? "");
    const rawSource = tokens.length === 1 && rawContent.includes("\\") && typeof raw === "string" ? String(raw) : "";
    let content = rawSource ? decodeVisibleTextFromRaw(rawSource) : rawContent.replace(ESCAPED_PUNCTUATION_RE, "$1");
    if (token.content === "<" || content === "1" && ((_a3 = tokens[i2 - 1]) == null ? void 0 : _a3.tag) === "br") {
      i2++;
      return;
    }
    const dollarIndex = content.indexOf("$");
    if (dollarIndex !== -1 && dollarIndex === content.lastIndexOf("$") && content.endsWith("$")) content = content.slice(0, -1);
    if (content.endsWith("undefined") && !(raw == null ? void 0 : raw.endsWith("undefined"))) content = content.slice(0, -9);
    let trailingTextStart = result.length;
    let trailingTextContent = "";
    for (let index = result.length - 1; index >= 0; index--) {
      const item = result[index];
      if (item.type !== "text") break;
      trailingTextStart = index;
      trailingTextContent = String(item.content ?? "") + trailingTextContent;
    }
    if (trailingTextStart < result.length) if (content.startsWith(trailingTextContent)) {
      currentTextNode = null;
      result.length = trailingTextStart;
    } else currentTextNode = result[result.length - 1];
    const nextToken = tokens[i2 + 1];
    if ((pPreToken == null ? void 0 : pPreToken.type) === "list_item_open" && /^\d$/.test(content)) {
      i2++;
      return;
    }
    if ((content === "`" || content === "|" || content === "$") && !hasEscapedMarkup(token, `\\${content}`) || /^\*+$/.test(content) && !hasEscapedMarkup(token, "\\*")) {
      i2++;
      return;
    }
    if (!nextToken && /[^\]]\s*\(\s*$/.test(content)) content = content.replace(/\(\s*$/, "");
    if (!content) {
      i2++;
      return;
    }
    if (recoverOuterImageLinkFromRawText(content)) return;
    if (recoverOuterImageLinkMidStateFromText(content)) return;
    if (!(content.includes("*") || content.includes("_") || content.includes("~") || content.includes("`") || content.includes("[") || content.includes("!") || content.includes("$") || content.includes("|") || content.includes("("))) {
      commitTextNode(content, token, tokens[i2 - 1], nextToken);
      i2++;
      return;
    }
    if (handleCheckboxLike(content)) return;
    const preToken = tokens[i2 - 1];
    if (content === "[" && !((_b = nextToken == null ? void 0 : nextToken.markup) == null ? void 0 : _b.includes("*")) && !hasEscapedMarkup(token, "\\[") || content === "]" && !((_c = preToken == null ? void 0 : preToken.markup) == null ? void 0 : _c.includes("*")) && !hasEscapedMarkup(token, "\\]")) {
      i2++;
      return;
    }
    if (handleInlineCodeContent(rawContent, token)) return;
    if (handleInlineImageContent(content)) return;
    if ((((_d = tokens[i2 + 1]) == null ? void 0 : _d.type) !== "link_open" || isMarkdownLinkBeforeLinkifiedUrl(content)) && handleInlineLinkContent(content, token)) return;
    const reparsedNodes = tryReparseCollapsedInlineText(rawContent);
    if (reparsedNodes) {
      resetCurrentTextNode();
      for (const node of reparsedNodes) pushNode(node);
      i2++;
      return;
    }
    if (handleEmphasisAndStrikethrough(content, token)) return;
    commitTextNode(content, token, preToken, nextToken);
    i2++;
  }
  function handleLinkOpen(token) {
    var _a3, _b, _c;
    if (shouldTreatLinkOpenAsTextInEscapedOuterImageTail()) {
      const { node: node$1, nextIndex: nextIndex$1 } = parseLinkToken(tokens, i2, options);
      const text$1 = String(node$1.text || node$1.href || "");
      pushText(text$1, text$1);
      i2 = nextIndex$1;
      return;
    }
    resetCurrentTextNode();
    const { node, nextIndex } = parseLinkToken(tokens, i2, options);
    i2 = nextIndex;
    if (token.markup === "linkify" && shouldDemoteFilenameLikeLinkify(node.text || node.href || "")) {
      pushText(node.text || node.href || "", node.text || node.href || "");
      return;
    }
    const hasSingleTextChild = node.children.length === 1 && ((_a3 = node.children[0]) == null ? void 0 : _a3.type) === "text";
    if (node.loading && raw && node.text === node.href && hasSingleTextChild) {
      const recoveredLabel = recoverTrailingMarkdownLinkLabel(raw, node.href);
      if (recoveredLabel) {
        node.text = recoveredLabel;
        node.children = [{
          type: "text",
          content: recoveredLabel,
          raw: recoveredLabel
        }];
        node.raw = String(`[${recoveredLabel}](${node.href}${node.title ? ` "${node.title}"` : ""})`);
      }
    }
    if ((options == null ? void 0 : options.validateLink) && !options.validateLink(node.href)) {
      pushText(node.text, node.text);
      return;
    }
    const hrefAttr = (_c = (_b = token.attrs) == null ? void 0 : _b.find(([name]) => name === "href")) == null ? void 0 : _c[1];
    const hrefStr = String(hrefAttr ?? "");
    if (raw && hrefStr) {
      const openIdx = raw.indexOf("](");
      if (openIdx === -1) {
      } else {
        const closeIdx = raw.indexOf(")", openIdx + 2);
        if (closeIdx === -1) node.loading = true;
        else if (node.loading) {
          if (raw.slice(openIdx + 2, closeIdx).includes(hrefStr)) node.loading = false;
        }
      }
    }
    if (recoverMarkdownLinkFromTrailingText(node)) return;
    pushParsed(node);
  }
  function handleReference(token) {
    resetCurrentTextNode();
    pushNode(parseReferenceToken(token));
    i2++;
  }
  function recoverMarkdownLinkFromTrailingText(token) {
    if (token.type !== "link") return false;
    const previous = result[result.length - 1];
    if (!previous || previous.type !== "text") return false;
    const match2 = String(previous.content ?? "").match(/^([^[]*)\[([^\]\n]+)\]\($/);
    if (!match2) return false;
    const linkToken = token;
    const href = String(linkToken.href ?? "");
    const linkText = String(linkToken.text ?? "");
    const label = String(match2[2] ?? "");
    const visibleHref = href.replace(/^(?:https?:\/\/|mailto:|ftp:\/\/)/i, "");
    if (!href || !(linkText === href || linkText === visibleHref || isLikelyUrl(linkText))) return false;
    const before = String(match2[1] ?? "");
    if (before) {
      previous.content = before;
      previous.raw = before;
    } else result.pop();
    pushParsed({
      ...token,
      text: label,
      children: [{
        type: "text",
        content: label,
        raw: label
      }],
      raw: String(`[${label}](${href}${linkToken.title ? ` "${linkToken.title}"` : ""})`)
    });
    return true;
  }
  function recoverMarkdownImageFromTrailingBang(token) {
    var _a3;
    if (token.type !== "link") return false;
    const previous = result[result.length - 1];
    const previousToken = tokens[i2 - 1];
    if (!previous || previous.type !== "text" || (previousToken == null ? void 0 : previousToken.type) !== "text") return false;
    const previousContent = String(previous.content ?? "");
    const previousTokenContent = String(previousToken.content ?? "");
    if (!previousContent.endsWith("!") || !previousTokenContent.endsWith("!")) return false;
    if (hasEscapedMarkup(previousToken, "\\!")) return false;
    const before = previousContent.slice(0, -1);
    if (before) {
      previous.content = before;
      previous.raw = before;
      currentTextNode = previous;
    } else {
      result.pop();
      currentTextNode = null;
    }
    const linkToken = token;
    const alt = String(linkToken.text ?? ((_a3 = linkToken.children) == null ? void 0 : _a3.map((child) => String((child == null ? void 0 : child.content) ?? (child == null ? void 0 : child.raw) ?? "")).join("")) ?? "");
    const href = String(linkToken.href ?? "");
    const title = linkToken.title == null || linkToken.title === "" ? null : String(linkToken.title);
    pushParsed({
      type: "image",
      src: href,
      alt,
      title,
      raw: String(`![${alt}](${href}${title ? ` "${title}"` : ""})`),
      loading: Boolean(linkToken.loading)
    });
    return true;
  }
  function buildLoadingOuterImageLinkNode(imageNode, href = "", title = null) {
    const text$1 = String(imageNode.alt ?? imageNode.raw ?? "");
    return {
      type: "link",
      href,
      title,
      text: text$1,
      children: [imageNode],
      raw: String(`[${text$1}](${href}${title ? ` "${title}"` : ""})`),
      loading: true
    };
  }
  function buildLoadingImageNodeFromRaw(raw$1) {
    const normalizedRaw = raw$1.startsWith("![") ? raw$1 : `![${raw$1}`;
    const innerRaw = normalizedRaw.slice(2);
    const closeIdx = innerRaw.indexOf("](");
    return {
      type: "image",
      src: "",
      alt: closeIdx === -1 ? innerRaw.replace(/\]$/, "") : innerRaw.slice(0, closeIdx),
      title: null,
      raw: normalizedRaw,
      loading: true
    };
  }
  function recoverOuterImageLinkFromRawText(content) {
    const outerStart = content.indexOf("[![");
    if (outerStart === -1) return false;
    if (typeof raw === "string" && tokens.length === 1 && isEscapedVisibleChar(raw, outerStart, "[")) return false;
    const before = content.slice(0, outerStart);
    if (before) pushText(before, before);
    pushParsed(buildLoadingOuterImageLinkNode(buildLoadingImageNodeFromRaw(content.slice(outerStart + 1))));
    i2++;
    return true;
  }
  function recoverOuterImageLinkStartFromImageToken(token) {
    if (options == null ? void 0 : options.final) return false;
    const previousToken = tokens[i2 - 1];
    if ((previousToken == null ? void 0 : previousToken.type) !== "text") return false;
    if (!String(previousToken.content ?? "").endsWith("[")) return false;
    if (hasEscapedMarkup(previousToken, "\\[")) return false;
    const previous = result[result.length - 1];
    if ((previous == null ? void 0 : previous.type) === "text" && previous.content.endsWith("[")) {
      const before = previous.content.slice(0, -1);
      if (before) {
        previous.content = before;
        previous.raw = before;
        currentTextNode = previous;
      } else {
        result.pop();
        currentTextNode = null;
      }
    }
    pushParsed(buildLoadingOuterImageLinkNode(parseImageToken(token)));
    i2++;
    return true;
  }
  function recoverOuterImageLinkFromSyntheticLinkToken(token) {
    if (token.type !== "link") return false;
    const linkToken = token;
    const raw$1 = String(linkToken.raw ?? "");
    const text$1 = String(linkToken.text ?? "");
    if (!raw$1.startsWith("[![") && !text$1.startsWith("![")) return false;
    const imageTitle = linkToken.title == null || linkToken.title === "" ? null : String(linkToken.title);
    pushParsed(buildLoadingOuterImageLinkNode({
      type: "image",
      src: String(linkToken.href ?? ""),
      alt: text$1.replace(/^!\[/, "").replace(/\]$/, ""),
      title: imageTitle,
      raw: raw$1.startsWith("[![") ? raw$1.slice(1) : raw$1,
      loading: true
    }));
    return true;
  }
  function recoverOuterImageLinkMidStateFromText(content) {
    var _a3;
    if (!content.startsWith("](")) return false;
    const outerOpenToken = tokens[i2 - 2];
    if ((outerOpenToken == null ? void 0 : outerOpenToken.type) === "text" && String(outerOpenToken.content ?? "").endsWith("[") && hasEscapedMarkup(outerOpenToken, "\\[")) return false;
    const previous = result[result.length - 1];
    if ((previous == null ? void 0 : previous.type) !== "image" && (previous == null ? void 0 : previous.type) !== "link") return false;
    const previousWithChildren = previous;
    const previousLink = (previous == null ? void 0 : previous.type) === "link" && Array.isArray(previousWithChildren.children) && previousWithChildren.children.length === 1 && ((_a3 = previousWithChildren.children[0]) == null ? void 0 : _a3.type) === "image" ? result.pop() : null;
    const imageNode = previousLink ? previousLink.children[0] : result.pop();
    if (!imageNode || imageNode.type !== "image") return false;
    const nextToken = tokens[i2 + 1];
    let href = String((previousLink == null ? void 0 : previousLink.href) ?? "");
    let title = (previousLink == null ? void 0 : previousLink.title) == null ? null : String(previousLink.title);
    let loading = true;
    if ((nextToken == null ? void 0 : nextToken.type) === "link_open") {
      const { node, nextIndex } = parseLinkToken(tokens, i2 + 1, options);
      href = node.href;
      title = node.title;
      loading = true;
      i2 = nextIndex;
    } else {
      href = content.slice(2);
      if (href.includes('"')) {
        const parts = href.split('"');
        href = String(parts[0] ?? "").trim();
        title = parts[1] == null ? null : String(parts[1]).trim();
      }
      i2++;
    }
    const linkNode = buildLoadingOuterImageLinkNode(imageNode, href, title);
    linkNode.loading = loading;
    pushParsed(linkNode);
    return true;
  }
  function shouldTreatLinkOpenAsTextInEscapedOuterImageTail() {
    var _a3, _b;
    const outerOpenToken = tokens[i2 - 3];
    return ((_a3 = tokens[i2 - 2]) == null ? void 0 : _a3.type) === "image" && ((_b = tokens[i2 - 1]) == null ? void 0 : _b.type) === "text" && String(tokens[i2 - 1].content ?? "") === "](" && (outerOpenToken == null ? void 0 : outerOpenToken.type) === "text" && String(outerOpenToken.content ?? "").endsWith("[") && hasEscapedMarkup(outerOpenToken, "\\[");
  }
  function handleInlineLinkContent(content, _token) {
    const linkStart = content.indexOf("[");
    if (linkStart === -1) return false;
    let textNodeContent = content.slice(0, linkStart);
    const linkEnd = content.indexOf("](", linkStart);
    if (linkEnd !== -1) {
      const textToken$1 = tokens[i2 + 2];
      let text$1 = content.slice(linkStart + 1, linkEnd);
      if (text$1.includes("[")) {
        const secondLinkStart = text$1.indexOf("[");
        textNodeContent += content.slice(0, linkStart + secondLinkStart + 1);
        const newLinkStart = linkStart + secondLinkStart + 1;
        text$1 = content.slice(newLinkStart + 1, linkEnd);
      }
      const nextToken = tokens[i2 + 1];
      if (content.endsWith("](") && (nextToken == null ? void 0 : nextToken.type) === "link_open" && textToken$1) {
        const last = tokens[i2 + 4];
        let index = 4;
        let loading$1 = true;
        if ((last == null ? void 0 : last.type) === "text") {
          const lastContent = String(last.content ?? "");
          if (lastContent.startsWith(")")) {
            loading$1 = false;
            const trailing = lastContent.slice(1);
            if (trailing) {
              last.content = trailing;
              last.raw = trailing;
            } else index++;
          } else if (lastContent === ".") i2++;
        }
        pushInlineTextContent(textNodeContent, _token);
        const hrefFromToken = String(textToken$1.content ?? "");
        if ((options == null ? void 0 : options.validateLink) && !options.validateLink(hrefFromToken)) pushText(text$1, text$1);
        else pushParsed({
          type: "link",
          href: hrefFromToken,
          title: null,
          text: text$1,
          children: [{
            type: "text",
            content: text$1,
            raw: text$1
          }],
          loading: loading$1
        });
        i2 += index;
        return true;
      }
      const linkContentEnd = content.indexOf(")", linkEnd);
      const href = linkContentEnd !== -1 ? content.slice(linkEnd + 2, linkContentEnd) : "";
      const loading = linkContentEnd === -1;
      let emphasisMatch = textNodeContent.match(/\*+$/);
      if (emphasisMatch) textNodeContent = textNodeContent.replace(/\*+$/, "");
      pushInlineTextContent(textNodeContent, _token);
      if (!emphasisMatch) emphasisMatch = text$1.match(/^\*+/);
      if (!requireClosingStrong && emphasisMatch) {
        const type = emphasisMatch[0].length;
        text$1 = text$1.replace(/^\*+/, "").replace(/\*+$/, "");
        const newTokens = [];
        if (type === 1) newTokens.push({
          type: "em_open",
          tag: "em",
          nesting: 1
        });
        else if (type === 2) newTokens.push({
          type: "strong_open",
          tag: "strong",
          nesting: 1
        });
        else if (type === 3) {
          newTokens.push({
            type: "strong_open",
            tag: "strong",
            nesting: 1
          });
          newTokens.push({
            type: "em_open",
            tag: "em",
            nesting: 1
          });
        }
        newTokens.push({
          type: "link",
          href,
          title: null,
          text: text$1,
          children: [{
            type: "text",
            content: text$1,
            raw: text$1
          }],
          loading
        });
        if (type === 1) {
          newTokens.push({
            type: "em_close",
            tag: "em",
            nesting: -1
          });
          const { node } = parseEmphasisToken(newTokens, 0, options);
          pushNode(node);
        } else if (type === 2) {
          newTokens.push({
            type: "strong_close",
            tag: "strong",
            nesting: -1
          });
          const { node } = parseStrongToken(newTokens, 0, void 0, options);
          pushNode(node);
        } else if (type === 3) {
          newTokens.push({
            type: "em_close",
            tag: "em",
            nesting: -1
          });
          newTokens.push({
            type: "strong_close",
            tag: "strong",
            nesting: -1
          });
          const { node } = parseStrongToken(newTokens, 0, void 0, options);
          pushNode(node);
        } else {
          const { node } = parseEmphasisToken(newTokens, 0, options);
          pushNode(node);
        }
      } else if ((options == null ? void 0 : options.validateLink) && !options.validateLink(href)) pushText(text$1, text$1);
      else pushParsed({
        type: "link",
        href,
        title: null,
        text: text$1,
        children: [{
          type: "text",
          content: text$1,
          raw: text$1
        }],
        loading
      });
      const afterText = linkContentEnd !== -1 ? content.slice(linkContentEnd + 1) : "";
      if (afterText) {
        handleToken({
          type: "text",
          content: afterText,
          raw: afterText
        });
        i2--;
      }
      i2++;
      return true;
    }
    return false;
  }
  function handleInlineImageContent(content) {
    const imageStart = content.indexOf("![");
    if (imageStart === -1) return false;
    const textNodeContent = content.slice(0, imageStart);
    if (textNodeContent && !currentTextNode) currentTextNode = {
      type: "text",
      content: textNodeContent,
      raw: textNodeContent
    };
    else if (textNodeContent && currentTextNode) currentTextNode.content += textNodeContent;
    if (currentTextNode) {
      result.push(currentTextNode);
      currentTextNode = null;
    }
    pushParsed(buildLoadingImageNodeFromRaw(content.slice(imageStart)));
    i2++;
    return true;
  }
  function handleCheckboxLike(content) {
    if (!((content == null ? void 0 : content.startsWith("[")) && (pPreToken == null ? void 0 : pPreToken.type) === "list_item_open")) return false;
    const w = content.slice(1).match(/[^\s\]]/);
    if (w === null) {
      i2++;
      return true;
    }
    if (w && /x/i.test(w[0])) {
      const checked = w[0] === "x" || w[0] === "X";
      pushParsed({
        type: "checkbox_input",
        checked,
        raw: checked ? "[x]" : "[ ]"
      });
      i2++;
      return true;
    }
    return false;
  }
  return result;
}
function trimInlineTokenTail(token) {
  const rawContent = String(token.content ?? "");
  const trimmed = rawContent.replace(/[ \t\r\n]+$/g, "");
  if (trimmed === rawContent) return;
  token.content = trimmed;
  const children = token.children;
  if (!Array.isArray(children) || children.length === 0) return;
  while (children.length) {
    const last = children[children.length - 1];
    if (!last) {
      children.pop();
      continue;
    }
    if (last.type === "softbreak" || last.type === "hardbreak") {
      children.pop();
      continue;
    }
    if (last.type === "text") {
      const lastContent = String(last.content ?? "");
      const next = lastContent.replace(/[ \t\r\n]+$/g, "");
      if (next === lastContent) break;
      if (next) {
        last.content = next;
        break;
      }
      children.pop();
      continue;
    }
    break;
  }
}
function stripLeakedOrderedListMarkerSuffix(token) {
  const rawContent = String(token.content ?? "");
  const leak = rawContent.match(/\r?\n\s*\d+[.)]?\s*$/);
  if (!leak || typeof leak.index !== "number") return;
  token.content = rawContent.slice(0, leak.index);
  const children = token.children;
  if (!Array.isArray(children) || children.length === 0) return;
  while (children.length) {
    const last = children[children.length - 1];
    if (!last) {
      children.pop();
      continue;
    }
    if (last.type === "softbreak" || last.type === "hardbreak") {
      children.pop();
      continue;
    }
    if (last.type === "text") {
      const lastContent = String(last.content ?? "");
      if (/^[ \t\r\n\d.)]*$/.test(lastContent)) {
        children.pop();
        continue;
      }
      const next = lastContent.replace(/[ \t\r\n\d.)]+$/g, "");
      if (next !== lastContent) if (next) last.content = next;
      else children.pop();
    }
    break;
  }
}
function parseList(tokens, index, options) {
  const token = tokens[index];
  const listItems = [];
  let j = index + 1;
  while (j < tokens.length && tokens[j].type !== "bullet_list_close" && tokens[j].type !== "ordered_list_close") if (tokens[j].type === "list_item_open") {
    const itemChildren = [];
    let k = j + 1;
    while (k < tokens.length && tokens[k].type !== "list_item_close") if (tokens[k].type === "paragraph_open") {
      const contentToken = tokens[k + 1];
      const preToken = tokens[k - 1];
      stripLeakedOrderedListMarkerSuffix(contentToken);
      trimInlineTokenTail(contentToken);
      itemChildren.push({
        type: "paragraph",
        children: parseInlineTokens(contentToken.children || [], String(contentToken.content ?? ""), preToken, options),
        raw: String(contentToken.content ?? "")
      });
      k += 3;
    } else if (tokens[k].type === "blockquote_open") {
      const [blockquoteNode, newIndex] = parseBlockquote(tokens, k, options);
      itemChildren.push(blockquoteNode);
      k = newIndex;
    } else if (tokens[k].type === "bullet_list_open" || tokens[k].type === "ordered_list_open") {
      const [nestedListNode, newIndex] = parseList(tokens, k, options);
      itemChildren.push(nestedListNode);
      k = newIndex;
    } else {
      const handled = parseCommonBlockToken(tokens, k, options, containerTokenHandlers);
      if (handled) {
        itemChildren.push(handled[0]);
        k = handled[1];
      } else k += 1;
    }
    listItems.push({
      type: "list_item",
      children: itemChildren,
      raw: itemChildren.map((child) => child.raw).join("")
    });
    j = k + 1;
  } else j += 1;
  return [{
    type: "list",
    ordered: token.type === "ordered_list_open",
    start: (() => {
      if (token.attrs && token.attrs.length) {
        const found = token.attrs.find((a2) => a2[0] === "start");
        if (found) {
          const parsed = Number(found[1]);
          return Number.isFinite(parsed) && parsed !== 0 ? parsed : 1;
        }
      }
    })(),
    items: listItems,
    raw: listItems.map((item) => item.raw).join("\n")
  }, j + 1];
}
function parseAdmonition(tokens, index, match2, options) {
  const kind = String(match2[1] ?? "note");
  const title = String(match2[2] ?? kind.charAt(0).toUpperCase() + kind.slice(1));
  const admonitionChildren = [];
  let j = index + 1;
  while (j < tokens.length && tokens[j].type !== "container_close") if (tokens[j].type === "paragraph_open") {
    const contentToken = tokens[j + 1];
    if (contentToken) admonitionChildren.push({
      type: "paragraph",
      children: parseInlineTokens(contentToken.children || [], String(contentToken.content ?? ""), void 0, options),
      raw: String(contentToken.content ?? "")
    });
    j += 3;
  } else if (tokens[j].type === "bullet_list_open" || tokens[j].type === "ordered_list_open") {
    const [listNode, newIndex] = parseList(tokens, j, options);
    admonitionChildren.push(listNode);
    j = newIndex;
  } else if (tokens[j].type === "blockquote_open") {
    const [blockquoteNode, newIndex] = parseBlockquote(tokens, j, options);
    admonitionChildren.push(blockquoteNode);
    j = newIndex;
  } else {
    const handled = parseBasicBlockToken(tokens, j, options);
    if (handled) {
      admonitionChildren.push(handled[0]);
      j = handled[1];
    } else j++;
  }
  return [{
    type: "admonition",
    kind,
    title,
    children: admonitionChildren,
    raw: `:::${kind} ${title}
${admonitionChildren.map((child) => child.raw).join("\n")}
:::`
  }, j + 1];
}
var CONTAINER_KINDS = /* @__PURE__ */ new Set([
  "warning",
  "info",
  "note",
  "tip",
  "danger",
  "caution"
]);
function parseContainerInfo(info) {
  let markerEnd = 0;
  while (markerEnd < info.length && markerEnd < 3 && info[markerEnd] === ":") markerEnd++;
  if (markerEnd === 0 || info[markerEnd] === ":") return null;
  const rest = info.slice(markerEnd).trimStart();
  if (!rest) return null;
  const firstWhitespace = rest.search(/\s/);
  const rawKind = (firstWhitespace === -1 ? rest : rest.slice(0, firstWhitespace)).toLowerCase();
  if (!CONTAINER_KINDS.has(rawKind)) return null;
  return {
    kind: rawKind,
    title: firstWhitespace === -1 ? "" : rest.slice(firstWhitespace).trim()
  };
}
function parseContainer(tokens, index, options) {
  const openToken = tokens[index];
  let kind = "note";
  let title = "";
  const typeMatch = openToken.type.match(/^container_(\w+)_open$/);
  if (typeMatch) {
    kind = typeMatch[1];
    const info = String(openToken.info ?? "").trim();
    if (info && !info.startsWith(":::")) {
      if (info.toLowerCase().startsWith(kind)) {
        const maybe = info.slice(kind.length).trim();
        if (maybe) title = maybe;
      }
    }
  } else {
    const parsedInfo = parseContainerInfo(String(openToken.info ?? "").trim());
    if (parsedInfo) {
      kind = parsedInfo.kind;
      title = parsedInfo.title;
    }
  }
  if (!title) title = kind.charAt(0).toUpperCase() + kind.slice(1);
  const children = [];
  let j = index + 1;
  const closeType = new RegExp(`^container_${kind}_close$`);
  while (j < tokens.length && tokens[j].type !== "container_close" && !closeType.test(tokens[j].type)) if (tokens[j].type === "paragraph_open") {
    const contentToken = tokens[j + 1];
    if (contentToken) {
      const childrenArr = contentToken.children || [];
      let i2 = -1;
      for (let k = childrenArr.length - 1; k >= 0; k--) {
        const t2 = childrenArr[k];
        if (t2.type === "text" && /:+/.test(t2.content)) {
          i2 = k;
          break;
        }
      }
      const _children = i2 !== -1 ? childrenArr.slice(0, i2) : childrenArr;
      children.push({
        type: "paragraph",
        children: parseInlineTokens(_children || [], void 0, void 0, options),
        raw: String(contentToken.content ?? "").replace(/\n:+$/, "").replace(/\n\s*:::\s*$/, "")
      });
    }
    j += 3;
  } else if (tokens[j].type === "bullet_list_open" || tokens[j].type === "ordered_list_open") {
    const [listNode, newIndex] = parseList(tokens, j, options);
    children.push(listNode);
    j = newIndex;
  } else if (tokens[j].type === "blockquote_open") {
    const [blockquoteNode, newIndex] = parseBlockquote(tokens, j, options);
    children.push(blockquoteNode);
    j = newIndex;
  } else {
    const handled = parseBasicBlockToken(tokens, j, options);
    if (handled) {
      children.push(handled[0]);
      j = handled[1];
    } else j++;
  }
  return [{
    type: "admonition",
    kind,
    title,
    children,
    raw: `:::${kind} ${title}
${children.map((c) => c.raw).join("\n")}
:::`
  }, j + 1];
}
var CONTAINER_REGEX = /^::: ?(warning|info|note|tip|danger|caution|error) ?(.*)$/;
function handleContainerOpen(tokens, index, options) {
  const token = tokens[index];
  if (token.type !== "container_open") return null;
  const match2 = CONTAINER_REGEX.exec(String(token.info ?? ""));
  if (!match2) return null;
  return parseAdmonition(tokens, index, match2, options);
}
var containerTokenHandlers = {
  parseContainer: (tokens, index, options) => parseContainer(tokens, index, options),
  matchAdmonition: handleContainerOpen
};
function parseBlockquote(tokens, index, options) {
  const blockquoteChildren = [];
  let j = index + 1;
  while (j < tokens.length && tokens[j].type !== "blockquote_close") switch (tokens[j].type) {
    case "paragraph_open": {
      const contentToken = tokens[j + 1];
      blockquoteChildren.push({
        type: "paragraph",
        children: parseInlineTokens(contentToken.children || [], String(contentToken.content ?? ""), void 0, options),
        raw: String(contentToken.content ?? "")
      });
      j += 3;
      break;
    }
    case "bullet_list_open":
    case "ordered_list_open": {
      const [listNode, newIndex] = parseList(tokens, j, options);
      blockquoteChildren.push(listNode);
      j = newIndex;
      break;
    }
    case "blockquote_open": {
      const [nestedBlockquote, newIndex] = parseBlockquote(tokens, j, options);
      blockquoteChildren.push(nestedBlockquote);
      j = newIndex;
      break;
    }
    default: {
      const handled = parseCommonBlockToken(tokens, j, options, containerTokenHandlers);
      if (handled) {
        blockquoteChildren.push(handled[0]);
        j = handled[1];
      } else j++;
      break;
    }
  }
  return [{
    type: "blockquote",
    children: blockquoteChildren,
    raw: blockquoteChildren.map((child) => child.raw).join("\n")
  }, j + 1];
}
function parseCodeBlock(token) {
  var _a3;
  if ((_a3 = token.info) == null ? void 0 : _a3.startsWith("diff")) return parseFenceToken(token);
  const contentStr = String(token.content ?? "");
  const match2 = contentStr.match(/ type="application\/vnd\.ant\.([^"]+)"/);
  if (match2 == null ? void 0 : match2[1]) token.content = contentStr.replace(/<antArtifact[^>]*>/g, "").replace(/<\/antArtifact>/g, "");
  const hasMap = Array.isArray(token.map) && token.map.length === 2;
  return {
    type: "code_block",
    language: match2 ? match2[1] : String(token.info ?? ""),
    code: String(token.content ?? ""),
    raw: String(token.content ?? ""),
    loading: !hasMap
  };
}
function parseDefinitionList(tokens, index, options) {
  const items = [];
  let j = index + 1;
  let termNodes = [];
  let definitionNodes = [];
  while (j < tokens.length && tokens[j].type !== "dl_close") if (tokens[j].type === "dt_open") {
    const termToken = tokens[j + 1];
    termNodes = parseInlineTokens(termToken.children || [], void 0, void 0, options);
    j += 3;
  } else if (tokens[j].type === "dd_open") {
    let k = j + 1;
    definitionNodes = [];
    while (k < tokens.length && tokens[k].type !== "dd_close") if (tokens[k].type === "paragraph_open") {
      const contentToken = tokens[k + 1];
      definitionNodes.push({
        type: "paragraph",
        children: parseInlineTokens(contentToken.children || [], String(contentToken.content ?? ""), void 0, options),
        raw: String(contentToken.content ?? "")
      });
      k += 3;
    } else k++;
    if (termNodes.length > 0) {
      items.push({
        type: "definition_item",
        term: termNodes,
        definition: definitionNodes,
        raw: `${termNodes.map((term) => term.raw).join("")}: ${definitionNodes.map((def) => def.raw).join("\n")}`
      });
      termNodes = [];
    }
    j = k + 1;
  } else j++;
  return [{
    type: "definition_list",
    items,
    raw: items.map((item) => item.raw).join("\n")
  }, j + 1];
}
function parseFootnote(tokens, index, options) {
  const meta = tokens[index].meta ?? {};
  const id = String((meta == null ? void 0 : meta.label) ?? "0");
  const footnoteChildren = [];
  let j = index + 1;
  while (j < tokens.length && tokens[j].type !== "footnote_close") if (tokens[j].type === "paragraph_open") {
    const contentToken = tokens[j + 1];
    const children = contentToken.children ? [...contentToken.children] : [];
    if (tokens[j + 2].type === "footnote_anchor") children.push(tokens[j + 2]);
    footnoteChildren.push({
      type: "paragraph",
      children: parseInlineTokens(children, String(contentToken.content ?? ""), void 0, options),
      raw: String(contentToken.content ?? "")
    });
    j += 3;
  } else j++;
  return [{
    type: "footnote",
    id,
    children: footnoteChildren,
    raw: `[^${id}]: ${footnoteChildren.map((child) => child.raw).join("\n")}`
  }, j + 1];
}
function parseHeading(tokens, index, options) {
  var _a3;
  const token = tokens[index];
  const attrs = token.attrs;
  const attrsRecord = Array.isArray(attrs) && attrs.length ? Object.fromEntries(attrs.filter((pair) => Array.isArray(pair) && pair.length >= 1 && pair[0]).map(([name, value]) => [String(name), value == null || value === "" ? true : String(value)])) : void 0;
  const levelStr = String(((_a3 = token.tag) == null ? void 0 : _a3.substring(1)) ?? "1");
  const headingLevel = Number.parseInt(levelStr, 10);
  const headingContentToken = tokens[index + 1];
  const headingContent = String(headingContentToken.content ?? "");
  return {
    type: "heading",
    level: headingLevel,
    text: headingContent,
    ...attrsRecord ? { attrs: attrsRecord } : {},
    children: parseInlineTokens(headingContentToken.children || [], headingContent, void 0, options),
    raw: headingContent
  };
}
function findMatchingCloseTagEnd(rawHtml, tag, startIndex) {
  const lowerTag = tag.toLowerCase();
  const openTagRe = new RegExp(String.raw`^<\s*${lowerTag}(?=\s|>|/)`, "i");
  const closeTagRe = new RegExp(String.raw`^<\s*\/\s*${lowerTag}(?=\s|>)`, "i");
  let depth = 0;
  let index = Math.max(0, startIndex);
  while (index < rawHtml.length) {
    const lt2 = rawHtml.indexOf("<", index);
    if (lt2 === -1) return -1;
    const slice = rawHtml.slice(lt2);
    if (closeTagRe.test(slice)) {
      const endRel = findTagCloseIndexOutsideQuotes(slice);
      if (endRel === -1) return -1;
      if (depth === 0) return lt2 + endRel + 1;
      depth--;
      index = lt2 + endRel + 1;
      continue;
    }
    if (openTagRe.test(slice)) {
      const endRel = findTagCloseIndexOutsideQuotes(slice);
      if (endRel === -1) return -1;
      const rawTag = slice.slice(0, endRel + 1);
      if (!/\/\s*>$/.test(rawTag)) depth++;
      index = lt2 + endRel + 1;
      continue;
    }
    index = lt2 + 1;
  }
  return -1;
}
function parseHtmlBlock(token) {
  var _a3;
  const raw = String(token.content ?? "");
  if (/^\s*<!--/.test(raw) || /^\s*<!/.test(raw) || /^\s*<\?/.test(raw)) return {
    type: "html_block",
    content: raw,
    raw,
    tag: "",
    loading: false
  };
  const tag = (((_a3 = raw.match(/^\s*<([A-Z][\w:-]*)/i)) == null ? void 0 : _a3[1]) || "").toLowerCase();
  if (!tag) return {
    type: "html_block",
    content: raw,
    raw,
    tag: "",
    loading: false
  };
  const openEnd = findTagCloseIndexOutsideQuotes(raw);
  const openTag = openEnd === -1 ? raw : raw.slice(0, openEnd + 1);
  const selfClosing = openEnd !== -1 && /\/\s*>$/.test(openTag);
  const isVoid = VOID_HTML_TAGS.has(tag);
  const attrs = parseTagAttrs(openTag);
  const hasClosing = (openEnd === -1 ? -1 : findMatchingCloseTagEnd(raw, tag, openEnd + 1)) !== -1;
  const loading = !(isVoid || selfClosing || hasClosing);
  return {
    type: "html_block",
    content: loading ? `${raw.replace(/<[^>]*$/, "")}
</${tag}>` : raw,
    raw,
    tag,
    attrs: attrs.length ? attrs : void 0,
    loading
  };
}
function parseMathBlock(token) {
  const content = String(token.content ?? "");
  const raw = token.raw === "$$" ? `$$${content}$$` : String(token.raw ?? "");
  return {
    type: "math_block",
    content,
    loading: !!token.loading,
    raw,
    markup: token.markup
  };
}
function extractAlign(attrs) {
  if (!attrs) return "left";
  for (const a2 of attrs) {
    if (!a2) continue;
    const [key, val] = a2;
    if (!val) continue;
    const value = String(val).trim().toLowerCase();
    if (key === "style") {
      const m = /text-align\s*:\s*(left|right|center)/i.exec(value);
      if (m) return m[1].toLowerCase();
    }
  }
  return "left";
}
function parseTable(tokens, index, options) {
  let j = index + 1;
  let headerRow = null;
  const rows = [];
  let isHeader = false;
  while (j < tokens.length && tokens[j].type !== "table_close") if (tokens[j].type === "thead_open") {
    isHeader = true;
    j++;
  } else if (tokens[j].type === "thead_close") {
    isHeader = false;
    j++;
  } else if (tokens[j].type === "tbody_open" || tokens[j].type === "tbody_close") j++;
  else if (tokens[j].type === "tr_open") {
    const cells = [];
    let k = j + 1;
    while (k < tokens.length && tokens[k].type !== "tr_close") if (tokens[k].type === "th_open" || tokens[k].type === "td_open") {
      const isHeaderCell = tokens[k].type === "th_open";
      const contentToken = tokens[k + 1];
      const content = String(contentToken.content ?? "");
      const align = extractAlign(tokens[k].attrs);
      cells.push({
        type: "table_cell",
        header: isHeaderCell || isHeader,
        children: parseInlineTokens(contentToken.children || [], content, void 0, options),
        raw: content,
        align
      });
      k += 3;
    } else k++;
    const rowNode = {
      type: "table_row",
      cells,
      raw: cells.map((cell) => cell.raw).join("|")
    };
    if (isHeader) headerRow = rowNode;
    else rows.push(rowNode);
    j = k + 1;
  } else j++;
  if (!headerRow) headerRow = {
    type: "table_row",
    cells: [],
    raw: ""
  };
  return [{
    type: "table",
    header: headerRow,
    rows,
    loading: tokens[index].loading ?? false,
    raw: [headerRow, ...rows].map((row) => row.raw).join("\n")
  }, j + 1];
}
function parseThematicBreak() {
  return {
    type: "thematic_break",
    raw: "---"
  };
}
var emptyHtmlTagSets = null;
var HTML_TAG_SET_CACHE = /* @__PURE__ */ new WeakMap();
function getEmptyHtmlTagSets() {
  if (!emptyHtmlTagSets) emptyHtmlTagSets = {
    allowedTagSet: buildAllowedHtmlTagSet(),
    customTagSet: null
  };
  return emptyHtmlTagSets;
}
function getHtmlTagSets(customTags) {
  if (!customTags || customTags.length === 0) return getEmptyHtmlTagSets();
  const cached = HTML_TAG_SET_CACHE.get(customTags);
  if (cached) return cached;
  const normalized = customTags.map(normalizeCustomHtmlTagName).filter(Boolean);
  if (!normalized.length) {
    const entry$1 = getEmptyHtmlTagSets();
    HTML_TAG_SET_CACHE.set(customTags, entry$1);
    return entry$1;
  }
  const entry = {
    allowedTagSet: buildAllowedHtmlTagSet({ customHtmlTags: customTags }),
    customTagSet: new Set(normalized)
  };
  HTML_TAG_SET_CACHE.set(customTags, entry);
  return entry;
}
function parseVmrContainer(tokens, index, options) {
  const openToken = tokens[index];
  const attrs = openToken.attrs;
  let name = "";
  const containerAttrs = {};
  if (attrs) {
    for (const [key, value] of attrs) if (key === "class") {
      const match2 = value.match(/(?:\s|^)vmr-container-(\S+)/);
      if (match2) name = match2[1];
    } else if (key.startsWith("data-")) {
      const attrName = key.slice(5);
      try {
        containerAttrs[attrName] = JSON.parse(value);
      } catch {
        containerAttrs[attrName] = value;
      }
    }
  }
  const children = [];
  let j = index + 1;
  while (j < tokens.length && tokens[j].type !== "vmr_container_close") if (tokens[j].type === "paragraph_open") {
    const contentToken = tokens[j + 1];
    if (contentToken) {
      const childrenArr = contentToken.children || [];
      children.push({
        type: "paragraph",
        children: parseInlineTokens(childrenArr || [], void 0, void 0, options),
        raw: String(contentToken.content ?? "")
      });
    }
    j += 3;
  } else if (tokens[j].type === "bullet_list_open" || tokens[j].type === "ordered_list_open") {
    const [listNode, newIndex] = parseList(tokens, j, options);
    children.push(listNode);
    j = newIndex;
  } else if (tokens[j].type === "blockquote_open") {
    const [blockquoteNode, newIndex] = parseBlockquote(tokens, j, options);
    children.push(blockquoteNode);
    j = newIndex;
  } else {
    const handled = parseBasicBlockToken(tokens, j, options);
    if (handled) {
      children.push(handled[0]);
      j = handled[1];
    } else j++;
  }
  const hasCloseToken = j < tokens.length && tokens[j].type === "vmr_container_close";
  const closed = hasCloseToken || !!(options == null ? void 0 : options.final);
  let raw = `::: ${name}`;
  if (Object.keys(containerAttrs).length > 0) raw += ` ${JSON.stringify(containerAttrs)}`;
  raw += "\n";
  if (children.length > 0) {
    raw += openToken.raw ?? children.map((c) => c.raw).join("\n");
    raw += "\n";
  }
  raw += ":::";
  return [{
    type: "vmr_container",
    name,
    loading: !closed,
    attrs: Object.keys(containerAttrs).length > 0 ? containerAttrs : void 0,
    children,
    raw
  }, hasCloseToken ? j + 1 : j];
}
function stripWrapperNewlines(s2) {
  return s2.replace(/^\r?\n/, "").replace(/\r?\n$/, "");
}
function stripTrailingPartialClosingTag(inner, tag) {
  if (!inner || !tag) return inner;
  const re = new RegExp(String.raw`[\t ]*<\s*\/\s*${tag}[^>]*$`, "i");
  return inner.replace(re, "");
}
function findMatchingCloseTagRange(rawHtml, tag, startIndex) {
  if (!rawHtml || !tag) return null;
  const lowerTag = tag.toLowerCase();
  const openTagRe = new RegExp(String.raw`^<\s*${escapeTagForRegExp(lowerTag)}(?=\s|>|/)`, "i");
  const closeTagRe = new RegExp(String.raw`^<\s*\/\s*${escapeTagForRegExp(lowerTag)}(?=\s|>)`, "i");
  let depth = 0;
  let index = Math.max(0, startIndex);
  while (index < rawHtml.length) {
    const lt2 = rawHtml.indexOf("<", index);
    if (lt2 === -1) break;
    const slice = rawHtml.slice(lt2);
    if (closeTagRe.test(slice)) {
      const endRel = findTagCloseIndexOutsideQuotes(slice);
      if (endRel === -1) return null;
      if (depth === 0) return {
        start: lt2,
        end: lt2 + endRel + 1
      };
      depth--;
      index = lt2 + endRel + 1;
      continue;
    }
    if (openTagRe.test(slice)) {
      const endRel = findTagCloseIndexOutsideQuotes(slice);
      if (endRel === -1) return null;
      const raw = slice.slice(0, endRel + 1);
      if (!/\/\s*>$/.test(raw)) depth++;
      index = lt2 + endRel + 1;
      continue;
    }
    index = lt2 + 1;
  }
  return null;
}
function findNextCustomHtmlBlockFromSource(source, tag, startIndex) {
  if (!source || !tag) return null;
  const lowerTag = tag.toLowerCase();
  const openRe = new RegExp(String.raw`<\s*${lowerTag}(?=\s|>|/)`, "gi");
  openRe.lastIndex = Math.max(0, startIndex || 0);
  const openMatch = openRe.exec(source);
  if (!openMatch || openMatch.index == null) return null;
  const openStart = openMatch.index;
  const openSlice = source.slice(openStart);
  const openEndRel = findTagCloseIndexOutsideQuotes(openSlice);
  if (openEndRel === -1) return null;
  const openEnd = openStart + openEndRel;
  if (/\/\s*>\s*$/.test(openSlice.slice(0, openEndRel + 1))) {
    const end = openEnd + 1;
    return {
      raw: source.slice(openStart, end),
      end
    };
  }
  let depth = 1;
  let i2 = openEnd + 1;
  const isOpenAt = (pos) => {
    const s2 = source.slice(pos);
    return new RegExp(String.raw`^<\s*${lowerTag}(?=\s|>|/)`, "i").test(s2);
  };
  const isCloseAt = (pos) => {
    const s2 = source.slice(pos);
    return new RegExp(String.raw`^<\s*\/\s*${lowerTag}(?=\s|>)`, "i").test(s2);
  };
  while (i2 < source.length) {
    const lt2 = source.indexOf("<", i2);
    if (lt2 === -1) return {
      raw: source.slice(openStart),
      end: source.length
    };
    if (isCloseAt(lt2)) {
      const gt2 = source.indexOf(">", lt2);
      if (gt2 === -1) return null;
      depth--;
      if (depth === 0) {
        const end = gt2 + 1;
        return {
          raw: source.slice(openStart, end),
          end
        };
      }
      i2 = gt2 + 1;
      continue;
    }
    if (isOpenAt(lt2)) {
      const rel = findTagCloseIndexOutsideQuotes(source.slice(lt2));
      if (rel === -1) return null;
      depth++;
      i2 = lt2 + rel + 1;
      continue;
    }
    i2 = lt2 + 1;
  }
  return {
    raw: source.slice(openStart),
    end: source.length
  };
}
function clampNonNegative(n2) {
  return Number.isFinite(n2) && n2 > 0 ? n2 : 0;
}
function lineToIndex(source, line) {
  const targetLine = clampNonNegative(line);
  if (!source || targetLine <= 0) return 0;
  let currentLine = 0;
  for (let i2 = 0; i2 < source.length; i2++) if (source[i2] === "\n") {
    currentLine++;
    if (currentLine === targetLine) return i2 + 1;
  }
  return source.length;
}
function parseBasicBlockToken(tokens, index, options) {
  var _a3, _b;
  const token = tokens[index];
  switch (token.type) {
    case "heading_open":
      return [parseHeading(tokens, index, options), index + 3];
    case "code_block":
      return [parseCodeBlock(token), index + 1];
    case "fence":
      return [parseFenceToken(token), index + 1];
    case "math_block":
      return [parseMathBlock(token), index + 1];
    case "html_block": {
      const htmlBlockNode = parseHtmlBlock(token);
      const tagSets = htmlBlockNode.tag ? getHtmlTagSets(options == null ? void 0 : options.customHtmlTags) : null;
      if (htmlBlockNode.tag && htmlBlockNode.loading && tagSets && !tagSets.allowedTagSet.has(htmlBlockNode.tag)) {
        const content = String(token.content ?? "").replace(/\n+$/, "");
        return [{
          type: "paragraph",
          children: content ? [{
            type: "text",
            content,
            raw: content
          }] : [],
          raw: content
        }, index + 1];
      }
      if (htmlBlockNode.tag && ((_a3 = tagSets == null ? void 0 : tagSets.customTagSet) == null ? void 0 : _a3.has(htmlBlockNode.tag))) {
        const tag = htmlBlockNode.tag;
        const source = String((options == null ? void 0 : options.__sourceMarkdown) ?? "");
        const cursor = Number((options == null ? void 0 : options.__customHtmlBlockCursor) ?? 0);
        const mappedLineStart = Array.isArray(token.map) ? lineToIndex(source, Number(((_b = token.map) == null ? void 0 : _b[0]) ?? 0)) : 0;
        const fromSource = findNextCustomHtmlBlockFromSource(source, tag, Math.max(clampNonNegative(cursor), clampNonNegative(mappedLineStart)));
        if (fromSource && options) options.__customHtmlBlockCursor = fromSource.end;
        const rawHtml = String((fromSource == null ? void 0 : fromSource.raw) ?? htmlBlockNode.raw ?? "");
        const openEnd = findTagCloseIndexOutsideQuotes(rawHtml);
        const openTag = openEnd !== -1 ? rawHtml.slice(0, openEnd + 1) : rawHtml;
        const selfClosing = openEnd !== -1 && /\/\s*>\s*$/.test(openTag);
        const closeRange = openEnd === -1 ? null : findMatchingCloseTagRange(rawHtml, tag, openEnd + 1);
        const closeIndex = (closeRange == null ? void 0 : closeRange.start) ?? -1;
        let inner = "";
        if (openEnd !== -1) if (closeIndex !== -1 && openEnd < closeIndex) inner = rawHtml.slice(openEnd + 1, closeIndex);
        else inner = rawHtml.slice(openEnd + 1);
        if (closeIndex === -1) inner = stripTrailingPartialClosingTag(inner, tag);
        const attrs = [];
        const attrRegex = /\s([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
        let m;
        while ((m = attrRegex.exec(openTag)) !== null) {
          const name = m[1];
          if (!name || name.toLowerCase() === tag) continue;
          const value = m[2] || m[3] || m[4] || "";
          attrs.push([name, value]);
        }
        const loading = !(options == null ? void 0 : options.final) && !selfClosing && closeRange == null;
        return [{
          type: tag,
          tag,
          content: stripWrapperNewlines(inner),
          raw: String((fromSource == null ? void 0 : fromSource.raw) ?? htmlBlockNode.raw ?? rawHtml),
          loading,
          attrs: attrs.length ? attrs : void 0
        }, index + 1];
      }
      return [htmlBlockNode, index + 1];
    }
    case "table_open": {
      const [tableNode, newIndex] = parseTable(tokens, index, options);
      return [tableNode, newIndex];
    }
    case "dl_open": {
      const [definitionListNode, newIndex] = parseDefinitionList(tokens, index, options);
      return [definitionListNode, newIndex];
    }
    case "footnote_open": {
      const [footnoteNode, newIndex] = parseFootnote(tokens, index, options);
      return [footnoteNode, newIndex];
    }
    case "hr":
      return [parseThematicBreak(), index + 1];
    default:
      break;
  }
  return null;
}
function parseCommonBlockToken(tokens, index, options, handlers) {
  const basicResult = parseBasicBlockToken(tokens, index, options);
  if (basicResult) return basicResult;
  switch (tokens[index].type) {
    case "container_warning_open":
    case "container_info_open":
    case "container_note_open":
    case "container_tip_open":
    case "container_danger_open":
    case "container_caution_open":
    case "container_error_open":
      if (handlers == null ? void 0 : handlers.parseContainer) return handlers.parseContainer(tokens, index, options);
      break;
    case "container_open":
      if (handlers == null ? void 0 : handlers.matchAdmonition) {
        const result = handlers.matchAdmonition(tokens, index, options);
        if (result) return result;
      }
      break;
    case "vmr_container_open":
      return parseVmrContainer(tokens, index, options);
    default:
      break;
  }
  return null;
}
function parseHardBreak() {
  return {
    type: "hardbreak",
    raw: "\\\n"
  };
}
function parseParagraph(tokens, index, options) {
  const paragraphContentToken = tokens[index + 1];
  const paragraphContent = String(paragraphContentToken.content ?? "");
  return {
    type: "paragraph",
    children: parseInlineTokens(paragraphContentToken.children || [], paragraphContent, void 0, options),
    raw: paragraphContent
  };
}
function getNodeFields(node) {
  return node;
}
function getCustomHtmlTagSet(options) {
  const custom = options == null ? void 0 : options.customHtmlTags;
  if (!Array.isArray(custom) || custom.length === 0) return null;
  const normalized = normalizeCustomHtmlTags(custom);
  return normalized.length ? new Set(normalized) : null;
}
function buildAllowedHtmlTagSet(options) {
  const custom = options == null ? void 0 : options.customHtmlTags;
  if (!Array.isArray(custom) || custom.length === 0) return STANDARD_HTML_TAGS;
  const set2 = new Set(STANDARD_HTML_TAGS);
  for (const name of normalizeCustomHtmlTags(custom)) if (name) set2.add(name);
  return set2;
}
function stringifyInlineNodeRaw(node) {
  const raw = node.raw;
  if (typeof raw === "string") return raw;
  const content = getNodeFields(node).content;
  if (typeof content === "string") return content;
  if (node.type === "hardbreak") return "<br>";
  return "";
}
function buildParagraphFromInlineChildren(children) {
  return {
    type: "paragraph",
    children,
    raw: children.map(stringifyInlineNodeRaw).join("")
  };
}
function maybePromoteCustomNodeFromParagraph(node, options) {
  if (node.type !== "paragraph") return null;
  const nodeChildren = getNodeFields(node).children;
  const children = Array.isArray(nodeChildren) ? nodeChildren : [];
  if (children.length === 0) return null;
  const customTagSet = getCustomHtmlTagSet(options);
  if (!(customTagSet == null ? void 0 : customTagSet.size)) return null;
  let customIndex = -1;
  for (let i2 = 0; i2 < children.length; i2++) {
    const child = children[i2];
    if (!customTagSet.has(String((child == null ? void 0 : child.type) ?? "").toLowerCase())) continue;
    const prefixChildren$1 = children.slice(0, i2);
    if (!String(getNodeFields(child).content ?? "").trim()) continue;
    if (!prefixChildren$1.some((prefixChild) => (prefixChild == null ? void 0 : prefixChild.type) === "hardbreak")) continue;
    customIndex = i2;
    break;
  }
  if (customIndex === -1) return null;
  const prefixChildren = children.slice(0, customIndex);
  const promoted = children[customIndex];
  if (!promoted) return null;
  const result = [];
  if (prefixChildren.length) result.push(buildParagraphFromInlineChildren(prefixChildren));
  result.push(promoted);
  const suffixChildren = children.slice(customIndex + 1);
  if (suffixChildren.length) result.push(buildParagraphFromInlineChildren(suffixChildren));
  return result;
}
function parseStandaloneHtmlDocument(markdown) {
  const trimmed = markdown.trim();
  if (!trimmed) return null;
  const startsLikeHtmlDocument = /^(?:<!doctype\s+html[^>]*>\s*)?<html(?:\s[^>]*)?>/i.test(trimmed);
  const endsWithHtmlClose = /<\/html>\s*$/i.test(trimmed);
  if (!startsLikeHtmlDocument || !endsWithHtmlClose) return null;
  return [{
    type: "html_block",
    tag: "html",
    raw: markdown,
    content: markdown,
    loading: false
  }];
}
function getMergeableNodeRaw(node) {
  const raw = node.raw;
  if (typeof raw === "string") return raw;
  const content = getNodeFields(node).content;
  if (typeof content === "string") return content;
  return "";
}
function isCloseOnlyHtmlBlockForTag(node, tag) {
  if (node.type !== "html_block" || !tag) return false;
  const raw = String(node.raw ?? node.content ?? "");
  return new RegExp(String.raw`^\s*<\s*\/\s*${escapeTagForRegExp(tag)}\s*>\s*$`, "i").test(raw);
}
function findNextHtmlBlockFromSource(source, tag, startIndex) {
  if (!source || !tag) return null;
  const lowerTag = tag.toLowerCase();
  const openRe = new RegExp(String.raw`<\s*${escapeTagForRegExp(lowerTag)}(?=\s|>|/)`, "gi");
  openRe.lastIndex = Math.max(0, startIndex);
  const openMatch = openRe.exec(source);
  if (!openMatch || openMatch.index == null) return null;
  const start = openMatch.index;
  const openEndRel = findTagCloseIndexOutsideQuotes(source.slice(start));
  if (openEndRel === -1) return null;
  const openEnd = start + openEndRel;
  const openTag = source.slice(start, openEnd + 1);
  if (VOID_HTML_TAGS.has(lowerTag) || /\/\s*>$/.test(openTag)) return {
    raw: openTag,
    start,
    end: openEnd + 1,
    closed: true
  };
  let depth = 1;
  let index = openEnd + 1;
  const isOpenAt = (pos) => {
    const slice = source.slice(pos);
    return new RegExp(String.raw`^<\s*${escapeTagForRegExp(lowerTag)}(?=\s|>|/)`, "i").test(slice);
  };
  const isCloseAt = (pos) => {
    const slice = source.slice(pos);
    return new RegExp(String.raw`^<\s*\/\s*${escapeTagForRegExp(lowerTag)}(?=\s|>)`, "i").test(slice);
  };
  while (index < source.length) {
    const lt2 = source.indexOf("<", index);
    if (lt2 === -1) return {
      raw: source.slice(start),
      start,
      end: source.length,
      closed: false
    };
    if (isCloseAt(lt2)) {
      const endRel = findTagCloseIndexOutsideQuotes(source.slice(lt2));
      if (endRel === -1) return null;
      depth--;
      const end = lt2 + endRel + 1;
      if (depth === 0) return {
        raw: source.slice(start, end),
        start,
        end,
        closed: true
      };
      index = end;
      continue;
    }
    if (isOpenAt(lt2)) {
      const endRel = findTagCloseIndexOutsideQuotes(source.slice(lt2));
      if (endRel === -1) return null;
      const raw = source.slice(lt2, lt2 + endRel + 1);
      if (!/\/\s*>$/.test(raw)) depth++;
      index = lt2 + endRel + 1;
      continue;
    }
    index = lt2 + 1;
  }
  return {
    raw: source.slice(start),
    start,
    end: source.length,
    closed: false
  };
}
function findApproximateConsumedPrefixEnd(exact, approximate) {
  if (!approximate) return 0;
  let i2 = 0;
  let j = 0;
  while (i2 < exact.length && j < approximate.length) {
    if (exact[i2] === approximate[j]) {
      i2++;
      j++;
      continue;
    }
    if (exact[i2] === "\r" || exact[i2] === "\n") {
      i2++;
      continue;
    }
    return -1;
  }
  return j === approximate.length ? i2 : -1;
}
function buildHtmlBlockContent(raw, tag, closed) {
  if (closed) return raw;
  return `${raw.replace(/<[^>]*$/, "")}
</${tag}>`;
}
function normalizeIndentedSourceForLookup(value) {
  return value.replace(/\r\n/g, "\n").replace(/(^|\n)[ \t]{1,4}/g, "$1");
}
function canFindNodeRawAfterSourceIndex(source, startIndex, nodeRaw) {
  if (!nodeRaw) return false;
  if (source.includes(nodeRaw, startIndex)) return true;
  return normalizeIndentedSourceForLookup(source.slice(Math.max(0, startIndex))).includes(normalizeIndentedSourceForLookup(nodeRaw));
}
function extendHtmlBlockCloseToLineEnding(source, startIndex) {
  let end = Math.max(0, startIndex);
  while (end < source.length && (source[end] === " " || source[end] === "	")) end++;
  if (source[end] === "\r") {
    end++;
    if (source[end] === "\n") end++;
    return end;
  }
  if (source[end] === "\n") return end + 1;
  return startIndex;
}
function isDetailsOpenHtmlBlock(node) {
  if (node.type !== "html_block") return false;
  if (String(node.tag ?? "").toLowerCase() !== "details") return false;
  const raw = String(node.raw ?? node.content ?? "");
  return /^\s*<details\b/i.test(raw);
}
function isDetailsCloseHtmlBlock(node) {
  if (node.type !== "html_block") return false;
  const raw = String(node.raw ?? node.content ?? "");
  return /^\s*<\/details\b/i.test(raw);
}
function findLastClosingTagStart(raw, tag) {
  const closeRe = new RegExp(String.raw`<\s*\/\s*${escapeTagForRegExp(tag)}(?=\s|>)`, "gi");
  let last = -1;
  let match2;
  while ((match2 = closeRe.exec(raw)) !== null) last = match2.index;
  return last;
}
function buildDetailsChildParseOptions(options, final) {
  return {
    final,
    requireClosingStrong: options.requireClosingStrong,
    customHtmlTags: options.customHtmlTags,
    validateLink: options.validateLink
  };
}
var STRUCTURED_HTML_WRAPPER_BLOCK_TYPES = /* @__PURE__ */ new Set([
  "admonition",
  "blockquote",
  "code_block",
  "definition_list",
  "footnote",
  "heading",
  "list",
  "math_block",
  "table",
  "thematic_break"
]);
var STRUCTURED_HTML_WRAPPER_MARKER_RE = /(?:^|\n)\s{0,3}(?:#{1,6}\s+\S|[-+*]\s+\S|\d+[.)]\s+\S|>\s*\S|`{3,}|~{3,}|(?:\*{3,}|-{3,}|_{3,})(?:\s|$)|\|.*\|)/m;
function hasStructuredHtmlWrapperMarkers(fragment) {
  return /\n\s*\n/.test(fragment) || STRUCTURED_HTML_WRAPPER_MARKER_RE.test(fragment);
}
function shouldStructureGenericHtmlBlockChildren(innerRaw, children) {
  if (!innerRaw.trim() || children.length === 0) return false;
  if (children.some((child) => STRUCTURED_HTML_WRAPPER_BLOCK_TYPES.has(String((child == null ? void 0 : child.type) ?? "").toLowerCase()))) return true;
  if (children.some((child) => {
    if ((child == null ? void 0 : child.type) !== "html_block") return false;
    const childFields = getNodeFields(child);
    return Array.isArray(childFields.children) && childFields.children.length > 0;
  })) return true;
  if (!hasStructuredHtmlWrapperMarkers(innerRaw)) return false;
  if (children.length > 1) return true;
  const [first] = children;
  return Boolean(first && first.type === "paragraph");
}
function structureGenericHtmlBlockChildren(nodes, md, options, final) {
  return nodes.map((node) => {
    if ((node == null ? void 0 : node.type) !== "html_block") return node;
    const fields = getNodeFields(node);
    const tag = String(fields.tag ?? "").toLowerCase();
    if (!tag || tag === "details" || NON_STRUCTURING_HTML_TAGS.has(tag) || Array.isArray(fields.children)) return node;
    const raw = String(node.raw ?? fields.content ?? "");
    if (!raw) return node;
    const openEnd = findTagCloseIndexOutsideQuotes(raw);
    if (openEnd === -1) return node;
    const closeStart = findLastClosingTagStart(raw, tag);
    const innerRaw = closeStart !== -1 && closeStart >= openEnd + 1 ? raw.slice(openEnd + 1, closeStart) : raw.slice(openEnd + 1);
    if (!innerRaw.trim()) return node;
    const children = parseDetailsFragmentChildren(innerRaw, md, buildDetailsChildParseOptions(options, final));
    if (!shouldStructureGenericHtmlBlockChildren(innerRaw, children)) return node;
    return {
      ...node,
      children
    };
  });
}
function parseDetailsFragmentChildren(fragment, md, options) {
  if (!fragment.trim()) return [];
  return parseMarkdownToStructure(fragment, md, options);
}
function parseSummaryChildren(fragment, md, options) {
  const children = parseDetailsFragmentChildren(fragment, md, options);
  const onlyChild = children[0];
  if (children.length === 1 && (onlyChild == null ? void 0 : onlyChild.type) === "paragraph" && Array.isArray(onlyChild.children)) return onlyChild.children;
  return children;
}
function buildStructuredSummaryNode(summaryRaw, md, options) {
  const summaryNode = parseHtmlBlock({ content: summaryRaw });
  const openEnd = findTagCloseIndexOutsideQuotes(summaryRaw);
  const closeStart = findLastClosingTagStart(summaryRaw, "summary");
  if (openEnd !== -1 && closeStart !== -1 && closeStart >= openEnd + 1) {
    const children = parseSummaryChildren(summaryRaw.slice(openEnd + 1, closeStart), md, options);
    if (children.length > 0) summaryNode.children = children;
  }
  summaryNode.raw = summaryRaw;
  return summaryNode;
}
function buildDetailsPrefixChildren(openRaw, md, options) {
  const openEnd = findTagCloseIndexOutsideQuotes(openRaw);
  if (openEnd === -1) return [];
  const innerPrefix = openRaw.slice(openEnd + 1);
  if (!innerPrefix.trim()) return [];
  const summaryBlock = findNextHtmlBlockFromSource(innerPrefix, "summary", 0);
  if (!summaryBlock) return parseDetailsFragmentChildren(innerPrefix, md, options);
  const beforeSummary = innerPrefix.slice(0, summaryBlock.start);
  const afterSummary = innerPrefix.slice(summaryBlock.end);
  return [
    ...parseDetailsFragmentChildren(beforeSummary, md, options),
    buildStructuredSummaryNode(summaryBlock.raw, md, options),
    ...parseDetailsFragmentChildren(afterSummary, md, options)
  ];
}
function combineStructuredDetailsHtmlBlocks(nodes, source, md, options, final, sourceCursor = 0) {
  const merged = [];
  let cursor = sourceCursor;
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    const nodeRaw = getMergeableNodeRaw(node);
    let nodePos = -1;
    if (nodeRaw) {
      nodePos = source.indexOf(nodeRaw, cursor);
      if (nodePos !== -1) cursor = nodePos + nodeRaw.length;
    }
    if (!isDetailsOpenHtmlBlock(node)) {
      merged.push(node);
      continue;
    }
    const openRaw = String(node.raw ?? getMergeableNodeRaw(node) ?? "");
    const openStart = nodePos !== -1 ? nodePos : source.indexOf(openRaw, Math.max(0, cursor - openRaw.length));
    if (openStart === -1) {
      merged.push(node);
      continue;
    }
    let depth = 1;
    let closeIndex = -1;
    for (let j = i2 + 1; j < nodes.length; j++) {
      const current = nodes[j];
      if (isDetailsOpenHtmlBlock(current)) {
        depth++;
        continue;
      }
      if (!isDetailsCloseHtmlBlock(current)) continue;
      depth--;
      if (depth === 0) {
        closeIndex = j;
        break;
      }
    }
    const exact = findNextHtmlBlockFromSource(source, "details", openStart);
    const selfContained = closeIndex === -1 && (exact == null ? void 0 : exact.closed) === true;
    const effectiveOpenRaw = selfContained ? (() => {
      const ct2 = findLastClosingTagStart(openRaw, "details");
      return ct2 !== -1 ? openRaw.slice(0, ct2) : openRaw;
    })() : openRaw;
    const [children] = combineStructuredDetailsHtmlBlocks(selfContained ? [] : closeIndex === -1 ? nodes.slice(i2 + 1) : nodes.slice(i2 + 1, closeIndex), source, md, options, final, openStart + openRaw.length);
    const prefixChildren = buildDetailsPrefixChildren(effectiveOpenRaw, md, buildDetailsChildParseOptions(options, final));
    const closeRaw = closeIndex === -1 ? "</details>" : String(nodes[closeIndex].raw ?? getMergeableNodeRaw(nodes[closeIndex]) ?? "</details>");
    const explicitClose = selfContained || closeIndex !== -1 && (exact == null ? void 0 : exact.closed) === true;
    const trimmedCloseRaw = closeRaw.replace(/[\t\r\n ]+$/, "");
    const closeStart = explicitClose ? (() => {
      const closeOffset = ((exact == null ? void 0 : exact.raw) ?? "").lastIndexOf(trimmedCloseRaw);
      return closeOffset === -1 ? source.length : openStart + closeOffset;
    })() : source.length;
    const openTagEndIndex = findTagCloseIndexOutsideQuotes(openRaw);
    const middleSourceStart = selfContained && openTagEndIndex !== -1 ? openStart + openTagEndIndex + 1 : openStart + openRaw.length;
    const middleSource = source.slice(middleSourceStart, closeStart === -1 ? source.length : closeStart);
    const middleTokens = md.parse(middleSource, { __markstreamFinal: final });
    const renderedMiddle = md.renderer.render(middleTokens, md.options, { __markstreamFinal: final });
    const closeMarkupEnd = closeStart + trimmedCloseRaw.length;
    const closeSliceEnd = explicitClose ? Math.max(closeStart + closeRaw.length, extendHtmlBlockCloseToLineEnding(source, closeMarkupEnd)) : source.length;
    const renderedCloseRaw = explicitClose ? source.slice(closeStart, closeSliceEnd) : closeRaw;
    const mergedRaw = explicitClose ? source.slice(openStart, closeSliceEnd) : source.slice(openStart);
    const contentPrefix = selfContained && openTagEndIndex !== -1 ? openRaw.slice(0, openTagEndIndex + 1) : openRaw;
    merged.push({
      ...node,
      tag: "details",
      attrs: parseTagAttrs(openRaw.slice(0, openTagEndIndex + 1)),
      raw: mergedRaw,
      content: `${contentPrefix}${renderedMiddle}${renderedCloseRaw}`,
      children: [...prefixChildren, ...children],
      loading: !final && !explicitClose
    });
    cursor = explicitClose ? closeSliceEnd : source.length;
    if (closeIndex === -1 && !selfContained) break;
    if (closeIndex !== -1) i2 = closeIndex;
  }
  return [merged, cursor];
}
function mergeSplitTopLevelHtmlBlocks(nodes, final, source) {
  if (!source) return nodes;
  const merged = nodes.slice();
  let sourceHtmlCursor = 0;
  for (let i2 = 0; i2 < merged.length; i2++) {
    const node = merged[i2];
    const nodeRaw = getMergeableNodeRaw(node);
    const nodePos = nodeRaw ? source.indexOf(nodeRaw, sourceHtmlCursor) : -1;
    if ((node == null ? void 0 : node.type) !== "html_block") {
      if (nodePos !== -1) sourceHtmlCursor = nodePos + nodeRaw.length;
      continue;
    }
    const tag = String(node.tag ?? "").toLowerCase();
    if (!tag) continue;
    if (tag === "details") {
      if (nodePos !== -1) sourceHtmlCursor = nodePos + nodeRaw.length;
      continue;
    }
    const exact = findNextHtmlBlockFromSource(source, tag, nodePos !== -1 ? nodePos : sourceHtmlCursor);
    if (!exact) continue;
    sourceHtmlCursor = exact.end;
    const currentContent = String(node.content ?? nodeRaw);
    const currentRaw = String(node.raw ?? currentContent);
    const nextContent = buildHtmlBlockContent(exact.raw, tag, exact.closed);
    const desiredLoading = !final && !exact.closed;
    const needsExpansion = currentContent !== nextContent || currentRaw !== exact.raw || Boolean(node.loading) !== desiredLoading;
    const exactOpenEnd = findTagCloseIndexOutsideQuotes(exact.raw);
    const exactOpenTag = exactOpenEnd === -1 ? "" : exact.raw.slice(0, exactOpenEnd + 1);
    const exactAttrs = exactOpenTag ? parseTagAttrs(exactOpenTag) : [];
    node.content = nextContent;
    node.raw = exact.raw;
    node.loading = desiredLoading;
    node.attrs = exactAttrs.length ? exactAttrs : void 0;
    if (!needsExpansion) continue;
    let tailCursor = findApproximateConsumedPrefixEnd(exact.raw, currentRaw);
    if (tailCursor === -1) tailCursor = 0;
    const j = i2 + 1;
    while (j < merged.length) {
      if (exact.closed && isCloseOnlyHtmlBlockForTag(merged[j], tag)) {
        merged.splice(j, 1);
        continue;
      }
      const nextRaw = getMergeableNodeRaw(merged[j]);
      if (!nextRaw) break;
      const nextPos = exact.raw.indexOf(nextRaw, tailCursor);
      if (nextPos === -1) {
        if (canFindNodeRawAfterSourceIndex(source, exact.end, nextRaw)) break;
        merged.splice(j, 1);
        continue;
      }
      tailCursor = nextPos + nextRaw.length;
      merged.splice(j, 1);
    }
  }
  return merged;
}
function stripDanglingHtmlLikeTail(markdown) {
  const isWs = (ch) => ch === " " || ch === "	" || ch === "\n" || ch === "\r";
  const isLikelyHtmlTagPrefix = (tail$1) => {
    if (!tail$1 || tail$1[0] !== "<") return false;
    if (tail$1.includes(">")) return false;
    let i2 = 1;
    if (i2 < tail$1.length && isWs(tail$1[i2])) return false;
    if (tail$1[i2] === "/") {
      i2++;
      if (i2 < tail$1.length && isWs(tail$1[i2])) return false;
    }
    const isAlpha = (ch) => {
      const c = ch.charCodeAt(0);
      return c >= 65 && c <= 90 || c >= 97 && c <= 122;
    };
    const isDigit$2 = (ch) => {
      const c = ch.charCodeAt(0);
      return c >= 48 && c <= 57;
    };
    const isNameStart = (ch) => ch === "!" || isAlpha(ch);
    const isNameChar = (ch) => isAlpha(ch) || isDigit$2(ch) || ch === ":" || ch === "-";
    const isAttrStart = (ch) => isAlpha(ch) || isDigit$2(ch) || ch === "_" || ch === "." || ch === ":" || ch === "-";
    const isAttrChar = isAttrStart;
    if (i2 >= tail$1.length || !isNameStart(tail$1[i2])) return false;
    i2++;
    while (i2 < tail$1.length && isNameChar(tail$1[i2])) i2++;
    while (i2 < tail$1.length) {
      while (i2 < tail$1.length && isWs(tail$1[i2])) i2++;
      if (i2 >= tail$1.length) return true;
      if (tail$1[i2] === "/") {
        i2++;
        while (i2 < tail$1.length && isWs(tail$1[i2])) i2++;
        return i2 >= tail$1.length;
      }
      if (!isAttrStart(tail$1[i2])) return false;
      i2++;
      while (i2 < tail$1.length && isAttrChar(tail$1[i2])) i2++;
      while (i2 < tail$1.length && isWs(tail$1[i2])) i2++;
      if (i2 < tail$1.length && tail$1[i2] === "=") {
        i2++;
        while (i2 < tail$1.length && isWs(tail$1[i2])) i2++;
        if (i2 >= tail$1.length) return true;
        const quote = tail$1[i2];
        if (quote === '"' || quote === "'") {
          i2++;
          while (i2 < tail$1.length && tail$1[i2] !== quote) i2++;
          if (i2 >= tail$1.length) return true;
          i2++;
        } else {
          while (i2 < tail$1.length) {
            const ch = tail$1[i2];
            if (isWs(ch) || ch === "<" || ch === ">" || ch === '"' || ch === "'" || ch === "`") break;
            i2++;
          }
          if (i2 >= tail$1.length) return true;
        }
      }
    }
    return true;
  };
  const isInsideFencedCodeBlock = (src, pos) => {
    let inFence = false;
    let fenceChar = "";
    let fenceLen = 0;
    const isIndentWs = (ch) => ch === " " || ch === "	";
    const parseFenceMarker = (line) => {
      let i2 = 0;
      while (i2 < line.length && isIndentWs(line[i2])) i2++;
      const ch = line[i2];
      if (ch !== "`" && ch !== "~") return null;
      let j = i2;
      while (j < line.length && line[j] === ch) j++;
      const len = j - i2;
      if (len < 3) return null;
      return {
        markerChar: ch,
        markerLen: len,
        rest: line.slice(j)
      };
    };
    const stripBlockquotePrefix = (line) => {
      let i2 = 0;
      while (i2 < line.length && isIndentWs(line[i2])) i2++;
      let saw = false;
      while (i2 < line.length && line[i2] === ">") {
        saw = true;
        i2++;
        while (i2 < line.length && isIndentWs(line[i2])) i2++;
      }
      return saw ? line.slice(i2) : null;
    };
    const matchFence = (rawLine) => {
      const direct = parseFenceMarker(rawLine);
      if (direct) return direct;
      const afterQuote = stripBlockquotePrefix(rawLine);
      if (afterQuote == null) return null;
      return parseFenceMarker(afterQuote);
    };
    let offset3 = 0;
    const lines = src.split(/\r?\n/);
    for (const line of lines) {
      const lineStart = offset3;
      const lineEnd = offset3 + line.length;
      if (pos < lineStart) break;
      const fenceMatch = matchFence(line);
      if (fenceMatch) {
        const markerChar = fenceMatch.markerChar;
        const markerLen = fenceMatch.markerLen;
        if (inFence) {
          if (markerChar === fenceChar && markerLen >= fenceLen) {
            if (/^\s*$/.test(fenceMatch.rest)) {
              inFence = false;
              fenceChar = "";
              fenceLen = 0;
            }
          }
        } else {
          inFence = true;
          fenceChar = markerChar;
          fenceLen = markerLen;
        }
      }
      if (pos <= lineEnd) break;
      offset3 = lineEnd + 1;
    }
    return inFence;
  };
  const s2 = String(markdown ?? "");
  const lastLt = s2.lastIndexOf("<");
  if (lastLt === -1) return s2;
  if (isInsideFencedCodeBlock(s2, lastLt)) return s2;
  if (lastLt > 0) {
    const prev = s2[lastLt - 1];
    const prevIsWs = prev === " " || prev === "	" || prev === "\n" || prev === "\r";
    const prev2 = s2[lastLt - 2];
    if (!prevIsWs && !((prev === "n" || prev === "r") && prev2 === "\\")) return s2;
  }
  const tail = s2.slice(lastLt);
  if (tail.includes(">")) return s2;
  if (tail.length > 1 && (tail[1] === " " || tail[1] === "	" || tail[1] === "\n" || tail[1] === "\r")) return s2;
  if (!isLikelyHtmlTagPrefix(tail)) return s2;
  return s2.slice(0, lastLt);
}
function ensureBlankLineBeforeInlineMultilineCustomHtmlBlocks(markdown, tags) {
  if (!markdown || !tags.length) return markdown;
  const tagSet = new Set(tags.map((t2) => String(t2 ?? "").toLowerCase()).filter(Boolean));
  if (!tagSet.size) return markdown;
  const isIndentWs = (ch) => ch === " " || ch === "	";
  const isNameChar = (ch) => {
    const c = ch.charCodeAt(0);
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || ch === "_" || ch === "-" || ch === ":";
  };
  const isIndentedCodeLine = (line) => {
    if (!line) return false;
    if (line[0] === "	") return true;
    let spaces = 0;
    for (let i2 = 0; i2 < line.length; i2++) {
      const ch = line[i2];
      if (ch === " ") {
        spaces++;
        if (spaces >= 4) return true;
        continue;
      }
      if (ch === "	") return true;
      break;
    }
    return false;
  };
  const findTagCloseIndexOutsideQuotes$1 = (input) => {
    let inSingle = false;
    let inDouble = false;
    for (let i2 = 0; i2 < input.length; i2++) {
      const ch = input[i2];
      if (ch === "\\") {
        i2++;
        continue;
      }
      if (!inDouble && ch === "'") {
        inSingle = !inSingle;
        continue;
      }
      if (!inSingle && ch === '"') {
        inDouble = !inDouble;
        continue;
      }
      if (!inSingle && !inDouble && ch === ">") return i2;
    }
    return -1;
  };
  const parseFenceMarker = (line) => {
    let i2 = 0;
    while (i2 < line.length && isIndentWs(line[i2])) i2++;
    const ch = line[i2];
    if (ch !== "`" && ch !== "~") return null;
    let j = i2;
    while (j < line.length && line[j] === ch) j++;
    const len = j - i2;
    if (len < 3) return null;
    return {
      markerChar: ch,
      markerLen: len,
      rest: line.slice(j)
    };
  };
  const findInlineCustomBlockSplitIndex = (line, lineStart) => {
    if (isIndentedCodeLine(line)) return -1;
    const trimmed = line.replace(/^[ \t]+/, "");
    if (!trimmed || trimmed.startsWith(">") || trimmed.startsWith("|") || /^(?:[*+-]|\d+[.)])[\t ]+/.test(trimmed)) return -1;
    let hasRenderablePrefix = false;
    let i2 = 0;
    while (i2 < line.length) {
      const ch = line[i2];
      if (ch !== "<") {
        if (!isIndentWs(ch)) hasRenderablePrefix = true;
        i2++;
        continue;
      }
      const closeIdxRel = findTagCloseIndexOutsideQuotes$1(line.slice(i2));
      if (closeIdxRel === -1) {
        hasRenderablePrefix = true;
        i2++;
        continue;
      }
      const tagSlice = line.slice(i2, i2 + closeIdxRel + 1);
      let cursor = 1;
      while (cursor < tagSlice.length && isIndentWs(tagSlice[cursor])) cursor++;
      if (cursor >= tagSlice.length) {
        hasRenderablePrefix = true;
        i2++;
        continue;
      }
      const marker = tagSlice[cursor];
      if (marker === "!" || marker === "?") {
        hasRenderablePrefix = true;
        i2 += closeIdxRel + 1;
        continue;
      }
      if (marker === "/") {
        hasRenderablePrefix = true;
        i2 += closeIdxRel + 1;
        continue;
      }
      const nameStart = cursor;
      while (cursor < tagSlice.length && isNameChar(tagSlice[cursor])) cursor++;
      if (cursor === nameStart) {
        hasRenderablePrefix = true;
        i2++;
        continue;
      }
      const tagName = tagSlice.slice(nameStart, cursor).toLowerCase();
      const boundary = tagSlice[cursor];
      if (boundary && boundary !== " " && boundary !== "	" && boundary !== ">" && boundary !== "/") {
        hasRenderablePrefix = true;
        i2++;
        continue;
      }
      const sameLineCloseRe = new RegExp(String.raw`<\s*\/\s*${tagName}\s*>`, "i");
      const selfClosing = /\/\s*>$/.test(tagSlice);
      const closesOnSameLine = sameLineCloseRe.test(line.slice(i2 + closeIdxRel + 1));
      const closesLater = sameLineCloseRe.test(markdown.slice(lineStart + i2 + closeIdxRel + 1));
      const continuesOnLaterLine = /[\r\n]/.test(markdown.slice(lineStart + i2 + closeIdxRel + 1));
      if (hasRenderablePrefix && tagSet.has(tagName) && !selfClosing && !closesOnSameLine && (closesLater || continuesOnLaterLine)) return i2;
      hasRenderablePrefix = true;
      i2 += closeIdxRel + 1;
    }
    return -1;
  };
  let inFence = false;
  let fenceChar = "";
  let fenceLen = 0;
  let out = "";
  let idx = 0;
  while (idx < markdown.length) {
    const nl2 = markdown.indexOf("\n", idx);
    const hasNl = nl2 !== -1;
    const isCrlf = hasNl && nl2 > idx && markdown[nl2 - 1] === "\r";
    const lineEnd = hasNl ? isCrlf ? nl2 - 1 : nl2 : markdown.length;
    const line = markdown.slice(idx, lineEnd);
    const newline$1 = hasNl ? isCrlf ? "\r\n" : "\n" : "";
    const fenceMatch = parseFenceMarker(line);
    let nextLine = line;
    if (!inFence && !fenceMatch) {
      const splitAt = findInlineCustomBlockSplitIndex(line, idx);
      if (splitAt !== -1) {
        const separator = newline$1 || "\n";
        nextLine = `${line.slice(0, splitAt).replace(/[ \t]+$/, "")}${separator}${separator}${line.slice(splitAt).replace(/^[ \t]+/, "")}`;
      }
    }
    out += nextLine;
    out += newline$1;
    if (fenceMatch) if (inFence) {
      if (fenceMatch.markerChar === fenceChar && fenceMatch.markerLen >= fenceLen) {
        if (/^\s*$/.test(fenceMatch.rest)) {
          inFence = false;
          fenceChar = "";
          fenceLen = 0;
        }
      }
    } else {
      inFence = true;
      fenceChar = fenceMatch.markerChar;
      fenceLen = fenceMatch.markerLen;
    }
    idx = hasNl ? nl2 + 1 : markdown.length;
  }
  return out;
}
function normalizeCustomHtmlOpeningTagSameLine(markdown, tags) {
  if (!markdown || !tags.length) return markdown;
  const tagSet = new Set(tags.map((t2) => String(t2 ?? "").toLowerCase()));
  if (!tagSet.size) return markdown;
  const isIndentWs = (ch) => ch === " " || ch === "	";
  const isNameChar = (ch) => {
    const c = ch.charCodeAt(0);
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || ch === "_" || ch === "-";
  };
  const trimStartIndentWs = (s2) => {
    let i2 = 0;
    while (i2 < s2.length && isIndentWs(s2[i2])) i2++;
    return s2.slice(i2);
  };
  const findTagCloseIndexOutsideQuotes$1 = (input) => {
    let inSingle = false;
    let inDouble = false;
    for (let i2 = 0; i2 < input.length; i2++) {
      const ch = input[i2];
      if (ch === "\\") {
        i2++;
        continue;
      }
      if (!inDouble && ch === "'") {
        inSingle = !inSingle;
        continue;
      }
      if (!inSingle && ch === '"') {
        inDouble = !inDouble;
        continue;
      }
      if (!inSingle && !inDouble && ch === ">") return i2;
    }
    return -1;
  };
  const hasClosingTagOnLine = (line, from, tag) => {
    const lowerTag = tag.toLowerCase();
    let pos = line.indexOf("<", from);
    while (pos !== -1) {
      let i2 = pos + 1;
      while (i2 < line.length && isIndentWs(line[i2])) i2++;
      if (i2 >= line.length || line[i2] !== "/") {
        pos = line.indexOf("<", pos + 1);
        continue;
      }
      i2++;
      while (i2 < line.length && isIndentWs(line[i2])) i2++;
      if (i2 + lowerTag.length > line.length) {
        pos = line.indexOf("<", pos + 1);
        continue;
      }
      let matched = true;
      for (let j = 0; j < lowerTag.length; j++) {
        const ch = line[i2 + j];
        if ((ch >= "A" && ch <= "Z" ? String.fromCharCode(ch.charCodeAt(0) + 32) : ch) !== lowerTag[j]) {
          matched = false;
          break;
        }
      }
      if (!matched) {
        pos = line.indexOf("<", pos + 1);
        continue;
      }
      let k = i2 + lowerTag.length;
      if (k < line.length && isNameChar(line[k])) {
        pos = line.indexOf("<", pos + 1);
        continue;
      }
      while (k < line.length && isIndentWs(line[k])) k++;
      if (k < line.length && line[k] === ">") return true;
      pos = line.indexOf("<", pos + 1);
    }
    return false;
  };
  const normalizeLine = (line) => {
    let i2 = 0;
    while (i2 < line.length && isIndentWs(line[i2])) i2++;
    if (i2 >= line.length || line[i2] !== "<") return line;
    i2++;
    while (i2 < line.length && isIndentWs(line[i2])) i2++;
    if (i2 >= line.length || line[i2] === "/") return line;
    const nameStart = i2;
    while (i2 < line.length && isNameChar(line[i2])) i2++;
    if (i2 === nameStart) return line;
    const tagName = line.slice(nameStart, i2).toLowerCase();
    if (!tagSet.has(tagName)) return line;
    const gtRel = findTagCloseIndexOutsideQuotes$1(line.slice(i2));
    if (gtRel === -1) return line;
    const gt2 = i2 + gtRel;
    if (hasClosingTagOnLine(line, gt2 + 1, tagName)) return line;
    const rest = trimStartIndentWs(line.slice(gt2 + 1));
    if (!rest) return line;
    return `${line.slice(0, gt2 + 1)}
${rest}`;
  };
  let out = "";
  let idx = 0;
  while (idx < markdown.length) {
    const nl2 = markdown.indexOf("\n", idx);
    if (nl2 === -1) {
      out += normalizeLine(markdown.slice(idx));
      break;
    }
    const isCrlf = nl2 > idx && markdown[nl2 - 1] === "\r";
    const lineEnd = isCrlf ? nl2 - 1 : nl2;
    const line = markdown.slice(idx, lineEnd);
    out += normalizeLine(line);
    out += isCrlf ? "\r\n" : "\n";
    idx = nl2 + 1;
  }
  return out;
}
function ensureBlankLineAfterCustomHtmlCloseBeforeBlockMarkerSameLine(markdown, tags) {
  if (!markdown || !tags.length) return markdown;
  const tagSet = new Set(tags.map((t2) => String(t2 ?? "").toLowerCase()));
  if (!tagSet.size) return markdown;
  const isIndentWs = (ch) => ch === " " || ch === "	";
  const parseBlockquotePrefix = (rawLine) => {
    let i2 = 0;
    let saw = false;
    let prefixEnd = 0;
    while (i2 < rawLine.length) {
      while (i2 < rawLine.length && isIndentWs(rawLine[i2])) i2++;
      if (i2 >= rawLine.length || rawLine[i2] !== ">") break;
      saw = true;
      i2++;
      while (i2 < rawLine.length && isIndentWs(rawLine[i2])) i2++;
      prefixEnd = i2;
    }
    if (!saw) return null;
    return {
      prefix: rawLine.slice(0, prefixEnd),
      content: rawLine.slice(prefixEnd)
    };
  };
  const parseFenceMarker = (line) => {
    let i2 = 0;
    while (i2 < line.length && isIndentWs(line[i2])) i2++;
    const ch = line[i2];
    if (ch !== "`" && ch !== "~") return null;
    let j = i2;
    while (j < line.length && line[j] === ch) j++;
    const len = j - i2;
    if (len < 3) return null;
    return {
      markerChar: ch,
      markerLen: len,
      rest: line.slice(j)
    };
  };
  const closeTagRes = Array.from(tagSet).map((tag) => {
    return new RegExp(String.raw`(<\s*\/\s*${tag}\s*>)${"(?=[\\t ]*(?:#{1,6}[\\t ]+|>|(?:[*+-]|\\d+[.)])[\\t ]+|(?:`{3,}|~{3,})|\\||\\$\\$|:{3,}|\\[\\^[^\\]]+\\]:|(?:-{3,}|\\*{3,}|_{3,})))"}`, "gi");
  });
  let inFence = false;
  let fenceChar = "";
  let fenceLen = 0;
  let out = "";
  let idx = 0;
  while (idx < markdown.length) {
    const nl2 = markdown.indexOf("\n", idx);
    const hasNl = nl2 !== -1;
    const isCrlf = hasNl && nl2 > idx && markdown[nl2 - 1] === "\r";
    const lineEnd = hasNl ? isCrlf ? nl2 - 1 : nl2 : markdown.length;
    const rawLine = markdown.slice(idx, lineEnd);
    const newline$1 = hasNl ? isCrlf ? "\r\n" : "\n" : "";
    const bq = parseBlockquotePrefix(rawLine);
    const prefix = (bq == null ? void 0 : bq.prefix) ?? "";
    const contentLine = (bq == null ? void 0 : bq.content) ?? rawLine;
    const fenceMatch = parseFenceMarker(contentLine);
    if (fenceMatch) if (inFence) {
      if (fenceMatch.markerChar === fenceChar && fenceMatch.markerLen >= fenceLen) {
        if (/^\s*$/.test(fenceMatch.rest)) {
          inFence = false;
          fenceChar = "";
          fenceLen = 0;
        }
      }
    } else {
      inFence = true;
      fenceChar = fenceMatch.markerChar;
      fenceLen = fenceMatch.markerLen;
    }
    let nextContent = contentLine;
    if (!inFence && nextContent.includes("</")) for (const re of closeTagRes) nextContent = nextContent.replace(re, (match2, closeTag, offset3, src) => {
      var _a3, _b, _c, _d;
      if (src.replace(/^[\t ]+/, "").startsWith("|")) return match2;
      const before = src.slice(0, offset3).replace(/^[\t ]+/, "");
      if (before.length > 0) {
        const closeTagName = ((_b = (_a3 = closeTag.match(/^<\s*\/\s*([A-Z][\w:-]*)/i)) == null ? void 0 : _a3[1]) == null ? void 0 : _b.toLowerCase()) ?? "";
        const openTagName = ((_d = (_c = before.match(/^<\s*([A-Z][\w:-]*)/i)) == null ? void 0 : _c[1]) == null ? void 0 : _d.toLowerCase()) ?? "";
        if (!closeTagName || !openTagName || closeTagName !== openTagName) return match2;
      }
      return `${closeTag}

`;
    });
    if (prefix) {
      const withPrefix = prefix + nextContent.split("\n").join(`
${prefix}`);
      out += withPrefix;
    } else out += nextContent;
    out += newline$1;
    idx = hasNl ? nl2 + 1 : markdown.length;
  }
  return out;
}
function ensureBlankLineBeforeCustomHtmlBlocks(markdown, tags) {
  if (!markdown || !tags.length) return markdown;
  const tagSet = new Set(tags.map((t2) => String(t2 ?? "").toLowerCase()));
  if (!tagSet.size) return markdown;
  const isIndentWs = (ch) => ch === " " || ch === "	";
  const isIndentedCodeLine = (line) => {
    if (!line) return false;
    if (line[0] === "	") return true;
    let spaces = 0;
    for (let i2 = 0; i2 < line.length; i2++) {
      const ch = line[i2];
      if (ch === " ") {
        spaces++;
        if (spaces >= 4) return true;
        continue;
      }
      if (ch === "	") return true;
      break;
    }
    return false;
  };
  const isNameChar = (ch) => {
    const c = ch.charCodeAt(0);
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || ch === "_" || ch === "-" || ch === ":";
  };
  const trimStartIndentWs = (s2) => {
    let i2 = 0;
    while (i2 < s2.length && isIndentWs(s2[i2])) i2++;
    return s2.slice(i2);
  };
  const parseBlockquotePrefix = (rawLine) => {
    let i2 = 0;
    let saw = false;
    let prefixEnd = 0;
    while (i2 < rawLine.length) {
      while (i2 < rawLine.length && isIndentWs(rawLine[i2])) i2++;
      if (i2 >= rawLine.length || rawLine[i2] !== ">") break;
      saw = true;
      i2++;
      while (i2 < rawLine.length && isIndentWs(rawLine[i2])) i2++;
      prefixEnd = i2;
    }
    if (!saw) return null;
    const prefix = rawLine.slice(0, prefixEnd);
    return {
      prefix,
      key: prefix.replace(/[ \t]+$/, ""),
      content: rawLine.slice(prefixEnd)
    };
  };
  const previousLineLooksHtmlish = (line) => {
    return trimStartIndentWs(line).startsWith("<");
  };
  const lineIsBlank = (line) => {
    for (let i2 = 0; i2 < line.length; i2++) {
      const ch = line[i2];
      if (ch !== " " && ch !== "	") return false;
    }
    return true;
  };
  const parseOpeningCustomTagName = (line) => {
    if (isIndentedCodeLine(line)) return "";
    const trimmed = trimStartIndentWs(line);
    if (!trimmed.startsWith("<")) return "";
    let i2 = 1;
    while (i2 < trimmed.length && isIndentWs(trimmed[i2])) i2++;
    if (i2 >= trimmed.length) return "";
    if (trimmed[i2] === "/" || trimmed[i2] === "!" || trimmed[i2] === "?") return "";
    const nameStart = i2;
    while (i2 < trimmed.length && isNameChar(trimmed[i2])) i2++;
    if (i2 === nameStart) return "";
    const name = trimmed.slice(nameStart, i2).toLowerCase();
    if (!tagSet.has(name)) return "";
    const next = trimmed[i2];
    if (next && next !== " " && next !== "	" && next !== ">" && next !== "/") return "";
    return name;
  };
  const parseLineStartCustomTag = (line) => {
    if (isIndentedCodeLine(line)) return null;
    const trimmed = trimStartIndentWs(line);
    if (!trimmed.startsWith("<")) return null;
    let i2 = 1;
    while (i2 < trimmed.length && isIndentWs(trimmed[i2])) i2++;
    if (i2 >= trimmed.length) return null;
    const isClose = trimmed[i2] === "/";
    if (isClose) {
      i2++;
      while (i2 < trimmed.length && isIndentWs(trimmed[i2])) i2++;
    }
    const next = trimmed[i2];
    if (!next || next === "!" || next === "?") return null;
    const nameStart = i2;
    while (i2 < trimmed.length && isNameChar(trimmed[i2])) i2++;
    if (i2 === nameStart) return null;
    const name = trimmed.slice(nameStart, i2).toLowerCase();
    if (!tagSet.has(name)) return null;
    const boundary = trimmed[i2];
    if (boundary && boundary !== " " && boundary !== "	" && boundary !== ">" && boundary !== "/") return null;
    if (isClose) return {
      type: "close",
      name
    };
    if (/\/\s*>\s*$/.test(trimmed)) return {
      type: "open",
      name,
      complete: true
    };
    const gt2 = trimmed.indexOf(">", i2);
    if (gt2 !== -1) {
      const after = trimmed.slice(gt2 + 1);
      if (new RegExp(`<\\s*\\/\\s*${name}\\s*>`, "i").test(after)) return {
        type: "open",
        name,
        complete: true
      };
    }
    return {
      type: "open",
      name,
      complete: false
    };
  };
  const parseStandaloneCompleteHtmlTagLine = (line) => {
    if (isIndentedCodeLine(line)) return null;
    const trimmed = trimStartIndentWs(line).replace(/[ \t]+$/, "");
    if (!trimmed.startsWith("<")) return null;
    if (/^<\s*(?:!--|!doctype\b|\?)/i.test(trimmed)) return null;
    const selfClosingMatch = trimmed.match(/^<\s*([A-Z][\w:-]*)\b[^>]*\/\s*>\s*$/i);
    if (selfClosingMatch == null ? void 0 : selfClosingMatch[1]) return selfClosingMatch[1].toLowerCase();
    const fullMatch = trimmed.match(/^<\s*([A-Z][\w:-]*)\b[^>]*>[\s\S]*<\s*\/\s*([A-Z][\w:-]*)\s*>\s*$/i);
    if (!(fullMatch == null ? void 0 : fullMatch[1]) || !fullMatch[2]) return null;
    const openTag = fullMatch[1].toLowerCase();
    return openTag === fullMatch[2].toLowerCase() ? openTag : null;
  };
  let inFence = false;
  let fenceChar = "";
  let fenceLen = 0;
  const parseFenceMarker = (line) => {
    let i2 = 0;
    while (i2 < line.length && isIndentWs(line[i2])) i2++;
    const ch = line[i2];
    if (ch !== "`" && ch !== "~") return null;
    let j = i2;
    while (j < line.length && line[j] === ch) j++;
    const len = j - i2;
    if (len < 3) return null;
    return {
      markerChar: ch,
      markerLen: len,
      rest: line.slice(j)
    };
  };
  const fenceMatchLine = (rawLine) => parseFenceMarker(rawLine);
  const lineStartsWithBlockMarker = (line) => {
    const trimmed = trimStartIndentWs(line);
    if (!trimmed) return false;
    if (isIndentedCodeLine(line)) return true;
    return /^(?:#{1,6}[ \t]+|>|[*+-][ \t]+|\d+[.)][ \t]+|`{3,}|~{3,}|\||\$\$|:{3,}|\[\^[^\]]+\]:|-{3,}|\*{3,}|_{3,})/.test(trimmed);
  };
  const currentCustomBlockNeedsBoundary = (lineStart, currentQuoteKey, tagName) => {
    let scanIdx = lineStart;
    let depth = 0;
    while (scanIdx < markdown.length) {
      const nl2 = markdown.indexOf("\n", scanIdx);
      const hasNl = nl2 !== -1;
      const isCrlf = hasNl && nl2 > scanIdx && markdown[nl2 - 1] === "\r";
      const lineEnd = hasNl ? isCrlf ? nl2 - 1 : nl2 : markdown.length;
      const rawLine = markdown.slice(scanIdx, lineEnd);
      const blockquote$1 = parseBlockquotePrefix(rawLine);
      const quoteKey = (blockquote$1 == null ? void 0 : blockquote$1.key) ?? "";
      if (depth > 0 && currentQuoteKey && quoteKey !== currentQuoteKey) break;
      const contentLine = (blockquote$1 == null ? void 0 : blockquote$1.content) ?? rawLine;
      const lineTag = parseLineStartCustomTag(contentLine);
      if ((lineTag == null ? void 0 : lineTag.name) === tagName) {
        if (lineTag.type === "open") {
          if (!lineTag.complete) depth++;
        } else if (depth > 0) {
          depth--;
          if (depth === 0) return false;
        }
      } else if (depth > 0) {
        if (lineIsBlank(contentLine) || lineStartsWithBlockMarker(contentLine)) return true;
      }
      if (hasNl) scanIdx = nl2 + 1;
      else break;
    }
    return false;
  };
  let out = "";
  let idx = 0;
  let prevLineBlank = true;
  let prevLineHtmlish = false;
  let prevLineStandaloneCompleteHtmlTag = false;
  let lastNewline = "\n";
  const customBlockStack = [];
  let prevQuoteKey = "";
  while (idx < markdown.length) {
    const nl2 = markdown.indexOf("\n", idx);
    const hasNl = nl2 !== -1;
    const isCrlf = hasNl && nl2 > idx && markdown[nl2 - 1] === "\r";
    const lineEnd = hasNl ? isCrlf ? nl2 - 1 : nl2 : markdown.length;
    const line = markdown.slice(idx, lineEnd);
    const newline$1 = hasNl ? isCrlf ? "\r\n" : "\n" : "";
    const blockquote$1 = parseBlockquotePrefix(line);
    const quoteKey = (blockquote$1 == null ? void 0 : blockquote$1.key) ?? "";
    const contentLine = (blockquote$1 == null ? void 0 : blockquote$1.content) ?? line;
    const fenceMatch = fenceMatchLine(contentLine);
    if (fenceMatch) if (inFence) {
      if (fenceMatch.markerChar === fenceChar && fenceMatch.markerLen >= fenceLen) {
        if (/^\s*$/.test(fenceMatch.rest)) {
          inFence = false;
          fenceChar = "";
          fenceLen = 0;
        }
      }
    } else {
      inFence = true;
      fenceChar = fenceMatch.markerChar;
      fenceLen = fenceMatch.markerLen;
    }
    const insideCustomBlock = customBlockStack.length > 0;
    if (!inFence && !insideCustomBlock) {
      const opening = parseOpeningCustomTagName(contentLine);
      const needsBoundaryAfterStandaloneHtml = !!opening && !prevLineBlank && prevLineHtmlish && prevLineStandaloneCompleteHtmlTag && currentCustomBlockNeedsBoundary(idx, quoteKey, opening);
      if (opening && !prevLineBlank && (!prevLineHtmlish || needsBoundaryAfterStandaloneHtml)) {
        if (quoteKey && prevQuoteKey && quoteKey === prevQuoteKey) out += `${quoteKey}${lastNewline}`;
        else if (!quoteKey) out += lastNewline;
      }
    }
    out += line;
    out += newline$1;
    if (newline$1) lastNewline = newline$1;
    if (!inFence) {
      const tag = parseLineStartCustomTag(contentLine);
      if (tag) {
        if (tag.type === "open") {
          if (!tag.complete) customBlockStack.push(tag.name);
        } else for (let j = customBlockStack.length - 1; j >= 0; j--) if (customBlockStack[j] === tag.name) {
          customBlockStack.length = j;
          break;
        }
      }
    }
    const blank = lineIsBlank(contentLine);
    prevLineBlank = blank;
    prevLineHtmlish = !blank && previousLineLooksHtmlish(contentLine);
    prevLineStandaloneCompleteHtmlTag = !blank && !!parseStandaloneCompleteHtmlTagLine(contentLine);
    prevQuoteKey = quoteKey;
    idx = hasNl ? nl2 + 1 : markdown.length;
  }
  return out;
}
function parseMarkdownToStructure(markdown, md, options = {}) {
  var _a3, _b;
  const isFinal = !!options.final;
  let safeMarkdown = (markdown ?? "").toString().replace(/([^\\])\r(ight|ho)/g, "$1\\r$2").replace(/([^\\])\n(abla|eq|ot|exists)/g, "$1\\n$2");
  if (!isFinal) {
    if (safeMarkdown.endsWith("- *")) safeMarkdown = safeMarkdown.replace(/- \*$/, "- \\*");
    if (/(?:^|\n)\s*-\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/(?:^|\n)\s*-\s*$/, (m) => {
      return m.startsWith("\n") ? "\n" : "";
    });
    else if (/(?:^|\n)\s*--\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/(?:^|\n)\s*--\s*$/, (m) => {
      return m.startsWith("\n") ? "\n" : "";
    });
    else if (/(?:^|\n)\s*>\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/(?:^|\n)\s*>\s*$/, (m) => {
      return m.startsWith("\n") ? "\n" : "";
    });
    else if (/\n\s*[*+]\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/\n\s*[*+]\s*$/, "\n");
    else if (/(?:^|\n)\s*\d+\s*$/.test(safeMarkdown)) {
      if (!/^\d+$/.test(safeMarkdown.trim())) safeMarkdown = safeMarkdown.replace(/(?:^|\n)\s*\d+\s*$/, (m) => {
        return m.startsWith("\n") ? "\n" : "";
      });
    } else if (/(?:^|\n)\s*\d+[.)]\s+\*{1,3}\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/((?:^|\n)\s*\d+[.)]\s+)(\*{1,3})\s*$/, (_, prefix, stars) => `${prefix}${stars.split("").map(() => "\\*").join("")}`);
    else if (/(?:^|\n)\s*\d+[.)]\s*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/(?:^|\n)\s*\d+[.)]\s*$/, (m) => {
      return m.startsWith("\n") ? "\n" : "";
    });
    else if (/\n[[(]\n*$/.test(safeMarkdown)) safeMarkdown = safeMarkdown.replace(/(\n\[|\n\()+\n*$/g, "\n");
  }
  if (((_a3 = options.customHtmlTags) == null ? void 0 : _a3.length) && safeMarkdown.includes("<")) {
    const tags = normalizeCustomHtmlTags(options.customHtmlTags);
    if (tags.length) {
      safeMarkdown = ensureBlankLineBeforeInlineMultilineCustomHtmlBlocks(safeMarkdown, tags);
      safeMarkdown = normalizeCustomHtmlOpeningTagSameLine(safeMarkdown, tags);
      safeMarkdown = ensureBlankLineBeforeCustomHtmlBlocks(safeMarkdown, tags);
      safeMarkdown = ensureBlankLineAfterCustomHtmlCloseBeforeBlockMarkerSameLine(safeMarkdown, tags);
      if (!safeMarkdown.includes("</")) {
      } else for (const tag of tags) {
        const re = new RegExp(String.raw`(^[\t ]*<\s*\/\s*${tag}\s*>[\t ]*)(\r?\n)(?![\t ]*\r?\n|$)`, "gim");
        safeMarkdown = safeMarkdown.replace(re, "$1$2$2");
      }
    }
  }
  if (!isFinal) safeMarkdown = stripDanglingHtmlLikeTail(safeMarkdown);
  const standaloneHtmlDocument = parseStandaloneHtmlDocument(safeMarkdown);
  if (standaloneHtmlDocument) {
    const preHook = options.preTransformTokens;
    const postHook = options.postTransformTokens;
    if (typeof preHook === "function" || typeof postHook === "function") {
      const rawTokens = md.parse(safeMarkdown, { __markstreamFinal: isFinal });
      const hookedTokens = typeof preHook === "function" ? preHook(rawTokens) || rawTokens : rawTokens;
      if (typeof postHook === "function") postHook(hookedTokens);
    }
    return standaloneHtmlDocument;
  }
  const tokens = md.parse(safeMarkdown, { __markstreamFinal: isFinal });
  if (!tokens || !Array.isArray(tokens)) return [];
  const pre = options.preTransformTokens;
  const post = options.postTransformTokens;
  let transformedTokens = tokens;
  if (pre && typeof pre === "function") transformedTokens = pre(transformedTokens) || transformedTokens;
  const mdAny = md;
  const validateLink$1 = options.validateLink ?? ((_b = mdAny.options) == null ? void 0 : _b.validateLink) ?? (typeof mdAny.validateLink === "function" ? mdAny.validateLink : void 0);
  const internalOptions = {
    ...options,
    validateLink: validateLink$1,
    __markdownIt: md,
    __sourceMarkdown: safeMarkdown,
    __customHtmlBlockCursor: 0
  };
  let result = processTokens(transformedTokens, internalOptions);
  if (post && typeof post === "function") {
    const postResult = post(transformedTokens);
    if (Array.isArray(postResult)) {
      const first = postResult[0];
      const firstType = first == null ? void 0 : first.type;
      if (first && typeof firstType === "string") result = processTokens(postResult);
      else result = postResult;
    }
  }
  result = mergeSplitTopLevelHtmlBlocks(result, isFinal, safeMarkdown);
  result = combineStructuredDetailsHtmlBlocks(result, safeMarkdown, md, options, isFinal)[0];
  result = structureGenericHtmlBlockChildren(result, md, options, isFinal);
  if (isFinal) {
    const seen = /* @__PURE__ */ new WeakSet();
    const finalizeHtmlBlockLoading = (value) => {
      if (!value || typeof value !== "object") return;
      if (seen.has(value)) return;
      seen.add(value);
      if (Array.isArray(value)) {
        for (const item of value) finalizeHtmlBlockLoading(item);
        return;
      }
      const node = value;
      if (node.type === "html_block" && node.loading === true) node.loading = false;
      for (const child of Object.values(node)) finalizeHtmlBlockLoading(child);
    };
    finalizeHtmlBlockLoading(result);
  }
  if (options.debug) console.log("Parsed Markdown Tree Structure:", result);
  return result;
}
function processTokens(tokens, options) {
  if (!tokens || !Array.isArray(tokens)) return [];
  const result = [];
  let i2 = 0;
  while (i2 < tokens.length) {
    const handled = parseCommonBlockToken(tokens, i2, options, containerTokenHandlers);
    if (handled) {
      result.push(handled[0]);
      i2 = handled[1];
      continue;
    }
    const token = tokens[i2];
    switch (token.type) {
      case "paragraph_open": {
        const paragraphNode = parseParagraph(tokens, i2, options);
        const promoted = maybePromoteCustomNodeFromParagraph(paragraphNode, options);
        if (promoted) result.push(...promoted);
        else result.push(paragraphNode);
        i2 += 3;
        break;
      }
      case "bullet_list_open":
      case "ordered_list_open": {
        const [listNode, newIndex] = parseList(tokens, i2, options);
        result.push(listNode);
        i2 = newIndex;
        break;
      }
      case "blockquote_open": {
        const [blockquoteNode, newIndex] = parseBlockquote(tokens, i2, options);
        result.push(blockquoteNode);
        i2 = newIndex;
        break;
      }
      case "footnote_anchor": {
        const meta = token.meta ?? {};
        const id = String(meta.label ?? token.content ?? "");
        result.push({
          type: "footnote_anchor",
          id,
          raw: String(token.content ?? "")
        });
        i2++;
        break;
      }
      case "hardbreak":
        result.push(parseHardBreak());
        i2++;
        break;
      case "text": {
        const content = String(token.content ?? "");
        result.push({
          type: "paragraph",
          raw: content,
          children: content ? [{
            type: "text",
            content,
            raw: content
          }] : []
        });
        i2++;
        break;
      }
      case "inline":
        {
          const parsed = parseInlineTokens(token.children || [], String(token.content ?? ""), void 0, options);
          if (parsed.length === 0) {
          } else if (parsed.every((n2) => n2.type === "html_block")) result.push(...parsed);
          else {
            const paragraphNode = {
              type: "paragraph",
              raw: String(token.content ?? ""),
              children: parsed
            };
            const promoted = maybePromoteCustomNodeFromParagraph(paragraphNode, options);
            if (promoted) result.push(...promoted);
            else result.push(paragraphNode);
          }
        }
        i2 += 1;
        break;
      default:
        i2 += 1;
        break;
    }
  }
  return result;
}
var SAFE_BLOCKED_HTML_TAGS = /* @__PURE__ */ new Set([
  ...BLOCKED_HTML_TAGS,
  "base",
  "button",
  "datalist",
  "dialog",
  "embed",
  "fieldset",
  "form",
  "iframe",
  "input",
  "legend",
  "link",
  "meta",
  "object",
  "optgroup",
  "option",
  "output",
  "param",
  "select",
  "style",
  "template",
  "textarea",
  "title"
]);
var SAFE_ALLOWED_HTML_TAGS = /* @__PURE__ */ new Set([
  "a",
  "abbr",
  "b",
  "blockquote",
  "br",
  "caption",
  "code",
  "col",
  "colgroup",
  "dd",
  "details",
  "div",
  "dl",
  "dt",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "ins",
  "kbd",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul"
]);
var CUSTOM_TAG_REGEX = /<([a-z][a-z0-9-]*)\b[^>]*>/gi;
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function getString(value) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}
function isSafeAttrName(value) {
  return /^[^\s"'<>`=]+$/.test(value) && !/^on/i.test(value);
}
function escapeHtml(value) {
  return getString(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
function normalizeTagName(tagName) {
  return String(tagName ?? "").trim().toLowerCase();
}
function isHtmlTagBlocked(tagName, policy = "safe") {
  const normalized = normalizeTagName(tagName);
  if (!normalized) return false;
  if (policy === "escape") return true;
  if (policy === "trusted") return BLOCKED_HTML_TAGS.has(normalized);
  return !SAFE_ALLOWED_HTML_TAGS.has(normalized);
}
function isHtmlTagHardBlocked(tagName, policy = "safe") {
  const normalized = normalizeTagName(tagName);
  if (!normalized) return false;
  if (policy === "escape") return true;
  if (policy === "trusted") return BLOCKED_HTML_TAGS.has(normalized);
  return SAFE_BLOCKED_HTML_TAGS.has(normalized);
}
function serializeAttrs(attrs) {
  const pairs = Object.entries(attrs);
  if (pairs.length === 0) return "";
  return pairs.map(([name, value]) => value === "" ? ` ${name}` : ` ${name}="${escapeAttr(value)}"`).join("");
}
function isUnsafeSrcset(value) {
  const candidates = value.split(",").map((candidate) => candidate.trim()).filter(Boolean);
  if (candidates.length === 0) return false;
  return candidates.some((candidate) => {
    const url = candidate.split(/\s+/, 1)[0] ?? "";
    return !url || isUnsafeHtmlUrl(url);
  });
}
function shouldDropHtmlAttr(lowerKey, value, policy) {
  if (DANGEROUS_HTML_ATTRS.has(lowerKey)) return true;
  if (policy === "safe" && lowerKey === "style") return true;
  if (lowerKey === "srcset") return isUnsafeSrcset(value);
  if (URL_HTML_ATTRS.has(lowerKey) && value && isUnsafeHtmlUrl(value)) return true;
  return false;
}
function hardenAnchorAttrs(clean, policy, tagName) {
  if (policy !== "safe" || normalizeTagName(tagName) !== "a") return clean;
  if (String(clean.target ?? "").trim().toLowerCase() !== "_blank") return clean;
  const relTokens = new Set(String(clean.rel ?? "").split(/\s+/).map((token) => token.trim()).filter(Boolean).filter((token) => token.toLowerCase() !== "opener"));
  relTokens.add("noopener");
  relTokens.add("noreferrer");
  clean.rel = Array.from(relTokens).join(" ");
  return clean;
}
function sanitizeHtmlContentAttrs(attrs, policy = "safe", tagName) {
  const clean = {};
  for (const [key, value] of Object.entries(attrs)) {
    const safeName = key.trim();
    const lowerKey = safeName.toLowerCase();
    if (!safeName || !isSafeAttrName(safeName)) continue;
    if (shouldDropHtmlAttr(lowerKey, value, policy)) continue;
    clean[safeName] = value;
  }
  return hardenAnchorAttrs(clean, policy, tagName);
}
function isCustomHtmlComponentTag(tagName, customComponents) {
  const lowerTag = tagName.toLowerCase();
  if (EXTENDED_STANDARD_HTML_TAGS.has(lowerTag)) return false;
  return hasOwn(customComponents, lowerTag) || hasOwn(customComponents, tagName);
}
function sanitizeHtmlAttrs(attrs, policy = "safe", tagName) {
  const clean = {};
  for (const [key, value] of Object.entries(attrs)) {
    const safeName = key.trim();
    const lowerKey = safeName.toLowerCase();
    if (!safeName || !isSafeAttrName(safeName)) continue;
    if (shouldDropHtmlAttr(lowerKey, value, policy)) continue;
    clean[safeName] = value;
  }
  return hardenAnchorAttrs(clean, policy, tagName);
}
function tokenAttrsToRecord(attrs) {
  const record = {};
  if (!Array.isArray(attrs) || attrs.length === 0) return record;
  for (const [key, value] of attrs) {
    if (!key) continue;
    record[String(key)] = value == null ? "" : String(value);
  }
  return record;
}
function sanitizeHtmlTokenAttrs(attrs, policy = "safe", tagName) {
  const sanitized = sanitizeHtmlAttrs(tokenAttrsToRecord(attrs), policy, tagName);
  const pairs = Object.entries(sanitized).map(([key, value]) => [key, value]);
  return pairs.length > 0 ? pairs : void 0;
}
function convertHtmlPropValue(value, key) {
  const lowerKey = key.toLowerCase();
  if ([
    "checked",
    "disabled",
    "readonly",
    "required",
    "autofocus",
    "multiple",
    "hidden"
  ].includes(lowerKey)) return value === "true" || value === "" || value === key;
  if ([
    "value",
    "min",
    "max",
    "step",
    "width",
    "height",
    "size",
    "maxlength"
  ].includes(lowerKey)) {
    const num = Number(value);
    if (value !== "" && !Number.isNaN(num)) return num;
  }
  return value;
}
function convertHtmlAttrsToProps(attrs) {
  const result = {};
  for (const [key, value] of Object.entries(attrs)) result[key] = convertHtmlPropValue(value, key);
  return result;
}
function isMeaningfulText(text$1) {
  return text$1.trim().length > 0;
}
function tokenizeHtml(html) {
  const tokens = [];
  let pos = 0;
  while (pos < html.length) {
    if (html.startsWith("<!--", pos)) {
      const commentEnd = html.indexOf("-->", pos);
      if (commentEnd !== -1) {
        pos = commentEnd + 3;
        continue;
      }
      break;
    }
    const tagStart = html.indexOf("<", pos);
    if (tagStart === -1) {
      if (pos < html.length) {
        const remainingText = html.slice(pos);
        if (isMeaningfulText(remainingText)) tokens.push({
          type: "text",
          content: remainingText
        });
      }
      break;
    }
    if (tagStart > pos) {
      const textContent = html.slice(pos, tagStart);
      if (isMeaningfulText(textContent)) tokens.push({
        type: "text",
        content: textContent
      });
    }
    if (html.startsWith("![CDATA[", tagStart + 1)) {
      const cdataEnd = html.indexOf("]]>", tagStart);
      if (cdataEnd !== -1) {
        tokens.push({
          type: "text",
          content: html.slice(tagStart, cdataEnd + 3)
        });
        pos = cdataEnd + 3;
        continue;
      }
      break;
    }
    if (html.startsWith("!", tagStart + 1)) {
      const specialEnd = html.indexOf(">", tagStart);
      if (specialEnd !== -1) {
        pos = specialEnd + 1;
        continue;
      }
      break;
    }
    const tagEnd = html.indexOf(">", tagStart);
    if (tagEnd === -1) break;
    const tagContent = html.slice(tagStart + 1, tagEnd).trim();
    const isClosingTag$1 = tagContent.startsWith("/");
    const isSelfClosing$1 = tagContent.endsWith("/");
    if (isClosingTag$1) {
      const tagName = tagContent.slice(1).trim();
      tokens.push({
        type: "tag_close",
        tagName
      });
    } else {
      const spaceIndex = tagContent.indexOf(" ");
      let tagName;
      let attrsStr = "";
      if (spaceIndex === -1) tagName = isSelfClosing$1 ? tagContent.slice(0, -1).trim() : tagContent.trim();
      else {
        tagName = tagContent.slice(0, spaceIndex).trim();
        attrsStr = tagContent.slice(spaceIndex + 1);
      }
      const attrs = {};
      if (attrsStr) {
        const attrRegex = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S*)))?/g;
        let attrMatch;
        while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
          const name = attrMatch[1];
          const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";
          if (name && !name.endsWith("/")) attrs[name] = value;
        }
      }
      tokens.push({
        type: isSelfClosing$1 || VOID_HTML_TAGS.has(tagName.toLowerCase()) ? "self_closing" : "tag_open",
        tagName,
        attrs
      });
    }
    pos = tagEnd + 1;
  }
  return tokens;
}
function tokenizeHtmlPreservingText(html) {
  const tokens = [];
  let pos = 0;
  while (pos < html.length) {
    if (html.startsWith("<!--", pos)) {
      const commentEnd = html.indexOf("-->", pos);
      if (commentEnd !== -1) {
        pos = commentEnd + 3;
        continue;
      }
      break;
    }
    const tagStart = html.indexOf("<", pos);
    if (tagStart === -1) {
      if (pos < html.length) tokens.push({
        type: "text",
        content: html.slice(pos)
      });
      break;
    }
    if (tagStart > pos) tokens.push({
      type: "text",
      content: html.slice(pos, tagStart)
    });
    if (html.startsWith("![CDATA[", tagStart + 1)) {
      const cdataEnd = html.indexOf("]]>", tagStart);
      if (cdataEnd !== -1) {
        tokens.push({
          type: "text",
          content: html.slice(tagStart, cdataEnd + 3)
        });
        pos = cdataEnd + 3;
        continue;
      }
      break;
    }
    if (html.startsWith("!", tagStart + 1)) {
      const specialEnd = html.indexOf(">", tagStart);
      if (specialEnd !== -1) {
        pos = specialEnd + 1;
        continue;
      }
      break;
    }
    const tagEnd = html.indexOf(">", tagStart);
    if (tagEnd === -1) break;
    const tagContent = html.slice(tagStart + 1, tagEnd).trim();
    if (!tagContent) {
      pos = tagEnd + 1;
      continue;
    }
    const isClosingTag$1 = tagContent.startsWith("/");
    const isSelfClosing$1 = tagContent.endsWith("/");
    if (isClosingTag$1) {
      const tagName$1 = tagContent.slice(1).trim();
      tokens.push({
        type: "tag_close",
        tagName: tagName$1
      });
      pos = tagEnd + 1;
      continue;
    }
    const spaceIndex = tagContent.indexOf(" ");
    let tagName = "";
    let attrsStr = "";
    if (spaceIndex === -1) tagName = isSelfClosing$1 ? tagContent.slice(0, -1).trim() : tagContent.trim();
    else {
      tagName = tagContent.slice(0, spaceIndex).trim();
      attrsStr = tagContent.slice(spaceIndex + 1);
    }
    const attrs = {};
    if (attrsStr) {
      const attrRegex = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S*)))?/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
        const name = attrMatch[1];
        const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";
        if (name && !name.endsWith("/")) attrs[name] = value;
      }
    }
    tokens.push({
      type: isSelfClosing$1 || VOID_HTML_TAGS.has(tagName.toLowerCase()) ? "self_closing" : "tag_open",
      tagName,
      attrs
    });
    pos = tagEnd + 1;
  }
  return tokens;
}
function serializeLiteralHtmlTag(token) {
  const tagName = String(token.tagName ?? "").trim();
  if (!tagName) return "";
  if (token.type === "tag_close") return `&lt;/${escapeHtml(tagName)}&gt;`;
  const attrs = Object.entries(token.attrs ?? {}).map(([name, value]) => value === "" ? ` ${escapeHtml(name)}` : ` ${escapeHtml(name)}="${escapeAttr(value)}"`).join("");
  return token.type === "self_closing" ? `&lt;${escapeHtml(tagName)}${attrs} /&gt;` : `&lt;${escapeHtml(tagName)}${attrs}&gt;`;
}
function hasCustomHtmlComponents(content, customComponents) {
  if (!content || !content.includes("<")) return false;
  if (!customComponents || Object.keys(customComponents).length === 0) return false;
  CUSTOM_TAG_REGEX.lastIndex = 0;
  let match2;
  while ((match2 = CUSTOM_TAG_REGEX.exec(content)) !== null) if (isCustomHtmlComponentTag(match2[1], customComponents)) return true;
  return false;
}
function sanitizeHtmlContent(content, policy = "safe") {
  if (!content) return "";
  if (policy === "escape") return escapeHtml(content);
  const tokens = tokenizeHtmlPreservingText(content);
  const stack = [];
  const output = [];
  let blockedDepth = 0;
  for (const token of tokens) {
    if (token.type === "text") {
      if (blockedDepth === 0) output.push(escapeHtml(token.content ?? ""));
      continue;
    }
    const tagName = normalizeTagName(token.tagName);
    if (!tagName) continue;
    if (isHtmlTagHardBlocked(tagName, policy)) {
      if (token.type === "tag_open") blockedDepth += 1;
      else if (token.type === "tag_close" && blockedDepth > 0) blockedDepth -= 1;
      continue;
    }
    if (blockedDepth > 0) continue;
    if (policy === "safe" && isHtmlTagBlocked(tagName, policy)) {
      output.push(serializeLiteralHtmlTag(token));
      continue;
    }
    if (token.type === "self_closing") {
      output.push(`<${tagName}${serializeAttrs(sanitizeHtmlContentAttrs(token.attrs ?? {}, policy, tagName))}>`);
      continue;
    }
    if (token.type === "tag_open") {
      output.push(`<${tagName}${serializeAttrs(sanitizeHtmlContentAttrs(token.attrs ?? {}, policy, tagName))}>`);
      if (!VOID_HTML_TAGS.has(tagName)) stack.push(tagName);
      continue;
    }
    const matchedIndex = stack.lastIndexOf(tagName);
    if (matchedIndex === -1) continue;
    while (stack.length > matchedIndex + 1) {
      const danglingTag = stack.pop();
      if (danglingTag) output.push(`</${danglingTag}>`);
    }
    const closingTag = stack.pop();
    if (closingTag) output.push(`</${closingTag}>`);
  }
  while (stack.length > 0) {
    const danglingTag = stack.pop();
    if (danglingTag) output.push(`</${danglingTag}>`);
  }
  return output.join("");
}
var _registeredMarkdownPlugins = [];
function registerMarkdownPlugin(plugin) {
  _registeredMarkdownPlugins.push(plugin);
}
function clearRegisteredMarkdownPlugins() {
  _registeredMarkdownPlugins.length = 0;
}
function getMarkdown(msgId = `editor-${Date.now()}`, options = {}) {
  const md = factory(options);
  const defaultTranslations = { "common.copy": "Copy" };
  let t2;
  if (typeof options.i18n === "function") t2 = options.i18n;
  else if (options.i18n && typeof options.i18n === "object") {
    const i18nMap = options.i18n;
    t2 = (key) => i18nMap[key] ?? defaultTranslations[key] ?? key;
  } else t2 = (key) => defaultTranslations[key] ?? key;
  if (Array.isArray(options.plugin)) for (const p of options.plugin) {
    const pluginItem = p;
    if (Array.isArray(pluginItem)) {
      const [fn2, ...params] = pluginItem;
      if (typeof fn2 === "function") md.use(fn2, ...params);
    } else if (typeof pluginItem === "function") md.use(pluginItem);
  }
  if (Array.isArray(options.apply)) for (const fn2 of options.apply) try {
    fn2(md);
  } catch (e2) {
    console.error("[getMarkdown] apply function threw an error", e2);
  }
  if (_registeredMarkdownPlugins.length) {
    for (const p of _registeredMarkdownPlugins) if (Array.isArray(p)) {
      const [fn2, ...params] = p;
      if (typeof fn2 === "function") md.use(fn2, ...params);
    } else if (typeof p === "function") md.use(p);
  }
  md.use(sub_plugin);
  md.use(sup_plugin);
  md.use(ins_plugin$1);
  const markdownItCheckboxPlugin = import_markdown_it_task_checkbox.default ?? import_markdown_it_task_checkbox;
  md.use(markdownItCheckboxPlugin);
  md.use(ins_plugin);
  md.use(footnote_plugin);
  md.core.ruler.after("block", "mark_fence_closed", (state) => {
    var _a3;
    const s2 = state;
    const src = s2.src;
    const envFinal = !!((_a3 = s2.env) == null ? void 0 : _a3.__markstreamFinal);
    const lines = src.split(/\r?\n/);
    for (const token of s2.tokens) {
      if (token.type !== "fence" || !token.map || !token.markup) continue;
      const openLine = token.map[0];
      const endLine = token.map[1];
      const markup = token.markup;
      const marker = markup[0];
      const minLen = markup.length;
      const line = lines[Math.max(0, endLine - 1)] ?? "";
      let i2 = 0;
      while (i2 < line.length && (line[i2] === " " || line[i2] === "	")) i2++;
      let count = 0;
      while (i2 + count < line.length && line[i2 + count] === marker) count++;
      let j = i2 + count;
      while (j < line.length && (line[j] === " " || line[j] === "	")) j++;
      const closed = envFinal ? true : endLine > openLine + 1 && count >= minLen && j === line.length;
      const tokenShape = token;
      tokenShape.meta = tokenShape.meta ?? {};
      tokenShape.meta.unclosed = !closed;
      tokenShape.meta.closed = !!closed;
    }
  });
  const waveRule = (state, silent) => {
    const s2 = state;
    const start = s2.pos;
    if (s2.src[start] !== "~") return false;
    const prevChar = s2.src[start - 1];
    const nextChar = s2.src[start + 1];
    if (/\d/.test(prevChar) && /\d/.test(nextChar)) {
      if (!silent) {
        const token = s2.push("text", "", 0);
        token.content = "~";
      }
      s2.pos += 1;
      return true;
    }
    return false;
  };
  md.inline.ruler.before("sub", "wave", waveRule);
  md.renderer.rules.fence = (tokens, idx) => {
    const tokenShape = tokens[idx];
    const info = String(tokenShape.info ?? "").trim();
    const str = String(tokenShape.content ?? "");
    const encodedCode = btoa(unescape(encodeURIComponent(str)));
    const language = String(info ?? "text");
    return `<div class="code-block" data-code="${encodedCode}" data-lang="${language}" id="${`editor-${msgId}-${idx}-${language}`}">
      <div class="code-header">
        <span class="code-lang">${language.toUpperCase()}</span>
        <button class="copy-button" data-code="${encodedCode}">${t2("common.copy")}</button>
      </div>
      <div class="code-editor"></div>
    </div>`;
  };
  const RE_REFERENCE = /^\[(\d+)\]/;
  const RE_REFERENCE_LABEL = /^\[([^\]\n]+)\]/;
  const shouldPreserveReferenceStyleLink = (afterMatch) => {
    if (!afterMatch.startsWith("[")) return false;
    const nextLabelMatch = RE_REFERENCE_LABEL.exec(afterMatch);
    if (!nextLabelMatch) return afterMatch !== "[" && !/^\[\d+$/.test(afterMatch);
    const nextLabel = String(nextLabelMatch[1] ?? "");
    if (afterMatch.slice(nextLabelMatch[0].length).startsWith("(")) return false;
    return !/^\d+$/.test(nextLabel);
  };
  const referenceInline = (state, silent) => {
    const s2 = state;
    if (s2.src[s2.pos] !== "[") return false;
    const match2 = RE_REFERENCE.exec(s2.src.slice(s2.pos));
    if (!match2) return false;
    const lookbehind = s2.src.slice(Math.max(0, s2.pos - 120), s2.pos);
    if (/"[^"\n]{1,80}"\s*:\s*$/.test(lookbehind)) return false;
    const afterMatch = s2.src.slice(s2.pos + match2[0].length);
    if (afterMatch.startsWith("](") || afterMatch.startsWith("(") || shouldPreserveReferenceStyleLink(afterMatch)) return false;
    if (!silent) {
      const id = match2[1];
      const token = s2.push("reference", "span", 0);
      token.content = id;
      token.markup = match2[0];
      token.raw = match2[0];
    }
    s2.pos += match2[0].length;
    return true;
  };
  md.inline.ruler.before("escape", "reference", referenceInline);
  md.renderer.rules.reference = (tokens, idx) => {
    const tokensAny = tokens;
    const id = String(tokensAny[idx].content ?? "");
    return `<span class="reference-link" data-reference-id="${id}" role="button" tabindex="0" title="Click to view reference">${id}</span>`;
  };
  return md;
}

// node_modules/markstream-core/dist/index.js
function resolveStreamingTextState({ nextContent, previousContent, typewriterEnabled }) {
  if (!typewriterEnabled) return {
    settledContent: nextContent,
    streamedDelta: "",
    appended: false
  };
  if (nextContent === previousContent) return {
    settledContent: nextContent,
    streamedDelta: "",
    appended: false
  };
  if (previousContent && nextContent.startsWith(previousContent) && nextContent.length > previousContent.length) return {
    settledContent: previousContent,
    streamedDelta: nextContent.slice(previousContent.length),
    appended: true
  };
  return {
    settledContent: nextContent,
    streamedDelta: "",
    appended: false
  };
}
function resolveStreamingTextUpdate({ nextContent, persistedContent, currentState, typewriterEnabled, streamRenderVersionChanged = false }) {
  const renderedContent = `${currentState.settledContent}${currentState.streamedDelta}`;
  if (!typewriterEnabled) return {
    settledContent: nextContent,
    streamedDelta: "",
    appended: false
  };
  if (currentState.streamedDelta && renderedContent === nextContent) {
    if (streamRenderVersionChanged) return {
      settledContent: renderedContent,
      streamedDelta: "",
      appended: false
    };
    return {
      settledContent: currentState.settledContent,
      streamedDelta: currentState.streamedDelta,
      appended: false
    };
  }
  return resolveStreamingTextState({
    nextContent,
    previousContent: persistedContent ?? renderedContent,
    typewriterEnabled
  });
}
function toPositiveFiniteNumber(value, fallback, min2 = 1) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? Math.max(min2, normalized) : fallback;
}
function toNonNegativeFiniteNumber(value, fallback) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? Math.max(0, normalized) : fallback;
}
var SmoothMarkdownStreamControllerImpl = class {
  constructor(options = {}, notify) {
    this.source = "";
    this.visible = "";
    this.done = false;
    this.paused = false;
    this.listeners = /* @__PURE__ */ new Set();
    this.rafId = 0;
    this.startedAt = 0;
    this.lastTick = 0;
    this.charBudget = 0;
    this.hasStarted = false;
    this.destroyed = false;
    this.getSnapshot = () => ({
      source: this.source,
      visible: this.visible,
      done: this.done,
      paused: this.paused,
      pendingChars: this.pendingChars,
      caughtUp: this.caughtUp,
      final: this.final
    });
    this.subscribe = (listener) => {
      if (this.destroyed) return () => {
      };
      this.listeners.add(listener);
      return () => {
        this.listeners.delete(listener);
      };
    };
    this.enqueue = (chunk) => {
      if (this.destroyed || !chunk) return;
      if (this.done) this.done = false;
      const hadSource = this.source.length > 0;
      const wasIdle = this.pendingChars <= 0;
      this.source += chunk;
      if (wasIdle) {
        const t2 = now2();
        this.startedAt = hadSource && this.hasStarted ? t2 - this.normalizedStartDelayMs : t2;
        this.lastTick = t2;
        this.charBudget = 0;
      }
      this.hasStarted = true;
      this.emit();
      this.ensureLoop();
    };
    this.finish = (finishOptions = {}) => {
      if (this.destroyed) return;
      this.done = true;
      if (finishOptions.flush ?? this.flushOnFinish) {
        this.visible = this.source;
        this.charBudget = 0;
        this.currentCps = this.minCharsPerSecond;
        this.cancelLoop();
        this.emit();
        return;
      }
      this.emit();
      this.ensureLoop();
    };
    this.flush = () => {
      if (this.destroyed) return;
      this.visible = this.source;
      this.charBudget = 0;
      this.currentCps = this.minCharsPerSecond;
      this.cancelLoop();
      this.emit();
    };
    this.reset = (initialMarkdown = "") => {
      if (this.destroyed) return;
      this.cancelLoop();
      this.source = initialMarkdown;
      this.visible = initialMarkdown;
      this.done = false;
      this.paused = false;
      this.hasStarted = false;
      this.startedAt = 0;
      this.lastTick = 0;
      this.charBudget = 0;
      this.currentCps = this.minCharsPerSecond;
      this.emit();
    };
    this.pause = () => {
      if (this.destroyed) return;
      if (this.paused) return;
      this.paused = true;
      this.cancelLoop();
      this.emit();
    };
    this.resume = () => {
      if (this.destroyed) return;
      if (!this.paused) return;
      this.paused = false;
      const t2 = now2();
      this.lastTick = t2;
      this.startedAt || (this.startedAt = t2);
      this.emit();
      this.ensureLoop();
    };
    this.destroy = () => {
      if (this.destroyed) return;
      this.destroyed = true;
      this.cancelLoop();
      this.listeners.clear();
    };
    this.dispose = () => {
      this.destroy();
    };
    this.tick = (timestamp) => {
      this.rafId = 0;
      if (this.destroyed) return;
      if (this.paused) return;
      if (this.pendingChars <= 0) {
        this.startedAt = 0;
        this.lastTick = 0;
        this.charBudget = 0;
        this.currentCps = this.minCharsPerSecond;
        return;
      }
      if (timestamp - this.startedAt < this.normalizedStartDelayMs) {
        this.rafId = requestAnimationFrame(this.tick);
        return;
      }
      const minFrameMs = 1e3 / Math.max(1, this.maxCommitFps);
      const dt2 = Math.min(100, Math.max(0, timestamp - this.lastTick));
      if (dt2 < minFrameMs) {
        this.rafId = requestAnimationFrame(this.tick);
        return;
      }
      this.lastTick = timestamp;
      const pending = this.pendingChars;
      const latencyMs = pending > this.normalizedCatchUpThreshold ? this.normalizedCatchUpLatencyMs : this.normalizedTargetLatencyMs;
      const targetCps = clamp2(pending / Math.max(1e-3, latencyMs / 1e3), this.minCharsPerSecond, this.maxCharsPerSecond);
      this.currentCps += (targetCps - this.currentCps) * 0.2;
      this.charBudget += this.currentCps * (dt2 / 1e3);
      if (this.charBudget < 1) {
        this.ensureLoop();
        return;
      }
      const desiredCount = Math.min(Math.floor(this.charBudget), this.maxCharsPerCommit);
      const nextSlice = takeGraphemes(this.source.slice(this.visible.length), desiredCount, this.segmenter);
      if (nextSlice.text) {
        this.visible += nextSlice.text;
        this.charBudget = Math.max(0, this.charBudget - nextSlice.graphemeCount);
        this.emit();
      }
      this.ensureLoop();
    };
    const { minCharsPerSecond: rawMinCps = 40, maxCharsPerSecond: rawMaxCps = 1e3, targetLatencyMs: rawTargetLatencyMs = 900, catchUpLatencyMs: rawCatchUpLatencyMs = 350, catchUpThreshold: rawCatchUpThreshold = 600, maxCommitFps: rawMaxFps = 30, startDelayMs: rawStartDelayMs = 80, maxCharsPerCommit: rawMaxChars = 80, flushOnFinish = false } = options;
    this.minCharsPerSecond = toPositiveFiniteNumber(rawMinCps, 40, 1);
    this.maxCharsPerSecond = Math.max(this.minCharsPerSecond, toPositiveFiniteNumber(rawMaxCps, 1e3, 1));
    this.normalizedTargetLatencyMs = toPositiveFiniteNumber(rawTargetLatencyMs, 900, 1);
    this.normalizedCatchUpLatencyMs = toPositiveFiniteNumber(rawCatchUpLatencyMs, 350, 1);
    this.normalizedCatchUpThreshold = toNonNegativeFiniteNumber(rawCatchUpThreshold, 600);
    this.normalizedStartDelayMs = toNonNegativeFiniteNumber(rawStartDelayMs, 80);
    this.maxCommitFps = Math.trunc(toPositiveFiniteNumber(rawMaxFps, 30, 1));
    this.maxCharsPerCommit = Math.trunc(toPositiveFiniteNumber(rawMaxChars, 80, 1));
    this.flushOnFinish = flushOnFinish;
    this.segmenter = createGraphemeSegmenter();
    if (notify) this.listeners.add(notify);
    this.currentCps = this.minCharsPerSecond;
  }
  get pendingChars() {
    return Math.max(0, this.source.length - this.visible.length);
  }
  get caughtUp() {
    return this.pendingChars === 0;
  }
  get final() {
    return this.done && this.caughtUp;
  }
  ensureLoop() {
    if (this.destroyed || this.rafId || this.paused || this.pendingChars <= 0) return;
    if (typeof requestAnimationFrame !== "function") {
      this.flush();
      return;
    }
    this.rafId = requestAnimationFrame(this.tick);
  }
  cancelLoop() {
    if (!this.rafId) return;
    if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }
  emit() {
    if (this.destroyed) return;
    for (const listener of this.listeners) listener();
  }
};
function createSmoothMarkdownStream(options = {}, notify) {
  const controller = new SmoothMarkdownStreamControllerImpl(options, notify);
  return {
    getSnapshot: controller.getSnapshot,
    subscribe: controller.subscribe,
    enqueue: controller.enqueue,
    finish: controller.finish,
    flush: controller.flush,
    reset: controller.reset,
    pause: controller.pause,
    resume: controller.resume,
    destroy: controller.destroy,
    dispose: controller.dispose
  };
}
function createGraphemeSegmenter() {
  if (typeof Intl === "undefined") return null;
  const SegmenterCtor = Intl.Segmenter;
  if (!SegmenterCtor) return null;
  return new SegmenterCtor(void 0, { granularity: "grapheme" });
}
function takeGraphemes(input, count, segmenter) {
  if (!input || count <= 0) return {
    text: "",
    graphemeCount: 0
  };
  if (!segmenter) {
    const parts = Array.from(input).slice(0, count);
    return {
      text: parts.join(""),
      graphemeCount: parts.length
    };
  }
  let output = "";
  let used = 0;
  for (const part of segmenter.segment(input)) {
    if (used >= count) break;
    output += part.segment;
    used++;
  }
  return {
    text: output,
    graphemeCount: used
  };
}
function now2() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}
function clamp2(value, min2, max2) {
  return Math.min(max2, Math.max(min2, value));
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp3(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list2 = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list2 = list2.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list2 = list2.concat(list2.map(getOppositeAlignmentPlacement));
    }
  }
  return list2;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference: reference2,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference2.x + reference2.width / 2 - floating.width / 2;
  const commonY = reference2.y + reference2.height / 2 - floating.height / 2;
  const commonAlign = reference2[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference2.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case "right":
      coords = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference2.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference2.x,
        y: reference2.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference2, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference: reference2,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i2 = 0; i2 < middleware.length; i2++) {
    const currentMiddleware = middleware[i2];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn: fn2
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn2({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference: reference2,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference: reference2,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp3(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d2) => getSideAxis(d2.placement) === initialSideAxis ? d2.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d2) => d2.overflows[0] <= 0).sort((a2, b) => a2.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d2) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d2.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d2) => [d2.placement, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp3(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp3(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list2, traverseIframes) {
  var _node$ownerDocument2;
  if (list2 === void 0) {
    list2 = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list2.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list2.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el2) => isElement(el2) && getNodeName(el2) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i2 = 1; i2 < clippingAncestors.length; i2++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i2], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a2, b) {
  return a2.x === b.x && a2.y === b.y && a2.width === b.width && a2.height === b.height;
}
function observeMove(element, onMove) {
  let io2 = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io2) == null || _io.disconnect();
    io2 = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io2 = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io2 = new IntersectionObserver(handleObserve, options);
    }
    io2.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference2, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference2);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference2) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference2);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference2, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference2, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/markstream-vue/dist/exports.js
var e = Object.defineProperty;
var n = Object.defineProperties;
var t = Object.getOwnPropertyDescriptors;
var o = Object.getOwnPropertySymbols;
var l = Object.prototype.hasOwnProperty;
var r = Object.prototype.propertyIsEnumerable;
var a = (n2, t2, o2) => t2 in n2 ? e(n2, t2, { enumerable: true, configurable: true, writable: true, value: o2 }) : n2[t2] = o2;
var i = (e2, n2) => {
  for (var t2 in n2 || (n2 = {})) l.call(n2, t2) && a(e2, t2, n2[t2]);
  if (o) for (var t2 of o(n2)) r.call(n2, t2) && a(e2, t2, n2[t2]);
  return e2;
};
var s = (e2, o2) => n(e2, t(o2));
var u = (e2, n2, t2) => a(e2, "symbol" != typeof n2 ? n2 + "" : n2, t2);
var d = (e2, n2, t2) => new Promise((o2, l2) => {
  var r2 = (e3) => {
    try {
      i2(t2.next(e3));
    } catch (n3) {
      l2(n3);
    }
  }, a2 = (e3) => {
    try {
      i2(t2.throw(e3));
    } catch (n3) {
      l2(n3);
    }
  }, i2 = (e3) => e3.done ? o2(e3.value) : Promise.resolve(e3.value).then(r2, a2);
  i2((t2 = t2.apply(e2, n2)).next());
});
var Oe = ["cite"];
var Ee = (e2, n2) => {
  const t2 = e2.__vccOpts || e2;
  for (const [o2, l2] of n2) t2[o2] = l2;
  return t2;
};
var Te = Ee(defineComponent({ __name: "BlockquoteNode", props: { node: {}, indexKey: {}, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, emits: ["copy"], setup(e2) {
  const n2 = e2;
  return (t2, o2) => (openBlock(), createElementBlock("blockquote", { class: "blockquote", dir: "auto", cite: e2.node.cite }, [createVNode(unref(pa), { "index-key": `blockquote-${n2.indexKey}`, nodes: n2.node.children || [], "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: o2[0] || (o2[0] = (e3) => t2.$emit("copy", e3)) }, null, 8, ["index-key", "nodes", "custom-id", "typewriter", "fade"])], 8, Oe));
} }), [["__scopeId", "data-v-83a20fd5"]]);
Te.install = (e2) => {
  e2.component(Te.__name, Te);
};
var Ie = ["aria-label"];
var Ae = { key: 0, xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", class: "checkbox-icon checkbox-unchecked" };
var $e = { key: 1, xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", class: "checkbox-icon checkbox-checked" };
var He = Ee(defineComponent({ __name: "CheckboxNode", props: { node: {} }, setup: (e2) => (n2, t2) => (openBlock(), createElementBlock("span", { class: "checkbox-node", role: "img", "aria-label": e2.node.checked ? "checked" : "unchecked" }, [e2.node.checked ? (openBlock(), createElementBlock("svg", $e, [...t2[1] || (t2[1] = [createBaseVNode("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4", fill: "currentColor" }, null, -1), createBaseVNode("path", { d: "M9 12l2 2 4-4", stroke: "hsl(var(--ms-background))", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, null, -1)])])) : (openBlock(), createElementBlock("svg", Ae, [...t2[0] || (t2[0] = [createBaseVNode("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4", stroke: "currentColor", "stroke-width": "2" }, null, -1)])]))], 8, Ie)) }), [["__scopeId", "data-v-be21ab83"]]);
He.install = (e2) => {
  e2.component(He.__name, He);
};
var Re = { class: "definition-list" };
var ze = { class: "definition-term" };
var Pe = { class: "definition-desc" };
var We = Ee(defineComponent({ __name: "DefinitionListNode", props: { node: {}, indexKey: {}, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, emits: ["copy"], setup(e2) {
  const n2 = e2;
  return (e3, t2) => (openBlock(), createElementBlock("dl", Re, [(openBlock(true), createElementBlock(Fragment, null, renderList(n2.node.items, (o2, l2) => (openBlock(), createElementBlock(Fragment, { key: l2 }, [createBaseVNode("dt", ze, [createVNode(unref(pa), { "index-key": `definition-term-${n2.indexKey}-${l2}`, nodes: o2.term, "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: t2[0] || (t2[0] = (n3) => e3.$emit("copy", n3)) }, null, 8, ["index-key", "nodes", "custom-id", "typewriter", "fade"])]), createBaseVNode("dd", Pe, [createVNode(unref(pa), { "index-key": `definition-desc-${n2.indexKey}-${l2}`, nodes: o2.definition, "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: t2[1] || (t2[1] = (n3) => e3.$emit("copy", n3)) }, null, 8, ["index-key", "nodes", "custom-id", "typewriter", "fade"])])], 64))), 128))]));
} }), [["__scopeId", "data-v-4e103b30"]]);
We.install = (e2) => {
  e2.component(We.__name, We);
};
var je = { class: "emoji-node" };
var Fe = Ee(defineComponent({ __name: "EmojiNode", props: { node: {} }, setup: (e2) => (n2, t2) => (openBlock(), createElementBlock("span", je, toDisplayString(e2.node.name), 1)) }), [["__scopeId", "data-v-de55dc97"]]);
Fe.install = (e2) => {
  e2.component(Fe.__name, Fe);
};
var De = "__global__";
var Ke = "__MARKSTREAM_VUE_CUSTOM_COMPONENTS_STORE__";
var Ve = (() => {
  const e2 = globalThis;
  if (e2[Ke]) return e2[Ke];
  const n2 = { scopedCustomComponents: {}, revision: shallowRef(0) };
  return e2[Ke] = n2, n2;
})();
var Ue = Ve.revision;
function qe(e2, n2) {
  "string" == typeof e2 ? Ve.scopedCustomComponents[e2] = n2 || {} : Ve.scopedCustomComponents[De] = e2 || {}, Ue.value++;
}
function Xe(e2) {
  const n2 = Ve.scopedCustomComponents[De] || {};
  if (!e2) return n2;
  const t2 = Ve.scopedCustomComponents[e2] || {};
  return n2 && 0 !== Object.keys(n2).length ? t2 && 0 !== Object.keys(t2).length ? i(i({}, n2), t2) : n2 : t2;
}
function Ge(e2) {
  if (e2 === De) throw new Error("removeCustomComponents: use clearGlobalCustomComponents() to clear the global mapping");
  delete Ve.scopedCustomComponents[e2], Ue.value++;
}
function Ze() {
  delete Ve.scopedCustomComponents[De], Ue.value++;
}
var Je = ["id"];
var Ye = ["title"];
var Qe = Ee(defineComponent({ __name: "FootnoteReferenceNode", props: { node: {} }, setup(e2) {
  const n2 = `#fnref--${e2.node.id}`;
  function t2() {
    if ("undefined" == typeof document) return;
    const e3 = document.querySelector(n2);
    e3 ? e3.scrollIntoView({ behavior: "smooth" }) : console.warn(`Element with href: ${n2} not found`);
  }
  return (o2, l2) => (openBlock(), createElementBlock("sup", { id: `fnref-${e2.node.id}`, class: "footnote-reference", onClick: t2 }, [createBaseVNode("span", { href: n2, title: `查看脚注 ${e2.node.id}`, class: "footnote-link cursor-pointer" }, "[" + toDisplayString(e2.node.id) + "]", 9, Ye)], 8, Je));
} }), [["__scopeId", "data-v-c1463a29"]]);
Qe.install = (e2) => {
  e2.component(Qe.__name, Qe);
};
var en = (() => {
  try {
    return Boolean(false);
  } catch (e2) {
  }
  return false;
})();
function nn(e2) {
  en && console.warn(e2);
}
function tn(e2) {
  return sanitizeHtmlAttrs(e2);
}
function on(e2, n2, t2 = false) {
  const o2 = Object.entries(null != n2 ? n2 : {}), l2 = o2.length > 0 ? o2.map(([e3, n3]) => "" === n3 ? ` ${e3}` : ` ${e3}="${n3}"`).join("") : "";
  return t2 ? `<${e2}${l2} />` : `<${e2}${l2}>`;
}
function ln(e2, n2) {
  Array.isArray(n2) ? e2.push(...n2) : null != n2 && e2.push(n2);
}
function rn(e2, n2, t2, o2, l2, r2, a2 = false) {
  const u2 = function(e3, n3) {
    return isCustomHtmlComponentTag(e3, n3);
  }(e2, o2);
  if (BLOCKED_HTML_TAGS.has(e2.toLowerCase()) || !u2 && isHtmlTagHardBlocked(e2, r2)) return null;
  if (!u2 && isHtmlTagBlocked(e2, r2)) return a2 ? [on(e2, n2, true)] : [on(e2, n2), ...t2, `</${e2}>`];
  const d2 = sanitizeHtmlAttrs(n2, r2, e2), c = d2.key, m = null != c && "" !== c ? c : l2;
  if (u2) {
    const n3 = o2[e2] || o2[e2.toLowerCase()], l3 = function(e3) {
      return convertHtmlAttrsToProps(e3);
    }(d2);
    return h(n3, s(i({}, l3), { key: m }), t2.length > 0 ? t2 : void 0);
  }
  return h(e2, s(i({}, d2), { innerHTML: void 0, key: m }), t2.length > 0 ? t2 : void 0);
}
function an(e2, n2) {
  return hasCustomHtmlComponents(e2, n2);
}
function sn(e2, n2, t2 = "safe") {
  if (!e2) return [];
  try {
    const o3 = function(e3, n3, t3 = "safe") {
      let o4 = 0;
      const l2 = [], r2 = [];
      for (const a2 of e3) if ("text" === a2.type) (l2.length > 0 ? l2[l2.length - 1].children : r2).push(a2.content);
      else if ("self_closing" === a2.type) {
        const e4 = rn(a2.tagName, a2.attrs || {}, [], n3, "ms-html-" + o4++, t3, true);
        ln(l2.length > 0 ? l2[l2.length - 1].children : r2, e4);
      } else if ("tag_open" === a2.type) l2.push({ tagName: a2.tagName, children: [], attrs: a2.attrs, autoKey: "ms-html-" + o4++ });
      else if ("tag_close" === a2.type) {
        const e4 = a2.tagName.toLowerCase();
        let o5 = -1;
        for (let n4 = l2.length - 1; n4 >= 0; n4--) if (l2[n4].tagName.toLowerCase() === e4) {
          o5 = n4;
          break;
        }
        if (-1 !== o5) for (; l2.length > o5; ) {
          const a3 = l2.pop(), i2 = rn(a3.tagName, a3.attrs || {}, a3.children, n3, a3.autoKey, t3);
          l2.length > 0 ? ln(l2[l2.length - 1].children, i2) : ln(r2, i2), a3.tagName.toLowerCase() !== e4 && l2.length > o5 && nn(`Auto-closing unclosed tag: <${a3.tagName}>`);
        }
        else nn(`Ignoring closing tag with no matching opening tag: </${a2.tagName}>`);
      }
      for (; l2.length > 0; ) {
        const e4 = l2.pop(), o5 = rn(e4.tagName, e4.attrs || {}, e4.children, n3, e4.autoKey, t3);
        l2.length > 0 ? ln(l2[l2.length - 1].children, o5) : ln(r2, o5), nn(`Auto-closing unclosed tag: <${e4.tagName}>`);
      }
      return r2;
    }(tokenizeHtml(e2), n2, t2);
    return o3;
  } catch (l2) {
    return o2 = l2, en && console.error("Failed to parse HTML to VNodes:", o2), null;
  }
  var o2;
}
var un = ["innerHTML"];
var dn = Ee(defineComponent({ __name: "HtmlInlineNode", props: { node: {}, customId: {}, htmlPolicy: {} }, setup(e2) {
  const n2 = e2, t2 = inject("markstreamHtmlPolicy", void 0), o2 = computed(() => {
    var e3, o3;
    return null != (o3 = null != (e3 = n2.htmlPolicy) ? e3 : null == t2 ? void 0 : t2.value) ? o3 : "safe";
  }), l2 = computed(() => (Ue.value, Xe(n2.customId))), r2 = defineComponent({ name: "DynamicRenderer", props: { nodes: { type: Array, required: true } }, render() {
    return this.nodes;
  } }), a2 = computed(() => {
    const e3 = n2.node.content;
    if (!e3) return { mode: "html", content: "" };
    if ("escape" === o2.value) return { mode: "html", content: sanitizeHtmlContent(e3, o2.value) };
    if (n2.node.loading && !n2.node.autoClosed) return { mode: "text", content: e3 };
    if (n2.node.loading && n2.node.autoClosed) {
      const n3 = sn(e3, l2.value, o2.value);
      if (null !== n3) return { mode: "dynamic", nodes: n3 };
    }
    if (!an(e3, l2.value)) return { mode: "html", content: sanitizeHtmlContent(e3, o2.value) };
    const t3 = sn(e3, l2.value, o2.value);
    return null === t3 ? { mode: "html", content: sanitizeHtmlContent(e3, o2.value) } : { mode: "dynamic", nodes: t3 };
  });
  return (e3, t3) => "dynamic" === a2.value.mode ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["html-inline-node", { "html-inline-node--loading": n2.node.loading }]) }, [createVNode(unref(r2), { nodes: a2.value.nodes }, null, 8, ["nodes"])], 2)) : "text" === a2.value.mode ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["html-inline-node", { "html-inline-node--loading": n2.node.loading }]) }, toDisplayString(a2.value.content), 3)) : (openBlock(), createElementBlock("span", { key: 2, class: normalizeClass(["html-inline-node", { "html-inline-node--loading": n2.node.loading }]), innerHTML: a2.value.content }, null, 10, un));
} }), [["__scopeId", "data-v-d7e17280"]]);
dn.install = (e2) => {
  e2.component(dn.__name, dn);
};
var cn = { class: "inline-code" };
var mn = { key: 0 };
var hn = Ee(defineComponent({ __name: "InlineCodeNode", props: { node: {} }, setup(e2) {
  const n2 = e2, t2 = useAttrs(), o2 = inject("markstreamFade", void 0), l2 = inject("markstreamTextStreamState", void 0), r2 = inject("markstreamStreamVersion", void 0), a2 = computed(() => {
    const e3 = t2.fade;
    return "" === e3 || true === e3 || "true" === e3 || false !== e3 && "false" !== e3 && void 0;
  }), i2 = computed(() => "boolean" == typeof a2.value ? a2.value : "boolean" != typeof (null == o2 ? void 0 : o2.value) || o2.value), s2 = computed(() => {
    var e3;
    const n3 = null != (e3 = t2["index-key"]) ? e3 : t2.indexKey;
    return null == n3 || "" === n3 ? "" : String(n3);
  }), u2 = ref(n2.node.code), d2 = ref("");
  let c = null == r2 ? void 0 : r2.value;
  const m = ref(0);
  function h2() {
    return u2.value + d2.value;
  }
  function f() {
    d2.value && (u2.value = h2(), d2.value = "");
  }
  watch([() => n2.node.code, s2, i2, () => null == r2 ? void 0 : r2.value], ([e3, n3, t3, o3]) => {
    const r3 = String(null != e3 ? e3 : ""), a3 = s2.value, h3 = o3 !== c;
    c = o3;
    const f2 = resolveStreamingTextUpdate({ nextContent: r3, persistedContent: a3 ? null == l2 ? void 0 : l2.get(a3) : void 0, currentState: { settledContent: u2.value, streamedDelta: d2.value }, typewriterEnabled: i2.value, streamRenderVersionChanged: h3 });
    u2.value = f2.settledContent, d2.value = f2.streamedDelta, f2.appended && (m.value += 1), a3 && (null == l2 || l2.set(a3, r3));
  }, { immediate: true }), watch(i2, (e3) => {
    var n3;
    e3 || (n3 = h2(), u2.value = n3, d2.value = "");
  });
  const p = computed(() => m.value % 2 == 0 ? "inline-code-stream-delta--a" : "inline-code-stream-delta--b");
  return (e3, n3) => (openBlock(), createElementBlock("code", cn, [u2.value ? (openBlock(), createElementBlock("span", mn, toDisplayString(u2.value), 1)) : createCommentVNode("", true), d2.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["inline-code-stream-delta", [p.value]]), onAnimationend: f }, toDisplayString(d2.value), 35)) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-1348822e"]]);
hn.install = (e2) => {
  e2.component(hn.__name, hn);
};
var fn = ["id"];
var pn = ["data-placement"];
var vn = Ee(defineComponent({ __name: "Tooltip", props: { visible: { type: Boolean }, anchorEl: {}, content: {}, placement: {}, offset: {}, originX: {}, originY: {}, id: {}, isDark: { type: [Boolean, null] } }, setup(e2) {
  var n2;
  const t2 = e2, o2 = ref(null), l2 = ref(null), r2 = ref({ transform: "translate3d(0px, 0px, 0px)", left: "0px", top: "0px" }), a2 = ref({}), i2 = ref(null != (n2 = t2.placement) ? n2 : "top"), s2 = ref(false);
  let u2 = null;
  function c() {
    return d(this, null, function* () {
      var e3, n3;
      if (!t2.anchorEl || !o2.value) return;
      const s3 = [offset2(null != (e3 = t2.offset) ? e3 : 6), flip2(), shift2({ padding: 6 }), ...l2.value ? [arrow2({ element: l2.value, padding: 4 })] : []], { x: u3, y: d2, placement: c2, middlewareData: m } = yield computePosition2(t2.anchorEl, o2.value, { placement: null != (n3 = t2.placement) ? n3 : "top", middleware: s3, strategy: "fixed" });
      if (r2.value.transform = `translate3d(${Math.round(u3)}px, ${Math.round(d2)}px, 0)`, r2.value.left = "0px", r2.value.top = "0px", i2.value = c2, m.arrow && l2.value) {
        const { x: e4, y: n4 } = m.arrow, t3 = { top: "bottom", bottom: "top", left: "right", right: "left" }[c2.split("-")[0]];
        a2.value = { left: null != e4 ? `${e4}px` : "", top: null != n4 ? `${n4}px` : "", [t3]: "-3px" };
      }
    });
  }
  return watch(() => t2.visible, (e3) => d(null, null, function* () {
    if (e3) if (s2.value = false, yield nextTick(), t2.anchorEl && o2.value) try {
      const e4 = t2.anchorEl.getBoundingClientRect();
      yield c();
      const n3 = r2.value.transform;
      if (null != t2.originX && null != t2.originY) {
        const o3 = Math.abs(Number(t2.originX) - e4.left), l3 = Math.abs(Number(t2.originY) - e4.top);
        Math.hypot(o3, l3) > 120 ? (r2.value.transform = `translate3d(${Math.round(t2.originX)}px, ${Math.round(t2.originY)}px, 0)`, yield nextTick(), s2.value = true, yield nextTick(), r2.value.transform = n3) : s2.value = true;
      } else s2.value = true;
      u2 = autoUpdate(t2.anchorEl, o2.value, c);
    } catch (n3) {
      yield c(), s2.value = true, u2 = autoUpdate(t2.anchorEl, o2.value, c);
    }
    else s2.value = true;
    else s2.value = false, u2 && (u2(), u2 = null);
  })), watch([() => t2.anchorEl, () => t2.placement, () => t2.content], () => d(null, null, function* () {
    t2.visible && t2.anchorEl && o2.value && (yield nextTick(), yield c());
  })), onBeforeUnmount(() => {
    u2 && u2();
  }), (n3, u3) => (openBlock(), createBlock(Teleport, { to: "body" }, [createBaseVNode("div", { class: normalizeClass(["markstream-vue", { dark: e2.isDark }]) }, [createVNode(Transition, { name: "tooltip", appear: "" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { id: t2.id, ref_key: "tooltip", ref: o2, style: normalizeStyle({ position: "fixed", left: r2.value.left, top: r2.value.top, transform: r2.value.transform }), class: "tooltip-element", role: "tooltip" }, [createTextVNode(toDisplayString(e2.content) + " ", 1), createBaseVNode("div", { ref_key: "arrowEl", ref: l2, class: "tooltip-arrow", "data-placement": i2.value, style: normalizeStyle(a2.value) }, null, 12, pn)], 12, fn), [[vShow, e2.visible && s2.value]])]), _: 1 })], 2)]));
} }), [["__scopeId", "data-v-e28aa7bd"]]);
var gn = ref(false);
var yn = ref("");
var wn = ref("top");
var xn = ref(null);
var kn = ref(null);
var Nn = ref(null);
var bn = ref(null);
var Mn = ref(null);
var Sn = null;
var _n = null;
function Bn() {
  Sn && (clearTimeout(Sn), Sn = null), _n && (clearTimeout(_n), _n = null);
}
var Cn = false;
function Ln(e2, n2, t2 = "top", o2 = false, l2, r2) {
  if (!e2) return;
  !function() {
    if (!Cn && "undefined" != typeof document) try {
      Cn = true;
      const e3 = document.createElement("div");
      e3.setAttribute("data-singleton-tooltip", "1"), document.body.appendChild(e3), createApp({ setup: () => () => {
        var e4;
        return h(vn, { visible: gn.value, "anchor-el": xn.value, content: yn.value, placement: wn.value, id: kn.value, originX: Nn.value, originY: bn.value, isDark: null != (e4 = Mn.value) ? e4 : void 0 });
      } }).mount(e3);
    } catch (e3) {
      Cn = false, console.warn("[markstream-vue] Failed to mount Tooltip component. Tooltips will be disabled.", e3);
    }
  }(), Bn();
  const a2 = () => {
    var o3, a3;
    kn.value = `tooltip-${Date.now()}-${Math.floor(1e3 * Math.random())}`, xn.value = e2, yn.value = n2, wn.value = t2, Nn.value = null != (o3 = null == l2 ? void 0 : l2.x) ? o3 : null, bn.value = null != (a3 = null == l2 ? void 0 : l2.y) ? a3 : null, Mn.value = "boolean" == typeof r2 ? r2 : null, gn.value = true;
    try {
      e2.setAttribute("aria-describedby", kn.value);
    } catch (i2) {
    }
  };
  o2 ? a2() : Sn = setTimeout(a2, 80);
}
function On(e2 = false) {
  Bn();
  const n2 = () => {
    if (xn.value && kn.value) try {
      xn.value.removeAttribute("aria-describedby");
    } catch (e3) {
    }
    gn.value = false, xn.value = null, kn.value = null, Nn.value = null, bn.value = null;
  };
  e2 ? n2() : _n = setTimeout(n2, 120);
}
var En = { "common.copy": "Copy", "common.copied": "Copied", "common.decrease": "Decrease", "common.reset": "Reset", "common.increase": "Increase", "common.expand": "Expand", "common.collapse": "Collapse", "common.preview": "Preview", "common.source": "Source", "common.export": "Export", "common.open": "Open", "common.minimize": "Minimize", "common.zoomIn": "Zoom in", "common.zoomOut": "Zoom out", "common.resetZoom": "Reset zoom", "image.loadError": "Image failed to load", "image.loading": "Loading image..." };
function Tn(e2) {
  Object.assign(En, e2);
}
var In = (e2) => {
  var n2;
  return null != (n2 = En[e2]) ? n2 : function(e3) {
    return (e3.split(".").pop() || e3).replace(/[_-]/g, " ").replace(/([A-Z])/g, " $1").replace(/\s+/g, " ").replace(/\b\w/g, (e4) => e4.toUpperCase()).trim();
  }(e2);
};
function An(e2) {
  return { t(n2) {
    if (e2.te && En[n2] && !e2.te(n2)) return In(n2);
    const t2 = e2.t(n2);
    return t2 === n2 && En[n2] ? In(n2) : t2;
  } };
}
function $n() {
  const e2 = function() {
    var e3, n2;
    try {
      const t2 = getCurrentInstance(), o2 = null == t2 ? void 0 : t2.proxy, l2 = null == o2 ? void 0 : o2.$t;
      if ("function" == typeof l2) {
        const e4 = null == o2 ? void 0 : o2.$te;
        return { t: l2.bind(o2), te: "function" == typeof e4 ? e4.bind(o2) : void 0 };
      }
      const r2 = null == (n2 = null == (e3 = null == t2 ? void 0 : t2.appContext) ? void 0 : e3.config) ? void 0 : n2.globalProperties, a2 = null == r2 ? void 0 : r2.$t;
      if ("function" == typeof a2) {
        const e4 = null == r2 ? void 0 : r2.$te;
        return { t: a2.bind(r2), te: "function" == typeof e4 ? e4.bind(r2) : void 0 };
      }
    } catch (t2) {
    }
    return null;
  }();
  if (e2) return An(e2);
  try {
    const e3 = globalThis.$vueI18nUse || null;
    if (e3 && "function" == typeof e3) try {
      const n2 = e3();
      if (n2 && "function" == typeof n2.t) return An({ t: n2.t.bind(n2), te: "function" == typeof n2.te ? n2.te.bind(n2) : void 0 });
    } catch (n2) {
    }
  } catch (n2) {
  }
  return { t: In };
}
var Hn = { class: "image-node-container" };
var Rn = ["src", "alt", "title", "loading", "fetchpriority", "decoding", "tabindex", "aria-label"];
var zn = { key: "placeholder", class: "image-placeholder" };
var Pn = { key: 1, class: "image-node__raw-text" };
var Wn = { key: "error", class: "image-error" };
var jn = Ee(defineComponent({ __name: "ImageNode", props: { node: {}, fallbackSrc: { default: "" }, lazy: { type: Boolean, default: false }, usePlaceholder: { type: Boolean, default: true } }, emits: ["load", "error", "click"], setup(e2, { emit: n2 }) {
  const t2 = e2, o2 = n2, l2 = ref(false), r2 = ref(false), a2 = ref(false), i2 = computed(() => r2.value && t2.fallbackSrc ? t2.fallbackSrc : t2.node.src), s2 = computed(() => !t2.lazy);
  function u2() {
    t2.fallbackSrc && !a2.value ? (a2.value = true, r2.value = true) : (r2.value = true, o2("error", t2.node.src));
  }
  function d2() {
    l2.value = true, r2.value = false, o2("load", i2.value);
  }
  function c(e3) {
    e3.preventDefault(), l2.value && !r2.value && o2("click", [e3, i2.value]);
  }
  const { t: m } = $n();
  return watch(i2, () => {
    l2.value = false, r2.value = false;
  }), (n3, o3) => (openBlock(), createElementBlock("span", Hn, [createVNode(Transition, { name: "img-switch", mode: "out-in" }, { default: withCtx(() => {
    var a3, h2, f, p, v;
    return [e2.node.loading || r2.value ? r2.value ? e2.node.loading || t2.fallbackSrc ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", Wn, [renderSlot(n3.$slots, "error", { node: t2.node, displaySrc: i2.value, imageLoaded: l2.value, hasError: r2.value, fallbackSrc: t2.fallbackSrc, lazy: t2.lazy }, () => [o3[1] || (o3[1] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, [createBaseVNode("path", { fill: "currentColor", d: "M2 2h20v10h-2V4H4v9.586l5-5L14.414 14L13 15.414l-4-4l-5 5V20h8v2H2zm13.547 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-3 1a3 3 0 1 1 6 0a3 3 0 0 1-6 0m3.625 6.757L19 17.586l2.828-2.829l1.415 1.415L20.414 19l2.829 2.828l-1.415 1.415L19 20.414l-2.828 2.829l-1.415-1.415L17.586 19l-2.829-2.828z" })], -1)), createBaseVNode("span", null, toDisplayString(unref(m)("image.loadError")), 1)], true)])) : (openBlock(), createElementBlock("span", zn, [t2.usePlaceholder ? renderSlot(n3.$slots, "placeholder", { key: 0, node: t2.node, displaySrc: i2.value, imageLoaded: l2.value, hasError: r2.value, fallbackSrc: t2.fallbackSrc, lazy: t2.lazy }, () => [o3[0] || (o3[0] = createBaseVNode("span", { class: "image-shimmer" }, null, -1))], true) : (openBlock(), createElementBlock("span", Pn, toDisplayString(e2.node.raw), 1))])) : (openBlock(), createElementBlock("img", { key: "image", src: i2.value, alt: String(null != (h2 = null != (a3 = t2.node.alt) ? a3 : t2.node.title) ? h2 : ""), title: String(null != (p = null != (f = t2.node.title) ? f : t2.node.alt) ? p : ""), class: normalizeClass(["image-node__img", { "is-loading": !s2.value && !l2.value, "is-loaded": s2.value || l2.value, "cursor-pointer": l2.value }]), loading: t2.lazy ? "lazy" : void 0, fetchpriority: s2.value ? "high" : void 0, decoding: s2.value ? "sync" : "async", tabindex: l2.value ? 0 : -1, "aria-label": null != (v = t2.node.alt) ? v : unref(m)("image.preview"), onError: u2, onLoad: d2, onClick: c }, null, 42, Rn))];
  }), _: 3 })]));
} }), [["__scopeId", "data-v-0f18a0a5"]]);
jn.install = (e2) => {
  e2.component(jn.__name, jn);
};
var Fn = null;
var Dn = false;
var Kn = qn;
function Vn(e2) {
  var n2;
  const t2 = null != (n2 = null == e2 ? void 0 : e2.default) ? n2 : e2;
  return t2 && "function" == typeof t2.renderToString ? t2 : null;
}
function Un() {
  try {
    const e2 = globalThis;
    return Vn(null == e2 ? void 0 : e2.katex);
  } catch (e2) {
    return null;
  }
}
function qn() {
  return d(null, null, function* () {
    const e2 = Un();
    if (e2) return e2;
    const n2 = yield import("./__vite-optional-peer-dep_katex_markstream-vue-2FFTFGQT.js");
    try {
      yield import("./mhchem_markstream-vue-FAVB5Q72.js");
    } catch (t2) {
    }
    return Vn(n2);
  });
}
function Xn(e2) {
  Kn = e2, Fn = null, Dn = false;
}
function Gn(e2) {
  Xn(null != e2 ? e2 : qn);
}
function Zn() {
  Xn(null);
}
function Jn() {
  return "function" == typeof Kn;
}
function Yn() {
  var e2;
  const n2 = Un();
  if (n2) return Fn = n2, Fn;
  if (Fn) return Fn;
  const t2 = Kn;
  if (!t2 || t2 === qn) return null;
  try {
    const n3 = t2();
    return n3 && "function" != typeof (null == n3 ? void 0 : n3.then) ? (Fn = null != (e2 = Vn(n3)) ? e2 : n3, Fn) : null;
  } catch (o2) {
    return null;
  }
}
function Qn() {
  return d(this, null, function* () {
    var e2;
    const n2 = Un();
    if (n2) return Fn = n2, Fn;
    if (Fn) return Fn;
    if (Dn) return null;
    const t2 = Kn;
    if (!t2) return Dn = true, null;
    try {
      const n3 = yield t2();
      if (n3) return Fn = null != (e2 = Vn(n3)) ? e2 : n3, Fn;
    } catch (o2) {
    }
    return Dn = true, null;
  });
}
var et = shallowRef(false);
var nt = null;
var tt = { key: 0 };
var ot = Ee(defineComponent({ __name: "TextNode", props: { node: {} }, emits: ["copy"], setup(e2) {
  const n2 = e2, t2 = (nt || (nt = Qn().then((e3) => {
    et.value = !!e3;
  }).catch(() => {
    et.value = false;
  })), readonly(et)), o2 = useAttrs(), l2 = inject("markstreamFade", void 0), r2 = inject("markstreamTextStreamState", void 0), a2 = inject("markstreamStreamVersion", void 0), i2 = computed(() => {
    const e3 = o2.fade;
    return "" === e3 || true === e3 || "true" === e3 || false !== e3 && "false" !== e3 && void 0;
  }), s2 = computed(() => "boolean" == typeof i2.value ? i2.value : "boolean" != typeof (null == l2 ? void 0 : l2.value) || l2.value), u2 = computed(() => {
    var e3;
    const n3 = null != (e3 = o2["index-key"]) ? e3 : o2.indexKey;
    return null == n3 || "" === n3 ? "" : String(n3);
  }), d2 = ref(n2.node.content), c = ref("");
  let m = null == a2 ? void 0 : a2.value;
  const h2 = ref(0);
  function f() {
    return d2.value + c.value;
  }
  function p() {
    c.value && (d2.value = f(), c.value = "");
  }
  watch([() => n2.node.content, u2, s2, () => null == a2 ? void 0 : a2.value], ([e3, n3, t3, o3]) => {
    const l3 = String(null != e3 ? e3 : ""), a3 = u2.value, i3 = o3 !== m;
    m = o3;
    const f2 = resolveStreamingTextUpdate({ nextContent: l3, persistedContent: a3 ? null == r2 ? void 0 : r2.get(a3) : void 0, currentState: { settledContent: d2.value, streamedDelta: c.value }, typewriterEnabled: s2.value, streamRenderVersionChanged: i3 });
    d2.value = f2.settledContent, c.value = f2.streamedDelta, f2.appended && (h2.value += 1), a3 && (null == r2 || r2.set(a3, l3));
  }, { immediate: true }), watch(s2, (e3) => {
    var n3;
    e3 || (n3 = f(), d2.value = n3, c.value = "");
  });
  const v = computed(() => h2.value % 2 == 0 ? "text-node-stream-delta--a" : "text-node-stream-delta--b");
  return (n3, o3) => (openBlock(), createElementBlock("span", { class: normalizeClass([[unref(t2) && e2.node.center ? "text-node-center" : ""], "whitespace-pre-wrap break-words text-node"]) }, [d2.value ? (openBlock(), createElementBlock("span", tt, toDisplayString(d2.value), 1)) : createCommentVNode("", true), c.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["text-node-stream-delta", [v.value]]), onAnimationend: p }, toDisplayString(c.value), 35)) : createCommentVNode("", true)], 2));
} }), [["__scopeId", "data-v-43f5105c"]]);
ot.install = (e2) => {
  e2.component(ot.__name, ot);
};
var lt = defineAsyncComponent(() => d(null, null, function* () {
  var e2;
  if ("test" === (null == (e2 = function() {
    const e3 = Reflect.get(globalThis, "process");
    return null == e3 ? void 0 : e3.env;
  }()) ? void 0 : e2.NODE_ENV) && "undefined" != typeof window) return (e3) => {
    var n2, t2, o2, l2;
    return h(ot, s(i({}, e3), { node: { type: "text", content: null != (t2 = e3.node.raw) ? t2 : `$${null != (n2 = e3.node.content) ? n2 : ""}$`, raw: null != (l2 = e3.node.raw) ? l2 : `$${null != (o2 = e3.node.content) ? o2 : ""}$` } }));
  };
  try {
    if (yield Qn()) return (yield import("./index2-UUL5H4G2.js")).default;
  } catch (n2) {
    console.warn('[markstream-vue] Optional peer dependencies for MathInlineNode are missing. Falling back to text rendering. To enable full math rendering features, please install "katex".', n2);
  }
  return (e3) => {
    var n2, t2, o2, l2;
    return h(ot, s(i({}, e3), { node: { type: "text", content: null != (t2 = e3.node.raw) ? t2 : `$${null != (n2 = e3.node.content) ? n2 : ""}$`, raw: null != (l2 = e3.node.raw) ? l2 : `$${null != (o2 = e3.node.content) ? o2 : ""}$` } }));
  };
}));
var rt = defineAsyncComponent(() => d(null, null, function* () {
  try {
    if (yield Qn()) return (yield import("./index3-35QX5BG4.js")).default;
  } catch (e2) {
    console.warn('[markstream-vue] Optional peer dependencies for MathBlockNode are missing. Falling back to text rendering. To enable full math rendering features, please install "katex".', e2);
  }
  return (e2) => {
    var n2, t2, o2, l2;
    return h(ot, s(i({}, e2), { node: { type: "text", content: null != (t2 = e2.node.raw) ? t2 : `$$${null != (n2 = e2.node.content) ? n2 : ""}$$`, raw: null != (l2 = e2.node.raw) ? l2 : `$$${null != (o2 = e2.node.content) ? o2 : ""}$$` } }));
  };
}));
var at = Ee(defineComponent({ __name: "ReferenceNode", props: { node: {}, messageId: {}, threadId: {} }, emits: ["click", "mouseEnter", "mouseLeave"], setup: (e2) => (n2, t2) => (openBlock(), createElementBlock("span", { class: "reference-node cursor-pointer text-xs rounded-md px-1.5 mx-0.5", role: "button", tabindex: "0", onClick: t2[0] || (t2[0] = (t3) => n2.$emit("click", t3, e2.node.id, e2.messageId, e2.threadId)), onMouseenter: t2[1] || (t2[1] = (t3) => n2.$emit("mouseEnter", t3, e2.node.id, e2.messageId, e2.threadId)), onMouseleave: t2[2] || (t2[2] = (t3) => n2.$emit("mouseLeave", t3, e2.node.id, e2.messageId, e2.threadId)) }, toDisplayString(e2.node.id), 33)) }), [["__scopeId", "data-v-775c65e4"]]);
at.install = (e2) => {
  e2.component(at.__name, at);
};
var it = { class: "superscript-node" };
var st = { key: 1 };
var ut = Ee(defineComponent({ __name: "SuperscriptNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, emphasis: Bt, footnote_reference: Qe, strikethrough: vt, highlight: St, insert: bt, subscript: mt, emoji: Fe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("sup", it, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createElementBlock(Fragment, { key: `${e2.indexKey || "superscript"}-${l3}` }, [o2[t4.type] ? (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: 0, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "superscript"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"])) : (openBlock(), createElementBlock("span", st, toDisplayString(t4.content || t4.raw), 1))], 64))), 128))]));
} }), [["__scopeId", "data-v-6dc1e3ba"]]);
ut.install = (e2) => {
  e2.component(ut.__name, ut);
};
var dt = { class: "subscript-node" };
var ct = { key: 1 };
var mt = Ee(defineComponent({ __name: "SubscriptNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, emphasis: Bt, footnote_reference: Qe, strikethrough: vt, highlight: St, insert: bt, superscript: ut, emoji: Fe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("sub", dt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createElementBlock(Fragment, { key: `${e2.indexKey || "subscript"}-${l3}` }, [o2[t4.type] ? (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: 0, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "subscript"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"])) : (openBlock(), createElementBlock("span", ct, toDisplayString(t4.content || t4.raw), 1))], 64))), 128))]));
} }), [["__scopeId", "data-v-69de9b81"]]);
mt.install = (e2) => {
  e2.component(mt.__name, mt);
};
var ht = { class: "strong-node" };
var ft = Ee(defineComponent({ __name: "StrongNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, emphasis: Bt, strikethrough: vt, highlight: St, insert: bt, subscript: mt, superscript: ut, emoji: Fe, footnote_reference: Qe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("strong", ht, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "strong"}-${l3}`, "index-key": `${e2.indexKey || "strong"}-${l3}`, node: t4, "custom-id": n2.customId }, null, 8, ["index-key", "node", "custom-id"]))), 128))]));
} }), [["__scopeId", "data-v-af3ce037"]]);
ft.install = (e2) => {
  e2.component(ft.__name, ft);
};
var pt = { class: "strikethrough-node" };
var vt = Ee(defineComponent({ __name: "StrikethroughNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, emphasis: Bt, highlight: St, insert: bt, subscript: mt, superscript: ut, emoji: Fe, footnote_reference: Qe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("del", pt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "strikethrough"}-${l3}`, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "strikethrough"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"]))), 128))]));
} }), [["__scopeId", "data-v-904d5bd1"]]);
vt.install = (e2) => {
  e2.component(vt.__name, vt);
};
var gt = ["href", "title", "aria-label", "aria-hidden", "target", "rel"];
var yt = ["aria-hidden"];
var wt = { class: "link-text-wrapper relative inline-flex" };
var xt = { class: "leading-[normal] link-text" };
var kt = Ee(defineComponent({ __name: "LinkNode", props: { node: {}, indexKey: {}, customId: {}, showTooltip: { type: Boolean, default: true }, color: {}, underlineHeight: {}, underlineBottom: {}, animationDuration: {}, animationOpacity: {}, animationTiming: {}, animationIteration: {} }, setup(e2) {
  const n2 = e2, t2 = inject("markstreamShowTooltips", void 0), o2 = computed(() => {
    const e3 = null == t2 ? void 0 : t2.value;
    return "boolean" == typeof e3 ? e3 : n2.showTooltip;
  }), l2 = computed(() => {
    var e3, t3, o3, l3, r3;
    const a3 = void 0 !== n2.underlineBottom ? "number" == typeof n2.underlineBottom ? `${n2.underlineBottom}px` : String(n2.underlineBottom) : "-3px", i2 = null != (e3 = n2.animationOpacity) ? e3 : 0.35, s3 = Math.max(0.12, Math.min(0.5 * i2, i2)), u3 = { "--underline-height": `${null != (t3 = n2.underlineHeight) ? t3 : 2}px`, "--underline-bottom": a3, "--underline-opacity": String(i2), "--underline-rest-opacity": String(s3), "--underline-duration": `${null != (o3 = n2.animationDuration) ? o3 : 1.6}s`, "--underline-timing": null != (l3 = n2.animationTiming) ? l3 : "ease-in-out", "--underline-iteration": "number" == typeof n2.animationIteration ? String(n2.animationIteration) : null != (r3 = n2.animationIteration) ? r3 : "infinite" };
    return n2.color && (u3["--link-color"] = n2.color), u3;
  }), r2 = { text: ot, strong: ft, strikethrough: vt, emphasis: Bt, image: jn, html_inline: dn, inline_code: hn }, a2 = computed(() => (Ue.value, Xe(n2.customId))), s2 = useAttrs(), u2 = computed(() => {
    var e3, t3;
    const o3 = null == (e3 = n2.node) ? void 0 : e3.attrs;
    if (!o3 || "object" != typeof o3) return {};
    const l3 = {};
    if (Array.isArray(o3)) for (const n3 of o3) Array.isArray(n3) && n3[0] && (l3[String(n3[0])] = String(null != (t3 = n3[1]) ? t3 : ""));
    else for (const [n3, r3] of Object.entries(o3)) n3 && null != r3 && false !== r3 && (l3[n3] = true === r3 ? "" : String(r3));
    return tn(l3);
  }), d2 = computed(() => i(i({}, s2), u2.value)), c = computed(() => {
    const e3 = d2.value.target;
    return ("string" == typeof e3 ? e3.trim() : String(null != e3 ? e3 : "").trim()) || "_blank";
  }), m = computed(() => "_blank" === c.value.trim().toLowerCase()), h2 = computed(() => {
    const e3 = d2.value.rel, n3 = new Set(("string" == typeof e3 ? e3 : String(null != e3 ? e3 : "")).split(/\s+/).filter(Boolean)), t3 = new Set(Array.from(n3).filter((e4) => "opener" !== e4.toLowerCase()));
    return m.value && (t3.add("noopener"), t3.add("noreferrer")), t3.size > 0 ? Array.from(t3).join(" ") : void 0;
  }), f = computed(() => {
    const e3 = i({}, d2.value);
    return delete e3.title, delete e3.href, delete e3.target, delete e3.rel, e3;
  }), p = computed(() => {
    var e3, t3;
    return tn({ href: String(null != (t3 = null == (e3 = n2.node) ? void 0 : e3.href) ? t3 : "") }).href;
  });
  function v() {
    o2.value && On();
  }
  const g = computed(() => {
    var e3, t3;
    const o3 = null == (e3 = n2.node) ? void 0 : e3.title;
    return "string" == typeof o3 && o3.trim().length > 0 ? o3 : String(null != (t3 = p.value) ? t3 : "");
  });
  return (t3, i2) => {
    var u3, d3;
    return e2.node.loading ? (openBlock(), createElementBlock("span", mergeProps({ key: 1, class: "link-loading inline-flex items-baseline gap-1.5", "aria-hidden": e2.node.loading ? "false" : "true" }, unref(s2), { style: l2.value }), [createBaseVNode("span", wt, [createBaseVNode("span", xt, [createVNode(unref(ot), { class: "leading-[normal] link-text", node: { type: "text", content: String(null != (u3 = e2.node.text) ? u3 : ""), raw: String(null != (d3 = e2.node.text) ? d3 : "") }, "index-key": `${e2.indexKey || "link-text"}-loading` }, null, 8, ["node", "index-key"])]), i2[1] || (i2[1] = createBaseVNode("span", { class: "link-loading-indicator", "aria-hidden": "true" }, null, -1))])], 16, yt)) : (openBlock(), createElementBlock("a", mergeProps({ key: 0, class: "link-node", href: p.value, title: o2.value ? "" : g.value, "aria-label": `Link: ${g.value}`, "aria-hidden": e2.node.loading ? "true" : "false", target: c.value, rel: h2.value }, f.value, { style: l2.value, onMouseenter: i2[0] || (i2[0] = (e3) => function(e4) {
      var t4, l3, r3, a3;
      if (!o2.value) return;
      const i3 = e4, s3 = null != (null == i3 ? void 0 : i3.clientX) && null != (null == i3 ? void 0 : i3.clientY) ? { x: i3.clientX, y: i3.clientY } : void 0, u4 = (null == (t4 = n2.node) ? void 0 : t4.title) || ((null == (l3 = p.value) ? void 0 : l3.includes("xn--")) && (null == (a3 = null == (r3 = n2.node) ? void 0 : r3.text) ? void 0 : a3.includes("://")) ? n2.node.text : p.value) || "";
      Ln(e4.currentTarget, u4, "top", false, s3);
    }(e3)), onMouseleave: v }), [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, o3) => (openBlock(), createBlock(resolveDynamicComponent(function(e3) {
      return a2.value[e3.type] || r2[e3.type] || null;
    }(t4)), { key: `${e2.indexKey || "emphasis"}-${o3}`, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "link-text"}-${o3}` }, null, 8, ["node", "custom-id", "index-key"]))), 128))], 16, gt));
  };
} }), [["__scopeId", "data-v-8992f408"]]);
kt.install = (e2) => {
  e2.component(kt.__name, kt);
};
var Nt = { class: "insert-node" };
var bt = Ee(defineComponent({ __name: "InsertNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, emphasis: Bt, strikethrough: vt, highlight: St, subscript: mt, superscript: ut, emoji: Fe, footnote_reference: Qe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("ins", Nt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "insert"}-${l3}`, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "insert"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"]))), 128))]));
} }), [["__scopeId", "data-v-ab1ec9bc"]]);
bt.install = (e2) => {
  e2.component(bt.__name, bt);
};
var Mt = { class: "highlight-node" };
var St = Ee(defineComponent({ __name: "HighlightNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, emphasis: Bt, strikethrough: vt, insert: bt, subscript: mt, superscript: ut, emoji: Fe, footnote_reference: Qe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("mark", Mt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "highlight"}-${l3}`, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "highlight"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"]))), 128))]));
} }), [["__scopeId", "data-v-36e74e6b"]]);
St.install = (e2) => {
  e2.component(St.__name, St);
};
var _t = { class: "emphasis-node" };
var Bt = Ee(defineComponent({ __name: "EmphasisNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, html_inline: dn, strong: ft, strikethrough: vt, highlight: St, insert: bt, subscript: mt, superscript: ut, emoji: Fe, footnote_reference: Qe, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createElementBlock("em", _t, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "emphasis"}-${l3}`, node: t4, "custom-id": n2.customId, "index-key": `${e2.indexKey || "emphasis"}-${l3}` }, null, 8, ["node", "custom-id", "index-key"]))), 128))]));
} }), [["__scopeId", "data-v-8264674d"]]);
Bt.install = (e2) => {
  e2.component(Bt.__name, Bt);
};
var Ct = ["href", "title"];
var Lt = Ee(defineComponent({ __name: "FootnoteAnchorNode", props: { node: {} }, setup(e2) {
  const n2 = e2;
  function t2(e3) {
    var t3;
    if (e3.preventDefault(), "undefined" == typeof document) return;
    const o2 = `fnref-${String(null != (t3 = n2.node.id) ? t3 : "")}`, l2 = document.getElementById(o2);
    l2 && l2.scrollIntoView({ behavior: "smooth" });
  }
  return (n3, o2) => (openBlock(), createElementBlock("a", { class: "footnote-anchor text-sm hover:underline cursor-pointer", href: `#fnref-${e2.node.id}`, title: `返回引用 ${e2.node.id}`, onClick: t2 }, " ↩︎ ", 8, Ct));
} }), [["__scopeId", "data-v-83c33a47"]]);
Lt.install = (e2) => {
  e2.component(Lt.__name, Lt);
};
var Ot = ["id"];
var Et = { class: "flex-1" };
var Tt = defineComponent({ __name: "FootnoteNode", props: { node: {}, indexKey: {}, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, emits: ["copy"], setup(e2) {
  const n2 = e2;
  return (t2, o2) => (openBlock(), createElementBlock("div", { id: `fnref--${e2.node.id}`, class: "footnote-node flex text-sm leading-relaxed border-t border-[var(--footnote-border)] pt-2" }, [createBaseVNode("div", Et, [createVNode(unref(pa), { "index-key": `footnote-${n2.indexKey}`, nodes: n2.node.children, "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: o2[0] || (o2[0] = (e3) => t2.$emit("copy", e3)) }, null, 8, ["index-key", "nodes", "custom-id", "typewriter", "fade"])])], 8, Ot));
} });
Tt.install = (e2) => {
  e2.component(Tt.__name, Tt);
};
var It = { class: "hard-break" };
var At = Ee(defineComponent({ __name: "HardBreakNode", props: { node: {} }, setup: (e2) => (e3, n2) => (openBlock(), createElementBlock("br", It)) }), [["__scopeId", "data-v-50c58f70"]]);
At.install = (e2) => {
  e2.component(At.__name, At);
};
var $t = Ee(defineComponent({ __name: "HeadingNode", props: { node: {}, customId: {}, indexKey: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId), o2 = i({ text: ot, inline_code: hn, link: kt, image: jn, strong: ft, emphasis: Bt, strikethrough: vt, highlight: St, insert: bt, subscript: mt, superscript: ut, emoji: Fe, checkbox: He, checkbox_input: He, footnote_reference: Qe, hardbreak: At, math_inline: lt, reference: at }, t2);
  return (t3, l2) => (openBlock(), createBlock(resolveDynamicComponent(`h${e2.node.level}`), mergeProps({ class: ["heading-node", [`heading-${e2.node.level}`]], dir: "auto" }, e2.node.attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t4, l3) => (openBlock(), createBlock(resolveDynamicComponent(o2[t4.type]), { key: `${e2.indexKey || "heading"}-${l3}`, "custom-id": n2.customId, node: t4, "index-key": `${e2.indexKey || "heading"}-${l3}` }, null, 8, ["custom-id", "node", "index-key"]))), 128))]), _: 1 }, 16, ["class"]));
} }), [["__scopeId", "data-v-bf120de0"]]);
var Ht = $t;
Ht.install = (e2) => {
  e2.component($t.__name, $t);
};
var Rt = Ee(defineComponent({ __name: "ListItemNode", props: { node: {}, item: {}, indexKey: {}, value: {}, customId: {}, typewriter: { type: Boolean }, fade: { type: Boolean }, showTooltips: { type: Boolean } }, emits: ["copy"], setup(e2) {
  const n2 = e2, t2 = computed(() => {
    var e3;
    return null != (e3 = n2.node) ? e3 : n2.item;
  }), o2 = computed(() => null == n2.value ? {} : { value: n2.value });
  return (e3, l2) => {
    var r2, a2;
    return openBlock(), createElementBlock("li", mergeProps({ class: "list-item", dir: "auto" }, o2.value), [createVNode(unref(pa), mergeProps({ showTooltips: n2.showTooltips }, { "index-key": `list-item-${n2.indexKey}`, nodes: null != (a2 = null == (r2 = t2.value) ? void 0 : r2.children) ? a2 : [], "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, "batch-rendering": false, onCopy: l2[0] || (l2[0] = (n3) => e3.$emit("copy", n3)) }), null, 16, ["index-key", "nodes", "custom-id", "typewriter", "fade"])], 16);
  };
} }), [["__scopeId", "data-v-9b3024e6"]]);
Rt.install = (e2) => {
  e2.component(Rt.__name, Rt);
};
var zt = Ee(defineComponent({ __name: "ListNode", props: { node: {}, customId: {}, indexKey: {}, typewriter: { type: Boolean }, fade: { type: Boolean }, showTooltips: { type: Boolean } }, emits: ["copy"], setup(e2) {
  const n2 = computed(() => (Ue.value, Xe(e2.customId).list_item || Rt));
  return (t2, o2) => (openBlock(), createBlock(resolveDynamicComponent(e2.node.ordered ? "ol" : "ul"), { class: normalizeClass(["list-node", { "list-decimal": e2.node.ordered, "list-disc": !e2.node.ordered }]) }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.items, (l2, r2) => {
    var a2;
    return openBlock(), createBlock(resolveDynamicComponent(n2.value), mergeProps({ key: `${e2.indexKey || "list"}-${r2}` }, { ref_for: true }, { showTooltips: e2.showTooltips }, { node: l2, "custom-id": e2.customId, "index-key": `${e2.indexKey || "list"}-${r2}`, typewriter: e2.typewriter, fade: e2.fade, value: e2.node.ordered ? (null != (a2 = e2.node.start) ? a2 : 1) + r2 : void 0, onCopy: o2[0] || (o2[0] = (e3) => t2.$emit("copy", e3)) }), null, 16, ["node", "custom-id", "index-key", "typewriter", "fade", "value"]);
  }), 128))]), _: 1 }, 8, ["class"]));
} }), [["__scopeId", "data-v-8f37f7cc"]]);
zt.install = (e2) => {
  e2.component(zt.__name, zt);
};
var Pt = Symbol("ViewportPriority");
function Wt(e2, n2) {
  var t2, o2;
  const l2 = "undefined" != typeof window && "undefined" != typeof document, r2 = "boolean" == typeof n2 ? ref(n2) : n2, a2 = l2 ? null != (t2 = window.requestIdleCallback) ? t2 : (e3) => window.setTimeout(() => e3({ didTimeout: true, timeRemaining: () => 0 }), 16) : null, i2 = l2 ? null != (o2 = window.cancelIdleCallback) ? o2 : (e3) => window.clearTimeout(e3) : null;
  let s2 = null, u2 = null;
  const d2 = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
  let m = null;
  function h2() {
    if (!d2.size) {
      try {
        null == s2 || s2.disconnect();
      } catch (e3) {
      }
      s2 = null, u2 = null, c.size || function() {
        if (null != m) {
          try {
            null == i2 || i2(m);
          } catch (e3) {
          }
          m = null;
        }
      }();
    }
  }
  function f(e3) {
    const n3 = d2.get(e3);
    if (n3) {
      if (!n3.visible.value) {
        n3.visible.value = true;
        try {
          n3.resolve();
        } catch (t3) {
        }
      }
      try {
        null == s2 || s2.unobserve(e3);
      } catch (t3) {
      }
      d2.delete(e3), c.delete(e3), h2();
    }
  }
  function p() {
    a2 && null == m && c.size && (m = a2(() => {
      m = null;
      const e3 = c.values().next().value;
      e3 && (c.delete(e3), f(e3), c.size && p());
    }, { timeout: 1200 }));
  }
  const v = (n3, t3) => {
    const o3 = ref(false);
    let a3, i3 = false;
    const m2 = new Promise((e3) => {
      a3 = () => {
        i3 || (i3 = true, e3());
      };
    }), v2 = () => {
      try {
        null == s2 || s2.unobserve(n3);
      } catch (e3) {
      }
      d2.delete(n3), c.delete(n3), h2();
    };
    if (!l2 || !r2.value) return o3.value = true, a3(), { isVisible: o3, whenVisible: m2, destroy: v2 };
    const g = function(n4, t4) {
      if (!l2) return s2;
      if ("undefined" == typeof IntersectionObserver) return null;
      const o4 = function(n5, t5) {
        var o5, l3, r4;
        return { root: null != (o5 = null == e2 ? void 0 : e2(null != n5 ? n5 : null)) ? o5 : null, rootMargin: null != (l3 = null == t5 ? void 0 : t5.rootMargin) ? l3 : "300px", threshold: null != (r4 = null == t5 ? void 0 : t5.threshold) ? r4 : 0 };
      }(n4, t4);
      if (s2 && (a4 = o4, (r3 = u2) && r3.root === a4.root && r3.rootMargin === a4.rootMargin && r3.threshold === a4.threshold)) return s2;
      var r3, a4;
      if (s2) try {
        s2.disconnect();
      } catch (i4) {
      }
      s2 = new IntersectionObserver((e3) => {
        for (const n5 of e3) (n5.isIntersecting || n5.intersectionRatio > 0) && f(n5.target);
      }, { root: o4.root, rootMargin: o4.rootMargin, threshold: o4.threshold }), u2 = o4;
      for (const e3 of d2.keys()) s2.observe(e3);
      return s2;
    }(n3, t3);
    return g ? (d2.set(n3, { resolve: a3, visible: o3 }), g.observe(n3), c.add(n3), p(), { isVisible: o3, whenVisible: m2, destroy: v2 }) : (o3.value = true, a3(), { isVisible: o3, whenVisible: m2, destroy: v2 });
  };
  return provide(Pt, v), v;
}
function jt() {
  var e2, n2;
  const t2 = inject(Pt, void 0);
  if (t2) return t2;
  const o2 = /* @__PURE__ */ new WeakMap();
  let l2 = null;
  const r2 = /* @__PURE__ */ new Set();
  let a2 = null;
  const i2 = "undefined" != typeof window ? null != (e2 = window.requestIdleCallback) ? e2 : (e3) => window.setTimeout(() => e3({ didTimeout: true, timeRemaining: () => 0 }), 16) : null, s2 = "undefined" != typeof window ? null != (n2 = window.cancelIdleCallback) ? n2 : (e3) => window.clearTimeout(e3) : null, u2 = () => {
    if (null != a2) {
      try {
        null == s2 || s2(a2);
      } catch (e3) {
      }
      a2 = null;
    }
  }, d2 = (e3) => {
    const n3 = o2.get(e3);
    if (n3) {
      if (!n3.visible.value) {
        n3.visible.value = true;
        try {
          n3.resolve();
        } catch (t3) {
        }
      }
      try {
        null == l2 || l2.unobserve(e3);
      } catch (t3) {
      }
      o2.delete(e3), r2.delete(e3), r2.size || u2();
    }
  }, c = () => {
    i2 && null == a2 && r2.size && (a2 = i2(() => {
      a2 = null;
      const e3 = r2.values().next().value;
      e3 && (r2.delete(e3), d2(e3), r2.size && c());
    }, { timeout: 1200 }));
  };
  return (e3) => {
    const n3 = ref(false);
    let t3, a3 = false;
    const i3 = new Promise((e4) => {
      t3 = () => {
        a3 || (a3 = true, e4());
      };
    }), s3 = () => {
      try {
        null == l2 || l2.unobserve(e3);
      } catch (n4) {
      }
      o2.delete(e3), r2.delete(e3), r2.size || u2();
    }, m = l2 || ("undefined" == typeof window || "undefined" == typeof IntersectionObserver ? null : (l2 = new IntersectionObserver((e4) => {
      for (const n4 of e4) (n4.isIntersecting || n4.intersectionRatio > 0) && d2(n4.target);
    }, { root: null, rootMargin: "300px", threshold: 0 }), l2));
    return m ? (o2.set(e3, { resolve: t3, visible: n3 }), m.observe(e3), r2.add(e3), c(), { isVisible: n3, whenVisible: i3, destroy: s3 }) : (n3.value = true, t3(), { isVisible: n3, whenVisible: i3, destroy: s3 });
  };
}
var Ft = { key: 2, class: "html-block-node__raw" };
var Dt = ["innerHTML"];
var Kt = { key: 1, class: "html-block-node__placeholder" };
var Vt = Ee(defineComponent({ __name: "HtmlBlockNode", props: { node: {}, customId: {}, htmlPolicy: {} }, setup(e2) {
  const n2 = e2, t2 = inject("markstreamHtmlPolicy", void 0), o2 = computed(() => {
    var e3, o3;
    return null != (o3 = null != (e3 = n2.htmlPolicy) ? e3 : null == t2 ? void 0 : t2.value) ? o3 : "safe";
  }), l2 = defineAsyncComponent({ loader: () => Promise.resolve().then(() => va), suspensible: false }), r2 = computed(() => {
    const e3 = sanitizeHtmlTokenAttrs(n2.node.attrs, o2.value);
    if (!e3) return;
    const t3 = tokenAttrsToRecord(e3);
    return Object.keys(t3).length > 0 ? t3 : void 0;
  }), a2 = computed(() => {
    const e3 = String(n2.node.tag || "").trim(), t3 = sanitizeHtmlTokenAttrs(n2.node.attrs, o2.value, e3);
    if (!t3) return;
    const l3 = tokenAttrsToRecord(t3);
    return Object.keys(l3).length > 0 ? l3 : void 0;
  }), i2 = computed(() => (Ue.value, Xe(n2.customId))), s2 = defineComponent({ name: "DynamicRenderer", props: { nodes: { type: Array, required: true } }, render() {
    return this.nodes;
  } }), u2 = ref(null), d2 = ref("undefined" == typeof window), c = ref(n2.node.content), m = computed(() => Array.isArray(n2.node.children) ? n2.node.children : []), h2 = computed(() => String(n2.node.tag || "div")), f = computed(() => {
    const e3 = h2.value.trim().toLowerCase();
    return NON_STRUCTURING_HTML_TAGS.has(e3) || isHtmlTagBlocked(e3, o2.value);
  }), p = computed(() => m.value.length > 0 && !!n2.node.tag && !f.value), g = computed(() => {
    var e3, t3, l3;
    if (p.value) return { mode: "structured" };
    if (!d2.value) return { mode: "html", content: null != (e3 = c.value) ? e3 : "" };
    const r3 = null != (t3 = c.value) ? t3 : n2.node.content;
    if (!r3) return { mode: "html", content: "" };
    if ("escape" === o2.value) return { mode: "html", content: sanitizeHtmlContent(r3, o2.value) };
    if (n2.node.loading) {
      const e4 = sn(r3, i2.value, o2.value);
      return null === e4 ? { mode: "text", content: null != (l3 = n2.node.raw) ? l3 : r3 } : { mode: "dynamic", nodes: e4 };
    }
    if (!an(r3, i2.value)) return { mode: "html", content: sanitizeHtmlContent(r3, o2.value) };
    const a3 = sn(r3, i2.value, o2.value);
    return null === a3 ? { mode: "html", content: sanitizeHtmlContent(r3, o2.value) } : { mode: "dynamic", nodes: a3 };
  }), y = jt(), b = ref(null), M = !!n2.node.loading;
  return "undefined" != typeof window ? (watch(u2, (e3) => {
    var t3, o3;
    if (null == (o3 = null == (t3 = b.value) ? void 0 : t3.destroy) || o3.call(t3), b.value = null, !M) return d2.value = true, void (c.value = n2.node.content);
    if (!e3) return void (d2.value = false);
    const l3 = y(e3, { rootMargin: "400px" });
    b.value = l3, d2.value = l3.isVisible.value, l3.whenVisible.then(() => {
      d2.value = true;
    });
  }, { immediate: true }), watch(() => n2.node.content, (e3) => {
    M && !d2.value || (c.value = e3);
  })) : d2.value = true, onBeforeUnmount(() => {
    var e3, n3;
    null == (n3 = null == (e3 = b.value) ? void 0 : e3.destroy) || n3.call(e3), b.value = null;
  }), (n3, t3) => (openBlock(), createBlock(resolveDynamicComponent(p.value ? h2.value : "div"), mergeProps({ ref_key: "htmlRef", ref: u2, class: "html-block-node" }, p.value ? a2.value : void 0), { default: withCtx(() => [d2.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, ["structured" === g.value.mode ? (openBlock(), createBlock(unref(l2), { key: 0, nodes: m.value, "custom-id": e2.customId, "batch-rendering": false, "defer-nodes-until-visible": false, "render-as-fragment": true, "html-policy": o2.value }, null, 8, ["nodes", "custom-id", "html-policy"])) : "dynamic" === g.value.mode ? (openBlock(), createBlock(unref(s2), { key: 1, nodes: g.value.nodes }, null, 8, ["nodes"])) : "text" === g.value.mode ? (openBlock(), createElementBlock("pre", Ft, toDisplayString(g.value.content), 1)) : (openBlock(), createElementBlock("div", mergeProps({ key: 3 }, r2.value, { innerHTML: g.value.content }), null, 16, Dt))], 64)) : (openBlock(), createElementBlock("div", Kt, [renderSlot(n3.$slots, "placeholder", { node: e2.node }, () => [t3[0] || (t3[0] = createBaseVNode("span", { class: "html-block-node__placeholder-bar" }, null, -1)), t3[1] || (t3[1] = createBaseVNode("span", { class: "html-block-node__placeholder-bar w-4/5" }, null, -1)), t3[2] || (t3[2] = createBaseVNode("span", { class: "html-block-node__placeholder-bar w-2/3" }, null, -1))], true)]))]), _: 3 }, 16));
} }), [["__scopeId", "data-v-4d8bb24b"]]);
Vt.install = (e2) => {
  e2.component(Vt.__name, Vt);
};
var Ut = { dir: "auto", class: "paragraph-node" };
var qt = Ee(defineComponent({ __name: "ParagraphNode", props: { node: {}, customId: {}, indexKey: {}, customHtmlTags: {} }, setup(e2) {
  const n2 = e2, t2 = Xe(n2.customId);
  function o2(e3) {
    var n3;
    return "text" === e3.type && "" === String(null != (n3 = e3.content) ? n3 : "").trim();
  }
  function l2(e3) {
    var n3;
    return String(null != (n3 = e3.content) ? n3 : "");
  }
  const r2 = computed(() => n2.node.children.filter((e3) => !o2(e3))), a2 = computed(() => r2.value.length > 0 && r2.value.every((e3) => "image" === e3.type || function(e4) {
    var n3;
    const t3 = function(e5) {
      return "link" === e5.type && Array.isArray(e5.children) ? e5.children.filter((e6) => !o2(e6)) : [];
    }(e4);
    return 1 === t3.length && "image" === (null == (n3 = t3[0]) ? void 0 : n3.type);
  }(e3))), u2 = computed(() => new Set(normalizeCustomHtmlTags(n2.customHtmlTags))), d2 = computed(() => {
    if (!a2.value || r2.value.length <= 1) return n2.node.children;
    const e3 = [];
    for (let t3 = 0; t3 < n2.node.children.length; t3++) {
      const l3 = n2.node.children[t3];
      if (!o2(l3)) {
        e3.push(l3);
        continue;
      }
      const r3 = e3.length > 0, a3 = n2.node.children.slice(t3 + 1).some((e4) => !o2(e4));
      r3 && a3 && e3.push(s(i({}, l3), { content: " ", raw: " " }));
    }
    return e3;
  });
  function c(e3, t3) {
    return { node: e3, "index-key": `${n2.indexKey}-${t3}`, "custom-id": n2.customId, "custom-html-tags": n2.customHtmlTags };
  }
  const m = i({ inline_code: hn, image: jn, link: kt, hardbreak: At, emphasis: Bt, strong: ft, strikethrough: vt, highlight: St, insert: bt, subscript: mt, superscript: ut, html_inline: dn, html_block: Vt, emoji: Fe, checkbox: He, math_inline: lt, checkbox_input: He, reference: at, footnote_anchor: Lt, footnote_reference: Qe, text: ot }, t2);
  function h2(e3) {
    var n3, t3, o3, l3;
    if ("html_block" === e3.type || "html_inline" === e3.type) {
      const r3 = String(null != (n3 = e3.tag) ? n3 : "").trim().toLowerCase() || getHtmlTagFromContent(e3.content);
      if (r3 && !u2.value.has(r3) && shouldRenderUnknownHtmlTagAsText(null != (t3 = e3.content) ? t3 : e3.raw, r3)) {
        const n4 = String(null != (l3 = null != (o3 = e3.content) ? o3 : e3.raw) ? l3 : "");
        return { child: { type: "text", content: n4, raw: n4 }, component: ot };
      }
    }
    return { child: e3, component: m[e3.type] };
  }
  return (n3, t3) => (openBlock(), createElementBlock("p", Ut, [(openBlock(true), createElementBlock(Fragment, null, renderList(d2.value, (n4, t4) => (openBlock(), createElementBlock(Fragment, { key: `${e2.indexKey || "paragraph"}-${t4}` }, [a2.value && o2(n4) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(l2(n4)), 1)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(h2(n4).component), mergeProps({ key: 1, ref_for: true }, c(h2(n4).child, t4)), null, 16))], 64))), 128))]));
} }), [["__scopeId", "data-v-a07f942f"]]);
qt.install = (e2) => {
  e2.component(qt.__name, qt);
};
var Xt = ["aria-busy", "aria-label", "data-language"];
var Gt = ["textContent"];
var Zt = defineComponent({ __name: "PreCodeNode", props: { node: {} }, setup(e2) {
  const n2 = e2, t2 = computed(() => {
    var e3, t3, o3;
    const l3 = String(null != (t3 = null == (e3 = n2.node) ? void 0 : e3.language) ? t3 : "");
    return String(null != (o3 = String(l3).split(/\s+/g)[0]) ? o3 : "").toLowerCase().replace(/[^\w-]/g, "") || "plaintext";
  }), o2 = computed(() => `language-${t2.value}`), l2 = computed(() => {
    const e3 = t2.value;
    return e3 ? `Code block: ${e3}` : "Code block";
  });
  return (n3, r2) => (openBlock(), createElementBlock("pre", { class: normalizeClass([o2.value]), "aria-busy": true === e2.node.loading, "aria-label": l2.value, "data-language": t2.value, "data-markstream-pre": "1", tabindex: "0" }, [createBaseVNode("code", { translate: "no", textContent: toDisplayString(e2.node.code) }, null, 8, Gt)], 10, Xt));
} });
Zt.install = (e2) => {
  e2.component(Zt.__name, Zt);
};
var Jt = { class: "table-node-wrapper" };
var Yt = ["aria-busy"];
var Qt = { key: 0 };
var eo = ["aria-label", "onPointerdown"];
var no = { key: 0, class: "table-node__loading", role: "status", "aria-live": "polite" };
var to = Ee(defineComponent({ __name: "TableNode", props: { node: {}, indexKey: {}, isDark: { type: Boolean }, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, emits: ["copy"], setup(e2) {
  const n2 = e2, t2 = computed(() => {
    var e3;
    return null != (e3 = n2.node.loading) && e3;
  }), o2 = computed(() => {
    var e3;
    return null != (e3 = n2.node.rows) ? e3 : [];
  }), l2 = ref(null), r2 = ref([]);
  let a2 = null;
  const i2 = computed(() => r2.value.map((e3) => e3 > 0 ? { width: `${e3}px` } : void 0)), s2 = computed(() => r2.value.length > 0);
  function u2(e3) {
    if (!a2) return;
    e3.preventDefault();
    const n3 = a2.startWidth + a2.nextStartWidth, t3 = Math.min(48, Math.floor(n3 / 2)), o3 = Math.max(t3, Math.min(n3 - t3, Math.round(a2.startWidth + e3.clientX - a2.startX))), l3 = [...a2.widths];
    l3[a2.index] = o3, l3[a2.index + 1] = n3 - o3, r2.value = l3;
  }
  function d2() {
    a2 && (window.removeEventListener("pointermove", u2), window.removeEventListener("pointerup", d2), window.removeEventListener("pointercancel", d2), a2 = null);
  }
  return watch(() => n2.node.header.cells.length, () => {
    d2(), r2.value = [];
  }), onBeforeUnmount(d2), (c, m) => (openBlock(), createElementBlock("div", Jt, [createBaseVNode("table", { ref_key: "tableRef", ref: l2, class: normalizeClass(["table-node", { "table-node--loading": t2.value }]), "aria-busy": t2.value }, [s2.value ? (openBlock(), createElementBlock("colgroup", Qt, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.header.cells, (e3, n3) => (openBlock(), createElementBlock("col", { key: `col-${n3}`, style: normalizeStyle(i2.value[n3]) }, null, 4))), 128))])) : createCommentVNode("", true), createBaseVNode("thead", null, [createBaseVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.header.cells, (t3, o3) => (openBlock(), createElementBlock("th", { key: `header-${o3}`, dir: "auto", class: normalizeClass(["right" === t3.align ? "text-right" : "center" === t3.align ? "text-center" : "text-left"]) }, [createVNode(unref(pa), { nodes: t3.children, "index-key": `table-th-${n2.indexKey}`, "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: m[0] || (m[0] = (e3) => c.$emit("copy", e3)) }, null, 8, ["nodes", "index-key", "custom-id", "typewriter", "fade"]), o3 < e2.node.header.cells.length - 1 ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "table-node__resize-handle", "aria-label": `Resize columns ${o3 + 1} and ${o3 + 2}`, onPointerdown: (e3) => function(e4, n3) {
    if (0 !== n3.button) return;
    const t4 = function() {
      var e5;
      const n4 = null == (e5 = l2.value) ? void 0 : e5.querySelectorAll("thead th");
      return Array.from(null != n4 ? n4 : [], (e6) => Math.round(e6.getBoundingClientRect().width));
    }(), o4 = t4[e4], i3 = t4[e4 + 1];
    o4 && i3 && (n3.preventDefault(), a2 = { index: e4, startX: n3.clientX, startWidth: o4, nextStartWidth: i3, widths: t4 }, r2.value = t4, window.addEventListener("pointermove", u2), window.addEventListener("pointerup", d2), window.addEventListener("pointercancel", d2));
  }(o3, e3) }, null, 40, eo)) : createCommentVNode("", true)], 2))), 128))])]), createBaseVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(o2.value, (e3, t3) => (openBlock(), createElementBlock("tr", { key: `row-${t3}` }, [(openBlock(true), createElementBlock(Fragment, null, renderList(e3.cells, (e4, o3) => (openBlock(), createElementBlock("td", { key: `cell-${t3}-${o3}`, class: normalizeClass(["right" === e4.align ? "text-right" : "center" === e4.align ? "text-center" : "text-left"]), dir: "auto" }, [createVNode(unref(pa), { nodes: e4.children, "index-key": `table-td-${n2.indexKey}`, "custom-id": n2.customId, typewriter: n2.typewriter, fade: n2.fade, onCopy: m[1] || (m[1] = (e5) => c.$emit("copy", e5)) }, null, 8, ["nodes", "index-key", "custom-id", "typewriter", "fade"])], 2))), 128))]))), 128))])], 10, Yt), createVNode(Transition, { name: "table-node-fade" }, { default: withCtx(() => [t2.value ? (openBlock(), createElementBlock("div", no, [renderSlot(c.$slots, "loading", { isLoading: t2.value }, () => [m[2] || (m[2] = createBaseVNode("span", { class: "table-node__spinner animate-spin", "aria-hidden": "true" }, null, -1)), m[3] || (m[3] = createBaseVNode("span", { class: "sr-only" }, "Loading", -1))], true)])) : createCommentVNode("", true)]), _: 3 })]));
} }), [["__scopeId", "data-v-93c55efe"]]);
to.install = (e2) => {
  e2.component(to.__name, to);
};
var oo = { class: "hr-node" };
var lo = Ee({}, [["render", function(e2, n2) {
  return openBlock(), createElementBlock("hr", oo);
}], ["__scopeId", "data-v-39b2349c"]]);
lo.install = (e2) => {
  e2.component(lo.__name, lo);
};
var ro = { class: "unknown-node" };
var ao = defineComponent({ __name: "FallbackComponent", props: { node: {} }, setup: (e2) => (n2, t2) => (openBlock(), createElementBlock("div", ro, toDisplayString(e2.node.raw), 1)) });
var io = Ee(defineComponent({ __name: "VmrContainerNode", props: { node: {}, indexKey: {}, isDark: { type: Boolean }, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, setup(e2) {
  const n2 = e2, t2 = computed(() => `vmr-container vmr-container-${n2.node.name}`), o2 = Xe(n2.customId), l2 = i({ text: ot, paragraph: qt, heading: Ht, inline_code: hn, link: kt, image: jn, strong: ft, emphasis: Bt, strikethrough: vt, insert: bt, subscript: mt, superscript: ut, checkbox: He, checkbox_input: He, hardbreak: At, math_inline: lt, reference: at, list: zt, math_block: rt, table: to }, o2);
  return (o3, r2) => (openBlock(), createElementBlock("div", mergeProps({ class: t2.value }, e2.node.attrs), [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.node.children, (t3, o4) => {
    return openBlock(), createBlock(resolveDynamicComponent((r3 = t3.type, l2[r3] || ao)), { key: `${e2.indexKey || "vmr-container"}-${o4}`, "custom-id": n2.customId, node: t3, "index-key": `${e2.indexKey || "vmr-container"}-${o4}`, typewriter: n2.typewriter, fade: n2.fade }, null, 8, ["custom-id", "node", "index-key", "typewriter", "fade"]);
    var r3;
  }), 128))], 16));
} }), [["__scopeId", "data-v-037b1caa"]]);
function so(e2 = {}) {
  const n2 = ref(""), t2 = ref(""), o2 = ref(false), l2 = createSmoothMarkdownStream(e2), r2 = () => {
    const e3 = l2.getSnapshot();
    n2.value = e3.source, t2.value = e3.visible, o2.value = e3.done;
  }, a2 = l2.subscribe(r2);
  r2();
  const i2 = computed(() => Math.max(0, n2.value.length - t2.value.length)), s2 = computed(() => 0 === i2.value), u2 = computed(() => o2.value && s2.value);
  return getCurrentScope() && onScopeDispose(() => {
    a2(), l2.destroy();
  }), { source: n2, visible: t2, done: o2, final: u2, caughtUp: s2, pendingChars: i2, enqueue: (e3) => l2.enqueue(e3), finish: (e3) => l2.finish(e3), flush: () => l2.flush(), reset: (e3) => l2.reset(e3), pause: () => l2.pause(), resume: () => l2.resume() };
}
io.install = (e2) => {
  e2.component(io.__name, io);
};
var uo = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "ON", "ON", "ET", "ET", "ET", "ON", "ON", "ON", "ON", "ON", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "ON", "ON", "ON", "ON", "ON", "ON", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "ON", "ON", "ON", "ON", "ON", "ON", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "ON", "ON", "ON", "ON", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "ON", "ET", "ET", "ET", "ET", "ON", "ON", "ON", "ON", "L", "ON", "ON", "BN", "ON", "ON", "ET", "ET", "EN", "EN", "ON", "L", "ON", "ON", "ON", "EN", "L", "ON", "ON", "ON", "ON", "ON", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "ON", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "ON", "L", "L", "L", "L", "L", "L", "L", "L"];
var co = [[697, 698, "ON"], [706, 719, "ON"], [722, 735, "ON"], [741, 749, "ON"], [751, 767, "ON"], [768, 879, "NSM"], [884, 885, "ON"], [894, 894, "ON"], [900, 901, "ON"], [903, 903, "ON"], [1014, 1014, "ON"], [1155, 1161, "NSM"], [1418, 1418, "ON"], [1421, 1422, "ON"], [1423, 1423, "ET"], [1424, 1424, "R"], [1425, 1469, "NSM"], [1470, 1470, "R"], [1471, 1471, "NSM"], [1472, 1472, "R"], [1473, 1474, "NSM"], [1475, 1475, "R"], [1476, 1477, "NSM"], [1478, 1478, "R"], [1479, 1479, "NSM"], [1480, 1535, "R"], [1536, 1541, "AN"], [1542, 1543, "ON"], [1544, 1544, "AL"], [1545, 1546, "ET"], [1547, 1547, "AL"], [1548, 1548, "CS"], [1549, 1549, "AL"], [1550, 1551, "ON"], [1552, 1562, "NSM"], [1563, 1610, "AL"], [1611, 1631, "NSM"], [1632, 1641, "AN"], [1642, 1642, "ET"], [1643, 1644, "AN"], [1645, 1647, "AL"], [1648, 1648, "NSM"], [1649, 1749, "AL"], [1750, 1756, "NSM"], [1757, 1757, "AN"], [1758, 1758, "ON"], [1759, 1764, "NSM"], [1765, 1766, "AL"], [1767, 1768, "NSM"], [1769, 1769, "ON"], [1770, 1773, "NSM"], [1774, 1775, "AL"], [1776, 1785, "EN"], [1786, 1808, "AL"], [1809, 1809, "NSM"], [1810, 1839, "AL"], [1840, 1866, "NSM"], [1867, 1957, "AL"], [1958, 1968, "NSM"], [1969, 1983, "AL"], [1984, 2026, "R"], [2027, 2035, "NSM"], [2036, 2037, "R"], [2038, 2041, "ON"], [2042, 2044, "R"], [2045, 2045, "NSM"], [2046, 2069, "R"], [2070, 2073, "NSM"], [2074, 2074, "R"], [2075, 2083, "NSM"], [2084, 2084, "R"], [2085, 2087, "NSM"], [2088, 2088, "R"], [2089, 2093, "NSM"], [2094, 2136, "R"], [2137, 2139, "NSM"], [2140, 2143, "R"], [2144, 2191, "AL"], [2192, 2193, "AN"], [2194, 2198, "AL"], [2199, 2207, "NSM"], [2208, 2249, "AL"], [2250, 2273, "NSM"], [2274, 2274, "AN"], [2275, 2306, "NSM"], [2362, 2362, "NSM"], [2364, 2364, "NSM"], [2369, 2376, "NSM"], [2381, 2381, "NSM"], [2385, 2391, "NSM"], [2402, 2403, "NSM"], [2433, 2433, "NSM"], [2492, 2492, "NSM"], [2497, 2500, "NSM"], [2509, 2509, "NSM"], [2530, 2531, "NSM"], [2546, 2547, "ET"], [2555, 2555, "ET"], [2558, 2558, "NSM"], [2561, 2562, "NSM"], [2620, 2620, "NSM"], [2625, 2626, "NSM"], [2631, 2632, "NSM"], [2635, 2637, "NSM"], [2641, 2641, "NSM"], [2672, 2673, "NSM"], [2677, 2677, "NSM"], [2689, 2690, "NSM"], [2748, 2748, "NSM"], [2753, 2757, "NSM"], [2759, 2760, "NSM"], [2765, 2765, "NSM"], [2786, 2787, "NSM"], [2801, 2801, "ET"], [2810, 2815, "NSM"], [2817, 2817, "NSM"], [2876, 2876, "NSM"], [2879, 2879, "NSM"], [2881, 2884, "NSM"], [2893, 2893, "NSM"], [2901, 2902, "NSM"], [2914, 2915, "NSM"], [2946, 2946, "NSM"], [3008, 3008, "NSM"], [3021, 3021, "NSM"], [3059, 3064, "ON"], [3065, 3065, "ET"], [3066, 3066, "ON"], [3072, 3072, "NSM"], [3076, 3076, "NSM"], [3132, 3132, "NSM"], [3134, 3136, "NSM"], [3142, 3144, "NSM"], [3146, 3149, "NSM"], [3157, 3158, "NSM"], [3170, 3171, "NSM"], [3192, 3198, "ON"], [3201, 3201, "NSM"], [3260, 3260, "NSM"], [3276, 3277, "NSM"], [3298, 3299, "NSM"], [3328, 3329, "NSM"], [3387, 3388, "NSM"], [3393, 3396, "NSM"], [3405, 3405, "NSM"], [3426, 3427, "NSM"], [3457, 3457, "NSM"], [3530, 3530, "NSM"], [3538, 3540, "NSM"], [3542, 3542, "NSM"], [3633, 3633, "NSM"], [3636, 3642, "NSM"], [3647, 3647, "ET"], [3655, 3662, "NSM"], [3761, 3761, "NSM"], [3764, 3772, "NSM"], [3784, 3790, "NSM"], [3864, 3865, "NSM"], [3893, 3893, "NSM"], [3895, 3895, "NSM"], [3897, 3897, "NSM"], [3898, 3901, "ON"], [3953, 3966, "NSM"], [3968, 3972, "NSM"], [3974, 3975, "NSM"], [3981, 3991, "NSM"], [3993, 4028, "NSM"], [4038, 4038, "NSM"], [4141, 4144, "NSM"], [4146, 4151, "NSM"], [4153, 4154, "NSM"], [4157, 4158, "NSM"], [4184, 4185, "NSM"], [4190, 4192, "NSM"], [4209, 4212, "NSM"], [4226, 4226, "NSM"], [4229, 4230, "NSM"], [4237, 4237, "NSM"], [4253, 4253, "NSM"], [4957, 4959, "NSM"], [5008, 5017, "ON"], [5120, 5120, "ON"], [5760, 5760, "WS"], [5787, 5788, "ON"], [5906, 5908, "NSM"], [5938, 5939, "NSM"], [5970, 5971, "NSM"], [6002, 6003, "NSM"], [6068, 6069, "NSM"], [6071, 6077, "NSM"], [6086, 6086, "NSM"], [6089, 6099, "NSM"], [6107, 6107, "ET"], [6109, 6109, "NSM"], [6128, 6137, "ON"], [6144, 6154, "ON"], [6155, 6157, "NSM"], [6158, 6158, "BN"], [6159, 6159, "NSM"], [6277, 6278, "NSM"], [6313, 6313, "NSM"], [6432, 6434, "NSM"], [6439, 6440, "NSM"], [6450, 6450, "NSM"], [6457, 6459, "NSM"], [6464, 6464, "ON"], [6468, 6469, "ON"], [6622, 6655, "ON"], [6679, 6680, "NSM"], [6683, 6683, "NSM"], [6742, 6742, "NSM"], [6744, 6750, "NSM"], [6752, 6752, "NSM"], [6754, 6754, "NSM"], [6757, 6764, "NSM"], [6771, 6780, "NSM"], [6783, 6783, "NSM"], [6832, 6877, "NSM"], [6880, 6891, "NSM"], [6912, 6915, "NSM"], [6964, 6964, "NSM"], [6966, 6970, "NSM"], [6972, 6972, "NSM"], [6978, 6978, "NSM"], [7019, 7027, "NSM"], [7040, 7041, "NSM"], [7074, 7077, "NSM"], [7080, 7081, "NSM"], [7083, 7085, "NSM"], [7142, 7142, "NSM"], [7144, 7145, "NSM"], [7149, 7149, "NSM"], [7151, 7153, "NSM"], [7212, 7219, "NSM"], [7222, 7223, "NSM"], [7376, 7378, "NSM"], [7380, 7392, "NSM"], [7394, 7400, "NSM"], [7405, 7405, "NSM"], [7412, 7412, "NSM"], [7416, 7417, "NSM"], [7616, 7679, "NSM"], [8125, 8125, "ON"], [8127, 8129, "ON"], [8141, 8143, "ON"], [8157, 8159, "ON"], [8173, 8175, "ON"], [8189, 8190, "ON"], [8192, 8202, "WS"], [8203, 8205, "BN"], [8207, 8207, "R"], [8208, 8231, "ON"], [8232, 8232, "WS"], [8233, 8233, "B"], [8234, 8238, "BN"], [8239, 8239, "CS"], [8240, 8244, "ET"], [8245, 8259, "ON"], [8260, 8260, "CS"], [8261, 8286, "ON"], [8287, 8287, "WS"], [8288, 8303, "BN"], [8304, 8304, "EN"], [8308, 8313, "EN"], [8314, 8315, "ES"], [8316, 8318, "ON"], [8320, 8329, "EN"], [8330, 8331, "ES"], [8332, 8334, "ON"], [8352, 8399, "ET"], [8400, 8432, "NSM"], [8448, 8449, "ON"], [8451, 8454, "ON"], [8456, 8457, "ON"], [8468, 8468, "ON"], [8470, 8472, "ON"], [8478, 8483, "ON"], [8485, 8485, "ON"], [8487, 8487, "ON"], [8489, 8489, "ON"], [8494, 8494, "ET"], [8506, 8507, "ON"], [8512, 8516, "ON"], [8522, 8525, "ON"], [8528, 8543, "ON"], [8585, 8587, "ON"], [8592, 8721, "ON"], [8722, 8722, "ES"], [8723, 8723, "ET"], [8724, 9013, "ON"], [9083, 9108, "ON"], [9110, 9257, "ON"], [9280, 9290, "ON"], [9312, 9351, "ON"], [9352, 9371, "EN"], [9450, 9899, "ON"], [9901, 10239, "ON"], [10496, 11123, "ON"], [11126, 11263, "ON"], [11493, 11498, "ON"], [11503, 11505, "NSM"], [11513, 11519, "ON"], [11647, 11647, "NSM"], [11744, 11775, "NSM"], [11776, 11869, "ON"], [11904, 11929, "ON"], [11931, 12019, "ON"], [12032, 12245, "ON"], [12272, 12287, "ON"], [12288, 12288, "WS"], [12289, 12292, "ON"], [12296, 12320, "ON"], [12330, 12333, "NSM"], [12336, 12336, "ON"], [12342, 12343, "ON"], [12349, 12351, "ON"], [12441, 12442, "NSM"], [12443, 12444, "ON"], [12448, 12448, "ON"], [12539, 12539, "ON"], [12736, 12773, "ON"], [12783, 12783, "ON"], [12829, 12830, "ON"], [12880, 12895, "ON"], [12924, 12926, "ON"], [12977, 12991, "ON"], [13004, 13007, "ON"], [13175, 13178, "ON"], [13278, 13279, "ON"], [13311, 13311, "ON"], [19904, 19967, "ON"], [42128, 42182, "ON"], [42509, 42511, "ON"], [42607, 42610, "NSM"], [42611, 42611, "ON"], [42612, 42621, "NSM"], [42622, 42623, "ON"], [42654, 42655, "NSM"], [42736, 42737, "NSM"], [42752, 42785, "ON"], [42888, 42888, "ON"], [43010, 43010, "NSM"], [43014, 43014, "NSM"], [43019, 43019, "NSM"], [43045, 43046, "NSM"], [43048, 43051, "ON"], [43052, 43052, "NSM"], [43064, 43065, "ET"], [43124, 43127, "ON"], [43204, 43205, "NSM"], [43232, 43249, "NSM"], [43263, 43263, "NSM"], [43302, 43309, "NSM"], [43335, 43345, "NSM"], [43392, 43394, "NSM"], [43443, 43443, "NSM"], [43446, 43449, "NSM"], [43452, 43453, "NSM"], [43493, 43493, "NSM"], [43561, 43566, "NSM"], [43569, 43570, "NSM"], [43573, 43574, "NSM"], [43587, 43587, "NSM"], [43596, 43596, "NSM"], [43644, 43644, "NSM"], [43696, 43696, "NSM"], [43698, 43700, "NSM"], [43703, 43704, "NSM"], [43710, 43711, "NSM"], [43713, 43713, "NSM"], [43756, 43757, "NSM"], [43766, 43766, "NSM"], [43882, 43883, "ON"], [44005, 44005, "NSM"], [44008, 44008, "NSM"], [44013, 44013, "NSM"], [64285, 64285, "R"], [64286, 64286, "NSM"], [64287, 64296, "R"], [64297, 64297, "ES"], [64298, 64335, "R"], [64336, 64450, "AL"], [64451, 64466, "ON"], [64467, 64829, "AL"], [64830, 64847, "ON"], [64848, 64911, "AL"], [64912, 64913, "ON"], [64914, 64967, "AL"], [64968, 64975, "ON"], [64976, 65007, "BN"], [65008, 65020, "AL"], [65021, 65023, "ON"], [65024, 65039, "NSM"], [65040, 65049, "ON"], [65056, 65071, "NSM"], [65072, 65103, "ON"], [65104, 65104, "CS"], [65105, 65105, "ON"], [65106, 65106, "CS"], [65108, 65108, "ON"], [65109, 65109, "CS"], [65110, 65118, "ON"], [65119, 65119, "ET"], [65120, 65121, "ON"], [65122, 65123, "ES"], [65124, 65126, "ON"], [65128, 65128, "ON"], [65129, 65130, "ET"], [65131, 65131, "ON"], [65136, 65278, "AL"], [65279, 65279, "BN"], [65281, 65282, "ON"], [65283, 65285, "ET"], [65286, 65290, "ON"], [65291, 65291, "ES"], [65292, 65292, "CS"], [65293, 65293, "ES"], [65294, 65295, "CS"], [65296, 65305, "EN"], [65306, 65306, "CS"], [65307, 65312, "ON"], [65339, 65344, "ON"], [65371, 65381, "ON"], [65504, 65505, "ET"], [65506, 65508, "ON"], [65509, 65510, "ET"], [65512, 65518, "ON"], [65520, 65528, "BN"], [65529, 65533, "ON"], [65534, 65535, "BN"], [65793, 65793, "ON"], [65856, 65932, "ON"], [65936, 65948, "ON"], [65952, 65952, "ON"], [66045, 66045, "NSM"], [66272, 66272, "NSM"], [66273, 66299, "EN"], [66422, 66426, "NSM"], [67584, 67870, "R"], [67871, 67871, "ON"], [67872, 68096, "R"], [68097, 68099, "NSM"], [68100, 68100, "R"], [68101, 68102, "NSM"], [68103, 68107, "R"], [68108, 68111, "NSM"], [68112, 68151, "R"], [68152, 68154, "NSM"], [68155, 68158, "R"], [68159, 68159, "NSM"], [68160, 68324, "R"], [68325, 68326, "NSM"], [68327, 68408, "R"], [68409, 68415, "ON"], [68416, 68863, "R"], [68864, 68899, "AL"], [68900, 68903, "NSM"], [68904, 68911, "AL"], [68912, 68921, "AN"], [68922, 68927, "AL"], [68928, 68937, "AN"], [68938, 68968, "R"], [68969, 68973, "NSM"], [68974, 68974, "ON"], [68975, 69215, "R"], [69216, 69246, "AN"], [69247, 69290, "R"], [69291, 69292, "NSM"], [69293, 69311, "R"], [69312, 69327, "AL"], [69328, 69336, "ON"], [69337, 69369, "AL"], [69370, 69375, "NSM"], [69376, 69423, "R"], [69424, 69445, "AL"], [69446, 69456, "NSM"], [69457, 69487, "AL"], [69488, 69505, "R"], [69506, 69509, "NSM"], [69510, 69631, "R"], [69633, 69633, "NSM"], [69688, 69702, "NSM"], [69714, 69733, "ON"], [69744, 69744, "NSM"], [69747, 69748, "NSM"], [69759, 69761, "NSM"], [69811, 69814, "NSM"], [69817, 69818, "NSM"], [69826, 69826, "NSM"], [69888, 69890, "NSM"], [69927, 69931, "NSM"], [69933, 69940, "NSM"], [70003, 70003, "NSM"], [70016, 70017, "NSM"], [70070, 70078, "NSM"], [70089, 70092, "NSM"], [70095, 70095, "NSM"], [70191, 70193, "NSM"], [70196, 70196, "NSM"], [70198, 70199, "NSM"], [70206, 70206, "NSM"], [70209, 70209, "NSM"], [70367, 70367, "NSM"], [70371, 70378, "NSM"], [70400, 70401, "NSM"], [70459, 70460, "NSM"], [70464, 70464, "NSM"], [70502, 70508, "NSM"], [70512, 70516, "NSM"], [70587, 70592, "NSM"], [70606, 70606, "NSM"], [70608, 70608, "NSM"], [70610, 70610, "NSM"], [70625, 70626, "NSM"], [70712, 70719, "NSM"], [70722, 70724, "NSM"], [70726, 70726, "NSM"], [70750, 70750, "NSM"], [70835, 70840, "NSM"], [70842, 70842, "NSM"], [70847, 70848, "NSM"], [70850, 70851, "NSM"], [71090, 71093, "NSM"], [71100, 71101, "NSM"], [71103, 71104, "NSM"], [71132, 71133, "NSM"], [71219, 71226, "NSM"], [71229, 71229, "NSM"], [71231, 71232, "NSM"], [71264, 71276, "ON"], [71339, 71339, "NSM"], [71341, 71341, "NSM"], [71344, 71349, "NSM"], [71351, 71351, "NSM"], [71453, 71453, "NSM"], [71455, 71455, "NSM"], [71458, 71461, "NSM"], [71463, 71467, "NSM"], [71727, 71735, "NSM"], [71737, 71738, "NSM"], [71995, 71996, "NSM"], [71998, 71998, "NSM"], [72003, 72003, "NSM"], [72148, 72151, "NSM"], [72154, 72155, "NSM"], [72160, 72160, "NSM"], [72193, 72198, "NSM"], [72201, 72202, "NSM"], [72243, 72248, "NSM"], [72251, 72254, "NSM"], [72263, 72263, "NSM"], [72273, 72278, "NSM"], [72281, 72283, "NSM"], [72330, 72342, "NSM"], [72344, 72345, "NSM"], [72544, 72544, "NSM"], [72546, 72548, "NSM"], [72550, 72550, "NSM"], [72752, 72758, "NSM"], [72760, 72765, "NSM"], [72850, 72871, "NSM"], [72874, 72880, "NSM"], [72882, 72883, "NSM"], [72885, 72886, "NSM"], [73009, 73014, "NSM"], [73018, 73018, "NSM"], [73020, 73021, "NSM"], [73023, 73029, "NSM"], [73031, 73031, "NSM"], [73104, 73105, "NSM"], [73109, 73109, "NSM"], [73111, 73111, "NSM"], [73459, 73460, "NSM"], [73472, 73473, "NSM"], [73526, 73530, "NSM"], [73536, 73536, "NSM"], [73538, 73538, "NSM"], [73562, 73562, "NSM"], [73685, 73692, "ON"], [73693, 73696, "ET"], [73697, 73713, "ON"], [78912, 78912, "NSM"], [78919, 78933, "NSM"], [90398, 90409, "NSM"], [90413, 90415, "NSM"], [92912, 92916, "NSM"], [92976, 92982, "NSM"], [94031, 94031, "NSM"], [94095, 94098, "NSM"], [94178, 94178, "ON"], [94180, 94180, "NSM"], [113821, 113822, "NSM"], [113824, 113827, "BN"], [117760, 117973, "ON"], [118e3, 118009, "EN"], [118010, 118012, "ON"], [118016, 118451, "ON"], [118458, 118480, "ON"], [118496, 118512, "ON"], [118528, 118573, "NSM"], [118576, 118598, "NSM"], [119143, 119145, "NSM"], [119155, 119162, "BN"], [119163, 119170, "NSM"], [119173, 119179, "NSM"], [119210, 119213, "NSM"], [119273, 119274, "ON"], [119296, 119361, "ON"], [119362, 119364, "NSM"], [119365, 119365, "ON"], [119552, 119638, "ON"], [120513, 120513, "ON"], [120539, 120539, "ON"], [120571, 120571, "ON"], [120597, 120597, "ON"], [120629, 120629, "ON"], [120655, 120655, "ON"], [120687, 120687, "ON"], [120713, 120713, "ON"], [120745, 120745, "ON"], [120771, 120771, "ON"], [120782, 120831, "EN"], [121344, 121398, "NSM"], [121403, 121452, "NSM"], [121461, 121461, "NSM"], [121476, 121476, "NSM"], [121499, 121503, "NSM"], [121505, 121519, "NSM"], [122880, 122886, "NSM"], [122888, 122904, "NSM"], [122907, 122913, "NSM"], [122915, 122916, "NSM"], [122918, 122922, "NSM"], [123023, 123023, "NSM"], [123184, 123190, "NSM"], [123566, 123566, "NSM"], [123628, 123631, "NSM"], [123647, 123647, "ET"], [124140, 124143, "NSM"], [124398, 124399, "NSM"], [124643, 124643, "NSM"], [124646, 124646, "NSM"], [124654, 124655, "NSM"], [124661, 124661, "NSM"], [124928, 125135, "R"], [125136, 125142, "NSM"], [125143, 125251, "R"], [125252, 125258, "NSM"], [125259, 126063, "R"], [126064, 126143, "AL"], [126144, 126207, "R"], [126208, 126287, "AL"], [126288, 126463, "R"], [126464, 126703, "AL"], [126704, 126705, "ON"], [126706, 126719, "AL"], [126720, 126975, "R"], [126976, 127019, "ON"], [127024, 127123, "ON"], [127136, 127150, "ON"], [127153, 127167, "ON"], [127169, 127183, "ON"], [127185, 127221, "ON"], [127232, 127242, "EN"], [127243, 127247, "ON"], [127279, 127279, "ON"], [127338, 127343, "ON"], [127405, 127405, "ON"], [127584, 127589, "ON"], [127744, 128728, "ON"], [128732, 128748, "ON"], [128752, 128764, "ON"], [128768, 128985, "ON"], [128992, 129003, "ON"], [129008, 129008, "ON"], [129024, 129035, "ON"], [129040, 129095, "ON"], [129104, 129113, "ON"], [129120, 129159, "ON"], [129168, 129197, "ON"], [129200, 129211, "ON"], [129216, 129217, "ON"], [129232, 129240, "ON"], [129280, 129623, "ON"], [129632, 129645, "ON"], [129648, 129660, "ON"], [129664, 129674, "ON"], [129678, 129734, "ON"], [129736, 129736, "ON"], [129741, 129756, "ON"], [129759, 129770, "ON"], [129775, 129784, "ON"], [129792, 129938, "ON"], [129940, 130031, "ON"], [130032, 130041, "EN"], [130042, 130042, "ON"], [131070, 131071, "BN"], [196606, 196607, "BN"], [262142, 262143, "BN"], [327678, 327679, "BN"], [393214, 393215, "BN"], [458750, 458751, "BN"], [524286, 524287, "BN"], [589822, 589823, "BN"], [655358, 655359, "BN"], [720894, 720895, "BN"], [786430, 786431, "BN"], [851966, 851967, "BN"], [917502, 917759, "BN"], [917760, 917999, "NSM"], [918e3, 921599, "BN"], [983038, 983039, "BN"], [1048574, 1048575, "BN"], [1114110, 1114111, "BN"]];
function mo(e2) {
  if (e2 <= 255) return uo[e2];
  let n2 = 0, t2 = co.length - 1;
  for (; n2 <= t2; ) {
    const o2 = n2 + t2 >> 1, l2 = co[o2];
    if (e2 < l2[0]) t2 = o2 - 1;
    else {
      if (!(e2 > l2[1])) return l2[2];
      n2 = o2 + 1;
    }
  }
  return "L";
}
var ho = /[ \t\n\r\f]+/g;
var fo = /[\t\n\r\f]| {2,}|^ | $/;
var po = null;
var vo = new RegExp("\\p{Script=Arabic}", "u");
var go = new RegExp("\\p{M}", "u");
var yo = new RegExp("\\p{Nd}", "u");
function wo(e2) {
  return vo.test(e2);
}
function xo(e2) {
  return e2 >= 19968 && e2 <= 40959 || e2 >= 13312 && e2 <= 19903 || e2 >= 131072 && e2 <= 173791 || e2 >= 173824 && e2 <= 177983 || e2 >= 177984 && e2 <= 178207 || e2 >= 178208 && e2 <= 183983 || e2 >= 183984 && e2 <= 191471 || e2 >= 191472 && e2 <= 192093 || e2 >= 194560 && e2 <= 195103 || e2 >= 196608 && e2 <= 201551 || e2 >= 201552 && e2 <= 205743 || e2 >= 205744 && e2 <= 210041 || e2 >= 63744 && e2 <= 64255 || e2 >= 12288 && e2 <= 12351 || e2 >= 12352 && e2 <= 12447 || e2 >= 12448 && e2 <= 12543 || e2 >= 44032 && e2 <= 55215 || e2 >= 65280 && e2 <= 65519;
}
function ko(e2) {
  for (let n2 = 0; n2 < e2.length; n2++) {
    const t2 = e2.charCodeAt(n2);
    if (!(t2 < 12288)) {
      if (t2 >= 55296 && t2 <= 56319 && n2 + 1 < e2.length) {
        const o2 = e2.charCodeAt(n2 + 1);
        if (o2 >= 56320 && o2 <= 57343) {
          if (xo(o2 - 56320 + (t2 - 55296 << 10) + 65536)) return true;
          n2++;
          continue;
        }
      }
      if (xo(t2)) return true;
    }
  }
  return false;
}
var No = /* @__PURE__ */ new Set([" ", " ", "⁠", "\uFEFF"]);
function bo(e2) {
  return ko(e2);
}
function Mo(e2) {
  return !function(e3) {
    const n2 = Ro(e3);
    return null !== n2 && (So.has(n2) || Co.has(n2));
  }(e2) && !function(e3) {
    const n2 = Ro(e3);
    return null !== n2 && No.has(n2);
  }(e2);
}
var So = /* @__PURE__ */ new Set(["，", "．", "！", "：", "；", "？", "、", "。", "・", "）", "〕", "〉", "》", "」", "』", "】", "〗", "〙", "〛", "ー", "々", "〻", "ゝ", "ゞ", "ヽ", "ヾ"]);
var _o = /* @__PURE__ */ new Set(['"', "(", "[", "{", "“", "‘", "«", "‹", "（", "〔", "〈", "《", "「", "『", "【", "〖", "〘", "〚"]);
var Bo = /* @__PURE__ */ new Set(["'", "’"]);
var Co = /* @__PURE__ */ new Set([".", ",", "!", "?", ":", ";", "،", "؛", "؟", "।", "॥", "၊", "။", "၌", "၍", "၏", ")", "]", "}", "%", '"', "”", "’", "»", "›", "…"]);
var Lo = /* @__PURE__ */ new Set([":", ".", "،", "؛"]);
var Oo = /* @__PURE__ */ new Set(["၏"]);
var Eo = /* @__PURE__ */ new Set(["”", "’", "»", "›", "」", "』", "】", "》", "〉", "〕", "）"]);
function To(e2) {
  if ($o(e2)) return true;
  let n2 = false;
  for (const t2 of e2) if (Co.has(t2)) n2 = true;
  else if (!n2 || !go.test(t2)) return false;
  return n2;
}
function Io(e2) {
  for (const n2 of e2) if (!So.has(n2) && !Co.has(n2)) return false;
  return e2.length > 0;
}
function Ao(e2) {
  if ($o(e2)) return true;
  for (const n2 of e2) if (!_o.has(n2) && !Bo.has(n2) && !go.test(n2)) return false;
  return e2.length > 0;
}
function $o(e2) {
  let n2 = false;
  for (const t2 of e2) if ("\\" !== t2 && !go.test(t2)) {
    if (!(_o.has(t2) || Co.has(t2) || Bo.has(t2))) return false;
    n2 = true;
  }
  return n2;
}
function Ho(e2, n2) {
  const t2 = n2 - 1;
  if (t2 <= 0) return Math.max(t2, 0);
  const o2 = e2.charCodeAt(t2);
  if (o2 < 56320 || o2 > 57343) return t2;
  const l2 = t2 - 1;
  if (l2 < 0) return t2;
  const r2 = e2.charCodeAt(l2);
  return r2 >= 55296 && r2 <= 56319 ? l2 : t2;
}
function Ro(e2) {
  if (0 === e2.length) return null;
  const n2 = Ho(e2, e2.length);
  return e2.slice(n2);
}
function zo(e2) {
  const n2 = Array.from(e2);
  let t2 = n2.length;
  for (; t2 > 0; ) {
    const e3 = n2[t2 - 1];
    if (go.test(e3)) t2--;
    else {
      if (!_o.has(e3) && !Bo.has(e3)) break;
      t2--;
    }
  }
  return t2 <= 0 || t2 === n2.length ? null : { head: n2.slice(0, t2).join(""), tail: n2.slice(t2).join("") };
}
function Po(e2, n2, t2) {
  return "text" !== t2 || n2 || 1 !== e2.length || "-" === e2 || "—" === e2 ? null : e2;
}
function Wo(e2, n2, t2, o2) {
  const l2 = n2[o2], r2 = e2[o2];
  if (null == l2) return r2;
  const a2 = t2[o2];
  if (r2.length === a2) return r2;
  const i2 = l2.repeat(a2);
  return e2[o2] = i2, i2;
}
function jo(e2, n2) {
  return e2 && null !== n2 && Lo.has(n2);
}
function Fo(e2) {
  const n2 = Ro(e2);
  return null !== n2 && Oo.has(n2);
}
function Do(e2) {
  if (e2.length < 2 || " " !== e2[0]) return null;
  const n2 = e2.slice(1);
  return new RegExp("^\\p{M}+$", "u").test(n2) ? { space: " ", marks: n2 } : null;
}
function Ko(e2) {
  let n2 = e2.length;
  for (; n2 > 0; ) {
    const t2 = Ho(e2, n2), o2 = e2.slice(t2, n2);
    if (Eo.has(o2)) return true;
    if (!Co.has(o2)) return false;
    n2 = t2;
  }
  return false;
}
function Vo(e2, n2) {
  if (n2.preserveOrdinarySpaces || n2.preserveHardBreaks) {
    if (" " === e2) return "preserved-space";
    if ("	" === e2) return "tab";
    if (n2.preserveHardBreaks && "\n" === e2) return "hard-break";
  }
  return " " === e2 ? "space" : " " === e2 || " " === e2 || "⁠" === e2 || "\uFEFF" === e2 ? "glue" : "​" === e2 ? "zero-width-break" : "­" === e2 ? "soft-hyphen" : "text";
}
var Uo = /[\x20\t\n\xA0\xAD\u200B\u202F\u2060\uFEFF]/;
function qo(e2) {
  return 1 === e2.length ? e2[0] : e2.join("");
}
function Xo(e2, n2) {
  const t2 = [];
  for (let o2 = e2.length - 1; o2 >= 0; o2--) t2.push(e2[o2]);
  return t2.push(n2), qo(t2);
}
function Go(e2, n2, t2, o2) {
  if (!Uo.test(e2)) return [{ text: e2, isWordLike: n2, kind: "text", start: t2 }];
  const l2 = [];
  let r2 = null, a2 = [], i2 = t2, s2 = false, u2 = 0;
  for (const d2 of e2) {
    const e3 = Vo(d2, o2), c = "text" === e3 && n2;
    null === r2 || e3 !== r2 || c !== s2 ? (null !== r2 && l2.push({ text: qo(a2), isWordLike: s2, kind: r2, start: i2 }), r2 = e3, a2 = [d2], i2 = t2 + u2, s2 = c, u2 += d2.length) : (a2.push(d2), u2 += d2.length);
  }
  return null !== r2 && l2.push({ text: qo(a2), isWordLike: s2, kind: r2, start: i2 }), l2;
}
function Zo(e2) {
  return "space" === e2 || "preserved-space" === e2 || "zero-width-break" === e2 || "hard-break" === e2;
}
var Jo = /^[A-Za-z][A-Za-z0-9+.-]*:$/;
function Yo(e2, n2) {
  const t2 = e2.texts[n2];
  return !!t2.startsWith("www.") || Jo.test(t2) && n2 + 1 < e2.len && "text" === e2.kinds[n2 + 1] && "//" === e2.texts[n2 + 1];
}
function Qo(e2) {
  return e2.includes("?") && (e2.includes("://") || e2.startsWith("www."));
}
var el = /* @__PURE__ */ new Set([":", "-", "/", "×", ",", ".", "+", "–", "—"]);
var nl = /^[A-Za-z0-9_]+[,:;]*$/;
var tl = /[,:;]+$/;
function ol(e2) {
  for (const n2 of e2) if (yo.test(n2)) return true;
  return false;
}
function ll(e2) {
  if (0 === e2.length) return false;
  for (const n2 of e2) if (!yo.test(n2) && !el.has(n2)) return false;
  return true;
}
function rl(e2, n2, t2) {
  var o2, l2, r2;
  const a2 = (null === po && (po = new Intl.Segmenter(void 0, { granularity: "word" })), po);
  let i2 = 0;
  const s2 = [], u2 = [], d2 = [], c = [], m = [], h2 = [], f = [], p = [], v = [], g = [], y = [], w = [];
  for (const M of a2.segment(e2)) for (const e3 of Go(M.segment, null != (o2 = M.isWordLike) && o2, M.index, t2)) {
    let t3 = function() {
      null !== h2[M2] && (u2[M2] = [Wo(s2, h2, f, M2)], h2[M2] = null), u2[M2].push(e3.text), d2[M2] = d2[M2] || e3.isWordLike, p[M2] = p[M2] || a3, v[M2] = v[M2] || x2, g[M2] = N2, y[M2] = b2, w[M2] = jo(v[M2], k2);
    };
    const o3 = "text" === e3.kind, r3 = Po(e3.text, e3.isWordLike, e3.kind), a3 = ko(e3.text), x2 = wo(e3.text), k2 = Ro(e3.text), N2 = Ko(e3.text), b2 = Fo(e3.text), M2 = i2 - 1;
    n2.carryCJKAfterClosingQuote && o3 && i2 > 0 && "text" === c[M2] && a3 && p[M2] && g[M2] || o3 && i2 > 0 && "text" === c[M2] && Io(e3.text) && p[M2] || o3 && i2 > 0 && "text" === c[M2] && y[M2] ? t3() : o3 && i2 > 0 && "text" === c[M2] && e3.isWordLike && x2 && w[M2] ? (t3(), d2[M2] = true) : null !== r3 && i2 > 0 && "text" === c[M2] && h2[M2] === r3 ? f[M2] = (null != (l2 = f[M2]) ? l2 : 1) + 1 : o3 && !e3.isWordLike && i2 > 0 && "text" === c[M2] && (To(e3.text) || "-" === e3.text && d2[M2]) ? t3() : (s2[i2] = e3.text, u2[i2] = [e3.text], d2[i2] = e3.isWordLike, c[i2] = e3.kind, m[i2] = e3.start, h2[i2] = r3, f[i2] = null === r3 ? 0 : 1, p[i2] = a3, v[i2] = x2, g[i2] = N2, y[i2] = b2, w[i2] = jo(x2, k2), i2++);
  }
  for (let M = 0; M < i2; M++) null === h2[M] ? s2[M] = qo(u2[M]) : s2[M] = Wo(s2, h2, f, M);
  for (let M = 1; M < i2; M++) "text" === c[M] && !d2[M] && $o(s2[M]) && "text" === c[M - 1] && (s2[M - 1] += s2[M], d2[M - 1] = d2[M - 1] || d2[M], s2[M] = "");
  const x = Array.from({ length: i2 }, () => null);
  let k = -1;
  for (let M = i2 - 1; M >= 0; M--) {
    const e3 = s2[M];
    if (0 !== e3.length) {
      if ("text" === c[M] && !d2[M] && Ao(e3) && k >= 0 && "text" === c[k]) {
        const n3 = null != (r2 = x[k]) ? r2 : [];
        n3.push(e3), x[k] = n3, m[k] = m[M], s2[M] = "";
        continue;
      }
      k = M;
    }
  }
  for (let M = 0; M < i2; M++) {
    const e3 = x[M];
    null != e3 && (s2[M] = Xo(e3, s2[M]));
  }
  let N = 0;
  for (let M = 0; M < i2; M++) {
    const e3 = s2[M];
    0 !== e3.length && (N !== M && (s2[N] = e3, d2[N] = d2[M], c[N] = c[M], m[N] = m[M]), N++);
  }
  s2.length = N, d2.length = N, c.length = N, m.length = N;
  const b = function(e3) {
    const n3 = e3.texts.slice(), t3 = e3.isWordLike.slice(), o3 = e3.kinds.slice(), l3 = e3.starts.slice();
    for (let r3 = 0; r3 < n3.length - 1; r3++) {
      if ("text" !== o3[r3] || "text" !== o3[r3 + 1]) continue;
      if (!ko(n3[r3]) || !ko(n3[r3 + 1])) continue;
      const e4 = zo(n3[r3]);
      null !== e4 && (n3[r3] = e4.head, n3[r3 + 1] = e4.tail + n3[r3 + 1], l3[r3 + 1] = l3[r3] + e4.head.length);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = [], t3 = [], o3 = [], l3 = [];
    for (let r3 = 0; r3 < e3.len; r3++) {
      const a3 = e3.texts[r3], i3 = e3.kinds[r3], s3 = e3.isWordLike[r3];
      if ("text" === i3 && s3 && nl.test(a3)) {
        const i4 = [a3];
        let s4 = tl.test(a3), u3 = r3 + 1;
        for (; s4 && u3 < e3.len && "text" === e3.kinds[u3] && e3.isWordLike[u3] && nl.test(e3.texts[u3]); ) {
          const n4 = e3.texts[u3];
          i4.push(n4), s4 = tl.test(n4), u3++;
        }
        n3.push(qo(i4)), t3.push(true), o3.push("text"), l3.push(e3.starts[r3]), r3 = u3 - 1;
        continue;
      }
      n3.push(a3), t3.push(s3), o3.push(i3), l3.push(e3.starts[r3]);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = [], t3 = [], o3 = [], l3 = [];
    for (let r3 = 0; r3 < e3.len; r3++) {
      const a3 = e3.texts[r3];
      if ("text" === e3.kinds[r3] && a3.includes("-")) {
        const i3 = a3.split("-");
        let s3 = i3.length > 1;
        for (let e4 = 0; e4 < i3.length; e4++) {
          const n4 = i3[e4];
          if (!s3) break;
          0 !== n4.length && ol(n4) && ll(n4) || (s3 = false);
        }
        if (s3) {
          let a4 = 0;
          for (let s4 = 0; s4 < i3.length; s4++) {
            const u3 = i3[s4], d3 = s4 < i3.length - 1 ? `${u3}-` : u3;
            n3.push(d3), t3.push(true), o3.push("text"), l3.push(e3.starts[r3] + a4), a4 += d3.length;
          }
          continue;
        }
      }
      n3.push(a3), t3.push(e3.isWordLike[r3]), o3.push(e3.kinds[r3]), l3.push(e3.starts[r3]);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = [], t3 = [], o3 = [], l3 = [];
    for (let r3 = 0; r3 < e3.len; r3++) {
      const a3 = e3.texts[r3], i3 = e3.kinds[r3];
      if ("text" === i3 && ll(a3) && ol(a3)) {
        const i4 = [a3];
        let s3 = r3 + 1;
        for (; s3 < e3.len && "text" === e3.kinds[s3] && ll(e3.texts[s3]); ) i4.push(e3.texts[s3]), s3++;
        n3.push(qo(i4)), t3.push(true), o3.push("text"), l3.push(e3.starts[r3]), r3 = s3 - 1;
        continue;
      }
      n3.push(a3), t3.push(e3.isWordLike[r3]), o3.push(i3), l3.push(e3.starts[r3]);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = [], t3 = [], o3 = [], l3 = [];
    for (let r3 = 0; r3 < e3.len; r3++) {
      const a3 = e3.texts[r3];
      if (n3.push(a3), t3.push(e3.isWordLike[r3]), o3.push(e3.kinds[r3]), l3.push(e3.starts[r3]), !Qo(a3)) continue;
      const i3 = r3 + 1;
      if (i3 >= e3.len || Zo(e3.kinds[i3])) continue;
      const s3 = [], u3 = e3.starts[i3];
      let d3 = i3;
      for (; d3 < e3.len && !Zo(e3.kinds[d3]); ) s3.push(e3.texts[d3]), d3++;
      s3.length > 0 && (n3.push(qo(s3)), t3.push(true), o3.push("text"), l3.push(u3), r3 = d3 - 1);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = e3.texts.slice(), t3 = e3.isWordLike.slice(), o3 = e3.kinds.slice(), l3 = e3.starts.slice();
    for (let a3 = 0; a3 < e3.len; a3++) {
      if ("text" !== o3[a3] || !Yo(e3, a3)) continue;
      const l4 = [n3[a3]];
      let r4 = a3 + 1;
      for (; r4 < e3.len && !Zo(o3[r4]); ) {
        l4.push(n3[r4]), t3[a3] = true;
        const e4 = n3[r4].includes("?");
        if (o3[r4] = "text", n3[r4] = "", r4++, e4) break;
      }
      n3[a3] = qo(l4);
    }
    let r3 = 0;
    for (let a3 = 0; a3 < n3.length; a3++) {
      const e4 = n3[a3];
      0 !== e4.length && (r3 !== a3 && (n3[r3] = e4, t3[r3] = t3[a3], o3[r3] = o3[a3], l3[r3] = l3[a3]), r3++);
    }
    return n3.length = r3, t3.length = r3, o3.length = r3, l3.length = r3, { len: r3, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }(function(e3) {
    const n3 = [], t3 = [], o3 = [], l3 = [];
    let r3 = 0;
    for (; r3 < e3.len; ) {
      const a3 = [e3.texts[r3]];
      let i3 = e3.isWordLike[r3], s3 = e3.kinds[r3], u3 = e3.starts[r3];
      if ("glue" === s3) {
        const d3 = [a3[0]], c2 = u3;
        for (r3++; r3 < e3.len && "glue" === e3.kinds[r3]; ) d3.push(e3.texts[r3]), r3++;
        const m2 = qo(d3);
        if (!(r3 < e3.len && "text" === e3.kinds[r3])) {
          n3.push(m2), t3.push(false), o3.push("glue"), l3.push(c2);
          continue;
        }
        a3[0] = m2, a3.push(e3.texts[r3]), i3 = e3.isWordLike[r3], s3 = "text", u3 = c2, r3++;
      } else r3++;
      if ("text" === s3) for (; r3 < e3.len && "glue" === e3.kinds[r3]; ) {
        const n4 = [];
        for (; r3 < e3.len && "glue" === e3.kinds[r3]; ) n4.push(e3.texts[r3]), r3++;
        const t4 = qo(n4);
        r3 < e3.len && "text" === e3.kinds[r3] ? (a3.push(t4, e3.texts[r3]), i3 = i3 || e3.isWordLike[r3], r3++) : a3.push(t4);
      }
      n3.push(qo(a3)), t3.push(i3), o3.push(s3), l3.push(u3);
    }
    return { len: n3.length, texts: n3, isWordLike: t3, kinds: o3, starts: l3 };
  }({ len: N, texts: s2, isWordLike: d2, kinds: c, starts: m })))))));
  for (let M = 0; M < b.len - 1; M++) {
    const e3 = Do(b.texts[M]);
    null !== e3 && ("space" !== b.kinds[M] && "preserved-space" !== b.kinds[M] || "text" !== b.kinds[M + 1] || !wo(b.texts[M + 1]) || (b.texts[M] = e3.space, b.isWordLike[M] = false, b.kinds[M] = "preserved-space" === b.kinds[M] ? "preserved-space" : "space", b.texts[M + 1] = e3.marks + b.texts[M + 1], b.starts[M + 1] = b.starts[M] + e3.space.length));
  }
  return b;
}
function al(e2, n2) {
  if (0 === e2.len) return [];
  if (!n2.preserveHardBreaks) return [{ startSegmentIndex: 0, endSegmentIndex: e2.len, consumedEndSegmentIndex: e2.len }];
  const t2 = [];
  let o2 = 0;
  for (let l2 = 0; l2 < e2.len; l2++) "hard-break" === e2.kinds[l2] && (t2.push({ startSegmentIndex: o2, endSegmentIndex: l2, consumedEndSegmentIndex: l2 + 1 }), o2 = l2 + 1);
  return o2 < e2.len && t2.push({ startSegmentIndex: o2, endSegmentIndex: e2.len, consumedEndSegmentIndex: e2.len }), t2;
}
var il = null;
var sl = /* @__PURE__ */ new Map();
var ul = null;
var dl = new RegExp("\\p{Emoji_Presentation}", "u");
var cl = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u;
var ml = null;
var hl = /* @__PURE__ */ new Map();
function fl() {
  if (null !== il) return il;
  if ("undefined" != typeof OffscreenCanvas) return il = new OffscreenCanvas(1, 1).getContext("2d"), il;
  if ("undefined" != typeof document) return il = document.createElement("canvas").getContext("2d"), il;
  throw new Error("Text measurement requires OffscreenCanvas or a DOM canvas context.");
}
function pl(e2, n2) {
  let t2 = n2.get(e2);
  return void 0 === t2 && (t2 = { width: fl().measureText(e2).width, containsCJK: ko(e2) }, n2.set(e2, t2)), t2;
}
function vl() {
  if (null !== ul) return ul;
  if ("undefined" == typeof navigator) return ul = { lineFitEpsilon: 5e-3, carryCJKAfterClosingQuote: false, preferPrefixWidthsForBreakableRuns: false, preferEarlySoftHyphenBreak: false }, ul;
  const e2 = navigator.userAgent, n2 = "Apple Computer, Inc." === navigator.vendor && e2.includes("Safari/") && !e2.includes("Chrome/") && !e2.includes("Chromium/") && !e2.includes("CriOS/") && !e2.includes("FxiOS/") && !e2.includes("EdgiOS/"), t2 = e2.includes("Chrome/") || e2.includes("Chromium/") || e2.includes("CriOS/") || e2.includes("Edg/");
  return ul = { lineFitEpsilon: n2 ? 1 / 64 : 5e-3, carryCJKAfterClosingQuote: t2, preferPrefixWidthsForBreakableRuns: n2, preferEarlySoftHyphenBreak: n2 }, ul;
}
function gl() {
  return null === ml && (ml = new Intl.Segmenter(void 0, { granularity: "grapheme" })), ml;
}
function yl(e2) {
  return dl.test(e2) || e2.includes("️");
}
function wl(e2, n2, t2) {
  return 0 === t2 ? n2.width : n2.width - function(e3, n3) {
    return void 0 === n3.emojiCount && (n3.emojiCount = function(e4) {
      let n4 = 0;
      const t3 = gl();
      for (const o2 of t3.segment(e4)) yl(o2.segment) && n4++;
      return n4;
    }(e3)), n3.emojiCount;
  }(e2, n2) * t2;
}
function xl(e2, n2) {
  for (; n2 < e2.widths.length; ) {
    const t2 = e2.kinds[n2];
    if ("space" !== t2 && "zero-width-break" !== t2 && "soft-hyphen" !== t2) break;
    n2++;
  }
  return n2;
}
function kl(e2, n2) {
  if (n2 <= 0) return 0;
  const t2 = e2 % n2;
  return Math.abs(t2) <= 1e-6 ? n2 : n2 - t2;
}
function Nl(e2, n2, t2) {
  const { widths: o2, kinds: l2, breakableFitAdvances: r2 } = e2;
  if (0 === o2.length) return 0;
  const a2 = n2 + vl().lineFitEpsilon;
  let i2 = 0, s2 = 0, u2 = false, d2 = 0, c = 0, m = -1, h2 = 0;
  function f(e3 = d2, n3 = c, t3 = s2) {
    i2++, s2 = 0, u2 = false, m = -1, h2 = 0;
  }
  function p(e3, n3) {
    u2 = true, d2 = e3 + 1, c = 0, s2 = n3;
  }
  function v(e3, n3, t3) {
    u2 = true, d2 = e3, c = n3 + 1, s2 = t3;
  }
  function g(e3, n3) {
    u2 ? (s2 += n3, d2 = e3 + 1, c = 0) : p(e3, n3);
  }
  function y(e3, n3) {
    const t3 = r2[e3];
    for (let o3 = n3; o3 < t3.length; o3++) {
      const n4 = t3[o3];
      u2 ? s2 + n4 > a2 ? (f(), v(e3, o3, n4)) : (s2 += n4, d2 = e3, c = o3 + 1) : v(e3, o3, n4);
    }
    u2 && d2 === e3 && c === t3.length && (d2 = e3 + 1, c = 0);
  }
  let w = 0;
  for (; w < o2.length && (u2 || (w = xl(e2, w), !(w >= o2.length))); ) {
    const e3 = o2[w], t3 = l2[w], i3 = "space" === t3 || "preserved-space" === t3 || "tab" === t3 || "zero-width-break" === t3 || "soft-hyphen" === t3;
    if (u2) if (s2 + e3 > a2) {
      if (i3) {
        g(w, e3), f(w + 1, 0, s2 - e3), w++;
        continue;
      }
      if (m >= 0) {
        if (d2 > m || d2 === m && c > 0) {
          f();
          continue;
        }
        f(m, 0, h2);
        continue;
      }
      if (e3 > n2 && null !== r2[w]) {
        f(), y(w, 0), w++;
        continue;
      }
      f();
    } else g(w, e3), i3 && (m = w + 1, h2 = s2 - e3), w++;
    else e3 > n2 && null !== r2[w] ? y(w, 0) : p(w, e3), i3 && (m = w + 1, h2 = s2 - e3), w++;
  }
  return u2 && f(), i2;
}
var bl = null;
function Ml(e2, n2) {
  const t2 = [];
  let o2 = [], l2 = 0, r2 = false, a2 = false, i2 = false;
  function s2() {
    0 !== o2.length && (t2.push({ text: 1 === o2.length ? o2[0] : o2.join(""), start: l2 }), o2 = [], r2 = false, a2 = false, i2 = false);
  }
  function u2(e3, n3, t3) {
    o2 = [e3], l2 = n3, r2 = t3, a2 = Ko(e3), i2 = _o.has(e3);
  }
  function d2(e3, n3) {
    o2.push(e3), r2 = r2 || n3;
    const t3 = Ko(e3);
    a2 = 1 === e3.length && Co.has(e3) && a2 || t3, i2 = false;
  }
  for (const c of (null === bl && (bl = new Intl.Segmenter(void 0, { granularity: "grapheme" })), bl).segment(e2)) {
    const e3 = c.segment, t3 = ko(e3);
    0 !== o2.length ? i2 || So.has(e3) || Co.has(e3) || n2.carryCJKAfterClosingQuote && t3 && a2 ? d2(e3, t3) : r2 || t3 ? (s2(), u2(e3, c.index, t3)) : d2(e3, t3) : u2(e3, c.index, t3);
  }
  return s2(), t2;
}
function Sl(e2) {
  if (e2.length <= 1) return e2;
  const n2 = [];
  let t2 = [e2[0].text], o2 = e2[0].start, l2 = ko(e2[0].text), r2 = Mo(e2[0].text);
  function a2() {
    n2.push({ text: 1 === t2.length ? t2[0] : t2.join(""), start: o2 });
  }
  for (let i2 = 1; i2 < e2.length; i2++) {
    const n3 = e2[i2], s2 = ko(n3.text), u2 = Mo(n3.text);
    l2 && r2 ? (t2.push(n3.text), l2 = l2 || s2, r2 = u2) : (a2(), t2 = [n3.text], o2 = n3.start, l2 = s2, r2 = u2);
  }
  return a2(), n2;
}
function _l(e2, n2, t2, o2) {
  const l2 = vl(), { cache: r2, emojiCorrection: a2 } = function(e3, n3) {
    fl().font = e3;
    const t3 = function(e4) {
      let n4 = sl.get(e4);
      return n4 || (n4 = /* @__PURE__ */ new Map(), sl.set(e4, n4)), n4;
    }(e3), o3 = function(e4) {
      const n4 = e4.match(/(\d+(?:\.\d+)?)\s*px/);
      return n4 ? parseFloat(n4[1]) : 16;
    }(e3), l3 = n3 ? function(e4, n4) {
      let t4 = hl.get(e4);
      if (void 0 !== t4) return t4;
      const o4 = fl();
      o4.font = e4;
      const l4 = o4.measureText("😀").width;
      if (t4 = 0, l4 > n4 + 0.5 && "undefined" != typeof document && null !== document.body) {
        const n5 = document.createElement("span");
        n5.style.font = e4, n5.style.display = "inline-block", n5.style.visibility = "hidden", n5.style.position = "absolute", n5.textContent = "😀", document.body.appendChild(n5);
        const o5 = n5.getBoundingClientRect().width;
        document.body.removeChild(n5), l4 - o5 > 0.5 && (t4 = l4 - o5);
      }
      return hl.set(e4, t4), t4;
    }(e3, o3) : 0;
    return { cache: t3, fontSize: o3, emojiCorrection: l3 };
  }(n2, (i2 = e2.normalized, cl.test(i2)));
  var i2;
  const s2 = wl("-", pl("-", r2), a2), u2 = 8 * wl(" ", pl(" ", r2), a2);
  if (0 === e2.len) return { widths: [], lineEndFitAdvances: [], lineEndPaintAdvances: [], kinds: [], simpleLineWalkFastPath: true, segLevels: null, breakableFitAdvances: [], discretionaryHyphenWidth: 0, tabStopAdvance: 0, chunks: [] };
  const d2 = [], c = [], m = [], h2 = [];
  let f = e2.chunks.length <= 1;
  const p = t2 ? [] : null, v = [], g = t2 ? [] : null, y = Array.from({ length: e2.len });
  function w(e3, n3, t3, o3, l3, r3, a3) {
    "text" !== l3 && "space" !== l3 && "zero-width-break" !== l3 && (f = false), d2.push(n3), c.push(t3), m.push(o3), h2.push(l3), null == p || p.push(r3), v.push(a3), null !== g && g.push(e3);
  }
  function x(e3, n3, t3, o3, i3) {
    const s3 = pl(e3, r2), u3 = wl(e3, s3, a2), d3 = "space" === n3 || "preserved-space" === n3 || "zero-width-break" === n3 ? 0 : u3, c2 = "space" === n3 || "zero-width-break" === n3 ? 0 : u3;
    if (i3 && o3 && e3.length > 1) {
      let o4 = "sum-graphemes";
      ll(e3) ? o4 = "pair-context" : l2.preferPrefixWidthsForBreakableRuns && (o4 = "segment-prefixes");
      const i4 = function(e4, n4, t4, o5, l3) {
        if (void 0 !== n4.breakableFitAdvances) return n4.breakableFitAdvances;
        const r3 = gl(), a3 = [];
        for (const d4 of r3.segment(e4)) a3.push(d4.segment);
        if (a3.length <= 1) return n4.breakableFitAdvances = null, n4.breakableFitAdvances;
        if ("sum-graphemes" === l3) {
          const e5 = [];
          for (const n5 of a3) {
            const l4 = pl(n5, t4);
            e5.push(wl(n5, l4, o5));
          }
          return n4.breakableFitAdvances = e5, n4.breakableFitAdvances;
        }
        if ("pair-context" === l3 || a3.length > 96) {
          const e5 = [];
          let l4 = null, r4 = 0;
          for (const n5 of a3) {
            const a4 = wl(n5, pl(n5, t4), o5);
            if (null === l4) e5.push(a4);
            else {
              const a5 = l4 + n5, i6 = pl(a5, t4);
              e5.push(wl(a5, i6, o5) - r4);
            }
            l4 = n5, r4 = a4;
          }
          return n4.breakableFitAdvances = e5, n4.breakableFitAdvances;
        }
        const i5 = [];
        let s4 = "", u4 = 0;
        for (const d4 of a3) {
          s4 += d4;
          const e5 = wl(s4, pl(s4, t4), o5);
          i5.push(e5 - u4), u4 = e5;
        }
        return n4.breakableFitAdvances = i5, n4.breakableFitAdvances;
      }(e3, s3, r2, a2, o4);
      return void w(e3, u3, d3, c2, n3, t3, i4);
    }
    w(e3, u3, d3, c2, n3, t3, null);
  }
  for (let b = 0; b < e2.len; b++) {
    y[b] = d2.length;
    const n3 = e2.texts[b], t3 = e2.isWordLike[b], a3 = e2.kinds[b], i3 = e2.starts[b];
    if ("soft-hyphen" === a3) {
      w(n3, 0, s2, s2, a3, i3, null);
      continue;
    }
    if ("hard-break" === a3) {
      w(n3, 0, 0, 0, a3, i3, null);
      continue;
    }
    if ("tab" === a3) {
      w(n3, 0, 0, 0, a3, i3, null);
      continue;
    }
    const u3 = pl(n3, r2);
    if ("text" === a3 && u3.containsCJK) {
      const e3 = Ml(n3, l2), r3 = "keep-all" === o2 ? Sl(e3) : e3;
      for (let n4 = 0; n4 < r3.length; n4++) {
        const e4 = r3[n4];
        x(e4.text, "text", i3 + e4.start, t3, "keep-all" === o2 || !ko(e4.text));
      }
      continue;
    }
    x(n3, a3, i3, t3, true);
  }
  const k = function(e3, n3, t3) {
    const o3 = [];
    for (let l3 = 0; l3 < e3.length; l3++) {
      const r3 = e3[l3], a3 = r3.startSegmentIndex < n3.length ? n3[r3.startSegmentIndex] : t3, i3 = r3.endSegmentIndex < n3.length ? n3[r3.endSegmentIndex] : t3, s3 = r3.consumedEndSegmentIndex < n3.length ? n3[r3.consumedEndSegmentIndex] : t3;
      o3.push({ startSegmentIndex: a3, endSegmentIndex: i3, consumedEndSegmentIndex: s3 });
    }
    return o3;
  }(e2.chunks, y, d2.length), N = null === p ? null : function(e3, n3) {
    const t3 = function(e4) {
      const n4 = e4.length;
      if (0 === n4) return null;
      const t4 = new Array(n4);
      let o4 = false;
      for (let u3 = 0; u3 < n4; ) {
        const l4 = e4.charCodeAt(u3);
        let r4 = l4, a4 = 1;
        if (l4 >= 55296 && l4 <= 56319 && u3 + 1 < n4) {
          const n5 = e4.charCodeAt(u3 + 1);
          n5 >= 56320 && n5 <= 57343 && (r4 = n5 - 56320 + (l4 - 55296 << 10) + 65536, a4 = 2);
        }
        const i4 = mo(r4);
        "R" !== i4 && "AL" !== i4 && "AN" !== i4 || (o4 = true);
        for (let e5 = 0; e5 < a4; e5++) t4[u3 + e5] = i4;
        u3 += a4;
      }
      if (!o4) return null;
      let l3 = 0;
      for (let u3 = 0; u3 < n4; u3++) {
        const e5 = t4[u3];
        if ("L" === e5) {
          l3 = 0;
          break;
        }
        if ("R" === e5 || "AL" === e5) {
          l3 = 1;
          break;
        }
      }
      const r3 = new Int8Array(n4);
      for (let u3 = 0; u3 < n4; u3++) r3[u3] = l3;
      const a3 = 1 & l3 ? "R" : "L", i3 = a3;
      let s3 = i3;
      for (let u3 = 0; u3 < n4; u3++) "NSM" === t4[u3] ? t4[u3] = s3 : s3 = t4[u3];
      s3 = i3;
      for (let u3 = 0; u3 < n4; u3++) {
        const e5 = t4[u3];
        "EN" === e5 ? t4[u3] = "AL" === s3 ? "AN" : "EN" : "R" !== e5 && "L" !== e5 && "AL" !== e5 || (s3 = e5);
      }
      for (let u3 = 0; u3 < n4; u3++) "AL" === t4[u3] && (t4[u3] = "R");
      for (let u3 = 1; u3 < n4 - 1; u3++) "ES" === t4[u3] && "EN" === t4[u3 - 1] && "EN" === t4[u3 + 1] && (t4[u3] = "EN"), "CS" !== t4[u3] || "EN" !== t4[u3 - 1] && "AN" !== t4[u3 - 1] || t4[u3 + 1] !== t4[u3 - 1] || (t4[u3] = t4[u3 - 1]);
      for (let u3 = 0; u3 < n4; u3++) {
        if ("EN" !== t4[u3]) continue;
        let e5;
        for (e5 = u3 - 1; e5 >= 0 && "ET" === t4[e5]; e5--) t4[e5] = "EN";
        for (e5 = u3 + 1; e5 < n4 && "ET" === t4[e5]; e5++) t4[e5] = "EN";
      }
      for (let u3 = 0; u3 < n4; u3++) {
        const e5 = t4[u3];
        "WS" !== e5 && "ES" !== e5 && "ET" !== e5 && "CS" !== e5 || (t4[u3] = "ON");
      }
      s3 = i3;
      for (let u3 = 0; u3 < n4; u3++) {
        const e5 = t4[u3];
        "EN" === e5 ? t4[u3] = "L" === s3 ? "L" : "EN" : "R" !== e5 && "L" !== e5 || (s3 = e5);
      }
      for (let u3 = 0; u3 < n4; u3++) {
        if ("ON" !== t4[u3]) continue;
        let e5 = u3 + 1;
        for (; e5 < n4 && "ON" === t4[e5]; ) e5++;
        const o5 = "L" !== (u3 > 0 ? t4[u3 - 1] : i3) ? "R" : "L";
        if (o5 === ("L" !== (e5 < n4 ? t4[e5] : i3) ? "R" : "L")) for (let n5 = u3; n5 < e5; n5++) t4[n5] = o5;
        u3 = e5 - 1;
      }
      for (let u3 = 0; u3 < n4; u3++) "ON" === t4[u3] && (t4[u3] = a3);
      for (let u3 = 0; u3 < n4; u3++) {
        const e5 = t4[u3];
        1 & r3[u3] ? "L" !== e5 && "AN" !== e5 && "EN" !== e5 || r3[u3]++ : "R" === e5 ? r3[u3]++ : "AN" !== e5 && "EN" !== e5 || (r3[u3] += 2);
      }
      return r3;
    }(e3);
    if (null === t3) return null;
    const o3 = new Int8Array(n3.length);
    for (let l3 = 0; l3 < n3.length; l3++) o3[l3] = t3[n3[l3]];
    return o3;
  }(e2.normalized, p);
  return null !== g ? { widths: d2, lineEndFitAdvances: c, lineEndPaintAdvances: m, kinds: h2, simpleLineWalkFastPath: f, segLevels: N, breakableFitAdvances: v, discretionaryHyphenWidth: s2, tabStopAdvance: u2, chunks: k, segments: g } : { widths: d2, lineEndFitAdvances: c, lineEndPaintAdvances: m, kinds: h2, simpleLineWalkFastPath: f, segLevels: N, breakableFitAdvances: v, discretionaryHyphenWidth: s2, tabStopAdvance: u2, chunks: k };
}
function Bl(e2, n2, t2) {
  return function(e3, n3, t3, o2) {
    var l2;
    const r2 = null != (l2 = null == o2 ? void 0 : o2.wordBreak) ? l2 : "normal";
    return _l(function(e4, n4, t4 = "normal", o3 = "normal") {
      const l3 = function(e5) {
        const n5 = null != e5 ? e5 : "normal";
        return "pre-wrap" === n5 ? { mode: n5, preserveOrdinarySpaces: true, preserveHardBreaks: true } : { mode: n5, preserveOrdinarySpaces: false, preserveHardBreaks: false };
      }(t4), r3 = "pre-wrap" === l3.mode ? function(e5) {
        return /[\r\f]/.test(e5) ? e5.replace(/\r\n/g, "\n").replace(/[\r\f]/g, "\n") : e5.replace(/\r\n/g, "\n");
      }(e4) : function(e5) {
        if (!fo.test(e5)) return e5;
        let n5 = e5.replace(ho, " ");
        return 32 === n5.charCodeAt(0) && (n5 = n5.slice(1)), n5.length > 0 && 32 === n5.charCodeAt(n5.length - 1) && (n5 = n5.slice(0, -1)), n5;
      }(e4);
      if (0 === r3.length) return { normalized: r3, chunks: [], len: 0, texts: [], isWordLike: [], kinds: [], starts: [] };
      const a2 = "keep-all" === o3 ? function(e5) {
        if (e5.len <= 1) return e5;
        const n5 = [], t5 = [], o4 = [], l4 = [];
        let r4 = null, a3 = false, i2 = 0, s2 = false, u2 = false;
        function d2() {
          null !== r4 && (n5.push(qo(r4)), t5.push(a3), o4.push("text"), l4.push(i2), r4 = null);
        }
        for (let c = 0; c < e5.len; c++) {
          const m = e5.texts[c], h2 = e5.kinds[c], f = e5.isWordLike[c], p = e5.starts[c];
          if ("text" === h2) {
            const e6 = bo(m), n6 = Mo(m);
            if (null !== r4 && s2 && u2) {
              r4.push(m), a3 = a3 || f, s2 = s2 || e6, u2 = n6;
              continue;
            }
            d2(), r4 = [m], a3 = f, i2 = p, s2 = e6, u2 = n6;
            continue;
          }
          d2(), n5.push(m), t5.push(f), o4.push(h2), l4.push(p);
        }
        return d2(), { len: n5.length, texts: n5, isWordLike: t5, kinds: o4, starts: l4 };
      }(rl(r3, n4, l3)) : rl(r3, n4, l3);
      return i({ normalized: r3, chunks: al(a2, l3) }, a2);
    }(e3, vl(), null == o2 ? void 0 : o2.whiteSpace, r2), n3, false, r2);
  }(e2, n2, 0, t2);
}
var Cl = "__MARKSTREAM_VUE_HEIGHT_ESTIMATION_EXPERIMENT__";
var Ll = (() => {
  const e2 = globalThis;
  if (e2[Cl]) return e2[Cl];
  const n2 = { configs: {}, controllers: {}, revision: shallowRef(0), preparedCache: /* @__PURE__ */ new Map(), blockEstimateCache: /* @__PURE__ */ new Map() };
  return e2[Cl] = n2, n2;
})();
var Ol = null;
var El = Ll.revision;
function Tl(e2) {
  var n2;
  return e2 && null != (n2 = Ll.configs[e2]) ? n2 : null;
}
function Il(e2, n2) {
  const t2 = Number.parseFloat(String(null != e2 ? e2 : ""));
  return Number.isFinite(t2) && t2 > 0 ? t2 : n2;
}
function Al(e2) {
  return "text" === (null == e2 ? void 0 : e2.type) || "emoji" === (null == e2 ? void 0 : e2.type) || "hardbreak" === (null == e2 ? void 0 : e2.type);
}
function $l(e2) {
  var n2, t2, o2;
  if (!Array.isArray(e2) || 0 === e2.length) return null;
  let l2 = "";
  for (const r2 of e2) {
    if (!Al(r2)) return null;
    "text" === r2.type ? l2 += String(null != (n2 = r2.content) ? n2 : "") : "emoji" === r2.type ? l2 += String(null != (o2 = null != (t2 = r2.name) ? t2 : r2.raw) ? o2 : "") : "hardbreak" === r2.type && (l2 += "\n");
  }
  return l2.length > 0 ? l2 : null;
}
function Hl(e2, n2, t2) {
  var o2, l2;
  if (!e2 || !Number.isFinite(n2) || n2 <= 0 || !function() {
    var e3;
    if (null != Ol) return Ol;
    if ("undefined" == typeof document) return false;
    try {
      const n3 = document.createElement("canvas");
      return Ol = !!(null == (e3 = n3.getContext) ? void 0 : e3.call(n3, "2d")), Ol;
    } catch (n3) {
      return Ol = false, false;
    }
  }()) return null;
  try {
    const r2 = Math.round(100 * n2) / 100, a2 = [null != (o2 = t2.whiteSpace) ? o2 : "pre-wrap", t2.font, t2.lineHeight, t2.wrapperOverhead, t2.widthAdjustment, r2, e2].join("\0"), i2 = Ll.blockEstimateCache.get(a2);
    if (i2) return Ll.blockEstimateCache.delete(a2), Ll.blockEstimateCache.set(a2, i2), { kind: "simple-text", height: i2.height, contentHeight: i2.contentHeight };
    const s2 = null != (l2 = t2.whiteSpace) ? l2 : "pre-wrap", u2 = function(e3, n3, t3) {
      const o3 = `${t3}\0${n3}\0${e3}`, l3 = Ll.preparedCache.get(o3);
      if (l3) return Ll.preparedCache.delete(o3), Ll.preparedCache.set(o3, l3), l3.prepared;
      const r3 = Bl(e3, n3, { whiteSpace: t3 });
      for (Ll.preparedCache.set(o3, { prepared: r3 }); Ll.preparedCache.size > 240; ) {
        const e4 = Ll.preparedCache.keys().next().value;
        if (!e4) break;
        Ll.preparedCache.delete(e4);
      }
      return r3;
    }(e2, t2.font, s2), d2 = function(e3, n3, t3) {
      const o3 = function(e4, n4) {
        return e4.simpleLineWalkFastPath ? Nl(e4, n4) : function(e5, n5) {
          if (e5.simpleLineWalkFastPath) return Nl(e5, n5);
          const { widths: t4, lineEndFitAdvances: o4, lineEndPaintAdvances: l3, kinds: r3, breakableFitAdvances: a3, discretionaryHyphenWidth: i3, tabStopAdvance: s3, chunks: u3 } = e5;
          if (0 === t4.length || 0 === u3.length) return 0;
          const d3 = vl(), c2 = d3.lineFitEpsilon, m2 = n5 + c2;
          let h2 = 0, f = 0, p = false, v = 0, g = 0, y = -1, w = 0, x = 0, k = null;
          function N() {
            y = -1, w = 0, x = 0, k = null;
          }
          function b(e6 = v, n6 = g, t5 = f) {
            h2++, f = 0, p = false, N();
          }
          function M(e6, n6) {
            p = true, v = e6 + 1, g = 0, f = n6;
          }
          function S(e6, n6, t5) {
            p = true, v = e6, g = n6 + 1, f = t5;
          }
          function _(e6, n6) {
            p ? (f += n6, v = e6 + 1, g = 0) : M(e6, n6);
          }
          function B(e6, n6, t5, r4) {
            if (!n6) return;
            const a4 = "tab" === e6 ? 0 : o4[t5], i4 = "tab" === e6 ? r4 : l3[t5];
            y = t5 + 1, w = f - r4 + a4, x = f - r4 + i4, k = e6;
          }
          function C(e6, n6) {
            const t5 = a3[e6];
            for (let o5 = n6; o5 < t5.length; o5++) {
              const n7 = t5[o5];
              p ? f + n7 > m2 ? (b(), S(e6, o5, n7)) : (f += n7, v = e6, g = o5 + 1) : S(e6, o5, n7);
            }
            p && v === e6 && g === t5.length && (v = e6 + 1, g = 0);
          }
          function L(e6) {
            if ("soft-hyphen" !== k) return false;
            const t5 = a3[e6];
            if (null == t5) return false;
            const { fitCount: o5, fittedWidth: l4 } = function(e7, n6, t6, o6, l5) {
              let r4 = 0, a4 = n6;
              for (; r4 < e7.length; ) {
                const n7 = a4 + e7[r4];
                if ((r4 + 1 < e7.length ? n7 + l5 : n7) > t6 + o6) break;
                a4 = n7, r4++;
              }
              return { fitCount: r4, fittedWidth: a4 };
            }(t5, f, n5, c2, i3);
            return 0 !== o5 && (f = l4, v = e6, g = o5, N(), o5 === t5.length ? (v = e6 + 1, g = 0, true) : (b(e6, o5, l4 + i3), C(e6, o5), true));
          }
          function O(e6) {
            h2++, N();
          }
          for (let E = 0; E < u3.length; E++) {
            const e6 = u3[E];
            if (e6.startSegmentIndex === e6.endSegmentIndex) {
              O();
              continue;
            }
            p = false, f = 0, e6.startSegmentIndex, v = e6.startSegmentIndex, g = 0, N();
            let c3 = e6.startSegmentIndex;
            for (; c3 < e6.endSegmentIndex; ) {
              const e7 = r3[c3], u4 = "space" === e7 || "preserved-space" === e7 || "tab" === e7 || "zero-width-break" === e7 || "soft-hyphen" === e7, h3 = "tab" === e7 ? kl(f, s3) : t4[c3];
              if ("soft-hyphen" !== e7) if (p) {
                if (f + h3 > m2) {
                  const t5 = f + ("tab" === e7 ? 0 : o4[c3]), r4 = f + ("tab" === e7 ? h3 : l3[c3]);
                  if ("soft-hyphen" === k && d3.preferEarlySoftHyphenBreak && w <= m2) {
                    b(y, 0, x);
                    continue;
                  }
                  if ("soft-hyphen" === k && L(c3)) {
                    c3++;
                    continue;
                  }
                  if (u4 && t5 <= m2) {
                    _(c3, h3), b(c3 + 1, 0, r4), c3++;
                    continue;
                  }
                  if (y >= 0 && w <= m2) {
                    if (v > y || v === y && g > 0) {
                      b();
                      continue;
                    }
                    const e8 = y;
                    b(e8, 0, x), c3 = e8;
                    continue;
                  }
                  if (h3 > n5 && null !== a3[c3]) {
                    b(), C(c3, 0), c3++;
                    continue;
                  }
                  b();
                  continue;
                }
                _(c3, h3), B(e7, u4, c3, h3), c3++;
              } else h3 > n5 && null !== a3[c3] ? C(c3, 0) : M(c3, h3), B(e7, u4, c3, h3), c3++;
              else p && (v = c3 + 1, g = 0, y = c3 + 1, w = f + i3, x = f + i3, k = e7), c3++;
            }
            if (p) {
              const n6 = y === e6.consumedEndSegmentIndex ? x : f;
              b(e6.consumedEndSegmentIndex, 0, n6);
            }
          }
          return h2;
        }(e4, n4);
      }(e3, n3);
      return { lineCount: o3, height: o3 * t3 };
    }(u2, Math.max(24, r2 - t2.widthAdjustment), t2.lineHeight), c = Math.max(t2.lineHeight, d2.height), m = Math.max(t2.lineHeight, Math.round(c + t2.wrapperOverhead));
    for (Ll.blockEstimateCache.set(a2, { height: m, contentHeight: Math.round(c) }); Ll.blockEstimateCache.size > 4e3; ) {
      const e3 = Ll.blockEstimateCache.keys().next().value;
      if (!e3) break;
      Ll.blockEstimateCache.delete(e3);
    }
    return { kind: "simple-text", height: m, contentHeight: Math.round(c) };
  } catch (r2) {
    return null;
  }
}
function Rl(e2, n2, t2) {
  var o2, l2;
  if (!t2 || !e2 || !Number.isFinite(n2) || n2 <= 0) return null;
  if ("paragraph" === e2.type) {
    const o3 = $l(e2.children);
    return o3 && t2.paragraph ? Hl(o3, n2, t2.paragraph) : null;
  }
  if ("heading" === e2.type) {
    const o3 = Number(e2.level || 0), l3 = $l(e2.children), r2 = t2.headings[o3];
    return l3 && r2 ? Hl(l3, n2, r2) : null;
  }
  if ("list_item" === e2.type) {
    const r2 = Array.isArray(e2.children) ? e2.children : [];
    if (1 !== r2.length || "paragraph" !== (null == (o2 = r2[0]) ? void 0 : o2.type) || !t2.listItem) return null;
    const a2 = $l(null == (l2 = r2[0]) ? void 0 : l2.children);
    return a2 ? Hl(a2, n2, t2.listItem) : null;
  }
  if ("list" === e2.type) {
    const o3 = Array.isArray(e2.items) ? e2.items : [];
    if (!o3.length) return null;
    let l3 = Math.max(0, t2.listWrapperOverhead);
    for (const e3 of o3) {
      const o4 = Rl(e3, n2, t2);
      if (!o4) return null;
      l3 += o4.height;
    }
    return { kind: "simple-text", height: Math.max(1, Math.round(l3)), contentHeight: Math.max(1, Math.round(l3)) };
  }
  return null;
}
function zl(e2) {
  if (!e2) return 1;
  const n2 = String(e2).split(/\r?\n/);
  return Math.max(1, n2.length);
}
function Pl(e2) {
  return e2 ? `${e2.fontStyle || "normal"} ${e2.fontWeight || "400"} ${e2.fontSize || "16px"} ${e2.fontFamily || "sans-serif"}` : "";
}
function Wl(e2, n2, t2 = "pre-wrap") {
  if (!e2 || !n2 || "undefined" == typeof window) return null;
  const o2 = window.getComputedStyle(n2), l2 = e2.offsetHeight, r2 = Il(o2.lineHeight, 1.5 * Il(o2.fontSize, 16)), a2 = e2.getBoundingClientRect().width, i2 = n2.getBoundingClientRect().width;
  return { font: Pl(o2), lineHeight: r2, wrapperOverhead: Math.max(0, l2 - r2), widthAdjustment: Math.max(0, a2 - i2), whiteSpace: t2 };
}
function jl(e2) {
  const n2 = "number" == typeof e2 ? e2 : Number.parseFloat(String(null != e2 ? e2 : ""));
  return Number.isFinite(n2) && n2 > 0 ? n2 : null;
}
function Fl(e2) {
  var n2;
  for (const t2 of e2.split(/\r?\n/)) {
    const e3 = t2.trim();
    if (!e3 || e3.startsWith("%%")) continue;
    const o2 = e3.match(/^([A-Z][\w-]*)\b/i);
    return (null == (n2 = null == o2 ? void 0 : o2[1]) ? void 0 : n2.toLowerCase()) || "";
  }
  return "";
}
function Dl(e2) {
  const n2 = e2.split(/\r?\n/).map((e3) => e3.trim()).filter((e3) => e3 && !e3.startsWith("%%")), t2 = Math.max(1, n2.length), o2 = Fl(e2);
  return "gantt" === o2 ? 220 + 28 * t2 : "sequencediagram" === o2 ? 180 + 26 * t2 : "classdiagram" === o2 || "statediagram" === o2 || "erdiagram" === o2 ? 180 + 24 * t2 : "flowchart" === o2 || "graph" === o2 ? 170 + 28 * t2 : 200 + 22 * t2;
}
function Kl(e2) {
  const n2 = e2.split(/\r?\n/).filter((e3) => /^\s*-\s+/.test(e3)).length;
  return n2 >= 3 ? 500 : n2 > 0 ? 280 + 60 * n2 : 360;
}
function Vl(e2, n2 = 360, t2 = 500) {
  return null == t2 ? Math.max(n2, e2) : Math.min(Math.max(n2, e2), t2);
}
function Ul(e2, n2 = 360, t2 = 500) {
  return Vl(e2, n2, t2);
}
function ql(e2, n2 = 360, t2 = 500) {
  return Vl(e2, n2, t2);
}
var Xl = false;
var Gl = null;
var Zl = false;
function Jl() {
  return Zl;
}
var Yl = null;
var Ql = false;
var er = null;
function nr() {
  return d(this, null, function* () {
    return !!(yield tr());
  });
}
function tr() {
  return d(this, null, function* () {
    if (er) return er;
    er = d(null, null, function* () {
      if (!Yl) {
        if (Ql) return null;
        try {
          Yl = yield import("./__vite-optional-peer-dep_stream-monaco_markstream-vue-LMH2SPQP.js");
        } catch (e2) {
          return Ql = true, null;
        }
      }
      try {
        return yield function(e2) {
          return d(this, null, function* () {
            if (Xl) return;
            if (Gl) return Gl;
            const n2 = d(null, null, function* () {
              const n3 = null == globalThis ? void 0 : globalThis.MonacoEnvironment;
              n3 && ("function" == typeof n3.getWorker || "function" == typeof n3.getWorkerUrl) || "function" != typeof (null == e2 ? void 0 : e2.preloadMonacoWorkers) || (yield e2.preloadMonacoWorkers()), Xl = true;
            });
            return Gl = n2.finally(() => {
              Gl = null;
            }), Gl;
          });
        }(Yl), Zl = true, Yl;
      } catch (e2) {
        return null;
      }
    });
    try {
      return yield er;
    } finally {
      er = null;
    }
  });
}
var or = /* @__PURE__ */ new Map();
var lr = "material";
var rr = /* @__PURE__ */ new Map();
var ar = /* @__PURE__ */ new Map();
var ir = null;
function sr(e2) {
  or.set(e2.id, e2);
}
function ur(e2) {
  if (!or.has(e2)) throw new Error(`[markstream-vue] Unknown icon theme: "${e2}". Registered: ${[...or.keys()].join(", ")}`);
  lr = e2, null == ir || ir();
  const n2 = or.get(e2);
  n2.loadExtended && !rr.has(e2) && cr(n2);
}
function dr() {
  return [...or.keys()];
}
function cr(e2) {
  return d(this, null, function* () {
    var n2, t2, o2;
    if (rr.has(e2.id)) return null != (n2 = rr.get(e2.id)) ? n2 : null;
    let l2 = ar.get(e2.id);
    return l2 || (l2 = (null != (o2 = null == (t2 = e2.loadExtended) ? void 0 : t2.call(e2)) ? o2 : Promise.resolve(null)).then((n3) => (rr.set(e2.id, n3), null == ir || ir(), n3)).catch(() => (rr.set(e2.id, null), null)), ar.set(e2.id, l2)), l2;
  });
}
function mr({ R: e2, H: n2 = 0, B: t2 = 50 }) {
  const o2 = e2 * (1 - n2) || 1e-6;
  return Math.max(1, Math.floor(t2 / o2));
}
function hr2(e2) {
  const n2 = e2.length + 10 * (e2.match(/\\/g) || []).length;
  return n2 < 10 ? "simple" : n2 < 40 ? "medium" : "complex";
}
function fr(e2) {
  switch (e2) {
    case "simple":
      return 3;
    case "medium":
      return 10;
    case "complex":
      return 30;
  }
}
function pr(e2, n2) {
  var t2, o2;
  let l2 = 0;
  for (const r2 of e2) {
    const e3 = fr(hr2(r2));
    e3 > l2 && (l2 = e3);
  }
  return mr({ R: l2, H: null != (t2 = null == n2 ? void 0 : n2.H) ? t2 : 0, B: null != (o2 = null == n2 ? void 0 : n2.B) ? o2 : 50 });
}
var vr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M30 14v-2h-2V8h-2v4h-2V8h-2v4h-2v2h2v2h-2v2h2v4h2v-4h2v4h2v-4h2v-2h-2v-2Zm-4 2h-2v-2h2Zm-12.437 6A5.57 5.57 0 0 1 8 16.437v-2.873A5.57 5.57 0 0 1 13.563 8H18V2h-4.437A11.563 11.563 0 0 0 2 13.563v2.873A11.564 11.564 0 0 0 13.563 28H18v-6Z"/></svg>';
var gr = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>';
var yr = { id: "material", core: { "": gr, plain: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/><path fill="#42a5f5" d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"/></svg>', text: gr, javascript: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', typescript: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16"><path fill="#0288d1" d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>', jsx: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00bcd4" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#00bcd4" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#00bcd4" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>', tsx: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#0288d1" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#0288d1" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#0288d1" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>', html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#e65100" d="m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z"/></svg>', css: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7e57c2" d="M20 18h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 20 22h2v2h2v-2c0-.388-.562-.851-1.254-1.034C20.356 20.34 20 18.84 20 18m-3.254 2.966C14.356 20.34 14 18.84 14 18h-2v-2h-2v8h2v-2h4v2h2v-2c0-.388-.562-.851-1.254-1.034"/><path fill="#7e57c2" d="M24 4H4v20a4 4 0 0 0 4 4h16.16A3.84 3.84 0 0 0 28 24.16V8a4 4 0 0 0-4-4m2 14h-2v-2h-2v2c0 .193 0 .703 1.254 1.033A3.345 3.345 0 0 1 26 22v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>', scss: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ec407a" d="M27.837 5.673a4.33 4.33 0 0 0-2.293-2.701c-2.362-1.261-6.11-1.298-9.548-.092a26.3 26.3 0 0 0-8.76 4.966c-2.752 2.542-3.438 4.925-3.189 6.194.523 2.668 3.274 4.539 5.485 6.042.418.284.822.559 1.175.816-1.429.76-4.261 2.444-5.088 4.248a3.88 3.88 0 0 0-.118 3.332A2.37 2.37 0 0 0 6.869 29.8a5.6 5.6 0 0 0 1.49.2 6.35 6.35 0 0 0 5.19-2.856 6.74 6.74 0 0 0 .864-5.382 7.3 7.3 0 0 1 2.044-.03 3.92 3.92 0 0 1 2.816 1.311 1.82 1.82 0 0 1 .423 1.262 1.55 1.55 0 0 1-.772 1.05c-.234.14-.586.355-.504.803.036.194.198.633.894.512a2.93 2.93 0 0 0 2.145-2.651 4 4 0 0 0-1.197-2.904 5.94 5.94 0 0 0-4.396-1.626 10.6 10.6 0 0 0-2.672.304 20 20 0 0 0-2.203-1.846c-1.712-1.3-3.33-2.529-3.235-4.26.125-2.263 2.468-4.532 6.964-6.744 4.016-1.976 7.254-2.037 8.944-1.438a2 2 0 0 1 1.204.883 2.77 2.77 0 0 1-.36 2.47 9.71 9.71 0 0 1-7.425 4.304 3.86 3.86 0 0 1-3.238-.757c-.278-.302-.593-.645-1.074-.383q-.565.31-.225 1.189a3.9 3.9 0 0 0 2.407 1.92 11.7 11.7 0 0 0 7.128-.671c3.527-1.35 6.681-5.202 5.756-8.787M11.895 24.475a4 4 0 0 1-.192.468 4.5 4.5 0 0 1-.753 1.081 2.83 2.83 0 0 1-2.533 1.107c-.056-.032-.078-.146-.085-.193a3.28 3.28 0 0 1 1.076-2.284 11.3 11.3 0 0 1 2.644-1.933 3.85 3.85 0 0 1-.157 1.754"/></svg>', json: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#f9a825" d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80z"/></svg>', python: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0288d1" d="M9.86 2A2.86 2.86 0 0 0 7 4.86v1.68h4.29c.39 0 .71.57.71.96H4.86A2.86 2.86 0 0 0 2 10.36v3.781a2.86 2.86 0 0 0 2.86 2.86h1.18v-2.68a2.85 2.85 0 0 1 2.85-2.86h5.25c1.58 0 2.86-1.271 2.86-2.851V4.86A2.86 2.86 0 0 0 14.14 2zm-.72 1.61c.4 0 .72.12.72.71s-.32.891-.72.891c-.39 0-.71-.3-.71-.89s.32-.711.71-.711"/><path fill="#fdd835" d="M17.959 7v2.68a2.85 2.85 0 0 1-2.85 2.859H9.86A2.85 2.85 0 0 0 7 15.389v3.75a2.86 2.86 0 0 0 2.86 2.86h4.28A2.86 2.86 0 0 0 17 19.14v-1.68h-4.291c-.39 0-.709-.57-.709-.96h7.14A2.86 2.86 0 0 0 22 13.64V9.86A2.86 2.86 0 0 0 19.14 7zM8.32 11.513l-.004.004.038-.004zm6.54 7.276c.39 0 .71.3.71.89a.71.71 0 0 1-.71.71c-.4 0-.72-.12-.72-.71s.32-.89.72-.89"/></svg>', ruby: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f44336" d="M18.041 3.177c2.24.382 2.879 1.919 2.843 3.527V6.67l-1.013 13.266-13.132.897h.008c-1.093-.044-3.518-.151-3.634-3.545l1.217-2.222 2.462 5.74 2.097-6.77-.045.009.018-.018 6.85 2.186L13.945 9.3l6.53-.409-5.144-4.212 2.71-1.51v.009M3.113 17.252v.017zM6.916 6.874c2.63-2.622 6.033-4.168 7.34-2.844 1.297 1.306-.072 4.523-2.702 7.135-2.666 2.613-6.015 4.248-7.322 2.933-1.306-1.324.036-4.612 2.675-7.224z"/></svg>', go: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00acc1" d="M2 12h4v2H2zm-2 4h6v2H0zm4 4h2v2H4zm16.954-5H14v3h3.239a4.42 4.42 0 0 1-3.531 2 2.65 2.65 0 0 1-2.053-.858 2.86 2.86 0 0 1-.628-2.28A4.515 4.515 0 0 1 15.292 13a2.73 2.73 0 0 1 1.749.584l2.962-1.185A5.6 5.6 0 0 0 15.292 10a7.526 7.526 0 0 0-7.243 6.5 5.614 5.614 0 0 0 5.659 6.5 7.526 7.526 0 0 0 7.243-6.5 6.4 6.4 0 0 0 .003-1.5"/><path fill="#00acc1" d="M26.292 10a7.526 7.526 0 0 0-7.243 6.5 5.614 5.614 0 0 0 5.659 6.5 7.526 7.526 0 0 0 7.243-6.5 5.614 5.614 0 0 0-5.659-6.5m2.681 6.137A4.515 4.515 0 0 1 24.708 20a2.65 2.65 0 0 1-2.053-.858 2.86 2.86 0 0 1-.628-2.28A4.515 4.515 0 0 1 26.292 13a2.65 2.65 0 0 1 2.053.858 2.86 2.86 0 0 1 .628 2.28Z"/></svg>', java: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#f44336" d="M4 26h24v2H4zM28 4H7a1 1 0 0 0-1 1v13a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-4h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 8h-4V6h4Z"/></svg>', kotlin: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><defs><linearGradient id="a" x1="1.725" x2="22.185" y1="22.67" y2="1.982" gradientTransform="translate(1.306 1.129)scale(.89324)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7c4dff"/><stop offset=".5" stop-color="#d500f9"/><stop offset="1" stop-color="#ef5350"/></linearGradient></defs><path fill="url(#a)" d="M2.975 2.976v18.048h18.05v-.03l-4.478-4.511-4.48-4.515 4.48-4.515 4.443-4.477z"/></svg>', c: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M19.563 22A5.57 5.57 0 0 1 14 16.437v-2.873A5.57 5.57 0 0 1 19.563 8H24V2h-4.437A11.563 11.563 0 0 0 8 13.563v2.873A11.564 11.564 0 0 0 19.563 28H24v-6Z"/></svg>', cpp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0288d1" d="M28 14v-4h-2v4h-6v-4h-2v4h-4v2h4v4h2v-4h6v4h2v-4h4v-2z"/><path fill="#0288d1" d="M13.563 22A5.57 5.57 0 0 1 8 16.437v-2.873A5.57 5.57 0 0 1 13.563 8H18V2h-4.437A11.563 11.563 0 0 0 2 13.563v2.873A11.564 11.564 0 0 0 13.563 28H18v-6Z"/></svg>', cs: vr, csharp: vr, php: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#1e88e5" d="M12 18.08c-6.63 0-12-2.72-12-6.08s5.37-6.08 12-6.08S24 8.64 24 12s-5.37 6.08-12 6.08m-5.19-7.95c.54 0 .91.1 1.09.31.18.2.22.56.13 1.03-.1.53-.29.87-.58 1.09q-.42.33-1.29.33h-.87l.53-2.76zm-3.5 5.55h1.44l.34-1.75h1.23c.54 0 .98-.06 1.33-.17.35-.12.67-.31.96-.58.24-.22.43-.46.58-.73.15-.26.26-.56.31-.88.16-.78.05-1.39-.33-1.82-.39-.44-.99-.65-1.82-.65H4.59zm7.25-8.33-1.28 6.58h1.42l.74-3.77h1.14c.36 0 .6.06.71.18s.13.34.07.66l-.57 2.93h1.45l.59-3.07c.13-.62.03-1.07-.27-1.36-.3-.27-.85-.4-1.65-.4h-1.27L12 7.35zM18 10.13c.55 0 .91.1 1.09.31.18.2.22.56.13 1.03-.1.53-.29.87-.57 1.09-.29.22-.72.33-1.3.33h-.85l.5-2.76zm-3.5 5.55h1.44l.34-1.75h1.22c.55 0 1-.06 1.35-.17.35-.12.65-.31.95-.58.24-.22.44-.46.58-.73.15-.26.26-.56.32-.88.15-.78.04-1.39-.34-1.82-.36-.44-.99-.65-1.82-.65h-2.75z"/></svg>', shell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', powershell: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#03a9f4" d="M29.07 6H7.677A1.535 1.535 0 0 0 6.24 7.113l-4.2 17.774A.852.852 0 0 0 2.93 26h21.393a1.535 1.535 0 0 0 1.436-1.113L29.96 7.112A.852.852 0 0 0 29.07 6M8.626 23.797a1.4 1.4 0 0 1-1.814-.31l-.007-.009a1.075 1.075 0 0 1 .315-1.599l9.6-6.061-6.102-5.852-.01-.01a1.068 1.068 0 0 1 .084-1.625l.037-.03a1.38 1.38 0 0 1 1.8.07l7.233 6.957a1.1 1.1 0 0 1 .236.739 1.08 1.08 0 0 1-.412.79c-.074.04-.146.119-10.951 6.935ZM24 22.94A1.135 1.135 0 0 1 22.803 24h-5.634a1.061 1.061 0 1 1 .001-2.112h5.633A1.134 1.134 0 0 1 24 22.938Z"/></svg>', sql: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ffca28" d="M16 24c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-8c-5.525 0-10-.9-10-2v4c0 1.1 4.475 2 10 2s10-.9 10-2v-4c0 1.1-4.475 2-10 2m0-12C10.477 4 6 4.895 6 6v4c0 1.1 4.475 2 10 2s10-.9 10-2V6c0-1.105-4.477-2-10-2"/></svg>', yaml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ff5252" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m12 16v-2H9v2zm-4-4v-2H6v2z"/></svg>', markdown: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>', xml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#8bc34a" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41zm11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41z"/></svg>', rust: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#ff7043" d="m30 12-4-2V6h-4l-2-4-4 2-4-2-2 4H6v4l-4 2 2 4-2 4 4 2v4h4l2 4 4-2 4 2 2-4h4v-4l4-2-2-4ZM6 16a9.9 9.9 0 0 1 .842-4H10v8H6.842A9.9 9.9 0 0 1 6 16m10 10a9.98 9.98 0 0 1-7.978-4H16v-2h-2v-2h4c.819.819.297 2.308 1.179 3.37a1.89 1.89 0 0 0 1.46.63h3.34A9.98 9.98 0 0 1 16 26m-2-12v-2h4a1 1 0 0 1 0 2Zm11.158 6H24a2.006 2.006 0 0 1-2-2 2 2 0 0 0-2-2 3 3 0 0 0 3-3q0-.08-.004-.161A3.115 3.115 0 0 0 19.83 10H8.022a9.986 9.986 0 0 1 17.136 10"/></svg>', vue: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#41b883" d="M1.791 3.851 12 21.471 22.209 3.936V3.85H18.24l-6.18 10.616L5.906 3.851z"/><path fill="#35495e" d="m5.907 3.851 6.152 10.617L18.24 3.851h-3.723L12.084 8.03 9.66 3.85z"/></svg>', mermaid: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>' }, fallback: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#ff7043" d="M2 2a1 1 0 0 0-1 1v10c0 .554.446 1 1 1h12c.554 0 1-.446 1-1V3a1 1 0 0 0-1-1zm0 3h12v8H2zm1 2 2 2-2 2 1 1 3-3-3-3zm5 3.5V12h5v-1.5z"/></svg>', loadExtended: () => import("./extended-76T3QQPL.js").then((e2) => e2.materialExtendedMap) };
var wr = null;
var xr = shallowRef(0);
ir = () => {
  xr.value++;
}, sr(yr);
var kr = { "": "", javascript: "javascript", js: "javascript", mjs: "javascript", cjs: "javascript", typescript: "typescript", ts: "typescript", jsx: "jsx", tsx: "tsx", golang: "go", py: "python", rb: "ruby", sh: "shell", bash: "shell", zsh: "shell", shellscript: "shell", bat: "shell", batch: "shell", ps1: "powershell", plaintext: "plain", text: "plain", "c++": "cpp", "c#": "csharp", "objective-c": "objectivec", "objective-c++": "objectivecpp", yml: "yaml", md: "markdown", rs: "rust", kt: "kotlin" };
function Nr(e2) {
  wr = null != e2 ? e2 : null;
}
function br(e2) {
  var n2;
  const t2 = function(e3) {
    if (!e3) return "";
    const n3 = e3.trim();
    if (!n3) return "";
    const [t3] = n3.split(/\s+/), [o2] = t3.split(":");
    return o2.toLowerCase();
  }(e2);
  return null != (n2 = kr[t2]) ? n2 : t2;
}
function Mr(e2) {
  const n2 = br(e2);
  if (!n2) return "plaintext";
  switch (n2) {
    case "plain":
      return "plaintext";
    case "jsx":
      return "javascript";
    case "tsx":
      return "typescript";
    default:
      return n2;
  }
}
function Sr() {
  return d(this, null, function* () {
    yield function() {
      return d(this, null, function* () {
        const e2 = or.get(lr);
        (null == e2 ? void 0 : e2.loadExtended) && (yield cr(e2));
      });
    }();
  });
}
function _r(e2) {
  if (wr) {
    const n3 = wr(e2);
    if (null != n3 && "" !== n3) return n3;
  }
  return function(e3) {
    const n3 = or.get(lr);
    if (!n3) return;
    const t3 = n3.core[e3];
    if (t3) return t3;
    const o2 = rr.get(n3.id);
    if (o2) {
      const n4 = o2[e3];
      if (n4) return n4;
    }
    n3.loadExtended && !rr.has(n3.id) && cr(n3);
  }(br(e2)) || (null != (t2 = null == (n2 = or.get(lr)) ? void 0 : n2.fallback) ? t2 : "");
  var n2, t2;
}
var Br = { js: "JavaScript", javascript: "JavaScript", ts: "TypeScript", jsx: "JSX", tsx: "TSX", html: "HTML", css: "CSS", scss: "SCSS", json: "JSON", py: "Python", python: "Python", rb: "Ruby", go: "Go", java: "Java", c: "C", cpp: "C++", cs: "C#", php: "PHP", sh: "Shell", bash: "Bash", sql: "SQL", yaml: "YAML", md: "Markdown", d2: "D2", d2lang: "D2", "": "Plain Text", plain: "Plain Text" };
var Cr = new class {
  constructor() {
    u(this, "metrics", []), u(this, "enabled", false), u(this, "maxMetrics", 1e3);
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  recordRender(e2) {
    this.enabled && (this.metrics.push(e2), this.metrics.length > this.maxMetrics && this.metrics.shift());
  }
  getStats() {
    if (0 === this.metrics.length) return { totalRenders: 0, cacheHitRate: 0, averageWorkerTime: 0, averageDirectTime: 0, averageCacheHitTime: 0, workerSavings: 0, recommendation: "Insufficient data" };
    const e2 = this.metrics.filter((e3) => "worker" === e3.type && e3.success), n2 = this.metrics.filter((e3) => "direct" === e3.type && e3.success), t2 = this.metrics.filter((e3) => "cache-hit" === e3.type), o2 = this.metrics.length, l2 = t2.length, r2 = l2 / o2 * 100, a2 = e2.length > 0 ? e2.reduce((e3, n3) => e3 + n3.duration, 0) / e2.length : 0, i2 = n2.length > 0 ? n2.reduce((e3, n3) => e3 + n3.duration, 0) / n2.length : 0, s2 = t2.length > 0 ? t2.reduce((e3, n3) => e3 + n3.duration, 0) / t2.length : 0, u2 = o2 * i2 - (e2.reduce((e3, n3) => e3 + n3.duration, 0) + n2.reduce((e3, n3) => e3 + n3.duration, 0) + t2.reduce((e3, n3) => e3 + n3.duration, 0));
    let d2 = "";
    return d2 = r2 > 70 && a2 < 2 * i2 ? "✅ Worker + Cache is highly beneficial" : r2 > 50 ? "✅ Worker + Cache is beneficial" : a2 > 3 * i2 ? "⚠️ Worker overhead too high, consider direct rendering" : i2 < 5 ? "⚠️ Formulas too simple, Worker overhead may not be worth it" : "✅ Worker prevents main thread blocking", { totalRenders: o2, cacheHits: l2, cacheHitRate: r2.toFixed(1), workerCalls: e2.length, directCalls: n2.length, averageWorkerTime: a2.toFixed(2), averageDirectTime: i2.toFixed(2), averageCacheHitTime: s2.toFixed(3), workerSavings: u2.toFixed(2), recommendation: d2 };
  }
  printReport() {
    const e2 = this.getStats();
    return console.group("📊 KaTeX Rendering Performance Report"), e2.totalRenders, e2.cacheHits, e2.cacheHitRate, e2.workerCalls, e2.directCalls, e2.averageWorkerTime, e2.averageDirectTime, e2.averageCacheHitTime, e2.workerSavings, e2.recommendation, console.groupEnd(), e2;
  }
  reset() {
    this.metrics = [];
  }
  exportMetrics() {
    return { metrics: [...this.metrics], stats: this.getStats(), timestamp: Date.now() };
  }
}();
function Lr() {
  Cr.enable();
}
function Or() {
  Cr.disable();
}
function Er() {
  return Cr.printReport();
}
function Tr(e2) {
  try {
    if ("undefined" != typeof globalThis && "function" == typeof globalThis.requestAnimationFrame) return globalThis.requestAnimationFrame(e2);
  } catch (n2) {
  }
  return globalThis.setTimeout(e2, 0);
}
function Ir(e2) {
  try {
    if (null == e2) return;
    if ("undefined" != typeof globalThis && "function" == typeof globalThis.cancelAnimationFrame) return void globalThis.cancelAnimationFrame(e2);
  } catch (n2) {
  }
  try {
    globalThis.clearTimeout(e2);
  } catch (n2) {
  }
}
"undefined" != typeof window && (window.__katexPerfReport = Er, window.__katexPerfMonitor = Cr);
var Ar = { key: 0, class: "code-block-header flex justify-between items-center border-b px-[var(--ms-inset-panel-x)] py-[var(--ms-inset-panel-y)] border-[var(--code-border)] bg-[var(--code-header-bg)] text-[var(--code-fg)]" };
var $r = { class: "flex items-center gap-0.5" };
var Hr = ["aria-label"];
var Rr = { class: "code-diff-stat removed" };
var zr = { class: "code-diff-stat added" };
var Pr = ["aria-label"];
var Wr = { key: 0, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var jr = { key: 1, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var Fr = ["aria-pressed"];
var Dr = { key: 3, class: "relative" };
var Kr = ["aria-expanded"];
var Vr = ["disabled"];
var Ur = ["disabled"];
var qr = ["disabled"];
var Xr = { key: 0, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var Gr = { key: 1, xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" };
var Zr = { class: "code-block-shell-content" };
var Jr = { class: "code-loading-placeholder" };
var Yr = { class: "sr-only", "aria-live": "polite", role: "status" };
var Qr = defineComponent({ __name: "CodeBlockShell", props: { showHeader: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true }, showFontSizeButtons: { type: Boolean, default: true }, enableFontSizeControl: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showExpandButton: { type: Boolean, default: true }, showPreviewButton: { type: Boolean, default: true }, showTooltips: { type: Boolean, default: true }, isDark: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, stream: { type: Boolean, default: false }, isCollapsed: { type: Boolean, default: false }, isExpanded: { type: Boolean, default: false }, copyText: { type: Boolean, default: false }, isPreviewable: { type: Boolean, default: false }, codeFontSize: {}, codeFontMin: {}, codeFontMax: {}, defaultCodeFontSize: {}, fontBaselineReady: { type: Boolean, default: false }, diffStats: {}, diffStatsAriaLabel: {} }, emits: ["toggleCollapse", "decreaseFont", "resetFont", "increaseFont", "copy", "toggleExpand", "preview"], setup(e2, { emit: n2 }) {
  const t2 = e2, o2 = n2, l2 = ref(false), r2 = ref(null), a2 = ref(null);
  function i2() {
    l2.value = !l2.value, l2.value && document.addEventListener("click", s2, { once: true, capture: true });
  }
  function s2(e3) {
    var n3, t3;
    const o3 = e3.target;
    (null == (n3 = r2.value) ? void 0 : n3.contains(o3)) || (null == (t3 = a2.value) ? void 0 : t3.contains(o3)) ? document.addEventListener("click", s2, { once: true, capture: true }) : l2.value = false;
  }
  const u2 = computed(() => t2.showFontSizeButtons && t2.enableFontSizeControl || t2.showExpandButton || t2.isPreviewable && t2.showPreviewButton), { t: d2 } = $n(), c = computed(() => false !== t2.showTooltips);
  function m(e3, n3) {
    c.value && Ln(e3.currentTarget, n3, "top", false, void 0, t2.isDark);
  }
  function h2() {
    c.value && On();
  }
  function f(e3) {
    m(e3, t2.copyText ? d2("common.copied") || "Copied" : d2("common.copy") || "Copy");
  }
  const p = computed(() => {
    var e3, n3;
    return !!Number.isFinite(t2.codeFontSize) && (null != (e3 = t2.codeFontSize) ? e3 : 0) <= (null != (n3 = t2.codeFontMin) ? n3 : 0);
  }), v = computed(() => !t2.fontBaselineReady || t2.codeFontSize === t2.defaultCodeFontSize), g = computed(() => {
    var e3, n3;
    return !!Number.isFinite(t2.codeFontSize) && (null != (e3 = t2.codeFontSize) ? e3 : 0) >= (null != (n3 = t2.codeFontMax) ? n3 : 100);
  });
  return (n3, s3) => (openBlock(), createElementBlock(Fragment, null, [t2.showHeader ? (openBlock(), createElementBlock("div", Ar, [renderSlot(n3.$slots, "header-left"), renderSlot(n3.$slots, "header-right", {}, () => [createBaseVNode("div", $r, [e2.diffStats ? (openBlock(), createElementBlock("div", { key: 0, class: "code-diff-stats", "aria-label": e2.diffStatsAriaLabel }, [createBaseVNode("span", Rr, "-" + toDisplayString(e2.diffStats.removed), 1), createBaseVNode("span", zr, "+" + toDisplayString(e2.diffStats.added), 1)], 8, Hr)) : createCommentVNode("", true), t2.showCopyButton ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "code-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded leading-none shrink-0 cursor-pointer text-[var(--code-action-fg)] hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed transition-colors", "aria-label": e2.copyText ? unref(d2)("common.copied") || "Copied" : unref(d2)("common.copy") || "Copy", onClick: s3[0] || (s3[0] = (e3) => o2("copy")), onMouseenter: s3[1] || (s3[1] = (e3) => f(e3)), onFocus: s3[2] || (s3[2] = (e3) => f(e3)), onMouseleave: h2, onBlur: h2 }, [e2.copyText ? (openBlock(), createElementBlock("svg", jr, [...s3[14] || (s3[14] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M20 6L9 17l-5-5" }, null, -1)])])) : (openBlock(), createElementBlock("svg", Wr, [...s3[13] || (s3[13] = [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), createBaseVNode("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })], -1)])]))], 40, Pr)) : createCommentVNode("", true), t2.showCollapseButton ? (openBlock(), createElementBlock("button", { key: 2, type: "button", class: "code-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded leading-none shrink-0 cursor-pointer text-[var(--code-action-fg)] hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed transition-colors", "aria-pressed": e2.isCollapsed, onClick: s3[3] || (s3[3] = (e3) => o2("toggleCollapse")), onMouseenter: s3[4] || (s3[4] = (n4) => m(n4, e2.isCollapsed ? unref(d2)("common.expand") || "Expand" : unref(d2)("common.collapse") || "Collapse")), onFocus: s3[5] || (s3[5] = (n4) => m(n4, e2.isCollapsed ? unref(d2)("common.expand") || "Expand" : unref(d2)("common.collapse") || "Collapse")), onMouseleave: h2, onBlur: h2 }, [(openBlock(), createElementBlock("svg", { style: normalizeStyle({ rotate: e2.isCollapsed ? "0deg" : "90deg" }), xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [...s3[15] || (s3[15] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 18l6-6l-6-6" }, null, -1)])], 4))], 40, Fr)) : createCommentVNode("", true), u2.value ? (openBlock(), createElementBlock("div", Dr, [createBaseVNode("button", { ref_key: "moreBtnRef", ref: a2, type: "button", class: "code-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded leading-none shrink-0 cursor-pointer text-[var(--code-action-fg)] hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] active:scale-[0.96] transition-colors", "aria-expanded": l2.value, "aria-haspopup": "true", onClick: withModifiers(i2, ["stop"]), onMouseenter: s3[6] || (s3[6] = (e3) => m(e3, unref(d2)("common.more") || "More")), onFocus: s3[7] || (s3[7] = (e3) => m(e3, unref(d2)("common.more") || "More")), onMouseleave: h2, onBlur: h2 }, [...s3[16] || (s3[16] = [createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" class="action-icon"><g fill="currentColor"><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></g></svg>', 1)])], 40, Kr), createVNode(Transition, { name: "code-menu" }, { default: withCtx(() => [l2.value ? (openBlock(), createElementBlock("div", { key: 0, ref_key: "moreMenuRef", ref: r2, class: "code-more-menu min-w-[10rem] p-1 bg-[hsl(var(--ms-popover))] text-[hsl(var(--ms-popover-foreground))] border border-[var(--code-border)] shadow-[var(--ms-shadow-popover)]", role: "menu" }, [t2.showFontSizeButtons && t2.enableFontSizeControl ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("button", { type: "button", role: "menuitem", class: "flex items-center gap-2 w-full py-1.5 px-2 rounded text-xs text-[var(--code-action-fg)] cursor-pointer whitespace-nowrap hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors", disabled: p.value, onClick: s3[8] || (s3[8] = (e3) => o2("decreaseFont")) }, [s3[17] || (s3[17] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M5 12h14" })], -1)), createBaseVNode("span", null, toDisplayString(unref(d2)("common.fontSmaller") || "Font size −"), 1)], 8, Vr), createBaseVNode("button", { type: "button", role: "menuitem", class: "flex items-center gap-2 w-full py-1.5 px-2 rounded text-xs text-[var(--code-action-fg)] cursor-pointer whitespace-nowrap hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors", disabled: v.value, onClick: s3[9] || (s3[9] = (e3) => o2("resetFont")) }, [s3[18] || (s3[18] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), createBaseVNode("path", { d: "M3 3v5h5" })])], -1)), createBaseVNode("span", null, toDisplayString(unref(d2)("common.fontReset") || "Font size reset"), 1)], 8, Ur), createBaseVNode("button", { type: "button", role: "menuitem", class: "flex items-center gap-2 w-full py-1.5 px-2 rounded text-xs text-[var(--code-action-fg)] cursor-pointer whitespace-nowrap hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors", disabled: g.value, onClick: s3[10] || (s3[10] = (e3) => o2("increaseFont")) }, [s3[19] || (s3[19] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M5 12h14m-7-7v14" })], -1)), createBaseVNode("span", null, toDisplayString(unref(d2)("common.fontLarger") || "Font size +"), 1)], 8, qr)], 64)) : createCommentVNode("", true), t2.showExpandButton ? (openBlock(), createElementBlock("button", { key: 1, type: "button", role: "menuitem", class: "flex items-center gap-2 w-full py-1.5 px-2 rounded text-xs text-[var(--code-action-fg)] cursor-pointer whitespace-nowrap hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] transition-colors", onClick: s3[11] || (s3[11] = (e3) => {
    o2("toggleExpand", e3), l2.value = false;
  }) }, [e2.isExpanded ? (openBlock(), createElementBlock("svg", Xr, [...s3[20] || (s3[20] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6" }, null, -1)])])) : (openBlock(), createElementBlock("svg", Gr, [...s3[21] || (s3[21] = [createBaseVNode("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6" }, null, -1)])])), createBaseVNode("span", null, toDisplayString(e2.isExpanded ? unref(d2)("common.collapse") || "Collapse" : unref(d2)("common.expand") || "Expand"), 1)])) : createCommentVNode("", true), e2.isPreviewable && t2.showPreviewButton ? (openBlock(), createElementBlock("button", { key: 2, type: "button", role: "menuitem", class: "flex items-center gap-2 w-full py-1.5 px-2 rounded text-xs text-[var(--code-action-fg)] cursor-pointer whitespace-nowrap hover:bg-[var(--code-action-hover-bg)] hover:text-[var(--code-action-hover-fg)] transition-colors", onClick: s3[12] || (s3[12] = (e3) => {
    o2("preview"), l2.value = false;
  }) }, [s3[22] || (s3[22] = createBaseVNode("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "1em", height: "1em", viewBox: "0 0 24 24", class: "action-icon" }, [createBaseVNode("g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2" }, [createBaseVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), createBaseVNode("circle", { cx: "12", cy: "12", r: "3" })])], -1)), createBaseVNode("span", null, toDisplayString(unref(d2)("common.preview") || "Preview"), 1)])) : createCommentVNode("", true)], 512)) : createCommentVNode("", true)]), _: 1 })])) : createCommentVNode("", true)])])])) : createCommentVNode("", true), withDirectives(createBaseVNode("div", Zr, [renderSlot(n3.$slots, "default")], 512), [[vShow, !(e2.isCollapsed || !e2.stream && e2.loading)]]), withDirectives(createBaseVNode("div", Jr, [renderSlot(n3.$slots, "loading", {}, () => [s3[23] || (s3[23] = createBaseVNode("div", { class: "loading-skeleton" }, [createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line short" })], -1))])], 512), [[vShow, !e2.stream && e2.loading]]), createBaseVNode("span", Yr, toDisplayString(e2.copyText ? unref(d2)("common.copied") || "Copied" : ""), 1)], 64));
} });
var ea = { class: "code-header-main" };
var na = ["innerHTML"];
var ta = { class: "code-header-copy" };
var oa = { class: "code-header-title" };
var la = ["innerHTML"];
var ra = Ee(defineComponent({ __name: "MarkdownCodeBlockNode", props: { node: {}, loading: { type: Boolean, default: true }, stream: { type: Boolean, default: true }, darkTheme: { default: "vitesse-dark" }, lightTheme: { default: "vitesse-light" }, isDark: { type: Boolean, default: false }, isShowPreview: { type: Boolean, default: true }, enableFontSizeControl: { type: Boolean, default: true }, minWidth: { default: void 0 }, maxWidth: { default: void 0 }, themes: {}, showHeader: { type: Boolean, default: true }, showCopyButton: { type: Boolean, default: true }, showExpandButton: { type: Boolean, default: true }, showPreviewButton: { type: Boolean, default: true }, showCollapseButton: { type: Boolean, default: true }, showFontSizeButtons: { type: Boolean, default: true }, showTooltips: { type: Boolean }, autoScrollOnUpdate: { type: Boolean, default: true }, autoScrollInitial: { type: Boolean, default: true }, estimatedHeightPx: {}, estimatedContentHeightPx: {} }, emits: ["previewCode", "copy"], setup(e2, { emit: n2 }) {
  const t2 = e2, o2 = n2, { t: l2 } = $n(), r2 = ref(br(t2.node.language)), a2 = ref(false), s2 = ref(false), u2 = ref(false), c = ref(null), m = ref(null), h2 = ref(null), f = ref(""), p = ref(false);
  let v;
  const g = jt(), y = ref(null), w = ref("undefined" == typeof window);
  "undefined" != typeof window && watch(() => c.value, (e3) => {
    var n3;
    if (null == (n3 = y.value) || n3.destroy(), y.value = null, !e3) return void (w.value = false);
    const t3 = g(e3, { rootMargin: "400px" });
    y.value = t3, w.value = t3.isVisible.value, t3.whenVisible.then(() => {
      w.value = true;
    });
  }, { immediate: true });
  const x = ref(false !== t2.autoScrollInitial), k = ref(0), N = computed(() => false !== t2.autoScrollOnUpdate), b = ref(14), M = ref(b.value), S = computed(() => {
    const e3 = b.value, n3 = M.value;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 && "number" == typeof n3 && Number.isFinite(n3) && n3 > 0;
  }), _ = computed(() => {
    const e3 = r2.value.trim().toLowerCase();
    return Br[e3] || e3.charAt(0).toUpperCase() + e3.slice(1);
  }), B = computed(() => (xr.value, _r(r2.value.trim().toLowerCase().split(":")[0]))), C = computed(() => {
    const e3 = r2.value.trim().toLowerCase();
    return t2.isShowPreview && ("html" === e3 || "svg" === e3);
  }), L = computed(() => {
    const e3 = {}, n3 = (e4) => {
      if (null != e4) return "number" == typeof e4 ? `${e4}px` : String(e4);
    }, o3 = n3(t2.minWidth), l3 = n3(t2.maxWidth);
    return o3 && (e3.minWidth = o3), l3 && (e3.maxWidth = l3), e3;
  }), O = computed(() => {
    const e3 = t2.estimatedContentHeightPx;
    return "number" == typeof e3 && Number.isFinite(e3) && e3 > 0 ? Math.round(e3) : null;
  }), E = computed(() => null != O.value && !p.value), T = computed(() => i({ fontSize: `${M.value}px` }, E.value ? { minHeight: `${O.value}px` } : {})), H = computed(() => false !== t2.showTooltips);
  function z() {
    return t2.isDark ? t2.darkTheme : t2.lightTheme;
  }
  function P(e3) {
    if (null == v || v.disconnect(), v = void 0, !e3) return f.value = "", void (p.value = false);
    var n3;
    f.value = `<pre class="shiki shiki-fallback"><code>${n3 = e3, n3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}</code></pre>`, p.value = false;
  }
  function j() {
    f.value = "", p.value = true;
  }
  function F() {
    var e3;
    const n3 = h2.value;
    return !!n3 && (n3.childNodes.length > 0 || Boolean(null == (e3 = n3.textContent) ? void 0 : e3.trim().length));
  }
  function D() {
    return d(this, null, function* () {
      if (yield nextTick(), F()) return void j();
      const e3 = h2.value;
      e3 && (null == v || v.disconnect(), v = new MutationObserver(() => {
        F() && (j(), null == v || v.disconnect(), v = void 0);
      }), v.observe(e3, { childList: true, subtree: true }));
    });
  }
  let U, Y, Q, ee, te = null;
  const le = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set(), ae = void 0 !== import.meta && Boolean(false);
  let ie = null;
  function ue(e3, n3) {
    return d(this, null, function* () {
      if (!U) return;
      const t3 = function(e4, n4 = false) {
        var t4;
        const [o3] = String(null != e4 ? e4 : "").split(":"), l3 = null != (t4 = null == o3 ? void 0 : o3.trim().toLowerCase()) ? t4 : "";
        return l3 ? !ee || ee.has(l3) ? l3 : (n4 && ae && !le.has(l3) && (le.add(l3), console.warn(`[MarkdownCodeBlockNode] Language "${l3}" not preloaded in stream-markdown; falling back to plaintext.`)), "plaintext") : "plaintext";
      }(n3, Boolean(e3 && e3.length));
      try {
        yield U.updateCode(e3, t3);
      } catch (o3) {
        "plaintext" !== t3 ? (ae && !re.has(t3) && (re.add(t3), console.warn(`[MarkdownCodeBlockNode] Failed to render language "${t3}", retrying as plaintext.`, o3)), yield U.updateCode(e3, "plaintext")) : ae && console.warn("[MarkdownCodeBlockNode] Failed to render code block even as plaintext.", o3);
      }
    });
  }
  function de(e3) {
    if (!Q) return;
    const n3 = Array.isArray(e3) ? e3.join("\0") : "";
    te !== n3 && (Q({ themes: e3 }), te = n3);
  }
  function ce() {
    return d(this, null, function* () {
      w.value ? (yield function() {
        return d(this, null, function* () {
          if (!Y) return ie || (ie = d(null, null, function* () {
            try {
              const e3 = yield import("./__vite-optional-peer-dep_stream-markdown_markstream-vue-AUZBV3JS.js");
              Y = e3.createShikiStreamRenderer, Q = e3.registerHighlight;
              const n3 = Array.isArray(e3.defaultLanguages) ? e3.defaultLanguages : void 0;
              ee = n3 ? new Set(n3.map((e4) => e4.toLowerCase())) : void 0, de(t2.themes);
            } catch (e3) {
              console.warn("[MarkdownCodeBlockNode] stream-markdown not available:", e3);
            } finally {
              ie = null;
            }
          }), ie);
        });
      }(), m.value && h2.value ? (de(t2.themes), !U && Y && (U = Y(h2.value, { theme: z() }), p.value = true), U ? false === t2.stream && t2.loading ? P(t2.node.code) : (P(t2.node.code), yield ue(t2.node.code, r2.value), yield D()) : P(t2.node.code)) : P(t2.node.code)) : P(t2.node.code);
    });
  }
  function me() {
    const e3 = m.value;
    if (!e3 || s2.value || !N.value) return;
    const n3 = e3.scrollTop;
    n3 < k.value ? x.value = false : function(e4, n4 = 50) {
      return e4.scrollHeight - e4.scrollTop - e4.clientHeight <= n4;
    }(e3) && (x.value = true), k.value = n3;
  }
  function he() {
    return d(this, null, function* () {
      try {
        "undefined" != typeof navigator && navigator.clipboard && "function" == typeof navigator.clipboard.writeText && (yield navigator.clipboard.writeText(t2.node.code)), a2.value = true, o2("copy", t2.node.code), setTimeout(() => {
          a2.value = false;
        }, 1e3);
      } catch (e3) {
        console.error("Copy failed:", e3);
      }
    });
  }
  function fe(e3) {
    if (s2.value = !s2.value, e3 && H.value) {
      const n4 = function(e4) {
        const n5 = e4.currentTarget || e4.target;
        return !n5 || n5.disabled ? null : n5;
      }(e3);
      n4 && Ln(n4, s2.value ? l2("common.collapse") || "Collapse" : l2("common.expand") || "Expand", "top", false, void 0, t2.isDark);
    }
    const n3 = m.value;
    n3 && (s2.value ? (n3.style.maxHeight = "none", n3.style["overflow-y"] = "visible", n3.style["overflow-x"] = "auto") : (n3.style.maxHeight = "", n3.style.overflow = "auto", N.value && (x.value = true, nextTick(() => {
      n3.scrollHeight > n3.clientHeight && (n3.scrollTop = n3.scrollHeight);
    }))));
  }
  function pe() {
    u2.value = !u2.value;
  }
  function ve() {
    const e3 = Math.min(36, M.value + 1);
    M.value = e3;
  }
  function ge() {
    const e3 = Math.max(10, M.value - 1);
    M.value = e3;
  }
  function xe() {
    M.value = b.value;
  }
  function ke() {
    if (!C.value) return;
    const e3 = (r2.value || t2.node.language).toLowerCase(), n3 = "html" === e3 ? "HTML Preview" : "SVG Preview";
    o2("previewCode", { type: "html" === e3 ? "text/html" : "image/svg+xml", content: t2.node.code, title: n3 });
  }
  return onMounted(() => {
    w.value ? ce() : P(t2.node.code);
  }), onBeforeUnmount(() => {
    var e3;
    null == (e3 = y.value) || e3.destroy(), y.value = null, null == v || v.disconnect(), v = void 0;
  }), watch(() => t2.themes, () => d(null, null, function* () {
    de(t2.themes);
  })), watch(() => t2.loading, (e3) => {
    e3 || (w.value ? ce() : P(t2.node.code));
  }), watch(() => w.value, (e3) => {
    e3 && ce();
  }), watch(H, (e3) => {
    e3 || On();
  }), watch(() => t2.autoScrollInitial, (e3) => {
    x.value = false !== e3;
  }), watch(() => [t2.node.code, t2.node.language], (e3) => d(null, [e3], function* ([e4, n3]) {
    const o3 = br(n3);
    o3 !== r2.value && (r2.value = o3), w.value && m.value && h2.value ? (U || (P(e4), yield ce()), U && e4 && (false === t2.stream && t2.loading || (P(e4), yield ue(e4, n3), yield D()))) : P(e4);
  })), watch(() => [t2.darkTheme, t2.lightTheme, t2.isDark], () => d(null, null, function* () {
    w.value && m.value && h2.value && (U || (yield ce()), null == U || U.setTheme(z()));
  })), watch(() => t2.node.code, () => d(null, null, function* () {
    if (s2.value || !N.value || !x.value) return;
    yield nextTick();
    const e3 = m.value;
    e3 && e3.scrollHeight > e3.clientHeight && (e3.scrollTop = e3.scrollHeight);
  })), (n3, o3) => (openBlock(), createElementBlock("div", { ref_key: "container", ref: c, style: normalizeStyle(L.value), class: normalizeClass(["code-block-container rounded-lg border overflow-hidden", { dark: t2.isDark }]) }, [createVNode(Qr, { "show-header": t2.showHeader, "show-collapse-button": t2.showCollapseButton, "show-font-size-buttons": t2.showFontSizeButtons, "enable-font-size-control": t2.enableFontSizeControl, "show-copy-button": t2.showCopyButton, "show-expand-button": t2.showExpandButton, "show-preview-button": t2.showPreviewButton, "show-tooltips": t2.showTooltips, "is-dark": t2.isDark, loading: t2.loading, stream: t2.stream, "is-collapsed": u2.value, "is-expanded": s2.value, "copy-text": a2.value, "is-previewable": C.value, "code-font-size": M.value, "code-font-min": 10, "code-font-max": 36, "default-code-font-size": b.value, "font-baseline-ready": S.value, onToggleCollapse: pe, onDecreaseFont: ge, onResetFont: xe, onIncreaseFont: ve, onCopy: he, onToggleExpand: fe, onPreview: ke }, createSlots({ "header-left": withCtx(() => [renderSlot(n3.$slots, "header-left", {}, () => [createBaseVNode("div", ea, [createBaseVNode("span", { class: "icon-slot h-4 w-4 flex-shrink-0", innerHTML: B.value }, null, 8, na), createBaseVNode("div", ta, [createBaseVNode("div", oa, toDisplayString(_.value), 1)])])], true)]), loading: withCtx(() => [renderSlot(n3.$slots, "loading", { loading: e2.loading, stream: e2.stream }, () => [o3[0] || (o3[0] = createBaseVNode("div", { class: "loading-skeleton" }, [createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line" }), createBaseVNode("div", { class: "skeleton-line short" })], -1))], true)]), default: withCtx(() => [createBaseVNode("div", { ref_key: "codeBlockContent", ref: m, class: "code-block-content", style: normalizeStyle(T.value), onScroll: me }, [createBaseVNode("div", { ref_key: "rendererTarget", ref: h2, class: "code-block-render" }, null, 512), p.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: "code-fallback-plain", innerHTML: f.value }, null, 8, la))], 36)]), _: 2 }, [n3.$slots["header-right"] ? { name: "header-right", fn: withCtx(() => [renderSlot(n3.$slots, "header-right", {}, void 0, true)]), key: "0" } : void 0]), 1032, ["show-header", "show-collapse-button", "show-font-size-buttons", "enable-font-size-control", "show-copy-button", "show-expand-button", "show-preview-button", "show-tooltips", "is-dark", "loading", "stream", "is-collapsed", "is-expanded", "copy-text", "is-previewable", "code-font-size", "default-code-font-size", "font-baseline-ready"])], 6));
} }), [["__scopeId", "data-v-4d9ce96f"]]);
ra.install = (e2) => {
  e2.component(ra.__name, ra);
};
var aa = Symbol("MarkstreamMathBlockMinHeightCache");
function ia() {
  return inject(aa, null);
}
var sa = defineComponent({ name: "InfographicBlockNodeLoading", props: { node: { type: Object, required: true }, showHeader: { type: Boolean, default: true }, estimatedPreviewHeightPx: { type: Number, default: void 0 } }, setup(e2) {
  const n2 = computed(() => {
    var n3, t2;
    return ql(null != (t2 = jl(e2.estimatedPreviewHeightPx)) ? t2 : Kl(String(null != (n3 = e2.node.code) ? n3 : "")));
  });
  return () => h("div", { class: "infographic-block-container rounded-lg border overflow-hidden", style: { margin: "var(--ms-flow-diagram-y) 0", background: "var(--diagram-bg)", borderColor: "var(--diagram-border)", color: "hsl(var(--ms-foreground))" }, "data-markstream-infographic": "1", "data-markstream-mode": "pending" }, [e2.showHeader ? h("div", { class: "infographic-block-header flex justify-between items-center border-b", style: { padding: "var(--ms-inset-panel-y) var(--ms-inset-panel-x)", background: "var(--diagram-header-bg)", borderColor: "var(--diagram-border)", minHeight: "calc(var(--ms-action-btn-icon) + var(--ms-action-btn-padding) + var(--ms-action-btn-padding) + var(--ms-inset-panel-y) + var(--ms-inset-panel-y) + 1px)" } }, [h("div", { class: "flex items-center gap-x-2 overflow-hidden" }, [h("span", { class: "icon-slot action-icon shrink-0", style: { display: "inline-flex", width: "var(--ms-action-btn-icon)", height: "var(--ms-action-btn-icon)" } }), h("span", { class: "infographic-label font-medium font-mono truncate", style: { fontSize: "var(--ms-text-label)", color: "hsl(var(--ms-muted-foreground))" } }, "Infographic")]), h("div", { class: "infographic-header-actions flex items-center opacity-0 pointer-events-none", style: { gap: "var(--ms-gap-header-actions)" }, "aria-hidden": "true" }, Array.from({ length: 4 }, () => h("span", { class: "infographic-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded", style: { width: "calc(var(--ms-action-btn-icon) + var(--ms-action-btn-padding) + var(--ms-action-btn-padding))", height: "calc(var(--ms-action-btn-icon) + var(--ms-action-btn-padding) + var(--ms-action-btn-padding))" } })))]) : null, h("div", { class: "infographic-preview relative overflow-hidden block", style: { height: `${n2.value}px`, minHeight: "var(--ms-size-diagram-min-height)", background: "var(--diagram-bg)" } }, [h("div", { class: "absolute inset-0" }, [h("div", { class: "w-full text-center flex items-center justify-center min-h-full" })])])]);
} });
var ua = defineComponent({ name: "MermaidBlockNodeLoading", props: { node: { type: Object, required: true }, showHeader: { type: Boolean, default: true }, estimatedPreviewHeightPx: { type: Number, default: void 0 } }, setup(e2) {
  const n2 = computed(() => {
    var n3, t2;
    return Ul(null != (t2 = jl(e2.estimatedPreviewHeightPx)) ? t2 : Dl(String(null != (n3 = e2.node.code) ? n3 : "")));
  });
  return () => h("div", { class: "mermaid-block-container rounded-lg border overflow-hidden", style: { margin: "var(--ms-flow-diagram-y) 0", borderColor: "var(--diagram-border)" }, "data-markstream-mermaid": "1", "data-markstream-mode": "pending" }, [e2.showHeader ? h("div", { class: "mermaid-block-header flex justify-between items-center border-b px-[var(--ms-inset-panel-x)] py-[var(--ms-inset-panel-y)]", style: { background: "var(--diagram-header-bg)", borderColor: "var(--diagram-border)" } }, [h("div", { class: "flex items-center gap-x-2 overflow-hidden" }, [h("span", { class: "mermaid-label-text text-[length:var(--ms-text-label)] font-medium font-mono truncate", style: { color: "var(--code-action-fg)" } }, "Mermaid")]), h("div", { class: "mermaid-header-actions flex items-center gap-[var(--ms-gap-header-actions)] opacity-0 pointer-events-none", "aria-hidden": "true" }, Array.from({ length: 4 }, () => h("span", { class: "mermaid-action-btn inline-flex items-center justify-center p-[var(--ms-action-btn-padding)] rounded" }, [h("span", { class: "action-icon block" })])))]) : null, h("div", { class: "mermaid-preview-area relative overflow-hidden block", style: { height: `${n2.value}px`, minHeight: "var(--ms-size-diagram-min-height)", background: "var(--diagram-bg)" } }, [h("div", { class: "_mermaid w-full text-center flex items-center justify-center min-h-full", style: { fontFamily: "inherit", contentVisibility: "auto", contain: "content", containIntrinsicSize: "var(--ms-size-diagram-min-height) 240px" } })])]);
} });
var da = ["data-custom-id"];
var ca = { class: "m-0 p-0" };
var ma = ["data-probe"];
var ha = ["data-node-index", "data-node-type"];
var fa = Ee(defineComponent({ __name: "NodeRenderer", props: { content: {}, nodes: {}, final: { type: Boolean }, parseOptions: {}, customMarkdownIt: {}, debugPerformance: { type: Boolean, default: false }, customHtmlTags: {}, htmlPolicy: {}, viewportPriority: { type: Boolean }, codeBlockStream: { type: Boolean, default: true }, codeBlockDarkTheme: {}, codeBlockLightTheme: {}, codeBlockMonacoOptions: {}, renderCodeBlocksAsPre: { type: Boolean }, codeBlockMinWidth: {}, codeBlockMaxWidth: {}, codeBlockProps: {}, mermaidProps: {}, d2Props: {}, infographicProps: {}, showTooltips: { type: Boolean, default: true }, themes: {}, isDark: { type: Boolean }, customId: {}, indexKey: {}, typewriter: { type: Boolean, default: false }, smoothStreaming: { type: [Boolean, String], default: "auto" }, smoothStreamingOptions: {}, fade: { type: Boolean, default: true }, batchRendering: { type: Boolean, default: true }, initialRenderBatchSize: { default: 40 }, renderBatchSize: { default: 80 }, renderBatchDelay: { default: 16 }, renderBatchBudgetMs: { default: 6 }, renderBatchIdleTimeoutMs: { default: 120 }, deferNodesUntilVisible: { type: Boolean, default: true }, maxLiveNodes: { default: 320 }, liveNodeBuffer: { default: 60 }, renderAsFragment: { type: Boolean } }, emits: ["copy", "handleArtifactClick", "click", "mouseover", "mouseout"], setup(e2, { emit: n2 }) {
  var t2, o2;
  const l2 = e2, r2 = n2, a2 = ref(), u2 = ref(null), c = ref(null), m = ref(null), h2 = reactive({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null }), f = ref(false), p = /auto|scroll|overlay/i, v = "undefined" != typeof window, g = computed(() => true === l2.renderAsFragment), y = computed(() => l2.debugPerformance && v && "undefined" != typeof console), w = useAttrs(), x = /* @__PURE__ */ new Map(), k = ref(0), N = so(l2.smoothStreamingOptions), b = ref(0), E = ref({ paragraph: null, listItem: null, listWrapperOverhead: 0, headings: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null } }), T = computed(() => {
    var e3;
    if ("boolean" == typeof l2.showTooltips) return l2.showTooltips;
    const n3 = null != (e3 = w.showTooltips) ? e3 : w["show-tooltips"];
    return "" === n3 || true === n3 || "true" === n3 || false !== n3 && "false" !== n3 && void 0;
  }), W = inject("markstreamHtmlPolicy", void 0), j = inject("markstreamTypewriterCursor", void 0), F = inject("markstreamSmoothStreaming", void 0), Q = computed(() => {
    var e3, n3;
    return null != (n3 = null != (e3 = l2.htmlPolicy) ? e3 : null == W ? void 0 : W.value) ? n3 : "safe";
  }), te = computed(() => true !== (null == j ? void 0 : j.value));
  provide("markstreamShowTooltips", T), provide("markstreamHtmlPolicy", Q), provide("markstreamTypewriter", computed(() => false !== l2.typewriter)), provide("markstreamFade", computed(() => false !== l2.fade)), provide("markstreamTypewriterCursor", computed(() => true)), provide("markstreamTextStreamState", x), provide("markstreamStreamVersion", k);
  const le = computed(() => {
    var e3, n3;
    return false !== l2.smoothStreaming && !(null == (e3 = l2.nodes) ? void 0 : e3.length) && (true === l2.smoothStreaming || !(null == F ? void 0 : F.value)) && (true === l2.smoothStreaming || true === l2.typewriter || (null != (n3 = l2.maxLiveNodes) ? n3 : 0) <= 0);
  }), re = ref(!v || true === l2.smoothStreaming);
  onMounted(() => {
    re.value = true;
  });
  const ae = computed(() => re.value && le.value);
  provide("markstreamSmoothStreaming", ae);
  const ie = computed(() => {
    var e3;
    return ae.value ? N.visible.value : null != (e3 = l2.content) ? e3 : "";
  }), se = computed(() => {
    var e3, n3;
    const t3 = null != (e3 = l2.parseOptions) ? e3 : {};
    return null != (n3 = l2.final) ? n3 : t3.final;
  }), ue = computed(() => {
    const e3 = se.value;
    return ae.value && null != e3 ? !!e3 && N.caughtUp.value : e3;
  });
  function fe(e3, n3) {
    y.value && console.info(`[markstream-vue][perf] ${e3}`, n3);
  }
  function pe(e3) {
    if (!e3) return false;
    const n3 = (e3.overflowY || "").toLowerCase(), t3 = (e3.overflow || "").toLowerCase();
    return p.test(n3) || p.test(t3);
  }
  function ve(e3) {
    const n3 = Math.ceil(e3.scrollHeight) > Math.ceil(e3.clientHeight) + 1, t3 = Math.ceil(e3.scrollWidth) > Math.ceil(e3.clientWidth) + 1;
    return n3 || t3;
  }
  function ge(e3) {
    if ("undefined" == typeof window) return null;
    const n3 = null != e3 ? e3 : a2.value;
    if (!n3) return null;
    const t3 = n3.ownerDocument || document, o3 = t3.scrollingElement || t3.documentElement;
    let l3 = n3;
    for (; l3 && l3 !== t3.body && l3 !== o3; ) {
      if (pe(window.getComputedStyle(l3)) && ve(l3)) return l3;
      l3 = l3.parentElement;
    }
    return null;
  }
  watch([() => l2.content, () => l2.nodes, ae, se], ([e3, n3, t3, o3]) => {
    if (null == n3 ? void 0 : n3.length) return void N.reset("");
    const l3 = null != e3 ? e3 : "";
    if (!t3) return N.reset(l3), void (o3 && N.finish({ flush: true }));
    const r3 = N.source.value;
    l3 ? l3 === r3 || (l3.startsWith(r3) ? N.enqueue(l3.slice(r3.length)) : N.reset(l3)) : N.reset(""), o3 && N.finish();
  }, { immediate: true });
  const we = l2.customId ? `renderer-${l2.customId}` : `renderer-${Date.now()}-${Math.random().toString(36).slice(2)}`, Ne = /* @__PURE__ */ function(e3) {
    const n3 = /* @__PURE__ */ new Map();
    return { scope: e3, cache: n3, clear: () => n3.clear() };
  }(we), be = computed(() => `${we}:${k.value}`);
  provide(aa, Ne);
  const Me = computed(() => {
    var e3;
    return (null == (e3 = l2.nodes) ? void 0 : e3.length) ? l2.nodes : ie.value;
  });
  watch(Me, () => {
    Ne.clear(), k.value += 1;
  }, { immediate: true });
  const Se = getMarkdown(we), _e = /* @__PURE__ */ new Map(), Be = computed(() => (Ue.value, Xe(l2.customId))), Ce = computed(() => {
    var e3;
    return mergeCustomHtmlTags(l2.customHtmlTags, null == (e3 = l2.parseOptions) ? void 0 : e3.customHtmlTags);
  }), Le = computed(() => {
    const { key: e3, tags: n3 } = resolveCustomHtmlTags(Ce.value);
    if (!e3) return Se;
    const t3 = _e.get(e3);
    if (t3) return t3;
    const o3 = getMarkdown(we, { customHtmlTags: n3 });
    return _e.set(e3, o3), o3;
  }), Oe2 = computed(() => {
    const e3 = Le.value;
    return l2.customMarkdownIt ? l2.customMarkdownIt(e3) : e3;
  }), Ee2 = computed(() => {
    var e3;
    const n3 = null != (e3 = l2.parseOptions) ? e3 : {}, t3 = ue.value, o3 = Ce.value, r3 = null != t3, a3 = o3.length > 0;
    return r3 || a3 ? i(i(i({}, n3), r3 ? { final: t3 } : {}), a3 ? { customHtmlTags: o3 } : {}) : n3;
  }), Ie2 = computed(() => {
    var e3;
    const n3 = null != (e3 = Ee2.value.customHtmlTags) ? e3 : [];
    return new Set(n3.map((e4) => String(e4).trim().toLowerCase()).filter(Boolean));
  }), Ae2 = computed(() => {
    var e3;
    if (null == (e3 = l2.nodes) ? void 0 : e3.length) return markRaw(l2.nodes.slice());
    const n3 = ie.value;
    if (n3) {
      const e4 = y.value ? performance.now() : 0, t3 = parseMarkdownToStructure(n3, Oe2.value, Ee2.value);
      return y.value && fe("parse(sync)", { ms: Math.round(performance.now() - e4), nodes: t3.length, contentLength: n3.length }), markRaw(t3);
    }
    return [];
  }), $e2 = ref(null), Re2 = ref(null), ze2 = ref(null), Pe2 = ref(null), je2 = null != l2.indexKey && String(l2.indexKey).startsWith("list-item-"), De2 = !je2 && l2.customId ? Tl(l2.customId) : null, Ke2 = computed(() => De2 ? (El.value, Tl(l2.customId)) : null), Ve2 = computed(() => {
    var e3;
    return Boolean(v && !g.value && l2.customId && !je2 && (null == (e3 = Ke2.value) ? void 0 : e3.enabled));
  }), qe2 = computed(() => {
    var e3;
    return Ve2.value && false !== (null == (e3 = Ke2.value) ? void 0 : e3.textEstimation);
  }), Ge2 = computed(() => {
    var e3;
    return Ve2.value && false !== (null == (e3 = Ke2.value) ? void 0 : e3.codeBlockEstimation);
  }), Ze2 = computed(() => {
    var e3;
    return Math.max(320, b.value || (null == (e3 = a2.value) ? void 0 : e3.clientWidth) || 640);
  }), Je2 = computed(() => {
    var e3;
    return Math.max(1, null != (e3 = l2.maxLiveNodes) ? e3 : 320);
  }), Ye2 = computed(() => {
    var e3;
    return !g.value && !((null != (e3 = l2.maxLiveNodes) ? e3 : 0) <= 0) && Ae2.value.length > Je2.value;
  }), en2 = computed(() => Ye2.value || Ve2.value), nn2 = computed(() => false !== l2.viewportPriority && !f.value), tn2 = Wt((e3) => {
    var n3;
    return ge(null != (n3 = null != e3 ? e3 : a2.value) ? n3 : null);
  }, nn2), on2 = v && "function" == typeof window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : null, ln2 = v && "function" == typeof window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : null, rn2 = "undefined" != typeof globalThis && "process" in globalThis ? null == (t2 = globalThis.process) ? void 0 : t2.env : void 0, an2 = "test" === (null == rn2 ? void 0 : rn2.NODE_ENV), sn2 = v && "function" == typeof window.requestIdleCallback, un2 = computed(() => {
    var e3;
    const n3 = Math.trunc(null != (e3 = l2.renderBatchSize) ? e3 : 80);
    return Number.isFinite(n3) ? Math.max(0, n3) : 0;
  }), cn2 = computed(() => {
    var e3;
    const n3 = Math.trunc(null != (e3 = l2.initialRenderBatchSize) ? e3 : un2.value);
    return Number.isFinite(n3) ? Math.max(0, n3) : un2.value;
  }), mn2 = computed(() => !g.value && false !== l2.batchRendering && un2.value > 0 && v && !an2), fn2 = ref(0), pn2 = ref({ key: l2.indexKey, total: 0 }), vn2 = ref(Math.max(1, un2.value || 1)), gn2 = ref(/* @__PURE__ */ new Set()), yn2 = /* @__PURE__ */ new Map(), wn2 = /* @__PURE__ */ new Map(), xn2 = /* @__PURE__ */ new Map(), kn2 = /* @__PURE__ */ new Map(), Nn2 = /* @__PURE__ */ new Map(), bn2 = /* @__PURE__ */ new WeakMap(), Mn2 = ref(0), Sn2 = computed(() => (Mn2.value, Array.from(kn2.entries()).sort((e3, n3) => e3[0] - n3[0]))), _n2 = ref(0), Bn2 = ref([]), Cn2 = ref([]), Ln2 = ref(null), On2 = ref(null);
  let En2 = null, Tn2 = [], In2 = null, An2 = null;
  const $n2 = computed(() => {
    var e3;
    return !g.value && false !== l2.deferNodesUntilVisible && !((null != (e3 = l2.maxLiveNodes) ? e3 : 0) <= 0) && !Ye2.value && !(Ae2.value.length > 900) && nn2.value;
  }), Hn2 = computed(() => {
    var e3;
    return mn2.value && (null != (e3 = l2.maxLiveNodes) ? e3 : 0) <= 0;
  }), Rn2 = ref({ batchSize: un2.value, initial: cn2.value, delay: null != (o2 = l2.renderBatchDelay) ? o2 : 16, enabled: Hn2.value }), zn2 = computed(() => !!tn2 && ($n2.value || Ye2.value)), Pn2 = computed(() => {
    var e3;
    return Math.max(0, null != (e3 = l2.liveNodeBuffer) ? e3 : 60);
  }), Wn2 = ref(0), Fn2 = reactive({ start: 0, end: 0 }), Dn2 = /* @__PURE__ */ new Map(), Kn2 = /* @__PURE__ */ new Map(), Vn2 = computed(() => {
    if (!Ye2.value) return Ae2.value.length;
    const e3 = Pn2.value, n3 = Math.max(Fn2.end + e3, cn2.value), t3 = Math.min(Ae2.value.length, n3);
    return Math.max(fn2.value, t3);
  });
  function Un2(e3) {
    var n3, t3;
    return null != (t3 = null == (n3 = Pe2.value) ? void 0 : n3[e3]) ? t3 : null;
  }
  function qn2(e3) {
    var n3, t3, o3, l3;
    const r3 = ge(null != (n3 = null != e3 ? e3 : a2.value) ? n3 : null);
    if (r3) return r3;
    const i2 = null != (l3 = null != (o3 = null == e3 ? void 0 : e3.ownerDocument) ? o3 : null == (t3 = a2.value) ? void 0 : t3.ownerDocument) ? l3 : "undefined" != typeof document ? document : null;
    return (null == i2 ? void 0 : i2.scrollingElement) || (null == i2 ? void 0 : i2.documentElement) || null;
  }
  function Xn2(e3) {
    if (!v) return false;
    try {
      const n3 = window.getComputedStyle(e3);
      return !!(n3.display || "").toLowerCase().includes("flex") && (n3.flexDirection || "").toLowerCase().endsWith("reverse");
    } catch (n3) {
      return false;
    }
  }
  function Gn2(e3, n3, t3) {
    var o3, l3, r3, a3, i2, s2;
    if (t3) return null != (a3 = null != (r3 = null == (o3 = null == n3 ? void 0 : n3.documentElement) ? void 0 : o3.scrollTop) ? r3 : null == (l3 = null == n3 ? void 0 : n3.body) ? void 0 : l3.scrollTop) ? a3 : 0;
    const u3 = e3.scrollTop;
    if (!Xn2(e3)) return u3;
    const d2 = u3 < 0 ? -u3 : u3;
    return Math.max(0, (null != (i2 = e3.scrollHeight) ? i2 : 0) - (null != (s2 = e3.clientHeight) ? s2 : 0)) - d2;
  }
  function Zn2(e3, n3) {
    let t3 = e3, o3 = 0, l3 = 0;
    for (; t3 && t3 !== n3 && l3++ < 64; ) o3 += t3.offsetTop || 0, t3 = t3.offsetParent;
    return o3;
  }
  function Jn2() {
    In2 && (In2(), In2 = null), Ln2.value = null;
  }
  function Yn2() {
    if (!v || !Ye2.value) return;
    const e3 = qn2();
    if (!e3 || Ln2.value === e3) return;
    Jn2();
    const n3 = () => et2();
    e3.addEventListener("scroll", n3, { passive: true }), Ln2.value = e3, In2 = () => {
      e3.removeEventListener("scroll", n3);
    };
  }
  function Qn2() {
    var e3, n3, t3;
    if (!An2) return;
    const o3 = null != (t3 = null == (n3 = null == (e3 = a2.value) ? void 0 : e3.ownerDocument) ? void 0 : n3.defaultView) ? t3 : "undefined" != typeof window ? window : null;
    An2.viaTimeout ? o3 ? o3.clearTimeout(An2.id) : clearTimeout(An2.id) : null == ln2 || ln2(An2.id), An2 = null;
  }
  function et2(e3 = {}) {
    var n3, t3, o3;
    if (!Ye2.value) return;
    if (!v) return void nt2(true);
    if (e3.immediate) return Qn2(), void nt2(true);
    if (An2) return;
    const l3 = () => {
      An2 = null, nt2();
    };
    if (on2) An2 = { id: on2(l3), viaTimeout: false };
    else {
      const e4 = null != (o3 = null == (t3 = null == (n3 = a2.value) ? void 0 : n3.ownerDocument) ? void 0 : t3.defaultView) ? o3 : "undefined" != typeof window ? window : null, r3 = e4 ? e4.setTimeout(l3, 16) : setTimeout(l3, 16);
      An2 = { id: r3, viaTimeout: true };
    }
  }
  function nt2(e3 = false) {
    var n3, t3, o3, l3, r3, i2, s2;
    if (!Ye2.value) return;
    const u3 = Ln2.value || qn2();
    if (!u3) return;
    const d2 = u3.ownerDocument || (null == (n3 = a2.value) ? void 0 : n3.ownerDocument) || document, c2 = (null == d2 ? void 0 : d2.defaultView) || ("undefined" != typeof window ? window : null), m2 = u3 === (null == d2 ? void 0 : d2.documentElement) || u3 === (null == d2 ? void 0 : d2.body), h3 = Ae2.value.length;
    if (!m2 && h3 > 0 && Xn2(u3)) {
      const n4 = u3.clientHeight || 0, t4 = u3.scrollTop, o4 = t4 < 0 ? -t4 : t4, l4 = function(e4) {
        var n5;
        const t5 = Ae2.value;
        if (!t5.length) return 0;
        if (e4 <= 0) return Math.max(0, t5.length - 1);
        if (Ve2.value) {
          let n6 = e4;
          for (let e5 = t5.length - 1; e5 >= 0; e5--) {
            const t6 = $t2(e5);
            if (n6 <= t6) return e5;
            n6 -= t6;
          }
          return 0;
        }
        if (_n2.value === t5.length) {
          const n6 = Jt2(0, t5.length);
          return oo2(Math.max(0, n6 - e4));
        }
        let o5 = e4;
        for (let l5 = t5.length - 1; l5 >= 0; l5--) {
          const e5 = null != (n5 = it2[l5]) ? n5 : yt2.value;
          if (o5 <= e5) return l5;
          o5 -= e5;
        }
        return 0;
      }(Math.max(0, o4) + 0.5 * Math.max(0, n4)), r4 = tt2(l4, 0, Math.max(0, h3 - 1));
      return void ((e3 || Math.abs(r4 - Wn2.value) > 1) && (Wn2.value = r4));
    }
    const f2 = m2 ? null : u3.getBoundingClientRect(), p2 = m2 ? 0 : f2.top, v2 = m2 ? null != (o3 = null != (t3 = null == c2 ? void 0 : c2.innerHeight) ? t3 : u3.clientHeight) ? o3 : 0 : f2.bottom, g2 = Sn2.value;
    let y2 = null, w2 = null;
    for (const [a3, k2] of g2) {
      if (!k2) continue;
      const e4 = k2.getBoundingClientRect();
      e4.bottom <= p2 || e4.top >= v2 || (null == y2 && (y2 = a3), w2 = a3);
    }
    if (null == y2 || null == w2) {
      const e4 = a2.value;
      if (!e4) return;
      const n4 = m2 ? { top: 0 } : u3.getBoundingClientRect(), t4 = Gn2(u3, d2, m2), o4 = m2 ? (() => {
        const t5 = e4.getBoundingClientRect(), o5 = (m2 ? 0 : n4.top) - t5.top;
        return Math.max(0, o5);
      })() : (() => {
        const n5 = Zn2(e4, u3);
        return Math.max(0, t4 - n5);
      })(), h4 = m2 ? null != (s2 = null != (i2 = null != (r3 = null == c2 ? void 0 : c2.innerHeight) ? r3 : null == (l3 = null == d2 ? void 0 : d2.documentElement) ? void 0 : l3.clientHeight) ? i2 : u3.clientHeight) ? s2 : 0 : u3.clientHeight, f3 = oo2(o4 + 0.5 * Math.max(0, h4));
      return void (Wn2.value = tt2(f3, 0, Math.max(0, Ae2.value.length - 1)));
    }
    const x2 = Math.round((y2 + w2) / 2);
    !e3 && Math.abs(x2 - Wn2.value) <= 1 || (Wn2.value = tt2(x2, 0, Math.max(0, Ae2.value.length - 1)));
  }
  function tt2(e3, n3, t3) {
    return Math.min(Math.max(e3, n3), t3);
  }
  const it2 = reactive({}), st2 = reactive({ total: 0, count: 0 });
  function dt2() {
    for (const e3 of Object.keys(it2)) delete it2[Number(e3)];
    st2.total = 0, st2.count = 0, _n2.value = 0, Bn2.value = [], Cn2.value = [];
  }
  function ct2(e3, n3, t3) {
    for (let o3 = n3 + 1; o3 < e3.length; o3 += o3 & -o3) e3[o3] += t3;
  }
  function ht2(e3, n3) {
    let t3 = 0;
    for (let o3 = n3 + 1; o3 > 0; o3 -= o3 & -o3) t3 += e3[o3];
    return t3;
  }
  function pt2(e3, n3, t3) {
    if (t3 <= n3) return 0;
    const o3 = ht2(e3, t3 - 1);
    return n3 <= 0 ? o3 : o3 - ht2(e3, n3 - 1);
  }
  function gt2(e3) {
    _n2.value = e3;
    const n3 = new Array(e3 + 1).fill(0), t3 = new Array(e3 + 1).fill(0);
    for (const [o3, l3] of Object.entries(it2)) {
      const r3 = Number(o3), a3 = Number(l3);
      !Number.isFinite(r3) || r3 < 0 || r3 >= e3 || !Number.isFinite(a3) || a3 <= 0 || (ct2(n3, r3, a3), ct2(t3, r3, 1));
    }
    Bn2.value = n3, Cn2.value = t3;
  }
  const yt2 = computed(() => st2.count > 0 ? Math.max(12, st2.total / st2.count) : 32);
  function wt2(e3) {
    return null == e3 ? void 0 : e3.firstElementChild;
  }
  function xt2(e3, n3) {
    var t3;
    return e3 ? (null == (t3 = e3.matches) ? void 0 : t3.call(e3, n3)) ? e3 : e3.querySelector(n3) : null;
  }
  function Nt2() {
    var e3, n3;
    if (!Ve2.value) return void (b.value = 0);
    const t3 = null != (n3 = null == (e3 = a2.value) ? void 0 : e3.clientWidth) ? n3 : 0;
    b.value = t3 > 0 ? t3 : 0;
  }
  let Mt2 = null;
  function _t2() {
    null == Mt2 || Mt2.disconnect(), Mt2 = null;
  }
  const Ct2 = defineAsyncComponent(() => d(null, null, function* () {
    try {
      return (yield import("./CodeBlockNode-B7QSHBUD.js")).default;
    } catch (e3) {
      return console.warn('[markstream-vue] Optional peer dependencies for CodeBlockNode are missing. Falling back to inline-code rendering (no Monaco). To enable full code block features, please install "stream-monaco".', e3), Zt;
    }
  })), Ot2 = computed(() => l2.renderCodeBlocksAsPre ? Zt : Ct2);
  function Et2() {
    var e3;
    return false !== (null == (e3 = l2.codeBlockProps) ? void 0 : e3.showHeader);
  }
  const It2 = computed(() => {
    var e3;
    const n3 = Ae2.value;
    if (!n3.length || !Ve2.value) return n3.map(() => null);
    const t3 = b.value || (null == (e3 = a2.value) ? void 0 : e3.clientWidth) || 0;
    return !Number.isFinite(t3) || t3 <= 0 ? n3.map(() => null) : n3.map((e4, n4) => {
      const o3 = it2[n4], r3 = "number" == typeof o3 && o3 > 0;
      if (qe2.value && !r3) {
        const n5 = Rl(e4, t3, E.value);
        if (n5) return n5;
      }
      if (Ge2.value && "code_block" === e4.type) {
        const n5 = function(e5) {
          if ("code_block" !== e5.type) return null;
          const n6 = Po2(e5, zo2(e5));
          return n6 === ra ? "markdown" : n6 === Zt ? "pre" : n6 === Ot2.value || n6 === Ct2 ? "monaco" : null;
        }(e4);
        if ("monaco" === n5 || "markdown" === n5) return function(e5, n6) {
          var t4;
          if (!e5 || "code_block" !== e5.type) return null;
          const o4 = n6.rendererKind, l3 = false !== n6.showHeader, r4 = function(e6) {
            var n7, t5, o5, l4;
            return e6.diff ? Math.max(zl(String(null != (n7 = e6.originalCode) ? n7 : "")), zl(String(null != (t5 = e6.updatedCode) ? t5 : "")), zl(String(null != (o5 = e6.code) ? o5 : ""))) : zl(String(null != (l4 = e6.code) ? l4 : ""));
          }(e5), a3 = Boolean(e5.diff);
          let i2 = 0, s2 = 500;
          if ("monaco" === o4) {
            const e6 = null != (t4 = n6.monacoOptions) ? t4 : {}, o5 = function(e7, n7) {
              const t5 = "number" == typeof (null == e7 ? void 0 : e7.fontSize) && e7.fontSize > 0 ? e7.fontSize : n7 ? 13 : 12;
              return "number" == typeof (null == e7 ? void 0 : e7.lineHeight) && e7.lineHeight > 0 ? e7.lineHeight : n7 ? 30 : Math.round(1.5 * t5);
            }(e6, a3), l4 = function(e7, n7) {
              var t5, o6;
              if (!n7) return 0;
              const l5 = "number" == typeof (null == (t5 = null == e7 ? void 0 : e7.padding) ? void 0 : t5.top) ? e7.padding.top : 10, r5 = "number" == typeof (null == (o6 = null == e7 ? void 0 : e7.padding) ? void 0 : o6.bottom) ? e7.padding.bottom : 22;
              return Math.max(0, l5) + Math.max(0, r5);
            }(e6, a3);
            s2 = "number" == typeof e6.MAX_HEIGHT && e6.MAX_HEIGHT > 0 ? e6.MAX_HEIGHT : 500, i2 = a3 ? Math.round(r4 * o5 + l4) : Math.round(r4 * (o5 + 1.5));
          } else "markdown" === o4 ? i2 = Math.round(21 * r4 + 32) : (i2 = Math.round(21 * r4 + 32), s2 = Number.POSITIVE_INFINITY);
          const u3 = Math.max(1, Math.min(i2, s2));
          return { kind: "code-block", height: Math.round(u3 + (l3 ? 40 : 0)), contentHeight: u3, rendererKind: o4 };
        }(e4, { rendererKind: n5, monacoOptions: l2.codeBlockMonacoOptions, showHeader: Et2() });
      }
      return null;
    });
  });
  function $t2(e3) {
    var n3, t3, o3;
    return null != (o3 = null != (t3 = it2[e3]) ? t3 : null == (n3 = It2.value[e3]) ? void 0 : n3.height) ? o3 : yt2.value;
  }
  function Pt2() {
    const e3 = Ln2.value || qn2(), n3 = a2.value;
    if (!e3 || !n3) return null;
    const t3 = e3.ownerDocument || n3.ownerDocument || document;
    if (e3 === t3.documentElement || e3 === t3.body || e3 === t3.scrollingElement) {
      const e4 = n3.getBoundingClientRect();
      return Math.max(0, -e4.top);
    }
    return Math.max(0, Gn2(e3, t3, false) - Zn2(n3, e3));
  }
  function jt2(e3) {
    return Jt2(0, tt2(e3.nodeIndex, 0, Math.max(0, Ae2.value.length - 1))) + Math.max(0, e3.offsetWithinNodePx);
  }
  function Ft2() {
    if (null != En2 && (null == ln2 || ln2(En2), En2 = null), v) for (const e3 of Tn2) window.clearTimeout(e3);
    Tn2 = [];
  }
  function Dt2(e3) {
    !function(e4) {
      var n3;
      const t3 = Ln2.value || qn2(), o3 = a2.value;
      if (!t3 || !o3) return;
      const l3 = Math.max(0, e4), r3 = t3.ownerDocument || o3.ownerDocument || document, i2 = r3.defaultView || ("undefined" != typeof window ? window : null);
      if (t3 === r3.documentElement || t3 === r3.body || t3 === r3.scrollingElement) {
        const e5 = Gn2(t3, r3, true) + o3.getBoundingClientRect().top;
        return void (null == (n3 = null == i2 ? void 0 : i2.scrollTo) || n3.call(i2, 0, Math.max(0, e5 + l3)));
      }
      t3.scrollTop = Zn2(o3, t3) + l3;
    }(jt2(e3));
  }
  function Kt2() {
    On2.value && v && null == En2 && (En2 = on2 ? on2(() => {
      En2 = null, On2.value && Dt2(On2.value);
    }) : null, null == En2 && On2.value && Dt2(On2.value));
  }
  function Ut2() {
    const e3 = Pt2(), n3 = Ae2.value.length;
    if (null == e3 || n3 <= 0) return null;
    const t3 = tt2(oo2(e3 + 1), 0, n3 - 1), o3 = Jt2(0, t3), l3 = $t2(t3);
    return { nodeIndex: t3, offsetWithinNodePx: tt2(e3 - o3, 0, Math.max(0, l3 - 1)) };
  }
  function Xt2(e3) {
    if (On2.value = { nodeIndex: tt2(e3.nodeIndex, 0, Math.max(0, Ae2.value.length - 1)), offsetWithinNodePx: Math.max(0, e3.offsetWithinNodePx) }, Ft2(), Dt2(On2.value), v) for (const n3 of [0, 120, 280, 480]) Tn2.push(window.setTimeout(() => {
      On2.value && Dt2(On2.value);
    }, n3));
  }
  function Gt2(e3) {
    const n3 = Pt2();
    return null == n3 ? null : n3 - jt2(e3);
  }
  function Jt2(e3, n3) {
    var t3, o3;
    if (e3 >= n3) return 0;
    if (Ve2.value) {
      let t4 = 0;
      for (let o4 = e3; o4 < n3; o4++) t4 += $t2(o4);
      return t4;
    }
    if (_n2.value !== Ae2.value.length) {
      let o4 = 0;
      for (let l4 = e3; l4 < n3; l4++) o4 += null != (t3 = it2[l4]) ? t3 : yt2.value;
      return o4;
    }
    const l3 = Bn2.value, r3 = Cn2.value;
    if (!l3.length || !r3.length) {
      let t4 = 0;
      for (let l4 = e3; l4 < n3; l4++) t4 += null != (o3 = it2[l4]) ? o3 : yt2.value;
      return t4;
    }
    return pt2(l3, e3, n3) + (n3 - e3 - pt2(r3, e3, n3)) * yt2.value;
  }
  watch(() => Ae2.value.length, (e3) => {
    e3 <= 0 ? dt2() : (e3 < _n2.value && function(e4) {
      if (e4 <= 0) return void dt2();
      let n3 = 0, t3 = 0;
      for (const [o3, l3] of Object.entries(it2)) {
        const r3 = Number(o3), a3 = Number(l3);
        !Number.isFinite(r3) || r3 < 0 || r3 >= e4 || !Number.isFinite(a3) || a3 <= 0 ? delete it2[r3] : (n3 += a3, t3++);
      }
      st2.total = n3, st2.count = t3;
    }(e3), e3 !== _n2.value && gt2(e3));
  }, { immediate: true });
  const Yt2 = computed(() => {
    if (!Ye2.value) return Ae2.value.map((e4, n4) => ({ node: e4, index: n4 }));
    const e3 = Ae2.value.length, n3 = tt2(Fn2.start, 0, e3), t3 = tt2(Fn2.end, n3, e3);
    return Ae2.value.slice(n3, t3).map((e4, t4) => ({ node: e4, index: n3 + t4 }));
  }), Qt2 = computed(() => Ye2.value ? Jt2(0, Math.min(Fn2.start, Ae2.value.length)) : 0), eo2 = computed(() => {
    if (!Ye2.value) return 0;
    const e3 = Ae2.value.length;
    return Jt2(Math.min(Fn2.end, e3), e3);
  });
  function no2() {
    var e3;
    const n3 = Ae2.value;
    return { totalNodes: n3.length, measuredCount: st2.count, estimatedCount: It2.value.filter(Boolean).length, averageNodeHeight: yt2.value, topSpacerHeight: Qt2.value, bottomSpacerHeight: eo2.value, estimatedTotalHeight: Jt2(0, n3.length), width: b.value || (null == (e3 = a2.value) ? void 0 : e3.clientWidth) || 0, probe: { paragraphReady: Boolean(E.value.paragraph), listItemReady: Boolean(E.value.listItem), listWrapperOverhead: E.value.listWrapperOverhead, headingReadyLevels: Object.entries(E.value.headings).filter(([, e4]) => Boolean(e4)).map(([e4]) => Number(e4)) }, nodes: n3.map((e4, n4) => {
      var t3, o3, l3, r3, a3, i2, s2, u3, d2;
      return { index: n4, type: e4.type, estimateKind: null != (o3 = null == (t3 = It2.value[n4]) ? void 0 : t3.kind) ? o3 : null, rendererKind: null != (r3 = null == (l3 = It2.value[n4]) ? void 0 : l3.rendererKind) ? r3 : null, estimatedHeight: null != (i2 = null == (a3 = It2.value[n4]) ? void 0 : a3.height) ? i2 : null, estimatedContentHeight: null != (u3 = null == (s2 = It2.value[n4]) ? void 0 : s2.contentHeight) ? u3 : null, measuredHeight: null != (d2 = it2[n4]) ? d2 : null };
    }) };
  }
  function oo2(e3) {
    var n3;
    if (e3 <= 0) return 0;
    const t3 = Ae2.value;
    if (Ve2.value) {
      let n4 = e3;
      for (let e4 = 0; e4 < t3.length; e4++) {
        const t4 = $t2(e4);
        if (n4 <= t4) return e4;
        n4 -= t4;
      }
      return Math.max(0, t3.length - 1);
    }
    if (_n2.value === t3.length && Bn2.value.length && Cn2.value.length) {
      const n4 = yt2.value, o4 = Bn2.value, l3 = Cn2.value, r3 = (e4) => e4 <= 0 ? 0 : ht2(o4, e4 - 1) + (e4 - ht2(l3, e4 - 1)) * n4;
      let a3 = 0, i2 = t3.length - 1, s2 = t3.length - 1;
      for (; a3 <= i2; ) {
        const n5 = a3 + i2 >> 1;
        r3(n5 + 1) >= e3 ? (s2 = n5, i2 = n5 - 1) : a3 = n5 + 1;
      }
      return s2;
    }
    let o3 = e3;
    for (let l3 = 0; l3 < t3.length; l3++) {
      const e4 = null != (n3 = it2[l3]) ? n3 : yt2.value;
      if (o3 <= e4) return l3;
      o3 -= e4;
    }
    return Math.max(0, t3.length - 1);
  }
  function ro2() {
    Mn2.value += 1;
  }
  function uo2(e3, n3) {
    const t3 = gn2.value, o3 = t3.has(e3);
    if (n3) {
      if (o3) return;
      const n4 = new Set(t3);
      return n4.add(e3), void (gn2.value = n4);
    }
    if (!o3) return;
    const l3 = new Set(t3);
    l3.delete(e3), gn2.value = l3;
  }
  function co2() {
    0 !== gn2.value.size && (gn2.value = /* @__PURE__ */ new Set());
  }
  function mo2(e3) {
    if (!yn2.size) return;
    if (!Ye2.value) return;
    let n3 = false;
    for (const [t3, o3] of yn2) t3 >= e3 && (o3.destroy(), yn2.delete(t3), $n2.value && uo2(t3, false), No2(t3), kn2.delete(t3) && (n3 = true));
    n3 && ro2();
  }
  function ho2(e3, n3) {
    $n2.value && uo2(e3, n3), n3 && (Ye2.value ? et2() : Wn2.value = tt2(e3, 0, Math.max(0, Ae2.value.length - 1)));
  }
  function fo2(e3) {
    const n3 = wn2.get(e3);
    n3 && (n3(), wn2.delete(e3));
    const t3 = yn2.get(e3);
    t3 && (t3.destroy(), yn2.delete(e3)), No2(e3);
  }
  function po2(e3, n3) {
    let t3 = false;
    if (n3) {
      const o4 = kn2.get(e3);
      kn2.set(e3, n3), o4 !== n3 && (t3 = true);
    } else kn2.delete(e3) && (t3 = true);
    if (t3 && ro2(), n3 || No2(e3), !zn2.value || !tn2) return fo2(e3), void (n3 && ho2(e3, true));
    if (!Ye2.value && $n2.value && !f.value && yn2.size >= 640 && (function() {
      if (!f.value) {
        f.value = true;
        for (const e4 of yn2.values()) e4.destroy();
        if (yn2.clear(), v) for (const e4 of xn2.values()) window.clearTimeout(e4);
        xn2.clear(), co2();
      }
    }(), !zn2.value || !tn2)) return fo2(e3), void (n3 && ho2(e3, true));
    if (e3 < cn2.value && !Ye2.value) return fo2(e3), void ho2(e3, true);
    if (gn2.value.has(e3)) return fo2(e3), void ho2(e3, true);
    if (!n3) return void fo2(e3);
    fo2(e3);
    const o3 = tn2(n3, { rootMargin: "400px" });
    if (!o3) return;
    yn2.set(e3, o3), ho2(e3, o3.isVisible.value), $n2.value && function(e4) {
      if (!v || !$n2.value) return;
      No2(e4);
      const n4 = e4 % 17 * 23, t4 = window.setTimeout(() => {
        var n5, t5;
        if (xn2.delete(e4), !$n2.value) return;
        if (gn2.value.has(e4)) return;
        const o4 = kn2.get(e4);
        if (!o4) return;
        const l4 = qn2(o4), r3 = o4.ownerDocument || document, a3 = r3.defaultView || window, i2 = !l4 || l4 === r3.documentElement || l4 === r3.body, s2 = !i2 && l4 ? l4.getBoundingClientRect() : null, u3 = i2 ? 0 : s2.top, d2 = i2 ? null != (t5 = null != (n5 = a3.innerHeight) ? n5 : null == l4 ? void 0 : l4.clientHeight) ? t5 : 0 : s2.bottom, c2 = o4.getBoundingClientRect();
        c2.bottom >= u3 - 500 && c2.top <= d2 + 500 && ho2(e4, true);
      }, 1800 + n4);
      xn2.set(e4, t4);
    }(e3);
    let l3 = null;
    l3 = watch(() => o3.isVisible.value, (n4) => {
      if (n4) {
        No2(e3), ho2(e3, true), null == l3 || l3(), wn2.delete(e3), yn2.get(e3) === o3 && yn2.delete(e3);
        try {
          o3.destroy();
        } catch (t4) {
        }
      }
    }, { immediate: true }), wn2.set(e3, l3), Ye2.value && et2();
  }
  watch(() => en2.value, (e3) => {
    if (!e3) {
      for (const e4 of Nn2.values()) e4.disconnect();
      Nn2.clear();
      for (const e4 of Kn2.values()) for (const n3 of e4) window.clearTimeout(n3);
      Kn2.clear();
    }
  }, { immediate: true });
  let vo2 = null, go2 = null, yo2 = false, wo2 = null, xo2 = null;
  function ko2() {
    v && (null != vo2 && (null == ln2 || ln2(vo2), vo2 = null), null != go2 && (window.clearTimeout(go2), go2 = null), null != xo2 && "function" == typeof window.cancelIdleCallback && (window.cancelIdleCallback(xo2), xo2 = null), yo2 = false, wo2 = null);
  }
  function No2(e3) {
    if (!v) return;
    const n3 = xn2.get(e3);
    null != n3 && (window.clearTimeout(n3), xn2.delete(e3));
  }
  function bo2(e3, n3 = {}) {
    var t3, o3;
    if (!Hn2.value) return;
    const r3 = Vn2.value;
    if (fn2.value >= r3) return;
    const a3 = Math.max(1, e3), i2 = (e4) => {
      var n4;
      vo2 = null, go2 = null, xo2 = null, yo2 = false;
      const t4 = null != wo2 ? wo2 : a3;
      wo2 = null;
      const o4 = Math.max(2, null != (n4 = l2.renderBatchBudgetMs) ? n4 : 6), i3 = (e5) => {
        const n5 = "undefined" != typeof performance ? performance.now() : Date.now();
        fn2.value = Math.min(r3, fn2.value + Math.max(1, e5)), mo2(fn2.value);
        const t5 = ("undefined" != typeof performance ? performance.now() : Date.now()) - n5;
        return function(e6) {
          var n6;
          if (!Hn2.value) return;
          const t6 = Math.max(2, null != (n6 = l2.renderBatchBudgetMs) ? n6 : 6), o5 = Math.max(1, un2.value || 1), r4 = Math.max(1, Math.floor(o5 / 4));
          e6 > 1.2 * t6 ? vn2.value = Math.max(r4, Math.floor(0.7 * vn2.value)) : e6 < 0.5 * t6 && vn2.value < o5 && (vn2.value = Math.min(o5, Math.ceil(1.2 * vn2.value)));
        }(t5), t5;
      };
      let s3 = t4;
      for (; (i3(s3), !(fn2.value >= r3) && e4) && !(("function" == typeof e4.timeRemaining ? e4.timeRemaining() : 0) <= 0.5 * o4); ) s3 = Math.max(1, Math.round(vn2.value));
      fn2.value < r3 && Mo2();
    };
    if (!v || n3.immediate) return void i2();
    const s2 = Math.max(0, null != (t3 = l2.renderBatchDelay) ? t3 : 16);
    if (wo2 = null != wo2 ? Math.max(wo2, a3) : a3, !yo2) {
      if (yo2 = true, !an2 && sn2 && window.requestIdleCallback) {
        const e4 = Math.max(0, null != (o3 = l2.renderBatchIdleTimeoutMs) ? o3 : 120);
        return void (xo2 = window.requestIdleCallback((e5) => {
          i2(e5);
        }, { timeout: e4 }));
      }
      on2 && !an2 ? vo2 = on2(() => {
        0 !== s2 ? go2 = window.setTimeout(() => i2(), s2) : i2();
      }) : go2 = window.setTimeout(() => i2(), s2);
    }
  }
  function Mo2() {
    Hn2.value && bo2(mn2.value ? Math.max(1, Math.round(vn2.value)) : Math.max(1, un2.value));
  }
  watch([() => Ae2.value, () => Ae2.value.length, () => Hn2.value, () => un2.value, () => cn2.value, () => l2.renderBatchDelay, () => l2.indexKey], () => {
    var e3;
    const n3 = Ae2.value.length, t3 = pn2.value, o3 = l2.indexKey, r3 = void 0 !== o3 && o3 !== t3.key, a3 = n3 !== t3.total, i2 = r3 || a3;
    pn2.value = { key: o3, total: n3 };
    const s2 = Rn2.value, u3 = null != (e3 = l2.renderBatchDelay) ? e3 : 16, d2 = s2.batchSize !== un2.value || s2.initial !== cn2.value || s2.delay !== u3 || s2.enabled !== Hn2.value;
    Rn2.value = { batchSize: un2.value, initial: cn2.value, delay: u3, enabled: Hn2.value }, r3 && (dt2(), n3 > 0 && gt2(n3)), (i2 || d2 || !Hn2.value) && ko2(), (i2 || d2) && (vn2.value = Math.max(1, un2.value || 1)), i2 && Ye2.value && et2({ immediate: true });
    const c2 = Vn2.value;
    if (!n3) return fn2.value = 0, void mo2(0);
    if (!Hn2.value) return fn2.value = c2, void mo2(fn2.value);
    const m2 = r3 || 0 === t3.total;
    fn2.value = m2 || d2 ? Math.min(c2, cn2.value) : Math.min(fn2.value, c2);
    const h3 = Math.max(1, cn2.value || un2.value || n3);
    fn2.value < c2 ? bo2(h3, { immediate: !v }) : mo2(fn2.value);
  }, { immediate: true }), watch(() => Ye2.value, (e3) => {
    if (!e3) return Jn2(), void Qn2();
    Yn2(), et2({ immediate: true });
  }, { immediate: true }), watch([() => Ae2.value.length, () => Ye2.value], (e3) => d(null, [e3], function* ([e4, n3]) {
    n3 && e4 && v && (yield nextTick(), et2({ immediate: true }));
  }), { flush: "post" }), watch(() => a2.value, () => {
    Ye2.value && (Yn2(), et2({ immediate: true }));
  }), watch(Ve2, (e3) => {
    e3 && function() {
      var e4;
      if ($e2.value && Re2.value && ze2.value && (null == (e4 = Pe2.value) ? void 0 : e4[1])) return;
      const n3 = markRaw({ type: "paragraph", children: [{ type: "text", content: "Probe paragraph text", raw: "Probe paragraph text" }], raw: "Probe paragraph text" }), t3 = markRaw({ type: "list_item", children: [n3], raw: "- Probe paragraph text" }), o3 = markRaw({ type: "list", ordered: false, items: [t3], raw: "- Probe paragraph text" });
      $e2.value = n3, Re2.value = t3, ze2.value = o3;
      const l3 = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
      for (let r3 = 1; r3 <= 6; r3++) l3[r3] = markRaw({ type: "heading", level: r3, text: "Probe heading", children: [{ type: "text", content: "Probe heading", raw: "Probe heading" }], raw: `${"#".repeat(r3)} Probe heading` });
      Pe2.value = l3;
    }();
  }, { immediate: true }), watch([() => a2.value, Ve2], () => {
    if (!Ve2.value) return _t2(), void (b.value = 0);
    Nt2(), _t2(), Ve2.value && a2.value && "undefined" != typeof ResizeObserver && (Mt2 = new ResizeObserver(() => {
      Nt2(), On2.value && Kt2();
    }), Mt2.observe(a2.value));
  }, { immediate: true }), watch([Ve2, Ze2], () => d(null, null, function* () {
    Ve2.value ? (yield nextTick(), function() {
      var e3, n3, t3, o3;
      if (!Ve2.value || "undefined" == typeof window) return void (E.value = { paragraph: null, listItem: null, listWrapperOverhead: 0, headings: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null } });
      const l3 = { paragraph: null, listItem: null, listWrapperOverhead: 0, headings: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null } }, r3 = xt2(wt2(u2.value), ".paragraph-node");
      l3.paragraph = Wl(u2.value, r3, "pre-wrap");
      const a3 = wt2(c.value), i2 = null == a3 ? void 0 : a3.querySelector(".paragraph-node");
      l3.listItem = Wl(c.value, i2, "pre-wrap");
      const s2 = null != (n3 = null == (e3 = m.value) ? void 0 : e3.offsetHeight) ? n3 : 0, d2 = null != (o3 = null == (t3 = c.value) ? void 0 : t3.offsetHeight) ? o3 : 0;
      l3.listWrapperOverhead = Math.max(0, s2 - d2);
      for (let u3 = 1; u3 <= 6; u3++) {
        const e4 = xt2(wt2(h2[u3]), `h${u3}`);
        l3.headings[u3] = Wl(h2[u3], e4, "pre-wrap");
      }
      E.value = l3;
    }()) : E.value = { paragraph: null, listItem: null, listWrapperOverhead: 0, headings: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null } };
  }), { flush: "post", immediate: true }), watch(() => Ae2.value.length, () => {
    Ye2.value && et2({ immediate: true });
  }), watch([Ve2, b], () => {
    Ye2.value && et2({ immediate: true }), On2.value && Kt2();
  }, { immediate: false }), watch(() => $n2.value, (e3) => {
    if (e3) for (const [n3, t3] of kn2) po2(n3, t3);
    else {
      for (const e4 of yn2.values()) e4.destroy();
      yn2.clear();
      for (const e4 of Array.from(xn2.keys())) No2(e4);
      co2();
      for (const [e4, n3] of kn2) n3 && ho2(e4, true);
    }
  }, { immediate: false }), watch([() => l2.viewportPriority, () => Ae2.value.length], ([e3, n3]) => {
    false !== e3 ? f.value && n3 <= 200 && (f.value = false) : f.value = false;
  }), watch(() => fn2.value, () => {
    Ye2.value && et2({ immediate: true });
  }), watch([Wn2, Je2, Pn2, () => Ae2.value.length, Ye2], () => {
    !function() {
      const e3 = Ae2.value.length;
      if (!Ye2.value || 0 === e3) return Fn2.start = 0, void (Fn2.end = e3);
      const n3 = Math.min(Je2.value, e3), t3 = Pn2.value, o3 = tt2(Wn2.value - t3, 0, Math.max(0, e3 - n3));
      Fn2.start = o3, Fn2.end = Math.min(e3, o3 + n3);
    }();
  }, { immediate: true }), watch([() => Ae2.value.length, Ye2, Je2, Pn2, () => Fn2.start, () => Fn2.end], ([e3, n3, t3, o3, l3, r3]) => {
    y.value && fe("virtualization", { nodes: e3, virtualization: n3, maxLiveNodes: t3, buffer: o3, focusIndex: Wn2.value, scroll: n3 ? (() => {
      const e4 = Ln2.value || qn2();
      return e4 ? { reverse: Xn2(e4), scrollTop: Math.round(e4.scrollTop), scrollTopAbs: Math.round(Math.abs(e4.scrollTop)), scrollHeight: Math.round(e4.scrollHeight), clientHeight: Math.round(e4.clientHeight) } : null;
    })() : null, liveRange: { start: l3, end: r3 }, rendered: fn2.value });
  }), watch(() => Vn2.value, (e3, n3) => {
    Hn2.value && ("number" == typeof n3 && e3 <= n3 || e3 > fn2.value && Mo2());
  }), watch([() => l2.customId], ([e3], n3, t3) => {
    if (!e3 || je2) return;
    const o3 = function(e4, n4) {
      return e4 ? (Ll.controllers[e4] = n4, () => {
        Ll.controllers[e4] === n4 && delete Ll.controllers[e4];
      }) : () => {
      };
    }(e3, { captureRestoreAnchor: Ut2, restoreAnchor: Xt2, getAnchorDrift: Gt2, getReport: no2 });
    t3(() => {
      o3();
    });
  }, { immediate: true }), onBeforeUnmount(() => {
    ko2();
    for (const e3 of yn2.values()) e3.destroy();
    yn2.clear();
    for (const e3 of Nn2.values()) e3.disconnect();
    Nn2.clear();
    for (const e3 of Kn2.values()) for (const n3 of e3) window.clearTimeout(n3);
    Kn2.clear();
    for (const e3 of wn2.values()) e3();
    wn2.clear();
    for (const e3 of Array.from(xn2.keys())) No2(e3);
    _t2(), Ft2(), Jn2(), Qn2();
  });
  const So2 = defineAsyncComponent({ loader: () => d(null, null, function* () {
    try {
      return (yield import("./index4-QF3KIZQO.js")).default;
    } catch (e3) {
      return console.warn('[markstream-vue] Optional peer dependencies for MermaidBlockNode are missing. Falling back to preformatted code rendering. To enable Mermaid rendering, please install "mermaid".', e3), Zt;
    }
  }), loadingComponent: ua, delay: 0 }), _o2 = defineAsyncComponent({ loader: () => d(null, null, function* () {
    try {
      return (yield import("./index5-XBSX6WJD.js")).default;
    } catch (e3) {
      return console.warn('[markstream-vue] Optional peer dependencies for InfographicBlockNode are missing. Falling back to preformatted code rendering. To enable Infographic rendering, please install "@antv/infographic".', e3), Zt;
    }
  }), loadingComponent: sa, delay: 0 }), Bo2 = defineAsyncComponent(() => d(null, null, function* () {
    try {
      return (yield import("./index6-GEAYPF5B.js")).default;
    } catch (e3) {
      return console.warn('[markstream-vue] Optional peer dependencies for D2BlockNode are missing. Falling back to preformatted code rendering. To enable D2 rendering, please install "@terrastruct/d2".', e3), Zt;
    }
  })), Co2 = { text: ot, paragraph: qt, heading: Ht, code_block: Ct2, list: zt, list_item: Rt, blockquote: Te, table: to, definition_list: We, footnote: Tt, footnote_reference: Qe, footnote_anchor: Lt, admonition: Ma, vmr_container: io, hardbreak: At, link: kt, image: jn, thematic_break: lo, math_inline: lt, math_block: rt, strong: ft, emphasis: Bt, strikethrough: vt, highlight: St, insert: bt, subscript: mt, superscript: ut, emoji: Fe, checkbox: He, checkbox_input: He, inline_code: hn, html_inline: dn, reference: at, html_block: Vt }, Lo2 = computed(() => null != l2.indexKey ? String(l2.indexKey) : "markdown-renderer"), Oo2 = computed(() => i(i({ stream: l2.codeBlockStream, darkTheme: l2.codeBlockDarkTheme, lightTheme: l2.codeBlockLightTheme, monacoOptions: l2.codeBlockMonacoOptions, themes: l2.themes, minWidth: l2.codeBlockMinWidth, maxWidth: l2.codeBlockMaxWidth }, "boolean" == typeof T.value ? { showTooltips: T.value } : {}), l2.codeBlockProps || {})), Eo2 = computed(() => i({}, l2.mermaidProps || {})), To2 = computed(() => i({}, l2.d2Props || {})), Io2 = computed(() => i({}, l2.infographicProps || {})), Ao2 = computed(() => ({ typewriter: l2.typewriter, fade: l2.fade, customHtmlTags: Ee2.value.customHtmlTags })), $o2 = computed(() => i(i({}, Ao2.value), "boolean" == typeof T.value ? { showTooltip: T.value } : {})), Ho2 = computed(() => i(i({}, Ao2.value), "boolean" == typeof T.value ? { showTooltips: T.value } : {})), Ro2 = computed(() => Yt2.value.map((e3) => {
    var n3, t3, o3, l3, r3, a3;
    let u3 = function(e4) {
      var n4, t4, o4, l4, r4, a4, s2;
      if ("code_block" !== e4.type) return e4;
      const u4 = e4, d3 = [String(null != (n4 = u4.language) ? n4 : ""), String(null != (t4 = u4.loading) ? t4 : ""), String(null != (o4 = u4.diff) ? o4 : ""), String(null != (l4 = u4.code) ? l4 : ""), String(null != (r4 = u4.originalCode) ? r4 : ""), String(null != (a4 = u4.updatedCode) ? a4 : ""), String(null != (s2 = u4.raw) ? s2 : "")].join("\0"), c3 = bn2.get(u4);
      if (c3 && c3.signature === d3) return c3.node;
      const m3 = i({}, u4);
      return bn2.set(u4, { signature: d3, node: m3 }), m3;
    }(e3.node);
    const d2 = zo2(u3);
    let c2 = Po2(u3, d2);
    if (("html_block" === u3.type || "html_inline" === u3.type) && c2 === Co2[u3.type]) {
      const e4 = u3, r4 = String(null != (n3 = e4.tag) ? n3 : "").trim().toLowerCase() || getHtmlTagFromContent(e4.content);
      if (r4) {
        const n4 = Be.value[r4];
        if (Ie2.value.has(r4) && n4) c2 = n4, u3 = s(i({}, e4), { type: r4, tag: r4, content: stripCustomHtmlWrapper(e4.content, r4) });
        else if (shouldRenderUnknownHtmlTagAsText(null != (t3 = e4.content) ? t3 : e4.raw, r4)) {
          const n5 = String(null != (l3 = null != (o3 = e4.content) ? o3 : e4.raw) ? l3 : "");
          "html_inline" === u3.type ? (c2 = ot, u3 = { type: "text", content: n5, raw: n5 }) : (c2 = qt, u3 = { type: "paragraph", children: [{ type: "text", content: n5, raw: n5 }], raw: n5 });
        }
      }
    }
    let m2 = i({}, function(e4, n4) {
      const t4 = null != n4 ? n4 : zo2(e4);
      return "mermaid" === t4 ? Eo2.value : "infographic" === t4 ? Io2.value : "d2" === t4 || "d2lang" === t4 ? To2.value : "link" === e4.type ? $o2.value : "list" === e4.type ? Ho2.value : "code_block" === e4.type ? Oo2.value : Ao2.value;
    }(u3, d2));
    const h3 = It2.value[e3.index];
    return "code_block" === u3.type && "code-block" === (null == h3 ? void 0 : h3.kind) && (m2 = s(i({}, m2), { estimatedHeightPx: h3.height, estimatedContentHeightPx: h3.contentHeight })), "code_block" === u3.type && "mermaid" === d2 && null == jl(m2.estimatedPreviewHeightPx) && (m2 = s(i({}, m2), { estimatedPreviewHeightPx: Ul(Dl(String(null != (r3 = u3.code) ? r3 : ""))) })), "code_block" === u3.type && "infographic" === d2 && null == jl(m2.estimatedPreviewHeightPx) && (m2 = s(i({}, m2), { estimatedPreviewHeightPx: ql(Kl(String(null != (a3 = u3.code) ? a3 : ""))) })), "math_block" === u3.type && (m2 = s(i({}, m2), { cacheScope: be.value })), s(i({}, e3), { node: u3, component: c2, bindings: m2, isCodeBlock: "code_block" === u3.type, indexKey: `${Lo2.value}-${e3.index}` });
  }));
  function zo2(e3) {
    var n3;
    return "code_block" === (null == e3 ? void 0 : e3.type) ? String(null != (n3 = e3.language) ? n3 : "").trim().toLowerCase() : "";
  }
  function Po2(e3, n3) {
    if (!e3) return ao;
    const t3 = Be.value, o3 = t3[String(e3.type)];
    if ("code_block" === e3.type) {
      const l3 = null != n3 ? n3 : zo2(e3), r3 = l3 ? t3[l3] : void 0;
      if (r3) return r3;
      if ("mermaid" === l3) return t3.mermaid || So2;
      if ("infographic" === l3) return t3.infographic || _o2;
      if ("d2" === l3 || "d2lang" === l3) return t3.d2 || Bo2;
      if (o3) return o3;
      return t3.code_block || Ot2.value;
    }
    return o3 || Co2[String(e3.type)] || ao;
  }
  function Wo2(e3) {
    r2("click", e3);
  }
  function jo2(e3) {
    var n3;
    (null == (n3 = e3.target) ? void 0 : n3.closest("[data-node-index]")) && r2("mouseover", e3);
  }
  function Fo2(e3) {
    var n3;
    (null == (n3 = e3.target) ? void 0 : n3.closest("[data-node-index]")) && r2("mouseout", e3);
  }
  function Do2(e3) {
    r2("mouseover", e3);
  }
  function Ko2(e3) {
    r2("mouseout", e3);
  }
  const Vo2 = ref(null), Uo2 = ref(false);
  let qo2, Xo2 = 0;
  const Go2 = /* @__PURE__ */ new Set(["code_block", "admonition", "table", "math_block", "html_block", "image"]);
  function Zo2(e3) {
    var n3, t3;
    if (!e3 || "object" != typeof e3) return 0;
    const o3 = e3, l3 = null != (t3 = null != (n3 = o3.raw) ? n3 : o3.content) ? t3 : o3.code;
    if ("string" == typeof l3) return l3.length;
    const r3 = o3.children;
    if (Array.isArray(r3)) return r3.reduce((e4, n4) => e4 + Zo2(n4), 0);
    const a3 = o3.items;
    return Array.isArray(a3) ? a3.reduce((e4, n4) => e4 + Zo2(n4), 0) : 0;
  }
  function Jo2() {
    var e3, n3;
    return (null == (e3 = l2.nodes) ? void 0 : e3.length) ? l2.nodes.reduce((e4, n4) => e4 + Zo2(n4), 0) : (null != (n3 = l2.content) ? n3 : "").length;
  }
  function Yo2() {
    qo2 && (clearTimeout(qo2), qo2 = void 0);
  }
  function Qo2() {
    var e3, n3;
    if (!(v && Uo2.value && a2.value && Vo2.value)) return;
    const t3 = a2.value, o3 = Vo2.value, l3 = function(e4) {
      const n4 = document.createTreeWalker(e4, NodeFilter.SHOW_TEXT, { acceptNode(e5) {
        var n5;
        if (!(null != (n5 = e5.textContent) ? n5 : "").trim()) return NodeFilter.FILTER_REJECT;
        const t5 = e5.parentElement;
        return t5 ? t5.closest('.typewriter-cursor, .height-estimation-probes, [data-node-type="code_block"], [data-node-type="admonition"], [data-node-type="table"], [data-node-type="math_block"], [data-node-type="html_block"], [data-node-type="image"], script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      } });
      let t4 = null, o4 = n4.nextNode();
      for (; o4; ) t4 = o4, o4 = n4.nextNode();
      return t4;
    }(t3), r3 = t3.getBoundingClientRect();
    let i2 = 0, s2 = 0, u3 = 20;
    if (null == l3 ? void 0 : l3.textContent) {
      const o4 = document.createRange(), a3 = l3.textContent.length;
      o4.setStart(l3, Math.max(0, a3 - 1)), o4.setEnd(l3, a3);
      const d2 = "function" == typeof o4.getClientRects ? o4.getClientRects() : void 0, c2 = null != (n3 = null == d2 ? void 0 : d2[d2.length - 1]) ? n3 : null == (e3 = l3.parentElement) ? void 0 : e3.getBoundingClientRect();
      c2 && (i2 = c2.right - r3.left + t3.scrollLeft, s2 = c2.top - r3.top + t3.scrollTop, u3 = c2.height || u3), o4.detach();
    }
    o3.style.transform = `translate(${Math.max(0, i2)}px, ${Math.max(0, s2)}px)`, o3.style.height = `${u3}px`;
  }
  return watch([ie, () => l2.content, () => l2.nodes, () => l2.typewriter, ue], () => d(null, null, function* () {
    if (!v || g.value || !te.value) return;
    if (ue.value) return Uo2.value = false, void Yo2();
    const e3 = Jo2(), n3 = !function(e4) {
      if (!e4 || "object" != typeof e4) return false;
      const n4 = e4.type;
      return "string" == typeof n4 && Go2.has(n4);
    }(Ae2.value[Ae2.value.length - 1]);
    if (false === l2.typewriter || !n3 || e3 <= Xo2) return false !== l2.typewriter && n3 || (Uo2.value = false), void (Xo2 = e3);
    Xo2 = e3, Uo2.value = true, Yo2(), yield nextTick(), Qo2(), qo2 = setTimeout(() => {
      Uo2.value = false;
    }, 3e3);
  }), { flush: "post", immediate: true }), watch(Uo2, (e3) => d(null, null, function* () {
    e3 && (yield nextTick(), Qo2());
  }), { flush: "post" }), onBeforeUnmount(() => {
    Yo2(), Ne.clear();
  }), (e3, n3) => g.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(Ro2.value, (e4) => (openBlock(), createBlock(resolveDynamicComponent(e4.component), mergeProps({ key: e4.index, node: e4.node, loading: e4.node.loading, "index-key": e4.indexKey }, { ref_for: true }, e4.bindings, { "custom-id": l2.customId, "is-dark": l2.isDark, onClick: Wo2, onMouseover: Do2, onMouseout: Ko2, onCopy: n3[0] || (n3[0] = (e5) => r2("copy", e5)), onHandleArtifactClick: n3[1] || (n3[1] = (e5) => r2("handleArtifactClick", e5)) }), null, 16, ["node", "loading", "index-key", "custom-id", "is-dark"]))), 128)) : (openBlock(), createElementBlock("div", { key: 1, ref_key: "containerRef", ref: a2, class: normalizeClass(["markstream-vue markdown-renderer", [{ dark: l2.isDark }, { virtualized: Ye2.value }]]), "data-custom-id": l2.customId, onClick: Wo2, onMouseover: jo2, onMouseout: Fo2 }, [Ve2.value || Ye2.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [Ve2.value ? (openBlock(), createElementBlock("div", { key: 0, class: "height-estimation-probes", style: normalizeStyle({ width: `${Ze2.value}px` }), "aria-hidden": "true" }, [createBaseVNode("div", { ref_key: "paragraphProbeWrapperRef", ref: u2, class: "node-content", "data-probe": "paragraph" }, [createVNode(unref(qt), { node: $e2.value, "index-key": "probe-paragraph" }, null, 8, ["node"])], 512), createBaseVNode("div", { ref_key: "listItemProbeWrapperRef", ref: c, class: "node-content", "data-probe": "list-item" }, [createBaseVNode("ul", ca, [createVNode(unref(Rt), { node: Re2.value, "index-key": "probe-list-item" }, null, 8, ["node"])])], 512), createBaseVNode("div", { ref_key: "listProbeWrapperRef", ref: m, class: "node-content", "data-probe": "list" }, [createVNode(unref(zt), { node: ze2.value, "index-key": "probe-list" }, null, 8, ["node"])], 512), (openBlock(), createElementBlock(Fragment, null, renderList(6, (e4) => createBaseVNode("div", { key: `probe-heading-${e4}`, ref_for: true, ref: (n4) => function(e5, n5) {
    e5 < 1 || e5 > 6 || (h2[e5] = n5);
  }(e4, n4), class: "node-content", "data-probe": `heading-${e4}` }, [createVNode(unref(Ht), { node: Un2(e4), "index-key": `probe-heading-${e4}` }, null, 8, ["node", "index-key"])], 8, ma)), 64))], 4)) : createCommentVNode("", true), Ye2.value ? (openBlock(), createElementBlock("div", { key: 1, class: "node-spacer", style: normalizeStyle({ height: `${Qt2.value}px` }), "aria-hidden": "true" }, null, 4)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(Ro2.value, (e4) => {
    return openBlock(), createElementBlock("div", { key: e4.index, ref_for: true, ref: (n4) => po2(e4.index, n4), class: "node-slot", "data-node-index": e4.index, "data-node-type": e4.node.type }, [(t3 = e4.index, Hn2.value && t3 >= fn2.value || !(!$n2.value || t3 < cn2.value || gn2.value.has(t3)) ? (openBlock(), createElementBlock("div", { key: 1, class: "node-placeholder", style: normalizeStyle({ height: `${$t2(e4.index)}px` }) }, null, 4)) : (openBlock(), createElementBlock("div", { key: 0, ref_for: true, ref: (n4) => function(e5, n5) {
      var t4;
      const o3 = Kn2.get(e5);
      if (o3) {
        for (const e6 of o3) window.clearTimeout(e6);
        Kn2.delete(e5);
      }
      const l3 = Nn2.get(e5);
      if (l3 && (l3.disconnect(), Nn2.delete(e5)), !n5 || !en2.value) return void Dn2.delete(e5);
      Dn2.set(e5, n5);
      const r3 = () => {
        !function(e6, n6) {
          if (!Number.isFinite(n6) || n6 <= 0) return;
          const t5 = it2[e6];
          if (it2[e6] = n6, t5 ? st2.total += n6 - t5 : (st2.total += n6, st2.count++), _n2.value > e6) {
            const o4 = Bn2.value, l4 = Cn2.value;
            if (o4.length && l4.length) if (t5) {
              const l5 = n6 - t5;
              0 !== l5 && ct2(o4, e6, l5);
            } else ct2(o4, e6, n6), ct2(l4, e6, 1);
          }
          On2.value && Kt2();
        }(e5, n5.offsetHeight);
      };
      if (queueMicrotask(r3), "undefined" != typeof ResizeObserver) {
        const t5 = new ResizeObserver(() => {
          r3();
        });
        t5.observe(n5), Nn2.set(e5, t5);
      }
      "code_block" === (null == (t4 = Ae2.value[e5]) ? void 0 : t4.type) && "undefined" != typeof window && Kn2.set(e5, [window.setTimeout(r3, 16), window.setTimeout(r3, 80), window.setTimeout(r3, 240), window.setTimeout(r3, 800)]);
    }(e4.index, n4), class: "node-content" }, [e4.isCodeBlock || false === l2.fade ? (openBlock(), createBlock(resolveDynamicComponent(e4.component), mergeProps({ key: 1, node: e4.node, loading: e4.node.loading, "index-key": e4.indexKey }, { ref_for: true }, e4.bindings, { "custom-id": l2.customId, "is-dark": l2.isDark, onCopy: n3[4] || (n3[4] = (e5) => r2("copy", e5)), onHandleArtifactClick: n3[5] || (n3[5] = (e5) => r2("handleArtifactClick", e5)) }), null, 16, ["node", "loading", "index-key", "custom-id", "is-dark"])) : (openBlock(), createBlock(Transition, { key: 0, name: "fade", appear: "" }, { default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(e4.component), mergeProps({ node: e4.node, loading: e4.node.loading, "index-key": e4.indexKey }, { ref_for: true }, e4.bindings, { "custom-id": l2.customId, "is-dark": l2.isDark, onCopy: n3[2] || (n3[2] = (e5) => r2("copy", e5)), onHandleArtifactClick: n3[3] || (n3[3] = (e5) => r2("handleArtifactClick", e5)) }), null, 16, ["node", "loading", "index-key", "custom-id", "is-dark"]))]), _: 2 }, 1024))], 512)))], 8, ha);
    var t3;
  }), 128)), Uo2.value ? (openBlock(), createElementBlock("span", { key: 1, ref_key: "typewriterCursorRef", ref: Vo2, class: "typewriter-cursor", "aria-hidden": "true" }, null, 512)) : createCommentVNode("", true), Ye2.value ? (openBlock(), createElementBlock("div", { key: 2, class: "node-spacer", style: normalizeStyle({ height: `${eo2.value}px` }), "aria-hidden": "true" }, null, 4)) : createCommentVNode("", true)], 42, da));
} }), [["__scopeId", "data-v-19a15cf8"]]);
var pa = fa;
pa.install = (e2) => {
  var n2, t2;
  const o2 = null != (t2 = null != (n2 = pa.__name) ? n2 : pa.name) ? t2 : "NodeRenderer";
  e2.component(o2, fa);
};
var va = Object.freeze(Object.defineProperty({ __proto__: null, default: pa }, Symbol.toStringTag, { value: "Module" }));
var ga = { key: 0, xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "admonition-icon" };
var ya = { key: 1, xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "admonition-icon" };
var wa = { key: 2, xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "admonition-icon" };
var xa = { key: 3, xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "admonition-icon" };
var ka = { class: "admonition-title" };
var Na = ["aria-expanded", "aria-controls"];
var ba = ["id"];
var Ma = Ee(defineComponent({ __name: "AdmonitionNode", props: { node: {}, indexKey: {}, isDark: { type: Boolean }, typewriter: { type: Boolean }, fade: { type: Boolean }, customId: {} }, emits: ["copy"], setup(e2, { emit: n2 }) {
  var t2;
  const o2 = e2, l2 = n2, r2 = computed(() => {
    if (o2.node.title && o2.node.title.trim().length) return o2.node.title;
    const e3 = o2.node.kind || "note";
    return e3.charAt(0).toUpperCase() + e3.slice(1);
  }), a2 = ref(!!o2.node.collapsible && !(null == (t2 = o2.node.open) || t2));
  function i2() {
    o2.node.collapsible && (a2.value = !a2.value);
  }
  const s2 = `admonition-${Math.random().toString(36).slice(2, 9)}`;
  return (n3, t3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["admonition", [`admonition-${o2.node.kind}`]]) }, [createBaseVNode("div", { id: s2, class: "admonition-legend" }, ["note" === o2.node.kind || "info" === o2.node.kind ? (openBlock(), createElementBlock("svg", ga, [...t3[1] || (t3[1] = [createBaseVNode("circle", { cx: "12", cy: "12", r: "10" }, null, -1), createBaseVNode("path", { d: "M12 16v-4" }, null, -1), createBaseVNode("path", { d: "M12 8h.01" }, null, -1)])])) : "tip" === o2.node.kind ? (openBlock(), createElementBlock("svg", ya, [...t3[2] || (t3[2] = [createBaseVNode("path", { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }, null, -1), createBaseVNode("path", { d: "M9 18h6" }, null, -1), createBaseVNode("path", { d: "M10 22h4" }, null, -1)])])) : "warning" === o2.node.kind || "caution" === o2.node.kind ? (openBlock(), createElementBlock("svg", wa, [...t3[3] || (t3[3] = [createBaseVNode("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }, null, -1), createBaseVNode("path", { d: "M12 9v4" }, null, -1), createBaseVNode("path", { d: "M12 17h.01" }, null, -1)])])) : "danger" === o2.node.kind || "error" === o2.node.kind ? (openBlock(), createElementBlock("svg", xa, [...t3[4] || (t3[4] = [createBaseVNode("polygon", { points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" }, null, -1), createBaseVNode("path", { d: "M12 8v4" }, null, -1), createBaseVNode("path", { d: "M12 16h.01" }, null, -1)])])) : createCommentVNode("", true), createBaseVNode("span", ka, toDisplayString(r2.value), 1), o2.node.collapsible ? (openBlock(), createElementBlock("button", { key: 4, class: "admonition-toggle", "aria-expanded": !a2.value, "aria-controls": `${s2}-content`, onClick: i2 }, [(openBlock(), createElementBlock("svg", { style: normalizeStyle({ rotate: a2.value ? "0deg" : "90deg" }), xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [...t3[5] || (t3[5] = [createBaseVNode("path", { d: "m9 18 6-6-6-6" }, null, -1)])], 4))], 8, Na)) : createCommentVNode("", true)]), withDirectives(createBaseVNode("div", { id: `${s2}-content`, class: "admonition-content", "aria-labelledby": s2 }, [createVNode(unref(pa), { "index-key": `admonition-${e2.indexKey}`, nodes: o2.node.children, "custom-id": o2.customId, typewriter: o2.typewriter, fade: o2.fade, onCopy: t3[0] || (t3[0] = (e3) => l2("copy", e3)) }, null, 8, ["index-key", "nodes", "custom-id", "typewriter", "fade"])], 8, ba), [[vShow, !a2.value]])], 2));
} }), [["__scopeId", "data-v-a83480e1"]]);
Ma.install = (e2) => {
  e2.component(Ma.__name, Ma);
};
var Sa = () => import("./d2_markstream-vue-WXVM7MSO.js");
var _a2 = null;
var Ba = Sa;
function Ca(e2) {
  Ba = e2, _a2 = null;
}
function La(e2) {
  Ca(null != e2 ? e2 : Sa);
}
function Oa() {
  Ca(null);
}
function Ea() {
  return "function" == typeof Ba;
}
function Ta() {
  return d(this, null, function* () {
    if (_a2) return _a2;
    const e2 = Ba;
    if (!e2) return null;
    let n2;
    try {
      n2 = yield e2();
    } catch (t2) {
      if (e2 === Sa) throw new Error('Optional dependency "@terrastruct/d2" is not installed. Please install it to enable D2 diagrams.');
      throw t2;
    }
    return n2 ? (_a2 = function(e3) {
      var n3;
      if (!e3) return e3;
      if (e3.D2 && "function" == typeof e3.D2) return e3.D2;
      if (e3.default && e3.default.D2 && "function" == typeof e3.default.D2) return e3.default.D2;
      const t2 = null != (n3 = e3.default) ? n3 : e3;
      return "function" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.D2) && "function" == typeof t2.D2 ? t2.D2 : t2;
    }(n2), _a2) : null;
  });
}
var Ia = () => import("./__vite-optional-peer-dep_mermaid_markstream-vue-33EYC5JA.js");
var Aa = null;
var $a = Ia;
function Ha(e2) {
  $a = e2, Aa = null;
}
function Ra(e2) {
  Ha(null != e2 ? e2 : Ia);
}
function za() {
  Ha(null);
}
function Pa() {
  return "function" == typeof $a;
}
function Wa(e2) {
  if (!e2) return e2;
  const n2 = e2 && e2.default ? e2.default : e2;
  if (n2 && ("function" == typeof n2.render || "function" == typeof n2.parse || "function" == typeof n2.initialize)) return n2;
  if (n2 && n2.mermaidAPI && ("function" == typeof n2.mermaidAPI.render || "function" == typeof n2.mermaidAPI.parse)) {
    const e3 = n2.mermaidAPI;
    return s(i({}, n2), { render: e3.render.bind(e3), parse: e3.parse ? e3.parse.bind(e3) : void 0, initialize: (t2) => "function" == typeof n2.initialize ? n2.initialize(t2) : e3.initialize ? e3.initialize(t2) : void 0 });
  }
  return e2.mermaid && "function" == typeof e2.mermaid.render ? e2.mermaid : n2;
}
function ja(e2) {
  if (e2) try {
    const n2 = null == e2 ? void 0 : e2.initialize;
    e2.initialize = (t2) => {
      const o2 = i({ suppressErrorRendering: true }, t2 || {});
      return "function" == typeof n2 ? n2.call(e2, o2) : (null == e2 ? void 0 : e2.mermaidAPI) && "function" == typeof e2.mermaidAPI.initialize ? e2.mermaidAPI.initialize(o2) : void 0;
    };
  } catch (n2) {
  }
}
function Fa() {
  return d(this, null, function* () {
    if (Aa) return Aa;
    const e2 = function() {
      try {
        const e3 = globalThis;
        return Wa(null == e3 ? void 0 : e3.mermaid);
      } catch (e3) {
        return null;
      }
    }();
    if (e2) return Aa = e2, ja(Aa), Aa;
    const n2 = $a;
    if (!n2) return null;
    let t2;
    try {
      t2 = yield n2();
    } catch (o2) {
      if (n2 === Ia) throw new Error('Optional dependency "mermaid" is not installed. Please install it to enable mermaid diagrams.');
      throw o2;
    }
    return t2 ? (Aa = Wa(t2), ja(Aa), Aa) : null;
  });
}
function Da(e2) {
  return JSON.stringify(e2);
}
function Ka(e2) {
  var n2;
  const t2 = null != (n2 = e2.mode) ? n2 : "classic", o2 = e2.katexUrl, l2 = e2.mhchemUrl, r2 = Da(i({ throwOnError: true, displayMode: true, output: "html", strict: "ignore" }, e2.renderOptions || {})), a2 = Da(o2), s2 = l2 ? Da(l2) : '""';
  return "module" === t2 ? `
let DEBUG = false
let katex = null
let katexLoadError = null
let loadPromise = null

function normalizeKaTeX(mod) {
  const resolved = (mod && mod.default) ? mod.default : mod
  if (resolved && typeof resolved.renderToString === 'function')
    return resolved
  return null
}

async function loadKaTeX() {
  if (katex || katexLoadError)
    return
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const mod = await import(${a2})
        katex = normalizeKaTeX(mod) || null
        const mhchemUrl = ${s2}
        if (mhchemUrl) {
          try {
            await import(mhchemUrl)
          }
          catch (e) {
            // ignore optional mhchem load failures
            if (DEBUG)
              console.warn('[katex-cdn-worker] failed to load mhchem', e)
          }
        }
      }
      catch (e) {
        katexLoadError = e
      }
    })()
  }
  await loadPromise
}

globalThis.addEventListener('message', async (ev) => {
  const data = ev.data || {}
  if (data.type === 'init') {
    DEBUG = !!data.debug
    if (DEBUG)
      console.debug('[katex-cdn-worker] debug enabled')
    return
  }
  const id = data.id ?? ''
  const content = data.content ?? ''
  const displayMode = data.displayMode ?? true

  await loadKaTeX()

  if (!katex) {
    const reason = katexLoadError ? String(katexLoadError?.message || katexLoadError) : 'KaTeX is not available in worker'
    globalThis.postMessage({ id, error: reason, content, displayMode })
    return
  }

  try {
    const opts = ${r2}
    const html = katex.renderToString(content, { ...opts, displayMode: !!displayMode })
    globalThis.postMessage({ id, html, content, displayMode })
  }
  catch (err) {
    const msg = String(err?.message || err)
    globalThis.postMessage({ id, error: msg, content, displayMode })
  }
})
`.trimStart() : `
let DEBUG = false
let katex = null
let katexLoadError = null

function normalizeKaTeX(val) {
  const resolved = (val && val.default) ? val.default : val
  if (resolved && typeof resolved.renderToString === 'function')
    return resolved
  return null
}

function loadKaTeXClassic() {
  if (katex || katexLoadError)
    return
  try {
    importScripts(${a2})
    const mhchemUrl = ${s2}
    if (mhchemUrl) {
      try {
        importScripts(mhchemUrl)
      }
      catch (e) {
        // ignore optional mhchem load failures
        if (DEBUG)
          console.warn('[katex-cdn-worker] failed to load mhchem', e)
      }
    }
    katex = normalizeKaTeX(globalThis.katex)
  }
  catch (e) {
    katexLoadError = e
  }
}

loadKaTeXClassic()

globalThis.addEventListener('message', (ev) => {
  const data = ev.data || {}
  if (data.type === 'init') {
    DEBUG = !!data.debug
    if (DEBUG)
      console.debug('[katex-cdn-worker] debug enabled')
    return
  }
  const id = data.id ?? ''
  const content = data.content ?? ''
  const displayMode = data.displayMode ?? true

  if (!katex && !katexLoadError)
    loadKaTeXClassic()

  if (!katex) {
    const reason = katexLoadError ? String(katexLoadError?.message || katexLoadError) : 'KaTeX is not available in worker'
    globalThis.postMessage({ id, error: reason, content, displayMode })
    return
  }

  try {
    const opts = ${r2}
    const html = katex.renderToString(content, { ...opts, displayMode: !!displayMode })
    globalThis.postMessage({ id, html, content, displayMode })
  }
  catch (err) {
    const msg = String(err?.message || err)
    globalThis.postMessage({ id, error: msg, content, displayMode })
  }
})
`.trimStart();
}
function Va(e2) {
  var n2, t2;
  const o2 = Ka(e2);
  if ("undefined" == typeof Worker || "undefined" == typeof URL || "undefined" == typeof Blob) return { worker: null, dispose: () => {
  }, source: o2 };
  const l2 = new Blob([o2], { type: "text/javascript" }), r2 = URL.createObjectURL(l2);
  let a2 = false;
  const u2 = "module" === (null != (n2 = e2.mode) ? n2 : "classic") ? s(i({}, null != (t2 = e2.workerOptions) ? t2 : {}), { type: "module" }) : e2.workerOptions, d2 = new Worker(r2, u2);
  if (e2.debug) try {
    d2.postMessage({ type: "init", debug: true });
  } catch (c) {
  }
  return { worker: d2, dispose: () => {
    if (!a2) {
      a2 = true;
      try {
        URL.revokeObjectURL(r2);
      } catch (c) {
      }
    }
  }, source: o2 };
}
function Ua(e2) {
  return e2 ? e2.replace(/·/g, "⋅").replace(/℃/g, "°C") : "";
}
vn.install = (e2) => {
  e2.component(vn.__name, vn);
};
var qa = null;
var Xa = null;
var Ga = false;
var Za = /* @__PURE__ */ new Map();
var Ja = /* @__PURE__ */ new Map();
var Ya = 5;
var Qa = /* @__PURE__ */ new Set();
function ei() {
  if (Za.size < Ya && Qa.size) {
    const n2 = Array.from(Qa);
    Qa.clear();
    for (const t2 of n2) try {
      t2();
    } catch (e2) {
    }
  }
}
function ni(e2) {
  qa = e2, Xa = null, qa.onmessage = (e3) => {
    const { id: n2, html: t2, error: o2 } = e3.data, l2 = Za.get(n2);
    if (l2) if (Za.delete(n2), clearTimeout(l2.timeoutId), ei(), o2) l2.reject(new Error(o2));
    else {
      const { content: n3, displayMode: o3 } = e3.data;
      if (n3) {
        const e4 = `${o3 ? "d" : "i"}:${n3}`;
        if (Ja.set(e4, t2), Ja.size > 200) {
          const e5 = Ja.keys().next().value;
          Ja.delete(e5);
        }
      }
      l2.resolve(t2);
    }
  }, qa.onerror = (e3) => {
    console.error("[katexWorkerClient] Worker error:", e3);
    for (const [n2, t2] of Za.entries()) clearTimeout(t2.timeoutId), t2.reject(new Error(`Worker error: ${e3.message}`));
    Za.clear(), ei();
  };
}
function ti() {
  var e2;
  qa && (null == (e2 = qa.terminate) || e2.call(qa)), qa = null, Xa = null;
}
function oi(e2) {
  Ga = !!e2, qa && qa.postMessage({ type: "init", debug: Ga });
}
function li(e2, n2 = true, t2 = 2e3, o2) {
  return d(this, null, function* () {
    performance.now();
    const l2 = Ua(e2);
    if (!Jn()) {
      const e3 = new Error("KaTeX rendering disabled");
      return e3.name = "KaTeXDisabled", e3.code = "KATEX_DISABLED", Promise.reject(e3);
    }
    if (Xa) return Promise.reject(Xa);
    const r2 = `${n2 ? "d" : "i"}:${l2}`, a2 = Ja.get(r2);
    if (a2) return Promise.resolve(a2);
    const i2 = qa || (Xa = new Error("[katexWorkerClient] No worker instance set. Please inject a Worker via setKaTeXWorker()."), Xa.name = "WorkerInitError", Xa.code = "WORKER_INIT_ERROR", null);
    if (!i2) return Promise.reject(Xa);
    if (Za.size >= Ya) {
      const e3 = new Error("Worker busy");
      return e3.name = "WorkerBusy", e3.code = "WORKER_BUSY", e3.busy = true, e3.inFlight = Za.size, e3.max = Ya, Promise.reject(e3);
    }
    return new Promise((e3, r3) => {
      if (null == o2 ? void 0 : o2.aborted) {
        const e4 = new Error("Aborted");
        return e4.name = "AbortError", void r3(e4);
      }
      const a3 = Math.random().toString(36).slice(2), s2 = globalThis.setTimeout(() => {
        Za.delete(a3);
        const e4 = new Error("Worker render timed out");
        e4.name = "WorkerTimeout", e4.code = "WORKER_TIMEOUT", r3(e4), ei();
      }, t2);
      o2 && o2.addEventListener("abort", () => {
        globalThis.clearTimeout(s2), Za.has(a3) && Za.delete(a3);
        const e4 = new Error("Aborted");
        e4.name = "AbortError", r3(e4), ei();
      }, { once: true });
      const u2 = e3, d2 = r3;
      Za.set(a3, { resolve: (e4) => {
        u2(e4);
      }, reject: (e4) => {
        d2(e4);
      }, timeoutId: s2 }), i2.postMessage({ id: a3, content: l2, displayMode: n2 });
    });
  });
}
function ri(e2, n2 = true, t2) {
  const o2 = `${n2 ? "d" : "i"}:${Ua(e2)}`;
  if (Ja.set(o2, t2), Ja.size > 200) {
    const e3 = Ja.keys().next().value;
    Ja.delete(e3);
  }
}
function ai() {
  return { inFlight: Za.size, max: Ya };
}
function ii(e2) {
  Number.isFinite(e2) && e2 > 0 && (Ya = Math.floor(e2));
}
var si = "WORKER_BUSY";
function ui() {
  return Za.size >= Ya;
}
function di(e2 = 2e3, n2) {
  return Za.size < Ya ? Promise.resolve() : new Promise((t2, o2) => {
    let l2, r2 = false;
    const a2 = () => {
      r2 || (r2 = true, l2 && globalThis.clearTimeout(l2), Qa.delete(a2), t2());
    };
    if (Qa.add(a2), l2 = globalThis.setTimeout(() => {
      if (r2) return;
      r2 = true, Qa.delete(a2);
      const e3 = new Error("Wait for worker slot timed out");
      e3.name = "WorkerBusyTimeout", e3.code = "WORKER_BUSY_TIMEOUT", o2(e3);
    }, e2), queueMicrotask(() => ei()), n2) {
      const e3 = () => {
        if (r2) return;
        r2 = true, l2 && globalThis.clearTimeout(l2), Qa.delete(a2);
        const e4 = new Error("Aborted");
        e4.name = "AbortError", o2(e4);
      };
      n2.aborted ? e3() : n2.addEventListener("abort", e3, { once: true });
    }
  });
}
var ci = { timeout: 2e3, waitTimeout: 1500, backoffMs: 30, maxRetries: 1 };
function mi(e2) {
  null != e2.timeout && (ci.timeout = Math.max(0, Math.floor(e2.timeout))), null != e2.waitTimeout && (ci.waitTimeout = Math.max(0, Math.floor(e2.waitTimeout))), null != e2.backoffMs && (ci.backoffMs = Math.max(0, Math.floor(e2.backoffMs))), null != e2.maxRetries && (ci.maxRetries = Math.max(0, Math.floor(e2.maxRetries)));
}
function hi() {
  return i({}, ci);
}
function fi(e2) {
  return d(this, arguments, function* (e3, n2 = true, t2 = {}) {
    var o2, l2, r2, a2;
    if (!Jn()) {
      const e4 = new Error("KaTeX rendering disabled");
      throw e4.name = "KaTeXDisabled", e4.code = "KATEX_DISABLED", e4;
    }
    const i2 = null != (o2 = t2.timeout) ? o2 : ci.timeout, s2 = null != (l2 = t2.waitTimeout) ? l2 : ci.waitTimeout, u2 = null != (r2 = t2.backoffMs) ? r2 : ci.backoffMs, d2 = null != (a2 = t2.maxRetries) ? a2 : ci.maxRetries, c = Number.isFinite(d2) ? Math.max(0, Math.min(Math.floor(d2), 8)) : ci.maxRetries, m = t2.signal;
    let h2 = 0;
    for (; ; ) {
      if (null == m ? void 0 : m.aborted) {
        const e4 = new Error("Aborted");
        throw e4.name = "AbortError", e4;
      }
      try {
        return yield li(e3, n2, i2, m);
      } catch (f) {
        if ((null == f ? void 0 : f.code) !== si || h2 >= c) throw f;
        if (h2++, yield di(s2, m).catch(() => {
        }), null == m ? void 0 : m.aborted) {
          const e4 = new Error("Aborted");
          throw e4.name = "AbortError", e4;
        }
        u2 > 0 && (yield new Promise((e4) => globalThis.setTimeout(e4, u2 * h2)));
      }
    }
  });
}
function pi(e2) {
  return JSON.stringify(e2);
}
function vi(e2) {
  var n2;
  const t2 = null != (n2 = e2.mode) ? n2 : "module", o2 = pi(e2.mermaidUrl), l2 = `
let DEBUG = false
let mermaid = null
let mermaidLoadError = null

function normalizeMermaidModule(mod) {
  if (!mod)
    return mod
  const candidate = (mod && mod.default) ? mod.default : mod
  if (candidate && (typeof candidate.render === 'function' || typeof candidate.parse === 'function' || typeof candidate.initialize === 'function'))
    return candidate
  if (candidate && candidate.mermaidAPI && (typeof candidate.mermaidAPI.render === 'function' || typeof candidate.mermaidAPI.parse === 'function')) {
    const api = candidate.mermaidAPI
    return {
      ...candidate,
      render: api.render ? api.render.bind(api) : undefined,
      parse: api.parse ? api.parse.bind(api) : undefined,
      initialize: (opts) => {
        if (typeof candidate.initialize === 'function')
          return candidate.initialize(opts)
        return api.initialize ? api.initialize(opts) : undefined
      },
    }
  }
  if (mod && mod.mermaid && typeof mod.mermaid.parse === 'function')
    return mod.mermaid
  return candidate
}

function applyThemeTo(code, theme) {
  const themeValue = theme === 'dark' ? 'dark' : 'default'
  const themeConfig = \`%%{init: {"theme": "\${themeValue}"}}%%\\n\`
  const trimmed = (code || '').trimStart()
  if (trimmed.startsWith('%%{'))
    return code
  return themeConfig + code
}

function findHeaderIndex(lines) {
  const headerRe = /^(?:graph|flowchart|flowchart\\s+tb|flowchart\\s+lr|sequenceDiagram|gantt|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|pie|quadrantChart|timeline|xychart(?:-beta)?)\\b/
  for (let i = 0; i < lines.length; i++) {
    const l = (lines[i] || '').trim()
    if (!l)
      continue
    if (l.startsWith('%%'))
      continue
    if (headerRe.test(l))
      return i
  }
  return -1
}

async function canParse(code, theme) {
  const themed = applyThemeTo(code, theme)
  const anyMermaid = mermaid
  if (anyMermaid && typeof anyMermaid.parse === 'function') {
    await anyMermaid.parse(themed)
    return true
  }
  throw new Error('mermaid.parse not available in worker')
}

async function findLastRenderablePrefix(baseCode, theme) {
  const lines = String(baseCode || '').split('\\n')
  const headerIdx = findHeaderIndex(lines)
  if (headerIdx === -1)
    return null
  const head = lines.slice(0, headerIdx + 1)
  await canParse(head.join('\\n'), theme)

  let low = headerIdx + 1
  let high = lines.length
  let lastGood = headerIdx + 1
  let tries = 0
  const MAX_TRIES = 12

  while (low <= high && tries < MAX_TRIES) {
    const mid = Math.floor((low + high) / 2)
    const candidate = [...head, ...lines.slice(headerIdx + 1, mid)].join('\\n')
    tries++
    try {
      await canParse(candidate, theme)
      lastGood = mid
      low = mid + 1
    }
    catch {
      high = mid - 1
    }
  }

  return [...head, ...lines.slice(headerIdx + 1, lastGood)].join('\\n')
}

function initMermaidOnce() {
  if (!mermaid)
    return
  try {
    if (typeof mermaid.initialize === 'function')
      mermaid.initialize(${pi(i({ startOnLoad: false, securityLevel: "strict", flowchart: { htmlLabels: false } }, e2.initializeOptions || {}))})
  }
  catch (e) {
    if (DEBUG)
      console.warn('[mermaid-cdn-worker] initialize failed', e)
  }
}

globalThis.addEventListener('message', async (ev) => {
  const msg = ev.data || {}
  if (msg.type === 'init') {
    DEBUG = !!msg.debug
    if (DEBUG)
      console.debug('[mermaid-cdn-worker] debug enabled')
    return
  }

  const id = msg.id
  const action = msg.action
  const payload = msg.payload || {}

  if (!mermaid) {
    const errMsg = mermaidLoadError ? String(mermaidLoadError?.message || mermaidLoadError) : 'Mermaid is not available in worker'
    globalThis.postMessage({ id, ok: false, error: errMsg })
    return
  }

  try {
    if (action === 'canParse') {
      const ok = await canParse(payload.code, payload.theme)
      globalThis.postMessage({ id, ok: true, result: ok })
      return
    }
    if (action === 'findPrefix') {
      const res = await findLastRenderablePrefix(payload.code, payload.theme)
      globalThis.postMessage({ id, ok: true, result: res })
      return
    }
    globalThis.postMessage({ id, ok: false, error: 'Unknown action' })
  }
  catch (e) {
    globalThis.postMessage({ id, ok: false, error: String(e?.message || e) })
  }
})
`.trimStart();
  return "module" === t2 ? `
${l2}

let loadPromise = null
async function loadMermaid() {
  if (mermaid || mermaidLoadError)
    return
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const mod = await import(${o2})
        mermaid = normalizeMermaidModule(mod) || null
        initMermaidOnce()
      }
      catch (e) {
        mermaidLoadError = e
      }
    })()
  }
  await loadPromise
}

// Load immediately; failures are reported per-request
await loadMermaid()
`.trimStart() : `
${l2}

function loadMermaidClassic() {
  if (mermaid || mermaidLoadError)
    return
  try {
    importScripts(${o2})
    mermaid = normalizeMermaidModule(globalThis.mermaid) || null
    initMermaidOnce()
  }
  catch (e) {
    mermaidLoadError = e
  }
}

loadMermaidClassic()
`.trimStart();
}
function gi(e2) {
  var n2, t2;
  const o2 = vi(e2);
  if ("undefined" == typeof Worker || "undefined" == typeof URL || "undefined" == typeof Blob) return { worker: null, dispose: () => {
  }, source: o2 };
  const l2 = new Blob([o2], { type: "text/javascript" }), r2 = URL.createObjectURL(l2);
  let a2 = false;
  const u2 = "module" === (null != (n2 = e2.mode) ? n2 : "module") ? s(i({}, null != (t2 = e2.workerOptions) ? t2 : {}), { type: "module" }) : e2.workerOptions, d2 = new Worker(r2, u2);
  if (e2.debug) try {
    d2.postMessage({ type: "init", debug: true });
  } catch (c) {
  }
  return { worker: d2, dispose: () => {
    if (!a2) {
      a2 = true;
      try {
        URL.revokeObjectURL(r2);
      } catch (c) {
      }
    }
  }, source: o2 };
}
var yi = null;
var wi = null;
var xi = /* @__PURE__ */ new Map();
var ki = 5;
var Ni = false;
function bi(e2) {
  Ni = !!e2;
}
function Mi(e2) {
  Number.isFinite(e2) && e2 > 0 && (ki = Math.floor(e2));
}
function Si() {
  return { inFlight: xi.size, max: ki };
}
var _i = "WORKER_BUSY";
var Bi = "MERMAID_DISABLED";
function Ci(e2) {
  yi = e2, wi = null;
  const n2 = e2;
  yi.onmessage = (e3) => {
    if (yi !== n2) return;
    const { id: t2, ok: o2, result: l2, error: r2 } = e3.data, a2 = xi.get(t2);
    a2 && (false === o2 || r2 ? a2.reject(new Error(r2 || "Unknown error")) : a2.resolve(l2));
  }, yi.onerror = (e3) => {
    var t2, o2;
    if (yi === n2) if (0 !== xi.size) {
      try {
        Ni ? console.error("[mermaidWorkerClient] Worker error:", (null == e3 ? void 0 : e3.message) || e3) : null == (o2 = console.debug) || o2.call(console, "[mermaidWorkerClient] Worker error:", (null == e3 ? void 0 : e3.message) || e3);
      } catch (l2) {
      }
      for (const [n3, t3] of xi.entries()) t3.reject(new Error(`Worker error: ${e3.message}`));
      xi.clear();
    } else null == (t2 = console.debug) || t2.call(console, "[mermaidWorkerClient] Worker error (no pending):", (null == e3 ? void 0 : e3.message) || e3);
  }, yi.onmessageerror = (e3) => {
    var t2, o2;
    if (yi === n2) if (0 !== xi.size) {
      try {
        Ni ? console.error("[mermaidWorkerClient] Worker messageerror:", e3) : null == (o2 = console.debug) || o2.call(console, "[mermaidWorkerClient] Worker messageerror:", e3);
      } catch (l2) {
      }
      for (const [e4, n3] of xi.entries()) n3.reject(new Error("Worker messageerror"));
      xi.clear();
    } else null == (t2 = console.debug) || t2.call(console, "[mermaidWorkerClient] Worker messageerror (no pending):", e3);
  };
}
function Li() {
  var e2;
  if (yi) try {
    for (const [e3, n2] of xi.entries()) n2.reject(new Error("Worker cleared"));
    xi.clear(), null == (e2 = yi.terminate) || e2.call(yi);
  } catch (n2) {
  }
  yi = null, wi = null;
}
function Oi(e2, n2, t2 = 1400) {
  if (!Pa()) {
    const e3 = new Error("Mermaid rendering disabled");
    return e3.name = "MermaidDisabled", e3.code = Bi, Promise.reject(e3);
  }
  if (wi) return Promise.reject(wi);
  const o2 = yi || (wi = new Error("[mermaidWorkerClient] No worker instance set. Please inject a Worker via setMermaidWorker()."), wi.name = "WorkerInitError", wi.code = "WORKER_INIT_ERROR", null);
  if (!o2) return Promise.reject(wi);
  if (xi.size >= ki) {
    const e3 = new Error("Worker busy");
    return e3.name = "WorkerBusy", e3.code = _i, e3.inFlight = xi.size, e3.max = ki, Promise.reject(e3);
  }
  return new Promise((l2, r2) => {
    const a2 = Math.random().toString(36).slice(2);
    let i2, s2 = false;
    const u2 = () => {
      s2 || (s2 = true, null != i2 && globalThis.clearTimeout(i2), xi.delete(a2));
    }, d2 = { resolve: (e3) => {
      u2(), l2(e3);
    }, reject: (e3) => {
      u2(), r2(e3);
    } };
    xi.set(a2, d2);
    try {
      o2.postMessage({ id: a2, action: e2, payload: n2 });
    } catch (c) {
      return xi.delete(a2), void r2(c);
    }
    i2 = globalThis.setTimeout(() => {
      const e3 = new Error("Worker call timed out");
      e3.name = "WorkerTimeout", e3.code = "WORKER_TIMEOUT";
      const n3 = xi.get(a2);
      n3 && n3.reject(e3);
    }, t2);
  });
}
function Ei(e2, n2, t2 = 1400) {
  return d(this, null, function* () {
    try {
      return yield Oi("canParse", { code: e2, theme: n2 }, t2);
    } catch (o2) {
      return Promise.reject(o2);
    }
  });
}
function Ti(e2, n2, t2 = 1400) {
  return d(this, null, function* () {
    try {
      return yield Oi("findPrefix", { code: e2, theme: n2 }, t2);
    } catch (o2) {
      return Promise.reject(o2);
    }
  });
}
function Ii() {
  if (yi) try {
    for (const [e2, n2] of xi.entries()) n2.reject(new Error("Worker terminated"));
    xi.clear(), yi.terminate();
  } finally {
    yi = null;
  }
}
var Ai = defineAsyncComponent(() => import("./index7-CGAZDPXO.js"));
var $i = defineAsyncComponent(() => import("./index3-35QX5BG4.js"));
var Hi = defineAsyncComponent(() => import("./index2-UUL5H4G2.js"));
var Ri = defineAsyncComponent(() => import("./index4-QF3KIZQO.js"));
var zi = defineAsyncComponent(() => import("./index5-XBSX6WJD.js"));
var Pi = defineAsyncComponent(() => import("./index6-GEAYPF5B.js"));
var Wi = { AdmonitionNode: Ma, BlockquoteNode: Te, CheckboxNode: He, CodeBlockNode: Ai, DefinitionListNode: We, EmojiNode: Fe, EmphasisNode: Bt, FootnoteNode: Tt, FootnoteReferenceNode: Qe, FootnoteAnchorNode: Lt, HardBreakNode: At, HeadingNode: Ht, HtmlBlockNode: Vt, HtmlInlineNode: dn, HighlightNode: St, ImageNode: jn, D2BlockNode: Pi, InfographicBlockNode: zi, InlineCodeNode: hn, PreCodeNode: Zt, InsertNode: bt, LinkNode: kt, ListItemNode: Rt, ListNode: zt, MathBlockNode: $i, MathInlineNode: Hi, MermaidBlockNode: Ri, ParagraphNode: qt, StrikethroughNode: vt, StrongNode: ft, SubscriptNode: mt, SuperscriptNode: ut, TableNode: to, TextNode: ot, ThematicBreakNode: lo, VmrContainerNode: io, ReferenceNode: at, MarkdownCodeBlockNode: ra };
var ji = { install(e2, n2) {
  Object.entries(Wi).forEach(([n3, t2]) => {
    e2.component(n3, t2);
  }), (null == n2 ? void 0 : n2.iconTheme) && ur(n2.iconTheme), (null == n2 ? void 0 : n2.getLanguageIcon) && Nr(n2.getLanguageIcon), (null == n2 ? void 0 : n2.mathOptions) && setDefaultMathOptions(n2.mathOptions);
} };

export {
  setDefaultMathOptions,
  applyContainers,
  VOID_HTML_TAG_NAMES,
  INLINE_HTML_TAG_NAMES,
  BLOCK_HTML_TAG_NAMES,
  SVG_HTML_TAG_NAMES,
  EXTENDED_STANDARD_HTML_TAG_NAMES,
  DANGEROUS_HTML_ATTR_NAMES,
  URL_HTML_ATTR_NAMES,
  BLOCKED_HTML_TAG_NAMES,
  NON_STRUCTURING_HTML_TAG_NAMES,
  VOID_HTML_TAGS,
  STANDARD_BLOCK_HTML_TAGS,
  STANDARD_HTML_TAGS,
  EXTENDED_STANDARD_HTML_TAGS,
  DANGEROUS_HTML_ATTRS,
  URL_HTML_ATTRS,
  BLOCKED_HTML_TAGS,
  NON_STRUCTURING_HTML_TAGS,
  stripHtmlControlAndWhitespace,
  isUnsafeHtmlUrl,
  isHtmlLikeTagName,
  normalizeCustomHtmlTagName,
  normalizeCustomHtmlTags,
  mergeCustomHtmlTags,
  resolveCustomHtmlTags,
  getHtmlTagFromContent,
  hasCompleteHtmlTagContent,
  shouldRenderUnknownHtmlTagAsText,
  stripCustomHtmlWrapper,
  findMatchingClose,
  TEX_BRACE_COMMANDS,
  ESCAPED_TEX_BRACE_COMMANDS,
  isMathLike,
  KATEX_COMMANDS,
  normalizeStandaloneBackslashT,
  applyMath,
  parseFenceToken,
  parseInlineTokens,
  parseMarkdownToStructure,
  processTokens,
  SAFE_ALLOWED_HTML_TAGS,
  isHtmlTagBlocked,
  isHtmlTagHardBlocked,
  isCustomHtmlComponentTag,
  sanitizeHtmlAttrs,
  tokenAttrsToRecord,
  sanitizeHtmlTokenAttrs,
  convertHtmlPropValue,
  convertHtmlAttrsToProps,
  tokenizeHtml,
  hasCustomHtmlComponents,
  sanitizeHtmlContent,
  registerMarkdownPlugin,
  clearRegisteredMarkdownPlugins,
  getMarkdown,
  Ee,
  Te,
  He,
  We,
  Fe,
  qe,
  Xe,
  Ge,
  Ze,
  Qe,
  dn,
  hn,
  vn,
  Ln,
  On,
  Tn,
  $n,
  jn,
  Xn,
  Gn,
  Zn,
  Jn,
  Yn,
  Qn,
  ot,
  at,
  ut,
  mt,
  ft,
  vt,
  kt,
  bt,
  St,
  Bt,
  Lt,
  Tt,
  At,
  Ht,
  Rt,
  zt,
  jt,
  Vt,
  qt,
  Zt,
  to,
  lo,
  io,
  so,
  jl,
  Fl,
  Dl,
  Kl,
  Ul,
  ql,
  Jl,
  nr,
  tr,
  sr,
  ur,
  dr,
  mr,
  hr2 as hr,
  fr,
  pr,
  xr,
  Nr,
  br,
  Mr,
  Sr,
  _r,
  Br,
  Cr,
  Lr,
  Or,
  Er,
  Tr,
  Ir,
  Qr,
  ra,
  ia,
  pa,
  Ma,
  Ca,
  La,
  Oa,
  Ea,
  Ta,
  Ha,
  Ra,
  za,
  Pa,
  Fa,
  Ka,
  Va,
  Ua,
  ni,
  ti,
  oi,
  li,
  ri,
  ai,
  ii,
  si,
  ui,
  di,
  mi,
  hi,
  fi,
  vi,
  gi,
  bi,
  Mi,
  Si,
  _i,
  Bi,
  Ci,
  Li,
  Ei,
  Ti,
  Ii,
  Ai,
  $i,
  Hi,
  Ri,
  zi,
  Pi,
  ji
};
//# sourceMappingURL=chunk-VF4QCHVU.js.map
