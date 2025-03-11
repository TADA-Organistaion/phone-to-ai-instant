
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// Steps in the sign-up flow
type SignupStep = 'email' | 'otp' | 'business' | 'manualEntry';

// Business data structure
type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
};

// User data structure
type UserData = {
  email: string;
  firstName: string;
  lastName: string;
};

const SignUpFlow = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>('email');
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [otp, setOtp] = useState("");
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Test OTP value - for demo purposes only
  const TEST_OTP = "1111";

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData.email || !userData.email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!termsAgreed) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('otp');
      
      // For demo purposes only
      console.log(`Demo OTP: ${TEST_OTP}`);
      
      toast({
        title: "OTP Sent",
        description: "Check your email for the one-time password. For testing, use: 1111",
      });
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (otp === TEST_OTP) { // Test validation
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        setCurrentStep('business');
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
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
    if (!businessData.name) {
      toast({
        title: "Business name required",
        description: "Please enter your business name",
        variant: "destructive",
      });
      return;
    }
    
    // Store data and navigate to dashboard
    localStorage.setItem('userInfo', JSON.stringify(userData));
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
    localStorage.setItem('userInfo', JSON.stringify(userData));
    localStorage.setItem('businessData', JSON.stringify(businessData));
    
    toast({
      title: "Sign up successful!",
      description: "Welcome to SmartChat AI",
    });
    
    navigate('/dashboard/business');
  };

  return (
    <div className="space-y-6">
      {currentStep === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
              autoFocus
              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name (Optional)</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name (Optional)</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
              />
            </div>
          </div>
          
          <div className="flex items-start space-x-2 py-2">
            <Checkbox 
              id="terms" 
              checked={termsAgreed}
              onCheckedChange={() => setTermsAgreed(!termsAgreed)}
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-muted-foreground leading-tight cursor-pointer"
            >
              I agree to the <a href="#" className="text-[#ED7D31] hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-[#ED7D31] hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </Button>
        </form>
      )}

      {currentStep === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4 text-center">
            We've sent a one-time password to <span className="font-medium text-foreground">{userData.email}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter your OTP (hint: 1111)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoFocus
              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </Button>
          
          <div className="text-center text-sm mt-4">
            <Button 
              variant="link" 
              className="p-0 text-[#ED7D31]" 
              onClick={() => setCurrentStep('email')}
              type="button"
            >
              Edit email address
            </Button>
          </div>
        </form>
      )}

      {currentStep === 'business' && (
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
                  className: "places-autocomplete",
                  classNamePrefix: "places-autocomplete",
                }}
              />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleGooglePlaceSubmit} 
              className="w-full mb-2 bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300"
              disabled={!selectedPlace}
            >
              Continue with Selected Business
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-[#ED7D31]/30 text-[#ED7D31] hover:bg-[#ED7D31]/10 hover:text-[#ED7D31] hover:border-[#ED7D31] transition-colors duration-300"
              onClick={() => setCurrentStep('manualEntry')}
            >
              Add Business Manually
            </Button>
          </div>
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
              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
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
              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
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
                className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
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
                className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
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
              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300"
          >
            Complete Sign Up
          </Button>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => setCurrentStep('business')}
          >
            Back
          </Button>
        </form>
      )}

      <style>
        {`
        /* Custom styling for Google Places Autocomplete */
        .places-autocomplete__control {
          border-color: var(--border);
          border-radius: 0.375rem;
          min-height: 2.5rem;
          background-color: var(--background);
        }
        .places-autocomplete__control:hover {
          border-color: var(--border);
        }
        .places-autocomplete__control--is-focused {
          border-color: #ED7D31 !important;
          box-shadow: 0 0 0 1px rgba(237, 125, 49, 0.2) !important;
        }
        .places-autocomplete__menu {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          z-index: 10;
        }
        .places-autocomplete__option {
          color: var(--foreground);
        }
        .places-autocomplete__option--is-focused {
          background-color: rgba(237, 125, 49, 0.1);
        }
        .places-autocomplete__option--is-selected {
          background-color: #ED7D31;
          color: white;
        }
        .places-autocomplete__input {
          color: var(--foreground);
        }
        .places-autocomplete__placeholder {
          color: var(--muted-foreground);
        }
        .dark .places-autocomplete__menu {
          background-color: hsl(224 71% 4%);
          border-color: hsl(215 28% 17%);
        }
        .dark .places-autocomplete__option {
          color: white;
        }
        .dark .places-autocomplete__control {
          background-color: hsl(224 71% 4%);
          border-color: hsl(215 28% 17%);
        }
        .dark .places-autocomplete__input {
          color: white;
        }
        .dark .places-autocomplete__placeholder {
          color: hsl(215 16% 47%);
        }
        `}
      </style>
    </div>
  );
};

export default SignUpFlow;
