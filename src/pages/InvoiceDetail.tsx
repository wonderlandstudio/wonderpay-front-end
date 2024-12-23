import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Send } from "lucide-react";
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector';
import { useState } from 'react';
import { PaymentMethod, PaymentTerm } from '@/types/payments';
import { toast } from '@/hooks/use-toast';

// Mock data - replace with actual data fetching
const mockInvoiceData = {
  id: 'INV-001',
  vendorName: '24/7 Productions',
  invoiceNumber: '240-23',
  status: 'pending',
  dueDate: '2024-10-11',
  amount: 10500.00,
  items: [
    {
      description: 'Web Development Services',
      quantity: 1,
      price: 8500.00,
      total: 8500.00
    },
    {
      description: 'UI/UX Design',
      quantity: 1,
      price: 2000.00,
      total: 2000.00
    }
  ],
  subtotal: 10500.00,
  tax: 1050.00,
  total: 11550.00,
  notes: 'Payment due within 30 days'
};

const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const [selectedTerm, setSelectedTerm] = useState<PaymentTerm>();

  // In a real app, fetch invoice data based on invoiceId
  const invoice = mockInvoiceData;

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    // Mock payment processing
    toast({
      title: "Payment Initiated",
      description: `Processing payment of $${invoice.amount} via ${selectedMethod}`,
    });
    
    // In a real app, this would make an API call to process the payment
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      navigate('/dashboard/bill-pay');
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/dashboard/bill-pay')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Bills
      </Button>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Invoice #{invoice.invoiceNumber}</h1>
            <p className="text-gray-500">{invoice.vendorName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            {invoice.status === 'pending' && (
              <Button onClick={() => setShowPayment(true)}>
                <Send className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{invoice.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">
              {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount Due</p>
            <p className="font-medium">${invoice.amount.toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="font-medium mb-4">Invoice Items</h2>
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">${invoice.subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Tax (10%)</p>
              <p className="font-medium">${invoice.tax.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>${invoice.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {showPayment && (
          <div className="border-t pt-6">
            <h2 className="font-medium mb-4">Payment Details</h2>
            <PaymentMethodSelector
              amount={invoice.total}
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
                onClick={handlePayment}
                disabled={!selectedMethod}
              >
                Process Payment
              </Button>
            </div>
          </div>
        )}

        {invoice.notes && (
          <div className="border-t pt-6">
            <h2 className="font-medium mb-2">Notes</h2>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;