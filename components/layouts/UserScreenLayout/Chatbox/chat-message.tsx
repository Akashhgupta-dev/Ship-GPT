import { Box, Typography } from "@mui/material";
import { ChatMessage } from "@/utils/types";
import { COLORS } from "@/utils/enum";

type Props = {
  messages: ChatMessage[];
};

const ChatMessages = ({ messages }: Props) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: { xs: 2, md: 3 },
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "90%", md: "70%" },
                p: { xs: 1.5, md: 2 },
                borderRadius: "12px",
                backgroundColor:
                  msg.role === "user" ? COLORS.PRIMARY : COLORS.SECONDARY,
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15 },
                  color: COLORS.TEXT_PRIMARY,
                }}
              >
                {msg.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;
