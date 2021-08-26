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
  user: unknown;
};

export interface User {
  id: number;
  fullname: string;
  phone: string;
  created_at: string;
  updated_at: string;
  role: RoleInterface;
}

export interface RoleInterface {
  id: number;
  name: string;
  access: string[];
}

export interface DocumentInterface {
  id: number;
  name: string;
  data: DocumentData;
  patient: User;
  doctor: User;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface DocumentData {
  [index: string]: string;
}

export interface CommentInterface {
  id: number;
  title: string;
  text: string;
  author: User;
  document: DocumentInterface;
}

export interface ActivityInterface {
  id: number;
  text: string;
  type: number;
  user: UserInterface;
}
