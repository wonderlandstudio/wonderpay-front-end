import { CreatePaymentLinkRequest, CurrencyEnum } from '@monite/sdk-api';
import { InvoiceData } from '@/types/invoice';

export const toMonite = (data: InvoiceData): CreatePaymentLinkRequest => {
  return {
    currency: CurrencyEnum.USD,
    amount: 0,
    payment_methods: [],
    recipient: {
      email: data.clientEmail,
      name: data.clientName
    }
  };
};