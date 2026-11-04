import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object | object[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export default function SEOHead({
  title = "IBB+ Tanzania | Impact Business Breakfast - Ideals Beyond Ideas",
  description = "IBB+ (Impact Business Breakfast) is Tanzania's #1 business networking event in Dar es Salaam. Join 500+ CEOs, entrepreneurs & industry leaders monthly. Free registration. Expert speakers. Strategic partnerships.",
  keywords = "IBB+, IBB Tanzania, Impact Business Breakfast, business networking Tanzania, business events Dar es Salaam, business breakfast Tanzania, entrepreneurship Tanzania, CEO networking Tanzania",
  image = "https://ibb.impactadvisory.co.tz/impactlogo.jpeg",
  url = "https://ibb.impactadvisory.co.tz",
  type = "website",
  structuredData,
  // article
}: SEOHeadProps) {
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
    updateMetaTag('author', 'Impact Advisory Tanzania');
    updateMetaTag('publisher', 'Impact Advisory Africa');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Geographic Targeting
    updateMetaTag('geo.region', 'TZ-02');
    updateMetaTag('geo.placename', 'Dar es Salaam');
    
    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', siteName, true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Theme color
    updateMetaTag('theme-color', '#768f00');
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
  }, [title, description, keywords, url, image, type, siteName]);
  
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
  
  return null;
}
