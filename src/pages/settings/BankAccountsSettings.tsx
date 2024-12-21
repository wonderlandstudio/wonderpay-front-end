import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from 'lucide-react';

const BankAccountsSettings = () => {
  const accounts = [
    { name: 'Checking', lastFour: '3862', isDefault: true },
    { name: 'Cash (Checking)', lastFour: '6092', balance: '$268.60' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Bank accounts</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add account
        </Button>
      </div>
      
      <Card className="max-w-3xl p-6 space-y-4 bg-white/50">
        {accounts.map((account, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-500" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{account.name}</h3>
                  {account.isDefault && (
                    <span className="text-sm text-gray-500">Default</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">••••{account.lastFour}</p>
              </div>
            </div>
            {account.balance && (
              <span className="text-gray-900 font-medium">{account.balance}</span>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default BankAccountsSettings;