import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CapitalProduct } from "@/types/capital";

interface CapitalProductCardProps {
  title: string;
  description: string;
  features: string[];
  product: CapitalProduct;
  onApply: (product: CapitalProduct) => void;
}

export const CapitalProductCard = ({
  title,
  description,
  features,
  product,
  onApply,
}: CapitalProductCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onApply(product)}
          className="w-full"
        >
          Apply for {title}
        </Button>
      </CardFooter>
    </Card>
  );
};