import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { usePageLoading } from '../../contexts/PageLoadingContext';

interface WithPageLoadingOptions {
  loadingMessage?: string;
  customLoadingTime?: number;
}

export function withPageLoading<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithPageLoadingOptions = {}
) {
  const { loadingMessage = 'Loading...', customLoadingTime } = options;

  return function WithPageLoadingComponent(props: P) {
    const { setLoading, setLoadingMessage } = usePageLoading();
    const hasLoaded = useRef(false);

    useEffect(() => {
      // Only run loading once per component mount
      if (hasLoaded.current) return;
      hasLoaded.current = true;

      // Set custom loading message if provided
      if (loadingMessage) {
        setLoadingMessage(loadingMessage);
      }

      // Set loading to true
      setLoading(true);

      // Custom loading time or default
      const loadingTime = customLoadingTime || 800;
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime);

      return () => {
        clearTimeout(timer);
        setLoading(false);
      };
    }, []); // Empty dependency array to run only once

    return <WrappedComponent {...props} />;
  };
}

// Hook for manual loading control
export function usePageLoadingControl() {
  const { setLoading, setLoadingMessage, isLoading } = usePageLoading();

  const startLoading = (message?: string) => {
    if (message) setLoadingMessage(message);
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setLoadingWithMessage = (loading: boolean, message?: string) => {
    if (message) setLoadingMessage(message);
    setLoading(loading);
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingWithMessage,
  };
}
