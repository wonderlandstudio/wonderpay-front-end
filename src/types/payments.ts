export interface Bill {
  id: string;
  vendorId?: string;
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
  clientId?: string;
  clientName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export type PaymentMethod = 'card' | 'bank' | 'ach' | 'wire' | 'international_wire' | 'wonderpay';
export type PaymentTerm = '30' | '60' | '90';

export interface PaymentDetails {
  method: PaymentMethod;
  term?: PaymentTerm;
  amount: number;
  currency: string;
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
}

export interface WonderPayCapitalTerms {
  status: 'approved' | 'pending' | 'rejected';
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
}