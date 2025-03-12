
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuggestedPrompt } from "@/types/chat";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  selectedPrompt: SuggestedPrompt | null;
  setSelectedPrompt: (prompt: SuggestedPrompt | null) => void;
}

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
  isLoading,
  textareaRef,
  selectedPrompt,
  setSelectedPrompt
}: ChatInputProps) => {
  return (
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
  );
};

export default ChatInput;
