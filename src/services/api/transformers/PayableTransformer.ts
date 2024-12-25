import type { PayableObject } from '@monite/sdk-api';
import { Bill } from '@/types/payments';

export class PayableTransformer {
  static toMonite(bill: Bill): Partial<PayableObject> {
    return {
      amount: bill.amount,
      currency: bill.currency,
      due_date: bill.dueDate,
      status: bill.status,
      vendor_id: bill.vendorId,
    };
  }

  static fromMonite(payable: PayableObject): Bill {
    return {
      id: payable.id,
      vendorName: payable.vendor?.name || 'Unknown Vendor',
      invoiceNumber: payable.document_id || '',
      amount: payable.amount,
      currency: payable.currency,
      status: payable.status,
      dueDate: payable.due_date,
      description: payable.description || '',
    };
  }
}