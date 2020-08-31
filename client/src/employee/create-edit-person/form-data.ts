import { UserStatus } from "../../people/store";

export interface CreateEditFormData {
  fullName?: string,
  role?: string,
  email?: string,
  homeAddress?: string,
  phone?: string,
  birthDate?: string,
  enrolmentDate?: string,
  status?: UserStatus
}

export const REQUIRED_MESSAGE = "This field is required";
export const WRONG_FORMAT_MESSAGE = "Wrong format";