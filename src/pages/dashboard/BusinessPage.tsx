
import { useState, useRef } from "react";
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Upload, Plus, X, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
};

const BusinessPage = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("Your coffee shop's friendly AI assistant");
  const [address, setAddress] = useState({
    street: "123 Coffee Lane",
    city: "Seattle",
    state: "WA",
    zip: "98101",
  });
  const [knowledgeLinks, setKnowledgeLinks] = useState<string[]>([
    "https://example.com/menu",
    "https://example.com/faqs",
  ]);
  const [newLink, setNewLink] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Jane Smith", role: "Manager", email: "jane@example.com" },
    { id: "2", name: "John Doe", role: "Barista", email: "john@example.com" },
  ]);
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    email: "",
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const widgetCode = `<script src="https://phone-to-ai.com/widget.js?id=your-business-id"></script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(widgetCode);
    toast({
      title: "Copied to clipboard",
      description: "Widget code has been copied to your clipboard",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (newLink.trim() && !knowledgeLinks.includes(newLink)) {
      setKnowledgeLinks(prev => [...prev, newLink]);
      setNewLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setKnowledgeLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.email) {
      const id = Date.now().toString();
      setTeamMembers(prev => [...prev, { id, ...newTeamMember }]);
      setNewTeamMember({ name: "", role: "", email: "" });
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Business Profile</h1>
        
        {/* Widget Code */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Copy Widget Code</h2>
          <div className="bg-secondary/30 p-4 rounded-md relative">
            <pre className="text-sm overflow-x-auto pb-10">
              {widgetCode}
            </pre>
            <Button 
              size="sm"
              className="absolute bottom-2 right-2"
              onClick={handleCopyCode}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy to Clipboard
            </Button>
          </div>
        </section>
        
        {/* Business Images */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Business Images</h2>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img 
                  src={image} 
                  alt={`Business upload ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button 
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button 
              className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-xs">Upload</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </section>
        
        {/* Business Description */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Business Description</h2>
          <Textarea 
            placeholder="Enter a description of your business"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </section>
        
        {/* Business Address */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Business Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input 
                id="street"
                value={address.street}
                onChange={(e) => setAddress({...address, street: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state"
                value={address.state}
                onChange={(e) => setAddress({...address, state: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input 
                id="zip"
                value={address.zip}
                onChange={(e) => setAddress({...address, zip: e.target.value})}
              />
            </div>
          </div>
        </section>
        
        {/* Train Your AI */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Train Your AI</h2>
          <p className="text-sm text-muted-foreground">Add links to your website, FAQs, pricing, and policies to help your AI give accurate information.</p>
          
          <div className="flex gap-2">
            <Input 
              placeholder="https://example.com/page"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button onClick={handleAddLink}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          <ul className="space-y-2 mt-4">
            {knowledgeLinks.map((link, index) => (
              <li key={index} className="flex items-center justify-between bg-secondary/30 p-2 rounded-md">
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm truncate max-w-[250px] md:max-w-md">{link}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveLink(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </section>
        
        {/* Team Members */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Team Members</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                placeholder="Full Name"
                value={newTeamMember.name}
                onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role"
                placeholder="Manager, Barista, etc."
                value={newTeamMember.role}
                onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input 
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={newTeamMember.email}
                  onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                />
                <Button onClick={handleAddTeamMember}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Current Team Members</h3>
            <ul className="space-y-2">
              {teamMembers.map((member) => (
                <li key={member.id} className="flex items-center justify-between bg-secondary/30 p-3 rounded-md">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex text-sm text-muted-foreground">
                      <span>{member.role}</span>
                      <span className="mx-2">•</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveTeamMember(member.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </BusinessDashboardLayout>
  );
};

export default BusinessPage;
