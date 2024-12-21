import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Receipt, 
  CreditCard, 
  Users, 
  Settings,
  Building2
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bill Pay', href: '/bill-pay', icon: Receipt },
  { name: 'Receivables', href: '/receivables', icon: CreditCard },
  { name: 'Clients & Vendors', href: '/clients', icon: Users },
  { name: 'Organization', href: '/organization', icon: Building2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50/40">
      <div className="flex flex-col gap-2 p-4">
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
      </div>
    </div>
  );
};

export default Sidebar;