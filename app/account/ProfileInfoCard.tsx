import { Paper, Typography, Box, Button } from "@mui/material";
import { ScienceGothic , Poppins } from "@/utils/font";

type RowProps = {
  label: string;
  value: string;
};

const Row: React.FC<RowProps> = ({ label, value }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "100px 1fr",
      mb: 2,
    }}
  >
    <Typography
      color="#fff"
      sx={{
        fontFamily: ScienceGothic.style.fontFamily,
        fontWeight: "400",
        fontSize:{xs:"14px",md:"20px",lg:"18px"}
      }}
    >
      {label}
    </Typography>

    <Typography
      color="#fff"
      sx={{
        fontFamily: Poppins.style.fontFamily,
        fontSize:{xs:"14px",md:"20px",lg:"18px"}
      }}
    >
      {value}
    </Typography>
  </Box>
);

const ProfileInfoCard: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {xs:"16px",md:"20px",lg:"18px"},
        borderRadius: 3,
        backgroundColor: "#303030",
      }}
    >
      <Row label="Name:" value="ShipGPT" />
      <Row label="Email:" value="ShipGPT@gmail.com" />
      <Row label="Phone:" value="+91 885xxxxx" />
      <Row
        label="Bio:"
        value="lorem ipsum dolor sit amet consectetur adipisicing elit."
      />

      {/* 
      <Button
        size="small"
        sx={{
          mt: 2,
          color: "black",
          fontWeight: "700",
          backgroundColor: "#fff",
          fontFamily: ScienceGothic.style.fontFamily,
        }}
      >
        EDIT
      </Button> 
      */}
    </Paper>
  );
};

export default ProfileInfoCard;
