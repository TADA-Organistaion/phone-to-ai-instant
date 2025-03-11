
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WebsiteUrlInput = () => {
  const [url, setUrl] = React.useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!url) return;
    
    localStorage.setItem("businessWebsite", url);
    toast({
      title: "Website URL saved",
      description: "Your business website has been updated successfully.",
    });
  };

  React.useEffect(() => {
    const savedUrl = localStorage.getItem("businessWebsite");
    if (savedUrl) setUrl(savedUrl);
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-secondary/20">
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          Website URL
        </CardTitle>
        <CardDescription>Add your business website to help our AI learn about your services</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Business Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://your-business.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="w-full bg-[#ED7D31] hover:bg-[#ED7D31]/90">
            Save Website
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteUrlInput;
