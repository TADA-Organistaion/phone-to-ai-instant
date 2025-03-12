
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuggestedPrompt } from "@/types/chat";
import { useIsMobile } from "@/hooks/use-mobile";

interface SuggestedPromptsSidebarProps {
  showSidebar: boolean;
  sidebarCollapsed: boolean;
  selectedPrompt: SuggestedPrompt | null;
  suggestedPrompts: SuggestedPrompt[];
  onPromptSelect: (prompt: SuggestedPrompt) => void;
  toggleSidebarCollapse: () => void;
  isMobile: boolean;
}

const SuggestedPromptsSidebar = ({
  showSidebar,
  sidebarCollapsed,
  selectedPrompt,
  suggestedPrompts,
  onPromptSelect,
  toggleSidebarCollapse,
  isMobile
}: SuggestedPromptsSidebarProps) => {
  if (!showSidebar) return null;

  return (
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
                onClick={() => onPromptSelect(prompt)}
              >
                <h4 className="font-medium text-sm">{prompt.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prompt.prompt}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SuggestedPromptsSidebar;
