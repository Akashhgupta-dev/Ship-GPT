"use client";

import { Select, MenuItem, Box } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { SHIPS } from "@/assets/generic-data";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ShipSelector = ({ value, onChange }: Props) => {
  return (
    <Box>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        disableUnderline
        sx={{
          color: COLORS.TEXT_PRIMARY,
          backgroundColor: COLORS.PRIMARY,
          px: { xs: 1.5, md: 2 },
          py: { xs: 0.6, md: 0.8 },
          borderRadius: "10px",
          minWidth: { xs: 140, md: 180 },
          fontSize: { xs: 13, md: 14 },
          "& .MuiSelect-icon": {
            color: COLORS.TEXT_PRIMARY,
            fontSize: { xs: 20, md: 22 },
          },
        }}
      >
        {SHIPS.map((ship) => (
          <MenuItem key={ship.value} value={ship.value}>
            {ship.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ShipSelector;
