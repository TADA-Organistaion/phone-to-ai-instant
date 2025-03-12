
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "./ChatBubble";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw, Send, PanelLeftClose, PanelLeftOpen, PlusCircle, ChevronsLeft, ChevronsRight, Pin, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
      { message: "Hi, I'm looking to book a private room for 12 people next Friday. Is that possible?", isAi: false, role: "customer" },
      { message: "Yes, our private room seats up to 20, so 12 is no problem. For groups of 10 or more, there's a $50 deposit to secure the space. Does that sound okay?", isAi: true, role: "assistant" },
      { message: "Sure. Also, do you do catering for larger events? I might need food for a 30-person gathering next month.", isAi: false, role: "customer" },
      { message: "We do! We cater off-site events for 25+ guests, and we ask for a 48-hour notice to prepare everything. We also require a $100 deposit. Is your event date confirmed yet?", isAi: true, role: "assistant" },
      { message: "It's on the 15th. That's more than 48 hours away, so we should be good, right?", isAi: false, role: "customer" },
      { message: "Absolutely. If you can finalize your menu about 2 days before, we'll handle the rest. Anything else I can help with?", isAi: true, role: "assistant" },
      { message: "That's all, thanks!", isAi: false, role: "customer" },
    ],
    defaultInput: "1) We have a private room for up to 20 people, $50 deposit for parties of 10+.\n2) We cater off-site events for 25 or more guests, requiring a 48-hour notice and a $100 deposit."
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
    defaultInput: "We accept credit, debit, Apple Pay, or cash on pickup. No extra fees unless it's international. Turkey burger $6.50, garden salad $4.00."
  }
];

const customerQuickPrompts = [
  "What time do you close today?",
  "Do you have any gluten-free options?",
  "Can I place an order for delivery?",
  "What are your most popular dishes?",
  "Do you have any specials today?",
  "Is there a wait time right now?",
  "Do you take reservations?"
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
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof suggestedPrompts[0] | null>(null);
  const [businessData, setBusinessData] = useState<string>(initialPrompt || "We are a family-owned burger restaurant. We're open Mon-Sat 11am-10pm, Sun 12pm-8pm. We offer delivery within 5 miles for orders over $20. We have gluten-free buns available for $1 extra. Our bestseller is the Classic Cheeseburger ($12).");
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const businessDataRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  
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

  const handlePromptSelect = (prompt: typeof suggestedPrompts[0]) => {
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
          {/* Changed from fixed height to a min-height to allow for dynamic expansion */}
          <div className="flex flex-col md:flex-row min-h-[550px] relative">
            {showSidebar && (
              <div 
                className={cn(
                  "border-r bg-secondary/5 overflow-auto transition-all duration-300",
                  isMobile 
                    ? sidebarCollapsed 
                      ? "hidden"
                      : "w-full h-auto p-4 order-2" 
                    : sidebarCollapsed 
                      ? "w-10 min-w-10 flex flex-col items-center" 
                      : "w-80 p-4"
                )}
              >
                {!isMobile && sidebarCollapsed ? (
                  <div className="flex flex-col items-center w-full">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleSidebarCollapse}
                      className="p-1 h-auto w-full rounded-none"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-sm">
                        {!isMobile && "Suggested Prompts"}
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleSidebarCollapse}
                        className="p-1 h-6 w-6"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                    </div>
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
                  </>
                )}
              </div>
            )}
            
            <div className={cn(
                "flex-1 flex flex-col",
                isMobile && "order-1"
              )}
            >
              {isMobile && (
                <div className="flex justify-center p-2 border-b">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSidebarCollapse}
                    className="text-xs w-full flex justify-center items-center gap-1"
                  >
                    {sidebarCollapsed ? "Show Prompts" : "Hide Prompts"}
                    {sidebarCollapsed ? <ChevronsRight className="h-3 w-3" /> : <ChevronsLeft className="h-3 w-3" />}
                  </Button>
                </div>
              )}
              
              {/* Business Data - Pinned section */}
              <div className="p-3 bg-secondary/10 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Pin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium">Your Business Profile</span>
                  </div>
                  <div className="text-xs text-muted-foreground">This information is used by the AI to respond to customer queries</div>
                </div>
                <Textarea
                  ref={businessDataRef}
                  value={businessData}
                  onChange={handleBusinessDataChange}
                  placeholder="Add or update your business info (name, hours, menu items, policies, etc.)"
                  className="text-xs resize-none bg-white/50 min-h-[60px] max-h-[100px] overflow-y-auto"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Add or edit your business info above to change how the AI responds to customer questions.
                </div>
              </div>
              
              {/* Quick prompt bubbles */}
              <div className="p-3 border-b overflow-x-auto">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">Common Customer Questions</span>
                </div>
                <div className="flex gap-2 pb-1 flex-wrap">
                  {customerQuickPrompts.map((prompt, index) => (
                    <Button 
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs whitespace-nowrap"
                      onClick={() => handleQuickPromptClick(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Modified to have auto height instead of fixed height with internal scrolling */}
              <div 
                ref={chatRef}
                className={cn(
                  "flex flex-col p-4",
                  conversation.length === 0 && "justify-center items-center min-h-[300px]"
                )}
              >
                {selectedPrompt && conversation.length === 0 && (
                  <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-sm">{selectedPrompt.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{selectedPrompt.prompt}</p>
                  </div>
                )}
                
                {conversation.length > 0 || !showPlaceholder ? (
                  <>
                    {conversation.map((message, index) => renderMessage(message, index, index * 500))}
                    {isLoading && (
                      <div className="self-start bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm px-4 py-3 animate-pulse max-w-[85%] md:max-w-[70%]">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
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
                
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      placeholder="Act as a customer—ask a question"
                      className="flex-1 py-3 px-4 rounded-lg min-h-[80px] max-h-[150px] overflow-y-auto resize-none pr-14"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      className={cn(
                        "absolute bottom-3 right-3 p-2 rounded-full",
                        isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-dark transition-colors"
                      )}
                      disabled={isLoading}
                      size="icon"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center w-5 h-5">
                          <span className="flex gap-1">
                            <span className="h-1 w-1 bg-current rounded-full animate-bounce"></span>
                            <span className="h-1 w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                            <span className="h-1 w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                          </span>
                        </span>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Shift + Enter for a new line. Press Enter to send.
                  </p>
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
