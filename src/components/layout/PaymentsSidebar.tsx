import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  Wallet,
  Receipt,
  PiggyBank,
  Coins,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const navigation = [
  { 
    name: 'Overview', 
    href: '/dashboard/payments', 
    icon: Wallet,
    description: 'Payment dashboard and analytics'
  },
  { 
    name: 'Bill Pay', 
    href: '/dashboard/bill-pay', 
    icon: ArrowUpRight,
    description: 'Manage and pay bills'
  },
  { 
    name: 'Receivables', 
    href: '/dashboard/receivables', 
    icon: ArrowDownRight,
    description: 'Track and manage receivables'
  },
  { 
    name: 'Cards', 
    href: '/dashboard/settings/cards', 
    icon: CreditCard,
    description: 'Manage payment cards'
  },
  { 
    name: 'Bank Accounts', 
    href: '/dashboard/settings/bank-accounts', 
    icon: PiggyBank,
    description: 'Manage bank accounts'
  },
  { 
    name: 'WonderPay Capital', 
    href: '/dashboard/wonderpay', 
    icon: Coins,
    description: 'Access business financing'
  },
  { 
    name: 'Transaction History', 
    href: '/dashboard/transactions', 
    icon: Receipt,
    description: 'View all transactions'
  },
];

export function PaymentsSidebar() {
  const location = useLocation();
  
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Payments</h2>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}