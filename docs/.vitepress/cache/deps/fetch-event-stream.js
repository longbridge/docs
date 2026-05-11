import {
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk-7N2WBUNW.js";

// node_modules/fetch-event-stream/esm/deps/jsr.io/@std/streams/0.221.0/text_line_stream.js
var _currentLine;
var TextLineStream = class extends TransformStream {
  /** Constructs a new instance. */
  constructor(options = { allowCR: false }) {
    super({
      transform: (chars, controller) => {
        chars = __privateGet(this, _currentLine) + chars;
        while (true) {
          const lfIndex = chars.indexOf("\n");
          const crIndex = options.allowCR ? chars.indexOf("\r") : -1;
          if (crIndex !== -1 && crIndex !== chars.length - 1 && (lfIndex === -1 || lfIndex - 1 > crIndex)) {
            controller.enqueue(chars.slice(0, crIndex));
            chars = chars.slice(crIndex + 1);
            continue;
          }
          if (lfIndex === -1)
            break;
          const endIndex = chars[lfIndex - 1] === "\r" ? lfIndex - 1 : lfIndex;
          controller.enqueue(chars.slice(0, endIndex));
          chars = chars.slice(lfIndex + 1);
        }
        __privateSet(this, _currentLine, chars);
      },
      flush: (controller) => {
        if (__privateGet(this, _currentLine) === "")
          return;
        const currentLine = options.allowCR && __privateGet(this, _currentLine).endsWith("\r") ? __privateGet(this, _currentLine).slice(0, -1) : __privateGet(this, _currentLine);
        controller.enqueue(currentLine);
      }
    });
    __privateAdd(this, _currentLine, "");
  }
};
_currentLine = new WeakMap();

// node_modules/fetch-event-stream/esm/utils.js
function stream(input) {
  let decoder = new TextDecoderStream();
  let split2 = new TextLineStream({ allowCR: true });
  return input.pipeThrough(decoder).pipeThrough(split2);
}
function split(input) {
  let rgx = /[:]\s*/;
  let match = rgx.exec(input);
  let idx = match && match.index;
  if (idx) {
    return [
      input.substring(0, idx),
      input.substring(idx + match[0].length)
    ];
  }
}
function fallback(headers, key, value) {
  let tmp = headers.get(key);
  if (!tmp)
    headers.set(key, value);
}

// node_modules/fetch-event-stream/esm/mod.js
async function* events(res, signal) {
  if (!res.body)
    return;
  let iter = stream(res.body);
  let line, reader = iter.getReader();
  let event;
  for (; ; ) {
    if (signal && signal.aborted) {
      return reader.cancel();
    }
    line = await reader.read();
    if (line.done)
      return;
    if (!line.value) {
      if (event)
        yield event;
      event = void 0;
      continue;
    }
    let [field, value] = split(line.value) || [];
    if (field === "data") {
      event || (event = {});
      event[field] = event[field] ? event[field] + "\n" + value : value;
    } else if (field === "event") {
      event || (event = {});
      event[field] = value;
    } else if (field === "id") {
      event || (event = {});
      event[field] = String(+value) === value ? +value : value;
    } else if (field === "retry") {
      event || (event = {});
      event[field] = +value || void 0;
    }
  }
}
async function stream2(input, init) {
  let req = new Request(input, init);
  fallback(req.headers, "Accept", "text/event-stream");
  fallback(req.headers, "Content-Type", "application/json");
  let r = await fetch(req);
  if (!r.ok)
    throw r;
  return events(r, req.signal);
}
export {
  events,
  stream2 as stream
};
//# sourceMappingURL=fetch-event-stream.js.map
