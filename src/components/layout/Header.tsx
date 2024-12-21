import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white/30 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/de0f3b54-1605-48f1-b6e4-4f2ddbf2f5db.png" 
            alt="WonderPay Logo" 
            className="h-8 w-auto"
          />
          <h2 className="text-2xl font-bold text-gray-900">WonderPay</h2>
        </div>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;