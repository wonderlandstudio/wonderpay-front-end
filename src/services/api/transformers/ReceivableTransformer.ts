import type { Receivable } from '@monite/sdk-api';

export function fromMonite(receivable: Receivable) {
  return {
    id: receivable.id,
    amount: receivable.amount,
    currency: receivable.currency,
    status: receivable.status,
    dueDate: receivable.payment_terms?.due_date,
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