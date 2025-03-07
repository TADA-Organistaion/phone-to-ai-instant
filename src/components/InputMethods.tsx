
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ChatSimulation from "./ChatSimulation";
import { cn } from "@/lib/utils";

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

const InputMethods = () => {
  const [businessDescription, setBusinessDescription] = useState("");
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
  const [activeDemo, setActiveDemo] = useState<"description" | "menu" | null>(null);

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

  const generateDescriptionDemo = () => {
    if (businessDescription.trim() === "") return;
    setActiveDemo("description");
  };

  const generateMenuDemo = () => {
    if (menuItems.length === 0) return;
    setActiveDemo("menu");
  };

  return (
    <section id="demo" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your Custom Demo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose one of two ways to see AI in action with your specific business
          </p>
        </div>

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="description">One-Sentence Description</TabsTrigger>
            <TabsTrigger value="menu">Quick Menu Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-8">
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <Label htmlFor="business-desc" className="text-lg font-medium mb-4 block">
                Describe your business in one sentence
              </Label>
              <div className="flex flex-col md:flex-row gap-4">
                <Textarea
                  id="business-desc"
                  placeholder="I run a small burger shack with 5 burgers, 2 sides, and a milkshake menu. Show me AI ordering!"
                  className="flex-1 resize-none"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                />
                <Button 
                  className="bg-brand hover:bg-brand-dark text-white"
                  onClick={generateDescriptionDemo}
                  disabled={!businessDescription.trim()}
                >
                  Generate Demo
                </Button>
              </div>
            </div>
            
            {activeDemo === "description" && (
              <div className="animate-fade-in">
                <ChatSimulation initialPrompt={businessDescription} />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="menu" className="space-y-8">
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <Label className="text-lg font-medium mb-4 block">
                  Create your menu (up to 10 items)
                </Label>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="item-name" className="mb-2 block">Item Name</Label>
                    <Input 
                      id="item-name" 
                      placeholder="Cheeseburger" 
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="item-price" className="mb-2 block">Price ($)</Label>
                    <Input 
                      id="item-price" 
                      type="number" 
                      placeholder="9.99" 
                      value={currentItem.price || ""}
                      onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="item-desc" className="mb-2 block">Description (optional)</Label>
                  <Textarea 
                    id="item-desc" 
                    placeholder="Delicious burger with cheese, lettuce, tomato and our special sauce" 
                    className="resize-none"
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                  />
                </div>
                
                <div className="mb-6">
                  <Label className="mb-2 block">Dietary Information (optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    onClick={generateMenuDemo}
                    disabled={menuItems.length === 0}
                  >
                    Generate Demo from Menu
                  </Button>
                </div>
                
                {menuItems.length > 0 && (
                  <div className="mt-6 rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Your Menu Items:</h4>
                    <ul className="space-y-2">
                      {menuItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="ml-2 text-muted-foreground">${item.price}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive/80"
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
              
              {activeDemo === "menu" && (
                <div className="animate-fade-in">
                  <ChatSimulation customMenu={menuItems} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InputMethods;
