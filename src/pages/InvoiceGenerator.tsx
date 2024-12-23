import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import PaymentDetailsForm from '@/components/invoice/PaymentDetailsForm';
import InvoiceTermsForm from '@/components/invoice/InvoiceTermsForm';
import type { InvoiceData } from '@/types/invoice';

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
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    notes: '',
    date: new Date().toISOString(),
  });

  const handleFieldChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: 'Company Details',
      component: <CompanyDetailsForm data={invoiceData} onChange={handleFieldChange} />
    },
    {
      title: 'Invoice Details',
      component: <InvoiceDetailsForm data={invoiceData} onChange={handleFieldChange} />
    },
    {
      title: 'Payment Details',
      component: <PaymentDetailsForm data={invoiceData} onChange={handleFieldChange} />
    },
    {
      title: 'Invoice Terms',
      component: <InvoiceTermsForm data={invoiceData} onChange={handleFieldChange} />
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <InvoiceSteps
        currentStep={currentStep}
        onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
        onBack={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
        steps={steps}
      />
      
      {currentStep === steps.length - 1 && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<InvoicePDFDocument data={invoiceData} />}
            fileName={`invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`}
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download Invoice'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;