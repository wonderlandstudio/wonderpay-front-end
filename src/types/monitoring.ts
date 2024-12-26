import { type VariantProps } from "class-variance-authority";
import { Alert } from "@/components/ui/alert";

export type AlertVariant = VariantProps<typeof Alert>['variant'];

export type StatusLevel = 'error' | 'warning' | 'success' | 'info';

export interface StatusEntry {
  component: string;
  message: string;
  level: StatusLevel;
  timestamp: Date;
  details?: Record<string, any>;
}

export const mapStatusLevelToVariant = (level: StatusLevel): AlertVariant => {
  switch (level) {
    case 'error':
      return 'destructive';
    default:
      return 'default';
  }
};