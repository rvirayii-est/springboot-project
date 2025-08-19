import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  CheckSquare, 
  Megaphone, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Leads', path: '/leads' },
    { icon: Building2, label: 'Properties', path: '/properties' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Megaphone, label: 'Marketing', path: '/marketing' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-blue-900 text-white transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className={`transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="text-xl font-bold text-yellow-400">RealEstate Pro</h1>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-yellow-500 text-blue-900' 
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                <Icon size={20} className={`${collapsed ? 'mx-auto' : 'mr-3'}`} />
                <span className={`transition-all duration-300 ${
                  collapsed ? 'opacity-0 w-0' : 'opacity-100'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;