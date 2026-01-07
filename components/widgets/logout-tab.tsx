"use client";

import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { COLORS } from "@/utils/enum";
import { ScienceGothic } from "@/utils/font";

type Props = {
  onLogout?: () => void; // future API ke liye
};

const LogoutTab = ({ onLogout }: Props) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logout clicked (API pending)");
    }
  };

  return (
    <Box
      onClick={handleLogout}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.4,
        borderRadius: "10px",
        cursor: "pointer",
        color: COLORS.TEXT_SECONDARY,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: COLORS.SECONDARY,
          color: COLORS.TEXT_PRIMARY,
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: ScienceGothic.style.fontFamily,
          fontSize: { xs: "22px", md: "16px", lg: "16px" },
        }}
      >
        Logout
      </Typography>
      <LogoutIcon fontSize="small" />
    </Box>
  );
};

export default LogoutTab;
