import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PayableService } from '@/services/payables/payableService';
import { toast } from '@/hooks/use-toast';
import type { MonitePayable } from '@/types/payments';

export function useBills() {
  const queryClient = useQueryClient();

  const { data: bills, isLoading, error } = useQuery({
    queryKey: ['bills'],
    queryFn: PayableService.getPayables,
  });

  const createBillMutation = useMutation({
    mutationFn: (data: Partial<MonitePayable>) => PayableService.createPayable(data),
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