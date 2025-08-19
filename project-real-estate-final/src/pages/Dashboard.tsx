import React from 'react';
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Target
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Leads',
      value: '127',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Properties Listed',
      value: '43',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: '$125,400',
      change: '+23%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Conversion Rate',
      value: '18.5%',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const todayTasks = [
    { id: 1, title: 'Follow up with Sarah Johnson', type: 'call', time: '10:00 AM', priority: 'high' },
    { id: 2, title: 'Property showing - 123 Oak Street', type: 'meeting', time: '2:00 PM', priority: 'medium' },
    { id: 3, title: 'Send listing photos to client', type: 'email', time: '4:00 PM', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="mr-3 text-blue-600" size={20} />
                Today's Schedule
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full mr-4 ${
                      task.type === 'call' ? 'bg-green-100' : 
                      task.type === 'meeting' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {task.type === 'call' ? <Phone size={16} className="text-green-600" /> :
                       task.type === 'meeting' ? <Users size={16} className="text-blue-600" /> :
                       <Mail size={16} className="text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;