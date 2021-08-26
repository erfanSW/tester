export interface CommentDto {
  title: string;
  text: string;
  document: number;
}

export interface CommentInterface {
  author: string;
  title: string;
  text: string;
  document: Document
}