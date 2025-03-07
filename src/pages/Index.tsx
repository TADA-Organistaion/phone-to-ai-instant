
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <TestimonialSection />
        <CallToAction />
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
