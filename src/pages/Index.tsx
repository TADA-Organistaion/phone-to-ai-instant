
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
        
        {/* Dashboard Access Section */}
        <div className="max-w-5xl mx-auto text-center py-8 bg-secondary/10 rounded-lg my-8">
          <h2 className="text-2xl font-bold mb-4">Experience Our Mobile App, But in Your Browser</h2>
          <p className="text-muted-foreground mb-6">
            Experience our mobile app's interface on the web with our new dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business-signup">
              <Button size="lg" variant="default">
                Sign Up Your Business
              </Button>
            </Link>
            <Link to="/dashboard/business">
              <Button size="lg" variant="outline">
                Try Mobile Mode
              </Button>
            </Link>
          </div>
        </div>
        
        <TestimonialSection />
        <CallToAction />
      </main>
      
      <footer className="bg-secondary py-6 px-6 text-center text-sm text-muted-foreground">
        <div className="max-w-5xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} SmartChat AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
