import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_26r8Mtjg.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/timhilton/code/bicardobuilders/","cacheDir":"file:///Users/timhilton/code/bicardobuilders/node_modules/.astro/","outDir":"file:///Users/timhilton/code/bicardobuilders/dist/","srcDir":"file:///Users/timhilton/code/bicardobuilders/src/","publicDir":"file:///Users/timhilton/code/bicardobuilders/public/","buildClientDir":"file:///Users/timhilton/code/bicardobuilders/dist/","buildServerDir":"file:///Users/timhilton/code/bicardobuilders/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[{"type":"external","src":"/_astro/about.BxFx46RL.css"},{"type":"inline","content":".about[data-astro-cid-kh7btl4r]{padding-bottom:80px;grid-column:1/-1}.about__inner[data-astro-cid-kh7btl4r]{margin:0 auto;display:grid;grid-template-columns:repeat(12,1fr)}.about__heading[data-astro-cid-kh7btl4r]{font-family:Manrope,sans-serif;font-size:clamp(28px,4vw,42px);font-weight:300;letter-spacing:.05em;text-transform:uppercase;color:var(--color-brand-primary);margin:48px 0 32px;grid-column:1/-1}.about__hero[data-astro-cid-kh7btl4r]{width:100%;margin-bottom:48px}.about__hero-img[data-astro-cid-kh7btl4r]{width:100vw;margin-inline-start:calc(50% - 50vw);height:clamp(280px,45vw,520px);object-fit:cover;display:block;box-shadow:var(--shadow-image)}.about__hero--placeholder[data-astro-cid-kh7btl4r]{height:clamp(280px,45vw,520px);background:#d1d5db}@media(max-width:768px){.about__hero[data-astro-cid-kh7btl4r],.about__hero--placeholder[data-astro-cid-kh7btl4r]{display:none}.about__heading[data-astro-cid-kh7btl4r]{margin:32px 0 24px}}.about__body[data-astro-cid-kh7btl4r]{color:var(--color-text-primary);font-size:24px;line-height:34px;grid-column:1/-1;p{margin-bottom:12px}}.about__cta-wrap[data-astro-cid-kh7btl4r]{margin-top:48px;display:flex;justify-content:center;place-items:center;grid-column:1/-1}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[{"type":"inline","content":".contact[data-astro-cid-uw5kdbxl]{padding-bottom:80px;grid-column:1/-1}.contact__inner[data-astro-cid-uw5kdbxl]{max-width:900px;margin:0 auto;padding:0 24px}.contact__heading[data-astro-cid-uw5kdbxl]{font-size:clamp(28px,4vw,42px);font-weight:300;letter-spacing:.05em;text-transform:uppercase;color:var(--color-brand-primary);margin:48px 0 32px;text-align:center}.contact__hero[data-astro-cid-uw5kdbxl]{width:100vw;margin-inline-start:calc(50% - 50vw);margin-bottom:48px}.contact__hero-img[data-astro-cid-uw5kdbxl]{width:100%;height:150px;object-fit:cover;object-position:center 38%;display:block}.contact__hero--placeholder[data-astro-cid-uw5kdbxl]{height:150px;background:#d1d5db}.contact__phone[data-astro-cid-uw5kdbxl]{font-family:Manrope,sans-serif;text-align:center;font-size:32px;font-weight:300;margin:0 0 8px}.contact__phone[data-astro-cid-uw5kdbxl] a[data-astro-cid-uw5kdbxl]{color:var(--color-brand-primary);text-decoration:none}.contact__phone[data-astro-cid-uw5kdbxl] a[data-astro-cid-uw5kdbxl]:hover{text-decoration:underline}.contact__form-section[data-astro-cid-uw5kdbxl]{margin-bottom:56px}.contact__form-heading[data-astro-cid-uw5kdbxl]{font-family:Manrope,sans-serif;text-align:center;margin-top:48px;font-size:32px;font-weight:300;color:var(--color-brand-primary);letter-spacing:var(--tracking-1)}.contact__form-note[data-astro-cid-uw5kdbxl]{color:var(--color-text-primary);text-align:center;width:100%;font-size:16px;margin:0 0 24px}.contact__form[data-astro-cid-uw5kdbxl]{display:flex;flex-direction:column;gap:20px}.form__group[data-astro-cid-uw5kdbxl]{display:flex;flex-direction:column;gap:6px}.form__label[data-astro-cid-uw5kdbxl]{font-size:12px;font-weight:400;color:var(--color-text-primary);letter-spacing:.02em}.form__input[data-astro-cid-uw5kdbxl],.form__textarea[data-astro-cid-uw5kdbxl]{border:1px solid #c8dfe9;border-radius:6px;padding:10px 14px;font-size:16px;font-family:inherit;color:#111827;background:#e8f3fa;transition:border-color .14s ease,background .14s ease;width:100%;box-sizing:border-box}.form__input[data-astro-cid-uw5kdbxl]:focus,.form__textarea[data-astro-cid-uw5kdbxl]:focus{outline:none;border-color:#4892be;background:#d9ecf6;box-shadow:0 0 0 3px #4892be33}.form__textarea[data-astro-cid-uw5kdbxl]{resize:vertical}.form__submit-wrap[data-astro-cid-uw5kdbxl]{display:flex;justify-content:flex-start;align-self:center}.btn-pill[data-astro-cid-uw5kdbxl]{display:inline-block;background:var(--color-brand-secondary);color:var(--color-surface-background);box-shadow:var(--shadow-image);text-decoration:none;font-family:Manrope,sans-serif;font-size:24px;font-weight:300;letter-spacing:.05em;text-transform:uppercase;padding:12px 54px;border-radius:50px;margin-top:24px;border:none;cursor:pointer;font-family:inherit;transition:background .14s ease,transform .14s ease}.btn-pill[data-astro-cid-uw5kdbxl]:hover{background:#3a7aa8;transform:translateY(-1px)}.contact__hours-heading[data-astro-cid-uw5kdbxl],.contact__hours-list[data-astro-cid-uw5kdbxl]{font-size:24px;font-weight:400;line-height:34px;color:var(--color-text-primary);margin:0 0 16px;text-align:center}.contact__hours-list[data-astro-cid-uw5kdbxl]{list-style:none;padding:0;margin:0}@media(max-width:768px){.contact__heading[data-astro-cid-uw5kdbxl]{margin:32px 0 24px}.contact__form-section[data-astro-cid-uw5kdbxl],.contact__hours[data-astro-cid-uw5kdbxl]{text-align:center}.contact__form-section[data-astro-cid-uw5kdbxl]{margin-bottom:40px}.form__submit-wrap[data-astro-cid-uw5kdbxl]{justify-content:center}.contact__hours-list[data-astro-cid-uw5kdbxl]{display:inline-block;text-align:left}}\n"},{"type":"external","src":"/_astro/about.BxFx46RL.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[{"type":"external","src":"/_astro/about.BxFx46RL.css"},{"type":"external","src":"/_astro/_slug_.Bv5xf5ai.css"}],"routeData":{"route":"/portfolio/[slug]","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/([^/]+?)\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/portfolio/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[{"type":"external","src":"/_astro/portfolio.DWjoUY_X.css"},{"type":"external","src":"/_astro/about.BxFx46RL.css"}],"routeData":{"route":"/portfolio","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B5mYSlhR.js"}],"styles":[{"type":"external","src":"/_astro/about.BxFx46RL.css"},{"type":"external","src":"/_astro/index.5wUPs6T3.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/timhilton/code/bicardobuilders/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/timhilton/code/bicardobuilders/src/pages/contact.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contact@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/portfolio/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/timhilton/code/bicardobuilders/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro",{"propagation":"in-tree","containsHead":true}],["/Users/timhilton/code/bicardobuilders/src/components/navigation.astro",{"propagation":"in-tree","containsHead":false}],["/Users/timhilton/code/bicardobuilders/src/layouts/PageLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/portfolio@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/portfolio/[slug]@_@astro":"pages/portfolio/_slug_.astro.mjs","\u0000@astro-page:src/pages/portfolio@_@astro":"pages/portfolio.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DN3h9OSa.mjs","/Users/timhilton/code/bicardobuilders/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_pc59_C4M.mjs","/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro?astro&type=script&index=0&lang.ts":"_astro/_slug_.astro_astro_type_script_index_0_lang.BXNcZFee.js","/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro?astro&type=script&index=0&lang.ts":"_astro/portfolio.astro_astro_type_script_index_0_lang.CZeqyKNX.js","/Users/timhilton/code/bicardobuilders/src/components/home.astro?astro&type=script&index=0&lang.ts":"_astro/home.astro_astro_type_script_index_0_lang.V9_jcjPU.js","/Users/timhilton/code/bicardobuilders/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.C3dSM5go.js","/Users/timhilton/code/bicardobuilders/src/components/navigation.astro?astro&type=script&index=0&lang.ts":"_astro/navigation.astro_astro_type_script_index_0_lang.BGjQyybp.js","/Users/timhilton/code/bicardobuilders/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","astro:scripts/page.js":"_astro/page.B5mYSlhR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro?astro&type=script&index=0&lang.ts","function y(){const c=document.getElementById(\"lightbox\"),s=document.getElementById(\"lightbox-overlay\"),o=document.getElementById(\"lightbox-img\"),r=document.getElementById(\"lightbox-close\"),a=document.getElementById(\"lightbox-prev\"),m=document.getElementById(\"lightbox-next\"),n=Array.from(document.querySelectorAll(\".mosaic-img[data-lightbox-src]\")).map(e=>({src:e.dataset.lightboxSrc,alt:e.dataset.lightboxAlt??\"\"}));let t=0;function g(e){t=e,o.src=n[t].src,o.alt=n[t].alt,c.classList.add(\"is-open\"),s.classList.add(\"is-open\"),document.body.style.overflow=\"hidden\"}function i(){c.classList.remove(\"is-open\"),s.classList.remove(\"is-open\"),document.body.style.overflow=\"\"}function l(){t=(t-1+n.length)%n.length,o.src=n[t].src,o.alt=n[t].alt}function d(){t=(t+1)%n.length,o.src=n[t].src,o.alt=n[t].alt}document.querySelectorAll(\".mosaic-img[data-lightbox-src]\").forEach((e,u)=>{e.addEventListener(\"click\",()=>g(u))}),r.addEventListener(\"click\",i),s.addEventListener(\"click\",i),a.addEventListener(\"click\",l),m.addEventListener(\"click\",d),document.addEventListener(\"keydown\",e=>{c.classList.contains(\"is-open\")&&(e.key===\"ArrowLeft\"&&l(),e.key===\"ArrowRight\"&&d(),e.key===\"Escape\"&&i())})}document.addEventListener(\"astro:page-load\",y);"],["/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro?astro&type=script&index=0&lang.ts","function c(){window.innerWidth>768||document.querySelectorAll(\".region\").forEach(r=>{r.querySelectorAll(\".view-more-btn\").forEach(t=>t.remove());const o=Array.from(r.querySelectorAll(\".project-card\"));if(o.length<=2)return;o.forEach((t,n)=>{t.style.display=n>=2?\"none\":\"\"});const e=document.createElement(\"button\");e.className=\"view-more-btn\",e.textContent=\"VIEW MORE\",r.querySelector(\".project-grid\")?.after(e),e.addEventListener(\"click\",()=>{o.forEach(t=>t.style.display=\"\"),e.remove()})})}document.addEventListener(\"astro:page-load\",c);"],["/Users/timhilton/code/bicardobuilders/src/components/home.astro?astro&type=script&index=0&lang.ts","function n(){const e=Array.from(document.querySelectorAll(\".hero__img\"));if(e.length<=1)return;let o=0;setTimeout(()=>{e.forEach((t,r)=>{t.style.cssText=r===0?\"opacity: 1\":\"opacity: 0\"}),setInterval(()=>{const t=(o+1)%e.length;e[o].style.opacity=\"0\",e[t].style.opacity=\"1\",o=t},5e3)},300)}document.addEventListener(\"astro:page-load\",n);"],["/Users/timhilton/code/bicardobuilders/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const d=\"img:not(.nav-logo):not(.content__arrow)\";function m(){const r=window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches,o=Array.from(document.querySelectorAll(d));if(o.forEach(t=>{t.classList.remove(\"img-animate\"),t.style.removeProperty(\"--img-delay\")}),r||window.location.pathname===\"/\"){o.forEach(t=>{t.style.opacity=\"1\",t.style.transform=\"none\"});return}const c=window.innerHeight,n=[],s=[];o.forEach(t=>{const e=t.getBoundingClientRect(),i=Math.min(e.bottom,c)-Math.max(e.top,0);((e.height>0?i/e.height:0)>=.4?n:s).push(t)}),n.forEach((t,e)=>{t.style.setProperty(\"--img-delay\",`${e*60}ms`),t.classList.add(\"img-animate\")});const a=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add(\"img-animate\"),a.unobserve(e.target))})},{threshold:.4});s.forEach(t=>a.observe(t))}document.addEventListener(\"astro:page-load\",m);"],["/Users/timhilton/code/bicardobuilders/src/components/navigation.astro?astro&type=script&index=0&lang.ts","function a(){const e=document.querySelector(\".nav__toggle\"),t=document.querySelector(\"#nav-menu\");!e||!t||(e.onclick=()=>{const n=t.classList.toggle(\"is-open\");e.setAttribute(\"aria-expanded\",String(n)),e.setAttribute(\"aria-label\",n?\"Close navigation\":\"Open navigation\")},t.querySelectorAll(\".nav__link\").forEach(n=>{n.addEventListener(\"click\",()=>{t.classList.remove(\"is-open\"),e.setAttribute(\"aria-expanded\",\"false\"),e.setAttribute(\"aria-label\",\"Open navigation\")})}))}document.addEventListener(\"astro:page-load\",a);"]],"assets":["/_astro/BicardoBuilders.BDomlUkM.svg","/_astro/arrowsvg.DCoMyJen.svg","/_astro/about.BxFx46RL.css","/_astro/_slug_.Bv5xf5ai.css","/_astro/portfolio.DWjoUY_X.css","/_astro/index.5wUPs6T3.css","/favicon.ico","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","/_astro/page.B5mYSlhR.js","/fonts/Manrope-Bold.ttf","/fonts/Manrope-ExtraBold.ttf","/fonts/Manrope-ExtraLight.ttf","/fonts/Manrope-Light.ttf","/fonts/Manrope-Medium.ttf","/fonts/Manrope-Regular.ttf","/fonts/Manrope-SemiBold.ttf","/_astro/page.B5mYSlhR.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"kqJSElI+alygFqOPZuEavOdsTLDhWoGuYfMK4g6cLQA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
