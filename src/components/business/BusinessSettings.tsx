
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@radix-ui/react-separator";
import { Trash2 } from "lucide-react";

const BusinessSettings = () => {
  const [newEmail, setNewEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState({
    newOrders: true,
    updates: true,
  });
  const { toast } = useToast();

  const handleSendEmailOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
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
        description: "Check your new email for the one-time password.",
      });
    }, 1500);
  };

  const handleVerifyEmailOtp = (e: React.FormEvent) => {
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
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (otp === "123456") { // Demo validation only
        toast({
          title: "Email updated successfully",
          description: "Your business email has been updated.",
        });
        setOtpSent(false);
        setNewEmail("");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleNotificationChange = (field: string) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));

    // Show toast confirmation
    toast({
      title: "Notification settings updated",
    });
  };

  const handleDeleteAccount = () => {
    // This would typically show a confirmation dialog first
    toast({
      title: "Account deletion requested",
      description: "A confirmation email has been sent to verify this action.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Email Change Section */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Change Email Address</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your current email: <span className="font-medium text-foreground">business@example.com</span>
        </p>
        
        {!otpSent ? (
          <form onSubmit={handleSendEmailOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                placeholder="your-new-email@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              variant="outline" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyEmailOtp} className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">
              We've sent a verification code to <span className="font-medium">{newEmail}</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="submit" 
                variant="outline" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Confirm Change"}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOtpSent(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newOrders" className="font-medium">New Orders</Label>
              <p className="text-sm text-muted-foreground">Get notified when you receive new customer orders</p>
            </div>
            <Switch 
              id="newOrders" 
              checked={notifications.newOrders}
              onCheckedChange={() => handleNotificationChange('newOrders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="updates" className="font-medium">Product Updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features and improvements</p>
            </div>
            <Switch 
              id="updates" 
              checked={notifications.updates} 
              onCheckedChange={() => handleNotificationChange('updates')}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-background border border-destructive/20 rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your business account and all associated data. This action cannot be undone.
        </p>
        
        <Button 
          variant="destructive" 
          onClick={handleDeleteAccount}
          className="gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default BusinessSettings;
