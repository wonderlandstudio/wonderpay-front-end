import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function BillPayHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Pay</h1>
      <Button onClick={() => {
        console.log('Navigating to new bill page');
        navigate('/dashboard/bill-pay/new');
      }}>
        <Plus className="h-4 w-4 mr-2" />
        Add bill
      </Button>
    </div>
  );
}