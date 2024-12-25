import type { 
  PayableResponseSchema, 
  ReceivableResponseSchema,
  PaymentTermsResponseSchema 
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

export interface Bill {
  id: string;
  vendorId: string;
  vendorName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  description?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
}

// Monite SDK type extensions
export interface MonitePayable extends PayableResponseSchema {
  total_amount: {
    amount: number;
    currency: string;
  };
  created_at: string;
}

export interface MoniteReceivable extends ReceivableResponseSchema {
  total_amount: {
    amount: number;
    currency: string;
  };
  created_at: string;
}

export interface MonitePaymentTerms extends PaymentTermsResponseSchema {
  term_days: number;
  term_type: string;
}