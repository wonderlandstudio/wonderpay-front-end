import React, { createContext, useContext, useState } from 'react';

interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Settings {
  businessName: string;
  displayName: string;
  website: string;
  description: string;
  brandColor: string;
  logo?: string;
  address?: Address;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  saveSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  businessName: 'Wonderland Studio Los Angeles LLC',
  displayName: 'Wonderland Studio',
  website: 'http://www.thewonderlandstudio.co',
  description: '',
  brandColor: '#9b87f5',
  address: {
    street: '',
    unit: '',
    city: '',
    state: 'CA',
    zipCode: '',
    country: 'US'
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const saveSettings = async () => {
    // Here you would typically make an API call to save the settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved:', settings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}