import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { User } from '../../types';

interface SalesPageProps {
  user: User;
}

const SalesPage: React.FC<SalesPageProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock sales data
  const salesData = {
    today: { total: 12500, orders: 45, avgOrder: 278 },
    week: { total: 87500, orders: 315, avgOrder: 278 },
    month: { total: 350000, orders: 1260, avgOrder: 278 },
  };

  const recentSales = [
    { id: 'TXN-001', customer: 'Maria Santos', items: '2x 5-Gallon, 1x 1-Gallon', amount: 450, time: '10:30 AM', method: 'cash' },
    { id: 'TXN-002', customer: 'Juan Dela Cruz', items: '4x 1-Gallon', amount: 320, time: '10:15 AM', method: 'card' },
    { id: 'TXN-003', customer: 'Ana Rodriguez', items: '1x 5-Gallon, 3x 1-Gallon', amount: 280, time: '9:45 AM', method: 'online' },
    { id: 'TXN-004', customer: 'Carlos Lopez', items: '3x 5-Gallon', amount: 560, time: '9:30 AM', method: 'cash' },
    { id: 'TXN-005', customer: 'Lisa Garcia', items: '2x 5-Gallon, 2x 1-Gallon', amount: 400, time: '9:15 AM', method: 'card' },
  ];

  const topProducts = [
    { name: '5-Gallon Container', sold: '156 units', revenue: '₱234,000', percentage: 67 },
    { name: '1-Gallon Container', sold: '89 units', revenue: '₱89,000', percentage: 25 },
    { name: 'Bottle Refill', sold: '45 units', revenue: '₱27,000', percentage: 8 },
  ];

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'bg-green-100 text-green-800';
      case 'card': return 'bg-blue-100 text-blue-800';
      case 'online': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentData = salesData[selectedPeriod as keyof typeof salesData];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sales Analytics</h1>
          <p className="text-sm md:text-base text-gray-600">Track your revenue and sales performance</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-xs md:text-sm font-medium">+12.5%</span>
            </div>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
          <p className="text-lg md:text-2xl font-bold text-gray-900">₱{currentData.total.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex items-center text-blue-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-xs md:text-sm font-medium">+8.2%</span>
            </div>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-1">Total Orders</h3>
          <p className="text-lg md:text-2xl font-bold text-gray-900">{currentData.orders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex items-center text-purple-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-xs md:text-sm font-medium">+5.1%</span>
            </div>
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-600 mb-1">Average Order</h3>
          <p className="text-lg md:text-2xl font-bold text-gray-900">₱{currentData.avgOrder}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Recent Sales</h2>
          <div className="space-y-3 md:space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm md:text-base font-medium text-gray-900">{sale.customer}</p>
                  <p className="text-xs md:text-sm text-gray-600">{sale.items}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{sale.time}</span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentMethodColor(sale.method)}`}>
                      {sale.method}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base font-bold text-gray-900">₱{sale.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3 md:space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm md:text-base font-medium text-gray-900 flex-1 mr-2">{product.name}</p>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{product.revenue}</p>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">
                  <span>{product.sold}</span>
                  <span>{product.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;