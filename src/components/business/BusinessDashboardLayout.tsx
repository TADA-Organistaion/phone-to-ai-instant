
import { useLocation } from "react-router-dom";
import { Users, MessageSquare, BarChart, Grid, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BusinessDashboardLayoutProps {
  children: React.ReactNode;
}

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};

const navItems: NavItem[] = [
  {
    label: "Business",
    icon: Grid,
    path: "/dashboard/business",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/dashboard/messages",
  },
  {
    label: "Analytics",
    icon: BarChart,
    path: "/dashboard/analytics",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/dashboard/customers",
  },
];

const BusinessDashboardLayout = ({ children }: BusinessDashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="invisible w-8">
            {/* Placeholder for layout balance */}
          </div>
          
          <Button 
            asChild
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span>Exit Mobile Mode</span>
            </Link>
          </Button>
          
          <div className="invisible w-8">
            {/* Placeholder for layout balance */}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 mb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 z-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-2 w-full",
              "text-xs transition-colors",
              currentPath === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BusinessDashboardLayout;
