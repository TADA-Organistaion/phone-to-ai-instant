
import React from "react";
import { Pin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface BusinessDataSectionProps {
  businessData: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const BusinessDataSection = ({ businessData, onChange, textareaRef }: BusinessDataSectionProps) => {
  return (
    <div className="p-3 bg-secondary/10 border-b">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Pin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">Your Business Profile</span>
        </div>
        <div className="text-xs text-muted-foreground">This information is used by the AI to respond to customer queries</div>
      </div>
      <Textarea
        ref={textareaRef}
        value={businessData}
        onChange={onChange}
        placeholder="Add or update your business info (name, hours, menu items, policies, etc.)"
        className="text-xs resize-none bg-white/50 min-h-[60px] max-h-[100px] overflow-y-auto"
      />
      <div className="mt-2 text-xs text-muted-foreground">
        Add or edit your business info above to change how the AI responds to customer questions.
      </div>
    </div>
  );
};

export default BusinessDataSection;
