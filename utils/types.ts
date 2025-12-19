export interface TabItem {
  label: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
export interface CategoryItem {
  label: string;
  value: string;
}
export interface ChatHistoryItem {
  id: string;
  title: string;
}
export interface ChatItem {
  id: string;
  title: string;
  messages: ChatMessage[];
}