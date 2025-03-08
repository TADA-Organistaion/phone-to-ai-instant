
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
            Phone to AI
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
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
            to="/auth" 
            className="text-sm text-foreground/80 hover:text-brand transition-colors flex items-center"
          >
            Business Sign In <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <a 
            href="#cta" 
            className="px-5 py-2 bg-brand text-white rounded-full text-sm font-medium transition-all hover:bg-brand-dark hover-scale"
          >
            Get Started
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
