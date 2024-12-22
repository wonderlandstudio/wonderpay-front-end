import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceData } from '@/types/invoice';

interface CompanyDetailsFormProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: any) => void;
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="company@example.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Your Company Name"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Street Address"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="State"
            value={data.state}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            id="zip"
            placeholder="ZIP Code"
            value={data.zip}
            onChange={(e) => onChange('zip', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Country"
            value={data.country}
            onChange={(e) => onChange('country', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="taxId">Tax ID</Label>
        <Input
          id="taxId"
          placeholder="Tax ID Number"
          value={data.taxId}
          onChange={(e) => onChange('taxId', e.target.value)}
        />
      </div>
    </div>
  );
};

export default CompanyDetailsForm;