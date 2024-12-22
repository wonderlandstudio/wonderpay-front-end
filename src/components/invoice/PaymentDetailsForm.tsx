import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentDetailsFormProps {
  data: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    ifscCode: string;
    routingNumber: string;
    swiftCode: string;
  };
  onChange: (field: string, value: string) => void;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Details</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="bankName">Bank name</Label>
          <Input
            id="bankName"
            value={data.bankName}
            onChange={(e) => onChange('bankName', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="accountNumber">Account number</Label>
          <Input
            id="accountNumber"
            value={data.accountNumber}
            onChange={(e) => onChange('accountNumber', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="accountName">Account Name</Label>
          <Input
            id="accountName"
            value={data.accountName}
            onChange={(e) => onChange('accountName', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC code</Label>
          <Input
            id="ifscCode"
            value={data.ifscCode}
            onChange={(e) => onChange('ifscCode', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="routingNumber">Routing number</Label>
          <Input
            id="routingNumber"
            value={data.routingNumber}
            onChange={(e) => onChange('routingNumber', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="swiftCode">Swift code</Label>
          <Input
            id="swiftCode"
            value={data.swiftCode}
            onChange={(e) => onChange('swiftCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;