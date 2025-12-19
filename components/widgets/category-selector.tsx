// "use client";

// import {
//   Box,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Typography,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { CategoryItem } from "@/utils/types";
// import { COLORS } from "@/utils/enum";

// type Props = {
//   value: string;
//   categories: CategoryItem[];
//   onChange: (value: string) => void;
// };

// const CategorySelector = ({ value, categories, onChange }: Props) => {
//   const handleChange = (event: SelectChangeEvent) => {
//     onChange(event.target.value);
//   };

//   const selectedLabel =
//     categories.find((c) => c.value === value)?.label;

//   return (
//     <Box
//       sx={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 1,
//         borderRadius: "14px",
//         backgroundColor: COLORS.SECONDARY,
//         px: 2,
//         py: 1,
//         cursor: "pointer",
//       }}
//     >
//       {/* Selected Category */}
//       <Typography
//         fontWeight={500}
//         color={COLORS.TEXT_PRIMARY}
//       >
//         {selectedLabel}
//       </Typography>

//       <Select
//         value={value}
//         onChange={handleChange}
//         variant="standard"
//         disableUnderline
//         displayEmpty
//         renderValue={() => ""}
//         IconComponent={KeyboardArrowDownIcon}
//         sx={{
//           minWidth: 0,
//           "& .MuiSelect-icon": {
//             color: COLORS.TEXT_PRIMARY,
//           },
//         }}
//       >
//         {categories.map((cat) => (
//           <MenuItem key={cat.value} value={cat.value}>
//             {cat.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </Box>
//   );
// };

// export default CategorySelector;
