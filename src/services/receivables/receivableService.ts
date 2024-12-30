import { CreatePaymentLinkRequest } from '@monite/sdk-api';

export const ReceivableService = {
  getReceivables: async () => {
    return [];
  },
  createReceivable: async (data: CreatePaymentLinkRequest) => {
    console.log('Mock create receivable:', data);
    return { id: 'mock-id' };
  },
};