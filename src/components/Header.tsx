
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8",
        scrolled ? "glass-morphism" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-semibold text-lg sm:text-xl">
          <a href="#" className="text-foreground hover:text-brand transition-colors">
            SmartChat AI
          </a>
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
          <Link to="/auth">
            <Button variant="outline" size="sm" className="hover:text-brand transition-colors">
              Sign in
            </Button>
          </Link>
          <a href="#cta">
            <Button size="sm" className="bg-brand text-white hover:bg-brand-dark hover-scale">
              Sign up
            </Button>
          </a>
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
