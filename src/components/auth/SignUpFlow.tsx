
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SignupStep, BusinessData, UserData } from "./utils/types";
import DebugPanel from "./DebugPanel";
import EmailStep from "./steps/EmailStep";
import OtpStep from "./steps/OtpStep";
import BusinessSearchStep from "./steps/BusinessSearchStep";
import ManualEntryStep from "./steps/ManualEntryStep";

// Define a styled component for Google Places autocomplete
const GooglePlacesStyles = () => (
  <style>
    {`
    .pac-container {
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .pac-item {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    .pac-item:hover {
      background-color: #f7fafc;
    }
    .pac-icon {
      margin-top: 0.25rem;
    }
    .pac-item-query {
      font-size: 0.875rem;
    }
    `}
  </style>
);

const SignUpFlow = () => {
  // State declarations
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

  // For debugging
  console.log("Current step:", currentStep);

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
        // Store data for future use
        localStorage.setItem('userInfo', JSON.stringify(userData));
        
        // Default minimal business data
        const defaultBusiness = {
          name: 'My Business',
          address: '',
          city: '',
          state: '',
          zip: '',
        };
        
        localStorage.setItem('businessData', JSON.stringify(defaultBusiness));
        
        toast({
          title: "Sign up successful!",
          description: "Welcome to SmartChat AI",
        });
        
        // Navigate directly to the dashboard instead of setting next step
        console.log("OTP verified, navigating to dashboard");
        navigate('/dashboard/business');
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

  const goBackToEmail = () => setCurrentStep('email');
  const switchToManualEntry = () => setCurrentStep('manualEntry');
  const goBackToBusinessSearch = () => setCurrentStep('business');

  // Render different steps based on currentStep state
  return (
    <div className="space-y-6">
      <DebugPanel 
        currentStep={currentStep}
        userData={userData}
        otp={otp}
      />

      {currentStep === 'email' && (
        <EmailStep 
          userData={userData}
          setUserData={setUserData}
          termsAgreed={termsAgreed}
          setTermsAgreed={setTermsAgreed}
          handleEmailSubmit={handleEmailSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {currentStep === 'otp' && (
        <OtpStep 
          email={userData.email}
          otp={otp}
          setOtp={setOtp}
          handleVerifyOtp={handleVerifyOtp}
          isSubmitting={isSubmitting}
          goBackToEmail={goBackToEmail}
        />
      )}

      {currentStep === 'business' && (
        <BusinessSearchStep 
          selectedPlace={selectedPlace}
          handlePlaceSelect={handlePlaceSelect}
          handleGooglePlaceSubmit={handleGooglePlaceSubmit}
          switchToManualEntry={switchToManualEntry}
        />
      )}
      
      {currentStep === 'manualEntry' && (
        <ManualEntryStep 
          businessData={businessData}
          setBusinessData={setBusinessData}
          handleManualEntrySubmit={handleManualEntrySubmit}
          goBackToBusinessSearch={goBackToBusinessSearch}
        />
      )}

      <GooglePlacesStyles />
    </div>
  );
};

export default SignUpFlow;
