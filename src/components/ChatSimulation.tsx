
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "./ChatBubble";

type Conversation = {
  message: string;
  isAi: boolean;
}[];

type ChatSimulationProps = {
  initialPrompt?: string;
  customMenu?: {
    name: string;
    price: number;
    description?: string;
    dietaryInfo?: {
      vegan: boolean;
      glutenFree: boolean;
      eggFree: boolean;
      dairyFree: boolean;
    };
  }[];
};

const ChatSimulation = ({ initialPrompt, customMenu }: ChatSimulationProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation>([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const defaultConversation: Conversation = [
    { message: "I want 2 cheeseburgers and fries.", isAi: false },
    { message: "Great! I've added 2 cheeseburgers ($10) and 1 fries ($4) to your order. Your total is $14. Would you like to proceed to payment?", isAi: true },
    { message: "Yes, please!", isAi: false },
    { message: "Payment confirmed. Thank you! Your order #137 will be ready in 10 minutes. You'll receive a text notification when it's ready for pickup.", isAi: true },
  ];

  const customMenuConversation = (menu: ChatSimulationProps["customMenu"]): Conversation => {
    if (!menu || menu.length === 0) return defaultConversation;
    
    const items = menu.slice(0, 3); // Take max 3 items for the demo
    const itemNames = items.map(item => item.name).join(", ");
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    return [
      { message: `I'd like to order ${itemNames}.`, isAi: false },
      { message: `Great choice! I've added ${items.map(item => `${item.name} ($${item.price})`).join(", ")} to your order. Your total is $${total}. Would you like to proceed to payment?`, isAi: true },
      { message: "Yes, please!", isAi: false },
      { message: `Payment confirmed. Thank you! Your order #138 will be ready in 10 minutes. You'll receive a text notification when it's ready for pickup.`, isAi: true },
    ];
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (inputValue.trim() === "" && !initialPrompt) return;

    setShowPlaceholder(false);
    setIsLoading(true);
    
    const userInput = inputValue.trim() || initialPrompt || "I run a small burger shack";
    setConversation([{ message: userInput, isAi: false }]);
    setInputValue("");

    // Simulate AI thinking
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine which conversation to use
      const newConversation = customMenu 
        ? customMenuConversation(customMenu)
        : defaultConversation;

      // Set first user message
      setConversation([{ message: userInput, isAi: false }]);
      
      // Add AI responses with delays for natural feel
      let currentDelay = 800;
      for (let i = 1; i < newConversation.length; i++) {
        const message = newConversation[i];
        const delay = message.isAi ? 1500 : 800;
        
        setTimeout(() => {
          setConversation(prev => [...prev, message]);
        }, currentDelay);
        
        currentDelay += delay;
      }
    }, 1500);
  };

  useEffect(() => {
    if (initialPrompt) {
      handleSubmit();
    }
  }, [initialPrompt, customMenu]);

  useEffect(() => {
    if (chatRef.current && conversation.length > 0) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden glass-morphism shadow-lg">
      <div className="bg-background p-3 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="text-xs text-center font-medium ml-2 text-muted-foreground">
            AI Phone Assistant
          </div>
        </div>
      </div>
      
      <div 
        ref={chatRef}
        className={cn(
          "flex flex-col p-4 h-[320px] md:h-[380px] overflow-y-auto",
          conversation.length === 0 && "justify-center items-center"
        )}
      >
        {conversation.length === 0 && showPlaceholder ? (
          <div className="text-center max-w-md animate-fade-in">
            <div className="text-muted-foreground text-sm mb-2">Type a message to start the demo</div>
            <div className="text-xs text-muted-foreground/70">Example: "I run a small burger shack..."</div>
          </div>
        ) : (
          <>
            {conversation.map((message, index) => (
              <ChatBubble 
                key={index} 
                message={message.message} 
                isAi={message.isAi} 
                index={index}
                delay={index * 500}
              />
            ))}
            {isLoading && (
              <div className="self-start bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm px-4 py-3 animate-pulse max-w-[85%] md:max-w-[70%]">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-foreground/30 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-foreground/30 rounded-full animate-pulse animate-delay-200"></div>
                  <div className="h-2 w-2 bg-foreground/30 rounded-full animate-pulse animate-delay-400"></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tell us about your business (e.g., 'I run a small burger shack...')"
            className="flex-1 py-2 px-3 rounded-l-lg border-0 focus:ring-0 focus:outline-none text-sm chat-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={cn(
              "bg-brand text-white py-2 px-4 rounded-r-lg font-medium text-sm",
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-dark transition-colors"
            )}
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSimulation;
