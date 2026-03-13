import { g as getStory, a as getStories, $ as $$PageLayout, s as sbImage } from '../chunks/storyblok_KiBiFsmq.mjs';
import { c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_26r8Mtjg.mjs';
import 'piccolore';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Portfolio = createComponent(async ($$result, $$props, $$slots) => {
  await getStory("portfolio");
  const projectStories = await getStories({ starts_with: "portfolio/" });
  const projects = projectStories.filter((s) => !s.is_startpage);
  const regionOrder = ["Marin County", "San Francisco", "East Bay", "Sonoma"];
  const regions = projects.reduce((acc, project) => {
    const body = project?.content?.body ?? [];
    const p = body.find((b) => b.component === "project");
    const regionName = p?.region || "Our Work";
    const existing = acc.find((r) => r.name === regionName);
    if (existing) {
      existing.projects.push(project);
    } else {
      acc.push({ name: regionName, projects: [project] });
    }
    return acc;
  }, []).map((region) => ({
    ...region,
    projects: region.projects.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  })).sort((a, b) => {
    const ai = regionOrder.indexOf(a.name);
    const bi = regionOrder.indexOf(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  const useFallback = regions.length === 0;
  const fallbackProjects = [
    { title: "Russian Hill Residence", slug: "russian-hill" },
    { title: "Pacific Heights Remodel", slug: "pacific-heights" },
    { title: "Noe Valley Addition", slug: "noe-valley" },
    { title: "Cole Valley Kitchen", slug: "cole-valley" }
  ];
  const fallbackRegions = [
    {
      name: "Marin County",
      projects: fallbackProjects.map((p) => ({
        content: { title: p.title },
        slug: p.slug
      }))
    }
  ];
  function layoutClass(count) {
    if (count >= 4) return "layout-full";
    if (count === 3) return "layout-3";
    if (count === 2) return "layout-2";
    return "layout-1";
  }
  function getSlug(project) {
    return "/" + (project.full_slug ?? project.slug ?? "");
  }
  function getThumbnail(project) {
    const body = project?.content?.body ?? [];
    const p = body.find((b) => b.component === "project");
    return p?.thumbnail?.filename ?? null;
  }
  function getTitle(project) {
    const body = project?.content?.body ?? [];
    const p = body.find((b) => b.component === "project");
    return p?.title ?? project?.name ?? "Project";
  }
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Portfolio | Bicardo Builders Inc", "description": "Explore our portfolio of custom homes, renovations, and additions across the San Francisco Bay Area.", "data-astro-cid-hcjuqwdu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="portfolio" data-astro-cid-hcjuqwdu> <div class="portfolio__inner" data-astro-cid-hcjuqwdu> <h1 class="portfolio__heading visually-hidden" data-astro-cid-hcjuqwdu>PORTFOLIO</h1> ${useFallback ? renderTemplate`<div class="region" data-astro-cid-hcjuqwdu> <h2 class="region__name" data-astro-cid-hcjuqwdu> ${fallbackRegions[0]?.name} </h2> <div class="project-grid layout-full" data-astro-cid-hcjuqwdu> ${fallbackProjects.map((p, i) => renderTemplate`<a${addAttribute(`/portfolio/${p.slug}`, "href")}${addAttribute(["project-card", i === 0 && "hero"], "class:list")} data-astro-cid-hcjuqwdu> <div class="img-wrap" data-astro-cid-hcjuqwdu> <div class="img-placeholder" aria-hidden="true" data-astro-cid-hcjuqwdu></div> </div> <p class="card-title" data-astro-cid-hcjuqwdu>${p.title}</p> </a>`)} </div> </div>` : (() => {
    const output = [];
    let i = 0;
    while (i < regions.length) {
      const region = regions[i];
      const next = regions[i + 1];
      const count = region.projects.length;
      const nextCount = next?.projects.length;
      if (count === 1 && nextCount === 1) {
        output.push(
          renderTemplate`<div class="region-pair" data-astro-cid-hcjuqwdu> <div class="region" data-astro-cid-hcjuqwdu> <h2 class="region__name" data-astro-cid-hcjuqwdu>${region.name.toUpperCase()}</h2> <div class="project-grid layout-1" data-astro-cid-hcjuqwdu> ${region.projects.map((project) => {
            const thumb = getThumbnail(project);
            const title = getTitle(project);
            return renderTemplate`<a${addAttribute(getSlug(project), "href")} class="project-card" data-astro-cid-hcjuqwdu> <div class="img-wrap" data-astro-cid-hcjuqwdu> ${thumb ? renderTemplate`<img${addAttribute(thumb, "src")}${addAttribute(title, "alt")} class="img" loading="lazy" data-astro-cid-hcjuqwdu>` : renderTemplate`<div class="img-placeholder" aria-hidden="true" data-astro-cid-hcjuqwdu></div>`} </div> <p class="card-title" data-astro-cid-hcjuqwdu>${title}</p> </a>`;
          })} </div> </div> <div class="region" data-astro-cid-hcjuqwdu> <h2 class="region__name" data-astro-cid-hcjuqwdu>${next.name.toUpperCase()}</h2> <div class="project-grid layout-1" data-astro-cid-hcjuqwdu> ${next.projects.map((project) => {
            const thumb = getThumbnail(project);
            const title = getTitle(project);
            return renderTemplate`<a${addAttribute(getSlug(project), "href")} class="project-card" data-astro-cid-hcjuqwdu> <div class="img-wrap" data-astro-cid-hcjuqwdu> ${thumb ? renderTemplate`<img${addAttribute(thumb, "src")}${addAttribute(title, "alt")} class="img" loading="lazy" data-astro-cid-hcjuqwdu>` : renderTemplate`<div class="img-placeholder" aria-hidden="true" data-astro-cid-hcjuqwdu></div>`} </div> <p class="card-title" data-astro-cid-hcjuqwdu>${title}</p> </a>`;
          })} </div> </div> </div>`
        );
        i += 2;
      } else {
        output.push(
          renderTemplate`<div class="region" data-astro-cid-hcjuqwdu> <h2 class="region__name" data-astro-cid-hcjuqwdu>${region.name.toUpperCase()}</h2> ${count > 0 && renderTemplate`<div${addAttribute(["project-grid", layoutClass(count)], "class:list")} data-astro-cid-hcjuqwdu> ${region.projects.map((project, j) => {
            const thumb = getThumbnail(project);
            const title = getTitle(project);
            const isHero = j === 0 && count >= 4;
            return renderTemplate`<a${addAttribute(getSlug(project), "href")}${addAttribute(["project-card", isHero && "hero"], "class:list")} data-astro-cid-hcjuqwdu> <div class="img-wrap" data-astro-cid-hcjuqwdu> ${thumb ? renderTemplate`<img${addAttribute(sbImage(thumb, 1920), "src")}${addAttribute(title, "alt")} class="img"${addAttribute(j === 0 ? "eager" : "lazy", "loading")} data-astro-cid-hcjuqwdu>` : renderTemplate`<div class="img-placeholder" aria-hidden="true" data-astro-cid-hcjuqwdu></div>`} </div> <p class="card-title" data-astro-cid-hcjuqwdu>${title}</p> </a>`;
          })} </div>`} </div>`
        );
        i += 1;
      }
    }
    return output;
  })()} </div> </div> ` })}   ${renderScript($$result, "/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro", void 0);

const $$file = "/Users/timhilton/code/bicardobuilders/src/pages/portfolio.astro";
const $$url = "/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Portfolio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
