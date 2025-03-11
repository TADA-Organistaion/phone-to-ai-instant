
import React from "react";
import { SignupStep, UserData } from "./utils/types";

type DebugPanelProps = {
  currentStep: SignupStep;
  userData: UserData;
  otp: string;
};

const DebugPanel: React.FC<DebugPanelProps> = ({ currentStep, userData, otp }) => {
  // Only show in development mode using window.location instead of process.env
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname.includes('lovableproject.com');
                        
  if (!isDevelopment) {
    return null;
  }

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 text-xs rounded-md mb-2">
      <p>Current step: {currentStep}</p>
      <p>Email: {userData.email}</p>
      <p>OTP entered: {otp}</p>
    </div>
  );
};

export default DebugPanel;
