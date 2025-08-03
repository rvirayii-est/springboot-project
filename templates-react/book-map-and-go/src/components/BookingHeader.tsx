import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Plus, Bell, Settings } from 'lucide-react';

const BookingHeader = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero rounded-2xl p-8 text-white shadow-elevated">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-float">
            Smart Booking System
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl">
            Manage your bookings and discover available locations with ease
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" className="shadow-sm">
              <Plus className="h-5 w-5 mr-2" />
              New Booking
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-secondary">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-2xl">12</h3>
              <p className="text-muted-foreground">Active Bookings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-secondary">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-xl">
              <MapPin className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-2xl">8</h3>
              <p className="text-muted-foreground">Available Locations</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-secondary">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-xl">
              <Settings className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-2xl">3</h3>
              <p className="text-muted-foreground">Pending Approvals</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingHeader;