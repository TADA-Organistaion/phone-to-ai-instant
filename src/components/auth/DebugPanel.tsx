
import React from "react";
import { SignupStep, UserData } from "./utils/types";

type DebugPanelProps = {
  currentStep: SignupStep;
  userData: UserData;
  otp: string;
};

const DebugPanel: React.FC<DebugPanelProps> = ({ currentStep, userData, otp }) => {
  if (process.env.NODE_ENV !== 'development') {
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
