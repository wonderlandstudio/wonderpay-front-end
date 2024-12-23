interface TransactionVendorProps {
  vendorName: string;
  invoiceNumber: string;
}

export function TransactionVendor({ vendorName, invoiceNumber }: TransactionVendorProps) {
  return (
    <div className="flex items-center gap-4">
      <input 
        type="checkbox" 
        className="rounded border-gray-300"
        onClick={(e) => e.stopPropagation()} 
      />
      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="text-orange-600 text-sm">
          {vendorName.charAt(0)}
        </span>
      </div>
      <div>
        <p className="font-medium">{vendorName}</p>
        <p className="text-sm text-gray-500">{invoiceNumber}</p>
      </div>
    </div>
  );
}