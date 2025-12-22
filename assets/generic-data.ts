import { ChatMessage, TabItem } from "@/utils/types";

export const TOP_TABS: TabItem[] = [
  { label: "Mechanical" },
  //   { label: "Troubleshooting" },
  //   { label: "Compliance" },
  { label: "Crewing" },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hello! How can I help you today?",
  },
  {
    role: "user",
    content: "Explain engine overheating issue.",
  },
];
import { CategoryItem } from "@/utils/types";

export const CATEGORIES: CategoryItem[] = [
  { label: "Mechanical", value: "mechanical" },
  //   { label: "Troubleshooting", value: "troubleshooting" },
  //   { label: "Compliance", value: "compliance" },
  { label: "Crewing", value: "crewing" },
];
import { ChatHistoryItem } from "@/utils/types";

export const CHAT_HISTORY: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Engine overheating",
  },
  {
    id: "2",
    title: "Crew safety rules",
  },
  {
    id: "3",
    title: "Compliance checklist",
  },
];
export const SHIPS = [
  { label: "MV Ocean Star", value: "ocean_star" },
  { label: "MV Blue Horizon", value: "blue_horizon" },
  { label: "SS Neptune", value: "neptune" },
  { label: "MV Sea Explorer", value: "sea_explorer" },
  { label: "MV Atlantic Pearl", value: "atlantic_pearl" },
];
