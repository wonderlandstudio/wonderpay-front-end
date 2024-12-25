import type { ReceivableResponse, CreatePaymentLinkRequest, ReceivableFacadeCreatePayload } from '@monite/sdk-api';
import type { MoniteReceivable } from '@/types/payments';

export class ReceivableTransformer {
  static toMonite(receivable: CreatePaymentLinkRequest): ReceivableFacadeCreatePayload {
    return {
      type: 'invoice',
      counterpart_id: receivable.recipient?.name || '',
      currency: receivable.currency,
      line_items: receivable.line_items?.map(item => ({
        name: item.name || '',
        quantity: item.quantity || 1,
        amount: item.amount || 0,
      })) || [],
    };
  }

  static fromMonite(receivable: ReceivableResponse): MoniteReceivable {
    return {
      ...receivable,
      total_amount: {
        amount: typeof receivable.total_amount === 'number' ? receivable.total_amount : 0,
        currency: receivable.currency,
      },
      created_at: new Date().toISOString(), // Fallback for missing created_at
    };
  }
}