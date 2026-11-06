import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** narrow: 56rem, default: 80rem */
  size?: 'default' | 'narrow';
}

export const Container = ({ children, className = '', size = 'default' }: ContainerProps) => (
  <div className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl'} ${className}`}>
    {children}
  </div>
);
