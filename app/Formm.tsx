"use client";
import UserScreenLayout from "@/components/layouts/UserScreenLayout";
import { ScienceGothic } from "@/utils/font";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";

import { loginSchema } from "./schemas";
import type { LoginFormValues } from "./schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { object } from "yup";
import { authControllers } from "@/api/auth";

export default function Form() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await authControllers.login(values);
        console.log("LOGIN RESPONSE FULL:", response);
        console.log("LOGIN RESPONSE DATA:", response.data);
        const token = response.data?.data?.access_token;
        if (token) {
          console.log("Saving Access Token:", token);
          localStorage.setItem("accessToken", token);
          setOpen(true);
          router.push("/userscreen");
        } else {
          console.warn(
            "Available keys in response:",
            Object.keys(response.data || {})
          );
          console.error("Access Token NOT found. Response was:", response.data);
          alert(
            "Login succeeded but token missing. check console for 'LOGIN RESPONSE DATA'"
          );
        }
      } catch (error) {
        console.error("Login failed", error);
        alert("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* EMAIL */}
      <div className="input-block">
        {/* <label htmlFor="email" className="input-label">
                    <Typography
            fontSize={{ xs: 25, sm: 16, md: 16, lg: 16 }}
            sx={{ fontFamily: ScienceGothic.style.fontFamily }}
          >
            Email
          </Typography>
                </label> */}

        <Box>
          <TextField
            sx={{
              width: { xs: "100%", sm: "220px", md: "220px", lg: "220px" },
              mb: 2,
            }}
            size="small"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={!!formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
      </div>

      {/* PASSWORD */}
      <div className="input-block">
        {/* <label htmlFor="password" className="input-label">
                    <Typography
            fontSize={{ xs: 25, sm: 16, md: 16, lg: 16 }}
            sx={{ fontFamily: ScienceGothic.style.fontFamily }}
          >
            Password
          </Typography>
                </label> */}

        <Box>
          <TextField
            sx={{
              width: { xs: "100%", sm: "220px", md: "220px", lg: "220px" },
            }}
            size="small"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
      </div>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          backgroundColor: "#1a2f39",
          fontSize: { xs: 19, sm: 16, md: 16, lg: 16 },
          width: { xs: "100%", sm: "220px", md: "220px", lg: "220px" },
          height: { xs: "45px", sm: "40px", md: "40px", lg: "40px" },
          fontFamily: ScienceGothic.style.fontFamily,
        }}
      >
        Login
      </Button>
    </form>
  );
}
