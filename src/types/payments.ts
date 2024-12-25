export type PaymentMethod = 'card' | 'bank_account' | 'wonderpay';

export interface PaymentDetails {
  method: PaymentMethod;
  last4?: string;
  bank_name?: string;
}