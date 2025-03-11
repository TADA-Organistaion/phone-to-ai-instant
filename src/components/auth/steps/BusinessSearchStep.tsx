
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type BusinessSearchStepProps = {
  selectedPlace: any;
  handlePlaceSelect: (place: any) => void;
  handleGooglePlaceSubmit: () => void;
  switchToManualEntry: () => void;
};

const BusinessSearchStep: React.FC<BusinessSearchStepProps> = ({
  selectedPlace,
  handlePlaceSelect,
  handleGooglePlaceSubmit,
  switchToManualEntry,
}) => {
  return (
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
          onClick={switchToManualEntry}
        >
          Add Business Manually
        </Button>
      </div>
    </div>
  );
};

export default BusinessSearchStep;
