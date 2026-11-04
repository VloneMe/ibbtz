import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl w-full mx-auto lg:max-w-[85rem] xl:max-w-[78rem] sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
