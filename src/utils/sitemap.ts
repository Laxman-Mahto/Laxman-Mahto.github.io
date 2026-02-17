import { SITE_URL } from "../utils/constants";

/**
 * Generate sitemap.xml content
 * Call this to create your sitemap
 */
export const generateSitemap = (): string => {
  const baseUrl = SITE_URL || "https://yourdomain.com";
  const currentDate = new Date().toISOString().split("T")[0];

  const urls = [
    {
      loc: "/",
      priority: "1.0",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      loc: "/blog",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },
  ];

  const urlElements = urls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

/**
 * Usage:
 * 1. Run this script to generate sitemap.xml
 * 2. Save output to public/sitemap.xml
 * 3. Update robots.txt with your domain
 *
 * For automatic generation on build, add to package.json:
 * "prebuild": "node scripts/generate-sitemap.js"
 */

// If running directly with node
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(generateSitemap());
}
