import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  amount: number;
}

export const StatusCard = ({ title, amount }: StatusCardProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </CardContent>
    </Card>
  );
};