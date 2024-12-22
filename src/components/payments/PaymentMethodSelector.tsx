import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentMethod, PaymentTerm, WonderPayCapitalTerms } from '@/types/payments';

interface PaymentMethodSelectorProps {
  amount: number;
  onMethodSelect: (method: PaymentMethod) => void;
  onTermSelect?: (term: PaymentTerm) => void;
  wonderPayCapital?: WonderPayCapitalTerms;
  selectedMethod?: PaymentMethod;
  selectedTerm?: PaymentTerm;
}

export function PaymentMethodSelector({
  amount,
  onMethodSelect,
  onTermSelect,
  wonderPayCapital,
  selectedMethod,
  selectedTerm,
}: PaymentMethodSelectorProps) {
  const formatInterestRate = (rate: number) => `${(rate * 100).toFixed(2)}%`;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
          <CardDescription>
            Choose how you'd like to pay this bill
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedMethod}
            onValueChange={(value: PaymentMethod) => onMethodSelect(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ach">ACH Transfer</SelectItem>
              <SelectItem value="wire">Wire Transfer</SelectItem>
              <SelectItem value="international_wire">International Wire</SelectItem>
              <SelectItem value="card">Pay by Card</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {wonderPayCapital && wonderPayCapital.status === 'approved' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              WonderPay Capital
              <Badge variant="secondary">Available</Badge>
            </CardTitle>
            <CardDescription>
              Extend your payment terms with competitive rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedTerm}
              onValueChange={(value: PaymentTerm) => onTermSelect?.(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment term" />
              </SelectTrigger>
              <SelectContent>
                {wonderPayCapital.availableTerms.map((term) => (
                  <SelectItem key={term} value={term}>
                    {term} Days ({formatInterestRate(wonderPayCapital.interestRates[term])})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}
    </div>
  );
}