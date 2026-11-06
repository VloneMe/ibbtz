import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import RegistrationModal from '../common/RegistrationModal';
import PageLoader from '../common/PageLoader';
import PageTransition from '../common/PageTransition';
import { RegistrationProvider, useRegistration } from '../../contexts/RegistrationContext';
import { PageLoadingProvider, usePageLoading } from '../../contexts/PageLoadingContext';

const RootLayoutContent = () => {
  const { pathname } = useLocation();
  const { isLoading, loadingMessage } = usePageLoading();
  const { isRegistrationModalOpen, closeRegistrationModal } = useRegistration();

  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Navigation />
      <main id="main" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <PageLoader isLoading={isLoading} message={loadingMessage} />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        eventTitle="Impact Business Breakfast"
        eventDate="November 28, 2025"
        eventLocation="Dar es Salaam, Tanzania"
        requirements={[]}
      />
      <Toaster position="top-right" richColors />
    </div>
  );
};

const RootLayout = () => (
  <PageLoadingProvider>
    <RegistrationProvider>
      <RootLayoutContent />
    </RegistrationProvider>
  </PageLoadingProvider>
);

export default RootLayout;
