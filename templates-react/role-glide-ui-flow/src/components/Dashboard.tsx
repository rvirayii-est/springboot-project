import React from 'react';
import { ProfilePage } from './pages/ProfilePage';
import { AlertsPage } from './pages/AlertsPage';
import { DashboardContent } from './DashboardContent';

const Dashboard = ({ activeSection }: { activeSection: string }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfilePage />;
      case 'alerts':
        return <AlertsPage />;
      case 'home':
        return <DashboardContent />;
      case 'analytics':
        return <div>Analytics Content</div>;
      case 'reports':
        return <div>Reports Content</div>;
      case 'team':
        return <div>Team Management Content</div>;
      case 'permissions':
        return <div>Permissions Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      case 'themes':
        return <div>Themes Content</div>;
      case 'help':
        return <div>Help & Support Content</div>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      {renderContent()}
    </main>
  );
};

export { Dashboard };
