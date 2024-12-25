import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/services/dashboard/dashboardService';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: DashboardService.getDashboardOverview,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}