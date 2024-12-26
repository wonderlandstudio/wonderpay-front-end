import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ReceivableService } from '@/services/receivables/receivableService';
import type { InvoiceData } from '@/types/invoice';
import { CurrencyEnum } from '@monite/sdk-api';
import * as ReceivableTransformer from '@/services/api/transformers/ReceivableTransformer';

export function InvoiceForm() {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    email: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
    currency: CurrencyEnum.USD,
    items: [{ description: '', quantity: 1, price: 0 }],
    note: '',
    notes: '',
    discount: 0,
    tax: 0,
    invoiceNumber: '',
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    date: new Date().toISOString(),
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    ifscCode: '',
  });

  const handleFieldChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Creating invoice with data:', invoiceData);
      
      const paymentLinkRequest = ReceivableTransformer.toMonite(invoiceData);
      const response = await ReceivableService.createReceivable(paymentLinkRequest);

      console.log('Invoice created successfully:', response);
      
      toast({
        title: "Success",
        description: "Invoice has been created successfully.",
      });

      navigate('/dashboard/receivables');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    invoiceData,
    handleFieldChange,
    handleSubmit
  };
}