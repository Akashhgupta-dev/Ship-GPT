"use client";

import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { chatControllers } from "@/api/chat";

import Sidebar from "@/components/widgets/sidebar";
import TopBar from "@/components/widgets/top-bar";
import MobileSidebarDrawer from "@/components/widgets/mobile-sidebar";
import ChatMessages from "@/components/layouts/UserScreenLayout/Chatbox/chat-message";
import ChatInput from "@/components/layouts/UserScreenLayout/Chatbox/chat-input";

import { COLORS } from "@/utils/enum";
import { ChatItem } from "@/utils/types";
import AppSnackbar from "@/components/widgets/snakbar";
import { useRouter } from "next/navigation";
import { Poppins } from "@/utils/font";
import { authControllers } from "@/api/auth";
import { SHIPS } from "@/assets/generic-data";

const UserScreenLayout = () => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [ship, setShip] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userShipName") || "";
    }
    return "";
  });
  const [shipId, setShipId] = useState(3);
  const [category, setCategory] = useState("mechanical");
  const [userRole, setUserRole] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole");
    }
    return null;
  });
  const router = useRouter();

  const [snakbar, setSnakbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnakbar({ ...snakbar, open: false });
  };

  const handleLogout = () => {
    setSnakbar({
      open: true,
      message: "Logging out...",
      severity: "info",
    });
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const hasInitializedChat = useRef(false);

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

  useEffect(() => {
    if (!hasInitializedChat.current) {
      const firstChat = createNewChat();
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
      hasInitializedChat.current = true;
    }

    const fetchUserMetadata = async () => {
      const role = localStorage.getItem("userRole");
      const userId = localStorage.getItem("userId");

      if (role === "CREW" && userId) {
        try {
          const response = await authControllers.getUserById(userId, role);
          const userData = response.data?.data;

          if (userData?.ship?.name) {
            setShip(userData.ship.name);
            localStorage.setItem("userShipName", userData.ship.name);
          }
          if (userData?.ship?.id) {
            setShipId(userData.ship.id);
          }
        } catch (error) {
          console.error("Failed to fetch user metadata:", error);
        }
      }
    };

    fetchUserMetadata();
  }, []);

  // MANUAL NEW CHAT
  const handleNewChat = () => {
    const newChat = createNewChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // SEND MESSAGE
  const handleSendMessage = async (text: string) => {
    if (!activeChatId || !text.trim() || isGenerating) return;

    setIsGenerating(true);

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          const WELCOME_TEXT = "Welcome to ShipGPT. I’m here to help you.";
          const filteredMessages = chat.messages.filter(
            (m) => !(m.role === "assistant" && m.content === WELCOME_TEXT)
          );

          return {
            ...chat,
            title: chat.title === "New Chat" ? text.slice(0, 30) : chat.title,
            messages: [
              ...filteredMessages,
              { role: "user", content: text },
              { role: "assistant", content: "Thinking..." },
            ],
          };
        }
        return chat;
      })
    );

    chatControllers
      .askAI({
        query: text,
        shipId: 3,
        companyId: 2,
      })
      .then((res) => {
        const aiReply =
          res.data?.data?.answer ||
          res.data?.data?.response ||
          res.data ||
          "No response from AI";

        // TYPEWRITER EFFECT
        const words = aiReply.split(" ");
        let currentText = "";
        let wordIndex = 0;

        const interval = setInterval(() => {
          if (wordIndex < words.length) {
            currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex];
            setChats((prev) =>
              prev.map((chat) =>
                chat.id === activeChatId
                  ? {
                      ...chat,
                      messages: chat.messages.map((msg, index) =>
                        index === chat.messages.length - 1
                          ? { role: "assistant", content: currentText }
                          : msg
                      ),
                    }
                  : chat
              )
            );
            wordIndex++;
          } else {
            clearInterval(interval);
            setIsGenerating(false);
          }
        }, 30);
      })
      .catch((err) => {
        console.error("AI DEBUG - Chat Error:", err);
        if (err.response) {
          console.error("AI DEBUG - Error Response Data:", err.response.data);
          console.error(
            "AI DEBUG - Error Response Status:",
            err.response.status
          );
        }

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg, index) =>
                    index === chat.messages.length - 1
                      ? {
                          role: "assistant",
                          content: "Something went wrong. Please try again.",
                        }
                      : msg
                  ),
                }
              : chat
          )
        );
        setIsGenerating(false);
      });
  };

  const handleDeleteChat = (id: string) => {
    setChats((prev) => {
      const remaining = prev.filter((chat) => chat.id !== id);
      if (remaining.length === 0) {
        const newChat = createNewChat();
        setActiveChatId(newChat.id);
        return [newChat];
      }

      if (id === activeChatId) {
        setActiveChatId(remaining[0].id);
      }

      return remaining;
    });
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

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
          onLogout={handleLogout}
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
          onLogout: handleLogout,
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
        <TopBar
          onMenuClick={() => setMobileSidebarOpen(true)}
          ship={ship}
          onShipChange={(newShip: string) => {
            setShip(newShip);
          }}
          category={category}
          onCategoryChange={setCategory}
          userRole={userRole}
        />

        {/* CHAT */}
        <ChatMessages messages={activeChat?.messages || []} />

        {/* INPUT */}
        <ChatInput
          onSend={handleSendMessage}
          activeChatId={activeChatId}
          disabled={isGenerating}
        />
      </Box>
      <AppSnackbar
        open={snakbar.open}
        message={snakbar.message}
        severity={snakbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default UserScreenLayout;
