import type { 
  CreatePaymentLinkRequest,
  ReceivableResponse,
  LineItem
} from '@monite/sdk-api';

export const fromMonite = (receivable: ReceivableResponse) => {
  return {
    id: receivable.id,
    amount: receivable.total_amount || 0,
    currency: receivable.currency,
    status: receivable.status,
    created_at: receivable.created_at,
    updated_at: receivable.updated_at,
    line_items: receivable.line_items?.map(item => ({
      id: item.id,
      description: item.name,
      quantity: item.quantity,
      price: item.amount
    })) || []
  };
};

export const toMonite = (data: any): CreatePaymentLinkRequest => {
  return {
    currency: data.currency,
    amount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
    recipient: {
      name: data.clientName,
      email: data.clientEmail,
      address: {
        line1: data.clientAddress || '',
      }
    },
    line_items: data.items.map((item: any) => ({
      name: item.description,
      quantity: item.quantity,
      amount: item.price,
    })),
    payment_terms: {
      due_date: data.dueDate,
    },
  };
};