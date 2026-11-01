import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import RegistrationModal from '../common/RegistrationModal';
import { RegistrationProvider, useRegistration } from '../../contexts/RegistrationContext';
import { PageLoadingProvider, usePageLoading } from '../../contexts/PageLoadingContext';
import PageLoader from '../common/PageLoader';
import PageTransition from '../common/PageTransition';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const RootLayoutContent = () => {

  const { pathname } = useLocation();
  const { isLoading, loadingMessage } = usePageLoading();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const { isRegistrationModalOpen, openRegistrationModal, closeRegistrationModal } = useRegistration();

  // Default event data - you can make this dynamic based on current route if needed
  const eventData = {
    title: "Impact Business Breakfast 2025",
    date: "November 28, 2025",
    location: "Dar es Salaam, Tanzania",
    requirements: [
      "Valid ID required",
      "Business card for networking",
      "Laptop for workshops"
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <Navigation onRegisterClick={openRegistrationModal} />
      <main className="pt-16">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      
      {/* Page Loader */}
      <PageLoader isLoading={isLoading} message={loadingMessage} />
      
      {/* Registration Modal - Available on all routes */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        eventTitle={eventData.title}
        eventDate={eventData.date}
        eventLocation={eventData.location}
        requirements={eventData.requirements}
      />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
};

const RootLayout = () => {
  return (
    <PageLoadingProvider>
      <RegistrationProvider>
        <RootLayoutContent />
      </RegistrationProvider>
    </PageLoadingProvider>
  );
};

export default RootLayout;
