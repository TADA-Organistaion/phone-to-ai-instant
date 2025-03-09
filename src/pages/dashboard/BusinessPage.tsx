
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, Copy, Users, Link, X } from "lucide-react";
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

type TrainingUrl = {
  id: string;
  url: string;
}

const BusinessPage = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [widgetCode, setWidgetCode] = useState<string>('<script src="https://smartchat-ai.com/widget.js?id=your-unique-id"></script>');
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [trainingUrls, setTrainingUrls] = useState<TrainingUrl[]>([
    { id: '1', url: 'https://example.com/pricing' },
    { id: '2', url: 'https://example.com/faq' }
  ]);
  const [newUrl, setNewUrl] = useState('');
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

  const handleAddUrl = () => {
    if (!newUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive"
      });
      return;
    }

    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      toast({
        title: "Invalid URL format",
        description: "URLs must start with http:// or https://",
        variant: "destructive"
      });
      return;
    }

    const newUrlEntry: TrainingUrl = {
      id: Date.now().toString(),
      url: newUrl
    };
    
    setTrainingUrls([...trainingUrls, newUrlEntry]);
    setNewUrl('');
  };

  const handleRemoveUrl = (id: string) => {
    setTrainingUrls(trainingUrls.filter(url => url.id !== id));
  };

  const handleTrainAI = () => {
    if (trainingUrls.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one URL to train your AI.",
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    // Simulate AI training process
    setTimeout(() => {
      setIsTraining(false);
      toast({
        title: "AI Training Complete",
        description: "Your AI has been updated with content from your URLs."
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
          <Button 
            className="bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300"
          >
            Save Changes
          </Button>
        </div>
        
        <Separator />

        {/* Widget Code Section */}
        <Card className="overflow-hidden border border-border/40 shadow-sm">
          <CardHeader className="bg-secondary/20">
            <CardTitle>Website Integration</CardTitle>
            <CardDescription>Add SmartChat AI to your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="widgetCode">Widget Code</Label>
              <div className="relative">
                <Textarea 
                  id="widgetCode" 
                  value={widgetCode} 
                  readOnly 
                  className="font-mono text-xs h-20 bg-muted/30"
                />
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute top-2 right-2 bg-[#ED7D31] hover:bg-[#ED7D31]/90 text-white transition-colors duration-300"
                  onClick={copyWidgetCode}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground ml-1">
                Paste this code snippet right before the closing &lt;/body&gt; tag on your website.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="profile" className="py-2.5">Profile</TabsTrigger>
            <TabsTrigger value="images" className="py-2.5">Images</TabsTrigger>
            <TabsTrigger value="ai-training" className="py-2.5">Train Your AI</TabsTrigger>
            <TabsTrigger value="team" className="py-2.5">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
            {/* User Info Section */}
            <Card className="overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={userInfo?.firstName || ''} 
                      onChange={(e) => setUserInfo(prev => prev ? {...prev, firstName: e.target.value} : prev)}
                      className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={userInfo?.lastName || ''} 
                      onChange={(e) => setUserInfo(prev => prev ? {...prev, lastName: e.target.value} : prev)}
                      className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
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
                    className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Business Info Section */}
            <Card className="overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Your business details from Google Places or manual entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName" 
                    value={businessData?.name || ''} 
                    onChange={(e) => setBusinessData(prev => prev ? {...prev, name: e.target.value} : prev)}
                    className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input 
                    id="businessAddress" 
                    value={formatAddress()} 
                    readOnly={!!businessData?.placeId}
                    className={`transition-all duration-300 ${businessData?.placeId ? 'bg-muted/30' : 'focus:border-[#ED7D31] focus:ring-[#ED7D31]/20'}`}
                  />
                  {businessData?.placeId && (
                    <p className="text-xs text-muted-foreground ml-1">
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
                        className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        value={businessData?.state || ''} 
                        onChange={(e) => setBusinessData(prev => prev ? {...prev, state: e.target.value} : prev)}
                        className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input 
                        id="zip" 
                        value={businessData?.zip || ''} 
                        onChange={(e) => setBusinessData(prev => prev ? {...prev, zip: e.target.value} : prev)}
                        className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="images" className="space-y-6 mt-6">
            <Card className="overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle>Business Images</CardTitle>
                <CardDescription>Upload photos of your business to enhance your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
                      <img 
                        src={image} 
                        alt={`Business image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div 
                    className="flex items-center justify-center aspect-square rounded-lg border border-dashed border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors duration-300"
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
                <p className="text-xs text-muted-foreground mt-2 ml-1">
                  You can upload up to 10 images of your business. Supported formats: JPEG, PNG, WebP.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-training" className="space-y-6 mt-6">
            <Card className="overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle>Train Your AI Assistant</CardTitle>
                <CardDescription>Add links to your website, FAQs, pricing, and policies to help your AI give accurate information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="newUrl">Website URL</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="newUrl" 
                      placeholder="https://example.com/pricing"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="flex-1 transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                    />
                    <Button 
                      onClick={handleAddUrl}
                      className="bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add URL
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <Label>Added URLs for Training</Label>
                  {trainingUrls.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-3 px-4 bg-muted/20 rounded-md">
                      No URLs added yet. Add URLs to help your AI learn about your business.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {trainingUrls.map((urlItem) => (
                        <div 
                          key={urlItem.id} 
                          className="flex items-center justify-between gap-2 p-3 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Link className="h-4 w-4 text-[#ED7D31] flex-shrink-0" />
                            <span className="text-sm truncate">{urlItem.url}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveUrl(urlItem.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors duration-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleTrainAI}
                  disabled={isTraining || trainingUrls.length === 0}
                  className="mt-3 bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300 w-full"
                >
                  {isTraining ? "Training..." : "Train Your AI"}
                </Button>
                
                <div className="bg-muted/20 p-4 rounded-md mt-4">
                  <h4 className="text-sm font-medium mb-2 text-foreground">How URL Training Works:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-1">
                    <li>• Add URLs to your website pages containing key business information</li>
                    <li>• Include links to pricing pages, FAQs, product descriptions, and policies</li>
                    <li>• Our AI will scan these pages to answer customer questions accurately</li>
                    <li>• Add multiple URLs for comprehensive training</li>
                    <li>• Update your training whenever you make significant website changes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <Card className="overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <CardHeader className="bg-secondary/20">
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to your business dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-border/40 rounded-lg hover:border-border/60 transition-all duration-300"
                    >
                      <div className="flex-grow space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`name-${member.id}`} className="text-xs">Name</Label>
                            <Input 
                              id={`name-${member.id}`}
                              value={member.name} 
                              onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${member.id}`} className="text-xs">Email</Label>
                            <Input 
                              id={`email-${member.id}`}
                              type="email" 
                              value={member.email} 
                              onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                              className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`role-${member.id}`} className="text-xs">Role</Label>
                          <Input 
                            id={`role-${member.id}`}
                            value={member.role} 
                            onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                            className="transition-all duration-300 focus:border-[#ED7D31] focus:ring-[#ED7D31]/20"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
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
                  className="w-full mt-4 border-[#ED7D31]/30 text-[#ED7D31] hover:bg-[#ED7D31]/10 hover:text-[#ED7D31] hover:border-[#ED7D31] transition-colors duration-300"
                  onClick={addTeamMember}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
                <p className="text-xs text-muted-foreground mt-2 ml-1">
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
