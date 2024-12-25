import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationFormData, CapitalProduct } from '@/types/capital';
import { Loader2 } from 'lucide-react';

interface ApplicationFormProps {
  product: CapitalProduct;
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ApplicationForm = ({
  product,
  onSubmit,
  onCancel,
  isSubmitting
}: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    product,
    requestedAmount: 0,
    terms: product === 'wonderflex' ? 30 : undefined,
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          Apply for {product === 'wonderflex' ? 'WonderFlex' : 'WonderAdvance'}
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
        {product === 'wonderflex' && (
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => onSubmit(formData)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
  );
};