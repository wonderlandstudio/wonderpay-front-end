import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector';
import { useState } from 'react';
import { PaymentMethod, PaymentTerm } from '@/types/payments';

interface TransactionItemProps {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  status: string;
  dueDate: string;
  amount: number;
}

export const TransactionItem = ({
  id,
  vendorName,
  invoiceNumber,
  status,
  dueDate,
  amount
}: TransactionItemProps) => {
  const navigate = useNavigate();
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const [selectedTerm, setSelectedTerm] = useState<PaymentTerm>();

  const handleClick = () => {
    navigate(`/dashboard/bill-pay/${id}`);
  };

  // This will be implemented when Monite integration is ready
  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    console.log('Processing payment:', {
      method: selectedMethod,
      term: selectedTerm,
      amount,
      billId: id
    });
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        className="p-4 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:bg-black/5 transition-all"
      >
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            className="rounded border-gray-300"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600 text-sm">
              {vendorName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{vendorName}</p>
            <p className="text-sm text-gray-500">{invoiceNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-orange-600 text-sm font-medium">
            {status}
          </span>
          <span className="text-sm text-gray-500 min-w-[80px]">
            {new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="font-medium min-w-[100px] text-right">
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {status === 'pending' && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setShowPaymentMethods(!showPaymentMethods);
              }}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>

      {showPaymentMethods && (
        <div className="ml-16">
          <PaymentMethodSelector
            amount={amount}
            onMethodSelect={setSelectedMethod}
            onTermSelect={setSelectedTerm}
            selectedMethod={selectedMethod}
            selectedTerm={selectedTerm}
            wonderPayCapital={{
              status: 'approved',
              availableTerms: ['30', '60', '90'],
              interestRates: {
                '30': 0.01,
                '60': 0.02,
                '90': 0.03
              },
              creditLimit: 100000
            }}
          />
          <div className="mt-4 flex justify-end">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handlePayment();
              }}
              disabled={!selectedMethod}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};