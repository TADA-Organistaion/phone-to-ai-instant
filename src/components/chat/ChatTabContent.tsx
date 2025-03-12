
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Conversation, SuggestedPrompt } from "@/types/chat";
import { useIsMobile } from "@/hooks/use-mobile";
import SuggestedPromptsSidebar from "./SuggestedPromptsSidebar";
import BusinessDataSection from "./BusinessDataSection";
import QuickPromptsSection from "./QuickPromptsSection";
import ChatMessagesContainer from "./ChatMessagesContainer";
import ChatInput from "./ChatInput";

interface ChatTabContentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  conversation: Conversation;
  showPlaceholder: boolean;
  showSidebar: boolean;
  sidebarCollapsed: boolean;
  selectedPrompt: SuggestedPrompt | null;
  businessData: string;
  chatRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  businessDataRef: React.RefObject<HTMLTextAreaElement>;
  isMobile: boolean;
  suggestedPrompts: SuggestedPrompt[];
  customerQuickPrompts: string[];
  handleReset: () => void;
  handleSubmit: (e?: React.FormEvent) => void;
  handleQuickPromptClick: (promptText: string) => void;
  handlePromptSelect: (prompt: SuggestedPrompt) => void;
  handleBusinessDataChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  toggleSidebarCollapse: () => void;
  setSelectedPrompt: (prompt: SuggestedPrompt | null) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const ChatTabContent = ({
  inputValue,
  setInputValue,
  isLoading,
  conversation,
  showPlaceholder,
  showSidebar,
  sidebarCollapsed,
  selectedPrompt,
  businessData,
  chatRef,
  textareaRef,
  businessDataRef,
  isMobile,
  suggestedPrompts,
  customerQuickPrompts,
  handleReset,
  handleSubmit,
  handleQuickPromptClick,
  handlePromptSelect,
  handleBusinessDataChange,
  toggleSidebarCollapse,
  setSelectedPrompt,
  setSidebarCollapsed
}: ChatTabContentProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[550px] relative">
      <SuggestedPromptsSidebar
        showSidebar={showSidebar}
        sidebarCollapsed={sidebarCollapsed}
        selectedPrompt={selectedPrompt}
        suggestedPrompts={suggestedPrompts}
        onPromptSelect={handlePromptSelect}
        toggleSidebarCollapse={toggleSidebarCollapse}
        isMobile={isMobile}
      />
      
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
        
        <BusinessDataSection 
          businessData={businessData}
          onChange={handleBusinessDataChange}
          textareaRef={businessDataRef}
        />
        
        <QuickPromptsSection 
          customerQuickPrompts={customerQuickPrompts}
          onQuickPromptClick={handleQuickPromptClick}
        />
        
        <ChatMessagesContainer 
          chatRef={chatRef}
          conversation={conversation}
          isLoading={isLoading}
          selectedPrompt={selectedPrompt}
          showPlaceholder={showPlaceholder}
        />
        
        <ChatInput 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          textareaRef={textareaRef}
          selectedPrompt={selectedPrompt}
          setSelectedPrompt={setSelectedPrompt}
        />
      </div>
    </div>
  );
};

export default ChatTabContent;
