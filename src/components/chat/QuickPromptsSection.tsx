
import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickPromptsSectionProps {
  customerQuickPrompts: string[];
  onQuickPromptClick: (prompt: string) => void;
}

const QuickPromptsSection = ({ customerQuickPrompts, onQuickPromptClick }: QuickPromptsSectionProps) => {
  return (
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
            onClick={() => onQuickPromptClick(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickPromptsSection;
