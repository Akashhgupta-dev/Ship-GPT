"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ScienceGothic } from "@/utils/font";
import { COLORS } from "@/utils/enum";

interface ResetPasswordViewProps {
  formik: any;
  loading: boolean;
  onBack: () => void;
  onResend?: () => void;
  resendCooldown?: number;
}

const ResetPasswordView = ({
  formik,
  loading,
  onBack,
  onResend,
  resendCooldown = 0,
}: ResetPasswordViewProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const textFieldStyle = {
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
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: `${ScienceGothic.style.fontFamily} !important`,
            fontWeight: 600,
            color: COLORS.WHITE,
          }}
        >
          Reset Password
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: `${ScienceGothic.style.fontFamily} !important`,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.7)",
            mt: 1,
            lineHeight: 1.6,
          }}
        >
          Enter the OTP sent to your email and set your new password.
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="OTP Code"
            id="otp"
            name="otp"
            InputLabelProps={{ shrink: true }}
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            sx={textFieldStyle}
            placeholder="Enter 4-digit code"
          />

          <TextField
            fullWidth
            label="New Password"
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            sx={textFieldStyle}
            InputProps={{
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
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.3,
              borderRadius: 3,
              background: COLORS.WHITE,
              color: COLORS.BLACK,
              fontWeight: 600,
              textTransform: "none",
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
              "Reset Password"
            )}
          </Button>

          <Box textAlign="center" mt={1}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Didn&apos;t receive the code?{" "}
              <span
                onClick={resendCooldown === 0 ? onResend : undefined}
                style={{
                  color:
                    resendCooldown === 0
                      ? COLORS.WHITE
                      : "rgba(255, 255, 255, 0.4)",
                  fontWeight: 600,
                  cursor: resendCooldown === 0 ? "pointer" : "default",
                  textDecoration: resendCooldown === 0 ? "underline" : "none",
                }}
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend OTP"}
              </span>
            </Typography>
          </Box>

          <Box textAlign="center" mt={2}>
            <Typography
              variant="body2"
              onClick={onBack}
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                cursor: "pointer",
                color: COLORS.WHITE,
                opacity: 0.8,
                "&:hover": { opacity: 1 },
              }}
            >
              Back to Verification
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPasswordView;
