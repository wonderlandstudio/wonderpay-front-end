import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardService } from '@/services/dashboard/dashboardService';

export function useMoniteDashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      console.log('Fetching dashboard data from Monite');
      return DashboardService.getDashboardOverview();
    },
  });

  useEffect(() => {
    // Subscribe to real-time updates for entities and monite_settings
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'entities'
        },
        () => {
          console.log('Entity changed, refetching dashboard data');
          refetch();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'monite_settings'
        },
        () => {
          console.log('Monite settings changed, refetching dashboard data');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    data,
    isLoading,
    error
  };
}