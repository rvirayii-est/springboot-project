
import React, { useState } from 'react';
import { RoleProvider } from '@/components/RoleProvider';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { LeftNavDrawer } from '@/components/LeftNavDrawer';
import { Dashboard } from '@/components/Dashboard';
import { RoleSwitcher } from '@/components/RoleSwitcher';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerItemSelect = (item: string) => {
    setActiveTab(item);
  };

  return (
    <RoleProvider>
      <div className="min-h-screen bg-gray-50 w-full">
        {/* Role Demo Switcher */}
        {/* <RoleSwitcher /> */}
        
        {/* Layout Container */}
        <div className="flex h-screen w-full">
          {/* Left Navigation Drawer */}
          <LeftNavDrawer 
            isOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            onItemSelect={handleDrawerItemSelect}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 md:ml-0">
            {/* Header */}
            <Header onMenuClick={handleMenuClick} />
            
            {/* Main Dashboard Content */}
            <Dashboard activeSection={activeTab} />
          </div>
        </div>
        
        {/* Bottom Navigation - Mobile Only */}
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </RoleProvider>
  );
};

export default Index;
