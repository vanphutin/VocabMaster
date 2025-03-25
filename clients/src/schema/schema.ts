import * as yup from "yup";

export const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  agreedToTerms: yup
    .bool()
    .oneOf([true], "You must agree to the Terms & Conditions")
    .required(),
});

// Sử dụng InferType để lấy type chính xác
export type UserRegister = yup.InferType<typeof schema>;
