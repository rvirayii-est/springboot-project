import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

interface Booking {
  id: string;
  date: Date;
  title: string;
  location: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Sample booking data
const sampleBookings: Booking[] = [
  {
    id: '1',
    date: new Date(2024, 7, 15),
    title: 'Conference Room A',
    location: 'Downtown Office',
    time: '2:00 PM - 4:00 PM',
    status: 'confirmed'
  },
  {
    id: '2',
    date: new Date(2024, 7, 18),
    title: 'Meeting Room B',
    location: 'Tech Hub',
    time: '10:00 AM - 12:00 PM',
    status: 'pending'
  },
  {
    id: '3',
    date: new Date(2024, 7, 22),
    title: 'Executive Suite',
    location: 'Business Center',
    time: '3:00 PM - 5:00 PM',
    status: 'confirmed'
  }
];

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookings] = useState<Booking[]>(sampleBookings);

  const selectedBookings = bookings.filter(booking => 
    selectedDate && isSameDay(booking.date, selectedDate)
  );

  const bookedDates = bookings.map(booking => booking.date);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          Booking Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full pointer-events-auto"
              modifiers={{
                booked: bookedDates,
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '6px'
                }
              }}
            />
            <div className="mt-4 flex gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-primary"></div>
                <span className="text-muted-foreground">Booked</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded border border-border"></div>
                <span className="text-muted-foreground">Available</span>
              </div>
            </div>
          </div>

          {/* Events List Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {selectedDate ? (
                `Events for ${format(selectedDate, 'MMM d')}`
              ) : (
                'Select a date'
              )}
            </h3>
            
            {selectedBookings.length > 0 ? (
              <div className="space-y-3">
                {selectedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-3 border border-border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{booking.title}</h4>
                      <Badge className={getStatusColor(booking.status)} variant="secondary">
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarDays className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  No events for this date
                </p>
                <Button variant="hero" size="sm" className="mt-3">
                  Create Event
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;