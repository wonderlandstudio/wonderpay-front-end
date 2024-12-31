import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import type { InvoiceData } from '@/types/invoice';
import { CurrencyEnum } from '@monite/sdk-api';
import { supabase } from '@/integrations/supabase/client';

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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const insertData = {
        client_name: invoiceData.clientName,
        invoice_number: invoiceData.invoiceNumber,
        amount: invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        currency: invoiceData.currency,
        status: 'draft',
        due_date: new Date(invoiceData.dueDate).toISOString(),
        items: invoiceData.items,
        notes: invoiceData.notes,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('invoices')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      console.log('Invoice created successfully:', data);
      
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