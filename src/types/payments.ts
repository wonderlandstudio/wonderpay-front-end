import type { 
  PayableResponse, 
  ReceivableResponse,
  PaymentTermsResponse 
} from '@monite/sdk-api';

export interface Transaction {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  status: string;
  dueDate: string;
  amount: number;
  currency: string;
  date: string;
  recipient: string;
}

export type PaymentMethod = 'card' | 'bank' | 'ach' | 'wire' | 'international_wire' | 'wonderpay';
export type PaymentTerm = '30' | '60' | '90';

export interface PaymentDetails {
  method: PaymentMethod;
  term?: PaymentTerm;
  amount: number;
  currency: string;
}

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
  limit?: number;
}

// Monite SDK type extensions
export interface MonitePayable extends PayableResponse {
  total_amount: {
    amount: number;
    currency: string;
  };
}

export interface MoniteReceivable extends ReceivableResponse {
  total_amount: {
    amount: number;
    currency: string;
  };
}

export interface MonitePaymentTerms extends PaymentTermsResponse {
  term_days: number;
  term_type: string;
}