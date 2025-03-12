
import React from "react";
import { cn } from "@/lib/utils";
import ChatBubble from "../ChatBubble";
import { Conversation, SuggestedPrompt } from "@/types/chat";

interface ChatMessagesContainerProps {
  chatRef: React.RefObject<HTMLDivElement>;
  conversation: Conversation;
  isLoading: boolean;
  selectedPrompt: SuggestedPrompt | null;
  showPlaceholder: boolean;
}

const ChatMessagesContainer = ({
  chatRef,
  conversation,
  isLoading,
  selectedPrompt,
  showPlaceholder
}: ChatMessagesContainerProps) => {
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
  );
};

export default ChatMessagesContainer;
