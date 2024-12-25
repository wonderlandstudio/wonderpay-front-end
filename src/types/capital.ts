export type CapitalProduct = 'wonderflex' | 'wonderadvance';

export interface ApplicationFormData {
  product: CapitalProduct;
  requestedAmount: number;
  terms?: number;
}

export interface CapitalApplication {
  id: string;
  user_id: string;
  product: CapitalProduct;
  status: 'pending' | 'approved' | 'rejected';
  requested_amount?: number;
  approved_amount?: number;
  terms?: number;
  interest_rate?: number;
  application_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}