
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'guest' | 'contributor' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface RoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (requiredRole: UserRole) => boolean;
  roleConfig: RoleConfig;
}

interface RoleConfig {
  color: string;
  badge: string;
  permissions: string[];
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  guest: {
    color: 'from-gray-500 to-gray-600',
    badge: 'Guest',
    permissions: ['view_content']
  },
  contributor: {
    color: 'from-blue-500 to-blue-600',
    badge: 'Contributor',
    permissions: ['view_content', 'create_content', 'edit_own_content']
  },
  manager: {
    color: 'from-purple-500 to-purple-600',
    badge: 'Manager',
    permissions: ['view_content', 'create_content', 'edit_content', 'manage_team', 'view_analytics']
  },
  admin: {
    color: 'from-red-500 to-red-600',
    badge: 'Admin',
    permissions: ['view_content', 'create_content', 'edit_content', 'manage_team', 'view_analytics', 'system_settings', 'user_management']
  }
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'manager',
    avatar: 'SC'
  });

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return requiredRole === 'guest';
    
    const roleHierarchy: Record<UserRole, number> = {
      guest: 0,
      contributor: 1,
      manager: 2,
      admin: 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const roleConfig = user ? roleConfigs[user.role] : roleConfigs.guest;

  return (
    <RoleContext.Provider value={{ user, setUser, hasPermission, roleConfig }}>
      {children}
    </RoleContext.Provider>
  );
};
