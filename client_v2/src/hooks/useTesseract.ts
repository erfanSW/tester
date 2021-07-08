/* eslint-disable */
import { createWorker, OEM, PSM } from 'tesseract.js';
import { useQuasar, LoadingBar, Dialog } from 'quasar';

function useTesseract() {
  const $q = useQuasar();
  let dialog: any;

  const worker = createWorker({
    logger: (m) => {
      if (m.status === 'initializing api') {
        if (m.progress === 1) {
          LoadingBar.stop();
        }
      }
      if (m.status === 'recognizing text') {
        if (m.progress === 1) {
          dialog.hide();
        }
        if (m.progress === 0) {
          dialog = Dialog.create({
            message: 'در حال پردازش',
            progress: {
              color: 'amber',
            },
            persistent: true, // we want the user to not be able to close it
            ok: false, // we want the user to not be able to close it
          });
        } else {
          dialog.update({
            message: `درحال پردازش ${(m.progress * 100).toFixed()}%`,
          });
        }
      }
    },
  });

  async function initialize() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  }

  async function recognize(img: any) {
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    return worker.recognize(img);
  }

  return { worker, initialize, recognize };
}

export { useTesseract };
