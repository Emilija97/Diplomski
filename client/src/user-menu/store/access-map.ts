import { UserType } from "../../auth/store";


export const accessMap: Map<number, string> = new Map([
    [UserType.HR, "HR"],
    [UserType.ADMIN, "Admin"],
    [UserType.EMPLOYEE, "Employee"],
    [UserType.GUEST, "Guest"],
])