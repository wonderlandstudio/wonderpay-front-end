import { Button } from "@/components/ui/button";
import { PaymentSummary } from "./PaymentSummary";

interface StandardPaymentFormProps {
  amount: number;
  onPayment: () => void;
}

export function StandardPaymentForm({ amount, onPayment }: StandardPaymentFormProps) {
  console.log('Rendering StandardPaymentForm with amount:', amount);
  
  return (
    <div className="space-y-4">
      <PaymentSummary 
        fromAccount="Checking •••• 3862"
        toMethod="Pay by Email"
        amount={amount}
      />

      <Button 
        className="w-full"
        onClick={() => {
          console.log('Payment button clicked, amount:', amount);
          onPayment();
        }}
      >
        Pay ${amount.toLocaleString()}
      </Button>
    </div>
  );
}