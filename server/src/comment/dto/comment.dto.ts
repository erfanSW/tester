export class CommentDto {
  title: string;
  text: string;
  document: number;

  constructor(title, text, document) {
    this.title = title;
    this.text = text;
    this.document = document;
  }
}
