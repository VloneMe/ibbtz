import mpesaLogo from '@/assets/payments/mpesa.svg';
import mixxLogo from '@/assets/payments/mixx-by-yas.svg';

/** Where Impact Business Awards registration payments are made. */
export const PAYMENT_ACCOUNT_NAME = 'Impact Advisory (T) Ltd';

export const MOBILE_MONEY_PAYBILLS = [
  { network: 'M-Pesa', number: '5754692', logo: mpesaLogo },
  { network: 'Mixx by Yas', number: '43942130', logo: mixxLogo },
] as const;
