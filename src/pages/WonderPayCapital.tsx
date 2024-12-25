import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WonderPayCapital = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);
    try {
      // This will be implemented when the Monite SDK is properly configured
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Application Submitted",
        description: "Your WonderPay Capital application is being processed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">WonderPay Capital</h1>
          <p className="text-gray-500 mt-2">Access flexible financing for your business.</p>
        </div>
      </div>

      <Card className="p-6 space-y-6 bg-white/50">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Business Financing</h2>
          <p className="text-gray-600">
            Get access to working capital and flexible payment terms through WonderPay Capital.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Flexible payment terms up to 90 days
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Competitive interest rates
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Quick approval process
            </li>
          </ul>
        </div>

        <Button 
          onClick={handleApply} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Apply Now'
          )}
        </Button>
      </Card>
    </div>
  );
};

export default WonderPayCapital;