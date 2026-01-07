"use client";

import { Box, Typography, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "@/utils/enum";
import { useRouter } from "next/navigation";

type Props = {
  name?: string;
};

const UserProfile = ({ name = "User" }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/account");
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 1.5 },
        px: { xs: 1, md: 1.5 },
        py: { xs: 0.8, md: 1.2 },
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: COLORS.SECONDARY,
        "&:hover": {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: { xs: 28, md: 32 },
          height: { xs: 28, md: 32 },
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.TEXT_PRIMARY,
          fontSize: { xs: 13, md: 14 },
        }}
      >
        U
      </Avatar>

      {/* Username */}
      <Typography
        sx={{
          flex: 1,
          fontSize: { xs: 13, md: 14 },
          color: COLORS.TEXT_PRIMARY,
        }}
        noWrap
      >
        {name}
      </Typography>

      {/* Dropdown icon */}
      <KeyboardArrowDownIcon
        sx={{
          color: COLORS.TEXT_PRIMARY,
          fontSize: { xs: 18, md: 20 },
        }}
      />
    </Box>
  );
};

export default UserProfile;
