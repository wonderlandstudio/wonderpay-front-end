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
          <Button
            variant="outline"
            className="w-full justify-between h-auto py-6 px-4 hover:bg-primary/5"
            onClick={() => console.log("Instant connect selected")}
          >
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-lg">Instant connect</div>
                <p className="text-gray-500 text-sm mt-1">
                  Securely connect to your bank account and get access to everything instantly, including faster payments.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex-shrink-0">
              Recommended
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-between h-auto py-6 px-4 hover:bg-primary/5"
            onClick={() => console.log("Manual verification selected")}
          >
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-lg">Verify with manual deposit</div>
                <p className="text-gray-500 text-sm mt-1">
                  Manually verify your bank account to pay bills and collect invoices. The manual deposit takes up to 2 business days.
                </p>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}