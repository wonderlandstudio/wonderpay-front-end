import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InvoiceData } from '@/types/invoice';

interface InvoiceTermsFormProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: any) => void;
}

const InvoiceTermsForm: React.FC<InvoiceTermsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="invoiceNumber">Invoice Number</Label>
        <Input
          id="invoiceNumber"
          placeholder="INV-001"
          value={data.invoiceNumber}
          onChange={(e) => onChange('invoiceNumber', e.target.value)}
        />
      </div>

      <div>
        <Label>Issue Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.issueDate ? format(new Date(data.issueDate), 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.issueDate ? new Date(data.issueDate) : undefined}
              onSelect={(date) => onChange('issueDate', date?.toISOString() ?? '')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.dueDate ? format(new Date(data.dueDate), 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.dueDate ? new Date(data.dueDate) : undefined}
              onSelect={(date) => onChange('dueDate', date?.toISOString() ?? '')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          placeholder="Enter client name"
          value={data.clientName}
          onChange={(e) => onChange('clientName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="clientEmail">Client Email</Label>
        <Input
          id="clientEmail"
          type="email"
          placeholder="client@example.com"
          value={data.clientEmail}
          onChange={(e) => onChange('clientEmail', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="clientAddress">Client Address</Label>
        <Input
          id="clientAddress"
          placeholder="Enter client address"
          value={data.clientAddress}
          onChange={(e) => onChange('clientAddress', e.target.value)}
        />
      </div>
    </div>
  );
};

export default InvoiceTermsForm;