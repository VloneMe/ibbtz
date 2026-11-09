import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle, AlertCircle, Loader2, Ticket, User, Users } from 'lucide-react';
import { GALA_QUESTIONS, OTHER, type GalaQuestion } from '@/data/galaQuestions';
import {
  galaApi, galaRegistrationSchema, ApiError,
  REGISTRATION_TYPES, PAYMENT_METHODS, AMOUNTS,
  type GalaRegistrationInput,
} from '@/services/galaApi';
import { MOBILE_MONEY_PAYBILLS, PAYMENT_ACCOUNT_NAME } from '@/data/paymentDetails';

const inputClass = (hasError: boolean) =>
  `field ${hasError ? 'border-red-500' : ''}`;

const SUGGESTED_AMOUNT: Record<(typeof REGISTRATION_TYPES)[number], (typeof AMOUNTS)[number]> = {
  'Individual': 'Tsh 250,000',
  'Corporate Table': 'Tsh 2,000,000',
};

export default function GalaRegistrationForm({ className = '' }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<number | null>(null);

  const { register, handleSubmit, control, setValue, setError: setFieldError, getValues, watch, formState: { errors } } =
    useForm<GalaRegistrationInput>({
      resolver: zodResolver(galaRegistrationSchema),
      defaultValues: { fullName: '', email: '', phone: '', organisation: '', jobTitle: '', registrationType: undefined, paymentMethod: '', amount: '', interests: {}, interestsOther: '' },
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
      <div className={`bg-white p-6 sm:p-8 rounded-sm border border-stone ${className}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 sm:py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4">Registration Received</h3>
          <p className="text-lg text-ink-muted mb-6 max-w-2xl mx-auto leading-relaxed">
            Thank you for registering for the Impact Business Awards. Please complete your payment using the details below, quoting your reference. Our team will confirm by email.
          </p>
          <p className="text-sm font-semibold text-green-700">Reference: IBA-{String(submittedId).padStart(4, '0')}</p>
          <div className="mx-auto mt-6 max-w-md text-left">
            <PayBillDetails />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-sm border border-stone ${className}`}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Registration Form</h3>
        </div>
        <p className="text-ink-muted text-sm sm:text-base">Fields marked * are required.</p>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-600">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Attendee Information */}
        <fieldset className="space-y-4">
          <legend className="text-gold font-semibold uppercase tracking-[0.18em] text-xs mb-2">Attendee Information</legend>

          <div>
            <Label htmlFor="gala-fullName" className="field-label">Full Name *</Label>
            <Input id="gala-fullName" {...register('fullName')} className={inputClass(!!errors.fullName)} placeholder="Jane Doe" autoComplete="name" />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-email" className="field-label">Email Address *</Label>
              <Input id="gala-email" type="email" {...register('email')} className={inputClass(!!errors.email)} placeholder="jane@company.com" autoComplete="email" />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="gala-phone" className="field-label">Phone Number *</Label>
              <Input id="gala-phone" type="tel" {...register('phone')} className={inputClass(!!errors.phone)} placeholder="+255 7xx xxx xxx" autoComplete="tel" />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-organisation" className="field-label">Organisation / Company *</Label>
              <Input id="gala-organisation" {...register('organisation')} className={inputClass(!!errors.organisation)} placeholder="Company name" autoComplete="organization" />
              {errors.organisation && <p className="text-red-600 text-sm mt-1">{errors.organisation.message}</p>}
            </div>
            <div>
              <Label htmlFor="gala-jobTitle" className="field-label">Job Title / Position</Label>
              <Input id="gala-jobTitle" {...register('jobTitle')} className={inputClass(!!errors.jobTitle)} placeholder="e.g. Managing Director" autoComplete="organization-title" />
            </div>
          </div>
        </fieldset>

        {/* Registration Type */}
        <fieldset>
          <legend className="text-gold font-semibold uppercase tracking-[0.18em] text-xs mb-3">Registration Type *</legend>
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
                        selected ? 'border-navy bg-navy/5' : 'border-stone bg-white hover:border-navy/50'
                      } ${errors.registrationType ? 'border-red-500' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selected ? 'bg-navy' : 'bg-sand'}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-ink">{type}</div>
                        <div className="text-sm text-ink-muted">{SUGGESTED_AMOUNT[type]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.registrationType && <p className="text-red-600 text-sm mt-1">{errors.registrationType.message}</p>}
        </fieldset>

        {/* Career, business and leadership interests */}
        <fieldset className="space-y-6">
          <legend className="text-gold font-semibold uppercase tracking-[0.18em] text-xs mb-1">Career, Business &amp; Leadership Interests</legend>
          <p className="text-sm text-ink-muted">Please select the responses that best reflect your interests and aspirations.</p>
          {GALA_QUESTIONS.map((q) => (
            <Controller
              key={q.id}
              name={`interests.${q.id}` as const}
              control={control}
              render={({ field }) => (
                <QuestionField
                  question={q}
                  value={(field.value as string[] | undefined) || []}
                  onChange={field.onChange}
                  otherValue={q.allowOther ? (watch('interestsOther') || '') : undefined}
                  onOtherChange={q.allowOther ? (v) => setValue('interestsOther', v) : undefined}
                />
              )}
            />
          ))}
        </fieldset>

        {/* Payment Details */}
        <fieldset className="space-y-4">
          <legend className="text-gold font-semibold uppercase tracking-[0.18em] text-xs mb-2">Payment Details</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gala-paymentMethod" className="field-label">Payment Method</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger id="gala-paymentMethod" className={inputClass(!!errors.paymentMethod)}>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-stone text-ink">
                      {PAYMENT_METHODS.map((m) => (
                        <SelectItem key={m} value={m} className="focus:bg-sand">{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label htmlFor="gala-amount" className="field-label">Amount</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger id="gala-amount" className={inputClass(!!errors.amount)}>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-stone text-ink">
                      {AMOUNTS.map((a) => (
                        <SelectItem key={a} value={a} className="focus:bg-sand">{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <PayBillDetails />
        </fieldset>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-navy hover:bg-navy-soft text-white py-4 text-base sm:text-lg font-semibold disabled:opacity-50 shadow-lg">
          {isSubmitting ? (<><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</>) : (<><Send className="h-5 w-5 mr-2" />Submit Registration</>)}
        </Button>
      </form>
    </div>
  );
}


interface QuestionFieldProps {
  question: GalaQuestion;
  value: string[];
  onChange: (v: string[]) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}

function QuestionField({ question: q, value, onChange, otherValue, onOtherChange }: QuestionFieldProps) {
  const options = q.allowOther ? [...q.options, OTHER] : q.options;
  const atMax = q.type === 'multi' && value.length >= q.max;
  const toggle = (opt: string) => {
    if (q.type === 'single') { onChange(value[0] === opt ? [] : [opt]); return; }
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else if (!atMax) onChange([...value, opt]);
  };
  const name = `q-${q.id}`;
  return (
    <div className="border-t border-stone pt-5">
      <p className="font-semibold text-ink">
        <span className="mr-2 font-display text-gold">{q.number}.</span>{q.title}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {q.hint}{q.type === 'multi' && value.length > 0 ? ` · ${value.length} of ${q.max} selected` : ''}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = value.includes(opt);
          const disabled = !checked && atMax;
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-start gap-3 rounded-sm border bg-white p-3 text-sm leading-snug transition-colors ${
                checked ? 'border-navy bg-navy/5 text-ink' : 'border-stone text-ink hover:border-navy/40'
              } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <input
                type={q.type === 'single' ? 'radio' : 'checkbox'}
                name={name}
                value={opt}
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(opt)}
                onClick={q.type === 'single' && checked ? () => toggle(opt) : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-navy"
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {q.allowOther && value.includes(OTHER) && onOtherChange && (
        <div className="mt-3">
          <Label htmlFor={`${name}-other`} className="field-label">Please specify</Label>
          <Input id={`${name}-other`} value={otherValue || ''} onChange={(e) => onOtherChange(e.target.value)} maxLength={200} className="field" placeholder="Your answer" />
        </div>
      )}
    </div>
  );
}

function PayBillDetails() {
  return (
    <div className="rounded-sm border border-gold/40 bg-sand/60 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Mobile Money · Pay Bill</p>
      <p className="mt-2 text-sm text-ink-muted">
        Business name: <span className="font-semibold text-ink">{PAYMENT_ACCOUNT_NAME}</span>
      </p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {MOBILE_MONEY_PAYBILLS.map((m) => (
          <div key={m.network} className="rounded-sm border border-stone bg-white px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{m.network}</dt>
            <dd className="mt-1 font-display text-xl font-semibold tracking-wide text-navy">{m.number}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">Bank transfer details are shared by email once your registration is received.</p>
    </div>
  );
}
