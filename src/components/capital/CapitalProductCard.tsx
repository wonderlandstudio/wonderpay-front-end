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
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">•</span>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={() => onApply(product)}
          className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Apply for {title}
        </Button>
      </CardFooter>
    </Card>
  );
};