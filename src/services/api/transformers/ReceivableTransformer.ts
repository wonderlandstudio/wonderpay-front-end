import type { CreatePaymentLinkRequest, PaymentLinkResponse } from '@monite/sdk-api';
import type { InvoiceData } from '@/types/invoice';

export function fromMonite(receivable: PaymentLinkResponse) {
  return {
    id: receivable.id,
    amount: receivable.amount,
    currency: receivable.currency,
    status: receivable.status,
    dueDate: new Date().toISOString(),
    createdAt: receivable.created_at,
    updatedAt: receivable.updated_at,
    items: []
  };
}

export function toMonite(data: InvoiceData): CreatePaymentLinkRequest {
  return {
    currency: data.currency,
    amount: Number(data.amount),
    payment_link_terms: {
      due_date: data.dueDate,
      items: data.items.map(item => ({
        name: item.description,
        quantity: item.quantity,
        amount: item.price
      }))
    }
  };
}