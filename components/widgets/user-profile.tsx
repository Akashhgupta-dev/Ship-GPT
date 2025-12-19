"use client";

import { Box, Typography, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "@/utils/enum";

type Props = {
  name?: string;
};

const UserProfile = ({ name = "User" }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1.2,
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: COLORS.SECONDARY,
        "&:hover": {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.TEXT_PRIMARY,
          fontSize: 14,
        }}
      >
        U
      </Avatar>

      <Typography
        sx={{
          flex: 1,
          fontSize: 14,
          color: COLORS.TEXT_PRIMARY,
        }}
        noWrap
      >
        {name}
      </Typography>

      <KeyboardArrowDownIcon
        sx={{ color: COLORS.TEXT_PRIMARY, fontSize: 20 }}
      />
    </Box>
  );
};

export default UserProfile;
