import type { ReceivableResponseSchema } from '@monite/sdk-api';
import { Invoice } from '@/types/payments';

export class ReceivableTransformer {
  static toMonite(invoice: Invoice): Partial<ReceivableResponseSchema> {
    return {
      amount: invoice.amount,
      currency: invoice.currency,
      due_date: invoice.dueDate,
      status: invoice.status,
      counterpart_id: invoice.clientId,
      line_items: invoice.items.map(item => ({
        name: item.description,
        quantity: item.quantity,
        amount: item.price,
      })),
    };
  }

  static fromMonite(receivable: ReceivableResponseSchema): Invoice {
    return {
      id: receivable.id,
      clientId: receivable.counterpart_id || '',
      clientName: receivable.counterpart?.name || 'Unknown Client',
      invoiceNumber: receivable.document_id || '',
      amount: receivable.amount,
      currency: receivable.currency,
      status: receivable.status,
      dueDate: receivable.due_date,
      items: receivable.line_items?.map(item => ({
        description: item.name,
        quantity: item.quantity,
        price: item.amount,
      })) || [],
      notes: receivable.description || '',
    };
  }
}