export interface AuthFormData {
  fullName?: string,
  email?: string,
  password?: string
}

export const REQUIRED_MESSAGE = "This field is required";
export const SHORT_PASSWORD_MESSAGE = "Minimum length of password is 6 characters";
export const WRONG_FORMAT_MESSAGE = "Wrong format";