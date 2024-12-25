import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ApplicationForm } from '@/components/capital/ApplicationForm';
import { ApplicationsList } from '@/components/capital/ApplicationsList';
import { CapitalProductCard } from '@/components/capital/CapitalProductCard';
import { CapitalProduct, ApplicationFormData } from '@/types/capital';

const Capital = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<CapitalProduct | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['capital-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wonderpay_capital_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (applicationData: ApplicationFormData) => {
      const { data, error } = await supabase
        .from('wonderpay_capital_applications')
        .insert({
          product: applicationData.product,
          requested_amount: applicationData.requestedAmount,
          terms: applicationData.terms,
          status: 'pending',
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capital-applications'] });
      toast({
        title: 'Application submitted',
        description: 'Your application has been submitted successfully.',
      });
      setSelectedProduct(null);
    },
    onError: (error) => {
      console.error('Application error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleApply = (data: ApplicationFormData) => {
    applyMutation.mutate(data);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">WonderPay Capital</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <CapitalProductCard
          title="WonderFlex"
          description="Extend your payment terms with vendors up to 90 days"
          features={[
            'Flexible payment terms (30/60/90 days)',
            'No impact on vendor relationships',
            'Competitive rates',
            'Quick approval process'
          ]}
          product="wonderflex"
          onApply={setSelectedProduct}
        />

        <CapitalProductCard
          title="WonderAdvance"
          description="Get instant access to cash from your outstanding invoices"
          features={[
            'Up to 90% advance rate',
            'Same-day funding available',
            'Non-recourse factoring',
            'Simple, transparent pricing'
          ]}
          product="wonderadvance"
          onApply={setSelectedProduct}
        />
      </div>

      {selectedProduct && (
        <ApplicationForm
          product={selectedProduct}
          onSubmit={handleApply}
          onCancel={() => setSelectedProduct(null)}
          isSubmitting={applyMutation.isPending}
        />
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationsList
            applications={applications}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Capital;