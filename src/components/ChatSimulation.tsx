import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "./ChatBubble";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw, ArrowUp, Send, PanelLeftClose, PanelLeftOpen, PlusCircle } from "lucide-react";

type Conversation = {
  message: string;
  isAi: boolean;
  role?: "system" | "user" | "assistant" | "customer" | "demo";
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

const menuTemplates = {
  pizzaParlor: [
    {
      name: "Margherita Pizza",
      price: 10,
      description: "Tomatoes, basil, mozzarella.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Pepperoni Pizza",
      price: 11,
      description: "Pepperoni and extra cheese.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Garlic Knots",
      price: 5,
      description: "Freshly baked with garlic butter.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Caesar Salad",
      price: 7,
      description: "Romaine lettuce, croutons, parmesan.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: true,
      },
    },
  ],
  burgerShack: [
    {
      name: "Classic Burger",
      price: 6,
      description: "100% beef patty.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Cheeseburger",
      price: 7,
      description: "American cheese, lettuce, tomato.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Fries",
      price: 3,
      description: "Crispy golden fries.",
      dietaryInfo: {
        vegan: true,
        glutenFree: true,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Onion Rings",
      price: 4,
      description: "Battered onion rings.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: true,
      },
    },
  ],
  cafePastries: [
    {
      name: "Espresso",
      price: 4,
      description: "Rich, concentrated coffee.",
      dietaryInfo: {
        vegan: true,
        glutenFree: true,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Latte",
      price: 5,
      description: "Steamed milk, optional flavor shots.",
      dietaryInfo: {
        vegan: false,
        glutenFree: true,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Croissant",
      price: 3,
      description: "Buttery French pastry.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Blueberry Muffin",
      price: 2.5,
      description: "Made with real blueberries.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
  ],
};

const suggestedPrompts = [
  {
    id: "daily-specials",
    title: "Daily Specials & Hours",
    prompt: "Describe your daily specials and what time you open/close. Insert your actual details here (e.g., 'We have a $9.99 lunch combo from 11 AM–2 PM, and close at 9 PM.'). Then see how the AI would respond to a customer asking about specials or closing time.",
    demoConversation: [
      { message: "What specials do you have today?", isAi: false, role: "customer" },
      { message: "We offer a $9.99 Lunch Combo from 11 AM to 2 PM—includes a sandwich, fries, and a drink. After 5 PM, appetizers are half-price. Would you like to hear our most popular app?", isAi: true, role: "assistant" },
      { message: "Yes, please. Also, how late are you open?", isAi: false, role: "customer" },
      { message: "We're open until 9 PM on weekdays. One popular app is our loaded potato skins—usually $6, but you can get them for $3 after 5 PM!", isAi: true, role: "assistant" },
      { message: "Perfect! I'll stop by before you close.", isAi: false, role: "customer" },
    ],
    defaultInput: "We open at 11 AM, close at 9 PM on weekdays, and run a $9.99 lunch combo from 11 to 2. Also do half-price apps after 5 PM."
  },
  {
    id: "delivery-process",
    title: "Delivery Process",
    prompt: "Describe your delivery area, average times, fees, minimum order, surcharges, etc. Insert them here (e.g., '5-mile radius, $3 fee under $20, free over $20, 30–40 min avg'). Let's see how AI handles a phone-like conversation.",
    demoConversation: [
      { message: "Do you deliver to Maple Street, about 4 miles away?", isAi: false, role: "customer" },
      { message: "Yes, that's within our 6-mile zone. Delivery is $4 if your order's under $25, or free if it's $25 or more. We usually arrive in about 30–45 minutes.", isAi: true, role: "assistant" },
      { message: "Got it. Any minimum order?", isAi: false, role: "customer" },
      { message: "Yes, we ask for a $10 minimum. Orders below $10 incur a $2 small-order fee.", isAi: true, role: "assistant" },
      { message: "Okay, I'll keep that in mind—thanks!", isAi: false, role: "customer" },
    ],
    defaultInput: "We deliver up to 6 miles, $4 fee if under $25, free otherwise, takes 30–45 minutes typically. $10 minimum order or $2 surcharge if under $10."
  },
  {
    id: "refund-policy",
    title: "Refund or Order Change Policies",
    prompt: "Write a summary of your refund or order-change policy (e.g., '15-min cancellation window, refunds in 3–5 days if we haven't started cooking'). Then watch how the AI explains it to a customer.",
    demoConversation: [
      { message: "I placed an order 10 minutes ago. Can I cancel?", isAi: false, role: "customer" },
      { message: "Sure! We have a 15-minute cancellation window, provided we haven't started cooking. Let me check… Great, we haven't begun prep, so we'll cancel and refund you in 3–5 business days.", isAi: true, role: "assistant" },
      { message: "Thanks, that's a relief.", isAi: false, role: "customer" },
      { message: "Absolutely—if you change your mind later, we'll be here to help!", isAi: true, role: "assistant" },
    ],
    defaultInput: "Cancellations allowed within 15 minutes if cooking hasn't started. Refunds in 3–5 business days. If the order is already prepped, we can only do partial refunds."
  },
  {
    id: "allergen-info",
    title: "Allergen & Gluten-Free Info",
    prompt: "List some popular menu items with allergens or diet-friendly options (e.g., gluten-free bun, vegan cheese). Insert actual info here, then we'll see how AI handles allergen/diet calls.",
    demoConversation: [
      { message: "Do you have gluten-free burger buns?", isAi: false, role: "customer" },
      { message: "Yes! We can serve your burger on a gluten-free bun for $1 extra, and our fries are cooked in a separate fryer. We minimize cross-contamination for those with celiac.", isAi: true, role: "assistant" },
      { message: "Perfect. Anything vegan-friendly?", isAi: false, role: "customer" },
      { message: "We have a Vegan Tofu Wrap with grilled veggies and dairy-free sauce. Would you like more ingredient details?", isAi: true, role: "assistant" },
      { message: "I'm good—thanks for the info.", isAi: false, role: "customer" },
    ],
    defaultInput: "Our burger can be done with a gluten-free bun ($1 extra), and our fries are cooked in separate oil for no cross-contamination. We also have a vegan wrap with tofu."
  },
  {
    id: "common-inquiries",
    title: "Common Customer Inquiries",
    prompt: "Type 2–3 frequent phone questions (e.g., 'Can I book a party of 12?'). Insert them, and the AI will demonstrate phone-call replacement with your specifics.",
    demoConversation: [
      { message: "Do you have outdoor seating for 8 people?", isAi: false, role: "customer" },
      { message: "Yes, our patio can seat up to 10 comfortably. We do recommend calling or chatting ahead if you plan to come during peak dinner hours.", isAi: true, role: "assistant" },
      { message: "Also, can I preorder for pickup at 2 PM?", isAi: false, role: "customer" },
      { message: "Absolutely! Just let us know your order by 1:30 PM, and we'll have it ready by 2 PM. That way, no waiting when you arrive.", isAi: true, role: "assistant" },
      { message: "That's super convenient. Thanks!", isAi: false, role: "customer" },
    ],
    defaultInput: "1) 'Do you have outdoor seating for a group of 8?'\n2) 'Can I preorder for pickup at 2 PM?'"
  },
  {
    id: "payments-checkout",
    title: "Payments & Checkout (Expanded Order Flow)",
    prompt: "Describe how you handle payments (credit, debit, contactless, cash) plus any fees. Then let's see how AI handles a full order scenario—like 2 turkey burgers and a salad—through to payment and kitchen notification.",
    demoConversation: [
      { message: "Hey, can I order 2 turkey burgers with a garden salad—balsamic on the side?", isAi: false, role: "customer" },
      { message: "Of course! That's 2 turkey burgers ($6.50 each) + 1 garden salad with balsamic ($4.00). Subtotal: $17. Is that correct?", isAi: true, role: "assistant" },
      { message: "Yes, that's right.", isAi: false, role: "customer" },
      { message: "We accept credit, debit, Apple Pay, or cash at pickup. Any preference?", isAi: true, role: "assistant" },
      { message: "I'll pay online with a credit card.", isAi: false, role: "customer" },
      { message: "Great—[mock payment flow] Payment confirmed at $17 + tax = $18.53 total. Thanks! Your order is being prepared now.", isAi: true, role: "assistant" },
      { message: "Kitchen notified: 2 turkey burgers, 1 garden salad, order #201. Estimated ready in ~15 minutes.", isAi: true, role: "system" },
      { message: "Awesome, I'll come by soon.", isAi: false, role: "customer" },
      { message: "Perfect. We'll let you know when it's ready for pickup!", isAi: true, role: "assistant" },
    ],
    defaultInput: "We accept credit, debit, Apple Pay, or cash on pickup. No extra fees unless it's international. Let's do a scenario with 2 turkey burgers, 1 salad, etc."
  }
];

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
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof suggestedPrompts[0] | null>(null);
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
    setSelectedPrompt(null);
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
    
    if (inputValue.trim() === "" && !initialPrompt && !selectedPrompt) return;

    setShowPlaceholder(false);
    setIsLoading(true);
    
    let userInput = inputValue.trim() || initialPrompt || "I run a small burger shack";
    
    // If we have a selected prompt, use the demo conversation
    if (selectedPrompt) {
      setConversation([{ message: userInput, isAi: false, role: "user" }]);
      setInputValue("");

      // Simulate AI thinking
      setTimeout(() => {
        setIsLoading(false);
        
        // Add AI responses with delays for natural feel
        setConversation([{ message: userInput, isAi: false, role: "user" }]);
        
        let currentDelay = 800;
        for (let i = 0; i < selectedPrompt.demoConversation.length; i++) {
          const message = selectedPrompt.demoConversation[i];
          const delay = message.isAi ? 1500 : 800;
          
          setTimeout(() => {
            setConversation(prev => [...prev, message]);
          }, currentDelay);
          
          currentDelay += delay;
        }
      }, 1500);
      
      return;
    }
    
    // Default conversation flow
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

  const handlePromptSelect = (prompt: typeof suggestedPrompts[0]) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt.defaultInput);
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

  const handleMenuTemplateClick = (template: "pizzaParlor" | "burgerShack" | "cafePastries") => {
    setMenuItems(menuTemplates[template]);
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

  const renderMessage = (message: Conversation[0], index: number, delay: number) => {
    if (message.role === "system") {
      return (
        <div
          key={index}
          className={cn(
            "max-w-[85%] md:max-w-[70%] mx-auto mb-4 opacity-0 text-center",
            "animate-chat-bubble-in"
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          <div className="rounded-lg px-4 py-2 bg-muted/50 text-muted-foreground text-sm italic">
            {message.message}
          </div>
        </div>
      );
    }
    
    return (
      <ChatBubble 
        key={index} 
        message={message.message} 
        isAi={message.isAi} 
        index={index}
        delay={delay}
      />
    );
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
          <div className="flex h-[550px]">
            {showSidebar && (
              <div className="w-80 border-r bg-secondary/5 overflow-auto p-4">
                <h3 className="font-medium text-sm mb-3">Suggested Prompts</h3>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt) => (
                    <div 
                      key={prompt.id} 
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors",
                        selectedPrompt?.id === prompt.id 
                          ? "bg-secondary/20 border-primary/30" 
                          : "hover:bg-secondary/10"
                      )}
                      onClick={() => handlePromptSelect(prompt)}
                    >
                      <h4 className="font-medium text-sm">{prompt.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prompt.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex-1 flex flex-col">
              <div 
                ref={chatRef}
                className={cn(
                  "flex flex-col p-4 flex-1 overflow-y-auto",
                  conversation.length === 0 && "justify-center items-center"
                )}
              >
                {selectedPrompt && conversation.length === 0 && (
                  <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-sm">{selectedPrompt.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{selectedPrompt.prompt}</p>
                  </div>
                )}
                
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
                    {conversation.map((message, index) => renderMessage(message, index, index * 500))}
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
              
              <div className="border-t p-4">
                {selectedPrompt && (
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Demo: {selectedPrompt.title}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedPrompt(null)}
                      className="text-xs h-6 px-2"
                    >
                      Clear Demo
                    </Button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex items-center">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={selectedPrompt 
                      ? "Describe your specific details here..."
                      : "Type a message or select a prompt from the sidebar"
                    }
                    className="flex-1 py-2 px-3 rounded-l-lg border-r-0 focus:ring-0"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className={cn(
                      "bg-brand text-white py-2 px-4 h-10 rounded-r-lg font-medium text-sm",
                      isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-dark transition-colors"
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="mr-2">Thinking</span>
                        <span className="flex gap-1">
                          <span className="h-1 w-1 bg-white rounded-full animate-bounce"></span>
                          <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                          <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </span>
                      </span>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
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
            
            <div className="border-t pt-4 mt-4">
              <div className="text-center mb-4">
                <h3 className="text-sm font-medium">One-Tap Prompt Templates</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Quickly try a demo with pre-populated menu items
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-auto py-3 flex flex-col items-center"
                  onClick={() => handleMenuTemplateClick("pizzaParlor")}
                >
                  <span className="text-base mb-1">🍕</span>
                  Pizza Parlor
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-auto py-3 flex flex-col items-center"
                  onClick={() => handleMenuTemplateClick("burgerShack")}
                >
                  <span className="text-base mb-1">🍔</span>
                  Burger Shack
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-auto py-3 flex flex-col items-center"
                  onClick={() => handleMenuTemplateClick("cafePastries")}
                >
                  <span className="text-base mb-1">☕</span>
                  Cafe & Pastries
                </Button>
              </div>
              
              <div className="text-center mt-3">
                <Button 
                  className="bg-brand hover:bg-brand-dark text-white text-sm mt-2 w-full"
                  onClick={handleMenuSubmit}
                  disabled={menuItems.length === 0}
                >
                  I'm Done—Show My Demo
                </Button>
              </div>
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
