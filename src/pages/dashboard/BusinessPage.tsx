
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, Copy, Users } from "lucide-react";
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { useToast } from "@/hooks/use-toast";

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

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
}

const BusinessPage = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [widgetCode, setWidgetCode] = useState<string>('<script src="https://smartchat-ai.com/widget.js?id=your-unique-id"></script>');
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [trainingPrompt, setTrainingPrompt] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Staff' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    // Simulate some initial images
    setImages([
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    ]);
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
    toast({
      title: "Widget code copied!",
      description: "The code has been copied to your clipboard."
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload the file to a server
      // Here we're just creating an object URL for preview
      const newImageUrl = URL.createObjectURL(files[0]);
      setImages([...images, newImageUrl]);
      toast({
        title: "Image uploaded",
        description: "Your business image has been uploaded successfully."
      });
    }
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter some training data for the AI.",
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    // Simulate AI training process
    setTimeout(() => {
      setIsTraining(false);
      setTrainingPrompt("");
      toast({
        title: "AI Training Complete",
        description: "Your AI has been updated with the new information."
      });
    }, 2000);
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "New Team Member",
      email: "team@example.com",
      role: "Staff"
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(
      teamMembers.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6 p-4 pb-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Business Profile</h1>
          <Button>Save Changes</Button>
        </div>
        
        <Separator />

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
                  className="absolute top-2 right-2 bg-[#ed7d31] hover:bg-[#ed7d31]/90 text-white"
                  onClick={copyWidgetCode}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste this code snippet right before the closing &lt;/body&gt; tag on your website.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="images" className="flex-1">Images</TabsTrigger>
            <TabsTrigger value="ai-training" className="flex-1">Train AI</TabsTrigger>
            <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="images" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Images</CardTitle>
                <CardDescription>Upload photos of your business to enhance your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-border">
                      <img 
                        src={image} 
                        alt={`Business image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div 
                    className="flex items-center justify-center aspect-square rounded-md border border-dashed border-border bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Upload className="h-8 w-8 mb-2" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  You can upload up to 10 images of your business. Supported formats: JPEG, PNG, WebP.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-training" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Train Your AI Assistant</CardTitle>
                <CardDescription>Provide information about your business to improve AI responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleTrainingSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="trainingData">Training Data</Label>
                    <Textarea 
                      id="trainingData" 
                      placeholder="Enter information about your business, products, services, prices, etc."
                      className="h-40"
                      value={trainingPrompt}
                      onChange={(e) => setTrainingPrompt(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="mt-4" 
                    disabled={isTraining}
                  >
                    {isTraining ? "Training..." : "Train AI"}
                  </Button>
                </form>
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h4 className="text-sm font-medium mb-2">Training Tips:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Include your business hours, location, and contact information</li>
                    <li>• List your products and services with prices</li>
                    <li>• Describe special offers, promotions, or seasonal items</li>
                    <li>• Include policies like refunds, cancellations, or reservations</li>
                    <li>• Add FAQs customers commonly ask</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to your business dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-md">
                      <div className="flex-grow space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`name-${member.id}`} className="text-xs">Name</Label>
                            <Input 
                              id={`name-${member.id}`}
                              value={member.name} 
                              onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${member.id}`} className="text-xs">Email</Label>
                            <Input 
                              id={`email-${member.id}`}
                              type="email" 
                              value={member.email} 
                              onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`role-${member.id}`} className="text-xs">Role</Label>
                          <Input 
                            id={`role-${member.id}`}
                            value={member.role} 
                            onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeTeamMember(member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={addTeamMember}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Team members will receive an email invitation to join your business dashboard.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessDashboardLayout>
  );
};

export default BusinessPage;
