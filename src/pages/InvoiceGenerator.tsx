import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { InvoicePDFDocument } from '@/components/invoice/InvoicePDFDocument';
import { InvoiceSteps } from '@/components/invoice/InvoiceSteps';
import { CompanyDetailsForm } from '@/components/invoice/CompanyDetailsForm';
import { InvoiceDetailsForm } from '@/components/invoice/InvoiceDetailsForm';
import { PaymentDetailsForm } from '@/components/invoice/PaymentDetailsForm';
import { InvoiceTermsForm } from '@/components/invoice/InvoiceTermsForm';
import type { InvoiceData } from '@/types/invoice';

const InvoiceGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleStepComplete = (stepData: Partial<InvoiceData>) => {
    setInvoiceData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyDetailsForm onComplete={handleStepComplete} initialData={invoiceData} />;
      case 2:
        return <InvoiceDetailsForm onComplete={handleStepComplete} initialData={invoiceData} />;
      case 3:
        return <PaymentDetailsForm onComplete={handleStepComplete} initialData={invoiceData} />;
      case 4:
        return <InvoiceTermsForm onComplete={handleStepComplete} initialData={invoiceData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <InvoiceSteps currentStep={currentStep} onStepClick={setCurrentStep} />
      {renderStep()}
      {currentStep === 4 && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<InvoicePDFDocument data={invoiceData} />}
            fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
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