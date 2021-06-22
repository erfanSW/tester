import { Role } from "src/roles/roles.entity";

export class UserDto {
         fullname: string;
         password: string;
         role: Role;
         phone: string;

         constructor(fullname, password, role, phone) {
           this.fullname = fullname;
           this.password = password;
           this.role = role;
           this.phone = phone;
         }
       }
