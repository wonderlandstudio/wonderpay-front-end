import { Button } from "@/components/ui/button";
import { Building2, Mail } from "lucide-react";

interface StandardPaymentFormProps {
  amount: number;
  onPayment: () => void;
}

export function StandardPaymentForm({ amount, onPayment }: StandardPaymentFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50/80 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">From</span>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Checking •••• 3862</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">To</span>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Pay by Email</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-medium">${amount.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={onPayment}
      >
        Pay ${amount.toLocaleString()}
      </Button>
    </div>
  );
}