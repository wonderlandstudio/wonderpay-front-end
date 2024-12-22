import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCcw } from "lucide-react";
import type { AccountingIntegration } from '@/types/accounting';

const AccountingSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleQuickBooksConnect = async () => {
    setIsConnecting(true);
    try {
      // This will be implemented when integrating with QuickBooks OAuth
      toast({
        title: "Coming Soon",
        description: "QuickBooks integration will be available soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to QuickBooks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Accounting Integrations</h1>
          <p className="text-gray-500 mt-2">Connect your accounting software for automatic reconciliation.</p>
        </div>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">QuickBooks Online</h2>
              <p className="text-sm text-gray-500">Automatically sync transactions and reconcile accounts.</p>
            </div>
            <Button 
              onClick={handleQuickBooksConnect}
              disabled={isConnecting}
              variant="outline"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect QuickBooks'
              )}
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            Features that will be available:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Automatic transaction syncing</li>
              <li>Bank reconciliation</li>
              <li>Invoice and payment matching</li>
              <li>Financial reporting integration</li>
            </ul>
          </div>
        </div>

        {/* Placeholder for future accounting integrations */}
        <div className="border-t pt-6">
          <p className="text-sm text-gray-500">More accounting integrations coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default AccountingSettings;