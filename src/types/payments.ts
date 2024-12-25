export type PaymentMethod = 'ach' | 'wire' | 'international_wire' | 'card';

export type PaymentTerm = '30' | '60' | '90';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  recipient: string;
  description?: string;
}

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
}