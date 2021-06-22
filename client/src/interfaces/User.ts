export interface UserInterface {
  fullname?: string;
  role?: number;
  phone?: string;
  password?: string;
}

export enum OtpType {
  LOGIN = "login",
  SIGNUP = "signup"
}
