export interface RequestInterface {
  text: string;
  document: number;
  doctor: number;
}

export type DocumentData = {
  [index: string]: string;
};

export enum RequestState {
  UNKNOWN = 0,
  SEEN = 1,
  ACCEPTED = 2,
}
