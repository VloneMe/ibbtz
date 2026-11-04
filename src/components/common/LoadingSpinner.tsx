import React from 'react';
import { Section } from '../common/Section';
import impactLogo from "/src/assets/logo/logo.png";

const LoadingSpinner: React.FC = () => {
  return (
    <Section className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-[#768f00] border-t-transparent rounded-full animate-spin"></div>
        <img 
          src={impactLogo}
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </div>
    </Section>
  );
};

export default LoadingSpinner;