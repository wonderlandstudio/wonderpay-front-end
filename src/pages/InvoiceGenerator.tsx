import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import InvoiceTermsForm from '@/components/invoice/InvoiceTermsForm';
import PaymentDetailsForm from '@/components/invoice/PaymentDetailsForm';
import { InvoiceData } from '@/types/invoice';
import { toast } from '@/hooks/use-toast';
import { MoniteAuthService } from '@/services/auth/moniteAuth';

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    email: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
    currency: 'USD',
    items: [{ description: '', quantity: 1, price: 0 }],
    note: '',
    notes: '', // Added missing field
    discount: 0,
    tax: 0,
    invoiceNumber: '',
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    date: new Date().toISOString(), // Added missing field
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    ifscCode: '',
  });

  const handleFieldChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard/bill-pay');
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Creating invoice with data:', invoiceData);
      
      // Create invoice using Monite SDK
      const sdk = await MoniteAuthService.initializeSDK();
      const response = await sdk.receivables.create({
        type: 'invoice',
        currency: invoiceData.currency,
        amount: invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        counterpart_name: invoiceData.clientName,
        counterpart_email: invoiceData.clientEmail,
        counterpart_address: {
          line1: invoiceData.clientAddress,
        },
        items: invoiceData.items.map(item => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price,
        })),
        payment_terms: {
          due_date: invoiceData.dueDate,
        },
      });

      console.log('Invoice created successfully:', response);
      
      toast({
        title: "Success",
        description: "Invoice has been created successfully.",
      });

      navigate('/dashboard/receivables');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      title: "Company Details",
      component: (
        <CompanyDetailsForm
          data={invoiceData}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      title: "Invoice Terms",
      component: (
        <InvoiceTermsForm
          data={invoiceData}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      title: "Invoice Details",
      component: (
        <InvoiceDetailsForm
          data={invoiceData}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      title: "Payment Details",
      component: (
        <PaymentDetailsForm
          data={invoiceData}
          onChange={handleFieldChange}
        />
      ),
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
        
        <InvoiceSteps
          currentStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          steps={steps}
        />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
