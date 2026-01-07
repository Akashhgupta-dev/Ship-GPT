"use client";
import { Box, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { ScienceGothic } from "@/utils/font";
import { useState } from "react";
import ProfileSidebar1 from "./ProfileSidebar1";

const AccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <ProfileSidebar1 sidebarOpen={sidebarOpen} />

      <Box
        sx={{
          flex: 1,
          p: 2,
          bgcolor: "#212121",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            display: { xs: "flex", md: "none" },
            zIndex: 1300,
            color: "#fff",
          }}
        >
          {sidebarOpen ? (
            <IoMdClose
              size={26}
              style={{ cursor: "pointer" }}
              onClick={() => setSidebarOpen(false)}
            />
          ) : (
            <IoMdMenu
              size={26}
              style={{ cursor: "pointer" }}
              onClick={() => setSidebarOpen(true)}
            />
          )}
        </Box>

        <Typography
          fontWeight={600}
          mb={2}
          sx={{
            fontFamily: ScienceGothic.style.fontFamily,
            fontSize: { xs: "16px", md: "0", lg: "0" },
            textAlign: "center",
            color: "#fff",
          }}
        >
          SHIPGPT
        </Typography>

        <ProfileHeader />
        <ProfileInfoCard />
      </Box>
    </Box>
  );
};

export default AccountPage;
