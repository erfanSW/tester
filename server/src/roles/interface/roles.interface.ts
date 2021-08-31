export interface RoleInterface {
  id?: number;
  name: string;
  access: string[];
}

export enum RoleType {
  Patient = 1,
  Doctor = 2,
  Admin = 3,
}
