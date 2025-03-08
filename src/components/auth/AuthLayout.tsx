
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col">
      <div className="py-4 px-6 flex">
        <Link 
          to="/" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-background rounded-xl p-6 sm:p-8 shadow-md border border-border">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </div>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Phone to AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
