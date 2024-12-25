export type PaymentMethod = 'card' | 'ach' | 'wire' | 'international_wire';

export type PaymentTerm = '30' | '60' | '90';

export interface PaymentDetails {
  method: PaymentMethod;
  last4?: string;
  bank_name?: string;
}

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
}