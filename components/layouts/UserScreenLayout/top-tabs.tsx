import { Box, Button } from "@mui/material";
import { TabItem } from "@/utils/types";

type Props = {
  tabs: TabItem[];
};

const TopTabs = ({ tabs }: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 2, px: 3, py: 2 }}>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          variant="outlined"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

export default TopTabs;
