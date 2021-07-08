export interface UserInterface {
  fullname?: string;
  role?: number;
  phone?: string;
  password?: string;
}

export interface UserDto {
  [index: string]: string | number;

  fullname: string;
  role: number;
  phone: string;
}

export enum OtpType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export type OtpResponse = {
  access_token: string;
};
