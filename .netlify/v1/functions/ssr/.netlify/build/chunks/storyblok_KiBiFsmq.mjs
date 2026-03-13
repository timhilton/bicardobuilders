import { c as createComponent, b as addAttribute, e as renderScript, a as renderTemplate, f as createAstro, r as renderComponent, o as renderSlot, p as renderHead, m as maybeRenderHead, d as renderTransition } from './astro/server_26r8Mtjg.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

var He = Object.defineProperty, Ne = (e, t, s) => t in e ? He(e, t, { enumerable: true, configurable: true, writable: true, value: s }) : e[t] = s, y = (e, t, s) => Ne(e, typeof t != "symbol" ? t + "" : t, s);
let w = /* @__PURE__ */ function(e) {
  return e.DOCUMENT = "doc", e.HEADING = "heading", e.PARAGRAPH = "paragraph", e.QUOTE = "blockquote", e.OL_LIST = "ordered_list", e.UL_LIST = "bullet_list", e.LIST_ITEM = "list_item", e.CODE_BLOCK = "code_block", e.HR = "horizontal_rule", e.BR = "hard_break", e.IMAGE = "image", e.EMOJI = "emoji", e.COMPONENT = "blok", e.TABLE = "table", e.TABLE_ROW = "tableRow", e.TABLE_CELL = "tableCell", e.TABLE_HEADER = "tableHeader", e;
}({}), A = /* @__PURE__ */ function(e) {
  return e.BOLD = "bold", e.STRONG = "strong", e.STRIKE = "strike", e.UNDERLINE = "underline", e.ITALIC = "italic", e.CODE = "code", e.LINK = "link", e.ANCHOR = "anchor", e.STYLED = "styled", e.SUPERSCRIPT = "superscript", e.SUBSCRIPT = "subscript", e.TEXT_STYLE = "textStyle", e.HIGHLIGHT = "highlight", e;
}({}), je = /* @__PURE__ */ function(e) {
  return e.TEXT = "text", e;
}({}), M = /* @__PURE__ */ function(e) {
  return e.URL = "url", e.STORY = "story", e.ASSET = "asset", e.EMAIL = "email", e;
}({});
const De = [
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
], Ue = (e = {}) => {
  const { custom: t, ...s } = e, r = {
    ...s,
    ...t
  };
  return Object.keys(r).map((o) => `${o}="${r[o]}"`).join(" ");
}, Ve = (e = {}) => Object.keys(e).map((t) => `${t}: ${e[t]}`).join("; ");
function Be(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
const S = (e) => Object.fromEntries(Object.entries(e).filter(([t, s]) => s !== void 0));
function qe(e, t) {
  if (!t) return {
    src: e,
    attrs: {}
  };
  let s = 0, r = 0;
  const o = {}, n = [];
  function a(c, u, g, d, C) {
    typeof c != "number" || c <= u || c >= g ? console.warn(`[StoryblokRichText] - ${d.charAt(0).toUpperCase() + d.slice(1)} value must be a number between ${u} and ${g} (inclusive)`) : C.push(`${d}(${c})`);
  }
  if (typeof t == "object") {
    if (t.width !== void 0 && (typeof t.width == "number" && t.width >= 0 ? (o.width = t.width, s = t.width) : console.warn("[StoryblokRichText] - Width value must be a number greater than or equal to 0")), t.height !== void 0 && (typeof t.height == "number" && t.height >= 0 ? (o.height = t.height, r = t.height) : console.warn("[StoryblokRichText] - Height value must be a number greater than or equal to 0")), t.height === 0 && t.width === 0 && (delete o.width, delete o.height, console.warn("[StoryblokRichText] - Width and height values cannot both be 0")), t.loading && ["lazy", "eager"].includes(t.loading) && (o.loading = t.loading), t.class && (o.class = t.class), t.filters) {
      const { filters: c } = t || {}, { blur: u, brightness: g, fill: d, format: C, grayscale: R, quality: k, rotate: _ } = c || {};
      u && a(u, 0, 100, "blur", n), k && a(k, 0, 100, "quality", n), g && a(g, 0, 100, "brightness", n), d && n.push(`fill(${d})`), R && n.push("grayscale()"), _ && [
        0,
        90,
        180,
        270
      ].includes(t.filters.rotate || 0) && n.push(`rotate(${_})`), C && [
        "webp",
        "png",
        "jpeg"
      ].includes(C) && n.push(`format(${C})`);
    }
    t.srcset && (o.srcset = t.srcset.map((c) => {
      if (typeof c == "number") return `${e}/m/${c}x0/${n.length > 0 ? `filters:${n.join(":")}` : ""} ${c}w`;
      if (Array.isArray(c) && c.length === 2) {
        const [u, g] = c;
        return `${e}/m/${u}x${g}/${n.length > 0 ? `filters:${n.join(":")}` : ""} ${u}w`;
      } else {
        console.warn("[StoryblokRichText] - srcset entry must be a number or a tuple of two numbers");
        return;
      }
    }).join(", ")), t.sizes && (o.sizes = t.sizes.join(", "));
  }
  let l = `${e}/m/`;
  return (s > 0 || r > 0) && (l = `${l}${s}x${r}/`), n.length > 0 && (l = `${l}filters:${n.join(":")}`), {
    src: l,
    attrs: o
  };
}
function ee(e, t = {}, s) {
  const r = Ue(t), o = r ? `${e} ${r}` : e, n = Array.isArray(s) ? s.join("") : s || "";
  if (e) {
    if (De.includes(e)) return `<${o}>`;
  } else return n;
  return `<${o}>${n}</${e}>`;
}
function Fe(e = {}) {
  const t = /* @__PURE__ */ new Map(), { renderFn: s = ee, textFn: r = Be, resolvers: o = {}, optimizeImages: n = false, keyedResolvers: a = false } = e, l = s !== ee, c = (i = {}) => {
    const { textAlign: h, class: p, id: m, style: f, ...v } = i, b = [];
    return f && b.push(f.endsWith(";") ? f : `${f};`), h && b.push(`text-align: ${h};`), S({
      ...v,
      class: p,
      id: m,
      ...b.length > 0 ? { style: b.join(" ") } : {}
    });
  }, u = (i) => (h, p) => {
    const m = c(h.attrs);
    return p.render(i, m, h.children || null);
  }, g = (i, h) => {
    const { src: p, alt: m, title: f, srcset: v, sizes: b } = i.attrs || {};
    let E = p, L = {};
    if (n) {
      const { src: fe, attrs: ye } = qe(p, n);
      E = fe, L = ye;
    }
    const I = {
      src: E,
      alt: m,
      title: f,
      srcset: v,
      sizes: b,
      ...L
    };
    return h.render("img", S(I));
  }, d = (i, h) => {
    const { level: p, ...m } = i.attrs || {}, f = c(m);
    return h.render(`h${p}`, f, i.children);
  }, C = (i, h) => {
    var p, m, f, v;
    const b = h.render("img", {
      src: (p = i.attrs) == null ? void 0 : p.fallbackImage,
      alt: (m = i.attrs) == null ? void 0 : m.alt,
      style: "width: 1.25em; height: 1.25em; vertical-align: text-top",
      draggable: "false",
      loading: "lazy"
    });
    return h.render("span", {
      "data-type": "emoji",
      "data-name": (f = i.attrs) == null ? void 0 : f.name,
      "data-emoji": (v = i.attrs) == null ? void 0 : v.emoji
    }, b);
  }, R = (i, h) => h.render("pre", i.attrs || {}, h.render("code", {}, i.children || "")), k = (i, h = false) => ({ text: p, attrs: m }, f) => {
    const { class: v, id: b, ...E } = m || {}, L = h ? {
      class: v,
      id: b,
      style: Ve(E) || void 0
    } : m || {};
    return f.render(i, S(L), p);
  }, _ = (i) => j(i), $ = (i) => {
    const { marks: h, ...p } = i;
    if ("text" in i) {
      if (h) return h.reduce((f, v) => _({
        ...v,
        text: f
      }), _({
        ...p,
        children: p.children
      }));
      const m = i.attrs || {};
      if (a) {
        const f = t.get("txt") || 0;
        t.set("txt", f + 1), m.key = `txt-${f}`;
      }
      return r(p.text, m);
    }
    return "";
  }, z = (i, h) => {
    const { linktype: p, href: m, anchor: f, ...v } = i.attrs || {};
    let b = "";
    switch (p) {
      case M.ASSET:
      case M.URL:
        b = m;
        break;
      case M.EMAIL:
        b = `mailto:${m}`;
        break;
      case M.STORY:
        b = m, f && (b = `${b}#${f}`);
        break;
      default:
        b = m;
        break;
    }
    const E = { ...v };
    return b && (E.href = b), h.render("a", E, i.text);
  }, ce = (i, h) => {
    var p, m;
    return console.warn("[StoryblokRichtText] - BLOK resolver is not available for vanilla usage"), h.render("span", {
      blok: (p = i == null ? void 0 : i.attrs) == null ? void 0 : p.body[0],
      id: (m = i.attrs) == null ? void 0 : m.id,
      style: "display: none"
    });
  }, ue = (i, h) => {
    const p = c(i.attrs), m = i.children || null;
    return h.render("table", p, h.render("tbody", {}, m));
  }, he = (i, h) => {
    const p = c(i.attrs);
    return h.render("tr", p, i.children);
  }, de = (i, h) => {
    const { colspan: p, rowspan: m, colwidth: f, backgroundColor: v, textAlign: b, ...E } = i.attrs || {}, L = [];
    f && L.push(`width: ${f}px;`), v && L.push(`background-color: ${v};`), b && L.push(`text-align: ${b};`);
    const I = {
      ...E,
      ...p > 1 ? { colspan: p } : {},
      ...m > 1 ? { rowspan: m } : {},
      ...L.length > 0 ? { style: L.join(" ") } : {}
    };
    return h.render("td", S(I), i.children);
  }, pe = (i, h) => {
    const { colspan: p, rowspan: m, colwidth: f, backgroundColor: v, textAlign: b, ...E } = i.attrs || {}, L = [];
    f && L.push(`width: ${f}px;`), v && L.push(`background-color: ${v};`), b && L.push(`text-align: ${b};`);
    const I = {
      ...E,
      ...p > 1 ? { colspan: p } : {},
      ...m > 1 ? { rowspan: m } : {},
      ...L.length > 0 ? { style: L.join(" ") } : {}
    };
    return h.render("th", S(I), i.children);
  }, Z = /* @__PURE__ */ new Map([
    [w.DOCUMENT, u("")],
    [w.HEADING, d],
    [w.PARAGRAPH, u("p")],
    [w.UL_LIST, u("ul")],
    [w.OL_LIST, u("ol")],
    [w.LIST_ITEM, u("li")],
    [w.IMAGE, g],
    [w.EMOJI, C],
    [w.CODE_BLOCK, R],
    [w.HR, u("hr")],
    [w.BR, u("br")],
    [w.QUOTE, u("blockquote")],
    [w.COMPONENT, ce],
    [je.TEXT, $],
    [A.LINK, z],
    [A.ANCHOR, z],
    [A.STYLED, k("span", true)],
    [A.BOLD, k("strong")],
    [A.TEXT_STYLE, k("span", true)],
    [A.ITALIC, k("em")],
    [A.UNDERLINE, k("u")],
    [A.STRIKE, k("s")],
    [A.CODE, k("code")],
    [A.SUPERSCRIPT, k("sup")],
    [A.SUBSCRIPT, k("sub")],
    [A.HIGHLIGHT, k("mark")],
    [w.TABLE, ue],
    [w.TABLE_ROW, he],
    [w.TABLE_CELL, de],
    [w.TABLE_HEADER, pe]
  ]), J = new Map([...Z, ...Object.entries(o).map(([i, h]) => [i, h])]), me = () => ({
    render: (i, h = {}, p) => {
      if (a && i) {
        const m = t.get(i) || 0;
        t.set(i, m + 1), h.key = `${i}-${m}`;
      }
      return s(i, h, p);
    },
    originalResolvers: Z,
    mergedResolvers: J
  });
  function x(i) {
    const h = J.get(i.type);
    if (!h)
      return console.error("<Storyblok>", `No resolver found for node type ${i.type}`), "";
    const p = me();
    if (i.type === "text") return h(i, p);
    const m = i.content ? i.content.map(j) : void 0;
    return h({
      ...i,
      children: m
    }, p);
  }
  function j(i) {
    return i.type === "doc" ? l ? i.content.map(x) : i.content.map(x).join("") : Array.isArray(i) ? i.map(x) : x(i);
  }
  return { render: j };
}
let te = false;
const se = [], le = (e) => new Promise((t, s) => {
  if (typeof window > "u") {
    s(new Error("Cannot load Storyblok bridge: window is undefined (server-side environment)"));
    return;
  }
  if (window.storyblokRegisterEvent = (o) => {
    if (!window.location.search.includes("_storyblok")) {
      console.warn("You are not in Draft Mode or in the Visual Editor.");
      return;
    }
    te ? o() : se.push(o);
  }, document.getElementById("storyblok-javascript-bridge")) {
    t(void 0);
    return;
  }
  const r = document.createElement("script");
  r.async = true, r.src = e, r.id = "storyblok-javascript-bridge", r.onerror = (o) => s(o), r.onload = (o) => {
    se.forEach((n) => n()), te = true, t(o);
  }, document.getElementsByTagName("head")[0].appendChild(r);
}), D = (e = "") => e.includes("/cdn/"), Ge = (e, t = 25, s = 1) => ({
  ...e,
  per_page: t,
  page: s
}), ze = (e) => new Promise((t) => setTimeout(t, e)), Ze = (e = 0, t) => Array.from({ length: e }, t), Je = (e = 0, t = e) => {
  const s = Math.abs(t - e) || 0, r = e < t ? 1 : -1;
  return Ze(s, (o, n) => n * r + e);
}, We = async (e, t) => Promise.all(e.map(t)), Ye = (e = [], t) => e.map(t).reduce((s, r) => [...s, ...r], []), G = (e, t, s) => {
  const r = [];
  for (const o in e) {
    if (!Object.prototype.hasOwnProperty.call(e, o)) continue;
    const n = e[o];
    if (n == null) continue;
    const a = s ? "" : encodeURIComponent(o);
    let l;
    typeof n == "object" ? l = G(n, t ? t + encodeURIComponent(`[${a}]`) : a, Array.isArray(n)) : l = `${t ? t + encodeURIComponent(`[${a}]`) : a}=${encodeURIComponent(n)}`, r.push(l);
  }
  return r.join("&");
}, re = (e) => {
  const t = {
    eu: "api.storyblok.com",
    us: "api-us.storyblok.com",
    cn: "app.storyblokchina.cn",
    ap: "api-ap.storyblok.com",
    ca: "api-ca.storyblok.com"
  };
  return t[e] ?? t.eu;
};
var Ke = class {
  constructor(e) {
    y(this, "baseURL"), y(this, "timeout"), y(this, "headers"), y(this, "responseInterceptor"), y(this, "fetch"), y(this, "ejectInterceptor"), y(this, "url"), y(this, "parameters"), y(this, "fetchOptions"), this.baseURL = e.baseURL, this.headers = e.headers || new Headers(), this.timeout = e != null && e.timeout ? e.timeout * 1e3 : 0, this.responseInterceptor = e.responseInterceptor, this.fetch = (...t) => e.fetch ? e.fetch(...t) : fetch(...t), this.ejectInterceptor = false, this.url = "", this.parameters = {}, this.fetchOptions = {};
  }
  /**
  *
  * @param url string
  * @param params ISbStoriesParams
  * @returns Promise<ISbResponse | Error>
  */
  get(e, t) {
    return this.url = e, this.parameters = t, this._methodHandler("get");
  }
  post(e, t) {
    return this.url = e, this.parameters = t, this._methodHandler("post");
  }
  put(e, t) {
    return this.url = e, this.parameters = t, this._methodHandler("put");
  }
  delete(e, t) {
    return this.url = e, this.parameters = t ?? {}, this._methodHandler("delete");
  }
  async _responseHandler(e) {
    const t = [], s = {
      data: {},
      headers: {},
      status: 0,
      statusText: ""
    };
    e.status !== 204 && await e.json().then((r) => {
      s.data = r;
    });
    for (const r of e.headers.entries()) t[r[0]] = r[1];
    return s.headers = { ...t }, s.status = e.status, s.statusText = e.statusText, s;
  }
  async _methodHandler(e) {
    let t = `${this.baseURL}${this.url}`, s = null;
    e === "get" ? t = `${this.baseURL}${this.url}?${G(this.parameters)}` : s = JSON.stringify(this.parameters);
    const r = new URL(t), o = new AbortController(), { signal: n } = o;
    let a = null;
    this.timeout && (a = setTimeout(() => o.abort(), this.timeout));
    try {
      const l = await this.fetch(`${r}`, {
        method: e,
        headers: this.headers,
        body: s,
        signal: n,
        ...this.fetchOptions
      });
      this.timeout && a && clearTimeout(a);
      const c = await this._responseHandler(l);
      return this.responseInterceptor && !this.ejectInterceptor ? this._statusHandler(this.responseInterceptor(c)) : this._statusHandler(c);
    } catch (l) {
      return l.name === "AbortError" ? { message: "Request timeout: The request was aborted due to timeout" } : { message: l.message || l.toString() || "An unknown error occurred" };
    }
  }
  setFetchOptions(e = {}) {
    Object.keys(e).length > 0 && "method" in e && delete e.method, this.fetchOptions = { ...e };
  }
  eject() {
    this.ejectInterceptor = true;
  }
  /**
  * Normalizes error messages from different response structures
  * @param data The response data that might contain error information
  * @returns A normalized error message string
  */
  _normalizeErrorMessage(e) {
    if (Array.isArray(e)) return e[0] || "Unknown error";
    if (e && typeof e == "object") {
      if (e.error) return e.error;
      for (const t in e) {
        if (Array.isArray(e[t])) return `${t}: ${e[t][0]}`;
        if (typeof e[t] == "string") return `${t}: ${e[t]}`;
      }
      if (e.slug) return e.slug;
    }
    return "Unknown error";
  }
  _statusHandler(e) {
    const t = /20[0-6]/g;
    return new Promise((s, r) => {
      if (t.test(`${e.status}`)) return s(e);
      const o = {
        message: this._normalizeErrorMessage(e.data),
        status: e.status,
        response: e
      };
      r(o);
    });
  }
}, Xe = Ke;
const oe = "SB-Agent", U = {
  defaultAgentName: "SB-JS-CLIENT",
  defaultAgentVersion: "SB-Agent-Version",
  packageVersion: "7.0.0"
}, Qe = {
  PUBLISHED: "published"
}, et = 25, V = {
  SMALL: 25,
  MEDIUM: 50,
  LARGE: 75
}, O = {
  SINGLE_OR_SMALL: 50,
  MEDIUM: 15,
  LARGE: 10,
  VERY_LARGE: 6
}, ne = 1e3, P = 3;
function tt(e, t) {
  const s = e.includes("/cdn/stories/"), r = e.split("/").length > 3 && !e.endsWith("/cdn/stories"), o = "find_by" in t;
  return s && r || o;
}
function st(e) {
  return e <= V.SMALL ? O.SINGLE_OR_SMALL : e <= V.MEDIUM ? O.MEDIUM : e <= V.LARGE ? O.LARGE : O.VERY_LARGE;
}
function H(e, t, s = {}, r) {
  if (s.userRateLimit !== void 0) return Math.min(s.userRateLimit, ne);
  if (s.serverHeadersRateLimit !== void 0) return Math.min(s.serverHeadersRateLimit, ne);
  if (r !== void 0) return r;
  if (!e || !t || tt(e, t)) return O.SINGLE_OR_SMALL;
  const o = t.per_page || et;
  return st(o);
}
function rt(e) {
  if (!e) return null;
  const t = e["x-ratelimit"] || e["X-RateLimit"], s = e["x-ratelimit-policy"] || e["X-RateLimit-Policy"];
  if (!t && !s) return null;
  const r = {};
  if (t) {
    const o = t.match(/r=(\d+)/);
    o && (r.remaining = Number.parseInt(o[1], 10));
  }
  if (s) {
    const o = s.match(/q=(\d+)/);
    o && (r.max = Number.parseInt(o[1], 10));
  }
  return Object.keys(r).length > 0 ? r : null;
}
function ot(e, t = false) {
  return {
    userRateLimit: e,
    serverHeadersRateLimit: void 0,
    isManagementApi: t
  };
}
var nt = class extends Error {
  constructor(e) {
    super(e), this.name = "AbortError";
  }
};
function it(e, t, s) {
  if (!Number.isFinite(t)) throw new TypeError("Expected `limit` to be a finite number");
  if (!Number.isFinite(s)) throw new TypeError("Expected `interval` to be a finite number");
  const r = [];
  let o = [], n = 0, a = false;
  const l = async () => {
    n++;
    const u = r.shift();
    if (u) try {
      const d = await e(...u.args);
      u.resolve(d);
    } catch (d) {
      u.reject(d);
    }
    const g = setTimeout(() => {
      n--, r.length > 0 && l(), o = o.filter((d) => d !== g);
    }, s);
    o.includes(g) || o.push(g);
  }, c = (...u) => a ? Promise.reject(/* @__PURE__ */ new Error("Throttled function is already aborted and not accepting new promises")) : new Promise((g, d) => {
    r.push({
      resolve: g,
      reject: d,
      args: u
    }), n < t && l();
  });
  return c.abort = () => {
    a = true, o.forEach(clearTimeout), o = [], r.forEach((u) => u.reject(() => new nt("Throttle function aborted"))), r.length = 0;
  }, c;
}
var at = it, lt = class {
  constructor(e, t = 1e3) {
    y(this, "queues"), y(this, "interval"), y(this, "throttledRequestFn"), this.queues = /* @__PURE__ */ new Map(), this.interval = t, this.throttledRequestFn = e;
  }
  /**
  * Gets or creates a throttle queue for the specified rate limit
  */
  getQueue(e) {
    let t = this.queues.get(e);
    return t || (t = at(this.throttledRequestFn, e, this.interval), this.queues.set(e, t)), t;
  }
  /**
  * Executes a request through the appropriate throttle queue based on rate limit
  */
  execute(e, ...t) {
    return this.getQueue(e)(...t);
  }
  /**
  * Aborts all throttle queues
  */
  abortAll() {
    this.queues.forEach((e) => {
      var t;
      (t = e.abort) == null || t.call(e);
    }), this.queues.clear();
  }
  /**
  * Gets the number of active queues
  */
  getQueueCount() {
    return this.queues.size;
  }
};
let N = {};
const T = {};
var ct = class {
  /**
  *
  * @param config ISbConfig interface
  * @param pEndpoint string, optional
  */
  constructor(e, t) {
    y(this, "client"), y(this, "maxRetries"), y(this, "retriesDelay"), y(this, "throttleManager"), y(this, "accessToken"), y(this, "cache"), y(this, "resolveCounter"), y(this, "relations"), y(this, "links"), y(this, "version"), y(this, "rateLimitConfig"), y(this, "richTextResolver"), y(this, "resolveNestedRelations"), y(this, "stringifiedStoriesCache"), y(this, "inlineAssets");
    let s = e.endpoint || t;
    if (!s) {
      const o = e.https === false ? "http" : "https";
      e.oauthToken ? s = `${o}://${re(e.region)}/v1` : s = `${o}://${re(e.region)}/v2`;
    }
    const r = new Headers();
    r.set("Content-Type", "application/json"), r.set("Accept", "application/json"), e.headers && (e.headers.constructor.name === "Headers" ? e.headers.entries().toArray() : Object.entries(e.headers)).forEach(([o, n]) => {
      r.set(o, n);
    }), r.has(oe) || (r.set(oe, U.defaultAgentName), r.set(U.defaultAgentVersion, U.packageVersion)), e.oauthToken && r.set("Authorization", e.oauthToken), this.rateLimitConfig = ot(e.rateLimit, !!e.oauthToken), this.maxRetries = e.maxRetries || 10, this.retriesDelay = 300, this.throttleManager = new lt(this.throttledRequest.bind(this), 1e3), this.accessToken = e.accessToken || "", this.relations = {}, this.links = {}, this.cache = e.cache || { clear: "manual" }, this.resolveCounter = 0, this.resolveNestedRelations = e.resolveNestedRelations || true, this.stringifiedStoriesCache = {}, this.version = e.version || Qe.PUBLISHED, this.inlineAssets = e.inlineAssets || false, this.client = new Xe({
      baseURL: s,
      timeout: e.timeout || 0,
      headers: r,
      responseInterceptor: e.responseInterceptor,
      fetch: e.fetch
    });
  }
  parseParams(e) {
    return e.token || (e.token = this.getToken()), e.cv || (e.cv = T[e.token]), Array.isArray(e.resolve_relations) && (e.resolve_relations = e.resolve_relations.join(",")), typeof e.resolve_relations < "u" && (e.resolve_level = 2), e;
  }
  factoryParamOptions(e, t) {
    return D(e) ? this.parseParams(t) : t;
  }
  makeRequest(e, t, s, r, o) {
    const n = this.factoryParamOptions(e, Ge(t, s, r));
    return this.cacheResponse(e, n, void 0, o);
  }
  get(e, t = {}, s) {
    t || (t = {});
    const r = `/${e}`;
    D(r) && (t.version = t.version || this.version);
    const o = this.factoryParamOptions(r, t);
    return this.cacheResponse(r, o, void 0, s);
  }
  async getAll(e, t = {}, s, r) {
    const o = (t == null ? void 0 : t.per_page) || 25, n = `/${e}`.replace(/\/$/, ""), a = s ?? n.substring(n.lastIndexOf("/") + 1);
    t.version = t.version || this.version;
    const l = 1, c = await this.makeRequest(n, t, o, l, r), u = c.total ? Math.ceil(c.total / (c.perPage || o)) : 1, g = await We(Je(l, u), (d) => this.makeRequest(n, t, o, d + 1, r));
    return Ye([c, ...g], (d) => Object.values(d.data[a]));
  }
  post(e, t = {}, s) {
    const r = `/${e}`, o = H(void 0, void 0, this.rateLimitConfig, P);
    return this.throttleManager.execute(o, "post", r, t, s);
  }
  put(e, t = {}, s) {
    const r = `/${e}`, o = H(void 0, void 0, this.rateLimitConfig, P);
    return this.throttleManager.execute(o, "put", r, t, s);
  }
  delete(e, t = {}, s) {
    t || (t = {});
    const r = `/${e}`, o = H(void 0, void 0, this.rateLimitConfig, P);
    return this.throttleManager.execute(o, "delete", r, t, s);
  }
  getStories(e = {}, t) {
    return this._addResolveLevel(e), this.get("cdn/stories", e, t);
  }
  getStory(e, t = {}, s) {
    return this._addResolveLevel(t), this.get(`cdn/stories/${e}`, t, s);
  }
  getToken() {
    return this.accessToken;
  }
  ejectInterceptor() {
    this.client.eject();
  }
  _addResolveLevel(e) {
    typeof e.resolve_relations < "u" && (e.resolve_level = 2);
  }
  _cleanCopy(e) {
    return JSON.parse(JSON.stringify(e));
  }
  _insertLinks(e, t, s) {
    const r = e[t];
    r && r.fieldtype === "multilink" && r.linktype === "story" && typeof r.id == "string" && this.links[s][r.id] ? r.story = this._cleanCopy(this.links[s][r.id]) : r && r.linktype === "story" && typeof r.uuid == "string" && this.links[s][r.uuid] && (r.story = this._cleanCopy(this.links[s][r.uuid]));
  }
  /**
  *
  * @param resolveId A counter number as a string
  * @param uuid The uuid of the story
  * @returns string | object
  */
  getStoryReference(e, t) {
    return this.relations[e][t] ? JSON.parse(this.stringifiedStoriesCache[t] || JSON.stringify(this.relations[e][t])) : t;
  }
  /**
  * Resolves a field's value by replacing UUIDs with their corresponding story references
  * @param jtree - The JSON tree object containing the field to resolve
  * @param treeItem - The key of the field to resolve
  * @param resolveId - The unique identifier for the current resolution context
  *
  * This method handles both single string UUIDs and arrays of UUIDs:
  * - For single strings: directly replaces the UUID with the story reference
  * - For arrays: maps through each UUID and replaces with corresponding story references
  */
  _resolveField(e, t, s) {
    const r = e[t];
    typeof r == "string" ? e[t] = this.getStoryReference(s, r) : Array.isArray(r) && (e[t] = r.map((o) => this.getStoryReference(s, o)).filter(Boolean));
  }
  /**
  * Inserts relations into the JSON tree by resolving references
  * @param jtree - The JSON tree object to process
  * @param treeItem - The current field being processed
  * @param fields - The relation patterns to resolve (string or array of strings)
  * @param resolveId - The unique identifier for the current resolution context
  *
  * This method handles two types of relation patterns:
  * 1. Nested relations: matches fields that end with the current field name
  *    Example: If treeItem is "event_type", it matches patterns like "*.event_type"
  *
  * 2. Direct component relations: matches exact component.field patterns
  *    Example: "event.event_type" for component "event" and field "event_type"
  *
  * The method supports both string and array formats for the fields parameter,
  * allowing flexible specification of relation patterns.
  */
  _insertRelations(e, t, s, r) {
    if (Array.isArray(s) ? s.find((n) => n.endsWith(`.${t}`)) : s.endsWith(`.${t}`)) {
      this._resolveField(e, t, r);
      return;
    }
    const o = e.component ? `${e.component}.${t}` : t;
    (Array.isArray(s) ? s.includes(o) : s === o) && this._resolveField(e, t, r);
  }
  /**
  * Recursively traverses and resolves relations in the story content tree
  * @param story - The story object containing the content to process
  * @param fields - The relation patterns to resolve
  * @param resolveId - The unique identifier for the current resolution context
  */
  iterateTree(e, t, s) {
    const r = (o, n = "") => {
      if (!(!o || o._stopResolving)) {
        if (Array.isArray(o)) o.forEach((a, l) => r(a, `${n}[${l}]`));
        else if (typeof o == "object") for (const a in o) {
          const l = n ? `${n}.${a}` : a;
          (o.component && o._uid || o.type === "link") && (this._insertRelations(o, a, t, s), this._insertLinks(o, a, s)), r(o[a], l);
        }
      }
    };
    r(e.content);
  }
  async resolveLinks(e, t, s) {
    let r = [];
    if (e.link_uuids) {
      const o = e.link_uuids.length, n = [], a = 50;
      for (let l = 0; l < o; l += a) {
        const c = Math.min(o, l + a);
        n.push(e.link_uuids.slice(l, c));
      }
      for (let l = 0; l < n.length; l++)
        (await this.getStories({
          per_page: a,
          language: t.language,
          version: t.version,
          starts_with: t.starts_with,
          by_uuids: n[l].join(",")
        })).data.stories.forEach((c) => {
          r.push(c);
        });
    } else r = e.links;
    r.forEach((o) => {
      this.links[s][o.uuid] = {
        ...o,
        _stopResolving: true
      };
    });
  }
  async resolveRelations(e, t, s) {
    let r = [];
    if (e.rel_uuids) {
      const o = e.rel_uuids.length, n = [], a = 50;
      for (let l = 0; l < o; l += a) {
        const c = Math.min(o, l + a);
        n.push(e.rel_uuids.slice(l, c));
      }
      for (let l = 0; l < n.length; l++)
        (await this.getStories({
          per_page: a,
          language: t.language,
          version: t.version,
          starts_with: t.starts_with,
          by_uuids: n[l].join(","),
          excluding_fields: t.excluding_fields
        })).data.stories.forEach((c) => {
          r.push(c);
        });
      r.length > 0 && (e.rels = r, delete e.rel_uuids);
    } else r = e.rels;
    r && r.length > 0 && r.forEach((o) => {
      this.relations[s][o.uuid] = {
        ...o,
        _stopResolving: true
      };
    });
  }
  /**
  *
  * @param responseData
  * @param params
  * @param resolveId
  * @description Resolves the relations and links of the stories
  * @returns Promise<void>
  *
  */
  async resolveStories(e, t, s) {
    var r, o;
    let n = [];
    if (this.links[s] = {}, this.relations[s] = {}, typeof t.resolve_relations < "u" && t.resolve_relations.length > 0 && (typeof t.resolve_relations == "string" && (n = t.resolve_relations.split(",")), await this.resolveRelations(e, t, s)), t.resolve_links && [
      "1",
      "story",
      "url",
      "link"
    ].includes(t.resolve_links) && ((r = e.links) != null && r.length || (o = e.link_uuids) != null && o.length) && await this.resolveLinks(e, t, s), this.resolveNestedRelations) for (const a in this.relations[s]) this.iterateTree(this.relations[s][a], n, s);
    e.story ? this.iterateTree(e.story, n, s) : e.stories.forEach((a) => {
      this.iterateTree(a, n, s);
    }), this.stringifiedStoriesCache = {}, delete this.links[s], delete this.relations[s];
  }
  async cacheResponse(e, t, s, r) {
    const o = G({
      url: e,
      params: t
    }), n = this.cacheProvider();
    if (t.version === "published" && e !== "/cdn/spaces/me") {
      const c = await n.get(o);
      if (c) return Promise.resolve(c);
    }
    const a = !D(e) && this.rateLimitConfig.isManagementApi ? P : void 0, l = H(e, t, this.rateLimitConfig, a);
    return new Promise(async (c, u) => {
      var g;
      try {
        const d = await this.throttleManager.execute(l, "get", e, t, r);
        if (d.status !== 200) return u(d);
        let C = {
          data: d.data,
          headers: d.headers
        };
        const R = rt(d.headers);
        if ((R == null ? void 0 : R.max) !== void 0 && (this.rateLimitConfig.serverHeadersRateLimit = R.max), (g = d.headers) != null && g["per-page"] && (C = Object.assign({}, C, {
          perPage: d.headers["per-page"] ? Number.parseInt(d.headers["per-page"]) : 0,
          total: d.headers["per-page"] ? Number.parseInt(d.headers.total) : 0
        })), C.data.story || C.data.stories) {
          const _ = this.resolveCounter = ++this.resolveCounter % 1e3;
          await this.resolveStories(C.data, t, `${_}`), C = await this.processInlineAssets(C);
        }
        t.version === "published" && e !== "/cdn/spaces/me" && await n.set(o, C);
        const k = this.cache.clear === "onpreview" && t.version === "draft" || this.cache.clear === "auto";
        return t.token && C.data.cv && (k && T[t.token] && T[t.token] !== C.data.cv && await this.flushCache(), T[t.token] = C.data.cv), c(C);
      } catch (d) {
        if (d.response && d.status === 429 && (s = typeof s > "u" ? 0 : s + 1, s < this.maxRetries))
          return console.log(`Hit rate limit. Retrying in ${this.retriesDelay / 1e3} seconds.`), await ze(this.retriesDelay), this.cacheResponse(e, t, s).then(c).catch(u);
        u(d);
      }
    });
  }
  throttledRequest(e, t, s, r) {
    return this.client.setFetchOptions(r), this.client[e](t, s);
  }
  cacheVersions() {
    return T;
  }
  cacheVersion() {
    return T[this.accessToken];
  }
  setCacheVersion(e) {
    this.accessToken && (T[this.accessToken] = e);
  }
  clearCacheVersion() {
    this.accessToken && (T[this.accessToken] = 0);
  }
  cacheProvider() {
    switch (this.cache.type) {
      case "memory":
        return {
          get(e) {
            return Promise.resolve(N[e]);
          },
          getAll() {
            return Promise.resolve(N);
          },
          set(e, t) {
            return N[e] = t, Promise.resolve(void 0);
          },
          flush() {
            return N = {}, Promise.resolve(void 0);
          }
        };
      case "custom":
        if (this.cache.custom) return this.cache.custom;
      default:
        return {
          get() {
            return Promise.resolve();
          },
          getAll() {
            return Promise.resolve(void 0);
          },
          set() {
            return Promise.resolve(void 0);
          },
          flush() {
            return Promise.resolve(void 0);
          }
        };
    }
  }
  async flushCache() {
    return await this.cacheProvider().flush(), this.clearCacheVersion(), this;
  }
  async processInlineAssets(e) {
    if (!this.inlineAssets) return e;
    const t = (s) => {
      if (!s || typeof s != "object") return s;
      if (Array.isArray(s)) return s.map((o) => t(o));
      let r = { ...s };
      r.fieldtype === "asset" && Array.isArray(e.data.assets) && (r = {
        ...e.data.assets.find((o) => o.id === r.id),
        ...r
      });
      for (const o in r) typeof r[o] == "object" && (r[o] = t(r[o]));
      return r;
    };
    return e.data.story && (e.data.story.content = t(e.data.story.content)), e.data.stories && (e.data.stories = e.data.stories.map((s) => (s.content = t(s.content), s))), e;
  }
}, ut = ct;
const ft = (e = {}) => {
  const { apiOptions: t } = e;
  if (!t || !t.accessToken) {
    console.error(
      "You need to provide an access token to interact with Storyblok API. Read https://www.storyblok.com/docs/api/content-delivery#topics/authentication"
    );
    return;
  }
  return { storyblokApi: new ut(t) };
};
let q = "https://app.storyblok.com/f/storyblok-v2-latest.js";
const gt = (e = {}) => {
  var t, s;
  const {
    bridge: r,
    accessToken: o,
    use: n = [],
    apiOptions: a = {},
    bridgeUrl: l
  } = e;
  a.accessToken = a.accessToken || o;
  const c = { bridge: r, apiOptions: a };
  let u = {};
  n.forEach((d) => {
    u = { ...u, ...d(c) };
  }), l && (q = l);
  const g = !(typeof window > "u") && ((s = (t = window.location) == null ? void 0 : t.search) == null ? void 0 : s.includes("_storyblok_tk"));
  return r !== false && g && le(q), u;
};
function bt(e, t) {
  return Fe(t).render(e);
}

const { storyblokApi } = gt({
            accessToken: "",
            use: [ft],
            apiOptions: {"region":"eu"},
          });
          const storyblokApiInstance = storyblokApi;

globalThis.storyblokApiInstance = storyblokApiInstance;

const $$Astro$4 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/timhilton/code/bicardobuilders/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/timhilton/code/bicardobuilders/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$3 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Default site description" } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])}   <!-- Reveal images if JS is disabled --> <noscript> <style>
		img {
			opacity: 1 !important;
			transform: none !important;
		}
	</style></noscript> ${renderScript($$result, "/Users/timhilton/code/bicardobuilders/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/timhilton/code/bicardobuilders/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro();
const $$Logo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Logo;
  const { width = 123, height = 42, color = "#2e2e2f" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 435 139" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M277.264 116.754C278.726 116.657 281.901 116.629 284.32 116.689C287.175 116.754 289.322 117.059 290.451 117.552C291.46 117.99 292.478 118.886 292.88 119.693C293.264 120.455 293.574 121.806 293.574 122.692C293.574 123.905 293.181 124.709 292.001 125.922C291.136 126.808 289.989 127.537 289.456 127.537C289.003 127.537 288.468 127.235 288.161 126.833C288.336 127.105 288.537 127.45 288.776 127.883C289.447 129.092 290.956 131.713 292.131 133.711C293.306 135.708 294.736 137.628 295.31 137.979C295.883 138.325 296.351 138.925 296.351 139.303C296.351 139.686 296.193 139.999 296.004 140C295.814 140.005 294.616 139.691 293.343 139.308C292.071 138.92 290.387 138.034 289.6 137.342C288.814 136.646 287.546 135.243 286.783 134.228C286.024 133.213 284.894 131.496 284.279 130.411C283.386 128.829 282.914 128.442 281.891 128.45C280.791 128.46 280.619 128.645 280.619 129.844C280.619 131.2 280.568 131.229 278.305 131.229C276.284 131.229 275.964 131.099 275.765 130.19C275.645 129.623 275.538 127.961 275.534 126.499L275.529 123.846V121.308C275.529 119.915 275.321 118.665 275.066 118.54C274.812 118.415 274.604 118 274.604 117.617C274.604 117.1 275.284 116.879 277.264 116.754ZM194.094 116.925C198.309 116.925 199.609 117.063 199.494 117.501C199.406 117.82 198.938 118.152 198.453 118.244C197.962 118.332 197.296 118.645 196.967 118.936C196.518 119.329 196.371 121.41 196.38 127.076C196.389 132.963 196.542 134.897 197.06 135.612C197.652 136.428 198.185 136.521 201.696 136.419C204.325 136.341 205.29 136.392 205.567 136.713C205.353 136.449 204.72 136.304 203.154 136.304L204.986 134.468C205.995 133.457 206.976 132.627 207.165 132.622C207.355 132.617 207.512 132.82 207.512 133.074C207.512 133.327 207.304 134.468 207.05 135.611C206.805 136.712 206.41 137.616 206.154 137.683C206.175 137.686 206.195 137.688 206.217 137.688C206.554 137.688 206.601 137.836 206.333 138.071C206.092 138.284 204.019 138.302 201.728 138.113C199.438 137.924 195.533 137.748 193.053 137.73C190.38 137.707 188.543 137.499 188.542 137.227C188.542 136.973 189.093 136.609 189.768 136.419C190.439 136.23 191.17 135.607 191.388 135.035C191.605 134.463 191.78 130.882 191.78 127.076C191.78 123.27 191.6 119.791 191.378 119.347C191.156 118.904 190.429 118.383 189.758 118.194C189.088 118.004 188.542 117.64 188.542 117.386C188.543 117.105 190.703 116.925 194.094 116.925ZM144.983 117.068C149.609 117.068 150.933 117.207 150.989 117.691C151.035 118.074 150.581 118.313 149.79 118.318C149.092 118.318 148.203 118.521 147.824 118.766C147.26 119.126 147.139 120.377 147.176 125.562C147.213 130.481 147.398 132.262 147.986 133.42C148.407 134.246 149.425 135.257 150.253 135.672C151.215 136.152 152.535 136.359 153.909 136.249C155.361 136.129 156.417 135.727 157.148 135.012C157.8 134.38 158.67 134.011 160.41 134.228L159.322 135.58C158.725 136.323 157.559 137.204 156.731 137.541C155.903 137.873 153.719 138.15 151.873 138.154C149.3 138.154 148.037 137.914 146.464 137.116C145.048 136.401 144.114 135.496 143.461 134.228C142.693 132.733 142.47 131.195 142.276 126.106C142.1 121.447 141.86 119.629 141.346 119.047C140.962 118.618 140.287 118.277 139.842 118.291C139.399 118.3 138.935 118.152 138.811 117.963C138.69 117.774 138.691 117.492 138.816 117.345C138.941 117.192 141.717 117.068 144.983 117.068ZM306.322 116.985C307.081 116.722 309.852 116.588 312.545 116.689C315.214 116.791 317.392 117.04 317.385 117.243C317.38 117.451 317.223 118.706 317.038 120.039C316.807 121.737 316.501 122.462 316.015 122.462C315.632 122.462 315.322 122.051 315.321 121.539C315.321 121.031 314.822 120.099 314.206 119.462C313.318 118.54 312.642 118.309 310.852 118.318C309.621 118.318 308.303 118.503 307.918 118.72C307.596 118.9 307.093 118.907 306.596 118.757C306.857 119.034 306.886 119.404 306.78 120.039C306.66 120.741 306.84 121.723 307.173 122.231C307.511 122.739 309.117 123.754 310.746 124.483C312.369 125.212 314.419 126.356 315.294 127.02C316.168 127.685 317.117 128.917 317.404 129.757C317.69 130.592 317.815 132.045 317.681 132.986C317.533 134.006 316.918 135.201 316.15 135.958C315.437 136.659 314.077 137.435 313.124 137.688C312.171 137.937 311.023 138.145 310.579 138.15C310.079 138.15 309.769 137.799 309.769 137.227C309.769 136.655 310.079 136.309 310.579 136.309C311.023 136.309 311.856 136 312.43 135.617C313.082 135.183 313.475 134.445 313.485 133.651C313.489 132.922 313.045 131.952 312.444 131.376C311.86 130.822 310.037 129.756 308.381 129.009C306.73 128.262 304.791 127.053 304.082 126.324C303.185 125.41 302.718 124.362 302.551 122.923C302.371 121.341 302.542 120.491 303.259 119.347C303.782 118.526 304.314 117.848 304.444 117.848C304.548 117.848 304.973 117.981 305.463 118.165C305.238 118.005 305.081 117.86 305.054 117.769C304.999 117.603 305.573 117.248 306.322 116.985ZM377.277 131.459L377.301 129.268C377.319 127.639 377.5 127.076 378.017 127.076C378.596 127.076 378.711 127.999 378.711 132.613C378.711 137.84 378.66 138.15 377.786 138.15C377.194 138.149 374.125 135.302 361.569 122.231L361.582 128.345C361.587 131.708 361.772 134.822 361.994 135.266C362.217 135.709 362.943 136.23 363.613 136.419C364.284 136.609 364.83 136.973 364.83 137.227C364.829 137.499 363.162 137.693 356.733 137.707L360.162 134.689L360.158 128.46C360.153 124.852 359.917 121.553 359.598 120.621C359.26 119.629 358.561 118.789 357.774 118.429C357.076 118.111 356.503 117.64 356.502 117.386C356.503 117.119 357.929 116.925 363.211 116.934L377.277 131.459ZM303.43 131.219C303.731 131.21 304.245 132.041 304.559 133.064C304.879 134.084 305.61 135.234 306.179 135.617C306.753 136 307.794 136.309 308.492 136.309C309.459 136.304 309.764 136.526 309.765 137.227C309.764 138.085 309.496 138.14 305.822 138.034C301.89 137.919 301.876 137.914 302.089 136.765C302.209 136.133 302.431 134.625 302.588 133.42C302.75 132.198 303.12 131.224 303.43 131.219ZM399.417 116.509C399.736 116.486 399.996 116.879 399.996 117.386C399.996 117.995 399.417 118.586 398.312 119.116C397.312 119.596 396.197 120.676 395.563 121.77C394.98 122.785 394.355 124.653 394.179 125.922C393.957 127.533 394.087 128.926 394.605 130.536C395.012 131.805 395.924 133.401 396.632 134.084C397.335 134.767 398.487 135.542 399.186 135.814C399.884 136.082 401.449 136.313 402.656 136.323C404.16 136.332 405.256 136.041 406.126 135.4C406.825 134.883 407.713 134.458 408.093 134.458C408.606 134.458 408.717 134.791 408.523 135.727C408.38 136.429 408.056 137.204 407.806 137.458C407.555 137.711 405.02 137.919 402.171 137.919C397.271 137.919 396.854 137.845 394.522 136.535C393.134 135.76 391.412 134.273 390.589 133.143C389.243 131.302 389.122 130.845 389.122 127.574C389.122 124.405 389.28 123.753 390.529 121.733C391.445 120.256 392.657 119.07 393.999 118.337C395.133 117.718 396.687 117.063 397.451 116.883C398.214 116.703 399.098 116.537 399.417 116.509ZM263.786 116.463C264.54 116.463 264.633 116.754 264.48 118.655C264.383 119.858 264.124 121.053 263.902 121.308C263.634 121.609 263.306 121.568 262.921 121.183C262.458 120.718 262.458 120.602 262.921 120.606C262.975 120.608 263.024 120.599 263.067 120.58C262.841 120.453 262.498 120.125 262.162 119.693C261.362 118.664 260.931 118.54 254.939 118.54L254.708 126.153H258.178C260.356 126.153 261.167 126.165 261.469 126.471C261.349 126.266 261.173 126.153 260.954 126.153C260.413 126.153 260.464 125.949 261.185 125.23C261.694 124.722 262.111 124.099 262.111 123.845C262.111 123.592 262.38 123.384 262.704 123.384C263.147 123.384 263.249 124.174 263.11 126.499C263.009 128.21 262.791 129.779 262.634 129.983C262.472 130.181 261.977 129.821 261.533 129.175C261.089 128.529 260.931 128.105 261.185 128.229C261.253 128.262 261.317 128.256 261.375 128.219C261.236 128.233 261.029 128.152 260.723 127.999C260.214 127.745 258.649 127.537 254.708 127.537L254.689 131.113C254.675 133.475 254.87 134.873 255.268 135.238C255.596 135.538 256.698 135.926 257.715 136.101C258.733 136.281 260.191 136.272 260.954 136.092C261.718 135.907 263.129 134.897 264.092 133.84C265.734 132.036 265.836 131.99 265.799 133.074C265.775 133.711 265.614 135.04 265.118 137.835L255.864 137.794C248.575 137.758 246.612 137.623 246.61 137.148C246.611 136.816 247.236 136.438 247.999 136.304C249.294 136.083 249.406 135.902 249.688 133.531C249.854 132.137 250.007 128.612 250.03 125.692C250.053 122.268 249.859 119.975 249.484 119.232C249.165 118.6 248.42 118.009 247.832 117.921C247.027 117.801 246.916 117.658 247.378 117.349C247.721 117.123 251.382 116.934 263.036 116.925L263.072 117.183C263.075 116.573 263.276 116.463 263.786 116.463ZM122.028 116.56C122.473 116.509 122.838 116.565 122.838 116.694C122.838 116.791 122.773 117.063 122.686 117.358C123.038 117.109 123.865 116.925 124.712 116.925C125.716 116.925 127.266 117.234 128.159 117.617C129.048 118 129.987 118.724 130.241 119.232C130.496 119.739 130.704 120.778 130.704 121.539C130.704 122.549 130.269 123.297 129.085 124.307C128.192 125.069 127.1 125.701 126.655 125.71C126.212 125.724 126.679 126.024 127.696 126.384C128.714 126.744 130.121 127.671 130.82 128.442C131.699 129.411 132.092 130.347 132.092 131.459C132.092 132.345 131.727 133.692 131.282 134.449C130.838 135.205 129.64 136.295 128.622 136.871C126.877 137.859 126.35 137.909 119.368 137.775C115.298 137.698 111.861 137.513 111.733 137.365C111.609 137.222 111.711 137.028 111.965 136.941C112.219 136.853 112.844 136.484 113.353 136.119C114.153 135.547 114.297 134.846 114.403 130.919C114.42 130.268 114.448 129.667 114.483 129.124C114.447 129.573 114.418 130.048 114.398 130.536C114.301 133 114.2 131.449 114.047 118.77L112.659 118.309C111.896 118.055 111.272 117.64 111.271 117.386C111.272 117.114 113.326 116.869 116.245 116.791C118.979 116.717 121.584 116.616 122.028 116.56ZM218.154 116.925C222.231 116.925 222.314 116.948 222.092 117.963C222.076 118.037 222.061 118.121 222.046 118.216L221.958 118.212L221.953 119.06C221.899 119.73 221.861 120.671 221.856 122V135.381L223.013 135.843C223.431 136.009 224.246 136.155 225.116 136.236C225.564 136.29 225.981 136.315 226.367 136.317C226.539 136.319 226.706 136.315 226.868 136.308C228.316 136.333 228.796 136.515 228.796 136.996C228.796 137.577 227.661 137.707 221.81 137.804C217.966 137.868 214.585 137.775 214.291 137.601C214 137.425 213.866 137.204 213.99 137.116C214.12 137.028 214.796 136.705 216.766 135.843V120.385C216.766 119.025 216.549 118.678 215.374 118.194C214.611 117.875 213.986 117.46 213.986 117.271C213.992 117.082 215.865 116.925 218.154 116.925ZM178.825 132.382C178.825 133.526 178.982 134.799 179.172 135.215C179.362 135.63 180.093 136.253 180.791 136.599C181.49 136.945 181.961 137.36 181.842 137.526C181.715 137.688 179.273 137.822 176.405 137.817C173.538 137.817 171.138 137.628 171.07 137.402C171.006 137.181 171.575 136.738 172.343 136.419C173.416 135.976 173.735 135.551 173.731 134.574C173.726 133.877 173.851 132.631 174.008 131.805C174.286 130.356 174.374 130.306 178.825 130.306V132.382ZM280.619 133.536C280.619 135.69 280.712 135.875 282.007 136.304C282.77 136.558 283.395 136.973 283.395 137.227C283.393 137.508 281.39 137.688 278.305 137.688C275.378 137.688 273.12 137.495 272.984 137.227C272.855 136.973 273.378 136.558 274.141 136.304C275.376 135.893 275.557 135.588 275.798 133.536L276.071 131.229H280.619V133.536ZM348.636 116.565C348.761 116.519 349.178 116.671 349.561 116.911C350.021 117.203 350.098 117.494 349.793 117.782C349.538 118.022 348.913 118.295 348.404 118.382C347.539 118.539 347.461 119.015 347.229 125.465C347.151 127.602 347.084 128.972 347.021 129.223L347.035 129.729C347.114 132.455 347.294 134.997 347.433 135.381C347.572 135.764 348.215 136.23 348.853 136.419C349.496 136.609 350.024 136.973 350.024 137.227C350.022 137.508 347.94 137.688 344.703 137.688C341.776 137.688 339.385 137.531 339.386 137.342C339.387 137.153 340.012 136.631 342.158 135.381V124.769H346.785V124.768H342.158L342.042 121.89C341.936 119.246 341.82 118.96 340.654 118.429C339.956 118.111 339.382 117.639 339.382 117.386C339.384 117.118 341.285 116.869 343.893 116.791C346.373 116.717 348.511 116.616 348.636 116.565ZM233.502 117.848C233.715 117.848 234.752 118.627 235.807 119.578C236.866 120.528 238.009 121.982 238.352 122.808C238.694 123.634 238.971 125.503 238.972 126.96C238.967 128.778 238.638 130.255 237.931 131.653C237.361 132.779 236.269 134.209 235.506 134.836C234.742 135.468 233.493 136.244 232.729 136.567C231.966 136.885 230.768 137.268 230.069 137.416C229.061 137.633 228.802 137.522 228.815 136.881C228.823 136.523 229.265 135.946 229.866 135.469C229.973 135.408 230.079 135.344 230.185 135.275C230.375 135.151 230.578 134.987 230.787 134.798C231.528 134.161 232.38 133.088 232.85 132.151C233.245 131.365 233.514 130.603 233.677 129.767C233.826 129.025 233.895 128.225 233.895 127.307C233.895 125.938 233.746 124.841 233.404 123.809C233.276 123.365 233.125 122.95 232.951 122.577C232.447 121.498 231.828 120.51 231.573 120.385C231.314 120.256 231.555 119.642 232.114 119.001C232.665 118.369 233.289 117.848 233.502 117.848ZM119.197 131.63C119.15 134.998 119.275 135.884 119.831 136.069C120.215 136.198 121.473 136.299 122.63 136.299C124.259 136.299 124.985 136.041 125.869 135.146C126.692 134.311 127.002 133.489 127.002 132.147C127.002 130.901 126.665 129.908 125.961 129.087C125.105 128.086 124.421 127.833 122.089 127.648L119.257 127.422L119.197 131.63ZM408.833 132.151C409.06 132.151 409.25 132.668 409.25 133.304C409.25 134.227 409.018 134.458 408.093 134.458C406.969 134.458 406.959 134.426 407.676 133.304C408.084 132.668 408.602 132.151 408.833 132.151ZM160.571 116.924C162.976 116.924 165.021 117.127 165.115 117.372C165.208 117.616 164.583 118.138 163.727 118.525C162.793 118.95 162.084 119.647 161.964 120.27C161.853 120.842 161.622 123.693 161.46 126.614C161.293 129.534 160.969 132.385 160.738 132.958C160.498 133.549 159.919 133.997 159.391 133.997C158.697 133.997 158.545 133.798 158.79 133.189C158.966 132.745 159.188 129.889 159.285 126.845C159.378 123.799 159.336 120.842 159.192 120.27C159.035 119.656 158.267 118.95 157.309 118.539C156.416 118.156 155.805 117.639 155.944 117.386C156.084 117.127 158.134 116.924 160.571 116.924ZM77.0289 0.00258675C80.9795 -0.0251179 85.984 0.172935 88.1643 0.442371C90.3367 0.706248 94.1919 1.34417 96.7414 1.85725H96.7409C99.2941 2.36648 103.259 3.40677 105.559 4.16657C107.86 4.92225 111.619 6.46766 113.918 7.59789C116.218 8.72872 119.153 10.5806 120.446 11.7154C121.737 12.8484 123.52 15.0035 124.42 16.5089L124.421 16.5093C125.316 18.0117 126.425 20.3897 126.889 21.8017C127.354 23.2165 127.861 25.939 128.015 27.8532L128.053 28.3596C128.132 29.5057 128.139 30.4155 128.046 31.3102C127.94 32.3329 127.704 33.3283 127.311 34.6288C126.77 36.4229 125.568 39.1402 124.637 40.6799C123.705 42.2135 121.971 44.5959 120.779 45.9848L120.779 45.9853C119.579 47.3728 116.931 49.9004 114.889 51.6035C112.846 53.3116 109.405 55.8508 107.232 57.2544L107.232 57.2548C105.06 58.652 101.518 60.6868 99.344 61.7707C97.1754 62.8518 93.7384 64.4593 91.6984 65.3425C89.7351 66.1924 86.0979 67.6103 79.1347 70.102L81.6916 70.4766H81.6911C83.4892 70.7378 86.0872 71.3367 87.6761 71.8484L87.9797 71.949L87.9801 71.9494C89.5205 72.4847 91.7262 73.5164 92.8875 74.257C94.0489 74.998 95.8224 76.5068 96.839 77.623C97.8597 78.7442 99.2057 80.809 99.8447 82.2237C100.48 83.6292 101.105 86.0502 101.531 90.4018L104.792 90.393L105.024 90.3926V90.6251L106.528 90.6334C107.481 90.6334 108.73 90.7395 109.304 90.8641C109.832 90.9758 110.093 91.1091 110.223 92.2428C110.234 91.2439 110.254 90.0599 110.28 88.6586C110.405 82.1084 110.654 79.0271 111.242 76.9493C111.681 75.416 112.693 72.606 113.496 70.6944C114.303 68.7768 116.014 65.7167 117.305 63.8863C117.95 62.9708 118.693 62.0277 119.372 61.2447C120.045 60.4677 120.671 59.83 121.08 59.5397L121.309 59.3824C121.834 59.035 122.302 58.8232 122.972 58.7184C123.72 58.6017 124.714 58.6183 126.32 58.6991C128.58 58.8149 131.063 59.2754 132.638 59.8817C134.064 60.4326 136.015 61.5137 138.715 63.6823L138.906 63.8355L138.741 64.0168L136.747 66.2085V66.209C135.657 67.4059 133.765 69.7388 132.547 71.3814C131.341 73.0144 129.455 76.2217 128.363 78.4955C127.273 80.7749 126.049 83.7759 125.647 85.1518C125.24 86.5278 124.911 88.6374 124.916 89.8153V89.8158C124.917 90.3658 124.918 90.7663 124.942 91.0612C124.966 91.3638 125.012 91.5087 125.066 91.5826C125.104 91.6361 125.167 91.6795 125.345 91.6947C125.533 91.7113 125.792 91.6924 126.175 91.6628H126.175C126.524 91.6365 126.813 91.6204 127.044 91.6393C127.277 91.6587 127.486 91.7164 127.65 91.8645C127.725 91.9323 127.783 92.014 127.829 92.1049C127.943 91.0118 128.817 90.2011 132.786 86.5545C135.294 84.2558 137.48 82.3169 137.997 81.9247C137.954 81.8781 137.911 81.8301 137.867 81.7821L137.71 81.61L137.883 81.4545L140.46 79.1475L140.867 78.7802C141.766 77.9547 142.343 77.3318 142.842 76.5414C143.416 75.6329 143.893 74.4923 144.622 72.5479L144.798 72.0856C145.705 69.7319 147.021 66.8047 147.83 65.3642C148.689 63.829 150.583 61.019 152.04 59.1079L152.04 59.1074C153.502 57.2009 155.868 54.4208 157.309 52.9323C158.752 51.442 161.188 49.3333 162.727 48.2356C164.259 47.1379 166.403 45.8017 167.501 45.2544C168.595 44.7087 170.277 44.0654 171.249 43.8206C172.234 43.5726 174.639 43.4169 176.596 43.4677C177.573 43.4932 178.488 43.5427 179.173 43.602C179.516 43.6316 179.805 43.6642 180.017 43.6976C180.123 43.7141 180.215 43.7318 180.287 43.7507C180.322 43.7601 180.359 43.7712 180.391 43.7845C180.417 43.795 180.469 43.8185 180.512 43.8643L180.516 43.8679C180.559 43.917 180.578 43.9788 180.586 44.0031C180.597 44.0392 180.607 44.0832 180.616 44.131C180.636 44.228 180.656 44.3636 180.678 44.5397C180.702 44.7377 180.729 44.9932 180.759 45.3129C180.827 44.0738 181.024 44.046 181.758 44.2842C182.309 44.4596 183.906 45.1887 185.303 45.8992C186.705 46.6142 188.56 47.8836 189.435 48.7229C190.304 49.5626 191.521 50.9796 192.132 51.8655C193.048 53.1944 193.201 53.8547 192.983 55.5568C192.798 57.0426 192.007 58.6857 190.203 61.3245C188.819 63.3547 186.927 66.783 186.001 68.9378C185.076 71.0963 184.179 73.0199 184.003 73.2151C183.827 73.4084 182.957 73.0901 182.064 72.5041C181.176 71.9181 179.982 70.6127 179.412 69.6115C178.825 68.5779 178.376 66.9814 178.371 65.9386C178.362 64.4206 178.732 63.6449 180.472 61.5552C181.638 60.1617 183.096 58.0346 183.716 56.8257C184.336 55.6219 184.683 54.3987 184.493 54.1075C184.294 53.8081 183.558 53.6923 182.758 53.8399C181.828 54.0097 181.518 54.0466 181.309 53.3111C181.321 53.5123 181.334 53.7186 181.347 53.9281L181.355 54.078L181.221 54.1468L178.343 55.6228L178.343 55.6233C176.775 56.4303 174.045 58.2889 172.286 59.7483C170.53 61.2115 167.865 63.8595 166.374 65.6253C164.883 67.393 162.636 70.4983 161.388 72.5193C160.14 74.5412 158.512 77.6451 157.772 79.4082C157.034 81.1699 156.155 84.1072 155.83 85.9215C155.356 88.5128 155.353 89.6234 155.765 91.1258C155.997 91.9697 156.118 92.5326 156.082 92.9779C156.067 93.1541 156.028 93.3101 155.966 93.4545C156.251 93.3147 156.413 93.5154 156.791 94.0848C157.125 94.5923 158.11 95.3029 158.975 95.6628C160.081 96.1196 161.65 96.2442 164.25 96.0827C167.109 95.9028 168.687 95.5106 171.19 94.3616C172.972 93.5449 176.095 91.7634 178.131 90.4027C180.167 89.0462 182.98 86.8868 184.377 85.6086C185.688 84.414 186.864 83.4169 187.115 83.284C187.078 83.2467 187.042 83.2088 187.005 83.171L186.842 83.0017L187.014 82.842L191.225 78.92L191.736 78.4388C194.252 76.0366 196.223 73.6964 197.52 71.5854L197.995 70.819C199.187 68.9198 200.897 66.3234 202.057 64.6531C203.384 62.7466 205.798 59.5716 207.426 57.5972L207.745 57.2179C209.404 55.28 211.959 52.7658 213.634 51.4443C215.412 50.0411 218.02 48.2785 219.434 47.5273C220.845 46.7771 223.157 45.8521 224.572 45.4688C225.974 45.0891 227.767 44.7603 228.56 44.7411C228.965 44.7314 229.643 44.8075 230.399 44.9322C231.16 45.0578 232.017 45.2357 232.788 45.4359H232.787C234.331 45.8324 236.534 46.707 237.703 47.3885C238.875 48.0663 241.134 49.8852 242.736 51.436C243.543 52.2121 244.275 53.0112 244.806 53.6743C245.071 54.0051 245.29 54.3064 245.443 54.5565C245.518 54.6811 245.581 54.7983 245.625 54.9021C245.656 54.9759 245.684 55.0571 245.694 55.1365L245.699 55.2154C245.687 55.7548 245.282 56.1941 244.754 56.2517L244.646 56.2582C244.451 56.26 244.073 56.3205 243.611 56.4248C243.154 56.5277 242.633 56.6684 242.162 56.823L242.161 56.8234C241.686 56.9757 241.258 57.1409 240.951 57.2816C240.847 57.3296 240.759 57.3748 240.69 57.4131C240.801 57.4906 240.958 57.5903 241.153 57.7047C241.576 57.9525 242.163 58.2649 242.811 58.5791H242.811C243.594 58.9598 244.557 59.6311 246.114 61.0246C247.673 62.419 249.837 64.5484 253.024 67.8549L253.193 68.0297L253.008 68.1889L251.736 69.2876L251.735 69.2871C251.587 69.4158 251.32 69.754 250.955 70.2842C250.596 70.8061 250.157 71.4922 249.667 72.2946C248.688 73.8998 247.511 75.9656 246.375 78.1028C244.781 81.0993 243.738 83.171 243.072 84.713C242.406 86.2546 242.125 87.254 242.047 88.1072C241.956 89.1149 241.944 89.6682 242.041 90.0299C242.118 90.3127 242.266 90.4867 242.576 90.6837L242.719 90.77C242.942 90.8992 243.135 91.0376 243.291 91.2171C243.449 91.3984 243.563 91.6125 243.642 91.8792C243.658 91.9323 243.673 91.9886 243.686 92.0472C243.775 91.3255 243.958 91.0856 244.297 91.0856C244.681 91.0852 246.592 89.789 248.55 88.2018C250.502 86.6191 256.485 80.8053 261.842 75.2822C267.195 69.7656 271.843 65.2493 272.165 65.2465C272.207 65.2465 272.26 65.2613 272.323 65.2894C272.215 65.1459 272.122 65.0153 272.049 64.9004C271.971 64.7805 271.909 64.6693 271.87 64.5747C271.85 64.5276 271.833 64.4755 271.825 64.4238C271.817 64.3754 271.814 64.2983 271.851 64.2217C271.843 64.2383 271.849 64.2369 271.848 64.1973C271.847 64.1608 271.841 64.1082 271.825 64.0399C271.795 63.9029 271.735 63.7215 271.648 63.5088C271.473 63.0843 271.2 62.5532 270.868 62.0231V62.0235C270.137 60.8576 269.602 59.3243 269.602 58.3249C269.6 57.8122 269.772 57.0684 270.051 56.2485C270.333 55.4212 270.731 54.4924 271.197 53.6041C272.188 51.7119 274.121 49.2475 276.286 47.0881C277.248 46.1308 278.384 45.1318 279.439 44.2937C280.49 43.4589 281.476 42.7717 282.137 42.4485C283.419 41.8205 285.409 41.0486 286.573 40.7349C287.742 40.4202 289.371 40.1455 291.72 40.0991L291.955 40.0946V40.2662L293.718 40.5515C294.787 40.7268 296.54 41.267 297.623 41.7514C298.705 42.2356 299.538 42.8214 299.474 43.0523C299.41 43.2805 298.246 44.6166 294.43 48.5508L294.579 48.6638L294.463 48.8433L292.927 51.2242L292.927 51.2237C292.509 51.8738 292.102 52.5683 291.783 53.1612C291.459 53.7633 291.241 54.2377 291.184 54.4601L291.184 54.4619C291.059 54.9362 291.027 55.7317 291.109 56.2074L291.129 56.2748C291.158 56.3523 291.217 56.4621 291.316 56.6015C291.442 56.781 291.619 56.99 291.835 57.2142C292.267 57.6627 292.845 58.1611 293.463 58.5985H293.463C294.729 59.4973 297.084 61.4754 298.699 63.0027C299.506 63.7658 300.241 64.5013 300.773 65.0698C301.039 65.3535 301.257 65.599 301.409 65.7873C301.485 65.8805 301.548 65.9645 301.592 66.0341C301.614 66.0683 301.636 66.1052 301.651 66.1403C301.664 66.1675 301.689 66.2265 301.686 66.2953C301.683 66.3424 301.669 66.3857 301.659 66.412C301.648 66.4429 301.633 66.4762 301.617 66.5089C301.585 66.5754 301.539 66.6557 301.485 66.7461C301.376 66.9279 301.222 67.1646 301.034 67.4382C300.658 67.9864 300.142 68.6923 299.578 69.4241C298.451 70.8864 296.264 73.539 294.716 75.3178C293.275 76.9696 291.303 79.8654 290.177 81.9603L289.964 82.3672C289.102 84.0615 288.621 85.1039 288.351 86.0502C288.084 86.9896 288.022 87.8465 288.022 89.1749C288.022 90.453 288.057 91.1885 288.166 91.6162C288.22 91.8248 288.285 91.9342 288.35 91.9964C288.412 92.0555 288.496 92.0947 288.636 92.1169L288.708 92.1243C288.893 92.1339 289.193 92.0947 289.557 92.0038C289.963 91.9028 290.416 91.7464 290.815 91.559C291.231 91.3648 291.623 91.1894 291.919 91.063C292.067 91.0002 292.193 90.9481 292.287 90.9121C292.334 90.8941 292.376 90.8798 292.409 90.8688C292.426 90.8637 292.444 90.8581 292.461 90.854C292.471 90.8517 292.508 90.8429 292.55 90.8457C292.636 90.8521 292.689 90.901 292.712 90.926C292.735 90.9518 292.749 90.9786 292.755 90.9929C292.769 91.0224 292.778 91.0533 292.782 91.075C292.793 91.1207 292.802 91.1797 292.81 91.2439C292.812 91.2679 292.814 91.2946 292.817 91.3223C293.036 90.6237 293.565 90.2528 294.861 89.3738C296.064 88.5617 298.285 86.6422 299.793 85.1103C301.401 83.4829 302.275 82.758 302.921 82.5942C302.916 82.591 302.911 82.5878 302.906 82.5845C302.835 82.5319 302.765 82.46 302.727 82.3612C302.688 82.2597 302.692 82.1559 302.719 82.0613C302.768 81.8897 302.903 81.7019 303.08 81.4924C303.264 81.2746 303.524 80.9996 303.86 80.6503L304.216 80.2715C305.186 79.2296 307.075 77.1343 308.734 75.2453C310.622 73.0961 314.021 68.5419 316.275 65.1196C319.3 60.5396 321.707 57.5603 325.305 53.9585C329.267 49.989 330.885 48.7122 333.729 47.3345C334.692 46.8689 335.803 46.413 336.816 46.0537C337.825 45.6959 338.754 45.4273 339.349 45.3432C340.818 45.1387 342.312 45.3168 344.08 45.8875H344.081C346.08 46.5381 347.331 47.4041 352.256 52.3782L353.123 50.2783V50.2778C353.678 48.9333 356.047 44.098 358.383 39.5331C360.721 34.9622 364.244 28.5205 366.218 25.2158C368.187 21.9138 370.958 17.6525 372.381 15.738L372.931 15.0062C374.258 13.2653 375.828 11.3494 376.642 10.4889C377.564 9.50828 378.919 8.36882 379.666 7.95475C380.393 7.54548 381.553 7.05338 382.262 6.85391L382.263 6.8535C382.609 6.75798 382.976 6.66593 383.289 6.59529C383.596 6.52608 383.869 6.47352 384.016 6.46282L384.02 6.46236C384.11 6.45751 384.279 6.47569 384.481 6.50291C384.693 6.53152 384.967 6.57434 385.282 6.62819C385.915 6.73597 386.722 6.88902 387.55 7.06256C389.214 7.4101 391.318 8.06078 392.233 8.52159C393.136 8.97415 394.962 10.0399 396.303 10.9003C396.979 11.3321 397.595 11.7918 398.042 12.1863C398.265 12.3829 398.451 12.5684 398.583 12.7293C398.649 12.8093 398.706 12.8891 398.747 12.965C398.785 13.0358 398.823 13.129 398.82 13.2286C398.817 13.3291 398.771 13.4254 398.729 13.4971C398.682 13.5767 398.618 13.6643 398.542 13.7562C398.39 13.9408 398.176 14.1626 397.919 14.4059C397.469 14.8328 396.873 15.3378 396.214 15.8434L395.928 16.0596C394.422 17.1885 391.58 20.0469 389.624 22.4117L389.625 22.4122C387.672 24.7825 384.341 29.2388 382.229 32.3163L382.229 32.3159C380.122 35.3943 376.705 40.7156 374.643 44.14C372.582 47.5643 369.383 53.2678 367.534 56.816C365.686 60.3648 363.241 65.5492 362.102 68.3324C360.961 71.1189 359.511 75.1581 358.88 77.3078C358.289 79.3214 357.599 82.5356 357.284 84.6987L357.226 85.1168C357.075 86.2652 356.988 87.38 356.967 88.3061C356.949 89.1237 356.983 89.7757 357.062 90.1748L357.099 90.3303V90.3307C357.267 90.9264 357.405 91.1973 357.614 91.3458C357.829 91.499 358.167 91.5581 358.855 91.565H358.856C359.221 91.571 359.525 91.5839 359.774 91.6319C360.029 91.6808 360.244 91.7703 360.422 91.9378C360.47 91.9826 360.513 92.0324 360.554 92.086C360.514 91.924 360.474 91.7565 360.435 91.5839L364.136 87.685C365.867 85.861 367.558 84.3116 368.259 83.8793C368.223 83.8696 368.188 83.859 368.155 83.8465C368.087 83.8197 368.016 83.7824 367.958 83.7293C367.907 83.6822 367.854 83.6098 367.841 83.5148L367.838 83.4718L367.841 83.4345C367.846 83.3989 367.856 83.3689 367.861 83.356C367.871 83.3302 367.883 83.3016 367.896 83.2734C367.923 83.2167 367.961 83.1442 368.008 83.0616C368.1 82.8951 368.233 82.6718 368.394 82.4092C368.718 81.8832 369.164 81.1906 369.654 80.4602C370.627 79.0063 372.282 76.361 373.335 74.5873C374.374 72.8298 375.973 69.1095 376.881 66.3285C377.791 63.5277 379.383 59.6703 380.419 57.7541C381.45 55.8448 383.164 53.1524 384.234 51.7746C385.307 50.3927 387.329 48.2282 388.735 46.9557C390.14 45.6848 392.235 44.0955 393.401 43.4159L393.402 43.4155C394.492 42.7841 396.582 41.8436 398.212 41.2503L398.531 41.1364C399.735 40.7138 400.681 40.4538 401.678 40.3194C402.675 40.1852 403.713 40.1777 405.098 40.2518C407.06 40.3543 409.831 40.8747 411.41 41.4419C412.951 41.9959 414.956 43.0351 415.872 43.7719C416.789 44.5053 418.102 46.1365 418.803 47.4069C419.565 48.7801 420.236 50.9487 420.815 55.537L420.849 55.7977L420.584 55.7968L420.355 55.7949L420.364 59.1328C420.368 61.6013 420.012 63.9592 419.207 66.7461C418.564 68.9701 417.194 72.9152 416.158 75.5129C415.121 78.1153 413.761 81.1791 413.137 82.3188C412.512 83.4617 412.004 84.4482 412.012 84.5105C412.025 84.5723 413.019 83.9595 414.224 83.1493C415.431 82.3372 417.537 80.6254 418.902 79.3427C420.262 78.0599 423.075 74.9823 425.148 72.4953C427.318 69.8929 429.553 67.692 430.418 67.3044C431.246 66.9353 432.806 66.6861 433.884 66.7461C435.188 66.8259 435.893 67.0954 435.998 67.5536C436.08 67.9384 433.355 71.5692 429.941 75.6283C426.527 79.6887 422.613 83.9706 421.234 85.1472C419.86 86.3192 417.486 88.026 415.959 88.9442C414.432 89.8624 411.757 90.979 410.018 91.4266C407.538 92.0633 406.284 92.7236 404.234 94.4724C402.795 95.6997 400.472 97.49 399.07 98.4451C397.673 99.4003 395.642 100.627 394.559 101.172C393.477 101.716 392.385 102.16 392.13 102.16C392.043 102.16 391.965 101.988 391.898 101.676V102.807L391.716 102.846L389.286 103.363C387.926 103.654 385.531 103.812 383.949 103.714V103.713C382.815 103.646 381.975 103.528 381.215 103.281C380.451 103.033 379.778 102.66 378.972 102.099L378.972 102.099C377.535 101.093 376.425 99.726 375.345 97.6321C374.692 96.3711 374.287 95.4436 374.018 94.3866C373.751 93.3327 373.622 92.1584 373.511 90.4078C373.402 88.6669 373.306 87.6569 373.167 87.0976C373.096 86.8152 373.023 86.6911 372.969 86.6394C372.935 86.6081 372.894 86.5887 372.787 86.6099L372.784 86.6108C372.624 86.6399 372.442 86.6025 372.27 86.5425C372.407 86.6676 372.55 86.7977 372.696 86.9329L370.665 89.8167C369.546 91.404 367.672 93.7941 366.501 95.123C365.326 96.4565 364.109 97.5542 363.789 97.5638C363.728 97.5648 363.653 97.5486 363.569 97.5191C363.656 97.6109 363.746 97.7046 363.839 97.7987L364.04 98.0026L363.797 98.1554L360.79 100.042C359.127 101.092 356.71 102.257 355.41 102.639H355.41C354.128 103.011 352.387 103.322 351.526 103.318C351.094 103.315 350.586 103.254 350.114 103.158C349.644 103.062 349.192 102.927 348.88 102.771C348.351 102.508 347.384 101.786 346.586 101.074L346.256 100.772C345.136 99.7122 344.39 98.2975 343.695 95.9969L343.695 95.9964C343.274 94.591 343.035 93.58 342.933 92.3144C342.832 91.0552 342.866 89.5482 342.982 87.1525C343.135 84.0029 343.636 80.1907 344.137 78.3363C344.52 76.9327 344.712 76.098 344.747 75.4566C344.769 75.0732 344.733 74.7562 344.643 74.4226C344.51 75.3662 343.528 76.7864 340.46 80.8192C337.998 84.0583 334.482 88.4694 332.645 90.6242C330.856 92.7319 328.913 94.9052 327.241 96.5012C327.257 96.5178 327.272 96.5344 327.288 96.551L327.449 96.7199L327.278 96.8791L324.469 99.4856C323.691 100.209 322.79 100.958 321.967 101.582C321.148 102.203 320.39 102.712 319.9 102.944C318.942 103.398 317.463 103.77 316.592 103.765C315.723 103.76 314.181 103.366 313.143 102.895C312.095 102.42 310.602 101.316 309.809 100.425V100.425C309.012 99.5401 307.99 97.8744 307.527 96.707V96.7065C306.852 95.0224 306.72 93.6704 306.887 90.3815C306.945 89.2349 307.042 88.0873 307.153 87.1618C307.209 86.6994 307.269 86.2897 307.328 85.9621C307.387 85.6432 307.449 85.3807 307.516 85.2261L307.607 85.0037C307.612 84.9927 307.615 84.9811 307.619 84.9705C307.494 85.0273 307.355 85.0406 307.22 85.03C307.059 85.0171 306.885 84.97 306.707 84.899C306.632 84.8685 306.555 84.8326 306.476 84.7929C306.655 84.9567 306.845 85.1311 307.044 85.318L301.005 91.201C297.684 94.4396 294.704 97.0877 294.384 97.0932C294.217 97.0955 293.995 97.0249 293.773 96.9114C293.821 96.9898 293.86 97.0692 293.884 97.1504C293.951 97.3687 293.91 97.5758 293.775 97.7798C293.649 97.9685 293.438 98.1632 293.151 98.3861C292.86 98.6122 292.47 98.883 291.969 99.2217C290.748 100.048 288.596 101.191 287.185 101.768C285.548 102.439 283.603 102.833 281.893 102.842H281.892C280.411 102.847 278.397 102.526 277.406 102.113C276.443 101.712 275.24 101.027 274.732 100.574C274.468 100.338 274.14 99.9143 273.825 99.4349C273.506 98.9509 273.189 98.3912 272.95 97.8721L272.95 97.8716C272.38 96.6304 272.077 94.859 272.068 92.8168V92.8164C272.064 91.0861 272.394 88.0574 272.799 86.0788C273.208 84.104 274.013 81.3341 274.594 79.924C275.172 78.5181 276.307 76.3236 277.12 75.0432C277.519 74.4143 277.881 73.7794 278.141 73.2645C278.271 73.007 278.375 72.7818 278.445 72.6047C278.48 72.5165 278.505 72.4418 278.521 72.3841C278.529 72.3555 278.535 72.332 278.538 72.314C278.539 72.3066 278.54 72.2997 278.54 72.2946C278.54 72.2932 278.539 72.2904 278.539 72.2881C278.532 72.2706 278.519 72.2438 278.499 72.2078C278.459 72.1354 278.396 72.039 278.31 71.9204C278.139 71.6837 277.888 71.3727 277.575 71.0095C277.124 70.4868 276.548 69.8606 275.908 69.1967C275.973 69.3009 276.01 69.3715 276.01 69.3992C276.001 69.5381 270.637 74.9468 264.087 81.4329C257.53 87.9249 250.543 94.4678 248.563 95.9674C245.97 97.9334 245.231 98.4696 244.758 98.2495C244.755 98.3478 244.72 98.4396 244.678 98.5162C244.631 98.5983 244.568 98.6809 244.495 98.7612C244.349 98.9218 244.143 99.0962 243.898 99.2743C243.406 99.6314 242.728 100.025 241.966 100.38C239.932 101.326 238.492 101.647 236.165 101.67H236.164C234.865 101.681 233.994 101.639 233.2 101.436C232.404 101.233 231.698 100.874 230.721 100.28L230.721 100.28C229.844 99.744 229.178 99.2309 228.61 98.6016C228.041 97.9727 227.577 97.2362 227.09 96.264C226.381 94.8447 225.669 92.5344 225.503 91.1119C225.339 89.6926 225.442 87.123 225.732 85.395C226.021 83.6726 226.662 81.0623 227.157 79.5918C227.611 78.2417 228.122 76.7592 228.343 76.1414C227.963 76.4427 227.298 77.0522 226.199 78.1015L225.944 78.3446L225.822 78.0152L225.696 77.6783C225.449 78.7027 223.958 80.4357 218.784 86.1254C214.801 90.5038 211.368 94.2915 211.15 94.5462C211.015 94.7049 210.753 94.6754 210.396 94.4742C210.566 94.6699 210.743 94.8743 210.926 95.0879L211.072 95.2563L210.908 95.4072L207.67 98.4064C205.887 100.06 203.637 101.952 202.67 102.617C201.94 103.119 201.391 103.426 200.792 103.573C200.194 103.719 199.566 103.699 198.693 103.592C197.407 103.436 196.111 102.908 195.076 102.124L194.873 101.964C193.954 101.214 192.71 99.6808 192.082 98.537C191.413 97.3156 190.858 95.3864 190.74 93.8716V93.8712C190.632 92.4629 190.734 90.4627 190.982 89.4176C191.09 88.9617 191.157 88.6489 191.145 88.3522C191.134 88.0721 191.049 87.7907 190.818 87.4146C190.564 87.9129 189.271 89.2847 187.732 90.6745C186.015 92.2248 182.735 94.7257 180.444 96.2299C178.154 97.7341 174.721 99.5618 172.81 100.291C170.903 101.02 168.09 101.864 166.563 102.164C164.999 102.473 161.663 102.635 158.929 102.529C155.195 102.386 153.534 102.104 151.757 101.315C150.105 100.579 149.633 100.367 149.627 99.679C149.593 99.7532 149.561 99.8206 149.529 99.876C149.502 99.9217 149.471 99.9687 149.435 100.007C149.408 100.037 149.337 100.107 149.229 100.115H149.225L149.221 100.115C149.153 100.118 149.097 100.091 149.078 100.082C149.05 100.069 149.022 100.052 148.997 100.035C148.946 100.001 148.886 99.954 148.821 99.8995C148.687 99.7888 148.513 99.6314 148.313 99.4404C147.91 99.0579 147.389 98.5305 146.845 97.9519C145.75 96.7845 144.433 94.89 143.911 93.7166C143.392 92.5488 142.854 90.5042 142.708 89.1491V89.1486C142.599 88.1201 142.464 87.4672 141.836 86.4876C141.771 86.387 141.7 86.2828 141.624 86.1743L139.611 87.9711C138.403 89.0462 135.798 91.4363 133.827 93.2773C131.857 95.1179 130.084 96.6313 129.894 96.641C129.842 96.6424 129.765 96.6147 129.673 96.5653C129.688 96.6216 129.698 96.6812 129.699 96.743C129.701 96.8717 129.667 96.9972 129.607 97.1204C129.492 97.3581 129.265 97.6229 128.936 97.9528C128.602 98.2873 128.138 98.7118 127.529 99.2697L127.529 99.2701C126.171 100.508 124.27 101.926 123.289 102.42L123.289 102.421C122.31 102.909 120.762 103.313 119.831 103.313C118.904 103.313 117.416 102.996 116.501 102.602V102.602C116.018 102.396 115.424 101.972 114.853 101.464C114.351 101.017 113.853 100.493 113.448 99.9706L113.281 99.7468C112.875 99.1848 112.419 98.6768 112.013 98.3132C111.81 98.1314 111.624 97.9888 111.467 97.8942C111.302 97.7941 111.2 97.7664 111.157 97.7664C111.05 97.7673 110.927 97.7576 110.809 97.7041C110.686 97.6474 110.589 97.5518 110.515 97.4222C110.44 97.2898 110.385 97.1117 110.343 96.8791C110.344 97.0927 110.345 97.3156 110.345 97.5454H105.024V97.7516L104.818 97.7742L100.762 98.2237L97.2452 103.555C95.0766 106.842 91.9121 110.804 89.2368 113.569C86.8063 116.08 83.0487 119.467 80.8712 121.1C78.6942 122.733 74.8325 125.103 72.2756 126.373C71.0009 127.006 69.7761 127.582 68.829 128C68.3556 128.209 67.9494 128.378 67.6398 128.496C67.4857 128.556 67.3525 128.603 67.2456 128.635C67.1512 128.664 67.048 128.69 66.9671 128.69V128.69C66.9666 128.69 66.9657 128.69 66.9647 128.69L66.9638 128.69V128.69C66.825 128.689 66.6936 128.634 66.5816 128.564C66.4669 128.491 66.354 128.391 66.2503 128.276C66.1957 128.216 66.1421 128.15 66.0902 128.079C66.0939 128.091 66.0981 128.103 66.1018 128.114C66.3378 128.783 65.8515 129.083 63.2655 129.858C61.5488 130.374 58.4765 131.132 56.4406 131.538C53.8588 132.05 51.4111 132.197 48.3434 132.026C45.9284 131.888 42.9069 131.459 41.6344 131.072C40.362 130.679 38.2891 129.673 37.0214 128.834C35.7583 127.994 34.0784 126.476 33.2917 125.461C32.5007 124.446 31.617 122.577 31.3208 121.308C30.9091 119.532 30.9184 118.47 31.3578 116.694C31.6725 115.425 32.6533 113.478 33.5416 112.361C34.4301 111.244 36.5124 109.321 38.1641 108.084C39.8206 106.847 43.2539 104.808 45.7987 103.553C48.3434 102.298 53.5997 100.222 57.4817 98.9481C61.3638 97.67 67.5038 96.0135 71.1314 95.266C74.7589 94.5231 77.9835 93.9002 78.3032 93.8818C78.4499 93.8753 78.5642 94.0091 78.6507 94.4968C78.6507 94.2878 78.6502 94.0733 78.6502 93.8536V93.6488L78.8548 93.6248L81.0521 93.3659C82.2602 93.2229 83.5632 93.0665 83.9408 93.0162H83.9412C84.0513 93.0014 84.1864 92.9128 84.3123 92.6212C84.4368 92.3319 84.5279 91.8926 84.5733 91.2937C84.6089 90.8097 84.5765 90.2154 84.4946 89.6506C84.4122 89.084 84.2822 88.564 84.1305 88.2225C83.9759 87.882 83.658 87.4082 83.261 86.9191C82.8659 86.4323 82.4032 85.9432 81.9697 85.5713L81.9692 85.5708C81.0975 84.8187 79.2485 83.6901 77.8613 83.069L77.8609 83.0686C76.5667 82.4853 73.8506 81.6654 71.6366 81.1869L71.2012 81.096C68.3121 80.5096 65.0159 80.2516 60.2574 80.247C56.5086 80.247 51.8358 80.4953 49.8823 80.797L49.8828 80.7975C48.9069 80.9507 47.9158 81.174 47.1075 81.4084C46.7036 81.5261 46.3482 81.6456 46.0648 81.7595C45.7755 81.8763 45.5804 81.9801 45.4815 82.0595C45.3784 82.1444 45.1984 82.3497 44.9541 82.6727C44.7142 82.9897 44.4246 83.4026 44.1047 83.883C43.4647 84.8427 42.7072 86.0664 41.9877 87.3196L41.9873 87.3191C40.731 89.5145 38.3798 93.9824 36.4299 97.8698L35.6233 99.4926C33.5663 103.678 30.8574 109.693 29.611 112.856C28.368 116.025 26.8305 120.48 26.1994 122.754C25.5653 125.038 24.929 127.472 24.7824 128.161L24.7819 128.162C24.6994 128.542 24.5408 128.891 24.3437 129.15C24.1548 129.399 23.8911 129.613 23.5891 129.613C23.5029 129.613 23.4101 129.589 23.3243 129.56C23.2345 129.529 23.1333 129.486 23.0252 129.433C22.8083 129.327 22.5468 129.175 22.2602 128.993C21.6859 128.627 20.9934 128.124 20.319 127.572L20.3186 127.572C18.9655 126.461 17.2306 124.537 16.4515 123.279V123.279C15.7781 122.19 15.4088 121.553 15.2293 120.528C15.0536 119.524 15.0593 118.145 15.0892 115.57C15.1357 111.378 15.4105 109.217 16.3693 105.675C17.0386 103.191 18.6062 98.6145 19.8531 95.4986C21.0996 92.3845 23.6041 86.6168 25.4191 82.6833C27.2348 78.7479 30.2543 72.7219 32.1215 69.2889L32.4879 68.6217C34.3951 65.1764 37.3756 60.1447 39.3475 57.0477C41.3175 53.9539 43.7952 50.2866 45.0671 48.5789L45.3048 48.2642C46.4731 46.7388 48.8857 43.728 50.668 41.5676C52.4485 39.4033 55.4833 36.0074 57.4072 34.0056L57.7737 33.6289C59.6328 31.7358 61.869 29.7202 62.9036 29.0148L62.9041 29.0144C64.0127 28.2632 66.0162 27.4215 67.3812 27.1295L67.3821 27.1291C68.7549 26.8401 71.0745 26.7371 75.205 27.1809L75.4123 27.2034L75.4113 27.4111L75.4109 27.4823L76.6699 27.7198C77.5027 27.8767 79.1268 28.3472 80.2697 28.7625C81.4167 29.1776 82.3514 29.7497 82.3518 30.0359C82.3514 30.3121 81.3908 31.4074 78.1103 34.376C78.1177 34.3832 78.1251 34.3909 78.1325 34.3981L78.2958 34.559L78.1362 34.723L76.1142 36.7994C75.0056 37.9369 72.2802 41.046 70.05 43.7079C67.8235 46.366 64.5235 50.6202 62.7185 53.1524C60.9122 55.6865 57.9157 60.1497 56.0575 63.0631C55.1284 64.5193 54.2849 65.8833 53.676 66.9057C53.3711 67.417 53.1258 67.8415 52.9579 68.1488C52.8862 68.2798 52.8297 68.3887 52.789 68.4718C52.8959 68.4515 53.043 68.403 53.2124 68.3167C53.2836 68.2803 53.422 68.2254 53.6029 68.1589C53.7907 68.0893 54.0392 68.0011 54.3409 67.8973C54.9447 67.6897 55.7642 67.4174 56.74 67.0995C58.6912 66.4628 61.2708 65.6419 64.0062 64.7906C69.4758 63.0922 75.5057 61.0878 77.4079 60.3343C79.3064 59.5808 83.1551 57.8441 85.9517 56.4751C88.7417 55.1093 93.3141 52.5023 96.1065 50.6936C98.9026 48.8774 102.541 46.3129 104.185 44.9908L104.185 44.9903C105.829 43.6723 108.344 41.3718 109.762 39.8846C111.176 38.4051 112.877 36.1114 113.54 34.8041C114.269 33.362 114.745 31.6623 114.755 30.5229C114.764 29.29 114.41 28.0881 113.751 27.0745V27.0741C113.029 25.9731 111.674 24.9853 108.854 23.5792C106.7 22.5009 103.389 21.2294 101.497 20.7544H101.497C99.5985 20.2721 96.275 19.6138 94.1165 19.2918C91.9686 18.9761 86.1585 18.7127 81.1951 18.7173C75.1532 18.7219 70.3577 18.985 66.6529 19.5135C63.6042 19.9511 58.9281 20.7986 56.2606 21.4015L56.2602 21.4019C53.5946 21.9997 49.2355 23.252 46.5685 24.1767C43.9017 25.1016 39.8519 26.7551 37.5699 27.8446C35.2898 28.9333 31.5508 31.0549 29.2684 32.5538C26.9837 34.0543 23.5563 36.5372 21.6515 38.0642C19.7552 39.5834 16.561 42.5698 14.5587 44.6907L14.5592 44.6911C13.5614 45.7527 12.5311 46.9372 11.675 47.9897C10.8158 49.0458 10.1421 49.9567 9.8495 50.4772L9.84996 50.4776C9.54319 51.0281 9.19589 51.5338 8.88116 51.9057C8.72431 52.0912 8.57073 52.2485 8.43068 52.3625C8.36071 52.4192 8.28955 52.4691 8.21918 52.506C8.1512 52.5415 8.06857 52.5729 7.97973 52.5757C7.88196 52.5784 7.7834 52.5401 7.70771 52.5046C7.62377 52.4649 7.52887 52.4086 7.428 52.3417C7.2253 52.207 6.97687 52.0146 6.70143 51.7816C6.14915 51.3151 5.47064 50.6723 4.79774 49.9664L4.79728 49.9659C3.44632 48.5438 1.78773 46.1796 1.10428 44.6943C0.60225 43.6026 0.295384 42.794 0.136855 41.9668C-0.0217469 41.1387 -0.0294398 40.3033 0.047388 39.1609C0.179494 37.186 0.722515 35.3567 1.84216 33.077C3.05248 30.5977 4.53608 28.7167 7.89251 25.365C10.4602 22.7998 14.1968 19.6979 16.7521 18.0085C19.1787 16.4045 24.2919 13.5707 28.1144 11.7087C31.9405 9.84493 38.1964 7.28935 42.0239 6.02166C45.8476 4.75527 51.58 3.17941 54.774 2.51738L56.0311 2.26143C59.0961 1.65281 62.9679 0.982583 65.2009 0.682988L65.7113 0.618104C68.4181 0.297855 73.3241 0.0285863 77.0289 0.00258675ZM176.821 116.925C180.786 116.925 182.026 117.063 181.911 117.501C181.823 117.82 181.356 118.147 180.87 118.231C180.38 118.318 179.718 118.733 179.394 119.153C179.075 119.578 178.811 121.014 178.825 124.769V130.306H174.198V122.692C174.198 121.549 173.99 120.099 173.735 119.462C173.458 118.77 172.902 118.309 172.347 118.309C171.839 118.309 171.324 118.152 171.2 117.963C171.079 117.774 171.112 117.46 171.279 117.271C171.442 117.082 173.935 116.925 176.821 116.925ZM378.017 116.924C380.639 116.924 382.411 117.109 382.413 117.386C382.413 117.639 381.737 118.018 380.909 118.225C379.878 118.484 379.313 118.955 379.105 119.725C378.938 120.343 378.781 122.249 378.758 123.961C378.721 126.401 378.563 127.075 378.017 127.075C377.462 127.075 377.323 126.383 377.323 123.615C377.323 121.71 377.078 119.767 376.782 119.292C376.486 118.817 375.653 118.3 374.931 118.138C374.21 117.977 373.622 117.639 373.622 117.386C373.623 117.109 375.395 116.924 378.017 116.924ZM280.619 118.304V123.846H278.074C280.438 123.846 280.606 123.858 280.618 124.989L280.619 125.171V126.61C281.119 126.61 281.576 126.607 281.995 126.603C282.308 126.613 282.692 126.614 283.164 126.614C284.566 126.614 286.125 126.407 286.634 126.153C287.222 125.861 287.526 125.899 288.054 126.672C288.043 126.653 288.032 126.634 288.022 126.614C287.714 125.999 287.714 125.384 288.022 124.769C288.148 124.517 288.263 124.161 288.346 123.789C288.436 123.494 288.485 123.199 288.485 122.918C288.485 122.882 288.484 122.846 288.482 122.808C288.484 122.769 288.485 122.73 288.485 122.692C288.485 122.06 288.277 121.073 288.022 120.501C287.885 120.197 287.615 119.851 287.298 119.546C286.979 119.205 286.609 118.913 286.287 118.77C285.713 118.517 284.205 118.304 282.932 118.304H280.619ZM122.455 117.861C122.215 118.123 121.762 118.309 121.312 118.309C120.933 118.309 120.49 118.418 120.141 118.582C119.909 118.664 119.719 118.761 119.599 118.863C119.141 119.255 118.979 120.344 119.044 122.554L119.109 124.772L117.401 124.995C116.449 125.115 115.416 125.479 115.116 125.802C115.089 125.83 115.063 125.87 115.037 125.921C115.056 125.892 115.077 125.867 115.097 125.848C115.407 125.553 116.449 125.189 117.401 125.041C118.344 124.893 119.012 124.946 119.121 125.164L119.137 125.692C119.542 125.692 119.916 125.683 120.261 125.669C120.417 125.683 120.583 125.692 120.756 125.692C121.644 125.692 122.949 125.41 123.648 125.064C124.347 124.718 125.078 124.095 125.267 123.68C125.457 123.265 125.614 122.406 125.614 121.77C125.614 121.137 125.147 120.136 124.573 119.546C124 118.955 123.231 118.387 122.866 118.277C122.625 118.204 122.48 118.05 122.455 117.861ZM78.8816 102.621L76.6592 102.951C75.3109 103.112 74.0371 103.318 72.8665 103.539C70.4512 103.991 66.8051 104.794 64.7692 105.316C62.7334 105.837 59.1937 106.917 56.9033 107.72C55.0151 108.378 52.4281 109.453 50.5902 110.33C50.196 110.517 49.8402 110.692 49.5371 110.853C48.9662 111.154 48.3401 111.517 47.7187 111.899C46.4227 112.697 45.1472 113.585 44.4431 114.202C43.4066 115.111 42.1433 116.736 41.6344 117.806C41.0574 119.023 40.8775 119.709 41.0126 120.419C41.0465 120.597 41.0993 120.777 41.1717 120.967C41.4263 121.636 42.3656 122.595 43.2538 123.098C44.2348 123.657 46.058 124.104 47.8807 124.229C49.7269 124.353 52.2254 124.141 54.3585 123.671C56.2694 123.251 58.9762 122.388 62.9184 120.598L63.0869 120.77C63.0373 120.624 63.0313 120.47 63.1077 120.33C65.2333 119.145 67.7907 117.366 69.4379 115.91C71.2424 114.309 74.0098 111.549 75.5784 109.773C77.1511 107.996 79.0574 105.662 79.8162 104.582L81.1951 102.621C80.5325 102.636 79.8787 102.667 79.2365 102.71C79.2309 102.705 79.2249 102.7 79.2198 102.695C79.0588 102.542 78.9547 102.315 78.8807 101.998C78.8811 102.201 78.8816 102.409 78.8816 102.621ZM401.962 116.468C403.045 116.468 405.141 116.726 409.31 117.617L409 119.924C408.833 121.192 408.509 122.439 408.282 122.692C408.061 122.946 407.765 123.047 407.63 122.923C407.491 122.798 407.218 121.963 407.019 121.077C406.793 120.048 406.251 119.255 405.529 118.89C404.905 118.581 403.401 118.318 402.193 118.314C400.306 118.309 399.996 118.179 399.996 117.386C399.996 116.606 400.301 116.463 401.962 116.468ZM225.289 116.459C226.58 116.454 228.787 116.67 230.185 116.938C231.581 117.206 232.835 117.524 232.961 117.649C233.085 117.774 232.776 118.286 232.267 118.793C231.455 119.603 231.26 119.663 229.914 119.132C229.354 118.849 228.678 118.664 227.718 118.541C226.86 118.399 225.906 118.309 225.095 118.309C223.129 118.309 222.296 118.129 222.24 117.695C222.199 117.354 222.338 116.939 222.55 116.772C222.763 116.602 223.994 116.463 225.289 116.459ZM387.211 82.7802C387.054 82.7802 387.012 84.5982 387.128 86.8175C387.257 89.3369 387.628 91.4178 388.114 92.3545C388.854 93.7849 388.993 93.8449 391.089 93.6511C391.172 93.6428 391.259 93.6326 391.349 93.6201C391.451 93.6215 391.557 93.6229 391.667 93.6229H391.898V94.1688C392.05 93.7821 392.298 93.6617 392.708 93.5357C393.282 93.3558 394.564 92.7836 395.554 92.2668C396.548 91.7454 397.432 91.1087 397.525 90.8549C397.537 90.8198 397.536 90.7815 397.525 90.7396C397.612 90.4212 397.474 90.1628 397.219 90.1628C397.042 90.1628 396.256 89.7669 395.257 89.1934C395.037 89.0005 394.902 88.8104 394.902 88.6632C394.901 88.6507 394.903 88.636 394.905 88.6207L394.683 88.8588C394.417 88.701 394.142 88.5349 393.865 88.3633C392.273 87.3712 390.191 85.7102 389.238 84.672C388.285 83.6292 387.374 82.7806 387.211 82.7802ZM233.928 59.7188C233.775 59.728 232.304 60.4617 230.647 61.3522C228.991 62.2427 226.099 64.1622 224.211 65.611C222.328 67.0599 218.996 70.1329 216.808 72.4399C214.624 74.7424 211.696 78.2722 210.303 80.2839C208.91 82.2911 207.299 85.078 206.726 86.4715C206.152 87.865 205.68 89.3738 205.671 89.8167C205.666 90.2597 205.921 90.6196 206.24 90.6104C206.317 90.609 206.428 90.5794 206.561 90.5273C206.631 90.5688 206.708 90.6224 206.792 90.6874C206.951 90.8102 207.148 90.9823 207.387 91.2111C207.268 90.7068 207.644 90.1296 208.875 88.9294C208.907 88.899 208.94 88.8676 208.973 88.8348C209.129 88.6844 209.297 88.5243 209.479 88.354C210.816 87.1036 214.305 83.3754 217.229 80.0717C217.371 79.9116 217.513 79.7529 217.652 79.596C218.312 78.8623 219.004 78.0885 219.711 77.2954C221.112 75.7436 222.191 74.579 222.604 74.1762L222.519 74.1255C224.691 71.6606 226.767 69.2714 228.223 67.5536C231.128 64.1303 233.659 60.9604 233.849 60.517C234.039 60.0741 234.076 59.7142 233.928 59.7188ZM347.595 59.2435C347.275 59.2435 345.665 60.0233 344.013 60.9738C342.144 62.0535 338.979 64.7205 335.652 68.015C332.27 71.3602 329.281 74.8531 327.551 77.4739C326.042 79.7579 324.136 83.2877 323.312 85.318C322.489 87.3482 321.813 89.4753 321.808 90.0474C321.804 90.6196 322.058 91.0856 322.378 91.0856C322.456 91.0856 322.654 90.9578 322.948 90.7285C323.321 90.7008 323.644 90.7432 323.877 90.9896C323.909 91.0247 323.939 91.063 323.966 91.1031C324.1 90.1226 324.98 89.138 328.226 85.7471C330.593 83.2702 334.302 78.9523 336.613 75.9919C336.838 75.7095 337.055 75.434 337.263 75.1669C337.422 74.9611 337.583 74.7502 337.748 74.537C339.443 72.3813 340.855 70.7009 341.249 70.3779C341.205 70.3442 341.161 70.3091 341.116 70.275L341.029 70.2095C342.722 67.9425 344.295 65.7845 345.226 64.439C346.845 62.0909 348.173 59.9638 348.173 59.7096C348.173 59.4558 347.914 59.2481 347.595 59.2435ZM409.134 54.1911C408.306 54.2049 406.797 54.6525 405.779 55.1877C404.761 55.7183 402.776 57.3194 401.37 58.7401C399.935 60.189 398.089 62.741 397.164 64.5544C396.234 66.3816 395.267 69.187 394.947 71.0142C394.517 73.4412 394.504 74.9316 394.883 77.0125C395.161 78.5352 395.869 80.51 396.461 81.396C396.98 82.1827 398.189 83.2467 399.297 83.9199L399.138 84.0906L398.954 84.2867C399.402 84.1095 399.773 84.2807 400.51 84.6258C400.758 84.7426 400.966 84.8385 401.145 84.9101L401.92 85.318C402.082 85.1279 402.238 84.9359 402.393 84.7449C402.633 84.528 402.917 84.1893 403.318 83.703C404.053 82.8171 405.571 80.2193 406.695 77.9354C407.815 75.6514 409.398 71.8124 410.212 69.3992C410.883 67.405 411.319 65.713 411.591 63.9822C411.747 63.0594 411.854 62.1693 411.906 61.3245C411.935 60.8391 411.956 60.3971 411.967 59.9915C412.07 58.61 412.233 57.3716 412.4 56.6776C412.339 56.733 412.28 56.7819 412.222 56.8188C412.081 56.9102 411.903 56.966 411.717 56.8737C411.629 56.5346 411.519 56.2171 411.383 55.9029C410.735 54.4033 410.439 54.1772 409.134 54.1911ZM141.446 34.7726C142.085 34.7515 142.805 34.7725 143.452 34.8406C144.754 34.9775 146.659 35.5722 147.707 36.1708L147.708 36.1712C148.883 36.8476 149.963 37.9748 150.526 39.1262H150.526C151.191 40.4904 151.361 41.6197 151.182 43.3528C151.045 44.6469 150.492 46.5939 149.938 47.7004C149.385 48.8027 148.203 50.4287 147.294 51.3363C146.389 52.2379 144.968 53.3162 144.11 53.7412C143.25 54.1731 141.504 54.6253 140.214 54.7609L140.214 54.7614C139.282 54.862 138.562 54.8684 137.837 54.7323C137.115 54.5962 136.403 54.3212 135.485 53.8768C134.811 53.5506 134.136 53.1146 133.57 52.6596C133.008 52.2074 132.535 51.7216 132.281 51.2902C131.818 50.5039 131.323 49.1298 131.165 48.213L131.165 48.2116C131.084 47.7248 131.094 47.0465 131.171 46.3355C131.249 45.6204 131.396 44.8536 131.597 44.1856C131.985 42.8913 132.995 40.8218 133.843 39.5687L133.844 39.5682C134.274 38.9367 134.847 38.257 135.424 37.669C135.999 37.0837 136.592 36.5752 137.064 36.2969C137.963 35.7671 139.225 35.167 139.889 34.965C140.237 34.8558 140.814 34.7934 141.446 34.7726Z" fill="#2E2E2F"></path> </svg>`;
}, "/Users/timhilton/code/bicardobuilders/src/components/Logo.astro", void 0);

const $$Astro$1 = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navigation;
  const {
    links = [
      { label: "ABOUT", href: "/about" },
      { label: "PORTFOLIO", href: "/portfolio" },
      { label: "CONTACT", href: "/contact" }
    ],
    activePath = "",
    align = "center"
  } = Astro2.props;
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  const isActive = (href) => activePath === href || href !== "/" && activePath.startsWith(href + "/");
  return renderTemplate`${maybeRenderHead()}<nav class="nav" aria-label="Primary" data-astro-cid-526kr6un> <div class="nav__inner" data-astro-cid-526kr6un> <a href="/" class="nav__logo" data-astro-cid-526kr6un> ${renderComponent($$result, "Logo", $$Logo, { "width": 123, "height": 42, "color": "#2b5eba", "data-astro-cid-526kr6un": true, "data-astro-transition-scope": renderTransition($$result, "dcbqffur", "", "logo") })} </a> <button class="nav__toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="nav-menu" data-astro-cid-526kr6un> <span data-astro-cid-526kr6un></span> <span data-astro-cid-526kr6un></span> <span data-astro-cid-526kr6un></span> </button> <ul id="nav-menu" class="nav__list"${addAttribute(`justify-content:${justify}`, "style")} data-astro-cid-526kr6un> ${links.map((item) => renderTemplate`<li class="nav__item" data-astro-cid-526kr6un> <a${addAttribute([
    "nav__link",
    isActive(item.href) && "nav__link--active"
  ], "class:list")}${addAttribute(item.href, "href")}${addAttribute(
    isActive(item.href) ? "page" : void 0,
    "aria-current"
  )} data-astro-cid-526kr6un> ${item.label} </a> </li>`)} </ul> </div> </nav>  ${renderScript($$result, "/Users/timhilton/code/bicardobuilders/src/components/navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/timhilton/code/bicardobuilders/src/components/navigation.astro", "self");

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>Copyright &copy;${year} Bicardo Builders Inc. License #: R75643</p> </footer> `;
}, "/Users/timhilton/code/bicardobuilders/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title, description, activePath = Astro2.url.pathname } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "data-astro-cid-3zbxo6iv": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-wrapper" data-astro-cid-3zbxo6iv> ${renderComponent($$result2, "Navigation", $$Navigation, { "activePath": activePath, "align": "left", "data-astro-cid-3zbxo6iv": true })} <main class="page-main" data-astro-cid-3zbxo6iv> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-3zbxo6iv": true })} </div> ` })} `;
}, "/Users/timhilton/code/bicardobuilders/src/layouts/PageLayout.astro", void 0);

async function getStory(slug) {
  const token = "trrt3dZpCamA4qaTbje1kAtt";
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?version=draft&token=${token}`
    );
    const data = await res.json();
    return data?.story ?? null;
  } catch (e) {
    console.error("getStory error:", e);
    return null;
  }
}
async function getStories(options = {}) {
  const token = "trrt3dZpCamA4qaTbje1kAtt";
  try {
    const params = new URLSearchParams({
      version: process.env.NODE_ENV !== "production" ? "draft" : "published",
      token,
      ...Object.fromEntries(Object.entries(options).map(([k, v]) => [k, String(v)]))
    });
    const res = await fetch(`https://api.storyblok.com/v2/cdn/stories?${params}`);
    const data = await res.json();
    return data?.stories ?? [];
  } catch (e) {
    console.error("getStories error:", e);
    return [];
  }
}
function sbImage(url, width = 1200, quality = 85) {
  if (!url) return "";
  return `${url}/m/${width}x0/filters:quality(${quality})`;
}

export { $$PageLayout as $, getStories as a, bt as b, getStory as g, sbImage as s };
