"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography, InputBase } from "@mui/material";
import NewChatButton from "@/components/widgets/new-chat-button";
import { COLORS } from "@/utils/enum";
import { ChatItem } from "@/utils/types";
import LogoutTab from "@/components/widgets/logout-tab";
import { ScienceGothic } from "@/utils/font";

type Props = {
  chats: ChatItem[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onLogout: () => void;
};

const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onLogout,
}: Props) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 280 },
        height: "100vh",
        backgroundColor: COLORS.PRIMARY,
        borderRight: { xs: "none", md: `1px solid ${COLORS.SECONDARY}` },
        boxShadow: { xs: "none", md: "2px 0 8px rgba(0,0,0,0.7)" },
        p: { xs: 1.5, md: 2 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BRAND */}
      <Typography
        sx={{
          fontFamily: ScienceGothic.style.fontFamily,
          fontSize: { xs: 18, md: 22, lg: 26 },
          fontWeight: 600,
          color: COLORS.TEXT_PRIMARY,
          mb: 3,
          pl: 1,
        }}
      >
        ShipGPT
      </Typography>

      {/* SEARCH BAR */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          mb: 2,
          borderRadius: "10px",
          backgroundColor: COLORS.SECONDARY,
        }}
      >
        <SearchIcon
          sx={{
            fontSize: 18,

            color: COLORS.TEXT_SECONDARY,
          }}
        />
        <InputBase
          placeholder="Search chats..."
          sx={{
            flex: 1,
            fontSize: 14,
            fontFamily: ScienceGothic.style.fontFamily,
            color: COLORS.TEXT_PRIMARY,
            "::placeholder": {
              color: COLORS.TEXT_SECONDARY,
              opacity: 1,
            },
          }}
        />
      </Box>

      {/* NEW CHAT BUTTON */}
      <NewChatButton onClick={onNewChat} />

      {/* RECENT TITLE */}
      <Typography
        sx={{
          fontSize: 13,
          color: COLORS.TEXT_SECONDARY,
          fontFamily: ScienceGothic.style.fontFamily,
          mt: 1,
          mb: 1.5,
        }}
      >
        Recent
      </Typography>

      {/* CHAT HISTORY */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {chats
          .filter((chat) => chat.title !== "New Chat") 
          .map((chat) => (
            <Box
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1.2,
                mb: 0.5,
                borderRadius: "10px",
                
                cursor: "pointer",
                backgroundColor:
                  chat.id === activeChatId ? COLORS.SECONDARY : "transparent",
                "&:hover": {
                  backgroundColor: COLORS.SECONDARY,
                  "& .delete-btn": { opacity: 1 },
                },
              }}
            >
              <Typography
                fontSize={14}
                color={COLORS.TEXT_SECONDARY}
                fontFamily={ScienceGothic.style.fontFamily}
                noWrap
                sx={{ flex: 1 }}
              >
                {chat.title}
              </Typography>

              {/* DELETE ICON */}
              <DeleteOutlineIcon
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                sx={{
                  fontSize: 18,
                  color: COLORS.TEXT_SECONDARY,
                  opacity: 1,
                  "&:hover": {
                    color: COLORS.TEXT_PRIMARY,
                  },
                }}
              />
            </Box>
          ))}
      </Box>

      {/* PROFILE
      <Box
        sx={{
          mt: "auto",
          pt: 1.5,
          borderTop: `1px solid ${COLORS.SECONDARY}`,
        }}
      >
        <UserProfile name="Ship User" />
      </Box> */}
      <Box>
        <LogoutTab onLogout={onLogout} />
      </Box>
    </Box>
  );
};

export default Sidebar;
