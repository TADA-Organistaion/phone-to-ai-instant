
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PanelLeftClose, PanelLeftOpen, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Conversation, ChatSimulationProps, MenuItem, SuggestedPrompt } from "@/types/chat";
import { suggestedPrompts } from "@/data/suggestedPrompts";
import { customerQuickPrompts } from "@/data/customerQuickPrompts";
import { menuTemplates } from "@/data/menuTemplates";
import { customMenuConversation, defaultConversation } from "@/utils/chatUtils";
import ChatTabContent from "./chat/ChatTabContent";
import MenuTabContent from "./chat/MenuTabContent";

const ChatSimulation = ({ initialPrompt, customMenu }: ChatSimulationProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation>([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "menu">("chat");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentItem, setCurrentItem] = useState<MenuItem>({
    name: "",
    price: 0,
    description: "",
    dietaryInfo: {
      vegan: false,
      glutenFree: false,
      eggFree: false,
      dairyFree: false,
    },
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<SuggestedPrompt | null>(null);
  const [businessData, setBusinessData] = useState<string>(initialPrompt || "We are a family-owned burger restaurant. We're open Mon-Sat 11am-10pm, Sun 12pm-8pm. We offer delivery within 5 miles for orders over $20. We have gluten-free buns available for $1 extra. Our bestseller is the Classic Cheeseburger ($12).");
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const businessDataRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  const handleReset = () => {
    setConversation([]);
    setInputValue("");
    setShowPlaceholder(true);
    setIsLoading(false);
    setSelectedPrompt(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (inputValue.trim() === "" && !initialPrompt && !selectedPrompt) return;

    setShowPlaceholder(false);
    setIsLoading(true);
    
    let userInput = inputValue.trim() || initialPrompt || "I run a small burger shack";
    
    if (selectedPrompt) {
      // For suggested prompts, we show the owner's input as context (not visible in the chat)
      // but start the visible conversation with the first customer message from the demo
      setConversation([]);
      setInputValue("");

      setTimeout(() => {
        setIsLoading(false);
        
        // Start with the first customer message from the demo
        if (selectedPrompt.demoConversation.length > 0) {
          const firstMessage = selectedPrompt.demoConversation[0];
          if (firstMessage && typeof firstMessage.role === 'string' && 
              ["system", "user", "assistant", "customer", "demo"].includes(firstMessage.role)) {
            setConversation([firstMessage as {
              message: string;
              isAi: boolean;
              role?: "system" | "user" | "assistant" | "customer" | "demo";
            }]);
          } else {
            setConversation([{
              message: firstMessage.message,
              isAi: firstMessage.isAi
            }]);
          }
          
          // Add the rest of the conversation with delays
          let currentDelay = 800;
          for (let i = 1; i < selectedPrompt.demoConversation.length; i++) {
            const message = selectedPrompt.demoConversation[i];
            const delay = message.isAi ? 1500 : 800;
            
            setTimeout(() => {
              if (message.role && ["system", "user", "assistant", "customer", "demo"].includes(message.role)) {
                setConversation(prev => [...prev, message as {
                  message: string;
                  isAi: boolean;
                  role?: "system" | "user" | "assistant" | "customer" | "demo";
                }]);
              } else {
                setConversation(prev => [...prev, {
                  message: message.message,
                  isAi: message.isAi
                }]);
              }
            }, currentDelay);
            
            currentDelay += delay;
          }
        }
      }, 1500);
      
      return;
    }
    
    setConversation([{ message: userInput, isAi: false }]);
    setInputValue("");

    setTimeout(() => {
      setIsLoading(false);
      
      const newConversation = customMenu 
        ? customMenuConversation(customMenu)
        : defaultConversation;

      setConversation([{ message: userInput, isAi: false }]);
      
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

  const handleQuickPromptClick = (promptText: string) => {
    setShowPlaceholder(false);
    setIsLoading(true);
    
    // Add the quick prompt as a customer message
    setConversation(prev => [...prev, { message: promptText, isAi: false }]);
    
    // Simulate AI response that references the business data
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate a response based on the prompt and business data
      let aiResponse = "";
      
      if (promptText.toLowerCase().includes("close") || promptText.toLowerCase().includes("open")) {
        aiResponse = `Based on our hours, we're open Mon-Sat 11am-10pm and Sun 12pm-8pm. Is there something specific you'd like to know about today's hours?`;
      } else if (promptText.toLowerCase().includes("gluten")) {
        aiResponse = `Yes, we do offer gluten-free buns as a substitute for any of our burgers for just $1 extra. Our fries are also gluten-free as they're cooked in a dedicated fryer.`;
      } else if (promptText.toLowerCase().includes("delivery")) {
        aiResponse = `Yes, we offer delivery within a 5-mile radius for orders over $20. There's no delivery fee for orders over $35. Would you like to place a delivery order?`;
      } else if (promptText.toLowerCase().includes("popular") || promptText.toLowerCase().includes("bestseller")) {
        aiResponse = `Our Classic Cheeseburger ($12) is our bestseller! It comes with a juicy beef patty, cheddar cheese, lettuce, tomato, and our special sauce. Would you like to try one?`;
      } else if (promptText.toLowerCase().includes("special")) {
        aiResponse = `Today's special is our Double BBQ Burger with bacon and onion rings for $15.99, which includes a side of fries. Would you like to add this to your order?`;
      } else if (promptText.toLowerCase().includes("wait")) {
        aiResponse = `Currently, our wait time is approximately 15-20 minutes for dine-in and 25-30 minutes for takeout orders. Would you like to place an order?`;
      } else if (promptText.toLowerCase().includes("reservation")) {
        aiResponse = `Yes, we accept reservations for parties of 6 or more. For smaller groups, we operate on a first-come, first-served basis. Would you like to make a reservation?`;
      } else {
        aiResponse = `Thanks for your question. Based on our information, I can help you with menu items, pricing, hours, and delivery options. Is there something specific you'd like to know about our restaurant?`;
      }
      
      setConversation(prev => [...prev, { message: aiResponse, isAi: true }]);
    }, 1500);
  };

  const handlePromptSelect = (prompt: SuggestedPrompt) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt.defaultInput);
    setBusinessData(prompt.defaultInput);
    
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  const handleAddItem = () => {
    if (!currentItem.name || currentItem.price <= 0) return;
    
    setMenuItems([...menuItems, { ...currentItem }]);
    setCurrentItem({
      name: "",
      price: 0,
      description: "",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    });
  };

  const handleMenuSubmit = () => {
    setActiveTab("chat");
    setShowPlaceholder(false);
    setIsLoading(true);
    
    const menuIntro = `I'd like to order from our menu with ${menuItems.length} items`;
    setConversation([{ message: menuIntro, isAi: false }]);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const newConversation = customMenuConversation(menuItems);

      setConversation([{ message: menuIntro, isAi: false }]);
      
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

  const handleBusinessDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBusinessData(e.target.value);
  };

  const handleMenuTemplateClick = (template: "pizzaParlor" | "burgerShack" | "cafePastries") => {
    setMenuItems(menuTemplates[template]);
  };

  useEffect(() => {
    if (initialPrompt) {
      setBusinessData(initialPrompt);
      handleSubmit();
    }
  }, [initialPrompt, customMenu]);

  useEffect(() => {
    if (chatRef.current && conversation.length > 0 && activeTab === "chat") {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, activeTab]);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isMobile]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl overflow-hidden glass-morphism shadow-lg">
      <div className="bg-background p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="text-xs text-center font-medium ml-2 text-muted-foreground">
              AI Chat Assistant
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              {showSidebar ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
              {showSidebar ? "Hide Prompts" : "Show Prompts"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "chat" | "menu")}
        className="w-full"
      >
        <div className="bg-secondary/20 p-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="p-0">
          <ChatTabContent 
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            conversation={conversation}
            showPlaceholder={showPlaceholder}
            showSidebar={showSidebar}
            sidebarCollapsed={sidebarCollapsed}
            selectedPrompt={selectedPrompt}
            businessData={businessData}
            chatRef={chatRef}
            textareaRef={textareaRef}
            businessDataRef={businessDataRef}
            isMobile={isMobile}
            suggestedPrompts={suggestedPrompts}
            customerQuickPrompts={customerQuickPrompts}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            handleQuickPromptClick={handleQuickPromptClick}
            handlePromptSelect={handlePromptSelect}
            handleBusinessDataChange={handleBusinessDataChange}
            toggleSidebarCollapse={toggleSidebarCollapse}
            setSelectedPrompt={setSelectedPrompt}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </TabsContent>
        
        <TabsContent value="menu" className="p-0">
          <MenuTabContent 
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            handleAddItem={handleAddItem}
            handleMenuSubmit={handleMenuSubmit}
            handleMenuTemplateClick={handleMenuTemplateClick}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSimulation;
