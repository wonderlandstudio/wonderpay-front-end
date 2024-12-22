export interface QuickBooksIntegration {
  connectionId: string;
  status: 'connected' | 'disconnected' | 'pending';
  companyId?: string;
  lastSync?: Date;
  metadata?: Record<string, any>;
}

export interface AccountingIntegration {
  quickbooks?: QuickBooksIntegration;
  // Add other accounting services here in the future (Xero, FreshBooks, etc.)
}