/* eslint-disable */
import Papa from 'papaparse';
import { Notify } from 'quasar';

function useCsv() {
  async function parseCsv(file: File) {
    return new Promise((resolve, reject) => {
      try {
        Papa.parse(file, {
          complete: (result) => {
            resolve(result.data.map(arr => arr));
          },
        });
      } catch (error) {
        reject(error);
        console.log(error);
        Notify.create({
          message: 'خطایی در هنگام خواندن فایل رخ داد',
          color: 'red',
        });
      }
    });
  }
  return { parseCsv };
}

export { useCsv };
