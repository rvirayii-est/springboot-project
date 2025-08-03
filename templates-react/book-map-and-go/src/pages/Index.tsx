import BookingHeader from '@/components/BookingHeader';
import BookingCalendar from '@/components/BookingCalendar';
import LocationMap from '@/components/LocationMap';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <BookingHeader />
        
        <div className="space-y-8">
          <BookingCalendar />
          <LocationMap />
        </div>
      </div>
    </div>
  );
};

export default Index;
