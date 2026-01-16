"use client";

import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import { COLORS } from "@/utils/enum";
import { Poppins } from "@/utils/font";

type Props = {
  onSend: (text: string) => void;
  activeChatId: string | null;
  disabled?: boolean;
};

const ChatInput = ({ onSend, activeChatId, disabled }: Props) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field whenever activeChatId changes (new chat or switching chats)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChatId]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.SECONDARY,
        py: { xs: 1, md: 2 },
        position: "sticky",
        bottom: 0,
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          maxWidth: 920,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={8}
          value={value}
          inputRef={inputRef}
          onChange={(e) => setValue(e.target.value)}
          placeholder={disabled ? "AI is thinking..." : "Send a message..."}
          variant="outlined"
          InputProps={{
            readOnly: disabled,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            borderRadius: "16px",
            "& .MuiInputBase-root": {
              borderRadius: "16px",
              color: COLORS.TEXT_PRIMARY,
              fontSize: { xs: 13, md: 15 },
              fontFamily: Poppins.style.fontFamily,
              px: 2,
              py: { xs: 1.5, md: 2 },
              cursor: disabled ? "wait" : "text",
            },
            "& .MuiInputBase-input": {
              p: 0,
            },
            "& .MuiInputBase-input::placeholder": {
              fontFamily: Poppins.style.fontFamily,
              fontSize: { xs: 13, md: 15 },
              opacity: disabled ? 0.5 : 1,
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
            p: { xs: 0.8, md: 1.2 },
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "wait" : "pointer",
          }}
        >
          <SendIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
