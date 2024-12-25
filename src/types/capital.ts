import { Json } from '@/integrations/supabase/types';

export type CapitalProduct = 'wonderflex' | 'wonderadvance';

export interface CapitalApplication {
  id?: string;
  user_id: string;
  product: CapitalProduct;
  status?: string;
  requested_amount?: number;
  approved_amount?: number;
  terms?: number;
  interest_rate?: number;
  application_data?: Json;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationFormData {
  product: CapitalProduct;
  requestedAmount: number;
  terms?: number;
}