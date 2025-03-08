
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <TestimonialSection />
        <CallToAction />
        
        {/* Dashboard Access Button */}
        <div className="max-w-5xl mx-auto text-center py-8">
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
      </main>
      
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
