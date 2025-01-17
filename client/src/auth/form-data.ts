export interface AuthFormData {
  fullName?: string,
  email?: string,
  password?: string,
  oldPassword?: string,
  newPassword?: string
}

export const REQUIRED_MESSAGE = "This field is required";
export const SHORT_PASSWORD_MESSAGE = "Minimum length of password is 4 characters";
export const WRONG_FORMAT_MESSAGE = "Wrong format";