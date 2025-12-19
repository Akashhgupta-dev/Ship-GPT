"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "@/utils/enum";

type Props = {
  onClick: () => void;
};

const NewChatButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      startIcon={<AddIcon />}
      fullWidth
      sx={{
        mb: 2,
        justifyContent: "flex-start",
        borderRadius: "12px",
        backgroundColor: COLORS.SECONDARY,
        color: COLORS.TEXT_PRIMARY,
        textTransform: "none",
        "&:hover": {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      New Chat
    </Button>
  );
};

export default NewChatButton;
