
import React from "react";
import { SignupStep, UserData } from "./utils/types";

type DebugPanelProps = {
  currentStep: SignupStep;
  userData: UserData;
  otp: string;
};

const DebugPanel: React.FC<DebugPanelProps> = ({ currentStep, userData, otp }) => {
  // Always return null to hide the debug panel
  return null;
};

export default DebugPanel;
