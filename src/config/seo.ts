// SEO Configuration for IBB+ (Impact Business Breakfast) - Optimized for Google Search

export const seoConfig = {
  site: {
    name: "IBB+ | Impact Business Breakfast - Tanzania",
    url: "https://ibb.impactadvisory.co.tz",
    logo: "https://ibb.impactadvisory.co.tz/impactlogo.png",
    description: "IBB+ (Impact Business Breakfast) - Tanzania's premier business networking platform. Ideals Beyond Ideas. Connect with 500+ industry leaders, entrepreneurs, and decision-makers in Dar es Salaam.",
    tagline: "Ideals Beyond Ideas",
    // Enhanced SEO properties
    domain: "ibb.impactadvisory.co.tz",
    language: "en",
    alternateLanguages: ["sw"],
    country: "TZ",
    region: "Dar es Salaam",
    timezone: "Africa/Dar_es_Salaam",
    currency: "TZS",
    // Performance and Core Web Vitals
    performance: {
      targetLoadTime: 2.5, // seconds
      targetLCP: 2.5, // Largest Contentful Paint
      targetFID: 100, // First Input Delay
      targetCLS: 0.1, // Cumulative Layout Shift
    },
  },
  
  pages: {
    home: {
      title: "IBB+ Tanzania | Impact Business Breakfast - Ideals Beyond Ideas",
      description: "IBB+ (Impact Business Breakfast) is Tanzania's #1 business networking event in Dar es Salaam. Join 50+ CEOs, entrepreneurs & industry leaders. Individual: TZS 120,000 | Corporate Table: TZS 1,500,000. Expert speakers. Strategic partnerships. Catalyzing Vision 2050.",
      keywords: "IBB+, IBB Tanzania, Impact Business Breakfast, business networking Tanzania, business events Dar es Salaam, business breakfast Tanzania, entrepreneurship networking Tanzania, CEO networking Tanzania, business leaders Tanzania, Vision 2050 Tanzania, business forum Tanzania, professional networking Dar es Salaam, corporate networking events, business development Tanzania, East Africa business events, Tanzania business opportunities, ideals beyond ideas",
      url: "https://ibb.impactadvisory.co.tz/",
      // Enhanced SEO for home page
      priority: 1.0,
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
      // Featured snippets optimization
      featuredSnippets: {
        question: "What is IBB+ Tanzania?",
        answer: "IBB+ (Impact Business Breakfast) is Tanzania's premier business networking event in Dar es Salaam, bringing together 50+ CEOs, entrepreneurs, and industry leaders to discuss economic development and Vision 2050.",
        question2: "How much does IBB+ registration cost?",
        answer2: "IBB+ registration costs TZS 120,000 for individual tickets and TZS 1,500,000 for corporate tables. This premium pricing reflects the high-value networking opportunities and expert insights provided.",
      },
      // Rich snippets data
      richSnippets: {
        eventDate: "2025-11-28",
        eventTime: "08:00-12:00",
        location: "Noble Centre, Dar es Salaam",
        price: "TZS 120,000 - TZS 1,500,000",
        capacity: "500 attendees",
        organizer: "Impact Advisory Africa",
      },
    },
    
    about: {
      title: "About IBB+ | Impact Business Breakfast Tanzania - Our Mission & Impact",
      description: "Learn about IBB+ (Impact Business Breakfast) - Tanzania's premier business networking platform. Catalyzing human capital development and building a knowledge-driven economy for Vision 2050. 14+ successful editions, 5000+ professionals connected.",
      keywords: "about IBB+, Impact Business Breakfast Tanzania, business networking platform Tanzania, Vision 2050 Tanzania, human capital development Tanzania, knowledge economy Tanzania, business leadership Tanzania, economic transformation Tanzania, Impact Advisory Africa",
      url: "https://ibb.impactadvisory.co.tz/about",
    },
    
    events: {
      title: "IBB+ Events | Upcoming Business Networking Events in Tanzania 2025",
      description: "Discover upcoming IBB+ (Impact Business Breakfast) events in Tanzania. business networking sessions in Dar es Salaam. Meet industry leaders, gain insights, and build strategic partnerships. Register for upcoming events.",
      keywords: "IBB+ events, business events Tanzania 2025, networking events Dar es Salaam, Impact Business Breakfast schedule, business networking Tanzania, corporate events Tanzania, business conferences Tanzania, professional development events, CEO forums Tanzania, entrepreneurship events East Africa",
      url: "https://ibb.impactadvisory.co.tz/events",
    },
    
    gallery: {
      title: "IBB+ Gallery | Photos & Videos from Impact Business Breakfast Events",
      description: "Explore photos and videos from IBB+ (Impact Business Breakfast) events in Tanzania. See highlights from our networking sessions, speaker presentations, and business community engagement. 14+ editions documented.",
      keywords: "IBB+ gallery, Impact Business Breakfast photos, business event gallery Tanzania, networking event videos Dar es Salaam, corporate event photography Tanzania, business networking photos, IBB+ Tanzania highlights",
      url: "https://impactadvisory.co.tz/gallery",
    },
    
    contact: {
      title: "Contact IBB+ | Register for Impact Business Breakfast Events",
      description: "Contact IBB+ (Impact Business Breakfast) for event registration, partnerships, sponsorship opportunities, or inquiries. Located at Victoria, Noble Centre, Dar es Salaam. Email: ibb@impactadvisory.co.tz | Phone: +255 743 111 183",
      keywords: "contact IBB+, Impact Business Breakfast registration, IBB Tanzania contact, business networking registration Tanzania, event registration Dar es Salaam, business partnerships Tanzania, corporate sponsorship opportunities Tanzania",
      url: "https://ibb.impactadvisory.co.tz/contact",
    },
  },
  
  organization: {
    name: "IBB+ | Impact Business Breakfast Tanzania",
    alternateName: "IBB Tanzania",
    type: "Organization",
    url: "https://ibb.impactadvisory.co.tz",
    logo: "https://ibb.impactadvisory.co.tz/impactlogo.png",
    image: "https://ibb.impactadvisory.co.tz/impactlogo.png",
    description: "IBB+ (Impact Business Breakfast) - Tanzania's premier business networking and knowledge-sharing platform, fostering economic development and human capital growth. Ideals Beyond Ideas.",
    slogan: "Ideals Beyond Ideas",
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floor No. 7, Block 1, Victoria, Noble Centre",
      addressLocality: "Dar es Salaam",
      addressRegion: "Dar es Salaam",
      postalCode: "3116",
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.7924",
      longitude: "39.2083",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+255-743-111-183",
        contactType: "customer service",
        email: "ibb@impactadvisory.co.tz",
        areaServed: "TZ",
        availableLanguage: ["English", "Swahili"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+255-748-111-183",
        contactType: "reservations",
        email: "info@impactadvisory.co.tz",
        areaServed: "TZ",
        availableLanguage: ["English", "Swahili"],
      }
    ],
    sameAs: [
      "https://impactadvisory.co.tz",
      "https://www.linkedin.com/in/impact-advisory-africa-972b31232",
      "https://www.instagram.com/impactadvisoryafrica",
      "https://www.youtube.com/@impactadvisory9056",
    ],
    areaServed: {
      "@type": "Country",
      name: "Tanzania",
    },
  },
  
  event: {
    name: "IBB+ | Impact Business Breakfast",
    alternateName: "Impact Business Breakfast Tanzania",
    description: "Tanzania's premier monthly business networking event bringing together 500+ industry leaders, entrepreneurs, CEOs, and decision-makers to discuss critical issues affecting economic development and Vision 2050. Free registration.",
    image: "https://ibb.impactadvisory.co.tz/impactlogo.png",
    startDate: "2025-12-04T08:00:00+03:00",
    endDate: "2025-12-04T12:00:00+03:00",
    location: {
      "@type": "Place",
      name: "Victoria, Noble Centre, Dar es Salaam",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Floor No. 7, Block 1, Victoria, Noble Centre",
        addressLocality: "Dar es Salaam",
        addressRegion: "Dar es Salaam",
        postalCode: "3116",
        addressCountry: "TZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-6.7924",
        longitude: "39.2083",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Impact Advisory Africa",
      url: "https://ibb.impactadvisory.co.tz",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Individual Ticket",
        price: "120000",
        priceCurrency: "TZS",
        availability: "https://schema.org/InStock",
        url: "https://ibb.impactadvisory.co.tz",
        validFrom: "2025-01-01T00:00:00+03:00",
      },
      {
        "@type": "Offer",
        name: "Corporate Table",
        price: "1500000",
        priceCurrency: "TZS",
        availability: "https://schema.org/InStock",
        url: "https://ibb.impactadvisory.co.tz",
        validFrom: "2025-01-01T00:00:00+03:00",
      }
    ],
    performer: {
      "@type": "Organization",
      name: "Impact Advisory Africa",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: ["en", "sw"],
    isAccessibleForFree: false,
    maximumAttendeeCapacity: 500,
  },
  
  // Local Business Schema
  localBusiness: {
    "@type": "LocalBusiness",
    name: "IBB+ Tanzania",
    image: "https://ibb.impactadvisory.co.tz/impactlogo.png",
    "@id": "https://ibb.impactadvisory.co.tz",
    url: "https://ibb.impactadvisory.co.tz",
    telephone: "+255743111183",
    priceRange: "TZS 120,000 - TZS 1,500,000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floor No. 7, Block 1, Victoria, Noble Centre",
      addressLocality: "Dar es Salaam",
      addressRegion: "Dar es Salaam Region",
      postalCode: "3116",
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.7924,
      longitude: 39.2083,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  },
  
  // FAQ Schema
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is IBB+ (Impact Business Breakfast)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IBB+ (Impact Business Breakfast) is Tanzania's premier monthly business networking event in Dar es Salaam. We bring together 50+ CEOs, entrepreneurs, industry leaders, and decision-makers to discuss critical economic development issues and build strategic partnerships."
        }
      },
        {
          "@type": "Question",
          name: "How much does IBB+ registration cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "IBB+ registration costs TZS 120,000 for individual tickets and TZS 1,500,000 for corporate tables. This premium pricing reflects the high-value networking opportunities and expert insights provided at our events."
          }
        },
      // {
      //   "@type": "Question",
      //   name: "Where are IBB+ events held?",
      //   acceptedAnswer: {
      //     "@type": "Answer",
      //     text: "IBB+ events are held at the Noble Centre, Floor No. 7, Block 1, Victoria, in Dar es Salaam, Tanzania. The venue is centrally located and easily accessible."
      //   }
      // },
      // {
      //   "@type": "Question",
      //   name: "How often are IBB+ events held?",
      //   acceptedAnswer: {
      //     "@type": "Answer",
      //     text: "IBB+ (Impact Business Breakfast) events are held, typically on the first Thursday of each month. Each edition features expert speakers, panel discussions, and networking opportunities."
      //   }
      // },
      {
        "@type": "Question",
        name: "Who should attend IBB+ events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IBB+ events are ideal for business owners, CEOs, entrepreneurs, corporate executives, industry leaders, decision-makers, and professionals looking to expand their network, gain business insights, and contribute to Tanzania's economic development."
        }
      }
    ]
  },
};

// Advanced SEO utilities
export const generateAdvancedStructuredData = () => {
  return {
    // BreadcrumbList for better navigation
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ibb.impactadvisory.co.tz/"
        }
      ]
    },
    
    // Article schema for content
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "IBB+ Tanzania - Premier Business Networking Event",
      "description": "Tanzania's leading business networking platform bringing together industry leaders",
      "author": {
        "@type": "Organization",
        "name": "Impact Advisory Africa"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Impact Advisory Africa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ibb.impactadvisory.co.tz/impactlogo.png"
        }
      },
      "datePublished": "2025-11-28",
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ibb.impactadvisory.co.tz/"
      }
    },
    
    // HowTo schema for event registration
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Register for IBB+ Tanzania",
      "description": "Step-by-step guide to register for Impact Business Breakfast events",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Visit IBB+ Website",
          "text": "Go to ibb.impactadvisory.co.tz",
          "url": "https://ibb.impactadvisory.co.tz"
        },
        {
          "@type": "HowToStep",
          "name": "Click Register Now",
          "text": "Click the 'REGISTER NOW' button on the homepage"
        },
        {
          "@type": "HowToStep",
          "name": "Fill Registration Form",
          "text": "Complete the registration form with your details"
        },
        {
          "@type": "HowToStep",
          "name": "Pay Registration Fee",
          "text": "All payments are made through mobile money provided options"
        },
        {
          "@type": "HowToStep",
          "name": "Confirm Registration",
          "text": "Receive confirmation email and attend the event"
        }
      ]
    },
    
    // Review schema
    review: {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Event",
        "name": "IBB+ Impact Business Breakfast"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Business Professional"
      },
      "reviewBody": "Excellent networking event with valuable insights and great connections."
    }
  };
};

export const generateStructuredData = (
  type: 'organization' | 'event' | 'breadcrumb' | 'faq' | 'localBusiness' | 'website' | 'article' | 'howto' | 'review',
  breadcrumbItems?: Array<{ name: string; url: string }>
) => {
  switch (type) {
    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        ...seoConfig.organization,
      };
    
    case 'event':
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        ...seoConfig.event,
      };
    
    case 'localBusiness':
      return {
        "@context": "https://schema.org",
        ...seoConfig.localBusiness,
      };
    
    case 'faq':
      return seoConfig.faqSchema;
    
    case 'website':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: seoConfig.site.name,
        alternateName: "IBB Tanzania",
        url: seoConfig.site.url,
        description: seoConfig.site.description,
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${seoConfig.site.url}?s={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
    
    case 'article':
      return generateAdvancedStructuredData().article;
    
    case 'howto':
      return generateAdvancedStructuredData().howTo;
    
    case 'review':
      return generateAdvancedStructuredData().review;
    
    case 'breadcrumb':
      const items = breadcrumbItems || [
        { name: "Home", url: "https://ibb.impactadvisory.co.tz/" }
      ];
      
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
    
    default:
      return null;
  }
};

// Generate breadcrumb helper
export const generateBreadcrumb = (currentPage: string, currentUrl: string) => {
  return generateStructuredData('breadcrumb', [
    { name: "Home", url: "https://ibb.impactadvisory.co.tz/" },
    { name: currentPage, url: currentUrl },
  ]);
};
