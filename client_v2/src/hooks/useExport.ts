/* eslint-disable */
import { createWorker, OEM, PSM } from 'tesseract.js';
import { useQuasar, LoadingBar, Dialog, exportFile } from 'quasar';

function useExport() {
  const $q = useQuasar();

  function wrapCsvValue(val: any, formatFn: any) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }

  function exportTable(columns: any[], rows: any) {
    // naive encoding to csv format
    const content = [
      columns.map((col: { label: string }) =>
        wrapCsvValue(col.label, () => {})
      ),
    ]
      .concat(
        rows.map((row: { [x: string]: string }) =>
          columns
            .map(
              (col: {
                field: ((arg0: any) => string) | undefined;
                name: any;
                format: Function;
              }) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
            )
            .reverse()
            .join(',')
        )
      )
      .join('\r\n');

    const status = exportFile('table-export.csv', content, 'text/csv');

    if (status !== true) {
      $q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }

  return { exportTable };
}

export { useExport };
