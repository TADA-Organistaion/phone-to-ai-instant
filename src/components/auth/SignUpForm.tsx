
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    termsAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({ ...prev, termsAgreed: !prev.termsAgreed }));
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName.trim()) {
      toast({
        title: "Business name required",
        description: "Please enter your business name.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email || !formData.email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.termsAgreed) {
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
      setOtpSent(true);
      
      // For demo purposes only
      console.log("Demo OTP: 123456");
      
      toast({
        title: "OTP Sent",
        description: "Check your email for the one-time password.",
      });
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
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
    
    // Simulate API call to verify OTP and create account
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (otp === "123456") { // Demo validation only
        toast({
          title: "Account created successfully",
          description: "Welcome to Phone to AI!",
        });
        navigate("/business-profile");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Your Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@business.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-start space-x-2 py-2">
            <Checkbox 
              id="terms" 
              checked={formData.termsAgreed}
              onCheckedChange={handleCheckboxChange}
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-muted-foreground leading-tight cursor-pointer"
            >
              I agree to the <a href="#" className="text-brand hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-brand hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Create Account"}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/auth")}>
              Sign in
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4 text-center">
            We've sent a one-time password to <span className="font-medium text-foreground">{formData.email}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoFocus
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify & Complete Registration"}
          </Button>
          
          <div className="text-center text-sm mt-4">
            <Button 
              variant="link" 
              className="p-0" 
              onClick={() => setOtpSent(false)}
              type="button"
            >
              Edit registration details
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
