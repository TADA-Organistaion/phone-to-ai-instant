
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Star } from "lucide-react";
import Header from "@/components/Header";

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  
  const calculateAnnualPrice = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return annualPrice;
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "FREE";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const plans = [
    {
      name: "Free",
      tagline: "Best For Getting Started with Chat",
      description: "Ideal for restaurants looking to add basic chat capabilities without advanced automation.",
      monthlyPrice: 0,
      features: [
        "Instant setup",
        "Unlimited Messages",
        "Unlimited Team Members",
        "Up to 5 Items in Your Catalog",
        "FREE FOREVER"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Premium",
      tagline: "Best for AI Automation",
      description: "Ideal for growing restaurants seeking to reduce staff load, prevent negative reviews, and maintain a polished, branded customer experience.",
      monthlyPrice: 99,
      features: [
        "All Free features",
        "Fully Automated AI Conversations",
        "Unlimited Catalog Items",
        "Remove Vibechat AI Branding",
        "Cancel anytime"
      ],
      cta: "Select Plan",
      highlight: true
    },
    {
      name: "Enterprise",
      tagline: "Best for AI Automation & Customer Support",
      description: "Ideal for larger or multi-location operations needing robust AI-driven communication, deeper customization, and premium support at scale.",
      monthlyPrice: 119,
      features: [
        "All Premium features",
        "Designated AI Concierge",
        "Deep Analytics & Insights",
        "Priority Support",
        "Cancel anytime"
      ],
      cta: "Select Plan",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-6">
        {/* Hero section */}
        <section className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Simple plans tailored for your restaurant's unique needs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect plan to automate customer interactions, reduce phone calls, and focus on what matters most - your customers.
          </p>
        </section>

        {/* Billing toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={billingPeriod === "annual"}
            onCheckedChange={(checked) => setBillingPeriod(checked ? "annual" : "monthly")}
          />
          <span className={`text-sm font-medium flex items-center gap-1 ${billingPeriod === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual <span className="text-xs py-0.5 px-1.5 rounded-full bg-brand/10 text-brand font-medium">20% off</span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`border ${plan.highlight ? 'border-brand shadow-lg relative' : ''} h-full flex flex-col`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-brand text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> MOST POPULAR
                  </div>
                </div>
              )}
              <CardHeader className={`pb-6 ${plan.highlight ? 'pt-8' : ''}`}>
                <div className="mb-2 text-sm font-medium text-brand">{plan.tagline}</div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    {billingPeriod === "monthly" 
                      ? formatPrice(plan.monthlyPrice)
                      : formatPrice(calculateAnnualPrice(plan.monthlyPrice) / 12)
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {plan.monthlyPrice > 0 
                      ? `USD per ${billingPeriod === "monthly" ? "month" : "month, billed annually"}`
                      : "FOREVER"
                    }
                  </div>
                </div>
                <Separator className="mb-6" />
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="h-5 w-5 text-brand flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-brand hover:bg-brand-dark text-white' : ''}`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
