
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Search, CheckCircle, PlusCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for business location suggestions
const MOCK_LOCATIONS = [
  { id: '1', name: 'Coffee Shop Example', address: '123 Main St, Anytown, CA 94000' },
  { id: '2', name: 'Tech Solutions Inc', address: '456 Innovation Ave, San Francisco, CA 94103' },
  { id: '3', name: 'Gourmet Restaurant', address: '789 Foodie Blvd, Los Angeles, CA 90001' },
  { id: '4', name: 'Fitness Center', address: '101 Workout St, San Diego, CA 92101' },
];

interface BusinessLocation {
  id: string;
  name: string;
  address: string;
}

interface BusinessLocationSearchProps {
  onLocationSelect: (location: BusinessLocation) => void;
  initialBusinessData: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    placeId?: string;
  } | null;
}

const BusinessLocationSearch: React.FC<BusinessLocationSearchProps> = ({ 
  onLocationSelect,
  initialBusinessData 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<BusinessLocation[]>([]);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<BusinessLocation | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize from existing business data if available
  useEffect(() => {
    if (initialBusinessData && initialBusinessData.name) {
      const formattedAddress = initialBusinessData.address 
        ? `${initialBusinessData.address}, ${initialBusinessData.city}, ${initialBusinessData.state} ${initialBusinessData.zip}`
        : '';
      
      setSelectedLocation({
        id: initialBusinessData.placeId || 'manual',
        name: initialBusinessData.name,
        address: formattedAddress
      });
      
      // Pre-fill manual form with existing data
      setManualLocation({
        name: initialBusinessData.name,
        address: initialBusinessData.address || '',
        city: initialBusinessData.city || '',
        state: initialBusinessData.state || '',
        zip: initialBusinessData.zip || ''
      });
    }
  }, [initialBusinessData]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      setIsSearching(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filtered = MOCK_LOCATIONS.filter(
          loc => loc.name.toLowerCase().includes(term.toLowerCase()) || 
                 loc.address.toLowerCase().includes(term.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (location: BusinessLocation) => {
    setSelectedLocation(location);
    setSearchTerm('');
    setSuggestions([]);
    onLocationSelect(location);
    
    toast({
      title: "Business location updated",
      description: "Your business location has been successfully updated."
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!manualLocation.name) {
      toast({
        title: "Business name required",
        description: "Please enter your business name",
        variant: "destructive"
      });
      return;
    }

    const formattedAddress = 
      `${manualLocation.address}, ${manualLocation.city}, ${manualLocation.state} ${manualLocation.zip}`;
    
    const newLocation: BusinessLocation = {
      id: 'manual',
      name: manualLocation.name,
      address: formattedAddress
    };
    
    setSelectedLocation(newLocation);
    setShowManualForm(false);
    onLocationSelect(newLocation);
    
    toast({
      title: "Business location added",
      description: "Your business location has been manually added."
    });
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
    setSearchTerm('');
  };

  return (
    <Card className="overflow-hidden border border-border/40 shadow-sm mb-6">
      <CardHeader className="bg-secondary/20">
        <CardTitle>Business Location</CardTitle>
        <CardDescription>Search or update your business location</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {selectedLocation ? (
          <div className="flex flex-col space-y-4">
            <div className="bg-secondary/10 p-4 rounded-md flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">{selectedLocation.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-destructive"
                onClick={clearSelectedLocation}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-border/60 hover:bg-secondary/20"
              onClick={() => {
                clearSelectedLocation();
                setShowManualForm(false);
              }}
            >
              Change Location
            </Button>
          </div>
        ) : (
          <div className="space-y-4" ref={searchRef}>
            {!showManualForm ? (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for your business..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-muted-foreground"></div>
                    </div>
                  )}
                </div>
                
                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full max-w-md bg-background border border-border/60 rounded-md shadow-lg mt-1">
                    <ul className="py-1">
                      {suggestions.map(location => (
                        <li 
                          key={location.id}
                          className="px-4 py-2 hover:bg-muted cursor-pointer"
                          onClick={() => handleSelectLocation(location)}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <div>
                              <div className="font-medium">{location.name}</div>
                              <div className="text-sm text-muted-foreground">{location.address}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div 
                      className="border-t border-border/60 px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                      onClick={() => setShowManualForm(true)}
                    >
                      <PlusCircle className="h-4 w-4 text-primary" />
                      <span className="text-primary">Add manually</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <Button 
                    variant="link" 
                    className="text-primary"
                    onClick={() => setShowManualForm(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add business manually
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={manualLocation.name}
                    onChange={(e) => setManualLocation({...manualLocation, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={manualLocation.address}
                    onChange={(e) => setManualLocation({...manualLocation, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={manualLocation.city}
                      onChange={(e) => setManualLocation({...manualLocation, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={manualLocation.state}
                      onChange={(e) => setManualLocation({...manualLocation, state: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={manualLocation.zip}
                    onChange={(e) => setManualLocation({...manualLocation, zip: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-4 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowManualForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#ED7D31] hover:bg-[#ED7D31]/90">
                    Save Location
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessLocationSearch;
