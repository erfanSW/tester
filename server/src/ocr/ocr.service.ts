import { Injectable } from '@nestjs/common';
import { recognize } from 'tesseract.js';

@Injectable()
export class OcrService {
  async textRecognizer(img) {
    return await recognize(img, 'eng', {
      logger: m => console.log(m),
    });
  }
}
