import { g as getStory, b as bt, $ as $$PageLayout } from '../../chunks/storyblok_KiBiFsmq.mjs';
import { c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, f as createAstro, m as maybeRenderHead, b as addAttribute, d as renderTransition, u as unescapeHTML } from '../../chunks/astro/server_26r8Mtjg.mjs';
import 'piccolore';
/* empty css                                     */
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const story = await getStory(`portfolio/${slug}`);
  if (!story) return Astro2.redirect("/portfolio");
  const content = story.content ?? {};
  const body = content.body ?? [];
  const project = body.find((b) => b.component === "project") ?? {};
  const photoRows = project.images ?? [];
  const title = project.title ?? story.name ?? "Project";
  const projectType = project.project_type ?? "";
  const year = project.year ?? "";
  const descriptionHtml = project.description ? bt(project.description) : null;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": `${title} | Bicardo Builders Inc`, "description": `${title} \u2014 ${projectType} ${year}`.trim(), "activePath": "/portfolio", "data-astro-cid-xnl3yi4e": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="case-study" data-astro-cid-xnl3yi4e> <div class="case-study__inner" data-astro-cid-xnl3yi4e> <h1 class="case-study__title" data-astro-cid-xnl3yi4e${addAttribute(renderTransition($$result2, "qq6y3poa", "", "page-heading"), "data-astro-transition-scope")}> ${title.toUpperCase()} </h1> ${(projectType || year) && renderTemplate`<p class="case-study__subtitle" data-astro-cid-xnl3yi4e> ${[projectType, year].filter(Boolean).join(" \u2022 ")} </p>`} ${descriptionHtml && renderTemplate`<div class="case-study__description" data-astro-cid-xnl3yi4e>${unescapeHTML(descriptionHtml)}</div>`} ${photoRows.length > 0 ? renderTemplate`<div class="photo-mosaic" data-astro-cid-xnl3yi4e> ${photoRows.map((blok) => {
    if (blok.component === "photo_row_pair") {
      const classes = blok.layout?.[0] === "2-3" ? "" : "row-pair--reversed";
      return renderTemplate`<div${addAttribute(`row-pair ${classes}`, "class")} data-astro-cid-xnl3yi4e> ${blok.image_left?.filename && renderTemplate`<div class="photo-container" data-astro-cid-xnl3yi4e> <img${addAttribute(blok.image_left.filename, "src")}${addAttribute(blok.image_left.alt || title, "alt")} class="mosaic-img"${addAttribute(blok.image_left.filename, "data-lightbox-src")}${addAttribute(blok.image_left.alt || title, "data-lightbox-alt")} data-astro-cid-xnl3yi4e> </div>`} ${blok.image_right?.filename && renderTemplate`<div class="photo-container" data-astro-cid-xnl3yi4e> <img${addAttribute(blok.image_right.filename, "src")}${addAttribute(blok.image_right.alt || title, "alt")} class="mosaic-img"${addAttribute(blok.image_right.filename, "data-lightbox-src")}${addAttribute(blok.image_right.alt || title, "data-lightbox-alt")} data-astro-cid-xnl3yi4e> </div>`} </div>`;
    }
    if (blok.component === "photo_row_feature") {
      const reversed = blok.layout?.[0] === "feature-right";
      return renderTemplate`<div${addAttribute([
        "row-feature",
        reversed && "row-feature--reversed"
      ], "class:list")} data-astro-cid-xnl3yi4e> ${blok.image_main?.filename && renderTemplate`<div class="photo-container" data-astro-cid-xnl3yi4e> <img${addAttribute(blok.image_main.filename, "src")}${addAttribute(blok.image_main.alt || title, "alt")} class="mosaic-img"${addAttribute(blok.image_main.filename, "data-lightbox-src")}${addAttribute(blok.image_main.alt || title, "data-lightbox-alt")} data-astro-cid-xnl3yi4e> </div>`} <div class="feature-stack" data-astro-cid-xnl3yi4e> ${blok.image_top?.filename && renderTemplate`<div class="photo-container" data-astro-cid-xnl3yi4e> <img${addAttribute(blok.image_top.filename, "src")}${addAttribute(blok.image_top.alt || title, "alt")} class="mosaic-img"${addAttribute(blok.image_top.filename, "data-lightbox-src")}${addAttribute(blok.image_top.alt || title, "data-lightbox-alt")} data-astro-cid-xnl3yi4e> </div>`} ${blok.image_bottom?.filename && renderTemplate`<div class="photo-container" data-astro-cid-xnl3yi4e> <img${addAttribute(blok.image_bottom.filename, "src")}${addAttribute(blok.image_bottom.alt || title, "alt")} class="mosaic-img"${addAttribute(blok.image_bottom.filename, "data-lightbox-src")}${addAttribute(blok.image_bottom.alt || title, "data-lightbox-alt")} data-astro-cid-xnl3yi4e> </div>`} </div> </div>`;
    }
  })} </div>` : renderTemplate`<div class="photo-mosaic__empty" data-astro-cid-xnl3yi4e> <p data-astro-cid-xnl3yi4e>Photos coming soon.</p> </div>`} <div class="case-study__back" data-astro-cid-xnl3yi4e> <a href="/portfolio" class="btn-pill" data-astro-cid-xnl3yi4e>← Back to Portfolio</a> </div> </div> </div>  <div id="lightbox-overlay" data-astro-cid-xnl3yi4e></div> <div id="lightbox" aria-modal="true" role="dialog" aria-label="Image viewer" data-astro-cid-xnl3yi4e> <button id="lightbox-close" aria-label="Close" data-astro-cid-xnl3yi4e>&times;</button> <button id="lightbox-prev" aria-label="Previous" data-astro-cid-xnl3yi4e></button> <div id="lightbox-img-wrap" data-astro-cid-xnl3yi4e> <img id="lightbox-img" src="" alt="" data-astro-cid-xnl3yi4e> </div> <button id="lightbox-next" aria-label="Next" data-astro-cid-xnl3yi4e></button> </div> ` })}  ${renderScript($$result, "/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro", "self");

const $$file = "/Users/timhilton/code/bicardobuilders/src/pages/portfolio/[slug].astro";
const $$url = "/portfolio/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
