import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import InvoiceSteps from '@/components/invoice/InvoiceSteps';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoice/InvoiceDetailsForm';
import InvoiceTermsForm from '@/components/invoice/InvoiceTermsForm';
import PaymentDetailsForm from '@/components/invoice/PaymentDetailsForm';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const { invoiceData, handleFieldChange, handleSubmit } = InvoiceForm();
  const [currentStep, setCurrentStep] = useState(0);

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