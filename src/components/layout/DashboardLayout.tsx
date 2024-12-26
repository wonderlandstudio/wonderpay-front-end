import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsSidebar from './SettingsSidebar';
import StatusDisplay from '../debug/StatusDisplay';

const DashboardLayout = () => {
  const location = useLocation();
  const isSettingsPage = location.pathname.includes('/dashboard/organization-settings') || 
                        location.pathname.includes('/dashboard/settings');
  const isInvoiceGenerator = location.pathname === '/bill-pay/generate';

  // If we're on the invoice generator page, render without sidebars
  if (isInvoiceGenerator) {
    return (
      <>
        <Outlet />
        <StatusDisplay />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Only render one sidebar based on the current route */}
        {isSettingsPage ? (
          <SettingsSidebar />
        ) : (
          <Sidebar />
        )}
        <main className="flex-1 overflow-y-auto px-6 backdrop-blur-md bg-white/50">
          <Outlet />
        </main>
      </div>
      <StatusDisplay />
    </div>
  );
};

export default DashboardLayout;