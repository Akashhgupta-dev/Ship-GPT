import { Paper, Avatar, Box, Typography } from "@mui/material";
import { ScienceGothic , Poppins } from "@/utils/font";
import user from "@/assets/images/user.jpg"

const ProfileHeader: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width:{xs:"100%",md:"100%",lg:"100%"},
        p: {xs:"16px",md:"20px",lg:"20px"},
        mb: 2,
        mt:4,
        display: "flex",
        alignItems: "center",
        gap: {xs:"16px",md:"20px",lg:"20px"},
        borderRadius: 3,
        backgroundColor: "#303030",
      }}
    >
      <Avatar src={user.src} sx={{ width: 62, height: 62 }} />

      <Box sx={{ fontFamily: ScienceGothic.style.fontFamily }}>
        <Typography
          color="#fff"
          fontWeight={600}
          fontSize={{xs:"16px",md:"20px",lg:"20px"}}
          sx={{ fontFamily: ScienceGothic.style.fontFamily }}
        >
          kunal sharma
        </Typography>

        <Typography
          color="#fff"
          sx={{ fontFamily: Poppins.style.fontFamily, fontSize:{xs:"13px",md:"16px",lg:"16px"} }}
        >
          sharmakunal123@gmail.com
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
