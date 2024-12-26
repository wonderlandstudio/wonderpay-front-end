import { VariantProps } from 'class-variance-authority';
import { alert } from '@/components/ui/alert';

export type AlertVariant = VariantProps<typeof alert>['variant'];

export interface MoniteAuditLog {
  id: string;
  user_id: string;
  entity_id?: string;
  event_type: string;
  status: string;
  details?: Record<string, any>;
  created_at: string;
}