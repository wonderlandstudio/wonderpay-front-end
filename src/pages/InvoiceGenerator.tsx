import React, { useState } from 'react';
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

const InvoiceGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
  });

  const handleCompanyDetailsChange = (field: string, value: string) => {
    setCompanyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    {
      title: 'Company Details',
      component: (
        <CompanyDetailsForm
          data={companyDetails}
          onChange={handleCompanyDetailsChange}
        />
      )
    },
    // Additional steps will be added here
  ];

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg border">
          <InvoiceSteps
            currentStep={currentStep}
            onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
            onBack={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
            steps={steps}
          />
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="aspect-[1/1.4] bg-white rounded-lg border shadow-sm p-6">
            {/* Preview content will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
