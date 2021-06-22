import { Role } from "src/roles/roles.entity";

export interface UserInterface {
  id?: number;
  fullname: string;
  password?: string;
  phone?: string;
  role?: Role;
}
