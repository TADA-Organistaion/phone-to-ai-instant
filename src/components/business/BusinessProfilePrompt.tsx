
import React, { useState, useEffect } from 'react';
import { X, InfoCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BusinessProfilePromptProps {
  isComplete: boolean;
  onCompleteProfile: () => void;
}

const BusinessProfilePrompt: React.FC<BusinessProfilePromptProps> = ({ 
  isComplete,
  onCompleteProfile
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if this is first time entering the dashboard
    const isNewSignUp = sessionStorage.getItem('isNewSignUp');
    
    if (isNewSignUp === 'true') {
      setShowPrompt(true);
      sessionStorage.removeItem('isNewSignUp');
    } else if (!isComplete) {
      // Show banner if profile isn't complete
      setShowBanner(true);
    }
  }, [isComplete]);
  
  const handleDismissPrompt = () => {
    setShowPrompt(false);
    
    // If profile is incomplete, show banner after dismissing main prompt
    if (!isComplete) {
      setShowBanner(true);
    }
  };

  if (showPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background max-w-md w-full rounded-lg shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">Complete Your Business Profile</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleDismissPrompt}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-muted-foreground">
              Add your location and website so our AI can learn about your business 
              and automate your operations.
            </p>
            
            <div className="bg-muted/30 p-3 rounded text-sm flex gap-2">
              <InfoCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p>
                This information helps train our AI to better understand your business 
                details, menu, hours, and policies so it can accurately assist your customers.
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleDismissPrompt}
              >
                Later
              </Button>
              <Button 
                className="flex-1 bg-[#ED7D31] hover:bg-[#ED7D31]/90"
                onClick={() => {
                  setShowPrompt(false);
                  onCompleteProfile();
                }}
              >
                Complete Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (showBanner && !isComplete) {
    return (
      <Card className="bg-secondary/10 p-3 mb-6 border-l-4 border-l-[#ED7D31]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InfoCircle className="h-5 w-5 text-[#ED7D31] flex-shrink-0" />
            <p className="text-sm">
              Business details incomplete—add your address and website for full AI benefits.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  return null;
};

export default BusinessProfilePrompt;
