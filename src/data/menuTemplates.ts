
import { MenuItem } from "@/types/chat";

export const menuTemplates: Record<string, MenuItem[]> = {
  pizzaParlor: [
    {
      name: "Margherita Pizza",
      price: 10,
      description: "Tomatoes, basil, mozzarella.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Pepperoni Pizza",
      price: 11,
      description: "Pepperoni and extra cheese.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Garlic Knots",
      price: 5,
      description: "Freshly baked with garlic butter.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Caesar Salad",
      price: 7,
      description: "Romaine lettuce, croutons, parmesan.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: true,
      },
    },
  ],
  burgerShack: [
    {
      name: "Classic Burger",
      price: 6,
      description: "100% beef patty.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Cheeseburger",
      price: 7,
      description: "American cheese, lettuce, tomato.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Fries",
      price: 3,
      description: "Crispy golden fries.",
      dietaryInfo: {
        vegan: true,
        glutenFree: true,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Onion Rings",
      price: 4,
      description: "Battered onion rings.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: true,
      },
    },
  ],
  cafePastries: [
    {
      name: "Espresso",
      price: 4,
      description: "Rich, concentrated coffee.",
      dietaryInfo: {
        vegan: true,
        glutenFree: true,
        eggFree: true,
        dairyFree: true,
      },
    },
    {
      name: "Latte",
      price: 5,
      description: "Steamed milk, optional flavor shots.",
      dietaryInfo: {
        vegan: false,
        glutenFree: true,
        eggFree: true,
        dairyFree: false,
      },
    },
    {
      name: "Croissant",
      price: 3,
      description: "Buttery French pastry.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
    {
      name: "Blueberry Muffin",
      price: 2.5,
      description: "Made with real blueberries.",
      dietaryInfo: {
        vegan: false,
        glutenFree: false,
        eggFree: false,
        dairyFree: false,
      },
    },
  ],
};
