export interface RequestInterface {
  id?: number;
  text: string;
  state?: RequestState;
  document: number;
  applicant: number;
  doctor: number;
}

export enum RequestState {
  UNKNOWN = 0,
  REJECTED = 1,
  ACCEPTED = 2,
}
