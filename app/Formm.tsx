"use client";
import UserScreenLayout from "@/components/layouts/UserScreenLayout";
import { ScienceGothic } from "@/utils/font";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import type { LoginFormValues } from "./schemas";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const { values, handleChange, handleSubmit, errors, touched } =
        useFormik<LoginFormValues>({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: loginSchema,
            onSubmit: (values) => {
                console.log(values);
            },
        });

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:loginSchema,
        onSubmit:(values)=>{
            console.log(values)
        }
    })
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

            <Button onClick={()=>{
                router.push("/about");
            }}
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




