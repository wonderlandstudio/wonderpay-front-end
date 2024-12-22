export type PaymentMethod = 'ach' | 'wire' | 'international_wire' | 'card';

export type PaymentTerm = '30' | '60' | '90';

export interface WonderPayCapitalTerms {
  availableTerms: PaymentTerm[];
  interestRates: Record<PaymentTerm, number>;
  creditLimit?: number;
  status: 'approved' | 'pending' | 'rejected' | 'not_applied';
}

export interface MonitePaymentIntegration {
  enabled: boolean;
  merchantId?: string;
  supportedMethods: PaymentMethod[];
  wonderPayCapital?: WonderPayCapitalTerms;
}

export interface PaymentProcessingConfig {
  monite?: MonitePaymentIntegration;
  processingFees: Record<PaymentMethod, number>;
  minimumAmount: Record<PaymentMethod, number>;
}

export interface PaymentRequest {
  billId: string;
  amount: number;
  method: PaymentMethod;
  term?: PaymentTerm; // Only for WonderPay Capital
  currency: string;
  payerId: string;
  payeeId: string;
}