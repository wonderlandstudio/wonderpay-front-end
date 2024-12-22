import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

// This interface will be used when we integrate with the backend
interface Transaction {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  amount: number;
}

const BillPay = () => {
  const navigate = useNavigate();

  // Placeholder data - will be replaced with backend data
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      vendorName: '24/7 Productions',
      invoiceNumber: '240-23',
      status: 'overdue',
      dueDate: 'Oct 11',
      amount: 10500.00
    },
    // More transactions will be added when connected to backend
  ];

  const handleTransactionClick = (transactionId: string) => {
    // Will navigate to individual transaction view when implemented
    console.log(`Viewing transaction ${transactionId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pay</h1>
        <Button onClick={() => navigate('/bill-pay/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add bill
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">$50,500.00</span>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">$0.00</span>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">$80,989.55</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            className="pl-10 bg-white/50 backdrop-blur-sm" 
            placeholder="Search..." 
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" className="gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Due soonest
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Recent transactions</h2>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction.id)}
              className="p-4 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:bg-black/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-sm">
                    {transaction.vendorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{transaction.vendorName}</p>
                  <p className="text-sm text-gray-500">{transaction.invoiceNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-orange-600 text-sm font-medium">
                  {transaction.status}
                </span>
                <span className="text-sm text-gray-500">{transaction.dueDate}</span>
                <span className="font-medium">
                  ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillPay;