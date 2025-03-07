
import Image from "./Image";

const CallToAction = () => {
  return (
    <section id="cta" className="py-20 px-6 bg-brand text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to replace phone chaos for real?
        </h2>
        
        <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
          Download our app today and transform how your business handles phone orders.
          Set up in minutes, save hours every day.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a 
            href="#" 
            className="bg-white rounded-lg px-6 py-3 text-brand font-medium flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg hover-scale"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 mr-2">
              <path d="M12.1 5.8c.2 0 .3-.1.3-.3s-.1-.3-.3-.3c-.2 0-.3.1-.3.3s.1.3.3.3zM14.9 5.8c.2 0 .3-.1.3-.3s-.1-.3-.3-.3c-.2 0-.3.1-.3.3s.1.3.3.3zM17.6 18.7c0 .4-.3.7-.7.7H7.1c-.4 0-.7-.3-.7-.7V5.3c0-.4.3-.7.7-.7h9.8c.4 0 .7.3.7.7v13.4z" fill="currentColor"/>
              <path d="M12 20.8c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9z" fill="currentColor"/>
              <path d="M12 22.5c-1.4 0-2.6-1.2-2.6-2.6 0-1.4 1.2-2.6 2.6-2.6 1.4 0 2.6 1.2 2.6 2.6 0 1.4-1.2 2.6-2.6 2.6zM12 18.7c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2.6 0 1.2-.5 1.2-1.2 0-.6-.5-1.2-1.2-1.2z" fill="currentColor"/>
            </svg>
            App Store
          </a>
          
          <a 
            href="#" 
            className="bg-white rounded-lg px-6 py-3 text-brand font-medium flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg hover-scale"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 mr-2">
              <path d="M3.4 13.3V10l8.6 4.8c.9.5 2.1.5 3 0l8.6-4.8v3.3c0 .9-.5 1.7-1.2 2.2l-7.4 4.1c-2.3 1.3-5.1 1.3-7.4 0l-7.4-4.1c-.7-.5-1.2-1.3-1.2-2.2z" fill="currentColor"/>
            </svg>
            Google Play
          </a>
        </div>
        
        <p className="text-sm text-white/60">
          Compatible with iOS 12+ and Android 8+. Free download with subscription options.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
