import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/bill-pay')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Bills
      </Button>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Invoice #{invoiceId}</h1>
        {/* Invoice details will be implemented here */}
      </div>
    </div>
  );
};

export default InvoiceDetail;