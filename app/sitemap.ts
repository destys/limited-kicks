import type { MetadataRoute } from "next";

type SitemapItemFromApi = {
  url: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const WP_API_URL = `${process.env.WP_ADMIN_REST_URL}/sitemap/v1/all`;
const REPLACE_PREFIX = "https://limited-kicks.ru/admin/";
const TARGET_PREFIX = "https://limited-kicks.ru/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(WP_API_URL, {
    next: { revalidate: 3600 }, // кешировать 1 час
  });
  const data: SitemapItemFromApi[] = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch sitemap data");
  }

  return data.map((item) => ({
    url: item.url.replace(REPLACE_PREFIX, TARGET_PREFIX),
    lastModified: new Date(item.lastModified),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
