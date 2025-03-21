import { cn } from "@/lib/utils";
const TestimonialSection = () => {
  return <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Let customers place orders, pay, and ask questions in one simple conversation—powered by advanced AI.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-background rounded-xl p-6 shadow-sm hover-scale">
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center mr-3 border-2 border-brand/30 dark:bg-brand/30 dark:border-brand/50">
                <span className="text-brand font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold">Multi-Agent System</h3>
            </div>
            <p className="text-muted-foreground">Our technology uses specialized AI agents working together: Vibechat handles the conversation, while Vibe Ordering, Menu Agent, and Ordering Agent manage the business logic.</p>
          </div>
          
          <div className="bg-background rounded-xl p-6 shadow-sm hover-scale">
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center mr-3 border-2 border-brand/30 dark:bg-brand/30 dark:border-brand/50">
                <span className="text-brand font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold">End-to-End Automation</h3>
            </div>
            <p className="text-muted-foreground">
              From the moment a customer calls, our Payment Agent processes transactions securely, 
              Receipt Agent generates documentation, and Kitchen Agent notifies your staff.
            </p>
          </div>
        </div>
        
        <div className={cn("bg-background rounded-xl p-8 shadow-sm glass-morphism mb-16", "border-l-4 border-l-brand")}>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Phone to AI Transformation</h3>
              <p className="text-muted-foreground">Just like email replaced snail mail, AI will soon replace phone calls for routine tasks—like taking orders or answering general questions—freeing staff to focus on in-person interactions.</p>
            </div>
            
            <div className="md:ml-8 flex flex-col items-center">
              <div className="text-5xl font-bold text-brand">80%</div>
              <div className="text-sm text-muted-foreground text-center">Reduction in<br />phone calls</div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4 border-2 border-brand/30 dark:bg-brand/30 dark:border-brand/50">
              <span className="text-brand font-bold">24/7</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Always Available</h3>
            <p className="text-sm text-muted-foreground">
              Never miss a call or potential order, even outside business hours
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4 border-2 border-brand/30 dark:bg-brand/30 dark:border-brand/50">
              <span className="text-brand font-bold">99%</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Order Accuracy</h3>
            <p className="text-sm text-muted-foreground">
              Eliminate human error and miscommunication with precise AI ordering
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4 border-2 border-brand/30 dark:bg-brand/30 dark:border-brand/50">
              <span className="text-brand font-bold">2min</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Quick Setup</h3>
            <p className="text-sm text-muted-foreground">
              Easy onboarding — be up and running within minutes, not days
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialSection;