"use client"
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { ScienceGothic } from "@/utils/font";
import Bship from '@/assets/images/Bship.jpg';
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import Form from "./Formm";

export default function Home() {
    
  return (
    <Box
      sx={{
        backgroundImage: `
      linear-gradient(
        to right,
        rgba(28, 50, 54, 0.4),
        rgba(255,255,255,0.1)
      ),
      url(${Bship.src})
    `,
        backgroundPosition: { xs: "center top", sm: "center center", md: "right center", lg: "right center" },
        backgroundSize: "cover",
        px: { xs: 6, sm: 0 },
        pb: { xs: 0, sm: 2 },
        minHeight: { xs: "89vh", sm: "100vh", md: "100vh", lg: "100vh" },

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          ml: { xs: 2, sm: 4, md: 10, lg: 35 },
          mr: "auto",
          p: { xs: 2, sm: 4, md: 4, lg: 2 },
          pl: { xs: 2, sm: 1, md: 1, lg: 3 },
          width: { xs: "100%", sm: "100%", md: "100%", lg: "300px" },
          maxWidth: "390px",
          height: "auto",
          overflow: "hidden",
          opacity: "1",
          bgcolor: "transparent",
          borderRadius: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(0.5px)",

        }}
      >
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 2, lg: 2 },
            fontFamily: ScienceGothic.style.fontFamily,
            width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          }}
        >
          <Typography fontSize={{ xs: 30, sm: 30, md: 30, lg: 30 }} fontWeight={650} mb={{ xs: 2, sm: 2, md: 2, lg: 1 }} sx={{ color: "#1a2f39", fontFamily: ScienceGothic.style.fontFamily }}>
            SHIPGPT
          </Typography>

          <Typography fontSize={{ xs: 16, sm: 10, md: 10, lg: 15 }} color="text.secondary" mb={{ xs: 2, sm: 2, md: 2, lg: 2 }} sx={{ fontFamily: ScienceGothic.style.fontFamily }}>
            Login to your account
          </Typography>

            <Form/>
          
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Link
              underline="hover"
              sx={{ fontSize: { xs: 14, sm: 12, md: 12, lg: 14 }, color: "#1a2f39" }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Paper>

    </Box>
  );
}
