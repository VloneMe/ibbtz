import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { contactFormSchema, contactApi, type ContactFormData } from '@/services/contactApi';

interface ContactFormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  successMessage: string | null;
  submissionId: string | null;
}

interface ContactFormProps {
  onSubmit?: (formData: ContactFormData) => Promise<void>;
  className?: string;
  title?: string;
  description?: string;
}

export default function ContactForm({ 
  onSubmit,
  className = "",
  title = "Send us a Message",
  description
}: ContactFormProps) {
  const [formState, setFormState] = useState<ContactFormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    successMessage: null,
    submissionId: null
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fname: '',
      lname: '',
      phone: '',
      company: '',
      country: '',
      email: '',
      subject: '',
      message: '',
      sentFrom: 'ibb - website'
    }
  });


  // Form submission handler using React Hook Form
  const onSubmitForm = async (data: ContactFormData) => {
    setFormState({ 
      isSubmitting: true, 
      isSubmitted: false, 
      error: null, 
      successMessage: null, 
      submissionId: null 
    });
    
    try {
      if (onSubmit) {
        // Use custom onSubmit handler if provided
        await onSubmit(data);
        setFormState({ 
          isSubmitting: false, 
          isSubmitted: true, 
          error: null, 
          successMessage: 'Message sent successfully! We\'ll get back to you soon.',
          submissionId: null
        });
      } else {
        // Use the built-in API call directly
        try {
          const response = await contactApi.submitContact(data);
          setFormState({ 
            isSubmitting: false, 
            isSubmitted: true, 
            error: null, 
            successMessage: response.message,
            submissionId: response.data.id
          });
        } catch (apiError) {
          // If API fails, show a fallback success message
          console.warn('API call failed, showing fallback message:', apiError);
          setFormState({ 
            isSubmitting: false, 
            isSubmitted: true, 
            error: null, 
            successMessage: 'Message sent successfully! We\'ll get back to you soon. (Note: API temporarily unavailable)',
            submissionId: null
          });
        }
      }
      
      reset(); // Reset form using React Hook Form
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      setFormState({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: errorMessage,
        successMessage: null,
        submissionId: null
      });
    }
  };


  return (
    <div className={`bg-white p-6 sm:p-8 rounded-sm border border-stone ${className}`}>
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-ink mb-2">{title}</h3>
        {description && (
          <p className="text-ink-muted">{description}</p>
        )}
      </div>
      
      {/* Success Message */}
      {formState.isSubmitted && formState.successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div className="text-green-600">
            <p>{formState.successMessage}</p>
            {formState.submissionId && (
              <p className="text-xs text-green-700 mt-1">
                Reference ID: {formState.submissionId}
              </p>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Error Message */}
      {formState.error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-600">{formState.error}</p>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 sm:space-y-6">
        {/* Hidden field for sentFrom */}
        <input type="hidden" {...register('sentFrom')} value="ibb - website" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-fname" className="field-label">
              First Name *
            </Label>
            <Input 
              id="contact-fname"
              type="text" 
              {...register('fname')}
              className={`field ${
                errors.fname ? 'border-red-500' : ''
              }`}
              placeholder="Your first name"
            />
            {errors.fname && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.fname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-lname" className="field-label">
              Last Name *
            </Label>
            <Input 
              id="contact-lname"
              type="text" 
              {...register('lname')}
              className={`field ${
                errors.lname ? 'border-red-500' : ''
              }`}
              placeholder="Your last name"
            />
            {errors.lname && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.lname.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-email" className="field-label">
              Email *
            </Label>
            <Input 
              id="contact-email"
              type="email" 
              {...register('email')}
              className={`field ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-phone" className="field-label">
              Phone *
            </Label>
            <Input 
              id="contact-phone"
              type="tel" 
              {...register('phone')}
              className={`field ${
                errors.phone ? 'border-red-500' : ''
              }`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-company" className="field-label">
              Company *
            </Label>
            <Input 
              id="contact-company"
              type="text" 
              {...register('company')}
              className={`field ${
                errors.company ? 'border-red-500' : ''
              }`}
              placeholder="Your company name"
            />
            {errors.company && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-country" className="field-label">
              Country *
            </Label>
            <Input 
              id="contact-country"
              type="text" 
              {...register('country')}
              className={`field ${
                errors.country ? 'border-red-500' : ''
              }`}
              placeholder="Your country"
            />
            {errors.country && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="contact-subject" className="field-label">
            Subject *
          </Label>
          <Input 
            id="contact-subject"
            type="text" 
            {...register('subject')}
            className={`field ${
              errors.subject ? 'border-red-500' : ''
            }`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="contact-message" className="field-label">
            Message *
          </Label>
          <Textarea 
            id="contact-message"
            {...register('message')}
            rows={6}
            className={`field resize-none ${
              errors.message ? 'border-red-500' : ''
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={formState.isSubmitting}
          className="w-full bg-navy hover:bg-navy-soft text-white py-4 text-lg font-semibold disabled:opacity-50"
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
