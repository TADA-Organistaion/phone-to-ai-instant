
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const BusinessProfileForm = () => {
  const [formData, setFormData] = useState({
    businessName: "Coffee Shop Example",
    phone: "(555) 123-4567",
    address: "123 Main Street, Anytown, USA",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your business profile has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div 
          className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleLogoClick}
        >
          {logoPreview ? (
            <img 
              src={logoPreview} 
              alt="Business logo preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <Upload className="h-8 w-8 mb-1" />
              <span className="text-xs">Upload Logo</span>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLogoChange}
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
        />
        <p className="text-sm text-muted-foreground">
          Click to upload a business logo (PNG or JPEG)
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input
            id="email"
            type="email"
            value="business@example.com"
            disabled
            className="bg-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            To change your email, go to Settings
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Business Address (Optional)</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full sm:w-auto" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default BusinessProfileForm;
