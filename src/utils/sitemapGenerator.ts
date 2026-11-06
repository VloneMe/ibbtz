// Sitemap Generator for IBB+ Tanzania
import { seoConfig } from '@/config/seo';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): string => {
  const baseUrl = seoConfig.site.url;
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/events`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/gallery`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemap;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = seoConfig.site.url;
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico
Allow: /impactlogo.png

# Host directive
Host: ${baseUrl}`;
};

// Generate meta tags for better SEO
export const generateMetaTags = (page: keyof typeof seoConfig.pages) => {
  const pageConfig = seoConfig.pages[page];
  
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    url: pageConfig.url,
    // Additional meta tags for better SEO
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    author: 'Impact Advisory Tanzania',
    publisher: 'Impact Advisory Africa',
    language: 'en',
    'geo.region': 'TZ-02',
    'geo.placename': 'Dar es Salaam',
    'geo.position': '-6.7924;39.2083',
    'ICBM': '-6.7924, 39.2083',
    'revisit-after': '7 days',
    'rating': 'general',
    'distribution': 'global'
  };
};

// Generate Open Graph tags
export const generateOpenGraphTags = (page: keyof typeof seoConfig.pages) => {
  const pageConfig = seoConfig.pages[page];
  
  return {
    'og:type': 'website',
    'og:url': pageConfig.url,
    'og:title': pageConfig.title,
    'og:description': pageConfig.description,
    'og:image': 'https://ibbplus.com/og-home.jpg',
    'og:image:secure_url': 'https://ibbplus.com/og-home.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'IBB+ Tanzania Logo',
    'og:site_name': 'IBB+ | Impact Business Breakfast Tanzania',
    'og:locale': 'en_US',
    'og:locale:alternate': 'sw_TZ'
  };
};

// Generate Twitter Card tags
export const generateTwitterTags = (page: keyof typeof seoConfig.pages) => {
  const pageConfig = seoConfig.pages[page];
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@impactadvisorytz',
    'twitter:creator': '@impactadvisorytz',
    'twitter:url': pageConfig.url,
    'twitter:title': pageConfig.title,
    'twitter:description': pageConfig.description,
    'twitter:image': 'https://ibbplus.com/og-home.jpg',
    'twitter:image:alt': 'IBB+ Tanzania Logo'
  };
};
