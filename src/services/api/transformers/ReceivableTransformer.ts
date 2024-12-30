import { CreatePaymentLinkRequest } from '@monite/sdk-api';
import { InvoiceData } from '@/types/invoice';

export const toMonite = (data: InvoiceData): CreatePaymentLinkRequest => {
  return {
    currency: data.currency,
    amount: 0,
    payment_methods: [],
    metadata: {},
  };
};