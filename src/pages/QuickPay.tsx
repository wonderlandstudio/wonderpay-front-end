import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector';
import { useToast } from '@/hooks/use-toast';

const QuickPay = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // This will be implemented later with Supabase
      console.log('Processing quick payment:', {
        amount,
        recipientName,
        recipientEmail,
        recipientPhone,
        paymentMethod
      });

      toast({
        title: "Payment initiated",
        description: "Your payment is being processed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-medium">QuickPay</h1>
        <p className="text-gray-500 mt-1">Send money quickly and securely</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Recipient Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientPhone">Recipient Phone</Label>
            <Input
              id="recipientPhone"
              type="tel"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </div>

          <PaymentMethodSelector
            amount={Number(amount)}
            onMethodSelect={(method) => setPaymentMethod(method)}
            selectedMethod={paymentMethod}
          />

          <Button type="submit" className="w-full" disabled={!amount || !recipientName || !paymentMethod}>
            Send Payment
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default QuickPay;