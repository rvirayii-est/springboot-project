
import React from 'react';
import { useRole, UserRole } from './RoleProvider';
import { Shield, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: 'guest', label: 'Guest', description: 'View-only access' },
  { value: 'contributor', label: 'Contributor', description: 'Create and edit content' },
  { value: 'manager', label: 'Manager', description: 'Team and analytics access' },
  { value: 'admin', label: 'Admin', description: 'Full system access' }
];

export const RoleSwitcher = () => {
  const { user, setUser, roleConfig } = useRole();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-lg text-white shadow-lg transition-all duration-200",
            `bg-gradient-to-r ${roleConfig.color}`,
            "hover:shadow-xl active:scale-95"
          )}
        >
          <Shield size={16} />
          <span className="text-sm font-medium">Demo: {roleConfig.badge}</span>
          <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Switch Demo Role
              </p>
            </div>
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => handleRoleChange(role.value)}
                className={cn(
                  "w-full text-left px-3 py-3 hover:bg-gray-50 transition-colors",
                  user?.role === role.value && "bg-blue-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{role.label}</p>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  {user?.role === role.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
