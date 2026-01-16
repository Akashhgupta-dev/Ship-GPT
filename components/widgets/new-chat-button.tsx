"use client";

import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "@/utils/enum";

import { ScienceGothic } from "@/utils/font";

type Props = {
  onClick: () => void;
};

const NewChatButton = ({ onClick }: Props) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 1.2 },
        px: 1.5,
        py: { xs: 1, md: 1.4 },
        mb: 2,
        borderRadius: "12px",
        backgroundColor: COLORS.SECONDARY,
        cursor: "pointer",
        transition: "background 0.2s ease",
        "&:hover": {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      <AddIcon
        sx={{
          fontSize: { xs: 18, md: 20 },
          color: COLORS.TEXT_PRIMARY,
        }}
      />

      <Typography
        sx={{
          fontSize: { xs: 13, md: 15 },
          lineHeight: "20px",
          color: COLORS.TEXT_PRIMARY,
          fontFamily: ScienceGothic.style.fontFamily,
        }}
      >
        New Chat
      </Typography>
    </Box>
  );
};

export default NewChatButton;
