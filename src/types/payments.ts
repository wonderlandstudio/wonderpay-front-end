import { CurrencyEnum, PaymentMethod as MonitePaymentMethod, ReceivablesStatusEnum } from '@monite/sdk-api';

export type PaymentMethod = 'ach' | 'wire' | 'international_wire' | 'card' | 'wonderpay';
export type PaymentTerm = '30' | '60' | '90';

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
  limit: number;
}

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
  description?: string;
  value?: number;
}

export interface MonitePayable {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
}

export interface LineItem {
  name: string;
  quantity: number;
  amount: number;
}

export interface MoniteReceivable {
  id: string;
  created_at: string;
  updated_at: string;
  status: ReceivablesStatusEnum;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
  line_items?: LineItem[];
}