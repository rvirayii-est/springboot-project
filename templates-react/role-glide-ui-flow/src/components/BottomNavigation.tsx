
import React from 'react';
import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { useRole } from './RoleProvider';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  requiredRole?: 'guest' | 'contributor' | 'manager' | 'admin';
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'create', icon: Plus, label: 'Create', requiredRole: 'contributor' },
  { id: 'notifications', icon: Bell, label: 'Alerts', badge: 3 },
  { id: 'profile', icon: User, label: 'Profile' }
];

export const BottomNavigation = ({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
}) => {
  const { hasPermission, roleConfig } = useRole();

  const visibleItems = navItems.filter(item => 
    !item.requiredRole || hasPermission(item.requiredRole)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-1 py-1 z-40 md:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 relative min-w-[56px]",
                "active:scale-95 touch-manipulation",
                isActive 
                  ? `bg-gradient-to-b ${roleConfig.color} text-white shadow-lg` 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <div className="relative">
                <Icon 
                  size={20} 
                  className={cn(
                    "transition-transform duration-200",
                    isActive && "scale-110"
                  )} 
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-xs font-medium mt-1 transition-colors duration-200",
                isActive ? "text-white" : "text-gray-500"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
