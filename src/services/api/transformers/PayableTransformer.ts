import type { PayableResponseSchema, CurrencyEnum, PayableStateEnum } from '@monite/sdk-api';
import type { MonitePayable } from '@/types/payments';

export class PayableTransformer {
  static toMonite(payable: Partial<MonitePayable>): Partial<PayableResponseSchema> {
    return {
      amount: payable.total_amount?.amount,
      currency: payable.currency as CurrencyEnum,
      due_date: payable.due_date,
      status: payable.status as PayableStateEnum,
      counterpart_id: payable.counterpart_id,
    };
  }

  static fromMonite(payable: PayableResponseSchema): MonitePayable {
    return {
      ...payable,
      total_amount: {
        amount: payable.amount,
        currency: payable.currency,
      },
      created_at: new Date().toISOString(), // Fallback for missing created_at
    };
  }
}