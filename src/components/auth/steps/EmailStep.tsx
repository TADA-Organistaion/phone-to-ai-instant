
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type EmailStepProps = {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    email: string;
    firstName: string;
    lastName: string;
  }>>;
  handleEmailSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

const EmailStep: React.FC<EmailStepProps> = ({
  userData,
  setUserData,
  handleEmailSubmit,
  isSubmitting,
}) => {
  const [termsAgreed, setTermsAgreed] = React.useState(false);

  return (
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
        disabled={isSubmitting || !termsAgreed}
      >
        {isSubmitting ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
};

export default EmailStep;
