import React from 'react';

// Define prop types
interface PageCardProps {
  page: string;
  src: string;
  title1: string;
  title2: string;
  description: string;
}

export const PageCard: React.FC<PageCardProps> = ({ page, src, title1, title2, description }) => {
  return (
    <div className=''>
      <div className='md:h-[65vh] h-[50vh] mb-5 bg-fixed relative'>
        <img
          src={src}
          alt={title1} // Using title1 for a more meaningful alt text
          className='relative h-full object-cover object-top bg-fixed'
        />

        <div className='bg-black/60 absolute z-[1] inset-0 w-full h-full'/>

        <div className='absolute z-[2] inset-0 -bottom-28'>
          <div className='Container w-full h-full flex flex-col justify-center text-white space-y-5 bottom-7'>
            <h3 className='md:text-3xl text-lg border-l-4 pl-3 rounded-lg border-blue-600'>
              {page}
            </h3>

            <h3 className='md:text-5xl text-3xl font-bold'>
              {title1} 
              <span className='text-blue-400'> {title2} </span>
            </h3>

            <h5 className='md:text-xl text-lg font-mono font-bold text-white/70 italic'>
              {description}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
