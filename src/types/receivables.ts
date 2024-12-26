import { ReceivablesStatusEnum, CurrencyEnum } from '@monite/sdk-api';

export interface LineItem {
  name: string;
  quantity: number;
  amount: number;
}

export interface MoniteReceivable {
  id: string;
  created_at: string;
  updated_at: string;
  status: ReceivablesStatusEnum;
  currency: CurrencyEnum;
  total_amount: number;
  due_date: string;
  counterpart_id?: string;
  metadata?: Record<string, any>;
  line_items?: LineItem[];
}