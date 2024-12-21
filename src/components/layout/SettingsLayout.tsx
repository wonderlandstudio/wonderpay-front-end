import React from 'react';
import SettingsSidebar from './SettingsSidebar';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;