
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
};

type ManualEntryStepProps = {
  businessData: BusinessData;
  setBusinessData: React.Dispatch<React.SetStateAction<BusinessData>>;
  handleManualEntrySubmit: (e: React.FormEvent) => void;
  goBackToBusinessSearch: () => void;
};

const ManualEntryStep: React.FC<ManualEntryStepProps> = ({
  businessData,
  setBusinessData,
  handleManualEntrySubmit,
  goBackToBusinessSearch,
}) => {
  return (
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
        onClick={goBackToBusinessSearch}
      >
        Back
      </Button>
    </form>
  );
};

export default ManualEntryStep;
