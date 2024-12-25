import type { 
  ReceivableResponse, 
  CreatePaymentLinkRequest, 
  ReceivableFacadeCreatePayload 
} from '@monite/sdk-api';
import type { MoniteReceivable } from '@/types/receivables';
import type { LineItem } from '@/types/receivables';

export class ReceivableTransformer {
  static toMonite(receivable: CreatePaymentLinkRequest): ReceivableFacadeCreatePayload {
    return {
      type: 'invoice' as const,
      counterpart_id: receivable.recipient?.email || '',
      currency: receivable.currency,
      total_amount: receivable.amount,
      due_date: receivable.payment_terms?.due_date || new Date().toISOString(),
      line_items: receivable.line_items?.map(item => ({
        name: item.name || '',
        quantity: item.quantity || 1,
        amount: item.amount || 0,
      })) || [],
    };
  }

  static fromMonite(receivable: ReceivableResponse): MoniteReceivable {
    return {
      id: receivable.id,
      created_at: receivable.created_at,
      updated_at: receivable.updated_at,
      status: receivable.status,
      currency: receivable.currency,
      total_amount: typeof receivable.total_amount === 'number' ? 
        receivable.total_amount : 
        receivable.total_amount.amount,
      due_date: receivable.due_date,
      counterpart_id: receivable.counterpart_id,
      metadata: receivable.metadata,
      line_items: receivable.line_items?.map((item): LineItem => ({
        name: item.name,
        quantity: item.quantity,
        amount: item.amount,
      })),
    };
  }
}