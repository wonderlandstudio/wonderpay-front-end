import type { PayableResponseSchema } from '@monite/sdk-api';
import { Bill } from '@/types/payments';

export class PayableTransformer {
  static toMonite(bill: Bill): Partial<PayableResponseSchema> {
    return {
      amount: bill.amount,
      currency: bill.currency,
      due_date: bill.dueDate,
      status: bill.status,
      counterpart_id: bill.vendorId,
    };
  }

  static fromMonite(payable: PayableResponseSchema): Bill {
    return {
      id: payable.id,
      vendorId: payable.counterpart_id || '',
      vendorName: payable.counterpart?.name || 'Unknown Vendor',
      invoiceNumber: payable.document_id || '',
      amount: payable.amount,
      currency: payable.currency,
      status: payable.status,
      dueDate: payable.due_date,
      description: payable.description || '',
    };
  }
}