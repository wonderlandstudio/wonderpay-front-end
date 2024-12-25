import { PayableStateEnum, CurrencyEnum } from '@monite/sdk-api';

export interface MonitePayable {
  id: string;
  created_at: string;
  updated_at: string;
  status: PayableStateEnum;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
}