import * as yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum 6 characters")
    .max(16, "Password must be maximum 16 characters"),
});
