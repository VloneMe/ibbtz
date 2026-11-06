import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import SponsorForm from './SponsorForm';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (sponsor: any) => void;
}

export default function SponsorModal({ isOpen, onClose, onSuccess }: SponsorModalProps) {
  const handleSuccess = (sponsor: any) => {
    if (onSuccess) {
      onSuccess(sponsor);
    }
    // Close modal after successful submission
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white border-stone">
        <DialogHeader>
          <DialogTitle className="sr-only">Sponsor Registration</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div>
          <SponsorForm 
            onSuccess={handleSuccess}
            onCancel={onClose}
            title="Become an IBB+ Sponsor"
            description="We would love to have you as a sponsor. Please fill out the form below to get started."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
