import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ApplicationForm } from '@/components/capital/ApplicationForm';
import { ApplicationsList } from '@/components/capital/ApplicationsList';
import { CapitalProductCard } from '@/components/capital/CapitalProductCard';
import { CapitalProduct, ApplicationFormData, CapitalApplication } from '@/types/capital';

const mockApplications: CapitalApplication[] = [
  {
    id: '1',
    product: 'wonderflex',
    requested_amount: 50000,
    terms: 60,
    status: 'approved',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: 'mock-user-id'
  },
  {
    id: '2',
    product: 'wonderadvance',
    requested_amount: 75000,
    terms: 90,
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: 'mock-user-id'
  }
];

const Capital = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<CapitalProduct | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['capital-applications'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockApplications;
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (applicationData: ApplicationFormData) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const now = new Date().toISOString();
      const newApplication: CapitalApplication = {
        id: Math.random().toString(36).substr(2, 9),
        product: applicationData.product,
        requested_amount: applicationData.requestedAmount,
        terms: applicationData.terms,
        status: 'pending',
        created_at: now,
        updated_at: now,
        user_id: 'mock-user-id'
      };

      return newApplication;
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
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">WonderPay Capital</h1>
        <p className="text-xl text-gray-600">Flexible financing solutions for your business</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
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
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl">
            <CardHeader>
              <CardTitle>Apply for {selectedProduct === 'wonderflex' ? 'WonderFlex' : 'WonderAdvance'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationForm
                product={selectedProduct}
                onSubmit={handleApply}
                onCancel={() => setSelectedProduct(null)}
                isSubmitting={applyMutation.isPending}
              />
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl">
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