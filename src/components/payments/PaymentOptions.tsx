import { Button } from "@/components/ui/button";
import { Building2, CreditCard } from "lucide-react";

interface PaymentOptionsProps {
  showCapital: boolean;
  selectedMethod: string | undefined;
  onSelectStandardPayment: () => void;
  onSelectCapital: () => void;
}

export function PaymentOptions({
  showCapital,
  selectedMethod,
  onSelectStandardPayment,
  onSelectCapital
}: PaymentOptionsProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant="ghost"
        className={`flex-1 h-20 bg-violet-100/50 hover:bg-violet-100 ${!showCapital && selectedMethod === 'ach' ? 'ring-2 ring-violet-500' : ''}`}
        onClick={onSelectStandardPayment}
      >
        <div className="text-left">
          <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center mb-1">
            <Building2 className="h-4 w-4 text-violet-700" />
          </div>
          <span className="block text-sm font-normal">Pay</span>
        </div>
      </Button>

      <Button
        variant="ghost"
        className={`flex-1 h-20 bg-orange-100/50 hover:bg-orange-100 ${showCapital ? 'ring-2 ring-orange-500' : ''}`}
        onClick={onSelectCapital}
      >
        <div className="text-left">
          <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mb-1">
            <CreditCard className="h-4 w-4 text-orange-700" />
          </div>
          <span className="block text-sm font-normal">WonderPay Capital</span>
        </div>
      </Button>
    </div>
  );
}