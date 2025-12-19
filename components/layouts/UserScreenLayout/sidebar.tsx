"use client";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography } from "@mui/material";
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
        width: 280,
        height: "100vh",
        backgroundColor: COLORS.PRIMARY,
        borderRight: `1px solid ${COLORS.SECONDARY}`,
        boxShadow: "2px 0 8px rgba(0,0,0,0.7)",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand */}
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
          mb: 2,
          pl: 1,
        }}
      >
        ShipGPT
      </Typography>

      {/* New Chat */}
      <NewChatButton onClick={onNewChat} />

      {/* Section title */}
      <Typography
        sx={{
          fontSize: 13,
          color: COLORS.TEXT_SECONDARY,
          mb: 1,
        }}
      >
        Recent
      </Typography>

      {/* History list */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {chats.map((chat) => (
          <Box
            key={chat.id}
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
            onClick={() => onSelectChat(chat.id)}
          >
            <Typography
              fontSize={14}
              color={COLORS.TEXT_SECONDARY}
              noWrap
              sx={{ flex: 1 }}
            >
              {chat.title}
            </Typography>

            {/* 🔥 DELETE ICON */}
            <DeleteOutlineIcon
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              sx={{
                fontSize: 18,
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
