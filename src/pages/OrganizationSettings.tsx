import React from 'react';
import { Card } from "@/components/ui/card";
import SettingsLayout from '@/components/layout/SettingsLayout';

const OrganizationSettings = () => {
  return (
    <SettingsLayout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">General</h1>
        
        <Card className="max-w-3xl p-6 space-y-8 border-gray-200/50 backdrop-blur-lg bg-white/50">
          <div className="space-y-4">
            <h2 className="text-lg text-gray-600">Company logo</h2>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-medium text-gray-500">W</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Business name</h2>
            <input 
              type="text" 
              value="Wonderland Studio Los Angeles LLC" 
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Display name</h2>
            <input 
              type="text" 
              value="Wonderland Studio" 
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
              readOnly
            />
            <p className="text-sm text-gray-500">How your organization name will be displayed within Tola.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Website</h2>
            <input 
              type="text" 
              value="http://www.thewonderlandstudio.co" 
              className="w-full p-3 rounded-lg border border-gray-200 bg-white"
              readOnly
            />
            <p className="text-sm text-gray-500">Your company's website.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Description</h2>
            <textarea 
              className="w-full p-3 rounded-lg border border-gray-200 bg-white h-32"
              placeholder="A brief description of what your company does."
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Brand color</h2>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0072F9] rounded" />
              <span className="font-mono text-gray-600">#0072F9</span>
            </div>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default OrganizationSettings;