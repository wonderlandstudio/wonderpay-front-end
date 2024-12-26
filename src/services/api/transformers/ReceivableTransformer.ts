import type { 
  ReceivableResponse, 
  CreatePaymentLinkRequest, 
  ReceivableFacadeCreatePayload,
  CurrencyEnum,
  ReceivablesStatusEnum,
  LineItem
} from '@monite/sdk-api';
import type { MoniteReceivable } from '@/types/payments';

export class ReceivableTransformer {
  static toMonite(receivable: CreatePaymentLinkRequest): ReceivableFacadeCreatePayload {
    return {
      type: 'receivable_facade' as const,
      counterpart_id: receivable.recipient?.email || '',
      currency: receivable.currency as CurrencyEnum,
      total_amount: receivable.amount || 0,
      due_date: new Date().toISOString(),
      items: (receivable.items || []).map(item => ({
        quantity: item.quantity || 1,
        unit_price: item.amount || 0,
        description: item.name || ''
      })),
    };
  }

  static fromMonite(receivable: ReceivableResponse): MoniteReceivable {
    return {
      id: receivable.id,
      created_at: receivable.created_at,
      updated_at: receivable.updated_at,
      status: receivable.status as ReceivablesStatusEnum,
      currency: receivable.currency,
      total_amount: receivable.total_amount ?? 0,
      due_date: receivable.due_date,
      counterpart_id: receivable.counterpart_id,
      metadata: {},
      line_items: (receivable.items || []).map(item => ({
        description: item.description || '',
        quantity: item.quantity || 1,
        amount: item.unit_price ?? 0
      })),
    };
  }
}