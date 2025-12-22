"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import NewChatButton from "@/components/widgets/new-chat-button";
import { COLORS } from "@/utils/enum";
import UserProfile from "@/components/widgets/user-profile";
import { ChatItem } from "@/utils/types";

type Props = {
  chats: ChatItem[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
};

const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
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
      {/* Brand */}
      <Typography
        sx={{
          fontSize: { xs: 18, md: 22, lg: 26 },
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
          mb: 4,
          pl: 2,
        }}
      >
        ShipGPT
      </Typography>

      {/* Search bar */}
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
            fontSize: 16,
            color: COLORS.TEXT_PRIMARY,
            "::placeholder": {
              color: COLORS.TEXT_SECONDARY,
              opacity: 1,
            },
          }}
        />
      </Box>

      {/* New Chat */}
      <NewChatButton onClick={onNewChat} />

      {/* Section title */}
      <Typography
        sx={{
          fontSize: { xs: 14, md: 13 },
          color: COLORS.TEXT_SECONDARY,
          mb: 1,
        }}
      >
        Recent
      </Typography>

      {/* History list */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {chats.map((chat) => (
          <Box
            key={chat.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.2 },
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
            onClick={() => onSelectChat(chat.id)}
          >
            <Typography
              fontSize={{ xs: 13, md: 14 }}
              color={COLORS.TEXT_SECONDARY}
              noWrap
              sx={{ flex: 1 }}
            >
              {chat.title}
            </Typography>

            {/* Delete icon */}
            <DeleteOutlineIcon
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: COLORS.TEXT_SECONDARY,
                opacity: 0,
                "&:hover": {
                  color: COLORS.TEXT_PRIMARY,
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Profile (bottom) */}
      <Box
        sx={{
          mt: "auto",
          pt: 1.5,
          borderTop: `1px solid ${COLORS.SECONDARY}`,
        }}
      >
        <UserProfile name="Ship User" />
      </Box>
    </Box>
  );
};

export default Sidebar;
