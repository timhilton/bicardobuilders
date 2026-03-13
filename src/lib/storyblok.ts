import { useStoryblokApi } from '@storyblok/astro';

export async function getStory(slug: string): Promise<Record<string, any> | null> {
  const token = import.meta.env.STORYBLOK_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?version=draft&token=${token}`
    );
    const data = await res.json();
    return data?.story ?? null;
  } catch (e) {
    console.error('getStory error:', e);
    return null;
  }
}

export async function getStories(options: Record<string, any> = {}): Promise<any[]> {
  const token = import.meta.env.STORYBLOK_TOKEN;
  if (!token) return [];
  try {
    const params = new URLSearchParams({
      version: process.env.NODE_ENV !== 'production' ? 'draft' : 'published',
      token,
      ...Object.fromEntries(Object.entries(options).map(([k, v]) => [k, String(v)])),
    });
    const res = await fetch(`https://api.storyblok.com/v2/cdn/stories?${params}`);
    const data = await res.json();
    return data?.stories ?? [];
  } catch (e) {
    console.error('getStories error:', e);
    return [];
  }
}

export async function getStoriesStatic(): Promise<any[]> {
  const token = process.env.STORYBLOK_TOKEN;
  if (!token) return [];
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?starts_with=portfolio/&version=draft&token=${token}`
    );
    const data = await res.json();
    return data?.stories ?? [];
  } catch (e) {
    console.error('getStoriesStatic error:', e);
    return [];
  }
}

export function sbImage(url: string, width = 1200, quality = 85): string {
  if (!url) return '';
  return `${url}/m/${width}x0/filters:quality(${quality})`;
}