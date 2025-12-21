import { Paper, Avatar, Box, Typography } from "@mui/material";
import { ScienceGothic } from "@/utils/font";
import user from "@/assets/images/user.jpg"

const ProfileHeader: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: 3,
        borderRadius: 3,
        backgroundColor: "#303030",
      }}
    >
      <Avatar src={user.src} sx={{ width: 72, height: 72 }} />

      <Box sx={{ fontFamily: ScienceGothic.style.fontFamily }}>
        <Typography
          color="#fff"
          fontWeight={600}
          fontSize={18}
          sx={{ fontFamily: ScienceGothic.style.fontFamily }}
        >
          kunal sharma
        </Typography>

        <Typography
          color="#fff"
          sx={{ fontFamily: ScienceGothic.style.fontFamily }}
        >
          sharmakunal123@gmail.com
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
