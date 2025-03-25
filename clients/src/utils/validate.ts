import { User } from "../types/User";

const isEmpty = (field: string, message: string) => {
  if (!field.trim()) return message;
};

// Registration Validation
export const validateRegister = (data: User): Partial<User> => {
  const validationErrors: Partial<User> = {};

  validationErrors.firstname = isEmpty(
    data.firstname,
    "Firstname is required."
  );
  validationErrors.lastname = isEmpty(data.lastname, "lastname is required.");
  validationErrors.username = isEmpty(data.username, "Username is required.");
  validationErrors.email = isEmpty(data.email, "Email Username is required.");

  // Validate Email Format
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    validationErrors.email = "Invalid email format.";
  }

  validationErrors.password = isEmpty(data.password, "Password is required.");

  // Password Length Check
  if (data.password && data.password.length < 6) {
    validationErrors.password = "Password must be at least 6 characters long.";
  }

  // Return only the fields with errors
  return Object.fromEntries(
    Object.entries(validationErrors).filter(([, v]) => v)
  );
};

// Login Validation
export const validateLogin = (
  data: Pick<User, "username" | "password">
): Partial<User> => {
  const validationErrors: Partial<User> = {};

  validationErrors.username = isEmpty(data.username, "Please enter username.");
  validationErrors.password = isEmpty(data.password, "Please enter password.");

  return Object.fromEntries(
    Object.entries(validationErrors).filter(([, v]) => v)
  );
};
