"use client";

import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";

import Sidebar from "@/components/widgets/sidebar";
import TopBar from "@/components/widgets/top-bar";
import MobileSidebarDrawer from "@/components/widgets/mobile-sidebar";
import ChatMessages from "@/components/layouts/UserScreenLayout/Chatbox/chat-message";
import ChatInput from "@/components/layouts/UserScreenLayout/Chatbox/chat-input";

import { COLORS } from "@/utils/enum";
import { ChatItem } from "@/utils/types";

const UserScreenLayout = () => {
  // GLOBAL CHAT STATE
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Mobile sidebar
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // StrictMode 
  const hasInitializedChat = useRef(false);

  // CHAT FACTORY 
  const createNewChat = (): ChatItem => ({
    id: Date.now().toString(),
    title: "New Chat",
    messages: [
      {
        role: "assistant",
        content: "Welcome to ShipGPT. I’m here to help you.",
      },
    ],
  });

  // AUTO CREATE FIRST CHAT 
  useEffect(() => {
    if (!hasInitializedChat.current) {
      const firstChat = createNewChat();
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
      hasInitializedChat.current = true;
    }
  }, []);

  // MANUAL NEW CHAT
  const handleNewChat = () => {
    const newChat = createNewChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // SEND MESSAGE
  const handleSendMessage = (text: string) => {
    if (!activeChatId || !text.trim()) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat"
                  ? text.slice(0, 30)
                  : chat.title,
              messages: [
                ...chat.messages,
                { role: "user", content: text },
                {
                  role: "assistant",
                  content: "Thanks for your message!",
                },
              ],
            }
          : chat
      )
    );
  };

  // DELETE CHAT
  const handleDeleteChat = (id: string) => {
    setChats((prev) => {
      const remaining = prev.filter((chat) => chat.id !== id);

      // If last chat deleted → create new one
      if (remaining.length === 0) {
        const newChat = createNewChat();
        setActiveChatId(newChat.id);
        return [newChat];
      }

      // If active chat deleted → select first
      if (id === activeChatId) {
        setActiveChatId(remaining[0].id);
      }

      return remaining;
    });
  };

  // ACTIVE CHAT
  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // UI
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* DESKTOP SIDEBAR */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
        />
      </Box>

      {/* MOBILE SIDEBAR */}
      <MobileSidebarDrawer
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        sidebarProps={{
          chats,
          activeChatId,
          onSelectChat: (id) => {
            setActiveChatId(id);
            setMobileSidebarOpen(false);
          },
          onNewChat: () => {
            handleNewChat();
            setMobileSidebarOpen(false);
          },
          onDeleteChat: handleDeleteChat,
        }}
      />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: COLORS.SECONDARY,
        }}
      >
        {/* TOP BAR */}
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* CHAT */}
        <ChatMessages messages={activeChat?.messages || []} />

        {/* INPUT */}
        <ChatInput onSend={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default UserScreenLayout;
