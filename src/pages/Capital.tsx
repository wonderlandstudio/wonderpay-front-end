import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type CapitalProduct = 'wonderflex' | 'wonderadvance';

interface ApplicationFormData {
  product: CapitalProduct;
  requestedAmount: number;
  terms?: number;
}

const Capital = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<CapitalProduct | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    product: 'wonderflex',
    requestedAmount: 0,
    terms: 30,
  });

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
        .insert([applicationData])
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

  const handleApply = () => {
    if (!selectedProduct) return;
    
    applyMutation.mutate({
      product: selectedProduct,
      requestedAmount: formData.requestedAmount,
      terms: formData.terms,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">WonderPay Capital</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* WonderFlex Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>WonderFlex</CardTitle>
            <CardDescription>
              Extend your payment terms with vendors up to 90 days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li>• Flexible payment terms (30/60/90 days)</li>
              <li>• No impact on vendor relationships</li>
              <li>• Competitive rates</li>
              <li>• Quick approval process</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => setSelectedProduct('wonderflex')}
              className="w-full"
            >
              Apply for WonderFlex
            </Button>
          </CardFooter>
        </Card>

        {/* WonderAdvance Card */}
        <Card>
          <CardHeader>
            <CardTitle>WonderAdvance</CardTitle>
            <CardDescription>
              Get instant access to cash from your outstanding invoices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li>• Up to 90% advance rate</li>
              <li>• Same-day funding available</li>
              <li>• Non-recourse factoring</li>
              <li>• Simple, transparent pricing</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => setSelectedProduct('wonderadvance')}
              className="w-full"
            >
              Apply for WonderAdvance
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Application Form Dialog */}
      {selectedProduct && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              Apply for {selectedProduct === 'wonderflex' ? 'WonderFlex' : 'WonderAdvance'}
            </CardTitle>
            <CardDescription>
              Please provide the following information to process your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Requested Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.requestedAmount}
                onChange={(e) => setFormData({
                  ...formData,
                  requestedAmount: parseFloat(e.target.value)
                })}
              />
            </div>
            {selectedProduct === 'wonderflex' && (
              <div className="space-y-2">
                <Label htmlFor="terms">Payment Terms (Days)</Label>
                <Input
                  id="terms"
                  type="number"
                  placeholder="30, 60, or 90 days"
                  value={formData.terms}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: parseInt(e.target.value)
                  })}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Applications List */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : applications?.length === 0 ? (
            <p className="text-center text-gray-500">No applications yet</p>
          ) : (
            <div className="space-y-4">
              {applications?.map((app) => (
                <Card key={app.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {app.product === 'wonderflex' ? 'WonderFlex' : 'WonderAdvance'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Requested: ${app.requested_amount.toLocaleString()}
                        </p>
                        {app.approved_amount && (
                          <p className="text-sm text-green-600">
                            Approved: ${app.approved_amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Capital;