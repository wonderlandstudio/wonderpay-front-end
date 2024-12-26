import type { CreatePaymentLinkRequest, PublicPaymentLinkResponse } from '@monite/sdk-api';

export function fromMonite(receivable: PublicPaymentLinkResponse) {
  return {
    id: receivable.id,
    amount: receivable.amount,
    currency: receivable.currency,
    status: receivable.status,
    dueDate: new Date().toISOString(), // Default value since it's not in the response
    createdAt: new Date().toISOString(), // Default value since it's not in the response
    updatedAt: new Date().toISOString(), // Default value since it's not in the response
    items: []  // Default empty array since items are not in the response
  };
}

export function toMonite(data: any): CreatePaymentLinkRequest {
  return {
    currency: data.currency,
    amount: data.amount,
    description: data.notes || undefined,
    expires_at: data.dueDate || undefined
  };
}