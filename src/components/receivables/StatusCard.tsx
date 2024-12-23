import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

interface StatusCardProps {
  title: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid';
}

export const StatusCard = ({ title, amount, status }: StatusCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'draft':
        return <Circle className="h-4 w-4 stroke-[3]" />;
      case 'sent':
        return <Circle className="h-4 w-4" />;
      case 'paid':
        return <Circle className="h-4 w-4 fill-current" />;
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {getStatusIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </CardContent>
    </Card>
  );
};