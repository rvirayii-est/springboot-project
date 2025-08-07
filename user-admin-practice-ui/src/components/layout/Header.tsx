import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-700 px-4 py-3 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-gray-100">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">{currentUser?.username}</span>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};