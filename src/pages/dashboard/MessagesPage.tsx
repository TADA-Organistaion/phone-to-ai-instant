
import { useState } from "react";
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Circle, Filter } from "lucide-react";

type VipTier = "all" | "platinum" | "gold" | "silver" | "bronze";

type Message = {
  id: string;
  senderName: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
};

const MessagesPage = () => {
  const [aiMode, setAiMode] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<VipTier>("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Sample messages data
  const messages: Message[] = [
    {
      id: "1",
      senderName: "Alex Thompson",
      tier: "platinum",
      lastMessage: "Do you have any special offers this weekend?",
      timestamp: "10 min ago",
      isRead: false,
    },
    {
      id: "2",
      senderName: "Jamie Rodriguez",
      tier: "gold",
      lastMessage: "I'd like to reserve a table for 4 people tomorrow.",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: "3",
      senderName: "Taylor Kim",
      tier: "silver",
      lastMessage: "Are you open on holidays?",
      timestamp: "Yesterday",
      isRead: true,
    },
    {
      id: "4",
      senderName: "Jordan Lee",
      tier: "bronze",
      lastMessage: "What time do you close today?",
      timestamp: "2 days ago",
      isRead: true,
    },
    {
      id: "5",
      senderName: "Casey Morgan",
      tier: "platinum",
      lastMessage: "Do you have dairy-free options?",
      timestamp: "3 days ago",
      isRead: true,
    },
  ];

  const filteredMessages = messages.filter(
    message => currentFilter === "all" || message.tier === currentFilter
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-gray-300";
      case "gold":
        return "bg-yellow-400";
      case "silver":
        return "bg-gray-400";
      case "bronze":
        return "bg-amber-700";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>

          <div className="flex items-center space-x-2">
            <Label htmlFor="ai-mode" className="font-medium">
              AI Mode
            </Label>
            <Switch
              id="ai-mode"
              checked={aiMode}
              onCheckedChange={setAiMode}
            />
          </div>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {aiMode ? "AI Mode: On - Automated responses enabled" : "AI Mode: Off - Human responses only"}
              </p>
              
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter: {currentFilter === "all" ? "All" : currentFilter}</span>
                </Button>
                
                <div className="relative ml-2">
                  <select
                    value={currentFilter}
                    onChange={(e) => setCurrentFilter(e.target.value as VipTier)}
                    className="appearance-none bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  >
                    <option value="all">All</option>
                    <option value="platinum">Platinum</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`p-4 border rounded-lg flex items-start gap-3 ${!message.isRead ? "bg-secondary/20" : ""}`}
                  >
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${getTierColor(message.tier)}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">
                          {message.senderName}
                          <span className="text-xs font-normal ml-2 capitalize text-muted-foreground">
                            {message.tier}
                          </span>
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {message.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {!message.isRead && (
                          <span className="inline-flex h-2 w-2 mr-1 rounded-full bg-primary" />
                        )}
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No messages in this filter
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="bg-secondary/20 p-4 rounded-lg space-y-4">
              <h3 className="font-medium">Response Settings</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Mode</p>
                  <p className="text-sm text-muted-foreground">Enable automatic AI responses</p>
                </div>
                <Switch
                  checked={aiMode}
                  onCheckedChange={setAiMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response-time" className="text-sm">Maximum Response Time</Label>
                <select
                  id="response-time"
                  className="w-full bg-background border border-input rounded-md px-3 py-2"
                >
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="120">2 minutes</option>
                  <option value="300">5 minutes</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  AI will handle conversations if team members don't respond within this time
                </p>
              </div>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">VIP Customer Priority</h3>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  {showAllCategories ? "Hide Categories" : "See All Categories"}
                </Button>
              </div>

              <div className="space-y-3">
                {(["platinum", "gold", "silver", "bronze"] as const).map((tier) => (
                  <div key={tier} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTierColor(tier)}`} />
                      <span className="capitalize">{tier}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tier === "platinum" ? "Immediate" : 
                       tier === "gold" ? "Within 2 min" : 
                       tier === "silver" ? "Within 5 min" : 
                       "Within 10 min"}
                    </div>
                  </div>
                ))}
              </div>
              
              {showAllCategories && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-3 text-sm">Additional Analytics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Purchases:</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Purchase:</span>
                      <span className="font-medium">$78.32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Orders:</span>
                      <span className="font-medium">892</span>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                Response priority based on customer loyalty tier
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessDashboardLayout>
  );
};

export default MessagesPage;
