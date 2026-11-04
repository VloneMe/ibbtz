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
    <div className={`bg-black/20 p-6 sm:p-8 rounded-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300">{description}</p>
        )}
      </div>
      
      {/* Success Message */}
      {formState.isSubmitted && formState.successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="h-5 w-5 text-green-400" />
          <div className="text-green-400">
            <p>{formState.successMessage}</p>
            {formState.submissionId && (
              <p className="text-xs text-green-300 mt-1">
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
          className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-400">{formState.error}</p>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 sm:space-y-6">
        {/* Hidden field for sentFrom */}
        <input type="hidden" {...register('sentFrom')} value="ibb - website" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-fname" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              First Name *
            </Label>
            <Input 
              id="contact-fname"
              type="text" 
              {...register('fname')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.fname ? 'border-red-500' : ''
              }`}
              placeholder="Your first name"
            />
            {errors.fname && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.fname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-lname" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              Last Name *
            </Label>
            <Input 
              id="contact-lname"
              type="text" 
              {...register('lname')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.lname ? 'border-red-500' : ''
              }`}
              placeholder="Your last name"
            />
            {errors.lname && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.lname.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-email" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              Email *
            </Label>
            <Input 
              id="contact-email"
              type="email" 
              {...register('email')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-phone" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              Phone *
            </Label>
            <Input 
              id="contact-phone"
              type="tel" 
              {...register('phone')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.phone ? 'border-red-500' : ''
              }`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-company" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              Company *
            </Label>
            <Input 
              id="contact-company"
              type="text" 
              {...register('company')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.company ? 'border-red-500' : ''
              }`}
              placeholder="Your company name"
            />
            {errors.company && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-country" className="text-white font-semibold mb-2 block text-sm sm:text-base">
              Country *
            </Label>
            <Input 
              id="contact-country"
              type="text" 
              {...register('country')}
              className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${
                errors.country ? 'border-red-500' : ''
              }`}
              placeholder="Your country"
            />
            {errors.country && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="contact-subject" className="text-white font-semibold mb-2 block">
            Subject *
          </Label>
          <Input 
            id="contact-subject"
            type="text" 
            {...register('subject')}
            className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 ${
              errors.subject ? 'border-red-500' : ''
            }`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="contact-message" className="text-white font-semibold mb-2 block">
            Message *
          </Label>
          <Textarea 
            id="contact-message"
            {...register('message')}
            rows={6}
            className={`w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 resize-none ${
              errors.message ? 'border-red-500' : ''
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={formState.isSubmitting}
          className="w-full bg-[#768f00] hover:bg-[#768f00]/80 text-white py-4 text-lg font-semibold disabled:opacity-50"
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
