import { useState } from 'react';
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceDetails {
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface ReceivableItemProps {
  id: string;
  clientName: string;
  invoiceNumber: string;
  status: 'draft' | 'sent' | 'paid';
  dueDate: string;
  amount: number;
  details: InvoiceDetails;
}

export const ReceivableItem = ({
  id,
  clientName,
  invoiceNumber,
  status,
  dueDate,
  amount,
  details
}: ReceivableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = () => {
    switch (status) {
      case 'draft': return 'text-gray-500';
      case 'sent': return 'text-blue-500';
      case 'paid': return 'text-green-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'draft':
        return <Circle className="h-4 w-4 stroke-[3]" />;
      case 'sent':
        return <Circle className="h-4 w-4" />;
      case 'paid':
        return <Circle className="h-4 w-4 fill-current" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:bg-black/5 transition-all"
      >
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            className="rounded border-gray-300"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">
              {clientName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{clientName}</p>
            <p className="text-sm text-gray-500">{invoiceNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <span className={`flex items-center gap-2 text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="text-sm text-gray-500 min-w-[80px]">
            {new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="font-medium min-w-[100px] text-right">
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="ml-16 p-6 rounded-lg border bg-white/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{clientName}</h3>
                <p className="text-sm text-gray-500">Invoice #{invoiceNumber}</p>
              </div>
              <Button variant="outline">Download PDF</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${item.rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                  <TableCell className="text-right">
                    ${details.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Tax (10%)</TableCell>
                  <TableCell className="text-right">
                    ${details.tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ${details.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};