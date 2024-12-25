import type { 
  PayableResponseSchema,
  ReceivableResponse,
  PaymentTermsResponse,
  CurrencyEnum,
  CreatePaymentLinkRequest
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
  currency: CurrencyEnum;
}

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
  limit: number;
}

export interface MonitePayable extends Omit<PayableResponseSchema, 'amount'> {
  total_amount: {
    amount: number;
    currency: string;
  };
  created_at: string;
}

export interface MoniteReceivable extends Omit<ReceivableResponse, 'amount'> {
  total_amount: {
    amount: number;
    currency: string;
  };
  created_at: string;
}

export interface MonitePaymentTerms extends PaymentTermsResponse {
  term_days: number;
  term_type: string;
}