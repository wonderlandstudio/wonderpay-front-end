import { useNavigate } from 'react-router-dom';
import { Circle } from "lucide-react";

interface ReceivableItemProps {
  id: string;
  clientName: string;
  invoiceNumber: string;
  status: 'draft' | 'sent' | 'paid';
  dueDate: string;
  amount: number;
}

export const ReceivableItem = ({
  id,
  clientName,
  invoiceNumber,
  status,
  dueDate,
  amount
}: ReceivableItemProps) => {
  const navigate = useNavigate();
  
  const getStatusColor = () => {
    switch (status) {
      case 'draft': return 'text-gray-500';
      case 'sent': return 'text-blue-500';
      case 'paid': return 'text-green-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'draft':
        return <Circle className="h-4 w-4 stroke-[3]" />;
      case 'sent':
        return <Circle className="h-4 w-4" />;
      case 'paid':
        return <Circle className="h-4 w-4 fill-current" />;
    }
  };

  return (
    <div
      onClick={() => navigate(`/dashboard/receivables/${id}`)}
      className="p-4 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:bg-black/5 transition-all"
    >
      <div className="flex items-center gap-4">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          onClick={(e) => e.stopPropagation()} 
        />
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 text-sm">
            {clientName.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium">{clientName}</p>
          <p className="text-sm text-gray-500">{invoiceNumber}</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <span className={`flex items-center gap-2 text-sm font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          {status.charAt(0).toUpperCase() + status.slice(1)}
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