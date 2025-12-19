"use client";

import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { COLORS } from "@/utils/enum";

type Props = {
  onSend: (text: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.SECONDARY,
        py: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "820px",
          mx: "auto",
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Send a message..."
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            borderRadius: "12px",
            input: {
              color: COLORS.TEXT_PRIMARY,
            },
            "& fieldset": {
              border: "none",
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          sx={{
            color: COLORS.TEXT_PRIMARY,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
