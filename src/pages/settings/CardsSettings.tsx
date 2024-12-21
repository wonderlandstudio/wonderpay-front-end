import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from 'lucide-react';

const CardsSettings = () => {
  const cards = [
    { type: 'Visa', lastFour: '8690' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Cards</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add card
        </Button>
      </div>
      
      <Card className="max-w-3xl p-6 space-y-6 bg-white/50">
        {cards.map((card, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium">{card.type}</h3>
                <p className="text-sm text-gray-500">••••{card.lastFour}</p>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CardsSettings;