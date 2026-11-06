import { useState } from 'react';
import AdvancedSEO from '@/components/common/AdvancedSEO';
import SponsorModal from '@/components/common/SponsorModal';
import { seoConfig, generateStructuredData } from '@/config/seo';
import {
  HeroSection, AboutSection, EditionSection, WhatWeDoSection, AudienceSection,
  GalaCallout, SponsorshipSection, PartnersSection, FAQSection, ContactStrip,
} from '@/components/home';

const Home = () => {
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const openSponsor = () => setSponsorOpen(true);
  const structuredData = [
    generateStructuredData('organization'),
    generateStructuredData('event'),
    generateStructuredData('website'),
    generateStructuredData('faq'),
  ];

  return (
    <>
      <AdvancedSEO
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        url={seoConfig.pages.home.url}
        type="website"
        structuredData={structuredData}
        canonicalUrl={seoConfig.pages.home.url}
      />
      <HeroSection onBecomeSponsor={openSponsor} />
      <AboutSection />
      <EditionSection />
      <WhatWeDoSection />
      <AudienceSection />
      <GalaCallout />
      <SponsorshipSection onBecomeSponsor={openSponsor} />
      <PartnersSection />
      <FAQSection />
      <ContactStrip />
      <SponsorModal isOpen={sponsorOpen} onClose={() => setSponsorOpen(false)} />
    </>
  );
};

export default Home;
