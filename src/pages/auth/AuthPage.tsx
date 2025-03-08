
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
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
      title={isSignUp ? "Create Business Account" : "Sign in to your Account"} 
      subtitle={isSignUp ? "Get started with Phone to AI" : "Welcome back to Phone to AI"}
    >
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </AuthLayout>
  );
};

export default AuthPage;
