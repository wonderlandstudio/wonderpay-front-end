import { useQuery } from '@tanstack/react-query';
import { statusTracker } from '@/services/monitoring/StatusTracker';
import type { StatusEntry } from '@/types/monitoring';

export function useStatusTracker() {
  return useQuery<StatusEntry[]>({
    queryKey: ['status-tracker'],
    queryFn: () => statusTracker.getLogs(),
    refetchInterval: 1000, // Update every second
  });
}