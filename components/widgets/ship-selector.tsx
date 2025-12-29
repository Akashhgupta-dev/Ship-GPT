"use client";

import { Select, MenuItem } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { SHIPS } from "@/assets/generic-data";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ShipSelector = ({ value, onChange }: Props) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      MenuProps={{
        PaperProps: {
          sx: {
            mt: 1,
            borderRadius: "12px",
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.TEXT_PRIMARY,
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          },
        },
      }}
      sx={{
        color: COLORS.TEXT_PRIMARY,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: "12px",
        minWidth: { xs: 140, md: 180 },
        fontSize: { xs: 13, md: 14 },

        "& fieldset": {
          border: "none",
        },

      
        // "& .MuiOutlinedInput-input": {
        //   padding: {
        //     xs: "6px 28px 6px 12px",
        //     md: "8px 34px 8px 14px",
        //   },
        //   display: "flex",
        //   alignItems: "center",
        // },

        "& .MuiSelect-icon": {
          color: COLORS.TEXT_PRIMARY,
          right: { xs: 12, md: 36 },
          fontSize: { xs: 18, md: 20 },
        },
      }}
    >
      {SHIPS.map((ship) => (
        <MenuItem
          key={ship.value}
          value={ship.value}
          sx={{
            fontSize: 14,
            py: 1,
            borderRadius: "8px",
            "&.Mui-selected": {
              backgroundColor: COLORS.SECONDARY,
            },
            "&.Mui-selected:hover": {
              backgroundColor: COLORS.SECONDARY,
            },
            "&:hover": {
              backgroundColor: COLORS.SECONDARY,
            },
          }}
        >
          {ship.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ShipSelector;
