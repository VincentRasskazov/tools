// Central registry of all tools
export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  component: string;
};

export const tools: Tool[] = [
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your age from your date of birth.",
    category: "Date & Time",
    component: "AgeCalculator"
  },
];
