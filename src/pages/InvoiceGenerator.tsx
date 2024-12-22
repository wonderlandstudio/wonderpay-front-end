import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    invoiceNumber: 'INV-001',
    issueDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    notes: '',
    date: new Date().toISOString(),
  });

  const handleDataChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const forms = [
    {
      title: 'Company Details',
      component: <CompanyDetailsForm data={invoiceData} onChange={handleDataChange} />
    },
    {
      title: 'Invoice Details',
      component: <InvoiceDetailsForm data={invoiceData} onChange={handleDataChange} />
    },
    {
      title: 'Payment Details',
      component: <PaymentDetailsForm data={invoiceData} onChange={handleDataChange} />
    },
    {
      title: 'Invoice Terms',
      component: <InvoiceTermsForm data={invoiceData} onChange={handleDataChange} />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1400px] py-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/bill-pay')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6 h-[calc(100vh-12rem)] overflow-auto">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{forms[currentStep].title}</h2>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {forms.length}
                </div>
              </div>
              
              {forms[currentStep].component}
              
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentStep(prev => Math.min(prev + 1, forms.length - 1))}
                  disabled={currentStep === forms.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Preview Section */}
          <Card className="p-6 h-[calc(100vh-12rem)] overflow-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Preview</h2>
              <div className="aspect-[1/1.4] bg-white rounded-lg border shadow-sm p-6">
                <InvoicePDFDocument data={invoiceData} />
              </div>
              {currentStep === forms.length - 1 && (
                <PDFDownloadLink
                  document={<InvoicePDFDocument data={invoiceData} />}
                  fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
                >
                  {() => (
                    <Button className="w-full">
                      Download Invoice
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;