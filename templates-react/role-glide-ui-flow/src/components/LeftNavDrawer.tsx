
import React from 'react';
import { X, Settings, BarChart3, Users, Shield, Database, Palette, HelpCircle, User, Bell } from 'lucide-react';
import { useRole } from './RoleProvider';
import { cn } from '@/lib/utils';

interface DrawerItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  requiredRole?: 'guest' | 'contributor' | 'manager' | 'admin';
  category: string;
}

const drawerItems: DrawerItem[] = [
  // Profile & Notifications
  { id: 'profile', icon: User, label: 'Profile', description: 'Your account info', category: 'Account' },
  { id: 'alerts', icon: Bell, label: 'Alerts', description: 'Notifications', category: 'Account' },
  
  // Analytics & Insights
  { id: 'analytics', icon: BarChart3, label: 'Analytics', description: 'Performance insights', requiredRole: 'manager', category: 'Insights' },
  { id: 'reports', icon: Database, label: 'Reports', description: 'Data exports', requiredRole: 'manager', category: 'Insights' },
  
  // Team Management
  { id: 'team', icon: Users, label: 'Team Management', description: 'Manage members', requiredRole: 'manager', category: 'Management' },
  { id: 'permissions', icon: Shield, label: 'Permissions', description: 'Access control', requiredRole: 'admin', category: 'Management' },
  
  // System
  { id: 'settings', icon: Settings, label: 'Settings', description: 'App preferences', category: 'System' },
  { id: 'themes', icon: Palette, label: 'Appearance', description: 'Customize look', category: 'System' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', description: 'Get assistance', category: 'System' }
];

export const LeftNavDrawer = ({ 
  isOpen, 
  onClose,
  onItemSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onItemSelect: (item: string) => void;
}) => {
  const { hasPermission, roleConfig, user } = useRole();

  const visibleItems = drawerItems.filter(item => 
    !item.requiredRole || hasPermission(item.requiredRole)
  );

  const groupedItems = visibleItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DrawerItem[]>);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out",
        "md:w-72 md:static md:shadow-none md:border-r md:border-gray-200",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className={cn(
          "bg-gradient-to-r p-6 text-white relative overflow-hidden",
          roleConfig.color
        )}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Advanced Tools</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors md:hidden"
              >
                <X size={20} />
              </button>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm opacity-90">{roleConfig.badge}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 mb-3">
                {category}
              </h3>
              <div className="space-y-1 px-3">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemSelect(item.id);
                        onClose();
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                      <Icon 
                        size={20} 
                        className="text-gray-500 group-hover:text-gray-700 transition-colors" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 group-hover:text-gray-700">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            Role-based access • {visibleItems.length} tools available
          </p>
        </div>
      </div>
    </>
  );
};
