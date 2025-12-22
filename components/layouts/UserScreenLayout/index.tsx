"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "@/components/widgets/sidebar";
import TopBar from "@/components/widgets/top-bar";
import MobileSidebarDrawer from "@/components/widgets/mobile-sidebar";
import ChatMessages from "@/components/layouts/UserScreenLayout/Chatbox/chat-message";
import ChatInput from "@/components/layouts/UserScreenLayout/Chatbox/chat-input";
import { COLORS } from "@/utils/enum";
import { ChatItem } from "@/utils/types";

const UserScreenLayout = () => {
  // ALL CHAT STATE HERE
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // NEW CHAT
  const handleNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content: "Welcome to ShipGPT. I’m here to help you.",
        },
      ],
    };

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
      const updatedChats = prev.filter(
        (chat) => chat.id !== id
      );

      if (id === activeChatId) {
        setActiveChatId(
          updatedChats.length ? updatedChats[0].id : null
        );
      }

      return updatedChats;
    });
  };

  // ACTIVE CHAT
  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

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

      {/* MOBILE SIDEBAR (DRAWER) */}
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
        {/* TOP BAR (hamburger control) */}
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
