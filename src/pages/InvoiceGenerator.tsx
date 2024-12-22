import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import PaymentDetailsForm from '@/components/invoice/PaymentDetailsForm';
import InvoiceTermsForm from '@/components/invoice/InvoiceTermsForm';
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

interface InvoiceData {
  // Company Details
  email: string;
  companyName: string;
  logo?: File;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId: string;

  // Invoice Details
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  note: string;
  discount: number;
  tax: number;

  // Payment Details
  bankName: string;
  accountNumber: string;
  accountName: string;
  ifscCode: string;
  routingNumber: string;
  swiftCode: string;

  // Invoice Terms
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
}

const InvoiceGenerator = () => {
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
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
                    disabled={loading}
                  >
                    {loading ? "Preparing Download..." : "Download Invoice"}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default InvoiceGenerator;