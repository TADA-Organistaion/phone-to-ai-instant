
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessLayoutProps {
  children: React.ReactNode;
  title: string;
}

const BusinessLayout = ({ children, title }: BusinessLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/business-profile" className="font-semibold text-lg">
            Phone to AI
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/business-profile" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Link to="/business-settings" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          &copy; {new Date().getFullYear()} Phone to AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BusinessLayout;
