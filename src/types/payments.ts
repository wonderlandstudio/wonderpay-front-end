import type { 
  PayableResponseSchema,
  ReceivableResponse,
  PaymentTermsResponse,
  CurrencyEnum,
  CreatePaymentLinkRequest,
  PayableStateEnum,
  ReceivableStateEnum
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

export interface MonitePayable {
  id: string;
  created_at: string;
  updated_at: string;
  status: PayableStateEnum;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
}

export interface MoniteReceivable {
  id: string;
  created_at: string;
  updated_at: string;
  status: ReceivableStateEnum;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
  line_items?: Array<{
    name: string;
    quantity: number;
    amount: number;
  }>;
}

export interface MonitePaymentTerms extends PaymentTermsResponse {
  term_days: number;
  term_type: string;
}