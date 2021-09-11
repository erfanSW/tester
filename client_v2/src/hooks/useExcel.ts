/* eslint-disable */
import { Workbook } from 'exceljs';
import { DocumentData } from 'src/interfaces/User';

function useExcel() {
  function readExcel(file: Blob) {
    return new Promise((resolve, reject) => {
      try {
        const workbook = new Workbook();
        const reader = new FileReader();
        const result: DocumentData = {};
        reader.readAsArrayBuffer(file);
        reader.onload = async function () {
          try {
            const buffer = reader.result as Buffer;
            const wb = await workbook.xlsx.load(buffer);
            wb.eachSheet((sheet) => {
              sheet.eachRow((row) => {
                const normalizedValues = JSON.parse(JSON.stringify(row.values));
                const key = normalizedValues[1]
                  ? (normalizedValues[1] as string)
                  : '';
                const value = normalizedValues[2]
                  ? (normalizedValues[2] as string)
                  : '';

                Object.defineProperty(result, key, {
                  value: value,
                  writable: false,
                });
              });
            });
          } catch (error) {
            reject(error);
          }
        };
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  return { readExcel };
}

export { useExcel };
