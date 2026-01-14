"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ScienceGothic } from "@/utils/font";
import { COLORS } from "@/utils/enum";

interface ForgotPasswordViewProps {
  formik: any;
  loading: boolean;
  success: boolean;
  onReturnToLogin: () => void;
  onResend?: () => void;
  resendCooldown?: number;
}

const ForgotPasswordView = ({
  formik,
  loading,
  success,
  onReturnToLogin,
  onResend,
  resendCooldown = 0,
}: ForgotPasswordViewProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {!success && (
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: `${ScienceGothic.style.fontFamily} !important`,
              fontWeight: 600,
              color: COLORS.WHITE,
            }}
          >
            Forgot Password?
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
            Enter your email address to reset your password.
          </Typography>
        </Box>
      )}
      {success ? (
        <Box>
          <Box textAlign="center" py={2}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                color: COLORS.WHITE,
                mb: 1,
              }}
            >
              Email Sent!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.7)",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Check your email for the reset link and follow the instructions to
              reset your password.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                disabled={loading || resendCooldown > 0}
                onClick={onResend}
                sx={{
                  py: 1.3,
                  borderRadius: 3,
                  background: "transparent",
                  border: `1px solid ${
                    resendCooldown > 0
                      ? "rgba(255, 255, 255, 0.3)"
                      : COLORS.WHITE
                  }`,
                  color:
                    resendCooldown > 0
                      ? "rgba(255, 255, 255, 0.5)"
                      : COLORS.WHITE,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                }}
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend OTP"}
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  (onReturnToLogin as any)("reset");
                }}
                sx={{
                  py: 1.3,
                  borderRadius: 3,
                  background: COLORS.WHITE,
                  color: COLORS.BLACK,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.9)",
                  },
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                }}
              >
                Enter OTP
              </Button>
            </Box>
          </Box>
          <Box textAlign="center" mt={3}>
            <Typography
              variant="body2"
              onClick={() => onReturnToLogin()}
              sx={{
                fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                fontWeight: 600,
                cursor: "pointer",
                color: COLORS.WHITE,
                opacity: 0.8,
                "&:hover": { opacity: 1 },
              }}
            >
              Back to Login
            </Typography>
          </Box>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                },
              }}
              fullWidth
              label="Email Address"
              id="email"
              InputLabelProps={{ shrink: true }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
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
                "Send Reset Link"
              )}
            </Button>
            <Box textAlign="center" mt={1}>
              <Typography
                variant="body2"
                onClick={onReturnToLogin}
                sx={{
                  fontFamily: `${ScienceGothic.style.fontFamily} !important`,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: COLORS.WHITE,
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Return to Login
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default ForgotPasswordView;
