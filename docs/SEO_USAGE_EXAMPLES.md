# SEO Usage Examples - IBB+ Tanzania

Quick reference guide for implementing SEO in your React pages.

---

## 📄 Basic Page SEO Setup

### Example: Home Page

```tsx
import SEOHead from '@/components/common/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

function HomePage() {
  const structuredData = [
    generateStructuredData('organization'),
    generateStructuredData('event'),
    generateStructuredData('website'),
    generateStructuredData('localBusiness'),
  ];

  return (
    <>
      <SEOHead
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        url={seoConfig.pages.home.url}
        type="website"
        structuredData={structuredData}
      />
      
      {/* Your page content */}
      <div>
        <h1>Welcome to IBB+</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 About Page SEO

```tsx
import SEOHead from '@/components/common/SEOHead';
import { seoConfig, generateBreadcrumb } from '@/config/seo';

function AboutPage() {
  const breadcrumb = generateBreadcrumb('About Us', seoConfig.pages.about.url);

  return (
    <>
      <SEOHead
        title={seoConfig.pages.about.title}
        description={seoConfig.pages.about.description}
        keywords={seoConfig.pages.about.keywords}
        url={seoConfig.pages.about.url}
        structuredData={breadcrumb}
      />
      
      <div>
        <h1>About IBB+ Tanzania</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 Events Page with FAQ

```tsx
import SEOHead from '@/components/common/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

function EventsPage() {
  const structuredData = [
    generateStructuredData('event'),
    generateStructuredData('faq'),
  ];

  return (
    <>
      <SEOHead
        title={seoConfig.pages.events.title}
        description={seoConfig.pages.events.description}
        keywords={seoConfig.pages.events.keywords}
        url={seoConfig.pages.events.url}
        type="website"
        structuredData={structuredData}
      />
      
      <div>
        <h1>Upcoming Events</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 Event Detail Page (Dynamic)

```tsx
import SEOHead from '@/components/common/SEOHead';

function EventDetailPage({ event }) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Noble Centre, Dar es Salaam",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Floor No. 7, Block 1, Victoria, Noble Centre",
        "addressLocality": "Dar es Salaam",
        "addressCountry": "TZ"
      }
    },
    "image": event.imageUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TZS",
      "availability": "https://schema.org/InStock",
      "url": `https://ibb.impactadvisory.co.tz/events/${event.id}`
    },
    "organizer": {
      "@type": "Organization",
      "name": "Impact Advisory Tanzania",
      "url": "https://ibb.impactadvisory.co.tz"
    }
  };

  return (
    <>
      <SEOHead
        title={`${event.title} | IBB+ Tanzania`}
        description={event.description}
        keywords={`${event.title}, IBB+ event, business networking Tanzania`}
        url={`https://ibb.impactadvisory.co.tz/events/${event.id}`}
        image={event.imageUrl}
        type="website"
        structuredData={eventSchema}
      />
      
      <div>
        <h1>{event.title}</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 Gallery Page

```tsx
import SEOHead from '@/components/common/SEOHead';
import { seoConfig } from '@/config/seo';

function GalleryPage() {
  return (
    <>
      <SEOHead
        title={seoConfig.pages.gallery.title}
        description={seoConfig.pages.gallery.description}
        keywords={seoConfig.pages.gallery.keywords}
        url={seoConfig.pages.gallery.url}
      />
      
      <div>
        <h1>IBB+ Event Gallery</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 Contact Page

```tsx
import SEOHead from '@/components/common/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

function ContactPage() {
  const localBusiness = generateStructuredData('localBusiness');

  return (
    <>
      <SEOHead
        title={seoConfig.pages.contact.title}
        description={seoConfig.pages.contact.description}
        keywords={seoConfig.pages.contact.keywords}
        url={seoConfig.pages.contact.url}
        structuredData={localBusiness}
      />
      
      <div>
        <h1>Contact IBB+</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 📄 Blog Post (Future Use)

```tsx
import SEOHead from '@/components/common/SEOHead';

function BlogPostPage({ post }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "IBB+ Tanzania",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ibb.impactadvisory.co.tz/impactlogo.jpeg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ibb.impactadvisory.co.tz/blog/${post.slug}`
    }
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | IBB+ Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={`https://ibb.impactadvisory.co.tz/blog/${post.slug}`}
        image={post.featuredImage}
        type="article"
        structuredData={articleSchema}
        article={{
          publishedTime: post.publishedDate,
          modifiedTime: post.modifiedDate,
          author: post.author,
          section: post.category,
          tags: post.tags
        }}
      />
      
      <article>
        <h1>{post.title}</h1>
        {/* ... */}
      </article>
    </>
  );
}
```

---

## 🎯 Custom Structured Data Examples

### Video Schema (for YouTube content)

```tsx
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "IBB+ 14th Edition Highlights",
  "description": "Highlights from the 14th edition of Impact Business Breakfast",
  "thumbnailUrl": "https://ibb.impactadvisory.co.tz/thumbnails/video.jpg",
  "uploadDate": "2025-10-01T08:00:00+03:00",
  "duration": "PT5M30S",
  "contentUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID"
};
```

### Review/Rating Schema

```tsx
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Event",
    "name": "IBB+ Tanzania"
  },
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Excellent networking event. Great speakers and valuable connections made!"
};
```

### Aggregate Rating (when you have multiple reviews)

```tsx
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "IBB+ Tanzania",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
};
```

---

## 📝 SEO Best Practices for Content

### Title Tags
```tsx
// ✅ Good
<SEOHead title="IBB+ Tanzania | Impact Business Breakfast - Ideals Beyond Ideas" />

// ❌ Bad - too long
<SEOHead title="This is a very long title that exceeds the recommended character limit for SEO" />

// ❌ Bad - no branding
<SEOHead title="Business Networking Event" />
```

### Meta Descriptions
```tsx
// ✅ Good - specific, includes CTA, under 160 chars
description="Join 500+ CEOs at IBB+ Tanzania. Free registration for monthly business networking events in Dar es Salaam. Register now!"

// ❌ Bad - too vague
description="A business event in Tanzania"

// ❌ Bad - too long
description="This is an extremely long meta description that goes on and on and exceeds the recommended character limit which will cause it to be truncated in search results..."
```

### Keywords
```tsx
// ✅ Good - relevant, specific
keywords="IBB+ Tanzania, business networking Dar es Salaam, entrepreneurship events"

// ❌ Bad - keyword stuffing
keywords="business, business events, business networking, business Tanzania, business Dar es Salaam, best business..."
```

---

## 🔄 Dynamic SEO for Collections

### Example: Multiple Events

```tsx
import { useParams } from 'react-router-dom';
import SEOHead from '@/components/common/SEOHead';

function EventPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId); // Your data fetching logic

  if (!event) return <NotFound />;

  return (
    <>
      <SEOHead
        title={`${event.name} - IBB+ Tanzania Event`}
        description={event.description.substring(0, 155)}
        keywords={`${event.name}, IBB+ event, ${event.category}, Tanzania business events`}
        url={`https://ibb.impactadvisory.co.tz/events/${event.id}`}
        image={event.coverImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": event.name,
          "startDate": event.startDate,
          "endDate": event.endDate,
          "location": event.location,
          // ... more event data
        }}
      />
      
      <div>
        <h1>{event.name}</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 🛠️ Utility Functions

### Custom SEO Hook

```tsx
// hooks/useSEO.ts
import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
};

// Usage
function MyPage() {
  useSEO({
    title: 'My Page Title',
    description: 'My page description',
    keywords: 'keyword1, keyword2'
  });
  
  return <div>Content</div>;
}
```

---

## 📊 SEO Monitoring

### Track SEO Performance

```tsx
// Add to your analytics
const trackSEOEvent = (eventName: string, properties?: object) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Or your custom analytics
  analytics.track(eventName, properties);
};

// Usage
trackSEOEvent('page_view', {
  page_title: 'IBB+ Home',
  page_path: '/',
  page_location: window.location.href
});
```

---

## ✅ Pre-Launch SEO Checklist

Before deploying changes:

```bash
# 1. Validate structured data
- Visit: https://validator.schema.org/
- Test all schema types

# 2. Test meta tags
- Use: https://metatags.io/
- Check all social previews

# 3. Mobile-friendly test
- Visit: https://search.google.com/test/mobile-friendly

# 4. PageSpeed test
- Visit: https://pagespeed.web.dev/

# 5. Check robots.txt
- Visit: https://ibb.impactadvisory.co.tz/robots.txt

# 6. Verify sitemap
- Visit: https://ibb.impactadvisory.co.tz/sitemap.xml
```

---

## 🔗 Useful Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

---

*Quick Reference Guide - Last Updated: October 11, 2025*

