import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/config/queryClient';
import type { Invoice } from '@/types/invoice';

const mockInvoices: Invoice[] = [
  {
    id: '1',
    client_name: 'Tech Solutions Inc',
    invoice_number: 'INV-2024-001',
    amount: 2500.00,
    currency: 'USD',
    status: 'paid',
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    items: [{ description: 'Web Development', quantity: 1, price: 2500.00 }],
    notes: 'Thank you for your business',
    user_id: 'mock-user-id',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    client_name: 'Digital Marketing Pro',
    invoice_number: 'INV-2024-002',
    amount: 1500.00,
    currency: 'USD',
    status: 'pending',
    due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    items: [{ description: 'Marketing Services', quantity: 1, price: 1500.00 }],
    notes: 'Net 15 payment terms',
    user_id: 'mock-user-id',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function useInvoices() {
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockInvoices;
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoiceData: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const now = new Date().toISOString();
      const newInvoice: Invoice = {
        ...invoiceData,
        id: Math.random().toString(36).substr(2, 9),
        created_at: now,
        updated_at: now
      };

      return newInvoice;
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