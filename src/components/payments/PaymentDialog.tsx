import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, Mail } from "lucide-react";
import { useState } from "react";
import { PaymentMethod, PaymentTerm } from "@/types/payments";

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
    // Mock payment processing
    console.log("Processing payment:", { amount, method: selectedMethod, term: selectedTerm });
    onPaymentComplete();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <div className="space-y-6 p-6 bg-white/80 backdrop-blur-lg">
          <h2 className="text-3xl font-normal">Pay</h2>
          
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className={`flex-1 h-20 bg-violet-100/50 hover:bg-violet-100 ${!showCapital && selectedMethod === 'ach' ? 'ring-2 ring-violet-500' : ''}`}
              onClick={() => {
                setShowCapital(false);
                setSelectedMethod('ach');
              }}
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
              onClick={() => setShowCapital(true)}
            >
              <div className="text-left">
                <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mb-1">
                  <CreditCard className="h-4 w-4 text-orange-700" />
                </div>
                <span className="block text-sm font-normal">WonderPay Capital</span>
              </div>
            </Button>
          </div>

          {!showCapital ? (
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
                onClick={handlePayment}
              >
                Pay ${amount.toLocaleString()}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50/80 p-4 rounded-lg">
                <h3 className="text-lg mb-4">Please reach out below to learn more about WonderPay Capital.</h3>
                <p className="text-gray-600 mb-4">WonderPay offers supply chain financing based on a number of factors, including:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Payments to date on WonderPay
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Length of bank account history
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Financial activity
                  </li>
                </ul>
              </div>

              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  // This would typically open a form or start the WonderPay Capital application process
                  console.log("Starting WonderPay Capital application");
                }}
              >
                Apply for WonderPay Capital
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}