export interface DocumentInterface {
  name: string;
  data: DocumentData;
  patient?: number;
  doctor?: number;
}

export type DocumentData = {
  [index: string]: string;
}