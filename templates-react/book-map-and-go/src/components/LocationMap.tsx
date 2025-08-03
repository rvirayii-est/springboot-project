import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  available: boolean;
  capacity: number;
  amenities: string[];
}

// Sample locations data
const sampleLocations: Location[] = [
  {
    id: '1',
    name: 'Downtown Office',
    address: '123 Business St, Downtown',
    coordinates: [-74.006, 40.7128], // NYC coordinates
    available: true,
    capacity: 20,
    amenities: ['WiFi', 'Projector', 'Whiteboard']
  },
  {
    id: '2',
    name: 'Tech Hub',
    address: '456 Innovation Ave, Tech District',
    coordinates: [-74.012, 40.7180],
    available: true,
    capacity: 15,
    amenities: ['WiFi', 'Smart TV', 'Coffee']
  },
  {
    id: '3',
    name: 'Business Center',
    address: '789 Corporate Blvd, Financial District',
    coordinates: [-74.015, 40.7090],
    available: false,
    capacity: 30,
    amenities: ['WiFi', 'Conference Phone', 'Catering']
  }
];

const LocationMap = () => {
  const [locations] = useState<Location[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Create OpenStreetMap iframe URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-74.025,40.700,-73.990,40.730&layer=mapnik&marker=40.7128,-74.006`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Section */}
      <Card className="lg:col-span-2 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Available Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="w-full h-[400px] rounded-lg shadow-sm overflow-hidden border">
              <iframe
                src={mapUrl}
                className="w-full h-full border-0"
                title="Location Map"
                allowFullScreen
              />
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location List Below Map */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-lg">Locations</h3>
            {locations.map((location) => (
              <div
                key={location.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedLocation?.id === location.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{location.name}</h4>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  <Badge
                    className={location.available ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}
                  >
                    {location.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Details Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Location Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedLocation ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedLocation.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{selectedLocation.address}</p>
                <Badge className={selectedLocation.available ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                  {selectedLocation.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Capacity: {selectedLocation.capacity} people</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedLocation.available && (
                <Button variant="hero" className="w-full mt-4">
                  Book This Location
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a location to see details
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationMap;