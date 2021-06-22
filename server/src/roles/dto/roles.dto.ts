export class RoleDto {
  name: string;
  access: string[];

  constructor(name, access) {
    this.name = name;
    this.access = access;
  }
}
