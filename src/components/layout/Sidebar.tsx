import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Home,
  Receipt, 
  CreditCard,
  Wallet,
  Users, 
  Settings
} from "lucide-react";

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Bill Pay', href: '/bill-pay', icon: Receipt },
  { name: 'Receivables', href: '/receivables', icon: CreditCard },
  { name: 'WonderPay Capital', href: '/capital', icon: Wallet },
  { name: 'Clients & Vendors', href: '/clients', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span className="font-medium">Wonderland Studio</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  isActive && "bg-gray-100 text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;