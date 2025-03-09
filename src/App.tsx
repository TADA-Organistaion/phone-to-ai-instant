import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth/AuthPage";
import SignUpPage from "./components/auth/SignUpPage";
import BusinessProfilePage from "./pages/business/BusinessProfilePage";
import BusinessSettingsPage from "./pages/business/BusinessSettingsPage";
import BusinessPage from "./pages/dashboard/BusinessPage";
import MessagesPage from "./pages/dashboard/MessagesPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import CustomersPage from "./pages/dashboard/CustomersPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/business-profile" element={<BusinessProfilePage />} />
            <Route path="/business-settings" element={<BusinessSettingsPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/business" element={<BusinessPage />} />
            <Route path="/dashboard/messages" element={<MessagesPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/customers" element={<CustomersPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
