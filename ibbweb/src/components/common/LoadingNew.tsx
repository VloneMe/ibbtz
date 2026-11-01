import React from 'react';
import impactLogo from "/src/assets/logo/logo.png";

export const LoadingNew: React.FC = () => {  
  return (  
    <div className="flex flex-col gap-3 justify-center items-center min-h-[50vh]">  
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#768f00] border-t-transparent rounded-full animate-spin"></div>
        <img 
          src={impactLogo}
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </div>
      <span>Loading ....</span>  
    </div>  
  );  
};