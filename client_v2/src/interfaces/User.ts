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

export interface UserInterface {
  id: number;
  fullname: string;
  phone: string;
  created_at: string;
  updated_at: string;
  role: RoleInterface;
  tag: TagInterface;
}

export interface UserUpdateInterface {
  id: number;
  fullname: string;
  tag?: number;
}

export interface UserOtpDto {
  phone: string;
  password: string;
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
  patient: UserInterface;
  doctor: UserInterface;
  archived: boolean;
  tag: TagInterface;
  created_at: string;
  updated_at: string;
}

export interface DocumentDto {
  name: string;
  data: DocumentData;
  tag: number;
}

export interface DocumentData {
  [index: string]: string;
}

export interface CommentInterface {
  id: number;
  title: string;
  text: string;
  author: UserInterface;
  document: DocumentInterface;
}

export interface CommentDto {
  title: string;
  text: string;
  document: number;
}

export interface ActivityInterface {
  id: number;
  text: string;
  type: number;
  user: UserInterface;
}

export interface TagInterface {
  id: number;
  name: string;
}

export interface NotificationInterface {
  id: number;
  text: string;
  receptor: UserInterface;
  sender: UserInterface;
  seen: boolean;
  type: number;
  notificationElementId: number;
}

export interface RequestInterface {
  id: number;
  text: string;
  document: DocumentInterface;
  doctor: UserInterface;
}

export interface RequestDto {
  text: string;
  document: number;
  doctor: number;
}

export enum RequestState {
  UNKNOWN = 0,
  SEEN = 1,
  ACCEPTED = 2,
}
