export interface MoniteIntegration {
  accountId: string;
  status: 'connected' | 'disconnected' | 'pending';
  metadata?: Record<string, any>;
}

export interface FinicityIntegration {
  customerId: string;
  institutionLoginId: string;
  status: 'active' | 'inactive' | 'error';
  accounts: Array<{
    id: string;
    type: 'checking' | 'savings' | 'credit' | 'investment';
    name: string;
  }>;
}

export interface PlaidIntegration {
  accessToken?: string;
  itemId?: string;
  status: 'connected' | 'disconnected' | 'pending';
  accounts: Array<{
    id: string;
    name: string;
    type: string;
    subtype: string;
  }>;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  type: 'checking' | 'savings';
  status: 'active' | 'pending' | 'disabled';
  integration?: {
    monite?: MoniteIntegration;
    finicity?: FinicityIntegration;
    plaid?: PlaidIntegration;
  };
}

export interface Card {
  id: string;
  lastFour: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  status: 'active' | 'expired' | 'disabled';
  integration?: {
    monite?: MoniteIntegration;
  };
}