
import { SuggestedPrompt } from "@/types/chat";

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "daily-specials",
    title: "Daily Specials & Hours",
    prompt: "Describe your daily specials and what time you open/close. Insert your actual details here (e.g., 'We have a $9.99 lunch combo from 11 AM–2 PM, and close at 9 PM.'). Then see how the AI would respond to a customer asking about specials or closing time.",
    demoConversation: [
      { message: "What specials do you have today?", isAi: false, role: "customer" },
      { message: "We offer a $9.99 Lunch Combo from 11 AM to 2 PM—includes a sandwich, fries, and a drink. After 5 PM, appetizers are half-price. Would you like to hear our most popular app?", isAi: true, role: "assistant" },
      { message: "Yes, please. Also, how late are you open?", isAi: false, role: "customer" },
      { message: "We're open until 9 PM on weekdays. One popular app is our loaded potato skins—usually $6, but you can get them for $3 after 5 PM!", isAi: true, role: "assistant" },
      { message: "Perfect! I'll stop by before you close.", isAi: false, role: "customer" },
    ],
    defaultInput: "We open at 11 AM, close at 9 PM on weekdays, and run a $9.99 lunch combo from 11 to 2. Also do half-price apps after 5 PM."
  },
  {
    id: "delivery-process",
    title: "Delivery Process",
    prompt: "Describe your delivery area, average times, fees, minimum order, surcharges, etc. Insert them here (e.g., '5-mile radius, $3 fee under $20, free over $20, 30–40 min avg'). Let's see how AI handles a phone-like conversation.",
    demoConversation: [
      { message: "Do you deliver to Maple Street, about 4 miles away?", isAi: false, role: "customer" },
      { message: "Yes, that's within our 6-mile zone. Delivery is $4 if your order's under $25, or free if it's $25 or more. We usually arrive in about 30–45 minutes.", isAi: true, role: "assistant" },
      { message: "Got it. Any minimum order?", isAi: false, role: "customer" },
      { message: "Yes, we ask for a $10 minimum. Orders below $10 incur a $2 small-order fee.", isAi: true, role: "assistant" },
      { message: "Okay, I'll keep that in mind—thanks!", isAi: false, role: "customer" },
    ],
    defaultInput: "We deliver up to 6 miles, $4 fee if under $25, free otherwise, takes 30–45 minutes typically. $10 minimum order or $2 surcharge if under $10."
  },
  {
    id: "refund-policy",
    title: "Refund or Order Change Policies",
    prompt: "Write a summary of your refund or order-change policy (e.g., '15-min cancellation window, refunds in 3–5 days if we haven't started cooking'). Then watch how the AI explains it to a customer.",
    demoConversation: [
      { message: "I placed an order 10 minutes ago. Can I cancel?", isAi: false, role: "customer" },
      { message: "Sure! We have a 15-minute cancellation window, provided we haven't started cooking. Let me check… Great, we haven't begun prep, so we'll cancel and refund you in 3–5 business days.", isAi: true, role: "assistant" },
      { message: "Thanks, that's a relief.", isAi: false, role: "customer" },
      { message: "Absolutely—if you change your mind later, we'll be here to help!", isAi: true, role: "assistant" },
    ],
    defaultInput: "Cancellations allowed within 15 minutes if cooking hasn't started. Refunds in 3–5 business days. If the order is already prepped, we can only do partial refunds."
  },
  {
    id: "allergen-info",
    title: "Allergen & Gluten-Free Info",
    prompt: "List some popular menu items with allergens or diet-friendly options (e.g., gluten-free bun, vegan cheese). Insert actual info here, then we'll see how AI handles allergen/diet calls.",
    demoConversation: [
      { message: "Do you have gluten-free burger buns?", isAi: false, role: "customer" },
      { message: "Yes! We can serve your burger on a gluten-free bun for $1 extra, and our fries are cooked in a separate fryer. We minimize cross-contamination for those with celiac.", isAi: true, role: "assistant" },
      { message: "Perfect. Anything vegan-friendly?", isAi: false, role: "customer" },
      { message: "We have a Vegan Tofu Wrap with grilled veggies and dairy-free sauce. Would you like more ingredient details?", isAi: true, role: "assistant" },
      { message: "I'm good—thanks for the info.", isAi: false, role: "customer" },
    ],
    defaultInput: "Our burger can be done with a gluten-free bun ($1 extra), and our fries are cooked in separate oil for no cross-contamination. We also have a vegan wrap with tofu."
  },
  {
    id: "common-inquiries",
    title: "Common Customer Inquiries",
    prompt: "Type 2–3 frequent phone questions (e.g., 'Can I book a party of 12?'). Insert them, and the AI will demonstrate phone-call replacement with your specifics.",
    demoConversation: [
      { message: "Hi, I'm looking to book a private room for 12 people next Friday. Is that possible?", isAi: false, role: "customer" },
      { message: "Yes, our private room seats up to 20, so 12 is no problem. For groups of 10 or more, there's a $50 deposit to secure the space. Does that sound okay?", isAi: true, role: "assistant" },
      { message: "Sure. Also, do you do catering for larger events? I might need food for a 30-person gathering next month.", isAi: false, role: "customer" },
      { message: "We do! We cater off-site events for 25+ guests, and we ask for a 48-hour notice to prepare everything. We also require a $100 deposit. Is your event date confirmed yet?", isAi: true, role: "assistant" },
      { message: "It's on the 15th. That's more than 48 hours away, so we should be good, right?", isAi: false, role: "customer" },
      { message: "Absolutely. If you can finalize your menu about 2 days before, we'll handle the rest. Anything else I can help with?", isAi: true, role: "assistant" },
      { message: "That's all, thanks!", isAi: false, role: "customer" },
    ],
    defaultInput: "1) We have a private room for up to 20 people, $50 deposit for parties of 10+.\n2) We cater off-site events for 25 or more guests, requiring a 48-hour notice and a $100 deposit."
  },
  {
    id: "payments-checkout",
    title: "Payments & Checkout (Expanded Order Flow)",
    prompt: "Describe how you handle payments (credit, debit, contactless, cash) plus any fees. Then let's see how AI handles a full order scenario—like 2 turkey burgers and a salad—through to payment and kitchen notification.",
    demoConversation: [
      { message: "Hey, can I order 2 turkey burgers with a garden salad—balsamic on the side?", isAi: false, role: "customer" },
      { message: "Of course! That's 2 turkey burgers ($6.50 each) + 1 garden salad with balsamic ($4.00). Subtotal: $17. Is that correct?", isAi: true, role: "assistant" },
      { message: "Yes, that's right.", isAi: false, role: "customer" },
      { message: "We accept credit, debit, Apple Pay, or cash at pickup. Any preference?", isAi: true, role: "assistant" },
      { message: "I'll pay online with a credit card.", isAi: false, role: "customer" },
      { message: "Great—[mock payment flow] Payment confirmed at $17 + tax = $18.53 total. Thanks! Your order is being prepared now.", isAi: true, role: "assistant" },
      { message: "Kitchen notified: 2 turkey burgers, 1 garden salad, order #201. Estimated ready in ~15 minutes.", isAi: true, role: "system" },
      { message: "Awesome, I'll come by soon.", isAi: false, role: "customer" },
      { message: "Perfect. We'll let you know when it's ready for pickup!", isAi: true, role: "assistant" },
    ],
    defaultInput: "We accept credit, debit, Apple Pay, or cash on pickup. No extra fees unless it's international. Turkey burger $6.50, garden salad $4.00."
  }
];
