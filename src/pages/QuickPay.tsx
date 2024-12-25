import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector';
import { useToast } from '@/hooks/use-toast';
import { PaymentMethod } from '@/types/payments';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';

const QuickPay = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

  const quickPayMutation = useMutation({
    mutationFn: async (formData: {
      amount: number;
      recipientName: string;
      recipientEmail?: string;
      recipientPhone?: string;
      paymentMethod: PaymentMethod;
    }) => {
      const { data, error } = await supabase
        .from('quick_pay_transactions')
        .insert({
          amount: formData.amount,
          recipient_name: formData.recipientName,
          recipient_email: formData.recipientEmail,
          recipient_phone: formData.recipientPhone,
          payment_method: formData.paymentMethod,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Payment initiated",
        description: "Your payment is being processed.",
      });
      setAmount('');
      setRecipientName('');
      setRecipientEmail('');
      setRecipientPhone('');
      setPaymentMethod(undefined);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }

    quickPayMutation.mutate({
      amount: Number(amount),
      recipientName,
      recipientEmail,
      recipientPhone,
      paymentMethod,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">QuickPay</h1>
        <p className="text-gray-500 mt-2">Send money quickly and securely</p>
      </div>

      <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-base font-medium">Amount</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-3.5 text-gray-500 text-lg">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8 h-14 text-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="recipientName" className="text-base font-medium">Recipient Name</Label>
              <Input
                id="recipientName"
                className="mt-2 h-14"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="recipientEmail" className="text-base font-medium">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                className="mt-2 h-14"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="recipientPhone" className="text-base font-medium">Recipient Phone</Label>
              <Input
                id="recipientPhone"
                type="tel"
                className="mt-2 h-14"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <PaymentMethodSelector
              amount={Number(amount)}
              onMethodSelect={(method) => setPaymentMethod(method)}
              selectedMethod={paymentMethod}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-medium mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
            disabled={!amount || !recipientName || !paymentMethod || quickPayMutation.isPending}
          >
            {quickPayMutation.isPending ? 'Processing...' : 'Send Payment'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default QuickPay;