import { AlertProps } from "@/components/ui/alert";

export type StatusLevel = 'info' | 'warning' | 'error' | 'success';

export interface StatusEntry {
  component: string;
  message: string;
  level: StatusLevel;
  timestamp: Date;
  details?: Record<string, any>;
}

export const mapStatusLevelToVariant = (level: StatusLevel): AlertProps['variant'] => {
  switch (level) {
    case 'error':
      return 'destructive';
    case 'warning':
    case 'info':
    case 'success':
      return 'default';
  }
};