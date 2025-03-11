
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type OtpStepProps = {
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleVerifyOtp: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  goBackToEmail: () => void;
};

const OtpStep: React.FC<OtpStepProps> = ({
  email,
  otp,
  setOtp,
  handleVerifyOtp,
  isSubmitting,
  goBackToEmail,
}) => {
  return (
    <form onSubmit={handleVerifyOtp} className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4 text-center">
        We've sent a one-time password to <span className="font-medium text-foreground">{email}</span>
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
          onClick={goBackToEmail}
          type="button"
        >
          Edit email address
        </Button>
      </div>
    </form>
  );
};

export default OtpStep;
