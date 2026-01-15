import { Box, Button } from "@mui/material";
import { TabItem } from "@/utils/types";

type Props = {
  tabs: TabItem[];
};

const TopTabs = ({ tabs }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, md: 2 },
        px: { xs: 1.5, md: 3 },
        py: { xs: 1.5, md: 2 },
        overflowX: { xs: "auto", md: "visible" },
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {tabs.map((tab, index) => (
        <Button
          key={index}
          variant="outlined"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            fontSize: { xs: 11, md: 14 },
            px: { xs: 1, md: 2 },
            py: { xs: 0.5, md: 1 },
            whiteSpace: "nowrap",
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

export default TopTabs;
