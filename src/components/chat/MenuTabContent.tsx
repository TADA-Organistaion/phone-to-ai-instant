
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuItem } from "@/types/chat";

interface MenuTabContentProps {
  currentItem: MenuItem;
  setCurrentItem: (item: MenuItem) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  handleAddItem: () => void;
  handleMenuSubmit: () => void;
  handleMenuTemplateClick: (template: "pizzaParlor" | "burgerShack" | "cafePastries") => void;
}

const MenuTabContent = ({
  currentItem,
  setCurrentItem,
  menuItems,
  setMenuItems,
  handleAddItem,
  handleMenuSubmit,
  handleMenuTemplateClick
}: MenuTabContentProps) => {
  return (
    <div className="p-4 space-y-4">
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
    </div>
  );
};

export default MenuTabContent;
