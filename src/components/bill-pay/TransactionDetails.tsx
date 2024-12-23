import { Button } from "@/components/ui/button";

interface TransactionDetailsProps {
  status: string;
  dueDate: string;
  amount: number;
  onPayNow?: () => void;
}

export function TransactionDetails({ 
  status, 
  dueDate, 
  amount, 
  onPayNow 
}: TransactionDetailsProps) {
  return (
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
      {status === 'pending' && onPayNow && (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onPayNow();
          }}
        >
          Pay Now
        </Button>
      )}
    </div>
  );
}