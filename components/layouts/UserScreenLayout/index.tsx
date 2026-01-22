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
import { authControllers } from "@/api/auth";

const UserScreenLayout = () => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const loadedChatsRef = useRef(new Set<string>());
  const [ship, setShip] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userShipName") || "";
    }
    return "";
  });
  const [shipId, setShipId] = useState(2);
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
    reason?: string,
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
        content: "Welcome to ShipGPT. I'm here to help you.",
      },
    ],
  });

  useEffect(() => {
    console.log("UserScreenLayout MOUNTED");
    console.log("localStorage check:", {
      accessToken: !!localStorage.getItem("accessToken"),
      userId: localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
    });

    if (!hasInitializedChat.current) {
      const firstChat = createNewChat();
      console.log("Initializing first chat:", firstChat.id);
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
          console.log("USER METADATA DEBUG:", userData);

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

  // 1. FETCH HISTORY DEPENDING ON CATEGORY
  useEffect(() => {
    const fetchHistory = async () => {
      console.log("Fetching history for category:", category);
      try {
        const res = await chatControllers.getChatHistory(
          category.toUpperCase(),
        );

        const historyData = res.data?.data || [];
        console.log("API RAW HISTORY RESPONSE:", {
          status: res.status,
          itemCount: historyData.length,
          data: historyData,
        });

        console.log("HISTORY DATA SAMPLE:", historyData[0]);
        const mappedHistory: ChatItem[] = historyData.map((item: any) => {
          let title =
            item.question || item.query || item.user_query || item.prompt;

          const isGeneric = (str: string) =>
            !str ||
            [
              "MECHANICAL",
              "COMPLIANCE",
              "UNTITLED CHAT",
              "CHAT SESSION",
              "CREW",
              "NEW CHAT",
            ].includes(str.toUpperCase());

          if (isGeneric(title)) {
            // Peek into first message if it's an array
            const firstMsg = Array.isArray(item.messages)
              ? item.messages.find((m: any) => m.role === "user")?.content
              : null;

            const firstInt = Array.isArray(item.interactions)
              ? item.interactions[0].query || item.interactions[0].question
              : null;

            title = firstMsg || firstInt || item.title || title;
          }

          if (isGeneric(title)) {
            title =
              Object.values(item).find(
                (v) =>
                  typeof v === "string" &&
                  v.length > 3 &&
                  v.length < 100 &&
                  !v.includes("-") &&
                  ![
                    "CREW",
                    "ADMIN",
                    "SUPERINTENDENT",
                    "FLEET",
                    "MECHANICAL",
                    "COMPLIANCE",
                  ].includes(v.toUpperCase()),
              ) || "";
          }

          return {
            id: item.id || item._id,
            title: title ? String(title).slice(0, 50) : "Untitled Chat",
            messages: [],
          };
        });

        const finalHistory = mappedHistory;
        console.log("MAPPED HISTORY READY:", finalHistory);

        setChats((prevChats) => {
          console.log("Merging history. Prev chats count:", prevChats.length);
          const localChats = prevChats.filter(
            (c) =>
              c.messages.length > 1 && !finalHistory.some((h) => h.id === c.id),
          );

          let finalItems = [...localChats, ...finalHistory];

          if (finalItems.length === 0) {
            finalItems = [createNewChat()];
          }

          console.log("FINAL CHATS STATE SET:", finalItems);
          return finalItems;
        });
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    if (category) {
      fetchHistory();
    }
  }, [category]);

  useEffect(() => {
    if (chats.length > 0) {
      if (!activeChatId || !chats.find((c) => c.id === activeChatId)) {
        setActiveChatId(chats[0].id);
      }
    }
  }, [chats, activeChatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChatId) return;

      if (loadedChatsRef.current.has(activeChatId)) return;

      const chat = chats.find((c) => c.id === activeChatId);
      if (!chat || chat.messages.length > 0) return;

      try {
        const res = await chatControllers.getConversationById(activeChatId);
        const data = res.data?.data;

        if (data) {
          let newMessages: { role: "user" | "assistant"; content: string }[] =
            [];

          const parseInteraction = (m: any) => {
            const pair: { role: "user" | "assistant"; content: string }[] = [];

            const userContent =
              m.question || m.query || m.user_query || m.prompt;
            if (userContent) {
              pair.push({ role: "user", content: String(userContent) });
            }

            const assistantContent =
              m.answer || m.response || m.content || m.text;
            if (assistantContent) {
              pair.push({
                role: "assistant",
                content: String(assistantContent),
              });
            }

            return pair;
          };

          // ROBUST PARSING LOGIC
          if (Array.isArray(data)) {
            // Case: data is array of interactions
            newMessages = data.flatMap(parseInteraction);
          } else if (data.chats && Array.isArray(data.chats)) {
            // Case: data.chats is array (Found in logs)
            newMessages = data.chats.flatMap(parseInteraction);
          } else if (data.messages && Array.isArray(data.messages)) {
            // Case: data.messages is array
            newMessages = data.messages.flatMap(parseInteraction);
          } else if (data.interactions && Array.isArray(data.interactions)) {
            // Case: data.interactions is array (common in some backends)
            newMessages = data.interactions.flatMap(parseInteraction);
          } else {
            // Case: Single object interaction
            newMessages = parseInteraction(data);
          }

          setChats((prev) =>
            prev.map((c) =>
              c.id === activeChatId ? { ...c, messages: newMessages } : c,
            ),
          );

          loadedChatsRef.current.add(activeChatId);
        } else {
          console.warn("No data found in fetchMessages response");
        }
      } catch (err) {
        console.error("Failed to load conversation details:", err);
      }
    };

    fetchMessages();
  }, [activeChatId, chats]);
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
          const WELCOME_TEXT = "Welcome to ShipGPT. I'm here to help you.";
          const filteredMessages = chat.messages.filter(
            (m) =>
              !(
                m.role === "assistant" &&
                (m.content === WELCOME_TEXT ||
                  m.content.includes("Welcome to ShipGPT"))
              ),
          );

          const isGeneric =
            !chat.title ||
            [
              "NEW CHAT",
              "UNTITLED CHAT",
              "CHAT SESSION",
              "MECHANICAL",
              "COMPLIANCE",
            ].includes(chat.title.toUpperCase());

          return {
            ...chat,
            title: isGeneric ? text.slice(0, 30) : chat.title,
            messages: [
              ...filteredMessages,
              { role: "user", content: text },
              { role: "assistant", content: "Thinking..." },
            ],
          };
        }
        return chat;
      }),
    );

    chatControllers
      .askAI({
        query: text,
        shipId: 2,
        companyId: 2,
        type: category.toUpperCase(),
      })
      .then((res) => {
        console.log("ASK AI RESPONSE FULL:", JSON.stringify(res, null, 2));
        const aiReply =
          res.data?.data?.answer ||
          res.data?.data?.response ||
          res.data?.answer ||
          res.data?.response ||
          (typeof res.data === "string"
            ? res.data
            : JSON.stringify(res.data)) ||
          "No response from AI";

        console.log("PARSED AI REPLY:", aiReply);

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
                          : msg,
                      ),
                    }
                  : chat,
              ),
            );
            wordIndex++;
          } else {
            clearInterval(interval);
            setIsGenerating(false);
          }
        }, 30);
      })
      .catch((err) => {
        console.error("ASK AI ERROR:", err);
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
                      : msg,
                  ),
                }
              : chat,
          ),
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
