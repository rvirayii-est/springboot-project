import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OverviewPage from './pages/OverviewPage';
import SalesPage from './pages/SalesPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import DeliveryPage from './pages/DeliveryPage';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage user={user} />;
      case 'sales':
        return <SalesPage user={user} />;
      case 'inventory':
        return <InventoryPage user={user} />;
      case 'orders':
        return <OrdersPage user={user} />;
      case 'delivery':
        return <DeliveryPage user={user} />;
      default:
        return <OverviewPage user={user} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar 
        user={user}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="flex-1 overflow-auto md:ml-0">
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;