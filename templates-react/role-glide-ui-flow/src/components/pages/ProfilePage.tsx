
import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Shield, Award } from 'lucide-react';
import { useRole } from '../RoleProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const ProfilePage = () => {
  const { user, roleConfig } = useRole();

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">No Profile Found</h2>
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.avatar}
            </div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex justify-center mb-4">
              <Badge 
                className={`${roleConfig.color.replace('bg-gradient-to-r', 'bg-gradient-to-r')} text-white border-0`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {roleConfig.badge}
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined March 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <p className="mt-1 text-gray-900">+1 (555) 123-4567</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-gray-900">San Francisco, CA</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Role & Permissions</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Current Role</p>
                  <p className="text-sm text-gray-600">{roleConfig.badge}</p>
                </div>
                <Badge 
                  className={`${roleConfig.color.replace('bg-gradient-to-r', 'bg-gradient-to-r')} text-white border-0`}
                >
                  <Award className="h-3 w-3 mr-1" />
                  {roleConfig.badge}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Account Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Created</span>
                  <span className="text-sm font-medium">March 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profile Updated</span>
                  <span className="text-sm font-medium">1 week ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
