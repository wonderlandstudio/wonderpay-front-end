import { CreatePaymentLinkRequest, CurrencyEnum } from '@monite/sdk-api';
import { InvoiceData } from '@/types/invoice';

export const toMonite = (data: InvoiceData): CreatePaymentLinkRequest => {
  return {
    currency: CurrencyEnum.Usd,
    amount: 0,
    payment_methods: [],
    metadata: {},
  };
};