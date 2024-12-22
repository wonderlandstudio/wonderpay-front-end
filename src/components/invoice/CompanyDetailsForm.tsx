import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyDetailsFormProps {
  data: {
    email: string;
    companyName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    taxId: string;
  };
  onChange: (field: string, value: string) => void;
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Details (To)</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="e.g. contact@company.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1">
            We'll fill the billing details automatically if we find the company.
          </p>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">Billing details</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                value={data.companyName}
                onChange={(e) => onChange('companyName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => onChange('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => onChange('city', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
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
                  value={data.zip}
                  onChange={(e) => onChange('zip', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={data.country}
                  onChange={(e) => onChange('country', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={data.taxId}
                onChange={(e) => onChange('taxId', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;