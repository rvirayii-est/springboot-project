import React, { useState } from 'react';
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, CheckCircle } from 'lucide-react';
import { User } from '../../types';

interface OrdersPageProps {
  user: User;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock orders data
  const orders = [
    { 
      id: 'ORD-001', 
      customer: 'Maria Santos', 
      phone: '+63 912 345 6789',
      address: '123 Main St, Quezon City',
      items: [{ name: '5-Gallon Container', quantity: 2, price: 150 }, { name: '1-Gallon Container', quantity: 1, price: 80 }],
      total: 380,
      status: 'delivered', 
      createdAt: '2024-01-15 08:30',
      deliveredAt: '2024-01-15 10:45'
    },
    { 
      id: 'ORD-002', 
      customer: 'Juan Dela Cruz', 
      phone: '+63 917 234 5678',
      address: '456 Oak Ave, Makati City',
      items: [{ name: '1-Gallon Container', quantity: 4, price: 80 }],
      total: 320,
      status: 'out-for-delivery', 
      createdAt: '2024-01-15 09:15'
    },
    { 
      id: 'ORD-003', 
      customer: 'Ana Rodriguez', 
      phone: '+63 918 345 6789',
      address: '789 Pine St, Taguig City',
      items: [{ name: '5-Gallon Container', quantity: 1, price: 150 }, { name: '1-Gallon Container', quantity: 3, price: 80 }],
      total: 390,
      status: 'preparing', 
      createdAt: '2024-01-15 09:45'
    },
    { 
      id: 'ORD-004', 
      customer: 'Carlos Lopez', 
      phone: '+63 919 456 7890',
      address: '321 Elm St, Pasig City',
      items: [{ name: '5-Gallon Container', quantity: 3, price: 150 }],
      total: 450,
      status: 'confirmed', 
      createdAt: '2024-01-15 10:00'
    },
    { 
      id: 'ORD-005', 
      customer: 'Lisa Garcia', 
      phone: '+63 920 567 8901',
      address: '654 Maple Ave, Mandaluyong City',
      items: [{ name: '5-Gallon Container', quantity: 2, price: 150 }, { name: '1-Gallon Container', quantity: 2, price: 80 }],
      total: 460,
      status: 'pending', 
      createdAt: '2024-01-15 10:30'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'confirmed').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-sm md:text-base text-gray-600">Track and manage customer orders</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
          <Plus className="w-4 h-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">Total Orders</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">Pending Orders</p>
              <p className="text-lg md:text-2xl font-bold text-orange-600">{pendingOrders}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">Total Revenue</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">₱{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-xs md:text-sm text-gray-600">Status:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile Cards View */}
        <div className="md:hidden">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-gray-600">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₱{order.total}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(order.status)}`}>
                    {order.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Items:</p>
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {item.quantity}x {item.name}
                  </p>
                ))}
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500">Date: {order.createdAt}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </button>
                {order.status !== 'delivered' && (
                  <button className="flex-1 px-3 py-2 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Update
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.phone}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₱{order.total}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.createdAt}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    {order.status !== 'delivered' && (
                      <button className="text-purple-600 hover:text-purple-900 p-1">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;