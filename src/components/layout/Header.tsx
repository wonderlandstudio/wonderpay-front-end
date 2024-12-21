import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">WonderPay</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline">Profile</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;