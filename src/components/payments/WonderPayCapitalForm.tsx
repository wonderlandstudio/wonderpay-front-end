import { Button } from "@/components/ui/button";

export function WonderPayCapitalForm() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50/80 p-4 rounded-lg">
        <h3 className="text-lg mb-4">Please reach out below to learn more about WonderPay Capital.</h3>
        <p className="text-gray-600 mb-4">WonderPay offers supply chain financing based on a number of factors, including:</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Payments to date on WonderPay
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Length of bank account history
          </li>
          <li className="flex items-center gap-2 text-gray-600">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Financial activity
          </li>
        </ul>
      </div>

      <Button 
        variant="outline"
        className="w-full"
        onClick={() => {
          console.log('Starting WonderPay Capital application');
        }}
      >
        Apply for WonderPay Capital
      </Button>
    </div>
  );
}