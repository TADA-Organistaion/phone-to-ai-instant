
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import SignUpFlow from "@/components/auth/SignUpFlow";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname === "/auth/signup";
  
  const toggleForm = () => {
    if (isSignUp) {
      navigate("/auth");
    } else {
      navigate("/auth/signup");
    }
  };

  return (
    <AuthLayout 
      title={isSignUp ? "Create Your Account" : "Sign in to your Account"} 
      subtitle={isSignUp ? "Get started with Phone to AI" : "Welcome back to Phone to AI"}
    >
      {isSignUp ? <SignUpFlow /> : <SignInForm />}
      
      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          onClick={toggleForm}
          className="w-full max-w-xs border-[#ED7D31]/30 text-[#ED7D31] hover:bg-[#ED7D31]/10 hover:text-[#ED7D31] hover:border-[#ED7D31] transition-colors duration-300"
        >
          {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
