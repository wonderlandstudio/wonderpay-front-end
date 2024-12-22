import { useNavigate } from 'react-router-dom';

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

  return (
    <div
      onClick={() => navigate(`/bill-pay/${id}`)}
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
      </div>
    </div>
  );
};