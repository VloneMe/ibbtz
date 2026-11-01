import { motion } from 'framer-motion';
import { X, User, Building, MapPin, Calendar, CheckCircle, AlertCircle, Loader2, Mail, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { registrationApi, type RegistrationPayload } from '@/services/registrationApi';
import { newsletterApi, type NewsletterSubscriptionPayload } from '@/services/newsletterApi';
import { toast } from 'sonner';

import vodalipa from '@/assets/lipa options/mpesalipa-ad.png';
import yaslipa from '@/assets/lipa options/yaslipa-ad.png';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  requirements: string[];
  eventId?: string; // Made optional with default fallback
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  personalPhoneNumber: string;
  officePhoneNumber: string;
  personalEmail: string;
  companyName: string;
  role: string;
  roleOther: string;
  industry: string;
  experience: string;
  expectations: string;
  registrationType: 'Individual' | 'Corporate';
  sponsorPartner: 'Yes' | 'No';
  paymentTerms: 'Pay Now' | 'Pay Later';
  dietaryRequirements: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  eventTitle, 
  // eventDate, 
  eventLocation, 
  // requirements
}: RegistrationModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      personalPhoneNumber: '',
      officePhoneNumber: '',
      personalEmail: '',
      companyName: '',
      role: '',
      roleOther: '',
      industry: '',
      experience: '',
      expectations: '',
      registrationType: 'Individual',
      sponsorPartner: 'No',
      paymentTerms: 'Pay Now',
      dietaryRequirements: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    mode: 'onChange'
  });

  const [formState, setFormState] = useState({
    isSubmitted: false,
    error: null as string | null,
    showNewsletterPrompt: false,
    newsletterSubscribed: false,
    isSubscribingToNewsletter: false
  });
  

  // Watch form values for dynamic updates
  const watchedValues = watch();

  // Set up validation rules for Select fields
  useEffect(() => {
    setValue('role', watchedValues.role || '', { shouldValidate: true });
    setValue('registrationType', watchedValues.registrationType || 'Individual', { shouldValidate: true });
    setValue('sponsorPartner', watchedValues.sponsorPartner || 'No', { shouldValidate: true });
    setValue('paymentTerms', watchedValues.paymentTerms || 'Pay Now', { shouldValidate: true });
  }, [setValue, watchedValues.role, watchedValues.registrationType, watchedValues.sponsorPartner, watchedValues.paymentTerms]);

  // Default event ID - always use this for all registrations
  const DEFAULT_EVENT_ID = '94d539b0-09fc-472c-bd94-d1c4715de85a';
  
  // Always use default event ID for all registrations
  const currentEventId = DEFAULT_EVENT_ID;

  // Pricing configuration
  const pricing = {
    Individual: 120000,
    Corporate: 1500000
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  const onSubmit = async (data: RegistrationFormData) => {
    setFormState({ 
      isSubmitted: false, 
      error: null,
      showNewsletterPrompt: false,
      newsletterSubscribed: false,
      isSubscribingToNewsletter: false
    });
    
    try {
      // Map form data to API payload
      const payload: RegistrationPayload = {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        personalPhoneNumber: data.personalPhoneNumber,
        officePhoneNumber: data.officePhoneNumber,
        personalEmail: data.personalEmail,
        companyName: data.companyName,
        role: data.role,
        ...(data.role === 'Other' && data.roleOther ? { roleOther: data.roleOther } : {}),
        registrationType: data.registrationType,
        sponsorPartner: data.sponsorPartner,
        expectations: data.expectations,
        paymentTerms: data.paymentTerms,
        eventId: currentEventId
      };
      
      const response = await registrationApi.createRegistration(payload);
      
      if (response.success) {
        setFormState({ 
          isSubmitted: true, 
          error: null,
          showNewsletterPrompt: true,
          newsletterSubscribed: false,
          isSubscribingToNewsletter: false
        });
        
        toast.success("Registration Successful!", {
          description: "Thank you for registering for Impact Business Breakfast 2025. You will receive a confirmation email shortly.",
        });
      } else {
        // Use exact error message from API response
        const errorMessage = response.error || response.message || 'Registration failed. Please try again.';
        
        setFormState({ 
          isSubmitted: false, 
          error: errorMessage,
          showNewsletterPrompt: false,
          newsletterSubscribed: false,
          isSubscribingToNewsletter: false
        });
        
        if (response.code === 'DUPLICATE_REGISTRATION') {
          toast.warning("Already Registered", {
            description: errorMessage,
          });
        } else {
          toast.error("Registration Failed", {
            description: errorMessage,
          });
        }
      }
    } catch (error: any) {
      // Use exact error message from axios error response
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.';
      
      setFormState({ 
        isSubmitted: false, 
        error: errorMessage,
        showNewsletterPrompt: false,
        newsletterSubscribed: false,
        isSubscribingToNewsletter: false
      });
      
      if (error.response?.data?.code === 'DUPLICATE_REGISTRATION') {
        toast.warning("Already Registered", {
          description: errorMessage,
        });
      } else {
        toast.error("Registration Failed", {
          description: errorMessage,
        });
      }
    }
  };

  const handleNewsletterSubscription = async (subscribe: boolean) => {
    if (!subscribe) {
      setFormState(prev => ({ 
        ...prev, 
        showNewsletterPrompt: false,
        newsletterSubscribed: false
      }));
      return;
    }

    setFormState(prev => ({ 
      ...prev, 
      isSubscribingToNewsletter: true
    }));

    try {
      const newsletterPayload: NewsletterSubscriptionPayload = {
        email: watchedValues.email
      };

      const response = await newsletterApi.subscribeToNewsletter(newsletterPayload);

      if (response.success) {
        setFormState(prev => ({ 
          ...prev, 
          newsletterSubscribed: true,
          showNewsletterPrompt: false,
          isSubscribingToNewsletter: false
        }));
        
        toast.success("Newsletter Subscribed!", {
          description: "Thank you for subscribing to our newsletter. You'll receive updates about upcoming events.",
        });
      } else {
        // Use exact error message from API response
        const errorMessage = response.error || response.message || 'Failed to subscribe to newsletter';
        
        // Check if user is already subscribed - if so, just continue without error
        if (response.code === 'VALIDATION_ERROR' && response.details?.currentStatus === 'subscribed') {
          setFormState(prev => ({ 
            ...prev, 
            newsletterSubscribed: true,
            showNewsletterPrompt: false,
            isSubscribingToNewsletter: false
          }));
          
          toast.success("Already Subscribed!", {
            description: "You are already subscribed to our newsletter. Thank you!",
          });
          return;
        }
        
        setFormState(prev => ({ 
          ...prev, 
          isSubscribingToNewsletter: false
        }));
        
        toast.warning("Subscription Issue", {
          description: errorMessage,
        });
      }
    } catch (error: any) {
      // Use exact error message from axios error response
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to subscribe to newsletter. Please try again.';
      
      setFormState(prev => ({ 
        ...prev, 
        isSubscribingToNewsletter: false
      }));
      
      toast.error("Subscription Failed", {
        description: errorMessage,
      });
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !formState.isSubscribingToNewsletter) {
      reset();
      setFormState({ 
        isSubmitted: false, 
        error: null,
        showNewsletterPrompt: false,
        newsletterSubscribed: false,
        isSubscribingToNewsletter: false
      });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#f78e22]/55 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#012557] border border-[oklch(0.473_0.137_46.201)]/30 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[oklch(0.473_0.137_46.201)]/20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">IBB+ 14th Registration</h2>
            <div className="flex flex-col sm:flex-row lg:items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#768f00]" />
                <span>{"November 28, 2025"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#768f00]" />
                <span>{eventLocation}</span>
              </div>
              <div className="bg-[#768f00] text-white px-2 py-1 rounded text-xs font-semibold">
                {formatCurrency(pricing[watchedValues.registrationType])}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting || formState.isSubscribingToNewsletter}
            className="text-gray-400 hover:text-white hover:bg-[oklch(0.473_0.137_46.201)]/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {formState.isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              {formState.showNewsletterPrompt ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Successful!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for registering for Impact Business Breakfast 2025. You will receive a confirmation email shortly with event details and updates.
                  </p>
                  
                  {/* Newsletter Subscription Prompt */}
                  <div className="bg-[oklch(0.473_0.137_46.201)]/10 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-[#768f00] mr-3" />
                      <h4 className="text-xl font-semibold text-white">Stay Updated!</h4>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Would you like to receive updates about upcoming events and newsletters from Impact Advisory?
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => handleNewsletterSubscription(true)}
                        disabled={formState.isSubscribingToNewsletter}
                        className="bg-[#768f00] hover:bg-[#768f00]/80 text-white px-6 py-2"
                      >
                        {formState.isSubscribingToNewsletter ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Yes, Subscribe Me
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleNewsletterSubscription(false)}
                        disabled={formState.isSubscribingToNewsletter}
                        variant="outline"
                        className="border-white/20 text-gray-700 hover:bg-white/10 hover:border-white/30 px-6 py-2"
                      >
                        No, Thanks
                      </Button>
                    </div>
                  </div>
                </>
              ) : formState.newsletterSubscribed ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">All Set!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for registering and subscribing to our newsletter! You'll receive updates about upcoming events and important announcements.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white"
                  >
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Successful!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for registering for {eventTitle}. You will receive a confirmation email shortly with event details and updates.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white"
                  >
                    Close
                  </Button>
                </>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Pricing Information */}
              <div className="bg-[oklch(0.473_0.137_46.201)]/10 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg p-4" hidden>
                  <h3 className="text-lg font-semibold text-white mb-3">Registration Pricing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg border-2 transition-all ${
                      watchedValues.registrationType === 'Individual' 
                        ? 'border-[#768f00] bg-[#768f00]/10' 
                        : 'border-white/20 bg-white/5'
                    }`}>
                      <div className="text-center">
                        <h4 className="font-semibold text-white mb-1">Individual</h4>
                        <p className="text-2xl font-bold text-[#768f00]">{formatCurrency(pricing.Individual)}</p>
                        <p className="text-xs text-gray-400 mt-1">Per person</p>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border-2 transition-all ${
                      watchedValues.registrationType === 'Corporate' 
                        ? 'border-[#768f00] bg-[#768f00]/10' 
                        : 'border-white/20 bg-white/5'
                    }`}>
                      <div className="text-center">
                        <h4 className="font-semibold text-white mb-1">Corporate</h4>
                        <p className="text-2xl font-bold text-[#768f00]">{formatCurrency(pricing.Corporate)}</p>
                        <p className="text-xs text-gray-400 mt-1">Per organization</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-3 text-center">
                    Selected: <span className="font-semibold text-[#768f00]">{watchedValues.registrationType}</span> - {formatCurrency(pricing[watchedValues.registrationType])}
                  </p>
                </div>

              {/* Event Requirements */}
              {/* {requirements.length > 0 && (
                <div className="bg-[oklch(0.473_0.137_46.201)]/10 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Event Requirements</h3>
                  <ul className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#768f00] mt-0.5 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Error Message */}
              {formState.error && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-lg flex items-start gap-3 ${
                    formState.error.includes('already registered') 
                      ? 'bg-yellow-500/20 border-yellow-500/30' 
                      : 'bg-red-500/20 border-red-500/30'
                  }`}
                >
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    formState.error.includes('already registered') 
                      ? 'text-yellow-400' 
                      : 'text-red-400'
                  }`} />
                  <div className="flex-1">
                    <p className={`${
                      formState.error.includes('already registered') 
                        ? 'text-yellow-400' 
                        : 'text-red-400'
                    }`}>
                      {formState.error}
                    </p>
                    {formState.error.includes('already registered') && (
                      <p className="text-yellow-300 text-sm mt-2">
                        If you need to update your registration details, please contact our support team.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-[#768f00]" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white font-semibold mb-2 block">First Name *</Label>
                    <Input 
                      id="firstName"
                      type="text" 
                      {...register('firstName', { required: 'First name is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.firstName ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-white font-semibold mb-2 block">Last Name *</Label>
                    <Input 
                      id="lastName"
                      type="text" 
                      {...register('lastName', { required: 'Last name is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.lastName ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-white font-semibold mb-2 block">Office Email Address *</Label>
                    <Input 
                      id="email"
                      type="email" 
                      {...register('email', { 
                        // required: 'Email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Email is invalid'
                        }
                      })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="personalPhoneNumber" className="text-white font-semibold mb-2 block">Personal Phone Number *</Label>
                    <Input 
                      id="personalPhoneNumber"
                      type="tel" 
                      {...register('personalPhoneNumber', { required: 'Personal phone number is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.personalPhoneNumber ? 'border-red-500' : ''
                      }`}
                      placeholder="+255 XXX XXX XXX"
                    />
                    {errors.personalPhoneNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.personalPhoneNumber.message}</p>
                    )}
                  </div>
                </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="personalEmail" className="text-white font-semibold mb-2 block">Personal Email *</Label>
                    <Input 
                      id="personalEmail"
                      type="email" 
                      {...register('personalEmail', { 
                        required: 'Personal email is required',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Personal email is invalid'
                        }
                      })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.personalEmail ? 'border-red-500' : ''
                      }`}
                      placeholder="your.personal@email.com"
                    />
                    {errors.personalEmail && (
                      <p className="text-red-400 text-sm mt-1">{errors.personalEmail.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="officePhoneNumber" className="text-white font-semibold mb-2 block">Office Phone Number (Optional)</Label>
                    <Input 
                      id="officePhoneNumber"
                      type="tel" 
                      {...register('officePhoneNumber')}
                      className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00]"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>
                </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Building className="h-5 w-5 text-[#768f00]" />
                  Professional Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-white font-semibold mb-2 block">Company/Organization *</Label>
                    <Input 
                      id="companyName"
                      type="text" 
                      {...register('companyName', { required: 'Company/Organization is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.companyName ? 'border-red-500' : ''
                      }`}
                      placeholder="Your company or organization"
                    />
                    {errors.companyName && (
                      <p className="text-red-400 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="role" className="text-white font-semibold mb-2 block">Job Title/Role *</Label>
                    <Select
                      value={watchedValues.role}
                      onValueChange={(value) => {
                        setValue('role', value, { shouldValidate: true });
                        // Clear roleOther when role changes from "Other"
                        if (value !== 'Other') {
                          setValue('roleOther', '', { shouldValidate: true });
                        }
                      }}
                    >
                      <SelectTrigger className={`w-full bg-white/10 border-white/20 text-white focus:border-[#768f00] ${
                        errors.role ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border border-[oklch(0.473_0.137_46.201)]/30">
                        <SelectItem value="CEO">CEO</SelectItem>
                        <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                        <SelectItem value="Senior Level Manager">Senior Level Manager</SelectItem>
                        <SelectItem value="Mid-Level Manager">Mid-Level Manager</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
                    )}
                    {watchedValues.role === 'Other' && (
                      <div className="mt-4">
                        <Label htmlFor="roleOther" className="text-white font-semibold mb-2 block">Please specify your role *</Label>
                        <Input 
                          id="roleOther"
                          type="text" 
                          {...register('roleOther', { 
                            validate: (value) => {
                              if (watchedValues.role === 'Other' && !value?.trim()) {
                                return 'Please specify your role when selecting "Other"';
                              }
                              return true;
                            }
                          })}
                          className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                            errors.roleOther ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter your job title/role"
                        />
                        {errors.roleOther && (
                          <p className="text-red-400 text-sm mt-1">{errors.roleOther.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry" className="text-white font-semibold mb-2 block">Industry *</Label>
                    <Input 
                      id="industry"
                      type="text" 
                      {...register('industry', { required: 'Industry is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.industry ? 'border-red-500' : ''
                      }`}
                      placeholder="e.g., Technology, Finance, Healthcare"
                    />
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="experience" className="text-white font-semibold mb-2 block">Years of Experience *</Label>
                    <Input 
                      id="experience"
                      type="text" 
                      {...register('experience', { required: 'Years of experience is required' })}
                      className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] ${
                        errors.experience ? 'border-red-500' : ''
                      }`}
                      placeholder="e.g., 5-10 years"
                    />
                    {errors.experience && (
                      <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationType" className="text-white font-semibold mb-2 block">Registration Type *</Label>
                    <Select
                      value={watchedValues.registrationType}
                      onValueChange={(value) => setValue('registrationType', value as 'Individual' | 'Corporate')}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white focus:border-[#768f00]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border border-[oklch(0.473_0.137_46.201)]/30">
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* <div>
                    <Label htmlFor="sponsorPartner" className="text-white font-semibold mb-2 block">Would you like to become one of our Sponsor/Partner *</Label>
                    <Select
                      value={watchedValues.sponsorPartner}
                      onValueChange={(value) => setValue('sponsorPartner', value as 'Yes' | 'No')}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white focus:border-[#768f00]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border border-[oklch(0.473_0.137_46.201)]/30">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                  
                  <div>
                    <Label htmlFor="paymentTerms" className="text-white font-semibold mb-2 block">Payment Terms *</Label>
                    <Select
                      value={watchedValues.paymentTerms}
                      onValueChange={(value) => setValue('paymentTerms', value as 'Pay Now' | 'Pay Later')}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white focus:border-[#768f00]">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border border-[oklch(0.473_0.137_46.201)]/30">
                        <SelectItem value="Pay Now">Pay Now</SelectItem>
                        <SelectItem value="Pay Later">Pay Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                    <Label htmlFor="sponsorPartner" className="text-white font-semibold mb-2 block">Would you like to become one of our Sponsor/Partner *</Label>
                    <Select
                      value={watchedValues.sponsorPartner}
                      onValueChange={(value) => setValue('sponsorPartner', value as 'Yes' | 'No')}
                    >
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white focus:border-[#768f00]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border border-[oklch(0.473_0.137_46.201)]/30">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>

              {/* Event Expectations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Event Expectations</h3>
                
                <div>
                  <Label htmlFor="expectations" className="text-white font-semibold mb-2 block">What do you hope to gain from this event? *</Label>
                  <Textarea 
                    id="expectations"
                    {...register('expectations', { required: 'Event expectations are required' })}
                    rows={4}
                    className={`w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00] resize-none ${
                      errors.expectations ? 'border-red-500' : ''
                    }`}
                    placeholder="Tell us about your goals and what you hope to learn or achieve..."
                  />
                  {errors.expectations && (
                    <p className="text-red-400 text-sm mt-1">{errors.expectations.message}</p>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4" hidden>
                <h3 className="text-lg font-semibold text-white">Additional Information</h3>
                
                <div>
                  <Label htmlFor="dietaryRequirements" className="text-white font-semibold mb-2 block">Dietary Requirements (Optional)</Label>
                  <Input 
                    id="dietaryRequirements"
                    type="text" 
                    {...register('dietaryRequirements')}
                    className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00]"
                    placeholder="Any dietary restrictions or preferences"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact" className="text-white font-semibold mb-2 block">Emergency Contact Name (Optional)</Label>
                    <Input 
                      id="emergencyContact"
                      type="text" 
                      {...register('emergencyContact')}
                      className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00]"
                      placeholder="Emergency contact person"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-white font-semibold mb-2 block">Emergency Contact Phone (Optional)</Label>
                    <Input 
                      id="emergencyPhone"
                      type="tel" 
                      {...register('emergencyPhone')}
                      className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00]"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Payment Options</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <img 
                    src={vodalipa} 
                    alt="Vodacom M-Pesa" 
                    className=" w-full object-contain rounded-lg"
                  />
                  <img 
                    src={yaslipa} 
                    alt="Yaslipa" 
                    className=" w-full object-contain rounded-lg"
                  />
                </div>
                
                {/* Error Message */}
                {formState.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${
                      formState.error.includes('already registered') 
                        ? 'bg-yellow-500/20 border-yellow-500/30' 
                        : 'bg-red-500/20 border-red-500/30'
                    }`}
                  >
                    <AlertCircle className={`h-5 w-5 mt-0.5 ${
                      formState.error.includes('already registered') 
                        ? 'text-yellow-400' 
                        : 'text-red-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`${
                        formState.error.includes('already registered') 
                          ? 'text-yellow-400' 
                          : 'text-red-400'
                      }`}>
                        {formState.error}
                      </p>
                      {formState.error.includes('already registered') && (
                        <p className="text-yellow-300 text-sm mt-2">
                          If you need to update your registration details, please contact our support team.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <div className="mb-4 p-4 bg-[oklch(0.473_0.137_46.201)]/10 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-[#768f00]">
                      {formatCurrency(pricing[watchedValues.registrationType])}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    Payment Terms: <span className="font-semibold">{watchedValues.paymentTerms}</span>
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white py-4 text-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Register - {formatCurrency(pricing[watchedValues.registrationType])}
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  onClick={handleClose}
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full mt-3 border-white/20 text-gray-500 hover:bg-white/10 hover:border-white/30 py-4 text-lg font-semibold disabled:opacity-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;
