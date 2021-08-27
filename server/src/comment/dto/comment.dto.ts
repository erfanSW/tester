export class CommentDto {
  title: string;
  text: string;
  author: number;
  document: number;

  constructor(title, text, document, author) {
    this.title = title;
    this.text = text;
    this.document = document;
    this.author = author;
  }
}
