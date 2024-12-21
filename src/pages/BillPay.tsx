import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BillPay = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bill Pay</h1>
        <Button>
          <Plus className="mr-2" />
          New Bill
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">$0.00</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">$0.00</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Due</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">$0.00</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No bills found. Click "New Bill" to create one.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillPay;