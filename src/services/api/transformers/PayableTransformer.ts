import type { PayableResponseSchema, CurrencyEnum, PayableStateEnum } from '@monite/sdk-api';
import type { MonitePayable } from '@/types/payments';

export class PayableTransformer {
  static toMonite(payable: Partial<MonitePayable>): Partial<PayableResponseSchema> {
    return {
      currency: payable.currency as CurrencyEnum,
      due_date: payable.due_date,
      status: payable.status as PayableStateEnum,
      counterpart_id: payable.counterpart_id,
      total_amount: payable.total_amount || 0,
    };
  }

  static fromMonite(payable: PayableResponseSchema): MonitePayable {
    return {
      id: payable.id,
      created_at: payable.created_at,
      updated_at: payable.updated_at,
      status: payable.status,
      currency: payable.currency,
      total_amount: payable.total_amount || 0,
      due_date: payable.due_date,
      counterpart_id: payable.counterpart_id,
      metadata: {},
    };
  }
}