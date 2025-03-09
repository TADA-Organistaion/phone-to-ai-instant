
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
};

const BusinessPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [widgetCode, setWidgetCode] = useState<string>('<script src="https://smartchat-ai.com/widget.js?id=your-unique-id"></script>');

  useEffect(() => {
    // Load user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Load business data from localStorage
    const storedBusinessData = localStorage.getItem('businessData');
    if (storedBusinessData) {
      setBusinessData(JSON.parse(storedBusinessData));
    }
  }, []);

  const formatAddress = () => {
    if (!businessData) return '';
    
    if (businessData.address && businessData.city) {
      return `${businessData.address}, ${businessData.city}, ${businessData.state} ${businessData.zip}`;
    } else {
      // For Google Places data that might not have individual address components
      return businessData.name;
    }
  };

  const copyWidgetCode = () => {
    navigator.clipboard.writeText(widgetCode);
    alert('Widget code copied to clipboard!');
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6 p-4 pb-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Business Profile</h1>
          <Button>Save Changes</Button>
        </div>
        
        <Separator />
        
        {/* User Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={userInfo?.firstName || ''} 
                  onChange={(e) => setUserInfo(prev => prev ? {...prev, firstName: e.target.value} : prev)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={userInfo?.lastName || ''} 
                  onChange={(e) => setUserInfo(prev => prev ? {...prev, lastName: e.target.value} : prev)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={userInfo?.email || ''} 
                onChange={(e) => setUserInfo(prev => prev ? {...prev, email: e.target.value} : prev)}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Business Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Your business details from Google Places or manual entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName" 
                value={businessData?.name || ''} 
                onChange={(e) => setBusinessData(prev => prev ? {...prev, name: e.target.value} : prev)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input 
                id="businessAddress" 
                value={formatAddress()} 
                readOnly={!!businessData?.placeId} // Make read-only if from Google Places
              />
              {businessData?.placeId && (
                <p className="text-xs text-muted-foreground">
                  This address was imported from Google Places and cannot be edited directly.
                </p>
              )}
            </div>
            
            {!businessData?.placeId && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={businessData?.city || ''} 
                    onChange={(e) => setBusinessData(prev => prev ? {...prev, city: e.target.value} : prev)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={businessData?.state || ''} 
                    onChange={(e) => setBusinessData(prev => prev ? {...prev, state: e.target.value} : prev)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input 
                    id="zip" 
                    value={businessData?.zip || ''} 
                    onChange={(e) => setBusinessData(prev => prev ? {...prev, zip: e.target.value} : prev)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Widget Code Section */}
        <Card>
          <CardHeader>
            <CardTitle>Website Integration</CardTitle>
            <CardDescription>Add SmartChat AI to your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="widgetCode">Widget Code</Label>
              <div className="relative">
                <Textarea 
                  id="widgetCode" 
                  value={widgetCode} 
                  readOnly 
                  className="font-mono text-xs h-20"
                />
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute top-2 right-2"
                  onClick={copyWidgetCode}
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste this code snippet right before the closing &lt;/body&gt; tag on your website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessDashboardLayout>
  );
};

export default BusinessPage;
