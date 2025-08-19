import React from 'react';
import { Clock, User, Building2, Phone, Mail } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'lead',
      icon: User,
      title: 'New lead: Maria Rodriguez',
      description: 'Looking for 3BR home in downtown area',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'property',
      icon: Building2,
      title: 'Property listed: 456 Pine Street',
      description: '$350,000 • 2,100 sq ft • 3BR/2BA',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'call',
      icon: Phone,
      title: 'Call completed with John Smith',
      description: 'Discussed pricing for Maple Avenue property',
      time: '6 hours ago',
      priority: 'low'
    },
    {
      id: 4,
      type: 'email',
      icon: Mail,
      title: 'Email sent to prospects',
      description: 'Market update newsletter - 45 recipients',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'lead': return 'text-green-600 bg-green-100';
      case 'property': return 'text-blue-600 bg-blue-100';
      case 'call': return 'text-yellow-600 bg-yellow-100';
      case 'email': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Clock className="mr-3 text-gray-600" size={20} />
          Recent Activity
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${getIconColor(activity.type)}`}>
                <activity.icon size={16} />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;