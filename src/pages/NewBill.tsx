import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";

const NewBill = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left side - OCR Scanner */}
      <div className="flex-1 p-6 border-r">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/bill-pay')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Pay
        </Button>
        
        <div className="h-[calc(100%-4rem)] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto border-4 border-dashed rounded-full flex items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-gray-600">Click or drag to scan</p>
          </div>
        </div>
      </div>

      {/* Right side - Bill Details */}
      <div className="w-96 p-6 bg-gray-50">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Untitled</h2>
            <div className="text-3xl font-bold">$0.00</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Contact</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="No contact selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No contact selected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Attachment</label>
              <div className="flex items-center justify-between p-2 border rounded-md bg-white">
                <span className="text-gray-500">No attachment</span>
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Bill #</label>
              <Input placeholder="0005" />
            </div>

            <div>
              <label className="text-sm text-gray-500">Amount</label>
              <Input placeholder="$ 0.00" />
            </div>

            <div>
              <label className="text-sm text-gray-500">Issue date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="text-sm text-gray-500">Due date</label>
              <Input placeholder="None" />
            </div>

            <div>
              <label className="text-sm text-gray-500">Accounting</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Uncategorized" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Note</label>
              <Input placeholder="None" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBill;