import { useEffect } from 'react';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object | object[];
  // Advanced SEO properties
  canonicalUrl?: string;
  alternateUrls?: { [key: string]: string };
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // Performance optimization
  preloadResources?: string[];
  prefetchResources?: string[];
  // Social media optimization
  twitterHandle?: string;
  facebookAppId?: string;
  // Local SEO
  geoLocation?: {
    latitude: number;
    longitude: number;
  };
  businessHours?: string;
  priceRange?: string;
  // Rich snippets
  rating?: {
    value: number;
    count: number;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function AdvancedSEO({
  title = "IBB+ Tanzania | Impact Business Breakfast - Ideals Beyond Ideas",
  description = "IBB+ (Impact Business Breakfast) is Tanzania's #1 business networking event in Dar es Salaam. Join 500+ CEOs, entrepreneurs & industry leaders monthly. Free registration. Expert speakers. Strategic partnerships.",
  keywords = "IBB+, IBB Tanzania, Impact Business Breakfast, business networking Tanzania, business events Dar es Salaam, business breakfast Tanzania, entrepreneurship Tanzania, CEO networking Tanzania",
  image = "https://ibbplus.com/og-home.jpg",
  url = "https://ibbplus.com",
  type = "website",
  structuredData,
  canonicalUrl,
  alternateUrls = { "en": "https://ibbplus.com/", "sw": "https://ibbplus.com/" },
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  author = "Impact Advisory Tanzania",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  preloadResources = [],
  prefetchResources = [],
  twitterHandle = "@impactadvisorytz",
  facebookAppId,
  geoLocation = { latitude: -6.7924, longitude: 39.2083 },
  businessHours = "Mo-Fr 08:00-17:00",
  priceRange = "Free",
  rating,
  breadcrumbs = []
}: AdvancedSEOProps) {
  const siteName = "IBB+ | Impact Business Breakfast Tanzania";
  
  // Update document title
  useEffect(() => {
    document.title = title;
  }, [title]);
  
  // Update or create meta tags
  useEffect(() => {
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.content = content;
    };
    
    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('publisher', 'Impact Advisory Africa');
    updateMetaTag('robots', robots);
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('bingbot', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');
    
    // Geographic Targeting
    updateMetaTag('geo.region', 'TZ-02');
    updateMetaTag('geo.placename', 'Dar es Salaam');
    updateMetaTag('geo.position', `${geoLocation.latitude};${geoLocation.longitude}`);
    updateMetaTag('ICBM', `${geoLocation.latitude}, ${geoLocation.longitude}`);
    
    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:secure_url', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${siteName} Logo`, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:locale:alternate', 'sw_TZ', true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', `${siteName} Logo`);
    
    // Facebook
    if (facebookAppId) {
      updateMetaTag('fb:app_id', facebookAppId, true);
    }
    
    // Article specific meta tags
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, true);
      if (author) updateMetaTag('article:author', author, true);
      if (section) updateMetaTag('article:section', section, true);
      tags.forEach(tag => {
        const tagElement = document.createElement('meta');
        tagElement.setAttribute('property', 'article:tag');
        tagElement.content = tag;
        document.head.appendChild(tagElement);
      });
    }
    
    // Theme color
    updateMetaTag('theme-color', '#768f00');
    
    // Mobile App Meta Tags
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('apple-mobile-web-app-title', 'IBB+ Tanzania');
    updateMetaTag('application-name', 'IBB+ Tanzania');
    
    // MS Application
    updateMetaTag('msapplication-TileColor', '#768f00');
    updateMetaTag('msapplication-TileImage', image);
    
  }, [title, description, keywords, url, image, type, author, publishedTime, modifiedTime, section, tags, twitterHandle, facebookAppId, geoLocation]);
  
  // Update canonical link
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl || url;
    
    // Add alternate language links
    Object.entries(alternateUrls).forEach(([lang, href]) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.setAttribute('hreflang', lang);
        document.head.appendChild(alternate);
      }
      alternate.href = href;
    });
    
    // Add x-default alternate
    let defaultAlternate = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement;
    if (!defaultAlternate) {
      defaultAlternate = document.createElement('link');
      defaultAlternate.rel = 'alternate';
      defaultAlternate.setAttribute('hreflang', 'x-default');
      document.head.appendChild(defaultAlternate);
    }
    defaultAlternate.href = url;
    
  }, [canonicalUrl, url, alternateUrls]);
  
  // Add structured data
  useEffect(() => {
    const scriptId = 'structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (structuredData) {
      const jsonString = Array.isArray(structuredData)
        ? JSON.stringify(structuredData)
        : JSON.stringify([structuredData]);
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = jsonString;
    }
    
    return () => {
      // Cleanup on unmount
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [structuredData]);

  // Add breadcrumbs structured data
  useEffect(() => {
    if (breadcrumbs.length > 0) {
      const breadcrumbScriptId = 'breadcrumb-structured-data';
      let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement;
      
      const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = breadcrumbScriptId;
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      
      breadcrumbScript.textContent = JSON.stringify(breadcrumbStructuredData);
      
      return () => {
        if (breadcrumbScript && breadcrumbScript.parentNode) {
          breadcrumbScript.parentNode.removeChild(breadcrumbScript);
        }
      };
    }
  }, [breadcrumbs]);

  // Add business information meta tags
  useEffect(() => {
    if (businessHours) {
      const updateMetaTag = (property: string, content: string) => {
        const selector = `meta[name="${property}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement;
        
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', property);
          document.head.appendChild(element);
        }
        
        element.content = content;
      };
      
      updateMetaTag('business:hours', businessHours);
    }
    
    if (priceRange) {
      const updateMetaTag = (property: string, content: string) => {
        const selector = `meta[name="${property}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement;
        
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', property);
          document.head.appendChild(element);
        }
        
        element.content = content;
      };
      
      updateMetaTag('business:price_range', priceRange);
    }
  }, [businessHours, priceRange]);

  // Add rating structured data
  useEffect(() => {
    if (rating) {
      const ratingScriptId = 'rating-structured-data';
      let ratingScript = document.getElementById(ratingScriptId) as HTMLScriptElement;
      
      const ratingStructuredData = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "ratingValue": rating.value,
        "reviewCount": rating.count
      };
      
      if (!ratingScript) {
        ratingScript = document.createElement('script');
        ratingScript.id = ratingScriptId;
        ratingScript.type = 'application/ld+json';
        document.head.appendChild(ratingScript);
      }
      
      ratingScript.textContent = JSON.stringify(ratingStructuredData);
      
      return () => {
        if (ratingScript && ratingScript.parentNode) {
          ratingScript.parentNode.removeChild(ratingScript);
        }
      };
    }
  }, [rating]);
  
  // Preload and prefetch resources
  useEffect(() => {
    preloadResources.forEach(resource => {
      let link = document.querySelector(`link[rel="preload"][href="${resource}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });
    
    prefetchResources.forEach(resource => {
      let link = document.querySelector(`link[rel="prefetch"][href="${resource}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      }
    });
  }, [preloadResources, prefetchResources]);
  
  return null;
}
