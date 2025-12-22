"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { CategoryItem } from "@/utils/types";
import { COLORS } from "@/utils/enum";

type Props = {
  value: string;
  categories: CategoryItem[];
  onChange: (value: string) => void;
};

const CategoryTabs = ({ value, categories, onChange }: Props) => {
  return (
    <Box
      sx={{
        overflowX: { xs: "auto", md: "visible" },
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 36,
          "& .MuiTabs-indicator": {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      >
        {categories.map((cat) => (
          <Tab
            key={cat.value}
            value={cat.value}
            label={cat.label}
            sx={{
              textTransform: "none",
              minHeight: 36,
              px: { xs: 1.5, md: 2 },
              borderRadius: "10px",
              fontSize: { xs: 13, md: 14 },
              color: COLORS.TEXT_PRIMARY,
              "&.Mui-selected": {
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.TEXT_PRIMARY,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs;
