
export type Conversation = {
  message: string;
  isAi: boolean;
  role?: "system" | "user" | "assistant" | "customer" | "demo";
}[];

export type MenuItem = {
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

export type ChatSimulationProps = {
  initialPrompt?: string;
  customMenu?: MenuItem[];
};

export type SuggestedPrompt = {
  id: string;
  title: string;
  prompt: string;
  demoConversation: Conversation;
  defaultInput: string;
};
