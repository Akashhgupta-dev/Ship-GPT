"use client";

import { Box, Typography, List, ListItemButton } from "@mui/material";
import { ScienceGothic } from "@/utils/font";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 240,
        minHeight: "100vh",
        bgcolor: "#181818",
        color: "#fff",
        p: 2,
        position: "sticky",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={3}
        sx={{ fontFamily: ScienceGothic.style.fontFamily }}
      >
        SHIPGPT
      </Typography>

      <List>
        {["Dashboard", "Account", "Orders", "Settings"].map(
          (item: string) => (
            <ListItemButton
              key={item}
              sx={{
                fontFamily: ScienceGothic.style.fontFamily,
                borderRadius: 2,
                mb: 1,
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
