export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  // Company Details
  email: string;
  companyName: string;
  logo?: File;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId: string;

  // Invoice Details
  currency: string;
  items: InvoiceItem[];
  note: string;
  discount: number;
  tax: number;

  // Payment Details
  bankName: string;
  accountNumber: string;
  accountName: string;
  ifscCode: string;
  routingNumber: string;
  swiftCode: string;

  // Invoice Terms
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;

  // These were missing and causing the error
  notes: string;
  date: string;
}