import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CompanyDetailsForm from '@/components/invoice/CompanyDetailsForm';
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import { InvoiceData } from '@/types/invoice';

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    email: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
    currency: 'USD',
    items: [],
    note: '',
    discount: 0,
    tax: 0,
    bankName: '',
    accountNumber: '',
    accountName: '',
    ifscCode: '',
    routingNumber: '',
    swiftCode: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleFieldChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Invoice</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <CompanyDetailsForm 
            data={invoiceData} 
            onChange={handleFieldChange}
          />
        </Card>

        <div className="flex justify-end mt-6">
          <PDFDownloadLink
            document={<InvoicePDFDocument data={invoiceData} />}
            fileName={`invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`}
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;