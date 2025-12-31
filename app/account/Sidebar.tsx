"use client";

import { Box, Typography, List, ListItemButton} from "@mui/material";
import { ScienceGothic } from "@/utils/font";
import { useState } from "react";
const Sidebar: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  return (
    <Box
      sx={{
    minHeight: "100vh",
    bgcolor: "#181818",
    color: "#fff",
    p: 2,
    zIndex: 1200,

    position: { xs: "fixed", md: "static" },
    top: 0,

    width: {
      xs: sidebarOpen ? "100vw" : "0",
      md: "240px",
    },

    left: {
      xs: sidebarOpen ? "0" : "-100%",
      md: "0",
    },

    overflow: "hidden",
  }}
   
    >
      <Typography 
       
        fontWeight={600}
        sx={{ fontFamily: ScienceGothic.style.fontFamily,fontSize:{xs:"0",md:"20px",lg:"23px"}}}
      >
        SHIPGPT
      </Typography>

      <List sx={{  fontSize:{xs:"22px",md:"16px",lg:"16px"},}}>
        {["Ship User","Dashboard", "Account", "Orders", "Settings"].map(
          (item: string) => (
            <ListItemButton
              key={item}
              sx={{
                textAlign:"center",
                justifyContent:{xs:"center",md:"left",lg:"left"},
                fontFamily: ScienceGothic.style.fontFamily,
                borderRadius: 2,
                mb: 2,
                mt:{xs:8,md:4,lg:2},
                "&:hover": {
                  bgcolor: "#1e293b",
                },
              }}
            >
              {item}
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
