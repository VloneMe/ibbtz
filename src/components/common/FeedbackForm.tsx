import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  MessageSquare
} from 'lucide-react';
import { feedbackFormSchema, feedbackApi, type FeedbackFormData } from '@/services/feedbackApi';

interface FeedbackFormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  successMessage: string | null;
  submissionId: string | null;
}

interface FeedbackFormProps {
  onSubmit?: (formData: FeedbackFormData) => Promise<void>;
  className?: string;
  title?: string;
  description?: string;
}

export default function FeedbackForm({ 
  onSubmit,
  className = "",
  title = "Share Your Feedback",
  description
}: FeedbackFormProps) {
  const [formState, setFormState] = useState<FeedbackFormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    successMessage: null,
    submissionId: null
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: '',
      email: '',
      type: '',
      message: '',
      eventId: '94d539b0-09fc-472c-bd94-d1c4715de85a'
    },
    mode: 'onSubmit'
  });

  // Form submission handler using React Hook Form
  const onSubmitForm = async (data: FeedbackFormData) => {
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
          successMessage: 'Thank you for your feedback! We truly appreciate you taking the time to share your thoughts with us. Your input helps us improve and serve you better.',
          submissionId: null
        });
      } else {
        // Use the built-in API call directly
        try {
          const response = await feedbackApi.submitFeedback(data);
          setFormState({ 
            isSubmitting: false, 
            isSubmitted: true, 
            error: null, 
            successMessage: response.message || 'Thank you for your feedback! We truly appreciate you taking the time to share your thoughts with us. Your input helps us improve and serve you better.',
            submissionId: response.data?.id || null
          });
        } catch (apiError) {
          // If API fails, show error message
          const errorMessage = apiError instanceof Error ? apiError.message : 'Failed to submit feedback. Please try again.';
          setFormState({ 
            isSubmitting: false, 
            isSubmitted: false, 
            error: errorMessage,
            successMessage: null,
            submissionId: null
          });
        }
      }
      
      reset(); // Reset form using React Hook Form
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.';
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
      {/* Success Message - Replace entire form */}
      {formState.isSubmitted && formState.successMessage ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 sm:py-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4">
            Thank You!
          </h3>
          <p className="text-lg sm:text-xl text-ink-muted mb-6 max-w-2xl mx-auto leading-relaxed">
            {formState.successMessage}
          </p>
          {formState.submissionId && (
            <p className="text-sm text-green-700">
              Reference ID: {formState.submissionId}
            </p>
          )}
        </motion.div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">{title}</h3>
            </div>
            {description && (
              <p className="text-ink-muted text-sm sm:text-base leading-relaxed">{description}</p>
            )}
          </div>
          
          {/* Error Message */}
          {formState.error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-600">{formState.error}</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 sm:space-y-6">
        {/* Name Field */}
        <div>
          <Label htmlFor="feedback-name" className="field-label">
            Full Name *
          </Label>
          <Input 
            id="feedback-name"
            type="text" 
            {...register('name')}
            className={`field ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="feedback-email" className="field-label">
            Email Address *
          </Label>
          <Input 
            id="feedback-email"
            type="email" 
            {...register('email')}
            className={`field ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Type Field */}
        <div>
          <Label htmlFor="feedback-type" className="field-label">
            Feedback Type *
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger 
                  id="feedback-type"
                  className={`field h-auto ${
                    errors.type ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone text-ink">
                  <SelectItem value="event" className="focus:bg-sand">
                    Event Feedback
                  </SelectItem>
                  <SelectItem value="general" className="focus:bg-sand">
                    General Feedback
                  </SelectItem>
                  <SelectItem value="service" className="focus:bg-sand">
                    Service Feedback
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Event ID Field (Hidden) */}
        <input type="hidden" {...register('eventId')} value="94d539b0-09fc-472c-bd94-d1c4715de85a" />
        
        {/* Message Field */}
        <div>
          <Label htmlFor="feedback-message" className="field-label">
            Your Feedback *
          </Label>
          <Textarea 
            id="feedback-message"
            {...register('message')}
            rows={6}
            className={`field resize-none ${
              errors.message ? 'border-red-500' : ''
            }`}
            placeholder="Please share your thoughts, suggestions, or feedback with us..."
          />
          {errors.message && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={formState.isSubmitting}
          className="btn-primary w-full py-3.5 text-base"
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </form>
        </>
      )}
    </div>
  );
}

