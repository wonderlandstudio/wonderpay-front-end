export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  email: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId: string;
  currency: string;
  items: InvoiceItem[];
  note: string;
  notes: string;
  discount: number;
  tax: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  ifscCode: string;
}

export interface Invoice {
  id: string;
  client_name: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  due_date: string;
  items: InvoiceItem[];
  notes: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}