"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import { CATEGORIES } from "@/assets/generic-data";
import CategoryTabs from "@/components/widgets/category-tabs";
// import CategorySelector from "@/components/widgets/category-selector";
import { COLORS } from "@/utils/enum";

const TopBar = () => {
  const [category, setCategory] = useState("mechanical");

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
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
      {/* Left → Tabs */}
      <CategoryTabs
        value={category}
        categories={CATEGORIES}
        onChange={setCategory}
      />

      {/* Right → Dropdown */}
      {/* <CategorySelector
        value={category}
        categories={CATEGORIES}
        onChange={setCategory}
      /> */}
    </Box>
  );
};

export default TopBar;
