export class RequestDto {
  text: string;
  doctor: number;
  document: number;
  constructor(text, doctor, doc) {
    this.text = text;
    this.doctor = doctor;
    this.document = doc;
  }
}
