import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  // Image optimization
  images?: Array<{
    src: string;
    alt: string;
    priority?: boolean;
    sizes?: string;
  }>;
  // Resource hints
  preload?: string[];
  prefetch?: string[];
  // Critical CSS
  criticalCSS?: string;
  // Lazy loading
  enableLazyLoading?: boolean;
}

export default function PerformanceOptimizer({
  images = [],
  preload = [],
  prefetch = [],
  criticalCSS,
  enableLazyLoading = true
}: PerformanceOptimizerProps) {
  
  // Optimize images for Core Web Vitals
  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image) => {
        // Add loading="lazy" for non-priority images
        if (enableLazyLoading && !image.priority) {
          const imgElements = document.querySelectorAll(`img[src="${image.src}"]`);
          imgElements.forEach(img => {
            if (!img.hasAttribute('loading')) {
              img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('decoding')) {
              img.setAttribute('decoding', 'async');
            }
          });
        }
        
        // Add fetchpriority for priority images
        if (image.priority) {
          const imgElements = document.querySelectorAll(`img[src="${image.src}"]`);
          imgElements.forEach(img => {
            img.setAttribute('fetchpriority', 'high');
          });
        }
      });
    }
  }, [images, enableLazyLoading]);
  
  // Add resource hints
  useEffect(() => {
    // Preload critical resources
    preload.forEach(resource => {
      let link = document.querySelector(`link[rel="preload"][href="${resource}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        // Determine resource type
        if (resource.endsWith('.css')) {
          link.as = 'style';
        } else if (resource.endsWith('.js')) {
          link.as = 'script';
        } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
          link.as = 'image';
        } else if (resource.endsWith('.woff2') || resource.endsWith('.woff')) {
          link.as = 'font';
          link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
      }
    });
    
    // Prefetch non-critical resources
    prefetch.forEach(resource => {
      let link = document.querySelector(`link[rel="prefetch"][href="${resource}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      }
    });
  }, [preload, prefetch]);
  
  // Add critical CSS
  useEffect(() => {
    if (criticalCSS) {
      let style = document.getElementById('critical-css') as HTMLStyleElement;
      if (!style) {
        style = document.createElement('style');
        style.id = 'critical-css';
        document.head.appendChild(style);
      }
      style.textContent = criticalCSS;
    }
  }, [criticalCSS]);
  
  // Optimize font loading
  useEffect(() => {
    // Add font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Add performance monitoring
  useEffect(() => {
    // Monitor page load performance using native Web APIs
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        console.log('Page Load Performance:', {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          firstByte: perfData.responseStart - perfData.requestStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart
        });
        
        // Monitor Core Web Vitals using native APIs
        if ('PerformanceObserver' in window) {
          // Monitor Largest Contentful Paint (LCP)
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            console.log('LCP monitoring not supported');
          }
          
          // Monitor First Input Delay (FID)
          try {
            const fidObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry: any) => {
                if (entry.processingStart) {
                  console.log('FID:', entry.processingStart - entry.startTime);
                }
              });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
          } catch (e) {
            console.log('FID monitoring not supported');
          }
          
          // Monitor Cumulative Layout Shift (CLS)
          try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry: any) => {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              });
              console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            console.log('CLS monitoring not supported');
          }
        }
      }
    });
  }, []);
  
  return null;
}

// Utility functions for performance optimization
export const optimizeImage = (src: string, _options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
} = {}) => {
  // For now, return the original src
  // In production, you would integrate with an image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization
  return src;
};

export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

export const preloadFont = (fontUrl: string, fontFamily: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = fontUrl;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
  
  // Add font-face declaration
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontUrl}');
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};
