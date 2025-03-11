
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ChatBubbleProps = {
  message: string;
  isAi: boolean;
  delay?: number;
  index: number;
};

const ChatBubble = ({ message, isAi, delay = 0, index }: ChatBubbleProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "max-w-[85%] md:max-w-[70%] mb-4 opacity-0",
        visible && "animate-chat-bubble-in",
        isAi ? "self-start" : "self-end"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-sm",
          isAi
            ? "bg-secondary text-secondary-foreground rounded-tl-sm dark:bg-gray-700 dark:text-gray-100 dark:border dark:border-gray-600"
            : "bg-brand text-white rounded-tr-sm"
        )}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
      <div
        className={cn(
          "text-xs text-muted-foreground mt-1",
          isAi ? "text-left ml-2" : "text-right mr-2",
          "dark:text-gray-400"
        )}
      >
        {isAi ? "AI Agent" : "Customer"}
      </div>
    </div>
  );
};

export default ChatBubble;
