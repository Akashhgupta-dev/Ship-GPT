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
        mb: { xs: 1.5, md: 2 },
        justifyContent: "flex-start",
        borderRadius: "12px",
        backgroundColor: COLORS.SECONDARY,
        color: COLORS.TEXT_PRIMARY,
        textTransform: "none",
        fontSize: { xs: 13, md: 14 },
        py: { xs: 1, md: 1.2 },
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
