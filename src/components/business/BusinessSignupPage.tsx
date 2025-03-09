
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

type SignupStep = 'userInfo' | 'businessLocation' | 'manualEntry';
type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
};

const BusinessSignupPage = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>('userInfo');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('businessLocation');
  };

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    // In a real app, you'd parse the Google Place data here
    // For this demo, we'll just use the description
    if (place && place.value) {
      setBusinessData({
        ...businessData,
        name: place.value.description || '',
        placeId: place.value.place_id || '',
      });
    }
  };

  const handleManualEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessData.name || !businessData.address || !businessData.city || !businessData.state || !businessData.zip) {
      toast({
        title: "Missing business information",
        description: "Please fill out all business details",
        variant: "destructive",
      });
      return;
    }
    
    // Store data and navigate to dashboard
    localStorage.setItem('userInfo', JSON.stringify({ firstName, lastName, email }));
    localStorage.setItem('businessData', JSON.stringify(businessData));
    
    toast({
      title: "Sign up successful!",
      description: "Welcome to SmartChat AI",
    });
    
    navigate('/dashboard/business');
  };

  const handleGooglePlaceSubmit = () => {
    if (!selectedPlace) {
      toast({
        title: "No business selected",
        description: "Please select a business from the dropdown",
        variant: "destructive",
      });
      return;
    }
    
    // Store data and navigate to dashboard
    localStorage.setItem('userInfo', JSON.stringify({ firstName, lastName, email }));
    localStorage.setItem('businessData', JSON.stringify(businessData));
    
    toast({
      title: "Sign up successful!",
      description: "Welcome to SmartChat AI",
    });
    
    navigate('/dashboard/business');
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {currentStep === 'userInfo' ? 'Create Your Account' : 
             currentStep === 'businessLocation' ? 'Find Your Business' : 
             'Add Business Details'}
          </CardTitle>
          <CardDescription className="text-center">
            {currentStep === 'userInfo' ? 'Please provide your personal information' : 
             currentStep === 'businessLocation' ? 'Search for your business or add manually' : 
             'Enter your business details'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {currentStep === 'userInfo' && (
            <form onSubmit={handleUserInfoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="Enter your first name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Enter your last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Continue</Button>
            </form>
          )}
          
          {currentStep === 'businessLocation' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessSearch">Search for your business</Label>
                <div className="google-places-container">
                  <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY || ''}
                    selectProps={{
                      value: selectedPlace,
                      onChange: handlePlaceSelect,
                      placeholder: 'Enter business name or address',
                      isClearable: true,
                    }}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleGooglePlaceSubmit} 
                  className="w-full mb-2"
                  disabled={!selectedPlace}
                >
                  Continue with Selected Business
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentStep('manualEntry')}
                >
                  Add Business Manually
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setCurrentStep('userInfo')}
              >
                Back
              </Button>
            </div>
          )}
          
          {currentStep === 'manualEntry' && (
            <form onSubmit={handleManualEntrySubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input 
                  id="businessName" 
                  placeholder="Enter business name" 
                  value={businessData.name}
                  onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  placeholder="Enter street address" 
                  value={businessData.address}
                  onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="City" 
                    value={businessData.city}
                    onChange={(e) => setBusinessData({...businessData, city: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    placeholder="State" 
                    value={businessData.state}
                    onChange={(e) => setBusinessData({...businessData, state: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input 
                  id="zip" 
                  placeholder="ZIP / Postal Code" 
                  value={businessData.zip}
                  onChange={(e) => setBusinessData({...businessData, zip: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Complete Sign Up</Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setCurrentStep('businessLocation')}
              >
                Back
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessSignupPage;
