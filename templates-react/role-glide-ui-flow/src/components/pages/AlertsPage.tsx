
import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  source?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'System Maintenance Scheduled',
    message: 'A scheduled maintenance is planned for tonight at 2:00 AM EST. The system will be unavailable for approximately 30 minutes.',
    timestamp: '2 hours ago',
    read: false,
    source: 'System'
  },
  {
    id: '2',
    type: 'success',
    title: 'Profile Updated Successfully',
    message: 'Your profile information has been updated successfully.',
    timestamp: '1 day ago',
    read: true,
    source: 'Account'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Team Member Added',
    message: 'Sarah Johnson has been added to your team as a Contributor.',
    timestamp: '2 days ago',
    read: false,
    source: 'Team Management'
  },
  {
    id: '4',
    type: 'error',
    title: 'Login Attempt Failed',
    message: 'Multiple failed login attempts detected from an unknown device. Please verify your account security.',
    timestamp: '3 days ago',
    read: true,
    source: 'Security'
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly Report Available',
    message: 'Your weekly analytics report is ready for review.',
    timestamp: '1 week ago',
    read: true,
    source: 'Analytics'
  }
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <X className="h-5 w-5 text-red-500" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getAlertBadgeColor = (type: Alert['type']) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

export const AlertsPage = () => {
  const unreadCount = mockAlerts.filter(alert => !alert.read).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            Clear All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{mockAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Bell className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAlerts.filter(a => a.type === 'warning').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAlerts.filter(a => a.type === 'success').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Stay up to date with your latest alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {mockAlerts.map((alert, index) => (
              <div key={alert.id}>
                <div className={`p-6 hover:bg-gray-50 transition-colors ${!alert.read ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                        {!alert.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                        {alert.source && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {alert.source}
                          </div>
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getAlertBadgeColor(alert.type)}`}
                        >
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {index < mockAlerts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
