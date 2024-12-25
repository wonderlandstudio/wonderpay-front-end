import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const WonderPayCapital = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">WonderPay Capital</h1>
        <p className="text-gray-600">Access flexible financing solutions for your business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Available Credit</h2>
          <div className="text-3xl font-bold">$50,000.00</div>
          <p className="text-gray-600">Current credit limit based on your business performance</p>
          <Button className="w-full">
            Apply for Increase
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Current Balance</h2>
          <div className="text-3xl font-bold">$0.00</div>
          <p className="text-gray-600">Amount currently being financed</p>
          <Button variant="outline" className="w-full">View Statement</Button>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Benefits</h2>
        <div className="space-y-4">
          {[
            'Flexible payment terms up to 90 days',
            'Competitive interest rates',
            'No hidden fees',
            'Quick approval process',
            'Seamless integration with WonderPay'
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WonderPayCapital;