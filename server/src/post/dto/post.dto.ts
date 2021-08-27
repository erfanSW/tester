export class PostDto {
  text: string;
  user: number;

  constructor(text, user, type) {
    this.text = text;
    this.user = user;
  }
}
