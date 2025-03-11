
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteUrlInputProps {
  initialWebsite?: string;
  onWebsiteUpdate: (website: string) => void;
}

const WebsiteUrlInput: React.FC<WebsiteUrlInputProps> = ({ 
  initialWebsite = '', 
  onWebsiteUpdate 
}) => {
  const [website, setWebsite] = useState(initialWebsite);
  const [isEditing, setIsEditing] = useState(!initialWebsite);
  const { toast } = useToast();

  const handleSaveWebsite = () => {
    // Basic URL validation
    if (website && !website.startsWith('http://') && !website.startsWith('https://')) {
      setWebsite(`https://${website}`);
      onWebsiteUpdate(`https://${website}`);
    } else {
      onWebsiteUpdate(website);
    }
    
    setIsEditing(false);
    
    toast({
      title: "Website updated",
      description: "Your business website has been saved."
    });
  };

  return (
    <Card className="overflow-hidden border border-border/40 shadow-sm mb-6">
      <CardHeader className="bg-secondary/20">
        <CardTitle>Business Website</CardTitle>
        <CardDescription>Add your website to help our AI learn about your business</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {!isEditing && website ? (
          <div className="flex flex-col space-y-4">
            <div className="bg-secondary/10 p-4 rounded-md flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {website}
                </a>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-border/60 hover:bg-secondary/20"
              onClick={() => setIsEditing(true)}
            >
              Edit Website
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Link className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="website"
                    type="text"
                    placeholder="yourbusiness.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                className="bg-[#ED7D31] hover:bg-[#ED7D31]/90 transition-colors duration-300"
                onClick={handleSaveWebsite}
              >
                Save
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded">
              <span className="font-medium block mb-1">Why we need your website:</span>
              We use your website to train our AI, so it can answer customer questions 
              and automate orders more accurately based on your business information.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteUrlInput;
