"use client";
import React, { useState } from "react";
import { authControllers } from "@/api/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ScienceGothic } from "@/utils/font";
import AppSnackbar from "@/components/widgets/snakbar";
import { COLORS } from "@/utils/enum";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/utils/validationSchema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginBg from "@/public/images/Bship.jpg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [snakbar, setSnakbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnakbar({ ...snakbar, open: false });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authControllers.login(values);
        const token = response.data?.data?.access_token;

        if (token) {
          localStorage.setItem("accessToken", token);
          setSnakbar({
            open: true,
            message: "Login successful! Redirecting...",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/userscreen");
          }, 1500);
        } else {
          setSnakbar({
            open: true,
            message: "Login failed. Please try again.",
            severity: "error",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Login failed:", error);
        setSnakbar({
          open: true,
          message: "Invalid email or password. Please try again.",
          severity: "error",
        });
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        paddingLeft: { xs: 0, sm: 0, md: 8, lg: 12 },
        paddingRight: { xs: 2, sm: 2, md: 0, lg: 0 },
        overflow: "hidden",
      }}
    >
      <Image
        src={loginBg}
        alt="Ship background"
        fill
        priority
        quality={100}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -2,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
          zIndex: -1,
        }}
      />
      <Card
        sx={{
          width: { xs: "90%", sm: 400, md: 390, lg: 410 },
          maxWidth: 450,
          backdropFilter: "blur(8px)",
          background: "rgba(255, 255, 255, 0.3)",
          color: COLORS.WHITE,
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          border: `1px solid ${COLORS.ACCENT}`,
          ml: { xs: 0, sm: 0, md: 8, lg: 24 },
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                color: COLORS.WHITE,
              }}
            >
              Ship Gpt
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.7)",
                mt: 1,
              }}
            >
              Welcome back, please login
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: COLORS.WHITE,
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: COLORS.WHITE,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  "&.Mui-focused": {
                    color: COLORS.WHITE,
                  },
                },
                "& input": {
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  backgroundColor: "transparent !important",
                  // Transition to keep background transparent
                  transition:
                    "background-color 5000s ease-in-out 0s !important",
                  "&:-webkit-autofill": {
                    transition:
                      "background-color 5000s ease-in-out 0s !important",
                    WebkitTextFillColor: `${COLORS.WHITE} !important`,
                    // Force transparent shadow to avoid distinct color box if standard transparency fails
                    WebkitBoxShadow:
                      "0 0 0 1000px transparent inset !important",
                    backgroundColor: "transparent !important",
                    backgroundClip: "text !important",
                  },
                },
              }}
              fullWidth
              label="Email"
              id="email"
              InputLabelProps={{ shrink: true }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
            <TextField
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  color: COLORS.WHITE,
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: COLORS.WHITE,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  "&.Mui-focused": {
                    color: COLORS.WHITE,
                  },
                },
                "& input": {
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  backgroundColor: "transparent !important",
                  transition:
                    "background-color 5000s ease-in-out 0s !important",
                  "&:-webkit-autofill": {
                    transition:
                      "background-color 5000s ease-in-out 0s !important",
                    WebkitTextFillColor: `${COLORS.WHITE} !important`,
                    WebkitBoxShadow:
                      "0 0 0 1000px transparent inset !important",
                    backgroundColor: "transparent !important",
                    backgroundClip: "text !important",
                  },
                },
              }}
              fullWidth
              label="Password"
              id="password"
              placeholder=" "
              InputLabelProps={{ shrink: true }}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
            <Box textAlign="right" mt={1}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: COLORS.WHITE,
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: 3,
                background: COLORS.WHITE,
                color: COLORS.BLACK,
                fontWeight: 600,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                },
                "&:disabled": {
                  background: "rgba(255, 255, 255, 0.6)",
                  color: COLORS.BLACK,
                },
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: COLORS.BLACK }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <AppSnackbar
        open={snakbar.open}
        message={snakbar.message}
        severity={snakbar.severity as "success" | "error" | "warning" | "info"}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}
