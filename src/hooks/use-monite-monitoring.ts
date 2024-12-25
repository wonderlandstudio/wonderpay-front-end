import { useQuery } from '@tanstack/react-query';
import { MoniteMonitoringService } from '@/services/monitoring/moniteMonitoring';

export function useMoniteMonitoring() {
  const { data: logs, isLoading, error, refetch } = useQuery({
    queryKey: ['monite-logs'],
    queryFn: MoniteMonitoringService.getRecentLogs,
  });

  return {
    logs,
    isLoading,
    error,
    refetch,
  };
}