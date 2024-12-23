import React from 'react';
import { Building2, Mail } from "lucide-react";

interface PaymentSummaryProps {
  fromAccount: string;
  toMethod: string;
  amount: number;
}

export function PaymentSummary({ fromAccount, toMethod, amount }: PaymentSummaryProps) {
  return (
    <div className="bg-gray-50/80 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">From</span>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{fromAccount}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">To</span>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{toMethod}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total</span>
        <span className="text-xl font-medium">${amount.toLocaleString()}</span>
      </div>
    </div>
  );
}