import type { CreatePaymentLinkRequest, PublicPaymentLinkResponse, CurrencyEnum } from '@monite/sdk-api';
import type { InvoiceData } from '@/types/invoice';

export function fromMonite(receivable: PublicPaymentLinkResponse) {
  return {
    id: receivable.id,
    amount: receivable.amount,
    currency: receivable.currency as CurrencyEnum,
    status: receivable.status,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: []
  };
}

export function toMonite(data: InvoiceData): CreatePaymentLinkRequest {
  return {
    currency: data.currency as CurrencyEnum,
    amount: Number(data.amount),
    description: data.notes || '',
    line_items: data.items.map(item => ({
      name: item.description,
      quantity: item.quantity,
      price: item.price
    }))
  };
}