import type { CreatePaymentLinkRequest, PublicPaymentLinkResponse } from '@monite/sdk-api';

export function fromMonite(receivable: PublicPaymentLinkResponse) {
  return {
    id: receivable.id,
    amount: receivable.amount,
    currency: receivable.currency,
    status: receivable.status,
    dueDate: receivable.due_date,
    createdAt: receivable.created_at,
    updatedAt: receivable.updated_at,
    type: receivable.type,
    items: receivable.line_items?.map(item => ({
      id: item.id,
      description: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      amount: item.amount
    })) || []
  };
}

export function toMonite(data: any): CreatePaymentLinkRequest {
  return {
    currency: data.currency,
    amount: data.amount,
    due_date: data.dueDate,
    line_items: data.items.map((item: any) => ({
      name: item.description,
      quantity: item.quantity,
      unit_price: item.price
    }))
  };
}