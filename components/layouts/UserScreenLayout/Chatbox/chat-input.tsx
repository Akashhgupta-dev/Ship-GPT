"use client";

import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import { COLORS } from "@/utils/enum";
import { Poppins } from "@/utils/font";

type Props = {
  onSend: (text: string) => void;
  activeChatId: string | null;
};

const ChatInput = ({ onSend, activeChatId }: Props) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field whenever activeChatId changes (new chat or switching chats)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChatId]);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.SECONDARY,
        py: { xs: 1.5, md: 2 },
        position: "sticky",
        bottom: 0,
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={value}
          inputRef={inputRef}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Send a message..."
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            borderRadius: "12px",
            input: {
              color: COLORS.TEXT_PRIMARY,
              fontSize: { xs: 16, md: 15 },
              fontFamily: Poppins.style.fontFamily,
            },
            "& .MuiInputBase-input::placeholder": {
              fontFamily: Poppins.style.fontFamily,
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
            p: { xs: 1, md: 1.2 },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
