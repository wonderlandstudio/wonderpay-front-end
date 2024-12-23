import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PaymentDialog } from '@/components/payments/PaymentDialog';
import { toast } from '@/hooks/use-toast';
import { TransactionVendor } from './TransactionVendor';
import { TransactionDetails } from './TransactionDetails';

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
        <TransactionVendor 
          vendorName={vendorName}
          invoiceNumber={invoiceNumber}
        />
        
        <TransactionDetails 
          status={status}
          dueDate={dueDate}
          amount={amount}
          onPayNow={() => {
            console.log('Opening payment dialog for invoice:', id);
            setShowPaymentDialog(true);
          }}
        />
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