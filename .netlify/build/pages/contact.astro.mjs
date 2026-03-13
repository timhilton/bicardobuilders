import { g as getStory, b as bt, $ as $$PageLayout } from '../chunks/storyblok_KiBiFsmq.mjs';
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderTransition, u as unescapeHTML } from '../chunks/astro/server_26r8Mtjg.mjs';
import 'piccolore';
/* empty css                                   */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const story = await getStory("contact");
  const content = story?.content;
  const heading = content?.heading ?? "CONTACT";
  const heroImage = content?.hero_image?.filename ?? null;
  const phone = content?.phone ?? "(415) 555-0198";
  const formNote = bt(content?.form_note) ?? "Please allow 1 - 2 business days for us to reply";
  const hours = bt(content?.hours) ?? "Monday \u2013 Friday: 9:00 AM \u2013 5:00 PM\nSaturday - Sunday: Closed";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Contact | Bicardo Builders Inc", "description": "Contact Bicardo Builders Inc to discuss your custom home or renovation project.", "data-astro-cid-uw5kdbxl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="contact" data-astro-cid-uw5kdbxl> <div class="contact__inner" data-astro-cid-uw5kdbxl> <h1 class="contact__heading" data-astro-cid-uw5kdbxl${addAttribute(renderTransition($$result2, "fzbhkv3r", "", "page-heading"), "data-astro-transition-scope")}>${heading}</h1> </div> ${heroImage ? renderTemplate`<div class="contact__hero" data-astro-cid-uw5kdbxl> <img${addAttribute(heroImage, "src")} alt="Bicardo Builders project" class="contact__hero-img" loading="lazy" data-astro-cid-uw5kdbxl> </div>` : renderTemplate`<div class="contact__hero contact__hero--placeholder" aria-hidden="true" data-astro-cid-uw5kdbxl></div>`} <div class="contact__inner" data-astro-cid-uw5kdbxl> <p class="contact__phone" data-astro-cid-uw5kdbxl> <a${addAttribute(`tel:${phone.replace(/\D/g, "")}`, "href")} data-astro-cid-uw5kdbxl>${phone}</a> </p> <section class="contact__form-section" data-astro-cid-uw5kdbxl> <h2 class="contact__form-heading" data-astro-cid-uw5kdbxl>Send us a message</h2> <p class="contact__form-note" data-astro-cid-uw5kdbxl>${unescapeHTML(formNote)}</p> <form class="contact__form" method="post" action="#" novalidate data-astro-cid-uw5kdbxl> <div class="form__group" data-astro-cid-uw5kdbxl> <label class="form__label" for="name" data-astro-cid-uw5kdbxl>Name</label> <input class="form__input" id="name" name="name" type="text" autocomplete="name" required data-astro-cid-uw5kdbxl> </div> <div class="form__group" data-astro-cid-uw5kdbxl> <label class="form__label" for="phone" data-astro-cid-uw5kdbxl>Phone</label> <input class="form__input" id="phone" name="phone" type="tel" autocomplete="tel" data-astro-cid-uw5kdbxl> </div> <div class="form__group" data-astro-cid-uw5kdbxl> <label class="form__label" for="email" data-astro-cid-uw5kdbxl>Email</label> <input class="form__input" id="email" name="email" type="email" autocomplete="email" required data-astro-cid-uw5kdbxl> </div> <div class="form__group" data-astro-cid-uw5kdbxl> <label class="form__label" for="message" data-astro-cid-uw5kdbxl>Message</label> <textarea class="form__textarea" id="message" name="message" rows="5" required data-astro-cid-uw5kdbxl></textarea> </div> <div class="form__submit-wrap" data-astro-cid-uw5kdbxl> <button class="btn-pill" type="submit" data-astro-cid-uw5kdbxl>Send</button> </div> </form> </section> <section class="contact__hours" data-astro-cid-uw5kdbxl> <h2 class="contact__hours-heading" data-astro-cid-uw5kdbxl>Hours of Operation</h2> <div class="contact__hours-list" data-astro-cid-uw5kdbxl>${unescapeHTML(hours)}</div> </section> </div> </div> ` })} `;
}, "/Users/timhilton/code/bicardobuilders/src/pages/contact.astro", "self");

const $$file = "/Users/timhilton/code/bicardobuilders/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
