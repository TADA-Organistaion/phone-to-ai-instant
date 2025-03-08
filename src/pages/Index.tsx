
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        {/* Dashboard Access Button - Moved up */}
        <div className="max-w-5xl mx-auto text-center py-8 bg-secondary/10 rounded-lg my-8">
          <h2 className="text-2xl font-bold mb-4">Try Our Mobile-Style Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Experience our mobile app's interface on the web with our new dashboard
          </p>
          <Link to="/dashboard/business">
            <Button size="lg">
              Open Dashboard
            </Button>
          </Link>
        </div>
        
        <TestimonialSection />
        <CallToAction />
      </main>

      {/* Add See All Categories button to Analytics in the dashboard */}
      <div className="fixed bottom-20 right-6 z-40">
        <Button 
          variant="secondary" 
          className="shadow-lg" 
          onClick={() => setShowAllCategories(!showAllCategories)}
        >
          {showAllCategories ? "Hide Categories" : "See All Categories"}
        </Button>
        
        {showAllCategories && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-background rounded-lg shadow-lg p-4 border">
            <h3 className="font-medium mb-2">Additional Analytics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Purchases:</span>
                <span className="font-medium">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Purchase:</span>
                <span className="font-medium">$78.32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders:</span>
                <span className="font-medium">892</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-secondary py-6 px-6 text-center text-sm text-muted-foreground">
        <div className="max-w-5xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} Phone to AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
