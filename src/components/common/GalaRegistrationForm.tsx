import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle, AlertCircle, Loader2, Ticket, User, Users } from 'lucide-react';
import {
  galaApi, galaRegistrationSchema, ApiError,
  REGISTRATION_TYPES, PAYMENT_METHODS, AMOUNTS,
  type GalaRegistrationInput,
} from '@/services/galaApi';

const inputClass = (hasError: boolean) =>
  `w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-[#768f00] focus:bg-white/25 text-sm sm:text-base ${hasError ? 'border-red-500' : ''}`;

const SUGGESTED_AMOUNT: Record<(typeof REGISTRATION_TYPES)[number], (typeof AMOUNTS)[number]> = {
  'Individual': 'Tsh 250,000',
  'Corporate Table': 'Tsh 2,000,000',
};

export default function GalaRegistrationForm({ className = '' }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<number | null>(null);

  const { register, handleSubmit, control, setValue, setError: setFieldError, getValues, formState: { errors } } =
    useForm<GalaRegistrationInput>({
      resolver: zodResolver(galaRegistrationSchema),
      defaultValues: { fullName: '', email: '', phone: '', organisation: '', jobTitle: '', registrationType: undefined, paymentMethod: '', amount: '' },
      mode: 'onSubmit',
    });

  const onSubmit = async (data: GalaRegistrationInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await galaApi.submit(data);
      setSubmittedId(res.data.id);
    } catch (e) {
      const err = e as ApiError;
      if (err.fieldErrors) {
        for (const [field, message] of Object.entries(err.fieldErrors)) {
          setFieldError(field as keyof GalaRegistrationInput, { message });
        }
      }
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedId !== null) {
    return (
      <div className={`bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/10 ${className}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 sm:py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500/30">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Registration Received</h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Thank you for registering for the Impact Business Awards Gala. Our team will be in touch with payment and event details.
          </p>
          <p className="text-sm text-green-300">Reference: IBB-GALA-{String(submittedId).padStart(4, '0')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/10 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#768f00] rounded-full flex items-center justify-center">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Registration Form</h3>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">Fields marked * are required.</p>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Attendee Information */}
        <fieldset className="space-y-4">
          <legend className="text-[#768f00] font-bold uppercase tracking-wider text-sm mb-2">Attendee Information</legend>

          <div>
            <Label htmlFor="gala-fullName" className="text-white font-semibold mb-2 block">Full Name *</Label>
            <Input id="gala-fullName" {...register('fullName')} className={inputClass(!!errors.fullName)} placeholder="Jane Doe" autoComplete="name" />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-email" className="text-white font-semibold mb-2 block">Email Address *</Label>
              <Input id="gala-email" type="email" {...register('email')} className={inputClass(!!errors.email)} placeholder="jane@company.com" autoComplete="email" />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="gala-phone" className="text-white font-semibold mb-2 block">Phone Number *</Label>
              <Input id="gala-phone" type="tel" {...register('phone')} className={inputClass(!!errors.phone)} placeholder="+255 7xx xxx xxx" autoComplete="tel" />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-organisation" className="text-white font-semibold mb-2 block">Organisation / Company *</Label>
              <Input id="gala-organisation" {...register('organisation')} className={inputClass(!!errors.organisation)} placeholder="Company name" autoComplete="organization" />
              {errors.organisation && <p className="text-red-400 text-sm mt-1">{errors.organisation.message}</p>}
            </div>
            <div>
              <Label htmlFor="gala-jobTitle" className="text-white font-semibold mb-2 block">Job Title / Position</Label>
              <Input id="gala-jobTitle" {...register('jobTitle')} className={inputClass(!!errors.jobTitle)} placeholder="e.g. Managing Director" autoComplete="organization-title" />
            </div>
          </div>
        </fieldset>

        {/* Registration Type */}
        <fieldset>
          <legend className="text-[#768f00] font-bold uppercase tracking-wider text-sm mb-3">Registration Type *</legend>
          <Controller
            name="registrationType"
            control={control}
            render={({ field }) => (
              <div className="grid sm:grid-cols-2 gap-4" role="radiogroup">
                {REGISTRATION_TYPES.map((type) => {
                  const selected = field.value === type;
                  const Icon = type === 'Individual' ? User : Users;
                  return (
                    <button
                      type="button"
                      key={type}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        field.onChange(type);
                        if (!getValues('amount')) setValue('amount', SUGGESTED_AMOUNT[type]);
                      }}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-colors ${
                        selected ? 'border-[#768f00] bg-[#768f00]/20' : 'border-white/20 bg-white/10 hover:border-white/40'
                      } ${errors.registrationType ? 'border-red-500' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selected ? 'bg-[#768f00]' : 'bg-white/10'}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{type}</div>
                        <div className="text-sm text-gray-300">{SUGGESTED_AMOUNT[type]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.registrationType && <p className="text-red-400 text-sm mt-1">{errors.registrationType.message}</p>}
        </fieldset>

        {/* Payment Details */}
        <fieldset className="space-y-4">
          <legend className="text-[#768f00] font-bold uppercase tracking-wider text-sm mb-2">Payment Details</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-paymentMethod" className="text-white font-semibold mb-2 block">Payment Method</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger id="gala-paymentMethod" className={inputClass(!!errors.paymentMethod)}>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {PAYMENT_METHODS.map((m) => (
                        <SelectItem key={m} value={m} className="hover:bg-gray-700 focus:bg-gray-700">{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label htmlFor="gala-amount" className="text-white font-semibold mb-2 block">Amount</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger id="gala-amount" className={inputClass(!!errors.amount)}>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {AMOUNTS.map((a) => (
                        <SelectItem key={a} value={a} className="hover:bg-gray-700 focus:bg-gray-700">{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </fieldset>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-[#768f00] hover:bg-[#768f00]/90 text-white py-4 text-base sm:text-lg font-semibold disabled:opacity-50 shadow-lg">
          {isSubmitting ? (<><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</>) : (<><Send className="h-5 w-5 mr-2" />Submit Registration</>)}
        </Button>
      </form>
    </div>
  );
}
