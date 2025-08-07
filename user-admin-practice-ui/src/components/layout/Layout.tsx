import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'User Management',
  '/users/new': 'Create User',
  '/roles': 'Role Management',
  '/roles/new': 'Create Role',
};

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    
    // Check for exact matches first
    if (pageTitles[path]) {
      return pageTitles[path];
    }
    
    // Check for dynamic routes
    if (path.startsWith('/users/edit/')) {
      return 'Edit User';
    }
    if (path.startsWith('/roles/edit/')) {
      return 'Edit Role';
    }
    
    return 'Admin Dashboard';
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};