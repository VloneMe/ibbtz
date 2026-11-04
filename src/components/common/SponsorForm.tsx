import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, Building2, User, Mail, Phone, Globe, Image } from 'lucide-react';
import { sponsorsApi } from '@/services/sponsorsApi';
import type { CreateSponsorRequest } from '@/services/sponsorsApi';
import { Logo } from './Logo';

// Zod schema for form validation
const sponsorFormSchema = z.object({
  name: z.string().min(1, 'Company name is required').min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  logo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').min(10, 'Phone number must be at least 10 characters'),
  contactPerson: z.string().min(1, 'Contact person is required').min(2, 'Contact person name must be at least 2 characters'),
  isActive: z.boolean()
});

type SponsorFormData = z.infer<typeof sponsorFormSchema>;

interface SponsorFormProps {
  onSuccess?: (sponsor: any) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export default function SponsorForm({ 
  onSuccess, 
  onCancel, 
  title = "Become a Sponsor",
  description = "Join us as a sponsor and support Tanzania's economic transformation"
}: SponsorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      name: '',
      description: '',
      logo: '',
      website: '',
      email: '',
      phone: '',
      contactPerson: '',
      isActive: true
    },
    mode: 'onChange'
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: SponsorFormData) => {
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Convert form data to API payload format
      const payload: CreateSponsorRequest = {
        name: data.name,
        description: data.description || '',
        logo: data.logo || '',
        website: data.website || '',
        email: data.email,
        phone: data.phone,
        contactPerson: data.contactPerson,
        isActive: data.isActive
      };

      const response = await sponsorsApi.createSponsor(payload);
      
      if (response.success) {
        setSubmitStatus('success');
        if (onSuccess) {
          onSuccess(response.data);
        }
        // Reset form after successful submission
        setTimeout(() => {
          reset();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'Failed to submit sponsor application');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Sponsor form submission error:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-50">
      <CardHeader className="text-center">
        <div className=" bg-[#768f00] rounded-full flex items-center justify-center mx-auto mb-4">
          <Logo size="lg" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted Successfully!</h3>
            <p className="text-gray-600">
              Thank you for your interest in sponsoring the Impact Business Breakfast. 
              We'll review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#768f00]" />
                Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter company name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      {...register('website')}
                      type="url"
                      placeholder="https://example.com"
                      className={`pl-10 ${errors.website ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.website && (
                    <p className="text-red-500 text-sm">{errors.website.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Tell us about your company and its mission..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <div className="relative">
                  <Image className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="logo"
                    {...register('logo')}
                    type="url"
                    placeholder="https://example.com/logo.png"
                    className={`pl-10 ${errors.logo ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.logo && (
                  <p className="text-red-500 text-sm">{errors.logo.message}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-[#768f00]" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    {...register('contactPerson')}
                    placeholder="Full name"
                    className={errors.contactPerson ? 'border-red-500' : ''}
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      {...register('email')}
                      type="email"
                      placeholder="contact@company.com"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    {...register('phone')}
                    type="tel"
                    placeholder="+255 XXX XXX XXX"
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{errorMessage}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#768f00] hover:bg-[#768f00]/90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
              
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
