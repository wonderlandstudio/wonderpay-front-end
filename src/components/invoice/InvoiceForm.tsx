import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ReceivableService } from '@/services/receivables/receivableService';
import type { InvoiceData } from '@/types/invoice';
import { CurrencyEnum } from '@monite/sdk-api';

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
      
      const response = await ReceivableService.createInvoice({
        type: 'invoice',
        currency: invoiceData.currency as CurrencyEnum,
        amount: invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        counterpart_name: invoiceData.clientName,
        counterpart_email: invoiceData.clientEmail,
        counterpart_address: {
          line1: invoiceData.clientAddress,
        },
        items: invoiceData.items.map(item => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price,
        })),
        payment_terms: {
          due_date: invoiceData.dueDate,
        },
      });

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