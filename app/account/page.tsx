"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
// import AddressCard from "./AddressCard";

const AccountPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: 4,
          bgcolor: "#212121",
          minHeight: "100vh",
        }}
      >
        <ProfileHeader />
        <ProfileInfoCard />
        {/* <AddressCard /> */}
      </Box>
    </Box>
  );
};

export default AccountPage;
