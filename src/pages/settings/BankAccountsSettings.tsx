import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2 } from "lucide-react";

const BankAccountsSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Bank account settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save bank account settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Bank Accounts</h1>
          <p className="text-gray-500 mt-2">Manage your connected bank accounts.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add account
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </div>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        <div className="text-sm text-gray-500">No bank accounts added yet.</div>
      </Card>
    </div>
  );
};

export default BankAccountsSettings;