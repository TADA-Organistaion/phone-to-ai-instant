import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "./ChatBubble";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw, ArrowUp } from "lucide-react";

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

type MenuItem = {
  name: string;
  price: number;
  description?: string;
  dietaryInfo?: {
    vegan: boolean;
    glutenFree: boolean;
    eggFree: boolean;
    dairyFree: boolean;
  };
};

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
  const chatRef = useRef<HTMLDivElement>(null);

  const defaultConversation: Conversation = [
    { message: "I want 2 cheeseburgers and fries.", isAi: false },
    { message: "Great! I've added 2 cheeseburgers ($10) and 1 fries ($4) to your order. Your total is $14. Would you like to proceed to payment?", isAi: true },
    { message: "Yes, please!", isAi: false },
    { message: "Payment confirmed. Thank you! Your order #137 will be ready in 10 minutes. You'll receive a text notification when it's ready for pickup.", isAi: true },
  ];

  const helperPromptConversation: Conversation = [
    { message: "I run a small coffee shop that gets constant calls about hours, location, and whether we offer free Wi-Fi. Show me how SmartChat can handle these questions automatically!", isAi: false },
    { message: "I'd be happy to help with your coffee shop inquiries. I'm loading your knowledge base now with information about hours, location, Wi-Fi policy, and pet policy...", isAi: true },
    { message: "Hey, what time do you open on weekdays?", isAi: false },
    { message: "We open at 7:00 AM on weekdays and close at 7:00 PM. On weekends, our hours are 8:00 AM to 5:00 PM.", isAi: true },
    { message: "Great, where are you located?", isAi: false },
    { message: "We're at 123 Main Street, near the public library. There's free parking across the street!", isAi: true },
    { message: "Do you have free Wi-Fi?", isAi: false },
    { message: "Yes, we offer free Wi-Fi—ask for the password at the counter. Anything else I can help with?", isAi: true },
    { message: "Are you dog-friendly?", isAi: false },
    { message: "We do allow dogs on our outdoor patio, but not indoors, unless they're service animals.", isAi: true },
    { message: "Thanks, that's everything!", isAi: false },
    { message: "Happy to help! Have a great day.", isAi: true },
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

  const handleReset = () => {
    setConversation([]);
    setInputValue("");
    setShowPlaceholder(true);
    setIsLoading(false);
  };
  
  const handleHelperPrompt = () => {
    setShowPlaceholder(false);
    setIsLoading(true);
    
    // Set first message
    setConversation([helperPromptConversation[0]]);
    
    // Simulate AI thinking
    setTimeout(() => {
      setIsLoading(false);
      
      // Add rest of conversation with delays
      let currentDelay = 800;
      for (let i = 1; i < helperPromptConversation.length; i++) {
        const message = helperPromptConversation[i];
        const delay = message.isAi ? 1500 : 800;
        
        setTimeout(() => {
          setConversation(prev => [...prev, message]);
        }, currentDelay);
        
        currentDelay += delay;
      }
    }, 1500);
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
    
    // Simulate AI thinking
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine which conversation to use
      const newConversation = customMenuConversation(menuItems);

      // Set first user message
      setConversation([{ message: menuIntro, isAi: false }]);
      
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
    if (chatRef.current && conversation.length > 0 && activeTab === "chat") {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, activeTab]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden glass-morphism shadow-lg">
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
          <div 
            ref={chatRef}
            className={cn(
              "flex flex-col p-4 h-[420px] md:h-[480px] overflow-y-auto",
              conversation.length === 0 && "justify-center items-center"
            )}
          >
            {conversation.length === 0 && showPlaceholder ? (
              <div className="text-center max-w-md animate-fade-in space-y-4">
                <div className="text-muted-foreground text-sm mb-2">Type a message to start the demo or use a helper prompt</div>
                <div className="text-xs text-muted-foreground/70">Example: "I run a small burger shack..."</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleHelperPrompt}
                  className="mt-4"
                >
                  Helper Prompt
                </Button>
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
                  "bg-brand text-white py-2 px-4 rounded-r-lg font-medium text-sm flex items-center justify-center",
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-dark transition-colors"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Thinking..." : <ArrowUp className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="menu" className="p-4 space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium">Show Us Your Top Dishes</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add up to 10 of your menu items to preview our AI ordering flow. Want the full experience? Sign up for free in seconds.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item-name" className="text-sm font-medium mb-2 block">
                  Item Name
                </Label>
                <Input 
                  id="item-name" 
                  placeholder="Cheeseburger" 
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="item-price" className="text-sm font-medium mb-2 block">
                  Price ($)
                </Label>
                <Input 
                  id="item-price" 
                  type="number" 
                  placeholder="9.99" 
                  value={currentItem.price || ""}
                  onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="item-desc" className="text-sm font-medium mb-2 block">
                Description (optional)
              </Label>
              <Textarea 
                id="item-desc" 
                placeholder="Delicious burger with cheese, lettuce, tomato" 
                className="resize-none"
                value={currentItem.description}
                onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Dietary Information (optional)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vegan" 
                    checked={currentItem.dietaryInfo?.vegan}
                    onCheckedChange={(checked) => 
                      setCurrentItem({
                        ...currentItem, 
                        dietaryInfo: { 
                          ...currentItem.dietaryInfo!, 
                          vegan: checked as boolean 
                        }
                      })
                    }
                  />
                  <Label htmlFor="vegan" className="text-sm">Vegan</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gluten-free" 
                    checked={currentItem.dietaryInfo?.glutenFree}
                    onCheckedChange={(checked) => 
                      setCurrentItem({
                        ...currentItem, 
                        dietaryInfo: { 
                          ...currentItem.dietaryInfo!, 
                          glutenFree: checked as boolean 
                        }
                      })
                    }
                  />
                  <Label htmlFor="gluten-free" className="text-sm">Gluten-free</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="egg-free" 
                    checked={currentItem.dietaryInfo?.eggFree}
                    onCheckedChange={(checked) => 
                      setCurrentItem({
                        ...currentItem, 
                        dietaryInfo: { 
                          ...currentItem.dietaryInfo!, 
                          eggFree: checked as boolean 
                        }
                      })
                    }
                  />
                  <Label htmlFor="egg-free" className="text-sm">Egg-free</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dairy-free" 
                    checked={currentItem.dietaryInfo?.dairyFree}
                    onCheckedChange={(checked) => 
                      setCurrentItem({
                        ...currentItem, 
                        dietaryInfo: { 
                          ...currentItem.dietaryInfo!, 
                          dairyFree: checked as boolean 
                        }
                      })
                    }
                  />
                  <Label htmlFor="dairy-free" className="text-sm">Dairy-free</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handleAddItem}
                disabled={!currentItem.name || currentItem.price <= 0 || menuItems.length >= 10}
              >
                Add Item ({menuItems.length}/10)
              </Button>
              
              <Button 
                className="bg-brand hover:bg-brand-dark text-white"
                onClick={handleMenuSubmit}
                disabled={menuItems.length === 0}
              >
                Generate Demo
              </Button>
            </div>
            
            {menuItems.length > 0 && (
              <div className="mt-4 rounded-lg border p-3 max-h-48 overflow-y-auto">
                <h4 className="font-medium text-sm mb-2">Your Menu Items:</h4>
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2 text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-2 text-muted-foreground">${item.price}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive/80 h-7 px-2"
                        onClick={() => setMenuItems(menuItems.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSimulation;




