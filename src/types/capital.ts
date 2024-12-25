export interface CapitalApplication {
  id: string;
  user_id: string;
  product: 'wonderflex' | 'wonderadvance';
  status: 'pending' | 'approved' | 'rejected';
  requested_amount: number;
  approved_amount?: number;
  terms?: number;
  interest_rate?: number;
  application_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}