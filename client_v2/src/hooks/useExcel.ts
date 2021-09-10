import { Workbook } from 'exceljs';
import { DocumentData } from 'src/interfaces/User';

function useExcel() {
  function readExcel(file: Blob) {
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
            Object.defineProperty(
              result,
              JSON.stringify(row.values)[1],
              JSON.stringify(row.values)[2]
            );
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    return result;
  }

  return { readExcel };
}

export { useExcel };
