
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useRole } from './RoleProvider';
import { cn } from '@/lib/utils';

export const Header = ({ 
  onMenuClick,
  title = "Dashboard" 
}: { 
  onMenuClick: () => void;
  title?: string;
}) => {
  const { user, roleConfig } = useRole();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 md:px-6">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h1>
          {user && (
            <p className="text-sm text-gray-500 hidden md:block">
              Welcome back, {user.name.split(' ')[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Search - Desktop only */}
        <button className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Search size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">Search...</span>
        </button>

        {/* Notifications - Desktop only */}
        <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Role Badge */}
        {user && (
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium text-white hidden md:block",
            `bg-gradient-to-r ${roleConfig.color}`
          )}>
            {roleConfig.badge}
          </div>
        )}

        {/* User Avatar - Desktop */}
        {user && (
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
              `bg-gradient-to-br ${roleConfig.color}`
            )}>
              {user.avatar}
            </div>
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};
