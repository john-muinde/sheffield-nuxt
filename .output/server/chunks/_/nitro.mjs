import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import vt from 'node:http';
import Bs from 'node:https';
import { toValue } from 'vue';
import { promises, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createConsola as createConsola$1 } from 'consola/core';
import { resolveSitePath as resolveSitePath$1, fixSlashes as fixSlashes$1 } from 'nuxt-site-config/urls';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';
import { dirname as dirname$1, resolve as resolve$2, join } from 'node:path';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField$3(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new vt.Agent(agentOptions);
  const httpsAgent = new Bs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
createFetch$1({ fetch, Headers: Headers$1, AbortController: AbortController$1 });

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive$1(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive$1(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive$1(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive$1(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(config.url, { acceptRelative: true, strict: false }))
    config.url = withHttps(config.url);
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0)
      return;
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2].split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length > 0)
      stack.push(entry);
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined") {
          siteConfig[k] = val;
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

function envSiteConfig(env) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(/^NUXT_(PUBLIC_)?SITE_/, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

function useSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _BOlcQVLrux = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(useSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const plugins = [
  _BOlcQVLrux
];

const assets$1 = {
  "/.htaccess": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"165-LlGsO/2UF2qDsiKQEMRMAUMx0x4\"",
    "mtime": "2024-12-10T06:30:43.137Z",
    "size": 357,
    "path": "../public/.htaccess"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"1d8a-j6q8h8fObd3mcX6qXmGYkUraSZ8\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 7562,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"4ecf-XSYFxiUpvyPp2ql7iHsPFm7VXOE\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 20175,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"1b5f-b7OIVua+Jnx5HXlGVauq1ctNuYQ\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 7007,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"229-ldVArbrcDMNcVlc8+w3pcS3pB3w\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 553,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"4a3-S2DXet+8308obTh4Rh8xqLH3JhM\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 1187,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-Hy7hKWeOF/g52A6lXHXc3/4dz0o\"",
    "mtime": "2024-12-04T03:24:46.000Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/main_sitemap.xml": {
    "type": "application/xml",
    "etag": "\"185a26-/mHSd50mXvUEJhtN0QEOmqNQr+k\"",
    "mtime": "2024-12-16T10:24:33.702Z",
    "size": 1595942,
    "path": "../public/main_sitemap.xml"
  },
  "/placeholder_image.webp": {
    "type": "image/webp",
    "etag": "\"a3ea-LNxuIB5EPPpFs6U6zgN71idXtts\"",
    "mtime": "2024-12-04T09:28:46.279Z",
    "size": 41962,
    "path": "../public/placeholder_image.webp"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-rcg7GeeTSRscbqD9i0bNnzLlkvw\"",
    "mtime": "2024-11-20T16:44:22.000Z",
    "size": 1,
    "path": "../public/robots.txt"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1bb-5DeEO3bI1c5t75biEAHjJGTZpnM\"",
    "mtime": "2024-12-11T06:56:33.806Z",
    "size": 443,
    "path": "../public/site.webmanifest"
  },
  "/assets/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-m0pN7sBBVWdwRCLBlrqXBYZ55Tg\"",
    "mtime": "2024-12-02T12:49:20.849Z",
    "size": 10244,
    "path": "../public/assets/.DS_Store"
  },
  "/assets/vue.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f0-4hXJ6NQY+M4nORm2NfiTNkqISLc\"",
    "mtime": "2024-12-02T12:49:20.848Z",
    "size": 496,
    "path": "../public/assets/vue.svg"
  },
  "/dearflip/.gitignore": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3d4-RR3uaVwSbnJB5vvbfLOnaH4occc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 980,
    "path": "../public/dearflip/.gitignore"
  },
  "/dearflip/package.json": {
    "type": "application/json",
    "etag": "\"31e-NZc5SmNSNPiNYkwrCZqQfJbM61s\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 798,
    "path": "../public/dearflip/package.json"
  },
  "/dearflip/README.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"101b-BUwhL2je0ugPFzziuQlWPSaVzgU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 4123,
    "path": "../public/dearflip/README.md"
  },
  "/_nuxt/2av4FzaR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12d02-Zt1EC3oqoA7i2bQ+GP16o6zs0Bw\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 77058,
    "path": "../public/_nuxt/2av4FzaR.js"
  },
  "/_nuxt/2BD0JVLh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f5-niplXW2z8Kdfq95z6tkEKFiNqf0\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 2293,
    "path": "../public/_nuxt/2BD0JVLh.js"
  },
  "/_nuxt/aux5kt-K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8cf4-KXVskQpAtng2UUDgYyxUJuUMKI0\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 36084,
    "path": "../public/_nuxt/aux5kt-K.js"
  },
  "/_nuxt/B1EP3yko.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32922-mOmLJx+Hx8g0n4YtE3pLnyisFrw\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 207138,
    "path": "../public/_nuxt/B1EP3yko.js"
  },
  "/_nuxt/B65S4g6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d52-b3eegdWBExgkeN82BMLGsdmlrOY\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 3410,
    "path": "../public/_nuxt/B65S4g6f.js"
  },
  "/_nuxt/BB6sloI6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4011-bHbqJgRbtS6C5NpnKuFsqSYDwNY\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 16401,
    "path": "../public/_nuxt/BB6sloI6.js"
  },
  "/_nuxt/BE6UyyAW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2297-c2Vj328q0eGfSjuh9z0kYIJP220\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 8855,
    "path": "../public/_nuxt/BE6UyyAW.js"
  },
  "/_nuxt/BEi0NkPb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c34e-ZbwJN38gx8v7AYvDLUqX04SMCpI\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 115534,
    "path": "../public/_nuxt/BEi0NkPb.js"
  },
  "/_nuxt/Bhom5YRo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"561-s+dcjA3hU6MK04zZeuftrX3hfGg\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 1377,
    "path": "../public/_nuxt/Bhom5YRo.js"
  },
  "/_nuxt/BJy8LehP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e991-dKraV+DaMeF8rdPIvB1ZCBRmxTo\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 59793,
    "path": "../public/_nuxt/BJy8LehP.js"
  },
  "/_nuxt/blogs.BiTTuJ_O.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"265-NAALBEJYgUpj3CfBtv+idnCTkzw\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 613,
    "path": "../public/_nuxt/blogs.BiTTuJ_O.css"
  },
  "/_nuxt/BmLJzBl3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b90-HkiPcSyUOllbLjm0j7rZCu7DLPo\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 2960,
    "path": "../public/_nuxt/BmLJzBl3.js"
  },
  "/_nuxt/BmmWMtwu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dd9-ifCfByQc5tcuiY4FrQYKoLk95mI\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 3545,
    "path": "../public/_nuxt/BmmWMtwu.js"
  },
  "/_nuxt/BosuxZz1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b3-Gs2c8CozuFz8HQpV2+LRxv0gz5Q\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 691,
    "path": "../public/_nuxt/BosuxZz1.js"
  },
  "/_nuxt/BraPXZiz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1172-9JLhlx5j0xp/HGhEyqql7ohxEag\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 4466,
    "path": "../public/_nuxt/BraPXZiz.js"
  },
  "/_nuxt/brochures-and-catalogs.C4awO-T1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b9-J1cZn8WKjBHGVXulcBQs9sKYtY8\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 697,
    "path": "../public/_nuxt/brochures-and-catalogs.C4awO-T1.css"
  },
  "/_nuxt/BsbfrSOA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cb7-TNFPYEB7QscZNlMWMuaJ8A360ao\"",
    "mtime": "2024-12-16T13:16:45.959Z",
    "size": 7351,
    "path": "../public/_nuxt/BsbfrSOA.js"
  },
  "/_nuxt/BuNY-NiQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14d3e-NbLDc1kXvDkuCqsKjJHYPrImJRA\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 85310,
    "path": "../public/_nuxt/BuNY-NiQ.js"
  },
  "/_nuxt/BuoUW_pf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ee9-mEkI3go1C8LjFw6eZpZK0qNO94w\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 12009,
    "path": "../public/_nuxt/BuoUW_pf.js"
  },
  "/_nuxt/BXOSX9XK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"358-dhC2owh2i0/6TpytybSmmCAU/og\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 856,
    "path": "../public/_nuxt/BXOSX9XK.js"
  },
  "/_nuxt/BY6PF-SL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1356-a/r++d/MLz0OucFVzsal6xbTRPc\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 4950,
    "path": "../public/_nuxt/BY6PF-SL.js"
  },
  "/_nuxt/B_KAXnXH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15f2-NRyCXlx379gRAPJEbvk0dDh8xaI\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 5618,
    "path": "../public/_nuxt/B_KAXnXH.js"
  },
  "/_nuxt/C0q1g4vS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"672e-U8mDi09UgpilhHQY2OcUvAxsaGw\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 26414,
    "path": "../public/_nuxt/C0q1g4vS.js"
  },
  "/_nuxt/C6-auSY3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a1-QpxVkVtKaXdxeFA0gJ/Hj0pMJxg\"",
    "mtime": "2024-12-16T13:16:45.966Z",
    "size": 1697,
    "path": "../public/_nuxt/C6-auSY3.js"
  },
  "/_nuxt/careers.BHB41rMJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19b8-IiF+Eg1/7SiVggA2+7oQic9MjFA\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 6584,
    "path": "../public/_nuxt/careers.BHB41rMJ.css"
  },
  "/_nuxt/CcsQ7vsL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12ad-lSwb4HJqN8ZzebozGlHdlrNCUbo\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 4781,
    "path": "../public/_nuxt/CcsQ7vsL.js"
  },
  "/_nuxt/Cfr-fC7s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18ef-IXqKzUFJbSFvz/lVy9Vsc21KzIw\"",
    "mtime": "2024-12-16T13:16:45.962Z",
    "size": 6383,
    "path": "../public/_nuxt/Cfr-fC7s.js"
  },
  "/_nuxt/CjnnjkNs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"550d-Fv2+84v6yro3cLtY15bHeB8mNtA\"",
    "mtime": "2024-12-16T13:16:45.961Z",
    "size": 21773,
    "path": "../public/_nuxt/CjnnjkNs.js"
  },
  "/_nuxt/CkcNygjG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1103-pkRBUzgQuq0gpNtF1fVZvmUXIn8\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 4355,
    "path": "../public/_nuxt/CkcNygjG.js"
  },
  "/_nuxt/CMxS628G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"551c-DziMPYsn7eYhJ4AF0eh4R7NqHZo\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 21788,
    "path": "../public/_nuxt/CMxS628G.js"
  },
  "/_nuxt/consultancy-and-design.DbecIXp3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a81-dKUnnwMNh7ugkxq6W4jc3HVrDN8\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 2689,
    "path": "../public/_nuxt/consultancy-and-design.DbecIXp3.css"
  },
  "/_nuxt/contact-us.D_SoQ-Ih.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"245-X9ZWFdSPmucx3+sqId4rpwgdto0\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 581,
    "path": "../public/_nuxt/contact-us.D_SoQ-Ih.css"
  },
  "/_nuxt/ContentState.Dx_TUrC7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e82-653Hwt9ZgthbzxWqhCz2AgoxV1Q\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 3714,
    "path": "../public/_nuxt/ContentState.Dx_TUrC7.css"
  },
  "/_nuxt/CQtZMqEo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b5f8-ZUiXdUGLy7x3Q2Ta8mgPz+kpZrQ\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 112120,
    "path": "../public/_nuxt/CQtZMqEo.js"
  },
  "/_nuxt/CsnlWeRN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"549-JNQ9FhChPjqrOqLiI2Vu8BoPGyM\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 1353,
    "path": "../public/_nuxt/CsnlWeRN.js"
  },
  "/_nuxt/CuKAsg3J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f3d-rt1XPE5ERsw0Px4FAroxhMWQcxI\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 16189,
    "path": "../public/_nuxt/CuKAsg3J.js"
  },
  "/_nuxt/CZuYlZUe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"307f-If/fTSm10KoxiEIk6qhVsIytC/Q\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 12415,
    "path": "../public/_nuxt/CZuYlZUe.js"
  },
  "/_nuxt/D-qAyMuh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19633-2tLp7cQLh2L1tw/9oGrSzJ6S0ts\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 103987,
    "path": "../public/_nuxt/D-qAyMuh.js"
  },
  "/_nuxt/D2NZN4vT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6683-EZ5ywJqMZsjSxGhKllWVsCs5RpA\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 26243,
    "path": "../public/_nuxt/D2NZN4vT.js"
  },
  "/_nuxt/D3l_0aZV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5fcf1-iSykCTuMe/NCxW03/SFIY1hhhK8\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 392433,
    "path": "../public/_nuxt/D3l_0aZV.js"
  },
  "/_nuxt/D6K4vTTR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ec-a5SrwLQuOk0JEwAtOVbhuG16ock\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 2284,
    "path": "../public/_nuxt/D6K4vTTR.js"
  },
  "/_nuxt/D9tU51up.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2960-Inp4sVY8UCshfBUN0Vk1ZfhqAog\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 10592,
    "path": "../public/_nuxt/D9tU51up.js"
  },
  "/_nuxt/default.MrKA4IK1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e26-3gpLCEqVzPKkDc41B109RB7FzSA\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 7718,
    "path": "../public/_nuxt/default.MrKA4IK1.css"
  },
  "/_nuxt/Demxs9vh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec4-eNE6JXFOS6cqsOmVC2wLCxi/7ko\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 3780,
    "path": "../public/_nuxt/Demxs9vh.js"
  },
  "/_nuxt/DEuxkUXt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17f-rtm2Zj4Zy5ddoJdc0Ahmk+Qlfbw\"",
    "mtime": "2024-12-16T13:16:45.966Z",
    "size": 383,
    "path": "../public/_nuxt/DEuxkUXt.js"
  },
  "/_nuxt/Dexhekq4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cfc-aoEMwebxsG8QtCUYa5V30VBAvuU\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 3324,
    "path": "../public/_nuxt/Dexhekq4.js"
  },
  "/_nuxt/DfPtZYg-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6461-DnCivIDtXbnEssFIKM2uCyQPIB8\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 25697,
    "path": "../public/_nuxt/DfPtZYg-.js"
  },
  "/_nuxt/DFQs3ReE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f2-lgGKwnHlcjtMV5D5NZuMnZyEes4\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 2034,
    "path": "../public/_nuxt/DFQs3ReE.js"
  },
  "/_nuxt/DHGAhXfO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8c52-sPekNWETxydWqVVnj6rn/fIF7sw\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 35922,
    "path": "../public/_nuxt/DHGAhXfO.js"
  },
  "/_nuxt/DiDZWpv-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10a8-Ilhb2QJuaCGZakJyuYIO0PEUnhI\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 4264,
    "path": "../public/_nuxt/DiDZWpv-.js"
  },
  "/_nuxt/Diy7KXZi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2c-fVxd/zjpVi5aLN4SPoZ03eLQjpI\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 3372,
    "path": "../public/_nuxt/Diy7KXZi.js"
  },
  "/_nuxt/DLeD4HGb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"246f-C42RzOVGst/XRY2xqhf95q1t3xE\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 9327,
    "path": "../public/_nuxt/DLeD4HGb.js"
  },
  "/_nuxt/DlY3-ID7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12fe-nqQDHV+GK9Q7++4HB34okPpOoNA\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 4862,
    "path": "../public/_nuxt/DlY3-ID7.js"
  },
  "/_nuxt/Dm5d7Wye.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"79f-ugUawZIb9vZ1v8vcpxituQNTYWA\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 1951,
    "path": "../public/_nuxt/Dm5d7Wye.js"
  },
  "/_nuxt/Dpf6BWeS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13b7-FDSPxfOHIpPHXhAUUT1q0NZQ20c\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 5047,
    "path": "../public/_nuxt/Dpf6BWeS.js"
  },
  "/_nuxt/DVli34jq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10ec-bporWebVE3AvRz2GE2AJJ2DBf7E\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 4332,
    "path": "../public/_nuxt/DVli34jq.js"
  },
  "/_nuxt/DXJRCQDk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22c9-P9351uR7S+sbrzjtPk/FRcaVT08\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 8905,
    "path": "../public/_nuxt/DXJRCQDk.js"
  },
  "/_nuxt/DZ1oNqWa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dff-dkclcbLWZani72fzgU6zuRJozGk\"",
    "mtime": "2024-12-16T13:16:45.970Z",
    "size": 3583,
    "path": "../public/_nuxt/DZ1oNqWa.js"
  },
  "/_nuxt/entry.B0b_3z4T.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"76-CDQoouRgFWCPiMclGbN+epGTMOs\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 118,
    "path": "../public/_nuxt/entry.B0b_3z4T.css"
  },
  "/_nuxt/error-404.cEmUNyxp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-SdihvCQPvoXinRf/wSOAzbKP+44\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.cEmUNyxp.css"
  },
  "/_nuxt/error-500.BInHDAkn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-i6xwOB651WplF0+ERsedcNBaYsI\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.BInHDAkn.css"
  },
  "/_nuxt/F0j9aAF9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d24-8BXmTg00JU03g+Puc0XCYXXSSrA\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 3364,
    "path": "../public/_nuxt/F0j9aAF9.js"
  },
  "/_nuxt/faq.v4_bOzNi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d2-F1+sD+Bqbd2P1ZgRbDtaFQgVWd0\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 210,
    "path": "../public/_nuxt/faq.v4_bOzNi.css"
  },
  "/_nuxt/gallery.Brxc1ER3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"90b-bOsarFDTBFHp8ZB+Ri5/r5uVcdI\"",
    "mtime": "2024-12-16T13:16:45.945Z",
    "size": 2315,
    "path": "../public/_nuxt/gallery.Brxc1ER3.css"
  },
  "/_nuxt/in-the-news.B09aBegM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14f-2JL9yowJcZ5peu5gBoQZTeEia/c\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 335,
    "path": "../public/_nuxt/in-the-news.B09aBegM.css"
  },
  "/_nuxt/index.BTEzwJiC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26b-EBdIXuYRxmUgt34a7c2/SSO8M6g\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 619,
    "path": "../public/_nuxt/index.BTEzwJiC.css"
  },
  "/_nuxt/index.C7Gy98hj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9d9-gilj9CZgeUa3NL4Uo65/LbF2/Uc\"",
    "mtime": "2024-12-16T13:16:45.950Z",
    "size": 2521,
    "path": "../public/_nuxt/index.C7Gy98hj.css"
  },
  "/_nuxt/index.CeYr8xXU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"670b-UiZH2TfuTy2rSXWILmm2jdYmYYk\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 26379,
    "path": "../public/_nuxt/index.CeYr8xXU.css"
  },
  "/_nuxt/index.CFa6obeS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d64a-FOMSwCggnwy2tTAvBb3Vf6TXCUg\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 54858,
    "path": "../public/_nuxt/index.CFa6obeS.css"
  },
  "/_nuxt/index.DibC_ZJq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"912-+dnYic8vAaWt7pU4Lljyl+5WT3k\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 2322,
    "path": "../public/_nuxt/index.DibC_ZJq.css"
  },
  "/_nuxt/index.J7d1F9mt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c6c-fSL/FU8kJefe3rpPgx6PCea6DhM\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 3180,
    "path": "../public/_nuxt/index.J7d1F9mt.css"
  },
  "/_nuxt/kdAzBprg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe-FgfFqJS7bD+aLcwYrvqthLPv9gs\"",
    "mtime": "2024-12-16T13:16:45.966Z",
    "size": 510,
    "path": "../public/_nuxt/kdAzBprg.js"
  },
  "/_nuxt/LoadingData.q-EsD9hS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e9-O4MblkOVP6P+9qoeiTm3oUpWeHY\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 489,
    "path": "../public/_nuxt/LoadingData.q-EsD9hS.css"
  },
  "/_nuxt/neuz7hQt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"566-rMGJFUeWtokk6DqzW8XOyh4JjLk\"",
    "mtime": "2024-12-16T13:16:45.969Z",
    "size": 1382,
    "path": "../public/_nuxt/neuz7hQt.js"
  },
  "/_nuxt/newsletters.DAr2NRmG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"295-CjxjrvwnMFRQlM6L7FL8GTTQWTQ\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 661,
    "path": "../public/_nuxt/newsletters.DAr2NRmG.css"
  },
  "/_nuxt/nwq8ocRX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1125-WHU3ARRAorbF2sxsWK4WhOCEky0\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 4389,
    "path": "../public/_nuxt/nwq8ocRX.js"
  },
  "/_nuxt/OeBIwUlD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25c5-inErl2ayyjYOw+/fYqH5j4XqQ+Q\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 9669,
    "path": "../public/_nuxt/OeBIwUlD.js"
  },
  "/_nuxt/P4DaOtC3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1dce-QVhU/smdHMJGWgOhSL6p0ZktdfU\"",
    "mtime": "2024-12-16T13:16:45.960Z",
    "size": 7630,
    "path": "../public/_nuxt/P4DaOtC3.js"
  },
  "/_nuxt/PliGzVIw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25e3-PM2+FfR6WwZ0SJNFV/7s/UXi9R0\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 9699,
    "path": "../public/_nuxt/PliGzVIw.js"
  },
  "/_nuxt/request-for-quote.BBs9DdE-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d1f7-S1G82+LsphXSiGFQGphWj8L8mkY\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 119287,
    "path": "../public/_nuxt/request-for-quote.BBs9DdE-.css"
  },
  "/_nuxt/rLPadPUy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d63-icXp6V0m6INJwE7qiNpVqil/0BY\"",
    "mtime": "2024-12-16T13:16:45.956Z",
    "size": 7523,
    "path": "../public/_nuxt/rLPadPUy.js"
  },
  "/_nuxt/sheffield-advantage.CCU3QVIC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77a-Rxxw4Sp1YE/OSwUfFhjvKv/yBkM\"",
    "mtime": "2024-12-16T13:16:45.949Z",
    "size": 1914,
    "path": "../public/_nuxt/sheffield-advantage.CCU3QVIC.css"
  },
  "/_nuxt/terms-and-conditions.4v-Iwixn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"103-DXzBiei/aBCpCP3vf36a4zmloGs\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 259,
    "path": "../public/_nuxt/terms-and-conditions.4v-Iwixn.css"
  },
  "/_nuxt/thbEf8PC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f1e-I/9toDzcC1s/E9pPFA3dh7BUBRA\"",
    "mtime": "2024-12-16T13:16:45.965Z",
    "size": 3870,
    "path": "../public/_nuxt/thbEf8PC.js"
  },
  "/_nuxt/ty7P23--.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2663-fBbqDMYkGGbIzAz4PV+OCrFuE7s\"",
    "mtime": "2024-12-16T13:16:45.957Z",
    "size": 9827,
    "path": "../public/_nuxt/ty7P23--.js"
  },
  "/_nuxt/videos.Cp7kQkRe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6f-YlUICePmoth2343o7OxCj9K6TPE\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 111,
    "path": "../public/_nuxt/videos.Cp7kQkRe.css"
  },
  "/_nuxt/ygn6Bf-i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41-nW6xxCRu1JKSVj6pJR4epymQdQY\"",
    "mtime": "2024-12-16T13:16:45.955Z",
    "size": 65,
    "path": "../public/_nuxt/ygn6Bf-i.js"
  },
  "/_nuxt/_...B3-7j9sk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"642-7s/N82TsUa8ylqt/IEKduci/coI\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 1602,
    "path": "../public/_nuxt/_...B3-7j9sk.css"
  },
  "/_nuxt/_...Cn_uPCym.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d5e-p9rhNAyvAhLORV/yGM/wrUyaAa0\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 3422,
    "path": "../public/_nuxt/_...Cn_uPCym.css"
  },
  "/_nuxt/_...f-6c5nKE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d5e-vUN8KOAIbaSN2bdH8eil9OWaCho\"",
    "mtime": "2024-12-16T13:16:45.954Z",
    "size": 3422,
    "path": "../public/_nuxt/_...f-6c5nKE.css"
  },
  "/_nuxt/_...kgnTapkZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"188-Aya7NNMDqlcJ2hKFmKoOhCJkx+E\"",
    "mtime": "2024-12-16T13:16:45.948Z",
    "size": 392,
    "path": "../public/_nuxt/_...kgnTapkZ.css"
  },
  "/assets/css/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-gjRWFU3VLJB4n6AHrQDpSp0XIig\"",
    "mtime": "2024-12-02T12:49:17.802Z",
    "size": 6148,
    "path": "../public/assets/css/.DS_Store"
  },
  "/assets/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2606d-rpnzE1Y0DQKx9nDvXTFKhqOjvaQ\"",
    "mtime": "2024-12-02T12:49:17.803Z",
    "size": 155757,
    "path": "../public/assets/css/bootstrap.min.css"
  },
  "/assets/css/cold_room.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f1-LoyBDntMlMBJ59fAKQRNYcZLqNA\"",
    "mtime": "2024-12-02T12:49:17.805Z",
    "size": 1265,
    "path": "../public/assets/css/cold_room.svg"
  },
  "/assets/css/kitchen.svg": {
    "type": "image/svg+xml",
    "etag": "\"b59-sYHhhKgKrayxYk1b3EXEAmld7aM\"",
    "mtime": "2024-12-02T12:49:17.848Z",
    "size": 2905,
    "path": "../public/assets/css/kitchen.svg"
  },
  "/assets/css/laundry.svg": {
    "type": "image/svg+xml",
    "etag": "\"b77-ez0ugrl9GxyIytoG6n2N6dqjQ/4\"",
    "mtime": "2024-12-02T12:49:17.849Z",
    "size": 2935,
    "path": "../public/assets/css/laundry.svg"
  },
  "/assets/css/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c5-urrfj5f9wOdtmsaPo9uPS/3wcBU\"",
    "mtime": "2024-12-02T12:49:17.850Z",
    "size": 1221,
    "path": "../public/assets/css/logo.svg"
  },
  "/assets/css/mailbox.svg": {
    "type": "image/svg+xml",
    "etag": "\"66d-P1U43deeN1UNQaeUW997uJY8ypU\"",
    "mtime": "2024-12-02T12:49:17.852Z",
    "size": 1645,
    "path": "../public/assets/css/mailbox.svg"
  },
  "/assets/css/main.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-jUcFFl0ynDZuRlDKAikfwE0uWoc\"",
    "mtime": "2024-12-02T12:49:17.801Z",
    "size": 60,
    "path": "../public/assets/css/main.css"
  },
  "/assets/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"69dae-RvrCM9sk8z/ogpm9SiGqAB8KVp8\"",
    "mtime": "2024-12-09T09:42:31.208Z",
    "size": 433582,
    "path": "../public/assets/css/style.css"
  },
  "/assets/css/Threads.svg": {
    "type": "image/svg+xml",
    "etag": "\"7a6-C6IjQzHEqnjwQXS1xUJW3ZBaOhY\"",
    "mtime": "2024-12-02T12:49:17.911Z",
    "size": 1958,
    "path": "../public/assets/css/Threads.svg"
  },
  "/assets/css/TikTok_Logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"243d-xHNtbbjIALarw93D3zfdiGA9adg\"",
    "mtime": "2024-12-02T12:49:17.913Z",
    "size": 9277,
    "path": "../public/assets/css/TikTok_Logo.svg"
  },
  "/assets/css/Whatsapp.svg": {
    "type": "image/svg+xml",
    "etag": "\"6e7-MidR7ZmYrPU70W2ofeRXO5PQ57k\"",
    "mtime": "2024-12-02T12:49:17.914Z",
    "size": 1767,
    "path": "../public/assets/css/Whatsapp.svg"
  },
  "/assets/css/X_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"12b-3t3ty2cNQlVkStpVCv0fgDMESUg\"",
    "mtime": "2024-12-02T12:49:17.915Z",
    "size": 299,
    "path": "../public/assets/css/X_logo.svg"
  },
  "/assets/css/X_Logo_black_background.svg": {
    "type": "image/svg+xml",
    "etag": "\"632-XWmZVpIjJGZxmYnzOfHhQ5uGj8g\"",
    "mtime": "2024-12-02T12:49:17.916Z",
    "size": 1586,
    "path": "../public/assets/css/X_Logo_black_background.svg"
  },
  "/assets/fonts/molla.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"3e800-2+ga2/86zfgEbUiOgXTfokCYUg4\"",
    "mtime": "2024-12-02T12:49:17.924Z",
    "size": 256000,
    "path": "../public/assets/fonts/molla.eot"
  },
  "/assets/fonts/molla.svg": {
    "type": "image/svg+xml",
    "etag": "\"51712-f1j3M1i+OGgtDxjUrkhax+1GCGk\"",
    "mtime": "2024-12-02T12:49:17.925Z",
    "size": 333586,
    "path": "../public/assets/fonts/molla.svg"
  },
  "/assets/fonts/molla.ttf": {
    "type": "font/ttf",
    "etag": "\"3e764-eNJP/KIsEboT1hwzgNnMhiq1JQ4\"",
    "mtime": "2024-12-02T12:49:17.926Z",
    "size": 255844,
    "path": "../public/assets/fonts/molla.ttf"
  },
  "/assets/fonts/molla.woff": {
    "type": "font/woff",
    "etag": "\"276fc-bwYQL0YIanD8XRYwoAtMrlhcbqA\"",
    "mtime": "2024-12-02T12:49:17.928Z",
    "size": 161532,
    "path": "../public/assets/fonts/molla.woff"
  },
  "/assets/fonts/molla.woff2": {
    "type": "font/woff2",
    "etag": "\"20f00-XlbN8mhpZeYcH/rf61KeHIWV9Ro\"",
    "mtime": "2024-12-02T12:49:17.930Z",
    "size": 134912,
    "path": "../public/assets/fonts/molla.woff2"
  },
  "/assets/js/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-tf7NjZD58zia92HD2JStQh4BKXs\"",
    "mtime": "2024-12-02T12:49:20.637Z",
    "size": 6148,
    "path": "../public/assets/js/.DS_Store"
  },
  "/assets/js/bootstrap-input-spinner.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e62-XXugcOkfNazhtJBdV23LsPfpGjA\"",
    "mtime": "2024-12-02T12:49:20.638Z",
    "size": 11874,
    "path": "../public/assets/js/bootstrap-input-spinner.js"
  },
  "/assets/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13508-y24XccPhLCvDphE14k6CZkJfP9w\"",
    "mtime": "2024-12-02T12:49:20.642Z",
    "size": 79112,
    "path": "../public/assets/js/bootstrap.bundle.min.js"
  },
  "/assets/js/imagesloaded.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1602-2gKNQb8RW+Dt5BXbGvhDV67rxS0\"",
    "mtime": "2024-12-02T12:49:20.664Z",
    "size": 5634,
    "path": "../public/assets/js/imagesloaded.pkgd.min.js"
  },
  "/assets/js/interactive-section-scroll.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22d3-BUYTd3bixCxcOl2OSPQk3YG1F1c\"",
    "mtime": "2024-12-02T12:49:20.666Z",
    "size": 8915,
    "path": "../public/assets/js/interactive-section-scroll.min.js"
  },
  "/assets/js/isotope.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b89-3cUNmyMJl3dfU2o37T7aPI3JlOw\"",
    "mtime": "2024-12-02T12:49:20.666Z",
    "size": 35721,
    "path": "../public/assets/js/isotope.pkgd.min.js"
  },
  "/assets/js/jquery-3.7.0.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"391ca-N7UhqYNPSQKxoKGOjwmsztEs8pA\"",
    "mtime": "2024-12-02T12:49:20.668Z",
    "size": 233930,
    "path": "../public/assets/js/jquery-3.7.0.min.js"
  },
  "/assets/js/jquery.countdown.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3591-d6UY7BUZAza2QwCZVZjrpweRBYg\"",
    "mtime": "2024-12-02T12:49:20.669Z",
    "size": 13713,
    "path": "../public/assets/js/jquery.countdown.min.js"
  },
  "/assets/js/jquery.countTo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb3-hD/2MfkJiP1QP5diKKLvih3+W04\"",
    "mtime": "2024-12-02T12:49:20.670Z",
    "size": 3763,
    "path": "../public/assets/js/jquery.countTo.js"
  },
  "/assets/js/jquery.elevateZoom.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80e9-CKv13nnlhFoCBSScse1A0Jq8+1Q\"",
    "mtime": "2024-12-02T12:49:20.671Z",
    "size": 33001,
    "path": "../public/assets/js/jquery.elevateZoom.min.js"
  },
  "/assets/js/jquery.hoverIntent.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"918-CLZIdrEU+vhhIPLKCygG1OP+43I\"",
    "mtime": "2024-12-02T12:49:20.674Z",
    "size": 2328,
    "path": "../public/assets/js/jquery.hoverIntent.min.js"
  },
  "/assets/js/jquery.magnific-popup.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f86-+U+/EMwmERmTwKjQ6BZc+vmdNz0\"",
    "mtime": "2024-12-02T12:49:20.699Z",
    "size": 20358,
    "path": "../public/assets/js/jquery.magnific-popup.min.js"
  },
  "/assets/js/jquery.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15b11-GUwGIJR60RYxyfjSLI1Br5Y4I1M\"",
    "mtime": "2024-12-02T12:49:20.700Z",
    "size": 88849,
    "path": "../public/assets/js/jquery.min.js"
  },
  "/assets/js/jquery.plugin.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d64-Na1WNR+BKU+gjsbYNfFksBiL5gg\"",
    "mtime": "2024-12-02T12:49:20.701Z",
    "size": 3428,
    "path": "../public/assets/js/jquery.plugin.min.js"
  },
  "/assets/js/jquery.sticky-kit.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af5-1Ke6Apt7mvD9LnyGDGnE+K9GMc8\"",
    "mtime": "2024-12-02T12:49:20.702Z",
    "size": 2805,
    "path": "../public/assets/js/jquery.sticky-kit.min.js"
  },
  "/assets/js/jquery.waypoints.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"286d-wjd3SvTA48q5J6RCd5TLDnIjBlw\"",
    "mtime": "2024-12-02T12:49:20.702Z",
    "size": 10349,
    "path": "../public/assets/js/jquery.waypoints.min.js"
  },
  "/assets/js/main.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c77-mS8Q68Y/H7k03dTaszZ+JEGuDks\"",
    "mtime": "2024-12-09T12:54:45.895Z",
    "size": 31863,
    "path": "../public/assets/js/main.js"
  },
  "/assets/js/nouislider.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c41-Y0/zxk0KFZKFNU3Tcl6QgAuzaz4\"",
    "mtime": "2024-12-02T12:49:20.709Z",
    "size": 23617,
    "path": "../public/assets/js/nouislider.min.js"
  },
  "/assets/js/owl.carousel.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae0c-5SWeLPT8sEasE68CaCI1kH+znRo\"",
    "mtime": "2024-12-02T12:49:20.710Z",
    "size": 44556,
    "path": "../public/assets/js/owl.carousel.min.js"
  },
  "/assets/js/plugins.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe30-HoVb8IMEkv66MpezKKGpZfHlSGo\"",
    "mtime": "2024-12-02T12:49:20.711Z",
    "size": 130608,
    "path": "../public/assets/js/plugins.min.js"
  },
  "/assets/js/superfish.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11b8-WZXzlriKoYz55pKn45pH8+q8VbA\"",
    "mtime": "2024-12-02T12:49:20.711Z",
    "size": 4536,
    "path": "../public/assets/js/superfish.min.js"
  },
  "/assets/js/wNumb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23b7-A4AXDSDTbi9n3wzMjEqPzk70XXc\"",
    "mtime": "2024-12-02T12:49:20.712Z",
    "size": 9143,
    "path": "../public/assets/js/wNumb.js"
  },
  "/assets/vendor/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-iGB1NNV7INIAyLbJBd9V2hBR5LE\"",
    "mtime": "2024-12-02T12:49:20.811Z",
    "size": 6148,
    "path": "../public/assets/vendor/.DS_Store"
  },
  "/dearflip/examples/basic-example.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"527-F8dwZrxmKHy1i3jzXlxMOUqBQRs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1319,
    "path": "../public/dearflip/examples/basic-example.html"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-5KlgA59KCSqinaMG2wzH/MrpBsE\"",
    "mtime": "2024-12-16T13:16:53.149Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/assets/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"4804-uiZ87HDZM5mJfG/eQKZBhuIoW30\"",
    "mtime": "2024-11-06T08:15:38.806Z",
    "size": 18436,
    "path": "../public/assets/images/.DS_Store"
  },
  "/assets/images/1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"7f49-GQTO32VZPbzSmnRKYRnOaqaO0qw\"",
    "mtime": "2024-11-06T08:15:38.806Z",
    "size": 32585,
    "path": "../public/assets/images/1.jpeg"
  },
  "/assets/images/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5259-bRJ+t9D3bi2Om0iIYFPoHhwUzJI\"",
    "mtime": "2024-11-06T08:15:38.807Z",
    "size": 21081,
    "path": "../public/assets/images/2.jpg"
  },
  "/assets/images/3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"9bd9-VN24EcAi9xRYvljC3bER6/St81o\"",
    "mtime": "2024-11-06T08:15:38.808Z",
    "size": 39897,
    "path": "../public/assets/images/3.jpeg"
  },
  "/assets/images/ab-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"28c2-TKD8vD6Em5V5dpWaK//I5/6FV+U\"",
    "mtime": "2024-11-06T08:15:38.835Z",
    "size": 10434,
    "path": "../public/assets/images/ab-1.jpeg"
  },
  "/assets/images/about_back_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"24341-E6Zn7iJhfqBTxjPwJdXHC2cXKM8\"",
    "mtime": "2024-11-06T08:15:39.641Z",
    "size": 148289,
    "path": "../public/assets/images/about_back_1.jpg"
  },
  "/assets/images/about_back_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"29ade-5bp7MAYXwWnB9c0FR0r05TrsMFw\"",
    "mtime": "2024-11-06T08:15:39.643Z",
    "size": 170718,
    "path": "../public/assets/images/about_back_2.jpg"
  },
  "/assets/images/about_back_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d19f-kGm32laJBW3zal8gHEv2cbMMtEo\"",
    "mtime": "2024-11-06T08:15:39.643Z",
    "size": 315807,
    "path": "../public/assets/images/about_back_3.jpg"
  },
  "/assets/images/about_image.jpeg": {
    "type": "image/jpeg",
    "etag": "\"27582-/hmScucgs0YNw3DkLjhDcti+PNg\"",
    "mtime": "2024-11-06T08:15:39.644Z",
    "size": 161154,
    "path": "../public/assets/images/about_image.jpeg"
  },
  "/assets/images/about_us.jpeg": {
    "type": "image/jpeg",
    "etag": "\"2861f-7xrQHep0gQe8wBEhMRNmW/Ev508\"",
    "mtime": "2024-11-06T08:15:39.645Z",
    "size": 165407,
    "path": "../public/assets/images/about_us.jpeg"
  },
  "/assets/images/about_us2.jpg": {
    "type": "image/jpeg",
    "etag": "\"20ea7-iOMd3bXppMuDD5sIzbmrCKYiM+Y\"",
    "mtime": "2024-11-06T08:15:39.645Z",
    "size": 134823,
    "path": "../public/assets/images/about_us2.jpg"
  },
  "/assets/images/about_us_back.jpg": {
    "type": "image/jpeg",
    "etag": "\"2acf5-++WFWkIV0EF2jPj7kDco3FO+mRA\"",
    "mtime": "2024-11-06T08:15:39.647Z",
    "size": 175349,
    "path": "../public/assets/images/about_us_back.jpg"
  },
  "/assets/images/about_workshop.jpeg": {
    "type": "image/jpeg",
    "etag": "\"4752a-VXEEy8Cy269vcN4MAJaiDPolqVc\"",
    "mtime": "2024-11-06T08:15:39.648Z",
    "size": 292138,
    "path": "../public/assets/images/about_workshop.jpeg"
  },
  "/assets/images/arrow-down.png": {
    "type": "image/png",
    "etag": "\"303-rw/TNpA3xy2wrqd41Rtw8Rd8egI\"",
    "mtime": "2024-11-06T08:15:39.648Z",
    "size": 771,
    "path": "../public/assets/images/arrow-down.png"
  },
  "/assets/images/bakery-preparation.png": {
    "type": "image/png",
    "etag": "\"4cd8-EWkVCwLdXoEf/8V7k+T4MReWax0\"",
    "mtime": "2024-11-06T08:15:39.649Z",
    "size": 19672,
    "path": "../public/assets/images/bakery-preparation.png"
  },
  "/assets/images/banner-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c26-3fdr98j3IVTunk+GKnRllzqPDEM\"",
    "mtime": "2024-11-06T08:15:39.649Z",
    "size": 11302,
    "path": "../public/assets/images/banner-4.jpg"
  },
  "/assets/images/beverage-machines.png": {
    "type": "image/png",
    "etag": "\"2a5c-7UV3Or9la1f5eDdyPGmkLiEhVGI\"",
    "mtime": "2024-11-06T08:15:39.650Z",
    "size": 10844,
    "path": "../public/assets/images/beverage-machines.png"
  },
  "/assets/images/bg.png": {
    "type": "image/png",
    "etag": "\"267f-O+KZGk5S1YYtTCqtPG889/Q5HRU\"",
    "mtime": "2024-11-06T08:15:39.650Z",
    "size": 9855,
    "path": "../public/assets/images/bg.png"
  },
  "/assets/images/blast-chillers-&-freezers.png": {
    "type": "image/png",
    "etag": "\"3a76-yp6TIw8GnP3KgjWxp+pHbtZ5RfM\"",
    "mtime": "2024-11-06T08:15:39.650Z",
    "size": 14966,
    "path": "../public/assets/images/blast-chillers-&-freezers.png"
  },
  "/assets/images/boy-1.png": {
    "type": "image/png",
    "etag": "\"3e77-nb15A+DtMYsNj7cWGlTfvIACLco\"",
    "mtime": "2024-11-06T08:15:39.651Z",
    "size": 15991,
    "path": "../public/assets/images/boy-1.png"
  },
  "/assets/images/boy-2.png": {
    "type": "image/png",
    "etag": "\"349e-u9XuSl1ix9FQEul+eNvyQwBD1FU\"",
    "mtime": "2024-11-06T08:15:39.651Z",
    "size": 13470,
    "path": "../public/assets/images/boy-2.png"
  },
  "/assets/images/boy.png": {
    "type": "image/png",
    "etag": "\"462f-f1n02kPJO5oh3OWGRu6T4OK+srg\"",
    "mtime": "2024-11-06T08:15:39.652Z",
    "size": 17967,
    "path": "../public/assets/images/boy.png"
  },
  "/assets/images/buffet-&-servery.png": {
    "type": "image/png",
    "etag": "\"43d8-C4zs5PoFhXlWQCeSb9WNatftdc8\"",
    "mtime": "2024-11-06T08:15:39.652Z",
    "size": 17368,
    "path": "../public/assets/images/buffet-&-servery.png"
  },
  "/assets/images/bulk-cooking.png": {
    "type": "image/png",
    "etag": "\"4693-DP756IwVNGguYTOupA25BIaHs8I\"",
    "mtime": "2024-11-06T08:15:39.652Z",
    "size": 18067,
    "path": "../public/assets/images/bulk-cooking.png"
  },
  "/assets/images/career.jpg": {
    "type": "image/jpeg",
    "etag": "\"18a1a-omAVDr3P4kndN3dm9UQrPeYd4aw\"",
    "mtime": "2024-11-06T08:15:39.653Z",
    "size": 100890,
    "path": "../public/assets/images/career.jpg"
  },
  "/assets/images/CareerResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"40a-XL2GZFce8bxtPXSV9gm/glN1SWk\"",
    "mtime": "2024-11-06T08:15:38.809Z",
    "size": 1034,
    "path": "../public/assets/images/CareerResource.php"
  },
  "/assets/images/career_page.jpg": {
    "type": "image/jpeg",
    "etag": "\"28463-YMpnjkxsXsQtGKjK3+DVJ0wv2gc\"",
    "mtime": "2024-11-06T08:15:39.654Z",
    "size": 164963,
    "path": "../public/assets/images/career_page.jpg"
  },
  "/assets/images/career_page1.jpg": {
    "type": "image/jpeg",
    "etag": "\"24bd5-cWiONQxJchwXfnEXG8Fb6JhF4Rg\"",
    "mtime": "2024-11-06T08:15:39.655Z",
    "size": 150485,
    "path": "../public/assets/images/career_page1.jpg"
  },
  "/assets/images/career_page11.jpg": {
    "type": "image/jpeg",
    "etag": "\"45332-JPsErQlHgAgNvTwYpzMxgcotd/0\"",
    "mtime": "2024-11-06T08:15:39.657Z",
    "size": 283442,
    "path": "../public/assets/images/career_page11.jpg"
  },
  "/assets/images/career_page12.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d9fd-Wt1S1MLprrZOjL8/0Oro1V4fgLY\"",
    "mtime": "2024-11-06T08:15:39.659Z",
    "size": 514557,
    "path": "../public/assets/images/career_page12.jpg"
  },
  "/assets/images/CategoryResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"10c1-bddN32NyJ1qZoGngmVpjpLzKjSw\"",
    "mtime": "2024-11-06T08:15:38.810Z",
    "size": 4289,
    "path": "../public/assets/images/CategoryResource.php"
  },
  "/assets/images/certifications.jpg": {
    "type": "image/jpeg",
    "etag": "\"2106c-j8Wv6B6Y0r/opMGTSq2m9nY59pM\"",
    "mtime": "2024-11-06T08:15:39.660Z",
    "size": 135276,
    "path": "../public/assets/images/certifications.jpg"
  },
  "/assets/images/chef.jpg": {
    "type": "image/jpeg",
    "etag": "\"2341a-gup5pTYMpZeYDGCmnFB21eHFDjE\"",
    "mtime": "2024-11-06T08:15:39.661Z",
    "size": 144410,
    "path": "../public/assets/images/chef.jpg"
  },
  "/assets/images/chef1.jpg": {
    "type": "image/jpeg",
    "etag": "\"209f5-Hb5pO9TDahzVHFXE2u+C5arQ9uw\"",
    "mtime": "2024-11-06T08:15:39.662Z",
    "size": 133621,
    "path": "../public/assets/images/chef1.jpg"
  },
  "/assets/images/chef_competitions.png": {
    "type": "image/png",
    "etag": "\"5550-04ShIaMPkAcIYvQdz/7J0W2nHJU\"",
    "mtime": "2024-11-06T08:15:39.663Z",
    "size": 21840,
    "path": "../public/assets/images/chef_competitions.png"
  },
  "/assets/images/chiller-rooms.png": {
    "type": "image/png",
    "etag": "\"3414-SM3D5rIK/00fFHshGgW/zKN6W0o\"",
    "mtime": "2024-11-06T08:15:39.663Z",
    "size": 13332,
    "path": "../public/assets/images/chiller-rooms.png"
  },
  "/assets/images/client_demos.png": {
    "type": "image/png",
    "etag": "\"57e7-eU9yJpZaA0X0JaHAZS2V+RsEad0\"",
    "mtime": "2024-11-06T08:15:39.663Z",
    "size": 22503,
    "path": "../public/assets/images/client_demos.png"
  },
  "/assets/images/coffee-machines.png": {
    "type": "image/png",
    "etag": "\"2a85-1L0KBCt3PHEsgr6vyM6J3jMW/90\"",
    "mtime": "2024-11-06T08:15:39.664Z",
    "size": 10885,
    "path": "../public/assets/images/coffee-machines.png"
  },
  "/assets/images/coffee-machines1.png": {
    "type": "image/png",
    "etag": "\"28b7-BYyPVLiMP42oxqEC5lL1+FVGdi4\"",
    "mtime": "2024-11-06T08:15:39.664Z",
    "size": 10423,
    "path": "../public/assets/images/coffee-machines1.png"
  },
  "/assets/images/coffee-shop.png": {
    "type": "image/png",
    "etag": "\"3385-vHO2rl0xfWo/MSZdcIrVSqYnWJQ\"",
    "mtime": "2024-11-06T08:15:39.665Z",
    "size": 13189,
    "path": "../public/assets/images/coffee-shop.png"
  },
  "/assets/images/Cold Room & Laundry-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c746-QzsMdxgMcHt1qv0EsZ2zGoJzUgU\"",
    "mtime": "2024-11-06T08:15:38.811Z",
    "size": 116550,
    "path": "../public/assets/images/Cold Room & Laundry-02.jpg"
  },
  "/assets/images/Cold Room & Laundry.jpg": {
    "type": "image/jpeg",
    "etag": "\"164f2-H4Kj/2mVpscPnkKmD9HsMfyIxas\"",
    "mtime": "2024-11-06T08:15:38.812Z",
    "size": 91378,
    "path": "../public/assets/images/Cold Room & Laundry.jpg"
  },
  "/assets/images/cold-room.png": {
    "type": "image/png",
    "etag": "\"3414-SM3D5rIK/00fFHshGgW/zKN6W0o\"",
    "mtime": "2024-11-06T08:15:39.665Z",
    "size": 13332,
    "path": "../public/assets/images/cold-room.png"
  },
  "/assets/images/coldroom.png": {
    "type": "image/png",
    "etag": "\"247c-EkG6BRE7ctz/GgzKa6bnNTIS880\"",
    "mtime": "2024-11-06T08:15:39.665Z",
    "size": 9340,
    "path": "../public/assets/images/coldroom.png"
  },
  "/assets/images/Commercial Laundry.gif": {
    "type": "image/gif",
    "etag": "\"1389d6-W4w4WTm7VcoWMNaRveVW/c+uNIo\"",
    "mtime": "2024-11-06T08:15:38.818Z",
    "size": 1280470,
    "path": "../public/assets/images/Commercial Laundry.gif"
  },
  "/assets/images/consultancy-&-design.png": {
    "type": "image/png",
    "etag": "\"31fc-tlt+RKYnB5ZIzGxkyFtkMhVgWQQ\"",
    "mtime": "2024-11-06T08:15:39.667Z",
    "size": 12796,
    "path": "../public/assets/images/consultancy-&-design.png"
  },
  "/assets/images/consultancy-and-design.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d204-1N5VJqCItHxAWIe1DAZQWbubeos\"",
    "mtime": "2024-11-06T08:15:39.666Z",
    "size": 119300,
    "path": "../public/assets/images/consultancy-and-design.jpg"
  },
  "/assets/images/contact-header-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"a27f-4Zft7lyieaFTStx0mZq9jvdJg/o\"",
    "mtime": "2024-11-06T08:15:39.667Z",
    "size": 41599,
    "path": "../public/assets/images/contact-header-bg.jpg"
  },
  "/assets/images/contact-us-map-pin.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d-mdOAJp9s5Yp9NKXvM02aCAB2yIU\"",
    "mtime": "2024-11-06T08:15:39.667Z",
    "size": 317,
    "path": "../public/assets/images/contact-us-map-pin.svg"
  },
  "/assets/images/contact_us_banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"10fca-m+XFTsUnhB3T/EAuz1jjv8C5TFM\"",
    "mtime": "2024-11-06T08:15:39.668Z",
    "size": 69578,
    "path": "../public/assets/images/contact_us_banner.jpg"
  },
  "/assets/images/contact_us_header.jpg": {
    "type": "image/jpeg",
    "etag": "\"150f3-qgqu+AVua8kjyZHsieO79AxEhWk\"",
    "mtime": "2024-11-06T08:15:39.669Z",
    "size": 86259,
    "path": "../public/assets/images/contact_us_header.jpg"
  },
  "/assets/images/container.png": {
    "type": "image/png",
    "etag": "\"b34-hV6SR5Tw6ILwmpHt2ey/KuA6/ow\"",
    "mtime": "2024-11-06T08:15:39.669Z",
    "size": 2868,
    "path": "../public/assets/images/container.png"
  },
  "/assets/images/containerized-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"2264-PRTdlhE+CmCWiXMxA83rCog0RcI\"",
    "mtime": "2024-11-06T08:15:39.669Z",
    "size": 8804,
    "path": "../public/assets/images/containerized-cold-rooms.png"
  },
  "/assets/images/cork-logo.png": {
    "type": "image/png",
    "etag": "\"b38-CBWbBdPROKrLy/6QFDCGNjOtDOs\"",
    "mtime": "2024-11-06T08:15:39.670Z",
    "size": 2872,
    "path": "../public/assets/images/cork-logo.png"
  },
  "/assets/images/corporate.png": {
    "type": "image/png",
    "etag": "\"44bd-XOxObLDsbqYAcDfSoo+bYjxhscA\"",
    "mtime": "2024-11-06T08:15:39.670Z",
    "size": 17597,
    "path": "../public/assets/images/corporate.png"
  },
  "/assets/images/corpse.png": {
    "type": "image/png",
    "etag": "\"5832-IaKxJwU8RopTDhbfMxb+bj5DVzI\"",
    "mtime": "2024-11-06T08:15:39.671Z",
    "size": 22578,
    "path": "../public/assets/images/corpse.png"
  },
  "/assets/images/CsrImagesResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"21e-B1w2LOqzF2iuJs1l86rdfFyuhE0\"",
    "mtime": "2024-11-06T08:15:38.819Z",
    "size": 542,
    "path": "../public/assets/images/CsrImagesResource.php"
  },
  "/assets/images/CsrResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"3d2-cHuShFbEXPhdiHFjcDf4X9CwZ4U\"",
    "mtime": "2024-11-06T08:15:38.819Z",
    "size": 978,
    "path": "../public/assets/images/CsrResource.php"
  },
  "/assets/images/csr_image_breaker.jpg": {
    "type": "image/jpeg",
    "etag": "\"494d3-Zrc2gpB+SfBzvNd0AbnZxNNkQwU\"",
    "mtime": "2024-11-06T08:15:39.672Z",
    "size": 300243,
    "path": "../public/assets/images/csr_image_breaker.jpg"
  },
  "/assets/images/delete-user-11.jpeg": {
    "type": "image/jpeg",
    "etag": "\"e0e-3DTYInNKyTc38/B1iWpRvpfeFd0\"",
    "mtime": "2024-11-06T08:15:39.673Z",
    "size": 3598,
    "path": "../public/assets/images/delete-user-11.jpeg"
  },
  "/assets/images/delete-user-12.jpeg": {
    "type": "image/jpeg",
    "etag": "\"e47-vgo7ArYb3Pvn5UCs5CNmOOp2AIM\"",
    "mtime": "2024-11-06T08:15:39.673Z",
    "size": 3655,
    "path": "../public/assets/images/delete-user-12.jpeg"
  },
  "/assets/images/delete-user-15.jpeg": {
    "type": "image/jpeg",
    "etag": "\"88e-GOsNpQVlYBjReDlUXcoKO/P4/GM\"",
    "mtime": "2024-11-06T08:15:39.673Z",
    "size": 2190,
    "path": "../public/assets/images/delete-user-15.jpeg"
  },
  "/assets/images/delete-user-16.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8e4-CrzdWHTe4Y6qzqd21gJpgtayrS8\"",
    "mtime": "2024-11-06T08:15:39.674Z",
    "size": 2276,
    "path": "../public/assets/images/delete-user-16.jpeg"
  },
  "/assets/images/delete-user-17.jpeg": {
    "type": "image/jpeg",
    "etag": "\"cfa-G/Suhmd0YsVOav9syF88Vkgig8Y\"",
    "mtime": "2024-11-06T08:15:39.674Z",
    "size": 3322,
    "path": "../public/assets/images/delete-user-17.jpeg"
  },
  "/assets/images/delete-user-4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"d3b-wAs20sDLRLO0mK4FfkHh3Tdhcvg\"",
    "mtime": "2024-11-06T08:15:39.674Z",
    "size": 3387,
    "path": "../public/assets/images/delete-user-4.jpeg"
  },
  "/assets/images/delivery-cart.png": {
    "type": "image/png",
    "etag": "\"182f-SUVfFj57EIqharGEWKBmfXPLSPQ\"",
    "mtime": "2024-11-06T08:15:39.675Z",
    "size": 6191,
    "path": "../public/assets/images/delivery-cart.png"
  },
  "/assets/images/dishwashers.png": {
    "type": "image/png",
    "etag": "\"531e-1cj/Uoyqo8tKOx0DvHCi3CFPoPk\"",
    "mtime": "2024-11-06T08:15:39.677Z",
    "size": 21278,
    "path": "../public/assets/images/dishwashers.png"
  },
  "/assets/images/display-case.png": {
    "type": "image/png",
    "etag": "\"38ff-IEonVjOxjTBdOu0q0+bIUj6UG4w\"",
    "mtime": "2024-11-06T08:15:39.678Z",
    "size": 14591,
    "path": "../public/assets/images/display-case.png"
  },
  "/assets/images/display-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"2123-LmsX0WVzuJuonXT7lmsDVTFeoYc\"",
    "mtime": "2024-11-06T08:15:39.678Z",
    "size": 8483,
    "path": "../public/assets/images/display-cold-rooms.png"
  },
  "/assets/images/display-counter.png": {
    "type": "image/png",
    "etag": "\"3c84-fhmR8JRrSlnyQfscySizp/l7+VY\"",
    "mtime": "2024-11-06T08:15:39.678Z",
    "size": 15492,
    "path": "../public/assets/images/display-counter.png"
  },
  "/assets/images/display.png": {
    "type": "image/png",
    "etag": "\"26f9-E5ZFpi30jJOzGAjUsEIVN/i/bkk\"",
    "mtime": "2024-11-06T08:15:39.679Z",
    "size": 9977,
    "path": "../public/assets/images/display.png"
  },
  "/assets/images/displays.png": {
    "type": "image/png",
    "etag": "\"2f5e-26Iy+9ZqRDBZB2k9U9MUdGHJUGo\"",
    "mtime": "2024-11-06T08:15:39.679Z",
    "size": 12126,
    "path": "../public/assets/images/displays.png"
  },
  "/assets/images/drag-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1fe7-FjJwmEVTMlxMgTqboVA7ge7E1a0\"",
    "mtime": "2024-11-06T08:15:39.679Z",
    "size": 8167,
    "path": "../public/assets/images/drag-1.jpeg"
  },
  "/assets/images/drag-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1434-0y7fmRlxYknOL+qbr/xa2g9Eok0\"",
    "mtime": "2024-11-06T08:15:39.680Z",
    "size": 5172,
    "path": "../public/assets/images/drag-2.jpeg"
  },
  "/assets/images/drag-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"e62-aSAhV7BWFcUU/gzVy7VBAuFThFk\"",
    "mtime": "2024-11-06T08:15:39.680Z",
    "size": 3682,
    "path": "../public/assets/images/drag-4.jpg"
  },
  "/assets/images/dragp-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"182a-F81/n9XrKjhldcjD2m/wRkvT/ns\"",
    "mtime": "2024-11-06T08:15:39.681Z",
    "size": 6186,
    "path": "../public/assets/images/dragp-1.jpeg"
  },
  "/assets/images/dragp-4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"f14-/wKN6ZZbdmkpCrDoAkAnKVZi5ao\"",
    "mtime": "2024-11-06T08:15:39.681Z",
    "size": 3860,
    "path": "../public/assets/images/dragp-4.jpeg"
  },
  "/assets/images/dragp-6.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1ad1-J7q3/fGgmTaiPeL0LotDygOHM1Q\"",
    "mtime": "2024-11-06T08:15:39.681Z",
    "size": 6865,
    "path": "../public/assets/images/dragp-6.jpeg"
  },
  "/assets/images/dragp-7.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1703-pn7u3h+IHrQqS8XiKASpwY9GIKA\"",
    "mtime": "2024-11-06T08:15:39.682Z",
    "size": 5891,
    "path": "../public/assets/images/dragp-7.jpeg"
  },
  "/assets/images/dryers.png": {
    "type": "image/png",
    "etag": "\"46cc-7qh8BA0+yeBJpnOYFD1O46RlRrk\"",
    "mtime": "2024-11-06T08:15:39.682Z",
    "size": 18124,
    "path": "../public/assets/images/dryers.png"
  },
  "/assets/images/elements.png": {
    "type": "image/png",
    "etag": "\"191b-sr/wAVe6wcpzlDivyJoQi794EBQ\"",
    "mtime": "2024-11-06T08:15:39.682Z",
    "size": 6427,
    "path": "../public/assets/images/elements.png"
  },
  "/assets/images/engineering.jpg": {
    "type": "image/jpeg",
    "etag": "\"28d1a-pcf0/QIFB0Ol7FcwEP3UJ2gUSQQ\"",
    "mtime": "2024-11-06T08:15:39.683Z",
    "size": 167194,
    "path": "../public/assets/images/engineering.jpg"
  },
  "/assets/images/EventResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"341-b8gUWZhqUJqbDf685puj5rPf/uI\"",
    "mtime": "2024-11-06T08:15:38.820Z",
    "size": 833,
    "path": "../public/assets/images/EventResource.php"
  },
  "/assets/images/events_page.jpg": {
    "type": "image/jpeg",
    "etag": "\"210e1-QiFITkQ77IcnwL+2XAPDdGOLKr8\"",
    "mtime": "2024-11-06T08:15:39.687Z",
    "size": 135393,
    "path": "../public/assets/images/events_page.jpg"
  },
  "/assets/images/events_page1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e7d1-47b28BVVOZ+qORGDhwgD82Dbb5c\"",
    "mtime": "2024-11-06T08:15:39.688Z",
    "size": 190417,
    "path": "../public/assets/images/events_page1.jpg"
  },
  "/assets/images/Experience.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ee54-Jkj80yMw9Nv81l62vBzOEmWpZeI\"",
    "mtime": "2024-11-06T08:15:38.821Z",
    "size": 126548,
    "path": "../public/assets/images/Experience.jpg"
  },
  "/assets/images/faq.svg": {
    "type": "image/svg+xml",
    "etag": "\"168b-v1o+Agp6MyYKufNsr7o1ZtN8T3I\"",
    "mtime": "2024-11-06T08:15:39.688Z",
    "size": 5771,
    "path": "../public/assets/images/faq.svg"
  },
  "/assets/images/features_overview.svg": {
    "type": "image/svg+xml",
    "etag": "\"3a47-LDJwEPnaSkZuAoEiYu/nb7MsCbc\"",
    "mtime": "2024-11-06T08:15:39.689Z",
    "size": 14919,
    "path": "../public/assets/images/features_overview.svg"
  },
  "/assets/images/file-preview-pdf.png": {
    "type": "image/png",
    "etag": "\"1acb-DcmpkZbEbQUpX5LZCdjP3dusc+Y\"",
    "mtime": "2024-11-06T08:15:39.689Z",
    "size": 6859,
    "path": "../public/assets/images/file-preview-pdf.png"
  },
  "/assets/images/file-preview.png": {
    "type": "image/png",
    "etag": "\"824f-hygitPcuUY9WQDlB+pKs7UhibD4\"",
    "mtime": "2024-11-06T08:15:39.689Z",
    "size": 33359,
    "path": "../public/assets/images/file-preview.png"
  },
  "/assets/images/finance.jpg": {
    "type": "image/jpeg",
    "etag": "\"304ea-aAupWHeILEQ/HveUwOZlCNZESlw\"",
    "mtime": "2024-11-06T08:15:39.690Z",
    "size": 197866,
    "path": "../public/assets/images/finance.jpg"
  },
  "/assets/images/finishing-equipments.png": {
    "type": "image/png",
    "etag": "\"26a1-8ZSCi4vLtuM0ABUwt4UVKHeZB5U\"",
    "mtime": "2024-11-06T08:15:39.691Z",
    "size": 9889,
    "path": "../public/assets/images/finishing-equipments.png"
  },
  "/assets/images/fire-suppression.png": {
    "type": "image/png",
    "etag": "\"30ee-vEzCefbzXHZwPekMIzKBcKYAmGg\"",
    "mtime": "2024-11-06T08:15:39.691Z",
    "size": 12526,
    "path": "../public/assets/images/fire-suppression.png"
  },
  "/assets/images/flatwork-ironers.png": {
    "type": "image/png",
    "etag": "\"232a-Nfp7jiOeOAG6f9wrfMgyBbC7DYA\"",
    "mtime": "2024-11-06T08:15:39.699Z",
    "size": 9002,
    "path": "../public/assets/images/flatwork-ironers.png"
  },
  "/assets/images/floor-cleaning.png": {
    "type": "image/png",
    "etag": "\"3c40-ez+lRJba2lVEMGcdtlE6BNtB19c\"",
    "mtime": "2024-11-06T08:15:39.699Z",
    "size": 15424,
    "path": "../public/assets/images/floor-cleaning.png"
  },
  "/assets/images/Food Service.gif": {
    "type": "image/gif",
    "etag": "\"a9bf3-yStq37He4BhP402jFC9SkVBo6Ik\"",
    "mtime": "2024-11-06T08:15:38.824Z",
    "size": 695283,
    "path": "../public/assets/images/Food Service.gif"
  },
  "/assets/images/food-delivery.png": {
    "type": "image/png",
    "etag": "\"3d29-CRrduCW835Afkj7R9xrbAwUiLlE\"",
    "mtime": "2024-11-06T08:15:39.700Z",
    "size": 15657,
    "path": "../public/assets/images/food-delivery.png"
  },
  "/assets/images/food-transport.png": {
    "type": "image/png",
    "etag": "\"1df0-nPl8w8n0j9r1tg2WUoRqC6k5xCE\"",
    "mtime": "2024-11-06T08:15:39.700Z",
    "size": 7664,
    "path": "../public/assets/images/food-transport.png"
  },
  "/assets/images/food-transportation.png": {
    "type": "image/png",
    "etag": "\"2068-yo4r86AT47NdOrqqJW4wjwDBnwE\"",
    "mtime": "2024-11-06T08:15:39.700Z",
    "size": 8296,
    "path": "../public/assets/images/food-transportation.png"
  },
  "/assets/images/Footprint.jpg": {
    "type": "image/jpeg",
    "etag": "\"10958-jCAgoqjQ4iCgnvp5e9lXghwW0nM\"",
    "mtime": "2024-11-06T08:15:38.825Z",
    "size": 67928,
    "path": "../public/assets/images/Footprint.jpg"
  },
  "/assets/images/freezer-rooms.png": {
    "type": "image/png",
    "etag": "\"2f97-Y7iSa857b+Px5A3H9G+9uavRAMc\"",
    "mtime": "2024-11-06T08:15:39.702Z",
    "size": 12183,
    "path": "../public/assets/images/freezer-rooms.png"
  },
  "/assets/images/g-7.png": {
    "type": "image/png",
    "etag": "\"339a-SINj5YFLulxZC/+2vQVPD/QGCBY\"",
    "mtime": "2024-11-06T08:15:39.703Z",
    "size": 13210,
    "path": "../public/assets/images/g-7.png"
  },
  "/assets/images/g-8.png": {
    "type": "image/png",
    "etag": "\"39d1-dEh2WoofXRGi7yV2zieZE2UNyKw\"",
    "mtime": "2024-11-06T08:15:39.703Z",
    "size": 14801,
    "path": "../public/assets/images/g-8.png"
  },
  "/assets/images/girl-1.png": {
    "type": "image/png",
    "etag": "\"3c09-fasBhh55gbq13Vo1kUhZZLYDlMs\"",
    "mtime": "2024-11-06T08:15:39.704Z",
    "size": 15369,
    "path": "../public/assets/images/girl-1.png"
  },
  "/assets/images/girl-2.png": {
    "type": "image/png",
    "etag": "\"48cd-1rVjwnn9vArYU5A0O1A1BeVO16Y\"",
    "mtime": "2024-11-06T08:15:39.704Z",
    "size": 18637,
    "path": "../public/assets/images/girl-2.png"
  },
  "/assets/images/girl-3.png": {
    "type": "image/png",
    "etag": "\"4b78-tkTw9xlkJQhcFUuG6qYOHghBPnE\"",
    "mtime": "2024-11-06T08:15:39.704Z",
    "size": 19320,
    "path": "../public/assets/images/girl-3.png"
  },
  "/assets/images/girl-4.png": {
    "type": "image/png",
    "etag": "\"2d49-yGaogqlpFcv4KcvdnB6afBVBIFs\"",
    "mtime": "2024-11-06T08:15:39.705Z",
    "size": 11593,
    "path": "../public/assets/images/girl-4.png"
  },
  "/assets/images/graduate_program.jpg": {
    "type": "image/jpeg",
    "etag": "\"56e77-bZKMVceFNUDHefPxm5BHTi9U31g\"",
    "mtime": "2024-11-06T08:15:39.706Z",
    "size": 355959,
    "path": "../public/assets/images/graduate_program.jpg"
  },
  "/assets/images/green_solutions.jpg": {
    "type": "image/jpeg",
    "etag": "\"23a6d-6dlRw6VE8R242AtkXSYg4Dh0r1U\"",
    "mtime": "2024-11-06T08:15:39.708Z",
    "size": 146029,
    "path": "../public/assets/images/green_solutions.jpg"
  },
  "/assets/images/grid-blog-style-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7758-QmgGVZQDWJMyJhxzTVwIp3tKRXM\"",
    "mtime": "2024-11-06T08:15:39.708Z",
    "size": 30552,
    "path": "../public/assets/images/grid-blog-style-1.jpg"
  },
  "/assets/images/grid-blog-style-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8a13-V5kJwc0jDebl8U4aOey6SEoncmg\"",
    "mtime": "2024-11-06T08:15:39.709Z",
    "size": 35347,
    "path": "../public/assets/images/grid-blog-style-2.jpeg"
  },
  "/assets/images/grid-blog-style-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4396-Jfgk3d5SItAm9HSA4y8lFhWJvIM\"",
    "mtime": "2024-11-06T08:15:39.709Z",
    "size": 17302,
    "path": "../public/assets/images/grid-blog-style-3.jpg"
  },
  "/assets/images/happy_customer_sheffield_advantages.jpg": {
    "type": "image/jpeg",
    "etag": "\"25205-5/Rs0ijzuS0qYX3jngWB1dBeNaM\"",
    "mtime": "2024-11-06T08:15:39.710Z",
    "size": 152069,
    "path": "../public/assets/images/happy_customer_sheffield_advantages.jpg"
  },
  "/assets/images/happy_customer_sheffield_advantages_old.jpg": {
    "type": "image/jpeg",
    "etag": "\"23f99-kf578eccLaFphcl7CQoPAnqA00k\"",
    "mtime": "2024-11-06T08:15:39.711Z",
    "size": 147353,
    "path": "../public/assets/images/happy_customer_sheffield_advantages_old.jpg"
  },
  "/assets/images/heat-pump-dehydrators.png": {
    "type": "image/png",
    "etag": "\"4011-05nACa4AK2JnCm5pmkZ/YhgcBvg\"",
    "mtime": "2024-11-06T08:15:39.711Z",
    "size": 16401,
    "path": "../public/assets/images/heat-pump-dehydrators.png"
  },
  "/assets/images/homepage_banner_product.jpg": {
    "type": "image/jpeg",
    "etag": "\"11e95-10PalOr91eIJSq85407pQk+mz80\"",
    "mtime": "2024-11-06T08:15:39.730Z",
    "size": 73365,
    "path": "../public/assets/images/homepage_banner_product.jpg"
  },
  "/assets/images/homepage_banner_product.png": {
    "type": "image/png",
    "etag": "\"2072f-Rg98AjTWIl7vYsni/pku2w1vgyA\"",
    "mtime": "2024-11-06T08:15:39.730Z",
    "size": 132911,
    "path": "../public/assets/images/homepage_banner_product.png"
  },
  "/assets/images/hospital-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"26ce-XVg6cf3Gjk6dypVsaAl+nyIePjk\"",
    "mtime": "2024-11-06T08:15:39.731Z",
    "size": 9934,
    "path": "../public/assets/images/hospital-cold-rooms.png"
  },
  "/assets/images/hospital.png": {
    "type": "image/png",
    "etag": "\"2b82-oz6+cvf5YSdu3K1RnolxG/TZN6w\"",
    "mtime": "2024-11-06T08:15:39.731Z",
    "size": 11138,
    "path": "../public/assets/images/hospital.png"
  },
  "/assets/images/hot-cooking.png": {
    "type": "image/png",
    "etag": "\"4d47-Icj3T4tRO/pMiMNLL9n+7hbFBB0\"",
    "mtime": "2024-11-06T08:15:39.732Z",
    "size": 19783,
    "path": "../public/assets/images/hot-cooking.png"
  },
  "/assets/images/hotel.png": {
    "type": "image/png",
    "etag": "\"2f28-v306yCJrNqKGpJuvKNyaSCW7xv4\"",
    "mtime": "2024-11-06T08:15:39.732Z",
    "size": 12072,
    "path": "../public/assets/images/hotel.png"
  },
  "/assets/images/human_resource.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f968-wUX24YHh4JWb+zZBYJpkFoQFL84\"",
    "mtime": "2024-11-06T08:15:39.733Z",
    "size": 194920,
    "path": "../public/assets/images/human_resource.jpg"
  },
  "/assets/images/hvac.png": {
    "type": "image/png",
    "etag": "\"65d3-oM39o2RDaeNwwLKbAAJyEA7JpDM\"",
    "mtime": "2024-11-06T08:15:39.733Z",
    "size": 26067,
    "path": "../public/assets/images/hvac.png"
  },
  "/assets/images/hygiene-products.png": {
    "type": "image/png",
    "etag": "\"3123-ds5sGjj0NCSpMdi/sIHawf/YTeM\"",
    "mtime": "2024-11-06T08:15:39.734Z",
    "size": 12579,
    "path": "../public/assets/images/hygiene-products.png"
  },
  "/assets/images/ice-cream-machines.png": {
    "type": "image/png",
    "etag": "\"3246-7hbTqjhTf+O/g5e9fG4mJHGlf3U\"",
    "mtime": "2024-11-06T08:15:39.734Z",
    "size": 12870,
    "path": "../public/assets/images/ice-cream-machines.png"
  },
  "/assets/images/image-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"c32ea-xgW55KiLuvRCZ03ce1nE+ciQo7I\"",
    "mtime": "2024-11-06T08:15:39.738Z",
    "size": 799466,
    "path": "../public/assets/images/image-1.jpeg"
  },
  "/assets/images/image-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"be6f2-GIHsm1aQ+uDJH6luwKS5yoYLx/k\"",
    "mtime": "2024-11-06T08:15:39.742Z",
    "size": 780018,
    "path": "../public/assets/images/image-2.jpeg"
  },
  "/assets/images/image1_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"128b6-jA3ESyHcyWy+zchOzQFrInnR5Zc\"",
    "mtime": "2024-11-06T08:15:39.743Z",
    "size": 75958,
    "path": "../public/assets/images/image1_design_c.jpg"
  },
  "/assets/images/image2_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"d64b-jkran6JyOeq9I1lKFfCzA6lN168\"",
    "mtime": "2024-11-06T08:15:39.743Z",
    "size": 54859,
    "path": "../public/assets/images/image2_design_c.jpg"
  },
  "/assets/images/image3_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"cfec-BYGnYQ3e+j5UB7klifxEnwTndBQ\"",
    "mtime": "2024-11-06T08:15:39.744Z",
    "size": 53228,
    "path": "../public/assets/images/image3_design_c.jpg"
  },
  "/assets/images/institutions.png": {
    "type": "image/png",
    "etag": "\"2e0b-6l64e7HPShBM8NcoBBJTxKOBy+4\"",
    "mtime": "2024-11-06T08:15:39.744Z",
    "size": 11787,
    "path": "../public/assets/images/institutions.png"
  },
  "/assets/images/juice-processors.png": {
    "type": "image/png",
    "etag": "\"358d-B+VlJq+7tQ5L1rpuXKDDxM2xrGQ\"",
    "mtime": "2024-11-06T08:15:39.744Z",
    "size": 13709,
    "path": "../public/assets/images/juice-processors.png"
  },
  "/assets/images/kitchen-smalls.png": {
    "type": "image/png",
    "etag": "\"220b-xcpi8lHbNg02Jucj5EGLtKqgUNU\"",
    "mtime": "2024-11-06T08:15:39.745Z",
    "size": 8715,
    "path": "../public/assets/images/kitchen-smalls.png"
  },
  "/assets/images/kitchen.png": {
    "type": "image/png",
    "etag": "\"2d19-6eNOa8pXoyzp/6pIuaYvcixtZZ8\"",
    "mtime": "2024-11-06T08:15:39.745Z",
    "size": 11545,
    "path": "../public/assets/images/kitchen.png"
  },
  "/assets/images/laundry-service.png": {
    "type": "image/png",
    "etag": "\"491e-w64z9iKA6aWhGmvdFPyxzNYGcPs\"",
    "mtime": "2024-11-06T08:15:39.746Z",
    "size": 18718,
    "path": "../public/assets/images/laundry-service.png"
  },
  "/assets/images/laundry.png": {
    "type": "image/png",
    "etag": "\"491e-w64z9iKA6aWhGmvdFPyxzNYGcPs\"",
    "mtime": "2024-11-06T08:15:39.746Z",
    "size": 18718,
    "path": "../public/assets/images/laundry.png"
  },
  "/assets/images/lightbox-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac76-oGth269B9GNWtW8PZ/XGTCeExqI\"",
    "mtime": "2024-11-06T08:15:39.747Z",
    "size": 109686,
    "path": "../public/assets/images/lightbox-1.jpg"
  },
  "/assets/images/lightbox-14.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3daf0-39ALkQEHr7H3GJSE7sRVxi3Rr54\"",
    "mtime": "2024-11-06T08:15:39.748Z",
    "size": 252656,
    "path": "../public/assets/images/lightbox-14.jpeg"
  },
  "/assets/images/lightbox-15.jpeg": {
    "type": "image/jpeg",
    "etag": "\"387b6-xgO4v+jqSbLHVxUQZ3Q3Dx61OAk\"",
    "mtime": "2024-11-06T08:15:39.750Z",
    "size": 231350,
    "path": "../public/assets/images/lightbox-15.jpeg"
  },
  "/assets/images/lightbox-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"5d32d-aXoU9rlXxQt/dgg7YRlCAIMZN98\"",
    "mtime": "2024-11-06T08:15:39.752Z",
    "size": 381741,
    "path": "../public/assets/images/lightbox-2.jpeg"
  },
  "/assets/images/lightbox-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"44fbd-MjwJAaLC+XCTzPWvDje9sGaHgO4\"",
    "mtime": "2024-11-06T08:15:39.754Z",
    "size": 282557,
    "path": "../public/assets/images/lightbox-3.jpeg"
  },
  "/assets/images/lightbox-8.jpeg": {
    "type": "image/jpeg",
    "etag": "\"2b5f2-AcRNwlIIu+VH4LCgn2LGaTHTvHA\"",
    "mtime": "2024-11-06T08:15:39.755Z",
    "size": 177650,
    "path": "../public/assets/images/lightbox-8.jpeg"
  },
  "/assets/images/list-blog-style-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3eb1-Yo8RVIY0zupiv3L9dazrsbaWeyo\"",
    "mtime": "2024-11-06T08:15:39.755Z",
    "size": 16049,
    "path": "../public/assets/images/list-blog-style-2.jpeg"
  },
  "/assets/images/list-blog-style-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3d5d-lFAygpEXpIih6wXMdMsUU4hbQ7Q\"",
    "mtime": "2024-11-06T08:15:39.756Z",
    "size": 15709,
    "path": "../public/assets/images/list-blog-style-3.jpeg"
  },
  "/assets/images/live_cooking.png": {
    "type": "image/png",
    "etag": "\"4a35-Gxo0EqvLBC1CwGx7DImyW6r1o5I\"",
    "mtime": "2024-11-06T08:15:39.756Z",
    "size": 18997,
    "path": "../public/assets/images/live_cooking.png"
  },
  "/assets/images/login-background.jpg": {
    "type": "image/jpeg",
    "etag": "\"41e96-l2kIHH3eSj4ObxYM0q4NkIyJWCc\"",
    "mtime": "2024-11-06T08:15:39.758Z",
    "size": 269974,
    "path": "../public/assets/images/login-background.jpg"
  },
  "/assets/images/logistics-&-accessories.png": {
    "type": "image/png",
    "etag": "\"38c0-7SHYvRuYDGx3EqnW4urY1GZSQkc\"",
    "mtime": "2024-11-06T08:15:39.758Z",
    "size": 14528,
    "path": "../public/assets/images/logistics-&-accessories.png"
  },
  "/assets/images/logo-footer.png": {
    "type": "image/png",
    "etag": "\"2d6-NTkfY6Ua05zTpQMC70AqoZ6wgMU\"",
    "mtime": "2024-11-06T08:15:39.759Z",
    "size": 726,
    "path": "../public/assets/images/logo-footer.png"
  },
  "/assets/images/logo-icon.png": {
    "type": "image/png",
    "etag": "\"21d-O9StvMSFiVkRNUq0HHCkgce9voA\"",
    "mtime": "2024-11-06T08:15:39.759Z",
    "size": 541,
    "path": "../public/assets/images/logo-icon.png"
  },
  "/assets/images/logo.old.png": {
    "type": "image/png",
    "etag": "\"137c0-4Skn8djeg3USkbddLeQWAs40K4c\"",
    "mtime": "2024-11-06T08:15:39.760Z",
    "size": 79808,
    "path": "../public/assets/images/logo.old.png"
  },
  "/assets/images/logo.png": {
    "type": "image/png",
    "etag": "\"12dad-TID607eqGsMdLGJJ7ojpNKvbAGQ\"",
    "mtime": "2024-11-06T08:15:39.760Z",
    "size": 77229,
    "path": "../public/assets/images/logo.png"
  },
  "/assets/images/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"425-lylKKDT8r51g/HVuA7fcONa+yl0\"",
    "mtime": "2024-11-06T08:15:39.761Z",
    "size": 1061,
    "path": "../public/assets/images/logo.svg"
  },
  "/assets/images/logo2.svg": {
    "type": "image/svg+xml",
    "etag": "\"414-E+wzQjMzUe60zTW1vDRnBfyaKuQ\"",
    "mtime": "2024-11-06T08:15:39.761Z",
    "size": 1044,
    "path": "../public/assets/images/logo2.svg"
  },
  "/assets/images/mask.png": {
    "type": "image/png",
    "etag": "\"1a96-C3jgnABzlS3Xs5ZFA/tbi5mpPCA\"",
    "mtime": "2024-11-06T08:15:39.761Z",
    "size": 6806,
    "path": "../public/assets/images/mask.png"
  },
  "/assets/images/masonry-blog-style-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"5829-/exGMSgtgPjhnOpwXBczFQOSLEM\"",
    "mtime": "2024-11-06T08:15:39.762Z",
    "size": 22569,
    "path": "../public/assets/images/masonry-blog-style-3.jpeg"
  },
  "/assets/images/masonry-blog-style-4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8592-gxbbFL0ZLn1jusCzdDowU/mpMBs\"",
    "mtime": "2024-11-06T08:15:39.762Z",
    "size": 34194,
    "path": "../public/assets/images/masonry-blog-style-4.jpeg"
  },
  "/assets/images/meat-preparation.png": {
    "type": "image/png",
    "etag": "\"2b3c-xTIO+SSfeU0/rNXYaRacPNfUHCk\"",
    "mtime": "2024-11-06T08:15:39.763Z",
    "size": 11068,
    "path": "../public/assets/images/meat-preparation.png"
  },
  "/assets/images/media_blogs.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e30b-mVtbEfiCgOSO1vfvPfBaAn4d7X0\"",
    "mtime": "2024-11-06T08:15:39.769Z",
    "size": 123659,
    "path": "../public/assets/images/media_blogs.jpg"
  },
  "/assets/images/media_documents.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c49-a+hOSYld9lu5ePY0HGQ3RHzUzF0\"",
    "mtime": "2024-11-06T08:15:39.769Z",
    "size": 40009,
    "path": "../public/assets/images/media_documents.jpg"
  },
  "/assets/images/media_gallery.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fa91-UifmCyIFzVF6Spcoc+pjPDdsaoU\"",
    "mtime": "2024-11-06T08:15:39.770Z",
    "size": 129681,
    "path": "../public/assets/images/media_gallery.jpg"
  },
  "/assets/images/media_in_the_news.jpg": {
    "type": "image/jpeg",
    "etag": "\"2011e-WSXBzgnndkxoyYaqObmdZG3YFJI\"",
    "mtime": "2024-11-06T08:15:39.771Z",
    "size": 131358,
    "path": "../public/assets/images/media_in_the_news.jpg"
  },
  "/assets/images/media_video.jpg": {
    "type": "image/jpeg",
    "etag": "\"15f05-wCfp0R7N9qlaFyeWRkVETLbpxCA\"",
    "mtime": "2024-11-06T08:15:39.772Z",
    "size": 89861,
    "path": "../public/assets/images/media_video.jpg"
  },
  "/assets/images/methodology-gray.jpg": {
    "type": "image/jpeg",
    "etag": "\"199b2-yvxAH4yDUxC6HxYMpVzfrPHP444\"",
    "mtime": "2024-11-06T08:15:39.801Z",
    "size": 104882,
    "path": "../public/assets/images/methodology-gray.jpg"
  },
  "/assets/images/methodology-gray.old.jpg": {
    "type": "image/jpeg",
    "etag": "\"44154-RDneUYCKW+pZMvv9fu119av8zc8\"",
    "mtime": "2024-11-06T08:15:39.803Z",
    "size": 278868,
    "path": "../public/assets/images/methodology-gray.old.jpg"
  },
  "/assets/images/methodology.jpg": {
    "type": "image/jpeg",
    "etag": "\"45268-A+x3Nz/o4LsOHUJnJlhhuSVlR+U\"",
    "mtime": "2024-11-06T08:15:39.805Z",
    "size": 283240,
    "path": "../public/assets/images/methodology.jpg"
  },
  "/assets/images/mindset.svg": {
    "type": "image/svg+xml",
    "etag": "\"3199-Fg54gaGYcL47cJ7iIo4YIqSdJfs\"",
    "mtime": "2024-11-06T08:15:39.810Z",
    "size": 12697,
    "path": "../public/assets/images/mindset.svg"
  },
  "/assets/images/mini-cold-rooms.old.png": {
    "type": "image/png",
    "etag": "\"3a76-yp6TIw8GnP3KgjWxp+pHbtZ5RfM\"",
    "mtime": "2024-11-06T08:15:39.810Z",
    "size": 14966,
    "path": "../public/assets/images/mini-cold-rooms.old.png"
  },
  "/assets/images/mini-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"224e-2/p2JdNNi0XqhpWsdWJQfbKO9W4\"",
    "mtime": "2024-11-06T08:15:39.811Z",
    "size": 8782,
    "path": "../public/assets/images/mini-cold-rooms.png"
  },
  "/assets/images/mobile-concepts.png": {
    "type": "image/png",
    "etag": "\"3a4e-apWkj5viAH3gj+NLzrKJk+iVF8Q\"",
    "mtime": "2024-11-06T08:15:39.811Z",
    "size": 14926,
    "path": "../public/assets/images/mobile-concepts.png"
  },
  "/assets/images/morgue.png": {
    "type": "image/png",
    "etag": "\"26ce-XVg6cf3Gjk6dypVsaAl+nyIePjk\"",
    "mtime": "2024-11-06T08:15:39.812Z",
    "size": 9934,
    "path": "../public/assets/images/morgue.png"
  },
  "/assets/images/nav-next-shadow.png": {
    "type": "image/png",
    "etag": "\"117-C0K8fIPD9ufTMS13swsemSGa+4s\"",
    "mtime": "2024-11-06T08:15:39.812Z",
    "size": 279,
    "path": "../public/assets/images/nav-next-shadow.png"
  },
  "/assets/images/nav-prev-shadow.png": {
    "type": "image/png",
    "etag": "\"11b-d0r5FB4FHSH6itg9SjGgBGN7rYY\"",
    "mtime": "2024-11-06T08:15:39.812Z",
    "size": 283,
    "path": "../public/assets/images/nav-prev-shadow.png"
  },
  "/assets/images/ngo.png": {
    "type": "image/png",
    "etag": "\"28e7-uc8FL39lplrX53edmv3/gZSYY70\"",
    "mtime": "2024-11-06T08:15:39.813Z",
    "size": 10471,
    "path": "../public/assets/images/ngo.png"
  },
  "/assets/images/oceans.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c983-TfScN3KBy81isdYJFUDfwIOLVxA\"",
    "mtime": "2024-11-06T08:15:39.814Z",
    "size": 182659,
    "path": "../public/assets/images/oceans.jpg"
  },
  "/assets/images/operations.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e1d0-9bzjn/JxgsXwVUbjOBrv5zGQg6E\"",
    "mtime": "2024-11-06T08:15:39.815Z",
    "size": 123344,
    "path": "../public/assets/images/operations.jpg"
  },
  "/assets/images/our_people_about_us.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d75f-E8zD2GM61kJ8BnwFlx/oRjm3YZ4\"",
    "mtime": "2024-11-06T08:15:39.817Z",
    "size": 186207,
    "path": "../public/assets/images/our_people_about_us.jpg"
  },
  "/assets/images/our_staff.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cf0a-PRm5U0sObpbDqSmHFj3dCzcPi5g\"",
    "mtime": "2024-11-06T08:15:39.818Z",
    "size": 118538,
    "path": "../public/assets/images/our_staff.jpg"
  },
  "/assets/images/ovens.png": {
    "type": "image/png",
    "etag": "\"2611-M8MXoas1w9bT8jbfHhFXjzBSt5I\"",
    "mtime": "2024-11-06T08:15:39.818Z",
    "size": 9745,
    "path": "../public/assets/images/ovens.png"
  },
  "/assets/images/p6.jpeg": {
    "type": "image/jpeg",
    "etag": "\"fe7-4tFlO3JiK9h8hPNlGo+g3XJjwx8\"",
    "mtime": "2024-11-06T08:15:39.818Z",
    "size": 4071,
    "path": "../public/assets/images/p6.jpeg"
  },
  "/assets/images/p7.jpeg": {
    "type": "image/jpeg",
    "etag": "\"fda-R3ChgZY/Bwmc+WulxcgfacrAlek\"",
    "mtime": "2024-11-06T08:15:39.819Z",
    "size": 4058,
    "path": "../public/assets/images/p7.jpeg"
  },
  "/assets/images/p9.jpeg": {
    "type": "image/jpeg",
    "etag": "\"15d7-vuEahHjxe10BbhKZGRO5AsyGZcA\"",
    "mtime": "2024-11-06T08:15:39.819Z",
    "size": 5591,
    "path": "../public/assets/images/p9.jpeg"
  },
  "/assets/images/packhouse-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"1c83-gkVsio79Y5vcXrlxkq6qzzbMFUI\"",
    "mtime": "2024-11-06T08:15:39.819Z",
    "size": 7299,
    "path": "../public/assets/images/packhouse-cold-rooms.png"
  },
  "/assets/images/page-header-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf0-x3L8oXgg4UwiU9frJy5asEz7XM4\"",
    "mtime": "2024-11-06T08:15:39.820Z",
    "size": 3312,
    "path": "../public/assets/images/page-header-bg.jpg"
  },
  "/assets/images/page_3_image.png": {
    "type": "image/png",
    "etag": "\"82e08-PKhWmS+i04IL9MvQpMmZQtnhrv0\"",
    "mtime": "2024-11-06T08:15:39.823Z",
    "size": 536072,
    "path": "../public/assets/images/page_3_image.png"
  },
  "/assets/images/partners1.png": {
    "type": "image/png",
    "etag": "\"9233c-wQfpc4YtyCdAOsIHI3+h6/vF8pg\"",
    "mtime": "2024-11-06T08:15:39.850Z",
    "size": 598844,
    "path": "../public/assets/images/partners1.png"
  },
  "/assets/images/partners2.png": {
    "type": "image/png",
    "etag": "\"7b89a-3t+eRLS2jP5O7Ejl5MkYf1l8LyI\"",
    "mtime": "2024-11-06T08:15:39.852Z",
    "size": 506010,
    "path": "../public/assets/images/partners2.png"
  },
  "/assets/images/partners4.png": {
    "type": "image/png",
    "etag": "\"baa60-OoPcu4PV4xM5qqhtXqxJ+vl8Luw\"",
    "mtime": "2024-11-06T08:15:39.856Z",
    "size": 764512,
    "path": "../public/assets/images/partners4.png"
  },
  "/assets/images/partners5.png": {
    "type": "image/png",
    "etag": "\"8bee3-g7J8jW/7iSKEVvQfEmP+x/ibBxI\"",
    "mtime": "2024-11-06T08:15:39.858Z",
    "size": 573155,
    "path": "../public/assets/images/partners5.png"
  },
  "/assets/images/partner_training.png": {
    "type": "image/png",
    "etag": "\"41f4-623dqRx8fJMj8ryeXQ6OF6grX+Q\"",
    "mtime": "2024-11-06T08:15:39.824Z",
    "size": 16884,
    "path": "../public/assets/images/partner_training.png"
  },
  "/assets/images/payments-summary.png": {
    "type": "image/png",
    "etag": "\"bd3-j0Jnje6FmdMALh5cDbUWGBZnnaM\"",
    "mtime": "2024-11-06T08:15:39.859Z",
    "size": 3027,
    "path": "../public/assets/images/payments-summary.png"
  },
  "/assets/images/payments.png": {
    "type": "image/png",
    "etag": "\"d3d-I1Fyeb6xm+c2bapfNF1UoEbMZlE\"",
    "mtime": "2024-11-06T08:15:39.859Z",
    "size": 3389,
    "path": "../public/assets/images/payments.png"
  },
  "/assets/images/pdf(1).png": {
    "type": "image/png",
    "etag": "\"2945-b9zQkllFO6wR3kBkup9eqdledEo\"",
    "mtime": "2024-11-06T08:15:39.860Z",
    "size": 10565,
    "path": "../public/assets/images/pdf(1).png"
  },
  "/assets/images/pdf.png": {
    "type": "image/png",
    "etag": "\"2945-b9zQkllFO6wR3kBkup9eqdledEo\"",
    "mtime": "2024-11-06T08:15:39.860Z",
    "size": 10565,
    "path": "../public/assets/images/pdf.png"
  },
  "/assets/images/popup.jpeg": {
    "type": "image/jpeg",
    "etag": "\"4ada8-bx5GblNFsGwuz5QGw+U1RvAc3cY\"",
    "mtime": "2024-11-06T08:15:39.862Z",
    "size": 306600,
    "path": "../public/assets/images/popup.jpeg"
  },
  "/assets/images/product-camera.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d8a-705olizTxC+fOxg4b2yBOC7UdRU\"",
    "mtime": "2024-11-06T08:15:39.862Z",
    "size": 11658,
    "path": "../public/assets/images/product-camera.jpg"
  },
  "/assets/images/product-headphones.jpg": {
    "type": "image/jpeg",
    "etag": "\"336e-bmOHfR/dD0v7cLa4nqJIgbLD0Ek\"",
    "mtime": "2024-11-06T08:15:39.862Z",
    "size": 13166,
    "path": "../public/assets/images/product-headphones.jpg"
  },
  "/assets/images/product-laptop.jpg": {
    "type": "image/jpeg",
    "etag": "\"284a-PF/moXDkS0Ji5kxU4EBvArhYStw\"",
    "mtime": "2024-11-06T08:15:39.863Z",
    "size": 10314,
    "path": "../public/assets/images/product-laptop.jpg"
  },
  "/assets/images/product-shoes.jpg": {
    "type": "image/jpeg",
    "etag": "\"339b-H/dYighYGIp3H3hb2/4IsJ+MDkk\"",
    "mtime": "2024-11-06T08:15:39.863Z",
    "size": 13211,
    "path": "../public/assets/images/product-shoes.jpg"
  },
  "/assets/images/product-watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"3420-e+DJXxkoaMIyQdtUj6/VAtj6Occ\"",
    "mtime": "2024-11-06T08:15:39.863Z",
    "size": 13344,
    "path": "../public/assets/images/product-watch.jpg"
  },
  "/assets/images/product_launch.png": {
    "type": "image/png",
    "etag": "\"467b-R94CFTpIf9G64Or78fDZatXtga0\"",
    "mtime": "2024-11-06T08:15:39.863Z",
    "size": 18043,
    "path": "../public/assets/images/product_launch.png"
  },
  "/assets/images/profile-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"d58-0aCT9XtMe9Pg1xAUyhdHuL1eg+Y\"",
    "mtime": "2024-11-06T08:15:39.865Z",
    "size": 3416,
    "path": "../public/assets/images/profile-1.jpeg"
  },
  "/assets/images/profile-10.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1016-0TDdhkG09lND1bYsZUYFX6G9Bf8\"",
    "mtime": "2024-11-06T08:15:39.865Z",
    "size": 4118,
    "path": "../public/assets/images/profile-10.jpeg"
  },
  "/assets/images/profile-11.jpeg": {
    "type": "image/jpeg",
    "etag": "\"f5a-7RD1VSIpMQwVxmOijG3ghQ8CWFg\"",
    "mtime": "2024-11-06T08:15:39.865Z",
    "size": 3930,
    "path": "../public/assets/images/profile-11.jpeg"
  },
  "/assets/images/profile-12.jpeg": {
    "type": "image/jpeg",
    "etag": "\"d04-M2xYnUzzh2fMjrrI8h1rbsqbkN8\"",
    "mtime": "2024-11-06T08:15:39.866Z",
    "size": 3332,
    "path": "../public/assets/images/profile-12.jpeg"
  },
  "/assets/images/profile-13.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1015-c5a/osXJtkTd+Dt2OzbUdklax8g\"",
    "mtime": "2024-11-06T08:15:39.866Z",
    "size": 4117,
    "path": "../public/assets/images/profile-13.jpeg"
  },
  "/assets/images/profile-14.jpeg": {
    "type": "image/jpeg",
    "etag": "\"121c-LToImPP7C95B/5cPdEphJ4StVLQ\"",
    "mtime": "2024-11-06T08:15:39.866Z",
    "size": 4636,
    "path": "../public/assets/images/profile-14.jpeg"
  },
  "/assets/images/profile-15.jpeg": {
    "type": "image/jpeg",
    "etag": "\"10c5-g9uXlHKw80MX2/U/fN/BJPN7OIQ\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 4293,
    "path": "../public/assets/images/profile-15.jpeg"
  },
  "/assets/images/profile-16.jpeg": {
    "type": "image/jpeg",
    "etag": "\"101f-fgcNm0MT6hJTlY5NXKSCkYHh2UE\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 4127,
    "path": "../public/assets/images/profile-16.jpeg"
  },
  "/assets/images/profile-17.jpeg": {
    "type": "image/jpeg",
    "etag": "\"12b4-Zbar+2kZDL9tzP0WJvErmiCTU1w\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 4788,
    "path": "../public/assets/images/profile-17.jpeg"
  },
  "/assets/images/profile-18.jpeg": {
    "type": "image/jpeg",
    "etag": "\"a4c-gSocJrOlw0EOcovVkfMXvoGULLI\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 2636,
    "path": "../public/assets/images/profile-18.jpeg"
  },
  "/assets/images/profile-19.jpeg": {
    "type": "image/jpeg",
    "etag": "\"12ef-n57tTyHnJTAjUI9Yzc6vzJMV2E8\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 4847,
    "path": "../public/assets/images/profile-19.jpeg"
  },
  "/assets/images/profile-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"f06-KI1tc0ayLi9ju9lKoQxd5IC4vic\"",
    "mtime": "2024-11-06T08:15:39.867Z",
    "size": 3846,
    "path": "../public/assets/images/profile-2.jpeg"
  },
  "/assets/images/profile-20.jpeg": {
    "type": "image/jpeg",
    "etag": "\"fe3-3EvijkYpRRYouZPcZS69GZsTt5Q\"",
    "mtime": "2024-11-06T08:15:39.868Z",
    "size": 4067,
    "path": "../public/assets/images/profile-20.jpeg"
  },
  "/assets/images/profile-21.jpeg": {
    "type": "image/jpeg",
    "etag": "\"12ec-3B6gUlxHPwlvp5sA36+52SPiL2M\"",
    "mtime": "2024-11-06T08:15:39.868Z",
    "size": 4844,
    "path": "../public/assets/images/profile-21.jpeg"
  },
  "/assets/images/profile-23.jpeg": {
    "type": "image/jpeg",
    "etag": "\"100e-Jc6xkQk3Mx8RNMrG2obvQdWYbBc\"",
    "mtime": "2024-11-06T08:15:39.868Z",
    "size": 4110,
    "path": "../public/assets/images/profile-23.jpeg"
  },
  "/assets/images/profile-24.jpeg": {
    "type": "image/jpeg",
    "etag": "\"dfa-xr/gT6rHBAnzJxFnxgqrreJx34w\"",
    "mtime": "2024-11-06T08:15:39.869Z",
    "size": 3578,
    "path": "../public/assets/images/profile-24.jpeg"
  },
  "/assets/images/profile-25.jpeg": {
    "type": "image/jpeg",
    "etag": "\"116f-d/Y89msRhzoCx0t6cKJ/6099BDM\"",
    "mtime": "2024-11-06T08:15:39.869Z",
    "size": 4463,
    "path": "../public/assets/images/profile-25.jpeg"
  },
  "/assets/images/profile-26.jpeg": {
    "type": "image/jpeg",
    "etag": "\"e65-QYcy3y2fmm7AOliQpNccnxKRdgw\"",
    "mtime": "2024-11-06T08:15:39.869Z",
    "size": 3685,
    "path": "../public/assets/images/profile-26.jpeg"
  },
  "/assets/images/profile-28.jpeg": {
    "type": "image/jpeg",
    "etag": "\"ec7-eJSPkdGRyKIK9oezSAnDJkweFQA\"",
    "mtime": "2024-11-06T08:15:39.870Z",
    "size": 3783,
    "path": "../public/assets/images/profile-28.jpeg"
  },
  "/assets/images/profile-29.jpeg": {
    "type": "image/jpeg",
    "etag": "\"159e-N7q7RwcJyePEEzxGTQY+77bjk3A\"",
    "mtime": "2024-11-06T08:15:39.870Z",
    "size": 5534,
    "path": "../public/assets/images/profile-29.jpeg"
  },
  "/assets/images/profile-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"112a-kYZVWetItFaQg5y4QWm5Zgw4UlY\"",
    "mtime": "2024-11-06T08:15:39.870Z",
    "size": 4394,
    "path": "../public/assets/images/profile-3.jpeg"
  },
  "/assets/images/profile-30.png": {
    "type": "image/png",
    "etag": "\"3ebf-Cp0ZKrHAm3opcKSaAWuYtPXtJ0w\"",
    "mtime": "2024-11-06T08:15:39.871Z",
    "size": 16063,
    "path": "../public/assets/images/profile-30.png"
  },
  "/assets/images/profile-31.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1088-09H4WjnOBQgSj0CHwfDSMaoM1ko\"",
    "mtime": "2024-11-06T08:15:39.871Z",
    "size": 4232,
    "path": "../public/assets/images/profile-31.jpeg"
  },
  "/assets/images/profile-32.jpeg": {
    "type": "image/jpeg",
    "etag": "\"11fe-I0+TDhtzW/yPFYvTeAQGsDDXZoQ\"",
    "mtime": "2024-11-06T08:15:39.872Z",
    "size": 4606,
    "path": "../public/assets/images/profile-32.jpeg"
  },
  "/assets/images/profile-33.jpeg": {
    "type": "image/jpeg",
    "etag": "\"16c7-LnvcAcR5fQRX2t4jm1FN86TxlT4\"",
    "mtime": "2024-11-06T08:15:39.872Z",
    "size": 5831,
    "path": "../public/assets/images/profile-33.jpeg"
  },
  "/assets/images/profile-34.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1339-BR4ZyzwZzCD9ipCbAWWCNdwBKFU\"",
    "mtime": "2024-11-06T08:15:39.873Z",
    "size": 4921,
    "path": "../public/assets/images/profile-34.jpeg"
  },
  "/assets/images/profile-4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"105d-wHh3/ewSihUjVeHUxCNDU4jVM5c\"",
    "mtime": "2024-11-06T08:15:39.873Z",
    "size": 4189,
    "path": "../public/assets/images/profile-4.jpeg"
  },
  "/assets/images/profile-5.jpeg": {
    "type": "image/jpeg",
    "etag": "\"d3e-lnfXxOBk+zra1fnwx9TXkClTtq8\"",
    "mtime": "2024-11-06T08:15:39.874Z",
    "size": 3390,
    "path": "../public/assets/images/profile-5.jpeg"
  },
  "/assets/images/profile-6.jpeg": {
    "type": "image/jpeg",
    "etag": "\"e9b-CO2P88lPo6l0zvVEIi826n4cTBA\"",
    "mtime": "2024-11-06T08:15:39.874Z",
    "size": 3739,
    "path": "../public/assets/images/profile-6.jpeg"
  },
  "/assets/images/profile-7.jpeg": {
    "type": "image/jpeg",
    "etag": "\"125a-zcmUvA1HsOaViHurLPsDeH/ANhc\"",
    "mtime": "2024-11-06T08:15:39.874Z",
    "size": 4698,
    "path": "../public/assets/images/profile-7.jpeg"
  },
  "/assets/images/profile-8.jpeg": {
    "type": "image/jpeg",
    "etag": "\"10dc-0DJlpiTCitVASP8HWauM6hwTLgo\"",
    "mtime": "2024-11-06T08:15:39.875Z",
    "size": 4316,
    "path": "../public/assets/images/profile-8.jpeg"
  },
  "/assets/images/profile-9.jpeg": {
    "type": "image/jpeg",
    "etag": "\"135f-s2jF/gIZ7mdY+fgWcl94bVDEtxA\"",
    "mtime": "2024-11-06T08:15:39.875Z",
    "size": 4959,
    "path": "../public/assets/images/profile-9.jpeg"
  },
  "/assets/images/projects_sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"1bcdb-tKi0uGCe3hxCfdvXwVyptWUCtfc\"",
    "mtime": "2024-11-06T08:15:39.880Z",
    "size": 113883,
    "path": "../public/assets/images/projects_sheffield.jpg"
  },
  "/assets/images/provide_training.jpg": {
    "type": "image/jpeg",
    "etag": "\"225a7-FpKLnf2XmLTxg77Y4Rj5KkHRh40\"",
    "mtime": "2024-11-06T08:15:39.881Z",
    "size": 140711,
    "path": "../public/assets/images/provide_training.jpg"
  },
  "/assets/images/quality.jpg": {
    "type": "image/jpeg",
    "etag": "\"19c59-xBMXbFgFr7a4ccNr7MCnYrqbsk4\"",
    "mtime": "2024-11-06T08:15:39.882Z",
    "size": 105561,
    "path": "../public/assets/images/quality.jpg"
  },
  "/assets/images/rational-combi-steamer.png": {
    "type": "image/png",
    "etag": "\"2c5c-7XUPQJMfCRvyXWyHqeYJnwuAev0\"",
    "mtime": "2024-11-06T08:15:39.882Z",
    "size": 11356,
    "path": "../public/assets/images/rational-combi-steamer.png"
  },
  "/assets/images/refrigeration.png": {
    "type": "image/png",
    "etag": "\"137f-pDOgh61eKeHWfyKrojx4yN51/Yc\"",
    "mtime": "2024-11-06T08:15:39.883Z",
    "size": 4991,
    "path": "../public/assets/images/refrigeration.png"
  },
  "/assets/images/residentials.png": {
    "type": "image/png",
    "etag": "\"4e5f-q5B510qfm7y5kPetQv4iFeqBphU\"",
    "mtime": "2024-11-06T08:15:39.883Z",
    "size": 20063,
    "path": "../public/assets/images/residentials.png"
  },
  "/assets/images/restaurant.png": {
    "type": "image/png",
    "etag": "\"48b8-zT08WJjM9oiid/Dros54Vy4r290\"",
    "mtime": "2024-11-06T08:15:39.884Z",
    "size": 18616,
    "path": "../public/assets/images/restaurant.png"
  },
  "/assets/images/retail-panels.png": {
    "type": "image/png",
    "etag": "\"42b3-wxfUxbUQ3pA8W5KEMPGzOiZn+0k\"",
    "mtime": "2024-11-06T08:15:39.884Z",
    "size": 17075,
    "path": "../public/assets/images/retail-panels.png"
  },
  "/assets/images/retail.png": {
    "type": "image/png",
    "etag": "\"4ac0-Q7Pf1gYQxG991Knekm7pVZ96B5E\"",
    "mtime": "2024-11-06T08:15:39.884Z",
    "size": 19136,
    "path": "../public/assets/images/retail.png"
  },
  "/assets/images/ripening-chambers.png": {
    "type": "image/png",
    "etag": "\"2d5c-vgRld1EW77/T8+vJsEnKPWlA+R8\"",
    "mtime": "2024-11-06T08:15:39.885Z",
    "size": 11612,
    "path": "../public/assets/images/ripening-chambers.png"
  },
  "/assets/images/rnd.jpg": {
    "type": "image/jpeg",
    "etag": "\"23cad-WDPQJriHFwNvWi0Y2YMMo5bI4xQ\"",
    "mtime": "2024-11-06T08:15:39.886Z",
    "size": 146605,
    "path": "../public/assets/images/rnd.jpg"
  },
  "/assets/images/RoleResource.php": {
    "type": "application/x-httpd-php",
    "etag": "\"248-0xYSpIBazTvNOnNBOlXiZOuakvo\"",
    "mtime": "2024-11-06T08:15:38.828Z",
    "size": 584,
    "path": "../public/assets/images/RoleResource.php"
  },
  "/assets/images/sales_and_marketing.jpg": {
    "type": "image/jpeg",
    "etag": "\"275a1-oNDwUb9Tl74O//nGum8DGV3mVhE\"",
    "mtime": "2024-11-06T08:15:39.887Z",
    "size": 161185,
    "path": "../public/assets/images/sales_and_marketing.jpg"
  },
  "/assets/images/scroll-6.jpeg": {
    "type": "image/jpeg",
    "etag": "\"6687-uKHlmNzdHsJaNLKQA9HSe6hpb7k\"",
    "mtime": "2024-11-06T08:15:39.887Z",
    "size": 26247,
    "path": "../public/assets/images/scroll-6.jpeg"
  },
  "/assets/images/scroll-7.jpeg": {
    "type": "image/jpeg",
    "etag": "\"a55e-aSNCkYoBsnPu8E3mrNWxDR/xdw4\"",
    "mtime": "2024-11-06T08:15:39.888Z",
    "size": 42334,
    "path": "../public/assets/images/scroll-7.jpeg"
  },
  "/assets/images/scroll-8.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3067-5RKlD9t1agq3nc9KIcZONXjaNDw\"",
    "mtime": "2024-11-06T08:15:39.888Z",
    "size": 12391,
    "path": "../public/assets/images/scroll-8.jpeg"
  },
  "/assets/images/semi-commercial-range.png": {
    "type": "image/png",
    "etag": "\"3d4b-3d8HJbrn9f4a732dAvarf6jhJ8o\"",
    "mtime": "2024-11-06T08:15:39.889Z",
    "size": 15691,
    "path": "../public/assets/images/semi-commercial-range.png"
  },
  "/assets/images/sheffield csr.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e646-LcFvgFrR9mHooi01WZEHsoWv6W8\"",
    "mtime": "2024-11-06T08:15:39.890Z",
    "size": 124486,
    "path": "../public/assets/images/sheffield csr.jpg"
  },
  "/assets/images/Sheffield Partners.jpg": {
    "type": "image/jpeg",
    "etag": "\"4087f-Ej4l2o1+RSghmuRyu8YIId0L5qg\"",
    "mtime": "2024-11-06T08:15:38.829Z",
    "size": 264319,
    "path": "../public/assets/images/Sheffield Partners.jpg"
  },
  "/assets/images/sheffield-stainless-steel.jpg": {
    "type": "image/jpeg",
    "etag": "\"151dc-bklAxipvSoIy2OexcTj4oods7xY\"",
    "mtime": "2024-11-06T08:15:39.897Z",
    "size": 86492,
    "path": "../public/assets/images/sheffield-stainless-steel.jpg"
  },
  "/assets/images/sheffield_advantage.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a06b-xf7Vvb/Svt/phIoeMjyUaQ70wjk\"",
    "mtime": "2024-11-06T08:15:39.898Z",
    "size": 106603,
    "path": "../public/assets/images/sheffield_advantage.jpg"
  },
  "/assets/images/sheffield_advantage_embosed(1).jpg": {
    "type": "image/jpeg",
    "etag": "\"1fc65-Rc07PbnlhvNVjwa2WnLeAw0hoNw\"",
    "mtime": "2024-11-06T08:15:39.899Z",
    "size": 130149,
    "path": "../public/assets/images/sheffield_advantage_embosed(1).jpg"
  },
  "/assets/images/sheffield_advantage_embosed.jpg": {
    "type": "image/jpeg",
    "etag": "\"23b87-gL+5tydGZVi/AmY/n/tq9CDMP3U\"",
    "mtime": "2024-11-06T08:15:39.900Z",
    "size": 146311,
    "path": "../public/assets/images/sheffield_advantage_embosed.jpg"
  },
  "/assets/images/sheffield_advantage_embosed_old.jpg": {
    "type": "image/jpeg",
    "etag": "\"206ed-gEkEvsBIPLji1yCI1fOmzwovAJM\"",
    "mtime": "2024-11-06T08:15:39.901Z",
    "size": 132845,
    "path": "../public/assets/images/sheffield_advantage_embosed_old.jpg"
  },
  "/assets/images/sheffield_building_about.jpg": {
    "type": "image/jpeg",
    "etag": "\"2500e-8Q4vp449rdx4DHkkov/wzj7LlZE\"",
    "mtime": "2024-11-06T08:15:39.902Z",
    "size": 151566,
    "path": "../public/assets/images/sheffield_building_about.jpg"
  },
  "/assets/images/sheffield_career.jpg": {
    "type": "image/jpeg",
    "etag": "\"331ff-7HgmkOMiGskvW7h6jvNLZvehdQ0\"",
    "mtime": "2024-11-06T08:15:39.903Z",
    "size": 209407,
    "path": "../public/assets/images/sheffield_career.jpg"
  },
  "/assets/images/sheffield_stainless_steel.jpg": {
    "type": "image/jpeg",
    "etag": "\"1f31c-bHaffaJKEWWpTds4KAnTtU9kY4s\"",
    "mtime": "2024-11-06T08:15:39.904Z",
    "size": 127772,
    "path": "../public/assets/images/sheffield_stainless_steel.jpg"
  },
  "/assets/images/sheffield_stainless_steel_background.jpg": {
    "type": "image/jpeg",
    "etag": "\"26de6-s4T5yTv72kwjGeNJm9ZaLfaSFg4\"",
    "mtime": "2024-11-06T08:15:39.905Z",
    "size": 159206,
    "path": "../public/assets/images/sheffield_stainless_steel_background.jpg"
  },
  "/assets/images/sheffield_stainless_steel_background_old.jpg": {
    "type": "image/jpeg",
    "etag": "\"26de6-s4T5yTv72kwjGeNJm9ZaLfaSFg4\"",
    "mtime": "2024-11-06T08:15:39.907Z",
    "size": 159206,
    "path": "../public/assets/images/sheffield_stainless_steel_background_old.jpg"
  },
  "/assets/images/sheffield_stainless_steel_homepage.jpg": {
    "type": "image/jpeg",
    "etag": "\"26de6-s4T5yTv72kwjGeNJm9ZaLfaSFg4\"",
    "mtime": "2024-11-06T08:15:39.908Z",
    "size": 159206,
    "path": "../public/assets/images/sheffield_stainless_steel_homepage.jpg"
  },
  "/assets/images/sheffield_stainless_steel_homepage_background.png": {
    "type": "image/png",
    "etag": "\"23a7d-KQphiLIOPBGewe1E6GTALdYnI0A\"",
    "mtime": "2024-11-06T08:15:39.909Z",
    "size": 146045,
    "path": "../public/assets/images/sheffield_stainless_steel_homepage_background.png"
  },
  "/assets/images/sheffield_stainless_steel_homepage_background_copy.png": {
    "type": "image/png",
    "etag": "\"36fde-iTsEJdRDlIwi4ysFxDtJ1/8bn30\"",
    "mtime": "2024-11-06T08:15:39.910Z",
    "size": 225246,
    "path": "../public/assets/images/sheffield_stainless_steel_homepage_background_copy.png"
  },
  "/assets/images/sheffield_stainless_steel_homepage_background_old.png": {
    "type": "image/png",
    "etag": "\"6dbf6-6f1CZB5mI+umOknvp/LbypXtpeM\"",
    "mtime": "2024-11-06T08:15:39.912Z",
    "size": 449526,
    "path": "../public/assets/images/sheffield_stainless_steel_homepage_background_old.png"
  },
  "/assets/images/slider-1.jpeg": {
    "type": "image/jpeg",
    "etag": "\"7b97-iNnc4o0xNvzxwUfGNP+Ip0dDAu0\"",
    "mtime": "2024-11-06T08:15:39.924Z",
    "size": 31639,
    "path": "../public/assets/images/slider-1.jpeg"
  },
  "/assets/images/slider-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"2cc8-PzkU5Y8ulHzxTxxwL2n3eJiJ+Qw\"",
    "mtime": "2024-11-06T08:15:39.924Z",
    "size": 11464,
    "path": "../public/assets/images/slider-2.jpeg"
  },
  "/assets/images/slider-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"4314-IkD67z907QI95F+6+/Zqkvf5zqg\"",
    "mtime": "2024-11-06T08:15:39.925Z",
    "size": 17172,
    "path": "../public/assets/images/slider-3.jpeg"
  },
  "/assets/images/soft-drink.png": {
    "type": "image/png",
    "etag": "\"1ce4-naH0/l1oJWpzvacBU7ABqdaciiY\"",
    "mtime": "2024-11-06T08:15:39.928Z",
    "size": 7396,
    "path": "../public/assets/images/soft-drink.png"
  },
  "/assets/images/solar-powered-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"4306-fyE7/Q0fz+4TGsRo75+9LT8Bl84\"",
    "mtime": "2024-11-06T08:15:39.928Z",
    "size": 17158,
    "path": "../public/assets/images/solar-powered-cold-rooms.png"
  },
  "/assets/images/stainless-steel-fabrication.png": {
    "type": "image/png",
    "etag": "\"1095-GUdzUNhbkC1fkemXryjnlo9LUbQ\"",
    "mtime": "2024-11-06T08:15:39.928Z",
    "size": 4245,
    "path": "../public/assets/images/stainless-steel-fabrication.png"
  },
  "/assets/images/storage.png": {
    "type": "image/png",
    "etag": "\"10db-VeoS4tVza+ttZ2i155IqLMzQcRw\"",
    "mtime": "2024-11-06T08:15:39.929Z",
    "size": 4315,
    "path": "../public/assets/images/storage.png"
  },
  "/assets/images/sweet-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"39d1-rSUfq9idVqUhqssh+QIxfUGtKXM\"",
    "mtime": "2024-11-06T08:15:39.929Z",
    "size": 14801,
    "path": "../public/assets/images/sweet-bg.jpg"
  },
  "/assets/images/taskboard.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c39-7/xglDwaGYobSvse14zlFSnjato\"",
    "mtime": "2024-11-06T08:15:39.929Z",
    "size": 11321,
    "path": "../public/assets/images/taskboard.jpg"
  },
  "/assets/images/thumbs-up.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b63-iom/X6b9Zn4tT1RDX75Hy2qqgaE\"",
    "mtime": "2024-11-06T08:15:39.930Z",
    "size": 19299,
    "path": "../public/assets/images/thumbs-up.jpg"
  },
  "/assets/images/tl-2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"94e0-M7++MQT9J3PXeesJG2cijtzTgpI\"",
    "mtime": "2024-11-06T08:15:39.931Z",
    "size": 38112,
    "path": "../public/assets/images/tl-2.jpeg"
  },
  "/assets/images/tl-3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"7d30-9OOODSHEK1LbZuYJ1IjE2PGRpng\"",
    "mtime": "2024-11-06T08:15:39.931Z",
    "size": 32048,
    "path": "../public/assets/images/tl-3.jpeg"
  },
  "/assets/images/tl-4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"5aa9-XfM+aK1JiOj4SA2fkbIiYLTe7BQ\"",
    "mtime": "2024-11-06T08:15:39.932Z",
    "size": 23209,
    "path": "../public/assets/images/tl-4.jpeg"
  },
  "/assets/images/tl-5.jpeg": {
    "type": "image/jpeg",
    "etag": "\"6033-YKnsLC88QAurpeGJS6XhX0nrH6Y\"",
    "mtime": "2024-11-06T08:15:39.932Z",
    "size": 24627,
    "path": "../public/assets/images/tl-5.jpeg"
  },
  "/assets/images/training.png": {
    "type": "image/png",
    "etag": "\"4c41-i3tEeuyrnWLWNxhxPmBonU98CT8\"",
    "mtime": "2024-11-06T08:15:39.933Z",
    "size": 19521,
    "path": "../public/assets/images/training.png"
  },
  "/assets/images/tree.jpg": {
    "type": "image/jpeg",
    "etag": "\"1315a-V3gqTTXLWStIbg487yYijeQlxhc\"",
    "mtime": "2024-11-06T08:15:39.933Z",
    "size": 78170,
    "path": "../public/assets/images/tree.jpg"
  },
  "/assets/images/tumble-dryer.png": {
    "type": "image/png",
    "etag": "\"4772-dNM1nA4FWodRaVVu5vvYD/lngVY\"",
    "mtime": "2024-11-06T08:15:39.934Z",
    "size": 18290,
    "path": "../public/assets/images/tumble-dryer.png"
  },
  "/assets/images/user-avtar.svg": {
    "type": "image/svg+xml",
    "etag": "\"11d-2eru2GT6jyPxribX53VLEQioxPQ\"",
    "mtime": "2024-11-06T08:15:39.934Z",
    "size": 285,
    "path": "../public/assets/images/user-avtar.svg"
  },
  "/assets/images/user-profile.jpeg": {
    "type": "image/jpeg",
    "etag": "\"2e56-zDPR4+1X3C/VE5mPtPhBSpMJN3Y\"",
    "mtime": "2024-11-06T08:15:39.934Z",
    "size": 11862,
    "path": "../public/assets/images/user-profile.jpeg"
  },
  "/assets/images/vegetable-preparation.png": {
    "type": "image/png",
    "etag": "\"2962-52gCvt479s9nbuAGcpxZqxd+T9I\"",
    "mtime": "2024-11-06T08:15:39.935Z",
    "size": 10594,
    "path": "../public/assets/images/vegetable-preparation.png"
  },
  "/assets/images/video_preview.jpg": {
    "type": "image/jpeg",
    "etag": "\"1862c-Zbh+hQd3dBvlrbWM4K6mc9Im1OM\"",
    "mtime": "2024-11-06T08:15:39.936Z",
    "size": 99884,
    "path": "../public/assets/images/video_preview.jpg"
  },
  "/assets/images/warranty.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fcbc-q9LUhYQ58JzN1DjAg+dT2RkdRXs\"",
    "mtime": "2024-11-06T08:15:39.938Z",
    "size": 195772,
    "path": "../public/assets/images/warranty.jpg"
  },
  "/assets/images/washer-extractors.png": {
    "type": "image/png",
    "etag": "\"6112-86XDPN5tycr/bzWpxffDwUV/8Pk\"",
    "mtime": "2024-11-06T08:15:39.938Z",
    "size": 24850,
    "path": "../public/assets/images/washer-extractors.png"
  },
  "/assets/images/wave-1.png": {
    "type": "image/png",
    "etag": "\"21b4-qkLxZ1PD/x/mdIWNcbvxHsloOBc\"",
    "mtime": "2024-11-06T08:15:39.939Z",
    "size": 8628,
    "path": "../public/assets/images/wave-1.png"
  },
  "/assets/images/wave-red.png": {
    "type": "image/png",
    "etag": "\"b422-QCgUXdVxzoeaKgUmhT0Vqf/bYKQ\"",
    "mtime": "2024-11-06T08:15:39.940Z",
    "size": 46114,
    "path": "../public/assets/images/wave-red.png"
  },
  "/assets/images/wave.png": {
    "type": "image/png",
    "etag": "\"6095-ka/MiW4mLdVE/E6HfRiLHW5+RC8\"",
    "mtime": "2024-11-06T08:15:39.941Z",
    "size": 24725,
    "path": "../public/assets/images/wave.png"
  },
  "/assets/images/Website Banner_Kitchen.jpg": {
    "type": "image/jpeg",
    "etag": "\"24cbb-Bs5jRnshUrHB3YWVYVTmF6/7eSg\"",
    "mtime": "2024-11-06T08:15:38.835Z",
    "size": 150715,
    "path": "../public/assets/images/Website Banner_Kitchen.jpg"
  },
  "/assets/images/welding.jpg": {
    "type": "image/jpeg",
    "etag": "\"29997-lEr7/yf/8geR652JbDb28j5OCj4\"",
    "mtime": "2024-11-06T08:15:39.941Z",
    "size": 170391,
    "path": "../public/assets/images/welding.jpg"
  },
  "/assets/images/wet-&-dry-cleaning.png": {
    "type": "image/png",
    "etag": "\"4778-p+viwyB5XZNyyG+0iC1LcoOmMLc\"",
    "mtime": "2024-11-06T08:15:39.942Z",
    "size": 18296,
    "path": "../public/assets/images/wet-&-dry-cleaning.png"
  },
  "/assets/images/wind_energy.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9fd-HErJsApvH1PzgHvjrz0viFMEIyI\"",
    "mtime": "2024-11-06T08:15:39.943Z",
    "size": 51709,
    "path": "../public/assets/images/wind_energy.jpg"
  },
  "/assets/images/working-happy-chef(1).jpg": {
    "type": "image/jpeg",
    "etag": "\"1ce88-3vfZhOD0GpjG2Z+XeRh8mkPtlgY\"",
    "mtime": "2024-11-06T08:15:39.944Z",
    "size": 118408,
    "path": "../public/assets/images/working-happy-chef(1).jpg"
  },
  "/assets/images/working-happy-chef.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ce88-3vfZhOD0GpjG2Z+XeRh8mkPtlgY\"",
    "mtime": "2024-11-06T08:15:39.945Z",
    "size": 118408,
    "path": "../public/assets/images/working-happy-chef.jpg"
  },
  "/assets/images/workshop.jpg": {
    "type": "image/jpeg",
    "etag": "\"1dd81-b1/LD5nobcruNE1KJ+G0kI/RCqI\"",
    "mtime": "2024-11-06T08:15:39.947Z",
    "size": 122241,
    "path": "../public/assets/images/workshop.jpg"
  },
  "/assets/images/workshop_sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"3139a-9+q59aKO8/f3KSbBlK8AarHGZa4\"",
    "mtime": "2024-11-06T08:15:39.949Z",
    "size": 201626,
    "path": "../public/assets/images/workshop_sheffield.jpg"
  },
  "/assets/css/demos/carousel-layout.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"35ea-Z98jx+RhSYTi0Goj/K74KmwKUjU\"",
    "mtime": "2024-12-02T12:49:17.806Z",
    "size": 13802,
    "path": "../public/assets/css/demos/carousel-layout.css"
  },
  "/assets/css/demos/demo-10.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29a2-W++3PUrCLrElcvTIFNe22q38Ls0\"",
    "mtime": "2024-12-02T12:49:17.807Z",
    "size": 10658,
    "path": "../public/assets/css/demos/demo-10.css"
  },
  "/assets/css/demos/demo-11.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2334-bpn8YBX88LFyP+0iGqnsAoDJGgk\"",
    "mtime": "2024-12-02T12:49:17.808Z",
    "size": 9012,
    "path": "../public/assets/css/demos/demo-11.css"
  },
  "/assets/css/demos/demo-12.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1be9-hbktCrXe0HY7LxQrTeyfSUpgyyA\"",
    "mtime": "2024-12-02T12:49:17.809Z",
    "size": 7145,
    "path": "../public/assets/css/demos/demo-12.css"
  },
  "/assets/css/demos/demo-13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"540c-acv8W+LoO6vBvtLj80zAF+vuVNA\"",
    "mtime": "2024-12-02T12:49:17.810Z",
    "size": 21516,
    "path": "../public/assets/css/demos/demo-13.css"
  },
  "/assets/css/demos/demo-14.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"424d-V7DynXtJwZEqbQN4ZVam9Z3CCVw\"",
    "mtime": "2024-12-02T12:49:17.811Z",
    "size": 16973,
    "path": "../public/assets/css/demos/demo-14.css"
  },
  "/assets/css/demos/demo-15.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25ee-96p0Wf7j3T+9R0UB3fgUiu4g7SU\"",
    "mtime": "2024-12-02T12:49:17.812Z",
    "size": 9710,
    "path": "../public/assets/css/demos/demo-15.css"
  },
  "/assets/css/demos/demo-16.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2df1-GTvz5+BSqvea8zPH30fme5II70Q\"",
    "mtime": "2024-12-02T12:49:17.812Z",
    "size": 11761,
    "path": "../public/assets/css/demos/demo-16.css"
  },
  "/assets/css/demos/demo-17.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"22b4-PfGvIgmKBlJa1EqUX5Mn3d9A2Tg\"",
    "mtime": "2024-12-02T12:49:17.813Z",
    "size": 8884,
    "path": "../public/assets/css/demos/demo-17.css"
  },
  "/assets/css/demos/demo-18.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3157-G1Ns2P1RHXnY6CWEtlz5cpdUiac\"",
    "mtime": "2024-12-02T12:49:17.814Z",
    "size": 12631,
    "path": "../public/assets/css/demos/demo-18.css"
  },
  "/assets/css/demos/demo-19.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3cf6-xC0Cywa1s5SOCeHUFlG5E/jUHAU\"",
    "mtime": "2024-12-02T12:49:17.815Z",
    "size": 15606,
    "path": "../public/assets/css/demos/demo-19.css"
  },
  "/assets/css/demos/demo-2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"287f-FTtoekOdlcHSRfkXsT+IOzs29/0\"",
    "mtime": "2024-12-02T12:49:17.817Z",
    "size": 10367,
    "path": "../public/assets/css/demos/demo-2.css"
  },
  "/assets/css/demos/demo-20.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28d5-K0sSMSyrqR7XV8+GuJzq1xyb9JM\"",
    "mtime": "2024-12-02T12:49:17.817Z",
    "size": 10453,
    "path": "../public/assets/css/demos/demo-20.css"
  },
  "/assets/css/demos/demo-21.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"518f-riHLWoMW2K1qqFZAMozOcMggblM\"",
    "mtime": "2024-12-02T12:49:17.818Z",
    "size": 20879,
    "path": "../public/assets/css/demos/demo-21.css"
  },
  "/assets/css/demos/demo-22.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"84cd-2Cd0Ssv/dlXKlxKNhsTl855NU4o\"",
    "mtime": "2024-12-02T12:49:17.819Z",
    "size": 33997,
    "path": "../public/assets/css/demos/demo-22.css"
  },
  "/assets/css/demos/demo-23.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4b59-m32XCQR5eL1aJ7d+s/U/d/1kjn4\"",
    "mtime": "2024-12-02T12:49:17.820Z",
    "size": 19289,
    "path": "../public/assets/css/demos/demo-23.css"
  },
  "/assets/css/demos/demo-24.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5420-MDlfcPdKrKY+qGf1uGeOx1mua5s\"",
    "mtime": "2024-12-02T12:49:17.821Z",
    "size": 21536,
    "path": "../public/assets/css/demos/demo-24.css"
  },
  "/assets/css/demos/demo-25.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2382-wPk8lqWFjsgBxbMQR3IZxxqoypE\"",
    "mtime": "2024-12-02T12:49:17.822Z",
    "size": 9090,
    "path": "../public/assets/css/demos/demo-25.css"
  },
  "/assets/css/demos/demo-26.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"441f-F3fEsuilp/xcotNAhwJZvUoShK4\"",
    "mtime": "2024-12-02T12:49:17.823Z",
    "size": 17439,
    "path": "../public/assets/css/demos/demo-26.css"
  },
  "/assets/css/demos/demo-27.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3afc-MPMbId5qGQotJnD07hT3xR7GdEQ\"",
    "mtime": "2024-12-02T12:49:17.824Z",
    "size": 15100,
    "path": "../public/assets/css/demos/demo-27.css"
  },
  "/assets/css/demos/demo-28.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"365a-wWTBeOF7yeSms6bHJ9haVmSXTeY\"",
    "mtime": "2024-12-02T12:49:17.825Z",
    "size": 13914,
    "path": "../public/assets/css/demos/demo-28.css"
  },
  "/assets/css/demos/demo-29.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4d80-4S2HtareKJWnT7IMytjOwzcpM9c\"",
    "mtime": "2024-12-02T12:49:17.830Z",
    "size": 19840,
    "path": "../public/assets/css/demos/demo-29.css"
  },
  "/assets/css/demos/demo-3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3001-ku73dDQnoZpFTUcrQ0Z5tnmbDQ4\"",
    "mtime": "2024-12-02T12:49:17.832Z",
    "size": 12289,
    "path": "../public/assets/css/demos/demo-3.css"
  },
  "/assets/css/demos/demo-30.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"441b-n+AE/kcu/ft3oZ+hG6PNpKoUzqE\"",
    "mtime": "2024-12-02T12:49:17.838Z",
    "size": 17435,
    "path": "../public/assets/css/demos/demo-30.css"
  },
  "/assets/css/demos/demo-31.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"300d-B2JYXNjwIoH7i5jd9xsiFRItB6Y\"",
    "mtime": "2024-12-02T12:49:17.840Z",
    "size": 12301,
    "path": "../public/assets/css/demos/demo-31.css"
  },
  "/assets/css/demos/demo-4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3198-ihX0hLOs7uX2fTC+CdUeTPSXoPc\"",
    "mtime": "2024-12-02T12:49:17.841Z",
    "size": 12696,
    "path": "../public/assets/css/demos/demo-4.css"
  },
  "/assets/css/demos/demo-5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b4e-q4M/MZteVkMNF5XD2VTcNBI1bzQ\"",
    "mtime": "2024-12-02T12:49:17.842Z",
    "size": 15182,
    "path": "../public/assets/css/demos/demo-5.css"
  },
  "/assets/css/demos/demo-6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3aa3-Ma3wUKXswDmWWq3683BSlV+lwYA\"",
    "mtime": "2024-12-02T12:49:17.843Z",
    "size": 15011,
    "path": "../public/assets/css/demos/demo-6.css"
  },
  "/assets/css/demos/demo-7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a0e-BiekpD5Rh5QmS0oVU7bgKCt1lnE\"",
    "mtime": "2024-12-02T12:49:17.844Z",
    "size": 10766,
    "path": "../public/assets/css/demos/demo-7.css"
  },
  "/assets/css/demos/demo-8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ad4-nRNdaou7OBFwHTzcJLVJmqXig8Y\"",
    "mtime": "2024-12-02T12:49:17.845Z",
    "size": 15060,
    "path": "../public/assets/css/demos/demo-8.css"
  },
  "/assets/css/demos/demo-9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32af-JwXlw2DPTxFY4+aZq1we0X8EHdM\"",
    "mtime": "2024-12-02T12:49:17.846Z",
    "size": 12975,
    "path": "../public/assets/css/demos/demo-9.css"
  },
  "/assets/css/plugins/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-vm15+oM+9PN4uQOkMA6sC7/DMBU\"",
    "mtime": "2024-12-02T12:49:17.860Z",
    "size": 6148,
    "path": "../public/assets/css/plugins/.DS_Store"
  },
  "/assets/css/plugins/jquery.countdown.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5a0-YDMpZbXRtALMF61kEKnbghCNIG8\"",
    "mtime": "2024-12-02T12:49:17.861Z",
    "size": 1440,
    "path": "../public/assets/css/plugins/jquery.countdown.css"
  },
  "/assets/css/skins/skin-demo-10.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-vf5adL99t054okhffWay0rS0CRI\"",
    "mtime": "2024-12-02T12:49:17.868Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-10.css"
  },
  "/assets/css/skins/skin-demo-13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-kq8mgW26l4wh7GuPKHg58ib5INU\"",
    "mtime": "2024-12-02T12:49:17.874Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-13.css"
  },
  "/assets/css/skins/skin-demo-14.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7b11-LNMejz6+H4pg9RD9oDx3/4KJFyw\"",
    "mtime": "2024-12-02T12:49:17.875Z",
    "size": 31505,
    "path": "../public/assets/css/skins/skin-demo-14.css"
  },
  "/assets/css/skins/skin-demo-17.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-vzxoW8wu+raqkLhgbOOcp6EH3qc\"",
    "mtime": "2024-12-02T12:49:17.876Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-17.css"
  },
  "/assets/css/skins/skin-demo-19.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-Ef7Byi7cXUaHNJ9J3a/UrYJuadQ\"",
    "mtime": "2024-12-02T12:49:17.877Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-19.css"
  },
  "/assets/css/skins/skin-demo-2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a26-VkCogx4Gqon1f9oHApeAMDfsp/o\"",
    "mtime": "2024-12-02T12:49:17.877Z",
    "size": 31270,
    "path": "../public/assets/css/skins/skin-demo-2.css"
  },
  "/assets/css/skins/skin-demo-20.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-0GP8fO7FEu80oLXsscWaRGCBWgw\"",
    "mtime": "2024-12-02T12:49:17.879Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-20.css"
  },
  "/assets/css/skins/skin-demo-21.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a27-tRqniIEgH3yAeuomnxrAWzmPp4I\"",
    "mtime": "2024-12-02T12:49:17.880Z",
    "size": 31271,
    "path": "../public/assets/css/skins/skin-demo-21.css"
  },
  "/assets/css/skins/skin-demo-22.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7ac9-5XYy9n6hZ2ywBz+1VUZon34Immc\"",
    "mtime": "2024-12-02T12:49:17.881Z",
    "size": 31433,
    "path": "../public/assets/css/skins/skin-demo-22.css"
  },
  "/assets/css/skins/skin-demo-23.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-jEz5w54vkOJ7+swJbOrO7K84ktk\"",
    "mtime": "2024-12-02T12:49:17.882Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-23.css"
  },
  "/assets/css/skins/skin-demo-24.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7ac8-aFewFBjV9Qw9pPTqWYTHmn23+xE\"",
    "mtime": "2024-12-02T12:49:17.883Z",
    "size": 31432,
    "path": "../public/assets/css/skins/skin-demo-24.css"
  },
  "/assets/css/skins/skin-demo-25.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79fc-mYN6EJQA1n/DtfJcV+wGhwdLIzU\"",
    "mtime": "2024-12-02T12:49:17.883Z",
    "size": 31228,
    "path": "../public/assets/css/skins/skin-demo-25.css"
  },
  "/assets/css/skins/skin-demo-26.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7b02-6CUw/ltK57GyRgDCrfGVubm9Q70\"",
    "mtime": "2024-12-02T12:49:17.884Z",
    "size": 31490,
    "path": "../public/assets/css/skins/skin-demo-26.css"
  },
  "/assets/css/skins/skin-demo-27.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"769f-3Vh2x4OqGdXWYcmGSHKku0Oxyu8\"",
    "mtime": "2024-12-02T12:49:17.884Z",
    "size": 30367,
    "path": "../public/assets/css/skins/skin-demo-27.css"
  },
  "/assets/css/skins/skin-demo-28.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a29-BvdyEppTM1i8iUF+fOEtbwKWCR4\"",
    "mtime": "2024-12-02T12:49:17.886Z",
    "size": 31273,
    "path": "../public/assets/css/skins/skin-demo-28.css"
  },
  "/assets/css/skins/skin-demo-29.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"769f-h0wPSMzBoGK/dgHUf/lUmCCfwLA\"",
    "mtime": "2024-12-02T12:49:17.889Z",
    "size": 30367,
    "path": "../public/assets/css/skins/skin-demo-29.css"
  },
  "/assets/css/skins/skin-demo-3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7ac6-jYy5unVWmXhI17Stws3eD/jB9hc\"",
    "mtime": "2024-12-02T12:49:17.891Z",
    "size": 31430,
    "path": "../public/assets/css/skins/skin-demo-3.css"
  },
  "/assets/css/skins/skin-demo-30.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a27-MhQ2d7FzBN5Zd8CYr4oi0FL4uws\"",
    "mtime": "2024-12-02T12:49:17.897Z",
    "size": 31271,
    "path": "../public/assets/css/skins/skin-demo-30.css"
  },
  "/assets/css/skins/skin-demo-4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a26-56GNNRJo+YH+YZhYxcVwm592Mh0\"",
    "mtime": "2024-12-02T12:49:17.898Z",
    "size": 31270,
    "path": "../public/assets/css/skins/skin-demo-4.css"
  },
  "/assets/css/skins/skin-demo-5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a26-jekPkHi4tCkxRIGjomfLxIxiJZI\"",
    "mtime": "2024-12-02T12:49:17.899Z",
    "size": 31270,
    "path": "../public/assets/css/skins/skin-demo-5.css"
  },
  "/assets/css/skins/skin-demo-6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a26-5Sdr7kae1zcDyo8qlavddWHBFZ4\"",
    "mtime": "2024-12-02T12:49:17.901Z",
    "size": 31270,
    "path": "../public/assets/css/skins/skin-demo-6.css"
  },
  "/assets/css/skins/skin-demo-7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7ac6-YpLuSw4pkbx46x1eR8pSO/OgA6o\"",
    "mtime": "2024-12-02T12:49:17.903Z",
    "size": 31430,
    "path": "../public/assets/css/skins/skin-demo-7.css"
  },
  "/assets/css/skins/skin-demo-8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a24-YF+T4tmwsICqwhKtS086GUtQOXM\"",
    "mtime": "2024-12-02T12:49:17.906Z",
    "size": 31268,
    "path": "../public/assets/css/skins/skin-demo-8.css"
  },
  "/assets/css/skins/skin-demo-9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a26-R/QtNF18jzF9GKcTOMnsgis6rTM\"",
    "mtime": "2024-12-02T12:49:17.908Z",
    "size": 31270,
    "path": "../public/assets/css/skins/skin-demo-9.css"
  },
  "/assets/fonts/flaming/flaming-webfont.woff": {
    "type": "font/woff",
    "etag": "\"8764-zARGlzPiyhnC2l0oV5ZBhtxPaiQ\"",
    "mtime": "2024-12-02T12:49:17.919Z",
    "size": 34660,
    "path": "../public/assets/fonts/flaming/flaming-webfont.woff"
  },
  "/assets/fonts/flaming/flaming-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"6b08-9WTaUKloPCCLK2pOJ4hYsvc5pLo\"",
    "mtime": "2024-12-02T12:49:17.923Z",
    "size": 27400,
    "path": "../public/assets/fonts/flaming/flaming-webfont.woff2"
  },
  "/assets/js/demos/demo-10.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b-NmKoZBid33rQt0LFl12omcno5lg\"",
    "mtime": "2024-12-02T12:49:20.644Z",
    "size": 75,
    "path": "../public/assets/js/demos/demo-10.js"
  },
  "/assets/js/demos/demo-11.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22e-kRQwrRnO89m8Eg9b04F6xDz0LqY\"",
    "mtime": "2024-12-02T12:49:20.645Z",
    "size": 558,
    "path": "../public/assets/js/demos/demo-11.js"
  },
  "/assets/js/demos/demo-12.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-hvi411zUGa23bPndls6Yt7JsMro\"",
    "mtime": "2024-12-02T12:49:20.645Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-12.js"
  },
  "/assets/js/demos/demo-13.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-0MXS4Kijya3X1v+WQatkSLUNhtc\"",
    "mtime": "2024-12-02T12:49:20.646Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-13.js"
  },
  "/assets/js/demos/demo-14.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-TZLbLzml29iXFpCO/uvBNpi/d0c\"",
    "mtime": "2024-12-02T12:49:20.647Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-14.js"
  },
  "/assets/js/demos/demo-15.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-VH80RJo2nZ6QHEmnMmVFAaD79Do\"",
    "mtime": "2024-12-02T12:49:20.648Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-15.js"
  },
  "/assets/js/demos/demo-16.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-NrWRrKyWMLv3NKnDRCsfI4RKATE\"",
    "mtime": "2024-12-02T12:49:20.649Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-16.js"
  },
  "/assets/js/demos/demo-17.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-goIeAM+htLZZ6nEFMhvJBLvPg8w\"",
    "mtime": "2024-12-02T12:49:20.649Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-17.js"
  },
  "/assets/js/demos/demo-18.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-K4T46bjB5NgbY7/W5RLuMsRkKUY\"",
    "mtime": "2024-12-02T12:49:20.650Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-18.js"
  },
  "/assets/js/demos/demo-19.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b-5/5SPnPOtaR91U0ehpOWTqiF69A\"",
    "mtime": "2024-12-02T12:49:20.651Z",
    "size": 75,
    "path": "../public/assets/js/demos/demo-19.js"
  },
  "/assets/js/demos/demo-2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"286-fhVacJ6ngVrJ63n0GNoD8/XbIrk\"",
    "mtime": "2024-12-02T12:49:20.652Z",
    "size": 646,
    "path": "../public/assets/js/demos/demo-2.js"
  },
  "/assets/js/demos/demo-20.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b-Q2F4iAKwtLFg+ZPUk6osUgjol8k\"",
    "mtime": "2024-12-02T12:49:20.653Z",
    "size": 75,
    "path": "../public/assets/js/demos/demo-20.js"
  },
  "/assets/js/demos/demo-21.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9-sMLuj/OXkD54qS8bqRjS4eW7NE4\"",
    "mtime": "2024-12-02T12:49:20.654Z",
    "size": 201,
    "path": "../public/assets/js/demos/demo-21.js"
  },
  "/assets/js/demos/demo-24.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a2-3CrvLo/rV9pIMgRRRHhMZ0VCNRM\"",
    "mtime": "2024-12-02T12:49:20.655Z",
    "size": 1186,
    "path": "../public/assets/js/demos/demo-24.js"
  },
  "/assets/js/demos/demo-27.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6e0-y1PUpABQTGW1DWxT3bEMBGzrrgQ\"",
    "mtime": "2024-12-02T12:49:20.655Z",
    "size": 1760,
    "path": "../public/assets/js/demos/demo-27.js"
  },
  "/assets/js/demos/demo-3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"297-sxMFC0IzVsgqWaj/W21HGytwkQs\"",
    "mtime": "2024-12-02T12:49:20.657Z",
    "size": 663,
    "path": "../public/assets/js/demos/demo-3.js"
  },
  "/assets/js/demos/demo-30.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e8-7OXd5RVl4UDrgy3XkyHTy+3v5BQ\"",
    "mtime": "2024-12-02T12:49:20.658Z",
    "size": 488,
    "path": "../public/assets/js/demos/demo-30.js"
  },
  "/assets/js/demos/demo-31.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2024-12-02T12:49:20.659Z",
    "size": 0,
    "path": "../public/assets/js/demos/demo-31.js"
  },
  "/assets/js/demos/demo-4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4cc-vqY6OkNdrOZqtgzeMNPDAMKferM\"",
    "mtime": "2024-12-02T12:49:20.660Z",
    "size": 1228,
    "path": "../public/assets/js/demos/demo-4.js"
  },
  "/assets/js/demos/demo-5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49-hMlUfQH1WFIh+5u/aDSqhRQ+IFc\"",
    "mtime": "2024-12-02T12:49:20.660Z",
    "size": 73,
    "path": "../public/assets/js/demos/demo-5.js"
  },
  "/assets/js/demos/demo-6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"286-IdRjRn+P8TgZDo9e0GsazBNq/qg\"",
    "mtime": "2024-12-02T12:49:20.661Z",
    "size": 646,
    "path": "../public/assets/js/demos/demo-6.js"
  },
  "/assets/js/demos/demo-7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4cc-vqY6OkNdrOZqtgzeMNPDAMKferM\"",
    "mtime": "2024-12-02T12:49:20.662Z",
    "size": 1228,
    "path": "../public/assets/js/demos/demo-7.js"
  },
  "/assets/js/demos/demo-8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-hKt69mGG6F6JMfWVascUfESQgIY\"",
    "mtime": "2024-12-02T12:49:20.663Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-8.js"
  },
  "/assets/js/demos/demo-9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a-ZN9cuZF9tQswWhB35dAM7pOXzcs\"",
    "mtime": "2024-12-02T12:49:20.664Z",
    "size": 74,
    "path": "../public/assets/js/demos/demo-9.js"
  },
  "/assets/vendor/line-awesome/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-iGB1NNV7INIAyLbJBd9V2hBR5LE\"",
    "mtime": "2024-12-02T12:49:20.836Z",
    "size": 6148,
    "path": "../public/assets/vendor/line-awesome/.DS_Store"
  },
  "/assets/landing-assets/css/style.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f859-g34Zi34fgMFgkW+I6lNdEh4KYxs\"",
    "mtime": "2024-12-02T12:49:20.714Z",
    "size": 63577,
    "path": "../public/assets/landing-assets/css/style.min.css"
  },
  "/assets/landing-assets/images/lazy.png": {
    "type": "image/png",
    "etag": "\"43-Mq/ln+XYOHpMRDYoJetHATeejU8\"",
    "mtime": "2024-12-02T12:49:20.715Z",
    "size": 67,
    "path": "../public/assets/landing-assets/images/lazy.png"
  },
  "/assets/landing-assets/images/logo.png": {
    "type": "image/png",
    "etag": "\"ed7-2MBhM01K1MCCece0YdoR6KC5TYY\"",
    "mtime": "2024-12-02T12:49:20.716Z",
    "size": 3799,
    "path": "../public/assets/landing-assets/images/logo.png"
  },
  "/assets/landing-assets/js/main.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a3c-34UOpCmZvJmqpbi3Vr98FFC62G8\"",
    "mtime": "2024-12-02T12:49:20.717Z",
    "size": 10812,
    "path": "../public/assets/landing-assets/js/main.min.js"
  },
  "/assets/landing-assets/js/word-rotator.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1348-sJeQGTJXvrsLtBEHKBCQUIqxZyA\"",
    "mtime": "2024-12-02T12:49:20.721Z",
    "size": 4936,
    "path": "../public/assets/landing-assets/js/word-rotator.js"
  },
  "/dearflip/dflip/css/dflip.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f060-oRu9Zkll8J4P/v8NBw89ab8wkuQ\"",
    "mtime": "2024-11-20T05:38:15.224Z",
    "size": 61536,
    "path": "../public/dearflip/dflip/css/dflip.min.css"
  },
  "/dearflip/dflip/css/themify-icons.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"361b-ogaFvSMZpVefZQajbHfoDA4Ke5Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 13851,
    "path": "../public/dearflip/dflip/css/themify-icons.min.css"
  },
  "/dearflip/dflip/fonts/themify.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1339c-3xKglCzxkz8JFf49kQ+iN58JLYM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 78748,
    "path": "../public/dearflip/dflip/fonts/themify.eot"
  },
  "/dearflip/dflip/fonts/themify.svg": {
    "type": "image/svg+xml",
    "etag": "\"3931d-9a8RL7WqfE9mWswho4sDW7tiMnw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 234269,
    "path": "../public/dearflip/dflip/fonts/themify.svg"
  },
  "/dearflip/dflip/fonts/themify.ttf": {
    "type": "font/ttf",
    "etag": "\"132f8-W7H+aUUqSEVmqBB2r3Vnco/n5Ds\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 78584,
    "path": "../public/dearflip/dflip/fonts/themify.ttf"
  },
  "/dearflip/dflip/fonts/themify.woff": {
    "type": "font/woff",
    "etag": "\"db2c-k5TzW9Kt3SRma3m/w21PnSR8sB0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 56108,
    "path": "../public/dearflip/dflip/fonts/themify.woff"
  },
  "/dearflip/dflip/images/chrome-extension.png": {
    "type": "image/png",
    "etag": "\"3456-xPalYfoX+HiOLMjehgo+WShJ1lU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 13398,
    "path": "../public/dearflip/dflip/images/chrome-extension.png"
  },
  "/dearflip/dflip/images/loading.gif": {
    "type": "image/gif",
    "etag": "\"acf-vVTbkbgfqKnsN8k7EJSN2LaQ5MQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2767,
    "path": "../public/dearflip/dflip/images/loading.gif"
  },
  "/dearflip/dflip/js/dflip.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"755de-JPNBjbur8rpSjd4BuSn53nc/LAE\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 480734,
    "path": "../public/dearflip/dflip/js/dflip.min.js"
  },
  "/dearflip/dflip/sound/turn.mp3": {
    "type": "audio/mpeg",
    "etag": "\"1d62-P9fqVMVdAu2kDTfAVqfcu6FAyps\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 7522,
    "path": "../public/dearflip/dflip/sound/turn.mp3"
  },
  "/dearflip/dflip/sound/turn2.mp3": {
    "type": "audio/mpeg",
    "etag": "\"7557-8ZB09wyRzHa/lDXA3gm7F6gYsls\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 30039,
    "path": "../public/dearflip/dflip/sound/turn2.mp3"
  },
  "/dearflip/dflip/sound/turn2a.mp3": {
    "type": "audio/mpeg",
    "etag": "\"1c08-A6+pp6EbfA/jS9HdBHe04OkGP0c\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 7176,
    "path": "../public/dearflip/dflip/sound/turn2a.mp3"
  },
  "/dearflip/dflip/sound/turn3.mp3": {
    "type": "audio/mpeg",
    "etag": "\"eb0-V5vzv6nCkKJrQtmoAfSBLWiBi3w\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 3760,
    "path": "../public/dearflip/dflip/sound/turn3.mp3"
  },
  "/_nuxt/builds/meta/1e710d68-faa5-4201-bb48-cbc1f7bd970d.json": {
    "type": "application/json",
    "etag": "\"e7-EOdS/meufj9XL10+qeBjlK6hmTg\"",
    "mtime": "2024-12-16T13:16:53.150Z",
    "size": 231,
    "path": "../public/_nuxt/builds/meta/1e710d68-faa5-4201-bb48-cbc1f7bd970d.json"
  },
  "/assets/images/about/company-culture.jpg": {
    "type": "image/jpeg",
    "etag": "\"a462-Ikd2Rd0K9Xfr/LO3ChtV1ELfaE8\"",
    "mtime": "2024-11-06T08:15:39.636Z",
    "size": 42082,
    "path": "../public/assets/images/about/company-culture.jpg"
  },
  "/assets/images/about/contact_us_sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"28b2b-kBNmHdRj4vR0UdB3YTAoh1UswdQ\"",
    "mtime": "2024-11-06T08:15:39.637Z",
    "size": 166699,
    "path": "../public/assets/images/about/contact_us_sheffield.jpg"
  },
  "/assets/images/about/contact_us_sheffield_old.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ec33-ayT9K58+xJz0s86Ar8f1JTyrANk\"",
    "mtime": "2024-11-06T08:15:39.638Z",
    "size": 126003,
    "path": "../public/assets/images/about/contact_us_sheffield_old.jpg"
  },
  "/assets/images/about/contact_us_sheffield_old1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2287d-YEZuYZwWmQ7hyUk8JbJfNx5s7vw\"",
    "mtime": "2024-11-06T08:15:39.639Z",
    "size": 141437,
    "path": "../public/assets/images/about/contact_us_sheffield_old1.jpg"
  },
  "/assets/images/about/img-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"375d-7cs6SvC/vXPZnKKse/9r8ttcRCM\"",
    "mtime": "2024-11-06T08:15:39.640Z",
    "size": 14173,
    "path": "../public/assets/images/about/img-1.jpg"
  },
  "/assets/images/about/img-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"a52a-sXBwDBOQ2ZdGlKYhJUgXNuRqDEM\"",
    "mtime": "2024-11-06T08:15:39.640Z",
    "size": 42282,
    "path": "../public/assets/images/about/img-2.jpg"
  },
  "/assets/images/about/who_we_are_sheffield_steel_systems.jpg": {
    "type": "image/jpeg",
    "etag": "\"27654-GOKyL9XC3uOqbW3ENydbDPIcHPo\"",
    "mtime": "2024-11-06T08:15:39.641Z",
    "size": 161364,
    "path": "../public/assets/images/about/who_we_are_sheffield_steel_systems.jpg"
  },
  "/assets/images/about-us/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-MvkrxuiTtHoXUaGOywNeN0hwlUA\"",
    "mtime": "2024-11-06T08:15:38.836Z",
    "size": 10244,
    "path": "../public/assets/images/about-us/.DS_Store"
  },
  "/assets/images/about-us/csr.png": {
    "type": "image/png",
    "etag": "\"c65c-LWQwavpasSeiENSXBwE0q3+J9Ns\"",
    "mtime": "2024-11-06T08:15:38.838Z",
    "size": 50780,
    "path": "../public/assets/images/about-us/csr.png"
  },
  "/assets/images/about-us/dog.webm": {
    "type": "video/webm",
    "etag": "\"60354-V0nzo8t9mFDNarCnwEQL2aujcB0\"",
    "mtime": "2024-11-06T08:15:38.845Z",
    "size": 394068,
    "path": "../public/assets/images/about-us/dog.webm"
  },
  "/assets/images/about-us/image-breaker1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3281a-szJ/l5lwNTIsJ6WzJJbz/Zv7Cvs\"",
    "mtime": "2024-11-06T08:15:38.848Z",
    "size": 206874,
    "path": "../public/assets/images/about-us/image-breaker1.jpg"
  },
  "/assets/images/about-us/image-breaker2.jpg": {
    "type": "image/jpeg",
    "etag": "\"29e18-Myu6rhlqFNGNum5YDICTXc3LVEk\"",
    "mtime": "2024-11-06T08:15:38.850Z",
    "size": 171544,
    "path": "../public/assets/images/about-us/image-breaker2.jpg"
  },
  "/assets/images/about-us/image-breaker3.jpg": {
    "type": "image/jpeg",
    "etag": "\"382b6-6CSx7gPMCUEny7Zp0OqvEcjB2dA\"",
    "mtime": "2024-11-06T08:15:38.851Z",
    "size": 230070,
    "path": "../public/assets/images/about-us/image-breaker3.jpg"
  },
  "/assets/images/about-us/image-breaker4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4530e-wOQR0cOzxpMWASIKGE0n1QX03so\"",
    "mtime": "2024-11-06T08:15:38.852Z",
    "size": 283406,
    "path": "../public/assets/images/about-us/image-breaker4.jpg"
  },
  "/assets/images/about-us/our-culture-old.jpg": {
    "type": "image/jpeg",
    "etag": "\"26d4c-ZjSj0HNH7B9D9H5d6XDapGQDB7c\"",
    "mtime": "2024-11-06T08:15:38.853Z",
    "size": 159052,
    "path": "../public/assets/images/about-us/our-culture-old.jpg"
  },
  "/assets/images/about-us/our-culture.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cc6f-voNJR4egFxg9D4Ki54TIobvm/PM\"",
    "mtime": "2024-11-06T08:15:38.854Z",
    "size": 117871,
    "path": "../public/assets/images/about-us/our-culture.jpg"
  },
  "/assets/images/about-us/sheffield copy.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad6d-eAeJnuKrv3k/uYe6Oojg6N4XulE\"",
    "mtime": "2024-11-06T08:15:38.854Z",
    "size": 44397,
    "path": "../public/assets/images/about-us/sheffield copy.jpg"
  },
  "/assets/images/about-us/sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad6d-eAeJnuKrv3k/uYe6Oojg6N4XulE\"",
    "mtime": "2024-11-06T08:15:38.855Z",
    "size": 44397,
    "path": "../public/assets/images/about-us/sheffield.jpg"
  },
  "/assets/images/about-us/sheffield_in_numbers.png": {
    "type": "image/png",
    "etag": "\"16114-MZjTBgHGGgla8XCZ2EdJvjpR1rM\"",
    "mtime": "2024-11-06T08:15:38.856Z",
    "size": 90388,
    "path": "../public/assets/images/about-us/sheffield_in_numbers.png"
  },
  "/assets/images/about-us/sheffiled_tour.mov": {
    "type": "video/quicktime",
    "etag": "\"626abae-ztvZvL2vGLqFSwx+WGX8HO8OGlc\"",
    "mtime": "2024-11-06T08:15:39.043Z",
    "size": 103197614,
    "path": "../public/assets/images/about-us/sheffiled_tour.mov"
  },
  "/assets/images/about-us/test1.mp4": {
    "type": "video/mp4",
    "etag": "\"a21a52-qP0pkxhv8epplIVZ4V/6Vyt4I0I\"",
    "mtime": "2024-11-06T08:15:39.076Z",
    "size": 10623570,
    "path": "../public/assets/images/about-us/test1.mp4"
  },
  "/assets/images/about-us/test2.mp4": {
    "type": "video/mp4",
    "etag": "\"3ae660-rDaTYx9Ojs9QWeFqI/zQfMjOjSI\"",
    "mtime": "2024-11-06T08:15:39.082Z",
    "size": 3860064,
    "path": "../public/assets/images/about-us/test2.mp4"
  },
  "/assets/images/about-us/test3.mp4": {
    "type": "video/mp4",
    "etag": "\"7627ad-UoYZkUo+0yQ5DrIcJxC84pcTSV0\"",
    "mtime": "2024-11-06T08:15:39.093Z",
    "size": 7743405,
    "path": "../public/assets/images/about-us/test3.mp4"
  },
  "/assets/images/about-us/test4.mp4": {
    "type": "video/mp4",
    "etag": "\"21f631d-+T7hQRZkBw0B+ir9QRqYSMK9g8I\"",
    "mtime": "2024-11-06T08:15:39.148Z",
    "size": 35611421,
    "path": "../public/assets/images/about-us/test4.mp4"
  },
  "/assets/images/design/image1_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"128b6-jA3ESyHcyWy+zchOzQFrInnR5Zc\"",
    "mtime": "2024-11-06T08:15:39.676Z",
    "size": 75958,
    "path": "../public/assets/images/design/image1_design_c.jpg"
  },
  "/assets/images/design/image2_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"d64b-jkran6JyOeq9I1lKFfCzA6lN168\"",
    "mtime": "2024-11-06T08:15:39.676Z",
    "size": 54859,
    "path": "../public/assets/images/design/image2_design_c.jpg"
  },
  "/assets/images/design/image3_design_c.jpg": {
    "type": "image/jpeg",
    "etag": "\"cfec-BYGnYQ3e+j5UB7klifxEnwTndBQ\"",
    "mtime": "2024-11-06T08:15:39.677Z",
    "size": 53228,
    "path": "../public/assets/images/design/image3_design_c.jpg"
  },
  "/assets/images/events/chef_competitions.png": {
    "type": "image/png",
    "etag": "\"5550-04ShIaMPkAcIYvQdz/7J0W2nHJU\"",
    "mtime": "2024-11-06T08:15:39.684Z",
    "size": 21840,
    "path": "../public/assets/images/events/chef_competitions.png"
  },
  "/assets/images/events/client_demos.png": {
    "type": "image/png",
    "etag": "\"57e7-eU9yJpZaA0X0JaHAZS2V+RsEad0\"",
    "mtime": "2024-11-06T08:15:39.684Z",
    "size": 22503,
    "path": "../public/assets/images/events/client_demos.png"
  },
  "/assets/images/events/live_cooking.png": {
    "type": "image/png",
    "etag": "\"4a35-Gxo0EqvLBC1CwGx7DImyW6r1o5I\"",
    "mtime": "2024-11-06T08:15:39.685Z",
    "size": 18997,
    "path": "../public/assets/images/events/live_cooking.png"
  },
  "/assets/images/events/november-promo.png": {
    "type": "image/png",
    "etag": "\"8a352-k+xVVUh/6pdt6+EpQcrcRz9d/Fg\"",
    "mtime": "2024-11-07T10:24:10.292Z",
    "size": 566098,
    "path": "../public/assets/images/events/november-promo.png"
  },
  "/assets/images/events/partner_training.png": {
    "type": "image/png",
    "etag": "\"41f4-623dqRx8fJMj8ryeXQ6OF6grX+Q\"",
    "mtime": "2024-11-06T08:15:39.685Z",
    "size": 16884,
    "path": "../public/assets/images/events/partner_training.png"
  },
  "/assets/images/events/product_launch.png": {
    "type": "image/png",
    "etag": "\"467b-R94CFTpIf9G64Or78fDZatXtga0\"",
    "mtime": "2024-11-06T08:15:39.686Z",
    "size": 18043,
    "path": "../public/assets/images/events/product_launch.png"
  },
  "/assets/images/events/Rational Live 11 Dec.jpg": {
    "type": "image/jpeg",
    "etag": "\"c7463-mIEMWyBT5/LACKa0BlCmw1D7a0w\"",
    "mtime": "2024-12-02T11:19:06.400Z",
    "size": 816227,
    "path": "../public/assets/images/events/Rational Live 11 Dec.jpg"
  },
  "/assets/images/events/Showroom Bonanza_Pizzeria Solutions Promotion-01.webp": {
    "type": "image/webp",
    "etag": "\"f132a-39qZ+0e+svZX4dCm+frSXQjWLHs\"",
    "mtime": "2024-11-15T13:32:40.969Z",
    "size": 987946,
    "path": "../public/assets/images/events/Showroom Bonanza_Pizzeria Solutions Promotion-01.webp"
  },
  "/assets/images/events/training.png": {
    "type": "image/png",
    "etag": "\"4c41-i3tEeuyrnWLWNxhxPmBonU98CT8\"",
    "mtime": "2024-11-06T08:15:39.686Z",
    "size": 19521,
    "path": "../public/assets/images/events/training.png"
  },
  "/assets/images/flags/brl.png": {
    "type": "image/png",
    "etag": "\"600-RwKuUbpO/48CriZkzIj/TDHdGjE\"",
    "mtime": "2024-11-06T08:15:39.692Z",
    "size": 1536,
    "path": "../public/assets/images/flags/brl.png"
  },
  "/assets/images/flags/da.png": {
    "type": "image/png",
    "etag": "\"410-B0fCTakrcMI9seviHHcBBLI7nCw\"",
    "mtime": "2024-11-06T08:15:39.692Z",
    "size": 1040,
    "path": "../public/assets/images/flags/da.png"
  },
  "/assets/images/flags/de.png": {
    "type": "image/png",
    "etag": "\"2da-afwAapW0eR4TMPs2hYIKgNVH/ew\"",
    "mtime": "2024-11-06T08:15:39.692Z",
    "size": 730,
    "path": "../public/assets/images/flags/de.png"
  },
  "/assets/images/flags/el.png": {
    "type": "image/png",
    "etag": "\"3df-oDIHtmL7bBGDC0v4UsWQV+1eYN0\"",
    "mtime": "2024-11-06T08:15:39.692Z",
    "size": 991,
    "path": "../public/assets/images/flags/el.png"
  },
  "/assets/images/flags/en.png": {
    "type": "image/png",
    "etag": "\"570-Yoss+tpl72qH+QY2pHvtYa/YKlc\"",
    "mtime": "2024-11-06T08:15:39.693Z",
    "size": 1392,
    "path": "../public/assets/images/flags/en.png"
  },
  "/assets/images/flags/es.png": {
    "type": "image/png",
    "etag": "\"2f3-Pn1MaAbuXrgujm5GskIXxpUn/eY\"",
    "mtime": "2024-11-06T08:15:39.693Z",
    "size": 755,
    "path": "../public/assets/images/flags/es.png"
  },
  "/assets/images/flags/fr.png": {
    "type": "image/png",
    "etag": "\"3da-Gkx0f5+sEgWTP0ms8CziyivCwto\"",
    "mtime": "2024-11-06T08:15:39.693Z",
    "size": 986,
    "path": "../public/assets/images/flags/fr.png"
  },
  "/assets/images/flags/gbp.png": {
    "type": "image/png",
    "etag": "\"616-wxE9cM3/xrbnoZsz98lKvPK1byg\"",
    "mtime": "2024-11-06T08:15:39.694Z",
    "size": 1558,
    "path": "../public/assets/images/flags/gbp.png"
  },
  "/assets/images/flags/hu.png": {
    "type": "image/png",
    "etag": "\"353-4GYTEbC4tfsG5mwtdRX2vTsMdxM\"",
    "mtime": "2024-11-06T08:15:39.694Z",
    "size": 851,
    "path": "../public/assets/images/flags/hu.png"
  },
  "/assets/images/flags/idr.png": {
    "type": "image/png",
    "etag": "\"369-74s2FYw10oQfeVs59zFZCoVhUW8\"",
    "mtime": "2024-11-06T08:15:39.694Z",
    "size": 873,
    "path": "../public/assets/images/flags/idr.png"
  },
  "/assets/images/flags/inr.png": {
    "type": "image/png",
    "etag": "\"51c-NJt85auou2GXy1rrDU+Vswak1pY\"",
    "mtime": "2024-11-06T08:15:39.694Z",
    "size": 1308,
    "path": "../public/assets/images/flags/inr.png"
  },
  "/assets/images/flags/it.png": {
    "type": "image/png",
    "etag": "\"3cf-fMXOuc2UoU4046Yb4ThJpZWDRc0\"",
    "mtime": "2024-11-06T08:15:39.695Z",
    "size": 975,
    "path": "../public/assets/images/flags/it.png"
  },
  "/assets/images/flags/ja.png": {
    "type": "image/png",
    "etag": "\"3d8-BNxX7uVwGZsEmmYLQWQ/0L6HZBE\"",
    "mtime": "2024-11-06T08:15:39.695Z",
    "size": 984,
    "path": "../public/assets/images/flags/ja.png"
  },
  "/assets/images/flags/jp.png": {
    "type": "image/png",
    "etag": "\"3d8-BNxX7uVwGZsEmmYLQWQ/0L6HZBE\"",
    "mtime": "2024-11-06T08:15:39.695Z",
    "size": 984,
    "path": "../public/assets/images/flags/jp.png"
  },
  "/assets/images/flags/pl.png": {
    "type": "image/png",
    "etag": "\"364-/majvK+uI49zlFt+GiKulhzUiaA\"",
    "mtime": "2024-11-06T08:15:39.696Z",
    "size": 868,
    "path": "../public/assets/images/flags/pl.png"
  },
  "/assets/images/flags/pt.png": {
    "type": "image/png",
    "etag": "\"4a1-p7c7l2omXRdujVtEBRd4piCR89k\"",
    "mtime": "2024-11-06T08:15:39.696Z",
    "size": 1185,
    "path": "../public/assets/images/flags/pt.png"
  },
  "/assets/images/flags/ru.png": {
    "type": "image/png",
    "etag": "\"39e-1Ln9cpQdCMh99Xcbd6kmoVkGFbI\"",
    "mtime": "2024-11-06T08:15:39.697Z",
    "size": 926,
    "path": "../public/assets/images/flags/ru.png"
  },
  "/assets/images/flags/sv.png": {
    "type": "image/png",
    "etag": "\"419-oooDCqoqb/+HtwFKWxwGnpbxCCo\"",
    "mtime": "2024-11-06T08:15:39.697Z",
    "size": 1049,
    "path": "../public/assets/images/flags/sv.png"
  },
  "/assets/images/flags/tr.png": {
    "type": "image/png",
    "etag": "\"42b-TY/oKEK0m8SM7h/XuymHf4Njm98\"",
    "mtime": "2024-11-06T08:15:39.697Z",
    "size": 1067,
    "path": "../public/assets/images/flags/tr.png"
  },
  "/assets/images/flags/zh.png": {
    "type": "image/png",
    "etag": "\"4b5-rh9OUpcU75ZCYcqQLdDSEh0lCpI\"",
    "mtime": "2024-11-06T08:15:39.698Z",
    "size": 1205,
    "path": "../public/assets/images/flags/zh.png"
  },
  "/assets/images/footer-icons/footer_email.png": {
    "type": "image/png",
    "etag": "\"2a0b-JiyVdC6qY621tWKHLa1k1+IbFbg\"",
    "mtime": "2024-11-06T08:15:39.701Z",
    "size": 10763,
    "path": "../public/assets/images/footer-icons/footer_email.png"
  },
  "/assets/images/footer-icons/footer_location.png": {
    "type": "image/png",
    "etag": "\"437c-/COvCLKIGC+XFUmnJG/BhuERa98\"",
    "mtime": "2024-11-06T08:15:39.701Z",
    "size": 17276,
    "path": "../public/assets/images/footer-icons/footer_location.png"
  },
  "/assets/images/footer-icons/footer_phone.png": {
    "type": "image/png",
    "etag": "\"20b3-p4hsVVKPbhl3iaS31kfdY83CUNI\"",
    "mtime": "2024-11-06T08:15:39.702Z",
    "size": 8371,
    "path": "../public/assets/images/footer-icons/footer_phone.png"
  },
  "/assets/images/footer-icons/footer_postbox.png": {
    "type": "image/png",
    "etag": "\"1a24-/Tluhooi9wL9wvrQHqRI2vie5e4\"",
    "mtime": "2024-11-06T08:15:39.702Z",
    "size": 6692,
    "path": "../public/assets/images/footer-icons/footer_postbox.png"
  },
  "/assets/images/homepage/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-11-06T08:15:39.711Z",
    "size": 6148,
    "path": "../public/assets/images/homepage/.DS_Store"
  },
  "/assets/images/homepage/bird.gif": {
    "type": "image/gif",
    "etag": "\"7c5cb-FXWQSvCJacSwqkml0fuLFfDi12M\"",
    "mtime": "2024-11-06T08:15:39.714Z",
    "size": 509387,
    "path": "../public/assets/images/homepage/bird.gif"
  },
  "/assets/images/homepage/cold_storage.jpg": {
    "type": "image/jpeg",
    "etag": "\"215f5-USQvqXpxMzapTQLPYlw/g6EYCfQ\"",
    "mtime": "2024-11-06T08:15:39.715Z",
    "size": 136693,
    "path": "../public/assets/images/homepage/cold_storage.jpg"
  },
  "/assets/images/homepage/cold_storage_home.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ab53-qVktDuKsSS6NQkE9ktg5Jss0Ebk\"",
    "mtime": "2024-11-06T08:15:39.716Z",
    "size": 109395,
    "path": "../public/assets/images/homepage/cold_storage_home.jpg"
  },
  "/assets/images/homepage/cold_storage_page.jpg": {
    "type": "image/jpeg",
    "etag": "\"1999f-VgcNuJaf8vtC0pd5X9EmdC2D7q4\"",
    "mtime": "2024-11-06T08:15:39.716Z",
    "size": 104863,
    "path": "../public/assets/images/homepage/cold_storage_page.jpg"
  },
  "/assets/images/homepage/commercial_kitchen.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cf2d-VcuTxSp5WK808ovu52A8HZIlT68\"",
    "mtime": "2024-11-06T08:15:39.717Z",
    "size": 118573,
    "path": "../public/assets/images/homepage/commercial_kitchen.jpg"
  },
  "/assets/images/homepage/customer_service.jpg": {
    "type": "image/jpeg",
    "etag": "\"2bd10-1LJuiNPi1Rl2Ij3vp72ukwF9zUM\"",
    "mtime": "2024-11-06T08:15:39.718Z",
    "size": 179472,
    "path": "../public/assets/images/homepage/customer_service.jpg"
  },
  "/assets/images/homepage/design_home.jpg": {
    "type": "image/jpeg",
    "etag": "\"1f550-Av9ufAGTO2SdRBsvJLO7KkgWOPE\"",
    "mtime": "2024-11-06T08:15:39.719Z",
    "size": 128336,
    "path": "../public/assets/images/homepage/design_home.jpg"
  },
  "/assets/images/homepage/fabrication-home.jpg": {
    "type": "image/jpeg",
    "etag": "\"285ad-s2JB3WE7TF+g0rHmDc9nr9vb2jY\"",
    "mtime": "2024-11-06T08:15:39.720Z",
    "size": 165293,
    "path": "../public/assets/images/homepage/fabrication-home.jpg"
  },
  "/assets/images/homepage/female_worker.jpg": {
    "type": "image/jpeg",
    "etag": "\"177e9-vhyJfhOHwn718biYLElcxTlGGc8\"",
    "mtime": "2024-11-06T08:15:39.720Z",
    "size": 96233,
    "path": "../public/assets/images/homepage/female_worker.jpg"
  },
  "/assets/images/homepage/food_service_equipment.jpg": {
    "type": "image/jpeg",
    "etag": "\"2dc22-tVRtBwlRlpwMExnNpH3stDgRB90\"",
    "mtime": "2024-11-06T08:15:39.721Z",
    "size": 187426,
    "path": "../public/assets/images/homepage/food_service_equipment.jpg"
  },
  "/assets/images/homepage/happy_customer.jpg": {
    "type": "image/jpeg",
    "etag": "\"2251b-+VLqtW+zDaQ2S8r2o26ZJSQ0dD8\"",
    "mtime": "2024-11-06T08:15:39.722Z",
    "size": 140571,
    "path": "../public/assets/images/homepage/happy_customer.jpg"
  },
  "/assets/images/homepage/kitchen_page.jpg": {
    "type": "image/jpeg",
    "etag": "\"24cbb-Bs5jRnshUrHB3YWVYVTmF6/7eSg\"",
    "mtime": "2024-11-06T08:15:39.723Z",
    "size": 150715,
    "path": "../public/assets/images/homepage/kitchen_page.jpg"
  },
  "/assets/images/homepage/laundry.jpg": {
    "type": "image/jpeg",
    "etag": "\"20ecb-VKZdfYKDGdrH7234qpE9kHcNl5g\"",
    "mtime": "2024-11-06T08:15:39.724Z",
    "size": 134859,
    "path": "../public/assets/images/homepage/laundry.jpg"
  },
  "/assets/images/homepage/laundry_and_cleaning.jpg": {
    "type": "image/jpeg",
    "etag": "\"298ed-mdvInjvbbwMv+3+3iWEO20jhFpc\"",
    "mtime": "2024-11-06T08:15:39.726Z",
    "size": 170221,
    "path": "../public/assets/images/homepage/laundry_and_cleaning.jpg"
  },
  "/assets/images/homepage/laundry_old.jpg": {
    "type": "image/jpeg",
    "etag": "\"237a7-bFn40CVfDkSFByWqJLl5xmruQX0\"",
    "mtime": "2024-11-06T08:15:39.727Z",
    "size": 145319,
    "path": "../public/assets/images/homepage/laundry_old.jpg"
  },
  "/assets/images/homepage/laundry_OLD_SKETCH.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e876-9FA+Kej4Lj8rDBpztrk+E0EeBA4\"",
    "mtime": "2024-11-06T08:15:39.725Z",
    "size": 190582,
    "path": "../public/assets/images/homepage/laundry_OLD_SKETCH.jpg"
  },
  "/assets/images/homepage/laundry_page.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c746-QzsMdxgMcHt1qv0EsZ2zGoJzUgU\"",
    "mtime": "2024-11-06T08:15:39.727Z",
    "size": 116550,
    "path": "../public/assets/images/homepage/laundry_page.jpg"
  },
  "/assets/images/homepage/sheffield_engineer.jpg": {
    "type": "image/jpeg",
    "etag": "\"23a0d-HJXSeOvZqcKJ0RptgfwPDR1GdNM\"",
    "mtime": "2024-11-06T08:15:39.728Z",
    "size": 145933,
    "path": "../public/assets/images/homepage/sheffield_engineer.jpg"
  },
  "/assets/images/homepage/test.gif": {
    "type": "image/gif",
    "etag": "\"a038-23KcM2uiVH4XS0+KKqMgHxPnUPw\"",
    "mtime": "2024-11-06T08:15:39.729Z",
    "size": 41016,
    "path": "../public/assets/images/homepage/test.gif"
  },
  "/assets/images/media/media_blogs.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e30b-mVtbEfiCgOSO1vfvPfBaAn4d7X0\"",
    "mtime": "2024-11-06T08:15:39.763Z",
    "size": 123659,
    "path": "../public/assets/images/media/media_blogs.jpg"
  },
  "/assets/images/media/media_documents.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c49-a+hOSYld9lu5ePY0HGQ3RHzUzF0\"",
    "mtime": "2024-11-06T08:15:39.765Z",
    "size": 40009,
    "path": "../public/assets/images/media/media_documents.jpg"
  },
  "/assets/images/media/media_gallery.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fa91-UifmCyIFzVF6Spcoc+pjPDdsaoU\"",
    "mtime": "2024-11-06T08:15:39.766Z",
    "size": 129681,
    "path": "../public/assets/images/media/media_gallery.jpg"
  },
  "/assets/images/media/media_in_the_news.jpg": {
    "type": "image/jpeg",
    "etag": "\"2011e-WSXBzgnndkxoyYaqObmdZG3YFJI\"",
    "mtime": "2024-11-06T08:15:39.766Z",
    "size": 131358,
    "path": "../public/assets/images/media/media_in_the_news.jpg"
  },
  "/assets/images/media/media_newsletters.jpg": {
    "type": "image/jpeg",
    "etag": "\"16a53-XTwY3RB9Xef5DP7TEpEF1/P2sz8\"",
    "mtime": "2024-11-06T08:15:39.767Z",
    "size": 92755,
    "path": "../public/assets/images/media/media_newsletters.jpg"
  },
  "/assets/images/media/media_video.jpg": {
    "type": "image/jpeg",
    "etag": "\"15f05-wCfp0R7N9qlaFyeWRkVETLbpxCA\"",
    "mtime": "2024-11-06T08:15:39.768Z",
    "size": 89861,
    "path": "../public/assets/images/media/media_video.jpg"
  },
  "/assets/images/methodology/methodology01.png": {
    "type": "image/png",
    "etag": "\"490-PwxcnqA8GCr4rriTI3i7Sg9bKrI\"",
    "mtime": "2024-11-06T08:15:39.805Z",
    "size": 1168,
    "path": "../public/assets/images/methodology/methodology01.png"
  },
  "/assets/images/methodology/methodology02.png": {
    "type": "image/png",
    "etag": "\"4fc-7L60tkAUoviHpt/uQjtK77NhnUg\"",
    "mtime": "2024-11-06T08:15:39.806Z",
    "size": 1276,
    "path": "../public/assets/images/methodology/methodology02.png"
  },
  "/assets/images/methodology/methodology03.png": {
    "type": "image/png",
    "etag": "\"3f6-2ydUV+/HCHLSJGDbjI4cmWe8bLo\"",
    "mtime": "2024-11-06T08:15:39.806Z",
    "size": 1014,
    "path": "../public/assets/images/methodology/methodology03.png"
  },
  "/assets/images/methodology/methodology04.png": {
    "type": "image/png",
    "etag": "\"582-0VS4B1y4ZvJjUE0Lj108qdN98ts\"",
    "mtime": "2024-11-06T08:15:39.807Z",
    "size": 1410,
    "path": "../public/assets/images/methodology/methodology04.png"
  },
  "/assets/images/methodology/methodology05.png": {
    "type": "image/png",
    "etag": "\"5ed-maNk+Gn6J+uPvO3ZwnT9P4vEU80\"",
    "mtime": "2024-11-06T08:15:39.807Z",
    "size": 1517,
    "path": "../public/assets/images/methodology/methodology05.png"
  },
  "/assets/images/methodology/methodology06.png": {
    "type": "image/png",
    "etag": "\"516-GIZQqfR7fKNyG9DZ3EKkkFFLiAw\"",
    "mtime": "2024-11-06T08:15:39.807Z",
    "size": 1302,
    "path": "../public/assets/images/methodology/methodology06.png"
  },
  "/assets/images/methodology/methodology07.png": {
    "type": "image/png",
    "etag": "\"40d-3ncwgF2lYPMfye6aaXNPSc4Rjc0\"",
    "mtime": "2024-11-06T08:15:39.808Z",
    "size": 1037,
    "path": "../public/assets/images/methodology/methodology07.png"
  },
  "/assets/images/methodology/methodology08.png": {
    "type": "image/png",
    "etag": "\"657-IVB58I/vCi1im8EOaey6/HlfLEM\"",
    "mtime": "2024-11-06T08:15:39.808Z",
    "size": 1623,
    "path": "../public/assets/images/methodology/methodology08.png"
  },
  "/assets/images/methodology/methodology09.png": {
    "type": "image/png",
    "etag": "\"53e-XaWpcsxHCzzPpHhE+MI/t7iNQMA\"",
    "mtime": "2024-11-06T08:15:39.809Z",
    "size": 1342,
    "path": "../public/assets/images/methodology/methodology09.png"
  },
  "/assets/images/methodology/methodology10.png": {
    "type": "image/png",
    "etag": "\"631-86x6ux+WOGdzXh8bPbSMGcHthbc\"",
    "mtime": "2024-11-06T08:15:39.809Z",
    "size": 1585,
    "path": "../public/assets/images/methodology/methodology10.png"
  },
  "/assets/images/methodology/methodology11.png": {
    "type": "image/png",
    "etag": "\"50e-dJndmGb7huL6Ik1pWqvZnTYKxAs\"",
    "mtime": "2024-11-06T08:15:39.809Z",
    "size": 1294,
    "path": "../public/assets/images/methodology/methodology11.png"
  },
  "/assets/images/menu-icons/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-oEKfXiSZCrYLl435ZP29qUuddbw\"",
    "mtime": "2024-11-06T08:15:39.772Z",
    "size": 6148,
    "path": "../public/assets/images/menu-icons/.DS_Store"
  },
  "/assets/images/menu-icons/bakery-preparation.png": {
    "type": "image/png",
    "etag": "\"4cd8-EWkVCwLdXoEf/8V7k+T4MReWax0\"",
    "mtime": "2024-11-06T08:15:39.773Z",
    "size": 19672,
    "path": "../public/assets/images/menu-icons/bakery-preparation.png"
  },
  "/assets/images/menu-icons/beverage-machines.png": {
    "type": "image/png",
    "etag": "\"2a5c-7UV3Or9la1f5eDdyPGmkLiEhVGI\"",
    "mtime": "2024-11-06T08:15:39.773Z",
    "size": 10844,
    "path": "../public/assets/images/menu-icons/beverage-machines.png"
  },
  "/assets/images/menu-icons/blast-chillers-&-freezers.png": {
    "type": "image/png",
    "etag": "\"3a76-yp6TIw8GnP3KgjWxp+pHbtZ5RfM\"",
    "mtime": "2024-11-06T08:15:39.774Z",
    "size": 14966,
    "path": "../public/assets/images/menu-icons/blast-chillers-&-freezers.png"
  },
  "/assets/images/menu-icons/buffet-&-servery.png": {
    "type": "image/png",
    "etag": "\"43d8-C4zs5PoFhXlWQCeSb9WNatftdc8\"",
    "mtime": "2024-11-06T08:15:39.774Z",
    "size": 17368,
    "path": "../public/assets/images/menu-icons/buffet-&-servery.png"
  },
  "/assets/images/menu-icons/bulk-cooking.png": {
    "type": "image/png",
    "etag": "\"4693-DP756IwVNGguYTOupA25BIaHs8I\"",
    "mtime": "2024-11-06T08:15:39.775Z",
    "size": 18067,
    "path": "../public/assets/images/menu-icons/bulk-cooking.png"
  },
  "/assets/images/menu-icons/car-wash.png": {
    "type": "image/png",
    "etag": "\"31e2-rH+sXXCijqoKjSQ3iBck1jMUjUc\"",
    "mtime": "2024-11-06T08:15:39.775Z",
    "size": 12770,
    "path": "../public/assets/images/menu-icons/car-wash.png"
  },
  "/assets/images/menu-icons/carpet-cleaning.png": {
    "type": "image/png",
    "etag": "\"a70-sTnJhpTb0BfrITlPBazfXd6Kfvo\"",
    "mtime": "2024-11-06T08:15:39.775Z",
    "size": 2672,
    "path": "../public/assets/images/menu-icons/carpet-cleaning.png"
  },
  "/assets/images/menu-icons/chiller-rooms.png": {
    "type": "image/png",
    "etag": "\"3414-SM3D5rIK/00fFHshGgW/zKN6W0o\"",
    "mtime": "2024-11-06T08:15:39.776Z",
    "size": 13332,
    "path": "../public/assets/images/menu-icons/chiller-rooms.png"
  },
  "/assets/images/menu-icons/coffee-machines.png": {
    "type": "image/png",
    "etag": "\"2a85-1L0KBCt3PHEsgr6vyM6J3jMW/90\"",
    "mtime": "2024-11-06T08:15:39.776Z",
    "size": 10885,
    "path": "../public/assets/images/menu-icons/coffee-machines.png"
  },
  "/assets/images/menu-icons/coffee-machines1.png": {
    "type": "image/png",
    "etag": "\"28b7-BYyPVLiMP42oxqEC5lL1+FVGdi4\"",
    "mtime": "2024-11-06T08:15:39.776Z",
    "size": 10423,
    "path": "../public/assets/images/menu-icons/coffee-machines1.png"
  },
  "/assets/images/menu-icons/consultancy-&-design.png": {
    "type": "image/png",
    "etag": "\"31fc-tlt+RKYnB5ZIzGxkyFtkMhVgWQQ\"",
    "mtime": "2024-11-06T08:15:39.777Z",
    "size": 12796,
    "path": "../public/assets/images/menu-icons/consultancy-&-design.png"
  },
  "/assets/images/menu-icons/container.png": {
    "type": "image/png",
    "etag": "\"b34-hV6SR5Tw6ILwmpHt2ey/KuA6/ow\"",
    "mtime": "2024-11-06T08:15:39.777Z",
    "size": 2868,
    "path": "../public/assets/images/menu-icons/container.png"
  },
  "/assets/images/menu-icons/containerized-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"2264-PRTdlhE+CmCWiXMxA83rCog0RcI\"",
    "mtime": "2024-11-06T08:15:39.777Z",
    "size": 8804,
    "path": "../public/assets/images/menu-icons/containerized-cold-rooms.png"
  },
  "/assets/images/menu-icons/corpse.png": {
    "type": "image/png",
    "etag": "\"5832-IaKxJwU8RopTDhbfMxb+bj5DVzI\"",
    "mtime": "2024-11-06T08:15:39.778Z",
    "size": 22578,
    "path": "../public/assets/images/menu-icons/corpse.png"
  },
  "/assets/images/menu-icons/delivery-cart.png": {
    "type": "image/png",
    "etag": "\"182f-SUVfFj57EIqharGEWKBmfXPLSPQ\"",
    "mtime": "2024-11-06T08:15:39.778Z",
    "size": 6191,
    "path": "../public/assets/images/menu-icons/delivery-cart.png"
  },
  "/assets/images/menu-icons/dishwashers.png": {
    "type": "image/png",
    "etag": "\"531e-1cj/Uoyqo8tKOx0DvHCi3CFPoPk\"",
    "mtime": "2024-11-06T08:15:39.779Z",
    "size": 21278,
    "path": "../public/assets/images/menu-icons/dishwashers.png"
  },
  "/assets/images/menu-icons/display-case.png": {
    "type": "image/png",
    "etag": "\"38ff-IEonVjOxjTBdOu0q0+bIUj6UG4w\"",
    "mtime": "2024-11-06T08:15:39.779Z",
    "size": 14591,
    "path": "../public/assets/images/menu-icons/display-case.png"
  },
  "/assets/images/menu-icons/display-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"2123-LmsX0WVzuJuonXT7lmsDVTFeoYc\"",
    "mtime": "2024-11-06T08:15:39.779Z",
    "size": 8483,
    "path": "../public/assets/images/menu-icons/display-cold-rooms.png"
  },
  "/assets/images/menu-icons/display-counter.png": {
    "type": "image/png",
    "etag": "\"3c84-fhmR8JRrSlnyQfscySizp/l7+VY\"",
    "mtime": "2024-11-06T08:15:39.780Z",
    "size": 15492,
    "path": "../public/assets/images/menu-icons/display-counter.png"
  },
  "/assets/images/menu-icons/display.png": {
    "type": "image/png",
    "etag": "\"26f9-E5ZFpi30jJOzGAjUsEIVN/i/bkk\"",
    "mtime": "2024-11-06T08:15:39.780Z",
    "size": 9977,
    "path": "../public/assets/images/menu-icons/display.png"
  },
  "/assets/images/menu-icons/displays.png": {
    "type": "image/png",
    "etag": "\"2f5e-26Iy+9ZqRDBZB2k9U9MUdGHJUGo\"",
    "mtime": "2024-11-06T08:15:39.781Z",
    "size": 12126,
    "path": "../public/assets/images/menu-icons/displays.png"
  },
  "/assets/images/menu-icons/dryers.png": {
    "type": "image/png",
    "etag": "\"46cc-7qh8BA0+yeBJpnOYFD1O46RlRrk\"",
    "mtime": "2024-11-06T08:15:39.782Z",
    "size": 18124,
    "path": "../public/assets/images/menu-icons/dryers.png"
  },
  "/assets/images/menu-icons/finishing-equipments.png": {
    "type": "image/png",
    "etag": "\"26a1-8ZSCi4vLtuM0ABUwt4UVKHeZB5U\"",
    "mtime": "2024-11-06T08:15:39.782Z",
    "size": 9889,
    "path": "../public/assets/images/menu-icons/finishing-equipments.png"
  },
  "/assets/images/menu-icons/fire-suppression.png": {
    "type": "image/png",
    "etag": "\"30ee-vEzCefbzXHZwPekMIzKBcKYAmGg\"",
    "mtime": "2024-11-06T08:15:39.782Z",
    "size": 12526,
    "path": "../public/assets/images/menu-icons/fire-suppression.png"
  },
  "/assets/images/menu-icons/flatwork-ironers.png": {
    "type": "image/png",
    "etag": "\"232a-Nfp7jiOeOAG6f9wrfMgyBbC7DYA\"",
    "mtime": "2024-11-06T08:15:39.783Z",
    "size": 9002,
    "path": "../public/assets/images/menu-icons/flatwork-ironers.png"
  },
  "/assets/images/menu-icons/floor-cleaning.png": {
    "type": "image/png",
    "etag": "\"3c40-ez+lRJba2lVEMGcdtlE6BNtB19c\"",
    "mtime": "2024-11-06T08:15:39.783Z",
    "size": 15424,
    "path": "../public/assets/images/menu-icons/floor-cleaning.png"
  },
  "/assets/images/menu-icons/food-delivery.png": {
    "type": "image/png",
    "etag": "\"3d29-CRrduCW835Afkj7R9xrbAwUiLlE\"",
    "mtime": "2024-11-06T08:15:39.784Z",
    "size": 15657,
    "path": "../public/assets/images/menu-icons/food-delivery.png"
  },
  "/assets/images/menu-icons/food-transport.png": {
    "type": "image/png",
    "etag": "\"1df0-nPl8w8n0j9r1tg2WUoRqC6k5xCE\"",
    "mtime": "2024-11-06T08:15:39.784Z",
    "size": 7664,
    "path": "../public/assets/images/menu-icons/food-transport.png"
  },
  "/assets/images/menu-icons/food-transportation.png": {
    "type": "image/png",
    "etag": "\"2068-yo4r86AT47NdOrqqJW4wjwDBnwE\"",
    "mtime": "2024-11-06T08:15:39.784Z",
    "size": 8296,
    "path": "../public/assets/images/menu-icons/food-transportation.png"
  },
  "/assets/images/menu-icons/freezer-rooms.png": {
    "type": "image/png",
    "etag": "\"2f97-Y7iSa857b+Px5A3H9G+9uavRAMc\"",
    "mtime": "2024-11-06T08:15:39.785Z",
    "size": 12183,
    "path": "../public/assets/images/menu-icons/freezer-rooms.png"
  },
  "/assets/images/menu-icons/heat-pump-dehydrators.png": {
    "type": "image/png",
    "etag": "\"4011-05nACa4AK2JnCm5pmkZ/YhgcBvg\"",
    "mtime": "2024-11-06T08:15:39.785Z",
    "size": 16401,
    "path": "../public/assets/images/menu-icons/heat-pump-dehydrators.png"
  },
  "/assets/images/menu-icons/hospital-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"26ce-XVg6cf3Gjk6dypVsaAl+nyIePjk\"",
    "mtime": "2024-11-06T08:15:39.786Z",
    "size": 9934,
    "path": "../public/assets/images/menu-icons/hospital-cold-rooms.png"
  },
  "/assets/images/menu-icons/hot-cooking.png": {
    "type": "image/png",
    "etag": "\"4d47-Icj3T4tRO/pMiMNLL9n+7hbFBB0\"",
    "mtime": "2024-11-06T08:15:39.786Z",
    "size": 19783,
    "path": "../public/assets/images/menu-icons/hot-cooking.png"
  },
  "/assets/images/menu-icons/hvac.png": {
    "type": "image/png",
    "etag": "\"65d3-oM39o2RDaeNwwLKbAAJyEA7JpDM\"",
    "mtime": "2024-11-06T08:15:39.787Z",
    "size": 26067,
    "path": "../public/assets/images/menu-icons/hvac.png"
  },
  "/assets/images/menu-icons/hygiene-products.png": {
    "type": "image/png",
    "etag": "\"3123-ds5sGjj0NCSpMdi/sIHawf/YTeM\"",
    "mtime": "2024-11-06T08:15:39.787Z",
    "size": 12579,
    "path": "../public/assets/images/menu-icons/hygiene-products.png"
  },
  "/assets/images/menu-icons/ice-cream-machines.png": {
    "type": "image/png",
    "etag": "\"3246-7hbTqjhTf+O/g5e9fG4mJHGlf3U\"",
    "mtime": "2024-11-06T08:15:39.787Z",
    "size": 12870,
    "path": "../public/assets/images/menu-icons/ice-cream-machines.png"
  },
  "/assets/images/menu-icons/juice-processors.png": {
    "type": "image/png",
    "etag": "\"358d-B+VlJq+7tQ5L1rpuXKDDxM2xrGQ\"",
    "mtime": "2024-11-06T08:15:39.788Z",
    "size": 13709,
    "path": "../public/assets/images/menu-icons/juice-processors.png"
  },
  "/assets/images/menu-icons/kitchen-smalls.png": {
    "type": "image/png",
    "etag": "\"220b-xcpi8lHbNg02Jucj5EGLtKqgUNU\"",
    "mtime": "2024-11-06T08:15:39.788Z",
    "size": 8715,
    "path": "../public/assets/images/menu-icons/kitchen-smalls.png"
  },
  "/assets/images/menu-icons/laundry-service.png": {
    "type": "image/png",
    "etag": "\"491e-w64z9iKA6aWhGmvdFPyxzNYGcPs\"",
    "mtime": "2024-11-06T08:15:39.789Z",
    "size": 18718,
    "path": "../public/assets/images/menu-icons/laundry-service.png"
  },
  "/assets/images/menu-icons/logistics-&-accessories.png": {
    "type": "image/png",
    "etag": "\"38c0-7SHYvRuYDGx3EqnW4urY1GZSQkc\"",
    "mtime": "2024-11-06T08:15:39.789Z",
    "size": 14528,
    "path": "../public/assets/images/menu-icons/logistics-&-accessories.png"
  },
  "/assets/images/menu-icons/meat-preparation.png": {
    "type": "image/png",
    "etag": "\"2b3c-xTIO+SSfeU0/rNXYaRacPNfUHCk\"",
    "mtime": "2024-11-06T08:15:39.789Z",
    "size": 11068,
    "path": "../public/assets/images/menu-icons/meat-preparation.png"
  },
  "/assets/images/menu-icons/mini-cold-rooms.old.png": {
    "type": "image/png",
    "etag": "\"3a76-yp6TIw8GnP3KgjWxp+pHbtZ5RfM\"",
    "mtime": "2024-11-06T08:15:39.790Z",
    "size": 14966,
    "path": "../public/assets/images/menu-icons/mini-cold-rooms.old.png"
  },
  "/assets/images/menu-icons/mini-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"224e-2/p2JdNNi0XqhpWsdWJQfbKO9W4\"",
    "mtime": "2024-11-06T08:15:39.790Z",
    "size": 8782,
    "path": "../public/assets/images/menu-icons/mini-cold-rooms.png"
  },
  "/assets/images/menu-icons/mobile-concepts.png": {
    "type": "image/png",
    "etag": "\"3a4e-apWkj5viAH3gj+NLzrKJk+iVF8Q\"",
    "mtime": "2024-11-06T08:15:39.791Z",
    "size": 14926,
    "path": "../public/assets/images/menu-icons/mobile-concepts.png"
  },
  "/assets/images/menu-icons/morgue.png": {
    "type": "image/png",
    "etag": "\"26ce-XVg6cf3Gjk6dypVsaAl+nyIePjk\"",
    "mtime": "2024-11-06T08:15:39.791Z",
    "size": 9934,
    "path": "../public/assets/images/menu-icons/morgue.png"
  },
  "/assets/images/menu-icons/ovens.png": {
    "type": "image/png",
    "etag": "\"2611-M8MXoas1w9bT8jbfHhFXjzBSt5I\"",
    "mtime": "2024-11-06T08:15:39.791Z",
    "size": 9745,
    "path": "../public/assets/images/menu-icons/ovens.png"
  },
  "/assets/images/menu-icons/packhouse-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"1c83-gkVsio79Y5vcXrlxkq6qzzbMFUI\"",
    "mtime": "2024-11-06T08:15:39.793Z",
    "size": 7299,
    "path": "../public/assets/images/menu-icons/packhouse-cold-rooms.png"
  },
  "/assets/images/menu-icons/rational-combi-steamer.png": {
    "type": "image/png",
    "etag": "\"2c5c-7XUPQJMfCRvyXWyHqeYJnwuAev0\"",
    "mtime": "2024-11-06T08:15:39.793Z",
    "size": 11356,
    "path": "../public/assets/images/menu-icons/rational-combi-steamer.png"
  },
  "/assets/images/menu-icons/refrigeration.png": {
    "type": "image/png",
    "etag": "\"137f-pDOgh61eKeHWfyKrojx4yN51/Yc\"",
    "mtime": "2024-11-06T08:15:39.793Z",
    "size": 4991,
    "path": "../public/assets/images/menu-icons/refrigeration.png"
  },
  "/assets/images/menu-icons/retail-panels.png": {
    "type": "image/png",
    "etag": "\"42b3-wxfUxbUQ3pA8W5KEMPGzOiZn+0k\"",
    "mtime": "2024-11-06T08:15:39.793Z",
    "size": 17075,
    "path": "../public/assets/images/menu-icons/retail-panels.png"
  },
  "/assets/images/menu-icons/ripening-chambers.png": {
    "type": "image/png",
    "etag": "\"2d5c-vgRld1EW77/T8+vJsEnKPWlA+R8\"",
    "mtime": "2024-11-06T08:15:39.794Z",
    "size": 11612,
    "path": "../public/assets/images/menu-icons/ripening-chambers.png"
  },
  "/assets/images/menu-icons/semi-commercial-range.png": {
    "type": "image/png",
    "etag": "\"3d4b-3d8HJbrn9f4a732dAvarf6jhJ8o\"",
    "mtime": "2024-11-06T08:15:39.794Z",
    "size": 15691,
    "path": "../public/assets/images/menu-icons/semi-commercial-range.png"
  },
  "/assets/images/menu-icons/soft-drink.png": {
    "type": "image/png",
    "etag": "\"1ce4-naH0/l1oJWpzvacBU7ABqdaciiY\"",
    "mtime": "2024-11-06T08:15:39.795Z",
    "size": 7396,
    "path": "../public/assets/images/menu-icons/soft-drink.png"
  },
  "/assets/images/menu-icons/solar-powered-cold-rooms.png": {
    "type": "image/png",
    "etag": "\"4306-fyE7/Q0fz+4TGsRo75+9LT8Bl84\"",
    "mtime": "2024-11-06T08:15:39.795Z",
    "size": 17158,
    "path": "../public/assets/images/menu-icons/solar-powered-cold-rooms.png"
  },
  "/assets/images/menu-icons/stainless-steel-fabrication.png": {
    "type": "image/png",
    "etag": "\"1095-GUdzUNhbkC1fkemXryjnlo9LUbQ\"",
    "mtime": "2024-11-06T08:15:39.795Z",
    "size": 4245,
    "path": "../public/assets/images/menu-icons/stainless-steel-fabrication.png"
  },
  "/assets/images/menu-icons/storage.png": {
    "type": "image/png",
    "etag": "\"10db-VeoS4tVza+ttZ2i155IqLMzQcRw\"",
    "mtime": "2024-11-06T08:15:39.796Z",
    "size": 4315,
    "path": "../public/assets/images/menu-icons/storage.png"
  },
  "/assets/images/menu-icons/tumble-dryer.png": {
    "type": "image/png",
    "etag": "\"4772-dNM1nA4FWodRaVVu5vvYD/lngVY\"",
    "mtime": "2024-11-06T08:15:39.799Z",
    "size": 18290,
    "path": "../public/assets/images/menu-icons/tumble-dryer.png"
  },
  "/assets/images/menu-icons/vegetable-preparation.png": {
    "type": "image/png",
    "etag": "\"2962-52gCvt479s9nbuAGcpxZqxd+T9I\"",
    "mtime": "2024-11-06T08:15:39.799Z",
    "size": 10594,
    "path": "../public/assets/images/menu-icons/vegetable-preparation.png"
  },
  "/assets/images/menu-icons/washer-extractors.png": {
    "type": "image/png",
    "etag": "\"6112-86XDPN5tycr/bzWpxffDwUV/8Pk\"",
    "mtime": "2024-11-06T08:15:39.800Z",
    "size": 24850,
    "path": "../public/assets/images/menu-icons/washer-extractors.png"
  },
  "/assets/images/menu-icons/wet-&-dry-cleaning.png": {
    "type": "image/png",
    "etag": "\"4778-p+viwyB5XZNyyG+0iC1LcoOmMLc\"",
    "mtime": "2024-11-06T08:15:39.800Z",
    "size": 18296,
    "path": "../public/assets/images/menu-icons/wet-&-dry-cleaning.png"
  },
  "/assets/images/partners/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-11-06T08:15:39.824Z",
    "size": 6148,
    "path": "../public/assets/images/partners/.DS_Store"
  },
  "/assets/images/partners/partners1.jpg": {
    "type": "image/jpeg",
    "etag": "\"17726-bTZ0UznYMGlVtgDkURCajhhRWy8\"",
    "mtime": "2024-11-06T08:15:39.825Z",
    "size": 96038,
    "path": "../public/assets/images/partners/partners1.jpg"
  },
  "/assets/images/partners/partners1.png": {
    "type": "image/png",
    "etag": "\"548df-Yss6LDTq8+4757HgTwmQw6GJHG0\"",
    "mtime": "2024-11-06T08:15:39.829Z",
    "size": 346335,
    "path": "../public/assets/images/partners/partners1.png"
  },
  "/assets/images/partners/partners2.jpg": {
    "type": "image/jpeg",
    "etag": "\"175c4-Ynq8+LzhDMqA3WM5y20Jt1pc+XE\"",
    "mtime": "2024-11-06T08:15:39.830Z",
    "size": 95684,
    "path": "../public/assets/images/partners/partners2.jpg"
  },
  "/assets/images/partners/partners2.png": {
    "type": "image/png",
    "etag": "\"39a27-Krpovqy++/C4QSr00scmLfZL0bk\"",
    "mtime": "2024-11-06T08:15:39.833Z",
    "size": 236071,
    "path": "../public/assets/images/partners/partners2.png"
  },
  "/assets/images/partners/partners3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1850d-BYIxVnH0FFbHx8O2Sln4X+9Dohw\"",
    "mtime": "2024-11-06T08:15:39.834Z",
    "size": 99597,
    "path": "../public/assets/images/partners/partners3.jpg"
  },
  "/assets/images/partners/partners3.png": {
    "type": "image/png",
    "etag": "\"31978-Bnsg4p/ncQMRb8iWttditAeKz1I\"",
    "mtime": "2024-11-06T08:15:39.836Z",
    "size": 203128,
    "path": "../public/assets/images/partners/partners3.png"
  },
  "/assets/images/partners/partners4.jpg": {
    "type": "image/jpeg",
    "etag": "\"176b5-+O//F37t7AWv5A8zUAczOJG6z/c\"",
    "mtime": "2024-11-06T08:15:39.837Z",
    "size": 95925,
    "path": "../public/assets/images/partners/partners4.jpg"
  },
  "/assets/images/partners/partners4.png": {
    "type": "image/png",
    "etag": "\"6c6ee-oHaaaToXkhEaWepVVmL3XSrYz6M\"",
    "mtime": "2024-11-06T08:15:39.840Z",
    "size": 444142,
    "path": "../public/assets/images/partners/partners4.png"
  },
  "/assets/images/partners/partners5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a085-ypUFbIcDtTpqRMv9T3lBR25qkXE\"",
    "mtime": "2024-11-06T08:15:39.841Z",
    "size": 106629,
    "path": "../public/assets/images/partners/partners5.jpg"
  },
  "/assets/images/partners/partners5.png": {
    "type": "image/png",
    "etag": "\"43721-+TJ0iBG2ccsWNxkSSYYPVnM6nXE\"",
    "mtime": "2024-11-06T08:15:39.843Z",
    "size": 276257,
    "path": "../public/assets/images/partners/partners5.png"
  },
  "/assets/images/partners/partners6.jpg": {
    "type": "image/jpeg",
    "etag": "\"17ae3-fwJE/DqxQuerw5oR+qE0jRZPkRc\"",
    "mtime": "2024-11-06T08:15:39.844Z",
    "size": 96995,
    "path": "../public/assets/images/partners/partners6.jpg"
  },
  "/assets/images/partners/partners6.png": {
    "type": "image/png",
    "etag": "\"5be76-CXtRUVLwC0lsu9RGoD2vk0yCn5w\"",
    "mtime": "2024-11-06T08:15:39.846Z",
    "size": 376438,
    "path": "../public/assets/images/partners/partners6.png"
  },
  "/assets/images/projects/coffee-shop.png": {
    "type": "image/png",
    "etag": "\"3385-vHO2rl0xfWo/MSZdcIrVSqYnWJQ\"",
    "mtime": "2024-11-06T08:15:39.876Z",
    "size": 13189,
    "path": "../public/assets/images/projects/coffee-shop.png"
  },
  "/assets/images/projects/coldroom.png": {
    "type": "image/png",
    "etag": "\"247c-EkG6BRE7ctz/GgzKa6bnNTIS880\"",
    "mtime": "2024-11-06T08:15:39.876Z",
    "size": 9340,
    "path": "../public/assets/images/projects/coldroom.png"
  },
  "/assets/images/projects/corporate.png": {
    "type": "image/png",
    "etag": "\"44bd-XOxObLDsbqYAcDfSoo+bYjxhscA\"",
    "mtime": "2024-11-06T08:15:39.876Z",
    "size": 17597,
    "path": "../public/assets/images/projects/corporate.png"
  },
  "/assets/images/projects/hospital.png": {
    "type": "image/png",
    "etag": "\"2b82-oz6+cvf5YSdu3K1RnolxG/TZN6w\"",
    "mtime": "2024-11-06T08:15:39.877Z",
    "size": 11138,
    "path": "../public/assets/images/projects/hospital.png"
  },
  "/assets/images/projects/hotel.png": {
    "type": "image/png",
    "etag": "\"2f28-v306yCJrNqKGpJuvKNyaSCW7xv4\"",
    "mtime": "2024-11-06T08:15:39.877Z",
    "size": 12072,
    "path": "../public/assets/images/projects/hotel.png"
  },
  "/assets/images/projects/institutions.png": {
    "type": "image/png",
    "etag": "\"2e0b-6l64e7HPShBM8NcoBBJTxKOBy+4\"",
    "mtime": "2024-11-06T08:15:39.877Z",
    "size": 11787,
    "path": "../public/assets/images/projects/institutions.png"
  },
  "/assets/images/projects/laundry.png": {
    "type": "image/png",
    "etag": "\"491e-w64z9iKA6aWhGmvdFPyxzNYGcPs\"",
    "mtime": "2024-11-06T08:15:39.878Z",
    "size": 18718,
    "path": "../public/assets/images/projects/laundry.png"
  },
  "/assets/images/projects/ngo.png": {
    "type": "image/png",
    "etag": "\"28e7-uc8FL39lplrX53edmv3/gZSYY70\"",
    "mtime": "2024-11-06T08:15:39.878Z",
    "size": 10471,
    "path": "../public/assets/images/projects/ngo.png"
  },
  "/assets/images/projects/residentials.png": {
    "type": "image/png",
    "etag": "\"4e5f-q5B510qfm7y5kPetQv4iFeqBphU\"",
    "mtime": "2024-11-06T08:15:39.879Z",
    "size": 20063,
    "path": "../public/assets/images/projects/residentials.png"
  },
  "/assets/images/projects/restaurant.png": {
    "type": "image/png",
    "etag": "\"48b8-zT08WJjM9oiid/Dros54Vy4r290\"",
    "mtime": "2024-11-06T08:15:39.879Z",
    "size": 18616,
    "path": "../public/assets/images/projects/restaurant.png"
  },
  "/assets/images/projects/retail.png": {
    "type": "image/png",
    "etag": "\"4ac0-Q7Pf1gYQxG991Knekm7pVZ96B5E\"",
    "mtime": "2024-11-06T08:15:39.880Z",
    "size": 19136,
    "path": "../public/assets/images/projects/retail.png"
  },
  "/assets/images/sheffield-advantages-icons/after_sales_service.png": {
    "type": "image/png",
    "etag": "\"6fb3-dqe0RDvxq3YtJER1zokGdZi9n+M\"",
    "mtime": "2024-11-06T08:15:39.890Z",
    "size": 28595,
    "path": "../public/assets/images/sheffield-advantages-icons/after_sales_service.png"
  },
  "/assets/images/sheffield-advantages-icons/one_stop.png": {
    "type": "image/png",
    "etag": "\"4ef2-oLmAaO6l4O5OsF6ynvT7RCu4Wpo\"",
    "mtime": "2024-11-06T08:15:39.891Z",
    "size": 20210,
    "path": "../public/assets/images/sheffield-advantages-icons/one_stop.png"
  },
  "/assets/images/sheffield-advantages-icons/our_african.png": {
    "type": "image/png",
    "etag": "\"41b4-SDqsd63Ftm72HzrmTekNt5cgk9Q\"",
    "mtime": "2024-11-06T08:15:39.891Z",
    "size": 16820,
    "path": "../public/assets/images/sheffield-advantages-icons/our_african.png"
  },
  "/assets/images/sheffield-advantages-icons/our_certifications.png": {
    "type": "image/png",
    "etag": "\"40b5-0fhwWcOIRWEvcaOy0H7dRZ1pTOw\"",
    "mtime": "2024-11-06T08:15:39.892Z",
    "size": 16565,
    "path": "../public/assets/images/sheffield-advantages-icons/our_certifications.png"
  },
  "/assets/images/sheffield-advantages-icons/our_experience.png": {
    "type": "image/png",
    "etag": "\"79ab-WMH+UCGyprwfRJqaMpIK84hlPXM\"",
    "mtime": "2024-11-06T08:15:39.892Z",
    "size": 31147,
    "path": "../public/assets/images/sheffield-advantages-icons/our_experience.png"
  },
  "/assets/images/sheffield-advantages-icons/our_infrastucture.png": {
    "type": "image/png",
    "etag": "\"316c-jLdX5qy+0Hj8wGnpt67Id1LGbzQ\"",
    "mtime": "2024-11-06T08:15:39.892Z",
    "size": 12652,
    "path": "../public/assets/images/sheffield-advantages-icons/our_infrastucture.png"
  },
  "/assets/images/sheffield-advantages-icons/our_innovation.png": {
    "type": "image/png",
    "etag": "\"8927-QpOABzQ0xqTPozN3o4PEZavyY3M\"",
    "mtime": "2024-11-06T08:15:39.893Z",
    "size": 35111,
    "path": "../public/assets/images/sheffield-advantages-icons/our_innovation.png"
  },
  "/assets/images/sheffield-advantages-icons/our_staff.png": {
    "type": "image/png",
    "etag": "\"5a72-JEmsFoD6Am78sYdPhGZgEO+qv8E\"",
    "mtime": "2024-11-06T08:15:39.893Z",
    "size": 23154,
    "path": "../public/assets/images/sheffield-advantages-icons/our_staff.png"
  },
  "/assets/images/sheffield-advantages-icons/warranty.png": {
    "type": "image/png",
    "etag": "\"26c8-SkafMZG71N1j/mud5uQ2E/cAjkE\"",
    "mtime": "2024-11-06T08:15:39.894Z",
    "size": 9928,
    "path": "../public/assets/images/sheffield-advantages-icons/warranty.png"
  },
  "/assets/images/sheffield-advantages-icons/we_gurantee.png": {
    "type": "image/png",
    "etag": "\"4aa8-jM/9ZuNMS0mRzCIhUOC5krCV4dE\"",
    "mtime": "2024-11-06T08:15:39.894Z",
    "size": 19112,
    "path": "../public/assets/images/sheffield-advantages-icons/we_gurantee.png"
  },
  "/assets/images/sheffield-advantages-icons/we_offer_smart.png": {
    "type": "image/png",
    "etag": "\"46a1-6sPP2pryD9Bwy9nVj6SPI40cNS0\"",
    "mtime": "2024-11-06T08:15:39.895Z",
    "size": 18081,
    "path": "../public/assets/images/sheffield-advantages-icons/we_offer_smart.png"
  },
  "/assets/images/sheffield-advantages-icons/we_provide_training.png": {
    "type": "image/png",
    "etag": "\"4c41-i3tEeuyrnWLWNxhxPmBonU98CT8\"",
    "mtime": "2024-11-06T08:15:39.895Z",
    "size": 19521,
    "path": "../public/assets/images/sheffield-advantages-icons/we_provide_training.png"
  },
  "/assets/images/sheffiled-advantage/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-bJMQh0nyPKFBlR+IgcZrIq0kRXA\"",
    "mtime": "2024-11-06T08:15:39.912Z",
    "size": 6148,
    "path": "../public/assets/images/sheffiled-advantage/.DS_Store"
  },
  "/assets/images/sheffiled-advantage/certifications.jpg": {
    "type": "image/jpeg",
    "etag": "\"2106c-j8Wv6B6Y0r/opMGTSq2m9nY59pM\"",
    "mtime": "2024-11-06T08:15:39.916Z",
    "size": 135276,
    "path": "../public/assets/images/sheffiled-advantage/certifications.jpg"
  },
  "/assets/images/sheffiled-advantage/Experience.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ee54-Jkj80yMw9Nv81l62vBzOEmWpZeI\"",
    "mtime": "2024-11-06T08:15:39.914Z",
    "size": 126548,
    "path": "../public/assets/images/sheffiled-advantage/Experience.jpg"
  },
  "/assets/images/sheffiled-advantage/Footprint.jpg": {
    "type": "image/jpeg",
    "etag": "\"10958-jCAgoqjQ4iCgnvp5e9lXghwW0nM\"",
    "mtime": "2024-11-06T08:15:39.915Z",
    "size": 67928,
    "path": "../public/assets/images/sheffiled-advantage/Footprint.jpg"
  },
  "/assets/images/sheffiled-advantage/green_solutions.jpg": {
    "type": "image/jpeg",
    "etag": "\"23a6d-6dlRw6VE8R242AtkXSYg4Dh0r1U\"",
    "mtime": "2024-11-06T08:15:39.917Z",
    "size": 146029,
    "path": "../public/assets/images/sheffiled-advantage/green_solutions.jpg"
  },
  "/assets/images/sheffiled-advantage/our_staff.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cf0a-PRm5U0sObpbDqSmHFj3dCzcPi5g\"",
    "mtime": "2024-11-06T08:15:39.918Z",
    "size": 118538,
    "path": "../public/assets/images/sheffiled-advantage/our_staff.jpg"
  },
  "/assets/images/sheffiled-advantage/provide_training.jpg": {
    "type": "image/jpeg",
    "etag": "\"225a7-FpKLnf2XmLTxg77Y4Rj5KkHRh40\"",
    "mtime": "2024-11-06T08:15:39.919Z",
    "size": 140711,
    "path": "../public/assets/images/sheffiled-advantage/provide_training.jpg"
  },
  "/assets/images/sheffiled-advantage/quality.jpg": {
    "type": "image/jpeg",
    "etag": "\"19c59-xBMXbFgFr7a4ccNr7MCnYrqbsk4\"",
    "mtime": "2024-11-06T08:15:39.921Z",
    "size": 105561,
    "path": "../public/assets/images/sheffiled-advantage/quality.jpg"
  },
  "/assets/images/sheffiled-advantage/rnd.jpg": {
    "type": "image/jpeg",
    "etag": "\"23cad-WDPQJriHFwNvWi0Y2YMMo5bI4xQ\"",
    "mtime": "2024-11-06T08:15:39.921Z",
    "size": 146605,
    "path": "../public/assets/images/sheffiled-advantage/rnd.jpg"
  },
  "/assets/images/sheffiled-advantage/warranty.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fcbc-q9LUhYQ58JzN1DjAg+dT2RkdRXs\"",
    "mtime": "2024-11-06T08:15:39.923Z",
    "size": 195772,
    "path": "../public/assets/images/sheffiled-advantage/warranty.jpg"
  },
  "/assets/images/social-icons/facebook.png": {
    "type": "image/png",
    "etag": "\"486-RY8ofhgQNhosOPhlI43ef+UBEX0\"",
    "mtime": "2024-11-06T08:15:39.925Z",
    "size": 1158,
    "path": "../public/assets/images/social-icons/facebook.png"
  },
  "/assets/images/social-icons/instagram.png": {
    "type": "image/png",
    "etag": "\"d9d-e8GJHV+Mn9JPMsen+jzIAXUVqso\"",
    "mtime": "2024-11-06T08:15:39.926Z",
    "size": 3485,
    "path": "../public/assets/images/social-icons/instagram.png"
  },
  "/assets/images/social-icons/linkedin.png": {
    "type": "image/png",
    "etag": "\"bbd-EU14lmboTJoj1Zj0z7wU015zjB8\"",
    "mtime": "2024-11-06T08:15:39.926Z",
    "size": 3005,
    "path": "../public/assets/images/social-icons/linkedin.png"
  },
  "/assets/images/social-icons/threads.png": {
    "type": "image/png",
    "etag": "\"f15-LzgCX485kgjDDcRMzV2mcy1p52E\"",
    "mtime": "2024-11-06T08:15:39.926Z",
    "size": 3861,
    "path": "../public/assets/images/social-icons/threads.png"
  },
  "/assets/images/social-icons/tiktok.png": {
    "type": "image/png",
    "etag": "\"833-yEL1aRB1lNj2SDkABaEh6VG0hxs\"",
    "mtime": "2024-11-06T08:15:39.926Z",
    "size": 2099,
    "path": "../public/assets/images/social-icons/tiktok.png"
  },
  "/assets/images/social-icons/whatsapp.png": {
    "type": "image/png",
    "etag": "\"e31-a6JgpbtjWVsJXrsOy5WAr+zoJTQ\"",
    "mtime": "2024-11-06T08:15:39.927Z",
    "size": 3633,
    "path": "../public/assets/images/social-icons/whatsapp.png"
  },
  "/assets/images/social-icons/x.png": {
    "type": "image/png",
    "etag": "\"1856-hHalxuCmOKg0HbLinSm3BWQdZ0A\"",
    "mtime": "2024-11-06T08:15:39.927Z",
    "size": 6230,
    "path": "../public/assets/images/social-icons/x.png"
  },
  "/assets/images/social-icons/youtube.png": {
    "type": "image/png",
    "etag": "\"fb3-nI5zgaHIuIcbmOONc9okEI9E4u0\"",
    "mtime": "2024-11-06T08:15:39.927Z",
    "size": 4019,
    "path": "../public/assets/images/social-icons/youtube.png"
  },
  "/assets/images/team/Ann Ajode Pic.jpg": {
    "type": "image/jpeg",
    "etag": "\"19359-DVuWwU++SUCDtRo6TujkGbW493M\"",
    "mtime": "2024-12-03T07:08:25.036Z",
    "size": 103257,
    "path": "../public/assets/images/team/Ann Ajode Pic.jpg"
  },
  "/assets/images/team/Hari G.JPG": {
    "type": "image/jpeg",
    "etag": "\"20f7d-jIfMNgwSqZzr+b46WxiSvKBCY6w\"",
    "mtime": "2024-12-03T07:08:25.206Z",
    "size": 135037,
    "path": "../public/assets/images/team/Hari G.JPG"
  },
  "/assets/images/team/MD - Suresh Kanotra website.jpg": {
    "type": "image/jpeg",
    "etag": "\"24b0f-kHDBgcrzFwwIhK5LiMUuS+undn0\"",
    "mtime": "2024-12-03T07:08:25.136Z",
    "size": 150287,
    "path": "../public/assets/images/team/MD - Suresh Kanotra website.jpg"
  },
  "/assets/images/team/Mwangi_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fa62-7pJqeJDKw+0cEjEXxMttOXfdXj4\"",
    "mtime": "2024-12-03T07:08:25.006Z",
    "size": 129634,
    "path": "../public/assets/images/team/Mwangi_2.jpg"
  },
  "/assets/images/team/samman.jpg": {
    "type": "image/jpeg",
    "etag": "\"1039d-JkIx3acDXMJRudv/dJlLzocG6pc\"",
    "mtime": "2024-12-03T07:08:25.080Z",
    "size": 66461,
    "path": "../public/assets/images/team/samman.jpg"
  },
  "/assets/images/team/Saveer-Singh-Vohra.jpg": {
    "type": "image/jpeg",
    "etag": "\"f217-JGsNcy2PCeN6o6VBP2W4A3RrE+o\"",
    "mtime": "2024-12-03T07:08:25.060Z",
    "size": 61975,
    "path": "../public/assets/images/team/Saveer-Singh-Vohra.jpg"
  },
  "/assets/images/team/Simon.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e2d7-0SzjJL12kZrnSn2sSwUuzyx84Jo\"",
    "mtime": "2024-12-03T07:08:25.171Z",
    "size": 123607,
    "path": "../public/assets/images/team/Simon.jpg"
  },
  "/assets/images/team/Vikas-removebg-preview.jpg": {
    "type": "image/jpeg",
    "etag": "\"acd1-Cr4zEmvV2SwA0hoyKWJ9JVW9Rk4\"",
    "mtime": "2024-12-03T07:08:25.108Z",
    "size": 44241,
    "path": "../public/assets/images/team/Vikas-removebg-preview.jpg"
  },
  "/assets/css/assets/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6fba6-gFx2wlx8wNxpUt2v5yLz0L+rtCo\"",
    "mtime": "2024-12-10T06:42:30.143Z",
    "size": 457638,
    "path": "../public/assets/css/assets/css/style.css"
  },
  "/assets/css/plugins/magnific-popup/magnific-popup.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ff9-aQSuGdDj03KzwI9jTeYCcrA1GFk\"",
    "mtime": "2024-12-02T12:49:17.862Z",
    "size": 8185,
    "path": "../public/assets/css/plugins/magnific-popup/magnific-popup.css"
  },
  "/assets/css/plugins/nouislider/nouislider.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14ff-ZaBnEKKbg/+RxUuo4QipP+ZQnXw\"",
    "mtime": "2024-12-02T12:49:17.865Z",
    "size": 5375,
    "path": "../public/assets/css/plugins/nouislider/nouislider.css"
  },
  "/assets/css/plugins/owl-carousel/owl.carousel.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"335f-fj0oGNdr7lNuGETvh/6VkYI4TPc\"",
    "mtime": "2024-12-02T12:49:17.866Z",
    "size": 13151,
    "path": "../public/assets/css/plugins/owl-carousel/owl.carousel.css"
  },
  "/assets/vendor/font-awesome/css/all.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d747-OgVxppWjXyOAJrk5g4bcmdmgxW0\"",
    "mtime": "2024-12-02T12:49:20.813Z",
    "size": 55111,
    "path": "../public/assets/vendor/font-awesome/css/all.min.css"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1fb7c-HNLCsRgmyh4QvAd9GLLyQle/iKQ\"",
    "mtime": "2024-12-02T12:49:20.814Z",
    "size": 129916,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.eot"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1fb7c-HNLCsRgmyh4QvAd9GLLyQle/iKQ\"",
    "mtime": "2024-12-02T12:49:20.815Z",
    "size": 129916,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.eot_"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.svg": {
    "type": "image/svg+xml",
    "etag": "\"a9937-RNKEgCvoQNltJsfziIeSX6g704M\"",
    "mtime": "2024-12-02T12:49:20.817Z",
    "size": 694583,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.svg"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"1fa4c-T3WECWXyAguelyz5KwAZwX2eUe0\"",
    "mtime": "2024-12-02T12:49:20.817Z",
    "size": 129612,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.ttf"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.woff": {
    "type": "font/woff",
    "etag": "\"15688-4Ea4t0ttoe46GRAHJhDeX8cXWZ8\"",
    "mtime": "2024-12-02T12:49:20.818Z",
    "size": 87688,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.woff"
  },
  "/assets/vendor/font-awesome/webfonts/fa-brands-400.woff2": {
    "type": "font/woff2",
    "etag": "\"12410-f2xoKt4gTmQa7Y9HEGTFa27dwmM\"",
    "mtime": "2024-12-02T12:49:20.819Z",
    "size": 74768,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-brands-400.woff2"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"8654-ZiaEfPZu5H6E2UlEtNAd2y4zZss\"",
    "mtime": "2024-12-02T12:49:20.820Z",
    "size": 34388,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.eot"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8654-ZiaEfPZu5H6E2UlEtNAd2y4zZss\"",
    "mtime": "2024-12-02T12:49:20.820Z",
    "size": 34388,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.eot_"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.svg": {
    "type": "image/svg+xml",
    "etag": "\"23443-xRTzx5A8x0Y42GvNY17AD9VSBc4\"",
    "mtime": "2024-12-02T12:49:20.821Z",
    "size": 144451,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.svg"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"852c-iKVFNSJH37uQKB3amBEKja7I2F4\"",
    "mtime": "2024-12-02T12:49:20.822Z",
    "size": 34092,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.ttf"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.woff": {
    "type": "font/woff",
    "etag": "\"41a4-sLRDLGVxZiZQ3Dy+Y/1e8euSC3M\"",
    "mtime": "2024-12-02T12:49:20.824Z",
    "size": 16804,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.woff"
  },
  "/assets/vendor/font-awesome/webfonts/fa-regular-400.woff2": {
    "type": "font/woff2",
    "etag": "\"34f0-hYOk8N0S4VpIszlVkzB6hNlxzDM\"",
    "mtime": "2024-12-02T12:49:20.825Z",
    "size": 13552,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-regular-400.woff2"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2d968-lL5Gx1ShQV7SIfeBNuRUSQGNoO0\"",
    "mtime": "2024-12-02T12:49:20.826Z",
    "size": 186728,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.eot"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2d968-lL5Gx1ShQV7SIfeBNuRUSQGNoO0\"",
    "mtime": "2024-12-02T12:49:20.827Z",
    "size": 186728,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.eot_"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.svg": {
    "type": "image/svg+xml",
    "etag": "\"c771e-k08CHG+jqgMQ6e7qJdeKEyogSlE\"",
    "mtime": "2024-12-02T12:49:20.829Z",
    "size": 816926,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.svg"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"2d84c-dTiQVf8W9Q4TxGuV2jxZrwkfNME\"",
    "mtime": "2024-12-02T12:49:20.830Z",
    "size": 186444,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.ttf"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.woff": {
    "type": "font/woff",
    "etag": "\"17800-lk1bFpUK3s8U5jKt+ScHcgMey50\"",
    "mtime": "2024-12-02T12:49:20.831Z",
    "size": 96256,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.woff"
  },
  "/assets/vendor/font-awesome/webfonts/fa-solid-900.woff2": {
    "type": "font/woff2",
    "etag": "\"12210-prAD71BuktBc3nOt9nSH1/1+xt8\"",
    "mtime": "2024-12-02T12:49:20.835Z",
    "size": 74256,
    "path": "../public/assets/vendor/font-awesome/webfonts/fa-solid-900.woff2"
  },
  "/assets/vendor/line-awesome/line-awesome/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-jgjgQor723wqri+5jJ0udgMnKP8\"",
    "mtime": "2024-12-02T12:49:20.837Z",
    "size": 6148,
    "path": "../public/assets/vendor/line-awesome/line-awesome/.DS_Store"
  },
  "/assets/landing-assets/js/plugins/jquery.appear.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"590-NRkg9PRcBAMc/zI3O1z6Z5OPxc8\"",
    "mtime": "2024-12-02T12:49:20.718Z",
    "size": 1424,
    "path": "../public/assets/landing-assets/js/plugins/jquery.appear.min.js"
  },
  "/assets/landing-assets/js/plugins/jquery.countTo.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7db-TohC3izWjheVIUv1xSwzW4Lv+ro\"",
    "mtime": "2024-12-02T12:49:20.719Z",
    "size": 2011,
    "path": "../public/assets/landing-assets/js/plugins/jquery.countTo.min.js"
  },
  "/assets/landing-assets/js/plugins/jquery.lazyload.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ea9-Wlz/l1RFPWXeZwbepjBMH4qCL4o\"",
    "mtime": "2024-12-02T12:49:20.719Z",
    "size": 3753,
    "path": "../public/assets/landing-assets/js/plugins/jquery.lazyload.min.js"
  },
  "/assets/landing-assets/js/plugins/jquery.parallax.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4795-2Y2pMF31o8Vx2ZpAThmCZQBUot0\"",
    "mtime": "2024-12-02T12:49:20.720Z",
    "size": 18325,
    "path": "../public/assets/landing-assets/js/plugins/jquery.parallax.js"
  },
  "/assets/landing-assets/vendor/animate/animate.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e283-3p1WRe8QxTYuwfiTu4OZVZTq35k\"",
    "mtime": "2024-12-02T12:49:20.722Z",
    "size": 57987,
    "path": "../public/assets/landing-assets/vendor/animate/animate.min.css"
  },
  "/dearflip/examples/example-assets/books/intro.pdf": {
    "type": "application/pdf",
    "etag": "\"b3494-XvipbbW0DBbQCoG66PQHeKMO3dE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 734356,
    "path": "../public/dearflip/examples/example-assets/books/intro.pdf"
  },
  "/dearflip/dflip/images/pdfjs/annotation-check.svg": {
    "type": "image/svg+xml",
    "etag": "\"19f-AV0D/6agzpO0Htk6Jih55PjPcv0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 415,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-check.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-comment.svg": {
    "type": "image/svg+xml",
    "etag": "\"373-Xsh1FT1QRlBwUKNTFCLKabRGgMc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 883,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-comment.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-help.svg": {
    "type": "image/svg+xml",
    "etag": "\"878-Lz2I9OjO+vwtdpMhBPayUXA0ry8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2168,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-help.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-insert.svg": {
    "type": "image/svg+xml",
    "etag": "\"198-ehKvdO8g1SSaDDMNmSvREyMIy6w\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 408,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-insert.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-key.svg": {
    "type": "image/svg+xml",
    "etag": "\"5ac-2SJNOu93TW7MlzW0QIEK2kOEvhE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1452,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-key.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-newparagraph.svg": {
    "type": "image/svg+xml",
    "etag": "\"1aa-RTukeqELb8+EWVaeClULT5EmDsc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 426,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-newparagraph.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-noicon.svg": {
    "type": "image/svg+xml",
    "etag": "\"9e-WlRH5cOc98p0iFOhXb2DXdqjtd8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 158,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-noicon.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-note.svg": {
    "type": "image/svg+xml",
    "etag": "\"411-YQDe62Eh+Yx+Ak7BonMXEgfITH8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1041,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-note.svg"
  },
  "/dearflip/dflip/images/pdfjs/annotation-paragraph.svg": {
    "type": "image/svg+xml",
    "etag": "\"477-cFkaOybFaBXG5asrrpWeipUcQ/s\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1143,
    "path": "../public/dearflip/dflip/images/pdfjs/annotation-paragraph.svg"
  },
  "/dearflip/dflip/images/textures/white.jpg": {
    "type": "image/jpeg",
    "etag": "\"763-kpi5AI3FoZTo0DMHoTkDzyszndg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1891,
    "path": "../public/dearflip/dflip/images/textures/white.jpg"
  },
  "/dearflip/dflip/js/libs/compatibility.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b88-T/vnjEpXjEj+xwk2yJaJymGOxCI\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 19336,
    "path": "../public/dearflip/dflip/js/libs/compatibility.js"
  },
  "/dearflip/dflip/js/libs/imagesloaded.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15c0-fH3dLae5udl8+Nv87pp/Q0BvVBI\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 5568,
    "path": "../public/dearflip/dflip/js/libs/imagesloaded.min.js"
  },
  "/dearflip/dflip/js/libs/jquery-migrate.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3567-YIKlKtA/HayMD/gV7BhAKzhjFho\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 13671,
    "path": "../public/dearflip/dflip/js/libs/jquery-migrate.min.js"
  },
  "/dearflip/dflip/js/libs/jquery.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"158b5-GLl2X9sKJhIoDQjeraT5eouiyh8\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 88245,
    "path": "../public/dearflip/dflip/js/libs/jquery.min.js"
  },
  "/dearflip/dflip/js/libs/masonry.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f0a-k88BKAc3A3hmvkzG6WZpT/1BhC4\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 24330,
    "path": "../public/dearflip/dflip/js/libs/masonry.min.js"
  },
  "/dearflip/dflip/js/libs/mockup.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a0ea-Zouhyx2/Y4QufW2AIoiOPFWUzN0\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 41194,
    "path": "../public/dearflip/dflip/js/libs/mockup.min.js"
  },
  "/dearflip/dflip/js/libs/pdf.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5a155-CAcDo4Cy1NG1OEAn9ss7TMZ34YA\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 368981,
    "path": "../public/dearflip/dflip/js/libs/pdf.min.js"
  },
  "/dearflip/dflip/js/libs/pdf.worker.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d009d-8sMX+SL4mzHuGlvH0ev1VjApcxA\"",
    "mtime": "2024-11-26T10:04:30.058Z",
    "size": 852125,
    "path": "../public/dearflip/dflip/js/libs/pdf.worker.min.js"
  },
  "/dearflip/dflip/js/libs/three.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e55d-NsnZyTvLb2y2H+jHczr3/o6Wj60\"",
    "mtime": "2024-11-26T10:04:30.027Z",
    "size": 255325,
    "path": "../public/dearflip/dflip/js/libs/three.min.js"
  },
  "/assets/images/about/about-2/img-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"190a0-MpnG4Vb3gTifgr3NThvwc5RzEgg\"",
    "mtime": "2024-11-06T08:15:39.635Z",
    "size": 102560,
    "path": "../public/assets/images/about/about-2/img-1.jpg"
  },
  "/assets/images/about/about-2/signature.png": {
    "type": "image/png",
    "etag": "\"7a5-7MdK9ZeSVqzVcFsDoYG3g0X/Ado\"",
    "mtime": "2024-11-06T08:15:39.636Z",
    "size": 1957,
    "path": "../public/assets/images/about/about-2/signature.png"
  },
  "/assets/images/about-us/csr/csr_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c147-jnelNAfzimGKDdIIZ8PTGCIAdII\"",
    "mtime": "2024-11-06T08:15:38.840Z",
    "size": 115015,
    "path": "../public/assets/images/about-us/csr/csr_1.jpg"
  },
  "/assets/images/about-us/csr/csr_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"27f09-4RGl0hy/QKa7Gu2PuP8GY7MpOQk\"",
    "mtime": "2024-11-06T08:15:38.842Z",
    "size": 163593,
    "path": "../public/assets/images/about-us/csr/csr_2.jpg"
  },
  "/assets/images/about-us/csr/environment.png": {
    "type": "image/png",
    "etag": "\"3fae-sxRbCaUBe4zLCEQ36In+t1exV84\"",
    "mtime": "2024-11-06T08:15:38.842Z",
    "size": 16302,
    "path": "../public/assets/images/about-us/csr/environment.png"
  },
  "/assets/images/about-us/csr/social-impact.png": {
    "type": "image/png",
    "etag": "\"40e6-ExIUzlHWudLyLvb3+e0QjlMwgzs\"",
    "mtime": "2024-11-06T08:15:38.843Z",
    "size": 16614,
    "path": "../public/assets/images/about-us/csr/social-impact.png"
  },
  "/assets/images/about-us/icons/who-we-are.png": {
    "type": "image/png",
    "etag": "\"12aa-vaNkkj0YUCsZYzgUaypVQ6MYGhI\"",
    "mtime": "2024-11-06T08:15:38.846Z",
    "size": 4778,
    "path": "../public/assets/images/about-us/icons/who-we-are.png"
  },
  "/assets/images/about-us/slider/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-DS85FiP/kiVgOhaQuYSKHEn0ewg\"",
    "mtime": "2024-11-06T08:15:39.043Z",
    "size": 6148,
    "path": "../public/assets/images/about-us/slider/.DS_Store"
  },
  "/assets/images/about-us/slider/history1.jpg": {
    "type": "image/jpeg",
    "etag": "\"287b7-MvgfadKUcArDU8EE5alVycsCuy4\"",
    "mtime": "2024-11-06T08:15:39.045Z",
    "size": 165815,
    "path": "../public/assets/images/about-us/slider/history1.jpg"
  },
  "/assets/images/about-us/slider/history1.old.jpg": {
    "type": "image/jpeg",
    "etag": "\"22ce2-5jIBe9Ruhclp4BVh2IZbEYdi3DU\"",
    "mtime": "2024-11-06T08:15:39.045Z",
    "size": 142562,
    "path": "../public/assets/images/about-us/slider/history1.old.jpg"
  },
  "/assets/images/about-us/slider/history2.jpg": {
    "type": "image/jpeg",
    "etag": "\"23b39-MngZvqd/DqtKs5Nfb2ewutwInvw\"",
    "mtime": "2024-11-06T08:15:39.046Z",
    "size": 146233,
    "path": "../public/assets/images/about-us/slider/history2.jpg"
  },
  "/assets/images/about-us/slider/history2.old.jpg": {
    "type": "image/jpeg",
    "etag": "\"23b5c-J3ne71+YdDP9tlLxMb0GlScRNoQ\"",
    "mtime": "2024-11-06T08:15:39.048Z",
    "size": 146268,
    "path": "../public/assets/images/about-us/slider/history2.old.jpg"
  },
  "/assets/images/about-us/slider/history3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4196b-UT7Be74AukmEQ9iWX9ZX4zl6F4Y\"",
    "mtime": "2024-11-06T08:15:39.049Z",
    "size": 268651,
    "path": "../public/assets/images/about-us/slider/history3.jpg"
  },
  "/assets/images/about-us/slider/history3.old.jpg": {
    "type": "image/jpeg",
    "etag": "\"2578b-Z58fiDPAzQTBgZdPghnZn2jP/9s\"",
    "mtime": "2024-11-06T08:15:39.050Z",
    "size": 153483,
    "path": "../public/assets/images/about-us/slider/history3.old.jpg"
  },
  "/assets/images/about-us/slider/history3OLD.jpg": {
    "type": "image/jpeg",
    "etag": "\"25138-kPPTHHDGFtq7j2TuPpznzAKGr+Q\"",
    "mtime": "2024-11-06T08:15:39.051Z",
    "size": 151864,
    "path": "../public/assets/images/about-us/slider/history3OLD.jpg"
  },
  "/assets/images/about-us/slider/mob-slider1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c7f8-dqUsykFvBBbfnGGj0huR9r1X0Xw\"",
    "mtime": "2024-11-06T08:15:39.052Z",
    "size": 116728,
    "path": "../public/assets/images/about-us/slider/mob-slider1.jpg"
  },
  "/assets/images/about-us/slider/mob-slider2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b296-groAweXhQNJF0YhRx18MgxzoTEQ\"",
    "mtime": "2024-11-06T08:15:39.053Z",
    "size": 111254,
    "path": "../public/assets/images/about-us/slider/mob-slider2.jpg"
  },
  "/assets/images/about-us/slider/mob-slider3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d4df-4Eurs4gxyPzmIsI44x2pgLHyMV0\"",
    "mtime": "2024-11-06T08:15:39.054Z",
    "size": 120031,
    "path": "../public/assets/images/about-us/slider/mob-slider3.jpg"
  },
  "/assets/images/about-us/slider/mob-slider4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1acef-d5MjvK6C9AUjQk6N0eSKLa5S+MY\"",
    "mtime": "2024-11-06T08:15:39.055Z",
    "size": 109807,
    "path": "../public/assets/images/about-us/slider/mob-slider4.jpg"
  },
  "/assets/images/about-us/slider/mob-slider5.jpg": {
    "type": "image/jpeg",
    "etag": "\"19c4c-ZU/yrikHnYbXLfjABeRpY0vqf/4\"",
    "mtime": "2024-11-06T08:15:39.056Z",
    "size": 105548,
    "path": "../public/assets/images/about-us/slider/mob-slider5.jpg"
  },
  "/assets/images/about-us/slider/mob-slider6.jpg": {
    "type": "image/jpeg",
    "etag": "\"15628-+JkCEanrqJE2qTKBreK7O9iHogE\"",
    "mtime": "2024-11-06T08:15:39.056Z",
    "size": 87592,
    "path": "../public/assets/images/about-us/slider/mob-slider6.jpg"
  },
  "/assets/images/about-us/slider/mob-slider7.jpg": {
    "type": "image/jpeg",
    "etag": "\"19531-4vZjkYwEKDEcQJi7YLqxBA12+zI\"",
    "mtime": "2024-11-06T08:15:39.057Z",
    "size": 103729,
    "path": "../public/assets/images/about-us/slider/mob-slider7.jpg"
  },
  "/assets/images/about-us/slider/mob-slider8.jpg": {
    "type": "image/jpeg",
    "etag": "\"16eef-UYKeTRrbQTRM8TY9mtoQmqkJY54\"",
    "mtime": "2024-11-06T08:15:39.058Z",
    "size": 93935,
    "path": "../public/assets/images/about-us/slider/mob-slider8.jpg"
  },
  "/assets/images/about-us/slider/mob-slider9.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a604-W6Lta8OyfVuyyxiPyoORe1YTOtg\"",
    "mtime": "2024-11-06T08:15:39.058Z",
    "size": 108036,
    "path": "../public/assets/images/about-us/slider/mob-slider9.jpg"
  },
  "/assets/images/about-us/video/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-+bc3u5hBgES9rg9uJe5B8UnFxPQ\"",
    "mtime": "2024-11-06T08:15:39.148Z",
    "size": 6148,
    "path": "../public/assets/images/about-us/video/.DS_Store"
  },
  "/assets/images/about-us/video/broaster.jpg": {
    "type": "image/jpeg",
    "etag": "\"89c7-29XdKRacqB43LV2mGLfM6F22/WQ\"",
    "mtime": "2024-11-06T08:15:39.601Z",
    "size": 35271,
    "path": "../public/assets/images/about-us/video/broaster.jpg"
  },
  "/assets/images/about-us/video/Dr. Coffee.jpg": {
    "type": "image/jpeg",
    "etag": "\"abb4-joM5EL8h102nbJK/f8LMly09q+4\"",
    "mtime": "2024-11-06T08:15:39.149Z",
    "size": 43956,
    "path": "../public/assets/images/about-us/video/Dr. Coffee.jpg"
  },
  "/assets/images/about-us/video/EGRO.jpg": {
    "type": "image/jpeg",
    "etag": "\"95bf-ezHXkzbrCmU7pi+aF+lJZluYG00\"",
    "mtime": "2024-11-06T08:15:39.150Z",
    "size": 38335,
    "path": "../public/assets/images/about-us/video/EGRO.jpg"
  },
  "/assets/images/about-us/video/Electrolux.jpg": {
    "type": "image/jpeg",
    "etag": "\"9ecb-E4ugoxtPIg2jsTDU4NfDb3Qid/s\"",
    "mtime": "2024-11-06T08:15:39.152Z",
    "size": 40651,
    "path": "../public/assets/images/about-us/video/Electrolux.jpg"
  },
  "/assets/images/about-us/video/f4e.jpg": {
    "type": "image/jpeg",
    "etag": "\"d01b-GpXi9twkGy0f0NHYnl7XsJUqY4I\"",
    "mtime": "2024-11-06T08:15:39.602Z",
    "size": 53275,
    "path": "../public/assets/images/about-us/video/f4e.jpg"
  },
  "/assets/images/about-us/video/FAGOR.jpg": {
    "type": "image/jpeg",
    "etag": "\"8dd8-cFGyLIMmNQnQdigmSqBP+19uV60\"",
    "mtime": "2024-11-06T08:15:39.152Z",
    "size": 36312,
    "path": "../public/assets/images/about-us/video/FAGOR.jpg"
  },
  "/assets/images/about-us/video/FOOD_FOR_EDUCATION_GIGA_KITCHEN_upload.mp4": {
    "type": "video/mp4",
    "etag": "\"22483f7-XVj1dpQIknbEhRYkFaI7Xz/R12I\"",
    "mtime": "2024-11-06T08:15:39.202Z",
    "size": 35947511,
    "path": "../public/assets/images/about-us/video/FOOD_FOR_EDUCATION_GIGA_KITCHEN_upload.mp4"
  },
  "/assets/images/about-us/video/iCombi.mp4": {
    "type": "video/mp4",
    "etag": "\"9c5e36-cUYDS8HXvxUdAL4J1IydlxwemSw\"",
    "mtime": "2024-11-06T08:15:39.617Z",
    "size": 10247734,
    "path": "../public/assets/images/about-us/video/iCombi.mp4"
  },
  "/assets/images/about-us/video/mambo_safi_.jpg": {
    "type": "image/jpeg",
    "etag": "\"61bf-+0LDYikra7wUAPbVzOIBmNiWx4A\"",
    "mtime": "2024-11-06T08:15:39.625Z",
    "size": 25023,
    "path": "../public/assets/images/about-us/video/mambo_safi_.jpg"
  },
  "/assets/images/about-us/video/Mambo_Safi_Laundromat.mp4": {
    "type": "video/mp4",
    "etag": "\"472da9-wxF+NrB7zKtvXUl/wlTxaofSm7E\"",
    "mtime": "2024-11-06T08:15:39.221Z",
    "size": 4664745,
    "path": "../public/assets/images/about-us/video/Mambo_Safi_Laundromat.mp4"
  },
  "/assets/images/about-us/video/PressureFryers.mp4": {
    "type": "video/mp4",
    "etag": "\"f26e52-9aV/XO5H3nTI2wTzKsgrC7vw22k\"",
    "mtime": "2024-11-06T08:15:39.248Z",
    "size": 15887954,
    "path": "../public/assets/images/about-us/video/PressureFryers.mp4"
  },
  "/assets/images/about-us/video/Prisma Food.jpg": {
    "type": "image/jpeg",
    "etag": "\"b880-iHAG4MMkpEsBsf8bnsQk0KZZq88\"",
    "mtime": "2024-11-06T08:15:39.249Z",
    "size": 47232,
    "path": "../public/assets/images/about-us/video/Prisma Food.jpg"
  },
  "/assets/images/about-us/video/Prismafood.mp4": {
    "type": "video/mp4",
    "etag": "\"bc9163-eVpVp6x6xLqZa33O0FVeJKU4A6o\"",
    "mtime": "2024-11-06T08:15:39.270Z",
    "size": 12357987,
    "path": "../public/assets/images/about-us/video/Prismafood.mp4"
  },
  "/assets/images/about-us/video/rational.png": {
    "type": "image/png",
    "etag": "\"44b3-EnQqjogISBs1IRyvsqollIRjpL4\"",
    "mtime": "2024-11-06T08:15:39.626Z",
    "size": 17587,
    "path": "../public/assets/images/about-us/video/rational.png"
  },
  "/assets/images/about-us/video/Santos.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e08-WfCjub+05+X6M8YPh+mBSo+saJY\"",
    "mtime": "2024-11-06T08:15:39.271Z",
    "size": 40456,
    "path": "../public/assets/images/about-us/video/Santos.jpg"
  },
  "/assets/images/about-us/video/sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad6d-eAeJnuKrv3k/uYe6Oojg6N4XulE\"",
    "mtime": "2024-11-06T08:15:39.626Z",
    "size": 44397,
    "path": "../public/assets/images/about-us/video/sheffield.jpg"
  },
  "/assets/images/about-us/video/Sheffield_Africa_Suresh_Kanotra.mp4": {
    "type": "video/mp4",
    "etag": "\"50a3cad-8tYF1uo9ZzM+mCnG/qmj3NBpBHA\"",
    "mtime": "2024-11-06T08:15:39.599Z",
    "size": 84556973,
    "path": "../public/assets/images/about-us/video/Sheffield_Africa_Suresh_Kanotra.mp4"
  },
  "/assets/images/about-us/video/Skymsen.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b87-4/eFilU402f+XWmcUA1Ys+WRMxU\"",
    "mtime": "2024-11-06T08:15:39.600Z",
    "size": 39815,
    "path": "../public/assets/images/about-us/video/Skymsen.jpg"
  },
  "/assets/images/about-us/video/TASKI.jpg": {
    "type": "image/jpeg",
    "etag": "\"98b1-pp2WA55kYiwj7FKruSH8Zv+08K0\"",
    "mtime": "2024-11-06T08:15:39.600Z",
    "size": 39089,
    "path": "../public/assets/images/about-us/video/TASKI.jpg"
  },
  "/assets/images/about-us/video/Tecnodom.jpg": {
    "type": "image/jpeg",
    "etag": "\"c10d-4ONqV3YOvAwsV0hlZAmT5bQdh5Y\"",
    "mtime": "2024-11-06T08:15:39.601Z",
    "size": 49421,
    "path": "../public/assets/images/about-us/video/Tecnodom.jpg"
  },
  "/assets/images/about-us/who-we-are/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-11-06T08:15:39.627Z",
    "size": 6148,
    "path": "../public/assets/images/about-us/who-we-are/.DS_Store"
  },
  "/assets/images/about-us/who-we-are/cold-room.jpg": {
    "type": "image/jpeg",
    "etag": "\"23130-rGTxHsms78r9mmmuSPWvHkZhxfk\"",
    "mtime": "2024-11-06T08:15:39.628Z",
    "size": 143664,
    "path": "../public/assets/images/about-us/who-we-are/cold-room.jpg"
  },
  "/assets/images/about-us/who-we-are/fabrications.jpg": {
    "type": "image/jpeg",
    "etag": "\"22243-joUSAibfH4YN0cXSqGU9JAKAf3E\"",
    "mtime": "2024-11-06T08:15:39.629Z",
    "size": 139843,
    "path": "../public/assets/images/about-us/who-we-are/fabrications.jpg"
  },
  "/assets/images/about-us/who-we-are/kitchens.jpg": {
    "type": "image/jpeg",
    "etag": "\"202c2-uCp6roqzn48uODFd13HgIBzJCVE\"",
    "mtime": "2024-11-06T08:15:39.630Z",
    "size": 131778,
    "path": "../public/assets/images/about-us/who-we-are/kitchens.jpg"
  },
  "/assets/images/about-us/who-we-are/laundry.jpg": {
    "type": "image/jpeg",
    "etag": "\"27917-MDrwv21oW+1GcOghlG/xp/YkW8o\"",
    "mtime": "2024-11-06T08:15:39.631Z",
    "size": 162071,
    "path": "../public/assets/images/about-us/who-we-are/laundry.jpg"
  },
  "/assets/images/about-us/who-we-are/who-we-are-background-black-white.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ffe3-ZdwsiEGdjnkmPoyhars8XJs9xKE\"",
    "mtime": "2024-11-06T08:15:39.632Z",
    "size": 196579,
    "path": "../public/assets/images/about-us/who-we-are/who-we-are-background-black-white.jpg"
  },
  "/assets/images/about-us/who-we-are/who-we-are-background.jpg": {
    "type": "image/jpeg",
    "etag": "\"31461-eOomf2xxEu1s+kbSXII8c7XUUj0\"",
    "mtime": "2024-11-06T08:15:39.633Z",
    "size": 201825,
    "path": "../public/assets/images/about-us/who-we-are/who-we-are-background.jpg"
  },
  "/assets/images/about-us/who-we-are/who_we_are_sheffield_steel_systems.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c476-62VrlvO6Dw1KCqlWJ6Y7OiYT6fQ\"",
    "mtime": "2024-11-06T08:15:39.634Z",
    "size": 181366,
    "path": "../public/assets/images/about-us/who-we-are/who_we_are_sheffield_steel_systems.jpg"
  },
  "/assets/images/menu-icons/top-menu/cold-room.png": {
    "type": "image/png",
    "etag": "\"3414-SM3D5rIK/00fFHshGgW/zKN6W0o\"",
    "mtime": "2024-11-06T08:15:39.797Z",
    "size": 13332,
    "path": "../public/assets/images/menu-icons/top-menu/cold-room.png"
  },
  "/assets/images/menu-icons/top-menu/kitchen.png": {
    "type": "image/png",
    "etag": "\"2d19-6eNOa8pXoyzp/6pIuaYvcixtZZ8\"",
    "mtime": "2024-11-06T08:15:39.798Z",
    "size": 11545,
    "path": "../public/assets/images/menu-icons/top-menu/kitchen.png"
  },
  "/assets/images/menu-icons/top-menu/laundry.png": {
    "type": "image/png",
    "etag": "\"54d9-R9BpGU9IpCWxErWklDAl8kvAhU0\"",
    "mtime": "2024-11-06T08:15:39.798Z",
    "size": 21721,
    "path": "../public/assets/images/menu-icons/top-menu/laundry.png"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-PAeA5HKFTAJi72vzy7Vkfvfr+9Q\"",
    "mtime": "2024-12-02T12:49:20.839Z",
    "size": 6148,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/.DS_Store"
  },
  "/assets/landing-assets/vendor/font-awesome/css/all.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d747-OgVxppWjXyOAJrk5g4bcmdmgxW0\"",
    "mtime": "2024-12-02T12:49:20.725Z",
    "size": 55111,
    "path": "../public/assets/landing-assets/vendor/font-awesome/css/all.min.css"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1fb7c-HNLCsRgmyh4QvAd9GLLyQle/iKQ\"",
    "mtime": "2024-12-02T12:49:20.727Z",
    "size": 129916,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.eot"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1fb7c-HNLCsRgmyh4QvAd9GLLyQle/iKQ\"",
    "mtime": "2024-12-02T12:49:20.727Z",
    "size": 129916,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.eot_"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.svg": {
    "type": "image/svg+xml",
    "etag": "\"a9937-RNKEgCvoQNltJsfziIeSX6g704M\"",
    "mtime": "2024-12-02T12:49:20.729Z",
    "size": 694583,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.svg"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"1fa4c-T3WECWXyAguelyz5KwAZwX2eUe0\"",
    "mtime": "2024-12-02T12:49:20.730Z",
    "size": 129612,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.ttf"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.woff": {
    "type": "font/woff",
    "etag": "\"15688-4Ea4t0ttoe46GRAHJhDeX8cXWZ8\"",
    "mtime": "2024-12-02T12:49:20.731Z",
    "size": 87688,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.woff"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.woff2": {
    "type": "font/woff2",
    "etag": "\"12410-f2xoKt4gTmQa7Y9HEGTFa27dwmM\"",
    "mtime": "2024-12-02T12:49:20.732Z",
    "size": 74768,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-brands-400.woff2"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"8654-ZiaEfPZu5H6E2UlEtNAd2y4zZss\"",
    "mtime": "2024-12-02T12:49:20.733Z",
    "size": 34388,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.eot"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8654-ZiaEfPZu5H6E2UlEtNAd2y4zZss\"",
    "mtime": "2024-12-02T12:49:20.733Z",
    "size": 34388,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.eot_"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.svg": {
    "type": "image/svg+xml",
    "etag": "\"23443-xRTzx5A8x0Y42GvNY17AD9VSBc4\"",
    "mtime": "2024-12-02T12:49:20.734Z",
    "size": 144451,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.svg"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"852c-iKVFNSJH37uQKB3amBEKja7I2F4\"",
    "mtime": "2024-12-02T12:49:20.735Z",
    "size": 34092,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.ttf"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.woff": {
    "type": "font/woff",
    "etag": "\"41a4-sLRDLGVxZiZQ3Dy+Y/1e8euSC3M\"",
    "mtime": "2024-12-02T12:49:20.736Z",
    "size": 16804,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.woff"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.woff2": {
    "type": "font/woff2",
    "etag": "\"34f0-hYOk8N0S4VpIszlVkzB6hNlxzDM\"",
    "mtime": "2024-12-02T12:49:20.736Z",
    "size": 13552,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-regular-400.woff2"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2d968-lL5Gx1ShQV7SIfeBNuRUSQGNoO0\"",
    "mtime": "2024-12-02T12:49:20.737Z",
    "size": 186728,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.eot"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.eot_": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2d968-lL5Gx1ShQV7SIfeBNuRUSQGNoO0\"",
    "mtime": "2024-12-02T12:49:20.738Z",
    "size": 186728,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.eot_"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.svg": {
    "type": "image/svg+xml",
    "etag": "\"c771e-k08CHG+jqgMQ6e7qJdeKEyogSlE\"",
    "mtime": "2024-12-02T12:49:20.739Z",
    "size": 816926,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.svg"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"2d84c-dTiQVf8W9Q4TxGuV2jxZrwkfNME\"",
    "mtime": "2024-12-02T12:49:20.740Z",
    "size": 186444,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.ttf"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.woff": {
    "type": "font/woff",
    "etag": "\"17800-lk1bFpUK3s8U5jKt+ScHcgMey50\"",
    "mtime": "2024-12-02T12:49:20.741Z",
    "size": 96256,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.woff"
  },
  "/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.woff2": {
    "type": "font/woff2",
    "etag": "\"12210-prAD71BuktBc3nOt9nSH1/1+xt8\"",
    "mtime": "2024-12-02T12:49:20.801Z",
    "size": 74256,
    "path": "../public/assets/landing-assets/vendor/font-awesome/webfonts/fa-solid-900.woff2"
  },
  "/assets/landing-assets/vendor/molla-fonts/css/font-icons.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5138-98yekXkOnu1l9X+tRgu5t3vk0kI\"",
    "mtime": "2024-12-02T12:49:20.803Z",
    "size": 20792,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/css/font-icons.css"
  },
  "/assets/landing-assets/vendor/molla-fonts/fonts/molla.eot_74273691": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3e800-2+ga2/86zfgEbUiOgXTfokCYUg4\"",
    "mtime": "2024-12-02T12:49:20.804Z",
    "size": 256000,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/fonts/molla.eot_74273691"
  },
  "/assets/landing-assets/vendor/molla-fonts/fonts/molla.svg_74273691": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"51712-f1j3M1i+OGgtDxjUrkhax+1GCGk\"",
    "mtime": "2024-12-02T12:49:20.805Z",
    "size": 333586,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/fonts/molla.svg_74273691"
  },
  "/assets/landing-assets/vendor/molla-fonts/fonts/molla.ttf_74273691": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3e764-eNJP/KIsEboT1hwzgNnMhiq1JQ4\"",
    "mtime": "2024-12-02T12:49:20.807Z",
    "size": 255844,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/fonts/molla.ttf_74273691"
  },
  "/assets/landing-assets/vendor/molla-fonts/fonts/molla.woff2_74273691": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"20f00-XlbN8mhpZeYcH/rf61KeHIWV9Ro\"",
    "mtime": "2024-12-02T12:49:20.809Z",
    "size": 134912,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/fonts/molla.woff2_74273691"
  },
  "/assets/landing-assets/vendor/molla-fonts/fonts/molla.woff_74273691": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"276fc-bwYQL0YIanD8XRYwoAtMrlhcbqA\"",
    "mtime": "2024-12-02T12:49:20.810Z",
    "size": 161532,
    "path": "../public/assets/landing-assets/vendor/molla-fonts/fonts/molla.woff_74273691"
  },
  "/dearflip/dflip/js/libs/cmaps/78-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"964-yEpf4FuypeTlmTKdDrs+2P4ev98\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2404,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ad-Z43LqHICJhMxUDdPeEk8wJybjZ4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 173,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"94b-53RJQnpdVBHJ2hwaZOHjrjYrvN8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2379,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"95e-Xw8gKTKGXDjnsLBpJOQZx390voU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2398,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ad-P6aDDj5cawzF0DQCz7ZxKgTAjTE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 173,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a9-xYpSG9+tb/4w4pJQWZKjlgM9A8M\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 169,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78ms-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a5b-7zffaF5HeXIrNPzAJrGWsiS/yhM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2651,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78ms-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/78ms-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"122-J9RXCEkRB7LPZzws1YS/Ison5OQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 290,
    "path": "../public/dearflip/dflip/js/libs/cmaps/78ms-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/83pv-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"389-xEdPd9lL5m13G6aPGP8v1gajyCA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 905,
    "path": "../public/dearflip/dflip/js/libs/cmaps/83pv-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90ms-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2d1-mUym1iMtkb4EfGjgh+CVHcyky6Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 721,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90ms-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90ms-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"122-xO2OC4L8Kf9hQMcuyKs6zDzQV48\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 290,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90ms-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90msp-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2cb-0/AtZyTZyR0HftOFRckyHbpltiQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 715,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90msp-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90msp-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"123-3fwP2zQxTy1xFtcH+m27JLyb85A\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 291,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90msp-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90pv-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3d6-diGKze2UstKfdHc15/tB8ZzuhOs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 982,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90pv-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/90pv-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"104-cpbTOfXB2EO4I0gvorOFfAVZ65M\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 260,
    "path": "../public/dearflip/dflip/js/libs/cmaps/90pv-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Add-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"973-zVXsPVYnuAUF19vqQz5XAvjAUmA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2419,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Add-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Add-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"96d-mhfCaN7Ph23DXF8gxmDuY1Y/pSM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2413,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Add-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Add-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"11f-Dk7xHtf05e07LjLyZ/TD+0NZ0I4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 287,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Add-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Add-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"11a-Asp7gLUHZA35mOm19tJbNGCC2ME\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 282,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Add-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-0.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"13d-JBzM/IW1756kYY+UpjQeAtGwO5g\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 317,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-0.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-1.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"173-83tbaBmGkMgnAyLaoOpSIiWkYSc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 371,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-1.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"178-pWi+5xsS7E55ovplxOufhlxQWl4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 376,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-3.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"191-71Z7WCVOA4N9RuH9/0/qXM4xinQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 401,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-3.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-4.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"195-X4H0eCpfmWZJ3DGMFYeudyiv0Qs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 405,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-4.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-5.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"196-t9586kFXXHkzz/25F60fkY33bHA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 406,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-5.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-6.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"196-TqouxUjffNvezi7sIn/bnUyy8oE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 406,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-6.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-UCS2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a0e9-vulx0EyuedeRpSvw09Xi6d6x0cg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 41193,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-CNS1-UCS2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-0.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"d9-hu3xRQgNL+26LwoLCrG8GNmlr1U\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 217,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-0.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-1.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"fa-g8wo79XneLnTeJj5sQC1ArxELcM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 250,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-1.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1d1-o84BMq9UFz0wpDMDFLxM8nP8Kcg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 465,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-3.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1d6-x7bPvqxoEBB3HQItMZkTx5hBbXU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 470,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-3.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-4.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"259-zuMAe7Qe0bvn/SLwVMD7A2qSyM8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 601,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-4.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-5.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"271-p9lEB4TXc1B+PYPQv5P6jZOjKJ8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 625,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-5.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-GB1-UCS2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"84b6-IzZmJO+mdOJJOhi/a24sFpKdaNM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 33974,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-GB1-UCS2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-0.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"e1-zltJToCcMGIZaBadAdETbzrRzjw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 225,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-0.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-1.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"e2-p2ayl0WjCqMxbK/HPYhMJxzBL/Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 226,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-1.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"e9-eMTobP+KocLyvBiq+DCVqW8LylA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 233,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-3.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f2-W1INLPN+IbCEvJ5qIdAGxT5OVS4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 242,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-3.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-4.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"151-QTbJAvRxXtGLiyOQll02IdL9oEg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 337,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-4.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-5.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1ae-OJcP1Bahw+9PqiUAklQ0difSSWQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 430,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-5.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-6.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1e5-37p6slG1rAfXZIxOgegI6glleMk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 485,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-6.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-UCS2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9ff7-2ZwNkIuAda+mmqPFeak5OxOyndk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 40951,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Japan1-UCS2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-0.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"f1-yo4XdM3ShZugNB5EdNB9b7L5OVs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 241,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-0.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-1.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"182-6beDljFgOAzP4z+h3N2cebHPKTQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 386,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-1.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"187-C41/2EjePvqG+VjG4c9a7Om/G/Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 391,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-UCS2.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"5afd-FeTgfJaJGiuyd4td+N0KEx7e7VI\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 23293,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Adobe-Korea1-UCS2.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"43e-dx1xFTv2UtETS31lvrivxgyDX/Y\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1086,
    "path": "../public/dearflip/dflip/js/libs/cmaps/B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8e-38c2LBV8JGUXYeUhbvDEarp5VIg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 142,
    "path": "../public/dearflip/dflip/js/libs/cmaps/B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/B5pc-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"44b-KdX9QdyPxPGbWZSbmn9BDWP0870\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1099,
    "path": "../public/dearflip/dflip/js/libs/cmaps/B5pc-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/B5pc-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"90-8Srm7SMgE2lZQg4osbk3ABzdTws\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 144,
    "path": "../public/dearflip/dflip/js/libs/cmaps/B5pc-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"6f4-HaeOtSeBMwFIyVzPZMeO3SByqZE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1780,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"780-iV/gOSWNrgDXqM6pOzsH15RUPS0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1920,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS1-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2c2-B/Qisoyk/t8s3GzN9VHq7K5A9gs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 706,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS1-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS1-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8f-dFW9kuGh8yv9LLW4Drk4qmZfa4o\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 143,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS1-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS2-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1f8-BXCoGGMRu6StIWJQ+AVGEiDUHQo\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 504,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS2-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/CNS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"5d-wIcMP62DSeM5H/fNop0fOpF+J/E\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 93,
    "path": "../public/dearflip/dflip/js/libs/cmaps/CNS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETen-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"465-nDtwcA164rjEzG9ljNyY9OZbO+Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1125,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETen-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETen-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9e-W2N/obIDdU2YRjBTs4ovaUzeSZs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 158,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETen-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETenms-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"65-EgfJMSla1fV6QwMX1QFPtm0Oq30\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 101,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETenms-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETenms-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ac-YxxYp/eoCU1EqFjSZIWrZbSZtZs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 172,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETenms-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETHK-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"114a-IlIFrTqtWJZ/ryOiUEcxq+vG3Mw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 4426,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETHK-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/ETHK-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9e-A+Nef8G3VJXfVVmj9xxfDL0VF7o\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 158,
    "path": "../public/dearflip/dflip/js/libs/cmaps/ETHK-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"242-+IcptqQTrhNluvtdyAdrRlqh+4c\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 578,
    "path": "../public/dearflip/dflip/js/libs/cmaps/EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"aa-xHxC2QmcrxRHSY5X/ByPPH/0F7M\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 170,
    "path": "../public/dearflip/dflip/js/libs/cmaps/EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Ext-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9e8-S2on4RJbsRv5/Y/pxTdfd4HJUgQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2536,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Ext-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Ext-RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9ee-4cJWOm14WqXjDeQjkR0Xn+eeyVc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2542,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Ext-RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Ext-RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"da-VENZGCNze6mJk1N8TU6K9wo3yS4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 218,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Ext-RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Ext-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"d7-DYinUXeD8lzh7uCCpe0SsPlgYcI\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 215,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Ext-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GB-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"225-QjHqsilouqKepOb9xCeLc3Bnp9o\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 549,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GB-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GB-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b3-fSaHMrMAQx/O0TUbS/0StRKZKD4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 179,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GB-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GB-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"210-PxwqaL3RNUHmos1qejk1gelETh4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 528,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GB-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GB-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"af-twR3qXOHCfY5rfa8IOgTY+/MntA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 175,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GB-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBK-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3964-CJhrNwrCe2DPjNcCPJ5J9reEtSs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 14692,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBK-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBK-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b4-Tw4M//r6IbMPeiXlFhc4+vLiZf4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 180,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBK-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBK2K-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"4cce-o2BSuLXX3B3eK3IUN9aryQ7Hzv4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 19662,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBK2K-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBK2K-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"db-0ntpFrfeGZNGTl8zgi8Xb9yOlJ8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 219,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBK2K-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBKp-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"395e-qHhaREA/EwCX7pojw5I9WvJSrFE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 14686,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBKp-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBKp-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b5-cX9tZYUYS/67iU5ZhoiGq488OPE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 181,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBKp-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBpc-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"22d-XDTvp8yk4vZS+B9EmP30HbG3seY\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 557,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBpc-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBpc-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b5-NgBKa+2uDt+upiCn2PYc+4dflkA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 181,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBpc-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBT-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1c7a-4t2kSJakH0+oF8U5fxeJR2O3Yj4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 7290,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBT-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBT-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b4-nW71+ileMAXWIJBHVNfMFhBL6Qg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 180,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBT-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBT-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1c65-YlCLvCK803leSvLH+jz93HE2eBM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 7269,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBT-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBT-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b0-Lwk24L1DYvfG+MK1ZkLWSDNmzRE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 176,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBT-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBTpc-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1c82-OI63a1OwCNkN/mjB4yiDFLIcPNw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 7298,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBTpc-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/GBTpc-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b6-zhJfUgl8cfyDYxV3l3rCZ7iQHHg\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 182,
    "path": "../public/dearflip/dflip/js/libs/cmaps/GBTpc-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"229-FJwIwOrcQF9rpkrayTKf2zANEas\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 553,
    "path": "../public/dearflip/dflip/js/libs/cmaps/H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Hankaku.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"84-38L2Nd1mYC+ZeK4/5yaVoC5RKmo\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 132,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Hankaku.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Hiragana.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"7c-EOeg8gzeiGWh3TCGqJ8uluMw0aY\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 124,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Hiragana.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKdla-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a5e-V7oCz0OOuojSBxvZnRvrgWtDi54\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2654,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKdla-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKdla-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"94-A15AZFWd1WzrDwbDrBwudmrv/mI\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 148,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKdla-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKdlb-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"96e-K+d+pPTNijOP9wB9MUdzWC9WXvo\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2414,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKdlb-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKdlb-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"94-PceRADBPguxVm3DRIBAPbr5qtcA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 148,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKdlb-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKgccs-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"8f4-26oQJiIjcPpuMnXJjjvbXvPTdwk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2292,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKgccs-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKgccs-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"95-byJ4SZDrFovPkZLn423hjgiSffs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 149,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKgccs-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKm314-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"6ec-y/tlqwyuaQ52eaF2neUh6iD7ZgI\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1772,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKm314-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKm314-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"95-PvX3416//mjeqOp1fNzqxbgVE3I\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 149,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKm314-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKm471-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"87b-p18uMuVJXUbhSx0HrBJLP8Z17xo\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2171,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKm471-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKm471-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"95-Km8sxNEF9GRDIYfa7/e4EEDAk+Q\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 149,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKm471-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKscs-B5-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1155-RfF5Pncd4DCviZOO7SP/9Mfayjo\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 4437,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKscs-B5-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/HKscs-B5-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9f-+ls6Hws6tr1hT4o5yauAsgParfU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 159,
    "path": "../public/dearflip/dflip/js/libs/cmaps/HKscs-B5-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Katakana.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"64-2hAK0A8qm6GWiSv7TWZE7IKKT88\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 100,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Katakana.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"738-vDSTZ7tgsGr1/e7sBQR/WWrHGrM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1848,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a4-RSndrHjJMdY0EbYGGwr3QLTETKU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 164,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"727-QuFfvOcL3sT3u1ssvQKw79i8Zfw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 1831,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-Johab-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"4197-NYWszG5pV+2lUwI5P9nDpWPbbLs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 16791,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-Johab-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-Johab-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a6-5ot3Cze1kYhMRZ1s47tDvEVWVHs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 166,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-Johab-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a0-IrCX/TdsIeQKD5OSlhvnSswxY0M\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 160,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCms-UHC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ae3-Tg7QF6KkHue/bqzw9+a0CuYNIj0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2787,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCms-UHC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCms-UHC-HW-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ae5-1BA0Gxmm8F4MIOpKGncHijCEBE4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2789,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCms-UHC-HW-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCms-UHC-HW-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a9-bP6zb0knAq71zlt2cTQikQELKeE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 169,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCms-UHC-HW-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCms-UHC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a6-PefFxwzxcv9WCmLV3+hKkza09a0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 166,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCms-UHC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCpc-EUC-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"7e8-NwX9NiERen5aN3LDhJxdaWIO8I8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2024,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCpc-EUC-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/KSCpc-EUC-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a6-HToRkyxEpfqPoi79K9Pbp9uaLI4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 166,
    "path": "../public/dearflip/dflip/js/libs/cmaps/KSCpc-EUC-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/LICENSE": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"820-GvtZkfzg1gEQtQkraL+f92sMc/Y\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2080,
    "path": "../public/dearflip/dflip/js/libs/cmaps/LICENSE"
  },
  "/dearflip/dflip/js/libs/cmaps/NWP-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"acd-fQ9RxS16lr8onQxkVNfp3M8AnBU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 2765,
    "path": "../public/dearflip/dflip/js/libs/cmaps/NWP-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/NWP-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"fc-iRqGbFK0bnUmEjeZqCnbJKxs2k8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 252,
    "path": "../public/dearflip/dflip/js/libs/cmaps/NWP-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/RKSJ-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"216-pPfVzdE9MAjMQtgvaWctnlCp1bM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 534,
    "path": "../public/dearflip/dflip/js/libs/cmaps/RKSJ-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/RKSJ-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"aa-Fq5CpG5+uSygSP4kZJtmjFEDtLI\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 170,
    "path": "../public/dearflip/dflip/js/libs/cmaps/RKSJ-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/Roman.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"60-V1V4HH6cUMyBkkJthzOlBjgrX90\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 96,
    "path": "../public/dearflip/dflip/js/libs/cmaps/Roman.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UCS2-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"bc98-fyiblMZDt8xD1JNgeBQ6I0fKD8E\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 48280,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UCS2-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UCS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9c-axns5ckhUWQx65TSjXQID919Nbw\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 156,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UCS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF16-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"c4f3-1z1VOIx2kyAzkVzqYnu2KO2tT2Y\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 50419,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF16-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF16-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9c-D3FS8oRcwr5NPOfg4VMGOexBYuM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 156,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF16-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"cdc7-pYcoZOKxIcHfUGilQgHtFmxp1fE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 52679,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a0-3rqpisrxPzQaUAOFbvamp9+PbhQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 160,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF8-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"d17d-c0rRoAAz1wwZXIE1i2Q8fLoTJ7I\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 53629,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF8-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniCNS-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9d-AZvQcWsqqAvBvKv9OJ09XhBluo4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 157,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniCNS-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UCS2-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a966-hoI440y5VIxNE4rxrcGkvqYt7Dc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 43366,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UCS2-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UCS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"c1-9YU8qDwluIjB2SXiog70TgZNBk4\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 193,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UCS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF16-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"ac36-KJY4Zt+1dbWLQ3DmDr2b+25WrAk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 44086,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF16-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF16-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b2-F3E3bu+XmtQsK1wBoa8dNPVFgLc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 178,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF16-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b2aa-ueonjrTDJNEqgeLWJHlUjR5xJss\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 45738,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b6-gWe6UDqopsgF85vgylOLmYmKln0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 182,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF8-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b6f5-Ccx3UPadp3Q0CT5MlCETlPVmXto\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 46837,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF8-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniGB-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b5-4jYW+hITLHP1IHG5bnbYdkMOzs8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 181,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniGB-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"635f-yvUlEl4p+k3ngIjl6xeFwa8fmVA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 25439,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-HW-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"77-l8u4WZz2KRSIWosrR1lIZf/1IJk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 119,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-HW-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-HW-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2a8-82utnGgPS7psvPisV/U+fOIcgGs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 680,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-HW-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"298-RTlldqa9VGioTiwuSuZMI/5/LoU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 664,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UCS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF16-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9a13-Fkmek/CkR6lOHkS/qZUUAdKQ2J0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 39443,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF16-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF16-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"283-REArj3PgsBYIRrZB58sudauMgb0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 643,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF16-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9e5b-vEghFNIU4v/+hd0LdCL0jD4oLBc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 40539,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2a5-L17CWE/Xw59FUWGoV1UPp/6l9To\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 677,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF8-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a2df-9HlWwcey6tvak6rCX+RUa0E+wKU\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 41695,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF8-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2a6-s+qNIXKi9vnnPPYq5GeqhISN9tc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 678,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF16-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9a6e-uLDMZ3nTlgQmiZ/C588oZv/IAWc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 39534,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF16-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF16-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"287-KHLLJz2rnQ27fzMYJgRd8Ydkp7A\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 647,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF16-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9eb6-9IcjIS0a0YwLPEEWjW9jB5jgQWA\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 40630,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2a9-7xbMsxAvxEwdRvTK1Az72wIO4nc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 681,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF8-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a333-OFq3YtA0mdNVOQSBdpKOAx5TQNE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 41779,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF8-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2aa-VlVgpZ1RdKw3mo2R8WXI7N71TgY\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 682,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJIS2004-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISPro-UCS2-HW-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2c1-Pwo2QkZxdwfbgpE1kzBMt703w3g\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 705,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISPro-UCS2-HW-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISPro-UCS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2b1-saRzBfp5r6GatpbTOvUJnTVXDFY\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 689,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISPro-UCS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISPro-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2d6-7WtXGu7TiNO1O55lgkrz8BRqWFc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 726,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISPro-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISX0213-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9e45-FclTw2Q20y90jsdGipXD5YQ9cLs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 40517,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISX0213-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISX0213-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2ac-374+KVUFl3tOGIHvMLgDYtdAa7w\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 684,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISX0213-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISX02132004-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"9ea0-xB3VDfAePTMx8KzbbabBuFemfPc\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 40608,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISX02132004-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniJISX02132004-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2b0-nEigxlSs9Lz1He/eL32LPOUqBj0\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 688,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniJISX02132004-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UCS2-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"64b7-UPzOGy4yJHkbSAKJ58TEKTi+uFQ\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 25783,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UCS2-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UCS2-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b2-Z0Oz4HNw/UmWK5fZe+d9ro0Yqrs\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 178,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UCS2-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF16-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"66d7-T0YDQIlm2awpqWw6Z1W58j56qVM\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 26327,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF16-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF16-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a4-z9v78LDo75j+9iNupXDHNGXaFYE\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 164,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF16-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF32-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"6753-aw6Y4WQY+lqGM4s/s2HxcAlx9kk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 26451,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF32-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF32-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a8-c700OxiKgEcesVZlX1sZKQP4bL8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 168,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF32-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF8-H.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"6c8e-gRfTHkmKjw+3wiPEFyuogcBJbG8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 27790,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF8-H.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/UniKS-UTF8-V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a9-WGxklIpn5MsS3mTiIbDcPZ5H3t8\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 169,
    "path": "../public/dearflip/dflip/js/libs/cmaps/UniKS-UTF8-V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/V.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"a6-mXkPEsohoZa8HYNq5b8K16+V4Hk\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 166,
    "path": "../public/dearflip/dflip/js/libs/cmaps/V.bcmap"
  },
  "/dearflip/dflip/js/libs/cmaps/WP-Symbol.bcmap": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b3-OmQXq61GChoIO+dWNsAU86c5N7U\"",
    "mtime": "2024-10-01T03:28:00.000Z",
    "size": 179,
    "path": "../public/dearflip/dflip/js/libs/cmaps/WP-Symbol.bcmap"
  },
  "/assets/images/about-us/video/logos/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2024-11-06T08:15:39.618Z",
    "size": 6148,
    "path": "../public/assets/images/about-us/video/logos/.DS_Store"
  },
  "/assets/images/about-us/video/logos/broaster.jpg": {
    "type": "image/jpeg",
    "etag": "\"89c7-29XdKRacqB43LV2mGLfM6F22/WQ\"",
    "mtime": "2024-11-06T08:15:39.623Z",
    "size": 35271,
    "path": "../public/assets/images/about-us/video/logos/broaster.jpg"
  },
  "/assets/images/about-us/video/logos/Dr. Coffee.jpg": {
    "type": "image/jpeg",
    "etag": "\"abb4-joM5EL8h102nbJK/f8LMly09q+4\"",
    "mtime": "2024-11-06T08:15:39.618Z",
    "size": 43956,
    "path": "../public/assets/images/about-us/video/logos/Dr. Coffee.jpg"
  },
  "/assets/images/about-us/video/logos/EGRO.jpg": {
    "type": "image/jpeg",
    "etag": "\"95bf-ezHXkzbrCmU7pi+aF+lJZluYG00\"",
    "mtime": "2024-11-06T08:15:39.619Z",
    "size": 38335,
    "path": "../public/assets/images/about-us/video/logos/EGRO.jpg"
  },
  "/assets/images/about-us/video/logos/Electrolux.jpg": {
    "type": "image/jpeg",
    "etag": "\"9ecb-E4ugoxtPIg2jsTDU4NfDb3Qid/s\"",
    "mtime": "2024-11-06T08:15:39.620Z",
    "size": 40651,
    "path": "../public/assets/images/about-us/video/logos/Electrolux.jpg"
  },
  "/assets/images/about-us/video/logos/f4e.jpg": {
    "type": "image/jpeg",
    "etag": "\"d01b-GpXi9twkGy0f0NHYnl7XsJUqY4I\"",
    "mtime": "2024-11-06T08:15:39.624Z",
    "size": 53275,
    "path": "../public/assets/images/about-us/video/logos/f4e.jpg"
  },
  "/assets/images/about-us/video/logos/FAGOR.jpg": {
    "type": "image/jpeg",
    "etag": "\"8dd8-cFGyLIMmNQnQdigmSqBP+19uV60\"",
    "mtime": "2024-11-06T08:15:39.620Z",
    "size": 36312,
    "path": "../public/assets/images/about-us/video/logos/FAGOR.jpg"
  },
  "/assets/images/about-us/video/logos/mambo_safi_.jpg": {
    "type": "image/jpeg",
    "etag": "\"61bf-+0LDYikra7wUAPbVzOIBmNiWx4A\"",
    "mtime": "2024-11-06T08:15:39.624Z",
    "size": 25023,
    "path": "../public/assets/images/about-us/video/logos/mambo_safi_.jpg"
  },
  "/assets/images/about-us/video/logos/Prisma Food.jpg": {
    "type": "image/jpeg",
    "etag": "\"b880-iHAG4MMkpEsBsf8bnsQk0KZZq88\"",
    "mtime": "2024-11-06T08:15:39.621Z",
    "size": 47232,
    "path": "../public/assets/images/about-us/video/logos/Prisma Food.jpg"
  },
  "/assets/images/about-us/video/logos/rational.png": {
    "type": "image/png",
    "etag": "\"44b3-EnQqjogISBs1IRyvsqollIRjpL4\"",
    "mtime": "2024-11-06T08:15:39.624Z",
    "size": 17587,
    "path": "../public/assets/images/about-us/video/logos/rational.png"
  },
  "/assets/images/about-us/video/logos/Santos.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e08-WfCjub+05+X6M8YPh+mBSo+saJY\"",
    "mtime": "2024-11-06T08:15:39.621Z",
    "size": 40456,
    "path": "../public/assets/images/about-us/video/logos/Santos.jpg"
  },
  "/assets/images/about-us/video/logos/sheffield.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad6d-eAeJnuKrv3k/uYe6Oojg6N4XulE\"",
    "mtime": "2024-11-06T08:15:39.625Z",
    "size": 44397,
    "path": "../public/assets/images/about-us/video/logos/sheffield.jpg"
  },
  "/assets/images/about-us/video/logos/Skymsen.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b87-4/eFilU402f+XWmcUA1Ys+WRMxU\"",
    "mtime": "2024-11-06T08:15:39.622Z",
    "size": 39815,
    "path": "../public/assets/images/about-us/video/logos/Skymsen.jpg"
  },
  "/assets/images/about-us/video/logos/TASKI.jpg": {
    "type": "image/jpeg",
    "etag": "\"98b1-pp2WA55kYiwj7FKruSH8Zv+08K0\"",
    "mtime": "2024-11-06T08:15:39.622Z",
    "size": 39089,
    "path": "../public/assets/images/about-us/video/logos/TASKI.jpg"
  },
  "/assets/images/about-us/video/logos/Tecnodom.jpg": {
    "type": "image/jpeg",
    "etag": "\"c10d-4ONqV3YOvAwsV0hlZAmT5bQdh5Y\"",
    "mtime": "2024-11-06T08:15:39.623Z",
    "size": 49421,
    "path": "../public/assets/images/about-us/video/logos/Tecnodom.jpg"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/css/line-awesome.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d87-eCaPM/FmVGWChIm8uZ1PO2uJqtQ\"",
    "mtime": "2024-12-02T12:49:20.840Z",
    "size": 28039,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/css/line-awesome.min.css"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1b914-G9d+8edugZExohZh++gMCyR94OY\"",
    "mtime": "2024-12-02T12:49:20.841Z",
    "size": 112916,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.eot"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.eot_v=1.1": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1b914-G9d+8edugZExohZh++gMCyR94OY\"",
    "mtime": "2024-12-02T12:49:20.842Z",
    "size": 112916,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.eot_v=1.1"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.svg": {
    "type": "image/svg+xml",
    "etag": "\"69e1f-Q0ZM1LGVwPY3XPiCIiqx3VySDLU\"",
    "mtime": "2024-12-02T12:49:20.843Z",
    "size": 433695,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.svg"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.ttf": {
    "type": "font/ttf",
    "etag": "\"1b858-X08ly4NuPstF997C9kO6zTbj+Jo\"",
    "mtime": "2024-12-02T12:49:20.844Z",
    "size": 112728,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.ttf"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff": {
    "type": "font/woff",
    "etag": "\"e05c-c7z90j5zYXp+qutmvc2YrWuQFWI\"",
    "mtime": "2024-12-02T12:49:20.845Z",
    "size": 57436,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff2": {
    "type": "font/woff2",
    "etag": "\"b034-Q0S/f9srXlOPtIWd+UX8GiHSqDw\"",
    "mtime": "2024-12-02T12:49:20.846Z",
    "size": 45108,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff2"
  },
  "/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff2_v=1.1": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"b034-Q0S/f9srXlOPtIWd+UX8GiHSqDw\"",
    "mtime": "2024-12-02T12:49:20.847Z",
    "size": 45108,
    "path": "../public/assets/vendor/line-awesome/line-awesome/line-awesome/fonts/line-awesome.woff2_v=1.1"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve$1 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/backend/":{"maxAge":0},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _41UR4a = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function useNitroOrigin(e) {
  const cert = process.env.NITRO_SSL_CERT;
  const key = process.env.NITRO_SSL_KEY;
  let host = process.env.NITRO_HOST || process.env.HOST || false;
  let port = false;
  let protocol = cert && key || !false ? "https" : "http";
  if (e) {
    host = getRequestHost(e, { xForwardedHost: true }) || host;
    protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
  }
  if (typeof host === "string" && host.includes(":")) {
    port = host.split(":").pop();
    host = host.split(":")[0];
  }
  port = port ? `:${port}` : "";
  return withTrailingSlash(`${protocol}://${host}${port}`);
}

const _auaJVH = defineEventHandler(async (e) => {
  if (e.context.siteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = useNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: -4,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: 0,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    // @ts-expect-error untyped
    ...envSiteConfig(globalThis._importMeta_.env)
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
});

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

createConsola({
  defaults: {
    tag: "@nuxt/sitemap"
  }
});
const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key) {
  const res = {};
  arr.forEach((item) => {
    const k = item[key];
    res[k] = merger(item, res[k] || {});
  });
  return Object.values(res);
}
function splitForLocales(path, locales) {
  const prefix = withLeadingSlash(path).split("/")[1];
  if (locales.includes(prefix))
    return [prefix, path.replace(`/${prefix}`, "")];
  return [null, path];
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}) {
  const urlFilter = createFilter(options);
  return (loc) => {
    let path = loc;
    try {
      path = parseURL(loc).pathname;
    } catch {
      return false;
    }
    return urlFilter(path);
  };
}
function createFilter(options = {}) {
  const include = options.include || [];
  const exclude = options.exclude || [];
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  return function(path) {
    for (const v of [{ rules: exclude, result: false }, { rules: include, result: true }]) {
      const regexRules = v.rules.filter((r) => r instanceof RegExp);
      if (regexRules.some((r) => r.test(path)))
        return v.result;
      const stringRules = v.rules.filter((r) => typeof r === "string");
      if (stringRules.length > 0) {
        const routes = {};
        for (const r of stringRules) {
          if (r === path)
            return v.result;
          routes[r] = true;
        }
        const routeRulesMatcher = toRouteMatcher(createRouter$1({ routes, strictTrailingSlash: false }));
        if (routeRulesMatcher.matchAll(path).length > 0)
          return Boolean(v.result);
      }
    }
    return include.length === 0;
  };
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "1e710d68-faa5-4201-bb48-cbc1f7bd970d",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/kitchen": {
        "redirect": {
          "to": "commercial-kitchen",
          "statusCode": 307
        }
      },
      "/kitchen/**": {
        "redirect": {
          "to": "/commercial-kitchen/**",
          "statusCode": 307,
          "_redirectStripBase": "/kitchen"
        }
      },
      "/sitemap.xsl": {
        "headers": {
          "Content-Type": "application/xslt+xml"
        }
      },
      "/sitemap.xml": {
        "swr": 600,
        "cache": {
          "swr": true,
          "maxAge": 600,
          "varies": [
            "X-Forwarded-Host",
            "X-Forwarded-Proto",
            "Host"
          ]
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "API_URL": "https://sheffieldafrica.com",
    "PUBLIC_URL": "https://dev.sheffieldafrica.com",
    "piniaPluginPersistedstate": {}
  },
  "API_URL": "https://sheffieldafrica.com",
  "sitemap": {
    "isI18nMapped": false,
    "sitemapName": "sitemap.xml",
    "isMultiSitemap": false,
    "excludeAppSources": [],
    "cacheMaxAgeSeconds": 600,
    "autoLastmod": false,
    "defaultSitemapsChunkSize": 1000,
    "minify": false,
    "sortEntries": true,
    "debug": false,
    "discoverImages": true,
    "discoverVideos": true,
    "sitemapsPathPrefix": "/__sitemap__/",
    "isNuxtContentDocumentDriven": false,
    "xsl": "/__sitemap__/style.xsl",
    "xslTips": true,
    "xslColumns": [
      {
        "label": "URL",
        "width": "50%"
      },
      {
        "label": "Images",
        "width": "25%",
        "select": "count(image:image)"
      },
      {
        "label": "Last Updated",
        "width": "25%",
        "select": "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"
      }
    ],
    "credits": true,
    "version": "7.0.0",
    "sitemaps": {
      "sitemap.xml": {
        "sitemapName": "sitemap.xml",
        "route": "sitemap.xml",
        "defaults": {},
        "include": [],
        "exclude": [
          "/_nuxt/**",
          "/_**"
        ],
        "includeAppSources": true
      }
    }
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "name": "sheffield-application",
        "env": "production"
      },
      {
        "_context": "package.json",
        "_priority": -10,
        "name": "nuxt-app"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "https://dev.sheffieldafrica.com"
      }
    ],
    "version": "3.0.6",
    "debug": false
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function defineNitroPlugin(def) {
  return def;
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === "undefined") {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$2(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$2(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\john.muinde\\Documents\\sheffield-application\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  return !!(lastSegment || path).match(/\.[0-9a-z]+$/i)?.[0];
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = useSiteConfig(e);
  const nitroOrigin = useNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}

function useSimpleSitemapRuntimeConfig(e) {
  const clone = JSON.parse(JSON.stringify(useRuntimeConfig(e).sitemap));
  for (const k in clone.sitemaps) {
    const sitemap = clone.sitemaps[k];
    sitemap.include = normalizeRuntimeFilters(sitemap.include);
    sitemap.exclude = normalizeRuntimeFilters(sitemap.exclude);
    clone.sitemaps[k] = sitemap;
  }
  return Object.freeze(clone);
}

const _1x5m7f = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSimpleSitemapRuntimeConfig();
  setHeader(e, "Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  const { name: siteName, url: siteUrl } = useSiteConfig(e);
  const referrer = getHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  const canonicalQuery = getQuery$1(referrer).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const conditionalTips = [
    'You are looking at a <a href="https://developer.mozilla.org/en-US/docs/Web/XSLT/Transforming_XML_with_XSLT/An_Overview" style="color: #398465" target="_blank">XML stylesheet</a>. Read the <a href="https://nuxtseo.com/sitemap/guides/customising-ui" style="color: #398465" target="_blank">docs</a> to learn how to customize it. View the page source to see the raw XML.',
    `URLs missing? Check Nuxt Devtools Sitemap tab (or the <a href="${withQuery("/__sitemap__/debug.json", { sitemap: sitemapName })}" style="color: #398465" target="_blank">debug endpoint</a>).`
  ];
  if (!isShowingCanonical) {
    const canonicalPreviewUrl = withQuery(referrer, { canonical: "" });
    conditionalTips.push(`Your canonical site URL is <strong>${siteUrl}</strong>.`);
    conditionalTips.push(`You can preview your canonical sitemap by visiting <a href="${canonicalPreviewUrl}" style="color: #398465; white-space: nowrap;">${fixPath(canonicalPreviewUrl)}?canonical</a>`);
  } else {
    conditionalTips.push(`You are viewing the canonical sitemap. You can switch to using the request origin: <a href="${fixPath(referrer)}" style="color: #398465; white-space: nowrap ">${fixPath(referrer)}</a>`);
  }
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          body {
            font-family: Inter, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333;
          }

          table {
            border: none;
            border-collapse: collapse;
          }

          .bg-yellow-200 {
            background-color: #fef9c3;
          }

          .p-5 {
            padding: 1.25rem;
          }

          .rounded {
            border-radius: 4px;
            }

          .shadow {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          #sitemap tr:nth-child(odd) td {
            background-color: #f8f8f8 !important;
          }

          #sitemap tbody tr:hover td {
            background-color: #fff;
          }

          #sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
            color: #000;
          }

          .expl a {
            color: #398465
            font-weight: 600;
          }

          .expl a:visited {
            color: #398465
          }

          a {
            color: #000;
            text-decoration: none;
          }

          a:visited {
            color: #777;
          }

          a:hover {
            text-decoration: underline;
          }

          td {
            font-size: 12px;
          }

          .text-2xl {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.25;
          }

          th {
            text-align: left;
            padding-right: 30px;
            font-size: 12px;
          }

          thead th {
            border-bottom: 1px solid #000;
          }
          .fixed { position: fixed; }
          .right-2 { right: 2rem; }
          .top-2 { top: 2rem; }
          .w-30 { width: 30rem; }
          p { margin: 0; }
          li { padding-bottom: 0.5rem; line-height: 1.5; }
          h1 { margin: 0; }
          .mb-5 { margin-bottom: 1.25rem; }
          .mb-3 { margin-bottom: 0.75rem; }
        </style>
      </head>
      <body>
        <div style="grid-template-columns: 1fr 1fr; display: grid; margin: 3rem;">
            <div>
             <div id="content">
          <h1 class="text-2xl mb-3">XML Sitemap</h1>
          <h2>${title}</h2>
          ${isNotIndexButHasIndex ? `<p style="font-size: 12px; margin-bottom: 1rem;"><a href="${fixPath("/sitemap_index.xml")}">${fixPath("/sitemap_index.xml")}</a></p>` : ""}
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap Index file contains
              <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  <th width="75%">Sitemap</th>
                  <th width="25%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <xsl:variable name="sitemapURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <tr>
                    <td>
                      <a href="{$sitemapURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of
                        select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <p class="expl" style="margin-bottom: 1rem;">
              This XML Sitemap contains
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
            </p>
            <table id="sitemap" cellpadding="3">
              <thead>
                <tr>
                  ${columns.map((c) => `<th width="${c.width}">${c.label}</th>`).join("\n")}
                </tr>
              </thead>
              <tbody>
                <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    ${columns.filter((c) => c.label !== "URL").map((c) => `<td>
<xsl:value-of select="${c.select}"/>
</td>`).join("\n")}
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
        </div>
        </div>
                    ${""}
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter$1({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [path === "/" ? path : withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    const pathWithoutQuery = withoutQuery(path);
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(pathWithoutQuery === "/" ? pathWithoutQuery : withoutTrailingSlash(pathWithoutQuery), app.baseURL)
    ).reverse());
  };
}

function resolve(s, resolvers) {
  if (typeof s === "undefined" || !resolvers)
    return s;
  s = typeof s === "string" ? s : s.toString();
  if (hasProtocol(s, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(s);
  return resolvers.canonicalUrlResolver(s);
}
function removeTrailingSlash(s) {
  return s.replace(/\/(\?|#|$)/, "$1");
}
function preNormalizeEntry(_e, resolvers) {
  const e = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (e.url && !e.loc) {
    e.loc = e.url;
    delete e.url;
  }
  if (typeof e.loc !== "string") {
    e.loc = "";
  }
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch (e2) {
    e2._path = null;
  }
  if (e._path) {
    const query = parseQuery(e._path.search);
    const qs = stringifyQuery(query);
    e._relativeLoc = `${encodePath(e._path?.pathname)}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function normaliseEntry(_e, defaults, resolvers) {
  const e = defu(_e, defaults);
  if (e.lastmod) {
    const date = normaliseDate(e.lastmod);
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    e.alternatives = mergeOnKey(e.alternatives.map((e2) => {
      const a = { ...e2 };
      if (typeof a.href === "string")
        a.href = resolve(a.href, resolvers);
      else if (typeof a.href === "object" && a.href)
        a.href = resolve(a.href.href, resolvers);
      return a;
    }), "hreflang");
  }
  if (e.images) {
    e.images = mergeOnKey(e.images.map((i) => {
      i = { ...i };
      i.loc = resolve(i.loc, resolvers);
      return i;
    }), "loc");
  }
  if (e.videos) {
    e.videos = e.videos.map((v) => {
      v = { ...v };
      if (v.content_loc)
        v.content_loc = resolve(v.content_loc, resolvers);
      return v;
    });
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function normaliseDate(d) {
  if (typeof d === "string") {
    if (d.includes("T")) {
      const t = d.split("T")[1];
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  context.tips = context.tips || [];
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const start = Date.now();
  const timeout = options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  let isHtmlResponse = false;
  try {
    const fetchContainer = url.startsWith("/") && event ? event : globalThis;
    const urls = await fetchContainer.$fetch(url, {
      ...options,
      responseType: "json",
      signal: timeoutController.signal,
      headers: defu(options?.headers, {
        Accept: "application/json"
      }, event ? { Host: getRequestHost(event, { xForwardedHost: true }) } : {}),
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isHtmlResponse = true;
      }
    });
    const timeTakenMs = Date.now() - start;
    if (isHtmlResponse) {
      context.tips.push("This is usually because the URL isn't correct or is throwing an error. Please check the URL");
      return {
        ...input,
        context,
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON"
      };
    }
    return {
      ...input,
      context,
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (error.message.includes("This operation was aborted"))
      context.tips.push("The request has taken too long. Make sure app sources respond within 5 seconds or adjust the timeout fetch option.");
    else
      context.tips.push(`Response returned a status of ${error.response?.status || "unknown"}.`);
    console.error("[@nuxtjs/sitemap] Failed to fetch source.", { url, error });
    return {
      ...input,
      context,
      urls: [],
      error: error.message
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
function globalSitemapSources() {
  return import('../virtual/global-sources.mjs').then((m) => m.sources);
}
function childSitemapSources(definition) {
  return definition?._hasSourceChunk ? import('../virtual/child-sources.mjs').then((m) => m.sources[definition.sitemapName] || []) : Promise.resolve([]);
}
async function resolveSitemapSources(sources, event) {
  return (await Promise.all(
    sources.map((source) => {
      if (typeof source === "object" && "urls" in source) {
        return {
          timeTakenMs: 0,
          ...source,
          urls: source.urls
        };
      }
      if (source.fetch)
        return fetchDataSource(source, event);
      return {
        ...source,
        error: "Invalid source"
      };
    })
  )).flat();
}

function sortSitemapUrls(urls) {
  return urls.sort(
    (a, b) => {
      const aLoc = typeof a === "string" ? a : a.loc;
      const bLoc = typeof b === "string" ? b : b.loc;
      return aLoc.localeCompare(bLoc, void 0, { numeric: true });
    }
  ).sort((a, b) => {
    const aLoc = (typeof a === "string" ? a : a.loc) || "";
    const bLoc = (typeof b === "string" ? b : b.loc) || "";
    const aSegments = aLoc.split("/").length;
    const bSegments = bLoc.split("/").length;
    if (aSegments > bSegments)
      return 1;
    if (aSegments < bSegments)
      return -1;
    return 0;
  });
}

function resolveKey(k) {
  switch (k) {
    case "images":
      return "image";
    case "videos":
      return "video";
    // news & others?
    case "news":
      return "news";
    default:
      return k;
  }
}
function handleObject(key, obj) {
  return [
    `        <${key}:${key}>`,
    ...Object.entries(obj).map(([sk, sv]) => {
      if (key === "video" && Array.isArray(sv)) {
        return sv.map((v) => {
          if (typeof v === "string") {
            return [
              `            `,
              `<${key}:${sk}>`,
              escapeValueForXml(v),
              `</${key}:${sk}>`
            ].join("");
          }
          const attributes = Object.entries(v).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            v[sk],
            `</${key}:${sk}>`
          ].join("");
        }).join("\n");
      }
      if (typeof sv === "object") {
        if (key === "video") {
          const attributes = Object.entries(sv).filter(([ssk]) => ssk !== sk).map(([ssk, ssv]) => `${ssk}="${escapeValueForXml(ssv)}"`).join(" ");
          return [
            `            <${key}:${sk} ${attributes}>`,
            // value is the same sk
            sv[sk],
            `</${key}:${sk}>`
          ].join("");
        }
        return [
          `            <${key}:${sk}>`,
          ...Object.entries(sv).map(([ssk, ssv]) => `                <${key}:${ssk}>${escapeValueForXml(ssv)}</${key}:${ssk}>`),
          `            </${key}:${sk}>`
        ].join("\n");
      }
      return `            <${key}:${sk}>${escapeValueForXml(sv)}</${key}:${sk}>`;
    }),
    `        </${key}:${key}>`
  ].join("\n");
}
function handleArray(key, arr) {
  if (arr.length === 0)
    return false;
  key = resolveKey(key);
  if (key === "alternatives") {
    return arr.map((obj) => [
      `        <xhtml:link rel="alternate" ${Object.entries(obj).map(([sk, sv]) => `${sk}="${escapeValueForXml(sv)}"`).join(" ")} />`
    ].join("\n")).join("\n");
  }
  return arr.map((obj) => handleObject(key, obj)).join("\n");
}
function handleEntry(k, e) {
  return Array.isArray(e[k]) ? handleArray(k, e[k]) : typeof e[k] === "object" ? handleObject(k, e[k]) : `        <${k}>${escapeValueForXml(e[k])}</${k}>`;
}
function wrapSitemapXml(input, resolvers, options) {
  const xsl = options.xsl ? resolvers.relativeBaseUrlResolver(options.xsl) : false;
  const credits = options.credits;
  input.unshift(`<?xml version="1.0" encoding="UTF-8"?>${xsl ? `<?xml-stylesheet type="text/xsl" href="${xsl}"?>` : ""}`);
  if (credits)
    input.push(`<!-- XML Sitemap generated by @nuxtjs/sitemap v${options.version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`);
  if (options.minify)
    return input.join("").replace(/(?<!<[^>]*)\s(?![^<]*>)/g, "");
  return input.join("\n");
}
function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function resolveSitemapEntries(sitemap, sources, runtimeConfig, resolvers) {
  const {
    autoI18n,
    isI18nMapped
  } = runtimeConfig;
  const filterPath = createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  });
  const _urls = sources.flatMap((e) => e.urls).map((_e) => {
    const e = preNormalizeEntry(_e, resolvers);
    if (!e.loc || !filterPath(e.loc))
      return false;
    return e;
  }).filter(Boolean);
  let validI18nUrlsForTransform = [];
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = autoI18n.locales.map((l) => l.code);
    validI18nUrlsForTransform = _urls.map((_e, i) => {
      if (_e._abs)
        return false;
      const split = splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = autoI18n.defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = autoI18n.locales.find((l) => l.code === localeCode);
      if (!locale)
        return false;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path.search}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      return e;
    }).filter(Boolean);
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = withoutPrefixPaths[e._pathWithoutPrefix].map((u) => {
          const entries = [];
          if (u._locale.code === autoI18n.defaultLocale) {
            entries.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          entries.push({
            href: u.loc,
            hreflang: u._locale._hreflang || autoI18n.defaultLocale
          });
          return entries;
        }).flat().filter(Boolean);
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        if (autoI18n.strategy === "no_prefix") ;
        if (autoI18n.differentDomains) {
          e.alternatives = [
            {
              // apply default locale domain
              ...autoI18n.locales.find((l) => [l.code, l.language].includes(autoI18n.defaultLocale)),
              code: "x-default"
            },
            ...autoI18n.locales.filter((l) => !!l.domain)
          ].map((locale) => {
            return {
              hreflang: locale._hreflang,
              href: joinURL(withHttps(locale.domain), e._pathWithoutPrefix)
            };
          });
        } else {
          for (const l of autoI18n.locales) {
            let loc = joinURL(`/${l.code}`, e._pathWithoutPrefix);
            if (autoI18n.differentDomains || ["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy) && l.code === autoI18n.defaultLocale)
              loc = e._pathWithoutPrefix;
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...e,
              _index: void 0,
              _key: `${_sitemap || ""}${loc || "/"}${e._path.search}`,
              _locale: l,
              loc,
              alternatives: [{ code: "x-default", _hreflang: "x-default" }, ...autoI18n.locales].map((locale) => {
                const code = locale.code === "x-default" ? autoI18n.defaultLocale : locale.code;
                const isDefault = locale.code === "x-default" || locale.code === autoI18n.defaultLocale;
                let href = "";
                if (autoI18n.strategy === "prefix") {
                  href = joinURL("/", code, e._pathWithoutPrefix);
                } else if (["prefix_and_default", "prefix_except_default"].includes(autoI18n.strategy)) {
                  if (isDefault) {
                    href = e._pathWithoutPrefix;
                  } else {
                    href = joinURL("/", code, e._pathWithoutPrefix);
                  }
                }
                if (!filterPath(href))
                  return false;
                return {
                  hreflang: locale._hreflang,
                  href
                };
              }).filter(Boolean)
            }, resolvers);
            if (e._locale.code === newEntry._locale.code) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path.search}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls;
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig) {
  const {
    sitemaps,
    // enhancing
    autoI18n,
    isI18nMapped,
    isMultiSitemap,
    // sorting
    sortEntries,
    // chunking
    defaultSitemapsChunkSize
  } = runtimeConfig;
  const isChunking = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemap.sitemapName));
  function maybeSort(urls) {
    return sortEntries ? sortSitemapUrls(urls) : urls;
  }
  function maybeSlice(urls) {
    if (isChunking && defaultSitemapsChunkSize) {
      const chunk = Number(sitemap.sitemapName);
      return urls.slice(chunk * defaultSitemapsChunkSize, (chunk + 1) * defaultSitemapsChunkSize);
    }
    return urls;
  }
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => [e.language, e.code].includes(sitemap.sitemapName))?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath$1(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  const sources = sitemap.includeAppSources ? await globalSitemapSources() : [];
  sources.push(...await childSitemapSources(sitemap));
  const resolvedSources = await resolveSitemapSources(sources, resolvers.event);
  const enhancedUrls = resolveSitemapEntries(sitemap, resolvedSources, { autoI18n, isI18nMapped }, resolvers);
  const filteredUrls = enhancedUrls.filter((e) => {
    if (isMultiSitemap && e._sitemap && sitemap.sitemapName)
      return e._sitemap === sitemap.sitemapName;
    return true;
  });
  const sortedUrls = maybeSort(filteredUrls);
  return maybeSlice(sortedUrls);
}
function urlsToXml(urls, resolvers, { version, xsl, credits, minify }) {
  const urlset = urls.map((e) => {
    const keys = Object.keys(e).filter((k) => !k.startsWith("_"));
    return [
      "    <url>",
      keys.map((k) => handleEntry(k, e)).filter(Boolean).join("\n"),
      "    </url>"
    ].join("\n");
  });
  return wrapSitemapXml([
    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset.join("\n"),
    "</urlset>"
  ], resolvers, { version, xsl, credits, minify });
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = useSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes$1(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || !false,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function createSitemap(event, definition, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const resolvers = useNitroUrlResolvers(event);
  let sitemapUrls = await buildSitemapUrls(definition, resolvers, runtimeConfig);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const { autoI18n } = runtimeConfig;
  sitemapUrls = sitemapUrls.map((u) => {
    const path = u._path?.pathname || u.loc;
    let routeRules = routeRuleMatcher(path);
    if (autoI18n?.locales && autoI18n?.strategy !== "no_prefix") {
      const match = splitForLocales(path, autoI18n.locales.map((l) => l.code));
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      return false;
    if (typeof routeRules.robots !== "undefined" && !routeRules.robots) {
      return false;
    }
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      return false;
    return routeRules.sitemap ? defu(u, routeRules.sitemap) : u;
  }).filter(Boolean);
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortSitemapUrls(urls2) : urls2;
  const normalizedPreDedupe = resolvedCtx.urls.map((e) => normaliseEntry(e, definition.defaults, resolvers));
  const urls = maybeSort(mergeOnKey(normalizedPreDedupe, "_key").map((e) => normaliseEntry(e, definition.defaults, resolvers)));
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig);
  const ctx = { sitemap, sitemapName };
  await nitro.hooks.callHook("sitemap:output", ctx);
  setHeader(event, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds)
    setHeader(event, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(event, "Cache-Control", `no-cache, no-store`);
  event.context._isSitemap = true;
  return ctx.sitemap;
}

const _PMT2aE = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig();
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps) {
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 301);
  }
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
});

const _NLH8oP = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_xAVkpp = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _41UR4a, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_xAVkpp, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _auaJVH, lazy: false, middleware: true, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _1x5m7f, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _PMT2aE, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _NLH8oP, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_xAVkpp, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof vt.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { trapUnhandledNodeErrors as a, useNitroApp as b, defineRenderHandler as c, destr as d, buildAssetsURL as e, createError$1 as f, getQuery as g, getRouteRules as h, getResponseStatus as i, getResponseStatusText as j, baseURL as k, sanitizeStatusCode as l, getContext as m, createHooks as n, getRequestHeader as o, publicAssetsURL as p, setCookie as q, getCookie as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, deleteCookie as v, toRouteMatcher as w, createRouter$1 as x };
//# sourceMappingURL=nitro.mjs.map
