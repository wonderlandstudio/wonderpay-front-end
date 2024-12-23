import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { PaymentDialog } from '@/components/payments/PaymentDialog';
import { toast } from '@/hooks/use-toast';

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
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleClick = () => {
    console.log('Navigating to invoice detail:', id);
    navigate(`/dashboard/bill-pay/${id}`);
  };

  const handlePaymentComplete = () => {
    console.log('Payment completed for invoice:', id);
    toast({
      title: "Payment Initiated",
      description: "Your payment is being processed.",
    });
    setShowPaymentDialog(false);
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
                console.log('Opening payment dialog for invoice:', id);
                setShowPaymentDialog(true);
              }}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        amount={amount}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};