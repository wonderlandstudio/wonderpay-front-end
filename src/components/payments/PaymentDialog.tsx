import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";
import { PaymentMethod, PaymentTerm } from "@/types/payments";
import { PaymentOptions } from "./PaymentOptions";
import { StandardPaymentForm } from "./StandardPaymentForm";
import { WonderPayCapitalForm } from "./WonderPayCapitalForm";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onPaymentComplete: () => void;
}

export function PaymentDialog({
  open,
  onOpenChange,
  amount,
  onPaymentComplete
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const [showCapital, setShowCapital] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<PaymentTerm>();

  const handlePayment = async () => {
    console.log('Processing payment:', { amount, method: selectedMethod, term: selectedTerm });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onPaymentComplete();
      onOpenChange(false);
      console.log('Payment processed successfully');
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <div className="space-y-6 p-6 bg-white/80 backdrop-blur-lg">
          <h2 className="text-3xl font-normal">Pay</h2>
          
          <PaymentOptions 
            showCapital={showCapital}
            selectedMethod={selectedMethod}
            onSelectStandardPayment={() => {
              setShowCapital(false);
              setSelectedMethod('ach');
              console.log('Selected payment method: ACH');
            }}
            onSelectCapital={() => {
              setShowCapital(true);
              console.log('Showing WonderPay Capital options');
            }}
          />

          {!showCapital ? (
            <StandardPaymentForm 
              amount={amount}
              onPayment={handlePayment}
            />
          ) : (
            <WonderPayCapitalForm />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}