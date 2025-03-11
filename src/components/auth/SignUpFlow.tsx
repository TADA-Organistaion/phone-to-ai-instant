
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SignupStep, UserData } from "./utils/types";
import EmailStep from "./steps/EmailStep";
import OtpStep from "./steps/OtpStep";

const SignUpFlow = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("email");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep("otp");
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
    setTimeout(() => {
      setIsSubmitting(false);
      if (otp === TEST_OTP) {
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("showProfileCompletion", "true");
        toast({
          title: "Sign up successful!",
          description: "Welcome to Phone to AI",
        });
        navigate("/dashboard/business");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const goBackToEmail = () => setCurrentStep("email");

  return (
    <div className="space-y-6">
      {currentStep === "email" && (
        <EmailStep 
          userData={userData}
          setUserData={setUserData}
          handleEmailSubmit={handleEmailSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {currentStep === "otp" && (
        <OtpStep 
          email={userData.email}
          otp={otp}
          setOtp={setOtp}
          handleVerifyOtp={handleVerifyOtp}
          isSubmitting={isSubmitting}
          goBackToEmail={goBackToEmail}
        />
      )}
    </div>
  );
};

export default SignUpFlow;
