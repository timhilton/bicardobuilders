import { useStoryblokApi } from '@storyblok/astro';

const hasToken = Boolean(import.meta.env.STORYBLOK_TOKEN);

export async function getStory(slug: string): Promise<Record<string, any> | null> {
  if (!hasToken) return null;
  try {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'published',
    });
    return data?.story ?? null;
  } catch {
    return null;
  }
}

export async function getStories(options: Record<string, any> = {}): Promise<any[]> {
  if (!hasToken) return [];
  try {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories', {
      version: 'published',
      ...options,
    });
    return data?.stories ?? [];
  } catch {
    return [];
  }
}
