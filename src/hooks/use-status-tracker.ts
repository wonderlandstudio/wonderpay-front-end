import { useQuery } from '@tanstack/react-query';
import { statusTracker } from '@/services/monitoring/StatusTracker';

export function useStatusTracker() {
  return useQuery({
    queryKey: ['status-tracker'],
    queryFn: () => statusTracker.getLogs(),
    refetchInterval: 1000, // Update every second
  });
}