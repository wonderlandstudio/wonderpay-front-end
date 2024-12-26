import { useQuery, useMutation } from '@tanstack/react-query';
import { ReceivableService } from '@/services/receivables/receivableService';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/config/queryClient';
import type { CreatePaymentLinkRequest } from '@monite/sdk-api';

export function useInvoices() {
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      console.log('Fetching invoices data');
      return ReceivableService.getReceivables();
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (data: CreatePaymentLinkRequest) => {
      console.log('Creating new invoice:', data);
      return ReceivableService.createReceivable(data);
    },
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