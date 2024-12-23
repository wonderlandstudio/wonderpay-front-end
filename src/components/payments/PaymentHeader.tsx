import React from 'react';

interface PaymentHeaderProps {
  title: string;
}

export function PaymentHeader({ title }: PaymentHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-normal">{title}</h2>
    </div>
  );
}