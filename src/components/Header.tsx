
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Image from "@/components/Image";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-6 md:px-8",
        scrolled ? "glass-morphism" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="transition-opacity hover:opacity-90">
            <Image 
              src="/lovable-uploads/6cef292d-a698-451e-8442-92d630cdd28b.png" 
              alt="Vibechat AI - Phone to AI in seconds" 
              className="h-12 md:h-14" 
              width={200}
              height={50}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <a 
            href="#how-it-works" 
            className="text-sm text-foreground/80 hover:text-brand transition-colors"
          >
            How it works
          </a>
          <a 
            href="#demo" 
            className="text-sm text-foreground/80 hover:text-brand transition-colors"
          >
            Demo
          </a>
          <Link 
            to="/pricing" 
            className="text-sm text-foreground/80 hover:text-brand transition-colors"
          >
            Pricing
          </Link>
          <Link to="/auth">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:text-brand transition-colors min-w-[80px]"
            >
              Sign in
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button 
              size="sm" 
              className="bg-brand text-white hover:bg-brand-dark hover-scale min-w-[80px]"
            >
              Sign up
            </Button>
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="text-foreground hover:text-brand transition-colors">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
