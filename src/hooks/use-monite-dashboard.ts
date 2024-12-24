import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MoniteService } from '@/services/monite';

interface DashboardData {
  balance: number;
  income: number | null;
  expenses: number;
  transactions: Array<{
    date: string;
    value: number;
  }>;
}

export function useMoniteDashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async (): Promise<DashboardData> => {
      console.log('Fetching dashboard data from Monite');
      const response = await MoniteService.makeRequest({
        path: '/dashboard/overview',
      });
      return response;
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