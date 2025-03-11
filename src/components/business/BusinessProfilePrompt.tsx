
import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

type BusinessProfilePromptProps = {
  onComplete: () => void;
};

export const BusinessProfilePrompt: React.FC<BusinessProfilePromptProps> = ({ onComplete }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showProfileCompletion");
    if (shouldShow === "true") {
      setShowDialog(true);
    }
  }, []);

  const handleDialogDismiss = () => {
    setShowDialog(false);
    setShowBanner(true);
    localStorage.removeItem("showProfileCompletion");
  };

  const handleComplete = () => {
    setShowDialog(false);
    setShowBanner(false);
    localStorage.removeItem("showProfileCompletion");
    onComplete();
  };

  return (
    <>
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete your business profile</AlertDialogTitle>
            <AlertDialogDescription>
              Add your location and website so our AI can learn about your business and automate your operations.
              <p className="mt-2 font-medium text-muted-foreground">
                We use your address and website info to train our AI, so you can answer customer questions and automate orders more accurately!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogDismiss}>Later</AlertDialogCancel>
            <AlertDialogAction onClick={handleComplete}>Complete Profile</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showBanner && (
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Business details incomplete—add your address and website for full AI benefits
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
