
import { MenuItem, Conversation } from "@/types/chat";

export const customMenuConversation = (menu: MenuItem[] | undefined): Conversation => {
  if (!menu || menu.length === 0) {
    return defaultConversation;
  }
  
  const items = menu.slice(0, 3); // Take max 3 items for the demo
  const itemNames = items.map(item => item.name).join(", ");
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return [
    { message: `I'd like to order ${itemNames}.`, isAi: false },
    { message: `Great choice! I've added ${items.map(item => `${item.name} ($${item.price})`).join(", ")} to your order. Your total is $${total}. Would you like to proceed to payment?`, isAi: true },
    { message: "Yes, please!", isAi: false },
    { message: `Payment confirmed. Thank you! Your order #138 will be ready in 10 minutes. You'll receive a text notification when it's ready for pickup.`, isAi: true },
  ];
};

export const defaultConversation: Conversation = [
  { message: "I want 2 cheeseburgers and fries.", isAi: false },
  { message: "Great! I've added 2 cheeseburgers ($10) and 1 fries ($4) to your order. Your total is $14. Would you like to proceed to payment?", isAi: true },
  { message: "Yes, please!", isAi: false },
  { message: "Payment confirmed. Thank you! Your order #137 will be ready in 10 minutes. You'll receive a text notification when it's ready for pickup.", isAi: true },
];
