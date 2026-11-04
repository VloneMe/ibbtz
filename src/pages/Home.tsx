import AdvancedSEO from '@/components/common/AdvancedSEO';
import PerformanceOptimizer from '@/components/common/PerformanceOptimizer';
import { seoConfig, generateStructuredData } from '@/config/seo';
import { useState, useEffect } from 'react';
import AgendaModal from '@/components/common/AgendaModal';
import SponsorModal from '@/components/common/SponsorModal';

// Import all the new section components
import {
  HeroSection,
  QuoteAboutSection,
  ImageShowcaseCarousel,
  WhyAttendSection,
  VisionMissionSection,
  WhoShouldAttendSection,
  EventHighlightsSection,
  ObjectivesSection,
  SponsorshipSection,
  PartnersSection,
  FAQSection,
  ContactSection,
  ParentOrganizationSection
} from '@/components/home';

import ibb2 from '@/assets/ibb+14/ibb2.jpeg';
import ibb3 from '@/assets/ibb+14/ibb3.jpeg';
import ibb4 from '@/assets/ibb+14/ibb4.jpeg';
import ibb7 from '@/assets/ibb+14/ibb7.jpg';

const EventDetailPage = () => {
  // Agenda modal state
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  
  // Sponsor modal state
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  
  // Sponsorship carousel state
  const [sponsorshipCarouselIndex, setSponsorshipCarouselIndex] = useState(0);
  
  // Carousel states
  const [summitHighlightsCarouselIndex, setSummitHighlightsCarouselIndex] = useState(0);
  
  // Media API state
  const [media, setMedia] = useState<any[]>([]);
  
  // Media fetch function
  const fetchMedia = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_API_URL || '{{url}}';
      const apiToken = import.meta.env.VITE_API_TOKEN;
      
      const response = await fetch(`${baseUrl}/media`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.status}`);
      }
      
      const mediaData = await response.json();
      setMedia(mediaData);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };
  
  // Fetch media on component mount
  useEffect(() => {
    fetchMedia();
  }, []);

  // Helper function to get media URL
  const getMediaUrl = (mediaItem: any) => {
    const imgUrl = import.meta.env.VITE_IMG_URL;
    return imgUrl ? `${imgUrl}/${mediaItem.url}` : mediaItem.url;
  };

  // Get featured media (first image or specific featured image)
  const getFeaturedMedia = () => {
    if (media.length > 0) {
      return media[0];
    }
    return null;
  };

  // Contact form submission handler
  const handleContactSubmit = async (_formData: any) => {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 2000));
  };
  
  // Carousel images
  const eventDateCarouselImages = [ibb2, ibb3, ibb4];
  const summitHighlightsCarouselImages = [ibb4];
  const sponsorshipCarouselImages = [ibb7];
  
  // Carousel navigation handlers
  const handleSummitHighlightsNext = () => {
    setSummitHighlightsCarouselIndex((prev) => 
      prev === summitHighlightsCarouselImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleSummitHighlightsPrev = () => {
    setSummitHighlightsCarouselIndex((prev) => 
      prev === 0 ? summitHighlightsCarouselImages.length - 1 : prev - 1
    );
  };
  
  const handleSponsorshipNext = () => {
    setSponsorshipCarouselIndex((prev) => 
      prev === sponsorshipCarouselImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleSponsorshipPrev = () => {
    setSponsorshipCarouselIndex((prev) => 
      prev === 0 ? sponsorshipCarouselImages.length - 1 : prev - 1
    );
  };

  // Generate comprehensive structured data for the home page
  const structuredData = [
    generateStructuredData('organization'),
    generateStructuredData('event'),
    generateStructuredData('website'),
    generateStructuredData('localBusiness'),
    generateStructuredData('faq'),
    generateStructuredData('article'),
    generateStructuredData('howto'),
    generateStructuredData('review'),
  ];

  // Performance optimization data
  const performanceData = {
    images: [
      { src: '/src/assets/ibb.jpg', alt: 'IBB+ Tanzania Event', priority: true },
      { src: '/src/assets/ibbV1.jpeg', alt: 'IBB+ Event Background', priority: false },
      { src: '/src/assets/impactlogo.jpeg', alt: 'IBB+ Logo', priority: true },
    ],
    preload: [
      '/src/assets/ibb.jpg',
      '/src/assets/impactlogo.jpeg',
    ],
    prefetch: [
      '/src/assets/ibbV1.jpeg',
    ],
  };

  return (
    <>
      {/* Advanced SEO Meta Tags */}
      <AdvancedSEO
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        url={seoConfig.pages.home.url}
        type="website"
        structuredData={structuredData}
        canonicalUrl={seoConfig.pages.home.url}
        alternateUrls={{
          "en": "https://ibb.impactadvisory.co.tz/",
          "sw": "https://ibb.impactadvisory.co.tz/",
          "x-default": "https://ibb.impactadvisory.co.tz/"
        }}
        twitterHandle="@impactadvisorytz"
        geoLocation={{ latitude: -6.7924, longitude: 39.2083 }}
        businessHours="Mo-Fr 08:00-17:00"
        priceRange="TZS 120,000 - TZS 1,500,000"
        rating={{ value: 5, count: 150 }}
        breadcrumbs={[
          { name: "Home", url: "https://ibb.impactadvisory.co.tz/" }
        ]}
      />

      {/* Performance Optimization */}
      <PerformanceOptimizer
        images={performanceData.images}
        preload={performanceData.preload}
        prefetch={performanceData.prefetch}
        enableLazyLoading={true}
      />
      
      <main className="min-h-screen bg-black/80 text-white font-poppins mx-auto">
        {/* Hero Section */}
        <HeroSection onViewAgenda={() => setIsAgendaModalOpen(true)} />

        {/* Quote and About Section */}
        <QuoteAboutSection 
          getFeaturedMedia={getFeaturedMedia}
          getMediaUrl={getMediaUrl}
        />

        {/* Image Showcase Carousel Section */}
        <ImageShowcaseCarousel images={eventDateCarouselImages} />

        {/* Why Attend Section */}
        <WhyAttendSection />

        {/* Vision, Mission, Objectives Section */}
        <VisionMissionSection />

        {/* Event Date and Location */}
        {/* <EventDateSection 
          eventDateCarouselImages={eventDateCarouselImages}
          eventDateCarouselIndex={eventDateCarouselIndex}
          handleEventDateNext={handleEventDateNext}
          handleEventDatePrev={handleEventDatePrev}
        /> */}

        {/* Who Should Attend Section */}
        <WhoShouldAttendSection />

        {/* Summit Highlights */}
        <EventHighlightsSection 
          summitHighlightsCarouselImages={summitHighlightsCarouselImages}
          summitHighlightsCarouselIndex={summitHighlightsCarouselIndex}
          handleSummitHighlightsNext={handleSummitHighlightsNext}
          handleSummitHighlightsPrev={handleSummitHighlightsPrev}
        />

        {/* Objectives Section */}
        <ObjectivesSection />

        {/* Sponsorship Opportunity Section */}
        <SponsorshipSection 
          sponsorshipCarouselImages={sponsorshipCarouselImages}
          sponsorshipCarouselIndex={sponsorshipCarouselIndex}
          handleSponsorshipNext={handleSponsorshipNext}
          handleSponsorshipPrev={handleSponsorshipPrev}
          onBecomeSponsor={() => setIsSponsorModalOpen(true)}
        />

        {/* Partners Section */}
        <PartnersSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Get in Touch Section */}
        <ContactSection onContactSubmit={handleContactSubmit} />

        {/* Parent Organization Connection */}
        <ParentOrganizationSection />

        {/* Agenda Modal */}
        <AgendaModal
          isOpen={isAgendaModalOpen}
          onClose={() => setIsAgendaModalOpen(false)}
          agenda={[]}
          eventTitle="Impact Business Breakfast"
        />

        {/* Sponsor Modal */}
        <SponsorModal
          isOpen={isSponsorModalOpen}
          onClose={() => setIsSponsorModalOpen(false)}
          onSuccess={(sponsor) => {
            console.log('Sponsor application submitted:', sponsor);
            // You can add additional success handling here
          }}
        />
      </main>
    </>
  );
};

export default EventDetailPage;