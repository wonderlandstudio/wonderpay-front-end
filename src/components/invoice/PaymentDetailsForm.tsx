import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceData } from '@/types/invoice';

interface PaymentDetailsFormProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: any) => void;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          placeholder="Enter bank name"
          value={data.bankName}
          onChange={(e) => onChange('bankName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="accountName">Account Name</Label>
        <Input
          id="accountName"
          placeholder="Enter account name"
          value={data.accountName}
          onChange={(e) => onChange('accountName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          placeholder="Enter account number"
          value={data.accountNumber}
          onChange={(e) => onChange('accountNumber', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          placeholder="Enter routing number"
          value={data.routingNumber}
          onChange={(e) => onChange('routingNumber', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="swiftCode">SWIFT Code</Label>
        <Input
          id="swiftCode"
          placeholder="Enter SWIFT code"
          value={data.swiftCode}
          onChange={(e) => onChange('swiftCode', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="ifscCode">IFSC Code</Label>
        <Input
          id="ifscCode"
          placeholder="Enter IFSC code"
          value={data.ifscCode}
          onChange={(e) => onChange('ifscCode', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PaymentDetailsForm;