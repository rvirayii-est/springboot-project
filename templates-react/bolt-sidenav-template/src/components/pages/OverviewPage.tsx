import React from 'react';
import { BarChart3, Package, ShoppingCart, Truck, TrendingUp, AlertTriangle } from 'lucide-react';
import { User } from '../../types';

interface OverviewPageProps {
  user: User;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ user }) => {
  // Mock data - in real app, this would come from API
  const stats = {
    todaySales: 12500,
    totalOrders: 45,
    pendingDeliveries: 8,
    lowStock: 3,
    monthlyRevenue: 350000,
    growthRate: 12.5
  };

  const recentOrders = [
    { id: 'ORD-001', customer: 'Maria Santos', amount: 450, status: 'delivered', time: '2 hours ago' },
    { id: 'ORD-002', customer: 'Juan Dela Cruz', amount: 320, status: 'out-for-delivery', time: '3 hours ago' },
    { id: 'ORD-003', customer: 'Ana Rodriguez', amount: 280, status: 'preparing', time: '4 hours ago' },
    { id: 'ORD-004', customer: 'Carlos Lopez', amount: 560, status: 'confirmed', time: '5 hours ago' },
  ];

  const lowStockItems = [
    { name: '5-Gallon Container', current: 15, minimum: 50 },
    { name: '1-Gallon Container', current: 8, minimum: 30 },
    { name: 'Bottle Caps', current: 25, minimum: 100 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">{title}</p>
          <p className="text-lg md:text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-xs md:text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out-for-delivery': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-sm md:text-base text-gray-600">Here's what's happening with your water refilling station today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Today's Sales"
          value={`₱${stats.todaySales.toLocaleString()}`}
          icon={BarChart3}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          change={15.2}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={Truck}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStock}
          icon={AlertTriangle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3 md:space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm md:text-base font-medium text-gray-900">{order.customer}</p>
                  <p className="text-xs md:text-sm text-gray-600">{order.id} • {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base font-medium text-gray-900">₱{order.amount}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(order.status)}`}>
                    {order.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-base md:text-lg font-bold text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-3 md:p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm md:text-base font-medium text-gray-900 flex-1 mr-2">{item.name}</p>
                  <span className="text-xs md:text-sm font-medium text-red-600">
                    {item.current}/{item.minimum}
                  </span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(item.current / item.minimum) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs md:text-sm text-red-600 mt-1">
                  Need {item.minimum - item.current} more units
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;