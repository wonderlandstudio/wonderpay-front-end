import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Zap, Clock } from "lucide-react";

export function VerifyBankAccountDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            Verify your bank account
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Verify your bank account to pay bills and collect invoices. Opt for Instant connect to unlock the full experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <button
            className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors relative group"
            onClick={() => console.log("Instant connect selected")}
          >
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-lg">Instant connect</div>
                <p className="text-gray-500 text-sm mt-1 pr-24">
                  Securely connect to your bank account and get access to everything instantly, including faster payments.
                </p>
              </div>
            </div>
            <div className="absolute right-4 top-4 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
              Recommended
            </div>
          </button>

          <button
            className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors"
            onClick={() => console.log("Manual verification selected")}
          >
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-lg">Verify with manual deposit</div>
                <p className="text-gray-500 text-sm mt-1">
                  Manually verify your bank account to pay bills and collect invoices. The manual deposit takes up to 2 business days.
                </p>
              </div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}