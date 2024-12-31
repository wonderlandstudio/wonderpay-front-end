import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/config/queryClient';
import { supabase } from '@/integrations/supabase/client';

export function useBills() {
  const { data: bills, isLoading, error } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      console.log('Fetching bills data');
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createBillMutation = useMutation({
    mutationFn: async (billData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bills')
        .insert({
          ...billData,
          user_id: user.id,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      toast({
        title: "Success",
        description: "Bill created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating bill:', error);
      toast({
        title: "Error",
        description: "Failed to create bill",
        variant: "destructive",
      });
    },
  });

  return {
    bills,
    isLoading,
    error,
    createBill: createBillMutation.mutate,
    isCreating: createBillMutation.isPending,
  };
}