import type { 
  ReceivableResponse, 
  CreatePaymentLinkRequest, 
  ReceivableFacadeCreatePayload,
  CurrencyEnum,
  ReceivablesStatusEnum
} from '@monite/sdk-api';
import type { MoniteReceivable } from '@/types/payments';

export class ReceivableTransformer {
  static toMonite(receivable: CreatePaymentLinkRequest): ReceivableFacadeCreatePayload {
    return {
      type: 'invoice',
      counterpart_id: receivable.recipient?.name || '',
      currency: receivable.currency as CurrencyEnum,
      total_amount: receivable.amount,
      due_date: new Date().toISOString(),
      line_items: [],
    };
  }

  static fromMonite(receivable: ReceivableResponse): MoniteReceivable {
    return {
      id: receivable.id,
      created_at: receivable.created_at,
      updated_at: receivable.updated_at,
      status: receivable.status as ReceivablesStatusEnum,
      currency: receivable.currency,
      total_amount: typeof receivable.total_amount === 'number' ? 
        receivable.total_amount : 
        receivable.total_amount?.amount || 0,
      due_date: receivable.due_date,
      counterpart_id: receivable.counterpart_id,
      metadata: {},
      line_items: receivable.line_items?.map(item => ({
        name: item.description || '',
        quantity: item.quantity || 1,
        amount: item.price || 0
      })),
    };
  }
}