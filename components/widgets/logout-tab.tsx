"use client";

import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { COLORS } from "@/utils/enum";
import { ScienceGothic } from "@/utils/font";
import { useRouter } from "next/navigation";

type Props = {
  onLogout?: () => void;
};

const LogoutTab = ({ onLogout }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("accessToken");
      router.push("/");
    }
  };

  return (
    <Box
      onClick={handleLogout}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 1.5 },
        px: 2,
        py: { xs: 1, md: 1.4 },
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
          fontSize: { xs: "13px", md: "15px" },
          lineHeight: "20px",
        }}
      >
        Logout
      </Typography>
      <LogoutIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
    </Box>
  );
};

export default LogoutTab;
