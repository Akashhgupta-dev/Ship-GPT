"use client";

import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CATEGORIES, SHIPS } from "@/assets/generic-data";
import CategoryTabs from "@/components/widgets/category-tabs";
import ShipSelector from "@/components/widgets/ship-selector";
import { COLORS } from "@/utils/enum";

type Props = {
  onMenuClick: () => void;
};

const TopBar = ({ onMenuClick }: Props) => {
  const [category, setCategory] = useState("mechanical");
  const [ship, setShip] = useState(SHIPS[0].value);

  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 3 },
        py: { xs: 1.2, md: 1.5 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.PRIMARY,
        borderBottom: `1px solid ${COLORS.SECONDARY}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, md: 1 },
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Mobile hamburger */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: COLORS.TEXT_PRIMARY,
            p: 0.5,
          }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <CategoryTabs
          value={category}
          categories={CATEGORIES}
          onChange={setCategory}
        />
      </Box>

      {/* RIGHT */}
      <ShipSelector value={ship} onChange={setShip} />
    </Box>
  );
};

export default TopBar;
