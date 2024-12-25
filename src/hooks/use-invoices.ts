import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReceivableService } from '@/services/receivables/receivableService';
import { toast } from '@/hooks/use-toast';
import type { CreatePaymentLinkRequest } from '@monite/sdk-api';

export function useInvoices() {
  const queryClient = useQueryClient();

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: ReceivableService.getReceivables,
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (data: CreatePaymentLinkRequest) => ReceivableService.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    },
  });

  return {
    invoices,
    isLoading,
    error,
    createInvoice: createInvoiceMutation.mutate,
    isCreating: createInvoiceMutation.isPending,
  };
}