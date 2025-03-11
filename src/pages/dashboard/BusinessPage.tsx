import React from 'react';
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { BusinessProfilePrompt } from "@/components/business/BusinessProfilePrompt";
import BusinessLocationSearch from "@/components/business/BusinessLocationSearch";
import WebsiteUrlInput from "@/components/business/WebsiteUrlInput";

const BusinessPage = () => {
  const handleProfileComplete = () => {
    // Scroll to location search
    document.querySelector('.business-location-search')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <BusinessDashboardLayout>
      <div className="container max-w-2xl mx-auto p-4">
        <BusinessProfilePrompt onComplete={handleProfileComplete} />
        
        <div className="space-y-6">
          <div className="business-location-search">
            <BusinessLocationSearch 
              onLocationSelect={(location) => {
                console.log('Selected location:', location);
              }}
              initialBusinessData={null}
            />
          </div>
          
          <WebsiteUrlInput />
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Website Integration</h2>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                {`<script src="https://phone-to-ai.com/widget.js"></script>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </BusinessDashboardLayout>
  );
};

export default BusinessPage;
