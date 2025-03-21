
import ChatSimulation from "./ChatSimulation";
const Hero = () => {
  return <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Phone to AI <span className="text-brand">in seconds</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">Describe your business details—menu, hours, policies—and see how our AI instantly handles customer questions. No more missed calls or taking orders by phone!</p>
        </div>
        
        <div className="animate-slide-in">
          <ChatSimulation />
        </div>
      </div>
    </section>;
};
export default Hero;
