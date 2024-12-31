import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      console.log('Fetching dashboard data');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const [bills, invoices] = await Promise.all([
        supabase.from('bills').select('amount').eq('user_id', user.id),
        supabase.from('invoices').select('amount').eq('user_id', user.id)
      ]);

      return {
        totalBills: bills.data?.reduce((sum, bill) => sum + bill.amount, 0) || 0,
        totalInvoices: invoices.data?.reduce((sum, inv) => sum + inv.amount, 0) || 0,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}