import { g as getStory, b as bt, $ as $$PageLayout } from '../chunks/storyblok_KiBiFsmq.mjs';
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderTransition, u as unescapeHTML } from '../chunks/astro/server_26r8Mtjg.mjs';
import 'piccolore';
/* empty css                                 */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const story = await getStory("about");
  const content = story?.content;
  const heading = content?.heading ?? "ABOUT US";
  const heroImage = content?.hero_image?.filename ?? null;
  const bodyHtml = content?.body ? bt(content.body) : null;
  const ctaLabel = content?.cta_label;
  const ctaUrl = content?.cta_url;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "About | Bicardo Builders Inc", "description": "Learn about Bicardo Builders Inc, a family-owned general contracting firm with over 20 years of experience in the San Francisco Bay Area.", "data-astro-cid-kh7btl4r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="about" data-astro-cid-kh7btl4r> <div class="about__inner" data-astro-cid-kh7btl4r> <h1 class="about__heading" data-astro-cid-kh7btl4r${addAttribute(renderTransition($$result2, "6n4ujmqy", "", "page-heading"), "data-astro-transition-scope")}>${heading}</h1> </div> ${heroImage ? renderTemplate`<div class="about__hero" data-astro-cid-kh7btl4r> <img${addAttribute(heroImage, "src")} alt="Bicardo Builders project" class="about__hero-img" loading="lazy" data-astro-cid-kh7btl4r> </div>` : renderTemplate`<div class="about__hero about__hero--placeholder" aria-hidden="true" data-astro-cid-kh7btl4r></div>`} <div class="about__inner" data-astro-cid-kh7btl4r> <div class="about__body" data-astro-cid-kh7btl4r>${unescapeHTML(bodyHtml)}</div> <div class="about__cta-wrap" data-astro-cid-kh7btl4r> <a${addAttribute(ctaUrl, "href")} class="btn-pill" data-astro-cid-kh7btl4r>${ctaLabel}</a> </div> </div> </div> ` })} `;
}, "/Users/timhilton/code/bicardobuilders/src/pages/about.astro", "self");

const $$file = "/Users/timhilton/code/bicardobuilders/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
