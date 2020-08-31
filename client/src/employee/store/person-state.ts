import { UserStatus } from "../../people/store";

export interface Person {
  id: string;
  fullName: string;
  position: string;
  status: UserStatus;
  imageSrc: string;
  birthDate: string; //za sad, da se vidi koji format se koristi
  homeAddress: string;
  enrolmentDate: string;
  email: string;
  phone: string;
  cv?: string;
  salary?: number;
}
