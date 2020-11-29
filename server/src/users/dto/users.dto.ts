export class UserDto {
  username: string;
  password: string;
  role: number;

  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
