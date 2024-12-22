import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import PaymentDetailsForm from '@/components/invoice/PaymentDetailsForm';
import InvoiceTermsForm from '@/components/invoice/InvoiceTermsForm';
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';

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
    items: [],
    note: '',
    discount: 0,
    tax: 0,
    bankName: '',
    accountNumber: '',
    accountName: '',
    ifscCode: '',
    routingNumber: '',
    swiftCode: '',
    invoiceNumber: 'INVOICE-01',
    issueDate: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    notes: '',
    date: new Date().toISOString(),
  });

  const handleDataChange = (section: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const steps = [
    {
      title: 'Company Details',
      component: (
        <CompanyDetailsForm
          data={invoiceData}
          onChange={handleDataChange}
        />
      )
    },
    {
      title: 'Invoice Details',
      component: (
        <InvoiceDetailsForm
          data={invoiceData}
          onChange={handleDataChange}
        />
      )
    },
    {
      title: 'Payment Details',
      component: (
        <PaymentDetailsForm
          data={invoiceData}
          onChange={handleDataChange}
        />
      )
    },
    {
      title: 'Invoice Terms',
      component: (
        <InvoiceTermsForm
          data={invoiceData}
          onChange={handleDataChange}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/bill-pay')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <InvoiceSteps
              currentStep={currentStep}
              onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
              onBack={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
              steps={steps}
            />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="aspect-[1/1.4] bg-white rounded-lg border shadow-sm p-6">
              <InvoicePDFDocument data={invoiceData} />
            </div>
            {currentStep === steps.length - 1 && (
              <div className="mt-4">
                <PDFDownloadLink
                  document={<InvoicePDFDocument data={invoiceData} />}
                  fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
                >
                  {({ loading }) => (
                    <Button
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Preparing Download..." : "Download Invoice"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;