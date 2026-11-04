import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export const usePageLoading = () => {
  const context = useContext(PageLoadingContext);
  if (!context) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider');
  }
  return context;
};

interface PageLoadingProviderProps {
  children: ReactNode;
}

export const PageLoadingProvider: React.FC<PageLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log('🔄 Route changed to:', location.pathname);
    console.log('📊 Current loading state:', isLoading);
  }, [location.pathname, isLoading]);

  // Simple auto-loading on route changes
  useEffect(() => {
    console.log('🚀 Starting loading for route:', location.pathname);
    setIsLoading(true);
    setLoadingMessage('Loading page...');
    
    const timer = setTimeout(() => {
      console.log('✅ Loading completed for route:', location.pathname);
      setIsLoading(false);
    }, 600); // Shorter loading time

    return () => {
      console.log('🧹 Cleaning up timer for route:', location.pathname);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const setLoading = (loading: boolean) => {
    console.log('🔧 Manual loading state change:', loading);
    setIsLoading(loading);
  };

  return (
    <PageLoadingContext.Provider 
      value={{ 
        isLoading, 
        setLoading, 
        loadingMessage, 
        setLoadingMessage 
      }}
    >
      {children}
    </PageLoadingContext.Provider>
  );
};
