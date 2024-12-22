import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InvoiceTermsFormProps {
  data: {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
  };
  onChange: (field: string, value: string) => void;
}

const InvoiceTermsForm: React.FC<InvoiceTermsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Invoice terms</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice number</Label>
          <Input
            id="invoiceNumber"
            value={data.invoiceNumber}
            onChange={(e) => onChange('invoiceNumber', e.target.value)}
          />
        </div>

        <div>
          <Label>Issue date</Label>
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
                onSelect={(date) => onChange('issueDate', date ? date.toISOString() : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Due date</Label>
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
                onSelect={(date) => onChange('dueDate', date ? date.toISOString() : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTermsForm;