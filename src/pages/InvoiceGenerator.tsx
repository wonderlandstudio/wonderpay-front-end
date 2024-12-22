import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InvoicePDFDocument from '@/components/invoice/InvoicePDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useToast } from "@/hooks/use-toast";

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = React.useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    companyName: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    notes: '',
  });

  const handleAddItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Number</label>
            <Input
              value={invoiceData.invoiceNumber}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
              placeholder="INV-001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input
              type="date"
              value={invoiceData.date}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <Input
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <Input
              value={invoiceData.companyName}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Your Company Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Client Name</label>
            <Input
              value={invoiceData.clientName}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="Client Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Client Email</label>
            <Input
              type="email"
              value={invoiceData.clientEmail}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
              placeholder="client@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Client Address</label>
            <Textarea
              value={invoiceData.clientAddress}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
              placeholder="Client's full address"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
        <div className="space-y-4">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleAddItem}
          className="mt-4"
        >
          Add Item
        </Button>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes or payment instructions"
        />
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl font-bold">
          Total: ${calculateTotal().toFixed(2)}
        </div>
        <PDFDownloadLink
          document={<InvoicePDFDocument data={invoiceData} />}
          fileName={`invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading} type="button">
              {loading ? 'Generating...' : 'Download Invoice'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoiceGenerator;