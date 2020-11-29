export class DocumentDto {
  name: string;
  data: any;
  doctor: number;
  patient: number;
  constructor(name, data, doctor, patient) {
    this.name = name;
    this.data = data;
    this.doctor = doctor;
    this.patient = patient;
  }
}
