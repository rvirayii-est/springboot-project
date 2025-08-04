import React, { useState } from 'react';
import { Truck, MapPin, Clock, User as UserIcon, Search, Filter, Phone } from 'lucide-react';
import { User } from '../../types';

interface DeliveryPageProps {
  user: User;
}

const DeliveryPage: React.FC<DeliveryPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock delivery data
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customer: 'Maria Santos',
      phone: '+63 912 345 6789',
      address: '123 Main St, Quezon City',
      rider: 'Mike Rider',
      riderId: '3',
      status: 'delivered',
      assignedAt: '2024-01-15 08:30',
      deliveredAt: '2024-01-15 10:45',
      items: '2x 5-Gallon, 1x 1-Gallon',
      total: 380
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customer: 'Juan Dela Cruz',
      phone: '+63 917 234 5678',
      address: '456 Oak Ave, Makati City',
      rider: 'Mike Rider',
      riderId: '3',
      status: 'in-transit',
      assignedAt: '2024-01-15 09:15',
      items: '4x 1-Gallon',
      total: 320
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      customer: 'Ana Rodriguez',
      phone: '+63 918 345 6789',
      address: '789 Pine St, Taguig City',
      rider: 'Not Assigned',
      riderId: null,
      status: 'pending',
      assignedAt: '2024-01-15 09:45',
      items: '1x 5-Gallon, 3x 1-Gallon',
      total: 390
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-004',
      customer: 'Carlos Lopez',
      phone: '+63 919 456 7890',
      address: '321 Elm St, Pasig City',
      rider: 'Mike Rider',
      riderId: '3',
      status: 'picked-up',
      assignedAt: '2024-01-15 10:00',
      items: '3x 5-Gallon',
      total: 450
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter deliveries based on user role
  const getFilteredDeliveries = () => {
    let filtered = deliveries;
    
    // If delivery rider, only show their assigned deliveries
    if (user.role === 'delivery') {
      filtered = deliveries.filter(delivery => delivery.riderId === user.id);
    }

    // Apply search and status filters
    filtered = filtered.filter(delivery => {
      const matchesSearch = delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || delivery.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return filtered;
  };

  const filteredDeliveries = getFilteredDeliveries();
  const totalDeliveries = user.role === 'delivery' ? deliveries.filter(d => d.riderId === user.id).length : deliveries.length;
  const activeDeliveries = filteredDeliveries.filter(d => d.status === 'in-transit' || d.status === 'picked-up').length;
  const completedToday = filteredDeliveries.filter(d => d.status === 'delivered').length;

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    // In real app, this would update the database
    console.log(`Updating delivery ${deliveryId} to status: ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {user.role === 'delivery' ? 'My Deliveries' : 'Delivery Management'}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {user.role === 'delivery' 
              ? 'Track your assigned deliveries and update status' 
              : 'Monitor and manage all delivery operations'
            }
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">
                {user.role === 'delivery' ? 'My Deliveries' : 'Total Deliveries'}
              </p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{totalDeliveries}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">Active Deliveries</p>
              <p className="text-lg md:text-2xl font-bold text-orange-600">{activeDeliveries}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 md:mb-2">Completed Today</p>
              <p className="text-lg md:text-2xl font-bold text-green-600">{completedToday}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
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
              placeholder="Search deliveries..."
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="picked-up">Picked Up</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-3 md:space-y-4">
        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Customer Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{delivery.customer}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">Order: {delivery.orderId}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-bold text-gray-900">₱{delivery.total}</p>
                    <p className="text-xs md:text-sm text-gray-600">{delivery.items}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center flex-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{delivery.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{delivery.phone}</span>
                  </div>
                </div>
              </div>

              {/* Rider Info */}
              <div>
                <div className="flex items-center mb-2">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-xs md:text-sm text-gray-600">Rider:</span>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-900">{delivery.rider}</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-xs md:text-sm text-gray-600">Assigned: {delivery.assignedAt}</span>
                </div>
                {delivery.deliveredAt && (
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-xs md:text-sm text-gray-600">Delivered: {delivery.deliveredAt}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 lg:space-y-2">
                {user.role === 'delivery' && delivery.riderId === user.id && (
                  <>
                    {delivery.status === 'assigned' && (
                      <button 
                        onClick={() => handleStatusUpdate(delivery.id, 'picked-up')}
                        className="px-3 md:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-xs md:text-sm"
                      >
                        Mark as Picked Up
                      </button>
                    )}
                    {delivery.status === 'picked-up' && (
                      <button 
                        onClick={() => handleStatusUpdate(delivery.id, 'in-transit')}
                        className="px-3 md:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs md:text-sm"
                      >
                        Start Delivery
                      </button>
                    )}
                    {delivery.status === 'in-transit' && (
                      <button 
                        onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                        className="px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs md:text-sm"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </>
                )}
                
                {(user.role === 'owner' || user.role === 'manager') && (
                  <>
                    <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm">
                      View Details
                    </button>
                    {delivery.status === 'pending' && (
                      <button className="px-3 md:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs md:text-sm">
                        Assign Rider
                      </button>
                    )}
                  </>
                )}
                
                <button className="px-3 md:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs md:text-sm">
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDeliveries.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-100 text-center">
          <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No deliveries found</h3>
          <p className="text-sm md:text-base text-gray-600">
            {user.role === 'delivery' 
              ? "You don't have any deliveries matching the current filters."
              : "No deliveries match your current search and filter criteria."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;