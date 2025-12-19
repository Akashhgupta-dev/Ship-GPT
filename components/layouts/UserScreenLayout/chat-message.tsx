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
        py: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "820px",
          mx: "auto",
          px: 3,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                p: 2,
                borderRadius: "12px",
                backgroundColor:
                  msg.role === "user" ? COLORS.PRIMARY : COLORS.SECONDARY,
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              <Typography color={COLORS.TEXT_PRIMARY}>{msg.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;
